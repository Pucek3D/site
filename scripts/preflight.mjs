#!/usr/bin/env node
// Production release preflight. Reports blockers; changes nothing.
// It checks CONFIGURATION only. Passing it does not prove the site works:
// still check the live URLs and send one real test inquiry.
// Run with the production environment loaded, e.g.:
//   node --env-file-if-exists=.env.production scripts/preflight.mjs
// `pnpm release` runs it before the build, so a public build cannot be made
// while it fails. Ordinary `pnpm dev` / `pnpm build` are not affected.
const env = process.env
const blockers = []
const warnings = []

if (env.LEGAL_PUBLISH_APPROVED !== 'true') {
  blockers.push(
    'LEGAL_PUBLISH_APPROVED is not "true": /en|pl|de/privacy and /en|pl|de/legal return 404, ' +
      'and the contact form links to the Privacy Notice. Set it only after the owner approves the legal text and address.',
  )
}

const smtpKeys = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM']
const smtpSet = smtpKeys.filter((k) => env[k])
if (smtpSet.length > 0 && smtpSet.length < smtpKeys.length) {
  blockers.push(`SMTP is partly configured; missing: ${smtpKeys.filter((k) => !env[k]).join(', ')}.`)
}
const smtpReady = smtpSet.length === smtpKeys.length
if (!smtpReady) {
  blockers.push(
    'Contact delivery is not configured (SMTP_*): the form shows its failure state for every inquiry. ' +
      'Configure the VH.PL mailbox and confirm a real message reaches contact@adeliercommerce.com.',
  )
}
if (env.CONTACT_WEBHOOK_URL) {
  warnings.push('CONTACT_WEBHOOK_URL is set but ignored: the form delivers only through SMTP, as the privacy notice states.')
}

if (!env.CONTACT_TRUSTED_IP_HEADER) {
  warnings.push(
    'CONTACT_TRUSTED_IP_HEADER is not set: rate limiting falls back to per-email-address plus a site-wide brake. ' +
      'Set it only to the header the hosting proxy itself writes.',
  )
}

if (env.LEGAL_REVIEW_TOKEN && env.LEGAL_REVIEW_TOKEN.length < 24) {
  warnings.push('LEGAL_REVIEW_TOKEN is shorter than 24 characters and is ignored.')
}

const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://adeliercommerce.com'
if (siteUrl.replace(/\/$/, '') !== 'https://adeliercommerce.com') {
  blockers.push(`NEXT_PUBLIC_SITE_URL is "${siteUrl}", not the owner-confirmed canonical https://adeliercommerce.com.`)
}
if (env.SEO_NOINDEX === 'true') blockers.push('SEO_NOINDEX is true: the production site would be hidden from search engines.')

if (env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
  blockers.push('NEXT_PUBLIC_ANALYTICS_ENABLED is true, but no provider or consent mechanism is documented.')
}

if (env.SUBSCRIBE_ENABLED === 'true') {
  if (!env.CONSENT_TOKEN_SECRET || env.CONSENT_TOKEN_SECRET.length < 32) {
    blockers.push('SUBSCRIBE_ENABLED is true but CONSENT_TOKEN_SECRET is missing or shorter than 32 characters.')
  }
  if (!smtpReady) {
    blockers.push('SUBSCRIBE_ENABLED is true but SMTP_* is not configured: consent records cannot reach the register and every sign-up would fail.')
  }
  const consentLog = env.CONSENT_LOG_EMAIL?.trim().toLowerCase()
  const inquiry = [env.CONTACT_TO_EMAIL, 'contact@adeliercommerce.com'].map((a) => a?.trim().toLowerCase())
  if (!consentLog) {
    blockers.push('SUBSCRIBE_ENABLED is true but CONSENT_LOG_EMAIL is empty: the consent register needs its own dedicated address.')
  } else if (inquiry.includes(consentLog)) {
    blockers.push('CONSENT_LOG_EMAIL must be a dedicated address, not the inquiry mailbox: the monthly inquiry cleanup would delete proof of consent.')
  }
  if (env.CONSENT_WEBHOOK_URL) {
    warnings.push('CONSENT_WEBHOOK_URL is set but unused: the register is the CONSENT_LOG_EMAIL mailbox only.')
  }
  if (env.LEGAL_PUBLISH_APPROVED !== 'true') {
    blockers.push('SUBSCRIBE_ENABLED is true but LEGAL_PUBLISH_APPROVED is not "true": the sign-up form links to an unpublished Privacy Notice.')
  }
  const { readFileSync } = await import('node:fs')
  for (const locale of ['en', 'pl', 'de']) {
    const path = `content/legal/${locale}/privacy.md`
    let text = ''
    try {
      text = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
    } catch {
      blockers.push(`SUBSCRIBE_ENABLED is true but ${path} could not be read.`)
      continue
    }
    const count = (text.match(/TODO-CONFIRM/g) || []).length
    if (count) blockers.push(`SUBSCRIBE_ENABLED is true but ${path} still contains ${count} TODO-CONFIRM marker(s).`)
  }
}

for (const w of warnings) console.log(`WARN    ${w}`)
for (const b of blockers) console.log(`BLOCKER ${b}`)
if (blockers.length) {
  console.log(`\n${blockers.length} release blocker(s). Not production-ready.`)
  process.exit(1)
}
console.log('Preflight passed (configuration only). Still verify the six legal URLs return 200 and send one real test inquiry.')
