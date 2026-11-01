'use client'

import { usePathname } from 'next/navigation'
import { Container, CtaLink, Eyebrow } from '@/components/site/primitives'
import type { Dictionary } from '@/content'
import { defaultLocale, href, isLocale, type Locale } from '@/lib/i18n'

export function NotFoundBody({ copy }: { copy: Record<Locale, Dictionary['notFound']> }) {
  const segment = usePathname()?.split('/')[1]
  const locale = isLocale(segment) ? segment : defaultLocale
  const t = copy[locale]
  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-2xl">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold md:text-5xl">{t.heading}</h1>
        <p className="mt-5 text-lg text-slate">{t.description}</p>
        <div className="mt-8">
          <CtaLink href={href(locale, 'home')}>{t.cta}</CtaLink>
        </div>
      </div>
    </Container>
  )
}
