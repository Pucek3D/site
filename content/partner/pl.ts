import type { PartnerCopy } from './types'

/**
 * Translation of the English partner copy. Service and page names stay in
 * English in every language. Needs review by a native speaker before launch.
 */
export const pl: PartnerCopy = {
  signoff: 'ADelier Commerce — Amazon Advertising & Growth.',
  audiences: {
    brands: { title: 'Marki na Amazonie', summary: 'Zarządzanie PPC, audyty, walidacja rynku i szkolenia.' },
    agencies: {
      title: 'Agencje Amazon',
      summary: 'Zarządzanie kampaniami w modelu white-label i dedykowani specjaliści PPC.',
    },
  },
  pageNames: {
    ppc: 'Amazon PPC Management',
    agencies: 'Agency Partnerships',
    training: 'Amazon PPC Training',
    audits: 'Amazon Market Validation & Audits',
  },

  home: {
    hero: {
      eyebrow: 'Reklama i rozwój na Amazonie',
      title: 'Mądrzejsza reklama na Amazonie. Większa kontrola. Lepsze wyniki.',
      paragraphs: [
        'Pomagamy markom rozwijać się na Amazonie dzięki praktycznemu zarządzaniu PPC, dopasowanym strategiom reklamowym i stałej optymalizacji wyników.',
        'Pomagamy też agencjom Amazon skalować działalność dzięki zarządzaniu kampaniami w modelu white-label i dedykowanym specjalistom PPC.',
      ],
      closingLine: 'Każde konto jest inne. Twoja strategia reklamowa też powinna być.',
      primaryCta: 'Porozmawiajmy',
      secondaryCta: 'Poznaj nasze usługi',
    },
    autopilot: {
      title: 'Reklama na Amazonie jest zbyt ważna, by zostawić ją na autopilocie.',
      paragraphs: [
        'Konkurencja na Amazonie rośnie. Koszty reklamy idą w górę, marże są pod presją, a samo podnoszenie stawek czy zwiększanie budżetu rzadko jest odpowiedzią.',
        'Rentowny wzrost wymaga głębszego zrozumienia wyników kampanii, zachowań wyszukiwania, konkurencji oraz związku między reklamą a całkowitą sprzedażą.',
        'W ADelier Commerce podchodzimy do reklamy na Amazonie praktycznie i analitycznie. Patrzymy dalej niż wskaźniki pojedynczych kampanii, aby zrozumieć, co napędza wyniki, gdzie budżet jest marnowany i gdzie pojawiają się nowe możliwości.',
      ],
      closingLine: 'Nie tylko zarządzamy kampaniami. Aktywnie pracujemy nad tym, by były lepsze.',
    },
    whatWeDo: {
      title: 'Czym się zajmujemy',
      items: [
        {
          number: '01',
          name: 'Amazon PPC Management',
          tagline: 'Twoja reklama. Aktywnie zarządzana.',
          paragraphs: [
            'Zarządzamy kampaniami reklamowymi na Amazonie z naciskiem na efektywność, rentowność i trwały wzrost.',
            'Od struktury kampanii i targetowania słów kluczowych, przez optymalizację stawek i alokację budżetu, po raportowanie wyników — wykonujemy codzienną pracę, dzięki której Twoja reklama zmierza we właściwym kierunku.',
          ],
          bullets: [
            'Kampanie Sponsored Products, Sponsored Brands i Sponsored Display, tam gdzie to zasadne',
            'Analiza słów kluczowych i wyszukiwanych fraz',
            'Optymalizacja stawek i budżetu',
            'Struktura kampanii i strategia targetowania',
            'Analiza ACOS, ROAS i całkowitej sprzedaży',
            'Stała optymalizacja i przejrzyste raportowanie',
          ],
        },
        {
          number: '02',
          name: 'White-Label PPC Management for Agencies',
          tagline: 'Twoi klienci. Twoja marka. Nasza wiedza.',
          paragraphs: [
            'Współpracujemy z agencjami reklamy Amazon, które potrzebują niezawodnej realizacji kampanii bez rozbudowy własnych zespołów.',
            'Działamy w tle: prowadzimy bieżącą obsługę kampanii, monitorujemy wyniki i wdrażamy strategie optymalizacji pod marką Twojej agencji.',
            'Ty utrzymujesz relację z klientem. My pomagamy Ci wykonać pracę.',
          ],
        },
        {
          number: '03',
          name: 'Dedicated Amazon PPC Specialists',
          tagline: 'Rozbuduj zespół bez pełnych kosztów lokalnej rekrutacji.',
          paragraphs: [
            'Pomagamy agencjom Amazon budować zdolności operacyjne dzięki dedykowanym specjalistom PPC z Polski, którzy włączają się w ich istniejące zespoły i procesy.',
            'Niezależnie od tego, czy potrzebujesz jednego specjalisty, czy dodatkowych mocy do zarządzania kampaniami na wielu kontach, zapewniamy elastyczny sposób skalowania działalności przy konkurencyjnych kosztach.',
          ],
        },
        {
          number: '04',
          name: 'Amazon PPC Training',
          tagline: 'Zbuduj kompetencje we własnym zespole.',
          paragraphs: [
            'Markom, które wolą prowadzić reklamę na Amazonie we własnym zakresie, oferujemy praktyczne szkolenia, które rozwijają pewnych siebie, kompetentnych specjalistów PPC.',
            'Szkolenia obejmują strukturę kampanii, targetowanie słów kluczowych, strategie stawek, analizę wyników i zaawansowane techniki optymalizacji, z naciskiem na stosowanie wiedzy na prawdziwych kontach reklamowych.',
          ],
        },
        {
          number: '05',
          name: 'Amazon Market Validation & Account Audits',
          tagline: 'Podejmuj lepsze decyzje, zanim zainwestujesz więcej.',
          paragraphs: [
            'Rozważasz wprowadzenie produktu na Amazon? Już się reklamujesz, ale nie masz pewności, czy konto działa tak, jak powinno?',
            'Zapewniamy niezależną analizę, która pomaga zrozumieć szansę, wskazać nieefektywności i ustalić priorytety kolejnych kroków.',
            'Nasze usługi obejmują walidację rynku i produktu przed wprowadzeniem, audyty kondycji ofert, audyty efektywności reklamy oraz konkretne rekomendacje.',
          ],
        },
      ],
    },
    approach: {
      title: 'Bardziej praktyczne podejście do Amazon PPC',
      subtitle: 'Bez autopilota. Bez strategii uniwersalnych dla wszystkich.',
      intro: 'Wierzymy, że skuteczna reklama na Amazonie wymaga uwagi, analizy i stałego dostosowywania.',
      items: [
        {
          title: 'Indywidualna uwaga',
          body: 'Każda marka, produkt i rynek mierzy się z innymi wyzwaniami. Budujemy strategie wokół Twoich celów, marż, konkurencji i możliwości wzrostu.',
        },
        {
          title: 'Aktywna optymalizacja',
          body: 'Stale monitorujemy wyniki kampanii i wprowadzamy przemyślane zmiany w stawkach, budżetach, targetowaniu i strukturze kampanii.',
        },
        {
          title: 'Wyniki ponad ACOS',
          body: 'ACOS i ROAS są ważne, ale nie pokazują pełnego obrazu. Rozpatrujemy wyniki reklamy razem z całkowitą sprzedażą, rentownością i szerszymi celami biznesowymi.',
        },
        {
          title: 'Jasna komunikacja',
          body: 'Wiesz, nad czym pracujemy, co widzimy i co rekomendujemy. Stawiamy na przystępną wiedzę, regularny kontakt i przejrzyste raportowanie.',
        },
        {
          title: 'Strategia poparta realizacją',
          body: 'Rekomendacje mają wartość tylko wtedy, gdy przekładają się na działanie. Łączymy analityczne myślenie z praktycznym zarządzaniem kampaniami.',
        },
      ],
    },
    audiences: {
      title: 'Stworzone dla marek. Zaprojektowane, by skalować agencje.',
      brands: {
        title: 'Dla marek na Amazonie',
        paragraphs: [
          'Niezależnie od tego, czy przygotowujesz się do startu na Amazonie, chcesz poprawić istniejące konto reklamowe, czy budujesz zespół wewnętrzny — zapewniamy wiedzę i praktyczne wsparcie, które pomogą Ci pójść naprzód.',
        ],
        cta: 'Poznaj usługi dla marek',
      },
      agencies: {
        title: 'Dla agencji Amazon',
        paragraphs: [
          'Zwiększ możliwości zarządzania kampaniami bez konieczności natychmiastowej rekrutacji i budowy całego zespołu wewnętrznego.',
          'Od realizacji kampanii w modelu white-label po dedykowanych specjalistów PPC — pomagamy agencjom skalować się efektywnie, zachowując relacje z klientami.',
        ],
        cta: 'Poznaj współpracę z agencjami',
      },
    },
    final: {
      title: 'Porozmawiajmy o Twoim rozwoju na Amazonie.',
      paragraphs: [
        'Niezależnie od tego, czy potrzebujesz lepszych wyników reklamy, dodatkowych mocy PPC, czy pomocy w rozwoju kompetencji zespołu — chcemy zrozumieć Twoje cele.',
        'Powiedz nam, gdzie jesteś dziś i co chcesz osiągnąć. Omówimy najlepszy sposób współpracy.',
      ],
      cta: 'Umów rozmowę wstępną',
    },
  },

  ppc: {
    hero: {
      title: 'Zarządzanie Amazon PPC, które wykracza poza podstawy',
      subtitle: 'Aktywne zarządzanie. Indywidualne strategie. Mierzalne postępy.',
      paragraphs: [
        'Reklama na Amazonie jest coraz bardziej konkurencyjna. Efektywny wzrost wymaga czegoś więcej niż podnoszenia stawek, zwiększania budżetów czy stosowania tych samych reguł optymalizacji na każdym koncie.',
        'Pomagamy markom podejmować lepsze decyzje reklamowe dzięki praktycznemu zarządzaniu, dopasowanym strategiom targetowania i stałej analizie wyników.',
      ],
    },
    approach: {
      title: 'Nasze podejście',
      items: [
        {
          title: 'Najpierw zrozum biznes',
          body: 'Zaczynamy od zrozumienia Twoich produktów, marż, konkurencji, historii reklamowej i celów biznesowych. Dzięki temu budujemy podejście zgodne z Twoimi priorytetami handlowymi.',
        },
        {
          title: 'Zbuduj właściwą strukturę kampanii',
          body: 'Przeglądamy organizację kampanii, pokrycie słów kluczowych, metody targetowania i formaty reklamowe, aby znaleźć możliwości lepszej kontroli i skuteczniejszej alokacji budżetu.',
        },
        {
          title: 'Optymalizuj stale',
          body: 'Monitorujemy wyniki, analizujemy wyszukiwane frazy, dostosowujemy stawki, zarządzamy budżetami i szukamy możliwości poprawy efektywności lub przechwycenia dodatkowego popytu.',
        },
        {
          title: 'Patrz dalej niż wskaźniki reklamowe',
          body: 'ACOS i ROAS są ważne, ale reklama powinna wspierać cały biznes. Oceniając wyniki, bierzemy pod uwagę całkowitą sprzedaż, rentowność, wyniki organiczne i cele wzrostu.',
        },
        {
          title: 'Komunikuj jasno',
          body: 'Zapewniamy przejrzyste raportowanie, wyjaśniamy nasze decyzje i omawiamy z Tobą szanse oraz wyzwania. Zawsze powinieneś rozumieć, co dzieje się na Twoim koncie reklamowym i dlaczego.',
        },
      ],
    },
    manage: {
      title: 'Czym zarządzamy',
      items: [
        'Sponsored Products',
        'Sponsored Brands',
        'Sponsored Display i inne dostępne, odpowiednie rozwiązania reklamowe',
        'Targetowanie słów kluczowych i produktów',
        'Targetowanie konkurencji',
        'Optymalizacja stawek i budżetu',
        'Analiza wyszukiwanych fraz i targetowanie wykluczające',
        'Struktura kampanii i raportowanie wyników',
      ],
      note: 'Dokładny zakres zależy od Twojego marketplace’u, konfiguracji konta, produktów i celów reklamowych.',
    },
    who: {
      title: 'Z kim współpracujemy',
      paragraphs: [
        'Współpracujemy z markami na Amazonie, które chcą bardziej zaangażowanego partnera reklamowego — czy to w celu poprawy istniejących kampanii, wykorzystania nowych możliwości, czy wprowadzenia bardziej uporządkowanego podejścia do PPC.',
        'Skupiamy się na praktycznych usprawnieniach, świadomych decyzjach i długoterminowym rozwoju konta, a nie na samym wydawaniu przydzielonego budżetu.',
      ],
    },
    final: {
      title: 'Gotowy na bardziej praktyczne podejście?',
      paragraphs: ['Przyjrzyjmy się Twojej obecnej sytuacji i omówmy, gdzie specjalistyczne wsparcie Amazon PPC może coś zmienić.'],
      cta: 'Omów swoje cele reklamowe',
    },
  },

  agencies: {
    hero: {
      title: 'Skaluj swoją agencję Amazon bez skalowania kosztów stałych',
      subtitle: 'Zespół PPC Twojej agencji, rozszerzony.',
      paragraphs: [
        'Rozwijaj działania reklamowe na Amazonie dzięki dedykowanym specjalistom PPC i zarządzaniu kampaniami w modelu white-label z Polski.',
        'Pomagamy agencjom Amazon z USA i Wielkiej Brytanii zwiększać moce realizacyjne, obsługiwać więcej kont klientów i poprawiać efektywność operacyjną bez natychmiastowych kosztów i złożoności rozbudowy lokalnych zespołów.',
      ],
    },
    ways: {
      title: 'Dwa sposoby współpracy z nami',
      whiteLabel: {
        name: '1. White-Label Amazon PPC Management',
        tagline: 'Ty zarządzasz relacją z klientem. My zarządzamy kampaniami.',
        paragraphs: [
          'Nasz zespół działa w tle jako przedłużenie Twojej agencji: prowadzi codzienną obsługę reklam, a Ty zachowujesz kontrolę nad strategią i relacją z klientem.',
        ],
        listLabel: 'W czym możemy pomóc:',
        items: [
          'Codzienne monitorowanie i optymalizacja kampanii',
          'Zarządzanie stawkami i budżetem',
          'Analiza słów kluczowych i wyszukiwanych fraz',
          'Usprawnienia struktury kampanii',
          'Analiza wyników i raportowanie',
          'Wdrażanie strategii reklamowych Twojego zespołu',
        ],
        idealFor:
          'Idealne dla agencji, które mają klientów, strategie kont i ambicje wzrostu, ale potrzebują dodatkowych mocy realizacyjnych.',
      },
      specialists: {
        name: '2. Dedicated Poland-Based PPC Specialists',
        tagline: 'Wykwalifikowane wsparcie PPC. Bardziej konkurencyjne koszty zatrudnienia.',
        paragraphs: [
          'Buduj moce operacyjne dzięki dedykowanym specjalistom z Polski, którzy pracują w ramach procesów, struktur raportowania i kanałów komunikacji Twojej agencji.',
          'Zamiast rekrutować każdą rolę lokalnie, możesz sięgnąć po talenty PPC z polskiego rynku pracy i włączyć dedykowanych specjalistów do istniejącego zespołu.',
          'W zależności od współpracy specjaliści mogą wspierać realizację kampanii, monitorowanie kont, raportowanie, optymalizację i inne uzgodnione zadania PPC.',
        ],
        listLabel: 'Korzyści dla Twojej agencji:',
        items: [
          'Konkurencyjne koszty zatrudnienia w porównaniu z rekrutacją w USA',
          'Dodatkowe moce bez budowy całego lokalnego zespołu',
          'Elastyczne zasoby w miarę rozwoju portfela klientów',
          'Komunikacja w języku angielskim',
          'Dedykowane wsparcie dopasowane do Twoich wewnętrznych procesów',
        ],
      },
    },
    why: {
      title: 'Dlaczego warto z nami współpracować?',
      items: [
        {
          title: 'Praktyczne rozszerzenie Twojego zespołu',
          body: 'Skupiamy się na pracy operacyjnej potrzebnej do sprawnego prowadzenia kont reklamowych, dzięki czemu Twój zespół seniorów może skoncentrować się na strategii, relacjach z klientami i rozwoju biznesu.',
        },
        {
          title: 'Praktyczne podejście',
          body: 'Nie wierzymy w ustawianie kampanii i zostawianie ich bez nadzoru. Stawiamy na aktywne zarządzanie, monitorowanie wyników i stałą optymalizację.',
        },
        {
          title: 'Elastyczna współpraca',
          body: 'Zacznij od wsparcia w zarządzaniu kampaniami lub od dedykowanego specjalisty, a następnie rozszerzaj współpracę wraz ze zmianą potrzeb.',
        },
        {
          title: 'Partnerskie podejście',
          body: 'Chcemy stać się niezawodną częścią Twojej realizacji: pracujemy według Twoich standardów, szanujemy Twoje relacje z klientami i wspieramy długoterminowy rozwój agencji.',
        },
      ],
    },
    final: {
      title: 'Porozmawiajmy o Twoich potrzebach.',
      paragraphs: [
        'Opowiedz nam o swojej agencji, liczbie obsługiwanych kont i rodzaju wsparcia, którego szukasz.',
        'Omówimy model dopasowany do Twoich potrzeb operacyjnych i planów rozwoju.',
      ],
      cta: 'Omów współpracę z agencją',
    },
  },

  training: {
    hero: {
      title: 'Zbuduj wewnętrzne kompetencje Amazon PPC',
      subtitle: 'Rozwijaj umiejętności, by pewnie zarządzać reklamą na Amazonie.',
      paragraphs: [
        'Markom, które chcą prowadzić reklamę wewnętrznie, oferujemy praktyczne szkolenia, które rozwijają pracowników w kompetentnych specjalistów Amazon PPC.',
        'Nasze programy łączą podstawy reklamy, umiejętności analityczne i praktyczne techniki optymalizacji, pomagając zespołowi zrozumieć nie tylko, co zmienić, ale i dlaczego.',
      ],
    },
    tailored: {
      title: 'Szkolenia dopasowane do Twojego zespołu',
      items: [
        {
          title: 'Podstawy Amazon PPC',
          body: 'Poznaj formaty reklamowe, struktury kampanii, opcje targetowania, strategie stawek i kluczowe wskaźniki wyników.',
        },
        {
          title: 'Optymalizacja kampanii',
          body: 'Naucz się analizować wyniki, dostosowywać stawki i budżety, zarządzać wyszukiwanymi frazami i znajdować możliwości poprawy efektywności reklamy.',
        },
        {
          title: 'Zaawansowane strategie targetowania',
          body: 'Poznaj pozyskiwanie słów kluczowych, targetowanie wykluczające, targetowanie konkurencji, izolację słów kluczowych i bardziej zaawansowane podejścia do kampanii.',
        },
        {
          title: 'Analiza wyników',
          body: 'Rozwiń umiejętność interpretacji ACOS, ROAS, współczynników konwersji, sprzedaży z reklam i całkowitej sprzedaży, aby podejmować lepsze decyzje.',
        },
        {
          title: 'Praktyczne warsztaty na kontach',
          body: 'Zastosuj poznane koncepcje na prawdziwych kampaniach i danych konta, wskazując konkretne możliwości i opracowując wykonalny plan optymalizacji.',
        },
      ],
    },
    formats: {
      title: 'Elastyczne formy szkoleń',
      paragraphs: [
        'Formę dopasujemy do Twoich potrzeb — od szkoleń podstawowych dla nowych pracowników, przez zaawansowane warsztaty dla obecnych specjalistów PPC, po stały coaching zespołów wewnętrznych.',
        'Nasz cel jest prosty: pomóc Twoim pracownikom rozwinąć praktyczne umiejętności, które zastosują w Twoim biznesie.',
      ],
      cta: 'Omów swoje potrzeby szkoleniowe',
    },
  },

  audits: {
    hero: {
      title: 'Podejmuj świadome decyzje dotyczące biznesu na Amazonie',
      subtitle: 'Zrozum szansę. Wskaż luki. Zaplanuj kolejny krok.',
      paragraphs: [
        'Niezależnie od tego, czy przygotowujesz wprowadzenie produktu, czy chcesz poprawić istniejący biznes na Amazonie, zapewniamy niezależną analizę, która pomaga podejmować świadome decyzje.',
      ],
    },
    validation: {
      title: 'Walidacja produktu i rynku na Amazonie',
      tagline: 'Oceń szansę, zanim zainwestujesz.',
      intro: 'Masz już produkt i rozważasz jego sprzedaż na Amazonie? Pomożemy ocenić jego potencjał na wybranym marketplace’ie.',
      listLabel: 'Nasza analiza może obejmować:',
      items: [
        'Popyt na istotne słowa kluczowe i zachowania wyszukiwania',
        'Otoczenie konkurencyjne i pozycjonowanie na rynku',
        'Ceny konkurencji i potencjalną cenę sprzedaży',
        'Szacowany potencjał sprzedaży na podstawie dostępnych danych rynkowych',
        'Konkurencję reklamową i potencjalne koszty pozyskania',
        'Orientacyjne scenariusze przychodów, kosztów i rentowności',
        'Praktyczne wymagania i kolejne kroki wejścia na Amazon',
      ],
      paragraphs: [
        'Koncentrujemy się na ocenie produktów, które już masz lub rozwijasz, a nie na wyszukiwaniu dla Ciebie pomysłów na produkty.',
        'Efektem jest jaśniejszy obraz szansy, kluczowych ryzyk i założeń, które trzeba zweryfikować przed wprowadzeniem.',
      ],
    },
    audits: {
      title: 'Audyty konta i reklamy na Amazonie',
      tagline: 'Zrozum, co działa, co nie działa i co można poprawić.',
      intro: 'Jeśli już sprzedajesz na Amazonie, oceniamy Twoje obecne konto i konfigurację reklam, aby wskazać nieefektywności, problemy strukturalne i możliwości poprawy.',
      items: [
        {
          title: 'Audyt efektywności reklamy',
          body: 'Badamy strukturę kampanii, pokrycie słów kluczowych, targetowanie, stawki, alokację budżetu, wyniki wyszukiwanych fraz oraz wykorzystanie odpowiednich formatów reklamowych.',
        },
        {
          title: 'Audyt kondycji ofert',
          body: 'Przeglądamy kluczowe elementy ofert, takie jak tytuły produktów, zdjęcia, punkty opisu, jakość treści i inne czynniki, które mogą wpływać na konwersję i wyniki reklamy.',
        },
        {
          title: 'Konkretne rekomendacje',
          body: 'Otrzymujesz uporządkowany według priorytetów zestaw wniosków i rekomendacji, który pomaga ustalić, czym zająć się najpierw i na czym skupić wysiłki.',
        },
      ],
      closing:
        'Naszym celem nie jest samo dostarczenie dokumentu z audytu. Chodzi o to, by pomóc Ci zrozumieć Twoje konto i podejmować lepsze decyzje o kolejnych krokach.',
      cta: 'Zamów audyt Amazon',
    },
  },

  about: {
    hero: {
      title: 'Bardziej osobiste podejście do reklamy na Amazonie',
      subtitle: 'Wierzymy, że każda marka zasługuje na coś więcej niż autopilot.',
      paragraphs: [
        'Reklama na Amazonie nie jest zadaniem uniwersalnym. Każdy produkt, rynek, otoczenie konkurencyjne i cel biznesowy stawia inny zestaw wyzwań.',
      ],
    },
    paragraphs: [
      'Wierzymy, że skuteczne zarządzanie PPC wymaga ciekawości, analitycznego myślenia, dbałości o szczegóły i szczerego zainteresowania biznesem każdego klienta.',
      'Nasze podejście łączy uporządkowaną analizę wyników z praktyczną realizacją kampanii. Patrzymy na liczby, kwestionujemy założenia, szukamy możliwości i przekładamy wnioski na praktyczne działania.',
      'Cenimy bliską współpracę, bezpośrednią komunikację i jasne zrozumienie, co oznacza sukces dla każdego klienta.',
    ],
    forBrands: 'Dla marek oznacza to partnera reklamowego, który poświęca czas, by zrozumieć ich biznes.',
    forAgencies: 'Dla agencji oznacza to niezawodne rozszerzenie zespołu, zaangażowane w jakość realizacji i efektywność operacyjną.',
    goal: 'Naszym celem jest pomaganie firmom w podejmowaniu lepszych decyzji reklamowych, efektywniejszym wykorzystaniu zasobów i budowaniu mocniejszych fundamentów wzrostu na Amazonie.',
    closing: ['Przemyślana strategia. Aktywne zarządzanie. Indywidualna uwaga.', 'Tak podchodzimy do reklamy na Amazonie.'],
  },
}
