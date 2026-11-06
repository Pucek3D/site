/**
 * Company facts. Anything marked `placeholder: true` has NOT been supplied by
 * the owner and must not be presented as fact: components render these with a
 * visible "to be supplied" marker instead of the value.
 */
type Placeholder = { value: string; placeholder: boolean }

const placeholder = (value: string): Placeholder => ({ value, placeholder: true })

export const siteConfig = {
  name: 'ADelier Commerce',
  /** The official brand descriptor. A brand identifier, so it stays in English in every locale (home title, JSON-LD). */
  descriptor: 'Marketplace Growth Partner',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://adelier.example').replace(/\/$/, ''),
  email: { value: 'contact@deliercommerce.com', placeholder: false } as Placeholder,
  linkedin: { value: 'https://www.linkedin.com/company/adelier-commerce/', placeholder: false } as Placeholder,
  legal: {
    companyName: placeholder('[Registered legal company name]'),
    registrationNumber: placeholder('[Registration number / KRS]'),
    vatNumber: placeholder('[VAT ID / NIP]'),
    address: placeholder('[Registered office address]'),
    representative: placeholder('[Authorized representative]'),
    dataController: placeholder('[Data controller and contact for privacy requests]'),
  },
} as const
