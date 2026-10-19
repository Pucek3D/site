import Link from 'next/link'
import type { Dictionary } from '@/content'
import { href, mainNavKeys, type Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { LanguageSwitcher } from './language-switcher'
import { Logo } from './logo'
import { Container } from './primitives'

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer, nav } = dict
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-5">
            <Logo variant="horizontal" reverse height={48} alt="ADelier Commerce" />
            <p className="max-w-sm leading-relaxed text-mist">{footer.description}</p>
            <p className="font-serif text-lg italic text-white">{siteConfig.tagline}</p>
          </div>

          <div className="md:col-span-3">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-mist">{footer.explore}</h2>
            <ul className="flex flex-col">
              {mainNavKeys.map((k) => (
                <li key={k}>
                  <Link href={href(locale, k)} className="inline-flex min-h-10 items-center text-white/90 hover:text-white hover:underline">
                    {nav.items[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8 md:col-span-4">
            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-mist">{footer.contact}</h2>
              <ul className="flex flex-col gap-1">
                <li>
                  <a href={`mailto:${siteConfig.email.value}`} className="inline-flex min-h-10 items-center hover:underline">
                    {siteConfig.email.value}
                  </a>
                  {siteConfig.email.placeholder ? (
                    <span className="ml-2 text-xs text-mist">({footer.placeholder})</span>
                  ) : null}
                </li>
                <li>
                  <a
                    href={siteConfig.linkedin.value}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="inline-flex min-h-10 items-center hover:underline"
                  >
                    {footer.linkedin}
                  </a>
                  {siteConfig.linkedin.placeholder ? (
                    <span className="ml-2 text-xs text-mist">({footer.placeholder})</span>
                  ) : null}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-mist">{footer.languages}</h2>
              <LanguageSwitcher current={locale} label={footer.languages} dark />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 text-sm text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <Link href={href(locale, 'privacy')} className="inline-flex min-h-10 items-center hover:text-white hover:underline">
                {nav.items.privacy}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'legal')} className="inline-flex min-h-10 items-center hover:text-white hover:underline">
                {nav.items.legal}
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-mist">{footer.disclaimer}</p>
      </Container>
    </footer>
  )
}
