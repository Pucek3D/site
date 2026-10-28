'use client'

import { useId, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
  ground: string
  to: string
  labels: { more: string; less: string; view: string }
  /** Spans the full row with a flat, horizontal layout (text left, image right). */
  wide?: boolean
}

/*
 * Hover turns the tile dark; a click anywhere on it swaps the front for the description in
 * the same box (it never grows). Moving the pointer off the tile, or focus leaving it,
 * returns it to its resting state, so there is no close button.
 * The panel never scrolls: from xl up the tiles are large enough to hold every description,
 * below xl (PPC's six bullets outgrow a narrow tile) the description replaces the front in flow.
 */
export function ServiceTile({ number, name, tagline, paragraphs, bullets, icon, art, alt, ground, to, labels, wide }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const [excerpt] = paragraphs

  return (
    <li
      data-open={open}
      onClick={() => setOpen((v) => !v)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
      className={cn(
        'group relative flex cursor-pointer overflow-hidden rounded-2xl transition-colors duration-200',
        ground,
        'hover:bg-ink focus-within:bg-ink data-[open=true]:bg-ink',
        wide ? 'flex-col sm:col-span-2 md:flex-row' : 'flex-col',
      )}
    >
      <div aria-hidden={open} className={cn('flex flex-1', wide ? 'flex-col md:flex-row' : 'flex-col', open && 'max-xl:hidden xl:invisible')}>
        <div className={cn('flex flex-col px-6 pt-6', wide ? 'pb-4 md:w-[46%] md:pb-6' : 'pb-4')}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tabular-nums text-cobalt transition-colors group-hover:text-mist group-focus-within:text-mist">
              {number}
            </span>
            {icon}
          </div>
          <h3 className="mt-3 text-balance font-display text-xl font-semibold leading-tight text-ink transition-colors lg:text-[1.375rem] group-hover:text-white group-focus-within:text-white">
            {name}
          </h3>
          <p className="mt-2 text-pretty text-[0.95rem] font-medium leading-snug text-ink transition-colors group-hover:text-white/90 group-focus-within:text-white/90">
            {tagline}
          </p>
          <p className="mt-2 line-clamp-2 text-pretty text-[0.9rem] leading-relaxed text-slate transition-colors group-hover:text-mist group-focus-within:text-mist">
            {excerpt}
          </p>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={(e) => {
              e.stopPropagation()
              setOpen((v) => !v)
            }}
            className="mt-auto inline-flex items-center gap-2 self-start pt-4 text-sm font-semibold text-ink transition-colors group-hover:text-white group-focus-within:text-white focus-visible:outline-none"
          >
            {labels.more}
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
        <div
          className={cn(
            'relative overflow-hidden',
            wide ? 'aspect-[16/10] md:aspect-auto md:min-h-64 md:flex-1' : 'mt-auto aspect-[16/10]',
          )}
        >
          <Image
            src={art}
            alt={alt}
            fill
            sizes={wide ? '(min-width: 768px) 55vw, 100vw' : '(min-width: 640px) 50vw, 100vw'}
            className="object-cover object-center"
          />
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="flex w-full flex-col bg-ink px-6 pt-6 text-[0.95rem] leading-relaxed text-mist xl:absolute xl:inset-0"
      >
        <h3 className="text-balance font-display text-xl font-semibold leading-tight text-white lg:text-[1.375rem]">{name}</h3>
        <div className="mt-3 flex flex-1 flex-col gap-3">
          {paragraphs.map((p) => (
            <p key={p} className="text-pretty">
              {p}
            </p>
          ))}
          {bullets?.length ? (
            <ul className="grid list-disc gap-x-8 gap-y-1 pl-5 sm:grid-cols-2">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex min-h-14 items-center">
          <Link
            href={to}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
          >
            {labels.view} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </li>
  )
}
