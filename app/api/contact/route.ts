import { NextResponse } from 'next/server'
import { validateContact } from '@/lib/validation'

/**
 * Validates with the SAME schema as the browser, then forwards to
 * CONTACT_WEBHOOK_URL (Zapier, Make, Slack, a CRM inbox…). With no webhook
 * configured the route refuses rather than reporting a delivery that never
 * happened — a "thank you" for a dropped inquiry is the worst failure here.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  let raw: Record<string, unknown>
  try {
    raw = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot filled: accept silently so bots learn nothing.
  if (typeof raw.company_url === 'string' && raw.company_url.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const result = validateContact(raw)
  if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: 422 })

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (!webhook) {
    console.error('[contact] CONTACT_WEBHOOK_URL is not set; inquiry not delivered')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const { company_url: _honeypot, ...inquiry } = result.data
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...inquiry,
        siteLocale: typeof raw.locale === 'string' ? raw.locale : null,
        receivedAt: new Date().toISOString(),
      }),
    })
    if (!res.ok) throw new Error(`webhook ${res.status}`)
  } catch (error) {
    console.error('[contact] delivery failed', error)
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
