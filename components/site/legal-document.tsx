import type { Dictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { loadLegalDoc } from '@/lib/legal-docs'
import { siteConfig } from '@/lib/site-config'
import { Container, Eyebrow } from './primitives'
import { Breadcrumbs } from './page-kit'

/**
 * Renders an owner-supplied legal draft as the public page will look: no
 * review banners or placeholder chips. Review notes live outside the site
 * (content/legal/REVIEW.md); the address is withheld on any deployed build
 * until publication is explicitly approved.
 */
export function LegalDocument({
  locale,
  dict,
  page,
}: {
  locale: Locale
  dict: Dictionary
  page: 'privacy' | 'legal'
}) {
  const doc = loadLegalDoc(locale, page, {
    showAddress: siteConfig.legal.showAddress,
    withheld: dict.legal.addressWithheld,
  })
  return (
    <Container className="py-14 md:py-20">
      <Breadcrumbs locale={locale} homeLabel={dict.nav.items.home} label={dict.nav.items[page]} navLabel={dict.common.breadcrumbLabel} />
      <article className="max-w-3xl">
        <Eyebrow>{dict[page].eyebrow}</Eyebrow>
        <h1 className="mt-5 text-balance text-4xl font-semibold md:text-5xl">{doc.title}</h1>
        <div className="mt-12 flex flex-col">
          {doc.blocks.map((b, i) =>
            b.kind === 'h2' ? (
              <h2 key={i} className="mt-10 border-t border-hairline pt-8 font-display text-xl font-semibold first:mt-0">
                {b.text}
              </h2>
            ) : (
              <p key={i} className="mt-4 text-pretty leading-relaxed text-slate">
                {b.parts.map((part, j) =>
                  part.bold ? (
                    <strong key={j} className="font-semibold text-ink">
                      {part.text}
                    </strong>
                  ) : (
                    part.text
                  ),
                )}
              </p>
            ),
          )}
        </div>
      </article>
    </Container>
  )
}
