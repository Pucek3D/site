import type { Locale } from '@/lib/i18n'
import { de } from './de'
import { en, type Dictionary } from './en'
import { pl } from './pl'
import { bindHangingWords } from '@/lib/nbsp'

const dictionaries: Record<Locale, Dictionary> = {
  en,
  pl: bindHangingWords(pl, 'pl'),
  de: bindHangingWords(de, 'de'),
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
