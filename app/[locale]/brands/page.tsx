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

/** The SAME asset the homepage "What We Do → Amazon PPC Management" tile uses (components/site/home.tsx). */
const PPC_PHOTO = { src: '/images/svc/ppc.webp', focus: '50% 45%' }

/** The SAME asset + focal point as the homepage "What We Do → Training" tile. */
const TRAINING_PHOTO = { src: '/images/svc/training-team.png', focus: '55% 40%' }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'brands')
}

/** For Brands: the two core offers, Amazon PPC Management and PPC Training, each purchasable on its own. */
export default async function BrandsPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const b = getCopy(locale).brands
  const { ppc, training, opportunity: opp } = b

  return (
    <>
      {/* Same composition as the For Agencies hero: photo bleeds right and fades into white on desktop. */}
      <section className="relative flex flex-col-reverse overflow-hidden border-b border-hairline bg-white lg:block">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%]">
          <Image
            src={PPC_PHOTO.src}
            alt={b.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="adelier-hero-photo object-cover"
            style={{ objectPosition: PPC_PHOTO.focus }}
          />
        </div>
        <Container className="relative pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.brands} navLabel={d.common.breadcrumbLabel} />
          <div className="lg:flex lg:min-h-[520px] lg:items-center">
            <div className="flex min-w-0 flex-col gap-6 lg:w-[48%] lg:pr-3">
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] text-ink [hyphens:auto] min-[400px]:text-[2.25rem] sm:text-5xl xl:text-[3.5rem]">
                {b.hero.title}
              </h1>
              <Paragraphs items={b.hero.paragraphs} className="text-lg" />
              {/* Primary is filled, secondary is outlined, so the two offers read as a first and second choice rather than two equal buttons. */}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <CtaLink href="#ppc" className="w-full sm:w-auto">
                  {b.hero.primaryCta}
                  <ArrowDown aria-hidden className="size-4" />
                </CtaLink>
                <CtaLink href="#training" variant="secondary" className="w-full bg-white sm:w-auto">
                  {b.hero.secondaryCta}
                  <ArrowDown aria-hidden className="size-4" />
                </CtaLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {b.intro && (
        <Section tone="porcelain" labelledBy="brands-intro-title" className="pb-12 pt-12 md:pb-14 md:pt-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-0">
  <div className="md:w-7/12 md:shrink-0 md:pr-12">
  <Paragraphs items={b.intro.paragraphs} className="text-lg" />
  </div>
  <div className="border-t-2 border-cobalt pt-8 md:border-l-2 md:border-t-0 md:pl-12 md:pt-0">
  <H2 id="brands-intro-title">{b.intro.title}</H2>
  </div>
          </div>
          <div className="mt-10 flex flex-col items-start gap-5 md:mt-12 md:w-7/12 md:pr-12">
            <p className="text-pretty text-lg font-medium leading-relaxed text-ink">{b.intro.closing}</p>
            <CtaLink href={href(locale, 'contact', '?topic=brand')}>
              {b.intro.cta}
              <ArrowRight aria-hidden className="size-4" />
            </CtaLink>
          </div>
        </Section>
      )}

      {/* Amazon's scale. The footnote states the figures' basis and never renders apart from them. */}
      <Section tone="white" labelledBy="opportunity-title" id="opportunity" className="pb-14 pt-12 md:pb-16 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-5">
            <H2 id="opportunity-title">{opp.title}</H2>
            <Paragraphs items={opp.paragraphs} className="whitespace-pre-line text-lg" />
          </div>
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-7">
            <Eyebrow accent="cobalt">{opp.lead}</Eyebrow>
            <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
              {opp.figures.map((f) => (
                <div key={f.value} className="flex min-w-0 flex-col gap-2 bg-white p-6 md:p-7">
                  <p className="font-display text-4xl font-semibold tabular-nums leading-none tracking-tight text-ink md:text-[2.75rem]">
                    {f.value}
                  </p>
                  <p className="whitespace-pre-line text-pretty text-[0.9375rem] leading-relaxed text-slate">{f.label}</p>
                </div>
              ))}
              <div className="flex flex-col gap-1.5 bg-white p-6 sm:col-span-2 md:px-7">
  <p className="text-pretty font-display text-2xl font-bold leading-snug text-ink">{opp.growth.title}</p>
  <p className="text-pretty font-medium leading-relaxed text-cobalt">{opp.growth.text}</p>
  </div>
            </div>
            <p className="whitespace-pre-line text-pretty text-sm italic leading-relaxed text-slate">{opp.footnote}</p>
          </div>
        </div>
      </Section>

      {/* Offer A: Amazon PPC Management. The service headline lives here, not in the hero. */}
      <Section tone="porcelain" labelledBy="ppc-title" id="ppc" className="scroll-mt-24 pb-14 pt-12 md:pb-16 md:pt-14">
        {locale === 'pl' || locale === 'en' ? (
          /* Two-column layout: pitch + CTA on the left, service scope on the right. */
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex min-w-0 flex-col items-start gap-5 lg:col-span-6">
              <Eyebrow accent="cobalt">{ppc.label}</Eyebrow>
              <h2
                id="ppc-title"
                className="text-balance font-display text-xl font-semibold uppercase leading-snug tracking-wide text-cobalt md:text-2xl"
              >
                {ppc.title}
              </h2>
              <Paragraphs items={ppc.paragraphs} className="text-lg" />
              <CtaLink href={href(locale, 'contact', '?topic=brand')} className="mt-2">
                {ppc.cta}
                <ArrowRight aria-hidden className="size-4" />
              </CtaLink>
            </div>
            <div className="flex min-w-0 flex-col gap-5 border-t border-hairline pt-8 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <Eyebrow accent="cobalt">{ppc.manage.title}</Eyebrow>
              <CheckList items={ppc.manage.items} columns={1} />
            </div>
          </div>
        ) : (
          <>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-5 lg:col-span-6">
            <Eyebrow accent="cobalt">{ppc.label}</Eyebrow>
            <H2 id="ppc-title">{ppc.title}</H2>
          </div>
          <div className="min-w-0 lg:col-span-6 lg:pt-10">
            <Paragraphs items={ppc.paragraphs} className="text-lg" />
          </div>
        </div>

        {/* Service coverage, exactly the list in the approved copy. */}
        <div className="mt-12 grid gap-6 border-t border-hairline pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
            <Eyebrow accent="cobalt">{ppc.manage.title}</Eyebrow>
            <CtaLink href={href(locale, 'contact', '?topic=brand')} className="mt-2 self-start">
              {ppc.cta}
              <ArrowRight aria-hidden className="size-4" />
            </CtaLink>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <CheckList items={ppc.manage.items} columns={2} />
          </div>
        </div>
          </>
        )}
      </Section>

      {/* Offer B: PPC Training, sold on its own. Same block family as the For Agencies training card. */}
      <Section tone="porcelain" labelledBy="training-title" id="training" className="scroll-mt-24 pb-14 pt-2 md:pb-16 md:pt-4">
        <div className="grid gap-6 rounded-3xl border border-hairline bg-white p-3 shadow-[0_24px_60px_rgba(16,24,40,0.07),0_4px_14px_rgba(16,24,40,0.04)] md:grid-cols-[3fr_2fr] md:gap-3">
          <div className="flex min-w-0 flex-col items-start gap-4 px-4 pb-4 pt-4 md:justify-center md:px-10 md:py-9 lg:px-12">
            <Eyebrow>{training.label}</Eyebrow>
            <h2 id="training-title" className="whitespace-pre-line text-balance font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">
              {training.title}
            </h2>
            <Paragraphs items={training.paragraphs} />
            <ListLabel>{training.listLabel}</ListLabel>
            <CheckList items={training.items} />
            <CtaLink href={href(locale, 'contact', '?topic=training')} className="mt-2 w-full sm:w-auto">
              {training.cta}
              <ArrowRight aria-hidden className="size-4" />
            </CtaLink>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[22rem] md:rounded-tl-[8rem]">
            <Image
              src={TRAINING_PHOTO.src}
              alt={training.imageAlt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: TRAINING_PHOTO.focus }}
            />
          </div>
        </div>
      </Section>

      <FinalCta
        id="final"
        title={b.final.title}
        paragraphs={b.final.paragraphs}
        cta={b.final.cta}
        to={href(locale, 'contact', '?topic=brand')}
        variant="primary"
      />
    </>
  )
}
