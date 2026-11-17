import { createHash } from 'node:crypto'
import { createRateLimiter, errorKind, honeypotTripped, linkOrigin, originAllowed, readJsonObject, reply, trustedClientIp } from '@/lib/api-guard'
import { sendConfirmation } from '@/lib/consent-mail'
import { registerConfigured } from '@/lib/consent-register'
import { sealToken, tokenSecretConfigured } from '@/lib/consent-token'
import { findLeadMagnet } from '@/content/lead-magnets'
import { isLocale } from '@/lib/i18n'
import { subscribeEnabled } from '@/lib/subscribe-config'
import { validateSubscribe } from '@/lib/validation'

/**
 * Step 1 of double opt-in. Nothing is recorded here: the sign-up travels inside an
 * encrypted, 48-hour token in the confirmation e-mail, and only the confirm step
 * writes a record. A "check your inbox" is returned only if that e-mail was sent.
 */
export const runtime = 'nodejs'

const MAX_PER_KEY = 5
const GLOBAL_MAX = 60
const MAX_BODY_BYTES = 8 * 1024
const rateLimited = createRateLimiter()

export type SignupPayload = {
  locale: 'en' | 'pl' | 'de'
  email: string
  name?: string
  company?: string
  phone?: string
  consents: { email: boolean; phone: boolean }
  magnetId?: string
  sourcePath: string
  submittedAt: string
  submitIp?: string
  submitUserAgent?: string
}

export async function POST(request: Request) {
  if (!subscribeEnabled()) return reply({ error: 'not_found' }, 404)
  if (!originAllowed(request)) return reply({ error: 'forbidden' }, 403)
  if (rateLimited('global', GLOBAL_MAX)) return reply({ error: 'rate_limited' }, 429)
  const ip = trustedClientIp(request)
  if (ip && rateLimited(`ip:${ip}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)

  const body = await readJsonObject(request, MAX_BODY_BYTES)
  if ('response' in body) return body.response
  const { raw } = body
  if (honeypotTripped(raw)) return reply({ ok: true })

  const locale = typeof raw.locale === 'string' && isLocale(raw.locale) ? raw.locale : null
  if (!locale) return reply({ error: 'invalid_locale' }, 400)

  const result = validateSubscribe(raw)
  if (!result.ok) return reply({ errors: result.errors }, 422)
  const d = result.data
  const magnet = d.magnet ? findLeadMagnet(d.magnet, locale) : null
  if (d.magnet && !magnet) return reply({ errors: { magnet: 'required' } }, 422)

  if (!ip) {
    const emailKey = createHash('sha256').update(d.email.toLowerCase()).digest('hex')
    if (rateLimited(`email:${emailKey}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)
  }

  // A confirmation that could never be recorded would be a promise we cannot keep.
  if (!tokenSecretConfigured() || !registerConfigured()) {
    console.error('[subscribe] not configured')
    return reply({ error: 'not_configured' }, 503)
  }

  const sourcePath = typeof raw.sourcePath === 'string' && raw.sourcePath.startsWith('/') ? raw.sourcePath.slice(0, 200) : `/${locale}/subscribe`
  const ua = request.headers.get('user-agent')?.slice(0, 300)
  const payload: SignupPayload = {
    locale,
    email: d.email,
    ...(d.name ? { name: d.name } : {}),
    ...(d.company ? { company: d.company } : {}),
    ...(d.consentPhone ? { phone: d.phone } : {}),
    consents: { email: d.consentEmail, phone: d.consentPhone },
    ...(magnet ? { magnetId: magnet.id } : {}),
    sourcePath,
    submittedAt: new Date().toISOString(),
    ...(ip ? { submitIp: ip } : {}),
    ...(ip && ua ? { submitUserAgent: ua } : {}),
  }

  try {
    const token = sealToken('signup', payload)
    const sent = await sendConfirmation({ to: d.email, locale, origin: linkOrigin(request), token })
    if (!sent) return reply({ error: 'not_configured' }, 503)
    return reply({ ok: true })
  } catch (error) {
    console.error('[subscribe] confirmation not sent', errorKind(error))
    return reply({ error: 'delivery_failed' }, 502)
  }
}
