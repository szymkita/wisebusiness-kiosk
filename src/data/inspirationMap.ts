export interface AutomationIdea {
  title: string;
  desc: string;
  impact: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  ideas: AutomationIdea[];
}

export interface InspIndustry {
  id: string;
  name: string;
  icon: string;
  color: string;
  departments: Department[];
}

export const inspirationIndustries: InspIndustry[] = [
  {
    id: 'production',
    name: 'Produkcja',
    icon: 'layers',
    color: '#06b6d4',
    departments: [
      {
        id: 'prod-planning', name: 'Planowanie produkcji', icon: 'clock',
        ideas: [
          { title: 'Auto-harmonogram zleceń', desc: 'Algorytm APS układa kolejność produkcji z uwzględnieniem przezbrojień, priorytetów i dostępności surowców — bez ręcznego Excela.', impact: '-40% czasu planowania', icon: 'cpu', difficulty: 'medium' },
          { title: 'Predykcja zapotrzebowania', desc: 'Model ML analizuje historię zamówień, sezonowość i trendy, żeby przewidzieć, co produkować z 2-tygodniowym wyprzedzeniem.', impact: '-25% nadprodukcji', icon: 'trending-up', difficulty: 'advanced' },
          { title: 'Alerty o wąskich gardłach', desc: 'System monitoruje obciążenie stanowisk i automatycznie ostrzega, kiedy kolejka przekracza zdolność produkcyjną.', impact: 'Reakcja w minuty, nie dni', icon: 'bell', difficulty: 'easy' },
        ],
      },
      {
        id: 'prod-quality', name: 'Kontrola jakości', icon: 'check-circle',
        ideas: [
          { title: 'Wizja komputerowa na linii', desc: 'Kamera + AI sprawdza każdy produkt w czasie rzeczywistym — wykrywa wady, które ludzkie oko pomija.', impact: '99.5% wykrywalność wad', icon: 'eye', difficulty: 'advanced' },
          { title: 'Cyfrowe karty kontrolne', desc: 'Pracownik skanuje QR, wypełnia checklistę na tablecie — dane lecą do dashboardu jakości automatycznie.', impact: 'Zero papierów, pełna historia', icon: 'file-text', difficulty: 'easy' },
          { title: 'Auto-eskalacja niezgodności', desc: 'Gdy parametr wyjdzie poza tolerancję, system natychmiast powiadamia lidera zmiany i blokuje partię.', impact: '-70% wadliwych partii wysłanych', icon: 'shield', difficulty: 'medium' },
        ],
      },
      {
        id: 'prod-maintenance', name: 'Utrzymanie ruchu', icon: 'settings',
        ideas: [
          { title: 'Predykcyjne utrzymanie maszyn', desc: 'Czujniki IoT + model ML przewidują awarię z 48h wyprzedzeniem — serwis zanim się zepsuje.', impact: '-60% nieplanowanych przestojów', icon: 'cpu', difficulty: 'advanced' },
          { title: 'Cyfrowa książka serwisowa', desc: 'Każda maszyna ma profil z historią napraw, przeglądów i alertów — dostępny z telefonu.', impact: 'Pełna historia w kieszeni', icon: 'monitor', difficulty: 'easy' },
          { title: 'Automatyczne zlecenia serwisowe', desc: 'Przy przekroczeniu motogodzin lub parametrów system sam tworzy zlecenie i rezerwuje części.', impact: '-35% kosztów serwisu', icon: 'zap', difficulty: 'medium' },
        ],
      },
      {
        id: 'prod-warehouse', name: 'Magazyn surowców', icon: 'package',
        ideas: [
          { title: 'Automatyczne reordery', desc: 'System monitoruje stany i automatycznie zamawia surowce u dostawców, gdy zapas spada poniżej progu.', impact: 'Zero braków na linii', icon: 'refresh-cw', difficulty: 'medium' },
          { title: 'Inwentaryzacja z kodem QR', desc: 'Skanuj, policz, zatwierdź — inwentaryzacja magazynu w godzinach zamiast dni.', impact: '-80% czasu inwentaryzacji', icon: 'search', difficulty: 'easy' },
          { title: 'Optymalizacja rozmieszczenia', desc: 'Algorytm układa surowce tak, żeby najczęściej używane były najbliżej linii — mniej chodzenia, mniej czasu.', impact: '-30% czasu kompletacji', icon: 'map-pin', difficulty: 'medium' },
        ],
      },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: 'shopping-cart',
    color: '#f59e0b',
    departments: [
      {
        id: 'ecom-marketing', name: 'Marketing', icon: 'zap',
        ideas: [
          { title: 'Porzucone koszyki — auto-sekwencja', desc: 'Klient nie kupił? Po 1h email z przypomnieniem, po 24h z rabatem, po 72h SMS. Odzyskujesz 15-25% koszyków.', impact: '+18% przychodu', icon: 'mail', difficulty: 'easy' },
          { title: 'Segmentacja AI + personalizacja', desc: 'Model grupuje klientów po zachowaniu i automatycznie dobiera produkty, treści i czas wysyłki kampanii.', impact: '+40% open rate', icon: 'users', difficulty: 'advanced' },
          { title: 'Dynamiczne ceny i promocje', desc: 'System analizuje popyt, stany i marże — i automatycznie proponuje przeceny na produkty, które warto pchnąć.', impact: '+12% marży brutto', icon: 'trending-up', difficulty: 'medium' },
        ],
      },
      {
        id: 'ecom-fulfillment', name: 'Realizacja zamówień', icon: 'package',
        ideas: [
          { title: 'Auto-processing zamówień', desc: 'Zamówienie wpada → system weryfikuje płatność → generuje etykietę kurierską → wysyła tracking do klienta. Zero kliknięć.', impact: '-80% czasu obsługi zamówienia', icon: 'zap', difficulty: 'medium' },
          { title: 'Multi-carrier selector', desc: 'Algorytm wybiera najtańszego kuriera per paczka na podstawie wagi, wymiarów i regionu dostawy.', impact: '-15% kosztów wysyłki', icon: 'truck', difficulty: 'medium' },
          { title: 'Alerty o stanach magazynowych', desc: 'Kiedy bestseller spada poniżej 3-dniowego zapasu, system powiadamia i automatycznie tworzy zamówienie u dostawcy.', impact: 'Zero out-of-stock na bestsellerach', icon: 'bell', difficulty: 'easy' },
        ],
      },
      {
        id: 'ecom-cs', name: 'Obsługa klienta', icon: 'message-circle',
        ideas: [
          { title: 'Chatbot AI na pierwszej linii', desc: 'Bot odpowiada na 80% powtarzalnych pytań (gdzie paczka, zwrot, rozmiar). Reszta trafia do agenta z pełnym kontekstem.', impact: '-70% ticketów do człowieka', icon: 'cpu', difficulty: 'medium' },
          { title: 'Automatyczne odpowiedzi na opinie', desc: 'AI generuje spersonalizowane odpowiedzi na recenzje Google/Allegro — Ty tylko zatwierdzasz jednym klikiem.', impact: '5× więcej odpowiedzi na opinie', icon: 'heart', difficulty: 'easy' },
          { title: 'Smart routing zgłoszeń', desc: 'System klasyfikuje zgłoszenie (reklamacja/pytanie/zwrot) i kieruje do odpowiedniego agenta z sugerowaną odpowiedzią.', impact: '-45% czasu rozwiązania', icon: 'settings', difficulty: 'medium' },
        ],
      },
      {
        id: 'ecom-analytics', name: 'Analityka', icon: 'bar-chart',
        ideas: [
          { title: 'Dashboard KPI w real-time', desc: 'Konwersja, AOV, LTV, CAC, ROAS — wszystkie kluczowe metryki na jednym ekranie, aktualizowane co minutę.', impact: 'Decyzje oparte na danych', icon: 'monitor', difficulty: 'easy' },
          { title: 'Predykcja churnu klientów', desc: 'Model ML identyfikuje klientów, którzy prawdopodobnie nie wrócą — i automatycznie uruchamia kampanię win-back.', impact: '+20% retencji', icon: 'users', difficulty: 'advanced' },
          { title: 'Auto-raport tygodniowy', desc: 'Co poniedziałek rano w skrzynce: co sprzedaliśmy, co nie poszło, gdzie tracimy i rekomendacje AI.', impact: '2h/tydzień mniej na raportowanie', icon: 'mail', difficulty: 'easy' },
        ],
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finanse',
    icon: 'dollar-sign',
    color: '#10b981',
    departments: [
      {
        id: 'fin-accounting', name: 'Księgowość', icon: 'file-text',
        ideas: [
          { title: 'OCR faktur + auto-księgowanie', desc: 'Faktura wpada na maila → OCR wyciąga dane → system dekretuje i księguje → Ty tylko zatwierdzasz.', impact: '-85% ręcznego przepisywania', icon: 'eye', difficulty: 'medium' },
          { title: 'Matching faktur z zamówieniami', desc: 'System automatycznie paruje faktury z PO i delivery notes — flaguje niezgodności zamiast przepuszczać.', impact: '-95% błędów w rozliczeniach', icon: 'check-circle', difficulty: 'medium' },
          { title: 'Auto-przypomnienia o płatnościach', desc: 'Przed terminem — grzeczne przypomnienie. Po terminie — eskalacja. Wszystko automatyczne, personalizowane.', impact: '-40% przeterminowanych faktur', icon: 'bell', difficulty: 'easy' },
        ],
      },
      {
        id: 'fin-reporting', name: 'Raportowanie', icon: 'bar-chart',
        ideas: [
          { title: 'Real-time P&L dashboard', desc: 'Przychody, koszty, marża — aktualizowane w czasie rzeczywistym z danych z ERP, banku i CRM.', impact: 'Z 3 dni do 15 minut', icon: 'monitor', difficulty: 'medium' },
          { title: 'Automatyczny cash flow forecast', desc: 'Model prognozuje przepływy na 30/60/90 dni na podstawie faktur, kontraktów i historii płatności.', impact: 'Koniec niespodzianek na koncie', icon: 'trending-up', difficulty: 'advanced' },
          { title: 'Raporty KPI na Slacka/maila', desc: 'Co rano o 8:00 zarząd dostaje podsumowanie: przychód, koszty, pipeline, alerty. Zero logowania.', impact: 'Decyzje zanim kawa wystygnie', icon: 'mail', difficulty: 'easy' },
        ],
      },
      {
        id: 'fin-compliance', name: 'Compliance', icon: 'shield',
        ideas: [
          { title: 'Automatyczny KYC/AML screening', desc: 'Nowy klient → system sprawdza listy sankcyjne, PEP, media — i generuje raport due diligence.', impact: 'Z godzin do sekund', icon: 'search', difficulty: 'advanced' },
          { title: 'Monitoring transakcji 24/7', desc: 'AI flaguje podejrzane wzorce transakcji w czasie rzeczywistym — zamiast ręcznego przeglądania raportów.', impact: '10× więcej transakcji monitorowanych', icon: 'eye', difficulty: 'advanced' },
          { title: 'Auto-generowanie raportów regulacyjnych', desc: 'System sam zbiera dane i generuje sprawozdania KNF, NBP, GIIF w wymaganym formacie.', impact: '-70% pracy przy raportach', icon: 'file-text', difficulty: 'medium' },
        ],
      },
      {
        id: 'fin-hr', name: 'Kadry i płace', icon: 'users',
        ideas: [
          { title: 'Automatyczne naliczanie wynagrodzeń', desc: 'System zbiera dane z RCP, urlopów i premii — i generuje listę płac bez ręcznych obliczeń.', impact: '-90% czasu naliczania', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Self-service pracowniczy', desc: 'Wnioski urlopowe, zaświadczenia, PIT-y — pracownik pobiera sam z portalu, bez angażowania kadr.', impact: '-60% zapytań do HR', icon: 'globe', difficulty: 'easy' },
          { title: 'Onboarding checklist z auto-zadaniami', desc: 'Nowy pracownik → system generuje zadania IT (konto, laptop), HR (umowa, szkolenie BHP) i przełożonego.', impact: 'Z 5 dni do 1 dnia onboardingu', icon: 'check-circle', difficulty: 'easy' },
        ],
      },
    ],
  },
  {
    id: 'logistics',
    name: 'Logistyka',
    icon: 'truck',
    color: '#3b82f6',
    departments: [
      {
        id: 'log-fleet', name: 'Zarządzanie flotą', icon: 'truck',
        ideas: [
          { title: 'Optymalizacja tras AI', desc: 'Algorytm planuje trasy z uwzględnieniem korków, okien dostawczych, pojemności i priorytetów — w sekundy.', impact: '-25% kosztów paliwa', icon: 'map-pin', difficulty: 'medium' },
          { title: 'Real-time tracking + ETA', desc: 'GPS na każdym pojeździe, live mapa, automatyczne SMS do klienta z dokładnym ETA dostawy.', impact: '-80% telefonów "gdzie jest paczka"', icon: 'globe', difficulty: 'easy' },
          { title: 'Predykcyjny serwis floty', desc: 'Dane z OBD + historia serwisowa → model przewiduje, kiedy coś się zepsuje i planuje przegląd.', impact: '-50% awarii w trasie', icon: 'settings', difficulty: 'advanced' },
        ],
      },
      {
        id: 'log-warehouse', name: 'Magazyn', icon: 'package',
        ideas: [
          { title: 'Pick-by-light / pick-by-voice', desc: 'System prowadzi magazyniera po optymalnej ścieżce kompletacji — światłem lub głosem.', impact: '+40% wydajności pickingu', icon: 'zap', difficulty: 'medium' },
          { title: 'FIFO/FEFO automatyczny', desc: 'System wymusza wydawanie towarów w odpowiedniej kolejności — żadne daty ważności nie przeterminują się na półce.', impact: '-90% przeterminowanych towarów', icon: 'clock', difficulty: 'easy' },
          { title: 'Slot booking dla dostawców', desc: 'Dostawcy rezerwują okno rozładunkowe online — zero kolejek na rampie, płynny harmonogram.', impact: '-60% czasu oczekiwania na rampie', icon: 'clock', difficulty: 'easy' },
        ],
      },
      {
        id: 'log-docs', name: 'Dokumentacja', icon: 'file-text',
        ideas: [
          { title: 'Auto-generowanie CMR i WZ', desc: 'System generuje dokumenty transportowe z danych zlecenia — kierowca dostaje je na tablet.', impact: 'Zero ręcznego wypełniania', icon: 'file-text', difficulty: 'easy' },
          { title: 'Automatyczne rozliczenia tras', desc: 'Dane GPS + stawki = automatyczna kalkulacja kosztu transportu i generowanie faktur per zlecenie.', impact: '-70% pracy administracyjnej', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Cyfrowe POD z podpisem', desc: 'Odbiorca podpisuje na tablecie → potwierdzenie dostawy natychmiast w systemie → faktura gotowa.', impact: 'Faktura tego samego dnia', icon: 'check-circle', difficulty: 'easy' },
        ],
      },
      {
        id: 'log-planning', name: 'Planowanie', icon: 'clock',
        ideas: [
          { title: 'Demand forecasting', desc: 'AI analizuje historię, sezonowość i trendy — przewiduje wolumeny z 85%+ trafnością na 2 tygodnie.', impact: 'Koniec z "za mało/za dużo"', icon: 'trending-up', difficulty: 'advanced' },
          { title: 'Auto-alokacja zasobów', desc: 'System przydziela kierowców i pojazdy do zleceń na podstawie lokalizacji, dostępności i kwalifikacji.', impact: '-30% czasu dispatchera', icon: 'users', difficulty: 'medium' },
          { title: 'Dashboard operacyjny live', desc: 'Ile aut w trasie, ile zleceń opóźnionych, jaki load factor — wszystko na jednym ekranie w real-time.', impact: 'Pełna widoczność operacji', icon: 'monitor', difficulty: 'easy' },
        ],
      },
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'activity',
    color: '#ef4444',
    departments: [
      {
        id: 'health-reception', name: 'Rejestracja', icon: 'clock',
        ideas: [
          { title: 'Online booking z auto-przypomnieniami', desc: 'Pacjent rezerwuje wizytę 24/7 online. System wysyła przypomnienie SMS 24h i 1h przed wizytą.', impact: '-60% no-show', icon: 'globe', difficulty: 'easy' },
          { title: 'Self check-in na tablecie', desc: 'Pacjent przychodzi → skanuje QR → potwierdza dane → system informuje lekarza. Zero kolejki do rejestracji.', impact: '-70% czasu rejestracji', icon: 'monitor', difficulty: 'easy' },
          { title: 'Inteligentny system kolejkowy', desc: 'AI optymalizuje harmonogram, uwzględniając typy wizyt, historię opóźnień lekarzy i priorytet pacjenta.', impact: '-40% czasu oczekiwania', icon: 'clock', difficulty: 'medium' },
        ],
      },
      {
        id: 'health-docs', name: 'Dokumentacja medyczna', icon: 'file-text',
        ideas: [
          { title: 'AI-asystent dokumentacji', desc: 'Lekarz mówi — AI transkrybuje, strukturyzuje i wstawia do EDM. Zamiast 15 min pisania, 2 min korekty.', impact: '+40% czasu na pacjenta', icon: 'cpu', difficulty: 'advanced' },
          { title: 'Automatyczne e-skierowania', desc: 'Lekarz wybiera diagnozę → system generuje skierowanie z kodem ICD-10, wysyła do P1 i powiadamia pacjenta.', impact: 'Zero ręcznego kodowania', icon: 'zap', difficulty: 'medium' },
          { title: 'Zunifikowany profil pacjenta', desc: 'Wyniki badań, historia wizyt, leki, alergie — wszystko w jednym widoku, zaciągane z różnych systemów.', impact: 'Pełny obraz w 10 sekund', icon: 'users', difficulty: 'medium' },
        ],
      },
      {
        id: 'health-billing', name: 'Rozliczenia z NFZ', icon: 'dollar-sign',
        ideas: [
          { title: 'Auto-kodowanie procedur', desc: 'System rozpoznaje wykonane procedury i automatycznie przypisuje kody NFZ — lekarz tylko zatwierdza.', impact: '-80% pracy sprawozdawczej', icon: 'check-circle', difficulty: 'medium' },
          { title: 'Walidacja przed wysyłką', desc: 'Algorytm sprawdza kompletność, zgodność kodów i limitów zanim wyślesz sprawozdanie — zero odrzuceń.', impact: '-95% zwrotów z NFZ', icon: 'shield', difficulty: 'medium' },
          { title: 'Dashboard realizacji kontraktu', desc: 'Ile z limitu wykorzystane, ile zostało, które poradnie "nie dowożą" — live monitoring.', impact: 'Optymalne wykorzystanie kontraktu', icon: 'bar-chart', difficulty: 'easy' },
        ],
      },
      {
        id: 'health-telemed', name: 'Telemedycyna', icon: 'monitor',
        ideas: [
          { title: 'Platforma teleporad all-in-one', desc: 'Wideo + e-recepta + e-skierowanie + notatka w jednym oknie — lekarz nie przeskakuje między systemami.', impact: '3× więcej teleporad/dzień', icon: 'globe', difficulty: 'medium' },
          { title: 'Zdalny monitoring pacjenta', desc: 'Pacjent mierzy ciśnienie/glukozę w domu → dane lecą do systemu → alert do lekarza przy nieprawidłowościach.', impact: 'Wczesna interwencja zamiast SOR', icon: 'activity', difficulty: 'advanced' },
          { title: 'Triage AI przed wizytą', desc: 'Chatbot zbiera wywiad przed wizytą — lekarz dostaje gotowe podsumowanie objawów jeszcze zanim pacjent "wejdzie".', impact: '-30% czasu wywiadu', icon: 'cpu', difficulty: 'medium' },
        ],
      },
    ],
  },
  {
    id: 'services',
    name: 'Usługi B2B',
    icon: 'briefcase',
    color: '#8b5cf6',
    departments: [
      {
        id: 'srv-sales', name: 'Sprzedaż', icon: 'trending-up',
        ideas: [
          { title: 'Auto-kwalifikacja leadów', desc: 'Lead z formularza → AI scoruje (branża, wielkość, zachowanie na stronie) → hot lead leci do handlowca, reszta do nurturingu.', impact: '+35% konwersja pipeline', icon: 'users', difficulty: 'medium' },
          { title: 'Generator ofert z szablonów', desc: 'Handlowiec wybiera usługi, zakres, cennik → system generuje spersonalizowaną ofertę PDF w 2 minuty.', impact: '-75% czasu na oferty', icon: 'file-text', difficulty: 'easy' },
          { title: 'Follow-up automation', desc: 'Brak odpowiedzi po 3 dniach → auto-mail. Po 7 → kolejny. Po 14 → alert do managera. Nikt nie wpadnie w zapomnienie.', impact: '+25% zamykanych deali', icon: 'mail', difficulty: 'easy' },
        ],
      },
      {
        id: 'srv-projects', name: 'Zarządzanie projektami', icon: 'target',
        ideas: [
          { title: 'Automatyczne raportowanie czasu', desc: 'Integracja z narzędziami (Jira, Toggl, kalendarz) → raport per klient per projekt generuje się sam.', impact: '-90% ręcznego raportowania', icon: 'clock', difficulty: 'medium' },
          { title: 'Alert o przekroczeniu budżetu', desc: 'System monitoruje spalanie godzin vs. budżet — alarmuje PM-a, zanim projekt wejdzie na czerwono.', impact: '-40% przekroczeń budżetowych', icon: 'bell', difficulty: 'easy' },
          { title: 'Auto-status update do klienta', desc: 'Co tydzień klient dostaje elegancki raport: co zrobiliśmy, co przed nami, czy jesteśmy on track.', impact: 'Zadowolony klient bez wysiłku', icon: 'mail', difficulty: 'easy' },
        ],
      },
      {
        id: 'srv-finance', name: 'Finanse i rozliczenia', icon: 'dollar-sign',
        ideas: [
          { title: 'Auto-fakturowanie z timesheetów', desc: 'Miesiąc się kończy → system zbiera godziny → generuje fakturę per klient per stawka → wysyła do akceptacji.', impact: 'Faktura w dniu zamknięcia', icon: 'zap', difficulty: 'medium' },
          { title: 'Rentowność projektu live', desc: 'Dashboard pokazuje marżę per projekt, per klient, per team — w czasie rzeczywistym, nie po zamknięciu.', impact: 'Decyzje na danych, nie przeczuciu', icon: 'bar-chart', difficulty: 'medium' },
          { title: 'Automatyczna windykacja miękka', desc: 'Termin płatności mija → grzeczne przypomnienie. +7 dni → eskalacja. +14 → alert do CEO. Automatycznie.', impact: '-50% przeterminowanych należności', icon: 'bell', difficulty: 'easy' },
        ],
      },
      {
        id: 'srv-hr', name: 'Zespół i rekrutacja', icon: 'users',
        ideas: [
          { title: 'ATS z auto-screeningiem CV', desc: 'CV wpada → AI wyciąga kluczowe info, scoruje dopasowanie do wymagań → rekruter widzi ranking.', impact: '-70% czasu screeningu', icon: 'cpu', difficulty: 'medium' },
          { title: 'Automatyczny onboarding', desc: 'Nowa osoba → system generuje zadania: IT setup, dostępy, buddy, szkolenia. Każdy wie, co ma zrobić.', impact: 'Produktywny od 2. dnia', icon: 'check-circle', difficulty: 'easy' },
          { title: 'Pulse survey bot', desc: 'Co 2 tygodnie bot pyta zespół o nastrój, obciążenie, blokery — wyniki trafiają do HR dashboardu.', impact: 'Wczesne wykrywanie problemów', icon: 'heart', difficulty: 'easy' },
        ],
      },
    ],
  },
  {
    id: 'realestate',
    name: 'Nieruchomości',
    icon: 'home',
    color: '#ec4899',
    departments: [
      {
        id: 're-sales', name: 'Sprzedaż i wynajem', icon: 'trending-up',
        ideas: [
          { title: 'Multi-portal publishing', desc: 'Jedno kliknięcie — oferta leci na Otodom, OLX, Gratka i 10 innych portali. Zmiana ceny? Aktualizuje wszędzie.', impact: '-90% czasu publikacji', icon: 'globe', difficulty: 'easy' },
          { title: 'Auto-matching oferta ↔ klient', desc: 'System dopasowuje nowe oferty do preferencji klientów z bazy i automatycznie wysyła spersonalizowany mailing.', impact: '+30% konwersja z mailingu', icon: 'users', difficulty: 'medium' },
          { title: 'Wirtualne spacery z AI-komentarzem', desc: 'Klient ogląda 360° tour, a AI opowiada o szczegółach mieszkania — bez angażowania agenta.', impact: '-50% bezpodstawnych prezentacji', icon: 'eye', difficulty: 'advanced' },
        ],
      },
      {
        id: 're-tenants', name: 'Zarządzanie najemcami', icon: 'users',
        ideas: [
          { title: 'Portal najemcy self-service', desc: 'Zgłoszenia usterek, faktury, dokumenty, komunikaty — najemca robi wszystko sam, bez dzwonienia do biura.', impact: '-70% telefonów do administracji', icon: 'globe', difficulty: 'medium' },
          { title: 'Auto-rozliczenia mediów', desc: 'Odczyty z liczników → kalkulacja per lokal → wygenerowany rachunek → wysłany do najemcy. Automatycznie.', impact: '3 dni pracy → 30 minut', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Smart przypomnienia o czynszu', desc: 'Przed terminem — grzeczne przypomnienie. Po terminie — naliczenie odsetek i automatyczna eskalacja.', impact: '-65% zaległości czynszowych', icon: 'bell', difficulty: 'easy' },
        ],
      },
      {
        id: 're-building', name: 'Smart building', icon: 'settings',
        ideas: [
          { title: 'Automatyka HVAC + oświetlenia', desc: 'Czujniki obecności i pogody sterują klimatyzacją i światłem — zero marnowania energii w pustych pomieszczeniach.', impact: '-30% kosztów energii', icon: 'zap', difficulty: 'advanced' },
          { title: 'Monitoring zużycia energii', desc: 'Dashboard z realnym zużyciem per piętro/lokal + benchmarking + alerty przy anomaliach.', impact: 'Pełna kontrola nad kosztami', icon: 'bar-chart', difficulty: 'medium' },
          { title: 'System zgłoszeń z auto-dispatchem', desc: 'Najemca zgłasza usterkę → system kategoryzuje → przypisuje technikowi → najemca widzi status live.', impact: '-50% czasu reakcji na zgłoszenia', icon: 'settings', difficulty: 'easy' },
        ],
      },
      {
        id: 're-docs', name: 'Dokumentacja i umowy', icon: 'file-text',
        ideas: [
          { title: 'Generator umów z szablonów', desc: 'Wypełnij dane najemcy/kupca → system generuje umowę z szablonu → podpis elektroniczny → archiwum.', impact: '-80% czasu przygotowania umów', icon: 'file-text', difficulty: 'easy' },
          { title: 'Automatyczny reminder o terminach', desc: 'Koniec umowy za 3 miesiące? System informuje i proponuje renegocjację lub nową ofertę.', impact: 'Zero przegapionych terminów', icon: 'clock', difficulty: 'easy' },
          { title: 'Cyfrowe archiwum z OCR', desc: 'Skanuj dokument → OCR wyciąga dane → plik trafia do folderu nieruchomości. Wyszukiwanie pełnotekstowe.', impact: 'Każdy dokument w 5 sekund', icon: 'search', difficulty: 'medium' },
        ],
      },
    ],
  },
  {
    id: 'horeca',
    name: 'HoReCa',
    icon: 'coffee',
    color: '#f97316',
    departments: [
      {
        id: 'horeca-front', name: 'Obsługa gościa', icon: 'heart',
        ideas: [
          { title: 'Rezerwacje online 24/7', desc: 'Widget na stronie + Google + social media. Automatyczne potwierdzenie SMS, przypomnienie i opcja anulacji.', impact: '+50% rezerwacji, -80% no-show', icon: 'globe', difficulty: 'easy' },
          { title: 'QR menu z zamówieniem', desc: 'Gość skanuje QR na stoliku → przegląda menu z alergenami → zamawia → kuchnia dostaje order. Bez czekania na kelnera.', impact: '-30% czasu obsługi stolika', icon: 'monitor', difficulty: 'medium' },
          { title: 'Program lojalnościowy auto', desc: 'System liczy wizyty/wydatki → automatyczne nagrody i personalizowane oferty SMS/email.', impact: '+25% powracających gości', icon: 'award', difficulty: 'medium' },
        ],
      },
      {
        id: 'horeca-kitchen', name: 'Kuchnia i magazyn', icon: 'coffee',
        ideas: [
          { title: 'Auto-listy zakupowe', desc: 'System analizuje sprzedaż + stany → generuje optymalną listę zakupów → wysyła do dostawcy.', impact: '-18% food cost', icon: 'package', difficulty: 'medium' },
          { title: 'Kontrola dat ważności', desc: 'Każdy produkt w systemie z datą ważności. Alert na 3 dni przed → użyj w daniu dnia lub daily special.', impact: '-40% food waste', icon: 'clock', difficulty: 'easy' },
          { title: 'Kitchen Display System', desc: 'Zamówienia na ekranie w kuchni z priorytetami, timerami i statusami. Koniec z zagubionymi bonami.', impact: '+25% wydajności kuchni', icon: 'monitor', difficulty: 'easy' },
        ],
      },
      {
        id: 'horeca-staff', name: 'Kadry i grafiki', icon: 'users',
        ideas: [
          { title: 'Auto-planowanie zmian', desc: 'System układa grafik na podstawie dostępności, umiejętności i obciążenia — z opcją zamiany zmian w apce.', impact: '-70% czasu planowania grafiku', icon: 'clock', difficulty: 'medium' },
          { title: 'Mobile RCP', desc: 'Pracownik loguje start/koniec zmiany z telefonu (z geofence). System liczy godziny, nadgodziny i generuje listę płac.', impact: 'Zero sporów o godziny', icon: 'smartphone', difficulty: 'easy' },
          { title: 'Tip pooling automation', desc: 'System liczy napiwki per zmianę i automatycznie rozdziela według ustalonego klucza — transparentnie.', impact: 'Sprawiedliwy podział, zero konfliktów', icon: 'dollar-sign', difficulty: 'easy' },
        ],
      },
      {
        id: 'horeca-analytics', name: 'Analityka i marketing', icon: 'bar-chart',
        ideas: [
          { title: 'Menu engineering dashboard', desc: 'Która potrawa zarabia, która traci? Matryca popularność × marża pomaga optymalizować kartę.', impact: '+15% marży z menu', icon: 'bar-chart', difficulty: 'medium' },
          { title: 'Auto-zbieranie opinii', desc: 'Po wizycie gość dostaje SMS z pytaniem o ocenę. 4-5★ → prośba o recenzję Google. 1-3★ → alert do managera.', impact: '+200% opinii Google', icon: 'heart', difficulty: 'easy' },
          { title: 'Predykcja obłożenia', desc: 'AI przewiduje, ile gości przyjdzie jutro na podstawie historii, pogody, eventów — planning kuchni i kadry.', impact: '-20% food waste i nadgodzin', icon: 'cpu', difficulty: 'advanced' },
        ],
      },
    ],
  },
  {
    id: 'education',
    name: 'Edukacja',
    icon: 'book-open',
    color: '#8b5cf6',
    departments: [
      {
        id: 'edu-teaching', name: 'Dydaktyka', icon: 'book-open',
        ideas: [
          { title: 'Adaptacyjne ścieżki nauki', desc: 'AI dopasowuje treści do poziomu ucznia — wolniej przy trudnych tematach, szybciej przy opanowanych.', impact: '+45% ukończeń kursów', icon: 'cpu', difficulty: 'advanced' },
          { title: 'Auto-generowanie quizów', desc: 'Nauczyciel wrzuca materiał → AI generuje quiz z pytaniami na różnych poziomach trudności.', impact: '-80% czasu tworzenia testów', icon: 'zap', difficulty: 'medium' },
          { title: 'Automatyczne sprawdzanie prac', desc: 'Testy wielokrotnego wyboru, kody, krótkie odpowiedzi — sprawdzane natychmiast z feedbackiem dla ucznia.', impact: '-70% czasu na ocenianie', icon: 'check-circle', difficulty: 'medium' },
        ],
      },
      {
        id: 'edu-admin', name: 'Administracja', icon: 'settings',
        ideas: [
          { title: 'Online zapisy i rekrutacja', desc: 'Formularz online → weryfikacja dokumentów → generowanie umowy → harmonogram zajęć. Bez papieru.', impact: '-60% pracy administracyjnej', icon: 'globe', difficulty: 'easy' },
          { title: 'Auto-powiadomienia dla rodziców', desc: 'Oceny, frekwencja, wydarzenia, płatności — rodzic dostaje automatyczne powiadomienia w apce lub SMS.', impact: 'Zero telefonów pytających', icon: 'bell', difficulty: 'easy' },
          { title: 'Generator planów lekcji', desc: 'Algorytm układa plan uwzględniając sale, nauczycieli, przedmioty i preferencje — w minuty zamiast dni.', impact: '-90% czasu planowania', icon: 'clock', difficulty: 'medium' },
        ],
      },
      {
        id: 'edu-analytics', name: 'Analityka i raporty', icon: 'bar-chart',
        ideas: [
          { title: 'Dashboard postępów uczniów', desc: 'Nauczyciel widzi: kto nadąża, kto odpada, gdzie są luki — na jednym ekranie, w czasie rzeczywistym.', impact: 'Interwencja zanim uczeń odpuści', icon: 'trending-up', difficulty: 'medium' },
          { title: 'Automatyczne raporty SIO', desc: 'System zbiera dane z dziennika i generuje raporty do Systemu Informacji Oświatowej automatycznie.', impact: '-80% pracy przy raportach', icon: 'file-text', difficulty: 'medium' },
          { title: 'Ankiety ewaluacyjne auto', desc: 'Po zakończeniu kursu/semestru → automatyczna ankieta → wyniki w dashboardzie z trendem YoY.', impact: '10× więcej zebranego feedbacku', icon: 'heart', difficulty: 'easy' },
        ],
      },
      {
        id: 'edu-elearning', name: 'E-learning', icon: 'monitor',
        ideas: [
          { title: 'Platforma kursowa z certyfikatami', desc: 'Wideo + quizy + materiały + automatyczny certyfikat po ukończeniu. White-label pod Twoją marką.', impact: 'Sprzedaż kursów 24/7', icon: 'award', difficulty: 'medium' },
          { title: 'Gamifikacja i rankingi', desc: 'Punkty za aktywność, badge za osiągnięcia, leaderboard motywujący do nauki — engagement ×3.', impact: '+60% zaangażowania uczniów', icon: 'target', difficulty: 'medium' },
          { title: 'AI tutor 24/7', desc: 'Chatbot odpowiada na pytania ucznia o materiał, wyjaśnia trudne koncepty i daje dodatkowe ćwiczenia.', impact: 'Wsparcie bez limitu godzin', icon: 'cpu', difficulty: 'advanced' },
        ],
      },
    ],
  },
];
