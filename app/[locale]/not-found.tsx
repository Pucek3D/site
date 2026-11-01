import { getDictionary } from '@/content'
import { locales } from '@/lib/i18n'
import { NotFoundBody } from './not-found-body'

/**
 * Next.js passes no params to not-found, so the locale is read from the URL on the client.
 * All three locales' strings come from the dictionaries and are handed down, keeping the
 * copy in the translation files rather than in this component.
 */
export default function NotFound() {
  const copy = Object.fromEntries(locales.map((l) => [l, getDictionary(l).notFound])) as Record<
    (typeof locales)[number],
    ReturnType<typeof getDictionary>['notFound']
  >
  return <NotFoundBody copy={copy} />
}
