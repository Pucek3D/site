import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Titled } from '@/content/partner/types'
import { href, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Container, CtaLink, Eyebrow, Section } from './primitives'

/** Two crumbs only: home and the page. Every page sits one level below home. */
export function Breadcrumbs({ locale, homeLabel, label, navLabel }: { locale: Locale; homeLabel: string; label: string; navLabel: string }) {
  return (
    <nav aria-label={navLabel} className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate">
        <li>
          <Link href={href(locale, 'home')} className="hover:text-ink hover:underline">
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="text-ink">
          {label}
        </li>
      </ol>
    </nav>
  )
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  subtitle,
  paragraphs,
  closingLine,
  actions,
  image,
}: {
  crumbs?: ReactNode
  eyebrow?: string
  title: string
  subtitle?: string
  paragraphs: string[]
  closingLine?: string
  actions?: ReactNode
  image?: { src: string; alt: string }
}) {
  return (
    <section className="border-b border-hairline">
      <Container className="py-14 md:py-20">
        {crumbs}
        <div className={cn('grid items-center gap-12', image && 'lg:grid-cols-12')}>
          <div className={cn('flex flex-col gap-6', image ? 'lg:col-span-7' : 'max-w-3xl')}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            {subtitle ? <p className="text-pretty text-xl font-medium leading-snug text-cobalt">{subtitle}</p> : null}
            <Paragraphs items={paragraphs} className="text-lg" />
            {closingLine ? <p className="text-pretty text-lg font-semibold text-ink">{closingLine}</p> : null}
            {actions ? <div className="mt-2 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {image ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-porcelain lg:col-span-5">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

export function Paragraphs({ items, className, dark = false }: { items: string[]; className?: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((p) => (
        <p key={p} className={cn('text-pretty leading-relaxed', dark ? 'text-mist' : 'text-slate', className)}>
          {p}
        </p>
      ))}
    </div>
  )
}

export function H2({ id, children, dark = false }: { id?: string; children: ReactNode; dark?: boolean }) {
  return (
    <h2 id={id} className={cn('text-balance text-3xl font-semibold leading-[1.12] md:text-[2.5rem]', dark ? 'text-white' : 'text-ink')}>
      {children}
    </h2>
  )
}

/** A title on the left, the partner's prose on the right. */
export function SplitSection({
  id,
  title,
  paragraphs,
  closingLine,
  tone = 'white',
  children,
}: {
  id: string
  title: string
  paragraphs: string[]
  closingLine?: string
  tone?: 'white' | 'porcelain'
  children?: ReactNode
}) {
  return (
    <Section tone={tone} labelledBy={id}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <H2 id={id}>{title}</H2>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7">
          <Paragraphs items={paragraphs} className="text-lg" />
          {closingLine ? <p className="text-pretty text-lg font-semibold text-ink">{closingLine}</p> : null}
          {children}
        </div>
      </div>
    </Section>
  )
}

/** Titled points in a grid. Numbered only when the source presents them as a sequence. */
export function PointGrid({ items, numbered = false, columns = 3 }: { items: Titled[]; numbered?: boolean; columns?: 2 | 3 }) {
  return (
    <ul className={cn('grid gap-x-10 gap-y-10 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3')}>
      {items.map((it, i) => (
        <li key={it.title} className="flex flex-col gap-3 border-t border-hairline pt-6">
          {numbered ? (
            <span className="text-sm font-semibold tabular-nums text-cobalt">{String(i + 1).padStart(2, '0')}</span>
          ) : (
            <span aria-hidden className="h-0.5 w-6 bg-sage" />
          )}
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">{it.title}</h3>
          <p className="text-pretty leading-relaxed text-slate">{it.body}</p>
        </li>
      ))}
    </ul>
  )
}

export function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={cn('grid gap-x-8 gap-y-3', columns === 2 && 'sm:grid-cols-2')}>
      {items.map((it) => (
        <li key={it} className="flex gap-3 leading-relaxed text-ink">
          <Check aria-hidden className="mt-1 size-4 shrink-0 text-sage" strokeWidth={2.5} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export function ListLabel({ children }: { children: ReactNode }) {
  return <p className="font-display text-base font-semibold text-ink">{children}</p>
}

/** The closing band every page ends on. */
export function FinalCta({ id, title, paragraphs, cta, to }: { id: string; title: string; paragraphs: string[]; cta: string; to: string }) {
  return (
    <Section tone="ink" labelledBy={id}>
      <div className="flex max-w-3xl flex-col gap-6">
        <H2 id={id} dark>
          {title}
        </H2>
        <Paragraphs items={paragraphs} className="text-lg" dark />
        <div className="mt-2">
          <CtaLink href={to} variant="sage">
            {cta}
            <ArrowRight aria-hidden className="size-4" />
          </CtaLink>
        </div>
      </div>
    </Section>
  )
}
