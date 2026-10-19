import type { Metadata } from 'next'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import {
  Breadcrumbs,
  CardGrid,
  CheckList,
  Faq,
  FinalCta,
  OfferList,
  PageHero,
  Sequence,
} from '@/components/site/sections'
import { getDictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'brands')
}

export default async function BrandsPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const b = dict.brands
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs locale={locale} dict={dict} page="brands" />}
        eyebrow={b.hero.eyebrow}
        title={b.hero.title}
        support={b.hero.support}
        actions={
          <>
            <CtaLink href={href(locale, 'contact', '?topic=brand')}>{b.hero.primary}</CtaLink>
            <CtaLink href="#rebuild" variant="secondary">
              {b.hero.secondary}
            </CtaLink>
          </>
        }
      />

      <Section tone="porcelain" labelledBy="symptoms-title">
        <SectionHeading id="symptoms-title" title={b.symptoms.title} />
        <div className="mt-12">
          <CardGrid items={b.symptoms.items} columns={3} />
        </div>
      </Section>

      <Section labelledBy="diagnose-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="diagnose-title" title={b.diagnose.title} intro={b.diagnose.intro} />
          </div>
          <ol className="flex flex-col lg:col-span-7">
            {b.diagnose.questions.map((q, i) => (
              <li key={q} className="flex gap-5 border-b border-hairline px-1 py-5">
                <span className="pt-1 text-sm font-semibold tabular-nums text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-lg font-semibold leading-snug text-ink md:text-xl">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="porcelain" id="rebuild" labelledBy="path-title">
        <SectionHeading id="path-title" title={b.path.title} />
        <div className="mt-12">
          <Sequence steps={b.path.steps} label={dict.common.sequenceLabel} />
        </div>
      </Section>

      <OfferList
        dict={dict}
        ids={['diagnostic', 'sprint', 'foundations']}
        title={b.productsTitle}
        copyOverrides={b.productOverrides}
      />

      <Section tone="porcelain" labelledBy="brand-training">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="brand-training" title={b.training.title} intro={b.training.body} />
          </div>
          <div className="lg:col-span-7">
            <h3 className="mb-6 font-display text-lg font-semibold">{b.training.itemsTitle}</h3>
            <CheckList items={b.training.items} columns={1} />
          </div>
        </div>
      </Section>

      <Section labelledBy="proof-title">
        <SectionHeading id="proof-title" title={b.proof.title} intro={b.proof.intro} />
        <div className="mt-12">
          <CardGrid items={b.proof.items} columns={4} />
        </div>
      </Section>

      <Faq title={dict.common.faqTitle} items={b.faq} tone="porcelain" />
      <FinalCta
        title={b.finalCta.title}
        body={b.finalCta.body}
        button={b.finalCta.button}
        to={href(locale, 'contact', '?topic=brand')}
      />
    </>
  )
}
