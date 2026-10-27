import type { Metadata } from 'next'
import {
  ApproachSection,
  AutopilotSection,
  BeyondAcosSection,
  HomeFinalCta,
  HomeHero,
  HomeTraining,
  ServicesSection,
  WhySection,
} from '@/components/site/home'
import { AiSection, RouteCards, TrustStrip } from '@/components/site/sections'
import { getDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'home')
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <TrustStrip items={dict.home.trust} />
      <AutopilotSection dict={dict} />
      <ServicesSection dict={dict} />
      <ApproachSection dict={dict} />
      <BeyondAcosSection dict={dict} />
      <RouteCards locale={locale} dict={dict} />
      <HomeTraining locale={locale} dict={dict} />
      <AiSection dict={dict} />
      <WhySection dict={dict} />
      <HomeFinalCta locale={locale} dict={dict} />
    </>
  )
}
