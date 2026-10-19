import { ArrowRight, Check, CircleUserRound, GraduationCap, Layers, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Dictionary } from '@/content'
import {
  familyNames,
  learningSteps,
  modeNames,
  productFamily,
  productNames,
  type ProductId,
} from '@/content/shared'
import { href, type Locale, type PageKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Container, CtaLink, Eyebrow, FocusFrame, Section, SectionHeading } from './primitives'

/* ---------------------------------------------------------------- Hero */

export function PageHero({
  eyebrow,
  title,
  support,
  actions,
  note,
  aside,
  asidePosition = 'right',
  breadcrumbs,
}: {
  eyebrow: string
  title: string
  support: string
  actions?: ReactNode
  note?: string
  aside?: ReactNode
  /** `left` puts the aside first, so on mobile it also sits above the copy. */
  asidePosition?: 'left' | 'right'
  breadcrumbs?: ReactNode
}) {
  const asideLeft = Boolean(aside) && asidePosition === 'left'
  /* A left aside takes only its own width, so the copy sits a fixed gap from it instead of across a 5/12 column. */
  const asideNode = aside ? <div className={asideLeft ? undefined : 'lg:col-span-5'}>{aside}</div> : null
  const gridCols = asideLeft
    ? 'lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-x-20'
    : aside
      ? 'lg:grid-cols-12 lg:items-center'
      : undefined
  return (
    <section className="border-b border-hairline bg-white">
      <Container className="py-14 md:py-20 lg:py-24">
        {/* With the aside on the left, the trail belongs to the copy column it describes. */}
        {asideLeft ? null : breadcrumbs}
        <div className={cn('grid gap-12', gridCols)}>
          {asideLeft ? asideNode : null}
          <div className={cn('flex flex-col gap-6', asideLeft ? 'max-w-3xl' : aside ? 'lg:col-span-7' : 'max-w-4xl')}>
            {asideLeft ? <div className="-mb-2">{breadcrumbs}</div> : null}
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-[2.5rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[4rem]">{title}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate md:text-xl">{support}</p>
            {actions ? <div className="mt-2 flex flex-wrap items-center gap-3">{actions}</div> : null}
            {note ? (
              <p className="flex items-start gap-2 text-[0.9375rem] text-ink">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-sage" />
                {note}
              </p>
            ) : null}
          </div>
          {asideLeft ? null : asideNode}
        </div>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------- Breadcrumbs */

export function Breadcrumbs({
  locale,
  dict,
  page,
}: {
  locale: Locale
  dict: Dictionary
  page: PageKey
}) {
  return (
    <nav aria-label={dict.common.breadcrumbLabel} className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate">
        <li>
          <Link href={href(locale, 'home')} className="hover:text-ink hover:underline">
            {dict.nav.items.home}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="text-ink">
          {dict.nav.items[page]}
        </li>
      </ol>
    </nav>
  )
}

/* -------------------------------------------------------- Trust strip */

export function TrustStrip({ items }: { items: string[] }) {
  return (
    <div className="border-b border-hairline bg-porcelain">
      <Container>
  {/* One row, items at their natural width with one fixed gap between them, so every label is followed by the same space. Only the last item may shrink and wrap; the others never do. */}
  <ul className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-x-12">
  {items.map((t, i) => (
  <li
  key={t}
  className={`flex items-start gap-3 text-[0.9375rem] font-medium leading-6 text-ink ${
  i === items.length - 1 ? 'min-w-0' : 'sm:shrink-0 sm:whitespace-nowrap'
  }`}
  >
              <span aria-hidden className="mt-1 h-4 w-0.5 shrink-0 bg-sage" />
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

/* ------------------------------------------------------ Route cards */

const routeIcon = { agencies: CircleUserRound, brands: Layers, training: GraduationCap } as const

/**
 * Every card shares one white shell; only the icon and hover border carry the route's accent.
 * Agencies and brands share Cobalt so neither reads as secondary; training alone takes Sage.
 */
const routeTone = {
  agencies: { card: 'border-hairline bg-white hover:border-cobalt', icon: 'text-cobalt', action: 'text-cobalt' },
  brands: { card: 'border-hairline bg-white hover:border-cobalt', icon: 'text-cobalt', action: 'text-cobalt' },
  // Sage fails contrast as small text on white, so it carries the icon and arrow only.
  training: { card: 'border-hairline bg-white hover:border-sage', icon: 'text-sage', action: 'text-ink' },
} as const

export function RouteCards({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const r = dict.home.routes
  return (
    <Section labelledBy="routes-title">
      <SectionHeading id="routes-title" eyebrow={r.eyebrow} title={r.title} />
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {r.items.map((item) => {
          const Icon = routeIcon[item.key as keyof typeof routeIcon]
          const tone = routeTone[item.key as keyof typeof routeTone]
          return (
            <li key={item.key} className="reveal">
              <Link
                href={href(locale, item.key as PageKey)}
                className={cn('group flex h-full flex-col gap-5 rounded-xl border p-7 transition-colors', tone.card)}
              >
                <span className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <Icon aria-hidden className={cn('size-5', tone.icon)} />
                  {item.label}
                </span>
                <span className="font-display text-2xl font-semibold leading-tight text-ink text-balance">
                  {item.title}
                </span>
                <span className="leading-relaxed text-slate">{item.body}</span>
                <span className={cn('mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold', tone.action)}>
                  {item.action}
                  <ArrowRight
                    aria-hidden
                    className={cn('size-4 shrink-0 transition-transform group-hover:translate-x-0.5', tone.icon)}
                  />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* -------------------------------------------------- Product families */

export function ProductFamilies({ dict, tone = 'porcelain' }: { dict: Dictionary; tone?: 'white' | 'porcelain' }) {
  const f = dict.families
  const families = [
    { id: 'delivery' as const, Icon: Layers, body: f.delivery.body },
    { id: 'training' as const, Icon: GraduationCap, body: f.training.body },
  ]
  return (
    <Section tone={tone} labelledBy="families-title">
      <SectionHeading id="families-title" eyebrow={f.eyebrow} title={f.title} />
      {/* Equal columns on purpose: training is a peer product family, not an add-on. */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {families.map(({ id, Icon, body }) => (
          <article key={id} className="reveal flex flex-col gap-5 rounded-xl border border-hairline bg-white p-8 md:p-10">
            <Icon aria-hidden className={cn('size-7', id === 'training' ? 'text-sage' : 'text-cobalt')} />
            <h3 className="font-display text-2xl font-semibold text-ink">{familyNames[id]}</h3>
            <p className="text-lg leading-relaxed text-slate">{body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------- Offer list */

export function OfferList({
  dict,
  ids,
  title,
  intro,
  eyebrow,
  tone = 'white',
  id,
  copyOverrides,
}: {
  dict: Dictionary
  ids?: readonly ProductId[]
  title?: string
  intro?: string
  eyebrow?: string
  tone?: 'white' | 'porcelain'
  id?: string
  /** Audience-specific copy for a page that addresses one audience (e.g. For Brands). */
  copyOverrides?: Partial<Record<ProductId, { body?: string; bestFor?: string; receive?: string }>>
}) {
  const items = dict.products.items
    .filter((p) => !ids || ids.includes(p.id as ProductId))
    .map((p) => ({ ...p, ...copyOverrides?.[p.id as ProductId] }))
  return (
    <Section tone={tone} id={id} labelledBy="offers-title">
      <SectionHeading
        id="offers-title"
        eyebrow={eyebrow ?? dict.products.eyebrow}
        title={title ?? dict.products.title}
        intro={intro}
      />
      <ul className="mt-12 border-t border-ink">
        {items.map((p) => {
          const fam = productFamily[p.id as ProductId]
          return (
            <li key={p.id} className="reveal grid gap-4 border-b border-hairline py-8 md:grid-cols-12 md:gap-8">
              <div className="flex flex-col gap-3 md:col-span-4">
                <span
                  className={cn(
                    'inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-ink',
                    fam === 'training' ? 'bg-sage-tint' : 'bg-cobalt-tint',
                  )}
                >
                  {fam === 'training' ? (
                    <GraduationCap aria-hidden className="size-3.5" />
                  ) : (
                    <Layers aria-hidden className="size-3.5" />
                  )}
                  {familyNames[fam]}
                </span>
                <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                  {productNames[p.id as ProductId]}
                </h3>
              </div>
              <p className="leading-relaxed text-ink md:col-span-4">{p.body}</p>
              <dl className="flex flex-col gap-3 text-[0.9375rem] md:col-span-4">
                <div>
                  <dt className="font-semibold text-ink">{dict.common.bestFor}</dt>
                  <dd className="text-slate">{p.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">{dict.common.youReceive}</dt>
                  <dd className="text-slate">{p.receive}</dd>
                </div>
              </dl>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* ---------------------------------------------------- Delivery modes */

export function DeliveryModes({ dict, tone = 'white' }: { dict: Dictionary; tone?: 'white' | 'porcelain' }) {
  const m = dict.modes
  return (
    <Section tone={tone} labelledBy="modes-title">
      <SectionHeading id="modes-title" eyebrow={m.eyebrow} title={m.title} />
      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {m.items.map((item, i) => (
          <li key={modeNames[i]} className="reveal flex flex-col gap-4 rounded-xl border border-hairline bg-white p-7">
            {/* The meter is the point: how much of the capability ends up inside the client team. */}
            <div className="flex items-center gap-3">
              <span className="sr-only">
                {dict.common.capabilityOwned}: {dict.common.capabilityLevels[i]}
              </span>
              <span aria-hidden className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className={cn('h-1.5 w-6 rounded-full', d <= i ? 'bg-sage' : 'bg-hairline')} />
                ))}
              </span>
              <span aria-hidden className="text-xs text-slate">
                {dict.common.capabilityOwned}
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-ink">{modeNames[i]}</h3>
            <p className="font-serif text-lg italic text-ink">{item.lead}</p>
            <p className="leading-relaxed text-slate">{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* ------------------------------------------------------ Why ADelier */

export function WhyAdelier({ dict }: { dict: Dictionary }) {
  const w = dict.why
  return (
    <Section labelledBy="why-title">
      <SectionHeading id="why-title" eyebrow={w.eyebrow} title={w.title} />
      <ul className="mt-14 grid gap-10 md:grid-cols-3">
        {w.items.map((item) => (
          <li key={item.title} className="reveal flex flex-col gap-3 border-t-2 border-ink pt-6">
            <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
            <p className="leading-relaxed text-slate">{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------- Human-accountable AI */

export function AiSection({ dict }: { dict: Dictionary }) {
  const a = dict.ai
  return (
    <Section tone="ink" labelledBy="ai-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <SectionHeading id="ai-title" eyebrow={a.eyebrow} title={a.title} intro={a.body} dark />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.12em] text-mist">{a.workflowTitle}</h3>
          <ol className="flex flex-col">
            {a.workflow.map((step, i) => {
              const human = step.owner === 'human'
              return (
                <li key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full border',
                        human ? 'border-white bg-white text-ink' : 'border-mist/60 text-mist',
                      )}
                    >
                      {human ? (
                        <CircleUserRound aria-hidden className="size-4" />
                      ) : (
                        <Sparkles aria-hidden className="size-4" />
                      )}
                    </span>
                    {i < a.workflow.length - 1 ? <span aria-hidden className="w-px flex-1 bg-white/20" /> : null}
                  </div>
                  <div className="pb-7">
                    <p className={cn('text-xs font-medium uppercase tracking-[0.1em]', human ? 'text-sage' : 'text-mist')}>
                      {human ? dict.common.humanStep : dict.common.aiStep}
                    </p>
                    <p className={cn('mt-1', human ? 'font-semibold text-white' : 'text-mist')}>{step.label}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </Section>
  )
}

/* --------------------------------------------------- Operating model */

export function OperatingModel({ dict, body }: { dict: Dictionary; body?: string }) {
  const o = dict.operating
  return (
    <Section tone="porcelain" labelledBy="operating-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading id="operating-title" eyebrow={o.eyebrow} title={o.title} />
        </div>
        <p className="text-lg leading-relaxed text-slate lg:col-span-5 lg:pt-12">{body ?? o.body}</p>
      </div>
    </Section>
  )
}

/* ----------------------------------------------------- Quality gates */

export function QualityGates({ dict, id }: { dict: Dictionary; id?: string }) {
  const q = dict.quality
  return (
    <Section id={id} labelledBy="quality-title">
      <SectionHeading id="quality-title" eyebrow={q.eyebrow} title={q.title} intro={q.intro} />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {q.items.map((g, i) => (
          <li key={g.name} className="flex flex-col gap-3 bg-white p-6">
            <span className="text-sm font-semibold tabular-nums text-slate">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-semibold text-ink">{g.name}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-slate">{g.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* ---------------------------------------------- Agency Partner Promise */

export function AgencyPromise({ dict }: { dict: Dictionary }) {
  const p = dict.agencies.promise
  return (
    <Section tone="ink" labelledBy="promise-title">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="promise-title" eyebrow={p.eyebrow} title={p.title} dark />
        </div>
        <ul className="flex flex-col lg:col-span-7">
          {p.items.map((item) => (
            <li key={item} className="flex items-start gap-4 border-b border-white/15 py-5 first:pt-0">
              <Check aria-hidden className="mt-1 size-5 shrink-0 text-sage" />
              <span className="font-display text-xl font-medium leading-snug text-white">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/* --------------------------------------------------- Program cards */

export function ProgramCards({
  dict,
  title,
  intro,
  forLines,
  id,
  tone = 'white',
}: {
  dict: Dictionary
  title: string
  intro?: string
  forLines?: [string, string]
  id?: string
  tone?: 'white' | 'porcelain'
}) {
  const programs = [
    { id: 'foundations' as const, data: dict.programs.foundations },
    { id: 'enablement' as const, data: dict.programs.enablement },
  ]
  const c = dict.common
  return (
    <Section tone={tone} id={id} labelledBy={`${id ?? 'programs'}-title`}>
      <SectionHeading id={`${id ?? 'programs'}-title`} eyebrow={familyNames.training} title={title} intro={intro} />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {programs.map(({ id: pid, data }, i) => (
          <article key={pid} className="reveal flex flex-col gap-6 rounded-xl border border-hairline bg-white p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-sage-tint px-3 py-1 text-xs font-semibold text-ink">
                <GraduationCap aria-hidden className="size-3.5" />
                {c.standalone}
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink">{productNames[pid]}</h3>
            {forLines ? <p className="-mt-3 text-slate">{forLines[i]}</p> : null}
            <dl className="flex flex-col gap-5">
              {(
                [
                  [c.audience, data.audience],
                  [c.problem, data.problem],
                  [c.format, data.format],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-ink">{k}</dt>
                  <dd className="leading-relaxed text-slate">{v}</dd>
                </div>
              ))}
              <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-ink">{c.outputs}</dt>
                <dd>
                  <ul className="flex flex-col gap-2">
                    {data.outputs.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-ink">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-sage" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------- Sequence (real sequences only) */

export function Sequence({
  steps,
  labels,
  label,
}: {
  steps: string[]
  labels?: readonly string[]
  label: string
}) {
  return (
    <ol aria-label={label} className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
      {steps.map((s, i) => (
        <li key={s} className="relative flex flex-col gap-3 bg-white p-6">
          <span className="flex items-center gap-2 text-sm font-semibold tabular-nums text-cobalt">
            {String(i + 1).padStart(2, '0')}
            {i < steps.length - 1 ? <ArrowRight aria-hidden className="hidden size-4 text-mist lg:block" /> : null}
          </span>
          {labels ? <span className="font-display text-lg font-semibold text-ink">{labels[i]}</span> : null}
          <span className={cn(labels ? 'text-[0.9375rem] leading-relaxed text-slate' : 'font-semibold leading-snug text-ink')}>
            {s}
          </span>
        </li>
      ))}
    </ol>
  )
}

export function LearningModel({ title, steps, label, tone = 'porcelain' }: { title: string; steps: string[]; label: string; tone?: 'white' | 'porcelain' }) {
  return (
    <Section tone={tone} labelledBy="learning-title">
      <SectionHeading id="learning-title" title={title} />
      <div className="mt-12">
        <Sequence steps={steps} labels={learningSteps} label={label} />
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------- Lists */

export function CheckList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  return (
    <ul
      className={cn(
        'grid gap-x-10 gap-y-4',
        columns === 2 && 'sm:grid-cols-2',
        columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 border-b border-hairline pb-4 text-ink">
          <Check aria-hidden className="mt-1 size-4 shrink-0 text-sage" />
          {i}
        </li>
      ))}
    </ul>
  )
}

export function CardGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string }[]
  columns?: 2 | 3 | 4
}) {
  return (
    <ul
      className={cn(
        'grid gap-6',
        columns === 2 && 'md:grid-cols-2',
        columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
      )}
    >
      {items.map((i) => (
        <li key={i.title} className="reveal flex flex-col gap-3 rounded-xl border border-hairline bg-white p-6">
          <h3 className="font-semibold leading-snug text-ink">{i.title}</h3>
          <p className="text-[0.9375rem] leading-relaxed text-slate">{i.body}</p>
        </li>
      ))}
    </ul>
  )
}

/* --------------------------------------------------------------- FAQ */

export function Faq({ title, items, tone = 'white' }: { title: string; items: { q: string; a: string }[]; tone?: 'white' | 'porcelain' }) {
  return (
    <Section tone={tone} labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" title={title} />
        </div>
        <div className="lg:col-span-8">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-hairline first:border-t">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="relative size-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-ink after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-slate">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------- Final CTA */

export function FinalCta({
  title,
  body,
  button,
  to,
}: {
  title: string
  body: string
  button: string
  to: string
}) {
  return (
    <section aria-labelledby="final-cta-title" className="bg-porcelain">
      <Container className="py-20 md:py-28">
        <FocusFrame inset="lg" className="mx-auto max-w-3xl px-4 py-10 text-center md:px-10">
          <h2 id="final-cta-title" className="text-3xl font-semibold leading-tight md:text-[2.75rem]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate">{body}</p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={to}>{button}</CtaLink>
          </div>
        </FocusFrame>
      </Container>
    </section>
  )
}
