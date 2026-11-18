import type { Metadata } from 'next'
import { getDictionary } from '@/content'
import { href, locales, localesFor, ogLocale, type Locale, type PageKey } from './i18n'
import { siteConfig } from './site-config'
import { seoNoIndex } from './seo-runtime'
import { excerptOf, type Post } from './blog'
import { translatedSlug } from './blog-registry'

type PublicPage = Exclude<PageKey, 'privacy' | 'legal'>

/**
 * Editorial search snippets for the six public pages. They never change visible
 * page content. Privacy and Legal keep their existing metadata from the
 * dictionaries (content/{en,pl,de}.ts → meta), which is the approved wording.
 */
const seoCopy: Record<Locale, Record<PublicPage, { title: string; description: string }>> = {
  en: {
    home: {
      title: 'Amazon PPC Management & Training | ADelier Commerce',
      description: 'Expert-led Amazon PPC management, white-label agency support and practical PPC training for brands and agencies.',
    },
    agencies: {
      title: 'White-Label Amazon PPC Management for Agencies | ADelier',
      description: 'White-label Amazon PPC outsourcing and dedicated PPC specialist support for agencies. Expand delivery capacity while keeping client relationships and agreed control.',
    },
    brands: {
      title: 'Amazon PPC Management for Brands | ADelier Commerce',
      description: 'Expert-led Amazon PPC management and practical training for brand teams. Choose managed campaigns, in-house capability building or both.',
    },
    training: {
      title: 'Amazon PPC Training for Teams | ADelier Commerce',
      description: 'Practical Amazon PPC training for brand and agency teams. Build skills in campaign analysis, targeting and optimisation with a tailored standalone programme.',
    },
    blog: {
      title: 'Blog | Amazon Advertising & Marketplace Growth | ADelier',
      description: 'Practical articles on Amazon advertising, marketplace growth and profitable sales for brands and agencies.',
    },
    about: {
      title: 'About ADelier Commerce | Amazon PPC Expertise',
      description: 'Learn about ADelier Commerce and its expert-led approach to Amazon PPC management, agency collaboration and practical training.',
    },
    contact: {
      title: 'Contact ADelier Commerce | Amazon PPC & Training',
      description: 'Discuss Amazon PPC management, agency partnerships, dedicated specialist support or practical PPC training with ADelier Commerce.',
    },
    subscribe: {
      title: 'Updates by E-mail | ADelier Commerce',
      description: 'Choose whether ADelier Commerce may contact you by e-mail or phone with offers about Amazon PPC services and training. Each consent is separate and can be withdrawn.',
    },
  },
  pl: {
    home: {
      title: 'Zarządzanie Amazon PPC i szkolenia | ADelier Commerce',
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
    blog: {
      title: 'Blog o sprzedaży i reklamie na Amazonie | ADelier Commerce',
      description: 'Praktyczne artykuły o reklamie Amazon, sprzedaży na marketplace’ach i rentownym rozwoju marek.',
    },
    about: {
      title: 'O ADelier Commerce | Eksperckie Amazon PPC',
      description: 'Poznaj ADelier Commerce i nasze podejście do zarządzania kampaniami Amazon PPC, współpracy z agencjami oraz praktycznych szkoleń.',
    },
    contact: {
      title: 'Kontakt | ADelier Commerce — Amazon PPC',
      description: 'Porozmawiaj z ADelier Commerce o zarządzaniu Amazon PPC, współpracy agencyjnej, dedykowanych specjalistach lub szkoleniach.',
    },
    subscribe: {
      title: 'Informacje e-mailem | ADelier Commerce',
      description: 'Zdecyduj, czy ADelier Commerce może kontaktować się z Tobą e-mailem lub telefonicznie w sprawie ofert dotyczących Amazon PPC i szkoleń. Każda zgoda jest osobna i można ją wycofać.',
    },
  },
  de: {
    home: {
      title: 'Amazon PPC Management & Schulungen | ADelier Commerce',
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
    blog: {
      title: 'Blog | ADelier Commerce',
      description: 'Artikel über Amazon-Werbung und Marktplatzwachstum.',
    },
    about: {
      title: 'Über ADelier Commerce | Amazon-PPC-Expertise',
      description: 'Erfahren Sie mehr über ADelier Commerce und unseren expertengeführten Ansatz für Amazon-PPC-Management, Agenturpartnerschaften und Schulungen.',
    },
    contact: {
      title: 'Kontakt | ADelier Commerce — Amazon PPC',
      description: 'Sprechen Sie mit ADelier Commerce über Amazon-PPC-Management, Agenturpartnerschaften, dedizierte Spezialisten oder praxisorientierte Trainings.',
    },
    subscribe: {
      title: 'Informationen per E-Mail | ADelier Commerce',
      description: 'Entscheiden Sie, ob ADelier Commerce Sie per E-Mail oder Telefon zu Angeboten rund um Amazon PPC und Schulungen kontaktieren darf. Jede Einwilligung ist separat und widerrufbar.',
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
  // Keep the previously approved branded social-preview title while the HTML title targets search intent.
  const socialTitle = page === 'home' ? 'ADelier Commerce — Marketplace Growth Partner' : meta.title
  const canonical = `${siteConfig.url}${href(locale, page)}`
  const noIndex = seoNoIndex() || page === 'privacy' || page === 'legal'
  const image = `${siteConfig.url}/og/adelier-commerce-${locale}.png`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(localesFor(page).map((l) => [l, `${siteConfig.url}${href(l, page)}`])),
        'x-default': `${siteConfig.url}${href('en', page)}`,
      },
    },
    openGraph: {
      title: socialTitle,
      description: meta.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[locale],
      alternateLocale: localesFor(page).filter((l) => l !== locale).map((l) => ogLocale[l]),
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: ogImageAlt[locale], type: 'image/png' }],
    },
    twitter: { card: 'summary_large_image', title: socialTitle, description: meta.description, images: [image] },
    robots: noIndex
      ? { index: false, follow: page === 'privacy' || page === 'legal' ? !seoNoIndex() : false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
        },
  }
}

/** One article in one language: canonical to itself, hreflang only for languages it is actually published in. */
/**
 * Reciprocal hreflang for one article: every language it is genuinely published in,
 * plus x-default on the English version when one exists. Shared by the page
 * metadata and the sitemap so the two cannot disagree.
 */
export function articleLanguages(post: Post): Record<string, string> {
  const langs: Record<string, string> = Object.fromEntries(
    locales.flatMap((l) => {
      const slug = translatedSlug(post.slug, post.locale, l)
      return slug ? [[l, `${siteConfig.url}${href(l, 'blog', `/${slug}`)}`]] : []
    }),
  )
  if (langs.en) langs['x-default'] = langs.en
  return langs
}

export function articleMetadata(post: Post): Metadata {
  const canonical = `${siteConfig.url}${href(post.locale, 'blog', `/${post.slug}`)}`
  const description = post.seo?.description ?? clean(excerptOf(post))
  const ogDescription = post.seo?.ogDescription ?? description
  const title = post.seo?.title ?? `${post.title} | ADelier Commerce`
  const ogTitle = post.seo?.ogTitle ?? title
  const image = `${siteConfig.url}${post.cover.src}`
  const langs = articleLanguages(post)
  const alternateLocales = Object.keys(langs)
    .filter((l) => l !== 'x-default' && l !== post.locale)
    .map((l) => ogLocale[l as Locale])
  // No `keywords`: Google ignores the meta keywords tag. They are kept for BlogPosting.keywords only.
  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages: langs },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale[post.locale],
      alternateLocale: alternateLocales,
      type: 'article',
      publishedTime: post.published,
      modifiedTime: post.modified,
      authors: [siteConfig.name],
      images: [{ url: image, width: post.cover.width, height: post.cover.height, alt: post.cover.alt }],
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description: ogDescription, images: [{ url: image, alt: post.cover.alt }] },
    robots: seoNoIndex() ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  }
}
