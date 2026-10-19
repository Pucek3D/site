import type { MetadataRoute } from 'next'
import { href, locales, pageKeys } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const indexable = pageKeys.filter((p) => p !== 'privacy' && p !== 'legal')
  return indexable.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}${href(locale, page)}`,
      changeFrequency: 'monthly' as const,
      priority: page === 'home' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${href(l, page)}`])),
      },
    })),
  )
}
