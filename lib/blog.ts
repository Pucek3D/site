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
  /** Bulleted list; items are kept exactly as written, punctuation included. */
  | { type: 'list'; items: string[] }

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
const list = (...items: string[]): Block => ({ type: 'list', items })

const posts: Post[] = [
  {
    slug: 'czy-reklama-na-amazonie-to-koniecznosc',
    locale: 'pl',
    title: 'Czy reklama na Amazonie to konieczność?',
    category: 'Amazon PPC',
    published: '2026-11-27',
    modified: '2026-11-27',
    seo: {
      title: 'Czy reklama na Amazonie to konieczność? Amazon PPC | ADelier',
      description: 'Czy można sprzedawać na Amazonie bez reklamy? Sprawdź, jaką rolę pełni Amazon PPC przy launchu, budżecie i budowaniu sprzedaży organicznej.',
      ogTitle: 'Czy reklama na Amazonie to konieczność? | ADelier Commerce',
      ogDescription: 'Reklama na Amazonie nie jest obowiązkiem, ale w wielu kategoriach jest niezbędna do skalowania sprzedaży. Dowiedz się, jaką rolę powinna pełnić w Twojej strategii.',
      keywords: [
        'reklama Amazon',
        'Amazon PPC',
        'reklamy Amazon Ads',
        'sprzedaż na Amazon',
        'Sponsored Products',
        'budżet reklamowy Amazon',
      ],
    },
    cover: {
      src: '/images/blog/czy-reklama-na-amazonie-to-koniecznosc-16x9.png',
      alt: 'Grafika ADelier Commerce „Czy reklama na Amazonie to konieczność?” – laptop z wynikami Amazon, na których wyróżniony jest produkt oznaczony jako Sponsored, oraz rosnący wykres słupkowy.',
  width: 1672,
  height: 941,
    },
    sections: [
      {
        blocks: [
          p('Czy można sprzedawać na Amazonie bez reklamy? Oczywiście. Pytanie brzmi jednak: czy można w ten sposób skutecznie rosnąć?'),
          p('Amazon różni się od tradycyjnego sklepu internetowego. Klient przychodzi na platformę z konkretną intencją zakupową, ale jednocześnie ma do wyboru tysiące podobnych produktów. Dlatego nawet bardzo dobry produkt może pozostać niewidoczny, jeśli nie pojawi się przed właściwym klientem we właściwym momencie.'),
          lead('I właśnie tutaj zaczyna się rola reklamy.'),
        ],
      },
      {
        heading: 'Nowy produkt bez reklamy ma trudniej',
        blocks: [
          p('Wyobraźmy sobie, że wprowadzamy na Amazon nowy produkt. Mamy dobrą jakość, atrakcyjną cenę, profesjonalne zdjęcia i dobrze przygotowaną ofertę.'),
          p('Problem?'),
          lead('Amazon jeszcze o tym produkcie „nie wie”.'),
          p('Produkt nie ma historii sprzedaży, niewiele recenzji, nie ma wysokiej pozycji organicznej i nie posiada jeszcze wystarczającej ilości danych, które pozwoliłyby algorytmowi ocenić jego potencjał.'),
          p('Reklama pozwala skrócić tę drogę.'),
          p('Dzięki Amazon PPC możemy kupić widoczność i zacząć generować ruch oraz sprzedaż, a jednocześnie zbierać dane dotyczące:'),
          list('słów kluczowych,', 'zainteresowania klientów,', 'konwersji,', 'poziomu sprzedaży,', 'konkurencyjności cenowej,', 'skuteczności poszczególnych kampanii.'),
          p('Dlatego w przypadku nowych produktów reklama jest często jednym z najważniejszych elementów launchu.'),
        ],
      },
      {
        heading: 'Ale reklama nie powinna być „kołem ratunkowym”',
        blocks: [
          p('To bardzo ważne.'),
          p('Jeżeli produkt nie sprzedaje się bez reklamy, nie zawsze oznacza to, że trzeba zwiększyć budżet.'),
          p('Problem może znajdować się gdzie indziej.'),
          p('Na przykład:'),
          questions('produkt → oferta → cena → listing → reklama → sprzedaż'),
          p('Jeżeli listing ma słabą konwersję, reklama tylko doprowadzi więcej osób do strony, która nie przekonuje ich do zakupu.'),
          p('Jeżeli cena jest niekonkurencyjna, zwiększenie budżetu reklamowego również może niewiele zmienić.'),
          p('Jeżeli produkt nie odpowiada na rzeczywistą potrzebę rynku, nawet najlepsza kampania PPC nie rozwiąże problemu.'),
          p('Dlatego Amazon PPC powinno być częścią szerszej strategii sprzedaży, a nie próbą „kupienia” sprzedaży za wszelką cenę.'),
        ],
      },
      {
        heading: 'A co z organiczną sprzedażą?',
        blocks: [
          p('Długoterminowo właśnie ona powinna być jednym z celów reklamy.'),
          p('Amazon analizuje wiele sygnałów związanych ze sprzedażą i zachowaniem klientów. Skuteczna kampania może pomóc zwiększyć widoczność produktu, wygenerować sprzedaż i zdobyć dane, które później wspierają rozwój organiczny.'),
          p('Dlatego dobrze zarządzana reklama powinna działać jak akcelerator, a nie jak stała podpórka.'),
  p('Celem nie jest: „Musimy cały czas płacić za każdą sprzedaż.”'),
          p('Celem jest:'),
          quote('„Wykorzystujemy reklamę, żeby zwiększać sprzedaż i jednocześnie budować silniejszą pozycję produktu.”'),
        ],
      },
      {
        heading: 'Czy każdy produkt potrzebuje dużego budżetu?',
        blocks: [
          p('Nie.'),
          p('I tutaj często pojawia się największe nieporozumienie.'),
          p('Reklama na Amazonie nie oznacza automatycznie ogromnego budżetu.'),
          p('Budżet powinien zależeć między innymi od:'),
          list('kategorii,', 'konkurencji,', 'ceny produktu,', 'marży,', 'celów sprzedażowych,', 'etapu rozwoju produktu,', 'liczby konkurentów walczących o te same słowa kluczowe.'),
          p('Innego podejścia wymaga nowy produkt w bardzo konkurencyjnej kategorii, a innego produkt, który od lat generuje sprzedaż i posiada silną pozycję organiczną.'),
        ],
      },
      {
        heading: 'Kiedy można ograniczyć reklamę?',
        blocks: [
          p('Istnieją sytuacje, w których marka może zmniejszyć udział PPC w sprzedaży.'),
          p('Jeżeli produkt ma:'),
          list('dużą liczbę opinii,', 'wysoką konwersję,', 'silną pozycję organiczną,', 'rozpoznawalność marki,', 'stabilną sprzedaż organiczną,'),
          p('można bardziej selektywnie podchodzić do reklamowania.'),
          p('Nie oznacza to jednak, że PPC przestaje być potrzebne.'),
          p('Reklama może nadal służyć do: obrony brandu, zdobywania nowych klientów, promocji nowych produktów, zwiększania udziału w kategorii czy reagowania na działania konkurencji.'),
        ],
      },
      {
        heading: 'Amazon PPC to nie tylko Sponsored Products',
        blocks: [
          p('Reklama na Amazonie daje dziś znacznie więcej możliwości niż podstawowe kampanie produktowe.'),
          p('W zależności od strategii marka może korzystać między innymi z:'),
          list(
            'Sponsored Products – promocji konkretnych produktów w wynikach wyszukiwania i na stronach produktów.',
            'Sponsored Brands – budowania widoczności marki i kierowania ruchu do Brand Store lub określonych produktów.',
            'Sponsored Display – docierania do klientów na podstawie ich zachowań zakupowych i zainteresowań.',
            'Amazon DSP – bardziej zaawansowanego rozwiązania pozwalającego budować kampanie skierowane do określonych grup odbiorców na Amazonie i poza nim.',
          ),
          p('Właściwe wykorzystanie tych narzędzi zależy od etapu rozwoju marki i jej celów biznesowych.'),
        ],
      },
      {
        heading: 'Najważniejsze pytanie nie brzmi: „Czy reklamować?”',
        blocks: [
          p('Lepsze pytanie brzmi:'),
          questions('„Jaką rolę reklama powinna pełnić w naszej strategii Amazon?”'),
          p('Dla jednej marki będzie to przede wszystkim launch nowych produktów.'),
          p('Dla innej – obrona najważniejszych słów brandowych.'),
          p('Dla kolejnej – zwiększenie udziału w kategorii.'),
          p('Jeszcze inna marka będzie wykorzystywać PPC przede wszystkim do generowania nowych klientów i zwiększania sprzedaży.'),
          p('Dlatego nie ma jednej odpowiedzi dotyczącej idealnego poziomu wydatków reklamowych.'),
          p('Reklama na Amazonie nie jest obowiązkiem.'),
          p('Ale w wielu kategoriach jest niezbędnym narzędziem do osiągnięcia widoczności i skalowania sprzedaży.'),
          p('Kluczem nie jest więc samo wydawanie pieniędzy na reklamy.'),
          lead('Kluczem jest wydawanie ich tam, gdzie mogą realnie przyczynić się do wzrostu marki.'),
        ],
      },
    ],
    closing: {
      heading: 'ADelier Commerce',
      blocks: [
        { type: 'p', text: 'W ADelier Commerce pomagamy markom nie tylko zarządzać kampaniami Amazon PPC, ale przede wszystkim zrozumieć, gdzie reklama może przynieść największą wartość i jak połączyć ją z szerszą strategią sprzedaży na Amazonie.', link: { phrase: 'zarządzać kampaniami Amazon PPC', to: href('pl', 'brands') } },
      ],
    },
  },
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
    slug: 'stoveshelf-from-50-units-to-10-million-on-amazon',
    locale: 'en',
    title: 'StoveShelf: From 50 Units to a $10 Million Amazon Business',
    category: 'Case study',
    published: '2026-11-19',
    modified: '2026-11-19',
    seo: {
      title: 'StoveShelf Amazon Success Story: From 50 Units to $10M',
      description: 'Discover how StoveShelf grew from 50 units into a multimillion-dollar Amazon business, with lessons in product visibility, A+ Content and FBA.',
      ogTitle: 'StoveShelf: From 50 Units to a $10 Million Amazon Business',
      ogDescription: 'From 50 initial units to a multimillion-dollar Amazon business. Discover the StoveShelf story and the lessons brands can learn about visibility, listings and scalable fulfilment.',
      keywords: [
        'StoveShelf Amazon success story',
        'StoveShelf Amazon business',
        'how StoveShelf grew on Amazon',
        'Amazon seller success story',
        'Amazon product visibility',
        'Amazon A+ Content',
        'Fulfillment by Amazon',
      ],
    },
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
  return all.flatMap((s) => [s.heading ?? '', ...s.blocks.map((b) => (b.type === 'list' ? b.items.join(' ') : b.text))]).join(' ')
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
