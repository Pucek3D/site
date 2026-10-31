/**
 * The partner's approved website copy ("website content.pdf"), as revised by the
 * October 2026 website feedback notes. Every field is a block of text, and the
 * three locale files must share this shape exactly (see scripts/check-i18n-parity.mjs).
 *
 * Retired on purpose — do not reintroduce: the "Amazon Market Validation & Audits"
 * product and page, the Services menu, and the hero dashboard mini-cards.
 */

export type Titled = { title: string; body: string }

export type Hero = {
  /** Small label above the headline, where the page has one. */
  eyebrow?: string
  title: string
  subtitle?: string
  paragraphs: string[]
}

export type PartnerCopy = {
  /** Sign-off line under the homepage, reused in the footer. */
  signoff: string
  /** SEO page titles. Navigation labels live in the interface dictionary. */
  pageNames: {
    agencies: string
    brands: string
    training: string
  }

  home: {
    hero: Hero & {
      /** Also the header's contact button. */
      primaryCta: string
      /** One action per buyer route, in route order. */
      routes: { agencies: string; brands: string; training: string }
      closingLine: string
    }
    autopilot: { title: string; paragraphs: string[]; closingLine: string }
    /** One tile per buyer route, in route order: agencies, brands, training. */
    whatWeDo: {
      title: string
      items: { number: string; name: string; tagline: string; paragraphs: string[]; bullets?: string[] }[]
    }
    /** How campaign evidence becomes decisions. */
    approach: { title: string; subtitle: string; intro: string; items: Titled[] }
    audiences: {
      title: string
      agencies: { title: string; paragraphs: string[]; cta: string }
      brands: { title: string; paragraphs: string[]; cta: string }
    }
    final: { title: string; paragraphs: string[]; cta: string }
  }

  /** The For Brands page: two core offers, PPC Management and PPC Training. */
  brands: {
    hero: Hero
    ppc: {
      label: string
      /** The service headline. It belongs here, never on the homepage hero. */
      title: string
      paragraphs: string[]
      cycleTitle: string
      cycle: Titled[]
      manage: { title: string; items: string[]; note: string }
      who: { title: string; paragraphs: string[] }
    }
    training: {
      label: string
      title: string
      paragraphs: string[]
      listLabel: string
      items: string[]
      cta: string
    }
    final: { title: string; paragraphs: string[]; cta: string }
  }

  agencies: {
    hero: Hero
    ways: {
      title: string
      whiteLabel: {
        name: string
        tagline: string
        paragraphs: string[]
        listLabel: string
        items: string[]
        idealFor: string
      }
      specialists: {
        name: string
        tagline: string
        paragraphs: string[]
        listLabel: string
        items: string[]
      }
    }
    why: { title: string; items: Titled[] }
    training: { title: string; body: string; cta: string }
    final: { title: string; paragraphs: string[]; cta: string }
  }

  training: {
    hero: Hero
    howItWorks: { title: string; items: Titled[] }
    tailored: { title: string; items: Titled[] }
    formats: { title: string; paragraphs: string[]; cta: string }
  }

  about: {
    hero: Hero
    /** Who we are, where we are based, which problems we solve. */
    paragraphs: string[]
    pillars: { title: string; items: Titled[] }
    forBrands: string
    forAgencies: string
    goal: string
    closing: [string, string]
  }
}
