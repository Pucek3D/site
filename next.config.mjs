/** @type {import('next').NextConfig} */
// Mirrors lib/seo-runtime.ts (next.config cannot import TS).
const noIndex = process.env.SEO_NOINDEX === 'true' || process.env.VERCEL_ENV === 'preview'

const nextConfig = {
  // Lets a verification build run without overwriting the dev server's .next output.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true,
  },
  // Retired routes (see legacyRedirects in lib/i18n.ts). Kept here as literals: next.config cannot import TS.
  async redirects() {
    const retired = ['amazon-ppc-management', 'amazon-market-validation-audits', 'services']
    return retired.flatMap((slug) => [
      { source: `/:locale(en|pl|de)/${slug}`, destination: '/:locale/brands', permanent: true },
      { source: `/${slug}`, destination: '/en/brands', permanent: true },
    ])
  },
  async headers() {
    return [
      ...(noIndex ? [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] }] : []),
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy-Report-Only',
            value:
              "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self'",
          },
        ],
      },
    ]
  },
}

export default nextConfig
