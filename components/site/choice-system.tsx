'use client'

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import type { Dictionary } from '@/content'
import { stageNames } from '@/content/shared'
import { cn } from '@/lib/utils'
import { FocusFrame, Section, SectionHeading } from './primitives'

/** Six stages in a fixed order — a real sequence, so it is numbered and steppable. */
export function ChoiceSystem({ dict, id, tone = 'porcelain' }: { dict: Dictionary; id?: string; tone?: 'white' | 'porcelain' }) {
  const c = dict.choice
  const [active, setActive] = useState(0)
  const base = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function onKey(e: KeyboardEvent, i: number) {
    const last = stageNames.length - 1
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i === last ? 0 : i + 1)
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i === 0 ? last : i - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <Section tone={tone} id={id} labelledBy={`${base}-title`}>
      <SectionHeading id={`${base}-title`} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <div className="mt-12">
        <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-hairline" aria-hidden>
          <div
            className="h-full rounded-full bg-sage transition-[width] duration-300"
            style={{ width: `${((active + 1) / stageNames.length) * 100}%` }}
          />
        </div>
        <div role="tablist" aria-label={c.progress} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {stageNames.map((name, i) => {
            const selected = i === active
            return (
              <button
                key={name}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                role="tab"
                type="button"
                id={`${base}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${base}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  'flex min-h-14 items-center gap-3 rounded-lg border px-4 text-left transition-colors',
                  selected ? 'border-ink bg-white' : 'border-hairline bg-white/60 hover:border-ink/40',
                )}
              >
                <span className={cn('text-sm font-semibold tabular-nums', selected ? 'text-cobalt' : 'text-slate')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={cn('font-display font-semibold', selected ? 'text-ink' : 'text-slate')}>{name}</span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${active}`}
          className="mt-10"
        >
          <FocusFrame inset="md" className="max-w-3xl px-2 py-6 md:px-6">
            <p className="text-sm font-medium text-slate">
              {dict.common.stageLabel} {active + 1} / {stageNames.length} · {stageNames[active]}
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug text-ink md:text-3xl">{c.questions[active]}</p>
          </FocusFrame>
        </div>
      </div>
    </Section>
  )
}
