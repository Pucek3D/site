import { href, type Locale } from './i18n'
import { blogTranslations } from './blog-registry'

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
  seo?: { title: string; description: string; ogTitle: string; ogDescription: string; keywords: string[] }
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
      title: 'Czy warto sprzedawać na Amazonie? Koszty i zysk | ADelier',
      description: 'Czy warto sprzedawać na Amazonie? Poznaj koszty, konkurencję, reklamę i czynniki wpływające na rentowność sprzedaży oraz rozwój marki.',
      ogTitle: 'Czy warto sprzedawać na Amazonie? | ADelier Commerce',
      ogDescription: 'Amazon może pomóc Twojej marce zwiększyć sprzedaż i wejść na nowe rynki. Dowiedz się, kiedy warto zainwestować w ten kanał i jak ocenić jego rentowność.',
      keywords: [
        'czy warto sprzedawać na Amazonie',
        'sprzedaż na Amazon',
        'czy sprzedaż na Amazon się opłaca',
        'koszty sprzedaży na Amazon',
        'jak zacząć sprzedawać na Amazon',
        'opłacalność sprzedaży na Amazon',
        'wejście na Amazon',
        'Amazon dla polskich marek',
      ],
    },
    cover: {
      src: '/images/blog/czy-warto-sprzedawac-na-amazonie.png',
      alt: 'Grafika ADelier Commerce dotycząca sprzedaży na Amazonie, przedstawiająca ofertę produktu i analizę sprzedaży.',
      width: 1672,
      height: 941,
    },
    sections: [
      {
        blocks: [
          p('Amazon jest jednym z największych marketplace’ów na świecie i dla wielu marek może być bardzo atrakcyjnym kanałem sprzedaży. Ale czy każda marka powinna sprzedawać na Amazonie? Nie.'),
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
  {
    slug: 'is-it-worth-selling-on-amazon',
    locale: 'en',
    title: 'Is It Worth Selling on Amazon?',
    category: 'Sales strategy',
    published: '2026-11-17',
    modified: '2026-11-17',
    seo: {
      title: 'Is Selling on Amazon Worth It? Costs & Profitability | ADelier',
      description: 'Is selling on Amazon worth it for your brand? Explore costs, competition, advertising, profit margins and growth opportunities before you launch.',
      ogTitle: 'Is It Worth Selling on Amazon? | ADelier Commerce',
      ogDescription: 'Thinking about selling on Amazon? Explore the costs, competition and growth opportunities that determine whether the marketplace is right for your brand.',
      keywords: [
        'is selling on Amazon worth it',
        'should I sell on Amazon',
        'is selling on Amazon profitable',
        'costs of selling on Amazon',
        'benefits of selling on Amazon',
        'selling on Amazon for brands',
        'Amazon selling profitability',
        'Amazon marketplace expansion',
      ],
    },
    cover: {
      src: '/images/blog/is-it-worth-selling-on-amazon.png',
      alt: 'ADelier Commerce illustration about selling on Amazon, featuring a marketplace product listing and sales analytics.',
      width: 1672,
      height: 941,
    },
    sections: [
      {
        blocks: [
          p('Amazon is one of the world’s largest online marketplaces and can be a valuable sales channel for brands. But is selling on Amazon the right move for every business? Not necessarily.'),
          p('Amazon can give businesses access to millions of potential customers and new markets. At the same time, it comes with intense competition, significant costs, the need to invest in advertising, and the need for continuous optimisation.'),
          p('Before you decide to start selling on Amazon, it’s worth asking a few key questions:'),
          questions('Are my customers shopping on Amazon? Does my product have sales potential on the platform? Can I sell profitably? And could Amazon become a sustainable, long-term growth channel for my brand?'),
        ],
      },
      {
        heading: 'Why Should You Consider Amazon?',
        blocks: [
          p('One of Amazon’s greatest advantages is access to millions of shoppers who are already looking to buy.'),
          p('Customers do not necessarily need to be familiar with your brand beforehand. They can discover your product, compare it with competing alternatives, and make a purchase directly on the platform. For brands, this creates an opportunity to reach new customers without having to drive all that traffic themselves.'),
          p('This is particularly relevant for brands looking to increase sales, as well as those planning to expand internationally.'),
          h3('Amazon as a Gateway to International Expansion'),
          p('Amazon can provide an attractive route into new markets. Brands can expand into markets such as Germany, the United Kingdom, France, Italy, and the United States, benefiting from the platform’s infrastructure and reach.'),
          p('However, entering a new market involves much more than simply translating an existing product listing and making it available for sale.'),
          p('Every market has its own competitive landscape, pricing dynamics, consumer behaviour, and product search patterns. That is why entering a particular Amazon marketplace should be preceded by a thorough assessment of its potential.'),
        ],
      },
      {
        heading: 'Is Selling on Amazon Profitable?',
        blocks: [
          p('This is arguably the most important question any brand should ask.'),
          p('Access to a large pool of potential customers does not automatically translate into strong sales for your business.'),
          p('On Amazon, you compete not only on the strength of your product, but also on price, customer reviews, listing quality, product photography, visibility, and advertising. On top of that, there are referral fees, fulfilment and storage costs, and advertising budgets to consider.'),
          p('Before launching on Amazon, it is therefore essential to calculate the actual profitability of your sales.'),
          p('A product may generate substantial revenue, but if the profit margin remains very low after all costs are deducted, scaling further may not make commercial sense.'),
          lead('Sales alone are not enough. Profit matters, too.'),
        ],
      },
      {
        heading: 'Does Your Product Have Potential on Amazon?',
        blocks: [
          p('Not every product is a good fit for Amazon.'),
          p('Before entering the marketplace, it is important to assess whether sufficient demand exists, understand the competitive environment, and determine whether your product can achieve a sustainable profit margin.'),
          p('It is also worth examining competing listings. How are their products priced? How many reviews have they received? What do their images and descriptions look like? Do they offer something your product does not?'),
          p('And above all:'),
          questions('Why should a customer choose your product over the alternatives?'),
          p('This question is particularly important in highly competitive categories. If dozens of similar products are already available on Amazon, simply being present on the platform will not be enough.'),
          p('You need a clear competitive advantage. This could come from the product itself, its quality, pricing, brand positioning, messaging, design, functionality, or the overall customer experience.'),
        ],
      },
      {
        heading: 'Selling on Amazon Also Means Investing in Advertising',
        blocks: [
          p('One common misconception is that simply listing a product on Amazon is enough for customers to find it.'),
          p('In competitive categories, building organic visibility can be challenging. That is why Amazon Ads often plays an important role in a brand’s sales strategy.'),
          p('Advertising can help increase product visibility, attract new customers, test keywords, and generate valuable data that can later be used to optimise the overall product offering.'),
          p('However, successful advertising is not simply about spending more.'),
          p('The key question is:'),
          questions('How much does it cost to acquire a sale, and what return are you getting on your advertising spend?'),
          p('This is why brands should monitor metrics such as ACOS, ROAS, CTR, CPC, and conversion rate, then allocate their budgets towards the activities delivering the strongest results.'),
        ],
      },
      {
        heading: 'What If You Are Already Selling on Amazon?',
        blocks: [
          p('For many brands, the challenge is not getting started on Amazon, but achieving results that justify their investment in the platform.'),
          p('Your products may already be listed on Amazon, yet sales could be falling short of expectations. Advertising costs may be too high, product listings may struggle to convert, and competitors may be growing faster.'),
          p('In this situation, increasing the advertising budget should not necessarily be your first response.'),
          p('Sometimes, the underlying problem lies elsewhere.'),
          p('It is worth examining the entire customer journey, from product discovery and clicks to the product detail page, conversion and profitability.'),
          questions('What is working? What is not? Where are we losing sales? What can we improve?'),
          p('Only once these questions have been answered should you decide where to invest next.'),
        ],
      },
      {
        heading: 'When Does It Make Sense to Start Selling on Amazon?',
        blocks: [
          p('Amazon can be an excellent sales channel if there is proven demand for your product, you can compete effectively, and you can achieve a sustainable profit margin after accounting for all relevant costs.'),
          p('Operational readiness is equally important. Selling on Amazon requires appropriate stock levels, reliable logistics, customer service, and a willingness to invest in marketing.'),
          p('It is also worth viewing Amazon as more than just another sales channel.'),
          p('For brands looking to expand beyond Poland, Amazon can become a valuable platform for international growth and a way to reach entirely new customer segments.'),
        ],
      },
      {
        heading: 'When Might Amazon Not Be the Right Choice?',
        blocks: [
          p('Not every brand needs to sell on Amazon.'),
          p('If demand for your product is limited, competition is exceptionally strong, margins cannot support the costs of selling and advertising, or the product is difficult and expensive to fulfil, selling on Amazon may not be the right business decision.'),
          p('Rather than treating Amazon as an essential sales channel, it is better to approach it as a strategic business investment.'),
          p('Start by assessing the opportunity, calculating the costs, and evaluating whether profitable, sustainable growth is realistically achievable.'),
        ],
      },
      {
        heading: 'Is It Worth Selling on Amazon? The Bottom Line',
        blocks: [
          p('In many cases, absolutely.'),
          p('But the real question is not, “Is Amazon a large marketplace?”'),
          p('We already know the answer to that.'),
          p('A much more useful question is:'),
          questions('“Is Amazon the right sales channel for my brand, and can we build a profitable business there?”'),
          p('The answer depends on your product, target market, competitive landscape, profit margins, and operational capabilities.'),
          p('That is why the best first step is not always creating an Amazon Seller Central account.'),
          lead('Sometimes, the smartest first step is assessing the opportunity.'),
        ],
      },
    ],
    closing: {
      heading: 'ADelier Commerce',
      blocks: [
        p('At ADelier Commerce, we help brands answer precisely that question.'),
        { type: 'p', text: 'We assess product potential, market conditions, competitors, pricing, keywords, and sales opportunities, then help turn those insights into a clear, actionable strategy.', link: { phrase: 'a clear, actionable strategy', to: href('en', 'brands') } },
        p('For brands already selling on Amazon, we also analyse product listings, advertising campaigns, and sales performance to identify areas for improvement.'),
        p('The goal is not simply to sell on Amazon.'),
        lead('It’s about understanding whether Amazon is the right sales channel for your brand — and how to make it a driver of sustainable, long-term growth.'),
      ],
    },
  },
  {
    slug: 'stoveshelf-from-50-units-to-10-million-on-amazon',
    locale: 'en',
    title: 'StoveShelf: From 50 Units to a $10 Million Amazon Business',
    category: 'Case study',
    published: '2026-11-19',
    modified: '2026-11-19',
    cover: {
      src: '/images/blog/stoveshelf-from-50-units-to-10-million-on-amazon.png',
      alt: 'A StoveShelf magnetic shelf holding spices, oils and a basil plant above a kitchen stove, next to an Amazon box and a rising sales chart.',
      width: 1672,
      height: 941,
    },
    sections: [
      {
        blocks: [
          p('Sometimes the biggest business opportunities start with a very simple idea.'),
          p('Scott Fleming, a Wisconsin woodworker, wanted more storage space in his kitchen. He created a simple prototype by attaching magnets to a piece of wood so it could sit on the backsplash behind his stove.'),
          p('He searched online to see if someone had already created something similar.'),
          p('He couldn’t find one.'),
          p('So he decided to turn the idea into a business.'),
        ],
      },
      {
        heading: 'From 50 units to almost no sales',
        blocks: [
          p('Fleming refined the product, eventually replacing the wood with metal, registered the StoveShelf domain and produced his first 50 units.'),
          p('But there was a problem.'),
          p('The product didn’t sell.'),
          p('He had expected word of mouth to take off, but most of his initial sales came from friends and family. The product seemed to work — but customers weren’t finding it.'),
          p('That was the turning point.'),
          lead('The problem wasn’t necessarily the product. It was visibility.'),
        ],
      },
      {
        heading: 'Amazon changed the trajectory',
        blocks: [
          p('In 2017, Fleming launched StoveShelf on Amazon.'),
          p('The difference was immediate. Within the first year, the business generated around $50,000 in sales. By 2020, annual sales had reached approximately $3 million.'),
          p('The company also invested in improving its Amazon presence.'),
          p('The original listing had basic photography. Over time, StoveShelf introduced higher-quality images, video and A+ Content.'),
          p('And the results kept improving.'),
          p('Eventually, the product started attracting attention outside Amazon too, including influencers and major publications. Amazon reports that StoveShelf has grown into a multimillion-dollar business with around $10 million in sales.'),
        ],
      },
      {
        heading: 'The lesson for brands',
        blocks: [
          p('The StoveShelf story highlights something important about selling on Amazon:'),
          lead('A good product is not enough.'),
          p('Customers need to be able to find it — and once they find it, the product page needs to convince them to buy.'),
          p('That means success on Amazon depends on much more than simply launching a product.'),
          p('It requires:'),
          p('Visibility — getting in front of the right customers.'),
          p('Strong listings — high-quality images, compelling copy and content that converts.'),
          p('Advertising — using PPC to generate relevant traffic and support growth.'),
          p('Data — understanding what customers are searching for and which campaigns and keywords are actually driving sales.'),
          p('Optimisation — continuously improving the listing and advertising strategy based on performance.'),
          p('StoveShelf also eventually turned to Fulfillment by Amazon (FBA) as order volumes grew. For Fleming, this removed much of the day-to-day burden of storing, packing and shipping orders and allowed him to focus on growing the business.'),
        ],
      },
      {
        heading: 'From a simple idea to a scalable business',
        blocks: [
          p('The most interesting part of the StoveShelf story isn’t simply the $10 million in sales.'),
          p('It’s the journey.'),
          p('A simple product. 50 first units. Almost no sales outside friends and family. A move to Amazon. Better listings and content. Growing visibility. PPC and Amazon tools. And eventually, a multimillion-dollar brand.'),
          p('Amazon didn’t invent the product.'),
          p('It provided the infrastructure and access to customers that allowed a simple idea to scale.'),
          lead('And that is one of the biggest opportunities Amazon offers brands today.'),
        ],
      },
    ],
  },
]

// The switcher reads lib/blog-registry.ts; it must describe exactly these articles.
for (const post of posts) {
  if (!blogTranslations.some((t) => t[post.locale] === post.slug)) {
    throw new Error(`lib/blog-registry.ts is missing ${post.locale}/${post.slug}`)
  }
}
for (const entry of blogTranslations) {
  for (const [l, slug] of Object.entries(entry)) {
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
