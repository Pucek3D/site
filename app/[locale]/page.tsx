import type { Metadata } from 'next'
import { HomePage } from '@/components/site/home'
import { SeoStructuredData } from '@/components/site/seo-structured-data'
import { getCopy } from '@/content/partner'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'home')
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  return (
    <>
      <SeoStructuredData locale={locale} page="home" />
      <HomePage locale={locale} copy={getCopy(locale)} />
    </>
  )
}
