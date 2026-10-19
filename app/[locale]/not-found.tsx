import { Container, CtaLink, Eyebrow } from '@/components/site/primitives'

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-2xl">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold md:text-5xl">This page does not exist.</h1>
        <p className="mt-5 text-lg text-slate">
          The link may be out of date. Strona nie istnieje. Diese Seite existiert nicht.
        </p>
        <div className="mt-8">
          <CtaLink href="/">ADelier Commerce</CtaLink>
        </div>
      </div>
    </Container>
  )
}
