/**
 * Fails when the EN, PL and DE dictionaries stop sharing one structure.
 * It compares keys, array lengths and product ids — never text length.
 * Run with: pnpm check:i18n
 */
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const root = new URL('..', import.meta.url).pathname
const dir = mkdtempSync(join(tmpdir(), 'i18n-'))
const entry = join(dir, 'entry.ts')
writeFileSync(
  entry,
  `export { en } from ${JSON.stringify(join(root, 'content/en.ts'))}
export { pl } from ${JSON.stringify(join(root, 'content/pl.ts'))}
export { de } from ${JSON.stringify(join(root, 'content/de.ts'))}
export { en as pen } from ${JSON.stringify(join(root, 'content/partner/en.ts'))}
export { pl as ppl } from ${JSON.stringify(join(root, 'content/partner/pl.ts'))}
export { de as pde } from ${JSON.stringify(join(root, 'content/partner/de.ts'))}
export { mainNavKeys } from ${JSON.stringify(join(root, 'lib/i18n.ts'))}`,
)
const out = join(dir, 'bundle.mjs')
await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'error', alias: { '@': root } })
const bundle = await import(pathToFileURL(out).href)
const { mainNavKeys } = bundle
// UI chrome (content/*.ts) and page copy (content/partner/*.ts) are two dictionaries; check both as one.
const en = { ...bundle.en, page: bundle.pen }
const pl = { ...bundle.pl, page: bundle.ppl }
const de = { ...bundle.de, page: bundle.pde }

const errors = []

/** Walk `ref` and compare shape against `other`; ids must match position by position. */
function compare(ref, other, lang, path = '') {
  if (Array.isArray(ref)) {
    if (!Array.isArray(other)) return errors.push(`${lang}${path}: expected array`)
    if (ref.length !== other.length) errors.push(`${lang}${path}: ${other.length} items, en has ${ref.length}`)
    ref.forEach((item, i) => {
      if (item && typeof item === 'object' && 'id' in item && other[i]?.id !== item.id)
        errors.push(`${lang}${path}[${i}].id: "${other[i]?.id}", en has "${item.id}"`)
      if (i < other.length) compare(item, other[i], lang, `${path}[${i}]`)
    })
    return
  }
  if (ref && typeof ref === 'object') {
    if (!other || typeof other !== 'object' || Array.isArray(other)) return errors.push(`${lang}${path}: expected object`)
    const a = Object.keys(ref).sort()
    const b = Object.keys(other).sort()
    for (const k of a) if (!b.includes(k)) errors.push(`${lang}${path}.${k}: missing`)
    for (const k of b) if (!a.includes(k)) errors.push(`${lang}${path}.${k}: not in en`)
    for (const k of a) if (k in other) compare(ref[k], other[k], lang, `${path}.${k}`)
    return
  }
  if (typeof ref !== typeof other) errors.push(`${lang}${path}: ${typeof other}, en has ${typeof ref}`)
}

compare(pl, en, 'en↔pl') // reverse pass is covered by "not in en"
compare(en, pl, 'pl')
compare(en, de, 'de')

// Explicit counts the brief names, printed so a pass is visibly not vacuous.
const counts = (d) => ({
  nav: mainNavKeys.filter((k) => k in d.nav.items).length,
  serviceCards: d.page.home.whatWeDo.items.length,
  serviceShape: d.page.home.whatWeDo.items.map((s) => `${s.paragraphs.length}p${s.bullets?.length ?? 0}b`).join(','),
  audiences: d.page.home.audiences.items?.length ?? Object.keys(d.page.home.audiences).length,
})
const ref = JSON.stringify(counts(en))
// A zero here means a path no longer resolves, which would make the comparison pass on nothing.
for (const [k, v] of Object.entries(counts(en))) if (!v) errors.push(`en: count "${k}" is empty — check its path`)
for (const [lang, d] of [['pl', pl], ['de', de]]) {
  if (JSON.stringify(counts(d)) !== ref) errors.push(`${lang}: counts ${JSON.stringify(counts(d))} vs en ${ref}`)
}

if (errors.length) {
  console.error(`i18n parity FAILED (${errors.length}):\n  ${errors.join('\n  ')}`)
  process.exit(1)
}
console.log('i18n parity OK', ref)
