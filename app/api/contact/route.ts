import { createHash } from 'node:crypto'
import nodemailer from 'nodemailer'
import {
  createRateLimiter,
  DELIVERY_TIMEOUT_MS,
  errorKind,
  honeypotTripped,
  oneLine,
  originAllowed,
  readJsonObject,
  reply,
  smtpSettings,
  trustedClientIp,
  withTimeout,
} from '@/lib/api-guard'
import { validateContact, type ContactInput } from '@/lib/validation'
import { siteConfig } from '@/lib/site-config'

/**
 * Validates with the SAME schema as the browser, then delivers by:
 *   authenticated SMTP through the VH.PL mailbox (SMTP_HOST/USER/PASS/FROM all set), else
 *   refuses with 503. A "thank you" for a dropped inquiry is the worst failure here.
 * There is deliberately no webhook or third-party fallback: the privacy notice states that
 * no separate form or forwarding service is used, and this route must keep that true.
 *
 * Origin, rate-limit, IP and body-size rules live in lib/api-guard.ts (shared with
 * the subscribe routes). This route keeps its own limiter, so its limits are unchanged.
 * Submissions are never logged; only status codes and error kinds are.
 */
export const runtime = 'nodejs'

const MAX_PER_KEY = 5
const GLOBAL_MAX = 60
const MAX_BODY_BYTES = 16 * 1024
const rateLimited = createRateLimiter()

function renderInquiry(d: Omit<ContactInput, 'company_url'>, siteLocale: string | null, receivedAt: string) {
  const subject = oneLine(`Website inquiry (${d.topic}): ${d.name}, ${d.company}`).slice(0, 180)
  const text = [
    `Topic: ${d.topic}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Company: ${d.company}`,
    `Role: ${d.role || '-'}`,
    `Website: ${d.website || '-'}`,
    `Preferred language: ${d.language}`,
    `Site language: ${siteLocale ?? '-'}`,
    `Received: ${receivedAt}`,
    '',
    d.improve,
  ].join('\n')
  return { subject, text }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) return reply({ error: 'forbidden' }, 403)
  if (rateLimited('global', GLOBAL_MAX)) return reply({ error: 'rate_limited' }, 429)

  const ip = trustedClientIp(request)
  if (ip && rateLimited(`ip:${ip}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)

  const body = await readJsonObject(request, MAX_BODY_BYTES)
  if ('response' in body) return body.response
  const { raw } = body

  // Honeypot filled: accept silently so bots learn nothing.
  if (honeypotTripped(raw)) return reply({ ok: true })

  const result = validateContact(raw)
  if (!result.ok) return reply({ errors: result.errors }, 422)

  const { company_url: _honeypot, ...inquiry } = result.data
  if (!ip) {
    const emailKey = createHash('sha256').update(inquiry.email.toLowerCase()).digest('hex')
    if (rateLimited(`email:${emailKey}`, MAX_PER_KEY)) return reply({ error: 'rate_limited' }, 429)
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email.value
  const siteLocale = typeof raw.locale === 'string' ? raw.locale.slice(0, 5) : null
  const receivedAt = new Date().toISOString()
  const smtp = smtpSettings()

  if (!smtp) {
    console.error('[contact] no delivery method configured; inquiry not delivered')
    return reply({ error: 'not_configured' }, 503)
  }

  try {
    {
      const { subject, text } = renderInquiry(inquiry, siteLocale, receivedAt)
      const transport = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: { user: smtp.user, pass: smtp.pass },
        connectionTimeout: DELIVERY_TIMEOUT_MS,
        greetingTimeout: DELIVERY_TIMEOUT_MS,
        socketTimeout: DELIVERY_TIMEOUT_MS,
      })
      // Sent FROM the authenticated mailbox; the visitor is only the Reply-To.
      await withTimeout(
        transport.sendMail({
          from: smtp.from,
          to,
          replyTo: { name: oneLine(inquiry.name), address: inquiry.email },
          subject,
          text,
        }),
      )
    }
  } catch (error) {
    console.error('[contact] delivery failed', errorKind(error))
    return reply({ error: 'delivery_failed' }, 502)
  }

  // Accepted by the SMTP server. That is NOT proof of mailbox delivery; verify with a real test.
  return reply({ ok: true })
}
