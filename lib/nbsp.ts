import type { Locale } from '@/lib/i18n'

const NBSP = '\u00a0'

/**
 * Words that must not be left hanging at the end of a line. The space after
 * them becomes a non-breaking space, so the browser carries them onto the next
 * line together with the word they introduce. Copy stays verbatim apart from
 * that one whitespace character.
 */
const HANGING: Partial<Record<Locale, RegExp>> = {
  // Polish typography: single-letter words (spójniki i przyimki) never end a line,
  // plus the short words the client asked to carry over (na, do, dla, które, kto).
  pl: /(?<![\p{L}\p{N}])([aiouwzAIOUWZ]|na|Na|do|Do|dla|Dla|które|Które|kto|Kto) /gu,
  // German articles stay with their noun.
  de: /(?<![\p{L}\p{N}])(der|die|das|Der|Die|Das) /gu,
}

function bindString(text: string, pattern: RegExp): string {
  return text.replace(pattern, `$1${NBSP}`)
}

function bindDeep<T>(value: T, pattern: RegExp): T {
  if (typeof value === 'string') return bindString(value, pattern) as T
  if (Array.isArray(value)) return value.map((item) => bindDeep(item, pattern)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, bindDeep(item, pattern)]),
    ) as T
  }
  return value
}

/** Applies the locale's no-hanging-words rule to every string in a copy tree. */
export function bindHangingWords<T>(copy: T, locale: Locale): T {
  const pattern = HANGING[locale]
  return pattern ? bindDeep(copy, pattern) : copy
}
