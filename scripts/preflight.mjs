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
if (!smtpReady && !env.CONTACT_WEBHOOK_URL) {
  blockers.push(
    'No contact delivery method is configured (SMTP_* or CONTACT_WEBHOOK_URL): the form shows its failure state for every inquiry. ' +
      'Configure one and confirm a real message reaches contact@adeliercommerce.com.',
  )
}
if (!smtpReady && env.CONTACT_WEBHOOK_URL) {
  warnings.push('Delivery uses CONTACT_WEBHOOK_URL. A webhook accepting the request does not prove the mailbox received it.')
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

for (const w of warnings) console.log(`WARN    ${w}`)
for (const b of blockers) console.log(`BLOCKER ${b}`)
if (blockers.length) {
  console.log(`\n${blockers.length} release blocker(s). Not production-ready.`)
  process.exit(1)
}
console.log('Preflight passed (configuration only). Still verify the six legal URLs return 200 and send one real test inquiry.')
