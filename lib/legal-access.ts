import { timingSafeEqual } from 'node:crypto'
import { siteConfig } from './site-config'

/**
 * Who may see the legal pages, which carry the operator's residential address.
 *
 * - `public`: the owner approved publication (LEGAL_PUBLISH_APPROVED=true).
 * - `review`: not approved, but the request carries `?review=<LEGAL_REVIEW_TOKEN>`.
 *   A private review copy for the owner; never linked, never indexed.
 * - `denied`: everyone else, in every environment, development included. A
 *   preview URL can be public, so "it is only the preview" is not approval.
 */
export type LegalAccess = 'public' | 'review' | 'denied'

/** Short tokens are guessable; one this short is treated as unset. */
const MIN_TOKEN_LENGTH = 24

export function legalAccess(review: string | string[] | undefined): LegalAccess {
  if (siteConfig.legal.publishApproved) return 'public'
  const token = process.env.LEGAL_REVIEW_TOKEN ?? ''
  if (token.length < MIN_TOKEN_LENGTH || typeof review !== 'string') return 'denied'
  const given = Buffer.from(review)
  const expected = Buffer.from(token)
  return given.length === expected.length && timingSafeEqual(given, expected) ? 'review' : 'denied'
}
