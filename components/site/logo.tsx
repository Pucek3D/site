import Image from 'next/image'
import { cn } from '@/lib/utils'

type Variant = 'horizontal' | 'stacked' | 'icon' | 'wordmark'

const sources: Record<Variant, { file: string; w: number; h: number }> = {
  horizontal: { file: 'logo-horizontal', w: 330, h: 112 },
  stacked: { file: 'logo-stacked', w: 181, h: 200 },
  icon: { file: 'icon', w: 117, h: 112 },
  wordmark: { file: 'wordmark', w: 135, h: 63 },
}

/** Supplied SVG artwork only — the mark is never redrawn, recoloured or distorted. */
export function Logo({
  variant = 'horizontal',
  reverse = false,
  height,
  alt,
  priority,
  className,
}: {
  variant?: Variant
  reverse?: boolean
  height: number
  alt: string
  priority?: boolean
  className?: string
}) {
  const s = sources[variant]
  const width = Math.round((s.w / s.h) * height)
  return (
    <Image
      src={`/brand/${s.file}-${reverse ? 'reverse' : 'fullcolor'}.svg`}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
      unoptimized
      className={cn('block', className)}
      style={{ width, height }}
    />
  )
}
