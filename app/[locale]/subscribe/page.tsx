import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Paragraphs } from '@/components/site/page-kit'
import { Container, Eyebrow } from '@/components/site/primitives'
import { SeoStructuredData } from '@/components/site/seo-structured-data'
import { SubscribeForm } from '@/components/site/subscribe-form'
import { getDictionary } from '@/content'
import { findLeadMagnet } from '@/content/lead-magnets'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import { subscribeEnabled } from '@/lib/subscribe-config'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ magnet?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'subscribe')
}

export default async function SubscribePage({ params, searchParams }: Props) {
  if (!subscribeEnabled()) notFound()
  const { locale } = await params
  const { magnet: magnetId } = await searchParams
  const dict = getDictionary(locale)
  const s = dict.subscribe
  // An unknown ?magnet= falls back to the ordinary updates sign-up.
  const magnet = findLeadMagnet(magnetId, locale)

  return (
    <>
      <SeoStructuredData locale={locale} page="subscribe" />
      <Container className="pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow accent="cobalt">{magnet ? s.magnetEyebrow : s.eyebrow}</Eyebrow>
            <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.08] sm:text-[3rem]">{magnet ? magnet.title : s.pageTitle}</h1>
            {magnet ? (
              <div className="flex flex-col gap-4 text-lg leading-relaxed text-slate">
                <p>{magnet.description}</p>
                <p>{s.magnetIntro}</p>
              </div>
            ) : (
              <Paragraphs items={s.intro} className="text-lg" />
            )}
          </div>
          <div className="rounded-2xl border border-hairline bg-porcelain p-6 sm:p-10">
            <SubscribeForm locale={locale} dict={dict} magnet={magnet ? { id: magnet.id, title: magnet.title } : null} />
          </div>
        </div>
      </Container>
    </>
  )
}
