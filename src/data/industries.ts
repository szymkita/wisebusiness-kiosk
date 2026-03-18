export interface AutomationItem {
  title: string;
  desc: string;
  icon: string;
}

export interface Challenge {
  problem: string;
  solution: string;
}

export interface ProcessStep {
  title: string;
  desc: string;
  icon: string;
}

export interface Benefit {
  title: string;
  value: string;
  desc: string;
  icon: string;
}

export interface Integration {
  name: string;
  category: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface IndustryData {
  id: string;
  name: string;
  tagline: string;
  headline: string;
  icon: string;
  color: string;
  demoId?: string;
  intro: string;
  introExtended: string;
  automations: AutomationItem[];
  stats: { label: string; value: string; prefix?: string; suffix?: string }[];
  challenges: Challenge[];
  process: ProcessStep[];
  benefits: Benefit[];
  integrations: Integration[];
  faq: FAQ[];
  caseSnippet: {
    company: string;
    industry: string;
    result: string;
    quote: string;
  };
}

export const industries: Record<string, IndustryData> = {
  finance: {
    id: 'finance',
    name: 'Finanse',
    tagline: 'Bankowość, ubezpieczenia, fintech',
    headline: 'Automatyzacja, która zmienia sektor finansowy',
    icon: 'dollar-sign',
    color: '#10b981',
    demoId: 'finance',
    intro: 'Sektor finansowy to jeden z najbardziej regulowanych i wymagających obszarów. Automatyzujemy procesy, które pochłaniają setki godzin miesięcznie — od raportowania, przez compliance, po obsługę klienta.',
    introExtended: 'Nowoczesne instytucje finansowe mierzą się z rosnącą presją regulacyjną, oczekiwaniami klientów dotyczącymi natychmiastowej obsługi i koniecznością redukcji kosztów operacyjnych. Nasze rozwiązania łączą AI, RPA i integracje systemowe, żeby Twój zespół mógł skupić się na strategii zamiast na ręcznym przetwarzaniu danych.',
    automations: [
      { title: 'Raportowanie finansowe', desc: 'Automatyczne generowanie raportów KPI, P&L, cash flow w real-time zamiast ręcznego zbierania danych z wielu systemów', icon: 'bar-chart' },
      { title: 'Compliance i KYC/AML', desc: 'Weryfikacja tożsamości klientów, screening sankcyjny i monitoring transakcji z automatycznym flagowaniem podejrzanych operacji', icon: 'shield' },
      { title: 'Obsługa faktur', desc: 'OCR faktur, automatyczne księgowanie, matching z zamówieniami i generowanie płatności — bez ręcznego przepisywania', icon: 'layers' },
      { title: 'Onboarding klientów', desc: 'Cyfrowy proces otwierania konta, podpisywanie umów online, weryfikacja dokumentów przez AI', icon: 'users' },
      { title: 'Windykacja i przypomnienia', desc: 'Automatyczne sekwencje przypomnień o płatnościach, eskalacja spraw i generowanie wezwań do zapłaty', icon: 'bell' },
      { title: 'Dashboardy zarządcze', desc: 'Pulpity z kluczowymi wskaźnikami finansowymi w czasie rzeczywistym — dostępne na tablecie i desktopie', icon: 'monitor' },
    ],
    stats: [
      { label: 'Średnia oszczędność czasu', value: '70', suffix: '%' },
      { label: 'Redukcja błędów', value: '95', suffix: '%' },
      { label: 'ROI w pierwszym roku', value: '340', suffix: '%' },
      { label: 'Wdrożonych projektów', value: '45', suffix: '+' },
    ],
    challenges: [
      { problem: 'Ręczne raportowanie zajmuje dni zamiast minut', solution: 'Automatyczne raporty generowane w real-time z danych z wielu systemów' },
      { problem: 'Procesy KYC/AML pochłaniają zasoby całych zespołów', solution: 'AI weryfikuje dokumenty i flaguje podejrzane transakcje 24/7' },
      { problem: 'Błędy w księgowości kosztują tysiące', solution: 'OCR + automatyczny matching eliminuje 95% błędów ludzkich' },
      { problem: 'Onboarding klienta trwa tygodnie zamiast minut', solution: 'Cyfrowy proces od aplikacji do aktywnego konta w 15 minut' },
    ],
    process: [
      { title: 'Audyt procesów', desc: 'Mapujemy Twoje procesy finansowe, identyfikujemy wąskie gardła i obliczamy potencjał automatyzacji', icon: 'search' },
      { title: 'Projektowanie rozwiązania', desc: 'Tworzymy architekturę systemu z uwzględnieniem regulacji, bezpieczeństwa i integracji z istniejącymi narzędziami', icon: 'code' },
      { title: 'Wdrożenie i testy', desc: 'Budujemy i testujemy rozwiązanie na danych testowych, potem pilotaż na wybranym dziale', icon: 'settings' },
      { title: 'Skalowanie i optymalizacja', desc: 'Rozszerzamy na całą organizację, monitorujemy KPI i stale optymalizujemy procesy', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Szybsze decyzje', value: '10x', desc: 'Raporty finansowe generowane w sekundach zamiast godzin', icon: 'zap' },
      { title: 'Pełna zgodność', value: '100%', desc: 'Automatyczny compliance z regulacjami KNF, RODO, AML', icon: 'shield' },
      { title: 'Mniej FTE', value: '-60%', desc: 'Redukcja nakładu pracy na procesach back-office', icon: 'users' },
      { title: 'Zero papierów', value: '0', desc: 'Pełna digitalizacja dokumentów i procesów', icon: 'file-text' },
    ],
    integrations: [
      { name: 'SAP', category: 'ERP' },
      { name: 'Comarch', category: 'ERP' },
      { name: 'Salesforce', category: 'CRM' },
      { name: 'PowerBI', category: 'BI' },
      { name: 'e-Deklaracje', category: 'Skarbówka' },
      { name: 'KIR / SWIFT', category: 'Płatności' },
    ],
    faq: [
      { q: 'Jak długo trwa wdrożenie?', a: 'Typowy projekt trwa 8-16 tygodni — od audytu po produkcyjne uruchomienie. MVP w 4-6 tygodni.' },
      { q: 'Czy spełniacie wymagania KNF?', a: 'Tak. Wszystkie nasze rozwiązania są projektowane z myślą o regulacjach KNF, RODO i AML od pierwszego dnia.' },
      { q: 'Co z bezpieczeństwem danych?', a: 'Szyfrowanie end-to-end, hosting w EU, audyty bezpieczeństwa, zgodność z ISO 27001.' },
    ],
    caseSnippet: {
      company: 'Firma z sektora fintech',
      industry: 'Finanse',
      result: 'Redukcja czasu raportowania z 3 dni do 15 minut',
      quote: 'Automatyzacja raportowania pozwoliła nam przesunąć 4 osoby z back-office do obsługi klienta.',
    },
  },
  logistics: {
    id: 'logistics',
    name: 'Logistyka',
    tagline: 'Transport, łańcuch dostaw, magazyny',
    headline: 'Inteligentna logistyka — szybciej, taniej, precyzyjniej',
    icon: 'truck',
    color: '#3b82f6',
    demoId: 'logistics',
    intro: 'W logistyce liczy się każda minuta i każdy kilometr. Automatyzujemy planowanie tras, śledzenie przesyłek i zarządzanie magazynem — żeby Twoja flota pracowała mądrzej, nie ciężej.',
    introExtended: 'Branża logistyczna stoi przed wyzwaniem rosnących kosztów paliwa, niedoboru kierowców i oczekiwań klientów dotyczących dostaw same-day. Nasze systemy wykorzystują algorytmy optymalizacji, IoT i AI do automatyzacji procesów, które dotychczas wymagały dziesiątek pracowników biurowych.',
    automations: [
      { title: 'Optymalizacja tras', desc: 'Algorytmy planowania tras uwzględniające ruch, okna czasowe dostaw, pojemność pojazdów i priorytety klientów', icon: 'map-pin' },
      { title: 'Tracking przesyłek', desc: 'Śledzenie floty GPS w real-time z automatycznymi powiadomieniami dla klientów o statusie i ETA dostawy', icon: 'truck' },
      { title: 'Zarządzanie magazynem', desc: 'Automatyczna inwentaryzacja, optymalizacja rozmieszczenia towaru, picking listy i integracja z WMS', icon: 'package' },
      { title: 'Dokumentacja transportowa', desc: 'Automatyczne generowanie CMR, listów przewozowych, dokumentów celnych i raportów dla spedytorów', icon: 'layers' },
      { title: 'Serwis i przeglądy floty', desc: 'Monitoring stanu technicznego pojazdów, automatyczne przypomnienia o przeglądach i planowanie serwisów', icon: 'settings' },
      { title: 'Rozliczenia i fakturowanie', desc: 'Automatyczne kalkulacje kosztów transportu, generowanie faktur per trasa i rozliczenia z podwykonawcami', icon: 'dollar-sign' },
    ],
    stats: [
      { label: 'Redukcja kosztów paliwa', value: '28', suffix: '%' },
      { label: 'Terminowość dostaw', value: '97', suffix: '%' },
      { label: 'Czas planowania tras', value: '65', prefix: '-', suffix: '%' },
      { label: 'Flot pod zarządzaniem', value: '120', suffix: '+' },
    ],
    challenges: [
      { problem: 'Trasy planowane ręcznie — nieoptymalne, kosztowne', solution: 'Algorytmy AI optymalizują trasy z uwzględnieniem 20+ parametrów w sekundy' },
      { problem: 'Brak widoczności — gdzie jest przesyłka?', solution: 'Real-time tracking z automatycznymi alertami dla klientów i dispatcherów' },
      { problem: 'Dokumentacja transportowa wymaga godzin ręcznej pracy', solution: 'Automatyczne generowanie CMR, WZ, faktur i raportów z danych GPS' },
      { problem: 'Serwis floty „po fakcie" — awarie w trasie', solution: 'Predykcyjne utrzymanie na podstawie danych z czujników IoT' },
    ],
    process: [
      { title: 'Analiza operacji', desc: 'Analizujemy Twoje trasy, procesy magazynowe i dokumentację, żeby znaleźć największe straty', icon: 'search' },
      { title: 'Integracja systemów', desc: 'Łączymy GPS, WMS, TMS i ERP w jeden spójny ekosystem z centralnym dashboardem', icon: 'code' },
      { title: 'Automatyzacja procesów', desc: 'Wdrażamy automatyzację planowania, trackingu, dokumentacji i rozliczeń', icon: 'settings' },
      { title: 'Ciągła optymalizacja', desc: 'Algorytmy uczą się na danych historycznych i stale poprawiają efektywność operacji', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Mniej kilometrów', value: '-25%', desc: 'Optymalne trasy oznaczają mniej paliwa i szybsze dostawy', icon: 'map-pin' },
      { title: 'Pełna widoczność', value: '360°', desc: 'Każda przesyłka i pojazd widoczne w czasie rzeczywistym', icon: 'eye' },
      { title: 'Szybsze rozliczenia', value: '3x', desc: 'Automatyczne fakturowanie zamiast ręcznego wprowadzania', icon: 'zap' },
      { title: 'Mniej reklamacji', value: '-70%', desc: 'Terminowość i transparentność eliminują niezadowolenie', icon: 'check-circle' },
    ],
    integrations: [
      { name: 'Baselinker', category: 'Fulfillment' },
      { name: 'SAP TM', category: 'TMS' },
      { name: 'DPD / InPost', category: 'Kurierzy' },
      { name: 'Google Maps', category: 'Mapy' },
      { name: 'Comarch WMS', category: 'Magazyn' },
      { name: 'Teltonika', category: 'IoT/GPS' },
    ],
    faq: [
      { q: 'Ile pojazdów musi mieć flota, żeby się opłacało?', a: 'Widzimy ROI już przy 10+ pojazdach. Przy 50+ oszczędności są spektakularne.' },
      { q: 'Czy integrujecie się z istniejącym TMS?', a: 'Tak — integrujemy się z SAP TM, Oracle TM, CarLo i większością popularnych TMS-ów.' },
      { q: 'Jak szybko widać efekty?', a: 'Pierwsze oszczędności na paliwie widoczne już po 2-3 tygodniach od uruchomienia optymalizacji tras.' },
    ],
    caseSnippet: {
      company: 'Firma spedycyjna',
      industry: 'Logistyka',
      result: 'Oszczędność 380 000 zł rocznie na paliwie',
      quote: 'Optymalizacja tras zmniejszyła nasze koszty paliwa o 28% — to był game changer.',
    },
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    tagline: 'Sklepy online, marketplace, omnichannel',
    headline: 'E-commerce na autopilocie — sprzedawaj więcej, pracuj mniej',
    icon: 'shopping-cart',
    color: '#f59e0b',
    demoId: 'ecommerce',
    intro: 'E-commerce to walka o każdą sekundę ładowania i każdy procent konwersji. Automatyzujemy procesy sprzedażowe, marketing i fulfillment, żeby Twój sklep sprzedawał więcej przy mniejszym nakładzie pracy.',
    introExtended: 'Nowoczesny e-commerce to nie tylko ładna strona. To ekosystem integracji — od PIM przez ERP po marketing automation. Pomagamy sklepom rosnąć bez proporcjonalnego zwiększania zespołu, automatyzując wszystko od listingu produktów po obsługę zwrotów.',
    automations: [
      { title: 'Zarządzanie produktami', desc: 'Masowe importy, aktualizacje cen i stanów, synchronizacja między kanałami sprzedaży i marketplace\'ami', icon: 'package' },
      { title: 'Marketing automation', desc: 'Automatyczne kampanie email/SMS, porzucone koszyki, rekomendacje produktów AI i segmentacja klientów', icon: 'zap' },
      { title: 'Obsługa zamówień', desc: 'Automatyczny processing zamówień, generowanie etykiet wysyłkowych, tracking i powiadomienia dla klientów', icon: 'shopping-cart' },
      { title: 'Cennik i promocje', desc: 'Dynamiczne ceny oparte na popycie, automatyczne promocje, kupony i programy lojalnościowe', icon: 'trending-up' },
      { title: 'Obsługa klienta', desc: 'Chatboty AI, automatyczne odpowiedzi na FAQ, eskalacja do człowieka i system ticketowy', icon: 'users' },
      { title: 'Analityka sprzedaży', desc: 'Dashboardy z konwersją, AOV, LTV, kohortami klientów i prognozami sprzedaży', icon: 'bar-chart' },
    ],
    stats: [
      { label: 'Wzrost konwersji', value: '65', prefix: '+', suffix: '%' },
      { label: 'Czas obsługi zamówienia', value: '80', prefix: '-', suffix: '%' },
      { label: 'Wzrost przychodów', value: '120', prefix: '+', suffix: '%' },
      { label: 'Sklepów obsłużonych', value: '80', suffix: '+' },
    ],
    challenges: [
      { problem: 'Aktualizacja stanów na 5 marketplace\'ach to koszmar', solution: 'Centralny PIM synchronizuje ceny, stany i opisy na wszystkich kanałach' },
      { problem: 'Porzucone koszyki — 70% klientów nie finalizuje', solution: 'Automatyczne sekwencje email/SMS odzyskują 15-25% porzuconych koszyków' },
      { problem: 'Obsługa klienta zalewa Cię powtarzalnymi pytaniami', solution: 'Chatbot AI obsługuje 80% zapytań, a reszta trafia do agenta z pełnym kontekstem' },
      { problem: 'Nie wiesz, które produkty promować', solution: 'AI analizuje marże, trendy i stany magazynowe i sugeruje optymalne promocje' },
    ],
    process: [
      { title: 'Audyt e-commerce', desc: 'Analizujemy Twój sklep, konwersje, customer journey i procesy fulfillmentu', icon: 'search' },
      { title: 'Mapa integracji', desc: 'Projektujemy ekosystem narzędzi — PIM, ERP, marketing automation, WMS', icon: 'code' },
      { title: 'Wdrożenie MVP', desc: 'Uruchamiamy najważniejsze automatyzacje w 4-6 tygodni i mierzymy efekty', icon: 'settings' },
      { title: 'Skalowanie', desc: 'Dodajemy kolejne kanały, automatyzacje i optymalizujemy na podstawie danych', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Więcej sprzedaży', value: '+65%', desc: 'Automatyzacja marketingu i personalizacja zwiększają konwersję', icon: 'trending-up' },
      { title: 'Mniej zwrotów', value: '-40%', desc: 'Lepsza komunikacja i śledzenie zmniejsza frustrację klientów', icon: 'check-circle' },
      { title: 'Skalowalność', value: '∞', desc: 'Sprzedawaj 10x więcej bez proporcjonalnego wzrostu zespołu', icon: 'zap' },
      { title: 'Omnichannel', value: '1 panel', desc: 'Zarządzaj wszystkimi kanałami z jednego miejsca', icon: 'monitor' },
    ],
    integrations: [
      { name: 'Baselinker', category: 'Integracje' },
      { name: 'Allegro', category: 'Marketplace' },
      { name: 'Shopify', category: 'Platforma' },
      { name: 'WooCommerce', category: 'Platforma' },
      { name: 'IdoSell', category: 'Platforma' },
      { name: 'Edrone', category: 'Marketing' },
    ],
    faq: [
      { q: 'Czy pracujecie z małymi sklepami?', a: 'Tak — mamy rozwiązania od małych sklepów (od 100 SKU) po duże enterprise z milionami produktów.' },
      { q: 'Ile kosztuje wdrożenie?', a: 'Zależy od zakresu — od 15 000 zł za podstawową automatyzację do 150 000 zł za pełny ekosystem.' },
      { q: 'Czy wspieracie B2B e-commerce?', a: 'Tak, mamy doświadczenie w B2B — cenniki kontrahentowe, ofertowanie, limity kredytowe.' },
    ],
    caseSnippet: {
      company: 'Sklep z elektroniką',
      industry: 'E-commerce',
      result: 'Wzrost przychodów o 120% w 6 miesięcy',
      quote: 'Automatyzacja marketingu i obsługi zamówień pozwoliła nam skalować bez zatrudniania nowych osób.',
    },
  },
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Medycyna, telemedycyna, pharma',
    headline: 'Technologia, która daje lekarzom czas na pacjentów',
    icon: 'activity',
    color: '#ef4444',
    demoId: 'healthcare',
    intro: 'Ochrona zdrowia wymaga najwyższych standardów bezpieczeństwa i niezawodności. Automatyzujemy procesy administracyjne, żeby lekarze mogli skupić się na pacjentach, a nie na papierach.',
    introExtended: 'System ochrony zdrowia tonie w biurokracji — lekarze spędzają więcej czasu na dokumentacji niż z pacjentami. Nasze rozwiązania digitalizują i automatyzują procesy administracyjne, zapewniając zgodność z RODO i wymaganiami NFZ, jednocześnie odciążając personel medyczny.',
    automations: [
      { title: 'Elektroniczna dokumentacja', desc: 'EDM zgodna z RODO, integracja z NFZ (eWUŚ), automatyczne generowanie skierowań i zwolnień', icon: 'layers' },
      { title: 'Rejestracja pacjentów', desc: 'Online booking wizyt, automatyczne przypomnienia SMS, system kolejkowy i optymalizacja grafiku lekarzy', icon: 'clock' },
      { title: 'Telemedycyna', desc: 'Wideokonferencje z pacjentami, e-recepty, e-skierowania i zdalny monitoring parametrów zdrowotnych', icon: 'monitor' },
      { title: 'Rozliczenia z NFZ', desc: 'Automatyczne kodowanie procedur, generowanie sprawozdań, walidacja i przesyłanie do systemu NFZ', icon: 'dollar-sign' },
      { title: 'Zarządzanie lekami', desc: 'Monitoring stanów magazynowych leków, automatyczne zamówienia, kontrola dat ważności i interakcji', icon: 'heart' },
      { title: 'Wyniki i badania', desc: 'Automatyczny odbiór wyników z laboratoriów, powiadomienia pacjentów i integracja z systemem HIS', icon: 'activity' },
    ],
    stats: [
      { label: 'Skrócenie rejestracji', value: '70', prefix: '-', suffix: '%' },
      { label: 'Teleporady miesięcznie', value: '4000', suffix: '+' },
      { label: 'Satysfakcja pacjentów', value: '4.8', suffix: '/5' },
      { label: 'Placówek obsłużonych', value: '35', suffix: '+' },
    ],
    challenges: [
      { problem: 'Lekarze spędzają 40% czasu na dokumentacji', solution: 'AI asystent generuje dokumentację z nagrania wizyty' },
      { problem: 'Pacjenci nie przychodzą na umówione wizyty (no-show)', solution: 'Automatyczne przypomnienia SMS/email redukują no-show o 60%' },
      { problem: 'Rozliczenia z NFZ to labirynt kodów i procedur', solution: 'System automatycznie koduje procedury i generuje sprawozdania' },
      { problem: 'Brak dostępu do historii pacjenta między placówkami', solution: 'Zunifikowana dokumentacja medyczna dostępna z każdego punktu' },
    ],
    process: [
      { title: 'Analiza placówki', desc: 'Mapujemy procesy administracyjne, rejestrację, dokumentację i rozliczenia', icon: 'search' },
      { title: 'Projekt systemu', desc: 'Projektujemy rozwiązanie zgodne z RODO, wymaganiami NFZ i standardami medycznymi', icon: 'code' },
      { title: 'Pilotaż', desc: 'Wdrażamy na wybranym oddziale/gabinecie, szkolimy personel i zbieramy feedback', icon: 'settings' },
      { title: 'Pełne wdrożenie', desc: 'Rozszerzamy na całą placówkę i integrujemy z zewnętrznymi systemami', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Więcej czasu na pacjenta', value: '+40%', desc: 'Mniej papierkowej roboty, więcej czasu na diagnozę i leczenie', icon: 'heart' },
      { title: 'Mniej no-show', value: '-60%', desc: 'Automatyczne przypomnienia zmniejszają absencję pacjentów', icon: 'check-circle' },
      { title: 'Telemedycyna', value: '24/7', desc: 'Dostęp do lekarza o każdej porze — teleporady i e-recepty', icon: 'monitor' },
      { title: 'RODO compliant', value: '100%', desc: 'Pełna zgodność z regulacjami ochrony danych medycznych', icon: 'shield' },
    ],
    integrations: [
      { name: 'NFZ (eWUŚ)', category: 'Ubezpieczenia' },
      { name: 'e-Recepta', category: 'P1' },
      { name: 'OSOZ', category: 'HIS' },
      { name: 'Kamsoft', category: 'Apteka' },
      { name: 'Zoom Health', category: 'Telemedycyna' },
      { name: 'HL7/FHIR', category: 'Standard' },
    ],
    faq: [
      { q: 'Czy system jest zgodny z RODO?', a: 'Tak — od architektury po hosting, wszystko projektowane z myślą o ochronie danych medycznych.' },
      { q: 'Czy integrujecie się z systemem NFZ?', a: 'Tak — pełna integracja z eWUŚ, P1 (e-Recepta, e-Skierowanie) i systemem sprawozdawczym.' },
      { q: 'Jak wygląda szkolenie personelu?', a: 'Zapewniamy szkolenia on-site i online, materiały wideo i wsparcie helpdesk przez 3 miesiące.' },
    ],
    caseSnippet: {
      company: 'Sieć przychodni',
      industry: 'Healthcare',
      result: 'Skrócenie czasu rejestracji o 70%, wzrost teleporad o 400%',
      quote: 'Lekarze w końcu mogą skupić się na pacjentach zamiast na wypełnianiu formularzy.',
    },
  },
  education: {
    id: 'education',
    name: 'Edukacja',
    tagline: 'E-learning, LMS, platformy szkoleniowe',
    headline: 'Edukacja przyszłości — spersonalizowana i zautomatyzowana',
    icon: 'book-open',
    color: '#8b5cf6',
    intro: 'Nowoczesna edukacja to nie tylko treści online. To personalizacja ścieżek nauki, automatyzacja administracji i analityka postępów — żeby uczenie było skuteczniejsze.',
    introExtended: 'Instytucje edukacyjne — od uczelni po firmy szkoleniowe — zmagają się z rosnącą liczbą uczniów, oczekiwaniami dotyczącymi personalizacji i koniecznością digitalizacji. Nasze rozwiązania automatyzują administrację, personalizują ścieżki nauki i dostarczają analitykę, która pomaga podejmować lepsze decyzje pedagogiczne.',
    automations: [
      { title: 'Platforma e-learning', desc: 'LMS z kursami wideo, quizami, certyfikatami i ścieżkami nauki dopasowanymi do poziomu ucznia', icon: 'monitor' },
      { title: 'Automatyzacja oceniania', desc: 'Automatyczne sprawdzanie testów, generowanie raportów postępów i alertów dla nauczycieli', icon: 'check-circle' },
      { title: 'Rekrutacja i zapisy', desc: 'Formularze online, automatyczna weryfikacja dokumentów, generowanie umów i harmonogramów', icon: 'users' },
      { title: 'Komunikacja z rodzicami', desc: 'Automatyczne powiadomienia o ocenach, frekwencji, wydarzeniach i płatnościach', icon: 'bell' },
      { title: 'Zarządzanie biblioteką', desc: 'Katalog online, system wypożyczeń, automatyczne przypomnienia o zwrotach', icon: 'book-open' },
      { title: 'Raportowanie i analityka', desc: 'Dashboardy z postępami uczniów, statystykami kursów i efektywnością nauczania', icon: 'bar-chart' },
    ],
    stats: [
      { label: 'Wzrost ukończeń kursów', value: '45', prefix: '+', suffix: '%' },
      { label: 'Czas administracji', value: '60', prefix: '-', suffix: '%' },
      { label: 'Satysfakcja uczniów', value: '4.6', suffix: '/5' },
      { label: 'Uczniów na platformach', value: '50K', suffix: '+' },
    ],
    challenges: [
      { problem: 'Każdy uczeń ma inny poziom — one-size-fits-all nie działa', solution: 'AI dopasowuje tempo i treści do indywidualnych postępów ucznia' },
      { problem: 'Administracja szkoły zajmuje więcej czasu niż nauczanie', solution: 'Automatyzacja zapisów, oceniania, raportowania i komunikacji z rodzicami' },
      { problem: 'Brak danych o efektywności nauczania', solution: 'Dashboardy z analityką zaangażowania, postępów i wyników na każdym poziomie' },
      { problem: 'Trudno utrzymać zaangażowanie w nauce online', solution: 'Gamifikacja, certyfikaty, rankingi i adaptacyjne ścieżki nauki' },
    ],
    process: [
      { title: 'Analiza potrzeb', desc: 'Badamy Twoje programy nauczania, procesy administracyjne i narzędzia IT', icon: 'search' },
      { title: 'Projekt platformy', desc: 'Projektujemy LMS/platformę z uwzględnieniem UX dla uczniów i nauczycieli', icon: 'code' },
      { title: 'Wdrożenie pilotażowe', desc: 'Uruchamiamy na wybranym kursie, zbieramy feedback i iterujemy', icon: 'settings' },
      { title: 'Rollout i szkolenia', desc: 'Wdrażamy na całej organizacji, szkolimy kadry i zapewniamy wsparcie', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Personalizacja', value: 'AI', desc: 'Każdy uczeń dostaje treści dopasowane do swojego poziomu', icon: 'user' },
      { title: 'Mniej administracji', value: '-60%', desc: 'Automatyczne zapisy, ocenianie i raportowanie', icon: 'zap' },
      { title: 'Lepsze wyniki', value: '+45%', desc: 'Wzrost ukończeń kursów dzięki adaptacyjnemu nauczaniu', icon: 'trending-up' },
      { title: 'Dostęp 24/7', value: 'Zawsze', desc: 'Nauka w dowolnym czasie i miejscu — desktop i mobile', icon: 'globe' },
    ],
    integrations: [
      { name: 'Moodle', category: 'LMS' },
      { name: 'Google Classroom', category: 'LMS' },
      { name: 'USOS', category: 'System dziekanatowy' },
      { name: 'Teams / Zoom', category: 'Wideo' },
      { name: 'Turnitin', category: 'Antyplagiat' },
      { name: 'SCORM/xAPI', category: 'Standard' },
    ],
    faq: [
      { q: 'Czy tworzycie platformy od zera?', a: 'Zarówno budujemy custom, jak i rozszerzamy istniejące LMS-y (Moodle, Canvas) o automatyzację.' },
      { q: 'Ile użytkowników obsługuje platforma?', a: 'Nasze platformy skalują się od 100 do 100 000+ użytkowników.' },
      { q: 'Czy wspieracie szkolenia firmowe?', a: 'Tak — mamy bogate doświadczenie w platformach szkoleniowych dla korporacji (onboarding, compliance).' },
    ],
    caseSnippet: {
      company: 'Platforma szkoleniowa',
      industry: 'Edukacja',
      result: 'Wzrost ukończeń kursów o 45%, redukcja administracji o 60%',
      quote: 'AI-owe ścieżki nauki to rewolucja — uczniowie są bardziej zaangażowani, a my mamy mniej pracy.',
    },
  },
  manufacturing: {
    id: 'manufacturing',
    name: 'Produkcja',
    tagline: 'Automatyzacja, Industry 4.0, MES',
    headline: 'Industry 4.0 — fabryka, która myśli za Ciebie',
    icon: 'layers',
    color: '#06b6d4',
    intro: 'Każda godzina przestoju to tysiące złotych strat. Automatyzujemy monitoring maszyn, planowanie produkcji i kontrolę jakości, żeby Twoja fabryka działała na pełnych obrotach.',
    introExtended: 'Producenci mierzą się z rosnącymi kosztami energii, brakami kadrowymi i presją na jakość. Nasze rozwiązania Industry 4.0 łączą IoT, AI i automatyzację procesów, żeby Twoja fabryka była bardziej wydajna, przewidywalna i odporna na zakłócenia.',
    automations: [
      { title: 'Monitoring OEE', desc: 'Pomiar efektywności maszyn w real-time — dostępność, wydajność, jakość na jednym dashboardzie', icon: 'bar-chart' },
      { title: 'Predykcja awarii', desc: 'Czujniki IoT + model ML przewidujący usterki z wyprzedzeniem 24-48h — serwis zanim się zepsuje', icon: 'cpu' },
      { title: 'Planowanie produkcji', desc: 'Automatyczne harmonogramowanie zleceń, optymalizacja kolejności i alokacja zasobów', icon: 'clock' },
      { title: 'Kontrola jakości', desc: 'Wizja komputerowa do inspekcji produktów, automatyczne odrzucanie wadliwych sztuk', icon: 'check-circle' },
      { title: 'Zarządzanie magazynem', desc: 'Automatyczne śledzenie surowców i wyrobów, punkty reorderowe i integracja z dostawcami', icon: 'package' },
      { title: 'Raportowanie produkcji', desc: 'Automatyczne raporty zmianowe, KPI produkcyjne i analiza trendów dla managementu', icon: 'trending-up' },
    ],
    stats: [
      { label: 'Redukcja przestojów', value: '60', prefix: '-', suffix: '%' },
      { label: 'Wzrost OEE', value: '35', prefix: '+', suffix: '%' },
      { label: 'ROI wdrożenia', value: '14', suffix: ' mies.' },
      { label: 'Linii produkcyjnych', value: '200', suffix: '+' },
    ],
    challenges: [
      { problem: 'Nieplanowane przestoje kosztują tysiące na godzinę', solution: 'Predykcyjne utrzymanie przewiduje awarie z 48h wyprzedzeniem' },
      { problem: 'OEE mierzone ręcznie — niedokładne i z opóźnieniem', solution: 'Automatyczny monitoring OEE w real-time z alertami przy spadkach' },
      { problem: 'Planowanie produkcji to arkusze Excel', solution: 'Algorytmy APS optymalizują sekwencję zleceń, przezbrojenia i zasoby' },
      { problem: 'Wadliwe produkty wykrywane za późno', solution: 'Wizja komputerowa wykrywa wady w linii — 99.5% skuteczności' },
    ],
    process: [
      { title: 'Audyt fabryki', desc: 'Analizujemy maszyny, procesy, dane i identyfikujemy największe straty', icon: 'search' },
      { title: 'Instrumentacja', desc: 'Instalujemy czujniki IoT, łączymy maszyny z siecią i budujemy warstwę danych', icon: 'cpu' },
      { title: 'Wdrożenie MES/APS', desc: 'Uruchamiamy system monitoringu, planowania i kontroli jakości', icon: 'settings' },
      { title: 'Optymalizacja AI', desc: 'Trenujemy modele predykcyjne na Twoich danych i stale poprawiamy efektywność', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Mniej przestojów', value: '-60%', desc: 'Predykcja awarii pozwala planować serwis zanim dojdzie do zatrzymania', icon: 'settings' },
      { title: 'Wyższa jakość', value: '99.5%', desc: 'Wizja komputerowa wyłapuje wady, których nie widzi ludzkie oko', icon: 'check-circle' },
      { title: 'Szybsze przezbrojenia', value: '-40%', desc: 'Optymalna kolejność zleceń minimalizuje czas przezbrojenia', icon: 'zap' },
      { title: 'Dane w real-time', value: 'Live', desc: 'Każda maszyna, każda zmiana — wszystko widoczne na dashboardzie', icon: 'monitor' },
    ],
    integrations: [
      { name: 'SAP PP', category: 'ERP' },
      { name: 'Siemens MindSphere', category: 'IoT' },
      { name: 'OPC UA', category: 'Protokół' },
      { name: 'AVEVA', category: 'SCADA' },
      { name: 'QAD', category: 'MES' },
      { name: 'Comarch ERP', category: 'ERP' },
    ],
    faq: [
      { q: 'Czy stare maszyny też można podłączyć?', a: 'Tak — instalujemy zewnętrzne czujniki na maszynach bez własnego IoT (retrofitting).' },
      { q: 'Jak długo trwa wdrożenie MES?', a: 'Pilotaż na jednej linii w 6-8 tygodni. Pełne wdrożenie fabryki — 3-6 miesięcy.' },
      { q: 'Czy potrzebujemy dedykowanego IT?', a: 'Nie — zapewniamy hosting, utrzymanie i wsparcie. Potrzebujemy tylko dostępu do sieci maszynowej.' },
    ],
    caseSnippet: {
      company: 'Producent komponentów',
      industry: 'Produkcja',
      result: 'Redukcja przestojów o 60%, wzrost OEE z 55% do 78%',
      quote: 'Predykcja awarii uratowała nas przed trzema poważnymi zatrzymaniami linii w pierwszym miesiącu.',
    },
  },
  realestate: {
    id: 'realestate',
    name: 'Nieruchomości',
    tagline: 'PropTech, zarządzanie, smart building',
    headline: 'PropTech — nieruchomości zarządzane inteligentnymi systemami',
    icon: 'home',
    color: '#ec4899',
    intro: 'Zarządzanie nieruchomościami to setki powtarzalnych procesów — od wystawiania ofert, przez rozliczenia, po obsługę najemców. Automatyzujemy to wszystko.',
    introExtended: 'Rynek nieruchomości przechodzi cyfrową transformację. Deweloperzy, zarządcy i agenci, którzy nie digitalizują swoich procesów, tracą klientów na rzecz tych, którzy to robią. Nasze rozwiązania PropTech automatyzują cały cykl życia nieruchomości — od sprzedaży/wynajmu po zarządzanie i rozliczenia.',
    automations: [
      { title: 'Publikacja ogłoszeń', desc: 'Jedno kliknięcie — oferta leci na Otodom, OLX, Gratka i 10 innych portali jednocześnie', icon: 'globe' },
      { title: 'CRM dla agentów', desc: 'Automatyczne przypisywanie leadów, follow-upy, śledzenie statusów transakcji i prowizji', icon: 'users' },
      { title: 'Zarządzanie najemcami', desc: 'Portal najemcy, automatyczne faktury czynszu, przypomnienia o płatnościach i zgłoszenia usterek', icon: 'home' },
      { title: 'Smart building', desc: 'Zarządzanie energią, HVAC, oświetleniem i bezpieczeństwem budynku z jednego panelu', icon: 'settings' },
      { title: 'Dokumenty i umowy', desc: 'Generowanie umów z szablonów, podpisy elektroniczne, archiwum dokumentów z wyszukiwaniem', icon: 'layers' },
      { title: 'Rozliczenia i raporty', desc: 'Automatyczne rozliczenia mediów, funduszu remontowego, generowanie deklaracji PIT', icon: 'dollar-sign' },
    ],
    stats: [
      { label: 'Czas publikacji ofert', value: '90', prefix: '-', suffix: '%' },
      { label: 'Terminowość płatności', value: '40', prefix: '+', suffix: '%' },
      { label: 'Czas obsługi zgłoszeń', value: '55', prefix: '-', suffix: '%' },
      { label: 'Nieruchomości w systemie', value: '5K', suffix: '+' },
    ],
    challenges: [
      { problem: 'Wystawianie ofert na 10 portalach to godziny ręcznej pracy', solution: 'Jedno kliknięcie publikuje ofertę wszędzie z synchronizacją zmian' },
      { problem: 'Najemcy dzwonią z każdą drobnostką — zalewają biuro', solution: 'Portal najemcy z systemem zgłoszeń, automatycznym statusowaniem i FAQ' },
      { problem: 'Rozliczenia mediów to Excel-koszmar co miesiąc', solution: 'Automatyczne odczyty, kalkulacje i generowanie rozliczeń per lokal' },
      { problem: 'Budynek zużywa za dużo energii', solution: 'Smart building z czujnikami IoT optymalizuje HVAC, oświetlenie i energię' },
    ],
    process: [
      { title: 'Analiza portfela', desc: 'Analizujemy Twój portfel nieruchomości, procesy zarządzania i narzędzia', icon: 'search' },
      { title: 'Projekt ekosystemu', desc: 'Projektujemy platformę łączącą CRM, zarządzanie najemcami i rozliczenia', icon: 'code' },
      { title: 'Wdrożenie MVP', desc: 'Uruchamiamy kluczowe moduły i migrujemy dane z istniejących systemów', icon: 'settings' },
      { title: 'Smart building', desc: 'Instalujemy czujniki IoT i uruchamiamy automatyzację budynku', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Szybsze wynajmy', value: '3x', desc: 'Szybsza publikacja i lepsza widoczność ofert na portalach', icon: 'zap' },
      { title: 'Mniej zaległości', value: '-65%', desc: 'Automatyczne przypomnienia i łatwe płatności online', icon: 'dollar-sign' },
      { title: 'Oszczędność energii', value: '-30%', desc: 'Smart building optymalizuje zużycie energii w budynkach', icon: 'settings' },
      { title: 'Lepsza obsługa', value: '4.5/5', desc: 'Portal najemcy z szybkim statusowaniem zgłoszeń', icon: 'heart' },
    ],
    integrations: [
      { name: 'Otodom', category: 'Portal' },
      { name: 'OLX', category: 'Portal' },
      { name: 'DOM.pl', category: 'Portal' },
      { name: 'eBOK', category: 'Zarządzanie' },
      { name: 'Autenti', category: 'Podpisy' },
      { name: 'KNX/BACnet', category: 'Smart building' },
    ],
    faq: [
      { q: 'Ile nieruchomości muszę zarządzać, żeby się opłacało?', a: 'Widzimy ROI już przy 20+ lokalach. Przy 100+ oszczędności są ogromne.' },
      { q: 'Czy wspieracie zarządców wspólnot?', a: 'Tak — mamy moduł do rozliczeń funduszu remontowego, głosowań i komunikacji z mieszkańcami.' },
      { q: 'Czy integrujecie się z księgowością?', a: 'Tak — eksport do Comarch, Sage, R2płatnik i innych systemów księgowych.' },
    ],
    caseSnippet: {
      company: 'Zarządca portfela',
      industry: 'Nieruchomości',
      result: 'Redukcja czasu administracji o 55%, wzrost terminowości płatności o 40%',
      quote: 'Portal najemcy zmienił nam życie — zamiast 200 telefonów dziennie, mamy 20.',
    },
  },
  horeca: {
    id: 'horeca',
    name: 'HoReCa',
    tagline: 'Gastronomia, hotelarstwo, turystyka',
    headline: 'Gastronomia i hotelarstwo na nowym poziomie',
    icon: 'coffee',
    color: '#f97316',
    intro: 'Restauracje i hotele żyją z doświadczenia gościa. Automatyzujemy zaplecze — zamówienia, rezerwacje, magazyn, rozliczenia — żebyś mógł skupić się na tym, co najważniejsze.',
    introExtended: 'Branża HoReCa boryka się z rotacją pracowników, rosnącymi kosztami produktów i oczekiwaniami gości dotyczącymi szybkiej, bezproblemowej obsługi. Nasze rozwiązania automatyzują operacje back-of-house, żeby Twój zespół mógł skupić się na front-of-house — czyli na goście.',
    automations: [
      { title: 'Rezerwacje online', desc: 'System rezerwacji stolików/pokoi z kalendarzem, automatycznymi potwierdzeniami i przypomnieniami SMS', icon: 'clock' },
      { title: 'Zamówienia i POS', desc: 'Tablet kelnerski, kitchen display, system kolejkowy i integracja z kasą fiskalną', icon: 'monitor' },
      { title: 'Zarządzanie menu', desc: 'Cyfrowe menu z alergenami, automatyczna kalkulacja food costu i sugestie cen', icon: 'coffee' },
      { title: 'Magazyn i zamówienia', desc: 'Automatyczne listy zakupowe na podstawie sprzedaży, kontrola stanów i dat ważności', icon: 'package' },
      { title: 'Kadry i grafiki', desc: 'Planowanie zmian, rejestracja czasu pracy, automatyczne rozliczenia godzin i nadgodzin', icon: 'users' },
      { title: 'Opinie i marketing', desc: 'Automatyczne zbieranie opinii, odpowiedzi na recenzje Google i kampanie lojalnościowe', icon: 'heart' },
    ],
    stats: [
      { label: 'Wzrost rezerwacji', value: '50', prefix: '+', suffix: '%' },
      { label: 'Redukcja food cost', value: '18', prefix: '-', suffix: '%' },
      { label: 'Czas obsługi stolika', value: '30', prefix: '-', suffix: '%' },
      { label: 'Lokali obsłużonych', value: '60', suffix: '+' },
    ],
    challenges: [
      { problem: 'Telefon dzwoni non-stop — goście chcą rezerwować online', solution: 'System rezerwacji 24/7 z automatycznym potwierdzeniem i przypomnieniem' },
      { problem: 'Food cost wymyka się spod kontroli', solution: 'Automatyczna kalkulacja food costu per danie + alerty przy przekroczeniu' },
      { problem: 'Grafiki pracownicze to chaos — ktoś ciągle nie przychodzi', solution: 'System planowania zmian z potwierdzeniami, zamianami i alertami o brakach' },
      { problem: 'Nie wiesz, co się sprzedaje, a co marnuje', solution: 'Analityka sprzedaży per danie, pora dnia, dzień tygodnia — i rekomendacje menu' },
    ],
    process: [
      { title: 'Analiza lokalu', desc: 'Wizyta w lokalu, analiza procesów, narzędzi i bolączek operacyjnych', icon: 'search' },
      { title: 'Projekt systemu', desc: 'Dobieramy moduły — POS, rezerwacje, magazyn, kadry — dopasowane do typu lokalu', icon: 'code' },
      { title: 'Instalacja i szkolenie', desc: 'Montujemy sprzęt, konfigurujemy system i szkolimy personel na miejscu', icon: 'settings' },
      { title: 'Optymalizacja menu', desc: 'Na podstawie danych sprzedaży optymalizujemy menu, ceny i zamówienia magazynowe', icon: 'trending-up' },
    ],
    benefits: [
      { title: 'Więcej rezerwacji', value: '+50%', desc: 'Goście rezerwują 24/7 online — nie musisz odbierać telefonu', icon: 'clock' },
      { title: 'Niższy food cost', value: '-18%', desc: 'Precyzyjne zamówienia i kontrola stanów eliminują marnotrawstwo', icon: 'dollar-sign' },
      { title: 'Szybsza obsługa', value: '-30%', desc: 'Tablet kelnerski i KDS przyspieszają obsługę stolika', icon: 'zap' },
      { title: 'Lepsze opinie', value: '4.7★', desc: 'Automatyczny follow-up po wizycie zbiera pozytywne opinie', icon: 'heart' },
    ],
    integrations: [
      { name: 'iKSOR', category: 'POS' },
      { name: 'POSbistro', category: 'POS' },
      { name: 'Booksy', category: 'Rezerwacje' },
      { name: 'Uber Eats', category: 'Delivery' },
      { name: 'Glovo', category: 'Delivery' },
      { name: 'TripAdvisor', category: 'Opinie' },
    ],
    faq: [
      { q: 'Czy to działa w małej restauracji?', a: 'Tak — mamy pakiety od single-location po sieci 50+ lokali.' },
      { q: 'Co z integracją z kasą fiskalną?', a: 'Integrujemy się z większością kas fiskalnych online (Novitus, Posnet, Elzab).' },
      { q: 'Czy wspieracie dark kitchens?', a: 'Tak — mamy rozwiązania dedykowane dla ghost/dark kitchens z wieloma markami na jednym zapleczu.' },
    ],
    caseSnippet: {
      company: 'Sieć restauracji',
      industry: 'HoReCa',
      result: 'Redukcja food costu o 18%, wzrost rezerwacji o 50%',
      quote: 'System rezerwacji i automatyczny magazyn to dwie rzeczy, które najbardziej zmieniły nasz biznes.',
    },
  },
};
