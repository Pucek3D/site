import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoNoIndex } from '@/lib/seo-runtime'

/** Search crawlers and search-assistant crawlers may access public pages.
 * This is an access setting, not a ranking or recommendation guarantee.
 * GPTBot (model training) is independent of OAI-SearchBot (ChatGPT Search).
 */
export default function robots(): MetadataRoute.Robots {
  if (seoNoIndex()) return { rules: { userAgent: '*', disallow: '/' } }
  const publicAccess = { allow: '/', disallow: '/api/' }
  return {
    rules: [
      { userAgent: '*', ...publicAccess },
      { userAgent: 'OAI-SearchBot', ...publicAccess },
      { userAgent: 'PerplexityBot', ...publicAccess },
      { userAgent: 'Bingbot', ...publicAccess },
      { userAgent: 'Googlebot', ...publicAccess },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
