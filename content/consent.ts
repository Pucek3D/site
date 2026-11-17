import type { Locale } from '@/lib/i18n'

/**
 * The consent wording shown next to each checkbox, verbatim. The SAME strings are
 * sealed into the confirmation token and stored in the consent record, so the record
 * proves exactly what the person agreed to.
 *
 * Kept out of content/{en,pl,de}.ts on purpose: those dictionaries pass through
 * bindHangingWords(), which rewrites spaces, and the stored text must equal the
 * text shown byte for byte.
 *
 * Changing ANY character here is a new version: update CONSENT_TEXT_VERSION too.
 */
export const CONSENT_TEXT_VERSION = 'consent-2026-11'

/** The data controller as named in every consent text. One constant, used everywhere. */
export const CONSENT_CONTROLLER = 'ADelier Commerce (Kornelia Mazurczyk-Wolska)'
const CONTACT = 'contact@adeliercommerce.com'

export type ConsentChannel = 'email' | 'phone'

export const consentTexts: Record<Locale, Record<ConsentChannel, string>> = {
  en: {
    email: `I agree that ${CONSENT_CONTROLLER} may send me commercial information and offers about Amazon PPC services, training and related content by e-mail to the address I provided. I can withdraw this consent at any time using the unsubscribe link, at /unsubscribe, or by writing to ${CONTACT}.`,
    phone: `I agree that ${CONSENT_CONTROLLER} may contact me by phone at the number I provided to present commercial offers about Amazon PPC services and training. I can withdraw this consent at any time by writing to ${CONTACT}.`,
  },
  pl: {
    email: `Wyrażam zgodę na otrzymywanie od ${CONSENT_CONTROLLER} informacji handlowych i ofert dotyczących usług Amazon PPC, szkoleń i powiązanych treści na podany adres e-mail. Zgodę mogę wycofać w dowolnym momencie, korzystając z linku rezygnacji, na stronie /unsubscribe lub pisząc na ${CONTACT}.`,
    phone: `Wyrażam zgodę na kontakt telefoniczny ze strony ${CONSENT_CONTROLLER} pod podanym numerem telefonu w celu przedstawienia ofert handlowych dotyczących usług Amazon PPC i szkoleń. Zgodę mogę wycofać w dowolnym momencie, pisząc na ${CONTACT}.`,
  },
  de: {
    email: `Ich willige ein, dass ${CONSENT_CONTROLLER} mir per E-Mail an die angegebene Adresse Werbeinformationen und Angebote zu Amazon-PPC-Dienstleistungen, Schulungen und verwandten Inhalten zusendet. Ich kann diese Einwilligung jederzeit widerrufen: über den Abmeldelink, unter /unsubscribe oder per E-Mail an ${CONTACT}.`,
    phone: `Ich willige ein, dass ${CONSENT_CONTROLLER} mich unter der angegebenen Telefonnummer telefonisch kontaktiert, um mir Angebote zu Amazon-PPC-Dienstleistungen und Schulungen vorzustellen. Ich kann diese Einwilligung jederzeit widerrufen: per E-Mail an ${CONTACT}.`,
  },
}
