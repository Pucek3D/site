import type { Metadata } from 'next'
import { CtaLink, Section, SectionHeading } from '@/components/site/primitives'
import {
  Breadcrumbs,
  CheckList,
  Faq,
  FinalCta,
  LearningModel,
  PageHero,
  ProgramCards,
} from '@/components/site/sections'
import { getDictionary } from '@/content'
import { href, type Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata((await params).locale, 'training')
}

export default async function TrainingPage({ params }: Props) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const t = dict.training
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs locale={locale} dict={dict} page="training" />}
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        support={t.hero.support}
        note={t.hero.trust}
        actions={
          <>
            <CtaLink href={href(locale, 'contact', '?topic=training')}>{t.hero.primary}</CtaLink>
            <CtaLink href="#programs" variant="secondary">
              {t.hero.secondary}
            </CtaLink>
          </>
        }
      />
      <ProgramCards dict={dict} id="programs" title={t.programsTitle} />
      <LearningModel title={t.learning.title} steps={t.learning.steps} label={dict.common.sequenceLabel} />
      <Section labelledBy="includes-title">
        <SectionHeading id="includes-title" title={t.includes.title} />
        <div className="mt-12">
          <CheckList items={t.includes.items} columns={2} />
        </div>
      </Section>
      <Faq title={dict.common.faqTitle} items={t.faq} tone="porcelain" />
      <FinalCta
        title={t.finalCta.title}
        body={t.finalCta.body}
        button={t.finalCta.button}
        to={href(locale, 'contact', '?topic=training')}
      />
    </>
  )
}
