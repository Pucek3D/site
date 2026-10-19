import type { Metadata } from 'next'
import { CtaLink } from '@/components/site/primitives'
import {
  AiSection,
  DeliveryModes,
  FinalCta,
  OperatingModel,
  PageHero,
  ProductFamilies,
  RouteCards,
  TrustStrip,
  WhyAdelier,
} from '@/components/site/sections'
import { getDictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site-config'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'home')
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const h = dict.home
  return (
    <>
      <PageHero
        eyebrow={h.hero.eyebrow}
        title={siteConfig.tagline}
        support={h.hero.support}
        actions={
          <>
            <CtaLink href={href(locale, 'agencies')} className="w-full sm:w-auto">
              {h.hero.actions.agencies}
            </CtaLink>
            <CtaLink href={href(locale, 'brands')} className="w-full sm:w-auto">
              {h.hero.actions.brands}
            </CtaLink>
            <CtaLink href={href(locale, 'training')} variant="sage" className="w-full sm:w-auto">
              {h.hero.actions.training}
            </CtaLink>
          </>
        }
      />
      <TrustStrip items={h.trust} />
      <RouteCards locale={locale} dict={dict} />
      <ProductFamilies dict={dict} />
      <DeliveryModes dict={dict} tone="white" />
      <WhyAdelier dict={dict} />
      <AiSection dict={dict} />
      <OperatingModel dict={dict} />
      <FinalCta
        title={h.finalCta.title}
        body={h.finalCta.body}
        button={h.finalCta.button}
        to={href(locale, 'contact')}
      />
    </>
  )
}
