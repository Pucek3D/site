import type { Metadata } from 'next'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import {
  AgencyPromise,
  Breadcrumbs,
  CardGrid,
  CheckList,
  Faq,
  FinalCta,
  PageHero,
  ProgramCards,
  QualityGates,
} from '@/components/site/sections'
import { getDictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'agencies')
}

export default async function AgenciesPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const a = dict.agencies
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs locale={locale} dict={dict} page="agencies" />}
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        support={a.hero.support}
        actions={
          <>
            <CtaLink href={href(locale, 'contact', '?topic=agency')}>{a.hero.primary}</CtaLink>
            <CtaLink href="#standards" variant="secondary">
              {a.hero.secondary}
            </CtaLink>
          </>
        }
      />

      <Section labelledBy="why-flex">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="why-flex" title={a.why.title} intro={a.why.body} />
          </div>
          <ul className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:pt-2">
            {a.why.points.map((p) => (
              <li key={p} className="border-l-2 border-ink pl-5 text-lg leading-relaxed text-ink">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="porcelain" labelledBy="models-title">
        <SectionHeading id="models-title" title={a.models.title} />
        <div className="mt-12">
          <CardGrid items={a.models.items} columns={4} />
        </div>
      </Section>

      <Section labelledBy="deliver-title">
        <SectionHeading id="deliver-title" title={a.deliver.title} />
        <div className="mt-12">
          <CheckList items={a.deliver.items} columns={3} />
        </div>
      </Section>

      <ProgramCards
        dict={dict}
        tone="porcelain"
        id="agency-training"
        title={a.training.title}
        intro={a.training.body}
        forLines={[a.training.foundationsFor, a.training.enablementFor]}
      />

      <AgencyPromise dict={dict} />
      <QualityGates dict={dict} id="standards" />

      <Section tone="porcelain" labelledBy="start-title">
        <SectionHeading id="start-title" title={a.start.title} />
        <div className="mt-12">
          <CardGrid items={a.start.items} columns={3} />
        </div>
      </Section>

      <Faq title={dict.common.faqTitle} items={a.faq} />
      <FinalCta
        title={a.finalCta.title}
        body={a.finalCta.body}
        button={a.finalCta.button}
        to={href(locale, 'contact', '?topic=agency')}
      />
    </>
  )
}
