'use client'

import { useId, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
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
}

/*
 * The front keeps the original card markup (plain blocks, image pinned by mt-auto), so the
 * image sits where it always did. Opening does not grow the tile: the description is laid
 * OVER the front in the same box, so the card turns into text instead of expanding.
 * The whole tile is clickable; "Read more" is the keyboard-reachable control for the same act.
 */
export function ServiceTile({ number, name, tagline, paragraphs, bullets, icon, art, alt, ground, to, labels }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const [excerpt] = paragraphs

  return (
    <li
      data-open={open}
      onClick={() => setOpen(true)}
      className={cn(
        'group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl transition-colors duration-200',
        ground,
        'hover:bg-ink focus-within:bg-ink data-[open=true]:cursor-default data-[open=true]:bg-ink',
      )}
    >
      <div aria-hidden={open} className={cn('flex flex-1 flex-col', open && 'invisible')}>
        <div className="flex flex-col px-5 pb-3 pt-5">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tabular-nums text-cobalt transition-colors group-hover:text-mist group-focus-within:text-mist">
              {number}
            </span>
            {icon}
          </div>
          <h3 className="mt-3 text-balance font-display text-lg font-semibold leading-[1.22] text-ink transition-colors sm:min-h-[4.75rem] xl:text-[1.125rem] group-hover:text-white group-focus-within:text-white">
            {name}
          </h3>
          <p className="mt-2 text-pretty text-[0.9rem] font-medium leading-snug text-ink transition-colors sm:min-h-[3.65rem] group-hover:text-white/90 group-focus-within:text-white/90">
            {tagline}
          </p>
          <p className="mt-2 line-clamp-2 min-h-[3rem] text-pretty text-[0.875rem] leading-relaxed text-slate transition-colors group-hover:text-mist group-focus-within:text-mist">
            {excerpt}
          </p>
        </div>
        <div className="relative mt-auto aspect-[16/10] overflow-hidden">
          <Image
            src={art}
            alt={alt}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
          }}
          className="flex min-h-12 items-center justify-between gap-3 px-5 text-left text-sm font-semibold text-ink transition-colors group-hover:text-white group-focus-within:text-white focus-visible:outline-none"
        >
          {labels.more}
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 flex flex-col bg-ink text-sm leading-relaxed text-mist"
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <h3 className="text-balance font-display text-lg font-semibold leading-[1.22] text-white xl:text-[1.125rem]">{name}</h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={labels.less}
            className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-mist hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 pb-3 pt-3">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {bullets?.length ? (
            <ul className="list-disc space-y-1 pl-5">
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex min-h-12 items-center border-t border-white/10 px-5">
          <Link href={to} className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline">
            {labels.view} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </li>
  )
}
