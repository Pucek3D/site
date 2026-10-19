import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { DemoLabel, Section, SectionHeading } from '@/components/site/primitives'
import { Breadcrumbs, CardGrid, FinalCta, PageHero, Sequence } from '@/components/site/sections'
import { getDictionary } from '@/content'
import { caseStudies } from '@/content/case-studies'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'results')
}

export default async function ResultsPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const r = dict.results
  const d = r.demos
  const studies = caseStudies.filter((c) => c.clientApproval && c.locales[locale])
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs locale={locale} dict={dict} page="results" />}
        eyebrow={r.hero.eyebrow}
        title={r.hero.title}
        support={r.hero.support}
      />

      <Section labelledBy="proof-kinds">
        <SectionHeading id="proof-kinds" title={r.proof.title} />
        <div className="mt-12">
          <CardGrid items={r.proof.items} columns={3} />
        </div>
      </Section>

      <Section tone="porcelain" labelledBy="structure-title">
        <SectionHeading id="structure-title" title={r.structure.title} intro={r.structure.intro} />
        <div className="mt-12">
          <Sequence steps={r.structure.steps} label={dict.common.sequenceLabel} />
        </div>
      </Section>

      <Section labelledBy="demos-title">
        <SectionHeading id="demos-title" title={d.title} intro={d.intro} />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="flex flex-col gap-6 rounded-xl border border-hairline p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{d.hierarchy.title}</h3>
              <DemoLabel>{dict.common.demoNotClient}</DemoLabel>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-semibold text-slate">{d.hierarchy.weakLabel}</p>
                <ol className="flex flex-col gap-2">
                  {d.hierarchy.weak.map((w, i) => (
                    <li key={w} className="flex gap-3 rounded-md bg-porcelain px-3 py-2 text-[0.9375rem] text-slate">
                      <span className="tabular-nums">{i + 1}</span>
                      {w}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold text-ink">{d.hierarchy.improvedLabel}</p>
                <ol className="flex flex-col gap-2">
                  {d.hierarchy.improved.map((w, i) => (
                    <li key={w} className="flex gap-3 rounded-md bg-cobalt-tint px-3 py-2 text-[0.9375rem] text-ink">
                      <span className="tabular-nums text-cobalt">{i + 1}</span>
                      {w}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-slate">{d.hierarchy.note}</p>
          </article>

          <article className="flex flex-col gap-6 rounded-xl border border-hairline p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{d.sequence.title}</h3>
              <DemoLabel>{dict.common.demoNotClient}</DemoLabel>
            </div>
            <table className="w-full text-left text-[0.9375rem]">
              <thead>
                <tr className="border-b border-ink">
                  {d.sequence.columns.map((c) => (
                    <th key={c} scope="col" className="pb-3 pr-3 font-semibold text-ink">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.sequence.rows.map((row) => (
                  <tr key={row.before} className="border-b border-hairline align-top">
                    <td className="py-3 pr-3 text-slate">{row.before}</td>
                    <td className="py-3 pr-3 text-slate">{row.reason}</td>
                    <td className="py-3 font-medium text-ink">
                      <span className="flex gap-2">
                        <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-cobalt" />
                        {row.after}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </Section>

      <Section tone="porcelain" labelledBy="grid-title">
        <SectionHeading id="grid-title" title={r.grid.title} />
        {studies.length === 0 ? (
          <div className="mt-10 max-w-2xl rounded-xl border border-dashed border-input bg-white p-8">
            <p className="font-display text-xl font-semibold text-ink">{r.grid.emptyTitle}</p>
            <p className="mt-3 leading-relaxed text-slate">{r.grid.emptyBody}</p>
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {studies.map((s) => {
              const c = s.locales[locale]!
              return (
                <li key={s.slug} className="rounded-xl border border-hairline bg-white p-7">
                  <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-slate">{c.result}</p>
                  <p className="mt-2 text-sm text-slate">{c.limits}</p>
                </li>
              )
            })}
          </ul>
        )}
      </Section>

      <FinalCta
        title={r.finalCta.title}
        body={r.finalCta.body}
        button={r.finalCta.button}
        to={href(locale, 'contact')}
      />
    </>
  )
}
