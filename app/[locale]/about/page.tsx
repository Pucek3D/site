import { CircleUserRound } from 'lucide-react'
import type { Metadata } from 'next'
import { Logo } from '@/components/site/logo'
import { FocusFrame, Section, SectionHeading } from '@/components/site/primitives'
import { Breadcrumbs, CardGrid, FinalCta, OperatingModel, PageHero } from '@/components/site/sections'
import { getDictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'about')
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const a = dict.about
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs locale={locale} dict={dict} page="about" />}
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        support={a.hero.support}
        aside={
          <div className="flex justify-center lg:justify-end">
            <Logo variant="stacked" height={220} alt="ADelier Commerce" />
          </div>
        }
      />

      <Section tone="porcelain" labelledBy="outcome-title">
        <FocusFrame inset="lg" className="mx-auto max-w-3xl px-4 py-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate">{a.outcomeLabel}</p>
          <h2 id="outcome-title" className="mt-4 font-serif text-3xl font-normal leading-snug md:text-4xl">
            {a.outcome}
          </h2>
        </FocusFrame>
      </Section>

      <Section labelledBy="beliefs-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="beliefs-title" title={a.beliefs.title} />
          </div>
          <ul className="flex flex-col lg:col-span-8">
            {a.beliefs.items.map((b) => (
              <li key={b} className="border-b border-hairline py-5 font-display text-xl font-medium leading-snug text-ink first:border-t">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="porcelain" labelledBy="serve-title">
        <SectionHeading id="serve-title" title={a.serve.title} />
        <div className="mt-12">
          <CardGrid items={a.serve.items} columns={3} />
        </div>
      </Section>

      <OperatingModel dict={dict} body={a.operatingBody} />

      <Section labelledBy="accountability-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="accountability-title" title={a.accountability.title} />
          </div>
          <p className="text-lg leading-relaxed text-slate lg:col-span-7">{a.accountability.body}</p>
        </div>
      </Section>

      <Section tone="porcelain" labelledBy="traits-title">
        <SectionHeading id="traits-title" title={a.traits.title} />
        <div className="mt-12">
          <CardGrid items={a.traits.items} columns={3} />
        </div>
      </Section>

      <Section labelledBy="team-title">
        <SectionHeading id="team-title" title={a.team.title} intro={a.team.body} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {a.team.slots.map((slot) => (
            <li key={slot.role} className="flex gap-5 rounded-xl border border-dashed border-input p-6">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-porcelain">
                <CircleUserRound aria-hidden className="size-8 text-mist" />
              </div>
              <div>
                <p className="font-display font-semibold text-ink">{slot.role}</p>
                <p className="mt-1 text-sm text-slate">{dict.common.toComplete}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {slot.fields.map((f) => (
                    <li key={f} className="rounded-full bg-porcelain px-3 py-1 text-xs text-slate">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-14 max-w-3xl border-t border-hairline pt-10">
          <h3 className="font-display text-xl font-semibold">{a.future.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-slate">{a.future.body}</p>
        </div>
      </Section>

      <FinalCta title={a.finalCta.title} body={a.finalCta.body} button={a.finalCta.button} to={href(locale, 'contact')} />
    </>
  )
}
