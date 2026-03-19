import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

const ease = [0.16, 1, 0.3, 1] as const;

interface Process {
  name: string;
  was: string;
  now: string;
}

interface Case {
  title: string;
  story: string;
  was: string;
  now: string;
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
        title: 'Od skanu faktury do księgowania w ERP — bez przepisywania',
        story: 'Dział księgowości zakładu produkcyjnego opakowań dostawał 400+ faktur miesięcznie — mailem, kurierem, czasem jako zdjęcie z WhatsAppa. Każda była ręcznie przepisywana do systemu ERP.',
        was: '6 min', now: '15 sek', metricLabel: 'obsługa jednej faktury kosztowej',
        processes: [
          { name: 'Rozpoznanie danych z faktury', was: 'Ręczne przepisywanie', now: 'OCR + AI, 99.7% skuteczności' },
          { name: 'Dopasowanie do zamówienia', was: 'Szukanie w ERP ręcznie', now: 'Auto-matching po PO number' },
          { name: 'Dekretacja kosztów', was: 'Księgowa decyduje per faktura', now: 'Auto-sugestia z historii (92%)' },
          { name: 'Wykrycie duplikatu', was: 'Czasem się nie udawało', now: 'Blokada automatyczna' },
          { name: 'Synchronizacja z ERP', was: 'Ręczny import, raz dziennie', now: 'Dwukierunkowa, real-time' },
        ],
      },
      {
        title: 'Panel klienta dla produkcji na zamówienie',
        story: 'Producent komponentów metalowych dostawał 30+ telefonów dziennie z pytaniem "kiedy moje zamówienie?". Handlowcy szli do hali, pytali kierownika zmiany, oddzwaniali.',
        was: '30+', now: '2-3', metricLabel: 'zapytań o status zamówienia dziennie',
        processes: [
          { name: 'Status zlecenia dla klienta', was: 'Telefon → handlowiec → hala', now: 'Portal online, live z produkcji' },
          { name: 'Konfiguracja zamówienia', was: 'Mail z PDFem + telefon', now: 'Konfigurator w panelu klienta' },
          { name: 'Potwierdzenie terminu', was: '2 dni (szacunek)', now: 'Auto z harmonogramu, instant' },
          { name: 'Dokumenty jakości (atesty)', was: 'Mail na prośbę, szukanie', now: 'Auto-dostępne po wysyłce' },
          { name: 'Historia zamówień i reorder', was: 'Szukanie w mailach', now: '1 klik — powtórz zamówienie' },
        ],
      },
      {
        title: 'System utrzymania ruchu zamiast zeszytu i Jasia',
        story: 'Zakład z 12 liniami produkcyjnymi — wiedza serwisowa w głowach dwóch mechaników. Gdy Jasiek szedł na urlop, nikt nie wiedział co, kiedy i jak serwisować.',
        was: '4.5h', now: '40 min', metricLabel: 'średni czas od zgłoszenia do naprawy',
        processes: [
          { name: 'Historia serwisowa maszyny', was: 'Zeszyt w szafce', now: 'Cyfrowa książka z pełnym logiem' },
          { name: 'Planowanie przeglądów', was: 'Z głowy / "jak się przypomni"', now: 'Auto z motogodzin lub czasu' },
          { name: 'Zamówienie części zamiennych', was: 'Telefon do dostawcy ad hoc', now: 'Auto-zamówienie przy progu' },
          { name: 'Onboarding nowego mechanika', was: '3 miesiące "przy kimś"', now: '2 tygodnie z systemem' },
        ],
      },
    ],
  },
  {
    id: 'transport', name: 'Transport & Logistyka', subtitle: 'Spedycja, flota, TSL, magazyny',
    icon: 'truck', color: '#3b82f6',
    cases: [
      {
        title: 'Rozliczenia kierowców — z pendrive\'ów i papierów do jednego systemu',
        story: 'Firma TSL ze 180 pojazdami. Na koniec miesiąca kierowcy przywozili pendrive\'y z tachografem, papierowe delegacje i paragony za paliwo.',
        was: '5 dni', now: '6h', metricLabel: 'zamknięcie rozliczeń miesięcznych floty',
        processes: [
          { name: 'Import danych z tachografu', was: 'Pendrive + ręczny upload', now: 'Auto-download przez GSM' },
          { name: 'Naliczanie diet i delegacji', was: 'Ręcznie wg tabelki', now: 'Auto z GPS + trasy' },
          { name: 'Weryfikacja czasu pracy', was: 'Wyrywkowo, "na oko"', now: '100% automatyczna, ciągła' },
          { name: 'Rozliczenie paliwowe', was: 'Paragony + Excel, raz/miesiąc', now: 'Karta flotowa → auto-import' },
          { name: 'Wykrycie anomalii', was: 'Praktycznie brak', now: 'Alert w ciągu godziny' },
        ],
      },
      {
        title: 'Portal śledzenia dla klientów spedycji',
        story: '15 dyspozytorów, a i tak klienci czekali na informację o statusie. Każdy telefon "gdzie jest moja paczka?" angażował dyspozytora na 10 minut.',
        was: '10 min', now: '0 min', metricLabel: 'czas obsługi jednego zapytania o status',
        processes: [
          { name: 'Lokalizacja przesyłki', was: 'Telefon do kierowcy', now: 'GPS live → portal klienta' },
          { name: 'ETA dostawy', was: 'Szacunek dyspozytora', now: 'Auto-kalkulacja z ruchu' },
          { name: 'Potwierdzenie dostawy', was: 'CMR faxem/mailem, 2 dni', now: 'Foto podpisu w apce → instant' },
          { name: 'Dokumenty przewozowe', was: 'Papier, potem skan', now: 'Cyfrowe, dostępne od razu' },
        ],
      },
      {
        title: 'Automatyczna analityka sprzedaży w dystrybucji',
        story: 'Dystrybutor FMCG z 1200 klientami. Dane sprzedażowe w labiryncie Exceli — każdy handlowiec prowadził swój plik, decyzje podejmowane na danych sprzed 3 miesięcy.',
        was: '65h/mies.', now: 'Auto', metricLabel: 'przygotowanie raportów sprzedażowych',
        processes: [
          { name: 'Import danych z kanałów', was: 'Ręczne kopiowanie z 6 Exceli', now: 'Auto z ERP + e-commerce' },
          { name: 'Czyszczenie i spójność danych', was: '2 osoby, cały poniedziałek', now: 'Reguły walidacji, auto' },
          { name: 'Raport dla zarządu', was: 'Piątek, koniec dnia', now: 'Zawsze aktualny, live' },
          { name: 'Analiza trendu per klient', was: 'Na prośbę, 2-3 dni', now: 'Dostępna na klik' },
          { name: 'Alerty o spadkach sprzedaży', was: 'Po kwartale, z zaskoczenia', now: 'Automatyczny alert tygodniowy' },
        ],
      },
    ],
  },
  {
    id: 'ecommerce', name: 'E-commerce & Handel', subtitle: 'Sklepy online, marketplace, hurtownie',
    icon: 'shopping-cart', color: '#f59e0b',
    cases: [
      {
        title: 'Koniec z overselling — jedno źródło prawdy dla 5 kanałów',
        story: 'Sprzedaż na Allegro, Shopify, hurtownia B2B, Amazon i punkt stacjonarny — stany magazynowe aktualizowane ręcznym eksportem. Co tydzień ktoś kupował coś, czego nie było.',
        was: '2×/dzień', now: 'Real-time', metricLabel: 'synchronizacja stanów między kanałami',
        processes: [
          { name: 'Aktualizacja stanów', was: 'CSV export → import, ręcznie', now: 'Event-driven, per transakcja' },
          { name: 'Overselling', was: '~12 tygodniowo', now: '< 1 miesięcznie' },
          { name: 'Dodanie nowego kanału', was: '3-4 tygodnie integracji', now: '2-3 dni z gotowym API' },
          { name: 'Cenowanie per kanał', was: 'Ręczna zmiana per platforma', now: 'Reguły cenowe, auto-dystrybucja' },
        ],
      },
      {
        title: 'Fulfillment, w którym człowiek tylko pakuje',
        story: 'Sklep z 2000+ zamówień dziennie i 4 magazynami. Zamówienie wpadało → ktoś sprawdzał stan → ktoś przypisywał magazyn → ktoś drukował etykietę. 12 osób robiło pracę systemu.',
        was: '6h', now: '12 min', metricLabel: 'od złożenia zamówienia do gotowości wysyłki',
        processes: [
          { name: 'Weryfikacja płatności', was: 'Ręczne sprawdzanie, 15 min', now: 'Auto-potwierdzenie z bramki' },
          { name: 'Przypisanie do magazynu', was: 'Zawsze ten sam (domyślny)', now: 'Najbliższy z towarem na stanie' },
          { name: 'Lista kompletacji', was: 'Druk + chodzenie po magazynie', now: 'Optymalna ścieżka na ekranie' },
          { name: 'Etykieta kurierska', was: 'Ręcznie w panelu kuriera', now: 'Auto-druk po kompletacji' },
          { name: 'Powiadomienie klienta', was: 'Mail ręcznie, czasem zapominam', now: 'Auto-sekwencja z trackingiem' },
        ],
      },
      {
        title: 'Repricing 4000 SKU — z tygodnia do kwadransa',
        story: 'Pricing manager ręcznie monitorował ceny konkurencji — otwierał sklepy, porównywał, wpisywał do arkusza. 4000 produktów × 3 kanały. Ceny aktualne przez 3 dni.',
        was: '5 dni', now: '15 min', metricLabel: 'pełna aktualizacja cen w katalogu',
        processes: [
          { name: 'Monitoring cen konkurencji', was: 'Ręczne wchodzenie na strony', now: 'Auto-scraping, codzienny' },
          { name: 'Kalkulacja nowej ceny', was: 'Formuła w Excelu per produkt', now: 'Reguły cenowe z min. marżą' },
          { name: 'Wdrożenie nowych cen', was: 'Per platforma, ręcznie', now: '1 klik → wszystkie kanały' },
          { name: 'Kontrola wpływu na marżę', was: 'Nie mieliśmy tego', now: 'Dashboard per SKU, real-time' },
        ],
      },
    ],
  },
  {
    id: 'agencies', name: 'Agencje & Usługi B2B', subtitle: 'Marketing, consulting, prawo, doradztwo',
    icon: 'briefcase', color: '#8b5cf6',
    cases: [
      {
        title: 'Platforma do zarządzania projektami, budżetem i alokacją',
        story: 'Software house z 80 developerami i 25 aktywnymi projektami. PM-owie kompilowali statusy ręcznie. Nikt nie wiedział, które projekty się opłacają.',
        was: '8h/tyg', now: '< 1h/tyg', metricLabel: 'czas PM-a na statusy i raportowanie',
        processes: [
          { name: 'Status projektu', was: 'Standup + Slack + kompilacja', now: 'Dashboard auto z tasków' },
          { name: 'Raport dla klienta', was: '2h ręcznego składania', now: 'Auto-generowany, 1 klik' },
          { name: 'Śledzenie rentowności', was: 'Nie wiedzieliśmy do zamknięcia', now: 'Live, per sprint' },
          { name: 'Alokacja developera', was: '"Kto jest wolny?"', now: 'Matching: skills + dostępność' },
          { name: 'Timesheet', was: 'Z pamięci w piątek', now: 'Auto z tasków, korekta 1×/tydzień' },
        ],
      },
      {
        title: 'System do obsługi spraw dla kancelarii',
        story: 'Kancelaria z 30 prawnikami i 800+ aktywnych spraw. Dokumenty w folderach na dysku, terminy w kalendarzu Outlook. Dwukrotnie w roku przegapienie terminu sądowego.',
        was: '1.5h/dzień', now: '15 min/dzień', metricLabel: 'czas prawnika na administrację sprawy',
        processes: [
          { name: 'Znalezienie dokumentu', was: '10-15 min (folder na dysku)', now: 'Wyszukiwarka pełnotekstowa, 5 sek' },
          { name: 'Kontrola terminów', was: 'Excel + kalendarz Outlook', now: 'System + eskalacja 72h/24h/4h' },
          { name: 'Przygotowanie pisma', was: 'Od zera w Wordzie, 2h', now: '20 min — szablon + auto-dane' },
          { name: 'Rozliczenie godzin', was: 'Ręczne, koniec miesiąca', now: 'Auto z logów aktywności' },
        ],
      },
      {
        title: 'Zintegrowana ofertownia z CRM i follow-upem',
        story: 'Agencja marketingowa — handlowiec pisał ofertę 2 godziny, wysyłał mailem, zapominał o follow-upie. 40% ofert ginęło w próżni.',
        was: '2h', now: '12 min', metricLabel: 'przygotowanie spersonalizowanej oferty',
        processes: [
          { name: 'Generowanie oferty', was: 'Kopiowanie starej w Google Docs', now: 'Szablon + auto-dane z CRM' },
          { name: 'Personalizacja', was: 'Ręczne wklejanie', now: 'Auto z kontaktu + checkboxy zakresu' },
          { name: 'Follow-up po wysłaniu', was: 'Zapominam w 40% przypadków', now: 'Auto-sekwencja: 3d → 7d → 14d' },
          { name: 'Czy klient otworzył ofertę?', was: 'Nie wiedziałem', now: 'Powiadomienie live' },
          { name: 'Win/loss analiza', was: 'Nie mieliśmy', now: 'Auto per handlowiec, per usługa' },
        ],
      },
    ],
  },
  {
    id: 'finance', name: 'Finanse & Księgowość', subtitle: 'Biura rachunkowe, BPO, brokerzy',
    icon: 'dollar-sign', color: '#10b981',
    cases: [
      {
        title: 'OCR + AI do księgowania faktur — 200 klientów, zero przepisywania',
        story: 'Biuro rachunkowe ze 200+ klientami. Faktury przychodziły mailem, WhatsAppem, kurierem. Każda ręcznie przepisywana. Koniec miesiąca = wyścig z czasem.',
        was: '3 dni', now: '4h', metricLabel: 'zamknięcie miesiąca per klient',
        processes: [
          { name: 'Zbieranie dokumentów', was: 'Telefony + maile + WhatsApp', now: 'Portal — klient wrzuca, system potwierdza' },
          { name: 'Rozpoznanie faktury', was: '3 min ręcznego przepisywania', now: '15 sek — OCR + AI (99.7%)' },
          { name: 'Dekretacja', was: 'Ręczna, per dokument', now: 'Auto-sugestia z historii klienta' },
          { name: 'Uzgodnienie z bankiem', was: '2h per klient', now: 'Auto-matching, 5 min' },
          { name: 'Brakujące dokumenty', was: 'Telefon — "proszę przysłać"', now: 'Auto-reminder 3 dni przed deadline' },
        ],
      },
      {
        title: 'Dashboard finansowy zamiast Excela z 8 zakładkami',
        story: 'Dyrektor finansowy dostawał raport miesięczny po 3 dniach. Dane z 8 systemów zbierane ręcznie, konsolidowane w Excelu z makrami, które rozumiał tylko autor.',
        was: '3 dni', now: '10 sek', metricLabel: 'czas generowania raportu finansowego',
        processes: [
          { name: 'Pobranie danych z banku', was: 'Ręczny eksport CSV', now: 'API, auto-sync co godzinę' },
          { name: 'Konsolidacja źródeł', was: 'Excel z makrami, 8 plików', now: 'Auto-pipeline, 1 źródło prawdy' },
          { name: 'Wizualizacja dla zarządu', was: 'Wykresy w Excelu → PPT', now: 'Interaktywny dashboard, drill-down' },
          { name: 'Analiza odchyleń', was: 'Ręczne porównanie z budżetem', now: 'Auto-highlight anomalii' },
        ],
      },
      {
        title: 'System do obsługi szkód z portalem klienta',
        story: 'Broker ubezpieczeniowy — klient zgłaszał szkodę telefonicznie, potem mailował zdjęcia. Proces ciągnął się tygodniami, klient dzwonił codziennie.',
        was: '14 dni', now: '5 dni', metricLabel: 'średni czas likwidacji szkody',
        processes: [
          { name: 'Zgłoszenie szkody', was: 'Telefon + mail z opisem', now: 'Formularz online z foto + OCR' },
          { name: 'Weryfikacja polisy', was: 'Ręczne sprawdzenie w 3 systemach', now: 'Auto-match po PESEL/NIP' },
          { name: 'Przesłanie do TU', was: 'Ręczne wklepanie do portalu TU', now: 'Auto-integracja API' },
          { name: 'Status dla klienta', was: 'Telefon — "sprawdzę i oddzwonię"', now: 'Portal klienta, auto-update' },
        ],
      },
    ],
  },
  {
    id: 'construction', name: 'Budownictwo & Nieruchomości', subtitle: 'Wykonawcy, deweloperzy, zarządcy',
    icon: 'home', color: '#ec4899',
    cases: [
      {
        title: 'Cyfrowy dziennik budowy — z telefonu, nie z kserówki',
        story: 'Kierownik budowy prowadził dziennik na papierze, robił zdjęcia telefonem (które zostawały w telefonie), pisał raporty w Wordzie.',
        was: '45 min/dzień', now: '5 min/dzień', metricLabel: 'czas kierownika na dokumentację dzienną',
        processes: [
          { name: 'Wpis do dziennika', was: 'Ręcznie na papierze', now: 'Apka — tekst, głos, zdjęcie' },
          { name: 'Dokumentacja zdjęciowa', was: 'Telefon → "gdzieś mam"', now: 'Auto-tag: data, lokalizacja, etap' },
          { name: 'Raport dzienny', was: '1h pisania w Wordzie', now: 'Auto-generowany z wpisów dnia' },
          { name: 'Przygotowanie do kontroli', was: '3-5 dni zbierania papierów', now: 'Zawsze gotowy, 1 filtr' },
        ],
      },
      {
        title: 'System rozliczeń podwykonawców z odbiorami robót',
        story: 'Deweloper z 5 budowami i 40+ podwykonawcami. Odbiory robót na kartce, rozliczenia w Excelu u każdego PM-a osobno.',
        was: '3h/tyg', now: '20 min/tyg', metricLabel: 'rozliczanie podwykonawców per budowa',
        processes: [
          { name: 'Odbiór częściowy robót', was: 'Kartka z podpisem', now: 'Apka: zdjęcie + GPS + e-podpis' },
          { name: 'Zaawansowanie finansowe', was: 'Excel PM-a, raz w miesiącu', now: 'Auto z odbiorów, real-time' },
          { name: 'Faktura podwykonawcy', was: 'Weryfikacja 3 godziny', now: 'Auto-weryfikacja z protokołem' },
          { name: 'Spory o zakres', was: 'Częste i kosztowne', now: 'Dokumentacja w systemie od dnia 1' },
        ],
      },
    ],
  },
  {
    id: 'gastro', name: 'Gastronomia & Spożywcza', subtitle: 'Restauracje, cukiernie, catering, produkcja',
    icon: 'coffee', color: '#f97316',
    cases: [
      {
        title: 'Zamówienia surowców oparte o dane, nie o "oko" szefa kuchni',
        story: 'Sieć 4 restauracji — szef kuchni zamawiał "ile trzeba" na podstawie doświadczenia. Raz za dużo, raz za mało. Nikt nie wiedział ile zużywają per danie.',
        was: '1h/dzień', now: '5 min/dzień', metricLabel: 'planowanie zakupów na kuchnię',
        processes: [
          { name: 'Analiza stanów', was: 'Na oko / ręczne liczenie', now: 'Auto z POS + kartoteka' },
          { name: 'Zamówienie do dostawcy', was: 'Telefon / SMS', now: 'Auto-generowane z progu minimum' },
          { name: 'Predykcja zużycia', was: 'Z doświadczenia', now: 'ML z historii + rezerwacji' },
          { name: 'Kontrola food waste', was: 'Nie mierzyliśmy tego', now: 'Codzienny raport, -45% marnowania' },
        ],
      },
      {
        title: 'System obsługi cateringu — od formularza do dostawy',
        story: 'Cukiernia obsługująca 200+ zamówień cateringowych miesięcznie. Zamówienia telefonicznie, potwierdzenia mailem, logistyka w głowie jednej osoby.',
        was: '30 min', now: '2 min', metricLabel: 'przyjęcie i potwierdzenie zamówienia',
        processes: [
          { name: 'Przyjęcie zamówienia', was: 'Telefon → karteczka', now: 'Formularz online z kalkulacją' },
          { name: 'Potwierdzenie z ceną', was: 'Mail ręcznie, dzień później', now: 'Auto, natychmiast' },
          { name: 'Przekazanie do produkcji', was: 'Karteczka na ladzie', now: 'Auto na ekranie w kuchni' },
          { name: 'Planowanie dostawy', was: 'Jedna osoba planuje z głowy', now: 'Auto-optymalizacja tras' },
          { name: 'Faktura / paragon', was: 'Ręcznie po dostawie', now: 'Auto-wysyłka po dostawie' },
        ],
      },
    ],
  },
  {
    id: 'it', name: 'IT & Software House', subtitle: 'Software house, SaaS, systemy, wdrożenia',
    icon: 'code', color: '#6366f1',
    cases: [
      {
        title: 'Onboarding developera — z 3 tygodni do 3 dni',
        story: 'Nowy developer dostawał 15 linków do Confluence (połowa nieaktualnych), 3 repozytoria i życzenia powodzenia. Produktywny po 3 tygodniach.',
        was: '3 tyg', now: '3 dni', metricLabel: 'czas do pierwszego merge requesta',
        processes: [
          { name: 'Setup środowiska', was: '1 dzień + frustracja', now: '30 min, zautomatyzowany skrypt' },
          { name: 'Dostępy do systemów', was: 'Mail do IT → 3 dni', now: 'Auto-provisioning z checklist' },
          { name: 'Zrozumienie architektury', was: 'Confluence (nieaktualne)', now: 'Auto-generowana, zawsze świeża' },
          { name: 'Pierwszy task', was: 'Tydzień 2, "jak się rozejrzysz"', now: 'Dzień 1, pre-selected task' },
        ],
      },
      {
        title: 'Monitoring i incident response — zanim klient zadzwoni',
        story: 'Klient dzwonił z "aplikacja nie działa" — zanim ktokolwiek w zespole wiedział o problemie. SLA compliance 94% — każdy incydent zaczynał się od zera.',
        was: '45 min', now: '90 sek', metricLabel: 'od incydentu do podjęcia działania',
        processes: [
          { name: 'Wykrycie problemu', was: 'Klient dzwoni / pisze', now: 'Auto-alert z metryk i logów' },
          { name: 'Diagnoza root cause', was: '30 min szukania po logach', now: 'Auto-korelacja logów i metryk' },
          { name: 'Eskalacja', was: 'Slack → kto jest online?', now: 'Auto-routing wg on-call schedule' },
          { name: 'Post-mortem', was: 'Zapominaliśmy robić', now: 'Auto-generowany szkic z timeline' },
          { name: 'SLA compliance', was: '94% i spadało', now: '99.8% i stabilne' },
        ],
      },
    ],
  },
  {
    id: 'healthcare', name: 'Medycyna & Zdrowie', subtitle: 'Kliniki, gabinety, optyki, weterynaria',
    icon: 'activity', color: '#ef4444',
    cases: [
      {
        title: 'Rejestracja online + system przypomień — no-show z 30% do 8%',
        story: 'Klinika z 6 gabinetami — recepcja non-stop na telefonie. 30% umówionych pacjentów nie przychodziło. Strata: ~40 wizyt tygodniowo.',
        was: '5 min', now: '30 sek', metricLabel: 'czas rejestracji jednego pacjenta',
        processes: [
          { name: 'Umawianie wizyty', was: 'Tylko telefonicznie', now: 'Online 24/7 (70% bookingów)' },
          { name: 'Przypomnienie o wizycie', was: 'Nie robiliśmy tego', now: 'SMS 24h + 2h przed wizytą' },
          { name: 'Odwołanie / przesunięcie', was: 'Telefon do recepcji', now: 'Self-service w SMS / portalu' },
          { name: 'Zapełnianie luk z odwołań', was: 'Nie zdążaliśmy', now: 'Auto-oferta do oczekujących' },
          { name: 'Weryfikacja ubezpieczenia', was: 'Ręczna, 3 min na pacjenta', now: 'Auto eWUŚ przy rejestracji' },
        ],
      },
      {
        title: 'System obiegu dokumentów medycznych i e-recepty',
        story: 'Lekarz po każdej wizycie spędzał 15 minut na dokumentacji. "Pracuję dla systemu, nie dla pacjenta" — to zdanie słyszeliśmy od każdego.',
        was: '15 min', now: '3 min', metricLabel: 'dokumentacja jednej wizyty',
        processes: [
          { name: 'Opis wizyty', was: 'Od zera, każdy raz', now: 'Szablon + auto-uzupełnienie' },
          { name: 'Wystawienie e-recepty', was: '5 min (szukanie leku)', now: '30 sek — podpowiedzi z historii' },
          { name: 'Dostęp do historii', was: 'Teczka papierowa / szukanie', now: '1 ekran — pełna historia' },
          { name: 'Wyniki dla pacjenta', was: 'Wizyta / telefon / mail', now: 'Portal pacjenta, auto' },
        ],
      },
    ],
  },
  {
    id: 'hr', name: 'HR & Rekrutacja', subtitle: 'Agencje pracy, rekrutacja, benefity, kadry',
    icon: 'users', color: '#14b8a6',
    cases: [
      {
        title: 'Obieg dokumentów pracowniczych — z papierów do systemu',
        story: 'Firma z 300 pracownikami — dział HR (3 osoby) tonął w papierach: umowy, aneksy, wnioski urlopowe. Onboarding = 15 dokumentów, 8 systemów, 5 osób.',
        was: '3 dni', now: '4h', metricLabel: 'pełny onboarding nowego pracownika',
        processes: [
          { name: 'Dokumenty do podpisania', was: '15 papierów, druk, skan', now: 'E-podpis, 10 minut, z domu' },
          { name: 'Konto w systemach', was: 'Mail do IT → 2 dni', now: 'Auto-provisioning z HR-ówki' },
          { name: 'Wnioski urlopowe', was: 'Papierowy wniosek', now: 'Portal self-service' },
          { name: 'Zaświadczenia', was: 'Prośba → HR szuka → 2 dni', now: 'Auto-generowane, instant' },
        ],
      },
      {
        title: 'System do delegowania pracowników tymczasowych',
        story: 'Agencja pracy delegująca 500+ osób do 30 klientów. Grafiki w Excelu, obecności na papierze. Gdy ktoś nie przyszedł — panika.',
        was: '2h/dzień', now: '15 min/dzień', metricLabel: 'zarządzanie grafikami i obecnościami',
        processes: [
          { name: 'Planowanie grafiku', was: 'Excel + telefon do każdego', now: 'System z auto-dopasowaniem' },
          { name: 'Ewidencja obecności', was: 'Papierowa lista, faxowana', now: 'Apka mobilna + GPS' },
          { name: 'Zastępstwo za nieobecność', was: '1-2h telefonów', now: 'Auto-sugestia z puli' },
          { name: 'Rozliczenie z klientem', was: 'Ręczne, 3 dni', now: 'Auto z ewidencji, 1 klik' },
          { name: 'Raport dla klienta', was: 'Excel mailem', now: 'Portal klienta, auto-update' },
        ],
      },
    ],
  },
  {
    id: 'education', name: 'Edukacja & Szkolenia', subtitle: 'Szkoły, kursy, LMS, wydawnictwa',
    icon: 'book-open', color: '#a855f7',
    cases: [
      {
        title: 'Platforma kursowa — od zapisu po certyfikat bez ręcznej pracy',
        story: 'Firma szkoleniowa z 50+ kursami. Zapisy przez Google Forms, płatności przelewem, potwierdzenia ręcznie. Przy 200+ uczestnikach ktoś zawsze wypadał z listy.',
        was: '20 min', now: '0 min', metricLabel: 'obsługa jednego zapisu (pełny automat)',
        processes: [
          { name: 'Zapis na kurs', was: 'Google Form → Excel → mail', now: 'Portal z płatnością online' },
          { name: 'Potwierdzenie + materiały', was: 'Ręczny mail z załącznikiem', now: 'Auto-mail + dostęp do LMS' },
          { name: 'Przypomnienie przed kursem', was: 'Zapominaliśmy', now: 'Auto: 24h + 1h przed' },
          { name: 'Certyfikat po ukończeniu', was: '2 tygodnie (Word, druk, poczta)', now: '5 min — auto PDF z QR' },
          { name: 'Weryfikacja certyfikatu', was: 'Telefon do nas', now: 'Skan QR = wynik online' },
        ],
      },
      {
        title: 'System rozliczeń trenerów z ewidencją godzin',
        story: 'Akademia — 15 trenerów z różnymi stawkami per typ szkolenia. Ewidencja z ręcznych wpisów, rozliczenie = 2 dni pracy administracji.',
        was: '2 dni', now: '30 min', metricLabel: 'rozliczenie wszystkich trenerów miesięcznie',
        processes: [
          { name: 'Ewidencja godzin', was: 'Ręczny wpis, z pamięci', now: 'Auto z kalendarza kursów' },
          { name: 'Kalkulacja wynagrodzenia', was: 'Excel z 3 rodzajami stawek', now: 'Auto — stawka per typ kursu' },
          { name: 'Rezerwacja sali', was: 'Telefon / mail do biura', now: 'Auto z grafiku + alert konfliktu' },
          { name: 'Rachunek / faktura', was: 'Trener wystawia, my sprawdzamy', now: 'Auto-generowany z ewidencji' },
        ],
      },
    ],
  },
];

/* ── Mockup component — shows a system dashboard for the case ── */
function CaseMockup({ c, color }: { c: Case; color: string }) {
  return (
    <div className="cs-mockup" style={{ '--cs-c': color, '--cs-cl': `${color}10`, '--cs-cm': `${color}22` } as React.CSSProperties}>
      {/* Window chrome */}
      <div className="cs-mock-chrome">
        <div className="cs-mock-dots"><span /><span /><span /></div>
        <div className="cs-mock-tab">System — Panel zarządzania</div>
      </div>

      <div className="cs-mock-app">
        {/* Sidebar */}
        <div className="cs-mock-sidebar">
          <div className="cs-mock-sidebar-logo">
            <div className="cs-mock-logo-circle" />
            <div className="cs-mock-logo-text" />
          </div>
          <div className="cs-mock-nav">
            {['Dashboard', 'Procesy', 'Raporty', 'Ustawienia'].map((label, i) => (
              <div key={label} className={`cs-mock-nav-item ${i === 0 ? 'active' : ''}`}>
                <div className="cs-mock-nav-icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="cs-mock-main">
          {/* Hero metric */}
          <div className="cs-mock-hero">
            <div className="cs-mock-hero-label">{c.metricLabel}</div>
            <div className="cs-mock-hero-row">
              <div className="cs-mock-hero-old">
                <span className="cs-mock-hero-val-old">{c.was}</span>
                <span className="cs-mock-hero-tag">Było</span>
              </div>
              <div className="cs-mock-hero-arrow">
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                  <path d="M0 6h26m0 0l-4-4M26 6l-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="cs-mock-hero-new">
                <span className="cs-mock-hero-val-new">{c.now}</span>
                <span className="cs-mock-hero-tag">Jest</span>
              </div>
            </div>
          </div>

          {/* Process rows as dashboard cards */}
          <div className="cs-mock-processes">
            {c.processes.slice(0, 4).map((p, j) => (
              <div className="cs-mock-proc" key={j}>
                <div className="cs-mock-proc-dot" />
                <div className="cs-mock-proc-info">
                  <span className="cs-mock-proc-name">{p.name}</span>
                  <div className="cs-mock-proc-compare">
                    <span className="cs-mock-proc-was">{p.was}</span>
                    <svg width="14" height="6" viewBox="0 0 14 6" fill="none">
                      <path d="M0 3h10m0 0l-2-2M10 3l-2 2" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                    </svg>
                    <span className="cs-mock-proc-now">{p.now}</span>
                  </div>
                </div>
                <div className="cs-mock-proc-bar">
                  <div className="cs-mock-proc-bar-fill" style={{ width: `${65 + j * 8}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom status bar */}
          <div className="cs-mock-status">
            <div className="cs-mock-status-dot" />
            <span>System aktywny</span>
            <span className="cs-mock-status-sep">|</span>
            <span>Ostatnia synchronizacja: teraz</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [selected, setSelected] = useState<string | null>(null);
  const [caseIdx, setCaseIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const industry = data.find(d => d.id === selected);
  const currentCase = industry?.cases[caseIdx];

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [selected, caseIdx]);

  const goToIndustry = (id: string) => {
    setSelected(id);
    setCaseIdx(0);
  };

  const totalCases = industry ? industry.cases.length : 0;

  return (
    <div className="cs">
      {/* Header — matches imap-header pattern */}
      <div className="cs-header">
        {industry && (
          <button className="cs-back" onClick={() => setSelected(null)}>
            <Icon name="arrow-left" size={18} strokeWidth={2} />
          </button>
        )}
        <div className="cs-header-text">
          <span className="cs-title">
            {industry ? industry.name : 'Case Studies'}
          </span>
          <span className="cs-breadcrumb">
            {industry
              ? `${totalCases} wdrożeń — realne wyniki, mierzalny efekt`
              : 'Wybierz branżę i zobacz, jak automatyzacja zmienia firmy'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="cs-body" ref={scrollRef}>
        <AnimatePresence mode="wait">
          {/* INDUSTRY GRID */}
          {!industry && (
            <motion.div className="cs-content" key="grid"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease }}>
              <div className="cs-tiles">
                {data.map((ind, i) => (
                  <motion.button className="cs-tile" key={ind.id}
                    style={{ '--cs-c': ind.color, '--cs-cl': `${ind.color}10`, '--cs-cm': `${ind.color}22` } as React.CSSProperties}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease }}
                    onClick={() => goToIndustry(ind.id)}
                  >
                    <div className="cs-tile-gradient" />
                    <div className="cs-tile-icon">
                      <Icon name={ind.icon} size={20} strokeWidth={1.8} />
                    </div>
                    <div className="cs-tile-info">
                      <span className="cs-tile-name">{ind.name}</span>
                      <span className="cs-tile-sub">{ind.subtitle}</span>
                    </div>
                    <div className="cs-tile-meta">
                      <span className="cs-tile-count">{ind.cases.length} case{ind.cases.length !== 1 ? 's' : ''}</span>
                      <span className="cs-tile-arrow">&#8250;</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CASE DETAIL — Split layout */}
          {industry && currentCase && (
            <motion.div className="cs-detail" key={`${industry.id}-${caseIdx}`}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease }}>

              {/* Left — system mockup */}
              <div className="cs-detail-left">
                <CaseMockup c={currentCase} color={industry.color} />
                <div className="cs-mockup-caption">
                  Przykład systemu dedykowanego — każdy projektujemy od zera
                </div>
              </div>

              {/* Right — case info */}
              <div className="cs-detail-right" style={{ '--cs-c': industry.color, '--cs-cl': `${industry.color}10`, '--cs-cm': `${industry.color}22` } as React.CSSProperties}>
                {/* Title & story */}
                <div className="cs-detail-scroll">
                  <h2 className="cs-detail-title">{currentCase.title}</h2>
                  <p className="cs-detail-story">{currentCase.story}</p>

                  {/* Big metric */}
                  <div className="cs-detail-metric">
                    <div className="cs-detail-metric-nums">
                      <div className="cs-detail-metric-block">
                        <span className="cs-detail-metric-tag">Było</span>
                        <span className="cs-detail-metric-val cs-detail-metric-val--old">{currentCase.was}</span>
                      </div>
                      <svg className="cs-detail-metric-arrow" width="36" height="14" viewBox="0 0 36 14" fill="none">
                        <path d="M0 7h30m0 0l-5-5M30 7l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="cs-detail-metric-block">
                        <span className="cs-detail-metric-tag">Jest</span>
                        <span className="cs-detail-metric-val cs-detail-metric-val--new">{currentCase.now}</span>
                      </div>
                    </div>
                    <span className="cs-detail-metric-label">{currentCase.metricLabel}</span>
                  </div>

                  {/* Process list */}
                  <div className="cs-detail-procs">
                    {currentCase.processes.map((p, j) => (
                      <div className="cs-detail-proc" key={j}>
                        <div className="cs-detail-proc-header">
                          <span className="cs-detail-proc-num">{String(j + 1).padStart(2, '0')}</span>
                          <span className="cs-detail-proc-name">{p.name}</span>
                        </div>
                        <div className="cs-detail-proc-row">
                          <span className="cs-detail-proc-was">{p.was}</span>
                          <span className="cs-detail-proc-now">{p.now}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="cs-detail-nav">
                  <button className="cs-nav-btn" disabled={caseIdx === 0}
                    onClick={() => setCaseIdx(i => i - 1)}>
                    <Icon name="chevron-left" size={14} strokeWidth={2.5} />
                  </button>
                  <div className="cs-nav-dots">
                    {industry.cases.map((_, i) => (
                      <button key={i}
                        className={`cs-nav-dot ${i === caseIdx ? 'active' : ''}`}
                        onClick={() => setCaseIdx(i)} />
                    ))}
                  </div>
                  <span className="cs-nav-counter">{caseIdx + 1} / {industry.cases.length}</span>
                  <button className="cs-nav-btn" disabled={caseIdx === industry.cases.length - 1}
                    onClick={() => setCaseIdx(i => i + 1)}>
                    <Icon name="chevron-right" size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
