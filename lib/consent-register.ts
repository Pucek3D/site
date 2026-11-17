import nodemailer from 'nodemailer'
import { DELIVERY_TIMEOUT_MS, errorKind, smtpSettings, withTimeout } from './api-guard'
import { siteConfig } from './site-config'
import type { Locale } from './i18n'

/**
 * The consent register adapter. There is no database and no webhook: the register
 * is the VH.PL mailbox. Every confirmed consent and every withdrawal is e-mailed as
 * one plain-text record, via the site's SMTP, to CONSENT_LOG_EMAIL, a dedicated
 * address that must differ from the inquiry mailbox so the monthly inquiry cleanup
 * never touches it. Each subject starts with "[CONSENT] confirmed" or
 * "[CONSENT] withdrawn" so a mailbox rule can file it into the consent folder.
 * CONSENT_WEBHOOK_URL is deliberately not read. `idempotencyKey` lets duplicates
 * (for example a double click on "Confirm") be recognised and discarded.
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
  /** The exact wording shown for each consent that was given, plus the information notice shown with them. */
  consentTexts: { email?: string; phone?: string; notice?: string }
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

/** The dedicated register address, or null when missing or shared with the inquiry mailbox. */
export function consentLogAddress(): string | null {
  const to = process.env.CONSENT_LOG_EMAIL?.trim().toLowerCase()
  if (!to) return null
  const inquiry = [process.env.CONTACT_TO_EMAIL, siteConfig.email.value].map((a) => a?.trim().toLowerCase())
  return inquiry.includes(to) ? null : to
}

export function registerConfigured() {
  return Boolean(smtpSettings()) && consentLogAddress() !== null
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
  if (r.consentTexts.notice) body.push('', 'Information notice shown:', r.consentTexts.notice)
  body.push('', 'Machine-readable record:', JSON.stringify(r))
  return body.join('\n')
}

export async function registerConsent(record: ConsentRecord): Promise<RegisterResult> {
  const mail = createTransport()
  const to = consentLogAddress()
  if (!mail || !to) {
    console.error('[consent] no register configured; record not delivered')
    return { ok: false, reason: 'not_configured' }
  }

  try {
    await withTimeout(
      mail.transport.sendMail({
        from: mail.from,
        to,
        subject: consentSubject(record),
        text: renderRecord(record),
      }),
    )
    return { ok: true }
  } catch (err) {
    console.error('[consent] register delivery failed', errorKind(err))
    return { ok: false, reason: 'delivery_failed' }
  }
}

/** "[CONSENT] confirmed …" / "[CONSENT] withdrawn …": the prefix a mailbox rule files on. */
export function consentSubject(record: Pick<ConsentRecord, 'status' | 'idempotencyKey'>) {
  return `[CONSENT] ${record.status} (${record.idempotencyKey.slice(0, 12)})`
}
