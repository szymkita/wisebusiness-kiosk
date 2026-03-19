export interface AutomationIdea {
  title: string;
  desc: string;
  impact: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'advanced';
}

export interface Section {
  name: string;
  icon: string;
  ideas: AutomationIdea[];
}

export interface InspIndustry {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  sections: Section[];
}

export const inspirationIndustries: InspIndustry[] = [
  /* ═══════════════════════════════════════════════════════════
     1. PRODUKCJA & PRZEMYSŁ
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'production',
    name: 'Produkcja & Przemysł',
    subtitle: 'Opakowania, metal, komponenty, żywność',
    icon: 'layers',
    color: '#06b6d4',
    sections: [
      {
        name: 'Planowanie i harmonogramowanie produkcji', icon: 'clock',
        ideas: [
          { title: 'Automatyczny harmonogram zleceń (APS)', desc: 'System pobiera zamówienia z ERP, analizuje dostępność maszyn, surowców i ludzi — i sam układa optymalną kolejność produkcji. Uwzględnia czasy przezbrojenia, priorytety klientów i terminy. Koniec z ręcznym planowaniem w Excelu, które się sypie przy każdej zmianie.', impact: '-40% czasu planowania, -25% przezbrojeniowego marnotrawstwa', icon: 'cpu', difficulty: 'medium' },
          { title: 'Predykcja zapotrzebowania na surowce', desc: 'Model ML analizuje historię zamówień, sezonowość, pipeline sprzedażowy i trendy rynkowe. Z dwutygodniowym wyprzedzeniem mówi, co zamawiać i ile. Eliminuje sytuacje typu "stoimy, bo brakło folii" albo "mamy na 6 miesięcy zapasu, który leży".', impact: 'Redukcja nadmiarowych zapasów o 30%, zero przestojów przez braki', icon: 'trending-up', difficulty: 'advanced' },
          { title: 'Dashboard obciążenia stanowisk live', desc: 'Każde stanowisko robocze ma status na żywo: ile zleceń w kolejce, ile godzin pracy zaplanowane, jaki procent zdolności jest zajęty. Kierownik widzi wąskie gardła zanim się pojawią — i może przesunąć zasoby.', impact: 'Reakcja na wąskie gardła w minuty zamiast dni', icon: 'monitor', difficulty: 'easy' },
          { title: 'Automatyczne zlecenia produkcyjne z zamówień', desc: 'Klient zamawia przez e-mail lub platformę B2B → system automatycznie tworzy zlecenie produkcyjne z odpowiednią specyfikacją, BOM-em i terminem. Handlowiec nie musi nic przepisywać, produkcja dostaje gotowe zlecenie.', impact: '-90% ręcznego tworzenia zleceń, zero pomyłek w specyfikacji', icon: 'zap', difficulty: 'medium' },
        ],
      },
      {
        name: 'Kontrola jakości i śledzenie partii', icon: 'check-circle',
        ideas: [
          { title: 'Cyfrowe protokoły kontroli jakości', desc: 'Pracownik skanuje QR na partii, wypełnia checklistę na tablecie z predefiniowanymi punktami kontrolnymi — zdjęcie, pomiar, status OK/NOK. Dane lecą do dashboardu jakości automatycznie, z pełną historią i traceability per partia. Koniec z papierowymi kartami kontrolnymi.', impact: 'Pełna historia jakości w 3 kliknięcia, audyt IATF/ISO gotowy', icon: 'file-text', difficulty: 'easy' },
          { title: 'Wizja komputerowa na linii produkcyjnej', desc: 'Kamera inspekcyjna + model AI sprawdza każdy produkt w czasie rzeczywistym — wykrywa wady (pęknięcia, odbarwienia, deformacje), których ludzkie oko nie złapie przy prędkości linii. Wadliwy produkt jest automatycznie odrzucany.', impact: '99.5% wykrywalność wad, -80% reklamacji od klientów', icon: 'eye', difficulty: 'advanced' },
          { title: 'Auto-blokada partii przy odchyleniu', desc: 'Gdy parametr produkcyjny (temperatura, ciśnienie, wymiar) wyjdzie poza tolerancję — system natychmiast powiadamia lidera zmiany, blokuje partię i loguje zdarzenie. Żadna wadliwa partia nie wyjdzie z fabryki "po cichu".', impact: '-70% wadliwych partii wysłanych do klienta', icon: 'shield', difficulty: 'medium' },
          { title: 'Traceability end-to-end', desc: 'Od dostawcy surowca, przez każdy etap produkcji, po wysyłkę — pełna genealogia produktu. Klient pyta "skąd ta partia?" — odpowiedź w 10 sekund, nie w 3 godziny szukania po papierach.', impact: 'Pełna zgodność z wymaganiami klientów i norm ISO', icon: 'search', difficulty: 'medium' },
        ],
      },
      {
        name: 'Utrzymanie ruchu i maszyny', icon: 'settings',
        ideas: [
          { title: 'Predykcyjne utrzymanie maszyn (Predictive Maintenance)', desc: 'Czujniki IoT na kluczowych maszynach (wibracje, temperatura, pobór prądu) + model ML, który uczy się wzorców. System przewiduje awarię z 24-72h wyprzedzeniem — serwis planuje naprawę zanim maszyna stanie. Szczególnie skuteczne na maszynach do formowania, CNC i liniach pakujących.', impact: '-60% nieplanowanych przestojów, -35% kosztów serwisu', icon: 'cpu', difficulty: 'advanced' },
          { title: 'Cyfrowa książka serwisowa maszyn', desc: 'Każda maszyna ma swój profil w systemie: historia napraw, wymienionych części, przeglądów, dokumentacja techniczna, instrukcje BHP. Mechanik otwiera na tablecie, widzi co było robione i co trzeba sprawdzić. Koniec z "Jasiek wiedział, ale poszedł na urlop".', impact: 'Wiedza serwisowa niezależna od ludzi, onboarding mechanika 3× szybszy', icon: 'monitor', difficulty: 'easy' },
          { title: 'Automatyczne zlecenia przeglądów', desc: 'System liczy motogodziny, cykle lub czas od ostatniego przeglądu. Gdy próg zostanie przekroczony — automatycznie tworzy zlecenie serwisowe, rezerwuje części i powiadamia mechanika. Żaden przegląd nie umknie.', impact: 'Eliminacja przegapionych przeglądów, +30% żywotność maszyn', icon: 'bell', difficulty: 'easy' },
          { title: 'Dashboard OEE w czasie rzeczywistym', desc: 'Overall Equipment Effectiveness — dostępność × wydajność × jakość — mierzone automatycznie z sygnałów maszyn. Kierownik widzi, która maszyna "nie dowozi" i dlaczego. Agregacja per zmiana, linia, fabryka.', impact: 'Średni wzrost OEE o 10-15 punktów procentowych', icon: 'bar-chart', difficulty: 'medium' },
        ],
      },
      {
        name: 'Magazyn i łańcuch dostaw', icon: 'package',
        ideas: [
          { title: 'Automatyczne reordery do dostawców', desc: 'System monitoruje stany surowców w real-time. Gdy zapas spadnie poniżej punktu reorder (obliczonego dynamicznie z lead time dostawcy i tempa zużycia) — automatycznie generuje zamówienie zakupowe i wysyła je do dostawcy. Zero braków na linii.', impact: 'Eliminacja przestojów przez brak surowców', icon: 'refresh-cw', difficulty: 'medium' },
          { title: 'Inwentaryzacja z kodem QR / RFID', desc: 'Skanuj lokalizację, skanuj produkt, potwierdź ilość — inwentaryzacja w godzinach zamiast dni. System od razu porównuje stan fizyczny z księgowym i flaguje rozbieżności. Raport gotowy natychmiast.', impact: '-80% czasu inwentaryzacji, natychmiastowy raport rozbieżności', icon: 'search', difficulty: 'easy' },
          { title: 'Portal dostawcy z auto-avisami', desc: 'Dostawca loguje się do portalu, widzi zamówienia, potwierdza terminy, awizuje dostawę. System planuje slot rozładunkowy i informuje magazyn. Koniec z telefonami "kiedy przyjedziecie?" i kolejkami na rampie.', impact: '-60% czasu administracji zakupowej', icon: 'globe', difficulty: 'medium' },
        ],
      },
      {
        name: 'Dokumentacja i raportowanie', icon: 'file-text',
        ideas: [
          { title: 'Automatyczne raporty zmianowe', desc: 'System zbiera dane z maszyn (ilość wyprodukowana, odpady, przestoje, jakość) i generuje raport zmianowy bez udziału operatora. Rano na biurku kierownika — gotowy raport z poprzedniego dnia z trendami i alarmami.', impact: 'Raporty w sekundy zamiast 30 min ręcznego wypełniania', icon: 'bar-chart', difficulty: 'easy' },
          { title: 'Elektroniczna dokumentacja produkcyjna', desc: 'Instrukcje stanowiskowe, karty technologiczne, specyfikacje — wszystko na tablecie przy stanowisku. Gdy technolog zmieni recepturę, operator widzi aktualną wersję natychmiast. Zero ryzyka pracy "na starej wersji".', impact: 'Zawsze aktualna dokumentacja, pełna kontrola wersji', icon: 'layers', difficulty: 'easy' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     2. TRANSPORT & LOGISTYKA
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'transport',
    name: 'Transport & Logistyka',
    subtitle: 'Spedycja, flota, TSL, magazyny',
    icon: 'truck',
    color: '#3b82f6',
    sections: [
      {
        name: 'Zarządzanie flotą i trasami', icon: 'map-pin',
        ideas: [
          { title: 'Optymalizacja tras AI', desc: 'Algorytm planuje trasy z uwzględnieniem okien dostawczych, korków, pojemności aut, ograniczeń tonażowych i czasu pracy kierowców. Zamiast dyspozytora, który 2 godziny układa trasy — system robi to w sekundy i lepiej, bo analizuje tysiące wariantów jednocześnie.', impact: '-25% kosztów paliwa, -30% czasu planowania tras', icon: 'cpu', difficulty: 'medium' },
          { title: 'Real-time tracking z auto-ETA', desc: 'GPS na każdym pojeździe, live mapa w centralnym dashboardzie. Klient dostaje automatyczny SMS z dokładnym ETA, aktualizowanym w czasie rzeczywistym. Gdy kierowca się spóźnia — system informuje o tym zanim klient zadzwoni.', impact: '-80% telefonów "gdzie jest moja dostawa"', icon: 'globe', difficulty: 'easy' },
          { title: 'Predykcyjny serwis floty', desc: 'Dane z OBD pojazdu + historia serwisowa + przebieg → model przewiduje, kiedy hamulce, opony lub olej wymagają wymiany. Serwis jest planowany z wyprzedzeniem, w dogodnym terminie — nie po awarii w trasie 300km od bazy.', impact: '-50% awarii w trasie, -20% kosztów serwisu', icon: 'settings', difficulty: 'advanced' },
          { title: 'Monitoring czasu pracy kierowców', desc: 'System automatycznie liczy czas jazdy, odpoczynki i dostępność na podstawie danych z tachografu. Alerty gdy kierowca zbliża się do limitu. Automatyczne raporty dla Inspekcji Transportu Drogowego bez ręcznego przepisywania.', impact: 'Pełna zgodność z przepisami, zero mandatów za czas pracy', icon: 'clock', difficulty: 'medium' },
        ],
      },
      {
        name: 'Dokumentacja i rozliczenia transportowe', icon: 'file-text',
        ideas: [
          { title: 'Auto-generowanie CMR, WZ, listów przewozowych', desc: 'System pobiera dane ze zlecenia (nadawca, odbiorca, towar, waga) i generuje komplet dokumentów. Kierowca dostaje je na tablecie lub drukuje w kabinie. Zero ręcznego wypełniania, zero błędów w danych.', impact: 'Komplet dokumentów w 5 sekund zamiast 15 minut', icon: 'file-text', difficulty: 'easy' },
          { title: 'Cyfrowe POD z podpisem na tablecie', desc: 'Odbiorca podpisuje potwierdzenie dostawy na tablecie kierowcy. POD natychmiast trafia do systemu — faktura może być wystawiona tego samego dnia. Koniec z czekaniem tygodniami na papierowy CMR pocztą.', impact: 'Faktura w dniu dostawy zamiast po 2 tygodniach', icon: 'check-circle', difficulty: 'easy' },
          { title: 'Automatyczne rozliczenia tras i kosztów', desc: 'Dane GPS (km, czas, paliwo) + stawki kontraktowe = automatyczna kalkulacja kosztu transportu per zlecenie. System generuje fakturę, rozlicza podwykonawców i liczy marżę na trasie — bez ręcznych obliczeń w Excelu.', impact: '-70% pracy administracyjnej przy rozliczeniach', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'OCR faktur kosztowych od podwykonawców', desc: 'Faktura od podwykonawcy wpada na maila → OCR wyciąga dane (kwota, trasa, numer zlecenia) → system paruje z zleceniem → kontrola marży automatyczna. Księgowość dostaje gotową dekretację.', impact: '-85% ręcznego przepisywania faktur', icon: 'eye', difficulty: 'medium' },
        ],
      },
      {
        name: 'Rozliczenia kierowców i kadry', icon: 'users',
        ideas: [
          { title: 'Automatyczne naliczanie wynagrodzeń kierowców', desc: 'System zbiera dane: km przejechane, godziny pracy (z tachografu), diety, noclegi, premie za terminowość. Automatycznie nalicza wynagrodzenie wg formuły kontraktowej — bez ręcznych obliczeń. Kierowca widzi rozliczenie w apce.', impact: '-90% czasu naliczania, zero sporów o diety i km', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Self-service dla kierowców w apce mobilnej', desc: 'Kierowca w jednej apce widzi: swoje zlecenia, nawigację, dokumenty do podpisu, rozliczenie wynagrodzenia, wnioski urlopowe. Nie musi dzwonić do biura z pytaniami — wszystko ma w kieszeni.', impact: '-60% telefonów kierowców do biura', icon: 'smartphone', difficulty: 'medium' },
          { title: 'Dashboard wydajności floty', desc: 'Ranking kierowców po zużyciu paliwa, terminowości, stylu jazdy (eco-driving). Transparentne dane do rozmów o premiach i szkoleniach. System identyfikuje kierowców, którzy potrzebują treningu eco-driving.', impact: 'Obiektywna ocena wydajności, -10% zużycia paliwa', icon: 'bar-chart', difficulty: 'easy' },
        ],
      },
      {
        name: 'Sprzedaż i obsługa zleceń', icon: 'trending-up',
        ideas: [
          { title: 'Kalkulator cen spot w real-time', desc: 'Klient pyta o cenę? System od razu kalkuluje: dystans, aktualna cena paliwa, dostępność auta w regionie, load factor. Handlowiec dostaje sugerowaną cenę z marżą — i może wysłać ofertę w 2 minuty zamiast 2 godzin.', impact: '3× szybsza odpowiedź na zapytania klientów', icon: 'zap', difficulty: 'medium' },
          { title: 'Portal klienta z self-service', desc: 'Klient sam składa zlecenie przez portal, śledzi status, pobiera dokumenty (CMR, POD, faktura). Nie musi dzwonić, mailować, czekać. System automatycznie potwierdza przyjęcie i przypisuje do dyspozytora.', impact: '-50% telefonów od klientów, wyższy NPS', icon: 'globe', difficulty: 'medium' },
          { title: 'Automatyczne follow-upy po dostawie', desc: 'Dostawa zakończona → po 24h system wysyła ankietę satysfakcji. Niska ocena → alert do opiekuna klienta. Brak nowych zleceń od 30 dni → auto-mail z ofertą. Systematyczne budowanie relacji bez wysiłku.', impact: '+15% retencji klientów', icon: 'mail', difficulty: 'easy' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     3. E-COMMERCE & HANDEL
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'ecommerce',
    name: 'E-commerce & Handel',
    subtitle: 'Sklepy online, marketplace, hurtownie, dystrybucja',
    icon: 'shopping-cart',
    color: '#f59e0b',
    sections: [
      {
        name: 'Automatyzacja sprzedaży i zamówień', icon: 'zap',
        ideas: [
          { title: 'Zero-touch order processing', desc: 'Zamówienie wpada (z Allegro, własnego sklepu, maila B2B) → system weryfikuje płatność → rezerwuje towar → generuje etykietę kurierską → wysyła tracking do klienta. Cały proces bez jednego kliknięcia człowieka. Wyjątek: alerty przy niestandardowych zamówieniach.', impact: '-80% czasu obsługi zamówienia, nawet 500+ zamówień/dzień', icon: 'zap', difficulty: 'medium' },
          { title: 'Multi-marketplace sync (Allegro, Amazon, Shopify)', desc: 'Jeden centralny katalog produktów — ceny, stany, opisy i zdjęcia synchronizowane na wszystkie platformy w real-time. Sprzedałeś 1 sztukę na Allegro? Stan spada wszędzie natychmiast. Koniec z overselling i ręczną aktualizacją.', impact: 'Zero oversellingu, -90% ręcznej pracy przy listingach', icon: 'globe', difficulty: 'medium' },
          { title: 'Smart multi-carrier selector', desc: 'Algorytm wybiera najtańszego kuriera dla każdej paczki osobno — na podstawie wagi, wymiarów, regionu dostawy i SLA. DPD na Śląsk, InPost do centrum, Poczta na wieś. Automatycznie, per paczka.', impact: '-15% kosztów wysyłki przy dużym wolumenie', icon: 'truck', difficulty: 'medium' },
          { title: 'Automatyczne zamówienia zakupowe od dostawców', desc: 'Bestsellerowi spada stan poniżej 5-dniowego zapasu? System automatycznie generuje zamówienie u dostawcy z optymalną ilością. Uwzględnia lead time dostawcy, MOQ i historię sprzedaży.', impact: 'Zero out-of-stock na bestsellerach', icon: 'bell', difficulty: 'easy' },
          { title: 'Hurtowe przetwarzanie zwrotów', desc: 'Klient zgłasza zwrot → system generuje etykietę, śledzi paczkę, weryfikuje stan produktu (na podstawie zdjęć AI), automatycznie inicjuje refund lub wymianę. Obsługa 50 zwrotów dziennie siłami jednej osoby.', impact: '-65% czasu obsługi zwrotów', icon: 'refresh-cw', difficulty: 'medium' },
        ],
      },
      {
        name: 'Marketing i retencja klientów', icon: 'heart',
        ideas: [
          { title: 'Porzucone koszyki — multi-channel sekwencja', desc: 'Klient dodał do koszyka i nie kupił? Po 1h — email z przypomnieniem. Po 24h — email z rabatem 5%. Po 72h — SMS "Twoje produkty czekają". Po 7 dniach — retargeting na Facebooku. Automatyczna, personalizowana sekwencja, która odzyskuje 15-25% porzuconych koszyków.', impact: '+18% przychodu bez dodatkowego ruchu', icon: 'mail', difficulty: 'easy' },
          { title: 'Segmentacja klientów AI + personalizacja', desc: 'Model analizuje historię zakupów, częstotliwość, wartość koszyka i zachowanie na stronie. Automatycznie dzieli klientów na segmenty (VIP, zagrożony odejściem, nowy, okazyjny) i dobiera komunikację, oferty i timing wysyłki.', impact: '+40% open rate, +25% konwersja z maili', icon: 'users', difficulty: 'advanced' },
          { title: 'Dynamiczne ceny i automatyczne promocje', desc: 'System analizuje: co nie sprzedaje się dobrze, co ma spadającą marżę, co ma za dużo zapasu — i automatycznie proponuje promocje. Albo odwrotnie: bestseller z niskim stanem → system podnosi cenę. Pricing data-driven zamiast intuicyjnego.', impact: '+12% marży brutto, -50% zapasu wolno rotującego', icon: 'trending-up', difficulty: 'medium' },
          { title: 'Program lojalnościowy na autopilocie', desc: 'Klient kupuje → zbiera punkty → automatyczne nagrody (kupon na urodziny, rabat po 5. zakupie, darmowa dostawa dla VIP). Komunikacja SMS/email generowana automatycznie. Zero ręcznej obsługi programu.', impact: '+30% powtórnych zakupów', icon: 'award', difficulty: 'medium' },
        ],
      },
      {
        name: 'Obsługa klienta', icon: 'message-circle',
        ideas: [
          { title: 'AI chatbot na pierwszej linii', desc: 'Bot odpowiada na 80% powtarzalnych pytań: "gdzie moja paczka?" (pobiera tracking), "jaki rozmiar wybrać?" (tabela rozmiarów), "czy mogę zwrócić?" (procedura zwrotu). Gdy nie wie — przekierowuje do człowieka z pełnym kontekstem rozmowy i historią zamówień.', impact: '-70% ticketów trafiających do człowieka', icon: 'cpu', difficulty: 'medium' },
          { title: 'Automatyczne odpowiedzi na recenzje', desc: 'AI generuje spersonalizowane odpowiedzi na opinie Allegro/Google. Pozytywna? Podziękowanie + zaproszenie do kolejnych zakupów. Negatywna? Przeprosiny + propozycja rozwiązania + eskalacja do managera. Ty tylko zatwierdzasz jednym kliknięciem.', impact: '5× więcej odpowiedzi na opinie, wyższy rating', icon: 'heart', difficulty: 'easy' },
          { title: 'Smart routing zgłoszeń + sugerowana odpowiedź', desc: 'System klasyfikuje zgłoszenie (reklamacja / pytanie o produkt / problem z dostawą) i kieruje do odpowiedniej osoby z gotową sugerowaną odpowiedzią. Agent poprawia i wysyła — zamiast pisać od zera.', impact: '-45% czasu rozwiązania zgłoszenia', icon: 'settings', difficulty: 'medium' },
        ],
      },
      {
        name: 'Analityka i raportowanie', icon: 'bar-chart',
        ideas: [
          { title: 'Dashboard KPI e-commerce w real-time', desc: 'Konwersja, AOV, LTV, CAC, ROAS, marża per SKU — wszystko na jednym ekranie, aktualizowane co minutę. Porównanie z poprzednim tygodniem, miesiącem, rokiem. Alerty gdy metryka spada poniżej progu.', impact: 'Decyzje oparte na danych zamiast przeczucia', icon: 'monitor', difficulty: 'easy' },
          { title: 'Auto-raport tygodniowy na maila', desc: 'Co poniedziałek o 8:00 w skrzynce: co się sprzedawało, co nie, jaka marża, top 10 produktów, trend konwersji, alerty o anomaliach. Zero logowania do Google Analytics.', impact: '2h/tydzień mniej na raportowanie, szybsze decyzje', icon: 'mail', difficulty: 'easy' },
          { title: 'Predykcja popytu per SKU', desc: 'AI przewiduje sprzedaż na najbliższe 2-4 tygodnie per produkt. Uwzględnia sezonowość, planowane kampanie, trend wzrostowy. Kupujesz tyle ile trzeba — nie za dużo, nie za mało.', impact: '-30% nadmiarowego zapasu, zero braków na bestsellerach', icon: 'trending-up', difficulty: 'advanced' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     4. AGENCJE & USŁUGI B2B
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'agencies',
    name: 'Agencje & Usługi B2B',
    subtitle: 'Marketing, consulting, software house, prawo',
    icon: 'briefcase',
    color: '#8b5cf6',
    sections: [
      {
        name: 'Sprzedaż i pipeline', icon: 'trending-up',
        ideas: [
          { title: 'Lead scoring z auto-kwalifikacją', desc: 'Lead z formularza, LinkedIn, czy webinaru → system scoruje (branża, wielkość firmy, zachowanie na stronie, budget fit). Hot lead leci do handlowca natychmiast, warm idzie do nurturingu, cold dostaje sekwencję edukacyjną. Handlowiec pracuje tylko z najgorętszymi.', impact: '+35% konwersja pipeline, -50% czasu na zimne leady', icon: 'users', difficulty: 'medium' },
          { title: 'Generator ofert i proposals z szablonów', desc: 'Handlowiec wybiera klienta, usługi, zakres i budżet → system generuje spersonalizowany dokument ofertowy (PDF/link) z case studies z tej branży, referencjami i warunkami. 2 minuty zamiast 2 godzin w Google Docs.', impact: '-75% czasu na przygotowanie oferty', icon: 'file-text', difficulty: 'easy' },
          { title: 'Automatyczne follow-upy i nurturing', desc: 'Wysłałeś ofertę i cisza? Po 3 dniach system wysyła grzeczny follow-up. Po 7 — inny. Po 14 — alert do managera "ten deal stygnie". Nikt nie wpadnie w czarną dziurę pipeline\'u.', impact: '+25% zamykanych deali, zero zapomnianych ofert', icon: 'mail', difficulty: 'easy' },
          { title: 'CRM z auto-logowaniem aktywności', desc: 'Każdy mail, spotkanie (z kalendarza), telefon — automatycznie logowane w CRM bez ręcznego "wpisywania notatek". Handlowiec sprzedaje zamiast wypełniać CRM. Manager widzi pełną historię kontaktu.', impact: '-80% czasu na administrację CRM', icon: 'monitor', difficulty: 'medium' },
        ],
      },
      {
        name: 'Zarządzanie projektami i rentownością', icon: 'target',
        ideas: [
          { title: 'Auto-time tracking z integracji', desc: 'System zbiera dane o czasie pracy z narzędzi, których zespół i tak używa: Jira, Linear, kalendarz Google, Git. Raport per klient, per projekt generuje się sam — bez ręcznego wypełniania timesheetów, które i tak nikt nie lubi robić.', impact: '-90% ręcznego raportowania czasu, +30% dokładność', icon: 'clock', difficulty: 'medium' },
          { title: 'Dashboard rentowności projektów live', desc: 'Widok: ile godzin spalono vs. budżet, jaka jest aktualna marża, ile zostało do końca. Per projekt, per klient, per team. Nie po fakcie ("straciliśmy na tym projekcie"), ale w trakcie — żeby zdążyć zareagować.', impact: '-40% przekroczeń budżetowych', icon: 'bar-chart', difficulty: 'medium' },
          { title: 'Alert o przekroczeniu budżetu', desc: 'Projekt osiąga 80% budżetu godzinowego? System alarmuje PM-a. 100%? Alert do managera. Każdy wie, zanim projekt wejdzie na czerwono. Automatyczne, nie "ktoś powinien był sprawdzić".', impact: 'Zero niespodzianek przy rozliczeniu projektu', icon: 'bell', difficulty: 'easy' },
          { title: 'Automatyczny status update do klienta', desc: 'Co tydzień klient dostaje elegancki, wygenerowany automatycznie raport: co zrobiliśmy, co przed nami, czy jesteśmy na czas, metryki postępu. Klient czuje się zaopiekowany, PM nie traci 30 minut na pisanie update\'u.', impact: 'Wyższy NPS klienta, -2h/tydzień pracy PM-a', icon: 'mail', difficulty: 'easy' },
        ],
      },
      {
        name: 'Finanse i fakturowanie', icon: 'dollar-sign',
        ideas: [
          { title: 'Auto-fakturowanie z timesheetów', desc: 'Miesiąc się kończy → system zbiera godziny per klient per stawka → generuje fakturę → wysyła do akceptacji → po zatwierdzeniu wysyła do klienta i do księgowości. Faktura w dniu zamknięcia miesiąca, nie po tygodniu szukania danych.', impact: 'Faktura gotowa w godzinach zamiast dni', icon: 'zap', difficulty: 'medium' },
          { title: 'Windykacja miękka na autopilocie', desc: 'Termin płatności mija → grzeczne przypomnienie. +7 dni → drugi mail z eskalacją. +14 dni → telefon od opiekuna klienta. +30 dni → automatyczne wstrzymanie nowych zleceń. Cała sekwencja z ludzkimi, personalizowanymi wiadomościami.', impact: '-50% przeterminowanych należności', icon: 'bell', difficulty: 'easy' },
          { title: 'Prognoza cash flow', desc: 'System zbiera: zaplanowane faktury (z pipeline i bieżących projektów), oczekiwane płatności, koszty stałe. Prognozuje saldo na 30/60/90 dni. CFO widzi potencjalne "dziury" z wyprzedzeniem.', impact: 'Koniec z niespodziankami na koncie firmowym', icon: 'trending-up', difficulty: 'medium' },
        ],
      },
      {
        name: 'Zespół, HR i wiedza', icon: 'users',
        ideas: [
          { title: 'Automatyczny onboarding nowego pracownika', desc: 'Nowa osoba w zespole → system automatycznie generuje zadania: IT setup (konto Google, Slack, dostępy), HR (umowa, regulamin, BHP), buddy (lista spotkań), szkolenie (materiały). Każdy wie, co ma zrobić. Onboarding trwa 2 dni, nie 2 tygodnie.', impact: 'Produktywny od 3. dnia, zero "a kto miał mu dać dostępy?"', icon: 'check-circle', difficulty: 'easy' },
          { title: 'Baza wiedzy z AI-wyszukiwarką', desc: 'Wszystkie procedury, szablony, case studies, know-how w jednym miejscu z inteligentną wyszukiwarką. Pytasz "jak robimy audyt SEO?" — system zwraca procedurę, checklistę i przykłady z poprzednich projektów.', impact: 'Wiedza firmowa niezależna od ludzi, onboarding 3× szybszy', icon: 'search', difficulty: 'medium' },
          { title: 'Pulse check — automatyczny monitoring nastrojów', desc: 'Co 2 tygodnie bot na Slacku pyta zespół: jak oceniasz obciążenie? Jest coś, co Cię blokuje? 3 pytania, 30 sekund. Wyniki trafiają do dashboardu managera. Problemy wykrywane wcześnie, nie na exit interview.', impact: 'Wczesne wykrywanie wypalenia i problemów retencyjnych', icon: 'heart', difficulty: 'easy' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     5. FINANSE, KSIĘGOWOŚĆ & UBEZPIECZENIA
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'finance',
    name: 'Finanse & Księgowość',
    subtitle: 'Biura rachunkowe, BPO, brokerzy, doradcy',
    icon: 'dollar-sign',
    color: '#10b981',
    sections: [
      {
        name: 'Obieg dokumentów i faktur', icon: 'file-text',
        ideas: [
          { title: 'OCR faktur z auto-dekretacją', desc: 'Faktura wpada na maila lub skan → OCR wyciąga: kontrahent, kwota netto/brutto, VAT, data, numer. System proponuje dekretację na podstawie wzorców (ten dostawca zawsze idzie na konto 401-02). Księgowa tylko zatwierdza.', impact: '-85% ręcznego przepisywania, -95% błędów w danych', icon: 'eye', difficulty: 'medium' },
          { title: 'Matching faktur z zamówieniami (3-way match)', desc: 'Faktura ↔ zamówienie ↔ dokument dostawy — system automatycznie paruje trzy dokumenty i flaguje niezgodności (inna cena, inna ilość, brak WZ). Niezgodne → alert do odpowiedniej osoby. Zgodne → flow zatwierdzenia.', impact: '-95% błędów w rozliczeniach, audyt-ready', icon: 'check-circle', difficulty: 'medium' },
          { title: 'Cyfrowy obieg akceptacji kosztów', desc: 'Faktura kosztowa → automatycznie do managera odpowiedniego działu (na podstawie konta / dostawcy) → akceptacja w apce jednym kliknięciem → do księgowości. Pełna ścieżka audytowa. Koniec z "ta faktura gdzieś leży od 2 tygodni".', impact: 'Średni czas akceptacji z 5 dni do 4 godzin', icon: 'zap', difficulty: 'easy' },
          { title: 'Automatyczne przypomnienia o płatnościach', desc: 'Przed terminem — grzeczne przypomnienie do kontrahenta. W dniu terminu — potwierdzenie oczekiwania. Po terminie — eskalacja z rosnącą stanowczością. Personalizowane, ale automatyczne. Księgowa nie musi pamiętać o każdej fakturze.', impact: '-40% przeterminowanych faktur', icon: 'bell', difficulty: 'easy' },
        ],
      },
      {
        name: 'Raportowanie i analityka finansowa', icon: 'bar-chart',
        ideas: [
          { title: 'Real-time P&L i dashboard zarządczy', desc: 'Przychody, koszty, marża, EBITDA — aktualizowane w czasie rzeczywistym z danych z ERP, banku i systemu sprzedaży. Zarząd nie czeka na zamknięcie miesiąca, żeby wiedzieć, jak idzie. Alert gdy KPI spada poniżej progu.', impact: 'Z 3 dni zamknięcia do 15 minut, decyzje na danych', icon: 'monitor', difficulty: 'medium' },
          { title: 'Automatyczny cash flow forecast', desc: 'Model prognozuje przepływy pieniężne na 30/60/90 dni: zaplanowane wpływy (z faktur sprzedażowych, kontraktów), zobowiązania (faktury kosztowe, pensje, ZUS). Wizualizacja: kiedy będzie "ciasno" na koncie.', impact: 'Koniec z niespodziankami — wiesz na 2 miesiące do przodu', icon: 'trending-up', difficulty: 'advanced' },
          { title: 'Raporty KPI na Slacka / maila o 8:00', desc: 'Codziennie rano zarząd dostaje: wczorajszy przychód, narastająco MTD, top 5 kosztów, saldo konta, nierozliczone faktury. Zero logowania gdziekolwiek. Cotygodniowy digest z trendami i alertami.', impact: 'Decyzje zanim kawa wystygnie', icon: 'mail', difficulty: 'easy' },
        ],
      },
      {
        name: 'Obsługa klientów biura rachunkowego', icon: 'users',
        ideas: [
          { title: 'Portal klienta z uploadem dokumentów', desc: 'Klient loguje się do portalu, wrzuca faktury (skan/zdjęcie), widzi status (zaksięgowane / do wyjaśnienia / brak dokumentu). Nie musi dzwonić, mailować, wozić papierów. Biuro ma wszystko w jednym miejscu.', impact: '-60% telefonów od klientów, -80% czasu na zbieranie dokumentów', icon: 'globe', difficulty: 'medium' },
          { title: 'Automatyczne reminder "brakuje dokumentów"', desc: 'Do 10. dnia miesiąca brakuje 3 faktur od klienta X? System sam wysyła grzeczne przypomnienie z listą brakujących dokumentów. Eskalacja co 3 dni. Koniec z "klient nie dosłał, nie zdążymy z JPK".', impact: 'Komplet dokumentów na czas, mniej stresu pod koniec miesiąca', icon: 'bell', difficulty: 'easy' },
          { title: 'Auto-generowanie JPK, deklaracji, PIT-ów', desc: 'System zbiera zaksięgowane dane i automatycznie generuje: JPK_V7, deklaracje VAT, PIT-y roczne. Księgowa weryfikuje, klika "wyślij" — zamiast ręcznie wypełniać formularz na 100 pozycji.', impact: '-70% czasu na sprawozdawczość, zero pomyłek numerycznych', icon: 'file-text', difficulty: 'medium' },
        ],
      },
      {
        name: 'Procesy brokerskie i ubezpieczeniowe', icon: 'shield',
        ideas: [
          { title: 'CRM ubezpieczeniowy z terminarzem polis', desc: 'Każdy klient ma profil z historią polis, datami wygasania, preferencjami. 60 dni przed końcem polisy — system automatycznie uruchamia proces odnowienia: alert do brokera, mail do klienta, przygotowanie ofert.', impact: 'Zero przegapionych odnowień, +30% retencja klientów', icon: 'clock', difficulty: 'medium' },
          { title: 'Porównywarka ofert TU z szablonami', desc: 'Broker wprowadza parametry klienta → system odpytuje API towarzystw ubezpieczeniowych → generuje porównanie ofert w czytelnym PDF. Klient widzi opcje side-by-side. 5 minut zamiast godziny ręcznego porównywania.', impact: '-80% czasu na przygotowanie oferty porównawczej', icon: 'search', difficulty: 'medium' },
          { title: 'Automatyczna obsługa szkód', desc: 'Klient zgłasza szkodę → system zbiera dokumentację (formularz, zdjęcia), kompletuje wniosek, wysyła do TU. Klient widzi status na portalu. Broker interweniuje tylko gdy TU odrzuci roszczenie.', impact: '-60% czasu na obsługę szkód, wyższy NPS', icon: 'shield', difficulty: 'advanced' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     6. BUDOWNICTWO & NIERUCHOMOŚCI
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'construction',
    name: 'Budownictwo & Nieruchomości',
    subtitle: 'Wykonawcy, deweloperzy, zarządcy, agenci',
    icon: 'home',
    color: '#ec4899',
    sections: [
      {
        name: 'Zarządzanie budową i projektami', icon: 'target',
        ideas: [
          { title: 'Cyfrowy dziennik budowy z apką mobilną', desc: 'Kierownik budowy loguje postępy z telefonu: zdjęcia, notatki, warunki pogodowe, obecność ekip. Inwestor i biuro widzą status w czasie rzeczywistym na dashboardzie. Pełna historia budowy — audytowalana i przeszukiwalna.', impact: 'Pełna transparentność budowy, -60% raportowania papierowego', icon: 'smartphone', difficulty: 'easy' },
          { title: 'Harmonogram Gantt z auto-aktualizacją', desc: 'System śledzi postęp prac i automatycznie przesuwa zależne zadania, gdy coś się opóźnia. Alert do PM-a: "opóźnienie tynków o 3 dni przesuwa malowanie o 3 dni". Koniec z ręcznym aktualizowaniem harmonogramu w MS Project.', impact: 'Realistyczny harmonogram zamiast fikcji', icon: 'clock', difficulty: 'medium' },
          { title: 'Budżetowanie i kontrola kosztów budowy', desc: 'Budżet per pozycja kosztorysowa, bieżące wydatki z faktur, prognoza do końca. Dashboard: ile wydaliśmy vs. ile planowaliśmy per etap. Alert przy przekroczeniu 90% budżetu na pozycji.', impact: '-30% przekroczeń budżetowych', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Zarządzanie podwykonawcami', desc: 'Portal dla podwykonawców: harmonogram ich prac, dokumenty (umowa, ubezpieczenie, protokoły), rozliczenia. Podwykonawca zgłasza gotowość do odbioru → system tworzy zadanie inspektora.', impact: 'Zero chaosu z dokumentacją podwykonawców', icon: 'users', difficulty: 'medium' },
        ],
      },
      {
        name: 'Sprzedaż nieruchomości i CRM', icon: 'trending-up',
        ideas: [
          { title: 'Multi-portal publishing ofert', desc: 'Jedno kliknięcie — oferta publikowana na Otodom, OLX, Gratka, Morizon i 10+ portalach. Zmiana ceny? Aktualizuje wszędzie automatycznie. Nowe zdjęcia? Synchronizuje. Sprzedane? Zdejmuje wszędzie.', impact: '-90% czasu na publikację ofert', icon: 'globe', difficulty: 'easy' },
          { title: 'Auto-matching oferta ↔ kupujący', desc: 'Nowa oferta w portfolio → system sprawdza bazę klientów szukających i automatycznie wysyła spersonalizowany mailing do pasujących. "Szukasz 3 pokoi na Mokotowie do 800k? Właśnie pojawiło się coś dla Ciebie."', impact: '+30% konwersja z mailingu, szybsza sprzedaż', icon: 'users', difficulty: 'medium' },
          { title: 'CRM z pełną historią kontaktu', desc: 'Każda interakcja z klientem zalogowana: telefony, maile, prezentacje, oferty. Agent widzi pełny kontekst zanim podniesie słuchawkę. Gdy agent odchodzi — wiedza o kliencie zostaje w firmie, nie w jego głowie.', impact: 'Wiedza o kliencie niezależna od agenta', icon: 'monitor', difficulty: 'easy' },
        ],
      },
      {
        name: 'Zarządzanie nieruchomościami i najemcami', icon: 'home',
        ideas: [
          { title: 'Portal najemcy — self-service', desc: 'Najemca sam zgłasza usterki (z opisem i zdjęciem), widzi faktury, pobiera dokumenty, komunikuje się z administracją. Bez dzwonienia, mailowania, chodzenia do biura. Status zgłoszenia śledzony jak paczka kurierska.', impact: '-70% telefonów do administracji', icon: 'globe', difficulty: 'medium' },
          { title: 'Auto-rozliczenia mediów i czynszu', desc: 'Odczyty z liczników (ręczne lub z IoT) → kalkulacja zużycia per lokal → wygenerowany rachunek → wysłany do najemcy → auto-przypomnienie przed terminem. Proces, który zajmował 3 dni, zamknięty w 30 minut.', impact: '3 dni pracy → 30 minut', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Smart dispatch zgłoszeń serwisowych', desc: 'Najemca zgłasza usterkę → system kategoryzuje (hydraulika/elektro/ogólne) → przypisuje do odpowiedniego technika → technik dostaje zadanie z lokalizacją i opisem → najemca widzi status.', impact: '-50% czasu reakcji na zgłoszenia', icon: 'settings', difficulty: 'easy' },
          { title: 'Automatyczne reminder o terminach umów', desc: 'Umowa najmu wygasa za 3 miesiące? System informuje zarządcę i proponuje: renegocjacja, nowa oferta, lub przygotowanie lokalu do ponownego wynajmu. Zero przegapionych terminów.', impact: 'Zero pustostanów z powodu przegapionego terminu', icon: 'clock', difficulty: 'easy' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     7. GASTRONOMIA & SPOŻYWCZA
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'gastro',
    name: 'Gastronomia & Spożywcza',
    subtitle: 'Restauracje, cukiernie, catering, produkcja żywności',
    icon: 'coffee',
    color: '#f97316',
    sections: [
      {
        name: 'Produkcja i receptury', icon: 'layers',
        ideas: [
          { title: 'Cyfrowa książka receptur z auto-kalkulacją food costu', desc: 'Każda receptura w systemie: składniki, gramatura, koszt per porcja (aktualizowany automatycznie z cenami dostawców). Chef zmienia recepturę? System przelicza food cost i porównuje z ceną na karcie. Alerty gdy marża spada poniżej progu.', impact: 'Kontrola marży per danie w czasie rzeczywistym', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Planowanie produkcji piekarni/cukierni', desc: 'System analizuje historię sprzedaży per dzień tygodnia, pory roku i zamówienia B2B → generuje plan produkcji na jutro z dokładnymi ilościami. Mniej wyrzucania, mniej braków. Szczególnie skuteczne dla piekarni z wieloma SKU.', impact: '-30% food waste, -50% braków na półce', icon: 'clock', difficulty: 'medium' },
          { title: 'Etykietowanie z datami ważności', desc: 'System generuje etykiety z datą produkcji, terminem ważności, składnikami i alergenami — z receptury. Zmiana składnika w recepturze? Etykieta aktualizuje się automatycznie. Zgodność z wymogami HACCP i Sanepidu.', impact: 'Pełna zgodność z przepisami, zero ręcznych błędów', icon: 'check-circle', difficulty: 'easy' },
        ],
      },
      {
        name: 'Zamówienia i magazyn', icon: 'package',
        ideas: [
          { title: 'Auto-listy zakupowe z planu produkcji', desc: 'Plan produkcji na jutro → system przelicza potrzebne surowce z receptur → odejmuje stany magazynowe → generuje listę zakupową → wysyła zamówienie do dostawcy. Zero "zabrakło mąki" o 6 rano.', impact: 'Zamówienia idealnie dopasowane, -18% food cost', icon: 'zap', difficulty: 'medium' },
          { title: 'Kontrola dat ważności z alertami', desc: 'Każdy produkt w systemie z datą ważności. 3 dni przed upływem → alert "użyj w daniu dnia" lub "przeceń". Dzień przed → "przerzuć do utylizacji". Dashboard: ile wyrzuciliśmy w tym miesiącu i dlaczego.', impact: '-40% food waste, pełna kontrola FIFO', icon: 'clock', difficulty: 'easy' },
          { title: 'Przyjmowanie dostaw z weryfikacją', desc: 'Dostawca przyjeżdża → pracownik skanuje WZ, weryfikuje ilości na tablecie, notuje temperaturę (dla chłodniczych). System porównuje z zamówieniem, flaguje rozbieżności. Pełna dokumentacja dla HACCP.', impact: 'Eliminacja pomyłek w dostawach, audyt-ready', icon: 'check-circle', difficulty: 'easy' },
        ],
      },
      {
        name: 'Obsługa gościa i sprzedaż', icon: 'heart',
        ideas: [
          { title: 'System rezerwacji online z zarządzaniem stolikami', desc: 'Widget na stronie + Google + social media. Gość rezerwuje 24/7 — automatyczne potwierdzenie SMS. System pokazuje widok sali z dostępnymi stolikami. Przypomnienie 2h przed wizytą. Gość nie przychodzi? Auto-anulacja po 15 min.', impact: '+50% rezerwacji, -80% no-show', icon: 'globe', difficulty: 'easy' },
          { title: 'Zamówienia online dla cateringu/B2B', desc: 'Klienci biznesowi (biura, eventy, hurtowi) składają zamówienia przez dedykowany portal z cenami kontraktowymi. System zbiera zamówienia, agreguje na plan produkcji, generuje dokumenty dostawy.', impact: '-60% czasu na obsługę zamówień B2B', icon: 'monitor', difficulty: 'medium' },
          { title: 'Program lojalnościowy z auto-komunikacją', desc: 'Klient kupuje → zbiera punkty/pieczątki cyfrowo. Automatyczne: kupon urodzinowy, nagroda po X zakupie, reaktywacja po 30 dniach bez wizyty. Komunikacja SMS/email bez ręcznej obsługi.', impact: '+25% powracających klientów', icon: 'award', difficulty: 'medium' },
          { title: 'Auto-zbieranie opinii i zarządzanie reputacją', desc: 'Po wizycie/zamówieniu klient dostaje SMS z jednym pytaniem. Ocena 4-5★? Automatyczna prośba o recenzję Google. Ocena 1-3★? Alert do managera + przeprosiny + voucher. System buduje rating i monitoruje trendy.', impact: '+200% opinii Google, szybka reakcja na problemy', icon: 'heart', difficulty: 'easy' },
        ],
      },
      {
        name: 'Kadry i grafiki', icon: 'users',
        ideas: [
          { title: 'Automatyczne planowanie zmian', desc: 'System układa grafik na podstawie: dostępności pracowników, prognozowanego obłożenia (z historii i rezerwacji), kwalifikacji (barista / kucharz / kelner). Pracownik widzi grafik w apce, może zgłosić zamianę — system weryfikuje pokrycie.', impact: '-70% czasu planowania grafiku', icon: 'clock', difficulty: 'medium' },
          { title: 'RCP mobilne z geofence', desc: 'Pracownik loguje start/koniec zmiany z telefonu (z weryfikacją lokalizacji). System liczy godziny, nadgodziny, przerwy. Koniec miesiąca → automatyczna lista płac. Zero sporów "ile pracowałem w tym miesiącu".', impact: 'Precyzyjne rozliczenia, zero sporów o godziny', icon: 'smartphone', difficulty: 'easy' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     8. IT & SOFTWARE HOUSE
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'it',
    name: 'IT & Software House',
    subtitle: 'Software house, SaaS, systemy, wdrożenia',
    icon: 'code',
    color: '#6366f1',
    sections: [
      {
        name: 'Sprzedaż i business development', icon: 'trending-up',
        ideas: [
          { title: 'Pipeline management z predykcją zamknięcia', desc: 'Każdy deal w CRM z prawdopodobieństwem zamknięcia (obliczanym z historii: branża, wielkość dealu, etap, czas w pipeline). Dashboard prognozuje revenue na Q — CEO widzi realistyczny forecast, nie "chciejstwo" handlowca.', impact: 'Trafność forecastu +40%, lepsze planowanie zasobów', icon: 'bar-chart', difficulty: 'medium' },
          { title: 'Automatyczny estimation helper', desc: 'Przed wyceną projektu system przeszukuje historię wycen i projektów: "podobny e-commerce robiliśmy 3× — średnio 1200h". Tech lead dostaje benchmark zamiast strzelać od zera. Mniej underpricingu, mniej overpricingu.', impact: 'Wyceny bliższe rzeczywistości, -50% czasu estymacji', icon: 'cpu', difficulty: 'advanced' },
          { title: 'Auto-proposal z portfolio i case studies', desc: 'RFP od klienta → system dobiera relevantne case studies z portfolio (ta branża, ten tech stack), generuje prezentację i wstępną propozycję zespołu. Sales Engineer dostaje 80% gotowy dokument do dopracowania.', impact: '-60% czasu na przygotowanie proposal', icon: 'file-text', difficulty: 'medium' },
        ],
      },
      {
        name: 'Delivery i zarządzanie zespołem', icon: 'target',
        ideas: [
          { title: 'Resource planning board', desc: 'Dashboard: kto nad czym pracuje, kto jest dostępny za tydzień, kto za miesiąc. Planowanie alokacji developerów do projektów z uwzględnieniem skills, preferencji i dostępności. Koniec z "nie ma kto robić, wszyscy zajęci".', impact: 'Optymalne wykorzystanie zespołu, -30% bench time', icon: 'users', difficulty: 'medium' },
          { title: 'Automated sprint reports dla klienta', desc: 'Koniec sprintu → system zbiera: zrealizowane tickets, velocity, burndown, release notes. Generuje czytelny raport dla klienta z postępem i metrykami. PM spędza 5 minut na review zamiast godziny na pisanie.', impact: 'Transparentność dla klienta, -80% czasu na raportowanie', icon: 'mail', difficulty: 'easy' },
          { title: 'Time tracking bez bólu', desc: 'Zamiast ręcznych timesheetów — system zbiera dane z Jira/Linear (ile czasu ticket w "in progress"), kalendarz (spotkania z klientem), Git (active coding time). Raport per klient generuje się automatycznie. Developerzy kodzą zamiast logować czas.', impact: '-90% ręcznego trackowania, +30% dokładność', icon: 'clock', difficulty: 'medium' },
          { title: 'Monitoring jakości kodu i tech debt', desc: 'Dashboard z metrykami: code coverage, tech debt score, build time, deployment frequency, bug rate per sprint. Trendy po projektach i zespołach. CTO widzi, gdzie "pożar" zanim wybuchnie.', impact: 'Proaktywne zarządzanie jakością zamiast gaszenia pożarów', icon: 'shield', difficulty: 'medium' },
        ],
      },
      {
        name: 'Finanse software house\'u', icon: 'dollar-sign',
        ideas: [
          { title: 'Rentowność per projekt i per developer', desc: 'System łączy: godziny (z time trackingu), stawkę wewnętrzną developera, stawkę kliencką. Dashboard: ile zarabiamy na projekcie X? Który projekt jest pod wodą? Który developer jest najrentowniejszy? Dane do decyzji o cenach i alokacji.', impact: 'Pełna widoczność marży, koniec z "klient nie płaci wystarczająco"', icon: 'bar-chart', difficulty: 'medium' },
          { title: 'Auto-fakturowanie T&M i fixed price', desc: 'Time & Material: system zbiera godziny per developer per klient → generuje fakturę. Fixed price: fakturowanie per milestone z automapowaniem. Koniec miesiąca = faktury gotowe, nie "kto zbierze dane?"', impact: 'Faktura w dniu zamknięcia, zero opóźnień', icon: 'zap', difficulty: 'easy' },
          { title: 'Revenue recognition i prognoza', desc: 'Backlog kontraktowy (podpisane umowy) + pipeline (szanse sprzedażowe z wagą) + bench cost = prognoza przychodów i kosztów na 3-6 miesięcy. Board widzi realistyczny obraz finansowy.', impact: 'Planowanie finansowe oparte na danych, nie intuicji', icon: 'trending-up', difficulty: 'advanced' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     9. MEDYCYNA & ZDROWIE
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'healthcare',
    name: 'Medycyna & Zdrowie',
    subtitle: 'Kliniki, gabinety, optyki, weterynaria',
    icon: 'activity',
    color: '#ef4444',
    sections: [
      {
        name: 'Rejestracja i obsługa pacjenta', icon: 'clock',
        ideas: [
          { title: 'Online booking z multi-channel przypomnieniami', desc: 'Pacjent rezerwuje wizytę 24/7 przez stronę, Google lub telefon (bot głosowy). System wysyła: potwierdzenie natychmiast, przypomnienie SMS 24h przed, przypomnienie 2h przed. Opcja przełożenia jednym kliknięciem bez dzwonienia.', impact: '-60% no-show, +40% wizyt rezerwowanych online', icon: 'globe', difficulty: 'easy' },
          { title: 'Self check-in na tablecie w poczekalni', desc: 'Pacjent przychodzi → skanuje QR z SMS-a lub podaje PESEL → potwierdza dane → system informuje lekarza "pacjent jest". Rejestratorka nie musi obsługiwać każdego pacjenta osobiście — zajmuje się bardziej złożonymi sprawami.', impact: '-70% czasu rejestracji, zero kolejek do okienka', icon: 'monitor', difficulty: 'easy' },
          { title: 'Inteligentny system kolejkowy', desc: 'Algorytm optymalizuje harmonogram: wizyta kontrolna 15 min, konsultacja 30 min, zabieg 45 min. Uwzględnia historię opóźnień lekarzy i bufor na nagłe przypadki. Pacjent wie, o której realnie wejdzie — nie "pan doktor się spóźnia 40 minut".', impact: '-40% czasu oczekiwania w poczekalni', icon: 'clock', difficulty: 'medium' },
        ],
      },
      {
        name: 'Dokumentacja i procesy medyczne', icon: 'file-text',
        ideas: [
          { title: 'AI-asystent dokumentacji medycznej', desc: 'Lekarz prowadzi wizytę i mówi normalnie. AI transkrybuje rozmowę, wyciąga kluczowe informacje (objawy, diagnoza, zalecenia), strukturyzuje i wstawia do EDM. Zamiast 15 min pisania po wizycie — 2 minuty korekty.', impact: '+40% czasu na pacjenta, -80% pisania', icon: 'cpu', difficulty: 'advanced' },
          { title: 'E-recepty i e-skierowania z auto-kodowaniem', desc: 'Lekarz wybiera lek/procedurę → system automatycznie dobiera kod ICD-10, generuje e-receptę/e-skierowanie i wysyła do P1. Pacjent dostaje SMS z kodem. Zero ręcznego kodowania, zero błędów.', impact: 'E-recepta w 15 sekund zamiast 3 minut', icon: 'zap', difficulty: 'medium' },
          { title: 'Automatyczny odbiór wyników badań', desc: 'Laboratorium kończy badanie → wynik automatycznie trafia do profilu pacjenta w HIS → pacjent dostaje SMS "Twoje wyniki są gotowe" z linkiem do pobrania. Lekarz widzi wyniki przed następną wizytą.', impact: 'Zero telefonów o wyniki, lekarz ma dane przy ręce', icon: 'bell', difficulty: 'medium' },
        ],
      },
      {
        name: 'Rozliczenia i administracja', icon: 'dollar-sign',
        ideas: [
          { title: 'Auto-kodowanie procedur dla NFZ', desc: 'System rozpoznaje wykonane procedury (z dokumentacji wizyty) i automatycznie przypisuje kody JGP / produkty rozliczeniowe NFZ. Lekarz zatwierdza jednym kliknięciem. Sprawozdanie do NFZ generuje się samo.', impact: '-80% pracy sprawozdawczej, mniej odrzuceń', icon: 'check-circle', difficulty: 'medium' },
          { title: 'Dashboard realizacji kontraktu NFZ', desc: 'Ile z limitu wykorzystane, ile zostało, które poradnie "nie dowożą", jaki trend — live monitoring. Alert: "poradnia X wykorzystała 95% limitu i mamy jeszcze 2 miesiące". Optymalne wykorzystanie kontraktu.', impact: 'Maksymalizacja przychodu z kontraktu', icon: 'bar-chart', difficulty: 'easy' },
          { title: 'Zarządzanie harmonogramem lekarzy i gabinetów', desc: 'System planuje: który lekarz w którym gabinecie, ile slotów na wizyty prywatne vs. NFZ, blokady na urlopy i szkolenia. Gdy lekarz jest chory — system proponuje przesunięcie pacjentów do innego specjalisty.', impact: 'Optymalne wykorzystanie gabinetów, mniej "dziur" w grafiku', icon: 'clock', difficulty: 'medium' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     10. HR & REKRUTACJA
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'hr',
    name: 'HR & Rekrutacja',
    subtitle: 'Agencje pracy, rekrutacja, benefity, kadry',
    icon: 'users',
    color: '#14b8a6',
    sections: [
      {
        name: 'Rekrutacja i sourcing', icon: 'search',
        ideas: [
          { title: 'ATS z AI-screeningiem CV', desc: 'CV wpada na maila lub przez formularz → AI wyciąga kluczowe informacje (doświadczenie, skills, lokalizacja, oczekiwania). System scoruje dopasowanie do stanowiska i prezentuje ranking kandydatów. Rekruter przegląda top 10 zamiast 200 CV.', impact: '-70% czasu screeningu, obiektywny ranking', icon: 'cpu', difficulty: 'medium' },
          { title: 'Automatyczne sekwencje sourcingowe', desc: 'Znalazłeś kandydata na LinkedIn? System wysyła: wiadomość powitalną → po 3 dniach follow-up → po 7 dniach inny kąt. Personalizowane treści na podstawie profilu. Rekruter konfiguruje raz, system pracuje 24/7.', impact: '+40% response rate, 5× więcej kandydatów w pipeline', icon: 'mail', difficulty: 'easy' },
          { title: 'Portal kariery z auto-odpowiedziami', desc: 'Kandydat aplikuje → natychmiast potwierdzenie → status widoczny w portalu → po każdym etapie automatyczna informacja (zaproszenie / odrzucenie z feedbackiem). Koniec z "cisza po wysłaniu CV" — Twoja marka pracodawcy rośnie.', impact: '+60% candidate experience, silniejszy employer brand', icon: 'globe', difficulty: 'easy' },
        ],
      },
      {
        name: 'Obsługa pracowników tymczasowych', icon: 'users',
        ideas: [
          { title: 'Automatyczna delegacja i dokumentacja', desc: 'Nowy pracownik tymczasowy → system generuje: umowę, skierowanie na badania, BHP, legitymację. Klient potwierdza przyjęcie. Pracownik dostaje dokumenty do podpisu elektronicznego. Cały proces z 3 dni do 3 godzin.', impact: '-80% czasu onboardingu pracownika tymczasowego', icon: 'file-text', difficulty: 'medium' },
          { title: 'Ewidencja czasu pracy z potwierdzeniem klienta', desc: 'Pracownik loguje godziny w apce → klient potwierdza (lub koryguje) → system nalicza wynagrodzenie i generuje fakturę dla klienta. Pełna transparentność, zero sporów, automatyczne rozliczenia.', impact: 'Eliminacja sporów o godziny, faktura w real-time', icon: 'clock', difficulty: 'medium' },
          { title: 'Dashboard obłożenia i dostępności', desc: 'Ile osób obecnie pracuje, ile dostępnych, ile na bench-u, ile potrzebnych w przyszłym tygodniu (z zapotrzebowań klientów). Manager widzi, czy musi rekrutować, czy ma nadmiar — w real-time.', impact: 'Optymalna alokacja ludzi, mniejszy bench', icon: 'bar-chart', difficulty: 'easy' },
        ],
      },
      {
        name: 'Kadry, płace i benefity', icon: 'dollar-sign',
        ideas: [
          { title: 'Self-service pracowniczy', desc: 'Pracownik sam w portalu/apce: składa wniosek urlopowy (manager zatwierdza jednym kliknięciem), pobiera PIT-11, zaświadczenie o zatrudnieniu, pasek wynagrodzenia. Bez angażowania HR w rutynowe zapytania.', impact: '-60% zapytań do HR, pracownik ma kontrolę', icon: 'smartphone', difficulty: 'easy' },
          { title: 'Automatyczne naliczanie wynagrodzeń', desc: 'System zbiera: dane z RCP, urlopy, zwolnienia, premie, potrącenia. Automatycznie nalicza wynagrodzenie, generuje listę płac, plik do banku i dokumenty ZUS. Kadrowa weryfikuje, nie liczy.', impact: '-90% czasu naliczania, zero błędów rachunkowych', icon: 'dollar-sign', difficulty: 'medium' },
          { title: 'Platforma benefitów z budżetem', desc: 'Każdy pracownik ma budżet benefitowy i sam wybiera: karta sportowa, ubezpieczenie, dofinansowanie posiłków, szkolenia. System rozlicza automatycznie, HR widzi statystyki popularności.', impact: 'Wyższa satysfakcja, mniej administracji', icon: 'heart', difficulty: 'medium' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     11. EDUKACJA & SZKOLENIA
     ═══════════════════════════════════════════════════════════ */
  {
    id: 'education',
    name: 'Edukacja & Szkolenia',
    subtitle: 'Szkoły, kursy, LMS, wydawnictwa, drony',
    icon: 'book-open',
    color: '#a855f7',
    sections: [
      {
        name: 'Platforma edukacyjna i sprzedaż kursów', icon: 'monitor',
        ideas: [
          { title: 'LMS z automatyczną ścieżką nauki', desc: 'Uczeń kupuje kurs → dostaje dostęp → system prowadzi go przez moduły w odpowiedniej kolejności. Quiz po każdym module — nie przejdziesz dalej bez zaliczenia. Po ukończeniu → automatyczny certyfikat PDF z imieniem i datą.', impact: 'Sprzedaż kursów 24/7, +45% completion rate', icon: 'award', difficulty: 'medium' },
          { title: 'Automatyczna sprzedaż kursów (e-commerce edukacyjny)', desc: 'Landing page kursu → płatność → natychmiastowy dostęp do platformy → sekwencja email z materiałami dodatkowymi. Upsell: "kurs zaawansowany za 30% taniej dla absolwentów podstawowego". Cały funnel automatyczny.', impact: 'Przychód pasywny z kursów, zero ręcznej obsługi', icon: 'shopping-cart', difficulty: 'easy' },
          { title: 'Auto-generowanie quizów i materiałów', desc: 'Wrzuć materiał szkoleniowy → AI generuje quiz z pytaniami na różnych poziomach trudności, fiszki do powtórki i podsumowanie kluczowych punktów. Trener oszczędza godziny na tworzeniu materiałów dydaktycznych.', impact: '-80% czasu tworzenia materiałów testowych', icon: 'cpu', difficulty: 'medium' },
        ],
      },
      {
        name: 'Zarządzanie uczniami i administracja', icon: 'users',
        ideas: [
          { title: 'Online zapisy z automatyczną dokumentacją', desc: 'Uczeń/kursant wypełnia formularz online → system weryfikuje dane → generuje umowę do podpisu elektronicznego → przypisuje do grupy → wysyła harmonogram i materiały. Bez papieru, bez wizyty w sekretariacie.', impact: '-60% pracy administracyjnej, zapisy 24/7', icon: 'globe', difficulty: 'easy' },
          { title: 'System powiadomień dla kursantów (i rodziców)', desc: 'Automatyczne powiadomienia: nowe oceny, zmiana harmonogramu, nadchodzące egzaminy, zaległe płatności. SMS lub email — konfigurowalny per grupa. Rodzice/kursanci wiedzą wszystko bez dzwonienia.', impact: 'Zero telefonów pytających, pełna transparentność', icon: 'bell', difficulty: 'easy' },
          { title: 'Dashboard frekwencji i postępów', desc: 'Nauczyciel/trener widzi: kto regularnie chodzi, kto odpada, kto ma problemy z materiałem. Alert: "uczeń X opuścił 3 zajęcia z rzędu" → interwencja zanim zrezygnuje. Raport per grupa, per kurs, per trener.', impact: '-30% rezygnacji z kursu, lepsza jakość nauczania', icon: 'bar-chart', difficulty: 'easy' },
        ],
      },
      {
        name: 'Certyfikacja i compliance', icon: 'shield',
        ideas: [
          { title: 'Automatyczny system egzaminacyjny', desc: 'Egzamin online z losowaniem pytań z puli, timerem, anti-cheat (blokada zakładek). Wynik natychmiast. Zdał? Certyfikat generowany automatycznie z unikalnym numerem weryfikowalnym online. Idealne dla szkoleń operatorów dronów, BHP, uprawnień.', impact: 'Skalowalne egzaminy, certyfikaty weryfikowalne online', icon: 'check-circle', difficulty: 'medium' },
          { title: 'Rejestr certyfikatów i uprawnień', desc: 'Centralny rejestr: kto zdał, kiedy, jaki certyfikat, kiedy wygasa. Automatyczne przypomnienia o odnowieniu uprawnień. Pracodawca lub regulator może zweryfikować ważność certyfikatu przez QR/link.', impact: 'Pełna audytowalność, zero przeterminowanych uprawnień', icon: 'shield', difficulty: 'easy' },
          { title: 'Raportowanie do instytucji (SIO, UDT, ULC)', desc: 'System zbiera dane o kursantach, egzaminach i certyfikatach i generuje raporty w formatach wymaganych przez regulatora. Jeden klik zamiast ręcznego wypełniania arkuszy.', impact: '-80% czasu na raportowanie regulacyjne', icon: 'file-text', difficulty: 'medium' },
        ],
      },
    ],
  },
];
