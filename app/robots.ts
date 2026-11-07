import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { seoNoIndex } from '@/lib/seo-runtime'

/** Never block /_next assets: crawlers must be able to render the site. */
export default function robots(): MetadataRoute.Robots {
  if (seoNoIndex()) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
