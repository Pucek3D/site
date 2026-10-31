/** @type {import('next').NextConfig} */
const nextConfig = {
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
              "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com",
          },
        ],
      },
    ]
  },
}

export default nextConfig
