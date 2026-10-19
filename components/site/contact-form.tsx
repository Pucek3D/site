'use client'

import { CircleCheck, TriangleAlert } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import type { Dictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import {
  agencyModels,
  agencyTypes,
  asinCounts,
  brandProblems,
  capabilityLevels,
  clientCounts,
  formLanguages,
  marketplaces,
  teamSizes,
  timings,
  topics,
  trainingFormats,
  validateContact,
  type FieldErrors,
  type Topic,
} from '@/lib/validation'
import { ctaClass } from './primitives'

type Status = 'idle' | 'submitting' | 'success' | 'failure'

const inputClass =
  'block min-h-12 w-full rounded-lg border border-input bg-white px-4 text-base text-ink placeholder:text-slate/70 aria-[invalid=true]:border-destructive'

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
  const formRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const err = (k: keyof FieldErrors) => (errors[k] ? f.errors[errors[k]!] : undefined)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const raw: Record<string, unknown> = Object.fromEntries(fd.entries())
    raw.consent = fd.get('consent') === 'on'
    raw.topic = topic
    const result = validateContact(raw)
    if (!result.ok) {
      setErrors(result.errors)
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
        setErrors(body.errors ?? {})
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
        </div>
      ) : null}

      {status === 'failure' ? (
        <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-xl border border-destructive/40 bg-white p-5">
          <p className="font-semibold text-ink">{f.failureTitle}</p>
          <p className="mt-1 text-slate">{f.failure}</p>
        </div>
      ) : null}

      <fieldset>
        <legend className="mb-4 font-display text-lg font-semibold">{f.topicLegend}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <label
              key={t}
              className={cn(
                'flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-4 transition-colors',
                topic === t ? 'border-ink bg-white' : 'border-hairline bg-white hover:border-ink/40',
              )}
            >
              <input
                type="radio"
                name="topicChoice"
                value={t}
                checked={topic === t}
                onChange={() => setTopic(t)}
                className="size-4 accent-[var(--color-cobalt)]"
              />
              <span className="font-medium text-ink">{f.topics[t]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-4 font-display text-lg font-semibold">{f.aboutYou}</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label={f.name} error={err('name')}>
            <input id="name" name="name" autoComplete="name" className={inputClass} {...a11y('name', err('name'))} />
          </Field>
          <Field id="email" label={f.email} error={err('email')}>
            <input id="email" name="email" type="email" autoComplete="email" className={inputClass} {...a11y('email', err('email'))} />
          </Field>
          <Field id="company" label={f.company} error={err('company')}>
            <input id="company" name="company" autoComplete="organization" className={inputClass} {...a11y('company', err('company'))} />
          </Field>
          <Field id="role" label={f.role} error={err('role')}>
            <input id="role" name="role" autoComplete="organization-title" className={inputClass} {...a11y('role', err('role'))} />
          </Field>
          <Field id="website" label={f.website} optional={f.optional} error={err('website')}>
            <input id="website" name="website" type="url" inputMode="url" autoComplete="url" className={inputClass} {...a11y('website', err('website'))} />
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

      {topic === 'agency' ? (
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-lg font-semibold">{f.agency.legend}</legend>
          <SelectField name="agencyType" label={f.agency.type} options={agencyTypes} labels={f.agency.typeOptions} placeholder={f.select} error={err('agencyType')} />
          <SelectField name="clientCount" label={f.agency.clients} options={clientCounts} labels={f.agency.clientOptions} placeholder={f.select} error={err('clientCount')} />
          <SelectField name="capability" label={f.agency.capability} options={capabilityLevels} labels={f.agency.capabilityOptions} placeholder={f.select} error={err('capability')} />
          <SelectField name="agencyModel" label={f.agency.model} options={agencyModels} labels={f.agency.modelOptions} placeholder={f.select} error={err('agencyModel')} />
        </fieldset>
      ) : null}

      {topic === 'brand' ? (
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-lg font-semibold">{f.brand.legend}</legend>
          <Field id="category" label={f.brand.category} error={err('category')}>
            <input id="category" name="category" className={inputClass} {...a11y('category', err('category'))} />
          </Field>
          <SelectField name="marketplace" label={f.brand.marketplace} options={marketplaces} labels={f.brand.marketplaceOptions} placeholder={f.select} error={err('marketplace')} />
          <SelectField name="asinCount" label={f.brand.asins} options={asinCounts} labels={f.brand.asinOptions} placeholder={f.select} error={err('asinCount')} />
          <SelectField name="brandProblem" label={f.brand.problem} options={brandProblems} labels={f.brand.problemOptions} placeholder={f.select} error={err('brandProblem')} />
        </fieldset>
      ) : null}

      {topic === 'training' ? (
        <fieldset className="grid gap-5 sm:grid-cols-2">
          <legend className="mb-4 font-display text-lg font-semibold">{f.training.legend}</legend>
          <SelectField name="teamSize" label={f.training.teamSize} options={teamSizes} labels={f.training.teamOptions} placeholder={f.select} error={err('teamSize')} />
          <SelectField name="trainingFormat" label={f.training.format} options={trainingFormats} labels={f.training.formatOptions} placeholder={f.select} error={err('trainingFormat')} />
          <Field id="participantRoles" label={f.training.roles} hint={f.training.rolesHint} error={err('participantRoles')} wide>
            <input id="participantRoles" name="participantRoles" className={inputClass} {...a11y('participantRoles', err('participantRoles'), f.training.rolesHint)} />
          </Field>
          <Field id="capabilityToBuild" label={f.training.capability} error={err('capabilityToBuild')} wide>
            <textarea id="capabilityToBuild" name="capabilityToBuild" rows={3} className={cn(inputClass, 'py-3')} {...a11y('capabilityToBuild', err('capabilityToBuild'))} />
          </Field>
          <SelectField name="timing" label={f.training.timing} options={timings} labels={f.training.timingOptions} placeholder={f.select} error={err('timing')} />
        </fieldset>
      ) : null}

      <Field id="improve" label={f.improve} hint={f.improveHint} error={err('improve')}>
        <textarea id="improve" name="improve" rows={5} className={cn(inputClass, 'py-3')} {...a11y('improve', err('improve'), f.improveHint)} />
      </Field>

      {/* Honeypot: off-screen, out of the tab order and hidden from assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_url">{f.honeypot}</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

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

      <div>
        <button type="submit" disabled={status === 'submitting'} className={cn(ctaClass('primary'), 'w-full disabled:opacity-60 sm:w-auto')}>
          {status === 'submitting' ? f.submitting : f.submit}
        </button>
      </div>
    </form>
  )
}

function a11y(id: string, error?: string, hint?: string) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ')
  return {
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

function SelectField<T extends string>({
  name,
  label,
  options,
  labels,
  placeholder,
  error,
}: {
  name: string
  label: string
  options: readonly T[]
  labels: Record<T, string>
  placeholder: string
  error?: string
}) {
  return (
    <Field id={name} label={label} error={error}>
      <select id={name} name={name} defaultValue="" className={inputClass} {...a11y(name, error)}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {labels[o]}
          </option>
        ))}
      </select>
    </Field>
  )
}
