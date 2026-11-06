import type { Metadata } from 'next'
import { Breadcrumbs, H2, PageHero, PointGrid } from '@/components/site/page-kit'
import { CtaLink, Eyebrow, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { SHOW_FOUNDER_EXPERIENCE } from '@/lib/config'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'about')
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const a = getCopy(locale).about
  // Tones alternate from what is actually rendered, so switching the experience
  // section off never leaves two sections of the same tone stacked together.
  const tone = (i: number) => (i % 2 === 0 ? 'white' : 'porcelain') as 'white' | 'porcelain'
  const offset = SHOW_FOUNDER_EXPERIENCE ? 1 : 0
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.about} navLabel={d.common.breadcrumbLabel} />}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        paragraphs={a.hero.paragraphs}
        compact
      />

      <Section tone={tone(0)} className="py-10 md:py-12">
        <p className="max-w-3xl text-pretty text-lg leading-relaxed text-ink">{a.who.body}</p>
      </Section>

      {SHOW_FOUNDER_EXPERIENCE ? (
        <Section tone={tone(1)} labelledBy="experience">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-5">
              <Eyebrow as="h2" id="experience" accent="cobalt">{a.experience.title}</Eyebrow>
              <p className="text-pretty text-lg leading-relaxed text-slate">{a.experience.sub}</p>
            </div>
            <div className="flex flex-col gap-5 lg:col-span-7">
              {[a.experience.p1, a.experience.p2].map((p) => (
                <p key={p} className="text-pretty text-lg leading-relaxed text-ink">
                  {p}
                </p>
              ))}
              <p className="text-pretty leading-relaxed text-slate">{a.experience.p3}</p>
              <p className="mt-2 border-l-2 border-sage pl-5 text-pretty font-serif text-2xl italic leading-snug text-ink">
                {a.experience.closing.split(/(?<=\.)\s+/).map((s) => (
                  <span key={s} className="block">
                    {s}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Section>
      ) : null}

      <Section tone={tone(1 + offset)} labelledBy="process">
        <Eyebrow as="h2" id="process" accent="cobalt">{a.process.title}</Eyebrow>
        <div className="mt-8">
          <PointGrid items={a.process.steps} numbered columns={3} />
        </div>
      </Section>

      <Section tone={tone(2 + offset)} labelledBy="evidence">
        <Eyebrow as="h2" id="evidence" accent="cobalt">{a.evidence.title}</Eyebrow>
        <table className="mt-8 block w-full border-collapse overflow-hidden rounded-xl border border-hairline md:table">
          <thead className="hidden md:table-header-group">
            <tr className="bg-ink text-left text-white">
              <th scope="col" className="w-2/5 px-6 py-4 font-display font-semibold">
                {a.evidence.head[0]}
              </th>
              <th scope="col" className="px-6 py-4 font-display font-semibold">
                {a.evidence.head[1]}
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {a.evidence.rows.map((r) => (
              <tr key={r.claim} className="block border-t border-hairline bg-white first:border-t-0 md:table-row md:first:border-t">
                <th scope="row" className="block px-6 pt-5 text-left align-top font-display text-lg font-semibold text-ink md:table-cell md:py-5">
                  {r.claim}
                </th>
                <td className="block px-6 pt-1 pb-5 align-top text-pretty leading-relaxed text-slate md:table-cell md:py-5">
                  <span className="sr-only md:hidden">{a.evidence.head[1]}: </span>
                  {r.evidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section tone={tone(3 + offset)}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div aria-labelledby="dont" role="region">
            <Eyebrow as="h2" id="dont" accent="cobalt">{a.dont.title}</Eyebrow>
            <ul className="mt-6 flex list-disc flex-col gap-3 pl-5 text-lg leading-relaxed text-ink marker:text-sage">
              {a.dont.items.map((it) => (
                <li key={it} className="pl-1">
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div aria-labelledby="operating" role="region">
            <Eyebrow as="h2" id="operating" accent="cobalt">{a.operating.title}</Eyebrow>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink">{a.operating.body}</p>
          </div>
        </div>
      </Section>

      <Section tone="ink" labelledBy="about-cta">
        <div className="flex max-w-3xl flex-col gap-8">
          <H2 id="about-cta" dark>
            {a.cta.title}
          </H2>
          <div>
            <CtaLink href={href(locale, 'contact')} variant="primary">
              {a.cta.button}
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  )
}
