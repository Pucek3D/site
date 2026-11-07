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
const CANONICAL_URL = 'https://deliercommerce.com'

export const siteConfig = {
  name: 'ADelier Commerce',
  /** The official brand descriptor. A brand identifier, so it stays in English in every locale (home title, JSON-LD). */
  descriptor: 'Marketplace Growth Partner',
  url: (process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_URL).replace(/\/$/, ''),
  email: { value: 'contact@deliercommerce.com', placeholder: false } as Placeholder,
  linkedin: { value: 'https://www.linkedin.com/company/adelier-commerce/', placeholder: false } as Placeholder,
  operator: {
    /** Natural person operating the site and acting as data controller. */
    name: 'Kornelia Mazurczyk-Wolska',
  },
  legal: {
    /**
     * The legal pages carry the operator's private residential address. It is
     * shown in local development (the v0 preview) for review, and anywhere else
     * ONLY once LEGAL_PUBLISH_APPROVED=true is set. Until then deployed builds
     * return 404 for both pages rather than publish an incomplete notice.
     */
    publishApproved: process.env.LEGAL_PUBLISH_APPROVED === 'true',
    get showAddress() {
      return this.publishApproved || process.env.NODE_ENV === 'development'
    },
  },
} as const
