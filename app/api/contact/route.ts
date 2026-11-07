import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { validateContact, type ContactInput } from '@/lib/validation'
import { siteConfig } from '@/lib/site-config'

/**
 * Validates with the SAME schema as the browser, then delivers by:
 *   1. authenticated SMTP (SMTP_HOST/USER/PASS/FROM all set), else
 *   2. CONTACT_WEBHOOK_URL, else
 *   3. refuses with 503. A "thank you" for a dropped inquiry is the worst failure here.
 *
 * Security notes:
 * - Rate limiting is in memory, so it is per process. That is valid for a single
 *   Node.js process (one cPanel/Passenger app). Several instances would need a
 *   shared store; none is assumed.
 * - Client IP headers are trusted ONLY when CONTACT_TRUSTED_IP_HEADER names the
 *   header the hosting proxy itself sets. Otherwise no IP is used: requests are
 *   limited per submitted email address plus a site-wide flood brake, so visitors
 *   without an IP never share a single bucket.
 * - Origin must match a configured trusted origin, never the request's own Host.
 * - Submissions are never logged; only status codes and error kinds are.
 */
export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_KEY = 5
const GLOBAL_MAX = 60
const MAX_KEYS = 5000
const MAX_BODY_BYTES = 16 * 1024
const DELIVERY_TIMEOUT_MS = 8000
const hits = new Map<string, number[]>()

const NO_STORE = { 'Cache-Control': 'no-store' }
const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NO_STORE })

function rateLimited(key: string, max: number) {
  const now = Date.now()
  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
    if (hits.size > MAX_KEYS) hits.clear()
  }
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > max
}

/** The client IP, read only from the header the hosting proxy is configured to set. */
function trustedClientIp(request: Request): string | null {
  const header = process.env.CONTACT_TRUSTED_IP_HEADER?.trim().toLowerCase()
  if (!header) return null
  const value = request.headers.get(header)
  if (!value) return null
  const entries = value.split(',').map((s) => s.trim()).filter(Boolean)
  // A trusted proxy APPENDS to X-Forwarded-For, so the last entry is the one it saw;
  // anything to its left is client-supplied.
  const ip = header === 'x-forwarded-for' ? entries.at(-1) : entries[0]
  return ip && /^[0-9a-f:.]{3,45}$/i.test(ip) ? ip : null
}

function trustedOrigins(request: Request) {
  const origins = new Set<string>()
  const canonical = new URL(siteConfig.url)
  origins.add(canonical.origin)
  origins.add(`${canonical.protocol}//www.${canonical.host}`)
  for (const entry of (process.env.CONTACT_ALLOWED_ORIGINS ?? '').split(',')) {
    try {
      if (entry.trim()) origins.add(new URL(entry.trim()).origin)
    } catch {
      // ignore malformed entries
    }
  }
  // Development only: the preview runs on a host nobody can configure in advance.
  if (process.env.NODE_ENV === 'development') {
    const host = request.headers.get('host')
    if (host) origins.add(`https://${host}`).add(`http://${host}`)
  }
  return origins
}

function originAllowed(request: Request) {
  const origin = request.headers.get('origin')
  // Browsers always send Origin on a POST from fetch(); a missing one is not a visitor.
  if (!origin) return process.env.NODE_ENV === 'development'
  try {
    return trustedOrigins(request).has(new URL(origin).origin)
  } catch {
    return false
  }
}

function smtpSettings() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) return null
  const port = Number(process.env.SMTP_PORT || 465)
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465
  return { host: SMTP_HOST, port, secure, user: SMTP_USER, pass: SMTP_PASS, from: SMTP_FROM }
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

function renderInquiry(d: Omit<ContactInput, 'company_url'>, siteLocale: string | null, receivedAt: string) {
  const subject = oneLine(`Website inquiry (${d.topic}): ${d.name}, ${d.company}`).slice(0, 180)
  const text = [
    `Topic: ${d.topic}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Company: ${d.company}`,
    `Role: ${d.role || '-'}`,
    `Website: ${d.website || '-'}`,
    `Preferred language: ${d.language}`,
    `Site language: ${siteLocale ?? '-'}`,
    `Received: ${receivedAt}`,
    '',
    d.improve,
  ].join('\n')
  return { subject, text }
}

async function withTimeout<T>(promise: Promise<T>) {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(Object.assign(new Error('delivery timeout'), { name: 'TimeoutError' })), DELIVERY_TIMEOUT_MS)
  })
  try {
    return await Promise.race([promise, timeout])
  } finally {
    clearTimeout(timer)
  }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) return reply({ error: 'forbidden' }, 403)
  if (rateLimited('global', GLOBAL_MAX)) return reply({ error: 'rate_limited' }, 429)

  const ip = trustedClientIp(request)
  if (ip && rateLimited(`ip:${ip}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)

  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > MAX_BODY_BYTES) return reply({ error: 'too_large' }, 413)

  let raw: Record<string, unknown>
  try {
    const text = await request.text()
    if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return reply({ error: 'too_large' }, 413)
    const parsed: unknown = JSON.parse(text)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object')
    raw = parsed as Record<string, unknown>
  } catch {
    return reply({ error: 'invalid_json' }, 400)
  }

  // Honeypot filled: accept silently so bots learn nothing.
  if (typeof raw.company_url === 'string' && raw.company_url.length > 0) {
    return reply({ ok: true })
  }

  const result = validateContact(raw)
  if (!result.ok) return reply({ errors: result.errors }, 422)

  const { company_url: _honeypot, ...inquiry } = result.data
  if (!ip) {
    const emailKey = createHash('sha256').update(inquiry.email.toLowerCase()).digest('hex')
    if (rateLimited(`email:${emailKey}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email.value
  const siteLocale = typeof raw.locale === 'string' ? raw.locale.slice(0, 5) : null
  const receivedAt = new Date().toISOString()
  const smtp = smtpSettings()
  const webhook = process.env.CONTACT_WEBHOOK_URL

  if (!smtp && !webhook) {
    console.error('[contact] no delivery method configured; inquiry not delivered')
    return reply({ error: 'not_configured' }, 503)
  }

  try {
    if (smtp) {
      const { subject, text } = renderInquiry(inquiry, siteLocale, receivedAt)
      const transport = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: { user: smtp.user, pass: smtp.pass },
        connectionTimeout: DELIVERY_TIMEOUT_MS,
        greetingTimeout: DELIVERY_TIMEOUT_MS,
        socketTimeout: DELIVERY_TIMEOUT_MS,
      })
      // Sent FROM the authenticated mailbox; the visitor is only the Reply-To.
      await withTimeout(
        transport.sendMail({
          from: smtp.from,
          to,
          replyTo: { name: oneLine(inquiry.name), address: inquiry.email },
          subject,
          text,
        }),
      )
    } else if (webhook) {
      const headers: Record<string, string> = { 'content-type': 'application/json' }
      if (process.env.CONTACT_WEBHOOK_SECRET) headers.authorization = `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}`
      const res = await fetch(webhook, {
        method: 'POST',
        headers,
        signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
        body: JSON.stringify({ ...inquiry, to, siteLocale, receivedAt }),
      })
      if (!res.ok) throw Object.assign(new Error('webhook rejected'), { code: `HTTP_${res.status}` })
    }
  } catch (error) {
    // Error kind only: SMTP server responses can echo addresses or content.
    const e = error as { name?: string; code?: string }
    console.error('[contact] delivery failed', e?.code ?? e?.name ?? 'unknown')
    return reply({ error: 'delivery_failed' }, 502)
  }

  // Accepted by the SMTP server or webhook. That is NOT proof of mailbox delivery; verify with a real test.
  return reply({ ok: true })
}
