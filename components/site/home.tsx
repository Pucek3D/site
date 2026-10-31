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
                    // Sage text on white fails contrast, so Training keeps ink text and takes Sage on the
                    // underline instead; Tailwind's underline otherwise inherits the ink text colour.
                    k === 'training' ? 'hover:text-ink decoration-sage decoration-2' : 'hover:text-cobalt',
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
    <section aria-labelledby="audiences" className="bg-porcelain py-12 md:py-14 lg:py-16">
      <Container>
        <div className="relative pl-5 pt-5 sm:pl-8 sm:pt-8">
          {/* The one open-corner detail, framing the composition as a whole. */}
          <span aria-hidden className="pointer-events-none absolute left-0 top-0 size-7 border-l-2 border-t-2 border-cobalt sm:size-8" />

          <header className="flex max-w-3xl flex-col gap-3">
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-slate">{copy.eyebrow}</p>
            <h2
              id="audiences"
              className="text-balance font-display text-[2rem] font-bold leading-[1.06] tracking-tight text-ink md:text-[2.25rem] xl:text-[2.5rem]"
            >
              <span className="block">{copy.title[0]}</span>
              <span className="block text-cobalt">{copy.title[1]}</span>
            </h2>
            <p className="text-pretty text-base leading-normal text-slate md:text-lg">{copy.subtitle}</p>
          </header>

          {/* One composition: an Ink rule across the top, an Ink divider between the halves, and a single
              Cobalt square where the two meet. On mobile the divider turns horizontal between the stacked halves. */}
          <div className="relative mt-7 grid grid-cols-1 border-t border-ink md:mt-8 md:grid-cols-2">
            {paths.map((p, i) => (
              <article
                key={p.key}
                data-path={p.key}
                className={cn(
                  'split-path group/path relative flex min-w-0 flex-col gap-4 break-words [hyphens:auto] px-5 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9',
                  i === 1 && 'border-t border-ink md:border-l md:border-t-0',
                )}
              >
                {i === 1 && (
                  <span aria-hidden className="absolute -left-[5px] -top-[5px] z-10 size-2.5 bg-cobalt" />
                )}
                <p className="flex items-center gap-2 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[var(--p-accent)]">
                  <span>{p.number}</span>
                  <span aria-hidden className="text-[var(--p-mute)]">
                    /
                  </span>
                  <span>{p.label}</span>
                </p>
                <h3 className="font-display text-[1.75rem] font-semibold leading-[1.08] tracking-tight text-[var(--p-head)] sm:text-[1.875rem] md:text-[2rem] xl:text-[2.125rem]">
                  <span className="block">{p.headline[0]}</span>
                  <span className="block text-[var(--p-accent)]">{p.headline[1]}</span>
                </h3>
                <p className="max-w-[46ch] text-pretty text-base leading-normal text-[var(--p-body)]">{p.description}</p>
                <Link
                  href={p.to}
                  className="mt-auto inline-flex min-h-11 w-fit max-w-full items-center gap-2.5 rounded-md bg-[var(--p-btn-bg)] px-5 py-2.5 font-display text-[0.9375rem] font-semibold leading-tight text-[var(--p-btn-fg)] [hyphens:auto] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--p-accent)]"
                >
                  <span className="min-w-0">{p.cta}</span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-[240ms] group-hover/path:translate-x-1 motion-reduce:transition-none" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
