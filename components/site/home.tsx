import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ChartColumn,
  ChartPie,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  GraduationCap,
  MessagesSquare,
  RefreshCw,
  Search,
  SlidersHorizontal,
  SquareUserRound,
  UserRound,
  Users,
} from 'lucide-react'
import type { PartnerCopy } from '@/content/partner'
import type { Dictionary } from '@/content/en'
import { href, type Locale, type PageKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { FinalCta } from './page-kit'
import { Container, CtaLink, Eyebrow } from './primitives'
import { Sentences } from './typeset'

type Labels = Dictionary['common']

/** Where each "What we do" service is described in full. 02 and 03 are both covered by Agency Partnerships. */
const serviceTarget: PageKey[] = ['ppc', 'agencies', 'agencies', 'training', 'audits']

export function HomePage({ locale, copy, labels }: { locale: Locale; copy: PartnerCopy; labels: Labels }) {
  const h = copy.home
  return (
    <>
      <Hero locale={locale} copy={copy} />
      <Autopilot copy={h.autopilot} eyebrow={labels.home.autopilotEyebrow} />
      <WhatWeDo locale={locale} copy={copy} />
      <Approach copy={h.approach} eyebrow={labels.home.approachEyebrow} />
      <Audiences locale={locale} copy={h.audiences} />
      <FinalCta id="final" title={h.final.title} paragraphs={h.final.paragraphs} cta={h.final.cta} to={href(locale, 'contact')} />
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

function Hero({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const hero = copy.home.hero
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-white">
      {/* Photo bleeds to the right viewport edge on desktop; the text column never sits under it. */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[56%]">
        <Image
          src="/images/hero-analyst.png"
          alt="Amazon PPC specialist reviewing campaign performance on her laptop"
          fill
          priority
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[78%_center]"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, #000 22%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 22%)',
          }}
        />
        <HeroInterface />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-6 py-12 lg:min-h-[600px] lg:w-[46%] lg:justify-center lg:py-16 lg:pr-8">
          {hero.eyebrow ? <Eyebrow>{hero.eyebrow}</Eyebrow> : null}
          <h1 className="max-w-[16ch] font-display text-[2.5rem] font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl xl:text-[3.5rem]">
            <Sentences text={hero.title} breakAt="always" />
          </h1>
          <div className="flex max-w-[58ch] flex-col gap-4 text-base leading-relaxed text-slate xl:text-[1.0625rem]">
            {hero.paragraphs.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
          <p className="border-l-2 border-sage pl-4 text-pretty text-lg font-semibold leading-snug text-ink">
            <Sentences text={hero.closingLine} />
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <CtaLink href={href(locale, 'contact')} className="whitespace-nowrap">
              {hero.primaryCta}
            </CtaLink>
            <CtaLink href="#what-we-do" variant="secondary" className="whitespace-nowrap">
              {hero.secondaryCta}
            </CtaLink>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** Native illustration of the analysis workflow. The chart is schematic — it carries no client figures. */
function HeroInterface() {
  const capabilities = [
    { Icon: CircleCheck, label: 'Bid optimisation', tone: 'text-sage bg-sage-tint' },
    { Icon: SquareUserRound, label: 'Keyword analysis', tone: 'text-cobalt bg-cobalt-tint' },
    { Icon: Search, label: 'Search term insights', tone: 'text-cobalt bg-cobalt-tint' },
    { Icon: ChartColumn, label: 'Performance reporting', tone: 'text-sage bg-sage-tint' },
  ]
  const sales = [30, 34, 33, 42, 40, 52, 50, 62, 70]
  const acos = [18, 20, 19, 24, 23, 27, 30, 32, 38]
  const bars = [14, 18, 16, 22, 20, 26, 30, 36, 44]
  const line = (pts: number[]) => pts.map((v, i) => `${(i / (pts.length - 1)) * 200},${80 - v}`).join(' ')
  const card = 'absolute rounded-xl border border-white/70 bg-white/95 shadow-[0_18px_40px_-18px_rgba(16,24,40,0.35)] backdrop-blur'
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      <div className={cn(card, 'left-[6%] top-[30%] w-[30%] max-w-[220px] p-3 lg:left-[2%]')}>
        <ul className="flex flex-col gap-2.5">
          {capabilities.map(({ Icon, label, tone }) => (
            <li key={label} className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-ink">
              <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-md', tone)}>
                <Icon className="size-4" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className={cn(card, 'right-[4%] top-[7%] w-[38%] max-w-[300px] p-4')}>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.8125rem] font-semibold text-ink">Campaign performance</p>
          <span className="flex items-center gap-1 whitespace-nowrap rounded-md border border-hairline px-2 py-0.5 text-[0.6875rem] text-slate">
            Last 30 days <ChevronDown className="size-3" />
          </span>
        </div>
        <svg viewBox="0 0 200 80" className="mt-3 h-20 w-full" preserveAspectRatio="none">
          {bars.map((b, i) => (
            <rect key={i} x={i * 22 + 2} y={80 - b} width="14" height={b} rx="2" className="fill-cobalt-tint" />
          ))}
          <polyline points={line(acos)} fill="none" strokeWidth="2" className="stroke-sage" />
          <polyline points={line(sales)} fill="none" strokeWidth="2" className="stroke-cobalt" />
        </svg>
        <div className="mt-2 flex gap-4 text-[0.6875rem] text-slate">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-cobalt" />
            Sales
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-sage" />
            ACOS
          </span>
          <span className="ml-auto italic">Illustrative</span>
        </div>
      </div>

      <div className={cn(card, 'bottom-[9%] right-[6%] w-[34%] max-w-[270px] p-4')}>
        <p className="text-[0.8125rem] font-semibold text-ink">Opportunity areas</p>
        <ul className="mt-2.5 flex flex-col gap-2 text-[0.75rem] text-slate">
          {['Increase top search term visibility', 'Improve conversion on key ASINs', 'Optimise budget allocation'].map((t, i) => (
            <li key={t} className="flex items-start gap-2">
              <span className={cn('mt-1 size-2 shrink-0 rounded-full', i === 0 ? 'bg-sage' : 'bg-cobalt')} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- Autopilot */

function Autopilot({ copy, eyebrow }: { copy: PartnerCopy['home']['autopilot']; eyebrow: string }) {
  const [first, ...rest] = copy.paragraphs
  return (
    <section aria-labelledby="autopilot" className="border-b border-hairline bg-white py-16 md:py-20">
      <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="autopilot" className="max-w-[18ch] text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink md:text-[2.5rem]">
            {copy.title}
          </h2>
        </div>
        <p className="text-pretty text-base leading-relaxed text-slate lg:col-span-4 lg:pt-10 xl:col-span-3">{first}</p>
        <div className="flex flex-col gap-4 text-base leading-relaxed text-slate lg:col-span-4 lg:pt-10 xl:col-span-3">
          {rest.map((p) => (
            <p key={p} className="text-pretty">
              {p}
            </p>
          ))}
        </div>
        <div className="relative hidden aspect-[4/5] self-start overflow-hidden rounded-2xl xl:col-span-2 xl:block">
          <Image src="/images/parcels.png" alt="" fill sizes="16vw" className="object-cover object-center" />
        </div>
        <p className="border-l-2 border-sage pl-4 text-xl font-semibold leading-snug text-ink md:col-span-2 lg:col-span-8 lg:col-start-5">
          <Sentences text={copy.closingLine} breakAt="always" />
        </p>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

const services = [
  { dark: true, ground: 'bg-ink', Icon: ChartColumn, art: '/images/svc/ppc.png', alt: 'Laptop showing an Amazon advertising dashboard' },
  { dark: false, ground: 'bg-cobalt-tint', Icon: Users, art: '/images/svc/white-label.png', alt: 'Two professionals shaking hands over a desk' },
  { dark: false, ground: 'bg-cobalt-tint', Icon: UserRound, art: '/images/svc/specialists.png', alt: 'PPC specialist with a headset working on a laptop' },
  { dark: false, ground: 'bg-sage-tint', Icon: GraduationCap, art: '/images/svc/training.png', alt: 'Laptop showing an online training lesson' },
  { dark: false, ground: 'bg-cobalt-tint', Icon: ChartPie, art: '/images/svc/audits.png', alt: 'Magnifying glass over printed performance reports' },
]

function WhatWeDo({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const w = copy.home.whatWeDo
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-24 bg-porcelain py-16 md:py-20">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <h2 id="what-we-do-title" className="flex items-center gap-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-slate">
            <span aria-hidden className="h-px w-6 bg-sage" />
            {w.title}
          </h2>
          <Link href={href(locale, 'services')} className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-ink hover:text-cobalt">
            Explore all services <ChevronRight aria-hidden className="size-4" />
          </Link>
        </div>
        {/* Cards keep equal collapsed heights by reserving fixed line counts for each text slot. */}
        <ul className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 min-[85rem]:grid-cols-5">
          {w.items.map((s, i) => {
            const v = services[i]
            const [excerpt, ...more] = s.paragraphs
            return (
              <li key={s.number} className={cn('flex flex-col overflow-hidden rounded-2xl', v.ground)}>
                <div className="flex flex-col p-5 pb-4">
                  <div className="flex items-center gap-3">
                    <span className={cn('text-xs font-semibold tabular-nums', v.dark ? 'text-mist' : 'text-cobalt')}>{s.number}</span>
                    <v.Icon aria-hidden className={cn('size-5', v.dark ? 'text-mist' : i === 3 ? 'text-sage' : 'text-cobalt')} />
                  </div>
                  <h3 className={cn('mt-3 min-h-[4.6875rem] text-balance font-display text-xl font-semibold leading-tight', v.dark ? 'text-white' : 'text-ink')}>
                    {s.name}
                  </h3>
                  <p className={cn('mt-2 min-h-[2.75rem] text-pretty text-[0.9375rem] font-medium leading-snug', v.dark ? 'text-white/90' : 'text-ink')}>{s.tagline}</p>
                  <p className={cn('mt-2 line-clamp-3 min-h-[4.125rem] text-pretty text-sm leading-relaxed', v.dark ? 'text-mist' : 'text-slate')}>
                    {excerpt}
                  </p>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image src={v.art} alt={v.alt} fill sizes="(min-width: 1360px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-right" />
                </div>
                <details className="group/d">
                  <summary
                    className={cn(
                      'flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 text-sm font-semibold [&::-webkit-details-marker]:hidden',
                      v.dark ? 'text-white' : 'text-ink',
                    )}
                  >
                    <span className="group-open/d:hidden">Read full description</span>
                    <span className="hidden group-open/d:inline">Show less</span>
                    <ChevronDown aria-hidden className="size-4 transition-transform group-open/d:rotate-180" />
                  </summary>
                  <div className={cn('flex flex-col gap-3 px-5 pb-5 text-sm leading-relaxed', v.dark ? 'text-mist' : 'text-slate')}>
                    <p>{excerpt}</p>
                    {more.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <Link
                      href={href(locale, serviceTarget[i])}
                      className={cn('mt-1 inline-flex items-center gap-1.5 font-semibold', v.dark ? 'text-white' : 'text-cobalt')}
                    >
                      View service <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </details>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------- Approach */

const approachIcons = [UserRound, RefreshCw, ChartPie, MessagesSquare, SlidersHorizontal]

function Approach({ copy, eyebrow }: { copy: PartnerCopy['home']['approach']; eyebrow: string }) {
  return (
    <section aria-labelledby="approach" className="border-b border-hairline bg-white py-16 md:py-20">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-4 lg:col-span-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="approach" className="text-balance font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ink md:text-[2.25rem]">
              {copy.title}
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8">
            <p className="text-pretty text-lg font-semibold text-cobalt">{copy.subtitle}</p>
            <p className="max-w-[56ch] text-pretty text-base leading-relaxed text-slate">{copy.intro}</p>
          </div>
        </div>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 min-[85rem]:grid-cols-5 min-[85rem]:gap-0 min-[85rem]:divide-x min-[85rem]:divide-hairline">
          {copy.items.map((it, i) => {
            const Icon = approachIcons[i]
            return (
              <li key={it.title} className="flex flex-col gap-3 min-[85rem]:px-6 min-[85rem]:first:pl-0 min-[85rem]:last:pr-0">
                <span className="flex size-11 items-center justify-center rounded-lg bg-cobalt-tint text-cobalt">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-base font-semibold leading-snug text-ink">{it.title}</h3>
                <p className="text-pretty text-[0.9375rem] leading-relaxed text-slate">{it.body}</p>
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
    { ...copy.brands, to: href(locale, 'ppc'), image: '/images/svc/brands.png', alt: 'Consumer products beside an open shipping box', dark: false },
    { ...copy.agencies, to: href(locale, 'agencies'), image: '/images/agency-team.png', alt: 'Two agency colleagues reviewing PPC work on a laptop', dark: true },
  ]
  return (
    <section aria-labelledby="audiences" className="bg-white py-16 md:py-20">
      <Container>
        <h2 id="audiences" className="sr-only">
          {copy.title}
        </h2>
        <div className="grid gap-6 xl:grid-cols-2">
          {panels.map((p) => (
            <article key={p.title} className="grid overflow-hidden rounded-2xl border border-hairline sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[340px]">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className={cn('flex flex-col gap-4 p-7 lg:p-9', p.dark ? 'bg-ink' : 'bg-cobalt-tint')}>
                <h3 className={cn('font-display text-2xl font-semibold', p.dark ? 'text-white' : 'text-ink')}>{p.title}</h3>
                <div className={cn('flex flex-col gap-3 text-[0.9375rem] leading-relaxed', p.dark ? 'text-mist' : 'text-slate')}>
                  {p.paragraphs.map((para) => (
                    <p key={para} className="text-pretty">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-2">
                  <CtaLink href={p.to} variant={p.dark ? 'sage' : 'primary'} className="min-h-11 whitespace-nowrap px-5 text-sm">
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
