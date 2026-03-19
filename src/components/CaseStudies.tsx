import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

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
        story: 'Dział księgowości zakładu produkcyjnego opakowań dostawał 400+ faktur miesięcznie — mailem, kurierem, czasem jako zdjęcie z WhatsAppa. Każda była ręcznie przepisywana do systemu ERP. Pomyłki w kwotach, duplikaty, opóźnione płatności — norma.',
        was: '6 min', now: '15 sek', metricLabel: 'obsługa jednej faktury kosztowej',
        processes: [
          { name: 'Rozpoznanie danych z faktury', was: 'Ręczne przepisywanie', now: 'OCR + AI, 99.7% skuteczności' },
          { name: 'Dopasowanie do zamówienia', was: 'Szukanie w ERP ręcznie', now: 'Auto-matching po PO number' },
          { name: 'Dekretacja kosztów', was: 'Księgowa decyduje per faktura', now: 'Auto-sugestia z historii (92% trafność)' },
          { name: 'Wykrycie duplikatu', was: 'Czasem się nie udawało', now: 'Blokada automatyczna' },
          { name: 'Synchronizacja z ERP', was: 'Ręczny import, raz dziennie', now: 'Dwukierunkowa, real-time' },
        ],
      },
      {
        title: 'Panel klienta dla produkcji na zamówienie',
        story: 'Producent komponentów metalowych dostawał 30+ telefonów dziennie z pytaniem "kiedy moje zamówienie?". Handlowcy szli do hali, pytali kierownika zmiany, oddzwaniali. A klient i tak nie wiedział, na jakim etapie jest jego zlecenie.',
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
        story: 'Zakład z 12 liniami produkcyjnymi — wiedza serwisowa w głowach dwóch mechaników. Gdy Jasiek szedł na urlop, nikt nie wiedział co, kiedy i jak serwisować. Awarie kosztowały średnio 50k dziennie w utraconym outputcie.',
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
        story: 'Firma TSL ze 180 pojazdami. Na koniec miesiąca kierowcy przywozili pendrive\'y z tachografem, papierowe delegacje i paragony za paliwo. Kadrowa z dwoma osobami zamykała rozliczenia przez 5 dni. A i tak zdarzały się błędy w dietach.',
        was: '5 dni', now: '6h', metricLabel: 'zamknięcie rozliczeń miesięcznych floty',
        processes: [
          { name: 'Import danych z tachografu', was: 'Pendrive + ręczny upload', now: 'Auto-download przez GSM' },
          { name: 'Naliczanie diet i delegacji', was: 'Ręcznie wg tabelki', now: 'Auto z GPS + trasy' },
          { name: 'Weryfikacja czasu pracy', was: 'Wyrywkowo, "na oko"', now: '100% automatyczna, ciągła' },
          { name: 'Rozliczenie paliwowe', was: 'Paragony + Excel, raz/miesiąc', now: 'Karta flotowa → auto-import' },
          { name: 'Wykrycie anomalii (np. tankowanie)', was: 'Praktycznie brak', now: 'Alert w ciągu godziny' },
        ],
      },
      {
        title: 'Portal śledzenia dla klientów spedycji',
        story: '15 dyspozytorów, a i tak klienci czekali na informację o statusie. Każdy telefon "gdzie jest moja paczka?" angażował dyspozytora na 10 minut — bo musiał zadzwonić do kierowcy, znaleźć zlecenie, oddzwonić.',
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
        story: 'Dystrybutor FMCG z 1200 klientami. Dane sprzedażowe w labiryncie Exceli — każdy handlowiec prowadził swój plik, kierownik regionu swój, a dyrektor łączył to na koniec kwartału. Decyzje podejmowane na danych sprzed 3 miesięcy.',
        was: '65h/mies.', now: 'Auto', metricLabel: 'praca na przygotowaniu raportów sprzedażowych',
        processes: [
          { name: 'Import danych z kanałów', was: 'Ręczne kopiowanie z 6 Exceli', now: 'Auto z ERP + e-commerce' },
          { name: 'Czyszczenie i spójność danych', was: '2 osoby, cały poniedziałek', now: 'Reguły walidacji, auto' },
          { name: 'Raport dla zarządu', was: 'Piątek, koniec dnia (jeśli zdążę)', now: 'Zawsze aktualny, live' },
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
        story: 'Sprzedaż na Allegro, własny Shopify, hurtownia B2B, Amazon i punkt stacjonarny — a stany magazynowe aktualizowane dwa razy dziennie ręcznym eksportem z WMS. Co tydzień ktoś kupował coś, czego fizycznie nie było.',
        was: '2×/dzień', now: 'Real-time', metricLabel: 'synchronizacja stanów między kanałami',
        processes: [
          { name: 'Aktualizacja stanów', was: 'CSV export → import, ręcznie', now: 'Event-driven, per transakcja' },
          { name: 'Overselling (sprzedaż bez towaru)', was: '~12 tygodniowo', now: '< 1 miesięcznie' },
          { name: 'Dodanie nowego kanału', was: '3-4 tygodnie integracji', now: '2-3 dni z gotowym API' },
          { name: 'Cenowanie per kanał', was: 'Ręczna zmiana per platforma', now: 'Reguły cenowe, auto-dystrybucja' },
        ],
      },
      {
        title: 'Fulfillment, w którym człowiek tylko pakuje',
        story: 'Sklep z 2000+ zamówień dziennie i 4 magazynami. Zamówienie wpadało → ktoś sprawdzał stan → ktoś przypisywał magazyn → ktoś drukował etykietę. 12 osób robiło pracę, którą może robić system.',
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
        story: 'Pricing manager ręcznie monitorował ceny konkurencji — otwierał ich sklepy, porównywał, wpisywał do arkusza, kalkulował nową cenę. 4000 produktów × 3 kanały. Jedna runda cenowa: tydzień. Czyli ceny były aktualne przez 3 dni, potem znowu nieaktualne.',
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
        story: 'Software house z 80 developerami i 25 aktywnymi projektami. PM-owie kompilowali statusy ręcznie na standupach, klient pytał o progress — szukanie po Slacku i Jirze. Nikt dokładnie nie wiedział, które projekty się opłacają, a które jadą pod kreską.',
        was: '8h/tyg', now: '< 1h/tyg', metricLabel: 'czas PM-a na statusy i raportowanie',
        processes: [
          { name: 'Status projektu', was: 'Standup + Slack + kompilacja', now: 'Dashboard auto z tasków' },
          { name: 'Raport dla klienta', was: '2h ręcznego składania', now: 'Auto-generowany, 1 klik' },
          { name: 'Śledzenie rentowności projektu', was: 'Nie wiedzieliśmy do zamknięcia', now: 'Live, per sprint' },
          { name: 'Alokacja nowego developera', was: '"Kto jest wolny?"', now: 'Matching: skills + dostępność + velocity' },
          { name: 'Timesheet', was: 'Z pamięci w piątek, bo nikt lubi', now: 'Auto z tasków, korekta 1×/tydzień' },
        ],
      },
      {
        title: 'System do obsługi spraw dla kancelarii',
        story: 'Kancelaria z 30 prawnikami i 800+ aktywnych spraw. Dokumenty w folderach na dysku, terminy w kalendarzu Outlook i w Excelu. Dwukrotnie w roku zdarzało się przegapić termin sądowy. Za każdym razem: stres, kara, utrata zaufania klienta.',
        was: '1.5h/dzień', now: '15 min/dzień', metricLabel: 'czas prawnika na administrację sprawy',
        processes: [
          { name: 'Znalezienie dokumentu w sprawie', was: '10-15 min (folder na dysku)', now: 'Wyszukiwarka pełnotekstowa, 5 sek' },
          { name: 'Kontrola terminów procesowych', was: 'Excel + kalendarz Outlook', now: 'System pilnuje + eskalacja 72h/24h/4h' },
          { name: 'Przygotowanie pisma procesowego', was: 'Od zera w Wordzie, 2h', now: '20 min — szablon + auto-dane klienta' },
          { name: 'Rozliczenie godzin per klient', was: 'Ręczne, koniec miesiąca', now: 'Auto z logów aktywności' },
        ],
      },
      {
        title: 'Zintegrowana ofertownia z CRM i follow-upem',
        story: 'Agencja marketingowa — handlowiec pisał ofertę 2 godziny w Google Docs, wysyłał mailem, a potem zapominał o follow-upie. 40% ofert ginęło w próżni. Nie wiedzieli nawet, czy klient otworzył PDFa.',
        was: '2h', now: '12 min', metricLabel: 'przygotowanie spersonalizowanej oferty',
        processes: [
          { name: 'Generowanie oferty', was: 'Kopiowanie starej w Google Docs', now: 'Szablon + auto-dane z CRM' },
          { name: 'Personalizacja (logo, dane, zakres)', was: 'Ręczne wklejanie', now: 'Auto z kontaktu + checkboxy zakresu' },
          { name: 'Follow-up po wysłaniu', was: 'Zapominam w 40% przypadków', now: 'Auto-sekwencja: 3d → 7d → 14d' },
          { name: 'Czy klient otworzył ofertę?', was: 'Nie wiedziałem', now: 'Powiadomienie live + ile czasu spędził' },
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
        story: 'Biuro rachunkowe ze 200+ klientami. Faktury przychodziły mailem, WhatsAppem, kurierem, a czasem jako zdjęcie z telefonu. Każda ręcznie przepisywana. Na koniec miesiąca — wyścig z czasem, praca po godzinach, stres.',
        was: '3 dni', now: '4h', metricLabel: 'zamknięcie miesiąca per klient',
        processes: [
          { name: 'Zbieranie dokumentów od klienta', was: 'Telefony + maile + WhatsApp', now: 'Portal — klient wrzuca, system potwierdza' },
          { name: 'Rozpoznanie i odczyt faktury', was: '3 min ręcznego przepisywania', now: '15 sek — OCR + AI (99.7% accuracy)' },
          { name: 'Dekretacja', was: 'Ręczna, per dokument', now: 'Auto-sugestia z historii klienta' },
          { name: 'Uzgodnienie z wyciągiem bankowym', was: '2h per klient', now: 'Auto-matching, 5 min' },
          { name: 'Brakujące dokumenty', was: 'Telefon → "proszę przysłać"', now: 'Auto-reminder na 3 dni przed deadline' },
        ],
      },
      {
        title: 'Dashboard finansowy zamiast Excela z 8 zakładkami',
        story: 'Dyrektor finansowy dostawał raport miesięczny po 3 dniach od zamknięcia miesiąca. Dane z 8 systemów zbierane ręcznie, konsolidowane w Excelu z makrami, które rozumiał tylko autor. Gdy ten poszedł na urlop — raport się opóźniał.',
        was: '3 dni', now: '10 sek', metricLabel: 'czas generowania raportu finansowego',
        processes: [
          { name: 'Pobranie danych z banku', was: 'Ręczny eksport CSV', now: 'API, auto-sync co godzinę' },
          { name: 'Konsolidacja z wielu źródeł', was: 'Excel z makrami, 8 plików', now: 'Auto-pipeline, 1 źródło prawdy' },
          { name: 'Wizualizacja dla zarządu', was: 'Wykresy w Excelu → PowerPoint', now: 'Interaktywny dashboard, drill-down' },
          { name: 'Analiza odchyleń', was: 'Ręczne porównanie z budżetem', now: 'Auto-highlight anomalii' },
        ],
      },
      {
        title: 'System do obsługi szkód z portalem klienta',
        story: 'Broker ubezpieczeniowy — klient zgłaszał szkodę przez telefon, potem mailował zdjęcia, potem ktoś ręcznie wpisywał dane do systemu TU. Proces ciągnął się tygodniami, klient dzwonił codziennie "co ze szkodą?".',
        was: '14 dni', now: '5 dni', metricLabel: 'średni czas likwidacji szkody',
        processes: [
          { name: 'Zgłoszenie szkody', was: 'Telefon + mail z opisem', now: 'Formularz online z foto + OCR dokumentów' },
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
        story: 'Kierownik budowy prowadził dziennik na papierze, robił zdjęcia telefonem (które zostawały w telefonie), pisał raporty w Wordzie. Kontrola nadzoru? Tydzień szukania dokumentów po biurze i mailach.',
        was: '45 min/dzień', now: '5 min/dzień', metricLabel: 'czas kierownika na dokumentację dzienną',
        processes: [
          { name: 'Wpis do dziennika', was: 'Ręcznie na papierze', now: 'Apka — tekst, głos, zdjęcie w 1 miejscu' },
          { name: 'Dokumentacja zdjęciowa', was: 'Telefon → "gdzieś mam"', now: 'Auto-tagowanie: data, lokalizacja, etap' },
          { name: 'Raport dzienny dla inwestora', was: '1h pisania w Wordzie', now: 'Auto-generowany z wpisów dnia' },
          { name: 'Przygotowanie do kontroli', was: '3-5 dni zbierania papierów', now: 'Zawsze gotowy, 1 filtr' },
        ],
      },
      {
        title: 'System rozliczeń podwykonawców z odbiorami robót',
        story: 'Deweloper z 5 równoległymi budowami i 40+ podwykonawcami. Odbiory robót na kartce, rozliczenia w Excelu u każdego project managera osobno. Nikt nie miał pełnego obrazu zaawansowania.',
        was: '3h/tyg', now: '20 min/tyg', metricLabel: 'rozliczanie podwykonawców per budowa',
        processes: [
          { name: 'Odbiór częściowy robót', was: 'Kartka z podpisem', now: 'Apka: zdjęcie + GPS + podpis cyfrowy' },
          { name: 'Zaawansowanie finansowe', was: 'Excel PM-a, raz w miesiącu', now: 'Auto z odbiorów, real-time' },
          { name: 'Faktura podwykonawcy', was: 'Weryfikacja 3 godziny', now: 'Auto-weryfikacja z protokołem' },
          { name: 'Spory o zakres "co było w umowie"', was: 'Częste i kosztowne', now: 'Dokumentacja w systemie od dnia 1' },
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
        story: 'Sieć 4 restauracji — szef kuchni zamawiał "ile trzeba" na podstawie doświadczenia. Raz za dużo (marnowanie), raz za mało (brak pozycji w menu). Nikt nie wiedział, ile naprawdę zużywają per danie.',
        was: '1h/dzień', now: '5 min/dzień', metricLabel: 'planowanie zakupów na kuchnię',
        processes: [
          { name: 'Analiza stanów magazynowych', was: 'Na oko / ręczne liczenie', now: 'Auto z POS + kartoteka' },
          { name: 'Zamówienie do dostawcy', was: 'Telefon / SMS', now: 'Auto-generowane z progu minimum' },
          { name: 'Predykcja zużycia na jutro', was: 'Z doświadczenia', now: 'ML z historii + rezerwacji + pory roku' },
          { name: 'Kontrola food waste', was: 'Nie mierzyliśmy tego', now: 'Codzienny raport, -45% marnowania' },
        ],
      },
      {
        title: 'System obsługi cateringu — od formularza do dostawy',
        story: 'Cukiernia obsługująca 200+ zamówień cateringowych miesięcznie. Zamówienia przez telefon, potwierdzenia mailem (jak ktoś pamięta), logistyka dostaw w głowie jednej osoby.',
        was: '30 min', now: '2 min', metricLabel: 'przyjęcie i potwierdzenie zamówienia cateringowego',
        processes: [
          { name: 'Przyjęcie zamówienia', was: 'Telefon → karteczka', now: 'Formularz online z kalkulacją' },
          { name: 'Potwierdzenie z ceną', was: 'Mail ręcznie, czasem dzień później', now: 'Auto, natychmiast po złożeniu' },
          { name: 'Przekazanie do produkcji', was: 'Karteczka na ladzie', now: 'Auto na ekranie w kuchni' },
          { name: 'Planowanie dostawy', was: 'Jedna osoba planuje z głowy', now: 'Auto-optymalizacja tras + timeframe' },
          { name: 'Faktura / paragon', was: 'Ręcznie po dostawie', now: 'Auto-wysyłka po potwierdzeniu dostawy' },
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
        story: 'Nowy developer dostawał 15 linków do Confluence (połowa nieaktualnych), 3 repozytoria i życzenia powodzenia. Setup środowiska = cały dzień. Dostępy do systemów = 3 dni czekania na IT. Produktywny po 3 tygodniach.',
        was: '3 tyg', now: '3 dni', metricLabel: 'czas do pierwszego merge requesta',
        processes: [
          { name: 'Setup środowiska lokalnego', was: '1 dzień + frustracja', now: '30 min, zautomatyzowany skrypt' },
          { name: 'Dostępy do systemów', was: 'Mail do IT → 3 dni', now: 'Auto-provisioning z checklist' },
          { name: 'Zrozumienie architektury', was: 'Confluence (nieaktualne)', now: 'Auto-generowana, zawsze świeża' },
          { name: 'Przypisanie pierwszego taska', was: 'Tydzień 2, "jak się rozejrzysz"', now: 'Dzień 1, pre-selected onboarding task' },
        ],
      },
      {
        title: 'Monitoring i incident response — zanim klient zadzwoni',
        story: 'Klient dzwonił z "aplikacja nie działa" — zanim ktokolwiek w zespole wiedział o problemie. Diagnoza = 30 minut logowania się po serwerach i czytania logów. SLA compliance? 94% — bo każdy incydent zaczynał się od zera.',
        was: '45 min', now: '90 sek', metricLabel: 'od incydentu do podjęcia działania',
        processes: [
          { name: 'Wykrycie problemu', was: 'Klient dzwoni / pisze', now: 'Auto-alert z metryk i logów' },
          { name: 'Diagnoza root cause', was: '30 min szukania po logach', now: 'Auto-korelacja logów i metryk' },
          { name: 'Eskalacja do odpowiedniej osoby', was: 'Slack → kto jest online?', now: 'Auto-routing wg on-call schedule' },
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
        story: 'Klinika z 6 gabinetami — recepcja non-stop na telefonie, kolejka dzwoniących. 30% umówionych pacjentów nie przychodziło (bo zapominali), a wolne terminy nie były zapełniane. Strata: ~40 wizyt tygodniowo.',
        was: '5 min', now: '30 sek', metricLabel: 'czas rejestracji jednego pacjenta',
        processes: [
          { name: 'Umawianie wizyty', was: 'Tylko telefonicznie', now: 'Online 24/7 (70% bookingów) + tel' },
          { name: 'Przypomnienie o wizycie', was: 'Nie robiliśmy tego', now: 'SMS 24h + 2h przed wizytą' },
          { name: 'Odwołanie / przesunięcie', was: 'Telefon do recepcji', now: 'Self-service w SMS / portalu' },
          { name: 'Zapełnianie luk z odwołań', was: 'Nie zdążaliśmy', now: 'Auto-oferta do listy oczekujących' },
          { name: 'Weryfikacja ubezpieczenia', was: 'Ręczna, 3 min na pacjenta', now: 'Auto eWUŚ przy rejestracji' },
        ],
      },
      {
        title: 'System obiegu dokumentów medycznych i e-recepty',
        story: 'Lekarz po każdej wizycie spędzał 15 minut na dokumentacji: wpisywanie ręcznie, szukanie historii pacjenta, wystawianie recept. "Pracuję dla systemu, nie dla pacjenta" — to zdanie słyszeliśmy od każdego.',
        was: '15 min', now: '3 min', metricLabel: 'dokumentacja jednej wizyty',
        processes: [
          { name: 'Opis wizyty', was: 'Od zera, każdy raz', now: 'Szablon per specjalizacja + auto-uzupełnienie' },
          { name: 'Wystawienie e-recepty', was: '5 min (szukanie leku, dawki)', now: '30 sek — podpowiedzi z historii' },
          { name: 'Dostęp do historii pacjenta', was: 'Teczka papierowa / szukanie w systemie', now: '1 ekran — pełna historia, wyniki, recepty' },
          { name: 'Udostępnienie wyników pacjentowi', was: 'Wizyta / telefon / mail', now: 'Portal pacjenta, auto po opisaniu' },
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
        story: 'Firma z 300 pracownikami — dział HR (3 osoby) tonął w papierach: umowy, aneksy, wnioski urlopowe, zaświadczenia. Onboarding nowego pracownika = 15 dokumentów do podpisania, 8 systemów do skonfigurowania, 5 osób zaangażowanych.',
        was: '3 dni', now: '4h', metricLabel: 'pełny onboarding nowego pracownika',
        processes: [
          { name: 'Dokumenty do podpisania', was: '15 papierów, druk, podpis, skan', now: 'E-podpis, 10 minut, z domu' },
          { name: 'Konto w systemach (mail, AD, narzędzia)', was: 'Mail do IT → 2 dni czekania', now: 'Auto-provisioning z HR-ówki' },
          { name: 'Wnioski urlopowe', was: 'Papierowy wniosek → podpis przełożonego', now: 'Portal self-service → auto-akceptacja' },
          { name: 'Zaświadczenia (o zatrudnieniu, zarobkach)', was: 'Prośba → HR szuka → 2 dni', now: 'Auto-generowane w portalu, instant' },
        ],
      },
      {
        title: 'System do delegowania pracowników tymczasowych',
        story: 'Agencja pracy delegująca 500+ osób do 30 klientów. Grafiki w Excelu, obecności na papierze, rozliczenia ręcznie. Gdy ktoś nie przyszedł — panika i telefony w poszukiwaniu zastępstwa.',
        was: '2h/dzień', now: '15 min/dzień', metricLabel: 'zarządzanie grafikami i obecnościami',
        processes: [
          { name: 'Planowanie grafiku tygodniowego', was: 'Excel + telefon do każdego', now: 'System z auto-dopasowaniem' },
          { name: 'Ewidencja obecności', was: 'Papierowa lista, faxowana', now: 'Apka mobilna + GPS' },
          { name: 'Zastępstwo za nieobecność', was: '1-2h telefonów', now: 'Auto-sugestia z puli dostępnych' },
          { name: 'Rozliczenie z klientem', was: 'Ręczne, koniec miesiąca, 3 dni', now: 'Auto z ewidencji, 1 klik eksport' },
          { name: 'Raport dla klienta', was: 'Excel mailem', now: 'Portal klienta, auto-aktualizowany' },
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
        story: 'Firma szkoleniowa z 50+ kursami miesięcznie. Zapisy przez Google Forms, płatności przelewem ("proszę w tytule wpisać..."), potwierdzenia ręcznie mailem. Przy 200+ uczestnikach miesięcznie — ktoś zawsze wypadał z listy.',
        was: '20 min', now: '0 min', metricLabel: 'obsługa jednego zapisu (pełny automat)',
        processes: [
          { name: 'Zapis na kurs', was: 'Google Form → Excel → mail', now: 'Portal z płatnością online' },
          { name: 'Potwierdzenie + materiały', was: 'Ręczny mail z załącznikiem', now: 'Auto-mail + auto-dostęp do LMS' },
          { name: 'Przypomnienie przed kursem', was: 'Zapominaliśmy', now: 'Auto: 24h + 1h przed' },
          { name: 'Certyfikat po ukończeniu', was: '2 tygodnie (Word, druk, poczta)', now: '5 min — auto-generowany PDF z QR' },
          { name: 'Weryfikacja certyfikatu', was: 'Telefon do nas', now: 'Skan QR = wynik online' },
        ],
      },
      {
        title: 'System rozliczeń trenerów z ewidencją godzin',
        story: 'Akademia szkoleniowa — 15 trenerów, każdy z inną stawką per typ szkolenia. Ewidencja z ręcznych wpisów, rozliczenie = 2 dni pracy administracji na koniec miesiąca. I co miesiąc te same pytania: "a to szkolenie to jaka stawka?".',
        was: '2 dni', now: '30 min', metricLabel: 'rozliczenie wszystkich trenerów miesięcznie',
        processes: [
          { name: 'Ewidencja godzin trenera', was: 'Ręczny wpis, z pamięci', now: 'Auto z kalendarza kursów' },
          { name: 'Kalkulacja wynagrodzenia', was: 'Excel z 3 rodzajami stawek', now: 'Auto — stawka per typ kursu' },
          { name: 'Rezerwacja sali', was: 'Telefon / mail do biura', now: 'Auto z grafiku, z konfliktem alert' },
          { name: 'Rachunek / faktura trenera', was: 'Trener wystawia, my sprawdzamy', now: 'Auto-generowany z ewidencji' },
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
                  <div className="cs-card-head">
                    <div className="cs-card-info">
                      <h3 className="cs-card-title">{c.title}</h3>
                      <p className="cs-card-story">{c.story}</p>
                    </div>
                    <div className="cs-card-metric">
                      <div className="cs-card-nums">
                        <span className="cs-card-was">{c.was}</span>
                        <svg className="cs-card-arrow" width="24" height="10" viewBox="0 0 24 10" fill="none">
                          <path d="M0 5h20m0 0l-3.5-3.5M20 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="cs-card-now">{c.now}</span>
                      </div>
                      <span className="cs-card-mlabel">{c.metricLabel}</span>
                    </div>
                  </div>

                  <div className="cs-procs">
                    {c.processes.map((p, j) => (
                      <div className="cs-proc" key={j}>
                        <span className="cs-proc-name">{p.name}</span>
                        <span className="cs-proc-was">{p.was}</span>
                        <span className="cs-proc-now">{p.now}</span>
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
