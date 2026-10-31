/**
 * Company facts. Anything marked `placeholder: true` has NOT been supplied by
 * the owner and must not be presented as fact: components render these with a
 * visible "to be supplied" marker instead of the value.
 */
type Placeholder = { value: string; placeholder: boolean }

const placeholder = (value: string): Placeholder => ({ value, placeholder: true })

export const siteConfig = {
  name: 'ADelier Commerce',
  /** From the partner's sign-off line: "ADelier Commerce — Amazon advertising, marketplace expertise and applied training." */
  descriptor: 'Amazon advertising, marketplace expertise and applied training',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://adelier.example').replace(/\/$/, ''),
  email: placeholder(process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@adelier.example'),
  linkedin: placeholder(process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/company/'),
  legal: {
    companyName: placeholder('[Registered legal company name]'),
    registrationNumber: placeholder('[Registration number / KRS]'),
    vatNumber: placeholder('[VAT ID / NIP]'),
    address: placeholder('[Registered office address]'),
    representative: placeholder('[Authorized representative]'),
    dataController: placeholder('[Data controller and contact for privacy requests]'),
  },
} as const
