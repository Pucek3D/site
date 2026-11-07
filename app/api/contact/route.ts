import { NextResponse } from 'next/server'
import { validateContact } from '@/lib/validation'
import { siteConfig } from '@/lib/site-config'

/**
 * Validates with the SAME schema as the browser, then forwards to
 * CONTACT_WEBHOOK_URL (Zapier, Make, Slack, a CRM inbox…). With no webhook
 * configured the route refuses rather than reporting a delivery that never
 * happened — a "thank you" for a dropped inquiry is the worst failure here.
 */

/*
 * Security notes for the real deployment:
 * - The rate limiter is in memory, so it is per process: a best-effort brake on
 *   one instance, not a guarantee across several. If the host runs multiple
 *   instances, a shared store would be needed.
 * - X-Forwarded-For is client-controlled unless a trusted proxy rewrites it, so
 *   the value is only used as a rate-limit key (bounded length), never trusted
 *   for anything else.
 * - Submissions are never logged; only status codes and error kinds are.
 */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_KEYS = 5000
const MAX_BODY_BYTES = 16 * 1024
const DELIVERY_TIMEOUT_MS = 8000
const hits = new Map<string, number[]>()

const NO_STORE = { 'Cache-Control': 'no-store' }
const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NO_STORE })

function rateLimited(key: string) {
  const now = Date.now()
  if (hits.size > MAX_KEYS) hits.clear()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > MAX_PER_WINDOW
}

function clientKey(request: Request) {
  const raw = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? ''
  const key = raw.trim().slice(0, 64)
  return key || 'unknown'
}

/** Allowed origins: the request's own host plus the canonical domain. Anything else is cross-site. */
function crossSite(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    const host = new URL(origin).host
    const allowed = new Set([request.headers.get('host'), new URL(siteConfig.url).host].filter(Boolean))
    return !allowed.has(host)
  } catch {
    return true
  }
}

export async function POST(request: Request) {
  if (crossSite(request)) return reply({ error: 'forbidden' }, 403)
  if (rateLimited(clientKey(request))) return reply({ error: 'rate_limited' }, 429)

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

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (!webhook) {
    console.error('[contact] CONTACT_WEBHOOK_URL is not set; inquiry not delivered')
    return reply({ error: 'not_configured' }, 503)
  }

  const { company_url: _honeypot, ...inquiry } = result.data
  try {
    const headers: Record<string, string> = { 'content-type': 'application/json' }
    if (process.env.CONTACT_WEBHOOK_SECRET) headers.authorization = `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}`
    const res = await fetch(webhook, {
      method: 'POST',
      headers,
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
      body: JSON.stringify({
        ...inquiry,
        to: process.env.CONTACT_TO_EMAIL || siteConfig.email.value,
        siteLocale: typeof raw.locale === 'string' ? raw.locale.slice(0, 5) : null,
        receivedAt: new Date().toISOString(),
      }),
    })
    if (!res.ok) throw new Error(`webhook responded ${res.status}`)
  } catch (error) {
    const kind = error instanceof Error ? `${error.name}: ${error.message}` : 'unknown'
    console.error('[contact] delivery failed', kind)
    return reply({ error: 'delivery_failed' }, 502)
  }

  // Provider accepted the request. That is NOT proof of mailbox delivery; verify with a real test.
  return reply({ ok: true })
}
