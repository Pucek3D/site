/**
 * Site facts. Anything marked `placeholder: true` has NOT been supplied by
 * the owner and must not be presented as fact.
 *
 * The site is run by a natural person with no registered business, so there
 * is deliberately no company name, KRS, NIP/VAT or representative field here.
 * Add them only once a business is actually registered.
 */
type Placeholder = { value: string; placeholder: boolean }

/** The canonical origin (no `www`). Overridable per environment, never an example domain. */
const CANONICAL_URL = 'https://adeliercommerce.com'

export const siteConfig = {
  name: 'ADelier Commerce',
  /** The official brand descriptor. A brand identifier, so it stays in English in every locale (home title, JSON-LD). */
  descriptor: 'Marketplace Growth Partner',
  url: (process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_URL).replace(/\/$/, ''),
  email: { value: 'contact@adeliercommerce.com', placeholder: false } as Placeholder,
  linkedin: { value: 'https://www.linkedin.com/company/adelier-commerce/', placeholder: false } as Placeholder,
  operator: {
    /** Natural person operating the site and acting as data controller. */
    name: 'Kornelia Mazurczyk-Wolska',
  },
  legal: {
    /**
     * The legal pages carry the operator's private residential address. They
     * are public ONLY once LEGAL_PUBLISH_APPROVED=true is set by the owner, in
     * any environment. Before that they return 404, except for a private review
     * copy behind LEGAL_REVIEW_TOKEN (see lib/legal-access.ts).
     */
    publishApproved: process.env.LEGAL_PUBLISH_APPROVED === 'true',
  },
} as const
