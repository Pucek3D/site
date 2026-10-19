import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12', className)}>{children}</div>
}

type Tone = 'white' | 'porcelain' | 'ink'

export function Section({
  tone = 'white',
  id,
  className,
  children,
  labelledBy,
}: {
  tone?: Tone
  id?: string
  className?: string
  children: ReactNode
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'py-20 md:py-28',
        tone === 'porcelain' && 'bg-porcelain',
        tone === 'ink' && 'bg-ink text-white',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}

/** Small label with a short Sage rule — Sage appears as a mark, never as body text on light. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.12em]',
        dark ? 'text-mist' : 'text-slate',
      )}
    >
      <span aria-hidden className="h-px w-6 bg-sage" />
      {children}
    </p>
  )
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
  className,
}: {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  dark?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-5', className)}>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2
        id={id}
        className={cn(
          'text-3xl font-semibold leading-[1.12] md:text-[2.75rem]',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={cn('text-lg leading-relaxed', dark ? 'text-mist' : 'text-slate')}>{intro}</p>
      ) : null}
    </div>
  )
}

type CtaVariant = 'primary' | 'sage' | 'secondary' | 'inverse' | 'text' | 'textInverse'

const ctaStyles: Record<CtaVariant, string> = {
  primary:
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] bg-cobalt px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-ink',
  // Ink on Sage, never white: white on Sage fails contrast.
  sage: 'inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] bg-sage px-6 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white',
  secondary:
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] border border-ink px-6 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-porcelain',
  inverse:
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-[9px] border border-mist px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white hover:bg-white/5',
  text: 'inline-flex min-h-11 items-center gap-1.5 font-semibold text-cobalt underline-offset-4 hover:underline',
  textInverse: 'inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline-offset-4 hover:underline',
}

export function CtaLink({
  variant = 'primary',
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: CtaVariant }) {
  return <Link className={cn(ctaStyles[variant], className)} {...props} />
}

export function ctaClass(variant: CtaVariant) {
  return ctaStyles[variant]
}

/**
 * The open-corner focus frame. Four corner brackets around one important
 * thing. Use at most once per section, and never as a closed box.
 */
export function FocusFrame({
  children,
  className,
  color = 'ink',
  inset = 'md',
  animate = false,
}: {
  children: ReactNode
  className?: string
  color?: 'ink' | 'cobalt' | 'white' | 'mist'
  inset?: 'sm' | 'md' | 'lg'
  animate?: boolean
}) {
  const colorClass = { ink: 'text-ink', cobalt: 'text-cobalt', white: 'text-white', mist: 'text-mist' }[color]
  const pad = { sm: '-0.5rem', md: '-0.875rem', lg: '-1.25rem' }[inset]
  const corners = [
    { cls: 'border-t-2 border-l-2', style: { top: pad, left: pad, '--fx': '-10px', '--fy': '-10px' } },
    { cls: 'border-t-2 border-r-2', style: { top: pad, right: pad, '--fx': '10px', '--fy': '-10px' } },
    { cls: 'border-b-2 border-l-2', style: { bottom: pad, left: pad, '--fx': '-10px', '--fy': '10px' } },
    { cls: 'border-b-2 border-r-2', style: { bottom: pad, right: pad, '--fx': '10px', '--fy': '10px' } },
  ]
  return (
    <div className={cn('relative', className)}>
      {corners.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className={cn('frame-corner', colorClass, c.cls, animate && 'frame-animate')}
          style={c.style as React.CSSProperties}
        />
      ))}
      {children}
    </div>
  )
}

/** A visible "to be supplied" marker for owner-provided facts. */
export function OwnerPlaceholder({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 rounded-md border border-dashed border-input bg-porcelain px-2 py-0.5 text-[0.9375rem]">
      <span className="font-medium text-ink">{label}:</span>
      <span className="text-slate">{value}</span>
    </span>
  )
}
