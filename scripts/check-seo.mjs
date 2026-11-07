#!/usr/bin/env node
/** SEO release guard: runs on Node built-ins, with no network calls or site mutations. */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
const root = resolve(import.meta.dirname, '..')
const errors = []
const warnings = []
const exists = (path) => existsSync(resolve(root, path))
const read = (path) => readFileSync(resolve(root, path), 'utf8')
const strict = process.env.SEO_STRICT_PRODUCTION === 'true'

const required = [
  'lib/seo.ts', 'lib/seo-jsonld.ts', 'lib/seo-runtime.ts',
  'components/site/seo-structured-data.tsx', 'app/sitemap.ts', 'app/robots.ts',
]
for (const path of required) if (!exists(path)) errors.push(`Missing: ${path}`)
const routes = {
  home: 'app/[locale]/page.tsx',
  agencies: 'app/[locale]/agency-partnerships/page.tsx',
  brands: 'app/[locale]/brands/page.tsx',
  training: 'app/[locale]/amazon-ppc-training/page.tsx',
  about: 'app/[locale]/about/page.tsx',
  contact: 'app/[locale]/contact/page.tsx',
}
for (const [page, file] of Object.entries(routes)) {
  if (!exists(file)) { errors.push(`Missing public route: ${file}`); continue }
  const body = read(file)
  if (!body.includes(`page="${page}"`) || !body.includes('SeoStructuredData'))
    errors.push(`Missing page-specific JSON-LD in: ${file}`)
  if (!body.includes(`'${page}'`)) errors.push(`Missing page metadata function reference: ${file}`)
}
if (exists('lib/seo.ts')) {
  const meta = read('lib/seo.ts')
  for (const lang of ['en', 'pl', 'de']) {
    if (!meta.includes(`  ${lang}: {`)) errors.push(`Missing SEO translation: ${lang}`)
  }
  if (!meta.includes("'x-default'")) errors.push('Missing x-default hreflang fallback')
  if (!meta.includes('alternates:')) errors.push('Missing canonical/hreflang implementation')
  if (!meta.includes('openGraph:') || !meta.includes('twitter:')) errors.push('Missing social metadata')
}
for (const lang of ['en', 'pl', 'de']) {
  const path = `public/og/adelier-commerce-${lang}.png`
  if (!exists(path)) { errors.push(`Missing OG image: ${path}`); continue }
  const png = readFileSync(resolve(root,path))
  if (png.subarray(0,8).toString('hex') !== '89504e470d0a1a0a') errors.push(`Not PNG: ${path}`)
  else if (png.readUInt32BE(16)!==1200 || png.readUInt32BE(20)!==630) errors.push(`Wrong image dimensions: ${path}`)
}
const logo = 'public/og/adelier-logo-square.png'
if (!exists(logo)) errors.push(`Missing organization logo: ${logo}`)

const raw = process.env.NEXT_PUBLIC_SITE_URL
if (!raw) warnings.push('NEXT_PUBLIC_SITE_URL not set in the current shell: site uses source-code fallback. Confirm the LIVE canonical domain before release.')
const origin = raw ?? 'https://adeliercommerce.com'
try {
  const u = new URL(origin)
  if (u.protocol !== 'https:') errors.push('Canonical site origin must use HTTPS')
  if (u.username || u.password || u.search || u.hash || u.pathname !== '/' || u.port)
    errors.push('Canonical site URL must be a clean HTTPS origin, without path/query/fragment/credentials/port')
  if (u.hostname.endsWith('.example') || u.hostname.includes('localhost') || u.hostname.endsWith('.test'))
    errors.push('Canonical domain is an example or development host')
  if (u.hostname.startsWith('www.')) warnings.push('Source expects non-www canonical. Confirm the desired redirect and one canonical host.')
  if (u.hostname !== 'adeliercommerce.com') {
    const message = `Canonical hostname is ${u.hostname}, but the owner confirmed adeliercommerce.com`
    if (strict) errors.push(message)
    else warnings.push(message)
  }
} catch { errors.push(`Invalid canonical site URL: ${origin}`) }
if (strict && !raw) errors.push('SEO_STRICT_PRODUCTION requires explicit NEXT_PUBLIC_SITE_URL')
if (strict && (process.env.SEO_NOINDEX === 'true' || process.env.VERCEL_ENV === 'preview')) errors.push('Production release is configured as noindex!')

for (const warn of warnings) console.log(`WARN  ${warn}`)
for (const error of errors) console.error(`ERROR ${error}`)
if (errors.length) process.exit(1)
console.log('SEO file checks PASSED: 6 public routes; EN/PL/DE OG images (1200x630); canonical/hreflang/metadata files present.')
console.log('This is a static check. It does not verify live HTML, indexing, DNS, Search Console, image reachability, or Next.js build.')
