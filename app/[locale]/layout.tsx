import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope, Source_Serif_4 } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { getDictionary } from '@/content'
import { getCopy } from '@/content/partner'
import { isLocale, locales } from '@/lib/i18n'
import { organizationJsonLd } from '@/lib/seo'
import { siteConfig } from '@/lib/site-config'
import '../globals.css'

// latin-ext is required: Polish (ą ę ł ś ź ż) and German umlauts must not fall back.
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' })
const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-manrope', display: 'swap' })
const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-serif',
  style: ['normal', 'italic'],
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamicParams = false

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: 'any' }],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const copy = getCopy(locale)

  return (
    <html lang={locale} className={`${inter.variable} ${manrope.variable} ${sourceSerif.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- static, server-built JSON
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <SiteHeader locale={locale} nav={dict.nav} copy={copy} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} copy={copy} />
        <Analytics />
      </body>
    </html>
  )
}
