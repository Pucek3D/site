import { cn } from '@/lib/utils'

/**
 * Line breaking for display copy, done in rendering so the partner's strings
 * stay verbatim in every language. Splitting at sentence boundaries puts each
 * break where the meaning breaks, never mid-phrase, and it adapts to Polish and
 * German sentence lengths instead of copying English breaks.
 */
const SENTENCE_END = /(?<=[.!?])\s+(?=\S)/

const BREAK_CLASS = {
  always: 'block',
  md: 'md:block',
  lg: 'lg:block',
} as const

export function Sentences({
  text,
  breakAt = 'md',
  className,
}: {
  text: string
  /** Width from which each sentence starts its own line. Below it, text wraps naturally. */
  breakAt?: keyof typeof BREAK_CLASS
  className?: string
}) {
  const sentences = text.split(SENTENCE_END)
  if (sentences.length < 2) return <>{text}</>
  return (
    <>
      {sentences.map((sentence, i) => (
        <span key={i} className={cn(BREAK_CLASS[breakAt], className)}>
          {sentence}
          {i < sentences.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  )
}

/**
 * The footer signoff is authored as "Name — Descriptor." and set as two lines:
 * the name in display type, the descriptor in serif italic. The dash only
 * separated them on one line, so it goes; so does the trailing full stop,
 * which reads as stray punctuation once the descriptor stands alone.
 */
export function Signoff({ text }: { text: string }) {
  const [name, descriptor] = text.split(/\s+[—–-]\s+/)
  if (!descriptor) return <p className="max-w-sm leading-relaxed text-mist">{text}</p>
  return (
    <p className="flex flex-col gap-1">
      <span className="whitespace-nowrap font-display text-lg font-semibold text-white">{name}</span>
      {/* The last " and …" clause takes its own line. */}
      <span className="font-serif text-base italic text-mist">
        {descriptor
          .replace(/\.$/, '')
          .split(/\s+(?=and\s[^,]*$)/)
          .map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
      </span>
    </p>
  )
}
