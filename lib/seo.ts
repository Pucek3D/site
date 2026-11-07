import type { Metadata } from 'next'
import { getDictionary } from '@/content'
import { href, locales, ogLocale, type Locale, type PageKey } from './i18n'
import { siteConfig } from './site-config'
import { seoNoIndex } from './seo-runtime'

type PublicPage = Exclude<PageKey, 'privacy' | 'legal'>

/**
 * Editorial search snippets for the six public pages. They never change visible
 * page content. Privacy and Legal keep their existing metadata from the
 * dictionaries (content/{en,pl,de}.ts → meta), which is the approved wording.
 */
const seoCopy: Record<Locale, Record<PublicPage, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'ADelier Commerce — Marketplace Growth Partner',
      description: 'Expert-led Amazon PPC management, white-label agency support and practical PPC training for brands and agencies.',
    },
    agencies: {
      title: 'White-Label Amazon PPC for Agencies | ADelier Commerce',
      description: 'Expand Amazon PPC delivery with white-label campaign management or dedicated specialist support. Your agency keeps its client relationships and agreed control.',
    },
    brands: {
      title: 'Amazon PPC Management for Brands | ADelier Commerce',
      description: 'Expert-led Amazon PPC management and practical training for brand teams. Choose managed campaigns, in-house capability building or both.',
    },
    training: {
      title: 'Amazon PPC Training for Teams | ADelier Commerce',
      description: 'Practical Amazon PPC training for brand and agency teams. Build skills in campaign analysis, targeting and optimisation with a tailored standalone programme.',
    },
    about: {
      title: 'About ADelier Commerce | Amazon PPC Expertise',
      description: 'Learn about ADelier Commerce and its expert-led approach to Amazon PPC management, agency collaboration and practical training.',
    },
    contact: {
      title: 'Contact ADelier Commerce | Amazon PPC & Training',
      description: 'Discuss Amazon PPC management, agency partnerships, dedicated specialist support or practical PPC training with ADelier Commerce.',
    },
  },
  pl: {
    home: {
      title: 'ADelier Commerce — Marketplace Growth Partner',
      description: 'Eksperckie zarządzanie reklamami Amazon PPC, współpraca white-label z agencjami i praktyczne szkolenia PPC dla marek oraz zespołów.',
    },
    agencies: {
      title: 'Amazon PPC dla agencji — white-label | ADelier Commerce',
      description: 'Obsługa kampanii Amazon PPC w modelu white-label lub wsparcie dedykowanego specjalisty. Agencja zachowuje relacje z klientami i uzgodnioną kontrolę.',
    },
    brands: {
      title: 'Zarządzanie reklamami Amazon PPC | ADelier Commerce',
      description: 'Eksperckie zarządzanie Amazon PPC i praktyczne szkolenia dla zespołów marek. Wybierz obsługę kampanii, rozwój kompetencji lub oba rozwiązania.',
    },
    training: {
      title: 'Szkolenia Amazon PPC dla zespołów | ADelier Commerce',
      description: 'Praktyczne szkolenia Amazon PPC dla marek i agencji. Analiza kampanii, targetowanie i optymalizacja w programie dopasowanym do zespołu.',
    },
    about: {
      title: 'O ADelier Commerce | Eksperckie Amazon PPC',
      description: 'Poznaj ADelier Commerce i nasze podejście do zarządzania kampaniami Amazon PPC, współpracy z agencjami oraz praktycznych szkoleń.',
    },
    contact: {
      title: 'Kontakt | ADelier Commerce — Amazon PPC',
      description: 'Porozmawiaj z ADelier Commerce o zarządzaniu Amazon PPC, współpracy agencyjnej, dedykowanych specjalistach lub szkoleniach.',
    },
  },
  de: {
    home: {
      title: 'ADelier Commerce — Marketplace Growth Partner',
      description: 'Expertengeführtes Amazon-PPC-Management, White-Label-Unterstützung für Agenturen und praxisorientierte PPC-Schulungen für Marken und Teams.',
    },
    agencies: {
      title: 'White-Label Amazon PPC für Agenturen | ADelier Commerce',
      description: 'Amazon-PPC-Kampagnenbetreuung im White-Label-Modell oder Unterstützung durch dedizierte Spezialisten. Kundenbeziehungen bleiben bei Ihrer Agentur.',
    },
    brands: {
      title: 'Amazon-PPC-Management für Marken | ADelier Commerce',
      description: 'Expertengeführtes Amazon-PPC-Management und praxisorientierte Schulungen für Markenteams. Kampagnenbetreuung und Training sind separat verfügbar.',
    },
    training: {
      title: 'Amazon-PPC-Schulungen für Teams | ADelier Commerce',
      description: 'Praxisorientierte Amazon-PPC-Schulungen für Marken und Agenturen. Kampagnenanalyse, Targeting und Optimierung in einem individuell abgestimmten Programm.',
    },
    about: {
      title: 'Über ADelier Commerce | Amazon-PPC-Expertise',
      description: 'Erfahren Sie mehr über ADelier Commerce und unseren expertengeführten Ansatz für Amazon-PPC-Management, Agenturpartnerschaften und Schulungen.',
    },
    contact: {
      title: 'Kontakt | ADelier Commerce — Amazon PPC',
      description: 'Sprechen Sie mit ADelier Commerce über Amazon-PPC-Management, Agenturpartnerschaften, dedizierte Spezialisten oder praxisorientierte Trainings.',
    },
  },
}

const ogImageAlt: Record<Locale, string> = {
  en: 'ADelier Commerce — Marketplace Growth Partner: Amazon PPC management, agency partnerships and training',
  pl: 'ADelier Commerce — Marketplace Growth Partner: zarządzanie Amazon PPC, współpraca z agencjami i szkolenia',
  de: 'ADelier Commerce — Marketplace Growth Partner: Amazon PPC, Agenturpartnerschaften und Schulungen',
}

/** Single-line plain text: some social crawlers display repeated whitespace literally. */
const clean = (value: string) => value.replace(/\s+/g, ' ').trim()

export function seoText(locale: Locale, page: PageKey): { title: string; description: string } {
  const { title, description } =
    page === 'privacy' || page === 'legal' ? getDictionary(locale).meta[page] : seoCopy[locale][page]
  return { title: clean(title), description: clean(description) }
}

/** Self-referencing canonical per language, reciprocal hreflang + x-default (EN). Query parameters never enter the canonical. */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const meta = seoText(locale, page)
  const canonical = `${siteConfig.url}${href(locale, page)}`
  const noIndex = seoNoIndex() || page === 'privacy' || page === 'legal'
  const image = `${siteConfig.url}/og/adelier-commerce-${locale}.png`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${href(l, page)}`])),
        'x-default': `${siteConfig.url}${href('en', page)}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: ogImageAlt[locale], type: 'image/png' }],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, images: [image] },
    robots: noIndex
      ? { index: false, follow: page === 'privacy' || page === 'legal' ? !seoNoIndex() : false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
        },
  }
}
