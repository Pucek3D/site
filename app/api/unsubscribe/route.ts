import { createHash, randomUUID } from 'node:crypto'
import { createRateLimiter, honeypotTripped, originAllowed, readJsonObject, reply, trustedClientIp } from '@/lib/api-guard'
import { registerConsent, retainUntilFrom } from '@/lib/consent-register'
import { openToken } from '@/lib/consent-token'
import { CONSENT_TEXT_VERSION } from '@/content/consent'
import { isLocale } from '@/lib/i18n'
import { subscribeEnabled } from '@/lib/subscribe-config'
import { validateUnsubscribe } from '@/lib/validation'

/**
 * Withdrawal: one e-mail field, no login, no confirmation step. Writes a
 * "withdrawn" record through the same register; success only once it is accepted.
 */
export const runtime = 'nodejs'

const GLOBAL_MAX = 60
const MAX_PER_KEY = 10
const MAX_BODY_BYTES = 4 * 1024
const rateLimited = createRateLimiter()

export async function POST(request: Request) {
  if (!subscribeEnabled()) return reply({ error: 'not_found' }, 404)
  if (!originAllowed(request)) return reply({ error: 'forbidden' }, 403)
  if (rateLimited('global', GLOBAL_MAX)) return reply({ error: 'rate_limited' }, 429)
  const ip = trustedClientIp(request)
  if (ip && rateLimited(`ip:${ip}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)

  const body = await readJsonObject(request, MAX_BODY_BYTES)
  if ('response' in body) return body.response
  const { raw } = body

  // Prefill only: decode the address from an e-mail link so the field shows it. Records nothing.
  if (raw.action === 'prefill') {
    const opened = openToken<{ email: string }>('unsubscribe', raw.token)
    if (!opened.ok) return reply({ error: opened.reason }, opened.reason === 'no_secret' ? 503 : 400)
    return reply({ email: opened.data.email })
  }

  if (honeypotTripped(raw)) return reply({ ok: true })

  const result = validateUnsubscribe(raw)
  if (!result.ok) return reply({ errors: result.errors }, 422)
  const email = result.data.email
  const locale = typeof raw.locale === 'string' && isLocale(raw.locale) ? raw.locale : 'en'
  const now = new Date().toISOString()

  const registered = await registerConsent({
    id: randomUUID(),
    // One withdrawal per address per day is enough for the register to de-duplicate.
    idempotencyKey: createHash('sha256').update(`withdraw:${email.toLowerCase()}:${now.slice(0, 10)}`).digest('hex'),
    textVersion: CONSENT_TEXT_VERSION,
    locale,
    email,
    consents: { email: false, phone: false },
    consentTexts: {},
    sourcePath: `/${locale}/unsubscribe`,
    submittedAt: now,
    status: 'withdrawn',
    withdrawnAt: now,
    retainUntil: retainUntilFrom(now),
  })
  if (!registered.ok) return reply({ error: registered.reason }, registered.reason === 'not_configured' ? 503 : 502)
  return reply({ ok: true })
}
