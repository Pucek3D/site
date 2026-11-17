'use client'

import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { Dictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { ResultPanel, clearFragment, readFragmentToken } from './consent-form-kit'
import { ctaClass } from './primitives'

type State =
  | { kind: 'reading' }
  | { kind: 'missing' }
  | { kind: 'ready'; token: string }
  | { kind: 'submitting'; token: string }
  | { kind: 'expired' }
  | { kind: 'invalid' }
  | { kind: 'failure'; token: string }
  | { kind: 'done'; consent: boolean; magnetSent: boolean }

/**
 * The token is read from the URL fragment and sent only when the person presses Confirm,
 * so a link scanner that merely opens the e-mail link confirms nothing.
 */
export function ConfirmConsent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.subscribe.confirm
  const [state, setState] = useState<State>({ kind: 'reading' })
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = readFragmentToken()
    clearFragment()
    setState(token ? { kind: 'ready', token } : { kind: 'missing' })
  }, [])

  async function confirm(token: string) {
    setState({ kind: 'submitting', token })
    try {
      const res = await fetch('/api/subscribe/confirm', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.status === 410) setState({ kind: 'expired' })
      else if (res.status === 400) setState({ kind: 'invalid' })
      else if (!res.ok) setState({ kind: 'failure', token })
      else {
        const body = (await res.json()) as { consent?: boolean; magnetSent?: boolean }
        setState({ kind: 'done', consent: Boolean(body.consent), magnetSent: Boolean(body.magnetSent) })
      }
    } catch {
      setState({ kind: 'failure', token })
    }
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const signUpAgain = (
    <Link href={href(locale, 'subscribe')} className="font-semibold text-cobalt underline underline-offset-4">
      {c.signUpAgain}
    </Link>
  )

  if (state.kind === 'reading') return <p className="text-slate">{c.intro}</p>
  if (state.kind === 'missing')
    return (
      <ResultPanel resultRef={resultRef} tone="neutral" title={c.missingTitle}>
        <p>{c.missing}</p>
        <p>{signUpAgain}</p>
      </ResultPanel>
    )
  if (state.kind === 'expired' || state.kind === 'invalid')
    return (
      <ResultPanel resultRef={resultRef} tone="failure" title={state.kind === 'expired' ? c.expiredTitle : c.invalidTitle}>
        <p>{state.kind === 'expired' ? c.expired : c.invalid}</p>
        <p>{signUpAgain}</p>
      </ResultPanel>
    )
  if (state.kind === 'done')
    return (
      <ResultPanel resultRef={resultRef} tone="success" title={c.successTitle} icon={<CircleCheck aria-hidden className="size-7 text-ink" />}>
        {state.magnetSent ? <p>{c.successMagnet}</p> : null}
        <p>{state.consent ? c.success : c.successNoConsent}</p>
      </ResultPanel>
    )

  const submitting = state.kind === 'submitting'
  return (
    <div className="flex flex-col gap-6">
      {state.kind === 'failure' ? (
        <ResultPanel resultRef={resultRef} tone="failure" title={c.failureTitle}>
          <p className="text-slate">{c.failure}</p>
        </ResultPanel>
      ) : null}
      <p className="max-w-xl leading-relaxed text-ink">{c.intro}</p>
      <button
        type="button"
        onClick={() => confirm(state.token)}
        disabled={submitting}
        aria-busy={submitting}
        className={cn(ctaClass('primary'), 'min-h-13 w-full px-8 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start')}
      >
        {submitting ? c.submitting : c.button}
      </button>
    </div>
  )
}
