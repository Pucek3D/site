import { href, type Locale } from './i18n'
import { blogPostLocales } from './blog-registry'

/**
 * Article bodies are stored as typed blocks so headings, emphasis and call-outs
 * keep their role without the author's wording being rewritten.
 *  - p:         ordinary paragraph
 *  - lead:      short line set apart for emphasis
 *  - questions: a run of questions the reader should ask, shown in a panel
 *  - quote:     a question quoted in the text, shown as a pull quote
 *  - h3:        sub-heading inside a section
 */
export type Block =
  /** `link` wraps an exact phrase already in `text` in an internal link; the wording never changes. */
  | { type: 'p'; text: string; link?: { phrase: string; to: string } }
  | { type: 'lead'; text: string }
  | { type: 'questions'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'h3'; text: string }

export type ArticleSection = { heading?: string; blocks: Block[] }

export type Post = {
  slug: string
  locale: Locale
  title: string
  category: string
  /** ISO date. */
  published: string
  /** ISO date of the last content change; equals `published` until the article is edited. */
  modified: string
  /** Search and social copy. Falls back to the title and first paragraph when absent. */
  seo?: { title: string; description: string; ogDescription: string; keywords: string[] }
  cover: { src: string; alt: string; width: number; height: number }
  sections: ArticleSection[]
  /** Rendered as a panel at the end of the article. */
  closing?: ArticleSection
}

const p = (text: string): Block => ({ type: 'p', text })
const lead = (text: string): Block => ({ type: 'lead', text })
const questions = (text: string): Block => ({ type: 'questions', text })
const quote = (text: string): Block => ({ type: 'quote', text })
const h3 = (text: string): Block => ({ type: 'h3', text })

const posts: Post[] = [
  {
    slug: 'czy-warto-sprzedawac-na-amazonie',
    locale: 'pl',
    title: 'Czy warto sprzedawać na Amazonie?',
    category: 'Strategia sprzedaży',
    published: '2026-11-17',
    modified: '2026-11-17',
    seo: {
      title: 'Czy warto sprzedawać na Amazonie? | ADelier Commerce',
      description: 'Czy sprzedaż na Amazonie się opłaca? Sprawdź koszty, potencjał produktu, konkurencję i dowiedz się, kiedy Amazon może pomóc rozwinąć Twoją markę.',
      ogDescription: 'Amazon może pomóc Twojej marce zwiększyć sprzedaż i wejść na nowe rynki. Dowiedz się, kiedy warto zainwestować w ten kanał i jak ocenić jego rentowność.',
      keywords: [
        'czy warto sprzedawać na Amazonie',
        'sprzedaż na Amazonie',
        'czy Amazon się opłaca',
        'koszty sprzedaży na Amazonie',
        'jak sprzedawać na Amazonie',
        'rentowność sprzedaży na Amazonie',
        'Amazon dla marek',
        'ekspansja zagraniczna Amazon',
        'Amazon Ads',
        'strategia sprzedaży na Amazonie',
      ],
    },
    cover: {
      src: '/images/blog/czy-warto-sprzedawac-na-amazonie.png',
      alt: 'Sprzedaż na Amazonie – analiza potencjału i skalowania sprzedaży marki | ADelier Commerce',
      width: 1672,
      height: 941,
    },
    sections: [
      {
        blocks: [
          p('Amazon jest jednym z największych marketplace’ów na świecie i dla wielu marek może być bardzo atrakcyjnym kanałem sprzedaży. Ale czy każda marka powinna sprzedawać na Amazonie?'),
          lead('Nie.'),
          p('Amazon może otworzyć przed firmą dostęp do milionów klientów i nowych rynków, ale jednocześnie wiąże się z dużą konkurencją, kosztami, koniecznością inwestowania w reklamę oraz ciągłą optymalizacją.'),
          p('Dlatego zanim zdecydujesz się na wejście na Amazon, warto odpowiedzieć sobie na kilka podstawowych pytań:'),
          questions('Czy moi klienci są na Amazonie? Czy mój produkt ma tam potencjał sprzedażowy? Czy sprzedaż będzie rentowna? I czy Amazon może być dla mojej marki kanałem długoterminowego wzrostu?'),
        ],
      },
      {
        heading: 'Amazon – dlaczego warto go rozważyć?',
        blocks: [
          p('Jedną z największych zalet Amazon jest dostęp do ogromnej liczby konsumentów, którzy już korzystają z platformy w celach zakupowych.'),
          p('Klient nie musi najpierw poznać Twojej marki. Może znaleźć Twój produkt, porównać go z konkurencją i dokonać zakupu bezpośrednio na platformie. Dla marki oznacza to możliwość dotarcia do nowych klientów bez konieczności budowania całego ruchu samodzielnie.'),
          p('To szczególnie istotne w przypadku marek, które chcą zwiększyć sprzedaż, ale również tych, które planują ekspansję zagraniczną.'),
          h3('Amazon jako narzędzie ekspansji'),
          p('Amazon może być bardzo ciekawym sposobem na wejście na kolejne rynki. Marka może rozwijać sprzedaż na marketplace’ach w Niemczech, Wielkiej Brytanii, Francji, Włoszech czy USA, korzystając z infrastruktury i zasięgu platformy.'),
          p('Nie oznacza to jednak, że wystarczy przetłumaczyć istniejący listing i rozpocząć sprzedaż.'),
          p('Każdy rynek ma swoją konkurencję, poziom cen, zachowania konsumentów i specyfikę wyszukiwania produktów. Dlatego decyzję o wejściu na konkretny marketplace warto poprzedzić analizą potencjału.'),
        ],
      },
      {
        heading: 'Czy Amazon jest opłacalny?',
        blocks: [
          p('To prawdopodobnie najważniejsze pytanie, jakie marka powinna sobie zadać.'),
          p('Duża liczba potencjalnych klientów nie oznacza automatycznie dużej liczby klientów dla Twojej marki.'),
          p('Na Amazonie konkurujesz nie tylko produktem, ale również ceną, opiniami, jakością oferty, zdjęciami, widocznością i reklamą. Do tego dochodzą prowizje, koszty logistyczne, magazynowania oraz budżet reklamowy.'),
          p('Dlatego przed wejściem na Amazon warto policzyć realną rentowność sprzedaży.'),
          p('Produkt może generować wysoką sprzedaż, ale jeśli po odliczeniu wszystkich kosztów marża jest bardzo niska, dalsze skalowanie może nie mieć biznesowego sensu.'),
          lead('Sprzedaż to nie wszystko. Liczy się również zysk.'),
        ],
      },
      {
        heading: 'Czy Twój produkt ma potencjał na Amazonie?',
        blocks: [
          p('Nie każdy produkt będzie dobrym produktem amazonowym.'),
          p('Przed wejściem na marketplace warto sprawdzić, czy istnieje wystarczający popyt, jak wygląda konkurencja i czy produkt ma możliwość osiągnięcia odpowiedniej marży.'),
          p('Warto również przyjrzeć się konkurencyjnym ofertom. Jakie mają ceny? Ile mają opinii? Jak wyglądają ich zdjęcia i opisy? Czy oferują coś, czego nie oferuje Twój produkt?'),
          p('I przede wszystkim:'),
          questions('Dlaczego klient miałby wybrać właśnie Twój produkt?'),
          p('To pytanie jest szczególnie ważne w konkurencyjnych kategoriach. Jeżeli na Amazonie znajduje się już kilkadziesiąt podobnych produktów, sama obecność na platformie nie wystarczy.'),
          p('Potrzebna jest wyraźna przewaga – może nią być produkt, jakość, cena, marka, komunikacja, design, funkcjonalność albo doświadczenie zakupowe.'),
        ],
      },
      {
        heading: 'Amazon to również inwestycja w reklamę',
        blocks: [
          p('Jednym z błędnych założeń jest przekonanie, że wystarczy dodać produkt na Amazon i klienci sami go znajdą.'),
          p('W konkurencyjnych kategoriach widoczność organiczna może być trudna do zbudowania. Dlatego Amazon Ads jest często istotnym elementem strategii sprzedaży.'),
          p('Reklama pozwala zwiększyć widoczność produktu, pozyskiwać nowych klientów, testować słowa kluczowe i zbierać dane, które później można wykorzystać do optymalizacji całej oferty.'),
          p('Jednocześnie nie chodzi o to, żeby po prostu wydawać coraz więcej.'),
          p('Najważniejsze pytanie brzmi:'),
          questions('Ile kosztuje pozyskanie sprzedaży i jaki zwrot generuje każda złotówka przeznaczona na reklamę?'),
          p('Dlatego warto analizować m.in. ACOS, ROAS, CTR, CPC oraz conversion rate, a następnie przesuwać budżet w kierunku działań, które przynoszą najlepsze rezultaty.'),
        ],
      },
      {
        heading: 'A co, jeśli już sprzedajesz na Amazonie?',
        blocks: [
          p('Dla wielu marek problemem nie jest samo rozpoczęcie sprzedaży, ale osiągnięcie wyników, które uzasadniają obecność na platformie.'),
          p('Możesz już mieć produkty na Amazonie, ale sprzedaż może być niższa od oczekiwanej, reklamy mogą być zbyt drogie, listingi mogą nie konwertować, a konkurencja może rozwijać się szybciej.'),
          p('W takiej sytuacji pierwszym krokiem nie zawsze powinno być zwiększenie budżetu reklamowego.'),
          p('Czasami problem znajduje się gdzie indziej.'),
          p('Warto przeanalizować całą ścieżkę zakupową: od wyszukiwania produktu, przez kliknięcie i listing, aż po konwersję i rentowność sprzedaży.'),
          questions('Co działa? Co nie działa? Gdzie tracimy sprzedaż? Co możemy poprawić?'),
          p('Dopiero odpowiedzi na te pytania powinny prowadzić do decyzji o kolejnych inwestycjach.'),
        ],
      },
      {
        heading: 'Kiedy warto wejść na Amazon?',
        blocks: [
          p('Amazon może być bardzo dobrym kanałem sprzedaży, jeśli Twój produkt ma potwierdzony popyt, możesz konkurować na rynku i jesteś w stanie osiągnąć odpowiednią marżę po uwzględnieniu wszystkich kosztów.'),
          p('Istotne jest również przygotowanie operacyjne. Sprzedaż na Amazonie wymaga odpowiednich zapasów, logistyki, obsługi klienta i gotowości do inwestowania w marketing.'),
          p('Warto też spojrzeć na Amazon szerzej niż tylko jako na kolejny kanał sprzedaży.'),
          p('Jeżeli marka chce rozwijać się poza Polską, Amazon może stać się narzędziem ekspansji zagranicznej i sposobem na dotarcie do nowych grup klientów.'),
        ],
      },
      {
        heading: 'A kiedy Amazon może nie być dobrym rozwiązaniem?',
        blocks: [
          p('Nie każda marka musi być na Amazonie.'),
          p('Jeżeli popyt na produkt jest niewielki, konkurencja jest bardzo silna, marża nie pozwala na pokrycie kosztów sprzedaży i reklamy albo produkt jest trudny i kosztowny w logistyce, wejście na Amazon może nie być najlepszą decyzją.'),
          p('Dlatego zamiast traktować Amazon jako obowiązkowy kanał sprzedaży, warto potraktować go jak inwestycję biznesową.'),
          p('Najpierw należy sprawdzić potencjał, policzyć koszty i ocenić możliwość osiągnięcia rentownego wzrostu.'),
        ],
      },
      {
        heading: 'Czy warto sprzedawać na Amazonie? – podsumowanie',
        blocks: [
          p('W wielu przypadkach – zdecydowanie tak.'),
  p('Ale właściwe pytanie nie brzmi: „Czy Amazon jest duży?”'),
  p('Bo wiemy, że jest.'),
  p('Lepsze pytanie brzmi:'),
  questions('„Czy Amazon jest odpowiednim kanałem dla mojej marki i czy możemy zbudować na nim rentowną sprzedaż?”'),
          p('Odpowiedź zależy od produktu, rynku, konkurencji, marży i możliwości operacyjnych.'),
          p('Dlatego najlepszym pierwszym krokiem nie zawsze jest założenie konta Seller Central.'),
          lead('Czasami najlepszym pierwszym krokiem jest analiza potencjału.'),
        ],
      },
    ],
    closing: {
      heading: 'ADelier Commerce',
      blocks: [
        p('W ADelier Commerce pomagamy markom odpowiedzieć właśnie na to pytanie.'),
        { type: 'p', text: ('Analizujemy potencjał produktu, rynek, konkurencję, ceny, słowa kluczowe i możliwości sprzedaży, a następnie pomagamy przełożyć te dane na konkretną strategię działania.'), link: { phrase: 'konkretną strategię działania', to: href('pl', 'brands') } },
        p('Jeżeli marka już sprzedaje na Amazonie, analizujemy również jej listingi, kampanie reklamowe i wyniki sprzedaży, aby znaleźć obszary wymagające poprawy.'),
        p('Nie chodzi tylko o to, żeby sprzedawać na Amazonie.'),
        lead('Chodzi o to, żeby wiedzieć, czy warto tam być – i jak wykorzystać ten kanał do rozwoju marki.'),
      ],
    },
  },
]

// The switcher reads lib/blog-registry.ts; it must describe exactly these articles.
for (const post of posts) {
  if (!blogPostLocales[post.slug]?.includes(post.locale)) {
    throw new Error(`lib/blog-registry.ts is missing ${post.locale}/${post.slug}`)
  }
}
for (const [slug, langs] of Object.entries(blogPostLocales)) {
  for (const l of langs) {
    if (!posts.some((p) => p.slug === slug && p.locale === l)) throw new Error(`lib/blog-registry.ts lists ${l}/${slug}, which has no article`)
  }
}

/** Newest first. */
export function postsFor(locale: Locale): Post[] {
  return posts.filter((p) => p.locale === locale).sort((a, b) => b.published.localeCompare(a.published))
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return posts.find((p) => p.locale === locale && p.slug === slug)
}

export function allPosts(): Post[] {
  return posts
}

/** A heading's anchor: lower case, no diacritics, words joined by hyphens. */
export function anchorFor(text: string): string {
  return text
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function postText(post: Post): string {
  const all = [...post.sections, ...(post.closing ? [post.closing] : [])]
  return all.flatMap((s) => [s.heading ?? '', ...s.blocks.map((b) => b.text)]).join(' ')
}

/** Rounded up at 200 words a minute. */
export function readingMinutes(post: Post): number {
  return Math.max(1, Math.ceil(postText(post).split(/\s+/).filter(Boolean).length / 200))
}

/** The article's opening paragraph doubles as its summary, so the summary is the author's own words. */
export function excerptOf(post: Post): string {
  return post.sections[0]?.blocks.find((b) => b.type === 'p')?.text ?? ''
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))
}

type BlogUi = {
  title: string
  subtitle: string
  latest: string
  more: string
  read: string
  minutes: (n: number) => string
  empty: { title: string; body: string; link?: { label: string; href: string } }
  toc: string
  by: string
  back: string
  cta: { title: string; body: string; button: string }
}

export const blogUi: Record<'en' | 'pl', BlogUi> = {
  en: {
    title: 'Blog',
    subtitle: 'Practical notes on Amazon advertising, marketplace growth and building sales that stay profitable.',
    latest: 'Latest article',
    more: 'More articles',
    read: 'Read the article',
    minutes: (n) => `${n} min read`,
    empty: {
      title: 'Our first English articles are on the way.',
      body: 'Until they are published, our first article is available in Polish.',
      link: { label: 'Read it on the Polish blog', href: '/pl/blog' },
    },
    toc: 'In this article',
    by: 'ADelier Commerce',
    back: 'All articles',
    cta: {
      title: 'Want to know whether Amazon is right for your brand?',
      body: 'Tell us about your product and market, and we will discuss how to assess its potential.',
      button: 'Get in touch',
    },
  },
  pl: {
    title: 'Blog',
    subtitle: 'Praktyczna wiedza o reklamie na Amazonie, rozwoju sprzedaży na marketplace’ach i budowaniu rentownego wzrostu marki.',
    latest: 'Najnowszy wpis',
    more: 'Więcej wpisów',
    read: 'Czytaj wpis',
    minutes: (n) => `${n} min czytania`,
    empty: { title: 'Pierwsze wpisy pojawią się wkrótce.', body: 'Wróć do nas niebawem.' },
    toc: 'W tym wpisie',
    by: 'ADelier Commerce',
    back: 'Wszystkie wpisy',
    cta: {
      title: 'Chcesz sprawdzić, czy Amazon to kanał dla Twojej marki?',
      body: 'Opowiedz nam o swoim produkcie i rynku — porozmawiamy o tym, jak ocenić jego potencjał.',
      button: 'Porozmawiajmy',
    },
  },
}
