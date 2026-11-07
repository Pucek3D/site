/** SEO indexing defaults to on in production; preview opt-out must be explicit. */
export function seoNoIndex(): boolean {
  return process.env.SEO_NOINDEX === 'true' || process.env.VERCEL_ENV === 'preview'
}
