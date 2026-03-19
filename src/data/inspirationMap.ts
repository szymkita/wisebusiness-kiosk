export interface AutomationIdea {
  title: string;
  desc: string;
  outcome: string;
  icon: string;
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
        name: 'Od zamówienia do zlecenia produkcyjnego', icon: 'zap',
        ideas: [
          { title: 'Zamówienie klienta trafia prosto na produkcję', desc: 'Klient zamawia — mailem, przez platformę B2B, albo handlowiec wbija to do CRM. Niezależnie od kanału, system tworzy zlecenie produkcyjne z właściwą specyfikacją, BOM-em i terminem. Nikt nic nie przepisuje. Produkcja dostaje gotowe zlecenie z priorytetem i widzi je na swoim ekranie.', outcome: 'Jedno źródło prawdy — od zamówienia do gotowego produktu', icon: 'layers' },
          { title: 'Harmonogram, który się aktualizuje sam', desc: 'System wie, jakie zlecenia czekają, jakie maszyny są wolne, ile trwa przezbrojenie i kiedy dojedzie surowiec. Układa kolejność tak, żeby minimalizować przezbrojenia i dotrzymać terminów. Gdy coś się zmienia — zlecenie priorytetowe, awaria maszyny — przelicza harmonogram i informuje kogo trzeba.', outcome: 'Planista nie siedzi w Excelu do 22:00 przed każdą zmianą', icon: 'clock' },
          { title: 'Widok obciążenia zakładu na żywo', desc: 'Ekran w biurze produkcji: każde stanowisko, ile zleceń w kolejce, jaki procent zdolności zajęty, co jest opóźnione. Kierownik widzi wąskie gardła zanim się zrobią — i może przesunąć ludzi lub zmienić priorytety. Nie dowiaduje się o problemie dzień po fakcie.', outcome: 'Decyzje na danych, nie na "Jasiek mówił, że chyba nie wyrobią"', icon: 'monitor' },
        ],
      },
      {
        name: 'Jakość i śledzenie partii', icon: 'check-circle',
        ideas: [
          { title: 'Cyfrowa kontrola jakości zamiast papierowych kart', desc: 'Pracownik skanuje kod na partii, dostaje checklistę na tablecie: punkty kontrolne, pola na pomiary, miejsce na zdjęcie. Wypełnia — dane lecą do systemu. Kierownik jakości widzi wyniki na dashboardzie, a nie szuka papierów po szufladach. Przy audycie ISO wyciągasz historię jednym kliknięciem.', outcome: 'Pełna historia jakości per partia, gotowość na każdy audyt', icon: 'file-text' },
          { title: 'Blokada partii przy odchyleniu — automatyczna', desc: 'Gdy parametr wychodzi poza tolerancję, system od razu blokuje partię, informuje lidera zmiany i loguje zdarzenie. Nikt nie musi "zauważyć" ani "zgłosić". Wadliwy produkt nie jedzie do klienta po cichu.', outcome: 'Problem łapany w momencie powstania, nie przy reklamacji', icon: 'shield' },
          { title: 'Pełna genealogia produktu', desc: 'Od dostawcy surowca, przez każdy etap produkcji, po wysyłkę — wiesz dokładnie, z czego powstał każdy produkt i kto go dotykał. Klient pyta "skąd ta partia?" — odpowiedź masz natychmiast. Przy wycofaniu produktu wiesz, które partie są dotknięte.', outcome: 'Traceability end-to-end, wymagane przez coraz więcej klientów', icon: 'search' },
        ],
      },
      {
        name: 'Maszyny i utrzymanie ruchu', icon: 'settings',
        ideas: [
          { title: 'Książka serwisowa maszyn w jednym miejscu', desc: 'Każda maszyna ma swój profil: historia napraw, wymienione części, daty przeglądów, instrukcje, dokumentacja techniczna. Mechanik otwiera na tablecie i widzi, co było robione i co trzeba sprawdzić. Nowy mechanik nie musi pytać "a jak tu było ostatnio?".', outcome: 'Wiedza serwisowa zostaje w firmie, nie w głowie jednego człowieka', icon: 'monitor' },
          { title: 'Przeglądy, które się nie "zapominają"', desc: 'System liczy motogodziny albo czas od ostatniego przeglądu. Gdy próg jest przekroczony — sam tworzy zlecenie serwisowe, proponuje termin i sprawdza, czy potrzebne części są na stanie. Żaden przegląd nie umknie, bo "nikt nie pamiętał".', outcome: 'Serwis prewencyjny zamiast gaszenia pożarów po awarii', icon: 'bell' },
          { title: 'OEE na żywo — nie w raporcie sprzed tygodnia', desc: 'Dostępność, wydajność, jakość — mierzone w czasie rzeczywistym z sygnałów maszyn. Widać, która maszyna nie dowozi i dlaczego. Po zmianie, po dniu, po tygodniu. Dane, na których da się oprzeć realne decyzje o inwestycjach i reorganizacji.', outcome: 'Wiesz, gdzie tracisz — i możesz z tym coś zrobić', icon: 'bar-chart' },
        ],
      },
      {
        name: 'Magazyn i zakupy', icon: 'package',
        ideas: [
          { title: 'Zamówienia do dostawców generują się same', desc: 'System widzi stany surowców, wie ile zużywa się dziennie i jaki jest lead time dostawcy. Gdy zapas spada poniżej obliczonego progu — generuje zamówienie. Kupiec je weryfikuje i zatwierdza, ale nie musi pilnować 200 pozycji w głowie.', outcome: 'Nie stoisz przez brak folii, nie masz 6 miesięcy zapasu kartonu', icon: 'refresh-cw' },
          { title: 'Inwentaryzacja bez paraliżu zakładu', desc: 'Skanuj lokalizację, skanuj produkt, potwierdź ilość. System porównuje z ewidencją i od razu flaguje rozbieżności. Zamiast zamykać magazyn na 2 dni i sadzać 6 osób z kartkami — robisz to na bieżąco, rotacyjnie.', outcome: 'Inwentaryzacja jako normalny proces, nie "wydarzenie roku"', icon: 'search' },
          { title: 'Dostawca wie, kiedy ma przyjechać', desc: 'Portal dostawcy: widzi zamówienia, potwierdza terminy, awizuje dostawę i rezerwuje slot rozładunkowy. Magazyn wie, co i kiedy przyjedzie. Koniec z telefonami "będziemy jutro, ale nie wiemy o której" i kolejkami na rampie.', outcome: 'Magazyn planuje pracę, a nie reaguje na zaskoczenia', icon: 'globe' },
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
        name: 'Flota i trasy', icon: 'map-pin',
        ideas: [
          { title: 'Trasy planowane w sekundy, nie w godziny', desc: 'Dyspozytorowi wypada 30 zleceń na jutro. System bierze okna dostawcze, lokalizację aut, pojemność, czas pracy kierowców — i proponuje trasy. Dyspozytor poprawia to, co zna lepiej (ten klient zawsze prosi, żeby przyjść od tyłu), i zatwierdza. Godzina pracy zamiast trzech.', outcome: 'Dyspozytor zarządza wyjątkami, a nie planuje od zera', icon: 'cpu' },
          { title: 'Klient wie, gdzie jest jego przesyłka', desc: 'Kierowca rusza w trasę — klient automatycznie dostaje SMS z linkiem do śledzenia i szacowaną godziną dostawy. ETA aktualizuje się na bieżąco. Gdy jest opóźnienie, klient dowiaduje się pierwszy — nie musi dzwonić.', outcome: 'Telefony "gdzie jest moja paczka" praktycznie znikają', icon: 'globe' },
          { title: 'Historia serwisowa, nie "Marek pamięta"', desc: 'Każdy pojazd ma profil: przeglądy, wymiany, naprawy, ubezpieczenie, OC, przegląd techniczny. System przypomina o terminach i planuje serwis w okienkach, gdy auto nie jest potrzebne. Nie dowiadujesz się o przeterminowanym przeglądzie na kontroli ITD.', outcome: 'Flota zadbana systemowo, nie "na pamięć"', icon: 'settings' },
          { title: 'Czas pracy kierowców pod kontrolą', desc: 'Dane z tachografu zaciągają się do systemu. Widać, kto zbliża się do limitu, kto potrzebuje odpoczynku, kto może wziąć dodatkowe zlecenie. Raporty dla ITD generują się same. Nikt nie sprawdza tego ręcznie w papierowych wykresówkach.', outcome: 'Zgodność z przepisami bez dedykowanej osoby do pilnowania', icon: 'clock' },
        ],
      },
      {
        name: 'Dokumenty i rozliczenia', icon: 'file-text',
        ideas: [
          { title: 'CMR i listy przewozowe z danych zlecenia', desc: 'System zna nadawcę, odbiorcę, towar, wagę — bo to jest w zleceniu. Dokumenty transportowe generują się automatycznie. Kierowca dostaje je na tablecie albo drukuje w kabinie. Nikt nie wypełnia ręcznie tego samego, co już jest w systemie.', outcome: 'Dokumenty poprawne i gotowe zanim kierowca wyjedzie', icon: 'file-text' },
          { title: 'Potwierdzenie dostawy na tablecie — faktura tego samego dnia', desc: 'Odbiorca podpisuje na ekranie. POD trafia do systemu natychmiast — nie czekasz 2 tygodnie na papierowy CMR pocztą. Faktura może być wystawiona tego samego dnia. Przepływ gotówki przyspiesza, bo nie blokujesz fakturowania procedurą.', outcome: 'Faktura wystawiona w dniu dostawy, a nie "jak dokumenty dotrą"', icon: 'check-circle' },
          { title: 'Rozliczenie trasy wylicza się samo', desc: 'Kilometry z GPS, stawka z umowy, koszty paliwa, opłaty drogowe — system zestawia i kalkuluje koszt i marżę per zlecenie. Księgowość dostaje gotowe dane, nie "proszę policzyć ile nam wyszło na tej trasie do Poznania".', outcome: 'Wiesz, ile zarabiasz na każdym zleceniu — na bieżąco', icon: 'dollar-sign' },
          { title: 'Faktury od podwykonawców parują się z zleceniami', desc: 'Faktura wpada → system rozpoznaje podwykonawcę i numer zlecenia → paruje z kosztami trasy → sprawdza, czy kwota zgadza się ze stawką umowną. Rozbieżność? Flaguje. Zgodne? Do akceptacji. Nie szukasz ręcznie "do jakiego zlecenia ta faktura".', outcome: 'Kontrola kosztów podwykonawców bez ręcznego szukania', icon: 'eye' },
        ],
      },
      {
        name: 'Kierowcy i kadry', icon: 'users',
        ideas: [
          { title: 'Wynagrodzenia kierowców naliczone z danych', desc: 'Kilometry, godziny z tachografu, diety, noclegi, premie za terminowość — system zbiera wszystko z danych, które i tak istnieją. Nalicza wynagrodzenie wg umowy. Kierowca widzi rozliczenie w apce i wie, za co ile dostaje. Koniec z "nie zgadza mi się za ten tydzień".', outcome: 'Transparentne rozliczenia — mniej sporów, mniej pracy', icon: 'dollar-sign' },
          { title: 'Jedna apka zamiast 5 telefonów do biura', desc: 'Kierowca w apce widzi swoje zlecenia, nawigację, dokumenty do podpisu, rozliczenie, wniosek urlopowy. Nie musi dzwonić do biura z pytaniami. Biuro nie musi odbierać 50 telefonów dziennie z powtarzającymi się pytaniami.', outcome: 'Kierowca samoobsługowy — biuro pracuje nad biznesem', icon: 'smartphone' },
        ],
      },
      {
        name: 'Sprzedaż i obsługa klienta', icon: 'trending-up',
        ideas: [
          { title: 'Wycena w minuty, nie w godziny', desc: 'Klient pyta o cenę transportu. System bierze trasę, aktualną cenę paliwa, dostępność auta w regionie, stawki. Handlowiec dostaje sugerowaną cenę z marżą — dopasowuje do klienta i wysyła ofertę. Nie liczy ręcznie w kalkulatorze, nie czeka na info od dyspozytora.', outcome: 'Odpowiedź na zapytanie, zanim klient zadzwoni do konkurencji', icon: 'zap' },
          { title: 'Portal klienta — zlecenie, tracking, faktury', desc: 'Stały klient sam składa zlecenie przez portal, śledzi realizację, pobiera POD i fakturę. Nie musi dzwonić ani mailować. System potwierdza przyjęcie i przypisuje do dyspozytora. Klient ma poczucie kontroli, biuro ma spokój.', outcome: 'Obsługa stałych klientów praktycznie bez angażowania ludzi', icon: 'globe' },
          { title: 'Klient, który nie zamawia od miesiąca — system reaguje', desc: 'Stały klient nie złożył zlecenia od 30 dni? System sam wysyła grzecznego maila. Po dostawie — krótka ankieta satysfakcji. Niska ocena? Alert do opiekuna. Relacja z klientem budowana systematycznie, nie "jak ktoś akurat pamiętał".', outcome: 'Retencja klientów jako proces, nie przypadek', icon: 'mail' },
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
        name: 'Od zamówienia do paczki', icon: 'zap',
        ideas: [
          { title: 'Zamówienie przelicza się samo — od wpłaty do etykiety', desc: 'Zamówienie wpada z Allegro, Shopify, własnego sklepu albo maila od klienta B2B. System weryfikuje płatność, rezerwuje towar, dobiera najtańszego kuriera per paczka (na podstawie wagi, wymiarów, regionu) i generuje etykietę. Magazynier dostaje gotowy picking list. Ty włączasz się tylko gdy coś jest niestandardowe.', outcome: 'Jeden flow dla wszystkich kanałów — zero przepisywania między systemami', icon: 'zap' },
          { title: 'Stany zsynchronizowane wszędzie', desc: 'Sprzedałeś 1 sztukę na Allegro — stan spada na Shopify, w hurtowni i w magazynie. Natychmiast. Nie ręcznie, nie "wieczorem zaktualizuję". Jedno źródło prawdy o stanach, cenach i opisach produktów. Zmiana ceny w jednym miejscu — aktualizuje wszędzie.', outcome: 'Koniec z oversellowaniem i "jest w systemie, ale nie ma na półce"', icon: 'globe' },
          { title: 'Bestseller się kończy — zamówienie do dostawcy leci automatycznie', desc: 'System widzi, że top produkt ma zapas na 4 dni (bo zna tempo sprzedaży i lead time dostawcy). Generuje zamówienie z optymalną ilością i wysyła do dostawcy. Kupiec zatwierdza — ale nie musi sam pilnować 500 SKU w głowie.', outcome: 'Bestsellerzy zawsze na stanie, slow movery nie zalegają', icon: 'bell' },
          { title: 'Zwroty obsługiwane sprawnie, nie chaotycznie', desc: 'Klient zgłasza zwrot → system generuje etykietę, śledzi paczkę, po przyjęciu na magazyn weryfikuje stan produktu. Jeśli OK — automatyczny refund. Jeśli uszkodzony — zdjęcia, dokumentacja, decyzja operatora. Klient widzi status na bieżąco i nie musi dopytywać.', outcome: 'Zwroty jako uporządkowany proces, nie czarna dziura', icon: 'refresh-cw' },
        ],
      },
      {
        name: 'Marketing i retencja', icon: 'heart',
        ideas: [
          { title: 'Porzucony koszyk — sekwencja, która działa', desc: 'Klient dodał do koszyka i nie kupił. Po godzinie — mail z przypomnieniem (wiemy, co było w koszyku). Po dobie — może z małym rabatem. Po 3 dniach — SMS. Wiesz, ilu klientów każdego dnia zostawia pełne koszyki — teraz część z nich wraca. Sekwencję ustawiasz raz i działa.', outcome: 'Odzyskiwanie porzuconych koszyków bez ręcznej pracy', icon: 'mail' },
          { title: 'Klienci podzieleni na grupy — komunikacja dopasowana', desc: 'Nie każdy klient jest taki sam. System rozróżnia: nowy, powracający, VIP, zagrożony odejściem, okazyjny. Każda grupa dostaje inną komunikację — VIP wie o nowościach pierwszy, zagrożony dostaje ofertę win-back. To nie jest "newsletter do wszystkich" — to celowana komunikacja.', outcome: 'Klient dostaje to, co dla niego istotne — nie spam', icon: 'users' },
          { title: 'Promocje oparte na danych, nie na przeczuciu', desc: 'Co nie sprzedaje się dobrze i ma za dużo zapasu? Co ma spadającą marżę? System analizuje i proponuje — ten produkt warto przecenić, ten warto podbić w reklamie. Albo odwrotnie: bestseller z niskim stanem — nie promuj go, i tak się sprzeda.', outcome: 'Promocje, które mają sens biznesowy — nie "dajmy -20% na wszystko"', icon: 'trending-up' },
          { title: 'Program lojalnościowy, który działa sam', desc: 'Klient kupuje → zbiera punkty → automatycznie dostaje kupon na urodziny, nagrodę po 5. zakupie, darmową dostawę po przekroczeniu progu. Komunikacja SMS/email leci sama. Ty ustawiasz reguły raz — system buduje lojalność codziennie.', outcome: 'Powracający klienci bez ręcznego zarządzania programem', icon: 'award' },
        ],
      },
      {
        name: 'Obsługa klienta', icon: 'message-circle',
        ideas: [
          { title: 'Bot odpowiada na to, co da się odpowiedzieć automatycznie', desc: '"Gdzie moja paczka?" — bot pobiera tracking i podaje status. "Jaki rozmiar wybrać?" — tabela rozmiarów. "Czy mogę zwrócić?" — procedura. Bot obsługuje powtarzalne pytania. Gdy nie wie — przekierowuje do człowieka, ale z pełnym kontekstem: co to za klient, co kupił, o co pytał.', outcome: 'Ludziom zostają trudne sprawy — proste obsługują się same', icon: 'cpu' },
          { title: 'Zgłoszenia, które trafiają do właściwej osoby od razu', desc: 'System rozpoznaje typ zgłoszenia: reklamacja → do działu reklamacji z historią zamówienia. Pytanie o produkt → do konsultanta z kartą produktową. Problem z dostawą → do logistyki z numerem przesyłki. Każdy dostaje to, co powinien — z kontekstem, nie z "proszę opisać problem od początku".', outcome: 'Szybsze rozwiązania, bo właściwa osoba ma właściwe dane', icon: 'settings' },
          { title: 'Opinie zarządzane systemowo', desc: 'Po każdym zamówieniu klient dostaje prośbę o ocenę. Pozytywna? Przekierowanie na Google/Allegro. Negatywna? Alert do managera z kontekstem, żeby mógł zareagować zanim opinia stanie się publiczna. Nie ignorujesz opinii i nie odpowiadasz na nie "jak jest czas".', outcome: 'Reputacja budowana aktywnie, problemy łapane wcześnie', icon: 'heart' },
        ],
      },
      {
        name: 'Analityka', icon: 'bar-chart',
        ideas: [
          { title: 'Jeden dashboard zamiast logowania do 6 narzędzi', desc: 'Konwersja, średnia wartość koszyka, koszt pozyskania klienta, marża per SKU, ROAS z kampanii — wszystko w jednym widoku, zaciągane z różnych źródeł. Porównanie z poprzednim tygodniem, trendy, alerty. Nie musisz logować się do Google Analytics, Allegro Ads, systemu magazynowego i CRM osobno.', outcome: 'Pełen obraz biznesu w jednym miejscu — decyzje zamiast szukania danych', icon: 'monitor' },
          { title: 'Raport tygodniowy generuje się sam', desc: 'Co poniedziałek rano w skrzynce: co się sprzedawało, co nie, jaka marża, top produkty, anomalie. Nikt tego nie pisze ręcznie — system kompiluje dane i generuje czytelne podsumowanie. Wiesz, jak idzie biznes, zanim włączysz komputer.', outcome: 'Regularne podsumowanie bez czyjejkolwiek pracy', icon: 'mail' },
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
    subtitle: 'Marketing, consulting, prawo, software house',
    icon: 'briefcase',
    color: '#8b5cf6',
    sections: [
      {
        name: 'Sprzedaż i pipeline', icon: 'trending-up',
        ideas: [
          { title: 'Leady kwalifikowane zanim handlowiec je zobaczy', desc: 'Lead trafia z formularza, LinkedIn czy webinaru. System zbiera dane (branża, wielkość firmy, jakie strony przeglądał, co pobrał) i ocenia, na ile gorący jest ten kontakt. Gorący idzie od razu do handlowca. Ciepły — do nurturingu. Zimny — do sekwencji edukacyjnej. Handlowiec nie traci czasu na leady, z których nic nie będzie.', outcome: 'Handlowiec pracuje z tymi, którzy chcą kupić', icon: 'users' },
          { title: 'Oferta gotowa w minuty, nie w godziny', desc: 'Wybierasz klienta, usługi, zakres, stawkę — system generuje spersonalizowany dokument z case studies z tej branży i warunkami. Nie zaczynasz od pustego Google Docs za każdym razem. Szablon + dane z CRM = gotowa oferta do review.', outcome: 'Szybka odpowiedź na zapytanie, profesjonalny dokument', icon: 'file-text' },
          { title: 'Follow-up, który się nie gubi', desc: 'Wysłałeś ofertę — i cisza? System wie. Po 3 dniach wysyła grzeczne przypomnienie. Po 7 — inne podejście. Po 14 — alert do managera, że deal stygnie. Nikt nie wpada w czarną dziurę pipeline, bo "zapomniałem odezwać się do tego klienta z Katowic".', outcome: 'Systematyczny follow-up bez osobistego pilnowania każdego dealu', icon: 'mail' },
          { title: 'CRM, który się sam wypełnia', desc: 'Każdy mail, spotkanie z kalendarza, notatka ze Slacka — loguje się w CRM automatycznie. Handlowiec nie "uzupełnia CRM" po godzinach. Manager widzi pełną historię kontaktu z klientem bez pytania "co tam u nich?".', outcome: 'Handlowcy sprzedają, a nie wypełniają formularze', icon: 'monitor' },
        ],
      },
      {
        name: 'Projekty i rentowność', icon: 'target',
        ideas: [
          { title: 'Czas pracy zbierany z narzędzi, nie z głowy', desc: 'Zespół i tak pracuje w Jira, Linear, kalendarzu, Gicie. System zbiera dane o czasie z tych narzędzi — kto ile pracował nad jakim klientem. Raport generuje się sam. Nikt nie wypełnia timesheetów "z pamięci o 17:55 w piątek".', outcome: 'Dokładne dane o czasie bez ręcznego logowania', icon: 'clock' },
          { title: 'Wiesz, czy projekt zarabia — w trakcie, nie po fakcie', desc: 'Dashboard: ile godzin spalono vs. budżet, jaka jest marża teraz, ile zostało. Widzisz to na bieżąco — nie dowiadujesz się po rozliczeniu, że "straciliśmy na tym projekcie 20 tysięcy". Alarm leci, gdy projekt zbliża się do progu budżetowego.', outcome: 'Reakcja na problemy z rentownością, zanim jest za późno', icon: 'bar-chart' },
          { title: 'Klient dostaje status bez pytania', desc: 'Co tydzień klient dostaje raport: co zrobiliśmy, co przed nami, czy jesteśmy na czas. Generowany automatycznie z danych z narzędzi projektowych. PM robi szybki review — wysyła. Klient czuje się zaopiekowany, PM nie spędza godziny na pisaniu update.', outcome: 'Proaktywna komunikacja zamiast "klient się pyta, co u nas"', icon: 'mail' },
        ],
      },
      {
        name: 'Finanse', icon: 'dollar-sign',
        ideas: [
          { title: 'Faktura z danych, które już istnieją', desc: 'Koniec miesiąca → system zbiera godziny per klient, per stawka → generuje fakturę → wysyła do akceptacji → po zatwierdzeniu — do klienta i księgowości. Nie szukasz danych po arkuszach, nie pytasz PM-a "ile godzin wyszło na tego klienta".', outcome: 'Fakturowanie w dniu zamknięcia miesiąca, nie po tygodniu', icon: 'zap' },
          { title: 'Przypomnienia o płatnościach — grzeczne, ale konsekwentne', desc: 'Termin płatności mija — grzeczny mail. Tydzień później — stanowczy. Dwa tygodnie — telefon od opiekuna. Miesiąc — wstrzymanie nowych zleceń. Sekwencja z ludzkimi, personalizowanymi wiadomościami — ale automatyczna. Nie musisz pamiętać, kto ile zalega.', outcome: 'Należności ściągane systematycznie, nie "jak ktoś się zorientuje"', icon: 'bell' },
          { title: 'Prognoza: co na koncie za 2 miesiące', desc: 'System zbiera: zaplanowane faktury z bieżących projektów i pipeline, oczekiwane wpływy, koszty stałe (biuro, ludzie, narzędzia). Pokazuje, kiedy na koncie będzie ciasno — z wyprzedzeniem, nie w momencie, gdy brakuje na pensje.', outcome: 'Finansowe planowanie zamiast "zobaczymy, co wpłynie"', icon: 'trending-up' },
        ],
      },
      {
        name: 'Zespół i wiedza', icon: 'users',
        ideas: [
          { title: 'Onboarding nowej osoby — z checklistą, nie z chaosu', desc: 'Nowa osoba → system generuje zadania: IT daje dostępy, HR wysyła dokumenty, buddy planuje spotkania, manager przygotowuje kontekst projektowy. Każdy wie, co ma zrobić i kiedy. Nowy człowiek nie siedzi 3 dni czekając, aż ktoś "się nim zajmie".', outcome: 'Nowa osoba produktywna szybko, bo proces jest poukładany', icon: 'check-circle' },
          { title: 'Wiedza firmowa w jednym miejscu, przeszukiwalna', desc: 'Procedury, szablony, case studies, know-how — nie w głowach ludzi, ale w bazie z wyszukiwarką. "Jak robimy audyt SEO?" — jest procedura i checklist. "Jak rozliczamy T&M?" — jest wzór. Odejście kluczowej osoby nie kasuje wiedzy firmy.', outcome: 'Wiedza organizacyjna niezależna od rotacji ludzi', icon: 'search' },
          { title: 'Puls zespołu — wczesne wykrywanie problemów', desc: 'Co 2 tygodnie krótka ankieta: jak oceniasz obciążenie? Masz blokery? Jak się czujesz w projekcie? 3 pytania, 30 sekund. Wyniki trafiają do dashboardu — manager widzi trendy. Problemy łapane wcześnie, nie na exit interview.', outcome: 'Sygnały ostrzegawcze zanim ktoś złoży wypowiedzenie', icon: 'heart' },
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
        name: 'Obieg dokumentów', icon: 'file-text',
        ideas: [
          { title: 'Faktura z maila trafia do systemu bez przepisywania', desc: 'Faktura wpada na maila lub jako skan. System wyciąga dane: kontrahent, kwota, VAT, numer, data. Proponuje dekretację na podstawie historii — "ten dostawca zawsze idzie na 401-02". Księgowa weryfikuje i zatwierdza, zamiast ręcznie przepisywać 150 pozycji dziennie.', outcome: 'Przepisywanie zamienione na weryfikację — szybciej i pewniej', icon: 'eye' },
          { title: 'Faktura, zamówienie i dostawa — parowane automatycznie', desc: 'System zestawia trzy dokumenty: fakturę, zamówienie i WZ. Jeśli się zgadzają — lecą do akceptacji. Jeśli nie (inna cena, inna ilość, brak WZ) — flaguje i wskazuje rozbieżność. Nie przechodzi nic "po cichu". Audytor dostaje czystą historię.', outcome: 'Kontrola bez ręcznego sprawdzania każdego dokumentu', icon: 'check-circle' },
          { title: 'Akceptacja kosztów — cyfrowa, z historią', desc: 'Faktura kosztowa trafia automatycznie do managera odpowiedniego działu. Akceptuje jednym kliknięciem w apce — albo odrzuca z komentarzem. Pełna ścieżka audytowa: kto zatwierdził, kiedy, z jakim komentarzem. Faktura nie "leży na czyimś biurku od 2 tygodni".', outcome: 'Szybka akceptacja, pełna transparentność, brak zagubionych dokumentów', icon: 'zap' },
          { title: 'Płatności pilnowane automatycznie', desc: 'Przed terminem — grzeczne przypomnienie do kontrahenta. W dniu terminu — potwierdzenie. Po terminie — eskalacja z rosnącą stanowczością. System pilnuje za księgową, która ma 200 klientów i nie jest w stanie pamiętać o każdej fakturze.', outcome: 'Mniej przeterminowanych należności bez ręcznego śledzenia', icon: 'bell' },
        ],
      },
      {
        name: 'Raportowanie i widoczność', icon: 'bar-chart',
        ideas: [
          { title: 'P&L w czasie rzeczywistym, nie po zamknięciu miesiąca', desc: 'Przychody, koszty, marża, EBITDA — dashboard aktualizowany na bieżąco z danych z systemu księgowego, banku i CRM. Zarząd nie czeka na "zamknięcie miesiąca" — widzi, jak idzie teraz. Alert, gdy coś odbiega od planu.', outcome: 'Obraz finansowy firmy dostępny zawsze, nie raz w miesiącu', icon: 'monitor' },
          { title: 'Cash flow na 2-3 miesiące do przodu', desc: 'System zestawia: zaplanowane wpływy (z wystawionych faktur, kontraktów), zobowiązania (pensje, ZUS, faktury kosztowe). Rysuje prognozę — i pokazuje, kiedy na koncie może być ciasno. Nie chodzi o przewidywanie przyszłości co do złotówki — chodzi o to, żeby nie być zaskoczonym.', outcome: 'Widoczność finansowa zamiast gaszenia pożarów', icon: 'trending-up' },
          { title: 'Poranny digest dla zarządu', desc: 'Codziennie rano krótki mail: wczorajszy przychód, saldo konta, narastająco MTD, top wydatki, ważne terminy. Zarząd wie, co się dzieje, zanim otworzy laptop. Cotygodniowy digest z trendami i sygnałami ostrzegawczymi.', outcome: 'Zarząd na bieżąco bez logowania się do czegokolwiek', icon: 'mail' },
        ],
      },
      {
        name: 'Obsługa klientów biura rachunkowego', icon: 'users',
        ideas: [
          { title: 'Portal klienta — dokumenty w jednym miejscu', desc: 'Klient loguje się do portalu, wrzuca faktury (skan, zdjęcie z telefonu), widzi status: zaksięgowane, do wyjaśnienia, brak dokumentu. Nie musi dzwonić, wozić papierów, mailować z tematem "w załączniku faktura". Biuro ma wszystko w jednym miejscu, posortowane per klient.', outcome: 'Koniec z "klient nie dosłał" i gonitwą pod koniec miesiąca', icon: 'globe' },
          { title: 'System sam pilnuje brakujących dokumentów', desc: 'Do 10. dnia miesiąca brakuje 3 faktur od klienta X? System wysyła mu grzeczne przypomnienie z dokładną listą. Eskalacja co kilka dni. Księgowa nie musi ręcznie sprawdzać, czego brakuje od każdego z 50 klientów — system robi to za nią.', outcome: 'Komplet dokumentów na czas bez ganiania klientów', icon: 'bell' },
          { title: 'JPK i deklaracje z zatwierdzonych danych', desc: 'Dane zaksięgowane → system generuje JPK_V7, deklaracje VAT, PIT-y roczne. Księgowa weryfikuje, a nie ręcznie wypełnia formularz na 100 pozycji. Mniej okazji do pomyłki, mniej monotonnej pracy.', outcome: 'Sprawozdawczość jako weryfikacja, nie ręczne wypełnianie', icon: 'file-text' },
        ],
      },
      {
        name: 'Procesy brokerskie i ubezpieczeniowe', icon: 'shield',
        ideas: [
          { title: 'Polisy i terminy pod kontrolą — w jednym systemie', desc: 'Każdy klient ma profil z pełną historią: polisy, daty wygasania, preferencje, roszczenia. Dwa miesiące przed końcem polisy — system uruchamia proces odnowienia: alert do brokera, mail do klienta, przygotowanie ofert. Żadna polisa nie "wygasa po cichu".', outcome: 'Odnowienia obsługiwane proaktywnie, nie reaktywnie', icon: 'clock' },
          { title: 'Porównanie ofert TU — szybko i czytelnie', desc: 'Broker wprowadza parametry klienta → system zestawia oferty z towarzystw w czytelnym porównaniu. Klient widzi opcje obok siebie: zakres, cena, wyłączenia. Rzetelna rekomendacja oparta na danych, nie na tym, kto ma najwyższą prowizję.', outcome: 'Profesjonalna prezentacja ofert, szybsza decyzja klienta', icon: 'search' },
          { title: 'Obsługa szkód — klient widzi, co się dzieje', desc: 'Klient zgłasza szkodę → system zbiera dokumentację (formularz, zdjęcia), kompletuje wniosek, wysyła do TU. Klient widzi status na portalu. Broker interweniuje, gdy TU odrzuca roszczenie albo przeciąga sprawę — nie przy każdym rutynowym zgłoszeniu.', outcome: 'Obsługa szkód jako proces, nie jako seria telefonów', icon: 'shield' },
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
        name: 'Zarządzanie budową', icon: 'target',
        ideas: [
          { title: 'Dziennik budowy w telefonie — nie w zeszycie', desc: 'Kierownik budowy loguje postępy z telefonu: zdjęcia, notatki, warunki pogodowe, obecność ekip. Inwestor i biuro widzą status online — nie muszą dzwonić ani jeździć na plac. Pełna historia budowy, przeszukiwalna, z datami i zdjęciami.', outcome: 'Transparentna budowa — wszyscy wiedzą, co się dzieje', icon: 'smartphone' },
          { title: 'Harmonogram, który żyje', desc: 'System śledzi postęp prac. Gdy tynki się opóźniają o 3 dni — automatycznie przesuwa malowanie i pokazuje wpływ na termin końcowy. PM widzi konsekwencje opóźnienia natychmiast, a nie po tygodniu ręcznego aktualizowania MS Project.', outcome: 'Realistyczny harmonogram zamiast dokumentu fikcji', icon: 'clock' },
          { title: 'Budżet budowy z kontrolą per pozycja', desc: 'Budżet rozbity na pozycje kosztorysowe. Każda faktura parkuje na właściwej pozycji. Dashboard: ile wydaliśmy vs. ile planowaliśmy per etap. Gdy pozycja zbliża się do limitu — alert. Nie dowiadujesz się o przekroczeniu po fakcie.', outcome: 'Kontrola kosztów na bieżąco, nie przy rozliczeniu końcowym', icon: 'dollar-sign' },
          { title: 'Podwykonawcy — dokumenty i rozliczenia w jednym miejscu', desc: 'Portal dla podwykonawcy: harmonogram jego prac, umowa, ubezpieczenie, protokoły, rozliczenia. Podwykonawca zgłasza gotowość do odbioru → system tworzy zadanie dla inspektora. Nie szukasz "czy ELBUDEX miał ważne ubezpieczenie?" po szufladach.', outcome: 'Pełna dokumentacja podwykonawców bez chaosu papierowego', icon: 'users' },
        ],
      },
      {
        name: 'Sprzedaż nieruchomości', icon: 'trending-up',
        ideas: [
          { title: 'Jedno kliknięcie — oferta na 10 portalach', desc: 'Otodom, OLX, Gratka, Morizon — i kolejne. Tworzysz ofertę raz, publikujesz wszędzie. Zmiana ceny? Aktualizuje wszędzie. Nowe zdjęcia? Synchronizuje. Sprzedane? Zdejmuje automatycznie. Nie spędzasz 2 godzin na ręcznym wrzucaniu tej samej oferty.', outcome: 'Oferta widoczna wszędzie bez powielania pracy', icon: 'globe' },
          { title: 'Nowa oferta → system szuka pasujących klientów', desc: 'Masz bazę klientów z ich preferencjami (metraż, lokalizacja, budżet). Nowa oferta w portfolio → system automatycznie dopasowuje i wysyła spersonalizowany mail do tych, którym może pasować. Nie przegląda tych preferencji ręcznie — po prostu łączy dane.', outcome: 'Szybsze kojarzenie kupujących z ofertami', icon: 'users' },
          { title: 'CRM z historią, nie z pamięcią agenta', desc: 'Każda interakcja z klientem zalogowana: telefony, maile, prezentacje, oferty, uwagi. Agent widzi pełny kontekst zanim podniesie słuchawkę. Gdy agent odchodzi z firmy — wiedza o kliencie zostaje. Nie ginie z nim.', outcome: 'Relacja z klientem jest własnością firmy, nie agenta', icon: 'monitor' },
        ],
      },
      {
        name: 'Zarządzanie nieruchomościami i najemcami', icon: 'home',
        ideas: [
          { title: 'Najemca sam zgłasza, sam sprawdza status', desc: 'Portal najemcy: zgłoszenie usterki z opisem i zdjęciem, wgląd w faktury, pobieranie dokumentów, komunikacja z administracją. Nie musi dzwonić, mailować, przychodzić do biura. Zgłoszenie trafia do systemu i jest śledzone jak przesyłka — najemca widzi, na jakim jest etapie.', outcome: 'Obsługa najemców uporządkowana, nie chaotyczna', icon: 'globe' },
          { title: 'Rozliczenia mediów — z odczytu do rachunku bez Excela', desc: 'Odczyty z liczników trafiają do systemu (ręcznie lub z inteligentnych liczników). System liczy zużycie per lokal, generuje rachunek, wysyła do najemcy, przypomina przed terminem płatności. Proces, który zajmował kilka dni pracy — zamknięty w jedno kliknięcie.', outcome: 'Rozliczenia mediów jako automatyczny proces, nie projekt', icon: 'dollar-sign' },
          { title: 'Usterka → właściwy technik → najemca widzi status', desc: 'Najemca zgłasza usterkę → system rozpoznaje typ (hydraulika, elektryka, ogólne) → przypisuje do technika z odpowiednimi kompetencjami → technik dostaje zadanie → najemca widzi status. Nie trzeba ręcznie przydzielać, nie trzeba dzwonić z pytaniem "kiedy ktoś przyjdzie".', outcome: 'Każde zgłoszenie obsłużone, żadne nie ginie', icon: 'settings' },
          { title: 'Umowa wygasa? System wie wcześniej niż Ty', desc: 'Umowa najmu kończy się za 3 miesiące — system informuje zarządcę i proponuje działania: renegocjacja, nowa oferta, przygotowanie lokalu. Nie odkrywasz pustostanu, gdy najemca już się wyprowadził. Proaktywne zarządzanie zamiast reagowania.', outcome: 'Terminarz umów pilnowany systemowo, nie "z głowy"', icon: 'clock' },
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
    subtitle: 'Restauracje, piekarnie, cukiernie, catering',
    icon: 'coffee',
    color: '#f97316',
    sections: [
      {
        name: 'Produkcja i receptury', icon: 'layers',
        ideas: [
          { title: 'Receptura = kalkulacja kosztów — zawsze aktualna', desc: 'Każda receptura w systemie: składniki, gramatura, aktualny koszt per porcja. Dostawca podniósł cenę mąki? Food cost przelicza się automatycznie. Widzisz, które dania zarabiają, a które ledwo wychodzą na zero. Bez ręcznego przeliczania w Excelu po każdej zmianie cennika.', outcome: 'Decyzje cenowe oparte na danych, nie na przeczuciu', icon: 'dollar-sign' },
          { title: 'Plan produkcji na jutro — z danych, nie z głowy', desc: 'System analizuje, co sprzedawało się w ten dzień tygodnia, jakie są zamówienia B2B i jaki mamy sezon. Proponuje ilości do wyprodukowania. Cukiernik czy piekarz weryfikuje i dostosowuje — ale startuje z rozsądnej propozycji, nie od zera.', outcome: 'Mniej wyrzucania na koniec dnia, mniej braków na półce', icon: 'clock' },
          { title: 'Etykiety zgodne z przepisami — z receptury', desc: 'Etykieta z datą produkcji, terminem ważności, składnikami i alergenami generuje się z receptury. Zmiana składnika? Etykieta aktualizuje się automatycznie. Zgodność z HACCP i Sanepidem bez ręcznego pilnowania każdej zmiany.', outcome: 'Etykietowanie poprawne zawsze, nie "jak ktoś pamiętał o zmianie"', icon: 'check-circle' },
        ],
      },
      {
        name: 'Zamówienia i magazyn', icon: 'package',
        ideas: [
          { title: 'Lista zakupów z planu produkcji — nie z głowy', desc: 'Plan produkcji na jutro jest gotowy. System przelicza potrzebne surowce z receptur, odejmuje to co jest na stanie, i generuje listę zakupową. Możesz ją wysłać do dostawcy jednym kliknięciem. Zamawiasz dokładnie tyle, ile potrzeba — nie "na oko".', outcome: 'Zakupy dopasowane do produkcji, nie do intuicji', icon: 'zap' },
          { title: 'Daty ważności pod kontrolą', desc: 'Każdy produkt w systemie z datą ważności. Zbliża się termin? Alert — "użyj w daniu dnia" albo "przeceń". Przeterminowane? System blokuje i dokumentuje utylizację. Dashboard mówi, ile wyrzucamy miesięcznie i dlaczego — żebyś mógł z tym coś zrobić.', outcome: 'FIFO pilnowane systemowo, marnowanie widoczne i mierzalne', icon: 'clock' },
          { title: 'Przyjęcie dostawy z weryfikacją i temperaturą', desc: 'Dostawca przyjeżdża → pracownik skanuje WZ, sprawdza ilości na tablecie, zapisuje temperaturę (dla produktów chłodzonych). System porównuje z zamówieniem i flaguje rozbieżności. Pełna dokumentacja na wypadek kontroli.', outcome: 'Każda dostawa udokumentowana — HACCP bez dodatkowej pracy', icon: 'check-circle' },
        ],
      },
      {
        name: 'Obsługa gości i sprzedaż', icon: 'heart',
        ideas: [
          { title: 'Rezerwacje online — 24/7, bez telefonu', desc: 'Widget na stronie, wpis w Google, post na social media — gość rezerwuje kiedy chce. Automatyczne potwierdzenie SMS, przypomnienie 2h przed. Gość nie przychodzi? Auto-anulacja po 15 minutach, stolik wraca do puli. Kelner widzi notki do rezerwacji ("urodziny, tort o 20:00").', outcome: 'Rezerwacje zarządzane systemowo, personel skupiony na gościach', icon: 'globe' },
          { title: 'Zamówienia B2B i catering przez portal', desc: 'Klienci biznesowi (biura, eventy, hurtowi) składają zamówienia przez dedykowany panel z ich cenami kontraktowymi. System zbiera zamówienia i dodaje do planu produkcji. Nie ma mailowania, pytania o ceny, ręcznego wbijania — klient zamawia, produkcja wie.', outcome: 'Obsługa klientów B2B bez angażowania działu sprzedaży', icon: 'monitor' },
          { title: 'Opinie zbierane i zarządzane — nie ignorowane', desc: 'Po wizycie gość dostaje SMS z jednym pytaniem. Dał 4-5 gwiazdek? Prośba o recenzję Google. Dał 1-3? Alert do managera + przeprosiny + voucher. System buduje rating i pokazuje trendy — widzisz, czy jest lepiej czy gorzej niż miesiąc temu.', outcome: 'Reputacja zarządzana aktywnie, nie losowo', icon: 'heart' },
          { title: 'Lojalność budowana automatycznie', desc: 'Klient kupuje → zbiera punkty/pieczątki cyfrowo. Kupon na urodziny, nagroda po N-tym zakupie, oferta reaktywacyjna gdy dawno nie był. Komunikacja SMS/email leci sama. Ty ustawiasz reguły — system buduje relację.', outcome: 'Powracający goście bez ręcznego zarządzania programem', icon: 'award' },
        ],
      },
      {
        name: 'Kadry i grafiki', icon: 'users',
        ideas: [
          { title: 'Grafik na podstawie dostępności i zapotrzebowania', desc: 'Pracownicy podają dostępność w apce. System wie, ile osób potrzeba (z rezerwacji i historii). Układa grafik z uwzględnieniem kwalifikacji (barista, kucharz, kelner). Pracownik widzi swój grafik w telefonie, może poprosić o zamianę — system sprawdza, czy pokrycie się zgadza.', outcome: 'Grafik robiony w minuty, nie w godziny', icon: 'clock' },
          { title: 'Godziny pracy bez sporów', desc: 'Start i koniec zmiany logowane z telefonu (z weryfikacją lokalizacji). System liczy godziny, nadgodziny, przerwy. Koniec miesiąca → automatyczna lista płac z dokładnymi danymi. Nikt nie dyskutuje "ile pracowałem w tym miesiącu".', outcome: 'Rozliczenia precyzyjne i transparentne — obie strony widzą to samo', icon: 'smartphone' },
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
          { title: 'Pipeline z realistycznym forecastem', desc: 'Każdy deal w CRM z estymowanym prawdopodobieństwem zamknięcia — opartym na historii (jakie deale zamykaliśmy, w jakiej branży, jakim budżetem). Dashboard prognozuje revenue na kwartał. CEO widzi realistyczny obraz, nie listę życzeń handlowców.', outcome: 'Planowanie zasobów oparte na danych, nie na nadziei', icon: 'bar-chart' },
          { title: 'Wycena z historii projektów, nie z sufitu', desc: 'Przed estymacją tech lead widzi: "podobny e-commerce robiliśmy 3 razy — średnio 1200h, rozrzut 900-1500h". System przeszukuje historię wycen i pokazuje benchmark. Mniej underpricingu ("nie wiedzieliśmy, ile to zajmie") i mniej overpricingu ("klient nie zaakceptuje").', outcome: 'Wyceny bliższe rzeczywistości, mniej bolesnych niespodzianek', icon: 'cpu' },
          { title: 'Proposal z case studies z automatyczną selekcją', desc: 'RFP od klienta z branży medycznej, szuka apki mobilnej? System dobiera relevantne case studies z portfolio (ta branża, ten tech stack), generuje wstęp prezentacji i proponuje skład zespołu. Sales Engineer dostaje solidną bazę do dopracowania.', outcome: 'Oferta przygotowana szybko i z treścią, nie od pustej strony', icon: 'file-text' },
        ],
      },
      {
        name: 'Delivery i zespół', icon: 'target',
        ideas: [
          { title: 'Kto jest wolny za 2 tygodnie? Wiesz od razu', desc: 'Dashboard alokacji: kto nad czym pracuje, kto kończy projekt i kiedy, kto jest na bench-u, kto ma gap w kalendarzu. Planujesz przydział ludzi do nowych projektów z wyprzedzeniem — nie w panice dzień przed kickoffem.', outcome: 'Optymalne wykorzystanie zespołu, mniej bench time', icon: 'users' },
          { title: 'Sprint report dla klienta — generowany, nie pisany', desc: 'Koniec sprintu → system zbiera zrealizowane tickety, velocity, burndown, release notes. Generuje czytelny raport. PM spędza 5 minut na review i personalizacji — nie godzinę na kompilowaniu danych z trzech narzędzi.', outcome: 'Transparentność dla klienta bez godzin pracy PM-a', icon: 'mail' },
          { title: 'Czas pracy z narzędzi, nie z timesheetów', desc: 'Zamiast "Marek, uzupełnij timesheet" — system zbiera dane: ile czasu ticket był "in progress" w Jira, ile trwały spotkania z kalendarza, jaka aktywność w Gicie. Raport per klient generuje się sam. Developerzy kodzą, a nie logują.', outcome: 'Dane o czasie dokładniejsze niż timesheet, bez obciążania zespołu', icon: 'clock' },
        ],
      },
      {
        name: 'Finanse software house', icon: 'dollar-sign',
        ideas: [
          { title: 'Rentowność per projekt — na bieżąco, nie po fakcie', desc: 'System łączy czas pracy (z time trackingu) z kosztem wewnętrznym developera i stawką kliencką. Dashboard: ile zarabiamy na projekcie X? Który klient jest pod wodą? Widzisz to teraz, nie przy podsumowaniu kwartału.', outcome: 'Decyzje o alokacji i cenach oparte na faktycznej marży', icon: 'bar-chart' },
          { title: 'Faktury T&M i fixed price — z danych', desc: 'Time & Material: system zbiera godziny → generuje fakturę. Fixed price: fakturowanie per milestone z automatycznym triggierem. Koniec miesiąca = faktury gotowe do wysłania. Nie "kto zbierze dane z 5 arkuszy?".', outcome: 'Fakturowanie w dniu zamknięcia, bez szukania danych', icon: 'zap' },
          { title: 'Prognoza przychodów z backloga i pipeline', desc: 'Podpisane umowy (backlog) + szanse w pipeline (z wagą prawdopodobieństwa) + koszty stałe (zespół, biuro, narzędzia) = prognoza na 3-6 miesięcy. Board widzi, czy trzeba sprzedawać agresywniej, zatrudniać, czy może trzymać koszty.', outcome: 'Finansowe decyzje z wyprzedzeniem, nie w reakcji na kryzys', icon: 'trending-up' },
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
          { title: 'Rezerwacja online — pacjent nie musi dzwonić', desc: 'Pacjent wchodzi na stronę, wybiera lekarza, datę i godzinę — rezerwuje. Potwierdzenie SMS natychmiast, przypomnienie dzień przed i 2h przed. Opcja przełożenia jednym kliknięciem. Rejestratorka obsługuje skomplikowane przypadki, nie odbiera 100 identycznych telefonów dziennie.', outcome: 'Pacjenci rezerwują, kiedy chcą — rejestratorka nie jest wąskim gardłem', icon: 'globe' },
          { title: 'Check-in na tablecie zamiast kolejki do okienka', desc: 'Pacjent przychodzi → skanuje QR z SMS-a lub podaje PESEL → potwierdza dane → system informuje lekarza. Rejestratorka nie musi obsługiwać każdego pacjenta ręcznie. Pacjent nie stoi w kolejce, żeby powiedzieć "jestem".', outcome: 'Sprawna rejestracja bez kolejki i bez angażowania personelu', icon: 'monitor' },
          { title: 'Harmonogram, który uwzględnia rzeczywistość', desc: 'Wizyty kontrolne 15 min, konsultacje 30 min, zabiegi 45 min — system planuje z buforem na opóźnienia. Wie, że dr Kowalski zwykle się spóźnia 10 minut — i uwzględnia to. Pacjent widzi realistyczny czas wejścia, nie "teoretyczną godzinę".', outcome: 'Mniej frustracji w poczekalni, lepsze wykorzystanie czasu lekarza', icon: 'clock' },
        ],
      },
      {
        name: 'Dokumentacja i procesy kliniczne', icon: 'file-text',
        ideas: [
          { title: 'Dokumentacja medyczna, która pisze się (prawie) sama', desc: 'Lekarz prowadzi wizytę normalnie. System transkrybuje kluczowe informacje i strukturyzuje: objawy, diagnoza, zalecenia, leki. Wstawia do EDM. Lekarz weryfikuje i poprawia — zamiast pisać od zera po każdym pacjencie. Te 15 minut pisania po wizycie wraca do pacjenta.', outcome: 'Lekarz leczy, nie pisze — dokumentacja jest kompletna', icon: 'cpu' },
          { title: 'E-recepta i e-skierowanie bez ręcznego kodowania', desc: 'Lekarz wybiera lek lub procedurę → system automatycznie dobiera kod ICD-10, generuje e-receptę lub e-skierowanie, wysyła do systemu P1. Pacjent dostaje SMS z kodem. Nie trzeba ręcznie szukać kodów, ręcznie wypełniać pól — system zna kontekst wizyty.', outcome: 'Recepta w sekundy, bez pomyłek w kodach', icon: 'zap' },
          { title: 'Wyniki badań trafiają do profilu pacjenta automatycznie', desc: 'Laboratorium kończy badanie → wynik trafia do systemu → pacjent dostaje powiadomienie. Przy następnej wizycie lekarz ma wyniki pod ręką — nie szuka ich w papierach, nie prosi pacjenta, żeby "przyniósł te kartki z laboratorium".', outcome: 'Lekarz przygotowany do wizyty, pacjent nie jest listonoszem', icon: 'bell' },
        ],
      },
      {
        name: 'Rozliczenia i organizacja', icon: 'dollar-sign',
        ideas: [
          { title: 'Kodowanie procedur NFZ — propozycja z wizyty', desc: 'System rozpoznaje, co lekarz zrobił (z dokumentacji wizyty) i proponuje kody rozliczeniowe NFZ. Lekarz zatwierdza jednym kliknięciem. Sprawozdanie generuje się automatycznie. Nie trzeba dedykowanej osoby, która "tłumaczy" wizyty na kody.', outcome: 'Sprawozdawczość NFZ bez dodatkowej osoby do kodowania', icon: 'check-circle' },
          { title: 'Kontrakt NFZ — ile wykorzystaliśmy, ile zostało', desc: 'Dashboard: realizacja kontraktu per poradnia, trend, prognoza na koniec okresu. Widzisz, że poradnia X jest na 95% limitu z 2 miesiącami do końca — i możesz podjąć decyzję. Nie dowiadujesz się po fakcie, że "przekroczyliśmy" albo "zmarnowaliśmy".', outcome: 'Świadome zarządzanie kontraktem, nie "jakoś to będzie"', icon: 'bar-chart' },
          { title: 'Grafiki lekarzy i gabinetów — w jednym widoku', desc: 'Który lekarz w którym gabinecie, ile slotów na wizyty prywatne vs. NFZ, urlopy, szkolenia. Gdy lekarz jest chory — system proponuje przesunięcia pacjentów. Nie zarządzasz tym na tablicy korkowej — masz spójny widok z jednego miejsca.', outcome: 'Optymalne wykorzystanie gabinetów i czasu lekarzy', icon: 'clock' },
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
    subtitle: 'Agencje pracy, rekrutacja, kadry, benefity',
    icon: 'users',
    color: '#14b8a6',
    sections: [
      {
        name: 'Rekrutacja i sourcing', icon: 'search',
        ideas: [
          { title: 'CV przetwarzane i porównywane — nie czytane jedno po drugim', desc: 'CV wpada → system wyciąga kluczowe informacje (doświadczenie, kompetencje, lokalizacja, oczekiwania). Porównuje z wymaganiami stanowiska i prezentuje ranking dopasowania. Rekruter przegląda top kandydatów zamiast czytać 200 CV od deski do deski.', outcome: 'Screening szybszy i bardziej obiektywny — mniej zależy od tego, kto czyta', icon: 'cpu' },
          { title: 'Sekwencja sourcingowa, która pracuje za Ciebie', desc: 'Znalazłeś kandydata? System wysyła wiadomość powitalną. Brak odpowiedzi? Po 3 dniach — follow-up z innym kątem. Po 7 — kolejny. Personalizowane, ludzkie wiadomości — ale systematyczne. Recruiter ustawia kampanię raz, system pracuje.', outcome: 'Stały napływ kandydatów bez ręcznego wysyłania wiadomości', icon: 'mail' },
          { title: 'Kandydat wie, co się dzieje z jego aplikacją', desc: 'Aplikacja → natychmiast potwierdzenie. Po screeningu → informacja o statusie. Po rozmowie → feedback. Nie "cisza od 3 tygodni". Kandydat śledzi proces w portalu. To buduje markę pracodawcy — nawet ci, którzy nie dostaną pracy, mówią dobrze.', outcome: 'Profesjonalne doświadczenie kandydata buduje reputację firmy', icon: 'globe' },
        ],
      },
      {
        name: 'Pracownicy tymczasowi i delegowanie', icon: 'users',
        ideas: [
          { title: 'Od umowy do pierwszego dnia — systemowo, nie ręcznie', desc: 'Nowy pracownik tymczasowy → system generuje: umowę, skierowanie na badania, szkolenie BHP. Klient potwierdza przyjęcie. Dokumenty do podpisu elektronicznego. Cały process zamknięty w systemie — nie w folderze na dysku i 5 mailach.', outcome: 'Obsadzenie stanowiska w godzinach, nie w dniach', icon: 'file-text' },
          { title: 'Ewidencja czasu pracy — potwierdzona przez obie strony', desc: 'Pracownik loguje godziny w apce → klient potwierdza → system nalicza wynagrodzenie i generuje fakturę dla klienta. Dane się zgadzają, bo obie strony widzą to samo. Koniec z "my mamy inne godziny niż agencja".', outcome: 'Rozliczenia transparentne — zero sporów', icon: 'clock' },
          { title: 'Kto jest dostępny, kto jest potrzebny — na jednym ekranie', desc: 'Dashboard: ilu pracowników aktualnie pracuje, ilu jest dostępnych, ilu jest potrzebnych (z zapotrzebowań klientów na ten tydzień). Widzisz, czy musisz rekrutować, czy masz nadwyżkę — zanim klient zadzwoni z nowym zleceniem.', outcome: 'Planowanie zasobów ludzkich w czasie rzeczywistym', icon: 'bar-chart' },
        ],
      },
      {
        name: 'Kadry i płace', icon: 'dollar-sign',
        ideas: [
          { title: 'Pracownik sam pobiera to, czego potrzebuje', desc: 'Portal pracownika: wniosek urlopowy (manager zatwierdza jednym kliknięciem), zaświadczenie o zatrudnieniu, PIT-11, pasek wynagrodzenia — wszystko do pobrania samodzielnie. HR nie musi każdego dnia odpowiadać na "proszę mi wysłać PIT".', outcome: 'Kadry zajmują się strategią, nie powtarzalnymi zapytaniami', icon: 'smartphone' },
          { title: 'Lista płac z danych, które system już ma', desc: 'RCP, urlopy, zwolnienia, premie, potrącenia — system zbiera to w jednym miejscu. Nalicza wynagrodzenia, generuje listę płac i plik do banku. Kadrowa weryfikuje, a nie ręcznie oblicza składki dla 300 pracowników.', outcome: 'Naliczanie wynagrodzeń jako weryfikacja, nie praca manualna', icon: 'dollar-sign' },
          { title: 'Benefity wybierane przez pracownika, rozliczane automatycznie', desc: 'Każdy pracownik ma budżet benefitowy i sam wybiera: karta sportowa, ubezpieczenie, posiłki, szkolenia. Zmiana wyboru w portalu → system przelicza i rozlicza automatycznie. HR widzi, co jest popularne, a co nie — bez ręcznego prowadzenia rejestrów.', outcome: 'Benefity dopasowane do ludzi, rozliczone bez dodatkowej pracy', icon: 'heart' },
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
    subtitle: 'Szkoły, kursy, LMS, szkolenia specjalistyczne',
    icon: 'book-open',
    color: '#a855f7',
    sections: [
      {
        name: 'Platforma edukacyjna', icon: 'monitor',
        ideas: [
          { title: 'Kurs online z automatyczną ścieżką i certyfikatem', desc: 'Uczeń kupuje kurs → dostaje dostęp → system prowadzi go przez moduły w odpowiedniej kolejności. Quiz po każdym module — nie przejdzie dalej bez zaliczenia. Po ukończeniu → certyfikat PDF z imieniem, datą i unikalnym numerem weryfikowalnym online. Sprzedajesz kurs raz — działa na 1000 osób.', outcome: 'Skalowalna edukacja — bez ograniczenia liczbą trenerów', icon: 'award' },
          { title: 'Sprzedaż kursów jako automatyczny funnel', desc: 'Landing page kursu → płatność → natychmiastowy dostęp. Sekwencja emailowa z materiałami dodatkowymi. Po ukończeniu — oferta kursu zaawansowanego w niższej cenie dla absolwentów. Cały funnel ustawiony raz — sprzedaje 24/7.', outcome: 'Przychód z kursów bez ręcznej obsługi każdego klienta', icon: 'shopping-cart' },
          { title: 'Materiały testowe z treści kursu', desc: 'Wrzucasz materiał szkoleniowy — system generuje quizy z pytaniami na różnych poziomach trudności, fiszki do powtórki, podsumowania kluczowych punktów. Trener dopracowuje — ale nie pisze od zera. Oszczędność godzin pracy dydaktycznej.', outcome: 'Tworzenie materiałów testowych jako edycja, nie pisanie od zera', icon: 'cpu' },
        ],
      },
      {
        name: 'Zarządzanie uczniami i administracja', icon: 'users',
        ideas: [
          { title: 'Zapisy online z automatyczną dokumentacją', desc: 'Uczeń wypełnia formularz online → system weryfikuje dane → generuje umowę do podpisu elektronicznego → przypisuje do grupy → wysyła harmonogram i materiały. Nie ma papierkowej roboty, nie ma wizyty w sekretariacie. Zapisy otwarte 24/7.', outcome: 'Administracja zapisów zamknięta w kliknięciach, nie w wizytach', icon: 'globe' },
          { title: 'Powiadomienia zamiast telefonów', desc: 'Nowe oceny, zmiana harmonogramu, nadchodzący egzamin, zaległa płatność — kursanci (i rodzice) dostają automatyczne powiadomienia. SMS lub email. Nie muszą dzwonić z pytaniem "o której jutro zajęcia?" — wiedzą.', outcome: 'Informowanie uczestników bez angażowania sekretariatu', icon: 'bell' },
          { title: 'Kto odpada? System widzi wcześniej', desc: 'Dashboard frekwencji i postępów: kto chodzi regularnie, kto opuszcza zajęcia, kto nie radzi sobie z materiałem. Trzy nieobecności z rzędu → alert do trenera. Interwencja zanim uczeń zrezygnuje — nie po fakcie.', outcome: 'Mniej rezygnacji, bo problemy łapane wcześnie', icon: 'bar-chart' },
        ],
      },
      {
        name: 'Certyfikacja i uprawnienia', icon: 'shield',
        ideas: [
          { title: 'Egzamin online ze sprawdzalnym certyfikatem', desc: 'Egzamin z losowaniem pytań z puli, timerem i zabezpieczeniami. Wynik natychmiast. Zdał? Certyfikat z unikalnym numerem, weryfikowalny przez pracodawcę lub regulatora online (QR/link). Idealne dla szkoleń operatorów dronów, BHP, uprawnień branżowych.', outcome: 'Certyfikaty wiarygodne i sprawdzalne — wartość dla absolwenta i pracodawcy', icon: 'check-circle' },
          { title: 'Rejestr certyfikatów z terminami ważności', desc: 'Kto zdał, kiedy, jaki certyfikat, kiedy wygasa. Zbliża się termin? Automatyczne przypomnienie "Twój certyfikat wygasa za 2 miesiące — zapisz się na odnowienie". Pracodawca może zweryfikować ważność jednym kliknięciem.', outcome: 'Żadne uprawnienie nie wygasa "po cichu"', icon: 'shield' },
          { title: 'Raporty dla regulatora z danych systemu', desc: 'Instytucja wymaga raportów (SIO, UDT, ULC)? System zbiera dane o kursantach, egzaminach i certyfikatach i generuje sprawozdanie w wymaganym formacie. Nie ręcznie z Excela — z danych, które i tak już masz.', outcome: 'Raportowanie regulacyjne jako kliknięcie, nie projekt', icon: 'file-text' },
        ],
      },
    ],
  },
];
