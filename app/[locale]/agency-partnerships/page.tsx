import type { Metadata } from 'next'
import { Breadcrumbs, CheckList, FinalCta, H2, ListLabel, PageHero, Paragraphs, PointGrid } from '@/components/site/page-kit'
import { ArrowRight } from 'lucide-react'
import { CtaLink, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'agencies')
}

export default async function AgencyPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const c = getCopy(locale)
  const a = c.agencies
  const { whiteLabel, specialists } = a.ways
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.agencies} navLabel={d.common.breadcrumbLabel} />}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        paragraphs={a.hero.paragraphs}
        image={{ src: '/images/studio.webp', alt: '' }}
      />
      <Section tone="porcelain" labelledBy="ways">
        <H2 id="ways">{a.ways.title}</H2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[
            { ...specialists, idealFor: undefined as string | undefined },
            whiteLabel,
          ].map((w) => (
            <article key={w.name} className="flex flex-col gap-5 rounded-xl border border-hairline bg-white p-8">
              <h3 className="font-display text-2xl font-semibold leading-snug text-ink">{w.name}</h3>
              <p className="text-pretty text-lg font-medium text-cobalt">{w.tagline}</p>
              <Paragraphs items={w.paragraphs} />
              <ListLabel>{w.listLabel}</ListLabel>
              <CheckList items={w.items} />
              {w.idealFor ? <p className="border-t border-hairline pt-5 text-pretty leading-relaxed text-ink">{w.idealFor}</p> : null}
            </article>
          ))}
        </div>
      </Section>
      <Section labelledBy="why">
        <H2 id="why">{a.why.title}</H2>
        <div className="mt-12">
          <PointGrid items={a.why.items} columns={2} />
        </div>
      </Section>
      <Section tone="porcelain" labelledBy="agency-training">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2 id="agency-training" className="font-display text-2xl font-semibold leading-snug text-ink">
              {a.training.title}
            </h2>
            <p className="text-pretty leading-relaxed text-slate">{a.training.body}</p>
          </div>
          <CtaLink href={href(locale, 'training')} variant="sage" className="shrink-0">
            {a.training.cta}
            <ArrowRight aria-hidden className="size-4" />
          </CtaLink>
        </div>
      </Section>
      <FinalCta id="final" title={a.final.title} paragraphs={a.final.paragraphs} cta={a.final.cta} to={href(locale, 'contact', '?topic=agency')} />
    </>
  )
}
