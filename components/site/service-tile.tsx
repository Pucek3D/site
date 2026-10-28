'use client'

import { useId, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
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
 * Every tile rests light and takes the dark ink treatment on hover, keyboard focus,
 * or while open — so an opened tile keeps the dark ground its description is set on.
 * The whole upper tile is the toggle; the "View service" link sits outside it,
 * since a link cannot be nested inside a button.
 */
export function ServiceTile({ number, name, tagline, paragraphs, bullets, icon, art, alt, ground, to, labels }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const [excerpt, ...more] = paragraphs

  return (
    <li
      data-open={open}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl transition-colors duration-200',
        ground,
        'hover:bg-ink focus-within:bg-ink data-[open=true]:bg-ink',
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex flex-1 cursor-pointer flex-col text-left focus-visible:outline-none"
      >
        <span className="flex flex-col px-5 pb-3 pt-5">
          <span className="flex items-center gap-3">
            <span className="text-xs font-semibold tabular-nums text-cobalt transition-colors group-hover:text-mist group-focus-within:text-mist group-data-[open=true]:text-mist">
              {number}
            </span>
            {icon}
          </span>
          <span className="mt-3 block text-balance font-display text-lg font-semibold leading-[1.22] text-ink transition-colors sm:min-h-[4.75rem] xl:text-[1.125rem] group-hover:text-white group-focus-within:text-white group-data-[open=true]:text-white">
            {name}
          </span>
          <span className="mt-2 block text-pretty text-[0.9rem] font-medium leading-snug text-ink transition-colors sm:min-h-[3.65rem] group-hover:text-white/90 group-focus-within:text-white/90 group-data-[open=true]:text-white/90">
            {tagline}
          </span>
          <span className="mt-2 line-clamp-2 min-h-[3rem] text-pretty text-[0.875rem] leading-relaxed text-slate transition-colors group-hover:text-mist group-focus-within:text-mist group-data-[open=true]:text-mist">
            {excerpt}
          </span>
        </span>
        <span className="relative mt-auto block aspect-[16/10] overflow-hidden">
          <Image
            src={art}
            alt={alt}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </span>
        <span className="flex min-h-12 items-center justify-between gap-3 px-5 text-sm font-semibold text-ink transition-colors group-hover:text-white group-focus-within:text-white group-data-[open=true]:text-white">
          {open ? labels.less : labels.more}
          <ChevronDown aria-hidden className={cn('size-4 transition-transform', open && 'rotate-180')} />
        </span>
      </button>
      <div id={panelId} hidden={!open} className="flex flex-col gap-3 px-5 pb-5 text-sm leading-relaxed text-mist">
        <p>{excerpt}</p>
        {more.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {bullets?.length ? (
          <ul className="list-disc space-y-1 pl-5">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        <Link href={to} className="mt-1 inline-flex items-center gap-1.5 font-semibold text-white hover:underline">
          {labels.view} <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </li>
  )
}
