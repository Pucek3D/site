import type { Metadata } from 'next'
import { LegalDocument } from '@/components/site/legal-document'
import { getDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'legal')
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params
  return <LegalDocument locale={locale} dict={getDictionary(locale)} page="legal" />
}
