/**
 * The partner's approved website copy ("website content.pdf"). This file is the
 * shape of that document, not a design: every field is a block of the partner's
 * text, and the English file holds it verbatim. Headlines the PDF sets in
 * capitals are stored in sentence case; the capitals were typography, not words.
 *
 * Nothing here comes from the Brand Book or Commercial Playbook. The PDF's own
 * commentary (recommendations, notes to the reader) is deliberately absent.
 */

export type Titled = { title: string; body: string }

export type Hero = {
  /** Small label above the headline, where the PDF has one. */
  eyebrow?: string
  title: string
  subtitle?: string
  paragraphs: string[]
}

export type PartnerCopy = {
  /** Sign-off line under the homepage, reused in the footer. */
  signoff: string
  /** The two audiences as the PDF's structure diagram describes them; used by the Services menu. */
  audiences: {
    brands: { title: string; summary: string }
    agencies: { title: string; summary: string }
  }
  /** Page names exactly as the PDF lists them. */
  pageNames: {
    ppc: string
    agencies: string
    training: string
    audits: string
  }

  home: {
    hero: Hero & { primaryCta: string; secondaryCta: string; closingLine: string }
    autopilot: { title: string; paragraphs: string[]; closingLine: string }
    whatWeDo: {
      title: string
      items: { number: string; name: string; tagline: string; paragraphs: string[]; bullets?: string[] }[]
    }
    approach: { title: string; subtitle: string; intro: string; items: Titled[] }
    audiences: {
      title: string
      brands: { title: string; paragraphs: string[]; cta: string }
      agencies: { title: string; paragraphs: string[]; cta: string }
    }
    final: { title: string; paragraphs: string[]; cta: string }
  }

  ppc: {
    hero: Hero
    approach: { title: string; items: Titled[] }
    manage: { title: string; items: string[]; note: string }
    who: { title: string; paragraphs: string[] }
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
    final: { title: string; paragraphs: string[]; cta: string }
  }

  training: {
    hero: Hero
    tailored: { title: string; items: Titled[] }
    formats: { title: string; paragraphs: string[]; cta: string }
  }

  audits: {
    hero: Hero
    validation: {
      title: string
      tagline: string
      intro: string
      listLabel: string
      items: string[]
      paragraphs: string[]
    }
    audits: {
      title: string
      tagline: string
      intro: string
      items: Titled[]
      closing: string
      cta: string
    }
  }

  about: {
    hero: Hero
    paragraphs: string[]
    forBrands: string
    forAgencies: string
    goal: string
    closing: [string, string]
  }
}
