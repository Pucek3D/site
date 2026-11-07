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
  return pageMetadata((await params).locale, 'privacy')
}

export default async function PrivacyPage({ params, searchParams }: Props) {
  const [{ locale }, { review }] = await Promise.all([params, searchParams])
  return <LegalDocument locale={locale} dict={getDictionary(locale)} page="privacy" review={review} />
}
