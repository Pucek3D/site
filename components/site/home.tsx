import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PartnerCopy } from '@/content/partner'
import { href, type Locale, type PageKey } from '@/lib/i18n'
import { CheckList, FinalCta, H2, PageHero, Paragraphs, PointGrid, SplitSection } from './page-kit'
import { CtaLink, Section } from './primitives'

/** Where each "What we do" service is described in full. 02 and 03 are both covered by Agency Partnerships. */
const serviceTarget: PageKey[] = ['ppc', 'agencies', 'agencies', 'training', 'audits']

export function HomePage({ locale, copy }: { locale: Locale; copy: PartnerCopy }) {
  const h = copy.home
  return (
    <>
      <PageHero
        eyebrow={h.hero.eyebrow}
        title={h.hero.title}
        paragraphs={h.hero.paragraphs}
        closingLine={h.hero.closingLine}
        image={{ src: '/images/specialist.webp', alt: '' }}
        actions={
          <>
            <CtaLink href={href(locale, 'contact')}>{h.hero.primaryCta}</CtaLink>
            <CtaLink href="#what-we-do" variant="secondary">
              {h.hero.secondaryCta}
            </CtaLink>
          </>
        }
      />

      <SplitSection id="autopilot" tone="porcelain" title={h.autopilot.title} paragraphs={h.autopilot.paragraphs} closingLine={h.autopilot.closingLine} />

      <section id="what-we-do" aria-labelledby="what-we-do-title" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <H2 id="what-we-do-title">{h.whatWeDo.title}</H2>
          <ol className="mt-12 flex flex-col">
            {h.whatWeDo.items.map((s, i) => (
              <li key={s.number} className="grid gap-6 border-t border-hairline py-10 lg:grid-cols-12">
                <div className="flex flex-col gap-3 lg:col-span-5">
                  <span className="text-sm font-semibold tabular-nums text-cobalt">{s.number}</span>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-ink">
                    <Link href={href(locale, serviceTarget[i])} className="group inline-flex items-start gap-2 hover:text-cobalt">
                      {s.name}
                      <ArrowRight aria-hidden className="mt-2 size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </h3>
                  <p className="text-pretty text-lg font-medium text-slate">{s.tagline}</p>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-7">
                  <Paragraphs items={s.paragraphs} />
                  {s.bullets ? <CheckList items={s.bullets} /> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section tone="porcelain" labelledBy="approach">
        <div className="flex max-w-3xl flex-col gap-4">
          <H2 id="approach">{h.approach.title}</H2>
          <p className="text-pretty text-xl font-medium text-cobalt">{h.approach.subtitle}</p>
          <p className="text-pretty text-lg leading-relaxed text-slate">{h.approach.intro}</p>
        </div>
        <div className="mt-12">
          <PointGrid items={h.approach.items} />
        </div>
      </Section>

      <Section labelledBy="audiences">
        <H2 id="audiences">{h.audiences.title}</H2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { ...h.audiences.brands, to: href(locale, 'ppc') },
            { ...h.audiences.agencies, to: href(locale, 'agencies') },
          ].map((a) => (
            <article key={a.title} className="flex flex-col gap-5 rounded-xl border border-hairline p-8">
              <h3 className="font-display text-2xl font-semibold text-ink">{a.title}</h3>
              <Paragraphs items={a.paragraphs} />
              <div className="mt-auto pt-2">
                <CtaLink href={a.to} variant="text">
                  {a.cta}
                  <ArrowRight aria-hidden className="size-4" />
                </CtaLink>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <FinalCta id="final" title={h.final.title} paragraphs={h.final.paragraphs} cta={h.final.cta} to={href(locale, 'contact')} />
    </>
  )
}
