import type { Metadata } from 'next'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import type { Hero } from '@/content/partner/types'
import { href, locales, ogLocale, type Locale, type PageKey } from './i18n'
import { siteConfig } from './site-config'

/** Copy strings can carry line breaks and runs of spaces from authoring; metadata must be a single clean line. */
const clean = (value: string) => value.replace(/\s+/g, ' ').trim()

function pageMeta(locale: Locale, page: PageKey): { title: string; description: string } {
  const { title, description } = rawPageMeta(locale, page)
  return { title: clean(title), description: clean(description) }
}

/** A hero may carry its lead as a subtitle with no paragraphs (the about page does), so read whichever is present. */
const heroDescription = (hero: Hero) => hero.subtitle ?? hero.paragraphs[0] ?? siteConfig.descriptor

/** Titles and descriptions are read off the partner's own copy, so a page's metadata cannot say something the page doesn't. The home page carries a dedicated short description, since its hero paragraph is too long for a link preview. */
function rawPageMeta(locale: Locale, page: PageKey): { title: string; description: string } {
  const c = getCopy(locale)
  const d = getDictionary(locale)
  const named = (name: string) => `${name} | ${siteConfig.name}`
  switch (page) {
    case 'home':
      return { title: `${siteConfig.name} — ${siteConfig.descriptor}`, description: d.meta.home.description }
    case 'agencies':
      return { title: named(c.pageNames.agencies), description: heroDescription(c.agencies.hero) }
    case 'brands':
      return { title: named(c.pageNames.brands), description: heroDescription(c.brands.hero) }
    case 'training':
      return { title: named(c.pageNames.training), description: heroDescription(c.training.hero) }
    case 'about':
      return { title: named(d.nav.items.about), description: heroDescription(c.about.hero) }
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
