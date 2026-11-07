import { seoJsonLd, type PublicSeoPage } from '@/lib/seo-jsonld'
import type { Locale } from '@/lib/i18n'

/** SEO-only server-rendered JSON-LD. Renders no visible elements or layout styles. */
export function SeoStructuredData({ locale, page }: { locale: Locale; page: PublicSeoPage }) {
  const safeJson = JSON.stringify(seoJsonLd(locale, page)).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson }} />
}
