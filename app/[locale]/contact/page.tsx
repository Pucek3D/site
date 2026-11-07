import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/contact-form'
import { Breadcrumbs, Paragraphs } from '@/components/site/page-kit'
import { Container, Eyebrow } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site-config'
import { topics, type Topic } from '@/lib/validation'

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ topic?: string; inquiry?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'contact')
}

/** `?topic=` is what the site's CTAs send; `?inquiry=` is accepted as an alias. Anything else falls back to General. */
function resolveTopic(value: string | undefined): Topic {
  return (topics as readonly string[]).includes(value ?? '') ? (value as Topic) : 'general'
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { topic, inquiry } = await searchParams
  const dict = getDictionary(locale)
  const title = dict.contact.pageTitle
  const initialTopic = resolveTopic(topic ?? inquiry)

  return (
    <Container className="py-14 md:py-20">
      <Breadcrumbs locale={locale} homeLabel={dict.nav.items.home} label={dict.nav.items.contact} navLabel={dict.common.breadcrumbLabel} />
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow accent="cobalt">{dict.contact.eyebrow}</Eyebrow>
          <h1 className="text-balance text-[2.25rem] font-semibold leading-[1.08] sm:text-[2.75rem]">{title}</h1>
          <Paragraphs items={dict.contact.intro} className="text-lg" />
          <p className="mt-2 border-t border-hairline pt-5 text-[0.9375rem] text-slate">
            {dict.contact.emailLabel}{' '}
            {siteConfig.email.placeholder ? (
              // No verified address yet: show the gap instead of a mailto to a fake inbox.
              <span className="font-medium text-ink">{dict.contact.emailPending}</span>
            ) : (
              <a href={`mailto:${siteConfig.email.value}`} className="font-semibold text-cobalt underline underline-offset-4">
                {siteConfig.email.value}
              </a>
            )}
          </p>
        </div>
        <div className="lg:col-span-7">
          <ContactForm locale={locale} dict={dict} initialTopic={initialTopic} />
        </div>
      </div>
    </Container>
  )
}
