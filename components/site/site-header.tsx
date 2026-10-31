'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Dictionary } from '@/content'
import type { PartnerCopy } from '@/content/partner'
import { href, mainNavKeys, pageFromPath, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'
import { ctaClass } from './primitives'

/** Flat navigation, no Services menu: Home, For Agencies, For Brands, Training, About, Contact. */
export function SiteHeader({ locale, nav, copy }: { locale: Locale; nav: Dictionary['nav']; copy: PartnerCopy }) {
  const pathname = usePathname() ?? `/${locale}`
  const page = pageFromPath(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  // Contact is already in the nav, so the button is the call to action, not a duplicate route.
  const cta = page === 'contact' ? null : { label: copy.home.hero.primaryCta, to: href(locale, 'contact') }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-colors',
        scrolled ? 'border-hairline' : 'border-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        {nav.skip}
      </a>
      <div className="mx-auto flex h-[82px] w-full max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href={href(locale, 'home')} aria-label={nav.homeLink} className="shrink-0 rounded-md">
          <Logo variant="horizontal" height={60} alt="" priority />
        </Link>

        {/* xl, not lg: at 1024px the PL and DE labels push the header past the viewport. */}
        <nav aria-label={nav.primaryLabel} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNavKeys.map((k) => (
              <li key={k}>
                <Link
                  href={href(locale, k)}
                  aria-current={page === k ? 'page' : undefined}
                  className={cn(
                    'inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-3 text-[0.9375rem] transition-colors',
                    page === k ? 'font-semibold text-ink' : 'text-slate hover:text-ink',
                  )}
                >
                  <span className={cn(page === k && 'border-b-2 border-cobalt pb-0.5')}>{nav.items[k]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <LanguageSwitcher current={locale} label={nav.language} />
          </div>
          {cta ? (
            <Link href={cta.to} className={cn(ctaClass('primary'), 'hidden min-h-11 whitespace-nowrap px-5 text-sm sm:inline-flex')}>
              {cta.label}
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-porcelain xl:hidden"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </div>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label={nav.menu}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false)
        }}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-white p-0 text-ink backdrop:bg-ink/40"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[82px] items-center justify-between border-b border-hairline px-5 sm:px-8">
            <Logo variant="horizontal" height={42} alt="ADelier Commerce" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={nav.closeMenu}
              className="inline-flex size-11 items-center justify-center rounded-md hover:bg-porcelain"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <nav aria-label={nav.primaryLabel} className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
            {mainNavKeys.map((k) => (
              <Link
                key={k}
                href={href(locale, k)}
                aria-current={page === k ? 'page' : undefined}
                className={cn('flex min-h-12 items-center border-b border-hairline font-display text-xl', page === k && 'font-semibold text-cobalt')}
              >
                {nav.items[k]}
              </Link>
            ))}
            <div className="mt-8">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-slate">{nav.language}</p>
              <LanguageSwitcher current={locale} label={nav.language} layout="stacked" />
            </div>
          </nav>
          {cta ? (
            <div className="border-t border-hairline p-5 sm:px-8">
              <Link href={cta.to} onClick={() => setOpen(false)} className={cn(ctaClass('primary'), 'w-full')}>
                {cta.label}
              </Link>
            </div>
          ) : null}
        </div>
      </dialog>
    </header>
  )
}
