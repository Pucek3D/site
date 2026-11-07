import type { Metadata } from 'next'
import { LegalDocument } from '@/components/site/legal-document'
import { getDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ review?: string | string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'legal')
}

export default async function LegalPage({ params, searchParams }: Props) {
  const [{ locale }, { review }] = await Promise.all([params, searchParams])
  return <LegalDocument locale={locale} dict={getDictionary(locale)} page="legal" review={review} />
}
