import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowDown, ArrowRight } from 'lucide-react'
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
      <section className="border-b border-hairline bg-white">
        <Container className="pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.agencies} navLabel={d.common.breadcrumbLabel} />
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex min-w-0 flex-col gap-6 lg:col-span-6">
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
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl rounded-tl-[5rem] bg-porcelain md:rounded-tl-[8rem] lg:col-span-6">
              <Image
                src={AGENCY_PHOTO.src}
                alt={a.hero.imageAlt}
                fill
                priority
                sizes="(min-width: 1400px) 640px, (min-width: 1024px) 46vw, 100vw"
                className="object-cover"
                style={{ objectPosition: AGENCY_PHOTO.focus }}
              />
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

      <Section labelledBy="why">
        {/* Side-by-side only from xl: at lg the 4-col heading track is too narrow for the PL/DE question. */}
        <div className="grid gap-12 xl:grid-cols-12">
          <div className="min-w-0 [hyphens:auto] xl:col-span-4">
            <H2 id="why">{a.why.title}</H2>
          </div>
          <ol className="grid min-w-0 gap-x-10 gap-y-10 sm:grid-cols-2 xl:col-span-8">
            {a.why.items.map((it, i) => (
              <li key={it.title} className="flex flex-col gap-3 border-t border-hairline pt-6">
                <span className="text-sm font-semibold tabular-nums text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl font-semibold leading-snug text-ink">{it.title}</h3>
                <p className="text-pretty leading-relaxed text-slate">{it.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 border-t border-hairline pt-10 md:mt-20">
          <div className="flex max-w-2xl flex-col gap-3">
            <h3 className="font-display text-2xl font-semibold leading-snug text-ink">{a.approach.title}</h3>
            <p className="text-pretty leading-relaxed text-slate">{a.approach.intro}</p>
          </div>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {a.approach.steps.map((s, i) => (
              <li key={s} className="flex min-w-0 flex-col gap-3">
                <span className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden className="h-px flex-1 bg-cobalt/30" />
                </span>
                <span className="text-pretty font-medium leading-snug text-ink">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

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
