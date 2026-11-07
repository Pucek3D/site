import { getDictionary } from '@/content'
import { href, type Locale, type PageKey } from './i18n'
import { seoText } from './seo'
import { siteConfig } from './site-config'

/** Structured data reflects ONLY existing, currently offered services. No fabricated ratings, prices or cases. */
export type PublicSeoPage = Exclude<PageKey, 'privacy' | 'legal'>
const orgId = `${siteConfig.url}/#organization`
const websiteId = `${siteConfig.url}/#website`

function service(id: string, name: string, serviceType: string, url: string, audience: string) {
  return {
    '@type': 'Service', '@id': id, name, serviceType, url,
    provider: { '@id': orgId }, audience: { '@type': 'Audience', audienceType: audience },
  }
}

export function seoJsonLd(locale: Locale, page: PublicSeoPage) {
  const url = `${siteConfig.url}${href(locale, page)}`
  const meta = seoText(locale, page)
  const dict = getDictionary(locale)
  const pageNames: Record<PublicSeoPage, string> = {
    home: dict.nav.items.home,
    agencies: dict.nav.items.agencies,
    brands: dict.nav.items.brands,
    training: dict.nav.items.training,
    about: dict.nav.items.about,
    contact: dict.nav.items.contact,
  }
  const nodes: Record<string, unknown>[] = []
  if (page === 'home') {
    nodes.push({
      '@type': 'Organization', '@id': orgId, name: siteConfig.name,
      url: siteConfig.url, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/og/adelier-logo-square.png`, width: 512, height: 512 },
      description: siteConfig.descriptor,
      // Do not add a physical address, phone, sameAs profiles, founder history or business registration data without verification.
    })
    nodes.push({
      '@type': 'WebSite', '@id': websiteId, name: siteConfig.name,
      url: siteConfig.url, inLanguage: ['en', 'pl', 'de'], publisher: { '@id': orgId },
      // No SearchAction: the website does not have a native search function.
    })
  }
  if (page !== 'home') {
    nodes.push({
      '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: dict.nav.items.home, item: `${siteConfig.url}${href(locale, 'home')}` },
        { '@type': 'ListItem', position: 2, name: pageNames[page], item: url },
      ],
    })
  }
  const webPage: Record<string, unknown> = {
    '@type': page === 'contact' ? 'ContactPage' : page === 'about' ? 'AboutPage' : 'WebPage',
    '@id': `${url}#webpage`, url, name: meta.title, description: meta.description,
    inLanguage: locale, isPartOf: { '@id': websiteId }, about: { '@id': orgId },
    ...(page === 'home' ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
  }
  if (page === 'brands') {
    nodes.push(service(`${url}#ppc-management`, 'Amazon PPC Management', 'Amazon PPC campaign management', url, 'Consumer brands and e-commerce teams'))
    nodes.push(service(`${url}#ppc-training`, 'Amazon PPC Training', 'Practical Amazon PPC training', url, 'Brand and e-commerce teams'))
    webPage.mainEntity = [{ '@id': `${url}#ppc-management` }, { '@id': `${url}#ppc-training` }]
  }
  if (page === 'agencies') {
    nodes.push(service(`${url}#white-label-ppc`, 'White-label PPC Management', 'White-label Amazon PPC campaign delivery', url, 'Marketing and media agencies'))
    nodes.push(service(`${url}#dedicated-specialist`, 'Dedicated PPC Specialist', 'Dedicated Amazon PPC specialist capacity', url, 'Marketing and media agencies'))
    webPage.mainEntity = [{ '@id': `${url}#white-label-ppc` }, { '@id': `${url}#dedicated-specialist` }]
  }
  if (page === 'training') {
    nodes.push(service(`${url}#training`, 'Amazon PPC Training', 'Practical Amazon PPC training', url, 'Brand and agency teams'))
    webPage.mainEntity = { '@id': `${url}#training` }
  }
  nodes.push(webPage)
  return { '@context': 'https://schema.org', '@graph': nodes }
}
