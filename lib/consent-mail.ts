import { getDictionary } from '@/content'
import { withTimeout } from './api-guard'
import { createTransport } from './consent-register'
import { href, type Locale } from './i18n'
import { siteConfig } from './site-config'

/**
 * Plain-text e-mails for the consent flow, sent from the authenticated SMTP mailbox.
 * The confirmation e-mail carries NO marketing and exactly two links: the confirm
 * link and the privacy notice. Nothing here is logged.
 */

function sender(from: string) {
  // SMTP_FROM is the authenticated mailbox; the display name is the site identity.
  const address = from.match(/<([^>]+)>/)?.[1] ?? from
  return `"${siteConfig.name}" <${address}>`
}

export async function sendConfirmation(opts: { to: string; locale: Locale; origin: string; token: string }) {
  const mail = createTransport()
  if (!mail) return false
  const e = getDictionary(opts.locale).subscribe.emails
  const confirmUrl = `${opts.origin}${href(opts.locale, 'subscribe', '/confirm')}#t=${opts.token}`
  const privacyUrl = `${opts.origin}${href(opts.locale, 'privacy')}`
  const text = [e.greeting, '', e.confirmIntro, '', confirmUrl, '', e.confirmValidity, '', e.notYou, '', `${e.privacy} ${privacyUrl}`, '', e.signoff].join('\n')
  await withTimeout(mail.transport.sendMail({ from: sender(mail.from), to: opts.to, subject: e.confirmSubject, text }))
  return true
}

export async function sendMagnet(opts: {
  to: string
  locale: Locale
  origin: string
  magnet: { title: string; url: string }
  unsubscribeToken: string | null
}) {
  const mail = createTransport()
  if (!mail) return false
  const e = getDictionary(opts.locale).subscribe.emails
  const privacyUrl = `${opts.origin}${href(opts.locale, 'privacy')}`
  const lines = [e.greeting, '', e.magnetIntro, '', `${opts.magnet.title}: ${opts.magnet.url}`, '', `${e.privacy} ${privacyUrl}`, '', e.signoff]
  const headers: Record<string, string> = {}
  if (opts.unsubscribeToken) {
    // Only a person with marketing consent gets an unsubscribe link: they are the only ones on a list.
    const unsubscribeUrl = `${opts.origin}/${opts.locale}/unsubscribe#t=${opts.unsubscribeToken}`
    lines.splice(lines.length - 2, 0, unsubscribeUrl, '')
    headers['List-Unsubscribe'] = `<${unsubscribeUrl}>, <mailto:${siteConfig.email.value}?subject=unsubscribe>`
  }
  await withTimeout(mail.transport.sendMail({ from: sender(mail.from), to: opts.to, subject: e.magnetSubject, text: lines.join('\n'), headers }))
  return true
}
