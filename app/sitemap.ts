import type { MetadataRoute } from 'next'
import { href, locales, pageKeys } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { seoNoIndex } from '@/lib/seo-runtime'

/** Only canonical, public, indexable URLs. No lastModified: no real per-page date exists. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (seoNoIndex()) return []
  const publicPages = pageKeys.filter((page) => page !== 'privacy' && page !== 'legal')
  return publicPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}${href(locale, page)}`,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${href(l, page)}`])),
          'x-default': `${siteConfig.url}${href('en', page)}`,
        },
      },
    })),
  )
}
