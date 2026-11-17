import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/site/blog'
import { Breadcrumbs } from '@/components/site/page-kit'
import { Container, CtaLink } from '@/components/site/primitives'
import { SeoStructuredData } from '@/components/site/seo-structured-data'
import { getDictionary } from '@/content'
import { blogUi, postsFor } from '@/lib/blog'
import { hasBlog } from '@/lib/blog-registry'
import type { Locale } from '@/lib/i18n'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return hasBlog(locale) ? pageMetadata(locale, 'blog') : {}
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  if (!hasBlog(locale)) notFound()
  const lang = locale as 'en' | 'pl'
  const ui = blogUi[lang]
  const d = getDictionary(locale)
  const [featured, ...rest] = postsFor(locale)

  return (
    <>
      <SeoStructuredData locale={locale} page="blog" />
      <section className="border-b border-hairline bg-porcelain">
        <Container className="pt-14 pb-12 md:pt-20 md:pb-16">
          <Breadcrumbs locale={locale} homeLabel={d.nav.items.home} label={d.nav.items.blog} navLabel={d.common.breadcrumbLabel} />
          <div className="flex max-w-3xl flex-col gap-5">
            <h1 className="text-[2.5rem] font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[3.5rem]">{ui.title}</h1>
            <p className="text-pretty text-xl leading-relaxed text-slate">{ui.subtitle}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="latest" className="py-16 md:py-20">
        <Container>
          {featured ? (
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-6">
                <h2 id="latest" className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-slate">
                  {ui.latest}
                </h2>
                <PostCard post={featured} ui={ui} featured priority />
              </div>
              {rest.length > 0 ? (
                <div className="flex flex-col gap-6 border-t border-hairline pt-12">
                  <h2 className="font-display text-2xl font-semibold text-ink">{ui.more}</h2>
                  <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <li key={post.slug}>
                        <PostCard post={post} ui={ui} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex max-w-2xl flex-col items-start gap-4 rounded-xl border border-dashed border-input p-8 md:p-10">
              <h2 id="latest" className="font-display text-2xl font-semibold text-ink">
                {ui.empty.title}
              </h2>
              <p className="text-pretty text-lg leading-relaxed text-slate">{ui.empty.body}</p>
              {ui.empty.link ? (
                <CtaLink href={ui.empty.link.href} variant="text" hrefLang="pl">
                  {ui.empty.link.label}
                </CtaLink>
              ) : null}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
