import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUp, ChartPie, Check, ChevronDown, MessagesSquare, Minus, RefreshCw, Route, UserRound } from 'lucide-react'
import type { PartnerCopy } from '@/content/partner'
import type { Dictionary } from '@/content/en'
import { href, type Locale, type PageKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { CheckList, FinalCta, Paragraphs } from './page-kit'
import { Container, CtaLink, Eyebrow } from './primitives'
import { Sentences } from './typeset'

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
            <Sentences text={hero.title} breakAt="always" />
          </h1>
          <div className="flex max-w-xl flex-col gap-4">
            <Paragraphs items={hero.paragraphs} className="text-lg" />
          </div>
          <p className="max-w-xl border-l-2 border-sage pl-4 text-pretty text-lg font-semibold text-ink">
            <Sentences text={hero.closingLine} />
          </p>
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
          <p className="mt-6 max-w-3xl text-balance font-display text-3xl font-semibold leading-tight text-white md:text-[2.5rem]">
            <Sentences text={copy.closingLine} />
          </p>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

type Tone = 'ink' | 'white' | 'sage'

const tileTone: Record<Tone, { box: string; title: string; tag: string; num: string; link: string }> = {
  ink: { box: 'bg-ink', title: 'text-white', tag: 'text-sage', num: 'text-mist', link: 'text-white' },
  white: { box: 'border border-hairline bg-white', title: 'text-ink', tag: 'text-cobalt', num: 'text-slate', link: 'text-cobalt' },
  sage: { box: 'bg-sage-tint', title: 'text-ink', tag: 'text-ink', num: 'text-ink', link: 'text-ink' },
}

/**
 * Layout per service, in the partner's order. No tile spans two rows: a row-spanning tile stretches to the
 * height of whatever sits beside it, which is what left the PPC tile with a large empty band.
 * Wide tiles put copy beside the illustration; narrow tiles share one illustration band height so they align.
 */
const ART = '/images/adelier'
const tiles: { tone: Tone; wide: boolean; art: string }[] = [
  { tone: 'ink', wide: true, art: `${ART}/02_ppc_management_analityka.png` },
  { tone: 'white', wide: false, art: `${ART}/03_white_label_model.png` },
  { tone: 'white', wide: false, art: `${ART}/04_dedicated_specialists_zespol.png` },
  { tone: 'sage', wide: false, art: `${ART}/05_ppc_training_praktyka.png` },
  { tone: 'white', wide: true, art: `${ART}/06_market_validation_audit.png` },
]

/**
 * The supplied illustrations each carry their own ground and frame, so they sit unboxed: no panel, border or
 * shadow is added around them. All five are 1200×750, so one 8:5 box shows each one whole and keeps the
 * narrow tiles level with each other.
 */
function ServiceArt({ src, wide }: { src: string; wide: boolean }) {
  return (
    <div className="relative aspect-[8/5] w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt=""
        fill
        sizes={wide ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
        className="object-contain"
      />
    </div>
  )
}

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
        <div className="lg:col-span-5 lg:self-start">
          <ServiceArt src={layout.art} wide />
        </div>
      </li>
    )
  }

  return (
    <li className={cn('group flex flex-col gap-7 rounded-2xl p-7 md:p-8 lg:col-span-2', t.box)}>
      <ServiceArt src={layout.art} wide={false} />
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
    // The brands illustration is a full composition, so it shows whole; the agency photo is cropped to the same box.
    { ...copy.brands, to: href(locale, 'ppc'), image: `${ART}/01_for_brands_produkty.png`, fit: 'object-contain', dark: false },
    { ...copy.agencies, to: href(locale, 'agencies'), image: '/images/studio.webp', fit: 'object-cover', dark: true },
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
              <div className="relative aspect-[16/9] w-full">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className={p.fit} />
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
