import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Check } from 'lucide-react'
import { Breadcrumbs, CheckList, FinalCta, H2, ListLabel, Paragraphs } from '@/components/site/page-kit'
import { Container, CtaLink, Eyebrow, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

/**
 * The SAME asset the homepage "What We Do → 01 Agency Partnerships" tile uses
 * (components/site/home.tsx), at the same focal point. 1536×1024, so the frame
 * is 3:2 — never the old portrait box, which cropped the handshake out.
 */
const AGENCY_PHOTO = { src: '/images/svc/white-label-handshake.png', width: 1536, height: 1024, focus: '58% 45%' }

const contactAgency = (locale: Locale) => href(locale, 'contact', '?topic=agency')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'agencies')
}

export default async function AgencyPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const a = getCopy(locale).agencies

  return (
    <>
      {/* Same composition as the Home hero: the photo bleeds to the right viewport edge and fades into
          the white ground on desktop; below lg it sits full-width under the text. */}
      <section className="relative flex flex-col-reverse overflow-hidden border-b border-hairline bg-white lg:block">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%]">
          <Image
            src={AGENCY_PHOTO.src}
            alt={a.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="adelier-hero-photo object-cover"
            style={{ objectPosition: AGENCY_PHOTO.focus }}
          />
        </div>
        <Container className="relative pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.agencies} navLabel={d.common.breadcrumbLabel} />
          <div className="lg:flex lg:min-h-[520px] lg:items-center">
            <div className="flex min-w-0 flex-col gap-6 lg:w-[48%] lg:pr-3">
              <Eyebrow>{a.hero.eyebrow}</Eyebrow>
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] text-ink [hyphens:auto] min-[400px]:text-[2.25rem] sm:text-5xl xl:text-[3.5rem]">
                {a.hero.title}
              </h1>
              <p className="text-pretty text-xl font-medium leading-snug text-cobalt">{a.hero.emphasis}</p>
              <Paragraphs items={a.hero.paragraphs} className="text-lg" />
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                <CtaLink href={contactAgency(locale)}>
                  {a.hero.primaryCta}
                  <ArrowRight aria-hidden className="size-4" />
                </CtaLink>
                <CtaLink href="#ways" variant="text">
                  {a.hero.secondaryCta}
                  <ArrowDown aria-hidden className="size-4" />
                </CtaLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="porcelain" labelledBy="ways-title" id="ways" className="scroll-mt-24">
        <div className="flex max-w-3xl flex-col gap-5">
          <H2 id="ways-title">{a.ways.title}</H2>
          <p className="text-pretty text-lg leading-relaxed text-slate">{a.ways.intro}</p>
        </div>
        {/* Array order is the reading order: 01 left / first, 02 right / second, at every width. */}
        <ol className="mt-12 grid gap-6 lg:grid-cols-2">
          {a.ways.models.map((m, i) => (
            <li key={m.name} className="flex min-w-0 flex-col gap-5 rounded-xl border border-hairline bg-white p-7 md:p-9">
              <div className="flex items-center gap-4">
                <span className="font-display text-3xl font-semibold tabular-nums text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                <span aria-hidden className="h-px flex-1 bg-hairline" />
              </div>
              <h3 className="text-pretty font-display text-2xl font-semibold leading-snug text-ink [hyphens:auto]">{m.name}</h3>
              <p className="text-pretty text-lg font-medium leading-snug text-ink">{m.summary}</p>
              <Paragraphs items={m.paragraphs} />
              <ListLabel>{m.listLabel}</ListLabel>
              <CheckList items={m.items} />
              <p className="mt-auto border-t border-hairline pt-5 text-pretty text-sm leading-relaxed text-slate">{m.note}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Benefits: the dark, benefit-led signature section. */}
      <section aria-labelledby="why" className="bg-ink">
        <Container className="py-16 md:py-20">
          {/* Side-by-side only from xl: at lg the heading track is too narrow for the PL/DE headline. */}
          <div className="grid gap-12 xl:grid-cols-12 xl:gap-16">
            <div className="flex min-w-0 flex-col gap-5 [hyphens:auto] xl:col-span-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cobalt-light">{a.why.eyebrow}</p>
              <h2 id="why" className="text-balance font-display text-3xl font-semibold leading-[1.12] text-white md:text-4xl xl:text-[2.75rem]">
                {a.why.title[0]} <span className="text-cobalt-light">{a.why.title[1]}</span>
              </h2>
            </div>
            <ol className="grid min-w-0 gap-x-12 gap-y-10 sm:grid-cols-2 xl:col-span-7">
              {a.why.items.map((it, i) => (
                <li key={it.title} className="group flex min-w-0 flex-col gap-3 border-t border-white/15 pt-6 transition-colors duration-200 hover:border-cobalt-light motion-reduce:transition-none">
                  <span className="flex items-center gap-3">
                    <span className="font-display text-sm font-semibold tabular-nums text-cobalt-light">{String(i + 1).padStart(2, '0')}</span>
  <span
  aria-hidden
  className="h-0.5 w-6 bg-cobalt-light/60 transition-[width] duration-200 group-hover:w-10 motion-reduce:transition-none"
  />
                  </span>
                  <h3 className="text-pretty font-display text-xl font-semibold leading-snug text-white [hyphens:auto]">{it.title}</h3>
                  <p className="text-pretty leading-relaxed text-ink-body">{it.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/*
        Process: ONE raised panel carrying a thin Cobalt rail with small square markers.
        Sage appears exactly once, as the completion check on Report, so the last stage
        reads as the outcome of the workflow and never as a second Training-style action.
        Hover only strengthens the hovered stage's marker, number and outgoing segment;
        nothing changes size, so the panel height is the same in every state.
      */}
      <section aria-labelledby="approach" className="border-b border-hairline bg-white">
        <Container className="py-14 md:py-16">
          <div className="flex max-w-2xl flex-col gap-3 [hyphens:auto]">
            <h2 id="approach" className="text-balance font-display text-3xl font-semibold leading-[1.12] text-ink md:text-4xl">
              {a.approach.title}
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-ink">{a.approach.subtitle}</p>
            <p className="text-pretty leading-relaxed text-slate">{a.approach.intro}</p>
          </div>
          <div className="mt-10 rounded-xl border border-hairline bg-white p-6 shadow-[0_20px_50px_rgba(16,24,40,0.09),0_4px_14px_rgba(16,24,40,0.04)] md:p-8 lg:px-9 lg:py-8">
            <ol className="grid lg:grid-cols-5">
              {a.approach.steps.map((s, i) => {
                const report = i === a.approach.steps.length - 1
                return (
                  <li key={s.label} className="group flex min-w-0 gap-5 lg:flex-col lg:gap-5">
                    <div aria-hidden className="flex w-5 shrink-0 flex-col items-center lg:h-5 lg:w-auto lg:flex-row">
                      {report ? (
                        <span className="grid size-5 shrink-0 place-items-center rounded-[4px] bg-sage text-ink">
                          <Check className="size-3.5" strokeWidth={2.75} />
                        </span>
                      ) : (
                        <span className="grid size-5 shrink-0 place-items-center">
                          <span className="size-2.5 bg-white ring-[1.5px] ring-cobalt transition-colors duration-200 group-hover:bg-cobalt motion-reduce:transition-none" />
                        </span>
                      )}
                      {report ? (
                        <span className="hidden h-0.5 w-10 bg-sage/60 lg:block" />
                      ) : (
                        <span className="mt-1 w-0.5 flex-1 bg-cobalt/20 transition-colors duration-200 group-hover:bg-cobalt motion-reduce:transition-none lg:mt-0 lg:ml-1 lg:h-0.5 lg:w-auto" />
                      )}
                    </div>
                    <div className={`flex min-w-0 flex-col gap-1.5 [hyphens:auto] lg:pb-0 lg:pr-6 ${report ? 'pb-0' : 'pb-8'}`}>
                      <span
                        className={`text-xs font-semibold tabular-nums tracking-[0.14em] transition-colors duration-200 motion-reduce:transition-none ${
                          report ? 'text-ink/55' : 'text-cobalt/70 group-hover:text-cobalt'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-lg font-semibold leading-snug text-ink">{s.label}</h3>
                      <p className="text-pretty text-[0.9375rem] leading-relaxed text-ink/75">{s.text}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </Container>
      </section>

      <Section tone="porcelain" labelledBy="agency-training">
        <div className="flex flex-col gap-8 rounded-xl border border-hairline bg-white p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>{a.training.eyebrow}</Eyebrow>
            <h2 id="agency-training" className="text-balance font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              {a.training.title}
            </h2>
            <p className="text-pretty leading-relaxed text-slate">{a.training.body}</p>
          </div>
          <CtaLink href={href(locale, 'training')} variant="sage" className="shrink-0 self-start md:self-center">
            {a.training.cta}
            <ArrowRight aria-hidden className="size-4" />
          </CtaLink>
        </div>
      </Section>

      <FinalCta
        id="final"
        title={a.final.title}
        paragraphs={a.final.paragraphs}
        cta={a.final.cta}
        to={contactAgency(locale)}
        variant="primary"
        secondary={{ label: a.final.trainingLink, to: href(locale, 'training') }}
      />
    </>
  )
}
