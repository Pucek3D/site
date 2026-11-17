'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type TocItem = { id: string; text: string }

/** A heading counts as "being read" once it has passed this line below the sticky header. */
const READING_LINE_PX = 140

export function TocLinks({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current: string | null = null
      for (const { id } of items) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= READING_LINE_PX) current = id
      }
      // The last section is often too short to reach the reading line, so the page bottom selects it.
      if (atBottom && items.length) current = items[items.length - 1].id
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  return (
    <ol className="flex flex-col border-l border-hairline">
      {items.map(({ id, text }) => {
        const active = id === activeId
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors',
                active
                  ? 'border-cobalt font-medium text-cobalt'
                  : 'border-transparent text-slate hover:border-cobalt hover:text-ink',
              )}
            >
              {text}
            </a>
          </li>
        )
      })}
    </ol>
  )
}
