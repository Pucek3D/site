import type { Locale } from './i18n'

/**
 * Which languages carry a blog, and which languages each article exists in.
 * Kept apart from the article text so the client-side language switcher can
 * read it without shipping every article to the browser. lib/blog.ts asserts
 * that this list matches the articles it actually holds.
 */
export const blogLocales = ['en', 'pl'] as const satisfies readonly Locale[]

/**
 * One entry per article: its slug in every language it is published in.
 * Translations carry their own slug (an English URL in English), so languages
 * are paired here rather than by sharing a slug.
 */
export const blogTranslations: readonly Partial<Record<Locale, string>>[] = [
  { pl: 'czy-warto-sprzedawac-na-amazonie' },
  { en: 'stoveshelf-from-50-units-to-10-million-on-amazon' },
]

export function hasBlog(locale: Locale): boolean {
  return (blogLocales as readonly Locale[]).includes(locale)
}

/** The slug of `slug` (published in `from`) in the `target` language, or undefined when it isn't translated. */
export function translatedSlug(slug: string, from: Locale, target: Locale): string | undefined {
  return blogTranslations.find((t) => t[from] === slug)?.[target]
}
