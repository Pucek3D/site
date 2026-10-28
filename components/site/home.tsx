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
import { ServiceTile } from './service-tile'

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
    <section className="relative flex flex-col-reverse overflow-hidden border-b border-hairline bg-white lg:block">
      {/* Photo bleeds to the right viewport edge on desktop; the text column never sits under it. */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[58%]">
  <Image
          src="/images/hero-analyst.png"
          alt="Professional reviewing advertising analysis at a laptop (illustrative photography)"
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="adelier-hero-photo object-cover object-[58%_center]"
        />
        <HeroInterface />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-5 py-12 lg:min-h-[560px] lg:w-[48%] lg:justify-center lg:py-11 lg:pr-3">
          {hero.eyebrow ? <Eyebrow>{hero.eyebrow}</Eyebrow> : null}
          <h1 className="max-w-[17ch] font-display text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:max-w-none lg:text-[2.35rem] xl:text-[2.75rem]">
            {/* The middle line is the widest; nowrap only applies where the column is measured to hold it. */}
            {locale === 'en' && hero.title === 'Smarter Amazon Advertising. More Control. Better Performance.' ? (
              <>
                <span className="lg:block lg:whitespace-nowrap">Smarter Amazon{' '}</span>
                <span className="lg:block lg:whitespace-nowrap">Advertising. More Control.{' '}</span>
                <span className="lg:block lg:whitespace-nowrap">Better Performance.</span>
              </>
            ) : (
              <Sentences text={hero.title} breakAt="lg" />
            )}
          </h1>
          <div className="flex max-w-[58ch] flex-col gap-3 text-[0.9375rem] leading-[1.65] text-slate xl:text-base">
            {hero.paragraphs.map((p) => (
              <p key={p} className="text-pretty">
                {p}
              </p>
            ))}
          </div>
          <p className="border-l-2 border-sage pl-4 text-pretty text-[1rem] font-semibold leading-snug text-ink">
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
      <div className={cn(card, 'left-[9%] top-[31%] w-[30%] max-w-[220px] p-3 lg:left-[12%]')}>
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
  return (
    <section aria-labelledby="autopilot" className="border-b border-hairline bg-white py-10 md:py-12">
      <Container className="grid gap-6 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8">
        <div className="flex flex-col gap-4 lg:col-span-6 xl:col-span-3">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="autopilot" className="max-w-[18ch] text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink md:text-[2.25rem] xl:text-[2.125rem]">
            {copy.title}
          </h2>
        </div>
        {copy.paragraphs.map((p) => (
          <p key={p} className="text-pretty text-base leading-relaxed text-slate lg:col-span-6 xl:col-span-3 xl:pt-8 xl:text-[0.9375rem]">
            {p}
          </p>
        ))}
        <div className="relative aspect-[16/7] overflow-hidden rounded-2xl lg:col-span-6 xl:col-span-3 xl:col-start-4">
          <Image src="/images/parcels.png" alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
        </div>
        <p className="self-start border-l-2 border-sage pl-5 font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[1.75rem] lg:col-span-6 xl:col-span-6">
          <Sentences text={copy.closingLine} breakAt="always" />
        </p>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

const services = [
  { ground: 'bg-cobalt-tint', Icon: ChartColumn, art: '/images/svc/ppc.png', alt: 'Laptop showing an Amazon advertising dashboard' },
  { ground: 'bg-cobalt-tint', Icon: Users, art: '/images/svc/white-label-handshake.png', alt: 'Two business partners shaking hands over a desk with a laptop', focus: '58% 45%' },
  { ground: 'bg-cobalt-tint', Icon: UserRound, art: '/images/svc/specialists.png', alt: 'PPC specialist with a headset working on a laptop' },
  { ground: 'bg-sage-tint', Icon: GraduationCap, art: '/images/svc/training-team.png', alt: 'Two colleagues reviewing work together on a laptop' },
  { ground: 'bg-cobalt-tint', Icon: ChartPie, art: '/images/svc/audits.png', alt: 'Magnifying glass over printed performance reports', focus: '78% 60%', zoom: 1.45 },
]

const TILE_LABELS: Record<Locale, { more: string; less: string; view: string }> = {
  en: { more: 'Read more', less: 'Show less', view: 'View service' },
  pl: { more: 'Czytaj więcej', less: 'Zwiń', view: 'Zobacz usługę' },
  de: { more: 'Mehr lesen', less: 'Weniger anzeigen', view: 'Leistung ansehen' },
}

const EXPLORE_ALL: Record<Locale, string> = {
  en: 'Explore all services',
  pl: 'Zobacz wszystkie usługi',
  de: 'Alle Leistungen ansehen',
}

/* Indexes into the content's own item order (01 PPC, 02 White-label, 03 Specialists, 04 Training, 05 Audits). */
const TRAINING_INDEX = 3
const TILE_ORDER = [0, 1, 2, 4, TRAINING_INDEX]

function WhatWeDo({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const w = copy.home.whatWeDo
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-24 bg-porcelain py-14 md:py-16">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <h2 id="what-we-do-title" className="flex items-center gap-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-slate">
            <span aria-hidden className="h-px w-6 bg-sage" />
            {w.title}
          </h2>
          {/* No services index page exists (the header's Services item is a dropdown), so this opens the first service. */}
          <Link href={href(locale, 'ppc')} className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-ink hover:text-cobalt">
            {EXPLORE_ALL[locale]} <ChevronRight aria-hidden className="size-4" />
          </Link>
        </div>
        {/* One flat full-width tile per row; the image alternates sides so the list reads as a sequence of rows, not a grid. */}
        <ul className="mt-7 flex flex-col gap-5">
          {TILE_ORDER.map((i, row) => {
            const s = w.items[i]
            const v = services[i]
            return (
              <ServiceTile
                key={s.number}
                number={s.number}
                name={s.name}
                tagline={s.tagline}
                paragraphs={s.paragraphs}
                bullets={s.bullets}
                icon={
                  <v.Icon
                    aria-hidden
                    className={cn(
                      'size-5 transition-colors group-hover:text-mist group-focus-within:text-mist group-data-[open=true]:text-mist',
                      i === 3 ? 'text-sage' : 'text-cobalt',
                    )}
                  />
                }
                art={v.art}
                alt={v.alt}
                focus={'focus' in v ? v.focus : undefined}
                zoom={'zoom' in v ? v.zoom : undefined}
                accent={i === TRAINING_INDEX ? 'sage' : 'cobalt'}
                to={href(locale, serviceTarget[i])}
                labels={TILE_LABELS[locale]}
                imageLeft={row % 2 === 1}
              />
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
    <section aria-labelledby="approach" className="border-b border-hairline bg-white py-10 md:py-12">
      {/* Wide desktop matches the approved layout: intro is the first of six columns, beside the five pillars. */}
      <Container className="flex flex-col gap-9 xl:flex-row xl:gap-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end xl:flex xl:w-[21%] xl:shrink-0 xl:flex-col xl:items-start xl:gap-3">
          <div className="flex flex-col gap-4 lg:col-span-6 xl:gap-3">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="approach" className="text-balance font-display text-3xl font-semibold leading-[1.14] tracking-tight text-ink md:text-[2rem] xl:text-[1.625rem]">
              {copy.title}
            </h2>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8">
            <p className="text-pretty text-lg font-semibold text-cobalt xl:text-base">
              {copy.subtitle.split(/(?<=\.)\s+/).map((sentence) => (
                <span key={sentence} className="block">
                  {sentence}
                </span>
              ))}
            </p>
            <p className="max-w-[56ch] text-pretty text-base leading-relaxed text-slate xl:text-[0.875rem]">{copy.intro}</p>
          </div>
        </div>
        <ul className="grid min-w-0 flex-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-0 xl:divide-x xl:divide-hairline">
          {copy.items.map((it, i) => {
            const Icon = approachIcons[i]
            return (
              <li key={it.title} className="flex min-w-0 flex-col gap-3 hyphens-auto break-words xl:px-5 xl:first:pl-0 xl:last:pr-0">
                <span className="flex size-11 items-center justify-center rounded-lg bg-cobalt-tint text-cobalt">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-base font-semibold leading-snug text-ink">{it.title}</h3>
                <p className="text-pretty text-[0.875rem] leading-relaxed text-slate">{it.body}</p>
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
    { ...copy.brands, to: href(locale, 'ppc'), image: '/images/svc/brands.png', alt: 'Stacked Amazon shipping boxes in front of a rising growth arrow', dark: false, focus: '100% 30%' },
    { ...copy.agencies, to: href(locale, 'agencies'), image: '/images/agency-team.png', alt: 'Two agency colleagues reviewing PPC work on a laptop', dark: true },
  ]
  return (
    <section aria-labelledby="audiences" className="bg-white py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1560px] px-5 sm:px-8 lg:px-6 xl:px-8">
        <h2 id="audiences" className="sr-only">
          {copy.title}
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {panels.map((p) => (
            <article key={p.title} className="grid overflow-hidden rounded-2xl border border-hairline sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[270px]">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-cover" style={'focus' in p && p.focus ? { objectPosition: p.focus } : undefined} />
              </div>
              <div className={cn('flex flex-col gap-3 p-6 lg:p-6', p.dark ? 'bg-ink' : 'bg-cobalt-tint')}>
                <h3 className={cn('font-display text-[1.375rem] font-semibold', p.dark ? 'text-white' : 'text-ink')}>{p.title}</h3>
                <div className={cn('flex flex-col gap-3 text-[0.875rem] leading-relaxed', p.dark ? 'text-mist' : 'text-slate')}>
                  {p.paragraphs.map((para) => (
                    <p key={para} className="text-pretty">
                      {para}
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-2">
                  <CtaLink href={p.to} variant={p.dark ? 'sage' : 'primary'} className="min-h-11 max-w-full px-5 text-left text-sm">
                    {p.cta}
                    <ArrowRight aria-hidden className="size-4" />
                  </CtaLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
