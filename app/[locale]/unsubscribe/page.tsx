import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Eyebrow } from '@/components/site/primitives'
import { UnsubscribeForm } from '@/components/site/unsubscribe-form'
import { getDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import { subscribeEnabled } from '@/lib/subscribe-config'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dict = getDictionary((await params).locale)
  return {
    title: dict.subscribe.unsubscribe.title,
    robots: { index: false, follow: false },
    referrer: 'no-referrer',
  }
}

export default async function UnsubscribePage({ params }: Props) {
  if (!subscribeEnabled()) notFound()
  const { locale } = await params
  const dict = getDictionary(locale)
  const u = dict.subscribe.unsubscribe

  return (
    <Container className="pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Eyebrow accent="cobalt">{u.eyebrow}</Eyebrow>
        <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.08] sm:text-[2.75rem]">{u.title}</h1>
        <p className="text-lg leading-relaxed text-slate">{u.intro}</p>
        <div className="rounded-2xl border border-hairline bg-porcelain p-6 sm:p-10">
          <UnsubscribeForm locale={locale} dict={dict} />
        </div>
      </div>
    </Container>
  )
}
