import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, CheckList, FinalCta, H2, ListLabel, PageHero, Paragraphs, PointGrid } from '@/components/site/page-kit'
import { CtaLink, Eyebrow, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'brands')
}

/** For Brands: the two core offers, Amazon PPC Management and PPC Training, each purchasable on its own. */
export default async function BrandsPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const b = getCopy(locale).brands
  const { ppc, training } = b
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.brands} navLabel={d.common.breadcrumbLabel} />}
        eyebrow={b.hero.eyebrow}
        title={b.hero.title}
        subtitle={b.hero.subtitle}
        paragraphs={b.hero.paragraphs}
        image={{ src: '/images/architecture.webp', alt: '' }}
      />

      {/* Offer A: Amazon PPC Management. The service headline lives here, not on the homepage. */}
      <Section tone="porcelain" labelledBy="ppc">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Eyebrow>{ppc.label}</Eyebrow>
            <H2 id="ppc">{ppc.title}</H2>
          </div>
          <div className="lg:col-span-7">
            <Paragraphs items={ppc.paragraphs} className="text-lg" />
          </div>
        </div>
        <h3 className="mt-14 font-display text-xl font-semibold text-ink">{ppc.cycleTitle}</h3>
        <div className="mt-8">
          <PointGrid items={ppc.cycle} numbered />
        </div>
      </Section>

      <Section labelledBy="manage">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <H2 id="manage">{ppc.manage.title}</H2>
            <Paragraphs items={ppc.who.paragraphs} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <CheckList items={ppc.manage.items} columns={2} />
            <p className="text-pretty leading-relaxed text-slate">{ppc.manage.note}</p>
          </div>
        </div>
      </Section>

      {/* Offer B: PPC Training, sold on its own. Sage is the training accent. */}
      <Section tone="porcelain" labelledBy="training">
        <div className="grid gap-10 rounded-xl border border-hairline bg-white p-8 md:p-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Eyebrow>{training.label}</Eyebrow>
            <H2 id="training">{training.title}</H2>
            <Paragraphs items={training.paragraphs} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <ListLabel>{training.listLabel}</ListLabel>
            <CheckList items={training.items} />
            <div className="pt-2">
              <CtaLink href={href(locale, 'training')} variant="sage">
                {training.cta}
                <ArrowRight aria-hidden className="size-4" />
              </CtaLink>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta id="final" title={b.final.title} paragraphs={b.final.paragraphs} cta={b.final.cta} to={href(locale, 'contact', '?topic=brand')} />
    </>
  )
}
