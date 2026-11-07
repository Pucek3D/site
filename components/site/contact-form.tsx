'use client'

import { ChevronDown, CircleCheck, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import type { Dictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { formLanguages, topics, validateContact, type FieldErrors, type Topic } from '@/lib/validation'
import { ctaClass } from './primitives'

type Status = 'idle' | 'submitting' | 'success' | 'failure'

const inputClass =
  'block min-h-12 w-full rounded-lg border border-input bg-white px-4 text-base text-ink transition-colors placeholder:text-slate/70 hover:border-ink/30 focus-visible:border-cobalt focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt/20 aria-[invalid=true]:border-destructive'

export function ContactForm({
  locale,
  dict,
  initialTopic,
}: {
  locale: Locale
  dict: Dictionary
  initialTopic: Topic
}) {
  const f = dict.contact.form
  const [topic, setTopic] = useState<Topic>(initialTopic)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [detailsOpen, setDetailsOpen] = useState(false)

  /** An error inside the collapsed section would otherwise point at a field nobody can see. */
  function showErrors(next: FieldErrors) {
    setErrors(next)
    if (next.role || next.website) setDetailsOpen(true)
  }
  const formRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const err = (k: keyof FieldErrors) => {
    const code = errors[k]
    if (!code) return undefined
    if (code === 'required' && (k === 'name' || k === 'improve')) return f.fieldErrors[k]
    return f.errors[code]
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const raw: Record<string, unknown> = Object.fromEntries(fd.entries())
    raw.consent = fd.get('consent') === 'on'
    raw.topic = topic
    const result = validateContact(raw)
    if (!result.ok) {
      showErrors(result.errors)
      setStatus('idle')
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...raw, locale }),
      })
      if (res.status === 422) {
        const body = (await res.json()) as { errors?: FieldErrors }
        showErrors(body.errors ?? {})
        setStatus('idle')
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      formRef.current?.reset()
      requestAnimationFrame(() => resultRef.current?.focus())
    } catch {
      setStatus('failure')
      requestAnimationFrame(() => resultRef.current?.focus())
    }
  }

  if (status === 'success') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-xl border border-hairline bg-sage-tint p-8">
        <CircleCheck aria-hidden className="size-7 text-ink" />
        <h2 className="mt-4 text-2xl font-semibold">{f.successTitle}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-ink">{f.success}</p>
      </div>
    )
  }

  const errorKeys = Object.keys(errors) as (keyof FieldErrors)[]
  const fieldLabel = (k: keyof FieldErrors): string => {
    if (k === 'consent') return f.consentLink
    const labels: Partial<Record<keyof FieldErrors, string>> = {
      name: f.name,
      email: f.email,
      company: f.company,
      role: f.role,
      website: f.website,
      language: f.language,
      improve: f.improve,
    }
    return labels[k] ?? f.topicLegend
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
      {errorKeys.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-destructive/40 bg-white p-5"
        >
          <p className="flex items-center gap-2 font-semibold text-ink">
            <TriangleAlert aria-hidden className="size-5 text-destructive" />
            {f.errorSummary}
          </p>
          {/* Each problem links to its field, so a keyboard or screen-reader user can jump straight to it. */}
          <ul className="mt-3 flex flex-col gap-1.5 pl-7">
            {errorKeys.map((k) => (
              <li key={k}>
                <a
                  href={`#${k}`}
                  onClick={(e) => {
                    e.preventDefault()
                    if (k === "role" || k === "website") setDetailsOpen(true)
                    const el = formRef.current?.querySelector<HTMLElement>(k === 'consent' ? 'input[name="consent"]' : `#${k}`)
                    el?.focus()
                    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
                  }}
                  className="text-sm font-medium text-destructive underline underline-offset-4 hover:text-ink"
                >
                  {fieldLabel(k)}: {k === 'consent' ? f.errors[errors.consent!] : err(k)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === 'failure' ? (
        <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-xl border border-destructive/40 bg-white p-5">
          <p className="font-semibold text-ink">{f.failureTitle}</p>
          <p className="mt-1 text-slate">{f.failure}</p>
        </div>
      ) : null}

      <fieldset>
        <legend className="mb-5 font-display text-lg font-semibold">{f.topicLegend}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <label
              key={t}
              className={cn(
                'flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 transition-colors has-[:focus-visible]:ring-[3px]',
                topic !== t && 'border-hairline hover:border-ink/30 hover:bg-porcelain has-[:focus-visible]:ring-cobalt/20',
                topic === t &&
                  (t === 'training'
                    ? 'border-sage bg-sage-tint/40 has-[:focus-visible]:ring-sage/25'
                    : 'border-cobalt bg-cobalt/[0.04] has-[:focus-visible]:ring-cobalt/20'),
              )}
            >
              <input
                type="radio"
                name="topicChoice"
                value={t}
                checked={topic === t}
                onChange={() => {
                  setTopic(t)
                  // Keep the URL's inquiry category current so switching language preserves the reader's choice.
                  // Only the category goes in the URL — never anything typed into the form.
                  window.history.replaceState(null, '', `${window.location.pathname}?topic=${t}`)
                }}
                className={cn('size-4 shrink-0 focus:outline-none', t === 'training' ? 'accent-[var(--color-sage)]' : 'accent-[var(--color-cobalt)]')}
              />
              <span className="font-medium text-ink">{f.topics[t]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="border-t border-hairline pt-10">
        <legend className="float-left mb-5 w-full font-display text-lg font-semibold">{f.aboutYou}</legend>
        <div className="clear-both grid gap-5 sm:grid-cols-2">
          <Field id="name" label={f.name} error={err('name')}>
            <input id="name" name="name" autoComplete="name" className={inputClass} {...a11y('name', err('name'))} />
          </Field>
          <Field id="email" label={f.email} error={err('email')}>
            <input id="email" name="email" type="email" autoComplete="email" className={inputClass} {...a11y('email', err('email'))} />
          </Field>
          <Field id="company" label={f.company} error={err('company')}>
            <input id="company" name="company" autoComplete="organization" className={inputClass} {...a11y('company', err('company'))} />
          </Field>
          <Field id="language" label={f.language} error={err('language')}>
            <select id="language" name="language" defaultValue={locale} className={inputClass} {...a11y('language', err('language'))}>
              {formLanguages.map((l) => (
                <option key={l} value={l}>
                  {f.languages[l]}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      <div className="border-t border-hairline pt-10">
        <Field id="improve" label={f.improve} hint={f.improveHint} error={err('improve')}>
          <textarea id="improve" name="improve" rows={7} className={cn(inputClass, 'min-h-44 resize-y py-3 leading-relaxed')} {...a11y('improve', err('improve'), f.improveHint)} />
        </Field>
      </div>

      {/* Optional fields stay in the DOM when collapsed, so FormData still submits them when filled in. */}
      <details
        open={detailsOpen}
        onToggle={(e) => setDetailsOpen(e.currentTarget.open)}
        className="group rounded-xl border border-hairline bg-porcelain/60"
      >
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 font-medium text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt/20 [&::-webkit-details-marker]:hidden">
          {f.additionalDetails}
          <ChevronDown aria-hidden className="size-5 shrink-0 text-slate transition-transform group-open:rotate-180" />
        </summary>
        <div className="grid gap-5 border-t border-hairline px-5 pt-5 pb-6 sm:grid-cols-2">
          <Field id="role" label={f.role} error={err('role')}>
            <input id="role" name="role" autoComplete="organization-title" className={inputClass} {...a11y('role', err('role'))} />
          </Field>
          <Field id="website" label={f.website} error={err('website')}>
            <input id="website" name="website" type="url" inputMode="url" autoComplete="url" className={inputClass} {...a11y('website', err('website'))} />
          </Field>
        </div>
      </details>

      {/* Honeypot: off-screen, out of the tab order and hidden from assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_url">{f.honeypot}</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 border-t border-hairline pt-8">
      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-ink">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-1 size-5 shrink-0 accent-[var(--color-cobalt)]"
          />
          <span className="leading-relaxed">
            {f.consentBefore}{' '}
            <Link href={href(locale, 'privacy')} className="font-semibold text-cobalt underline underline-offset-4">
              {f.consentLink}
            </Link>
            {f.consentAfter}
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="text-sm font-medium text-destructive">
            {f.errors[errors.consent]}
          </p>
        ) : null}
      </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className={cn(ctaClass('primary'), 'min-h-13 w-full px-8 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start')}
        >
          {status === 'submitting' ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  )
}

const OPTIONAL_FIELDS = new Set(['role', 'website'])

function a11y(id: string, error?: string, hint?: string) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ')
  return {
    'aria-required': OPTIONAL_FIELDS.has(id) ? undefined : (true as const),
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': describedBy || undefined,
  }
}

function Field({
  id,
  label,
  optional,
  hint,
  error,
  wide,
  children,
}: {
  id: string
  label: string
  optional?: string
  hint?: string
  error?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', wide && 'sm:col-span-2')}>
      <label htmlFor={id} className="font-medium text-ink">
        {label}
        {optional ? <span className="ml-2 text-sm font-normal text-slate">({optional})</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="-mt-1 text-sm text-slate">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

