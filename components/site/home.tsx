import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ChartColumn,
  ChartPie,
  ChevronRight,
  GraduationCap,
  MessagesSquare,
  RefreshCw,
  SlidersHorizontal,
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
      {/* The supplied hero photograph already carries its interface cards, so it is shown whole on the right. */}
      {/* Contained, not cropped: cropping cuts the cards printed into the photo. Edges fade into the white page. */}
      <div className="relative aspect-[841/331] w-full lg:absolute lg:right-0 lg:top-1/2 lg:w-[64%] lg:-translate-y-1/2">
        <Image
          src="/images/site/01_hero_specjalistka_z_UI.png"
          alt="Amazon PPC specialist reviewing campaign performance, bid optimisation and opportunity areas"
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, #000 8%), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
            maskComposite: 'intersect',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, #000 8%), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
            WebkitMaskComposite: 'source-in',
          }}
        />
      </div>

      <Container className="relative">
        <div className="flex max-w-[440px] flex-col gap-5 py-10 lg:min-h-[400px] lg:justify-center lg:py-10">
          {hero.eyebrow ? <Eyebrow>{hero.eyebrow}</Eyebrow> : null}
          <h1 className="text-balance font-display text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-ink lg:text-[2.375rem]">
            <Sentences text={hero.title} breakAt="always" />
          </h1>
          <div className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-slate">
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
    </section>
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
          <Image src="/images/site/11_paczki_sekcja_autopilot.png" alt="" fill sizes="16vw" className="object-contain object-right" />
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ What we do */

const ART = '/images/site'
const services = [
  { dark: true, ground: 'bg-ink', Icon: ChartColumn, art: `${ART}/02_ppc_management_dashboard.png` },
  { dark: false, ground: 'bg-cobalt-tint', Icon: Users, art: `${ART}/03_white_label_wspolpraca.png` },
  { dark: false, ground: 'bg-cobalt-tint', Icon: UserRound, art: `${ART}/04_dedicated_specjalisci.png` },
  { dark: false, ground: 'bg-sage-tint', Icon: GraduationCap, art: `${ART}/05_trening_laptop.png` },
  { dark: false, ground: 'bg-cobalt-tint', Icon: ChartPie, art: `${ART}/06_audyt_wykres_lupa.png` },
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
    { ...copy.brands, to: href(locale, 'ppc'), image: `${ART}/07_for_brands_produkty.png`, dark: false },
    { ...copy.agencies, to: href(locale, 'agencies'), image: `${ART}/08_for_agencies_zespol.png`, dark: true },
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
