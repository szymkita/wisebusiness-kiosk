import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

interface BeforeAfterItem {
  label: string;
  before: string;
  after: string;
}

interface CaseStudy {
  id: string;
  industry: string;
  industryTag: string;
  color: string;
  icon: string;
  headline: string;
  context: string;
  beforeState: string;
  afterState: string;
  heroMetric: { value: string; unit: string; label: string };
  comparison: BeforeAfterItem[];
  quote: string;
  quoteRole: string;
  tags: string[];
}

const cases: CaseStudy[] = [
  {
    id: 'production-iot',
    industry: 'Produkcja',
    industryTag: 'produkcja',
    color: '#06b6d4',
    icon: 'cpu',
    headline: 'Linia produkcyjna, która sama zgłasza problemy',
    context: 'Zakład produkcyjny, 3 zmiany, 12 linii. Awarie wykrywane dopiero gdy maszyna stawała.',
    beforeState: 'Operator dzwoni do serwisu. Serwisant szuka dokumentacji. Części zamawiane ad hoc. Średni czas naprawy: 4.5h. Każda godzina przestoju to utracona produkcja.',
    afterState: 'System IoT monitoruje 800+ czujników w real-time. AI przewiduje awarie 48h wcześniej. Części zamówione zanim maszyna stanie. Zlecenia serwisowe generują się automatycznie.',
    heroMetric: { value: '4.5h', unit: '→ 35min', label: 'czas reakcji na awarię' },
    comparison: [
      { label: 'Wykrycie problemu', before: 'Po fakcie', after: 'Predykcja 48h' },
      { label: 'Raport zmianowy', before: '45 min ręcznie', after: 'Auto, real-time' },
      { label: 'Planowanie serwisu', before: 'Reaktywne', after: 'Predykcyjne' },
    ],
    quote: 'Maszyny mówią nam co się psuje, zanim się zepsują.',
    quoteRole: 'Kierownik Utrzymania Ruchu',
    tags: ['IoT', 'MQTT', 'TensorFlow', 'React', 'InfluxDB'],
  },
  {
    id: 'logistics-fleet',
    industry: 'Transport & Logistyka',
    industryTag: 'logistyka',
    color: '#3b82f6',
    icon: 'truck',
    headline: 'Dyspozytor, który nie dzwoni — bo system wie więcej',
    context: 'Firma transportowa, 200+ pojazdów, 15 dyspozytorów. Planowanie tras w Excelu i na telefon.',
    beforeState: 'Dyspozytor spędza 3h dziennie na telefonach z kierowcami. Trasy planowane ręcznie. Klient pyta "gdzie moja paczka?" — nikt nie wie. Dokumenty CMR wypełniane ręcznie.',
    afterState: 'Live-tracking każdego pojazdu. Trasy optymalizowane algorytmicznie. Klient ma link do śledzenia. CMR generowane automatycznie. Dyspozytor zarządza wyjątkami, nie rutyną.',
    heroMetric: { value: '3h', unit: '→ 20min', label: 'dzienna praca dyspozytora na rutynę' },
    comparison: [
      { label: 'Planowanie trasy', before: '40 min / trasa', after: '90 sekund' },
      { label: 'Odpowiedź klientowi', before: 'Telefon + szukanie', after: 'Link w SMS' },
      { label: 'Dokumenty CMR', before: 'Ręcznie, papier', after: 'Auto-generowane' },
    ],
    quote: 'Kiedyś 15 osób nie nadążało. Dziś 6 zarządza większą flotą.',
    quoteRole: 'Dyrektor Operacyjny',
    tags: ['React', 'Python', 'Redis', 'MapBox', 'WebSocket'],
  },
  {
    id: 'ecommerce-orders',
    industry: 'E-commerce & Handel',
    industryTag: 'e-commerce',
    color: '#f59e0b',
    icon: 'shopping-cart',
    headline: 'Od zamówienia do wysyłki bez jednego kliknięcia',
    context: 'Sklep online, 2000+ zamówień/dzień, 4 magazyny. Obsługa zamówień wymagała 12 osób na pełen etat.',
    beforeState: 'Zamówienie wpada → ktoś ręcznie sprawdza stan → ktoś inny przypisuje magazyn → ktoś pakuje i drukuje etykietę. Średni czas realizacji: 6h. Pomyłki w 8% zamówień.',
    afterState: 'Zamówienie wpada → system automatycznie weryfikuje płatność, dobiera najbliższy magazyn, generuje listę kompletacji i etykietę kurierską. Człowiek tylko pakuje.',
    heroMetric: { value: '6h', unit: '→ 12min', label: 'od zamówienia do gotowości wysyłki' },
    comparison: [
      { label: 'Obsługa zamówienia', before: '4 osoby, 6h', after: '1 osoba, 12min' },
      { label: 'Błędy kompletacji', before: '8% zamówień', after: '0.3%' },
      { label: 'Synchronizacja stanów', before: '2x dziennie', after: 'Real-time' },
    ],
    quote: 'Przy Black Friday zrobiliśmy 8x wolumen bez jednego dodatkowego etatu.',
    quoteRole: 'Head of Operations',
    tags: ['Next.js', 'Go', 'PostgreSQL', 'AWS', 'Kafka'],
  },
  {
    id: 'professional-services',
    industry: 'Usługi profesjonalne',
    industryTag: 'usługi',
    color: '#8b5cf6',
    icon: 'briefcase',
    headline: 'Kancelaria, w której akta same pilnują terminów',
    context: 'Kancelaria prawna, 30+ prawników, 800+ aktywnych spraw. Terminy i dokumenty zarządzane w folderach i Excelu.',
    beforeState: 'Prawnik spędza 1.5h dziennie na szukaniu dokumentów, sprawdzaniu terminów, pisaniu pism procesowych od zera. Ryzyko przegapienia terminu sądowego — realne i kosztowne.',
    afterState: 'System sam pilnuje terminów i eskaluje zagrożenia. Szablony pism z auto-uzupełnianiem danych klienta. Pełna historia sprawy w jednym miejscu. Wyszukiwanie precedensów w sekundach.',
    heroMetric: { value: '1.5h', unit: '→ 15min', label: 'dzienny czas na administrację sprawy' },
    comparison: [
      { label: 'Znalezienie dokumentu', before: '12 min średnio', after: '8 sekund' },
      { label: 'Przygotowanie pisma', before: '2h od zera', after: '20 min z szablonu' },
      { label: 'Kontrola terminów', before: 'Ręczna, Excel', after: 'Auto + alerty' },
    ],
    quote: 'Pierwszy miesiąc bez przeoczonego terminu. Pierwszy raz w 15 lat.',
    quoteRole: 'Partner Zarządzający',
    tags: ['React', '.NET', 'Azure', 'Elasticsearch', 'OCR'],
  },
  {
    id: 'agency-delivery',
    industry: 'Agencje & Software House',
    industryTag: 'agencje',
    color: '#ef4444',
    icon: 'code',
    headline: 'Pipeline projektowy, który nie wymaga project managera do statusów',
    context: 'Software house, 80+ developerów, 25 aktywnych projektów. PM-owie spędzali więcej czasu na statusach niż na dostarczaniu wartości.',
    beforeState: 'Statusy zbierane ręcznie na standupach. Timesheet wypełniany z pamięci w piątek. Klient pyta o progress — PM szuka po Slacku i Jirze. Alokacja ludzi do projektów: "kto jest wolny?".',
    afterState: 'Dashboard w real-time z progress każdego projektu. Automatyczne alerty o ryzyku przekroczenia budżetu/deadline. Alokacja oparta o dane — skills, dostępność, historyczna velocity.',
    heroMetric: { value: '8h', unit: '→ 45min', label: 'tygodniowy czas PM na raportowanie' },
    comparison: [
      { label: 'Status projektu', before: 'Standup + Slack', after: 'Dashboard live' },
      { label: 'Raport dla klienta', before: '2h kompilowania', after: '1 klik, auto' },
      { label: 'Alokacja zespołu', before: '"Kto jest wolny?"', after: 'Data-driven' },
    ],
    quote: 'PM-owie wreszcie robią to, do czego ich zatrudniliśmy — zarządzają relacją z klientem, a nie Excelem.',
    quoteRole: 'CEO Software House',
    tags: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'finance-reconciliation',
    industry: 'Finanse & Księgowość',
    industryTag: 'finanse',
    color: '#10b981',
    icon: 'dollar-sign',
    headline: 'Zamknięcie miesiąca w godziny, nie w dni',
    context: 'Biuro rachunkowe obsługujące 200+ klientów. Zamknięcie miesiąca to wyścig z czasem — i zawsze w tym samym momencie.',
    beforeState: 'Zbieranie faktur od klientów: mail, WhatsApp, kurier, skan. Ręczne przepisywanie do systemu. Uzgadnianie danych między systemami zajmuje 3 dni. Sezon podatkowy = praca po nocach.',
    afterState: 'Klienci wrzucają dokumenty do portalu lub wysyłają mailem — OCR + AI rozpoznaje i księguje automatycznie. Uzgodnienia międzysystemowe w minutach. Alerty o brakujących dokumentach.',
    heroMetric: { value: '3 dni', unit: '→ 4h', label: 'czas zamknięcia miesiąca na klienta' },
    comparison: [
      { label: 'Wprowadzanie faktury', before: '3 min / sztuka', after: '15 sek (auto)' },
      { label: 'Uzgodnienie danych', before: '3 dni', after: '20 minut' },
      { label: 'Zbieranie dokumentów', before: 'Telefony + maile', after: 'Portal + auto-remind' },
    ],
    quote: 'W sezonie podatkowym pierwszy raz w 10 lat skończyliśmy przed deadline.',
    quoteRole: 'Właściciel Biura Rachunkowego',
    tags: ['React', 'Python', 'OCR', 'PostgreSQL', 'GPT-4'],
  },
];

const industries = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'produkcja', label: 'Produkcja' },
  { id: 'logistyka', label: 'Logistyka' },
  { id: 'e-commerce', label: 'E-commerce' },
  { id: 'usługi', label: 'Usługi' },
  { id: 'agencje', label: 'Agencje & IT' },
  { id: 'finanse', label: 'Finanse' },
];

const AUTO_ADVANCE_MS = 12000;

export function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const filtered = activeFilter === 'all'
    ? cases
    : cases.filter(c => c.industryTag === activeFilter);

  const current = filtered[activeIndex] || filtered[0];

  // Reset index when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Auto-advance
  useEffect(() => {
    if (paused || filtered.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % filtered.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, filtered.length, activeFilter]);

  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 20000);
  }, []);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + filtered.length) % filtered.length);
  }, [activeIndex, filtered.length, goTo]);

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % filtered.length);
  }, [activeIndex, filtered.length, goTo]);

  if (!current) return null;

  return (
    <div className="cs2">
      {/* Industry filter pills */}
      <div className="cs2-filters">
        {industries.map(ind => (
          <button
            key={ind.id}
            className={`cs2-filter ${activeFilter === ind.id ? 'cs2-filter--active' : ''}`}
            onClick={() => setActiveFilter(ind.id)}
          >
            {ind.label}
          </button>
        ))}
      </div>

      {/* Main card */}
      <div className="cs2-stage">
        <AnimatePresence mode="wait">
          <motion.div
            className="cs2-card"
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ '--cs2-c': current.color, '--cs2-cl': `${current.color}14`, '--cs2-cm': `${current.color}30` } as React.CSSProperties}
          >
            {/* Card header */}
            <div className="cs2-card-header">
              <div className="cs2-card-badge">
                <div className="cs2-card-icon">
                  <Icon name={current.icon} size={18} strokeWidth={1.8} />
                </div>
                <span className="cs2-card-industry">{current.industry}</span>
              </div>
              <h2 className="cs2-card-headline">{current.headline}</h2>
              <p className="cs2-card-context">{current.context}</p>
            </div>

            {/* Main content area: before/after split + hero metric */}
            <div className="cs2-card-body">
              {/* BEFORE column */}
              <div className="cs2-col cs2-col--before">
                <div className="cs2-col-label">
                  <div className="cs2-col-dot cs2-col-dot--before" />
                  Przed
                </div>
                <p className="cs2-col-text">{current.beforeState}</p>
                <div className="cs2-comparisons">
                  {current.comparison.map((c, i) => (
                    <div className="cs2-comp" key={i}>
                      <span className="cs2-comp-label">{c.label}</span>
                      <span className="cs2-comp-val cs2-comp-val--before">{c.before}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* HERO METRIC — center divider */}
              <div className="cs2-hero">
                <div className="cs2-hero-line" />
                <div className="cs2-hero-metric">
                  <span className="cs2-hero-value">{current.heroMetric.value}</span>
                  <span className="cs2-hero-arrow">
                    <Icon name="arrow-up-right" size={14} strokeWidth={2.5} />
                  </span>
                  <span className="cs2-hero-after">{current.heroMetric.unit}</span>
                </div>
                <span className="cs2-hero-label">{current.heroMetric.label}</span>
                <div className="cs2-hero-line" />
              </div>

              {/* AFTER column */}
              <div className="cs2-col cs2-col--after">
                <div className="cs2-col-label">
                  <div className="cs2-col-dot cs2-col-dot--after" />
                  Po wdrożeniu
                </div>
                <p className="cs2-col-text">{current.afterState}</p>
                <div className="cs2-comparisons">
                  {current.comparison.map((c, i) => (
                    <div className="cs2-comp" key={i}>
                      <span className="cs2-comp-label">{c.label}</span>
                      <span className="cs2-comp-val cs2-comp-val--after">{c.after}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: quote + tags */}
            <div className="cs2-card-footer">
              <div className="cs2-quote">
                <span className="cs2-quote-mark">"</span>
                <p className="cs2-quote-text">{current.quote}</p>
                <span className="cs2-quote-role">— {current.quoteRole}</span>
              </div>
              <div className="cs2-tags">
                {current.tags.map(tag => (
                  <span className="cs2-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="cs2-nav">
        <button className="cs2-nav-arrow" onClick={goPrev} aria-label="Poprzedni">
          <Icon name="chevron-left" size={18} strokeWidth={2} />
        </button>

        <div className="cs2-dots">
          {filtered.map((c, i) => (
            <button
              key={c.id}
              className={`cs2-dot ${i === activeIndex ? 'cs2-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={c.industry}
            >
              <div
                className="cs2-dot-progress"
                style={{
                  background: c.color,
                  animationDuration: `${AUTO_ADVANCE_MS}ms`,
                  animationPlayState: i === activeIndex && !paused ? 'running' : 'paused',
                  transform: i === activeIndex ? undefined : 'scaleX(0)',
                }}
              />
            </button>
          ))}
        </div>

        <button className="cs2-nav-arrow" onClick={goNext} aria-label="Następny">
          <Icon name="chevron-right" size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
