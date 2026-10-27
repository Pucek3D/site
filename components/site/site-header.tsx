'use client'

import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Dictionary } from '@/content'
import type { PartnerCopy } from '@/content/partner'
import { brandServiceKeys, href, pageFromPath, serviceKeys, type Locale, type PageKey } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'
import { ctaClass } from './primitives'

type ServicePage = (typeof serviceKeys)[number]

export function SiteHeader({ locale, nav, copy }: { locale: Locale; nav: Dictionary['nav']; copy: PartnerCopy }) {
  const pathname = usePathname() ?? `/${locale}`
  const page = pageFromPath(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const servicesRef = useRef<HTMLLIElement>(null)

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

  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!servicesOpen) return
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [servicesOpen])

  const serviceName = (k: ServicePage) => copy.pageNames[k]
  const groups = [
    { title: copy.audiences.brands.title, summary: copy.audiences.brands.summary, keys: brandServiceKeys as readonly ServicePage[] },
    { title: copy.audiences.agencies.title, summary: copy.audiences.agencies.summary, keys: ['agencies'] as readonly ServicePage[] },
  ]
  const inServices = (serviceKeys as readonly PageKey[]).includes(page)
  const plain: PageKey[] = ['about', 'contact']
  const cta = page === 'contact' ? null : { label: copy.home.hero.primaryCta, to: href(locale, 'contact') }

  const linkClass = (active: boolean) =>
    cn(
      'inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-md px-3 text-[0.9375rem] transition-colors',
      active ? 'font-semibold text-ink' : 'text-slate hover:text-ink',
    )

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

        <nav aria-label={nav.primaryLabel} className="hidden lg:block">
          <ul className="flex items-center gap-2">
            <li>
              <Link href={href(locale, 'home')} aria-current={page === 'home' ? 'page' : undefined} className={linkClass(page === 'home')}>
                <span className={cn(page === 'home' && 'border-b-2 border-cobalt pb-0.5')}>{nav.items.home}</span>
              </Link>
            </li>
            <li ref={servicesRef} className="relative">
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                className={linkClass(inServices)}
              >
                <span className={cn(inServices && 'border-b-2 border-cobalt pb-0.5')}>{nav.items.services}</span>
                <ChevronDown aria-hidden className={cn('size-4 transition-transform', servicesOpen && 'rotate-180')} />
              </button>
              {servicesOpen ? (
                <div
                  id="services-menu"
                  className="absolute left-1/2 top-full z-50 mt-2 grid w-[640px] -translate-x-1/2 grid-cols-2 gap-8 rounded-xl border border-hairline bg-white p-7 shadow-[0_18px_40px_-20px_rgba(16,24,40,0.35)]"
                >
                  {groups.map((g) => (
                    <div key={g.title} className="flex flex-col gap-3">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate">{g.title}</p>
                      <ul className="flex flex-col">
                        {g.keys.map((k) => (
                          <li key={k}>
                            <Link
                              href={href(locale, k)}
                              aria-current={page === k ? 'page' : undefined}
                              className={cn(
                                'flex min-h-11 items-center rounded-md py-1 font-display text-[1.0625rem] leading-snug hover:text-cobalt',
                                page === k ? 'font-semibold text-cobalt' : 'text-ink',
                              )}
                            >
                              {serviceName(k)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <p className="text-pretty text-sm leading-relaxed text-slate">{g.summary}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </li>
            {plain.map((k) => (
              <li key={k}>
                <Link href={href(locale, k)} aria-current={page === k ? 'page' : undefined} className={linkClass(page === k)}>
                  <span className={cn(page === k && 'border-b-2 border-cobalt pb-0.5')}>{nav.items[k as 'about' | 'contact']}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
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
            className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-porcelain lg:hidden"
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
            <Link
              href={href(locale, 'home')}
              aria-current={page === 'home' ? 'page' : undefined}
              className={cn('flex min-h-12 items-center border-b border-hairline font-display text-xl', page === 'home' && 'font-semibold')}
            >
              {nav.items.home}
            </Link>
            {groups.map((g) => (
              <div key={g.title} className="border-b border-hairline py-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-slate">{g.title}</p>
                <ul>
                  {g.keys.map((k) => (
                    <li key={k}>
                      <Link
                        href={href(locale, k)}
                        aria-current={page === k ? 'page' : undefined}
                        className={cn('flex min-h-11 items-center font-display text-lg', page === k ? 'font-semibold text-cobalt' : 'text-ink')}
                      >
                        {serviceName(k)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {plain.map((k) => (
              <Link
                key={k}
                href={href(locale, k)}
                aria-current={page === k ? 'page' : undefined}
                className={cn('flex min-h-12 items-center border-b border-hairline font-display text-xl', page === k && 'font-semibold')}
              >
                {nav.items[k as 'about' | 'contact']}
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
