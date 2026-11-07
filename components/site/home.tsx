import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PartnerCopy } from '@/content/partner'
import { href, type Locale, type PageKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { FinalCta } from './page-kit'
import { Container, labelText } from './primitives'
import { Sentences } from './typeset'
import { ServiceTileList, type TileLabels } from './service-tile'

export function HomePage({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const h = copy.home
  return (
    <>
      <Hero locale={locale} copy={copy} />
      <Autopilot copy={h.autopilot} />
      <WhatWeDo locale={locale} copy={copy} />
      <FinalCta id="final" title={h.final.title} paragraphs={h.final.paragraphs} cta={h.final.cta} to={href(locale, 'contact')} variant="primary" className="py-14 md:py-16" />
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
          alt={copy.homeImageAlts.hero}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="adelier-hero-photo object-cover object-[58%_center]"
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-5 py-12 lg:min-h-[560px] lg:w-[48%] lg:justify-center lg:py-11 lg:pr-3">
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
          {hero.closingLine ? (
            <p className="border-l-2 border-sage pl-4 text-pretty text-[1rem] font-semibold leading-snug text-ink">
              <Sentences text={hero.closingLine} />
            </p>
          ) : null}

          {/* The buyer routes, in route order. Training has no page in the navigation, so it is not linked here. */}
          {/* Two equal audience routes, so equal weight; full-width on phones for an easy tap target. */}
          <ul className="mt-1 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:flex-wrap">
            {(['brands', 'agencies'] as const).map((k) => (
              <li key={k}>
                <Link
                  href={href(locale, k)}
                  className={cn(
                    'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-cobalt px-6 py-2.5 text-white transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 sm:w-auto',
                  )}
                >
                  {hero.routes[k]}
                  <ArrowRight aria-hidden className="size-4" />
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

function Autopilot({ copy }: { copy: PartnerCopy['home']['autopilot'] }) {
  return (
    <section aria-labelledby="autopilot" className="border-b border-hairline bg-white py-11 md:py-16">
      <Container>
        {/* Full-width label above the grid, in the "Expertise" label's form (green rule + text) but sentence case and a step larger. */}
        <h2 id="autopilot" className="mb-7 flex items-start gap-4 text-pretty text-base font-semibold leading-snug tracking-[0.01em] text-ink md:mb-10 md:text-[1.0625rem]">
          <span aria-hidden className="mt-[0.7em] h-px w-6 shrink-0 bg-sage" />
          <span>{copy.title}</span>
        </h2>
        {/* Reading order is the DOM order: challenges, approach, statement. Two columns on tablet with the statement
            below them; three from 1200px, where each column is wide enough not to compress the longer PL/DE strings. */}
        {/* The tablet rule is capped at 1199px: an `md:` rule sorts after `min-[1200px]:` and would otherwise win at desktop. */}
        <div className="grid gap-7 md:gap-x-10 md:max-[1199px]:grid-cols-2 min-[1200px]:grid-cols-[31fr_38fr_31fr]">
          <div className="flex flex-col gap-5">
            {copy.paragraphs.slice(0, -1).map((p) => (
              <p key={p} className="text-pretty text-base leading-relaxed text-slate">
                {p}
              </p>
            ))}
          </div>
          <p className="text-pretty text-base leading-relaxed text-slate">{copy.paragraphs.at(-1)}</p>
          <p className="border-l-2 border-sage pl-5 font-display text-[1.375rem] font-semibold leading-[1.3] tracking-tight text-ink md:max-[1199px]:col-span-2 min-[1200px]:text-2xl">
            <Sentences text={copy.closingLine} breakAt="always" />
          </p>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

/* One tile per buyer route, in the content's own order: Agencies, Brands, Training. */
const services = [
  { art: '/images/svc/white-label-handshake.png', alt: 'agencies', focus: '58% 45%', to: 'agencies' },
  { art: '/images/svc/ppc.png', alt: 'brands', to: 'brands' },
  { art: '/images/svc/training-team.png', alt: 'training', focus: '55% 14%', to: 'training' },
] as const satisfies readonly { art: string; alt: keyof PartnerCopy['homeImageAlts']; focus?: string; zoom?: number; to: PageKey }[]

/* One label set per tile, in the same order as `services`: Agencies, PPC management, Training. */
const TILE_LABELS: Record<Locale, readonly TileLabels[]> = {
  en: [
    { expand: 'See how it works', collapse: 'Show less', explore: 'Explore agency partnerships' },
    { expand: 'See what\u2019s included', collapse: 'Show less', explore: 'Explore PPC management' },
    { expand: 'See the program', collapse: 'Show less', explore: 'Explore PPC training' },
  ],
  pl: [
    { expand: 'Zobacz, jak to działa', collapse: 'Zwiń opis', explore: 'Poznaj współpracę z agencjami' },
    { expand: 'Zobacz zakres usługi', collapse: 'Zwiń opis', explore: 'Poznaj zarządzanie Amazon PPC' },
    { expand: 'Zobacz program', collapse: 'Zwiń opis', explore: 'Poznaj szkolenia Amazon PPC' },
  ],
  de: [
    { expand: 'So funktioniert es', collapse: 'Weniger anzeigen', explore: 'Agenturpartnerschaften entdecken' },
    { expand: 'Leistungsumfang ansehen', collapse: 'Weniger anzeigen', explore: 'PPC-Kampagnenmanagement entdecken' },
    { expand: 'Programm ansehen', collapse: 'Weniger anzeigen', explore: 'PPC-Schulungen entdecken' },
  ],
}

const TRAINING_INDEX = 2

/* Display order of the tiles (indexes into `services`): PPC management first, then agencies, then training. */
const DISPLAY_ORDER = [1, 0, 2] as const

function WhatWeDo({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const w = copy.home.whatWeDo
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-24 bg-porcelain pt-8 pb-14 md:pt-10 md:pb-16">
      <Container>
        {/* No "explore all" link: each tile already opens its own route page, and there is no services index. */}
        <h2 id="what-we-do-title" className="flex items-center gap-3 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-slate">
          <span aria-hidden className="h-px w-6 bg-sage" />
          {labelText(w.title)}
        </h2>
        {/* One flat full-width tile per row; the image alternates sides so the list reads as a sequence of rows, not a grid. */}
        <ServiceTileList
          tiles={DISPLAY_ORDER.map((i, row) => {
            const s = w.items[i]
            const v = services[i]
            return {
              id: v.to,
              name: s.name,
              paragraphs: s.paragraphs,
              bullets: s.bullets,
              art: v.art,
              alt: copy.homeImageAlts[v.alt],
              focus: 'focus' in v ? v.focus : undefined,
              zoom: 'zoom' in v ? v.zoom : undefined,
              accent: i === TRAINING_INDEX ? 'sage' : 'cobalt',
              to: href(locale, v.to, v.to === 'brands' ? '#ppc' : ''),
              labels: TILE_LABELS[locale][i],
              imageLeft: row % 2 === 1,
            }
          })}
        />
      </Container>
    </section>
  )
}
