import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, CheckList, H2, ListLabel, PageHero, Paragraphs, PointGrid } from '@/components/site/page-kit'
import { CtaLink, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'audits')
}

export default async function AuditsPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const c = getCopy(locale)
  const { hero, validation: v, audits: a } = c.audits
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={c.pageNames.audits} navLabel={d.common.breadcrumbLabel} />}
        title={hero.title}
        subtitle={hero.subtitle}
        paragraphs={hero.paragraphs}
      />
      <Section tone="porcelain" labelledBy="validation">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <H2 id="validation">{v.title}</H2>
            <p className="text-pretty text-xl font-medium text-cobalt">{v.tagline}</p>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="text-pretty text-lg leading-relaxed text-slate">{v.intro}</p>
            <ListLabel>{v.listLabel}</ListLabel>
            <CheckList items={v.items} />
            <Paragraphs items={v.paragraphs} />
          </div>
        </div>
      </Section>
      <Section labelledBy="audits">
        <div className="flex max-w-3xl flex-col gap-4">
          <H2 id="audits">{a.title}</H2>
          <p className="text-pretty text-xl font-medium text-cobalt">{a.tagline}</p>
          <p className="text-pretty text-lg leading-relaxed text-slate">{a.intro}</p>
        </div>
        <div className="mt-12">
          <PointGrid items={a.items} />
        </div>
      </Section>
      <Section tone="ink" labelledBy="audit-cta">
        <div className="flex max-w-3xl flex-col gap-6">
          <p id="audit-cta" className="text-pretty font-display text-2xl font-semibold leading-snug text-white md:text-3xl">
            {a.closing}
          </p>
          <div>
            <CtaLink href={href(locale, 'contact', '?topic=brand')} variant="sage">
              {a.cta}
              <ArrowRight aria-hidden className="size-4" />
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  )
}
