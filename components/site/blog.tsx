import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { anchorFor, excerptOf, formatDate, readingMinutes, type Block, type Post, type blogUi } from '@/lib/blog'
import { href } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Ui = (typeof blogUi)['en']

export function PostMeta({ post, ui, className }: { post: Post; ui: Ui; className?: string }) {
  return (
    <p className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate', className)}>
      <time dateTime={post.published}>{formatDate(post.published, post.locale)}</time>
      <span aria-hidden>·</span>
      <span>{ui.minutes(readingMinutes(post))}</span>
    </p>
  )
}

export function CategoryTag({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full bg-cobalt-tint px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-cobalt">
      {children}
    </span>
  )
}

/** The whole card is one link; the title carries the accessible name. */
export function PostCard({ post, ui, featured = false, priority = false }: { post: Post; ui: Ui; featured?: boolean; priority?: boolean }) {
  return (
    <article className={cn('group relative grid gap-6', featured && 'lg:grid-cols-12 lg:items-center lg:gap-12')}>
      <div className={cn('relative aspect-[16/9] overflow-hidden rounded-xl bg-porcelain ring-1 ring-hairline', featured && 'lg:col-span-7')}>
        <Image
          src={post.cover.src}
          alt=""
          fill
          priority={priority}
          sizes={featured ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className={cn('flex flex-col gap-4', featured && 'lg:col-span-5')}>
        <CategoryTag>{post.category}</CategoryTag>
        <h3 className={cn('text-balance font-semibold leading-tight text-ink', featured ? 'text-3xl md:text-4xl' : 'text-xl')}>
          <Link href={href(post.locale, 'blog', `/${post.slug}`)} className="after:absolute after:inset-0 after:rounded-xl group-hover:text-cobalt">
            {post.title}
          </Link>
        </h3>
        <p className={cn('text-pretty leading-relaxed text-slate', featured ? 'text-lg' : 'line-clamp-3')}>{excerptOf(post)}</p>
        <PostMeta post={post} ui={ui} />
        <span aria-hidden className="mt-1 inline-flex items-center gap-1.5 font-semibold text-cobalt">
          {ui.read}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}

export function ArticleBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className="text-pretty text-lg leading-[1.75] text-ink/85">{block.text}</p>
    case 'lead':
      return (
        <p className="border-l-2 border-sage pl-5 text-pretty font-display text-2xl font-semibold leading-snug text-ink">{block.text}</p>
      )
    case 'questions':
      return (
        <div className="rounded-xl bg-cobalt-tint px-6 py-5 md:px-8 md:py-6">
          <p className="text-pretty text-lg font-medium leading-relaxed text-ink">{block.text}</p>
        </div>
      )
    case 'quote':
      return (
        <blockquote className="my-2 text-balance font-serif text-2xl italic leading-snug text-cobalt md:text-[1.75rem]">{block.text}</blockquote>
      )
    case 'h3':
      return <h3 className="mt-4 text-balance font-display text-2xl font-semibold leading-snug text-ink">{block.text}</h3>
  }
}

export function TableOfContents({ post, label }: { post: Post; label: string }) {
  const headings = post.sections.flatMap((s) => (s.heading ? [s.heading] : []))
  if (post.closing?.heading) headings.push(post.closing.heading)
  return (
    <nav aria-labelledby="toc-label" className="flex flex-col gap-4">
      <p id="toc-label" className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-slate">
        {label}
      </p>
      <ol className="flex flex-col border-l border-hairline">
        {headings.map((h) => (
          <li key={h}>
            <a
              href={`#${anchorFor(h)}`}
              className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-slate transition-colors hover:border-cobalt hover:text-ink"
            >
              {h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
