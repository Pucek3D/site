import type { Locale } from '@/lib/i18n'
import { bindHangingWords } from '@/lib/nbsp'
import { de } from './de'
import { en } from './en'
import { pl } from './pl'
import type { PartnerCopy } from './types'

const copy: Record<Locale, PartnerCopy> = {
  en,
  pl: bindHangingWords(pl, 'pl'),
  de: bindHangingWords(de, 'de'),
}

export function getCopy(locale: Locale): PartnerCopy {
  return copy[locale]
}

export type { PartnerCopy }
