import type { Metadata } from 'next'
import { Breadcrumbs, FinalCta, H2, PageHero, PointGrid } from '@/components/site/page-kit'
import { Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'training')
}

export default async function TrainingPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const c = getCopy(locale)
  const t = c.training
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={c.pageNames.training} navLabel={d.common.breadcrumbLabel} />}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        paragraphs={t.hero.paragraphs}
        image={{ src: '/images/notebook.webp', alt: '' }}
      />
      <Section tone="porcelain" labelledBy="tailored">
        <H2 id="tailored">{t.tailored.title}</H2>
        <div className="mt-12">
          <PointGrid items={t.tailored.items} />
        </div>
      </Section>
      <FinalCta id="formats" title={t.formats.title} paragraphs={t.formats.paragraphs} cta={t.formats.cta} to={href(locale, 'contact', '?topic=training')} />
    </>
  )
}
