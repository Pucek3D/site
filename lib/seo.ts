import type { Metadata } from 'next'
import { getDictionary } from '@/content'
import { href, locales, ogLocale, type Locale, type PageKey } from './i18n'
import { siteConfig } from './site-config'

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const meta = getDictionary(locale).meta[page]
  const path = href(locale, page)
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${href(l, page)}`]))
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: { ...languages, 'x-default': `${siteConfig.url}${href('en', page)}` },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
    robots: page === 'privacy' || page === 'legal' ? { index: false, follow: true } : undefined,
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-stacked-fullcolor.svg`,
    slogan: siteConfig.tagline,
    description: siteConfig.descriptor,
  }
}
