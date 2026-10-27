import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUp, ChartPie, Check, ChevronDown, MessagesSquare, Minus, Plus, RefreshCw, Route, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import type { PartnerCopy } from '@/content/partner'
import type { Dictionary } from '@/content/en'
import { href, type Locale, type PageKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { CheckList, FinalCta, Paragraphs } from './page-kit'
import { Container, CtaLink, Eyebrow } from './primitives'

type Service = PartnerCopy['home']['whatWeDo']['items'][number]
type Labels = Dictionary['common']

/** Where each "What we do" service is described in full. 02 and 03 are both covered by Agency Partnerships. */
const serviceTarget: PageKey[] = ['ppc', 'agencies', 'agencies', 'training', 'audits']

export function HomePage({ locale, copy, labels }: { locale: Locale; copy: PartnerCopy; labels: Labels }) {
  const h = copy.home
  return (
    <>
      <Hero locale={locale} copy={copy} />
      <Autopilot copy={h.autopilot} />
      <WhatWeDo locale={locale} copy={copy} labels={labels} />
      <Approach copy={h.approach} />
      <Audiences locale={locale} copy={h.audiences} />
      <FinalCta id="final" title={h.final.title} paragraphs={h.final.paragraphs} cta={h.final.cta} to={href(locale, 'contact')} />
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

function Hero({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const hero = copy.home.hero
  const bullets = copy.home.whatWeDo.items[0].bullets ?? []
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <Container className="grid gap-12 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-7 lg:col-span-7 lg:pr-6">
          {hero.eyebrow ? <Eyebrow>{hero.eyebrow}</Eyebrow> : null}
          <h1 className="text-balance font-display text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <div className="flex max-w-xl flex-col gap-4">
            <Paragraphs items={hero.paragraphs} className="text-lg" />
          </div>
          <p className="max-w-xl border-l-2 border-sage pl-4 text-pretty text-lg font-semibold text-ink">{hero.closingLine}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <CtaLink href={href(locale, 'contact')}>{hero.primaryCta}</CtaLink>
            <CtaLink href="#what-we-do" variant="secondary">
              {hero.secondaryCta}
            </CtaLink>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-2xl bg-porcelain lg:aspect-[3/4]">
            <Image
              src="/images/specialist.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover object-[60%_30%]"
            />
          </div>

          {/* Decorative interface fragments: they name the work, they report no results. */}
          <div aria-hidden className="absolute -left-2 bottom-10 w-60 rounded-xl border border-hairline bg-white p-4 shadow-[0_14px_30px_-18px_rgba(16,24,40,0.35)] sm:-left-6 lg:-left-16">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate">{bullets[1]}</span>
              <span className="size-2 rounded-full bg-sage" />
            </div>
            {/* Search terms under review, not a performance trend: an ascending bar chart would imply a result. */}
            <div className="mt-4 flex flex-col gap-2">
              {[
                { w: 'w-[78%]', Icon: Check, tone: 'text-sage' },
                { w: 'w-[62%]', Icon: ArrowUp, tone: 'text-cobalt' },
                { w: 'w-[70%]', Icon: Minus, tone: 'text-slate' },
              ].map(({ w, Icon, tone }, i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-porcelain px-2.5 py-2">
                  <span className={cn('h-1.5 rounded-full bg-ink/25', w)} />
                  <Icon className={cn('ml-auto size-3.5 shrink-0', tone)} strokeWidth={3} />
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden className="absolute right-3 top-6 flex items-center gap-2 rounded-full border border-hairline bg-white py-2 pl-2 pr-4 shadow-[0_10px_24px_-16px_rgba(16,24,40,0.35)] sm:right-6">
            <span className="flex size-6 items-center justify-center rounded-full bg-sage-tint">
              <RefreshCw className="size-3.5 text-sage" strokeWidth={2.5} />
            </span>
            <span className="text-xs font-medium text-ink">{bullets[2]}</span>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------- Autopilot */

function Autopilot({ copy }: { copy: PartnerCopy['home']['autopilot'] }) {
  const [lead, ...rest] = copy.paragraphs
  return (
    <section aria-labelledby="autopilot" className="bg-porcelain py-20 md:py-28">
      <Container>
        <h2 id="autopilot" className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink md:text-[3.5rem]">
          {copy.title}
        </h2>
        <div className="mt-14 grid gap-10 border-t border-hairline pt-10 lg:grid-cols-12">
          <p className="text-pretty font-display text-2xl font-medium leading-snug text-ink lg:col-span-5">{lead}</p>
          <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7">
            <Paragraphs items={rest} className="text-lg" />
          </div>
        </div>
        <div className="mt-14 rounded-2xl bg-ink px-8 py-10 md:px-14 md:py-14">
          <span aria-hidden className="block h-1 w-12 bg-sage" />
          <p className="mt-6 max-w-3xl text-balance font-display text-3xl font-semibold leading-tight text-white md:text-[2.5rem]">{copy.closingLine}</p>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

type Tone = 'ink' | 'white' | 'sage'

const tileTone: Record<Tone, { box: string; title: string; tag: string; num: string; link: string; panel: string }> = {
  ink: { box: 'bg-ink', title: 'text-white', tag: 'text-sage', num: 'text-mist', link: 'text-white', panel: 'bg-white/[0.04] ring-1 ring-white/10' },
  white: { box: 'border border-hairline bg-white', title: 'text-ink', tag: 'text-cobalt', num: 'text-slate', link: 'text-cobalt', panel: 'bg-porcelain' },
  sage: { box: 'bg-sage-tint', title: 'text-ink', tag: 'text-ink', num: 'text-ink', link: 'text-ink', panel: 'bg-white/70' },
}

/**
 * Layout per service, in the partner's order. No tile spans two rows: a row-spanning tile stretches to the
 * height of whatever sits beside it, which is what left the PPC tile with a large empty band.
 * Wide tiles put copy beside the illustration; narrow tiles share one illustration band height so they align.
 */
const tiles: { tone: Tone; wide: boolean; visual: ReactNode }[] = [
  { tone: 'ink', wide: true, visual: <PpcVisual /> },
  { tone: 'white', wide: false, visual: <WhiteLabelVisual /> },
  { tone: 'white', wide: false, visual: <SpecialistsVisual /> },
  { tone: 'sage', wide: false, visual: <TrainingVisual /> },
  { tone: 'white', wide: true, visual: <AuditVisual /> },
]

function WhatWeDo({ locale, copy, labels }: { locale: Locale; copy: PartnerCopy; labels: Labels }) {
  const w = copy.home.whatWeDo
  const pageName = (k: PageKey) => copy.pageNames[k as keyof PartnerCopy['pageNames']]
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <h2 id="what-we-do-title" className="font-display text-4xl font-semibold tracking-tight text-ink md:text-[3.5rem]">
          {w.title}
        </h2>
        <ul className="mt-12 grid gap-5 lg:grid-cols-6">
          {w.items.map((s, i) => (
            <ServiceTile
              key={s.number}
              service={s}
              layout={tiles[i]}
              to={href(locale, serviceTarget[i])}
              linkLabel={pageName(serviceTarget[i])}
              labels={labels}
              featured={i === 0}
            />
          ))}
        </ul>
      </Container>
    </section>
  )
}

function ServiceTile({
  service,
  layout,
  to,
  linkLabel,
  labels,
  featured,
}: {
  service: Service
  layout: (typeof tiles)[number]
  to: string
  linkLabel: string
  labels: Labels
  featured: boolean
}) {
  const t = tileTone[layout.tone]
  const dark = layout.tone === 'ink'
  // Every tile opens on its first paragraph; the rest of the partner's text stays one click away, never cut.
  const [first, ...rest] = service.paragraphs
  const bullets = service.bullets ?? []

  const copyBlock = (
    <div className="flex min-w-0 flex-1 flex-col">
      <span className={cn('text-sm font-semibold tabular-nums', t.num)}>{service.number}</span>
      <h3 className={cn('mt-4 text-balance font-display font-semibold leading-tight', featured ? 'text-3xl md:text-[2.5rem]' : 'text-2xl', t.title)}>
        {service.name}
      </h3>
      <p className={cn('mt-3 text-pretty font-medium', featured ? 'text-xl' : 'text-lg', t.tag)}>{service.tagline}</p>
      <div className="mt-5">
        <Paragraphs items={[first]} dark={dark} />
      </div>

      {rest.length || bullets.length ? (
        <details className="group/d mt-4">
          <summary
            className={cn(
              'inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-md text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt [&::-webkit-details-marker]:hidden',
              t.title,
            )}
          >
            <span className="group-open/d:hidden">{labels.showMore}</span>
            <span className="hidden group-open/d:inline">{labels.showLess}</span>
            <ChevronDown aria-hidden className="size-4 transition-transform group-open/d:rotate-180" />
          </summary>
          <div className="mt-3 flex flex-col gap-5">
            {rest.length ? <Paragraphs items={rest} dark={dark} /> : null}
            {bullets.length ? dark ? <DarkChecks items={bullets} /> : <CheckList items={bullets} /> : null}
          </div>
        </details>
      ) : null}

      <div className={cn('mt-auto pt-6', dark && 'mt-8 border-t border-white/10')}>
        <Link href={to} className={cn('inline-flex min-h-11 items-center gap-2 font-semibold hover:underline', t.link)}>
          {linkLabel}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )

  if (layout.wide) {
    return (
      <li className={cn('group grid gap-8 rounded-2xl p-7 md:p-10 lg:col-span-6 lg:grid-cols-12 lg:gap-12', t.box)}>
        <div className="flex lg:col-span-7">{copyBlock}</div>
        <div className={cn('flex items-center justify-center rounded-xl p-6 md:p-8 lg:col-span-5 lg:self-start', t.panel)}>
          {layout.visual}
        </div>
      </li>
    )
  }

  return (
    <li className={cn('group flex flex-col gap-7 rounded-2xl p-7 md:p-8 lg:col-span-2', t.box)}>
      <div className={cn('flex h-28 items-center justify-center rounded-xl px-4', t.panel)}>{layout.visual}</div>
      {copyBlock}
    </li>
  )
}

function DarkChecks({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 leading-relaxed text-white">
          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-sage" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/*
 * Tile illustrations. Decorative and aria-hidden: each draws the shape of the work, never a result,
 * so there are no figures, axes or trend lines anywhere in them.
 */

/** Campaign analysis: a campaign → ad groups → search terms, each term reviewed and given a decision. */
function PpcVisual() {
  const terms: { w: string; mark: 'keep' | 'raise' | 'negate' }[] = [
    { w: 'w-[72%]', mark: 'keep' },
    { w: 'w-[58%]', mark: 'raise' },
    { w: 'w-[66%]', mark: 'negate' },
    { w: 'w-[48%]', mark: 'keep' },
  ]
  return (
    <div aria-hidden className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-2.5 rounded-lg bg-white/10 px-3 py-2.5">
        <span className="size-2.5 rounded-sm bg-cobalt" />
        <span className="h-2 w-28 rounded-full bg-white/60" />
      </div>
      <div className="ml-4 flex flex-col gap-2 border-l border-white/15 pl-4">
        {terms.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-md bg-white/[0.06] px-3 py-2">
            <span className={cn('h-1.5 rounded-full', r.w, r.mark === 'negate' ? 'bg-white/20' : 'bg-white/45')} />
            <span className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
              {r.mark === 'keep' ? <Check className="size-3.5 text-sage" strokeWidth={3} /> : null}
              {r.mark === 'raise' ? <ArrowUp className="size-3.5 text-cobalt-tint" strokeWidth={3} /> : null}
              {r.mark === 'negate' ? <Minus className="size-3.5 text-mist" strokeWidth={3} /> : null}
            </span>
          </div>
        ))}
      </div>
      <div className="ml-4 flex items-center gap-2 pl-4 pt-1">
        <RefreshCw className="size-3.5 text-sage" strokeWidth={2.5} />
        <span className="h-1.5 w-20 rounded-full bg-sage/50" />
      </div>
    </div>
  )
}

/** Agency → specialist delivery: the client faces the agency only; the work runs behind it and returns. */
function WhiteLabelVisual() {
  return (
    <svg viewBox="0 0 220 72" className="h-16 w-auto" aria-hidden>
      <circle cx="18" cy="36" r="11" className="fill-none stroke-slate" strokeWidth="2" />
      <line x1="30" y1="36" x2="62" y2="36" className="stroke-slate" strokeWidth="2" />
      <rect x="64" y="18" width="56" height="36" rx="7" className="fill-white stroke-ink" strokeWidth="2" />
      <rect x="74" y="31" width="24" height="3" rx="1.5" className="fill-ink" />
      <rect x="74" y="39" width="34" height="3" rx="1.5" className="fill-slate/50" />
      <path d="M122 28 H158" className="stroke-cobalt" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M152 23 L158 28 L152 33" className="fill-none stroke-cobalt" strokeWidth="2" />
      <path d="M158 46 H122" className="stroke-sage" strokeWidth="2" />
      <path d="M128 41 L122 46 L128 51" className="fill-none stroke-sage" strokeWidth="2" />
      <rect x="160" y="18" width="52" height="36" rx="7" className="fill-ink" />
      <rect x="170" y="31" width="22" height="3" rx="1.5" className="fill-white/70" />
      <rect x="170" y="39" width="30" height="3" rx="1.5" className="fill-white/35" />
    </svg>
  )
}

/** Team integration: the existing team, one specialist joined in, and open slots for capacity on demand. */
function SpecialistsVisual() {
  return (
    <div aria-hidden className="flex items-center gap-3">
      <div className="flex items-center rounded-full bg-white p-1.5 ring-1 ring-hairline">
        {[0, 1, 2].map((i) => (
          <span key={i} className="-ml-1.5 flex size-9 items-center justify-center rounded-full bg-porcelain ring-2 ring-white first:ml-0">
            <UserRound className="size-4 text-slate" />
          </span>
        ))}
        <span className="-ml-1.5 flex size-9 items-center justify-center rounded-full bg-cobalt ring-2 ring-white">
          <UserRound className="size-4 text-white" />
        </span>
      </div>
      {[0, 1].map((i) => (
        <span key={i} className="flex size-9 items-center justify-center rounded-full border-2 border-dashed border-cobalt/40">
          <Plus className="size-3.5 text-cobalt/60" strokeWidth={2.5} />
        </span>
      ))}
    </div>
  )
}

/** Applied learning: a path of modules, completed ones filled, the current one in progress. */
function TrainingVisual() {
  const steps = ['done', 'done', 'current', 'next', 'next'] as const
  return (
    <div aria-hidden className="flex w-full max-w-[15rem] items-center">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-1 items-center last:flex-none">
          <span
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-full',
              s === 'done' && 'bg-sage',
              s === 'current' && 'bg-white ring-2 ring-sage',
              s === 'next' && 'bg-white ring-1 ring-sage/40',
            )}
          >
            {s === 'done' ? <Check className="size-4 text-white" strokeWidth={3} /> : null}
            {s === 'current' ? <span className="size-2.5 rounded-full bg-sage" /> : null}
          </span>
          {i < steps.length - 1 ? <span className={cn('h-0.5 flex-1', i < 2 ? 'bg-sage' : 'bg-sage/30')} /> : null}
        </div>
      ))}
    </div>
  )
}

/** Structured evaluation: findings placed on impact × effort, the high-impact low-effort ones taken first. */
function AuditVisual() {
  const dots = [
    { x: 22, y: 24, first: true },
    { x: 34, y: 34, first: true },
    { x: 70, y: 28, first: false },
    { x: 28, y: 70, first: false },
    { x: 62, y: 62, first: false },
    { x: 80, y: 76, first: false },
  ]
  return (
    <div aria-hidden className="flex w-full max-w-sm items-stretch gap-5">
      <div className="relative aspect-square w-40 shrink-0 rounded-lg bg-white ring-1 ring-hairline sm:w-44">
        <span className="absolute inset-y-3 left-1/2 w-px bg-hairline" />
        <span className="absolute inset-x-3 top-1/2 h-px bg-hairline" />
        <span className="absolute left-3 top-3 h-[calc(50%-12px)] w-[calc(50%-12px)] rounded-md bg-cobalt-tint" />
        {dots.map((d, i) => (
          <span
            key={i}
            className={cn('absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full', d.first ? 'bg-cobalt' : 'bg-slate/35')}
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          />
        ))}
      </div>
      <ol className="flex flex-1 flex-col justify-center gap-2.5">
        {['w-full', 'w-4/5', 'w-3/5'].map((w, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className={cn('size-2 shrink-0 rounded-full', i < 2 ? 'bg-cobalt' : 'bg-slate/35')} />
            <span className={cn('h-2 rounded-full', w, i < 2 ? 'bg-ink/70' : 'bg-slate/30')} />
          </li>
        ))}
      </ol>
    </div>
  )
}

/* -------------------------------------------------------------- Approach */

const approachIcons = [UserRound, RefreshCw, ChartPie, MessagesSquare, Route]

function Approach({ copy }: { copy: PartnerCopy['home']['approach'] }) {
  return (
    <section aria-labelledby="approach" className="bg-porcelain py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <div className="lg:sticky lg:top-28 flex flex-col gap-5">
            <h2 id="approach" className="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">
              {copy.title}
            </h2>
            <p className="text-pretty text-xl font-medium text-cobalt">{copy.subtitle}</p>
            <p className="text-pretty text-lg leading-relaxed text-slate">{copy.intro}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-4 lg:col-span-7 lg:col-start-6">
          {copy.items.map((it, i) => {
            const Icon = approachIcons[i]
            return (
              <li
                key={it.title}
                className={cn('flex gap-6 rounded-2xl bg-white p-7 md:p-8', i % 2 === 1 && 'lg:ml-12', i === copy.items.length - 1 && 'bg-ink')}
              >
                <span
                  className={cn(
                    'flex size-12 shrink-0 items-center justify-center rounded-xl',
                    i === copy.items.length - 1 ? 'bg-sage/20 text-sage' : 'bg-cobalt-tint text-cobalt',
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className={cn('font-display text-xl font-semibold', i === copy.items.length - 1 ? 'text-white' : 'text-ink')}>{it.title}</h3>
                  <p className={cn('text-pretty leading-relaxed', i === copy.items.length - 1 ? 'text-mist' : 'text-slate')}>{it.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------- Audiences */

function Audiences({ locale, copy }: { locale: Locale; copy: PartnerCopy['home']['audiences'] }) {
  const panels = [
    { ...copy.brands, to: href(locale, 'ppc'), image: '/images/architecture.webp', dark: false },
    { ...copy.agencies, to: href(locale, 'agencies'), image: '/images/studio.webp', dark: true },
  ]
  return (
    <section aria-labelledby="audiences" className="py-20 md:py-28">
      <Container>
        <h2 id="audiences" className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">
          {copy.title}
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {panels.map((p) => (
            <article key={p.title} className={cn('flex flex-col overflow-hidden rounded-2xl', p.dark ? 'bg-ink' : 'bg-cobalt-tint')}>
              <div className="relative aspect-[16/7] w-full">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-5 p-8 md:p-10">
                <h3 className={cn('font-display text-3xl font-semibold', p.dark ? 'text-white' : 'text-ink')}>{p.title}</h3>
                <Paragraphs items={p.paragraphs} className="text-lg" dark={p.dark} />
                <div className="mt-auto pt-4">
                  <CtaLink href={p.to} variant={p.dark ? 'sage' : 'primary'}>
                    {p.cta}
                    <ArrowRight aria-hidden className="size-4" />
                  </CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
