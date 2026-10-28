'use client'

import { useId, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  number: string
  name: string
  tagline: string
  paragraphs: string[]
  bullets?: string[]
  icon: ReactNode
  art: string
  alt: string
  /** CSS object-position for the photo, when its subject is off-centre (e.g. "50% 20%"). */
  focus?: string
  zoom?: number
  /** Accent for the headline's closing sentence and the number: cobalt for most, sage for Training. */
  accent: 'cobalt' | 'sage'
  to: string
  labels: { more: string; less: string; view: string }
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
 * Editorial service card: eyebrow, a large headline whose closing sentence carries the accent,
 * a short excerpt, a pill CTA, and the photograph in an arched frame.
 * Hover turns the card dark; a click anywhere swaps the front for the full description in the
 * same box. Moving the pointer off (or focus leaving) returns it to rest, so there is no close button.
 * From xl up the panel overlays the card, whose floor is tall enough for the longest description
 * (PPC, six bullets); below xl the description replaces the front in flow, so it never scrolls.
 */
export function ServiceTile({ number, name, tagline, paragraphs, bullets, icon, art, alt, focus, zoom, accent, to, labels, imageLeft }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const [excerpt] = paragraphs
  const { lead, accent: accentLine } = splitTagline(tagline)
  const accentText = accent === 'sage' ? 'text-sage' : 'text-cobalt'

  return (
    <li
      data-open={open}
      onClick={() => setOpen((v) => !v)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-hairline transition-colors duration-300',
        'hover:bg-ink hover:ring-ink focus-within:bg-ink focus-within:ring-ink data-[open=true]:bg-ink data-[open=true]:ring-ink',
        // 25rem = PPC's full description (six bullets) at xl, measured, so the overlay never clips.
        'md:min-h-[22rem]',
      )}
    >
      <div
        aria-hidden={open}
        className={cn(
          'flex flex-1 flex-col gap-3 p-3',
          imageLeft ? 'md:flex-row-reverse' : 'md:flex-row',
          open && 'max-xl:hidden xl:invisible',
        )}
      >
        <div className="flex flex-col px-4 pb-4 pt-5 md:w-1/2 md:px-8 md:pb-7 md:pt-8 lg:px-10">
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-slate transition-colors group-hover:text-mist group-focus-within:text-mist">
            <span className={cn('tabular-nums font-semibold', accentText)}>{number}</span>
            <span aria-hidden className="h-px w-6 bg-hairline transition-colors group-hover:bg-white/20" />
            <span className="truncate">{name}</span>
          </div>

          <h3 className="mt-5 text-balance font-display text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-ink transition-colors md:text-[2rem] lg:text-[2.375rem] group-hover:text-white group-focus-within:text-white">
            {lead ? <span className="block">{lead}</span> : null}
            <span className={cn('block', accentText)}>{accentLine}</span>
          </h3>

          <p className="mt-4 line-clamp-3 max-w-md text-pretty text-[0.95rem] leading-relaxed text-slate transition-colors group-hover:text-mist group-focus-within:text-mist">
            {excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={(e) => {
                e.stopPropagation()
                setOpen((v) => !v)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-white group-hover:text-ink group-focus-within:bg-white group-focus-within:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2"
            >
              {labels.more}
              <ArrowUpRight aria-hidden className="size-4" />
            </button>
            <Link
              href={to}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:underline group-hover:text-white group-focus-within:text-white"
            >
              {icon}
              {labels.view}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>

        <div
          className={cn(
            'relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-auto md:flex-1',
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
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="flex w-full flex-col bg-ink px-7 pt-7 text-[0.95rem] leading-relaxed text-mist md:px-11 md:pt-9 xl:absolute xl:inset-0"
      >
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-mist">
          <span className={cn('tabular-nums font-semibold', accentText)}>{number}</span>
          <span aria-hidden className="h-px w-6 bg-white/20" />
          <span>{name}</span>
        </div>
        <p className="mt-4 text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-white">
          {tagline}
        </p>
        <div className="mt-3 flex flex-1 flex-col gap-3">
          {paragraphs.map((p) => (
            <p key={p} className="max-w-4xl text-pretty">
              {p}
            </p>
          ))}
          {bullets?.length ? (
            <ul className="grid list-disc gap-x-8 gap-y-1 pl-5 sm:grid-cols-2 xl:grid-cols-3">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex min-h-16 items-center">
          <Link
            href={to}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mist"
          >
            {labels.view} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </li>
  )
}
