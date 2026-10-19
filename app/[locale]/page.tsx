import type { Metadata } from 'next'
import { ChoiceSystem } from '@/components/site/choice-system'
import { HeroVisual } from '@/components/site/hero-visual'
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
            <CtaLink href={href(locale, 'agencies')}>{h.hero.primary}</CtaLink>
            <CtaLink href={href(locale, 'training')} variant="secondary">
              {h.hero.secondary}
            </CtaLink>
            <CtaLink href={href(locale, 'brands')} variant="text">
              {h.hero.textLink}
            </CtaLink>
          </>
        }
        aside={<HeroVisual dict={dict} />}
      />
      <TrustStrip items={h.trust} />
      <RouteCards locale={locale} dict={dict} />
      <ProductFamilies dict={dict} />
      <ChoiceSystem dict={dict} tone="white" />
      <DeliveryModes dict={dict} tone="porcelain" />
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
