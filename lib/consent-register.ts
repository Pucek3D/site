import nodemailer from 'nodemailer'
import { DELIVERY_TIMEOUT_MS, errorKind, smtpSettings, withTimeout } from './api-guard'
import { siteConfig } from './site-config'
import type { Locale } from './i18n'

/**
 * The consent register adapter. There is no database: every confirmed consent and
 * every withdrawal is delivered as one record to
 *   - CONSENT_WEBHOOK_URL as JSON (Authorization: Bearer CONSENT_WEBHOOK_SECRET if set), and/or
 *   - CONSENT_LOG_EMAIL (default CONTACT_TO_EMAIL) as a plain-text e-mail via the site's SMTP.
 * Both are attempted when configured; the record counts as delivered when at least one
 * accepted it. `idempotencyKey` lets the register ignore duplicates (for example a
 * double click on "Confirm").
 *
 * Records are never logged. Failures log the error kind only.
 */

export type ConsentRecord = {
  id: string
  idempotencyKey: string
  textVersion: string
  locale: Locale
  email: string
  name?: string
  company?: string
  /** Present only when phone consent was given. */
  phone?: string
  consents: { email: boolean; phone: boolean }
  /** The exact wording shown for each consent that was given. */
  consentTexts: { email?: string; phone?: string }
  magnetId?: string
  sourcePath: string
  submittedAt: string
  submitIp?: string
  submitUserAgent?: string
  confirmedAt?: string
  confirmIp?: string
  confirmUserAgent?: string
  status: 'confirmed' | 'withdrawn'
  withdrawnAt?: string
}

export type RegisterResult = { ok: true } | { ok: false; reason: 'not_configured' | 'delivery_failed' }

export function registerConfigured() {
  return Boolean(process.env.CONSENT_WEBHOOK_URL) || Boolean(smtpSettings())
}

export function createTransport() {
  const smtp = smtpSettings()
  if (!smtp) return null
  return {
    from: smtp.from,
    transport: nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
      connectionTimeout: DELIVERY_TIMEOUT_MS,
      greetingTimeout: DELIVERY_TIMEOUT_MS,
      socketTimeout: DELIVERY_TIMEOUT_MS,
    }),
  }
}

function renderRecord(r: ConsentRecord) {
  const lines: [string, string | undefined][] = [
    ['Status', r.status],
    ['Record id', r.id],
    ['Idempotency key', r.idempotencyKey],
    ['Text version', r.textVersion],
    ['Locale', r.locale],
    ['Email', r.email],
    ['Name', r.name],
    ['Company', r.company],
    ['Phone', r.phone],
    ['Consent: e-mail', String(r.consents.email)],
    ['Consent: phone', String(r.consents.phone)],
    ['Lead magnet', r.magnetId],
    ['Source path', r.sourcePath],
    ['Submitted at', r.submittedAt],
    ['Submit IP', r.submitIp],
    ['Submit user agent', r.submitUserAgent],
    ['Confirmed at', r.confirmedAt],
    ['Confirm IP', r.confirmIp],
    ['Confirm user agent', r.confirmUserAgent],
    ['Withdrawn at', r.withdrawnAt],
  ]
  const body = lines.filter(([, v]) => v !== undefined && v !== '').map(([k, v]) => `${k}: ${v}`)
  if (r.consentTexts.email) body.push('', 'Consent text shown (e-mail):', r.consentTexts.email)
  if (r.consentTexts.phone) body.push('', 'Consent text shown (phone):', r.consentTexts.phone)
  body.push('', 'Machine-readable record:', JSON.stringify(r))
  return body.join('\n')
}

export async function registerConsent(record: ConsentRecord): Promise<RegisterResult> {
  const webhook = process.env.CONSENT_WEBHOOK_URL
  const mail = createTransport()
  if (!webhook && !mail) {
    console.error('[consent] no register configured; record not delivered')
    return { ok: false, reason: 'not_configured' }
  }

  const attempts: Promise<void>[] = []
  if (webhook) {
    attempts.push(
      (async () => {
        const headers: Record<string, string> = { 'content-type': 'application/json', 'idempotency-key': record.idempotencyKey }
        if (process.env.CONSENT_WEBHOOK_SECRET) headers.authorization = `Bearer ${process.env.CONSENT_WEBHOOK_SECRET}`
        const res = await fetch(webhook, {
          method: 'POST',
          headers,
          signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
          body: JSON.stringify(record),
        })
        if (!res.ok) throw Object.assign(new Error('webhook rejected'), { code: `HTTP_${res.status}` })
      })(),
    )
  }
  if (mail) {
    const to = process.env.CONSENT_LOG_EMAIL || process.env.CONTACT_TO_EMAIL || siteConfig.email.value
    attempts.push(
      withTimeout(
        mail.transport.sendMail({
          from: mail.from,
          to,
          subject: `Consent register: ${record.status} (${record.idempotencyKey.slice(0, 12)})`,
          text: renderRecord(record),
        }),
      ).then(() => undefined),
    )
  }

  const results = await Promise.allSettled(attempts)
  for (const r of results) if (r.status === 'rejected') console.error('[consent] register delivery failed', errorKind(r.reason))
  return results.some((r) => r.status === 'fulfilled') ? { ok: true } : { ok: false, reason: 'delivery_failed' }
}
