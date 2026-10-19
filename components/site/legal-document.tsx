import { TriangleAlert } from 'lucide-react'
import type { Dictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { Container, Eyebrow, OwnerPlaceholder } from './primitives'
import { Breadcrumbs } from './sections'

type FieldKey = keyof Dictionary['legal']['fieldLabels']

/** Every owner-supplied fact renders as a visible placeholder — none is invented. */
function fieldValue(key: FieldKey): string {
  const legal = siteConfig.legal as Record<string, { value: string }>
  if (key === 'email') return siteConfig.email.value
  if (key === 'privacyContact') return legal.dataController.value
  return legal[key]?.value ?? `[${key}]`
}

export function LegalDocument({
  locale,
  dict,
  page,
}: {
  locale: Locale
  dict: Dictionary
  page: 'privacy' | 'legal'
}) {
  const doc = dict[page]
  const labels = dict.legal.fieldLabels
  return (
    <Container className="py-14 md:py-20">
      <Breadcrumbs locale={locale} dict={dict} page={page} />
      <div className="max-w-3xl">
        <Eyebrow>{doc.eyebrow}</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold md:text-5xl">{doc.title}</h1>
        <p role="note" className="mt-8 flex gap-3 rounded-xl border border-dashed border-input bg-porcelain p-5 text-ink">
          <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-ink" />
          {doc.notice}
        </p>
        <div className="mt-12 flex flex-col">
          {doc.sections.map((s) => (
            <section key={s.heading} className="border-t border-hairline py-8">
              <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate">{s.body}</p>
              {s.fields.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {(s.fields as FieldKey[]).map((f) => (
                    <li key={f}>
                      <OwnerPlaceholder label={labels[f]} value={fieldValue(f)} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </Container>
  )
}
