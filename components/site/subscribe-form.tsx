'use client'

import { MailCheck } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, type FormEvent } from 'react'
import type { Dictionary } from '@/content'
import { NOTICE_LINK_PHRASE, consentNotice, consentTexts, type ConsentChannel } from '@/content/consent'
import { href, type Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { validateSubscribe, type SubscribeFieldErrors } from '@/lib/validation'
import { ErrorSummary, Field, Honeypot, ResultPanel, a11y, inputClass } from './consent-form-kit'
import { ctaClass } from './primitives'

type Status = 'idle' | 'submitting' | 'check' | 'failure'
type FieldKey = keyof SubscribeFieldErrors

/**
 * Double opt-in sign-up. Both consent boxes start unticked, are separate per channel and
 * show the exact text that is stored. Submitting sends a confirmation link only; nothing
 * is recorded as consent until that link is confirmed.
 */
export function SubscribeForm({
  locale,
  dict,
  magnet,
}: {
  locale: Locale
  dict: Dictionary
  /** Lead-magnet mode: e-mail consent becomes optional and the material is sent after confirmation. */
  magnet: { id: string; title: string } | null
}) {
  const f = dict.subscribe.form
  const texts = consentTexts[locale]
  const notice = consentNotice(locale, siteConfig.operator.name)
  const linkPhrase = NOTICE_LINK_PHRASE[locale]
  const linkAt = notice.lastIndexOf(linkPhrase)
  const noticeBefore = notice.slice(0, linkAt)
  const noticeAfter = notice.slice(linkAt + linkPhrase.length)
  const [consent, setConsent] = useState<Record<ConsentChannel, boolean>>({ email: false, phone: false })
  const [errors, setErrors] = useState<SubscribeFieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sentTo, setSentTo] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const err = (k: FieldKey) => (errors[k] ? f.errors[errors[k]!] : undefined)

  function showErrors(next: SubscribeFieldErrors) {
    setErrors(next)
    setStatus('idle')
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const raw: Record<string, unknown> = {
      email: fd.get('email') ?? '',
      name: fd.get('name') ?? '',
      company: fd.get('company') ?? '',
      company_url: fd.get('company_url') ?? '',
      consentEmail: consent.email,
      consentPhone: consent.phone,
      // The number leaves the browser only when phone consent is given.
      ...(consent.phone ? { phone: fd.get('phone') ?? '' } : {}),
      ...(magnet ? { magnet: magnet.id } : {}),
    }
    const result = validateSubscribe(raw)
    if (!result.ok) return showErrors(result.errors)

    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...raw, locale, sourcePath: window.location.pathname }),
      })
      if (res.status === 422) {
        const body = (await res.json()) as { errors?: SubscribeFieldErrors }
        return showErrors(body.errors ?? {})
      }
      if (!res.ok) throw new Error(String(res.status))
      setSentTo(String(raw.email).trim())
      setStatus('check')
      requestAnimationFrame(() => resultRef.current?.focus())
    } catch {
      setStatus('failure')
      requestAnimationFrame(() => resultRef.current?.focus())
    }
  }

  if (status === 'check') {
    return (
      <ResultPanel resultRef={resultRef} tone="success" title={f.checkTitle} icon={<MailCheck aria-hidden className="size-7 text-ink" />}>
        <p>{f.check.replace('{email}', sentTo)}</p>
      </ResultPanel>
    )
  }

  const labels: Record<FieldKey, string> = {
    email: f.email,
    name: f.name,
    company: f.company,
    consentEmail: f.consentEmailLabel,
    phone: f.phone,
    magnet: f.email,
  }
  const summaryItems = (Object.keys(errors) as FieldKey[]).map((k) => ({ id: k, text: `${labels[k]}: ${err(k)}` }))
  const emailConsentRequired = !magnet

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
      <ErrorSummary
        summaryRef={summaryRef}
        title={f.errorSummary}
        items={summaryItems}
        onJump={(id) => {
          const el = formRef.current?.querySelector<HTMLElement>(`#${id}`)
          el?.focus()
          el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }}
      />

      {status === 'failure' ? (
        <ResultPanel resultRef={resultRef} tone="failure" title={f.failureTitle}>
          <p className="text-slate">{f.failure}</p>
        </ResultPanel>
      ) : null}

      <fieldset>
        <legend className="mb-5 font-display text-lg font-semibold">{f.aboutYou}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field id="email" label={f.email} error={err('email')}>
              <input id="email" name="email" type="email" autoComplete="email" className={inputClass} {...a11y('email', { error: err('email'), required: true })} />
            </Field>
          </div>
          <Field id="name" label={f.name} optional={f.optional} error={err('name')}>
            <input id="name" name="name" autoComplete="name" className={inputClass} {...a11y('name', { error: err('name') })} />
          </Field>
          <Field id="company" label={f.company} optional={f.optional} error={err('company')}>
            <input id="company" name="company" autoComplete="organization" className={inputClass} {...a11y('company', { error: err('company') })} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="border-t border-hairline pt-10">
        <legend className="float-left mb-5 w-full font-display text-lg font-semibold">{f.consentLegend}</legend>
        <div className="clear-both flex flex-col gap-4">
          <ConsentBox
            id="consentEmail"
            label={f.consentEmailLabel}
            hint={emailConsentRequired ? f.consentRequiredHint : f.consentOptionalHint}
            text={texts.email}
            checked={consent.email}
            required={emailConsentRequired}
            error={err('consentEmail')}
            onChange={(v) => setConsent((c) => ({ ...c, email: v }))}
          />
          <ConsentBox
            id="consentPhone"
            label={f.consentPhoneLabel}
            text={texts.phone}
            checked={consent.phone}
            onChange={(v) => {
              setConsent((c) => ({ ...c, phone: v }))
              if (!v) setErrors(({ phone: _phone, ...rest }) => rest)
            }}
          >
            {consent.phone ? (
              <div className="mt-4 sm:max-w-sm">
                <Field id="phone" label={f.phone} hint={f.phoneHint} error={err('phone')}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className={inputClass}
                    {...a11y('phone', { error: err('phone'), hint: f.phoneHint, required: true })}
                  />
                </Field>
              </div>
            ) : null}
          </ConsentBox>
        </div>
      </fieldset>

      <Honeypot label={f.honeypot} />

      <div className="flex flex-col gap-6 border-t border-hairline pt-8">
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          aria-describedby="subscribe-notice"
          className={cn(ctaClass('primary'), 'min-h-13 w-full px-8 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start')}
        >
          {status === 'submitting' ? f.submitting : f.submit}
        </button>

        <section id="subscribe-notice" aria-labelledby="subscribe-notice-title" className="rounded-xl border border-hairline bg-white p-5">
          <h2 id="subscribe-notice-title" className="text-sm font-semibold text-ink">
            {f.noticeTitle}
          </h2>
          {/* Rendered from the same string that is stored as consentTexts.notice; the link only wraps a substring of it. */}
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-slate">
            {noticeBefore}
            <Link href={href(locale, 'privacy')} className="font-semibold text-cobalt underline underline-offset-4">
              {linkPhrase}
            </Link>
            {noticeAfter}
          </p>
          <p className="mt-2 text-sm">
            <Link href={`/${locale}/unsubscribe`} className="font-semibold text-cobalt underline underline-offset-4">
              {f.noticeUnsubscribeLink}
            </Link>
          </p>
        </section>
      </div>
    </form>
  )
}

/** One channel, one box. The full consent text is the label's description, never hidden behind a tooltip. */
function ConsentBox({
  id,
  label,
  hint,
  text,
  checked,
  required,
  error,
  onChange,
  children,
}: {
  id: string
  label: string
  hint?: string
  text: string
  checked: boolean
  required?: boolean
  error?: string
  onChange: (v: boolean) => void
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white p-4 transition-colors sm:p-5',
        error ? 'border-destructive' : checked ? 'border-cobalt' : 'border-hairline',
      )}
    >
      {/* The whole label row is the hit area: well over 44px tall, with the box itself in a 44px target. */}
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-required={required || undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={[`${id}-text`, hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ')}
            className="size-5 cursor-pointer rounded accent-[var(--color-cobalt)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt/30 focus-visible:ring-offset-2"
          />
        </span>
        <span className="flex flex-col gap-1.5 pt-2.5">
          <span className="font-semibold text-ink">{label}</span>
          <span id={`${id}-text`} className="text-pretty text-[0.9375rem] leading-relaxed text-ink">
            {text}
          </span>
          {hint ? (
            <span id={`${id}-hint`} className="text-sm text-slate">
              {hint}
            </span>
          ) : null}
        </span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-2 pl-14 text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
      {children ? <div className="pl-14">{children}</div> : null}
    </div>
  )
}
