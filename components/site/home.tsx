import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/content'
import { ppcPathwayName, productNames, serviceNames } from '@/content/shared'
import { href, type Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { Container, CtaLink, Eyebrow, FocusFrame, Section, SectionHeading } from './primitives'

export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home
  return (
    <section aria-labelledby="home-title" className="overflow-hidden bg-white">
      <Container className="flex flex-col gap-12 py-16 md:py-24 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col gap-7 lg:w-[56%]">
          <Eyebrow>{h.hero.eyebrow}</Eyebrow>
          <h1
            id="home-title"
            className="text-balance text-[2.75rem] font-semibold leading-[1.04] text-ink md:text-6xl lg:text-[4.25rem]"
          >
            {siteConfig.tagline}
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-slate">{h.hero.support}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaLink href={href(locale, 'agencies')} className="w-full sm:w-auto">
              {h.hero.actions.agencies}
            </CtaLink>
            <CtaLink href={href(locale, 'brands')} variant="secondary" className="w-full sm:w-auto">
              {h.hero.actions.brands}
            </CtaLink>
            <CtaLink href={href(locale, 'training')} variant="text" className="text-ink sm:ml-2">
              {h.hero.actions.training}
              <ArrowRight aria-hidden className="size-4 text-sage" />
            </CtaLink>
          </div>
        </div>
        <div className="relative lg:w-[44%]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-porcelain sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/architecture.webp"
              alt={h.heroImageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover object-[70%_center]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export function AutopilotSection({ dict }: { dict: Dictionary }) {
  const a = dict.home.autopilot
  return (
    <Section tone="porcelain" labelledBy="autopilot-title">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <SectionHeading id="autopilot-title" eyebrow={a.eyebrow} title={a.title} intro={a.intro} className="lg:w-[46%]" />
        <ul className="grid gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2 lg:w-[54%]">
          {a.points.map((p) => (
            <li key={p.title} className="reveal flex flex-col gap-2 bg-white p-6 md:p-7">
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="leading-relaxed text-slate">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-14 border-l-2 border-cobalt pl-5 text-xl font-semibold leading-snug text-ink md:text-2xl">
        {a.accent}
      </p>
    </Section>
  )
}

export function ServicesSection({ dict }: { dict: Dictionary }) {
  const s = dict.home.services
  return (
    <Section labelledBy="services-title">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-16">
        <SectionHeading id="services-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} className="lg:w-[55%]" />
        <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-porcelain lg:w-[45%]">
          <Image
            src="/images/specialist.webp"
            alt={s.imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[35%_center]"
          />
        </div>
      </div>
      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'reveal flex flex-col gap-4 rounded-[14px] border border-border bg-white p-6 md:p-7',
              item.id === 'training' && 'border-sage/60',
            )}
          >
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-slate">
              {s.audience[item.audience as keyof typeof s.audience]}
            </p>
            <h3 className="text-xl font-semibold leading-snug text-ink">{serviceNames[item.id as keyof typeof serviceNames]}</h3>
            <p className="leading-relaxed text-slate">{item.body}</p>
            {item.owner ? (
              <p className="mt-auto border-t border-border pt-4 text-[0.9375rem] text-ink">
                <span className="text-slate">{s.ownerLabel}: </span>
                <span className="font-medium">{item.owner}</span>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function ApproachSection({ dict }: { dict: Dictionary }) {
  const a = dict.home.approach
  return (
    <Section tone="ink" labelledBy="approach-title">
      <SectionHeading id="approach-title" eyebrow={a.eyebrow} title={a.title} intro={a.intro} dark />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-[14px] bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
        {a.steps.map((step, i) => (
          <li key={step.title} className="reveal flex flex-col gap-3 bg-ink p-6">
            <span className="font-mono text-sm text-sage">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-mist">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-12 text-xl font-semibold text-white md:text-2xl">{a.conclusion}</p>
    </Section>
  )
}

export function BeyondAcosSection({ dict }: { dict: Dictionary }) {
  const b = dict.home.beyond
  return (
    <Section tone="porcelain" labelledBy="beyond-title">
      <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
        <SectionHeading id="beyond-title" eyebrow={b.eyebrow} title={b.title} intro={b.body} className="lg:w-[45%]" />
        <figure className="flex flex-col gap-4 lg:w-[55%]">
          <div role="img" aria-label={`${b.diagramLabel}: ${b.center}, ${b.factors.join(', ')}`} className="flex flex-col items-center gap-6">
            <FocusFrame color="cobalt" inset="md" className="rounded-[12px] bg-white px-8 py-5">
              <span className="text-2xl font-semibold text-ink">{b.center}</span>
            </FocusFrame>
            <ul aria-hidden className="flex flex-wrap justify-center gap-2.5">
              {b.factors.map((f) => (
                <li key={f} className="rounded-full border border-border bg-white px-4 py-2 text-[0.9375rem] text-ink">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <figcaption className="text-center text-sm text-slate">{b.illustrative}</figcaption>
        </figure>
      </div>
    </Section>
  )
}

export function HomeTraining({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.training
  const programs = [
    { name: productNames.foundations, body: t.programs.foundations },
    { name: productNames.enablement, body: t.programs.enablement },
    { name: ppcPathwayName, body: t.programs.ppc },
  ]
  return (
    <Section labelledBy="home-training-title">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-6 lg:w-[42%]">
          <SectionHeading id="home-training-title" eyebrow={t.eyebrow} title={dict.home.routes.items.find((i) => i.key === 'training')?.title ?? t.eyebrow} intro={t.body} />
          <CtaLink href={href(locale, 'training')} variant="sage" className="self-start">
            {dict.home.hero.actions.training}
          </CtaLink>
        </div>
        <div className="flex flex-col gap-10 lg:w-[58%]">
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {t.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-3 leading-relaxed text-ink">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-sage" />
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4">
            <p className="text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-slate">{t.programsLabel}</p>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {programs.map((p) => (
                <li key={p.name} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="font-semibold text-ink sm:w-1/2">{p.name}</span>
                  <span className="text-slate sm:w-1/2">{p.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function WhySection({ dict }: { dict: Dictionary }) {
  const w = dict.home.why
  return (
    <Section tone="porcelain" labelledBy="why-title">
      <SectionHeading id="why-title" eyebrow={w.eyebrow} title={w.title} />
      <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {w.items.map((item) => (
          <li key={item.title} className="reveal flex flex-col gap-2 border-t border-border pt-5">
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <p className="text-[0.9375rem] leading-relaxed text-slate">{item.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-16 flex flex-col overflow-hidden rounded-[18px] bg-white md:flex-row">
        <div className="relative aspect-[3/2] md:aspect-auto md:w-1/2">
          <Image src="/images/studio.webp" alt={dict.home.modesImageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 md:w-1/2 md:p-12">
          <h3 className="text-2xl font-semibold leading-snug text-ink">{w.poland.title}</h3>
          <p className="leading-relaxed text-slate">{w.poland.body}</p>
        </div>
      </div>
    </Section>
  )
}

export function HomeFinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.home.finalCta
  return (
    <section aria-labelledby="final-cta-title" className="bg-white">
      <Container className="py-20 md:py-28">
        <FocusFrame inset="lg" className="mx-auto max-w-3xl px-4 py-10 text-center md:px-10">
          <h2 id="final-cta-title" className="text-balance text-3xl font-semibold leading-tight text-ink md:text-[2.75rem]">
            {f.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate">{f.body}</p>
          <p className="mt-8 text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-slate">{f.topicsLabel}</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {f.topics.map((topic) => (
              <li key={topic} className="rounded-full bg-porcelain px-4 py-1.5 text-[0.9375rem] text-ink">
                {topic}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex justify-center">
            <CtaLink href={href(locale, 'contact')}>{f.button}</CtaLink>
          </div>
        </FocusFrame>
      </Container>
    </section>
  )
}
