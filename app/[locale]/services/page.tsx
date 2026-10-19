import type { Metadata } from 'next'
import { ChoiceSystem } from '@/components/site/choice-system'
import { CtaLink, Eyebrow, Section } from '@/components/site/primitives'
import {
  Breadcrumbs,
  DeliveryModes,
  FinalCta,
  OfferList,
  PageHero,
  ProductFamilies,
  QualityGates,
} from '@/components/site/sections'
import { getDictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'services')
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const s = dict.services
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs locale={locale} dict={dict} page="services" />}
        eyebrow={s.hero.eyebrow}
        title={s.hero.title}
        support={s.hero.support}
        actions={
          <>
            <CtaLink href={href(locale, 'contact')}>{s.hero.primary}</CtaLink>
            <CtaLink href="#choice-system" variant="secondary">
              {s.hero.secondary}
            </CtaLink>
          </>
        }
      />
      <ProductFamilies dict={dict} />
      <OfferList dict={dict} intro={s.productsIntro} />
      <DeliveryModes dict={dict} tone="porcelain" />
      <ChoiceSystem dict={dict} id="choice-system" tone="white" />
      <QualityGates dict={dict} />
      <Section tone="porcelain" labelledBy="transformation-title">
        <div className="flex max-w-3xl flex-col gap-5 rounded-xl border border-dashed border-input bg-white p-8 md:p-10">
          <Eyebrow>{s.transformation.eyebrow}</Eyebrow>
          <h2 id="transformation-title" className="text-2xl font-semibold md:text-3xl">
            {s.transformation.title}
          </h2>
          <p className="text-lg leading-relaxed text-slate">{s.transformation.body}</p>
        </div>
      </Section>
      <FinalCta
        title={s.finalCta.title}
        body={s.finalCta.body}
        button={s.finalCta.button}
        to={href(locale, 'contact')}
      />
    </>
  )
}
