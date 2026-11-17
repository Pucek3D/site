import type { Locale } from './i18n'

/**
 * Which languages carry a blog, and which languages each article exists in.
 * Kept apart from the article text so the client-side language switcher can
 * read it without shipping every article to the browser. lib/blog.ts asserts
 * that this list matches the articles it actually holds.
 */
export const blogLocales = ['en', 'pl'] as const satisfies readonly Locale[]

export const blogPostLocales: Record<string, readonly Locale[]> = {
  'czy-warto-sprzedawac-na-amazonie': ['pl'],
}

export function hasBlog(locale: Locale): boolean {
  return (blogLocales as readonly Locale[]).includes(locale)
}

export function postAvailableIn(slug: string, locale: Locale): boolean {
  return blogPostLocales[slug]?.includes(locale) ?? false
}
