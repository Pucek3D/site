import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { Locale } from './i18n'

/**
 * The six legal pages are the owner-supplied drafts in content/legal/<locale>/,
 * kept verbatim so a reviewer can diff the page against the file. They use only
 * `#`, `##`, paragraphs and `**bold**`, which is all this parser understands —
 * anything else renders as plain text rather than silently disappearing.
 */
export type Inline = { text: string; bold: boolean }
export type LegalBlock = { kind: 'h2'; text: string } | { kind: 'p'; parts: Inline[] }
export type LegalDoc = { title: string; blocks: LegalBlock[] }

/** The operator's private residential address, as it is written in each draft. */
const ADDRESS = /ul\. Daniszewska 30\/12, 03-230 [^.]+\./

function inline(text: string): Inline[] {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((t) => (t.startsWith('**') && t.endsWith('**') ? { text: t.slice(2, -2), bold: true } : { text: t, bold: false }))
}

export function loadLegalDoc(
  locale: Locale,
  page: 'privacy' | 'legal',
  { showAddress, withheld }: { showAddress: boolean; withheld: string },
): LegalDoc {
  let source = readFileSync(path.join(process.cwd(), 'content', 'legal', locale, `${page}.md`), 'utf8')
  if (!showAddress) {
    if (!ADDRESS.test(source)) throw new Error(`[legal] address pattern not found in ${locale}/${page}.md; refusing to render`)
    source = source.replace(ADDRESS, withheld)
  }

  let title = ''
  const blocks: LegalBlock[] = []
  for (const raw of source.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('## ')) blocks.push({ kind: 'h2', text: line.slice(3).trim() })
    else if (line.startsWith('# ')) title = line.slice(2).trim()
    else blocks.push({ kind: 'p', parts: inline(line) })
  }
  if (!title) throw new Error(`[legal] ${locale}/${page}.md has no title`)
  return { title, blocks }
}
