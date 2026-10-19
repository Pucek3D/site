import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/contact-form'
import { Container, Eyebrow } from '@/components/site/primitives'
import { Breadcrumbs } from '@/components/site/sections'
import { getDictionary } from '@/content'
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
  const c = dict.contact
  const initialTopic: Topic = (topics as readonly string[]).includes(topic ?? '') ? (topic as Topic) : 'general'

  return (
    <Container className="py-14 md:py-20">
      <Breadcrumbs locale={locale} dict={dict} page="contact" />
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow>{c.hero.eyebrow}</Eyebrow>
          <h1 className="text-[2.5rem] font-semibold leading-[1.05] sm:text-5xl">{c.hero.title}</h1>
          <p className="text-lg leading-relaxed text-slate">{c.hero.support}</p>
          <div className="mt-6 rounded-xl bg-porcelain p-7">
            <h2 className="font-display text-lg font-semibold">{c.aside.title}</h2>
            <ol className="mt-5 flex flex-col gap-4">
              {c.aside.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="text-sm font-semibold tabular-nums text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                  <span className="leading-relaxed text-ink">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-hairline pt-5 text-[0.9375rem] text-slate">
              {c.aside.emailLabel}{' '}
              <a href={`mailto:${siteConfig.email.value}`} className="font-semibold text-cobalt underline underline-offset-4">
                {siteConfig.email.value}
              </a>
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm locale={locale} dict={dict} initialTopic={initialTopic} />
        </div>
      </div>
    </Container>
  )
}
