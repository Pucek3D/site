import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ChartPie,
  MessagesSquare,
  RefreshCw,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react'
import type { PartnerCopy } from '@/content/partner'
import type { Dictionary } from '@/content/en'
import { href, type Locale, type PageKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { FinalCta } from './page-kit'
import { Container, CtaLink, Eyebrow } from './primitives'
import { Sentences } from './typeset'
import { ServiceTile, type TileLabels } from './service-tile'

type Labels = Dictionary['common']

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
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-5 py-12 lg:min-h-[560px] lg:w-[48%] lg:justify-center lg:py-11 lg:pr-3">
          {hero.eyebrow ? (
  <Eyebrow>
  <span className="xl:whitespace-nowrap">{hero.eyebrow}</span>
  </Eyebrow>
  ) : null}
          <h1 className="max-w-[17ch] font-display text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[2.75rem] lg:max-w-none lg:text-[2.35rem] xl:text-[2.75rem]">
            <Sentences text={hero.title} breakAt="lg" />
          </h1>
          <div className="flex max-w-[58ch] flex-col gap-3 text-[0.9375rem] leading-[1.65] text-slate lg:max-w-none xl:text-base">
            {hero.paragraphs.map((p) => (
              <p key={p} className="text-pretty">
                {/* A "\n" in the copy is a line break chosen by the partner; it applies from lg up, where the column is wide enough to hold each line, and reads as an ordinary space below that. */}
                {p.split('\n').map((line, i) => (
  <Fragment key={line}>
  {i > 0 && ' '}
  <span className="lg:block">{line}</span>
  </Fragment>
                ))}
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
          </div>
          {/* The three buyer routes, in route order. Training carries the Sage accent. */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {(['agencies', 'brands', 'training'] as const).map((k) => (
              <li key={k}>
                <Link
                  href={href(locale, k)}
                  className={cn(
                    'inline-flex min-h-10 items-center gap-1.5 text-ink underline-offset-4 hover:underline',
                    k === 'training' ? 'hover:text-ink' : 'hover:text-cobalt',
                  )}
                >
                  {hero.routes[k]}
                  <ArrowRight aria-hidden className={cn('size-4', k === 'training' ? 'text-sage' : 'text-cobalt')} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
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
  <div className="relative aspect-[1672/941] overflow-hidden rounded-2xl lg:col-span-6 xl:col-span-3 xl:col-start-4">
  <Image src="/images/parcels.png" alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <p className="self-start border-l-2 border-sage pl-5 font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[1.75rem] lg:col-span-6 xl:col-span-6">
          <Sentences text={copy.closingLine} breakAt="always" />
        </p>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

/* One tile per buyer route, in the content's own order: Agencies, Brands, Training. */
const services = [
  { art: '/images/svc/white-label-handshake.png', alt: 'Two business partners shaking hands over a desk with a laptop', focus: '58% 45%', to: 'agencies' },
  { art: '/images/svc/ppc.png', alt: 'Two colleagues discussing an illustrative advertising report on a screen', to: 'brands' },
  { art: '/images/svc/training-team.png', alt: 'Trainer presenting a PPC programme outline to a small group', focus: '55% 40%', to: 'training' },
] as const satisfies readonly { art: string; alt: string; focus?: string; to: PageKey }[]

/* One label set per tile, in the same order as `services`: Agencies, PPC management, Training. */
const TILE_LABELS: Record<Locale, readonly TileLabels[]> = {
  en: [
    { expand: 'See how it works', collapse: 'Show less', explore: 'Explore agency partnerships' },
    { expand: 'See what\u2019s included', collapse: 'Show less', explore: 'Explore PPC management' },
    { expand: 'See the program', collapse: 'Show less', explore: 'Explore PPC training' },
  ],
  pl: [
    { expand: 'Zobacz, jak to działa', collapse: 'Pokaż mniej', explore: 'Poznaj współpracę z agencjami' },
    { expand: 'Zobacz, co obejmuje', collapse: 'Pokaż mniej', explore: 'Poznaj zarządzanie PPC' },
    { expand: 'Zobacz program', collapse: 'Pokaż mniej', explore: 'Poznaj szkolenia PPC' },
  ],
  de: [
    { expand: 'So funktioniert es', collapse: 'Weniger anzeigen', explore: 'Agenturpartnerschaften entdecken' },
    { expand: 'Leistungsumfang ansehen', collapse: 'Weniger anzeigen', explore: 'PPC-Management entdecken' },
    { expand: 'Zum Programm', collapse: 'Weniger anzeigen', explore: 'PPC-Training entdecken' },
  ],
}

const TRAINING_INDEX = 2

function WhatWeDo({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const w = copy.home.whatWeDo
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-24 bg-porcelain py-14 md:py-16">
      <Container>
        {/* No "explore all" link: each tile already opens its own route page, and there is no services index. */}
        <h2 id="what-we-do-title" className="flex items-center gap-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-slate">
          <span aria-hidden className="h-px w-6 bg-sage" />
          {w.title}
        </h2>
        {/* One flat full-width tile per row; the image alternates sides so the list reads as a sequence of rows, not a grid. */}
        <ul className="mt-7 flex flex-col gap-5">
          {w.items.map((s, i) => {
            const v = services[i]
            const row = i
            return (
              <ServiceTile
                key={s.number}
                number={s.number}
                name={s.name}
                tagline={s.tagline}
                paragraphs={s.paragraphs}
                bullets={s.bullets}
                art={v.art}
                alt={v.alt}
                focus={'focus' in v ? v.focus : undefined}
                accent={i === TRAINING_INDEX ? 'sage' : 'cobalt'}
                to={href(locale, v.to)}
                labels={TILE_LABELS[locale][i]}
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
    { ...copy.brands, to: href(locale, 'brands'), image: '/images/svc/brands.png', alt: 'Two business partners shaking hands over a desk', dark: false },
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
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
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
