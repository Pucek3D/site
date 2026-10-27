import type { Metadata } from 'next'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, locales, ogLocale, type Locale, type PageKey } from './i18n'
import { siteConfig } from './site-config'

/** Titles and descriptions are read off the partner's own copy, so a page's metadata cannot say something the page doesn't. */
function pageMeta(locale: Locale, page: PageKey): { title: string; description: string } {
  const c = getCopy(locale)
  const d = getDictionary(locale)
  const named = (name: string) => `${name} | ${siteConfig.name}`
  switch (page) {
    case 'home':
      return { title: `${siteConfig.name} — ${siteConfig.descriptor}`, description: c.home.hero.paragraphs[0] }
    case 'ppc':
      return { title: named(c.pageNames.ppc), description: c.ppc.hero.paragraphs[1] }
    case 'agencies':
      return { title: named(c.pageNames.agencies), description: c.agencies.hero.paragraphs[0] }
    case 'training':
      return { title: named(c.pageNames.training), description: c.training.hero.paragraphs[0] }
    case 'audits':
      return { title: named(c.pageNames.audits), description: c.audits.hero.paragraphs[0] }
    case 'about':
      return { title: named(d.nav.items.about), description: c.about.hero.paragraphs[0] }
    case 'contact':
      return { title: named(d.nav.items.contact), description: c.home.final.paragraphs[0] }
    case 'privacy':
    case 'legal':
      return d.meta[page]
  }
}

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const meta = pageMeta(locale, page)
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
    description: siteConfig.descriptor,
  }
}
