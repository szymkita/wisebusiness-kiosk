export interface AutomationItem {
  title: string;
  desc: string;
  icon: string;
}

export interface IndustryData {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  color: string;
  demoId?: string;
  intro: string;
  automations: AutomationItem[];
  stats: { label: string; value: string }[];
}

export const industries: Record<string, IndustryData> = {
  finance: {
    id: 'finance',
    name: 'Finanse',
    tagline: 'Bankowość, ubezpieczenia, fintech',
    icon: 'dollar-sign',
    color: '#10b981',
    demoId: 'finance',
    intro: 'Sektor finansowy to jeden z najbardziej regulowanych i wymagających obszarów. Automatyzujemy procesy, które pochłaniają setki godzin miesięcznie — od raportowania, przez compliance, po obsługę klienta.',
    automations: [
      { title: 'Raportowanie finansowe', desc: 'Automatyczne generowanie raportów KPI, P&L, cash flow w real-time zamiast ręcznego zbierania danych z wielu systemów', icon: 'bar-chart' },
      { title: 'Compliance i KYC/AML', desc: 'Weryfikacja tożsamości klientów, screening sankcyjny i monitoring transakcji z automatycznym flagowaniem podejrzanych operacji', icon: 'shield' },
      { title: 'Obsługa faktur', desc: 'OCR faktur, automatyczne księgowanie, matching z zamówieniami i generowanie płatności — bez ręcznego przepisywania', icon: 'layers' },
      { title: 'Onboarding klientów', desc: 'Cyfrowy proces otwierania konta, podpisywanie umów online, weryfikacja dokumentów przez AI', icon: 'users' },
      { title: 'Windykacja i przypomnienia', desc: 'Automatyczne sekwencje przypomnień o płatnościach, eskalacja spraw i generowanie wezwań do zapłaty', icon: 'bell' },
      { title: 'Dashboardy zarządcze', desc: 'Pulpity z kluczowymi wskaźnikami finansowymi w czasie rzeczywistym — dostępne na tablecie i desktopie', icon: 'monitor' },
    ],
    stats: [
      { label: 'Średnia oszczędność czasu', value: '70%' },
      { label: 'Redukcja błędów', value: '95%' },
      { label: 'ROI w pierwszym roku', value: '340%' },
    ],
  },
  logistics: {
    id: 'logistics',
    name: 'Logistyka',
    tagline: 'Transport, łańcuch dostaw, magazyny',
    icon: 'truck',
    color: '#3b82f6',
    demoId: 'logistics',
    intro: 'W logistyce liczy się każda minuta i każdy kilometr. Automatyzujemy planowanie tras, śledzenie przesyłek i zarządzanie magazynem — żeby Twoja flota pracowała mądrzej, nie ciężej.',
    automations: [
      { title: 'Optymalizacja tras', desc: 'Algorytmy planowania tras uwzględniające ruch, okna czasowe dostaw, pojemność pojazdów i priorytety klientów', icon: 'map-pin' },
      { title: 'Tracking przesyłek', desc: 'Śledzenie floty GPS w real-time z automatycznymi powiadomieniami dla klientów o statusie i ETA dostawy', icon: 'truck' },
      { title: 'Zarządzanie magazynem', desc: 'Automatyczna inwentaryzacja, optymalizacja rozmieszczenia towaru, picking listy i integracja z WMS', icon: 'package' },
      { title: 'Dokumentacja transportowa', desc: 'Automatyczne generowanie CMR, listów przewozowych, dokumentów celnych i raportów dla spedytorów', icon: 'layers' },
      { title: 'Serwis i przeglądy floty', desc: 'Monitoring stanu technicznego pojazdów, automatyczne przypomnienia o przeglądach i planowanie serwisów', icon: 'settings' },
      { title: 'Rozliczenia i fakturowanie', desc: 'Automatyczne kalkulacje kosztów transportu, generowanie faktur per trasa i rozliczenia z podwykonawcami', icon: 'dollar-sign' },
    ],
    stats: [
      { label: 'Redukcja kosztów paliwa', value: '28%' },
      { label: 'Wzrost terminowości', value: '97%' },
      { label: 'Czas planowania tras', value: '-65%' },
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    tagline: 'Sklepy online, marketplace, omnichannel',
    icon: 'shopping-cart',
    color: '#f59e0b',
    demoId: 'ecommerce',
    intro: 'E-commerce to walka o każdą sekundę ładowania i każdy procent konwersji. Automatyzujemy procesy sprzedażowe, marketing i fulfillment, żeby Twój sklep sprzedawał więcej przy mniejszym nakładzie pracy.',
    automations: [
      { title: 'Zarządzanie produktami', desc: 'Masowe importy, aktualizacje cen i stanów, synchronizacja między kanałami sprzedaży i marketplace\'ami', icon: 'package' },
      { title: 'Marketing automation', desc: 'Automatyczne kampanie email/SMS, porzucone koszyki, rekomendacje produktów AI i segmentacja klientów', icon: 'zap' },
      { title: 'Obsługa zamówień', desc: 'Automatyczny processing zamówień, generowanie etykiet wysyłkowych, tracking i powiadomienia dla klientów', icon: 'shopping-cart' },
      { title: 'Cennik i promocje', desc: 'Dynamiczne ceny oparte na popycie, automatyczne promocje, kupony i programy lojalnościowe', icon: 'trending-up' },
      { title: 'Obsługa klienta', desc: 'Chatboty AI, automatyczne odpowiedzi na FAQ, eskalacja do człowieka i system ticketowy', icon: 'users' },
      { title: 'Analityka sprzedaży', desc: 'Dashboardy z konwersją, AOV, LTV, kohortami klientów i prognozami sprzedaży', icon: 'bar-chart' },
    ],
    stats: [
      { label: 'Wzrost konwersji', value: '+65%' },
      { label: 'Czas obsługi zamówienia', value: '-80%' },
      { label: 'Wzrost przychodów', value: '+120%' },
    ],
  },
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Medycyna, telemedycyna, pharma',
    icon: 'activity',
    color: '#ef4444',
    demoId: 'healthcare',
    intro: 'Ochrona zdrowia wymaga najwyższych standardów bezpieczeństwa i niezawodności. Automatyzujemy procesy administracyjne, żeby lekarze mogli skupić się na pacjentach, a nie na papierach.',
    automations: [
      { title: 'Elektroniczna dokumentacja', desc: 'EDM zgodna z RODO, integracja z NFZ (eWUŚ), automatyczne generowanie skierowań i zwolnień', icon: 'layers' },
      { title: 'Rejestracja pacjentów', desc: 'Online booking wizyt, automatyczne przypomnienia SMS, system kolejkowy i optymalizacja grafiku lekarzy', icon: 'clock' },
      { title: 'Telemedycyna', desc: 'Wideokonferencje z pacjentami, e-recepty, e-skierowania i zdalny monitoring parametrów zdrowotnych', icon: 'monitor' },
      { title: 'Rozliczenia z NFZ', desc: 'Automatyczne kodowanie procedur, generowanie sprawozdań, walidacja i przesyłanie do systemu NFZ', icon: 'dollar-sign' },
      { title: 'Zarządzanie lekami', desc: 'Monitoring stanów magazynowych leków, automatyczne zamówienia, kontrola dat ważności i interakcji', icon: 'heart' },
      { title: 'Wyniki i badania', desc: 'Automatyczny odbiór wyników z laboratoriów, powiadomienia pacjentów i integracja z systemem HIS', icon: 'activity' },
    ],
    stats: [
      { label: 'Czas rejestracji', value: '-70%' },
      { label: 'Teleporady miesięcznie', value: '4000+' },
      { label: 'Satysfakcja pacjentów', value: '4.8/5' },
    ],
  },
  education: {
    id: 'education',
    name: 'Edukacja',
    tagline: 'E-learning, LMS, platformy szkoleniowe',
    icon: 'book-open',
    color: '#8b5cf6',
    intro: 'Nowoczesna edukacja to nie tylko treści online. To personalizacja ścieżek nauki, automatyzacja administracji i analityka postępów — żeby uczenie było skuteczniejsze.',
    automations: [
      { title: 'Platforma e-learning', desc: 'LMS z kursami wideo, quizami, certyfikatami i ścieżkami nauki dopasowanymi do poziomu ucznia', icon: 'monitor' },
      { title: 'Automatyzacja oceniania', desc: 'Automatyczne sprawdzanie testów, generowanie raportów postępów i alertów dla nauczycieli', icon: 'check-circle' },
      { title: 'Rekrutacja i zapisy', desc: 'Formularze online, automatyczna weryfikacja dokumentów, generowanie umów i harmonogramów', icon: 'users' },
      { title: 'Komunikacja z rodzicami', desc: 'Automatyczne powiadomienia o ocenach, frekwencji, wydarzeniach i płatnościach', icon: 'bell' },
      { title: 'Zarządzanie biblioteką', desc: 'Katalog online, system wypożyczeń, automatyczne przypomnienia o zwrotach', icon: 'book-open' },
      { title: 'Raportowanie i analityka', desc: 'Dashboardy z postępami uczniów, statystykami kursów i efektywnością nauczania', icon: 'bar-chart' },
    ],
    stats: [
      { label: 'Wzrost ukończeń kursów', value: '+45%' },
      { label: 'Czas administracji', value: '-60%' },
      { label: 'Satysfakcja uczniów', value: '4.6/5' },
    ],
  },
  manufacturing: {
    id: 'manufacturing',
    name: 'Produkcja',
    tagline: 'Automatyzacja, Industry 4.0, MES',
    icon: 'layers',
    color: '#06b6d4',
    intro: 'Każda godzina przestoju to tysiące złotych strat. Automatyzujemy monitoring maszyn, planowanie produkcji i kontrolę jakości, żeby Twoja fabryka działała na pełnych obrotach.',
    automations: [
      { title: 'Monitoring OEE', desc: 'Pomiar efektywności maszyn w real-time — dostępność, wydajność, jakość na jednym dashboardzie', icon: 'bar-chart' },
      { title: 'Predykcja awarii', desc: 'Czujniki IoT + model ML przewidujący usterki z wyprzedzeniem 24-48h — serwis zanim się zepsuje', icon: 'cpu' },
      { title: 'Planowanie produkcji', desc: 'Automatyczne harmonogramowanie zleceń, optymalizacja kolejności i alokacja zasobów', icon: 'clock' },
      { title: 'Kontrola jakości', desc: 'Wizja komputerowa do inspekcji produktów, automatyczne odrzucanie wadliwych sztuk', icon: 'check-circle' },
      { title: 'Zarządzanie magazynem', desc: 'Automatyczne śledzenie surowców i wyrobów, punkty reorderowe i integracja z dostawcami', icon: 'package' },
      { title: 'Raportowanie produkcji', desc: 'Automatyczne raporty zmianowe, KPI produkcyjne i analiza trendów dla managementu', icon: 'trending-up' },
    ],
    stats: [
      { label: 'Redukcja przestojów', value: '-60%' },
      { label: 'Wzrost OEE', value: '+35%' },
      { label: 'ROI', value: '14 mies.' },
    ],
  },
  realestate: {
    id: 'realestate',
    name: 'Nieruchomości',
    tagline: 'PropTech, zarządzanie, smart building',
    icon: 'home',
    color: '#ec4899',
    intro: 'Zarządzanie nieruchomościami to setki powtarzalnych procesów — od wystawiania ofert, przez rozliczenia, po obsługę najemców. Automatyzujemy to wszystko.',
    automations: [
      { title: 'Publikacja ogłoszeń', desc: 'Jedno kliknięcie — oferta leci na Otodom, OLX, Gratka i 10 innych portali jednocześnie', icon: 'globe' },
      { title: 'CRM dla agentów', desc: 'Automatyczne przypisywanie leadów, follow-upy, śledzenie statusów transakcji i prowizji', icon: 'users' },
      { title: 'Zarządzanie najemcami', desc: 'Portal najemcy, automatyczne faktury czynszu, przypomnienia o płatnościach i zgłoszenia usterek', icon: 'home' },
      { title: 'Smart building', desc: 'Zarządzanie energią, HVAC, oświetleniem i bezpieczeństwem budynku z jednego panelu', icon: 'settings' },
      { title: 'Dokumenty i umowy', desc: 'Generowanie umów z szablonów, podpisy elektroniczne, archiwum dokumentów z wyszukiwaniem', icon: 'layers' },
      { title: 'Rozliczenia i raporty', desc: 'Automatyczne rozliczenia mediów, funduszu remontowego, generowanie deklaracji PIT', icon: 'dollar-sign' },
    ],
    stats: [
      { label: 'Czas publikacji ofert', value: '-90%' },
      { label: 'Terminowość płatności', value: '+40%' },
      { label: 'Obsługa zgłoszeń', value: '-55%' },
    ],
  },
  horeca: {
    id: 'horeca',
    name: 'HoReCa',
    tagline: 'Gastronomia, hotelarstwo, turystyka',
    icon: 'coffee',
    color: '#f97316',
    intro: 'Restauracje i hotele żyją z doświadczenia gościa. Automatyzujemy zaplecze — zamówienia, rezerwacje, magazyn, rozliczenia — żebyś mógł skupić się na tym, co najważniejsze.',
    automations: [
      { title: 'Rezerwacje online', desc: 'System rezerwacji stolików/pokoi z kalendarzem, automatycznymi potwierdzeniami i przypomnieniami SMS', icon: 'clock' },
      { title: 'Zamówienia i POS', desc: 'Tablet kelnerski, kitchen display, system kolejkowy i integracja z kasą fiskalną', icon: 'monitor' },
      { title: 'Zarządzanie menu', desc: 'Cyfrowe menu z alergenami, automatyczna kalkulacja food costu i sugestie cen', icon: 'coffee' },
      { title: 'Magazyn i zamówienia', desc: 'Automatyczne listy zakupowe na podstawie sprzedaży, kontrola stanów i dat ważności', icon: 'package' },
      { title: 'Kadry i grafiki', desc: 'Planowanie zmian, rejestracja czasu pracy, automatyczne rozliczenia godzin i nadgodzin', icon: 'users' },
      { title: 'Opinie i marketing', desc: 'Automatyczne zbieranie opinii, odpowiedzi na recenzje Google i kampanie lojalnościowe', icon: 'heart' },
    ],
    stats: [
      { label: 'Wzrost rezerwacji', value: '+50%' },
      { label: 'Food cost', value: '-18%' },
      { label: 'Czas obsługi stolika', value: '-30%' },
    ],
  },
};
