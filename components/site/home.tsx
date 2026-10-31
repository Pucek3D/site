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
import { ServiceTileList, type TileLabels } from './service-tile'

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
    { expand: 'Zobacz, jak to działa', collapse: 'Zwiń opis', explore: 'Poznaj współpracę z agencjami' },
    { expand: 'Zobacz zakres usługi', collapse: 'Zwiń opis', explore: 'Poznaj zarządzanie PPC' },
    { expand: 'Zobacz program', collapse: 'Zwiń opis', explore: 'Poznaj szkolenia PPC' },
  ],
  de: [
    { expand: 'So funktioniert es', collapse: 'Weniger anzeigen', explore: 'Agenturpartnerschaften entdecken' },
    { expand: 'Leistungsumfang ansehen', collapse: 'Weniger anzeigen', explore: 'PPC-Management entdecken' },
    { expand: 'Programm ansehen', collapse: 'Weniger anzeigen', explore: 'PPC-Schulungen entdecken' },
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
        <ServiceTileList
          tiles={w.items.map((s, i) => {
            const v = services[i]
            return {
              id: v.to,
              number: s.number,
              name: s.name,
              tagline: s.tagline,
              paragraphs: s.paragraphs,
              bullets: s.bullets,
              art: v.art,
              alt: v.alt,
              focus: 'focus' in v ? v.focus : undefined,
              accent: i === TRAINING_INDEX ? 'sage' : 'cobalt',
              to: href(locale, v.to),
              labels: TILE_LABELS[locale][i],
              imageLeft: i % 2 === 1,
            }
          })}
        />
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

/**
 * ADelier Signature Split: one composition, two equal pathways joined by a single Cobalt rule.
 * Below md the rule runs vertically down the left edge; from md it runs across the top of both pathways.
 * Hovering or focusing a pathway slides a heavier emphasis segment toward it — the only motion here.
 */
function Audiences({ locale, copy }: { locale: Locale; copy: PartnerCopy['home']['audiences'] }) {
  const paths = [
    { key: 'brands', number: '01', ...copy.brands, to: href(locale, 'brands') },
    { key: 'agencies', number: '02', ...copy.agencies, to: href(locale, 'agencies') },
  ] as const
  return (
    <section aria-labelledby="audiences" className="bg-porcelain py-16 md:py-24">
      <Container>
        <div className="relative pl-6 pt-6 sm:pl-10 sm:pt-10">
          {/* The one open-corner detail, framing the composition as a whole. */}
          <span aria-hidden className="pointer-events-none absolute left-0 top-0 size-8 border-l-2 border-t-2 border-cobalt sm:size-10" />

          <header className="flex max-w-3xl flex-col gap-4">
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-slate">{copy.eyebrow}</p>
            <h2 id="audiences" className="text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-[2.75rem]">
              {copy.title}
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-slate">{copy.subtitle}</p>
          </header>

          <div className="group/split relative mt-12 grid gap-12 pl-8 md:mt-16 md:grid-cols-2 md:gap-16 md:pl-0 md:pt-12 lg:gap-24">
            {/* Shared rule: vertical on mobile, horizontal from md. */}
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-cobalt md:bottom-auto md:right-0 md:h-px md:w-auto" />
            {/* Emphasis segment; rests at zero width in the centre and extends toward the active pathway. */}
            <span
              aria-hidden
              className={cn(
                'absolute -top-px right-1/2 left-1/2 hidden h-[3px] bg-cobalt transition-[left,right] duration-500 ease-out motion-reduce:transition-none md:block',
                'group-has-[[data-path=brands]:hover]/split:left-0 group-has-[[data-path=brands]:focus-within]/split:left-0',
                'group-has-[[data-path=agencies]:hover]/split:right-0 group-has-[[data-path=agencies]:focus-within]/split:right-0',
              )}
            />
            {paths.map((p) => (
              <article key={p.key} data-path={p.key} className="group/path relative flex flex-col gap-5">
                <span aria-hidden className="absolute -left-8 top-1.5 size-2 -translate-x-1/2 bg-cobalt md:-top-12 md:left-0 md:-translate-y-1/2 md:translate-x-0" />
                <p className="flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cobalt">
                  <span>{p.number}</span>
                  <span aria-hidden className="text-hairline">
                    /
                  </span>
                  <span>{p.label}</span>
                </p>
                <h3 className="font-display text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-ink md:text-[2.5rem] xl:text-[3.25rem]">
                  <span className="block">{p.headline[0]}</span>
                  <span className="block">{p.headline[1]}</span>
                </h3>
                <p className="max-w-[46ch] text-pretty text-base leading-relaxed text-slate md:text-[1.0625rem]">{p.description}</p>
                <Link
                  href={p.to}
                  className="mt-2 inline-flex min-h-11 w-fit items-center gap-2 font-display text-base font-semibold text-cobalt underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
                >
                  {p.cta}
                  <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover/path:translate-x-1 motion-reduce:transition-none" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
