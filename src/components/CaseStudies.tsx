import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

interface Process {
  name: string;
  before: string;
  after: string;
}

interface Case {
  title: string;
  context: string;
  before: string;
  after: string;
  metricLabel: string;
  processes: Process[];
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
        context: 'Ręczne planowanie zleceń na 12 liniach w Excelu — każda zmiana priorytetów to godziny przeplanowywania.',
        before: '3 dni', after: '15 min', metricLabel: 'ułożenie harmonogramu tygodniowego',
        processes: [
          { name: 'Pobranie zamówień z ERP', before: 'Ręczne', after: 'Auto-sync' },
          { name: 'Sprawdzenie dostępności maszyn', before: '2h', after: '0 — system wie' },
          { name: 'Uwzględnienie przezbrojenia', before: 'Z głowy', after: 'Algorytm' },
          { name: 'Reakcja na zmianę priorytetu', before: '4h', after: '2 min' },
          { name: 'Komunikacja ze zmianami', before: 'Telefon/tablica', after: 'Auto push' },
        ],
      },
      {
        title: 'Predykcyjne utrzymanie maszyn',
        context: 'Awarie wykrywane dopiero gdy maszyna stawała. Serwisanci reagowali zamiast zapobiegać.',
        before: '4.5h', after: '35 min', metricLabel: 'średni czas od wykrycia do naprawy',
        processes: [
          { name: 'Wykrycie anomalii', before: 'Po awarii', after: '48h wcześniej' },
          { name: 'Diagnoza przyczyny', before: '1.5h szukania', after: 'Auto z czujników' },
          { name: 'Zamówienie części', before: 'Ad hoc, 2 dni', after: 'Zaplanowane z góry' },
          { name: 'Raport zmianowy', before: '45 min ręcznie', after: 'Auto, real-time' },
          { name: 'Historia serwisowa maszyny', before: 'Zeszyt', after: 'Cyfrowa książka' },
        ],
      },
      {
        title: 'Kontrola jakości i traceability',
        context: 'Papierowe karty kontrolne, ręczne przepisywanie. Klient pyta o historię partii — 3h szukania.',
        before: '25 min', after: '3 min', metricLabel: 'kontrola jakości jednej partii',
        processes: [
          { name: 'Protokół kontrolny', before: 'Papier + przepisywanie', after: 'Tablet + QR' },
          { name: 'Genealogia partii', before: '3h szukania', after: '10 sekund' },
          { name: 'Blokada wadliwej partii', before: 'Telefon do kierownika', after: 'Auto-blokada' },
          { name: 'Przygotowanie do audytu', before: '1 tydzień', after: '1 klik' },
          { name: 'Analiza trendów jakości', before: 'Brak', after: 'Dashboard live' },
        ],
      },
      {
        title: 'Dashboard OEE w real-time',
        context: 'Nikt nie wie, która maszyna "nie dowozi" i dlaczego. Dane zbierane ręcznie na koniec zmiany.',
        before: 'Koniec zmiany', after: 'Real-time', metricLabel: 'dostępność danych o wydajności',
        processes: [
          { name: 'Pomiar dostępności', before: 'Ręczny, z zeszytu', after: 'Auto z PLC' },
          { name: 'Pomiar wydajności', before: 'Szacunkowy', after: 'Dokładny, live' },
          { name: 'Pomiar jakości', before: 'Po fakcie', after: 'W trakcie produkcji' },
          { name: 'Identyfikacja wąskich gardeł', before: 'Spotkanie tygodniowe', after: 'Alert na bieżąco' },
          { name: 'Raport dla zarządu', before: '2 dni kompilowania', after: 'Zawsze gotowy' },
        ],
      },
    ],
  },
  {
    id: 'transport', name: 'Transport & Logistyka', subtitle: 'Spedycja, flota, TSL, magazyny',
    icon: 'truck', color: '#3b82f6',
    cases: [
      {
        title: 'Dyspozycja i planowanie tras',
        context: '200+ pojazdów, 15 dyspozytorów. Planowanie na telefon i w Excelu.',
        before: '40 min', after: '90 sek', metricLabel: 'zaplanowanie jednej trasy',
        processes: [
          { name: 'Sprawdzenie dostępności pojazdów', before: 'Telefon', after: 'Dashboard live' },
          { name: 'Optymalizacja kolejności', before: 'Z doświadczenia', after: 'Algorytm' },
          { name: 'Komunikacja z kierowcą', before: 'Telefon + SMS', after: 'Auto push do apki' },
          { name: 'Status dostawy dla klienta', before: '15 min (telefon)', after: 'Link w SMS' },
          { name: 'Dokumenty CMR', before: 'Ręcznie, papier', after: 'Auto-generowane' },
        ],
      },
      {
        title: 'Rozliczanie kierowców i floty',
        context: 'Dane z tachografów na pendrive\'ach, delegacje w papierze. Zamknięcie miesiąca = tydzień.',
        before: '5 dni', after: '4h', metricLabel: 'rozliczenie miesiąca całej floty',
        processes: [
          { name: 'Import danych z tachografu', before: 'Pendrive + ręcznie', after: 'Auto-download' },
          { name: 'Naliczanie diet i delegacji', before: 'Ręcznie w Excelu', after: 'Auto z GPS' },
          { name: 'Kontrola czasu pracy', before: 'Wyrywkowo', after: '100%, real-time' },
          { name: 'Raport paliwowy', before: 'Raz w miesiącu', after: 'Codzienny, auto' },
          { name: 'Wykrycie anomalii (tankowanie)', before: 'Brak', after: 'Auto-alert' },
        ],
      },
      {
        title: 'Zarządzanie magazynem',
        context: 'Stany w Excelu, inwentaryzacja raz na kwartał. Kompletacja zamówień "z pamięci".',
        before: '8 min', after: '90 sek', metricLabel: 'kompletacja jednego zamówienia',
        processes: [
          { name: 'Lokalizacja towaru', before: 'Szukanie po hali', after: 'Skan → lokalizacja' },
          { name: 'Stany magazynowe', before: 'Excel, raz/dzień', after: 'Real-time, auto' },
          { name: 'Inwentaryzacja', before: '2 dni, raz/kwartał', after: 'Ciągła, rolling' },
          { name: 'Generowanie WZ/PZ', before: 'Ręcznie', after: 'Auto z operacji' },
        ],
      },
    ],
  },
  {
    id: 'ecommerce', name: 'E-commerce & Handel', subtitle: 'Sklepy online, marketplace, hurtownie',
    icon: 'shopping-cart', color: '#f59e0b',
    cases: [
      {
        title: 'Fulfillment — od zamówienia do wysyłki',
        context: '2000+ zamówień/dzień, 4 magazyny, 12 osób na pełen etat do obsługi.',
        before: '6h', after: '12 min', metricLabel: 'od zamówienia do gotowości wysyłki',
        processes: [
          { name: 'Weryfikacja płatności', before: 'Ręczna, 15 min', after: 'Auto, instant' },
          { name: 'Dobór magazynu', before: 'Jeden domyślny', after: 'Najbliższy, auto' },
          { name: 'Lista kompletacji', before: 'Druk + szukanie', after: 'Auto + nawigacja' },
          { name: 'Etykieta kurierska', before: 'Ręcznie w panelu', after: 'Auto-druk' },
          { name: 'Powiadomienie klienta', before: 'Ręczny mail', after: 'Auto + tracking' },
        ],
      },
      {
        title: 'Synchronizacja stanów i kanałów',
        context: 'Allegro, własny sklep, hurtownia B2B — stany aktualizowane 2x dziennie. Overselling co tydzień.',
        before: '2×/dzień', after: 'Real-time', metricLabel: 'synchronizacja stanów magazynowych',
        processes: [
          { name: 'Aktualizacja stanów', before: 'Ręczny eksport/import', after: 'Auto-sync live' },
          { name: 'Overselling', before: 'Co tydzień', after: 'Wyeliminowany' },
          { name: 'Nowy kanał sprzedaży', before: '2 tyg integracji', after: '1 dzień' },
          { name: 'Ceny między kanałami', before: 'Ręczne per kanał', after: '1 źródło prawdy' },
        ],
      },
      {
        title: 'Repricing i analityka cenowa',
        context: 'Pricing manager ręcznie monitorował 4000 SKU. Tydzień na jedną rundę cenową.',
        before: '5 dni', after: '15 min', metricLabel: 'aktualizacja cen w całym katalogu',
        processes: [
          { name: 'Monitoring konkurencji', before: 'Ręczne sprawdzanie', after: 'Auto-scraping' },
          { name: 'Kalkulacja nowych cen', before: 'Excel + intuicja', after: 'Reguły + algorytm' },
          { name: 'Wdrożenie cen', before: 'Per kanał, ręcznie', after: '1 klik, wszystkie' },
          { name: 'Analiza wpływu na marżę', before: 'Brak', after: 'Dashboard real-time' },
          { name: 'Częstotliwość repricing', before: 'Raz na miesiąc', after: 'Codziennie' },
        ],
      },
    ],
  },
  {
    id: 'agencies', name: 'Agencje & Usługi B2B', subtitle: 'Marketing, consulting, prawo, doradztwo',
    icon: 'briefcase', color: '#8b5cf6',
    cases: [
      {
        title: 'Pipeline projektowy',
        context: 'PM-owie spędzali więcej czasu na statusach niż na dostarczaniu. Klient pyta — szukanie po Slacku.',
        before: '8h/tyg', after: '45 min/tyg', metricLabel: 'czas PM na statusy i raportowanie',
        processes: [
          { name: 'Zbieranie statusów', before: 'Standup + Slack', after: 'Dashboard auto' },
          { name: 'Raport dla klienta', before: '2h kompilowania', after: '1 klik' },
          { name: 'Alokacja ludzi do projektu', before: '"Kto wolny?"', after: 'Skills + availability' },
          { name: 'Alert o ryzyku budżetowym', before: 'Po fakcie', after: '72h wcześniej' },
          { name: 'Timesheet', before: 'Z pamięci, piątek', after: 'Auto z tasków' },
        ],
      },
      {
        title: 'Zarządzanie sprawami (kancelaria)',
        context: '800+ aktywnych spraw, terminy w Excelu. Ryzyko przegapienia terminu sądowego — realne.',
        before: '1.5h/dzień', after: '15 min/dzień', metricLabel: 'administracja per prawnik dziennie',
        processes: [
          { name: 'Szukanie dokumentu w sprawie', before: '12 min', after: '8 sekund' },
          { name: 'Przygotowanie pisma procesowego', before: '2h od zera', after: '20 min z szablonu' },
          { name: 'Kontrola terminów', before: 'Ręczna, Excel', after: 'Auto + alerty' },
          { name: 'Historia korespondencji', before: 'Folder mailowy', after: 'Timeline w sprawie' },
          { name: 'Rozliczenie godzin klienta', before: 'Koniec miesiąca, ręcznie', after: 'Auto z aktywności' },
        ],
      },
      {
        title: 'Ofertowanie i sprzedaż',
        context: 'Handlowiec przygotowuje ofertę 2h, wysyła mailem, zapomina o follow-upie. 40% ofert ginie.',
        before: '2h', after: '10 min', metricLabel: 'przygotowanie spersonalizowanej oferty',
        processes: [
          { name: 'Generowanie oferty', before: 'Word + kopiuj/wklej', after: 'Auto z CRM' },
          { name: 'Personalizacja', before: 'Ręczne dane', after: 'Auto z kontaktu' },
          { name: 'Follow-up', before: 'Zapominam', after: 'Auto sekwencja' },
          { name: 'Śledzenie otwarcia', before: 'Brak', after: 'Powiadomienie live' },
          { name: 'Analiza win/loss', before: 'Brak', after: 'Auto per handlowiec' },
        ],
      },
    ],
  },
  {
    id: 'finance', name: 'Finanse & Księgowość', subtitle: 'Biura rachunkowe, BPO, brokerzy',
    icon: 'dollar-sign', color: '#10b981',
    cases: [
      {
        title: 'Zamknięcie miesiąca',
        context: 'Biuro rachunkowe, 200+ klientów. Faktury z maila, WhatsAppa, kuriera. Ręczne przepisywanie.',
        before: '3 dni', after: '4h', metricLabel: 'zamknięcie miesiąca per klient',
        processes: [
          { name: 'Zbieranie dokumentów', before: 'Mail + telefon', after: 'Portal + auto-remind' },
          { name: 'Rozpoznanie faktury', before: '3 min ręcznie', after: '15 sek (OCR + AI)' },
          { name: 'Dekretacja', before: 'Ręczna', after: 'Auto-sugestia (95%)' },
          { name: 'Uzgodnienie z bankiem', before: '2h per klient', after: '5 min auto-match' },
          { name: 'Brakujące dokumenty', before: 'Telefon, mail', after: 'Auto-przypomnienie' },
        ],
      },
      {
        title: 'Raportowanie finansowe',
        context: 'Zarząd czekał 3 dni na raport miesięczny. Dane z 8 systemów zbierane ręcznie.',
        before: '3 dni', after: '10 sek', metricLabel: 'generowanie raportu finansowego',
        processes: [
          { name: 'Pobranie danych z banku', before: 'Eksport CSV', after: 'API real-time' },
          { name: 'Konsolidacja danych', before: 'Excel, 8 plików', after: 'Auto, 1 źródło' },
          { name: 'Wizualizacja KPI', before: 'Wykresy w Excelu', after: 'Dashboard live' },
          { name: 'Dystrybucja raportu', before: 'PDF mailem', after: 'Link + auto-wysyłka' },
          { name: 'Drill-down do szczegółów', before: 'Nowy raport = 1 dzień', after: '1 klik' },
        ],
      },
      {
        title: 'Compliance i kontrola podatkowa',
        context: 'Przygotowanie do kontroli US = tydzień gorączkowego szukania. Ryzyko pomyłki = kara.',
        before: '1 tydzień', after: '2h', metricLabel: 'przygotowanie pełnej dokumentacji do kontroli',
        processes: [
          { name: 'Zebranie dokumentów', before: 'Szafa + serwer', after: '1 filtr w systemie' },
          { name: 'Sprawdzenie kompletności', before: 'Ręczna checklista', after: 'Auto-walidacja' },
          { name: 'Historia zmian', before: 'Brak', after: 'Pełny audit trail' },
          { name: 'Raporty JPK', before: '4h generowania', after: '1 klik' },
        ],
      },
    ],
  },
  {
    id: 'construction', name: 'Budownictwo & Nieruchomości', subtitle: 'Wykonawcy, deweloperzy, zarządcy',
    icon: 'home', color: '#ec4899',
    cases: [
      {
        title: 'Dziennik budowy i dokumentacja',
        context: 'Papierowy dziennik, zdjęcia na telefonie kierownika, raporty w Wordzie.',
        before: '45 min/dzień', after: '5 min/dzień', metricLabel: 'czas kierownika na dokumentację',
        processes: [
          { name: 'Wpis do dziennika', before: 'Ręcznie, papier', after: 'Apka + głos' },
          { name: 'Dokumentacja zdjęciowa', before: 'Telefon → folder', after: 'Apka → auto-tag' },
          { name: 'Znalezienie protokołu', before: '30 min', after: '10 sekund' },
          { name: 'Raport dzienny dla inwestora', before: '1h', after: 'Auto-generowany' },
          { name: 'Gotowość do kontroli', before: '3 dni przygotowań', after: 'Zawsze gotowy' },
        ],
      },
      {
        title: 'Kosztorysowanie i przetargi',
        context: 'Kosztorysant przygotowuje ofertę 3-5 dni. Ceny materiałów z zeszłego kwartału.',
        before: '4 dni', after: '6h', metricLabel: 'przygotowanie pełnego kosztorysu',
        processes: [
          { name: 'Przedmiar robót', before: 'Ręczne liczenie', after: 'Auto z BIM/rysunku' },
          { name: 'Ceny materiałów', before: 'Zeszły kwartał', after: 'Baza aktualna, live' },
          { name: 'Wyceny podwykonawców', before: 'Telefon + mail', after: 'Portal zapytań' },
          { name: 'Porównanie wariantów', before: 'Nowy plik Excela', after: 'Scenariusze, 1 klik' },
        ],
      },
      {
        title: 'Zarządzanie podwykonawcami',
        context: 'Odbiory na kartce, rozliczenia w Excelu. Kto ile zrobił — nikt nie ma pełnego obrazu.',
        before: '2h/tyg', after: '15 min/tyg', metricLabel: 'rozliczenie podwykonawców per projekt',
        processes: [
          { name: 'Odbiór robót', before: 'Kartka + podpis', after: 'Apka + zdjęcie + GPS' },
          { name: 'Zaawansowanie prac', before: 'Szacunek PM-a', after: 'Auto z odbiorów' },
          { name: 'Rozliczenie finansowe', before: 'Excel, raz/miesiąc', after: 'Auto z odbiorów' },
          { name: 'Spory o zakres', before: 'Częste', after: 'Dowody w systemie' },
        ],
      },
    ],
  },
  {
    id: 'gastro', name: 'Gastronomia & Spożywcza', subtitle: 'Restauracje, cukiernie, catering, produkcja',
    icon: 'coffee', color: '#f97316',
    cases: [
      {
        title: 'Zamówienia surowców',
        context: 'Szef kuchni zamawiał "na oko" — raz za dużo (marnowanie), raz za mało (brak dań).',
        before: '1h/dzień', after: '5 min/dzień', metricLabel: 'planowanie zakupów dziennych',
        processes: [
          { name: 'Analiza stanów', before: 'Na oko / liczenie', after: 'Auto z wagi + POS' },
          { name: 'Zamówienie do dostawcy', before: 'Telefon', after: 'Auto-zamówienie' },
          { name: 'Rozliczenie dostaw', before: 'Ręczne, raz/tydzień', after: 'Przy przyjęciu, auto' },
          { name: 'Predykcja zużycia', before: 'Brak', after: 'ML z historii + rezerwacji' },
          { name: 'Marnowanie surowców', before: '~15% wartości', after: '~3%' },
        ],
      },
      {
        title: 'Obsługa zamówień cateringowych',
        context: 'Telefon → ręczne wpisanie → kuchnia → dostawa. Pomyłki i brak potwierdzeń.',
        before: '30 min', after: '2 min', metricLabel: 'przyjęcie i potwierdzenie zamówienia',
        processes: [
          { name: 'Przyjęcie zamówienia', before: 'Telefon + notka', after: 'Formularz online' },
          { name: 'Potwierdzenie dla klienta', before: 'Mail ręcznie', after: 'Auto instant' },
          { name: 'Przekazanie do kuchni', before: 'Karteczka', after: 'Auto na ekranie' },
          { name: 'Planowanie dostawy', before: 'Ręczne', after: 'Auto z optymalizacją' },
          { name: 'Fakturowanie', before: 'Po fakcie, ręcznie', after: 'Auto po dostawie' },
        ],
      },
      {
        title: 'Food cost i rentowność menu',
        context: 'Food cost liczony raz w miesiącu. Marże dań — zgadywanka.',
        before: 'Raz/mies.', after: 'Codziennie', metricLabel: 'kontrola food cost',
        processes: [
          { name: 'Kalkulacja kosztu dania', before: 'Ręczna, przybliżona', after: 'Auto z receptury' },
          { name: 'Aktualizacja po zmianie cen', before: 'Zapominam', after: 'Auto-przeliczenie' },
          { name: 'Ranking rentowności dań', before: 'Brak', after: 'Dashboard live' },
          { name: 'Optymalizacja menu', before: 'Intuicja', after: 'Dane + marża + popularność' },
        ],
      },
    ],
  },
  {
    id: 'it', name: 'IT & Software House', subtitle: 'Software house, SaaS, systemy, wdrożenia',
    icon: 'code', color: '#6366f1',
    cases: [
      {
        title: 'CI/CD i delivery pipeline',
        context: 'Deployment ręczny co 2 tygodnie. Każdy release = dzień stresu i modlitwa.',
        before: 'Co 2 tyg', after: 'Kilka ×/dzień', metricLabel: 'częstotliwość deploymentu',
        processes: [
          { name: 'Build + testy', before: '45 min ręcznie', after: '8 min, auto' },
          { name: 'Deploy na staging', before: '2h', after: '1 komenda, 3 min' },
          { name: 'Deploy na produkcję', before: '4h + downtime', after: 'Zero-downtime, auto' },
          { name: 'Rollback', before: '1h paniki', after: '1 klik, 30 sek' },
          { name: 'Monitoring po deploy', before: 'Ręczne sprawdzanie', after: 'Auto health-check' },
        ],
      },
      {
        title: 'Onboarding developera',
        context: 'Nowy developer: 15 linków do Confluence, 3 repo, życzenia powodzenia. Produktywny po 3 tygodniach.',
        before: '3 tyg', after: '3 dni', metricLabel: 'czas do pierwszego merge requesta',
        processes: [
          { name: 'Setup środowiska', before: '1 dzień + frustracja', after: '30 min, skrypt' },
          { name: 'Dostępy do systemów', before: '3 dni, 5 osób', after: '1 formularz, auto' },
          { name: 'Dokumentacja architektury', before: 'Nieaktualna', after: 'Auto-generowana' },
          { name: 'Pierwszy task', before: 'Tydzień 2', after: 'Dzień 1' },
        ],
      },
      {
        title: 'Incident response i monitoring',
        context: 'Klient dzwoni "nie działa" zanim ktokolwiek w zespole wie. SLA? Teoretyczne.',
        before: '45 min', after: '90 sek', metricLabel: 'czas od incydentu do reakcji',
        processes: [
          { name: 'Wykrycie problemu', before: 'Klient dzwoni', after: 'Alert automatyczny' },
          { name: 'Diagnoza', before: '30 min logów', after: 'Auto-korelacja' },
          { name: 'Powiadomienie zespołu', before: 'Slack ręcznie', after: 'Auto-eskalacja' },
          { name: 'Post-mortem', before: 'Zapominamy', after: 'Auto-wygenerowany szkic' },
          { name: 'SLA tracking', before: 'Excel, koniec miesiąca', after: 'Real-time dashboard' },
        ],
      },
    ],
  },
  {
    id: 'healthcare', name: 'Medycyna & Zdrowie', subtitle: 'Kliniki, gabinety, optyki, weterynaria',
    icon: 'activity', color: '#ef4444',
    cases: [
      {
        title: 'Rejestracja pacjentów',
        context: 'Recepcja na telefonie non-stop. 30% wizyt to no-show. Pacjenci rezygnują z czekania.',
        before: '5 min', after: '30 sek', metricLabel: 'rejestracja jednego pacjenta',
        processes: [
          { name: 'Umawianie wizyty', before: 'Tylko telefon', after: 'Online 24/7 + telefon' },
          { name: 'Przypomnienie o wizycie', before: 'Brak', after: 'SMS 24h + 2h przed' },
          { name: 'No-show rate', before: '30%', after: '8%' },
          { name: 'Zarządzanie kolejką', before: 'Karteczki', after: 'Ekran + auto-call' },
          { name: 'Weryfikacja ubezpieczenia', before: '3 min ręcznie', after: 'Auto eWUŚ' },
        ],
      },
      {
        title: 'Dokumentacja medyczna',
        context: 'Lekarz po wizycie: 15 minut na dokumentację. "Pracuję dla komputera, nie dla pacjenta."',
        before: '15 min', after: '3 min', metricLabel: 'dokumentacja po wizycie',
        processes: [
          { name: 'Opis wizyty', before: 'Od zera, każdorazowo', after: 'Szablon + auto-uzupeł.' },
          { name: 'E-recepta', before: '5 min szukania leku', after: '30 sek, podpowiedzi' },
          { name: 'E-skierowanie', before: 'Ręcznie, druk', after: 'Auto z rozpoznania' },
          { name: 'Historia leczenia', before: 'Teczka papierowa', after: '1 ekran, pełna' },
        ],
      },
      {
        title: 'Wyniki badań i komunikacja',
        context: 'Pacjent dzwoni po wyniki. Recepcja szuka, lekarz opisuje, pacjent dzwoni ponownie.',
        before: '2-3 dni', after: '4h', metricLabel: 'od badania do wyniku u pacjenta',
        processes: [
          { name: 'Import wyników z laboratorium', before: 'Fax / mail', after: 'Auto-integracja' },
          { name: 'Opis wyniku', before: 'Lekarz szuka karty', after: 'Auto-podpięcie do wizyty' },
          { name: 'Udostępnienie pacjentowi', before: 'Wizyta po odbiór', after: 'Portal / SMS' },
          { name: 'Telefony o wyniki', before: '~30/dzień', after: '~5/dzień' },
        ],
      },
    ],
  },
  {
    id: 'hr', name: 'HR & Rekrutacja', subtitle: 'Agencje pracy, rekrutacja, benefity, kadry',
    icon: 'users', color: '#14b8a6',
    cases: [
      {
        title: 'Proces rekrutacyjny',
        context: 'CV w mailach, statusy w głowie rekrutera. Kandydat czeka tydzień i idzie do konkurencji.',
        before: '14 dni', after: '3 dni', metricLabel: 'od aplikacji do decyzji',
        processes: [
          { name: 'Screening CV', before: '3 min × 200', after: 'Auto-scoring + top 20' },
          { name: 'Odpowiedź do kandydata', before: '5 dni', after: '2h auto' },
          { name: 'Umawianie rozmów', before: 'Ping-pong mailowy', after: 'Kalendarz self-service' },
          { name: 'Feedback po rozmowie', before: 'Mail do PM-a', after: 'Formularz → ATS' },
          { name: 'Raport z rekrutacji', before: 'Ręcznie, z pamięci', after: 'Auto z pipeline' },
        ],
      },
      {
        title: 'Onboarding nowego pracownika',
        context: '15 dokumentów, 8 systemów, 5 osób musi coś "ogarnąć". Nowy czeka.',
        before: '3 dni', after: '4h', metricLabel: 'pełny onboarding pracownika',
        processes: [
          { name: 'Dokumenty do podpisu', before: '15 papierów', after: 'E-podpis, 10 min' },
          { name: 'Konta w systemach', before: 'Mail do IT, 2 dni', after: 'Auto-provisioning' },
          { name: 'Szkolenie wstępne', before: 'Kto ma czas?', after: 'LMS + auto-harmonogram' },
          { name: 'Checklist dla managera', before: 'Brak / email', after: 'Auto-tasklist' },
        ],
      },
      {
        title: 'Delegowanie pracowników tymczasowych',
        context: 'Agencja pracy, 500+ osób. Grafiki, obecności, rozliczenia — Excel i telefony.',
        before: '2h/dzień', after: '15 min/dzień', metricLabel: 'zarządzanie grafikami i obecnościami',
        processes: [
          { name: 'Grafik tygodniowy', before: 'Excel + telefon', after: 'System + auto-match' },
          { name: 'Ewidencja czasu pracy', before: 'Papierowa lista', after: 'Apka + GPS' },
          { name: 'Rozliczenie pracownika', before: 'Ręczne, koniec miesiąca', after: 'Auto z ewidencji' },
          { name: 'Zastępstwo za nieobecność', before: 'Panika + telefony', after: 'Auto-sugestia' },
          { name: 'Raport dla klienta', before: 'Excel, mail', after: 'Portal, auto' },
        ],
      },
    ],
  },
  {
    id: 'education', name: 'Edukacja & Szkolenia', subtitle: 'Szkoły, kursy, LMS, wydawnictwa',
    icon: 'book-open', color: '#a855f7',
    cases: [
      {
        title: 'Zarządzanie kursami i zapisami',
        context: 'Zapisy przez formularz, płatności na przelew, potwierdzenia ręcznie. 50+ kursów/miesiąc — chaos.',
        before: '20 min', after: '0 min', metricLabel: 'obsługa jednego zapisu (pełna automatyzacja)',
        processes: [
          { name: 'Formularz zapisu', before: 'Google Form', after: 'Portal z płatnością' },
          { name: 'Potwierdzenie', before: 'Mail ręcznie', after: 'Auto instant' },
          { name: 'Płatność', before: 'Przelew + sprawdzanie', after: 'Online + auto-match' },
          { name: 'Materiały do uczestnika', before: 'Mail z załącznikiem', after: 'Auto-dostęp LMS' },
          { name: 'Reminder przed kursem', before: 'Zapominam', after: 'Auto, 24h + 1h' },
        ],
      },
      {
        title: 'Certyfikacja i egzaminy',
        context: 'Egzaminy papierowe, ręczne sprawdzanie, certyfikat w Wordzie. 2 tygodnie czekania.',
        before: '2 tyg', after: '5 min', metricLabel: 'od zdania egzaminu do certyfikatu',
        processes: [
          { name: 'Egzamin', before: 'Papierowy, sala', after: 'Online, auto-sprawdzany' },
          { name: 'Sprawdzenie', before: 'Ręczne, 3 dni', after: 'Instant, auto' },
          { name: 'Generowanie certyfikatu', before: 'Word, ręcznie', after: 'Auto + QR' },
          { name: 'Wysyłka', before: 'Poczta / mail', after: 'Auto-link instant' },
          { name: 'Weryfikacja ważności', before: 'Telefon do nas', after: 'Skan QR = wynik' },
        ],
      },
      {
        title: 'Rozliczenia trenerów i sal',
        context: '12 szkoleń/miesiąc per trener, każde z inną stawką. Rozliczenie = 2 dni administracji.',
        before: '2 dni', after: '30 min', metricLabel: 'rozliczenie wszystkich trenerów miesięcznie',
        processes: [
          { name: 'Ewidencja godzin', before: 'Ręczna, z grafiku', after: 'Auto z kalendarza' },
          { name: 'Kalkulacja wynagrodzenia', before: 'Excel, 3 stawki', after: 'Auto per typ' },
          { name: 'Rezerwacja sal', before: 'Telefon / mail', after: 'System, auto z grafiku' },
          { name: 'Konflikty terminowe', before: 'Dowiaduję się za późno', after: 'Alert natychmiast' },
        ],
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
          <motion.div className="cs-view" key={industry.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ '--cs-c': industry.color, '--cs-cl': `${industry.color}10`, '--cs-cm': `${industry.color}22` } as React.CSSProperties}
          >
            <div className="cs-topbar">
              <button className="cs-back" onClick={() => setSelected(null)}>
                <Icon name="chevron-left" size={16} strokeWidth={2.5} />
                Branże
              </button>
              <div className="cs-topbar-info">
                <div className="cs-topbar-icon">
                  <Icon name={industry.icon} size={18} strokeWidth={1.8} />
                </div>
                <span className="cs-topbar-name">{industry.name}</span>
              </div>
            </div>

            <div className="cs-scroll">
              {industry.cases.map((c, i) => (
                <motion.div className="cs-card" key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Left side — info + hero metric */}
                  <div className="cs-card-left">
                    <h3 className="cs-card-title">{c.title}</h3>
                    <p className="cs-card-ctx">{c.context}</p>
                    <div className="cs-card-hero">
                      <span className="cs-card-before">{c.before}</span>
                      <svg className="cs-card-arrow" width="32" height="12" viewBox="0 0 32 12" fill="none">
                        <path d="M0 6h28m0 0l-4.5-4.5M28 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="cs-card-after">{c.after}</span>
                    </div>
                    <span className="cs-card-label">{c.metricLabel}</span>
                  </div>

                  {/* Right side — process breakdown tiles */}
                  <div className="cs-card-procs">
                    {c.processes.map((p, j) => (
                      <div className="cs-proc" key={j}>
                        <span className="cs-proc-name">{p.name}</span>
                        <div className="cs-proc-vals">
                          <span className="cs-proc-old">{p.before}</span>
                          <svg className="cs-proc-arrow" width="16" height="8" viewBox="0 0 16 8" fill="none">
                            <path d="M0 4h13m0 0l-2.5-2.5M13 4l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="cs-proc-new">{p.after}</span>
                        </div>
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
                  style={{ '--cs-c': ind.color, '--cs-cl': `${ind.color}10`, '--cs-cm': `${ind.color}22` } as React.CSSProperties}
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
