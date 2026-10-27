import type { Metadata } from 'next'
import { Breadcrumbs, PageHero, Paragraphs } from '@/components/site/page-kit'
import { CtaLink, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'about')
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const c = getCopy(locale)
  const a = c.about
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.about} navLabel={d.common.breadcrumbLabel} />}
        title={a.hero.title}
        subtitle={a.hero.subtitle}
        paragraphs={a.hero.paragraphs}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Paragraphs items={a.paragraphs} className="text-lg" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            {[a.forBrands, a.forAgencies].map((t) => (
              <p key={t} className="border-l-2 border-sage pl-5 text-pretty text-lg leading-relaxed text-ink">
                {t}
              </p>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="ink">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="text-pretty text-lg leading-relaxed text-mist">{a.goal}</p>
          <p className="text-balance font-display text-3xl font-semibold leading-tight text-white md:text-4xl">{a.closing[0]}</p>
          <p className="text-lg text-white">{a.closing[1]}</p>
          <div className="mt-2">
            <CtaLink href={href(locale, 'contact')} variant="sage">
              {c.home.hero.primaryCta}
            </CtaLink>
          </div>
        </div>
      </Section>
    </>
  )
}
