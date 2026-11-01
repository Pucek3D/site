'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { localeNames, locales, switchLocalePath, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type SwitcherProps = {
  current: Locale
  label: string
  layout?: 'inline' | 'stacked'
  dark?: boolean
}

/**
 * Reading the query string opts the subtree out of static rendering, so it sits behind a
 * Suspense boundary whose fallback is the same switcher without the query — identical markup,
 * just without the Contact inquiry category until the client reads it.
 */
export function LanguageSwitcher(props: SwitcherProps) {
  return (
    <Suspense fallback={<SwitcherList {...props} search={null} />}>
      <SwitcherWithQuery {...props} />
    </Suspense>
  )
}

function SwitcherWithQuery(props: SwitcherProps) {
  const search = useSearchParams()
  return <SwitcherList {...props} search={search} />
}

function SwitcherList({
  current,
  label,
  layout = 'inline',
  dark = false,
  search,
}: SwitcherProps & { search: URLSearchParams | null }) {
  const pathname = usePathname() ?? `/${current}`
  return (
    <nav aria-label={label}>
      <ul className={cn('flex', layout === 'inline' ? 'items-center gap-1' : 'flex-col gap-1')}>
        {locales.map((l) => {
          const active = l === current
          return (
            <li key={l}>
              <Link
                href={switchLocalePath(pathname, l, search)}
                hrefLang={l}
                lang={l}
                aria-current={active ? 'true' : undefined}
                aria-label={localeNames[l]}
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm font-semibold uppercase tracking-wide transition-colors',
                  layout === 'stacked' && 'w-full justify-start gap-3 normal-case tracking-normal',
                  dark
                    ? active
                      ? 'text-white'
                      : 'text-mist hover:text-white'
                    : active
                      ? 'text-ink'
                      : 'text-slate hover:text-ink',
                )}
              >
                {layout === 'stacked' ? (
                  <>
                    <span className="w-7 uppercase">{l}</span>
                    <span className="font-normal">{localeNames[l]}</span>
                  </>
                ) : (
                  <span className={cn(active && 'border-b-2 border-cobalt')}>{l}</span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
