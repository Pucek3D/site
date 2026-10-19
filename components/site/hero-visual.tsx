import { Check, Star } from 'lucide-react'
import type { Dictionary } from '@/content'
import { DemoLabel, FocusFrame } from './primitives'

/**
 * A composed product page + team review, drawn in markup rather than an
 * image so it localises and stays sharp. Labelled as a demonstration: it is
 * not client work.
 */
export function HeroVisual({ dict }: { dict: Dictionary }) {
  const v = dict.home.visual
  return (
    <figure aria-label={v.alt} className="relative">
      <div className="mb-4 flex justify-end">
        <DemoLabel>{dict.common.demoNotClient}</DemoLabel>
      </div>
      <div aria-hidden className="grid gap-4 sm:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-hairline bg-white p-5 shadow-[0_1px_0_rgba(16,24,40,0.04)]">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate">{v.productPage}</p>
          <div className="mt-4 flex gap-4">
            <div className="flex aspect-square w-24 shrink-0 items-end justify-center rounded-lg bg-porcelain pb-3">
              <div className="h-16 w-7 rounded-t-lg rounded-b-md bg-ink" />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <p className="font-display font-semibold leading-snug text-ink">{v.productTitle}</p>
              <div className="flex items-center gap-1 text-ink">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <div className="h-2 w-3/4 rounded-full bg-hairline" />
              <div className="h-2 w-1/2 rounded-full bg-hairline" />
            </div>
          </div>
          <FocusFrame color="cobalt" inset="sm" animate className="mt-7 rounded-md bg-cobalt-tint px-4 py-3">
            <p className="text-xs font-semibold text-cobalt">{v.reasonLabel}</p>
            <p className="mt-1 text-[0.9375rem] font-semibold leading-snug text-ink">{v.reason}</p>
          </FocusFrame>
          <p className="mt-4 text-xs text-slate">{v.improved}</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-2 w-full rounded-full bg-hairline" />
            <div className="h-2 w-5/6 rounded-full bg-hairline" />
          </div>
        </div>
        <div className="rounded-xl bg-ink p-5 text-white">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-mist">{v.workflowTitle}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {v.workflow.map((step) => (
              <li key={step} className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm last:border-0">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sage">
                  <Check className="size-3 text-ink" />
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  )
}
