'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TileLabels = {
  /** Expands the card in place, e.g. "See how it works". */
  expand: string
  collapse: string
  /** Navigates to the route page, e.g. "Explore agency partnerships". */
  explore: string
}

type Props = {
  number: string
  name: string
  tagline: string
  paragraphs: string[]
  bullets?: string[]
  art: string
  alt: string
  /** CSS object-position for the photo, when its subject is off-centre (e.g. "50% 20%"). */
  focus?: string
  zoom?: number
  /** Cobalt for the audience routes (Agencies, Brands), sage for Training. */
  accent: 'cobalt' | 'sage'
  to: string
  labels: TileLabels
  /** Every tile is a full-width row; this puts the image on the left instead of the right. */
  imageLeft?: boolean
}

/** "Your clients. Your brand. Our expertise." -> lead "Your clients. Your brand." + accent "Our expertise." */
function splitTagline(tagline: string) {
  const parts = tagline.match(/[^.!?]+[.!?]?/g)?.map((s) => s.trim()).filter(Boolean) ?? [tagline]
  if (parts.length < 2) {
    // One sentence: accent its closing half, so a long headline never turns entirely blue.
    const words = tagline.split(' ')
    const cut = Math.ceil(words.length / 2)
    return { lead: words.slice(0, cut).join(' '), accent: words.slice(cut).join(' ') }
  }
  return { lead: parts.slice(0, -1).join(' '), accent: parts[parts.length - 1] }
}

/*
 * Editorial service card: eyebrow, headline, short description, and the photograph in an arched
 * frame. Expanding never replaces the card: the rest of the description opens inside the same
 * white text column, directly under the summary, and the card grows with it. Only the chevron
 * button expands; only the arrow link navigates, so the two can never be mistaken for each other.
 */
export function ServiceTile({ number, name, tagline, paragraphs, bullets, art, alt, focus, zoom, accent, to, labels, imageLeft }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const [excerpt, ...rest] = paragraphs
  const { lead, accent: accentLine } = splitTagline(tagline)
  const accentText = accent === 'sage' ? 'text-sage' : 'text-cobalt'
  const hasMore = rest.length > 0 || Boolean(bullets?.length)
  const Chevron = open ? ChevronUp : ChevronDown

  return (
    <li
      className={cn(
        'group relative flex flex-col gap-3 overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-hairline',
        imageLeft ? 'md:flex-row-reverse' : 'md:flex-row',
        'md:min-h-[22rem]',
      )}
    >
      <div className="flex min-w-0 flex-col px-4 pb-4 pt-5 md:w-1/2 md:px-8 md:pb-7 md:pt-8 lg:px-10">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.08em] text-slate sm:tracking-[0.14em]">
          <span className={cn('tabular-nums font-semibold', accentText)}>{number}</span>
          <span aria-hidden className="hidden h-px w-6 shrink-0 bg-hairline sm:block" />
          <span className="min-w-0 hyphens-auto [overflow-wrap:anywhere]">{name}</span>
        </div>

        <h3 className="mt-5 text-balance font-display text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-ink md:text-[2rem] lg:text-[2.375rem]">
          {lead ? <span className="block">{lead}</span> : null}
          <span className={cn('block', accentText)}>{accentLine}</span>
        </h3>

        <p className={cn('mt-4 max-w-md text-pretty text-[0.95rem] leading-relaxed text-slate', !open && 'line-clamp-3')}>
          {excerpt}
        </p>

        {hasMore ? (
          <div
            id={panelId}
            hidden={!open}
            className="mt-6 max-w-md border-t border-hairline pt-6 text-[0.95rem] leading-relaxed text-slate motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
          >
            <div className="flex flex-col gap-3">
              {rest.map((p) => (
                <p key={p} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
            {bullets?.length ? (
              <ul className={cn('flex flex-col gap-2', rest.length > 0 && 'mt-4')}>
                {bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className={cn('mt-[0.6rem] size-1.5 shrink-0 rounded-full', accent === 'sage' ? 'bg-sage' : 'bg-cobalt')}
                    />
                    <span className="text-pretty text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link
            href={to}
            className={cn(
              'inline-flex max-w-full items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold hyphens-auto [overflow-wrap:anywhere] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              accent === 'sage'
                ? 'bg-sage text-ink hover:bg-sage/85 focus-visible:ring-sage'
                : 'bg-cobalt text-white hover:bg-cobalt/90 focus-visible:ring-cobalt',
            )}
          >
            {labels.explore}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          {hasMore ? (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2"
            >
              {open ? labels.collapse : labels.expand}
              <Chevron aria-hidden className="size-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          'relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[20rem] md:flex-1',
          imageLeft ? 'md:rounded-tr-[10rem]' : 'md:rounded-tl-[10rem]',
        )}
      >
        {/* The photo's aspect ratio is close to the frame's, so object-position has
            almost no slack to move. A zoom anchored on the focus point is what can
            actually bring an off-centre subject into the middle. */}
        <div
          className="absolute inset-0"
          style={zoom ? { transform: `scale(${zoom})`, transformOrigin: focus ?? 'center' } : undefined}
        >
          <Image
            src={art}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={focus ? { objectPosition: focus } : undefined}
            className="object-cover object-center"
          />
        </div>
      </div>
    </li>
  )
}
