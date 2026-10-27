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
  SquareUser,
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
type HomeLabels = Labels['home']

/** Where each "What we do" service is described in full. 02 and 03 are both covered by Agency Partnerships. */
const serviceTarget: PageKey[] = ['ppc', 'agencies', 'agencies', 'training', 'audits']

export function HomePage({ locale, copy, labels }: { locale: Locale; copy: PartnerCopy; labels: Labels }) {
  const h = copy.home
  return (
    <>
      <Hero locale={locale} copy={copy} labels={labels.home} />
      <Autopilot copy={h.autopilot} eyebrow={labels.home.autopilotEyebrow} />
      <WhatWeDo locale={locale} copy={copy} />
      <Approach copy={h.approach} eyebrow={labels.home.approachEyebrow} />
      <Audiences locale={locale} copy={h.audiences} />
      <FinalCta id="final" title={h.final.title} paragraphs={h.final.paragraphs} cta={h.final.cta} to={href(locale, 'contact')} />
    </>
  )
}

/* ------------------------------------------------------------------ Hero */

const cardShadow = 'shadow-[0_18px_40px_-20px_rgba(16,24,40,0.35)]'

function Hero({ locale, copy, labels }: { locale: Locale; copy: PartnerCopy; labels: HomeLabels }) {
  const hero = copy.home.hero
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-white">
      {/* Photograph fills the right of the band and fades into the white copy column. */}
      <div className="relative h-72 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[62%]">
        <Image
          src="/images/hero-analyst.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[55%_30%]"
        />
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-white via-white/70 to-transparent lg:block" />
      </div>

      <Container className="relative lg:min-h-[620px]">
        <div className="flex max-w-[560px] flex-col gap-6 py-12 lg:py-20">
          {hero.eyebrow ? <Eyebrow>{hero.eyebrow}</Eyebrow> : null}
          <h1 className="text-balance font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            <Sentences text={hero.title} breakAt="always" />
          </h1>
          <div className="flex flex-col gap-3 text-[1.0625rem] leading-relaxed text-slate">
            {hero.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="border-l-2 border-sage pl-4 text-pretty text-lg font-semibold text-ink">
            <Sentences text={hero.closingLine} />
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <CtaLink href={href(locale, 'contact')}>{hero.primaryCta}</CtaLink>
            <CtaLink href="#what-we-do" variant="secondary">
              {hero.secondaryCta}
            </CtaLink>
          </div>
        </div>
      </Container>

      <HeroCards labels={labels} />
    </section>
  )
}

const toolIcons = [CircleCheck, SquareUser, Search, ChartColumn]

/** Decorative interface fragments over the photograph. They illustrate the work; they report no client figures. */
function HeroCards({ labels }: { labels: HomeLabels }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* Connectors between the cards */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 1000 620" preserveAspectRatio="none" fill="none">
        <path d="M570 300 C 650 300, 690 330, 715 340" stroke="#b8c1d6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M715 340 C 760 300, 790 200, 800 150" stroke="#b8c1d6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M715 340 C 760 380, 790 420, 815 440" stroke="#b8c1d6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="absolute left-[71.5%] top-[54.8%] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt ring-4 ring-cobalt/20" />

      {/* Tools list */}
      <div className={cn('absolute left-[47%] top-[40%] w-56 rounded-xl border border-hairline bg-white p-3', cardShadow)}>
        <ul className="flex flex-col gap-2">
          {labels.tools.map((t, i) => {
            const Icon = toolIcons[i]
            return (
              <li key={t} className="flex items-center gap-3 text-sm text-ink">
                <span className={cn('flex size-7 items-center justify-center rounded-md', i % 2 ? 'bg-cobalt-tint text-cobalt' : 'bg-sage-tint text-sage')}>
                  <Icon className="size-4" />
                </span>
                {t}
              </li>
            )
          })}
        </ul>
      </div>

      {/* Campaign performance */}
      <div className={cn('absolute right-[3%] top-[6%] w-[340px] rounded-xl border border-hairline bg-white p-4', cardShadow)}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">{labels.campaignPerformance}</span>
          <span className="flex items-center gap-1 rounded-md border border-hairline px-2 py-1 text-xs text-slate">
            {labels.range}
            <ChevronDown className="size-3" />
          </span>
        </div>
        <svg viewBox="0 0 300 110" className="mt-3 h-28 w-full">
          {[40, 30, 46, 38, 52, 60, 58, 72, 84].map((h, i) => (
            <rect key={i} x={20 + i * 30} y={110 - h} width="18" height={h} rx="2" fill="#eaf0ff" />
          ))}
          <polyline points="10,92 45,86 80,88 115,78 150,80 185,70 220,64 255,56 290,50" stroke="#3faf8f" strokeWidth="2" fill="none" />
          <polyline points="10,80 45,72 80,74 115,58 150,62 185,46 220,40 255,28 290,12" stroke="#315bff" strokeWidth="2" fill="none" />
          <circle cx="290" cy="12" r="4.5" fill="#315bff" />
        </svg>
        <div className="mt-3 flex items-center gap-5 text-xs text-ink">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-cobalt" />
            {labels.sales}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-sage" />
            {labels.acos}
          </span>
        </div>
      </div>

      {/* Opportunity areas */}
      <div className={cn('absolute bottom-[8%] right-[6%] w-[300px] rounded-xl border border-hairline bg-white p-4', cardShadow)}>
        <span className="text-sm font-semibold text-ink">{labels.opportunities}</span>
        <ul className="mt-3 flex flex-col gap-2">
          {labels.opportunityItems.map((o, i) => (
            <li key={o} className="flex items-center gap-2.5 text-xs text-ink">
              <span className={cn('size-2 shrink-0 rounded-full', ['bg-sage', 'bg-cobalt/60', 'bg-cobalt'][i])} />
              {o}
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
    <section aria-labelledby="autopilot" className="relative overflow-hidden border-b border-hairline bg-white py-14 md:py-16">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="autopilot" className="text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink md:text-[2.25rem]">
            {copy.title}
          </h2>
        </div>
        <p className="text-pretty text-[0.9375rem] leading-relaxed text-slate lg:col-span-3 lg:pt-9">{first}</p>
        <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-slate lg:col-span-3 lg:pt-9">
          {rest.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="mt-1 border-l-2 border-sage pl-3 font-semibold text-ink">{copy.closingLine}</p>
        </div>
        <div className="relative hidden aspect-square lg:col-span-2 lg:block">
          <Image src="/images/parcels.png" alt="" fill sizes="16vw" className="object-contain" />
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

const ART = '/images/adelier'
const services = [
  { dark: true, ground: 'bg-ink', Icon: ChartColumn, art: `${ART}/02_ppc_management_analityka.png` },
  { dark: false, ground: 'bg-cobalt-tint', Icon: Users, art: `${ART}/03_white_label_model.png` },
  { dark: false, ground: 'bg-cobalt-tint', Icon: UserRound, art: `${ART}/04_dedicated_specialists_zespol.png` },
  { dark: false, ground: 'bg-sage-tint', Icon: GraduationCap, art: `${ART}/05_ppc_training_praktyka.png` },
  { dark: false, ground: 'bg-cobalt-tint', Icon: ChartPie, art: `${ART}/06_market_validation_audit.png` },
]

function WhatWeDo({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const w = copy.home.whatWeDo
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-24 bg-white py-14 md:py-16">
      <Container>
        <h2 id="what-we-do-title" className="flex items-center gap-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-slate">
          <span aria-hidden className="h-px w-6 bg-sage" />
          {w.title}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {w.items.map((s, i) => {
            const v = services[i]
            return (
              <li key={s.number}>
                <Link
                  href={href(locale, serviceTarget[i])}
                  className={cn(
                    'group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl p-5 transition-transform hover:-translate-y-0.5',
                    v.ground,
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn('text-xs font-semibold tabular-nums', v.dark ? 'text-mist' : 'text-cobalt')}>{s.number}</span>
                    <v.Icon aria-hidden className={cn('size-5', v.dark ? 'text-mist' : i === 3 ? 'text-sage' : 'text-cobalt')} />
                  </div>
                  <h3 className={cn('mt-4 text-balance font-display text-xl font-semibold leading-tight', v.dark ? 'text-white' : 'text-ink')}>
                    {s.name}
                  </h3>
                  <p className={cn('mt-2 text-pretty text-sm leading-relaxed', v.dark ? 'text-mist' : 'text-slate')}>{s.tagline}</p>
                  <div className="relative -mx-5 -mb-5 mt-auto aspect-[8/5]">
                    <Image src={v.art} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover object-right" />
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      'absolute bottom-4 left-4 flex size-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5',
                      i === 0 ? 'border border-white/70 bg-ink text-white' : i % 2 ? 'bg-cobalt text-white' : 'border border-cobalt bg-white text-cobalt',
                    )}
                  >
                    <ChevronRight className="size-4" />
                  </span>
                </Link>
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
    <section aria-labelledby="approach" className="border-y border-hairline bg-white py-14 md:py-16">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-3">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="approach" className="text-balance font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink md:text-[1.75rem]">
            {copy.title}
          </h2>
          <p className="text-pretty font-semibold text-cobalt">{copy.subtitle}</p>
          <p className="text-pretty text-[0.9375rem] leading-relaxed text-slate">{copy.intro}</p>
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-hairline">
          {copy.items.map((it, i) => {
            const Icon = approachIcons[i]
            return (
              <li key={it.title} className="flex flex-col gap-3 lg:px-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-cobalt-tint text-cobalt">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-[0.9375rem] font-semibold leading-snug text-ink">{it.title}</h3>
                <p className="text-pretty text-sm leading-relaxed text-slate">{it.body}</p>
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
    { ...copy.brands, to: href(locale, 'ppc'), image: `${ART}/01_for_brands_produkty.png`, dark: false },
    { ...copy.agencies, to: href(locale, 'agencies'), image: '/images/agency-team.png', dark: true },
  ]
  return (
    <section aria-labelledby="audiences" className="bg-white py-14 md:py-16">
      <Container>
        <h2 id="audiences" className="sr-only">
          {copy.title}
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {panels.map((p) => (
            <article key={p.title} className="grid overflow-hidden rounded-2xl border border-hairline sm:grid-cols-2">
              <div className="relative aspect-[4/3] sm:aspect-auto">
                <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className={cn('flex flex-col gap-4 p-7', p.dark ? 'bg-ink' : 'bg-cobalt-tint')}>
                <h3 className={cn('font-display text-xl font-semibold', p.dark ? 'text-white' : 'text-ink')}>{p.title}</h3>
                <div className={cn('flex flex-col gap-3 text-sm leading-relaxed', p.dark ? 'text-mist' : 'text-slate')}>
                  {p.paragraphs.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                <div className="mt-auto pt-2">
                  <CtaLink href={p.to} variant={p.dark ? 'sage' : 'primary'} className="min-h-11 px-5 text-sm">
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
