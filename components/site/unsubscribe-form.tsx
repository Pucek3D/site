'use client'

import { CircleCheck } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Dictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { validateUnsubscribe, type UnsubscribeFieldErrors } from '@/lib/validation'
import { ErrorSummary, Field, Honeypot, ResultPanel, a11y, clearFragment, inputClass, readFragmentToken } from './consent-form-kit'
import { ctaClass } from './primitives'

type Status = 'idle' | 'submitting' | 'done' | 'failure'

/** Withdrawal: one field, one button, no login. A link from an e-mail (#t=) prefills the address. */
export function UnsubscribeForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const u = dict.subscribe.unsubscribe
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<UnsubscribeFieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [doneFor, setDoneFor] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = readFragmentToken()
    if (!token) return
    clearFragment()
    // Decoding happens on the server; a bad or missing token just leaves the field empty.
    fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: 'prefill', token }),
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ email?: string }>) : null))
      .then((body) => {
        if (body?.email) setEmail((current) => current || body.email!)
      })
      .catch(() => {})
  }, [])

  const err = errors.email ? u.errors[errors.email] : undefined

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const raw = { email, company_url: fd.get('company_url') ?? '' }
    const result = validateUnsubscribe(raw)
    if (!result.ok) {
      setErrors(result.errors)
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...raw, locale }),
      })
      if (res.status === 422) {
        const body = (await res.json()) as { errors?: UnsubscribeFieldErrors }
        setErrors(body.errors ?? {})
        setStatus('idle')
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      }
      if (!res.ok) throw new Error(String(res.status))
      setDoneFor(result.data.email)
      setStatus('done')
    } catch {
      setStatus('failure')
    }
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  if (status === 'done') {
    return (
      <ResultPanel resultRef={resultRef} tone="success" title={u.successTitle} icon={<CircleCheck aria-hidden className="size-7 text-ink" />}>
        <p>{u.success.replace('{email}', doneFor)}</p>
      </ResultPanel>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <ErrorSummary
        summaryRef={summaryRef}
        title={u.errorSummary}
        items={err ? [{ id: 'email', text: `${u.email}: ${err}` }] : []}
        onJump={() => formRef.current?.querySelector<HTMLElement>('#email')?.focus()}
      />
      {status === 'failure' ? (
        <ResultPanel resultRef={resultRef} tone="failure" title={u.failureTitle}>
          <p className="text-slate">{u.failure}</p>
        </ResultPanel>
      ) : null}
      <Field id="email" label={u.email} error={err}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          {...a11y('email', { error: err, required: true })}
        />
      </Field>
      <Honeypot label={dict.subscribe.form.honeypot} />
      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
        className={cn(ctaClass('primary'), 'min-h-13 w-full px-8 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start')}
      >
        {status === 'submitting' ? u.submitting : u.button}
      </button>
    </form>
  )
}
