import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Check } from 'lucide-react'
import { Breadcrumbs, FinalCta, H2, Paragraphs } from '@/components/site/page-kit'
import { Container, CtaLink, Eyebrow, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

/** The SAME asset + focal point as the homepage "What We Do → Training" tile (components/site/home.tsx). */
const TRAINING_PHOTO = { src: '/images/svc/training-team.png', focus: '55% 40%' }

const num = (i: number) => String(i + 1).padStart(2, '0')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'training')
}

export default async function TrainingPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const t = getCopy(locale).training
  const contact = href(locale, 'contact', '?topic=training')

  return (
    <>
      {/* Same composition as For Agencies / For Brands: photo bleeds right and fades into white on desktop. */}
      <section className="relative flex flex-col-reverse overflow-hidden border-b border-hairline bg-white lg:block">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[50%]">
          <Image
            src={TRAINING_PHOTO.src}
            alt={t.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="adelier-hero-photo object-cover"
            style={{ objectPosition: TRAINING_PHOTO.focus }}
          />
        </div>
        <Container className="relative pb-14 pt-8 md:pb-16 md:pt-10">
          <Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.training} navLabel={d.common.breadcrumbLabel} />
          <div className="lg:flex lg:min-h-[520px] lg:items-center">
            <div className="flex min-w-0 flex-col gap-5 lg:w-[50%] lg:pr-6">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] text-ink [hyphens:auto] min-[400px]:text-[2.25rem] sm:text-5xl xl:text-[3.5rem]">
                {t.hero.title}
              </h1>
              <p className="flex gap-3 text-pretty text-xl font-medium leading-snug text-ink">
                <span aria-hidden className="mt-[0.35em] h-[1em] w-0.5 shrink-0 rounded-full bg-sage" />
                {t.hero.subtitle}
              </p>
              <Paragraphs items={t.hero.paragraphs} className="text-lg" />
              <p className="flex items-start gap-2.5 text-[0.9375rem] font-medium text-ink">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-sage" strokeWidth={2.5} />
                {t.hero.standalone}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
                <CtaLink href={contact} variant="sage">
                  {t.hero.primaryCta}
                  <ArrowRight aria-hidden className="size-4" />
                </CtaLink>
                <CtaLink href="#curriculum" variant="text">
                  {t.hero.secondaryCta}
                  <ArrowDown aria-hidden className="size-4" />
                </CtaLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The learning experience: one elevated surface, a connected three-stage journey, practical facts below. */}
      <Section labelledBy="experience-title" className="py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-6">
            <Eyebrow>{t.experience.eyebrow}</Eyebrow>
            <H2 id="experience-title">{t.experience.title}</H2>
          </div>
          <p className="min-w-0 text-pretty text-lg leading-relaxed text-slate lg:col-span-6 lg:pt-10">{t.experience.intro}</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-hairline bg-white shadow-[0_24px_60px_rgba(16,24,40,0.07),0_4px_14px_rgba(16,24,40,0.04)]">
          <ol className="grid md:grid-cols-3">
            {t.experience.steps.map((s, i) => (
              <li key={s.title} className="relative flex min-w-0 flex-col gap-4 p-7 md:p-8 lg:p-10">
                {/* Marker + Sage connector running toward the next stage. */}
                <div className="flex items-center gap-3">
                  <span aria-hidden className="size-2.5 shrink-0 rotate-45 border-2 border-sage bg-white" />
                  <span className="font-display text-sm font-semibold tabular-nums text-sage">{num(i)}</span>
                      <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-sage/60 to-sage/10 md:block" />
                </div>
                <h3 className="text-pretty font-display text-xl font-semibold leading-snug text-ink">{s.title}</h3>
                <p className="text-pretty leading-relaxed text-slate">{s.body}</p>
                {s.points ? (
                  <ul className="flex flex-col gap-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-sage" strokeWidth={2.5} />
                        {p}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
          <dl className="grid gap-px border-t border-hairline bg-hairline sm:grid-cols-3">
            {t.experience.support.map((s) => (
              <div key={s.title} className="flex min-w-0 flex-col gap-1.5 bg-porcelain px-7 py-5 md:px-8 lg:px-10">
                <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-ink">{s.title}</dt>
                <dd className="text-pretty text-[0.9375rem] leading-relaxed text-slate">{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Curriculum: narrow editorial column + five flat rows. Deliberately not a grid. */}
      <Section tone="porcelain" labelledBy="curriculum-title" id="curriculum" className="scroll-mt-24 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-4">
            <Eyebrow>{t.curriculum.eyebrow}</Eyebrow>
            <H2 id="curriculum-title">{t.curriculum.title}</H2>
            <p className="text-pretty leading-relaxed text-slate">{t.curriculum.intro}</p>
          </div>
          <ol className="min-w-0 border-b border-hairline lg:col-span-8">
            {t.curriculum.items.map((m, i) => (
              <li
                key={m.title}
                className="grid gap-2 border-t border-hairline py-6 sm:grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)] md:gap-x-8"
              >
                <span className="font-display text-sm font-semibold tabular-nums text-sage md:pt-0.5">{num(i)}</span>
                <h3 className="text-pretty font-display text-lg font-semibold leading-snug text-ink">{m.title}</h3>
                <p className="text-pretty leading-relaxed text-slate sm:col-start-2 md:col-start-auto">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <FinalCta
        id="formats"
        eyebrow={t.formats.eyebrow}
        eyebrowAccent="sage"
        title={t.formats.title}
        paragraphs={t.formats.paragraphs}
        cta={t.formats.cta}
        to={contact}
      />
    </>
  )
}
