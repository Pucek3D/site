#!/usr/bin/env node
// Production release preflight. Reports blockers; changes nothing.
// Run with the production environment loaded, e.g.:
//   node --env-file-if-exists=.env.production scripts/preflight.mjs
const env = process.env
const blockers = []
const warnings = []

if (env.LEGAL_PUBLISH_APPROVED !== 'true') {
  blockers.push(
    'LEGAL_PUBLISH_APPROVED is not "true": /en|pl|de/privacy and /en|pl|de/legal will return 404, ' +
      'and the contact form links to the Privacy Notice. Set it only after the owner approves the legal text and address.',
  )
}

if (!env.CONTACT_WEBHOOK_URL) {
  blockers.push(
    'CONTACT_WEBHOOK_URL is not set: the contact form cannot deliver inquiries (SMTP is not implemented). ' +
      'Configure a verified delivery provider and confirm a real message reaches contact@deliercommerce.com.',
  )
}

if (env.SMTP_HOST || env.SMTP_USER || env.SMTP_PASS) {
  warnings.push('SMTP_* variables are set but no SMTP transport is implemented; they are ignored.')
}

const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://deliercommerce.com'
if (siteUrl.replace(/\/$/, '') !== 'https://deliercommerce.com') {
  warnings.push(`NEXT_PUBLIC_SITE_URL is "${siteUrl}", not the canonical https://deliercommerce.com.`)
}

if (env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
  blockers.push('NEXT_PUBLIC_ANALYTICS_ENABLED is true, but no provider is documented in the privacy notices.')
}

for (const w of warnings) console.log(`WARN    ${w}`)
for (const b of blockers) console.log(`BLOCKER ${b}`)
if (blockers.length) {
  console.log(`\n${blockers.length} release blocker(s). Not production-ready.`)
  process.exit(1)
}
console.log('Preflight passed. Still verify the live URLs return 200 and send one real test inquiry.')
