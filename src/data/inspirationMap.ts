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

  /* ═══════════════════════════════════════
     PRODUKCJA & PRZEMYSŁ
     ═══════════════════════════════════════ */
  {
    id: 'production',
    name: 'Produkcja & Przemysł',
    subtitle: 'Opakowania, metal, komponenty, żywność',
    icon: 'layers',
    color: '#06b6d4',
    sections: [
      {
        name: 'System obsługi zleceń produkcyjnych', icon: 'zap',
        ideas: [
          { title: 'Panel klienta B2B do składania zamówień', desc: 'Zamiast maili i telefonów — klient loguje się do panelu, widzi Twój katalog, składa zamówienie z właściwą specyfikacją i widzi jego status na żywo. Zamówienie automatycznie tworzy zlecenie w produkcji. Handlowiec nie przepisuje, produkcja nie czeka.', outcome: 'Klient zamawia sam — Ty dostajesz gotowe zlecenie', icon: 'globe' },
          { title: 'Zlecenia, harmonogram i statusy w jednym miejscu', desc: 'Jedno narzędzie zamiast Excela, tablicy i WhatsAppa. Zlecenie wchodzi → system planuje kolejność (przezbrojenia, priorytety, terminy) → operator widzi co ma robić → kierownik widzi, co się dzieje. Zmiana priorytetu? Przeciągasz — harmonogram przelicza się sam.', outcome: 'Koniec z "kto robi co?" — jedno źródło prawdy dla całej produkcji', icon: 'monitor' },
          { title: 'Automatyczne powiadomienia o statusie zlecenia', desc: 'Zlecenie przechodzi przez etapy (cięcie → montaż → kontrola → wysyłka). Przy każdej zmianie statusu klient dostaje informację. Nie musi dzwonić z pytaniem "kiedy będzie gotowe?" — wie.', outcome: 'Klient poinformowany na bieżąco, biuro odciążone', icon: 'bell' },
          { title: 'Konfigurator produktu online', desc: 'Klient sam składa specyfikację: wymiary, materiał, kolor, ilość. System od razu kalkuluje cenę i termin realizacji. Zamówienie wpada gotowe — bez maili "a ile by kosztowało, gdyby 5mm grubsze?". Szczególnie skuteczne przy produkcji na zamówienie.', outcome: 'Klient konfiguruje i zamawia sam — handlowiec wchodzi tylko gdy trzeba', icon: 'settings' },
        ],
      },
      {
        name: 'Jakość i dokumentacja', icon: 'check-circle',
        ideas: [
          { title: 'Cyfrowe karty kontroli jakości', desc: 'Pracownik skanuje partię, wypełnia checklistę na tablecie — pomiary, zdjęcia, status. Wyniki trafiają do systemu, a nie do segregatora. Przy audycie ISO wyciągasz pełną historię jednym kliknięciem. Przy reklamacji — wiesz dokładnie, co się stało z tą partią.', outcome: 'Jakość udokumentowana i przeszukiwalna — audyt-ready', icon: 'file-text' },
          { title: 'Pełne śledzenie partii od surowca do wysyłki', desc: 'Skąd surowiec, kto go przetwarzał, na jakiej maszynie, kiedy, jaki wynik kontroli — pełna genealogia produktu. Coraz więcej klientów tego wymaga. Przy wycofaniu partii wiesz natychmiast, co jest dotknięte.', outcome: 'Traceability, którego wymagają Twoi klienci i audytorzy', icon: 'search' },
          { title: 'System obsługi reklamacji z powiązaniem do partii', desc: 'Klient zgłasza reklamację → system łączy ją z konkretną partią, zleceniem i wynikami kontroli jakości. Widać od razu, czy problem był po Twojej stronie. Odpowiedź do klienta z konkretnymi danymi, nie z "sprawdzimy i wrócimy".', outcome: 'Reklamacje obsługiwane merytorycznie i szybko — z danymi, nie z domysłami', icon: 'shield' },
        ],
      },
      {
        name: 'Maszyny i utrzymanie ruchu', icon: 'settings',
        ideas: [
          { title: 'System zgłoszeń i historii serwisowej', desc: 'Operator zgłasza problem przez tablet. System przypisuje do mechanika, śledzi czas reakcji, zbiera historię napraw per maszyna. Wiesz, która maszyna jest problematyczna, ile kosztuje utrzymanie, kiedy wymienić zamiast łatać.', outcome: 'Decyzje serwisowe oparte na historii, nie na pamięci jednego mechanika', icon: 'settings' },
          { title: 'Automatyczne planowanie przeglądów', desc: 'System liczy motogodziny lub czas i przypomina o przeglądach. Sam tworzy zlecenie serwisowe i sprawdza, czy części są na stanie. Żaden przegląd nie umknie. Mniej awarii, bo maszyny zadbane prewencyjnie.', outcome: 'Prewencja zamiast gaszenia pożarów', icon: 'clock' },
        ],
      },
      {
        name: 'Magazyn i zaopatrzenie', icon: 'package',
        ideas: [
          { title: 'Stany magazynowe i automatyczne zamówienia do dostawców', desc: 'System widzi stany, zna tempo zużycia i lead time dostawcy. Gdy surowiec spada poniżej progu — generuje zamówienie. Kupiec zatwierdza, ale nie pilnuje 300 pozycji w głowie. Linia produkcyjna nie stoi, bo "ktoś zapomniał zamówić".', outcome: 'Zaopatrzenie, które działa bez ciągłego nadzoru', icon: 'refresh-cw' },
          { title: 'Portal dostawcy z awizacją dostaw', desc: 'Dostawca potwierdza terminy i awizuje dostawę w portalu. Magazyn wie, co i kiedy przyjedzie. Koniec z telefonami i kolejkami na rampie. Prosty krok, który porządkuje cały proces przyjęć.', outcome: 'Magazyn planuje pracę zamiast reagować na zaskoczenia', icon: 'globe' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     TRANSPORT & LOGISTYKA
     ═══════════════════════════════════════ */
  {
    id: 'transport',
    name: 'Transport & Logistyka',
    subtitle: 'Spedycja, flota, TSL, magazyny',
    icon: 'truck',
    color: '#3b82f6',
    sections: [
      {
        name: 'System zarządzania zleceniami transportowymi', icon: 'map-pin',
        ideas: [
          { title: 'Wszystkie zlecenia w jednym systemie — nie w mailach', desc: 'Zlecenie od klienta trafia do systemu (z maila, portalu, integracji). Dyspozytor widzi: co trzeba zaplanować, co jest w trasie, co wymaga dokumentów. Jedno miejsce zamiast Excela, maila i WhatsAppa. Zlecenie ma historię — kto je obsługiwał, co się działo, gdzie jest teraz.', outcome: 'Pełna widoczność operacji — od przyjęcia zlecenia do dostawy', icon: 'monitor' },
          { title: 'Portal klienta — zlecenia, tracking, dokumenty', desc: 'Stały klient sam składa zlecenie, śledzi status na żywo, pobiera POD i fakturę. Nie dzwoni, nie maila — ma wszystko w jednym panelu. System potwierdza przyjęcie i przekazuje do dyspozytora. Biuro obsługuje wyjątki, nie rutynę.', outcome: 'Klient samoobsługowy — Twój zespół zajmuje się trudniejszymi sprawami', icon: 'globe' },
          { title: 'Tracking przesyłek z automatycznym ETA dla klienta', desc: 'Kierowca rusza — klient dostaje SMS z linkiem do śledzenia i szacowanym czasem dostawy. ETA aktualizuje się na bieżąco. Opóźnienie? Klient wie pierwszy. Znika najczęstszy telefon w firmie transportowej: "gdzie jest moja przesyłka?".', outcome: 'Informacja zamiast telefonów — klient wie, biuro ma spokój', icon: 'truck' },
          { title: 'Giełda ładunków i dopasowanie wolnych aut', desc: 'Masz wolne auto wracające puste z Gdańska? System pokazuje zlecenia na trasie powrotnej od Twoich klientów lub z giełdy. Dyspozytor widzi opcje i decyduje. Mniej pustych kursów, lepszy load factor.', outcome: 'Wykorzystanie floty, której już masz — zamiast jeżdżenia na pusto', icon: 'map-pin' },
        ],
      },
      {
        name: 'Dokumenty i rozliczenia', icon: 'file-text',
        ideas: [
          { title: 'Dokumenty transportowe generowane z danych zlecenia', desc: 'CMR, listy przewozowe, WZ — system zna nadawcę, odbiorcę, towar. Generuje dokumenty automatycznie. Kierowca dostaje je na tablet. POD z podpisem elektronicznym trafia do systemu natychmiast — faktura może wyjść tego samego dnia.', outcome: 'Dokumentacja gotowa zanim kierowca wyjedzie z bazy', icon: 'file-text' },
          { title: 'Automatyczne rozliczenie trasy i kosztów', desc: 'Kilometry, stawka, koszty paliwa, opłaty drogowe — system zestawia i kalkuluje marżę per zlecenie. Rozlicza podwykonawców. Faktura kosztowa od podwykonawcy paruje się z zleceniem automatycznie. Księgowość dostaje gotowe dane, nie "proszę policzyć".', outcome: 'Wiesz, ile zarabiasz na każdej trasie — na bieżąco', icon: 'dollar-sign' },
        ],
      },
      {
        name: 'Kierowcy i rozliczenia kadrowe', icon: 'users',
        ideas: [
          { title: 'Apka kierowcy — zlecenia, dokumenty, rozliczenia', desc: 'Jedna apka zamiast 5 telefonów do biura. Kierowca widzi zlecenia, nawigację, dokumenty do podpisu, swoje rozliczenie wynagrodzenia. Składa wniosek urlopowy. Nie musi dzwonić z pytaniami — ma odpowiedzi w kieszeni.', outcome: 'Kierowca samoobsługowy, biuro pracuje nad biznesem', icon: 'smartphone' },
          { title: 'Naliczanie wynagrodzeń z danych, które system już ma', desc: 'Kilometry, godziny z tachografu, diety, premie — system zbiera to z danych operacyjnych. Nalicza wynagrodzenie wg umowy. Kierowca widzi rozliczenie w apce — wie za co ile dostaje. Koniec z ręcznym liczeniem w Excelu i sporami o kilometry.', outcome: 'Transparentne rozliczenia oparte na danych, nie na zaufaniu', icon: 'dollar-sign' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     E-COMMERCE & HANDEL
     ═══════════════════════════════════════ */
  {
    id: 'ecommerce',
    name: 'E-commerce & Handel',
    subtitle: 'Sklepy online, hurtownie, dystrybucja',
    icon: 'shopping-cart',
    color: '#f59e0b',
    sections: [
      {
        name: 'System obsługi zamówień i fulfillmentu', icon: 'zap',
        ideas: [
          { title: 'Jeden system dla wszystkich kanałów sprzedaży', desc: 'Allegro, własny sklep, zamówienia B2B mailem — wszystko wpada do jednego systemu. Weryfikacja płatności, rezerwacja towaru, etykieta kurierska, tracking do klienta. Jeden flow zamiast trzech. Stany zsynchronizowane w real-time — sprzedałeś na Allegro, stan spada wszędzie.', outcome: 'Jeden proces obsługi niezależnie od kanału — koniec z chaosem wielu narzędzi', icon: 'zap' },
          { title: 'Panel hurtowy / B2B z cenami kontraktowymi', desc: 'Klient biznesowy loguje się do panelu, widzi swoje ceny, składa zamówienie, śledzi realizację, pobiera faktury. Nie dzwoni, nie maila z pytaniem o cenę. Zamówienie trafia do systemu i dalej — na magazyn, do wysyłki. Obsługa klienta hurtowego bez angażowania handlowca przy każdym zamówieniu.', outcome: 'Klienci B2B obsługują się sami — handlowiec buduje relacje, nie wbija zamówienia', icon: 'globe' },
          { title: 'Inteligentne zarządzanie stanami magazynowymi', desc: 'System zna tempo sprzedaży per SKU i lead time dostawców. Bestseller się kończy? Zamówienie do dostawcy generuje się automatycznie z optymalną ilością. Slow mover zalega? Alert — może pora na promocję albo wyprzedaż. Nie pilujesz 500 pozycji w głowie ani w Excelu.', outcome: 'Właściwe produkty na stanie — bez braków na bestsellerach i śmietnika slow moverów', icon: 'package' },
          { title: 'System obsługi zwrotów i reklamacji', desc: 'Klient zgłasza zwrot przez formularz → system generuje etykietę, śledzi paczkę, po przyjęciu na magazyn weryfikuje stan. Refund lub wymiana — automatycznie. Klient widzi status i nie musi dopytywać. Dane o zwrotach zbierane w jednym miejscu — widzisz, które produkty mają problem.', outcome: 'Zwroty jako sprawny proces — nie czarna dziura, z której nic nie wynika', icon: 'refresh-cw' },
        ],
      },
      {
        name: 'Marketing i retencja klientów', icon: 'heart',
        ideas: [
          { title: 'Automatyczne sekwencje po zakupie i porzuceniu koszyka', desc: 'Klient nie kupił? Sekwencja: przypomnienie, może rabat, SMS. Kupił? Podziękowanie, prośba o opinię, za miesiąc — rekomendacja powiązanych produktów. Ustawiasz raz — działa codziennie. Nie chodzi o spam — chodzi o systematyczną komunikację w odpowiednim momencie.', outcome: 'Relacja z klientem budowana automatycznie, nie ręcznie', icon: 'mail' },
          { title: 'Segmentacja klientów i dopasowana komunikacja', desc: 'Nie wszyscy klienci są tacy sami. System rozróżnia: nowy, powracający, VIP, ryzyko odejścia. Każda grupa dostaje inną komunikację — VIP wie o nowościach pierwszy, zagrożony odejściem dostaje powód do powrotu. To nie newsletter dla wszystkich — to precyzyjne dotarcie.', outcome: 'Komunikacja, którą klient chce czytać — bo jest dla niego', icon: 'users' },
        ],
      },
      {
        name: 'Obsługa klienta i analityka', icon: 'bar-chart',
        ideas: [
          { title: 'System obsługi zgłoszeń z pełnym kontekstem', desc: 'Klient pisze z problemem → system rozpoznaje klienta, wyciąga historię zamówień, identyfikuje temat (zwrot, reklamacja, pytanie) i kieruje do odpowiedniej osoby z kontekstem. Agent nie zaczyna od "proszę podać numer zamówienia" — ma wszystko.', outcome: 'Szybsza i lepsza obsługa, bo każdy ma pełen obraz', icon: 'message-circle' },
          { title: 'Dashboard sprzedażowy zamiast logowania do 5 narzędzi', desc: 'Konwersja, marża, top produkty, ROAS z kampanii, zwroty — w jednym widoku, zaciągane z różnych źródeł. Alert, gdy coś odbiega od normy. Tygodniowy raport generuje się sam i leci na maila. Wiesz, jak idzie biznes, bez godziny zbierania danych.', outcome: 'Obraz biznesu w jednym miejscu — decyzje zamiast szukania danych', icon: 'monitor' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     AGENCJE & USŁUGI B2B
     ═══════════════════════════════════════ */
  {
    id: 'agencies',
    name: 'Agencje & Usługi B2B',
    subtitle: 'Marketing, consulting, prawo, software house',
    icon: 'briefcase',
    color: '#8b5cf6',
    sections: [
      {
        name: 'CRM i pipeline sprzedażowy', icon: 'trending-up',
        ideas: [
          { title: 'CRM, który żyje — nie tylko "do wypełnienia"', desc: 'Maile, spotkania z kalendarza, notatki — logują się w CRM automatycznie. Handlowiec sprzedaje, nie "uzupełnia system". Deal przechodzi przez etapy, follow-upy wysyłają się same w odpowiednich momentach. Manager widzi pipeline i prognozę bez pytania "jak tam tamten deal?".', outcome: 'Sprzedaż jako uporządkowany proces — nie zbiór przypadkowych działań', icon: 'monitor' },
          { title: 'Generator ofert z szablonów i danych CRM', desc: 'Zamiast zaczynać od pustego Google Docs — wybierasz klienta, zakres, stawkę. System generuje spersonalizowaną ofertę z właściwymi case studies i warunkami. Format profesjonalny, dane aktualne, czas przygotowania — kilka minut zamiast godzin.', outcome: 'Szybka i profesjonalna odpowiedź na każde zapytanie', icon: 'file-text' },
          { title: 'Scoring leadów — handlowiec pracuje z najgorętszymi', desc: 'Lead z formularza, LinkedIn, webinaru — system zbiera kontekst (branża, wielkość firmy, co przeglądał na stronie) i ocenia, jak bardzo jest gotowy do rozmowy. Gorący leci do handlowca od razu, reszta idzie do automatycznej sekwencji edukacyjnej.', outcome: 'Handlowcy sprzedają tym, którzy chcą kupić — nie dzwonią na ślepo', icon: 'users' },
        ],
      },
      {
        name: 'System zarządzania projektami i rentownością', icon: 'target',
        ideas: [
          { title: 'Czas pracy, budżet i marża — w jednym dashboardzie', desc: 'System zbiera czas z narzędzi projektowych (Jira, Linear, kalendarz). Łączy z budżetem i stawkami. Widać: ile spalono, jaka marża, ile zostało. Na bieżąco — nie po rozliczeniu. Alarm, gdy projekt zbliża się do progu. PM reaguje, zanim jest za późno.', outcome: 'Rentowność projektu widoczna w trakcie realizacji — nie po fakcie', icon: 'bar-chart' },
          { title: 'Automatyczny raport statusowy dla klienta', desc: 'Co tydzień system kompiluje: co zrobiliśmy, co przed nami, czy jesteśmy na czas. PM robi szybki review i wysyła. Klient czuje się zaopiekowany. PM nie spędza godziny na pisanie update\'u z danych, które i tak są w systemie.', outcome: 'Klient poinformowany regularnie — bez wysiłku po Twojej stronie', icon: 'mail' },
          { title: 'Fakturowanie z danych projektowych', desc: 'T&M? System zbiera godziny i generuje fakturę. Fixed price? Fakturowanie per milestone z automatycznym triggerem. Koniec miesiąca = faktury gotowe do wysłania. Nie "kto zbierze dane z 5 arkuszy?".', outcome: 'Faktura w dniu zamknięcia — nie po tygodniu szukania danych', icon: 'dollar-sign' },
        ],
      },
      {
        name: 'Zespół i wiedza firmowa', icon: 'users',
        ideas: [
          { title: 'Onboarding nowej osoby z checklistą, nie z chaosu', desc: 'Nowy człowiek → system generuje zadania: IT daje dostępy, HR wysyła dokumenty, buddy planuje spotkania, manager przygotowuje kontekst. Każdy wie co ma zrobić. Nikt nie siedzi 3 dni czekając, aż "ktoś się nim zajmie".', outcome: 'Nowa osoba produktywna szybko — bo proces jest poukładany', icon: 'check-circle' },
          { title: 'Baza wiedzy zamiast "zapytaj Marka, on to ogarnia"', desc: 'Procedury, szablony, know-how, case studies — w jednym miejscu z wyszukiwarką. "Jak robimy audyt SEO?" — jest procedura. "Jak rozliczamy T&M?" — jest wzór. Wiedza firmy nie znika z odejściem kluczowej osoby.', outcome: 'Wiedza organizacyjna dostępna zawsze — niezależna od rotacji', icon: 'search' },
          { title: 'Portal klienta — projekty, pliki, komunikacja', desc: 'Klient loguje się do swojego panelu: widzi status projektów, pobiera deliverables, zgłasza feedback, widzi faktury. Cała komunikacja w jednym miejscu — nie w 40 wątkach mailowych. Klient czuje się zaopiekowany, Ty masz porządek.', outcome: 'Relacja z klientem w jednym miejscu — nie w rozproszonych mailach', icon: 'globe' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     FINANSE & KSIĘGOWOŚĆ
     ═══════════════════════════════════════ */
  {
    id: 'finance',
    name: 'Finanse & Księgowość',
    subtitle: 'Biura rachunkowe, BPO, brokerzy, doradcy',
    icon: 'dollar-sign',
    color: '#10b981',
    sections: [
      {
        name: 'Cyfrowy obieg dokumentów finansowych', icon: 'file-text',
        ideas: [
          { title: 'Faktury z maila prosto do systemu — bez przepisywania', desc: 'Faktura wpada na maila lub jako skan → system wyciąga dane (kontrahent, kwota, VAT) → proponuje dekretację na podstawie historii → księgowa weryfikuje i zatwierdza. Nie przepisuje — sprawdza. Parowanie z zamówieniami i WZ dzieje się automatycznie — rozbieżności flagowane od razu.', outcome: 'Księgowa weryfikuje zamiast przepisywać — szybciej i pewniej', icon: 'eye' },
          { title: 'Akceptacja kosztów — cyfrowa, szybka, z pełną historią', desc: 'Faktura kosztowa trafia do właściwego managera. Akceptacja jednym kliknięciem w apce. Pełna ścieżka audytowa — kto, kiedy, z jakim komentarzem. Żadna faktura nie "leży" tygodniami na czyimś biurku.', outcome: 'Od otrzymania do zaksięgowania — dni zamiast tygodni', icon: 'zap' },
        ],
      },
      {
        name: 'Panel klienta biura rachunkowego', icon: 'users',
        ideas: [
          { title: 'Portal, gdzie klient wrzuca dokumenty i widzi status', desc: 'Klient loguje się, wrzuca faktury (skan, zdjęcie), widzi status: zaksięgowane, brakujące, do wyjaśnienia. Nie dzwoni z pytaniem "czy moje faktury dotarły?". Biuro ma komplet dokumentów w jednym miejscu, posortowany per klient. System sam przypomina o brakujących dokumentach.', outcome: 'Koniec z gonitwą za dokumentami pod koniec miesiąca', icon: 'globe' },
          { title: 'Sprawozdawczość z zatwierdzonych danych — nie z Excela', desc: 'JPK_V7, deklaracje VAT, PIT-y — generowane z danych, które są już w systemie. Księgowa weryfikuje, a nie ręcznie wypełnia formularze. Mniej monotonnej pracy, mniej okazji do pomyłki.', outcome: 'Sprawozdawczość jako weryfikacja — nie ręczne wypełnianie', icon: 'file-text' },
        ],
      },
      {
        name: 'Dashboardy i prognozowanie', icon: 'bar-chart',
        ideas: [
          { title: 'Dashboard finansowy w czasie rzeczywistym', desc: 'Przychody, koszty, marża, cash flow — aktualizowane na bieżąco z danych księgowych. Zarząd nie czeka na zamknięcie miesiąca. Widzi, jak idzie — teraz. Alert, gdy KPI odbiega od planu. Poranny digest z najważniejszymi liczbami na maila.', outcome: 'Obraz finansowy firmy zawsze aktualny — decyzje na danych', icon: 'monitor' },
          { title: 'Prognoza cash flow na 2-3 miesiące do przodu', desc: 'System zestawia zaplanowane wpływy (z faktur, kontraktów) i zobowiązania (pensje, ZUS, koszty stałe). Rysuje prognozę i pokazuje, kiedy na koncie może być ciasno. Nie chodzi o dokładność co do złotówki — chodzi o brak niespodzianek.', outcome: 'Planowanie finansowe zamiast gaszenia pożarów', icon: 'trending-up' },
          { title: 'Konsolidacja danych z wielu źródeł', desc: 'Dane sprzedażowe w jednym systemie, koszty w innym, bank w trzecim, Excel z prognozami w czwartym. System zbiera to razem, czyści, transformuje i pokazuje w jednym dashboardzie. Koniec z "daj mi raport" który ktoś klei ręcznie z 5 plików.', outcome: 'Jedno źródło prawdy finansowej — z danych, które już masz', icon: 'layers' },
        ],
      },
      {
        name: 'System dla brokera ubezpieczeniowego', icon: 'shield',
        ideas: [
          { title: 'CRM ubezpieczeniowy z terminarzem polis i odnowień', desc: 'Każdy klient, jego polisy, daty wygasania, historia roszczeń — w jednym systemie. 60 dni przed końcem polisy system uruchamia proces odnowienia: alert do brokera, mail do klienta, przygotowanie ofert porównawczych. Żadna polisa nie wygasa po cichu.', outcome: 'Odnowienia obsługiwane proaktywnie — klient zaopiekowany, przychód zabezpieczony', icon: 'clock' },
          { title: 'Portal klienta z obsługą szkód', desc: 'Klient zgłasza szkodę przez portal — formularz, zdjęcia, dokumenty. System kompletuje wniosek i wysyła do TU. Klient widzi status na bieżąco. Broker interweniuje gdy sprawa jest skomplikowana, nie przy każdym rutynowym zgłoszeniu.', outcome: 'Obsługa szkód jako uporządkowany proces — nie seria telefonów', icon: 'shield' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     BUDOWNICTWO & NIERUCHOMOŚCI
     ═══════════════════════════════════════ */
  {
    id: 'construction',
    name: 'Budownictwo & Nieruchomości',
    subtitle: 'Wykonawcy, deweloperzy, zarządcy, agenci',
    icon: 'home',
    color: '#ec4899',
    sections: [
      {
        name: 'System zarządzania budową', icon: 'target',
        ideas: [
          { title: 'Dziennik budowy, postępy i dokumentacja w jednej apce', desc: 'Kierownik loguje postępy z telefonu: zdjęcia, notatki, pogoda, obecność ekip. Inwestor widzi status online. Harmonogram aktualizuje się na żywo — opóźnienie tynków automatycznie przesuwa zależne zadania. Budżet per pozycja kosztorysowa — wiadomo, gdzie jesteśmy finansowo.', outcome: 'Transparentna budowa — wszyscy wiedzą, co się dzieje i za ile', icon: 'smartphone' },
          { title: 'Portal podwykonawcy — harmonogram, dokumenty, odbiory', desc: 'Podwykonawca widzi swoje zadania, potwierdza terminy, wrzuca dokumenty (ubezpieczenie, certyfikaty). Zgłasza gotowość do odbioru — system tworzy zadanie dla inspektora. Koniec z szukaniem "czy ten podwykonawca miał ważne ubezpieczenie?".', outcome: 'Dokumentacja i rozliczenia podwykonawców w jednym miejscu', icon: 'users' },
        ],
      },
      {
        name: 'Sprzedaż i CRM nieruchomości', icon: 'trending-up',
        ideas: [
          { title: 'Publikacja ofert na wszystkich portalach jednym kliknięciem', desc: 'Otodom, OLX, Gratka — i kolejne. Tworzysz ofertę raz, publikujesz wszędzie. Zmiana ceny? Aktualizuje się wszędzie. Nowe zdjęcia? Synchronizuje. Sprzedane? Zdejmuje. Nowa oferta w portfolio? System automatycznie dopasowuje ją do klientów z bazy i wysyła mailing.', outcome: 'Oferta widoczna wszędzie bez powielania pracy — klienci dostają ją automatycznie', icon: 'globe' },
          { title: 'CRM agenta z pełną historią kontaktu', desc: 'Każdy telefon, mail, prezentacja, oferta — zalogowane. Agent widzi kontekst zanim podniesie słuchawkę. Gdy odchodzi z firmy — wiedza o kliencie zostaje. System pilnuje follow-upów i zadań. Relacja z klientem jest własnością firmy, nie agenta.', outcome: 'Sprzedaż uporządkowana — żaden kontakt się nie gubi', icon: 'monitor' },
          { title: 'Tablica inwestycji deweloperskiej z postępem sprzedaży', desc: 'Wszystkie lokale w inwestycji na jednym ekranie: wolne, zarezerwowane, sprzedane. Przy każdym — cena, metraż, piętro, status umowy. Klient deweloperski widzi dostępność online. Handlowiec widzi, co zostało i jakie warunki oferować.', outcome: 'Pełen obraz inwestycji — sprzedaż i postępy budowy w jednym', icon: 'bar-chart' },
        ],
      },
      {
        name: 'Portal najemcy i zarządzanie nieruchomościami', icon: 'home',
        ideas: [
          { title: 'Panel najemcy — zgłoszenia, rachunki, komunikacja', desc: 'Najemca loguje się do panelu: zgłasza usterkę z opisem i zdjęciem, widzi rachunki, pobiera dokumenty. Zgłoszenie automatycznie trafia do właściwego technika — najemca widzi status jak przesyłkę. Rozliczenia mediów generują się z odczytów — od odczytu do rachunku bez Excela.', outcome: 'Obsługa najemców uporządkowana i samoobsługowa — mniej telefonów, mniej chaosu', icon: 'globe' },
          { title: 'Terminarz umów i automatyczne przypomnienia', desc: 'Umowa wygasa za 3 miesiące? System informuje zarządcę. Renegocjacja, nowa oferta, przygotowanie lokalu — system proponuje kolejne kroki. Nie odkrywasz pustostanu, gdy najemca się już wyprowadził.', outcome: 'Proaktywne zarządzanie portfelem — nie reaktywne', icon: 'clock' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     GASTRONOMIA & SPOŻYWCZA
     ═══════════════════════════════════════ */
  {
    id: 'gastro',
    name: 'Gastronomia & Spożywcza',
    subtitle: 'Restauracje, piekarnie, cukiernie, catering',
    icon: 'coffee',
    color: '#f97316',
    sections: [
      {
        name: 'System zarządzania produkcją i recepturami', icon: 'layers',
        ideas: [
          { title: 'Receptury z automatyczną kalkulacją food costu', desc: 'Każdy przepis w systemie: składniki, gramatura, koszt per porcja — aktualizowany z cenami dostawców. Dostawca podniósł cenę mąki? Food cost przelicza się automatycznie. Widzisz, które produkty zarabiają, a które trzeba wycenić inaczej. Bez ręcznego przeliczania po każdej zmianie cennika.', outcome: 'Kontrola marży na każdym produkcie — decyzje cenowe oparte na danych', icon: 'dollar-sign' },
          { title: 'Plan produkcji oparty na danych sprzedażowych', desc: 'System wie, co sprzedawało się w analogiczny dzień, jakie są zamówienia B2B i jaki sezon. Proponuje ilości do wyprodukowania. Piekarz czy cukiernik weryfikuje — ale startuje od rozsądnej propozycji. Z planu produkcji generuje się lista zakupowa — zamówienia do dostawców z jednym kliknięciem.', outcome: 'Mniej wyrzucania, mniej braków — bo plan oparty na danych, nie na wyczuciu', icon: 'clock' },
        ],
      },
      {
        name: 'Zamówienia B2B i catering', icon: 'package',
        ideas: [
          { title: 'Panel zamówień dla klientów biznesowych', desc: 'Biura, firmy cateringowe, hurtowi — zamawiają przez dedykowany panel z ich cenami kontraktowymi. Zamówienie trafia do systemu, dołącza do planu produkcji, generuje dokumenty dostawy. Nie ma mailowania, pytania o ceny, ręcznego wbijania. Klient zamawia — Ty produkujesz.', outcome: 'Obsługa B2B bez angażowania handlowca przy każdym zamówieniu', icon: 'globe' },
          { title: 'Daty ważności i FIFO pod kontrolą systemową', desc: 'Każdy produkt w systemie z datą ważności. Zbliża się termin? Alert — "użyj w daily special" albo "przeceń". Przeterminowane — system blokuje. Dashboard mówi, ile marnujesz miesięcznie i dlaczego. Pełna dokumentacja na wypadek kontroli sanitarnej.', outcome: 'FIFO pilnowane systemowo — mniej marnowania, czysty HACCP', icon: 'check-circle' },
        ],
      },
      {
        name: 'Obsługa gości i lojalność', icon: 'heart',
        ideas: [
          { title: 'Rezerwacje online z zarządzaniem stolikami', desc: 'Gość rezerwuje 24/7 — ze strony, Google\'a, social media. Potwierdzenie SMS, przypomnienie 2h przed, auto-anulacja po 15 minutach. System pokazuje widok sali z dostępnością. Kelner widzi notatki do rezerwacji ("urodziny, tort o 20:00").', outcome: 'Rezerwacje zarządzane systemowo — personel skupiony na gościach', icon: 'globe' },
          { title: 'Automatyczny system opinii i lojalności', desc: 'Po wizycie — SMS z pytaniem o ocenę. Wysoka? Prośba o recenzję Google. Niska? Alert do managera i voucher przeprosinowy. Program lojalnościowy: kupony na urodziny, nagrody po N-tym zakupie, reaktywacja klientów. Komunikacja działa sama — Ty ustawiasz reguły.', outcome: 'Reputacja i lojalność budowane systematycznie — nie kiedy ktoś pamiętał', icon: 'heart' },
          { title: 'Menu engineering — co zarabia, co traci', desc: 'Matryca popularność × marża dla każdego dania. System pokazuje: co warto promować (popularne i marżowe), co wycenić inaczej (popularne, ale nisko marżowe), co usunąć z karty (niepopularne i nisko marżowe). Decyzje o menu oparte na danych z kasy, nie na intuicji szefa kuchni.', outcome: 'Karta menu, która zarabia — bo wiesz, co na niej trzymać', icon: 'bar-chart' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     IT & SOFTWARE HOUSE
     ═══════════════════════════════════════ */
  {
    id: 'it',
    name: 'IT & Software House',
    subtitle: 'Software house, SaaS, wdrożenia',
    icon: 'code',
    color: '#6366f1',
    sections: [
      {
        name: 'Sprzedaż i wyceny', icon: 'trending-up',
        ideas: [
          { title: 'Pipeline z forecastem opartym na historii', desc: 'Każdy deal z prawdopodobieństwem zamknięcia — obliczonym z historii (branża, wielkość, etap, czas w pipeline). Dashboard prognozuje revenue na kwartał. Realistyczny obraz zamiast listy życzeń. Planowanie zasobów oparte na tym, co naprawdę się wydarzy.', outcome: 'Forecast, na którym można oprzeć decyzje o zatrudnieniu i alokacji', icon: 'bar-chart' },
          { title: 'Estymacja wsparta benchmarkami z poprzednich projektów', desc: 'Przed wyceną tech lead widzi: "podobny e-commerce robiliśmy 3 razy — średnio 1200h, rozrzut 900-1500h". System przeszukuje historię wycen i daje punkt odniesienia. Mniej sytuacji "nie wiedzieliśmy, że to tyle zajmie". Proposal z dobranymi case studies generuje się z danych.', outcome: 'Wyceny bliższe rzeczywistości — mniej bolesnych niespodzianek po obu stronach', icon: 'cpu' },
        ],
      },
      {
        name: 'Delivery, czas pracy i rozliczenia', icon: 'target',
        ideas: [
          { title: 'Resource board — kto jest wolny, kto kończy kiedy', desc: 'Dashboard alokacji: kto nad czym pracuje, kto kończy projekt, kto jest dostępny, kto ma gap. Planowanie przydziału z wyprzedzeniem — nie w panice dzień przed kickoffem nowego projektu.', outcome: 'Optymalna alokacja ludzi — mniej bench, mniej przepalonych deadline\'ów', icon: 'users' },
          { title: 'Czas z narzędzi projektowych, nie z timesheetów', desc: 'System zbiera dane: czas ticketów w Jira, spotkania z kalendarza, aktywność w Gicie. Raport per klient per developer generuje się sam. Sprint report dla klienta — kompilowany automatycznie, PM robi review. Developerzy kodzą, nie logują.', outcome: 'Dane o czasie dokładniejsze niż timesheet — i nikt ich nie "wypełnia"', icon: 'clock' },
          { title: 'Rentowność per projekt i automatyczne fakturowanie', desc: 'Czas pracy × koszt wewnętrzny developera vs. stawka kliencka = marża na bieżąco. Dashboard: który projekt zarabia, który jest pod wodą. Faktura T&M generowana z danych. Fixed price — per milestone z auto-triggerem. Koniec miesiąca = faktury gotowe.', outcome: 'Pełna widoczność marży i fakturowanie w dniu zamknięcia', icon: 'dollar-sign' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     MEDYCYNA & ZDROWIE
     ═══════════════════════════════════════ */
  {
    id: 'healthcare',
    name: 'Medycyna & Zdrowie',
    subtitle: 'Kliniki, gabinety, optyki, weterynaria',
    icon: 'activity',
    color: '#ef4444',
    sections: [
      {
        name: 'System rejestracji i obsługi pacjenta', icon: 'clock',
        ideas: [
          { title: 'Rezerwacja online z automatycznym przypominaniem', desc: 'Pacjent rezerwuje 24/7 przez stronę lub Google. Potwierdzenie SMS natychmiast, przypomnienie dzień przed i 2h przed. Opcja przełożenia jednym kliknięciem — bez dzwonienia. Check-in na tablecie w poczekalni — pacjent skanuje QR, potwierdza dane, system informuje lekarza. Rejestratorka zajmuje się trudniejszymi sprawami.', outcome: 'Pacjent rejestruje się sam — rejestratorka nie jest wąskim gardłem', icon: 'globe' },
          { title: 'Inteligentne planowanie harmonogramu', desc: 'Wizyty kontrolne 15 min, konsultacje 30 min, zabiegi 45 min — z buforem na opóźnienia. System zna specyfikę każdego lekarza. Pacjent widzi realistyczny czas wejścia. Choroba lekarza? System proponuje przesunięcia pacjentów.', outcome: 'Poczekalnia bez frustracji, gabinety wykorzystane optymalnie', icon: 'clock' },
        ],
      },
      {
        name: 'Dokumentacja i procesy kliniczne', icon: 'file-text',
        ideas: [
          { title: 'Wsparcie dokumentacji medycznej', desc: 'Lekarz prowadzi wizytę — system pomaga ustrukturyzować notatkę: objawy, diagnoza, zalecenia. E-recepta i e-skierowanie z automatycznym kodowaniem ICD-10 — lekarz zatwierdza, pacjent dostaje SMS z kodem. Wyniki badań z laboratorium trafiają do profilu pacjenta automatycznie — lekarz ma je przy ręce na następnej wizycie.', outcome: 'Lekarz leczy, dokumentacja nadąża — bez godziny pisania po zmianie', icon: 'cpu' },
          { title: 'Zunifikowany profil pacjenta', desc: 'Wizyty, wyniki badań, leki, alergie, skierowania — wszystko w jednym profilu, dostępnym z każdego gabinetu. Lekarz widzi pełen obraz przed wizytą. Pacjent nie jest listonoszem noszącym kartki między gabinetami.', outcome: 'Pełen kontekst przy każdej wizycie — lepsze decyzje kliniczne', icon: 'users' },
          { title: 'Portal pacjenta — wyniki, recepty, historia', desc: 'Pacjent loguje się do portalu: widzi historię wizyt, pobiera wyniki badań, sprawdza aktywne recepty, umawia się na kolejną wizytę. Nie dzwoni z pytaniem "czy wyniki już są?". Ma dostęp do swoich danych 24/7.', outcome: 'Pacjent samoobsługowy — mniej telefonów, wyższe zadowolenie', icon: 'globe' },
        ],
      },
      {
        name: 'Rozliczenia i organizacja placówki', icon: 'dollar-sign',
        ideas: [
          { title: 'Rozliczenia NFZ i monitoring kontraktu', desc: 'System rozpoznaje wykonane procedury z dokumentacji wizyty i proponuje kody rozliczeniowe NFZ. Lekarz zatwierdza. Sprawozdanie generuje się samo. Dashboard realizacji kontraktu: ile wykorzystane, ile zostało, jaki trend — żebyś mógł zarządzać limitem świadomie.', outcome: 'Sprawozdawczość NFZ bez dedykowanej osoby do kodowania', icon: 'bar-chart' },
          { title: 'Zarządzanie grafikami lekarzy i gabinetów', desc: 'Który lekarz w którym gabinecie, ile slotów prywatnych vs. NFZ, urlopy, szkolenia — w jednym widoku. Optymalne wykorzystanie czasu i przestrzeni. Nie zarządzasz tym na tablicy korkowej.', outcome: 'Gabinety i lekarze — optymalnie rozplanowani', icon: 'clock' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     HR & REKRUTACJA
     ═══════════════════════════════════════ */
  {
    id: 'hr',
    name: 'HR & Rekrutacja',
    subtitle: 'Agencje pracy, rekrutacja, kadry, benefity',
    icon: 'users',
    color: '#14b8a6',
    sections: [
      {
        name: 'System rekrutacyjny (ATS)', icon: 'search',
        ideas: [
          { title: 'Aplikacje przetwarzane i porównywane — nie czytane jedno po drugim', desc: 'CV wpada → system wyciąga kluczowe dane i porównuje z wymaganiami stanowiska. Rekruter widzi ranking dopasowania zamiast czytać 200 CV od deski do deski. Każdy kandydat widzi status swojej aplikacji w portalu — potwierdzenie, etap, feedback. Profesjonalne doświadczenie kandydata, nawet gdy nie dostanie pracy.', outcome: 'Szybszy screening, lepsze doświadczenie kandydata, silniejszy employer brand', icon: 'cpu' },
          { title: 'Automatyczne sekwencje sourcingowe', desc: 'Znalazłeś kandydata? System wysyła wiadomość. Brak odpowiedzi? Follow-up po 3 dniach. Kolejny po 7. Personalizowane, ludzkie treści — ale systematyczne. Recruiter ustawia kampanię raz, system pracuje. Stały napływ kandydatów bez ręcznego wysyłania wiadomości.', outcome: 'Sourcing jako ciągły proces — nie jednorazowa akcja', icon: 'mail' },
          { title: 'Panel klienta — zlecenia rekrutacyjne, kandydaci, statusy', desc: 'Klient agencji HR loguje się do panelu: składa zlecenie rekrutacyjne, widzi przedstawionych kandydatów, daje feedback, śledzi postęp. Cała komunikacja w jednym miejscu — nie w mailach, nie przez telefon. Klient czuje kontrolę, agencja ma porządek.', outcome: 'Klient obsługuje się przez panel — agencja pracuje, nie raportuje', icon: 'globe' },
        ],
      },
      {
        name: 'Obsługa pracowników tymczasowych', icon: 'users',
        ideas: [
          { title: 'Od umowy do pierwszego dnia pracy — systemowo', desc: 'Nowy pracownik → system generuje umowę, skierowanie na badania, BHP. Klient potwierdza. Podpis elektroniczny. Cały proces w systemie — nie w folderze na dysku. Ewidencja czasu pracy z potwierdzeniem przez klienta — obie strony widzą to samo. Naliczanie wynagrodzenia i faktura generują się automatycznie.', outcome: 'Obsadzenie stanowiska w godzinach — rozliczenie bez sporów', icon: 'file-text' },
          { title: 'Dashboard obłożenia i zapotrzebowania', desc: 'Ilu pracowników pracuje, ilu dostępnych, ilu potrzebnych w przyszłym tygodniu. Wiesz czy rekrutować, czy masz nadmiar. Klient zgłasza zapotrzebowanie — od razu widzisz, kto jest dostępny z odpowiednimi kwalifikacjami.', outcome: 'Zarządzanie zasobami ludzkimi w real-time — nie na oko', icon: 'bar-chart' },
        ],
      },
      {
        name: 'Portal pracownika i kadry', icon: 'dollar-sign',
        ideas: [
          { title: 'Self-service kadrowy — wnioski, zaświadczenia, paski', desc: 'Pracownik w apce: wniosek urlopowy (manager zatwierdza jednym kliknięciem), PIT-11, zaświadczenie o zatrudnieniu, pasek wynagrodzenia. Sam pobiera co potrzebuje. HR nie odpowiada na te same pytania każdego dnia.', outcome: 'Kadry zajmują się rozwojem ludzi, nie obsługą zapytań', icon: 'smartphone' },
          { title: 'Naliczanie wynagrodzeń z danych systemu', desc: 'RCP, urlopy, premie, potrącenia — system zbiera w jednym miejscu. Nalicza wynagrodzenia, generuje listę płac, plik do banku. Kadrowa weryfikuje i zatwierdza — nie liczy ręcznie składek dla 300 osób.', outcome: 'Naliczanie płac jako weryfikacja — nie ręczna praca', icon: 'dollar-sign' },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════
     EDUKACJA & SZKOLENIA
     ═══════════════════════════════════════ */
  {
    id: 'education',
    name: 'Edukacja & Szkolenia',
    subtitle: 'Szkoły, kursy, szkolenia specjalistyczne',
    icon: 'book-open',
    color: '#a855f7',
    sections: [
      {
        name: 'Platforma kursowa i sprzedaż wiedzy', icon: 'monitor',
        ideas: [
          { title: 'Platforma kursowa z automatyczną ścieżką i certyfikatem', desc: 'Uczeń kupuje kurs → dostaje dostęp → system prowadzi przez moduły. Quiz po każdym — nie przejdzie dalej bez zaliczenia. Po ukończeniu → certyfikat z unikalnym numerem, weryfikowalny online. Sprzedajesz kurs raz — skaluje się na dowolną liczbę osób bez dodatkowej pracy.', outcome: 'Edukacja, która się skaluje — bez ograniczenia liczbą trenerów', icon: 'award' },
          { title: 'Automatyczny funnel sprzedażowy dla kursów', desc: 'Landing page → płatność → natychmiastowy dostęp. Sekwencja email z materiałami. Po ukończeniu — oferta kursu zaawansowanego w niższej cenie. Cały funnel ustawiony raz — sprzedaje 24/7. Integracja z systemem płatności i fakturowania.', outcome: 'Przychód ze sprzedaży wiedzy bez ręcznej obsługi', icon: 'shopping-cart' },
        ],
      },
      {
        name: 'System zarządzania uczniami', icon: 'users',
        ideas: [
          { title: 'Zapisy online z automatyczną dokumentacją', desc: 'Formularz online → weryfikacja → umowa do podpisu elektronicznego → przypisanie do grupy → harmonogram i materiały. Bez papieru, bez wizyty w sekretariacie. System sam pilnuje płatności i wysyła przypomnienia. Powiadomienia o zmianach w harmonogramie — SMS/email, automatycznie.', outcome: 'Administracja zamknięta w kliknięciach — sekretariat odciążony', icon: 'globe' },
          { title: 'Dashboard frekwencji, postępów i zagrożeń', desc: 'Kto chodzi regularnie, kto odpada, kto nie radzi sobie z materiałem. Trzy nieobecności z rzędu? Alert do trenera. Interwencja zanim uczeń zrezygnuje. Raport per kurs, per trener, per grupa — widzisz, co działa.', outcome: 'Problemy łapane wcześnie — mniej rezygnacji, lepsze wyniki', icon: 'bar-chart' },
        ],
      },
      {
        name: 'Certyfikacja i uprawnienia', icon: 'shield',
        ideas: [
          { title: 'System egzaminacyjny z weryfikowalnymi certyfikatami', desc: 'Egzamin online z losowaniem pytań, timerem, zabezpieczeniami. Wynik natychmiast. Certyfikat z unikalnym numerem — pracodawca lub regulator weryfikuje ważność jednym kliknięciem (QR/link). Rejestr: kto zdał, kiedy, co wygasa. Automatyczne przypomnienia o odnowieniu.', outcome: 'Certyfikaty, które mają realną wartość — bo są weryfikowalne', icon: 'check-circle' },
          { title: 'Raportowanie do regulatorów z danych systemu', desc: 'SIO, UDT, ULC — raporty generowane z danych o kursantach, egzaminach i certyfikatach. Nie ręcznie z Excela — z danych, które już masz w systemie. Jedno kliknięcie zamiast godzin wypełniania arkuszy.', outcome: 'Raportowanie regulacyjne jako kliknięcie — nie projekt', icon: 'file-text' },
        ],
      },
    ],
  },
];
