export const locales = ['en', 'pl', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

/** Each language names itself, so a reader who can't read the current page can still find theirs. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  pl: 'Polski',
  de: 'Deutsch',
}

export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  pl: 'pl_PL',
  de: 'de_DE',
}

/** The pages the partner's content document defines, plus the legal pages. */
export const pageKeys = ['home', 'ppc', 'agencies', 'training', 'audits', 'about', 'contact', 'privacy', 'legal'] as const
export type PageKey = (typeof pageKeys)[number]

export const pagePaths: Record<PageKey, string> = {
  home: '',
  ppc: '/amazon-ppc-management',
  agencies: '/agency-partnerships',
  training: '/amazon-ppc-training',
  audits: '/amazon-market-validation-audits',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  legal: '/legal',
}

/** Pages listed under the Services menu, grouped by audience as the partner's structure describes. */
export const brandServiceKeys = ['ppc', 'audits', 'training'] as const satisfies readonly PageKey[]
export const serviceKeys = [...brandServiceKeys, 'agencies'] as const satisfies readonly PageKey[]

export function href(locale: Locale, page: PageKey, suffix = ''): string {
  return `/${locale}${pagePaths[page]}${suffix}`
}

/** Which page a pathname belongs to, ignoring the locale prefix. */
export function pageFromPath(pathname: string): PageKey {
  const rest = pathname.replace(/^\/(en|pl|de)(?=\/|$)/, '') || ''
  const match = pageKeys.find((k) => pagePaths[k] !== '' && rest.startsWith(pagePaths[k]))
  return match ?? 'home'
}

/** Swap the locale segment and keep everything after it, so switching language keeps the reader on the same page. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const rest = pathname.replace(/^\/(en|pl|de)(?=\/|$)/, '')
  return `/${target}${rest}`
}

/** Pick the best supported locale from an Accept-Language header; English is the fallback. */
export function negotiateLocale(header: string | null): Locale {
  if (!header) return defaultLocale
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }
  return defaultLocale
}
