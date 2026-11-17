'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Lines } from './typeset'

export type TileLabels = {
  /** Expands the card in place, e.g. "See how it works". */
  expand: string
  collapse: string
  /** Navigates to the route page, e.g. "Explore agency partnerships". */
  explore: string
}

export type ServiceTileData = {
  /** Stable identifier; the accordion keys on this, never on position. */
  id: string
  number?: string
  name: string
  /** Optional: a tile without one shows its name and description only. */
  tagline?: string
  paragraphs: string[]
  bullets?: string[]
  /** Cobalt for the audience routes (Agencies, Brands), sage for Training. */
  accent: 'cobalt' | 'sage'
  /** Omitted when the service has no page of its own, so the tile renders no explore link. */
  to?: string
  labels: TileLabels
}

/**
 * The three cards as one accordion: a single `activeCardId` in the parent, so opening a card
 * closes whichever was open. Hovering never changes it, and leaving an open card keeps it open.
 */
export function ServiceTileList({ tiles }: { tiles: ServiceTileData[] }) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  return (
    <ul className="mt-7 grid gap-5 md:grid-cols-3">
      {tiles.map((t) => (
        <ServiceTile
          key={t.id}
          {...t}
          open={activeCardId === t.id}
          onToggle={() => setActiveCardId((current) => (current === t.id ? null : t.id))}
        />
      ))}
    </ul>
  )
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
 * frame. Every colour reads a `--tile-*` variable (globals.css, `.service-tile`), so the light card
 * is exactly the approved one and hover / the open card swap only those values for Midnight Ink.
 * Only the chevron button expands; only the arrow link navigates.
 */
function ServiceTile({
  number,
  name,
  tagline,
  paragraphs,
  bullets,
  accent,
  to,
  labels,
  open,
  onToggle,
}: ServiceTileData & { open: boolean; onToggle: () => void }) {
  const panelId = useId()
  const [excerpt, ...rest] = paragraphs
  const headline = tagline ? splitTagline(tagline) : null
  const accentText = accent === 'sage' ? 'text-[var(--tile-sage)]' : 'text-[var(--tile-cobalt)]'
  const hasMore = rest.length > 0 || Boolean(bullets?.length)
  const Chevron = open ? ChevronUp : ChevronDown

  return (
    <li
      data-active={open}
      className={cn(
        'service-tile group relative flex flex-col overflow-hidden rounded-3xl p-3 ring-1 ring-[var(--tile-rule)]',
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col px-4 pb-4 pt-5 md:px-5 md:pb-5 md:pt-6 lg:px-7">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--tile-body)] sm:tracking-[0.14em]">
          {number ? (
            <>
              <span className={cn('tabular-nums font-semibold', accentText)}>{number}</span>
              <span aria-hidden className="hidden h-px w-6 shrink-0 bg-[var(--tile-rule)] sm:block" />
            </>
          ) : null}
          {headline ? <span className="min-w-0 hyphens-auto [overflow-wrap:anywhere]">{name}</span> : null}
        </div>

        {/* With no tagline, the service name itself is the tile heading. */}
        <h3 className="mt-5 text-balance font-display text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-[var(--tile-head)] [hyphens:auto] md:text-[1.5rem] lg:text-[1.875rem]">
          {headline ? (
            <>
              {headline.lead ? <span className="block">{headline.lead}</span> : null}
              <span className={cn('block', accentText)}>{headline.accent}</span>
            </>
          ) : (
            name
          )}
        </h3>

        <p className={cn('mt-4 max-w-md text-pretty text-[0.95rem] leading-relaxed text-[var(--tile-body)]', !open && 'line-clamp-3')}>
          <Lines text={excerpt} />
        </p>

        {hasMore ? (
          <div
            id={panelId}
            hidden={!open}
            className="mt-6 max-w-md border-t border-[var(--tile-rule)] pt-6 text-[0.95rem] leading-relaxed text-[var(--tile-body)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
          >
            <div className="flex flex-col gap-3">
              {rest.map((p) => (
                <p key={p} className="text-pretty">
                  <Lines text={p} />
                </p>
              ))}
            </div>
            {bullets?.length ? (
              <ul className={cn('flex flex-col gap-2', rest.length > 0 && 'mt-4')}>
                {bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        'mt-[0.6rem] size-1.5 shrink-0 rounded-full',
                        accent === 'sage' ? 'bg-[var(--tile-sage)]' : 'bg-[var(--tile-cobalt)]',
                      )}
                    />
                    <span className="text-pretty text-[var(--tile-strong)]">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-5">
          {/* A cobalt text link rather than a filled pill; only the focus ring offset follows the card. */}
          {to ? (
          <Link
            href={to}
            className={cn(
              /* One cobalt action across all three cards; sage stays a secondary accent (eyebrow number, bullets, headline). */
              'group inline-flex max-w-full items-center gap-2 rounded-sm py-2.5 text-sm font-semibold text-cobalt hyphens-auto [overflow-wrap:anywhere] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tile-cobalt)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tile-bg)]',
            )}
          >
            {labels.explore}
            <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
          ) : null}
          {hasMore ? (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={onToggle}
              className="inline-flex items-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-[var(--tile-head)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tile-cobalt)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tile-bg)]"
            >
              {open ? labels.collapse : labels.expand}
              <Chevron aria-hidden className="size-4" />
            </button>
          ) : null}
        </div>
      </div>
    </li>
  )
}
