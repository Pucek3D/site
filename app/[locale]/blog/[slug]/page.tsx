import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ArticleBlock, CategoryTag, PostMeta, TableOfContents } from '@/components/site/blog'
import { FinalCta } from '@/components/site/page-kit'
import { Container } from '@/components/site/primitives'
import { getDictionary } from '@/content'
import { allPosts, anchorFor, blogUi, getPost } from '@/lib/blog'
import { href, type Locale } from '@/lib/i18n'
import { articleJsonLd } from '@/lib/seo-jsonld'
import { articleMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: Locale; slug: string }> }

export function generateStaticParams() {
  return allPosts().map((p) => ({ locale: p.locale, slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPost(locale, slug)
  return post ? articleMetadata(post) : {}
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const post = getPost(locale, slug)
  if (!post) notFound()
  const ui = blogUi[locale as 'en' | 'pl']
  const d = getDictionary(locale)
  const json = JSON.stringify(articleJsonLd(post)).replace(/</g, '\\u003c')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      <article aria-labelledby="article-title">
        <header className="bg-porcelain">
          <Container className="pt-12 pb-28 md:pt-16 md:pb-40">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
              <CategoryTag>{post.category}</CategoryTag>
              <h1 id="article-title" className="text-balance text-[2.5rem] font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-[3.75rem]">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
                <span className="flex items-center gap-2 font-semibold text-ink">
                  <Image src="/brand/icon-fullcolor.svg" alt="" width={24} height={24} className="size-6" />
                  {ui.by}
                </span>
                <span aria-hidden className="text-slate">
                  ·
                </span>
                <PostMeta post={post} ui={ui} className="text-sm" />
              </div>
            </div>
          </Container>
        </header>

        <Container>
          <figure className="mx-auto -mt-20 max-w-5xl md:-mt-28">
            <div className="relative overflow-hidden rounded-2xl bg-porcelain shadow-[0_30px_60px_-30px_rgba(16,24,40,0.35)] ring-1 ring-hairline">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                priority
                sizes="(min-width: 1100px) 1024px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </figure>

          <div className="mx-auto grid max-w-6xl gap-12 py-16 md:py-20 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <TableOfContents post={post} label={ui.toc} />
              </div>
            </aside>

            <div className="flex min-w-0 flex-col gap-14 lg:col-span-8 lg:col-start-5">
              {post.sections.map((section, i) => (
                <section
                  key={section.heading ?? `intro-${i}`}
                  aria-labelledby={section.heading ? anchorFor(section.heading) : undefined}
                  className="flex flex-col gap-6"
                >
                  {section.heading ? (
                    <h2 id={anchorFor(section.heading)} className="scroll-mt-28 text-balance text-3xl font-semibold leading-tight text-ink md:text-[2.25rem]">
                      {section.heading}
                    </h2>
                  ) : null}
                  {section.blocks.map((b, j) => (
                    <ArticleBlock key={j} block={b} />
                  ))}
                </section>
              ))}

              {post.closing ? (
                <section
                  aria-labelledby={post.closing.heading ? anchorFor(post.closing.heading) : undefined}
                  className="flex flex-col gap-6 rounded-2xl border border-hairline bg-porcelain p-7 md:p-10"
                >
                  <div className="flex items-center gap-3">
                    <Image src="/brand/icon-fullcolor.svg" alt="" width={36} height={36} className="size-9" />
                    {post.closing.heading ? (
                      <h2 id={anchorFor(post.closing.heading)} className="scroll-mt-28 font-display text-2xl font-semibold text-ink">
                        {post.closing.heading}
                      </h2>
                    ) : null}
                  </div>
                  {post.closing.blocks.map((b, j) => (
                    <ArticleBlock key={j} block={b} />
                  ))}
                </section>
              ) : null}

              <Link href={href(locale, 'blog')} className="inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-cobalt underline-offset-4 hover:underline">
                <ArrowLeft aria-hidden className="size-4" />
                {ui.back}
              </Link>
            </div>
          </div>
        </Container>
      </article>

      <FinalCta
        id="article-cta"
        title={ui.cta.title}
        paragraphs={[ui.cta.body]}
        cta={ui.cta.button}
        to={href(locale, 'contact', '?topic=brand')}
        variant="primary"
      />
    </>
  )
}
