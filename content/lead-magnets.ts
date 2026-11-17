import type { Locale } from '@/lib/i18n'

/**
 * Downloadable materials offered in exchange for an e-mail address
 * (/{locale}/subscribe?magnet=<id>). The material is sent only after the address is
 * confirmed; marketing consent stays optional in this mode.
 *
 * No lead magnets exist yet, so the list is deliberately empty. An unknown
 * ?magnet= value falls back to the ordinary updates sign-up.
 */
export type LeadMagnet = {
  /** Stable id used in ?magnet= and stored in the consent record. Lowercase, a-z, 0-9 and hyphens. */
  id: string
  /** Only the languages the material actually exists in. */
  locales: Partial<Record<Locale, { title: string; description: string; url: string }>>
}

export const leadMagnets: LeadMagnet[] = []

export function findLeadMagnet(id: unknown, locale: Locale) {
  if (typeof id !== 'string') return null
  const magnet = leadMagnets.find((m) => m.id === id)
  const copy = magnet?.locales[locale]
  return magnet && copy ? { id: magnet.id, ...copy } : null
}
