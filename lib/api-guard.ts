import { NextResponse } from 'next/server'
import { siteConfig } from './site-config'

/**
 * Request guards shared by the form API routes (contact, subscribe, unsubscribe).
 *
 * - Rate limiting is in memory, so it is per process. That is valid for a single
 *   Node.js process (one cPanel/Passenger app). Several instances would need a
 *   shared store; none is assumed. Each route creates its OWN limiter, so traffic
 *   on one form never consumes another form's budget.
 * - Client IP headers are trusted ONLY when CONTACT_TRUSTED_IP_HEADER names the
 *   header the hosting proxy itself sets. Otherwise no IP is used.
 * - Origin must match a configured trusted origin, never the request's own Host.
 * - Nothing here logs request content.
 */

export const NO_STORE = { 'Cache-Control': 'no-store' }
export const reply = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NO_STORE })

const WINDOW_MS = 10 * 60 * 1000
const MAX_KEYS = 5000

export function createRateLimiter() {
  const hits = new Map<string, number[]>()
  return function rateLimited(key: string, max: number) {
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
}

/** The client IP, read only from the header the hosting proxy is configured to set. */
export function trustedClientIp(request: Request): string | null {
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

export function originAllowed(request: Request) {
  const origin = request.headers.get('origin')
  // Browsers always send Origin on a POST from fetch(); a missing one is not a visitor.
  if (!origin) return process.env.NODE_ENV === 'development'
  try {
    return trustedOrigins(request).has(new URL(origin).origin)
  } catch {
    return false
  }
}

/**
 * The origin links in outgoing e-mails should point at: the request's Origin once
 * originAllowed() has accepted it, otherwise the canonical site URL.
 */
export function linkOrigin(request: Request): string {
  const origin = request.headers.get('origin')
  if (origin && originAllowed(request)) {
    try {
      return new URL(origin).origin
    } catch {
      // fall through
    }
  }
  return siteConfig.url
}

/** Reads a JSON object body under a byte limit. Returns the object, or the response to send instead. */
export async function readJsonObject(
  request: Request,
  maxBytes: number,
): Promise<{ raw: Record<string, unknown> } | { response: NextResponse }> {
  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > maxBytes) return { response: reply({ error: 'too_large' }, 413) }
  try {
    const text = await request.text()
    if (new TextEncoder().encode(text).length > maxBytes) return { response: reply({ error: 'too_large' }, 413) }
    const parsed: unknown = JSON.parse(text)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object')
    return { raw: parsed as Record<string, unknown> }
  } catch {
    return { response: reply({ error: 'invalid_json' }, 400) }
  }
}

/** Honeypot filled: the caller should accept silently so bots learn nothing. */
export function honeypotTripped(raw: Record<string, unknown>, field = 'company_url') {
  const value = raw[field]
  return typeof value === 'string' && value.length > 0
}

export function smtpSettings() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) return null
  const port = Number(process.env.SMTP_PORT || 465)
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465
  return { host: SMTP_HOST, port, secure, user: SMTP_USER, pass: SMTP_PASS, from: SMTP_FROM }
}

export const DELIVERY_TIMEOUT_MS = 8000

export const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

export async function withTimeout<T>(promise: Promise<T>) {
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

/** Error kind only: SMTP server responses and webhooks can echo addresses or content. */
export function errorKind(error: unknown) {
  const e = error as { name?: string; code?: string }
  return e?.code ?? e?.name ?? 'unknown'
}
