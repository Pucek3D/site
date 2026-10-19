import type { Locale } from '@/lib/i18n'
import { de } from './de'
import { en, type Dictionary } from './en'
import { pl } from './pl'

const dictionaries: Record<Locale, Dictionary> = { en, pl, de }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
