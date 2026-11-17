import { TriangleAlert } from 'lucide-react'
import type { ReactNode, RefObject } from 'react'
import { cn } from '@/lib/utils'

/** Same field treatment as ContactForm, shared by the subscribe, confirm and unsubscribe forms. */
export const inputClass =
  'block min-h-12 w-full rounded-lg border border-input bg-white px-4 text-base text-ink transition-colors placeholder:text-slate/70 hover:border-ink/30 focus-visible:border-cobalt focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt/20 aria-[invalid=true]:border-destructive'

export function a11y(id: string, opts: { error?: string; hint?: string; required?: boolean }) {
  const describedBy = [opts.hint ? `${id}-hint` : '', opts.error ? `${id}-error` : ''].filter(Boolean).join(' ')
  return {
    'aria-required': opts.required ? (true as const) : undefined,
    'aria-invalid': opts.error ? (true as const) : undefined,
    'aria-describedby': describedBy || undefined,
  }
}

export function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  optional?: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
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

/** Each problem links to its field, so keyboard and screen-reader users can jump straight to it. */
export function ErrorSummary({
  summaryRef,
  title,
  items,
  onJump,
}: {
  summaryRef: RefObject<HTMLDivElement | null>
  title: string
  items: { id: string; text: string }[]
  onJump: (id: string) => void
}) {
  if (items.length === 0) return null
  return (
    <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-destructive/40 bg-white p-5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-destructive/25">
      <p className="flex items-center gap-2 font-semibold text-ink">
        <TriangleAlert aria-hidden className="size-5 text-destructive" />
        {title}
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 pl-7">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                onJump(item.id)
              }}
              className="text-sm font-medium text-destructive underline underline-offset-4 hover:text-ink"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** A result panel that takes focus so the outcome is announced and visible. */
export function ResultPanel({
  resultRef,
  tone,
  title,
  children,
  icon,
}: {
  resultRef?: RefObject<HTMLDivElement | null>
  tone: 'success' | 'failure' | 'neutral'
  title: string
  children?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div
      ref={resultRef}
      tabIndex={-1}
      role={tone === 'failure' ? 'alert' : 'status'}
      className={cn(
        'rounded-xl border p-6 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-cobalt/20 sm:p-8',
        tone === 'success' && 'border-hairline bg-sage-tint',
        tone === 'failure' && 'border-destructive/40 bg-white',
        tone === 'neutral' && 'border-hairline bg-white',
      )}
    >
      {icon}
      <h2 className={cn('text-xl font-semibold text-ink sm:text-2xl', icon && 'mt-4')}>{title}</h2>
      {children ? <div className="mt-3 flex max-w-xl flex-col gap-3 leading-relaxed text-ink">{children}</div> : null}
    </div>
  )
}

/** Honeypot: off-screen, out of the tab order and hidden from assistive tech. */
export function Honeypot({ label }: { label: string }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company_url">{label}</label>
      <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
    </div>
  )
}

/** Reads #t=<token> from the URL fragment. The fragment never reaches the server or a referrer. */
export function readFragmentToken(): string | null {
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const token = params.get('t')
  return token && token.length > 20 ? token : null
}

/** Removes the token from the address bar once it has been read, so it is not left in history or shared by copy-paste. */
export function clearFragment() {
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}
