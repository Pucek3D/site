import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, FinalCta, H2, Paragraphs } from '@/components/site/page-kit'
import { Container, CtaLink, Eyebrow, Section } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

/**
 * The SAME asset the homepage "What We Do → 01 Agency Partnerships" tile uses
 * (components/site/home.tsx), at the same focal point. 1536×1024, so the frame
 * is 3:2 — never the old portrait box, which cropped the handshake out.
 */
const AGENCY_PHOTO = { src: '/images/svc/white-label-handshake.webp', width: 1536, height: 1024, focus: '58% 45%' }

const contactAgency = (locale: Locale) => href(locale, 'contact', '?topic=agency')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'agencies')
}

export default async function AgencyPage({ params }: Props) {
  const { locale } = await params
  const d = getDictionary(locale)
  const a = getCopy(locale).agencies

  return (
    <>
      {/* Same composition as the Home hero: the photo bleeds to the right viewport edge and fades into
          the white ground on desktop; below lg it sits full-width under the text. */}
      <section className="relative flex flex-col-reverse overflow-hidden border-b border-hairline bg-white lg:block">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%]">
          <Image
            src={AGENCY_PHOTO.src}
            alt={a.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="adelier-hero-photo object-cover"
            style={{ objectPosition: AGENCY_PHOTO.focus }}
          />
        </div>
        <Container className="relative pb-14 pt-8 md:pb-20 md:pt-10">
          <Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.agencies} navLabel={d.common.breadcrumbLabel} />
          <div className="lg:flex lg:min-h-[520px] lg:items-center">
            <div className="flex min-w-0 flex-col gap-6 lg:w-[48%] lg:pr-3">
              <Eyebrow>{a.hero.eyebrow}</Eyebrow>
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] text-ink [hyphens:auto] min-[400px]:text-[2.25rem] sm:text-5xl xl:text-[3.5rem]">
                {a.hero.title}
              </h1>
              <p className="text-pretty text-xl font-medium leading-snug text-cobalt">{a.hero.emphasis}</p>
              <Paragraphs items={a.hero.paragraphs} className="text-lg" />
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                <CtaLink href={contactAgency(locale)} className="w-full sm:w-auto">
                  {a.hero.primaryCta}
                  <ArrowRight aria-hidden className="size-4" />
  </CtaLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="porcelain" labelledBy="ways-title" id="ways" className="scroll-mt-24 pb-14 pt-12 md:pb-16 md:pt-14">
        <div className="flex max-w-3xl flex-col gap-5">
          <Eyebrow accent="cobalt">{a.ways.eyebrow}</Eyebrow>
          <H2 id="ways-title">{a.ways.title}</H2>
        </div>
        {/* Array order is the reading order: 01 left / first, 02 right / second, at every width. */}
        <ol className="mt-12 grid gap-6 lg:grid-cols-2">
          {a.ways.models.map((m, i) => (
              <li key={m.name} className="group flex min-w-0 flex-col gap-5 rounded-xl border border-hairline bg-white p-7 md:p-9">
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl font-semibold tabular-nums text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden className="relative h-px flex-1 overflow-hidden bg-hairline">
                    <span className="absolute inset-0 origin-left scale-x-0 bg-cobalt transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  </span>
              </div>
              <h3 className="text-pretty font-display text-2xl font-semibold leading-snug text-ink [hyphens:auto]">{m.name}</h3>
              <p className="text-pretty text-lg font-medium leading-snug text-ink">{m.summary}</p>
              <Paragraphs items={m.paragraphs} />
            </li>
          ))}
        </ol>
      </Section>

      <FinalCta
        id="final"
        title={a.final.title}
        paragraphs={a.final.paragraphs}
        cta={a.final.cta}
        to={contactAgency(locale)}
        variant="primary"
      />
    </>
  )
}
