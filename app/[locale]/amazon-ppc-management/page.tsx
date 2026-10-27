import type { Metadata } from 'next'
import { Breadcrumbs, CheckList, FinalCta, H2, PageHero, PointGrid, SplitSection } from '@/components/site/page-kit'
import { Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'ppc')
}

export default async function PpcPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const c = getCopy(locale)
  const p = c.ppc
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={c.pageNames.ppc} navLabel={d.common.breadcrumbLabel} />}
        title={p.hero.title}
        subtitle={p.hero.subtitle}
        paragraphs={p.hero.paragraphs}
        image={{ src: '/images/architecture.webp', alt: '' }}
      />
      <Section tone="porcelain" labelledBy="approach">
        <H2 id="approach">{p.approach.title}</H2>
        <div className="mt-12">
          <PointGrid items={p.approach.items} numbered />
        </div>
      </Section>
      <Section labelledBy="manage">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <H2 id="manage">{p.manage.title}</H2>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <CheckList items={p.manage.items} columns={2} />
            <p className="text-pretty leading-relaxed text-slate">{p.manage.note}</p>
          </div>
        </div>
      </Section>
      <SplitSection id="who" tone="porcelain" title={p.who.title} paragraphs={p.who.paragraphs} />
      <FinalCta id="final" title={p.final.title} paragraphs={p.final.paragraphs} cta={p.final.cta} to={href(locale, 'contact', '?topic=brand')} />
    </>
  )
}
