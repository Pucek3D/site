import type { MetadataRoute } from 'next'
import { allPosts } from '@/lib/blog'
import { href, localesFor, pageKeys } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { seoNoIndex } from '@/lib/seo-runtime'
import { articleLanguages } from '@/lib/seo'
import { subscribeEnabled } from '@/lib/subscribe-config'

/** Only canonical, public, indexable URLs. No lastModified: no real per-page date exists. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (seoNoIndex()) return []
  // Subscribe is listed only while the feature flag is on; otherwise it returns 404.
  const publicPages = pageKeys.filter(
    (page) => page !== 'privacy' && page !== 'legal' && (page !== 'subscribe' || subscribeEnabled()),
  )
  const pages = publicPages.flatMap((page) =>
    localesFor(page).map((locale) => ({
      url: `${siteConfig.url}${href(locale, page)}`,
      alternates: {
        languages: {
          ...Object.fromEntries(localesFor(page).map((l) => [l, `${siteConfig.url}${href(l, page)}`])),
          'x-default': `${siteConfig.url}${href('en', page)}`,
        },
      },
    })),
  )
  // Articles carry a real, hand-maintained modification date, so they state it.
  const articles = allPosts().map((post) => ({
    url: `${siteConfig.url}${href(post.locale, 'blog', `/${post.slug}`)}`,
    lastModified: post.modified,
    alternates: { languages: articleLanguages(post) },
  }))
  return [...pages, ...articles]
}
