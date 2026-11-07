import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import type { Dictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { legalAccess } from '@/lib/legal-access'
import { loadLegalDoc } from '@/lib/legal-docs'
import { Container, Eyebrow } from './primitives'
import { Breadcrumbs } from './page-kit'

/**
 * Renders an owner-supplied legal draft as the public page will look.
 *
 * The drafts carry the operator's private residential address, so without
 * LEGAL_PUBLISH_APPROVED=true they are not rendered at all (404), except as a
 * private review copy behind LEGAL_REVIEW_TOKEN. Swapping the address for a
 * "[withheld]" marker would publish a notice that reads as final while missing
 * a mandatory detail, which is worse than none.
 */

const REVIEW_NOTICE: Record<Locale, string> = {
  en: 'Private review copy. Not published: this page returns 404 for everyone else until publication is approved.',
  pl: 'Prywatna kopia do przeglądu. Nieopublikowana: dla innych osób ta strona zwraca 404 do czasu zatwierdzenia publikacji.',
  de: 'Private Prüfkopie. Nicht veröffentlicht: Für alle anderen liefert diese Seite 404, bis die Veröffentlichung freigegeben ist.',
}

const LINKABLE = /(\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b|https?:\/\/[^\s)]+|\bwww\.[\w-]+(?:\.[\w-]+)+\b)/g

function linkify(text: string): ReactNode[] {
  return text.split(LINKABLE).map((chunk, i) => {
    if (i % 2 === 0) return chunk
    const isEmail = chunk.includes('@')
    const href = isEmail ? `mailto:${chunk}` : chunk.startsWith('http') ? chunk : `https://${chunk}`
    return (
      <a
        key={i}
        href={href}
        className="font-medium text-cobalt underline underline-offset-4"
        {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {chunk}
      </a>
    )
  })
}

export function LegalDocument({
  locale,
  dict,
  page,
  review,
}: {
  locale: Locale
  dict: Dictionary
  page: 'privacy' | 'legal'
  review: string | string[] | undefined
}) {
  const access = legalAccess(review)
  if (access === 'denied') notFound()
  const doc = loadLegalDoc(locale, page)
  return (
    <Container className="py-14 md:py-20">
      <Breadcrumbs locale={locale} homeLabel={dict.nav.items.home} label={dict.nav.items[page]} navLabel={dict.common.breadcrumbLabel} />
      {access === 'review' ? (
        <p role="note" className="mb-8 max-w-3xl rounded-lg border border-hairline bg-sage-tint px-4 py-3 text-sm font-medium text-ink">
          {REVIEW_NOTICE[locale]}
        </p>
      ) : null}
      <article className="max-w-3xl">
        <Eyebrow>{dict[page].eyebrow}</Eyebrow>
        <h1 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">{doc.title}</h1>
        <div className="mt-12 flex flex-col">
          {doc.blocks.map((b, i) => {
            if (b.kind === 'h2') {
              return (
                <h2 key={i} className="mt-10 border-t border-hairline pt-8 font-display text-xl font-semibold first:mt-0">
                  {b.text}
                </h2>
              )
            }
            const content = b.parts.map((part, j) =>
              part.bold ? (
                <strong key={j} className="font-semibold text-ink">
                  {linkify(part.text)}
                </strong>
              ) : (
                <span key={j}>{linkify(part.text)}</span>
              ),
            )
            return b.kind === 'li' ? (
              <p key={i} className="mt-3 flex gap-3 text-pretty leading-relaxed text-slate">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-cobalt" />
                <span>{content}</span>
              </p>
            ) : (
              <p key={i} className="mt-4 text-pretty leading-relaxed text-slate">
                {content}
              </p>
            )
          })}
        </div>
      </article>
    </Container>
  )
}
