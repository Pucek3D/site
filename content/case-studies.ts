import type { Locale } from '@/lib/i18n'

/**
 * Client case studies. Deliberately EMPTY: a study is added only after the
 * client approves content, figures and context in writing. The Results page
 * renders an honest empty state while this list has no entries — never
 * replace that with sample studies.
 */
export type CaseStudy = {
  slug: string
  approvedOn: string
  clientApproval: true
  locales: Partial<
    Record<
      Locale,
      {
        title: string
        situation: string
        baseline: string
        diagnosis: string
        decision: string
        work: string
        result: string
        limits: string
        capability: string
        next: string
      }
    >
  >
}

export const caseStudies: CaseStudy[] = []
