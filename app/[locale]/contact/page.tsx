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
  searchParams: Promise<{ topic?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'contact')
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { topic } = await searchParams
  const dict = getDictionary(locale)
  const final = getCopy(locale).home.final
  const initialTopic: Topic = (topics as readonly string[]).includes(topic ?? '') ? (topic as Topic) : 'general'

  return (
    <Container className="py-14 md:py-20">
      <Breadcrumbs locale={locale} homeLabel={dict.nav.items.home} label={dict.nav.items.contact} navLabel={dict.common.breadcrumbLabel} />
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow>{dict.contact.eyebrow}</Eyebrow>
          <h1 className="text-balance text-[2.5rem] font-semibold leading-[1.05] sm:text-5xl">{final.title}</h1>
          <Paragraphs items={final.paragraphs} className="text-lg" />
          <p className="mt-4 border-t border-hairline pt-5 text-[0.9375rem] text-slate">
            {dict.contact.emailLabel}{' '}
            <a href={`mailto:${siteConfig.email.value}`} className="font-semibold text-cobalt underline underline-offset-4">
              {siteConfig.email.value}
            </a>
          </p>
        </div>
        <div className="lg:col-span-7">
          <ContactForm locale={locale} dict={dict} initialTopic={initialTopic} />
        </div>
      </div>
    </Container>
  )
}
