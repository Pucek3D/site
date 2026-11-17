import { randomUUID } from 'node:crypto'
import { createRateLimiter, errorKind, linkOrigin, originAllowed, readJsonObject, reply, trustedClientIp } from '@/lib/api-guard'
import { sendMagnet } from '@/lib/consent-mail'
import { registerConsent, type ConsentRecord } from '@/lib/consent-register'
import { idempotencyKeyFor, openToken, sealToken } from '@/lib/consent-token'
import { CONSENT_TEXT_VERSION, consentNotice, consentTexts } from '@/content/consent'
import { siteConfig } from '@/lib/site-config'
import { findLeadMagnet } from '@/content/lead-magnets'
import { subscribeEnabled } from '@/lib/subscribe-config'
import type { SignupPayload } from '../route'

/**
 * Step 2 of double opt-in. Called only when the person presses "Confirm" on the
 * confirm page, so link scanners that open the e-mail link confirm nothing.
 * Success is returned only once the register accepted the record.
 */
export const runtime = 'nodejs'

const GLOBAL_MAX = 60
const MAX_PER_KEY = 10
const MAX_BODY_BYTES = 12 * 1024
const rateLimited = createRateLimiter()

export async function POST(request: Request) {
  if (!subscribeEnabled()) return reply({ error: 'not_found' }, 404)
  if (!originAllowed(request)) return reply({ error: 'forbidden' }, 403)
  if (rateLimited('global', GLOBAL_MAX)) return reply({ error: 'rate_limited' }, 429)
  const ip = trustedClientIp(request)
  if (ip && rateLimited(`ip:${ip}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)

  const body = await readJsonObject(request, MAX_BODY_BYTES)
  if ('response' in body) return body.response
  const token = body.raw.token

  const opened = openToken<SignupPayload>('signup', token)
  if (!opened.ok) {
    if (opened.reason === 'no_secret') return reply({ error: 'not_configured' }, 503)
    return reply({ error: opened.reason }, opened.reason === 'expired' ? 410 : 400)
  }
  const p = opened.data
  const idempotencyKey = idempotencyKeyFor(token as string)
  const magnet = p.magnetId ? findLeadMagnet(p.magnetId, p.locale) : null
  const hasConsent = p.consents.email || p.consents.phone
  const now = new Date().toISOString()
  const ua = request.headers.get('user-agent')?.slice(0, 300)

  // Lead magnet without consent: deliver the material only, no marketing record.
  if (hasConsent) {
    const texts = consentTexts[p.locale]
    const record: ConsentRecord = {
      id: randomUUID(),
      idempotencyKey,
      textVersion: CONSENT_TEXT_VERSION,
      locale: p.locale,
      email: p.email,
      ...(p.name ? { name: p.name } : {}),
      ...(p.company ? { company: p.company } : {}),
      ...(p.consents.phone && p.phone ? { phone: p.phone } : {}),
      consents: { email: p.consents.email, phone: p.consents.phone },
      consentTexts: {
        ...(p.consents.email ? { email: texts.email } : {}),
        ...(p.consents.phone ? { phone: texts.phone } : {}),
        notice: consentNotice(p.locale, siteConfig.operator.name),
      },
      ...(p.magnetId ? { magnetId: p.magnetId } : {}),
      sourcePath: p.sourcePath,
      submittedAt: p.submittedAt,
      ...(p.submitIp ? { submitIp: p.submitIp } : {}),
      ...(p.submitUserAgent ? { submitUserAgent: p.submitUserAgent } : {}),
      confirmedAt: now,
      ...(ip ? { confirmIp: ip } : {}),
      ...(ip && ua ? { confirmUserAgent: ua } : {}),
      status: 'confirmed',
    }
    const registered = await registerConsent(record)
    if (!registered.ok) return reply({ error: registered.reason }, registered.reason === 'not_configured' ? 503 : 502)
  }

  let magnetSent = false
  if (magnet) {
    try {
      const unsubscribeToken = p.consents.email ? sealToken('unsubscribe', { email: p.email }) : null
      magnetSent = await sendMagnet({ to: p.email, locale: p.locale, origin: linkOrigin(request), magnet, unsubscribeToken })
    } catch (error) {
      console.error('[subscribe] material not sent', errorKind(error))
    }
    // Without consent the material is the whole point; not delivering it is a failure.
    if (!magnetSent && !hasConsent) return reply({ error: 'delivery_failed' }, 502)
  }

  return reply({ ok: true, consent: hasConsent, magnetSent })
}
