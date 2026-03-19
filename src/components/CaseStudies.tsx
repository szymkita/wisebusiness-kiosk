import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

interface Case {
  title: string;
  context: string;
  before: string;
  after: string;
  metricLabel: string;
  extras: { label: string; value: string }[];
}

interface Industry {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  cases: Case[];
}

const data: Industry[] = [
  {
    id: 'production', name: 'Produkcja & Przemysł', subtitle: 'Opakowania, metal, komponenty, żywność',
    icon: 'layers', color: '#06b6d4',
    cases: [
      {
        title: 'Harmonogram produkcji',
        context: 'Ręczne planowanie zleceń na 12 liniach w Excelu. Każda zmiana priorytetów = godziny przeplanowywania.',
        before: '3 dni', after: '15 min', metricLabel: 'czas ułożenia harmonogramu tygodniowego',
        extras: [{ label: 'Przezbrojenia', value: '-40%' }, { label: 'Pomyłki w kolejności', value: '-90%' }],
      },
      {
        title: 'Predykcyjne utrzymanie maszyn',
        context: 'Awarie wykrywane dopiero gdy maszyna stawała. Serwisanci reagowali zamiast zapobiegać.',
        before: '4.5h', after: '35 min', metricLabel: 'średni czas od wykrycia do naprawy',
        extras: [{ label: 'Przestoje', value: '-60%' }, { label: 'Wyprzedzenie predykcji', value: '48h' }],
      },
      {
        title: 'Cyfrowe protokoły jakości',
        context: 'Papierowe karty kontrolne, ręczne przepisywanie wyników. Audyt ISO = tydzień szukania dokumentów.',
        before: '25 min', after: '3 min', metricLabel: 'kontrola jakości jednej partii',
        extras: [{ label: 'Czas przygotowania audytu', value: '-85%' }, { label: 'Wykrywalność wad', value: '99.5%' }],
      },
      {
        title: 'Traceability produkcji end-to-end',
        context: 'Klient pyta o historię partii — odpowiedź po 3 godzinach szukania w papierach i systemach.',
        before: '3h', after: '10 sek', metricLabel: 'czas znalezienia pełnej genealogii partii',
        extras: [{ label: 'Zgodność ISO/IATF', value: '100%' }, { label: 'Reklamacje', value: '-70%' }],
      },
    ],
  },
  {
    id: 'transport', name: 'Transport & Logistyka', subtitle: 'Spedycja, flota, TSL, magazyny',
    icon: 'truck', color: '#3b82f6',
    cases: [
      {
        title: 'Optymalizacja tras i dyspozycja',
        context: 'Dyspozytor planuje trasy ręcznie na 200 pojazdów. 3h dziennie na telefony z kierowcami.',
        before: '40 min', after: '90 sek', metricLabel: 'planowanie jednej trasy',
        extras: [{ label: 'Terminowość dostaw', value: '72→97%' }, { label: 'Czas dyspozytora na rutynę', value: '-85%' }],
      },
      {
        title: 'Rozliczanie kierowców',
        context: 'Dane z tachografów, delegacje, diety — zbierane z papierów i pendrive\'ów. Księgowość zamyka miesiąc z opóźnieniem.',
        before: '5 dni', after: '4h', metricLabel: 'rozliczenie miesiąca dla całej floty',
        extras: [{ label: 'Błędy w rozliczeniach', value: '-95%' }, { label: 'Dane z tachografu', value: 'Auto-import' }],
      },
      {
        title: 'Śledzenie przesyłek dla klientów',
        context: 'Klient dzwoni z pytaniem "gdzie moja przesyłka?". Dyspozytor musi zadzwonić do kierowcy i oddzwonić.',
        before: '15 min', after: '0 min', metricLabel: 'czas obsługi zapytania o status',
        extras: [{ label: 'Zapytania telefoniczne', value: '-90%' }, { label: 'Satysfakcja klientów', value: '+40%' }],
      },
    ],
  },
  {
    id: 'ecommerce', name: 'E-commerce & Handel', subtitle: 'Sklepy online, marketplace, hurtownie',
    icon: 'shopping-cart', color: '#f59e0b',
    cases: [
      {
        title: 'Obsługa zamówień i fulfillment',
        context: '2000+ zamówień dziennie, 4 magazyny. Obsługa wymagała 12 osób — ręczne sprawdzanie stanów, przypisywanie magazynu, drukowanie etykiet.',
        before: '6h', after: '12 min', metricLabel: 'od zamówienia do gotowości wysyłki',
        extras: [{ label: 'Błędy kompletacji', value: '8%→0.3%' }, { label: 'Obsługa Black Friday', value: '8× wolumen, 0 nowych etatów' }],
      },
      {
        title: 'Synchronizacja stanów magazynowych',
        context: 'Sprzedaż na Allegro, własny sklep, hurtownia B2B — stany aktualizowane 2x dziennie. Overselling co tydzień.',
        before: '2× dziennie', after: 'Real-time', metricLabel: 'częstotliwość synchronizacji stanów',
        extras: [{ label: 'Overselling', value: '-98%' }, { label: 'Kanały sprzedaży', value: '1 źródło prawdy' }],
      },
      {
        title: 'Automatyczne cenowanie',
        context: 'Pricing manager ręcznie sprawdzał ceny konkurencji i aktualizował 4000 SKU. Tydzień pracy na jedną rundę cenową.',
        before: '5 dni', after: '15 min', metricLabel: 'pełna aktualizacja cen w katalogu',
        extras: [{ label: 'Częstotliwość repricing', value: 'Codziennie' }, { label: 'Marżowość', value: '+12%' }],
      },
    ],
  },
  {
    id: 'agencies', name: 'Agencje & Usługi B2B', subtitle: 'Marketing, consulting, prawo, doradztwo',
    icon: 'briefcase', color: '#8b5cf6',
    cases: [
      {
        title: 'Pipeline projektowy i statusy',
        context: 'PM-owie spędzali więcej czasu na zbieraniu statusów niż na dostarczaniu wartości. Klient pyta o progress — szukanie po Slacku.',
        before: '8h/tyg', after: '45 min/tyg', metricLabel: 'czas PM na raportowanie i statusy',
        extras: [{ label: 'Raport dla klienta', value: '2h→1 klik' }, { label: 'Alokacja zespołu', value: 'Data-driven' }],
      },
      {
        title: 'Zarządzanie sprawami klientów',
        context: 'Kancelaria prawna, 800+ aktywnych spraw. Terminy w Excelu. Ryzyko przegapienia terminu sądowego — realne i kosztowne.',
        before: '1.5h/dzień', after: '15 min/dzień', metricLabel: 'administracja per prawnik dziennie',
        extras: [{ label: 'Znalezienie dokumentu', value: '12min→8sek' }, { label: 'Przeoczone terminy', value: '0' }],
      },
      {
        title: 'Ofertowanie i follow-up',
        context: 'Handlowiec przygotowuje ofertę 2h, wysyła mailem, zapomina o follow-upie. 40% ofert ginie bez odpowiedzi.',
        before: '2h', after: '10 min', metricLabel: 'przygotowanie spersonalizowanej oferty',
        extras: [{ label: 'Follow-up', value: 'Automatyczny' }, { label: 'Konwersja ofert', value: '+35%' }],
      },
    ],
  },
  {
    id: 'finance', name: 'Finanse & Księgowość', subtitle: 'Biura rachunkowe, BPO, brokerzy',
    icon: 'dollar-sign', color: '#10b981',
    cases: [
      {
        title: 'Zamknięcie miesiąca',
        context: 'Biuro rachunkowe, 200+ klientów. Zbieranie faktur: mail, WhatsApp, kurier. Ręczne przepisywanie do systemu.',
        before: '3 dni', after: '4h', metricLabel: 'zamknięcie miesiąca per klient',
        extras: [{ label: 'Wprowadzanie faktury', value: '3min→15sek' }, { label: 'Brakujące dokumenty', value: 'Auto-remind' }],
      },
      {
        title: 'Uzgodnienia międzysystemowe',
        context: 'Dane w bankowości, systemie fakturowym i CRM. Ręczne uzgadnianie to 3 dni pracy i ryzyko błędu.',
        before: '3 dni', after: '20 min', metricLabel: 'pełne uzgodnienie danych klienta',
        extras: [{ label: 'Błędy w uzgodnieniach', value: '-95%' }, { label: 'Źródła danych', value: 'Auto-sync' }],
      },
      {
        title: 'Raportowanie finansowe',
        context: 'Zarząd czekał 3 dni robocze na raport miesięczny. Dane zbierane ręcznie z 8 systemów.',
        before: '3 dni', after: '10 sek', metricLabel: 'generowanie raportu finansowego',
        extras: [{ label: 'Dostępność danych', value: 'Real-time' }, { label: 'Błędy w danych', value: '-95%' }],
      },
    ],
  },
  {
    id: 'construction', name: 'Budownictwo & Nieruchomości', subtitle: 'Wykonawcy, deweloperzy, zarządcy',
    icon: 'home', color: '#ec4899',
    cases: [
      {
        title: 'Dziennik budowy i dokumentacja',
        context: 'Papierowy dziennik budowy, zdjęcia na telefonie kierownika, raporty w Wordzie. Szukanie dokumentu = godziny.',
        before: '45 min/dzień', after: '5 min/dzień', metricLabel: 'czas kierownika na dokumentację',
        extras: [{ label: 'Znalezienie protokołu', value: '30min→10sek' }, { label: 'Gotowość do kontroli', value: 'Zawsze' }],
      },
      {
        title: 'Kosztorysowanie i ofertowanie',
        context: 'Kosztorysant przygotowuje ofertę na przetarg 3-5 dni. Ręczne wyceny podwykonawców, ceny materiałów z zeszłego kwartału.',
        before: '4 dni', after: '6h', metricLabel: 'przygotowanie pełnego kosztorysu',
        extras: [{ label: 'Ceny materiałów', value: 'Aktualne, auto' }, { label: 'Dokładność wycen', value: '+30%' }],
      },
      {
        title: 'Zarządzanie podwykonawcami',
        context: 'Odbiory robót na kartce, rozliczenia w Excelu. Kto ile zrobił, co zostało — nikt nie ma pełnego obrazu.',
        before: '2h/tyg', after: '15 min/tyg', metricLabel: 'rozliczenie podwykonawców per projekt',
        extras: [{ label: 'Spory o zakresy', value: '-80%' }, { label: 'Statusy robót', value: 'Real-time' }],
      },
    ],
  },
  {
    id: 'gastro', name: 'Gastronomia & Spożywcza', subtitle: 'Restauracje, cukiernie, catering, produkcja',
    icon: 'coffee', color: '#f97316',
    cases: [
      {
        title: 'Zamówienia surowców i stany magazynowe',
        context: 'Szef kuchni zamawiał "na oko" — raz za dużo (marnowanie), raz za mało (brak dań w menu).',
        before: '1h/dzień', after: '5 min/dzień', metricLabel: 'czas na planowanie zakupów',
        extras: [{ label: 'Marnowanie surowców', value: '-45%' }, { label: 'Braki w menu', value: '-90%' }],
      },
      {
        title: 'Obsługa zamówień cateringowych',
        context: 'Zamówienie przez telefon → ręczne wpisanie → kuchnia → dostawa. Pomyłki, brak potwierdzeń, chaos logistyczny.',
        before: '30 min', after: '2 min', metricLabel: 'przyjęcie i potwierdzenie zamówienia',
        extras: [{ label: 'Pomyłki w zamówieniach', value: '-95%' }, { label: 'Logistyka dostaw', value: 'Auto-planowana' }],
      },
      {
        title: 'Rozliczenia produkcji i food cost',
        context: 'Food cost liczony raz w miesiącu, z opóźnieniem. Marże poszczególnych dań — zgadywanka.',
        before: 'Raz/miesiąc', after: 'Codziennie', metricLabel: 'częstotliwość kontroli food cost',
        extras: [{ label: 'Dokładność kalkulacji', value: '+40%' }, { label: 'Rentowność menu', value: 'Widoczna per danie' }],
      },
    ],
  },
  {
    id: 'it', name: 'IT & Software House', subtitle: 'Software house, SaaS, systemy, wdrożenia',
    icon: 'code', color: '#6366f1',
    cases: [
      {
        title: 'Delivery pipeline i CI/CD',
        context: 'Deployment ręczny, co 2 tygodnie. Każdy release = dzień stresu, ręczne testy, modlitwa.',
        before: 'Co 2 tyg', after: 'Kilka razy/dzień', metricLabel: 'częstotliwość deploymentu',
        extras: [{ label: 'Czas deploymentu', value: '4h→8min' }, { label: 'Rollback', value: '1 klik' }],
      },
      {
        title: 'Onboarding nowego developera',
        context: 'Nowy developer dostawał 15 linków do Confluence, 3 repo i życzenia powodzenia. Produktywny po 3 tygodniach.',
        before: '3 tyg', after: '3 dni', metricLabel: 'czas do pierwszego merge requesta',
        extras: [{ label: 'Setup środowiska', value: '1 dzień→30min' }, { label: 'Dokumentacja', value: 'Zawsze aktualna' }],
      },
      {
        title: 'Monitoring i incident response',
        context: 'Klient dzwoni że "nie działa" zanim ktokolwiek w zespole wie o problemie. SLA? Teoretyczne.',
        before: '45 min', after: '90 sek', metricLabel: 'czas od incydentu do reakcji',
        extras: [{ label: 'Wykrycie problemu', value: 'Przed klientem' }, { label: 'SLA compliance', value: '94→99.8%' }],
      },
    ],
  },
  {
    id: 'healthcare', name: 'Medycyna & Zdrowie', subtitle: 'Kliniki, gabinety, optyki, weterynaria',
    icon: 'activity', color: '#ef4444',
    cases: [
      {
        title: 'Rejestracja i umawianie wizyt',
        context: 'Recepcja na telefonie non-stop. Pacjenci czekają na linii, rezygnują. 30% wizyt to no-show bez przypomnienia.',
        before: '5 min', after: '30 sek', metricLabel: 'czas rejestracji jednego pacjenta',
        extras: [{ label: 'No-show', value: '30%→8%' }, { label: 'Rejestracja online', value: '24/7' }],
      },
      {
        title: 'Dokumentacja medyczna',
        context: 'Lekarz po wizycie spędza 15 minut na wypełnianiu dokumentacji. "Pracuję dla komputera, nie dla pacjenta".',
        before: '15 min/wizytę', after: '3 min/wizytę', metricLabel: 'czas na dokumentację po wizycie',
        extras: [{ label: 'Szablony i auto-uzupełnianie', value: 'Per specjalizację' }, { label: 'Więcej pacjentów/dzień', value: '+25%' }],
      },
      {
        title: 'Wyniki i komunikacja z pacjentem',
        context: 'Pacjent dzwoni po wyniki. Recepcja szuka, lekarz musi opisać. Pacjent dzwoni ponownie. Koło.',
        before: '2-3 dni', after: '4h', metricLabel: 'czas od badania do wyniku u pacjenta',
        extras: [{ label: 'Telefony o wyniki', value: '-85%' }, { label: 'Satysfakcja pacjentów', value: '4.8/5' }],
      },
    ],
  },
  {
    id: 'hr', name: 'HR & Rekrutacja', subtitle: 'Agencje pracy, rekrutacja, benefity, kadry',
    icon: 'users', color: '#14b8a6',
    cases: [
      {
        title: 'Proces rekrutacyjny',
        context: 'CV w mailach, statusy w głowie rekrutera. Kandydat czeka tydzień na odpowiedź i idzie do konkurencji.',
        before: '14 dni', after: '3 dni', metricLabel: 'czas od aplikacji do decyzji',
        extras: [{ label: 'Odpowiedź do kandydata', value: '5dni→2h' }, { label: 'Utrata kandydatów', value: '-60%' }],
      },
      {
        title: 'Onboarding pracownika',
        context: 'Nowy pracownik — 15 dokumentów do podpisania, 8 systemów do skonfigurowania, 5 osób musi coś "ogarnąć".',
        before: '3 dni', after: '4h', metricLabel: 'pełny onboarding nowego pracownika',
        extras: [{ label: 'Dokumenty', value: 'E-podpis, auto' }, { label: 'Konfiguracja systemów', value: '1 formularz' }],
      },
      {
        title: 'Delegowanie pracowników tymczasowych',
        context: 'Agencja pracy deleguje 500+ osób. Grafiki, obecności, rozliczenia — Excel i telefony.',
        before: '2h/dzień', after: '15 min/dzień', metricLabel: 'zarządzanie grafikami i obecnościami',
        extras: [{ label: 'Rozliczenie pracownika', value: 'Auto z ewidencji' }, { label: 'Konflikty grafiku', value: '-90%' }],
      },
    ],
  },
  {
    id: 'education', name: 'Edukacja & Szkolenia', subtitle: 'Szkoły, kursy, LMS, wydawnictwa',
    icon: 'book-open', color: '#a855f7',
    cases: [
      {
        title: 'Zarządzanie kursami i uczestnikami',
        context: 'Zapisy przez formularz, płatności na przelew, potwierdzenia ręcznie. Przy 50+ kursach/miesiąc — chaos.',
        before: '20 min', after: '0 min', metricLabel: 'obsługa jednego zapisu (automatyczna)',
        extras: [{ label: 'Potwierdzenia', value: 'Automatyczne' }, { label: 'Duplikaty i błędy', value: '-95%' }],
      },
      {
        title: 'Certyfikacja i egzaminy',
        context: 'Egzaminy papierowe, ręczne sprawdzanie, certyfikaty w Wordzie. Wydanie certyfikatu — 2 tygodnie.',
        before: '2 tyg', after: '5 min', metricLabel: 'od zdania egzaminu do certyfikatu',
        extras: [{ label: 'Egzaminy', value: 'Online, auto-sprawdzane' }, { label: 'Weryfikacja certyfikatu', value: 'QR code' }],
      },
      {
        title: 'Rozliczenia trenerów i sal',
        context: 'Trener prowadzi 12 szkoleń w miesiącu, każde z inną stawką. Rozliczenie = 2 dni pracy administracji.',
        before: '2 dni', after: '30 min', metricLabel: 'rozliczenie wszystkich trenerów miesięcznie',
        extras: [{ label: 'Rezerwacja sal', value: 'Auto z grafiku' }, { label: 'Konflikty terminów', value: '0' }],
      },
    ],
  },
];

export function CaseStudies() {
  const [selected, setSelected] = useState<string | null>(null);
  const industry = data.find(d => d.id === selected);

  return (
    <div className="cs">
      <AnimatePresence mode="wait">
        {industry ? (
          <motion.div className="cs-industry" key={industry.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ '--cs-c': industry.color, '--cs-cl': `${industry.color}12`, '--cs-cm': `${industry.color}28` } as React.CSSProperties}
          >
            <button className="cs-back" onClick={() => setSelected(null)}>
              <Icon name="chevron-left" size={16} strokeWidth={2.5} />
              Branże
            </button>

            <div className="cs-industry-head">
              <div className="cs-industry-icon">
                <Icon name={industry.icon} size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="cs-industry-name">{industry.name}</h2>
                <p className="cs-industry-sub">{industry.cases.length} przykłady automatyzacji</p>
              </div>
            </div>

            <div className="cs-cases">
              {industry.cases.map((c, i) => (
                <motion.div className="cs-case" key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="cs-case-top">
                    <h3 className="cs-case-title">{c.title}</h3>
                    <p className="cs-case-ctx">{c.context}</p>
                  </div>

                  <div className="cs-case-metric">
                    <span className="cs-case-before">{c.before}</span>
                    <span className="cs-case-arrow">
                      <svg width="28" height="12" viewBox="0 0 28 12" fill="none"><path d="M0 6h24m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="cs-case-after">{c.after}</span>
                  </div>
                  <span className="cs-case-mlabel">{c.metricLabel}</span>

                  <div className="cs-case-extras">
                    {c.extras.map((e, j) => (
                      <div className="cs-case-extra" key={j}>
                        <span className="cs-case-eval">{e.value}</span>
                        <span className="cs-case-elabel">{e.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div className="cs-grid" key="grid"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="cs-grid-title">Wybierz branżę</p>
            <div className="cs-tiles">
              {data.map((ind, i) => (
                <motion.button className="cs-tile" key={ind.id}
                  style={{ '--cs-c': ind.color, '--cs-cl': `${ind.color}12`, '--cs-cm': `${ind.color}28` } as React.CSSProperties}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelected(ind.id)}
                >
                  <div className="cs-tile-icon">
                    <Icon name={ind.icon} size={22} strokeWidth={1.7} />
                  </div>
                  <div className="cs-tile-text">
                    <span className="cs-tile-name">{ind.name}</span>
                    <span className="cs-tile-sub">{ind.subtitle}</span>
                  </div>
                  <span className="cs-tile-count">{ind.cases.length}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
