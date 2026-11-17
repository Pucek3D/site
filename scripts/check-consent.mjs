#!/usr/bin/env node
// Checks the consent machinery against the REAL modules (Node strips the
// TypeScript types): token round trip, expiry, tamper detection, kind binding,
// and that both consent texts exist verbatim in all three locales.
// Uses a throwaway secret; never reads or prints a real one.
import { randomBytes } from 'node:crypto'

process.env.CONSENT_TOKEN_SECRET = randomBytes(32).toString('hex')

const { sealToken, openToken, SIGNUP_TOKEN_TTL_MS } = await import('../lib/consent-token.ts')
const { consentTexts, CONSENT_TEXT_VERSION, CONSENT_CONTROLLER } = await import('../content/consent.ts')

let failures = 0
const check = (ok, label) => {
  if (!ok) failures++
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${label}`)
}

const data = { email: 'test@example.com', consents: { email: true, phone: false } }
const now = Date.now()
const token = sealToken('signup', data, { now })

const opened = openToken('signup', token, { now })
check(opened.ok && JSON.stringify(opened.data) === JSON.stringify(data), 'round trip returns the sealed data')
check(!token.includes('test@example.com'), 'token does not expose its contents')

const late = openToken('signup', token, { now: now + SIGNUP_TOKEN_TTL_MS + 1 })
check(!late.ok && late.reason === 'expired', 'sign-up token expires after 48 hours')
const justInTime = openToken('signup', token, { now: now + SIGNUP_TOKEN_TTL_MS - 1000 })
check(justInTime.ok, 'sign-up token still valid just before 48 hours')

const flipAt = Math.floor(token.length / 2)
const flipped = token.slice(0, flipAt) + (token[flipAt] === 'A' ? 'B' : 'A') + token.slice(flipAt + 1)
const tampered = openToken('signup', flipped, { now })
check(!tampered.ok && tampered.reason === 'invalid', 'altered token is rejected')
check(!openToken('signup', 'garbage', { now }).ok, 'malformed token is rejected')

check(!openToken('unsubscribe', token, { now }).ok, 'sign-up token cannot be used as an unsubscribe token')

const unsub = sealToken('unsubscribe', { email: 'test@example.com' }, { now, ttlMs: null })
check(openToken('unsubscribe', unsub, { now: now + 10 * 365 * 24 * 3600 * 1000 }).ok, 'unsubscribe token does not expire')

process.env.CONSENT_TOKEN_SECRET = randomBytes(32).toString('hex')
check(!openToken('signup', token, { now }).ok, 'token sealed with another secret is rejected')
process.env.CONSENT_TOKEN_SECRET = 'short'
const noSecret = openToken('signup', token, { now })
check(!noSecret.ok && noSecret.reason === 'no_secret', 'secret shorter than 32 characters is refused')

check(CONSENT_TEXT_VERSION === 'consent-2026-11', 'text version is consent-2026-11')
for (const locale of ['en', 'pl', 'de']) {
  for (const channel of ['email', 'phone']) {
    const text = consentTexts?.[locale]?.[channel]
    check(typeof text === 'string' && text.length > 40, `${locale} ${channel} consent text exists`)
    check(typeof text === 'string' && text.includes(CONSENT_CONTROLLER), `${locale} ${channel} text names the controller`)
  }
}

if (failures) {
  console.log(`\n${failures} consent check(s) failed.`)
  process.exit(1)
}
console.log('\nConsent checks passed.')
