import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

interface CaseStudy {
  id: string;
  problem: string;
  icon: string;
  color: string;
  industry: string;
  solution: string;
  shortDesc: string;
  fullDesc: string[];
  results: { label: string; value: string }[];
  tags: string[];
  timeline: { phase: string; desc: string }[];
  chartData: number[];
}

const cases: CaseStudy[] = [
  {
    id: 'slow-reporting',
    problem: 'Ręczne raportowanie finansowe zajmowało 3 dni',
    icon: 'dollar-sign',
    color: '#10b981',
    industry: 'Finanse',
    solution: 'Dashboard analityczny z raportami real-time',
    shortDesc: 'Automatyzacja raportów finansowych — z 3 dni do 10 sekund',
    fullDesc: [
      'Dział finansowy co miesiąc spędzał 3 pełne dni robocze na ręcznym zbieraniu danych z 8 różnych systemów, konsolidacji w Excelu i generowaniu raportów dla zarządu.',
      'Wdrożyliśmy platformę z automatycznym pobieraniem danych przez API, wizualizacją KPI w real-time i systemem alertów. Raporty generują się na żądanie w sekundach.',
      'System integruje się z bankowością, systemem fakturowym i CRM. Dashboard dostępny na desktopie i tablecie z pełnym RBAC.',
    ],
    results: [
      { label: 'Czas raportowania', value: '3 dni → 10s' },
      { label: 'Oszczędność/rok', value: '180k zł' },
      { label: 'Błędy w danych', value: '-95%' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'Docker'],
    timeline: [
      { phase: 'Analiza', desc: 'Audyt procesów i mapowanie źródeł danych' },
      { phase: 'MVP', desc: 'Prototyp dashboardu z 3 głównymi raportami' },
      { phase: 'Integracje', desc: 'Podłączenie bankowości, faktur, CRM' },
      { phase: 'Wdrożenie', desc: 'Szkolenie zespołu i go-live' },
    ],
    chartData: [100, 100, 100, 85, 42, 18, 8, 3, 1, 1, 1, 1],
  },
  {
    id: 'fleet-chaos',
    problem: 'Brak kontroli nad flotą 200 pojazdów',
    icon: 'truck',
    color: '#3b82f6',
    industry: 'Logistyka',
    solution: 'System śledzenia floty z optymalizacją tras',
    shortDesc: 'GPS tracking + optymalizacja tras — terminowość z 72% do 97%',
    fullDesc: [
      'Dyspozytor zarządzał 200 pojazdami przez telefon i arkusze kalkulacyjne. Brak danych o pozycji, paliwie i stanie technicznym. Klienci nie dostawali informacji o statusie dostaw.',
      'Zbudowaliśmy system GPS z live-trackingiem, automatyczną optymalizacją tras i powiadomieniami dla klientów. Dashboard dyspozytora z widokiem mapy i statusami w real-time.',
      'Integracja z systemem celno-spedycyjnym i automatyczne generowanie CMR. Moduł serwisowy pilnuje przeglądów technicznych.',
    ],
    results: [
      { label: 'Koszty paliwa', value: '-28%' },
      { label: 'Terminowość', value: '72→97%' },
      { label: 'Czas planowania', value: '-65%' },
    ],
    tags: ['React', 'Python', 'Redis', 'IoT', 'MapBox'],
    timeline: [
      { phase: 'Analiza', desc: 'Mapowanie procesów logistycznych' },
      { phase: 'Tracking', desc: 'System GPS i mapa live' },
      { phase: 'Optymalizacja', desc: 'Algorytm planowania tras' },
      { phase: 'Klient', desc: 'Portal śledzenia dla odbiorców' },
    ],
    chartData: [72, 74, 76, 79, 82, 86, 89, 91, 93, 95, 96, 97],
  },
  {
    id: 'slow-shop',
    problem: 'Sklep ładował się 8 sekund — klienci odchodzili',
    icon: 'shopping-cart',
    color: '#f59e0b',
    industry: 'E-commerce',
    solution: 'Przebudowa na szybką architekturę mikroserwisową',
    shortDesc: 'Czas ładowania 8s → 0.8s — konwersja +65%, przychód +120%',
    fullDesc: [
      'Monolit na przestarzałym frameworku nie dawał rady. Każda zmiana trwała tygodnie, deployment kładł sklep na godziny. Wolne ładowanie zabijało konwersję — bounce rate 73%.',
      'Przepisaliśmy frontend na Next.js z SSR i edge caching. Backend podzielony na mikroserwisy z dedykowanym search engine. CDN dla statycznych zasobów.',
      'Dodaliśmy system rekomendacji AI, szybki checkout i omnichannel (web, mobile, kioski). System obsługuje 100k jednoczesnych użytkowników bez degradacji.',
    ],
    results: [
      { label: 'Czas ładowania', value: '8s → 0.8s' },
      { label: 'Konwersja', value: '+65%' },
      { label: 'Przychód', value: '+120%' },
    ],
    tags: ['Next.js', 'Go', 'Elasticsearch', 'AWS', 'Redis'],
    timeline: [
      { phase: 'Audyt', desc: 'Analiza wydajności i bottlenecków' },
      { phase: 'Frontend', desc: 'Nowy SSR frontend z edge caching' },
      { phase: 'Backend', desc: 'Mikroserwisy + search engine' },
      { phase: 'AI', desc: 'System rekomendacji i personalizacji' },
    ],
    chartData: [8.0, 7.2, 5.4, 3.8, 2.6, 1.9, 1.4, 1.1, 0.9, 0.85, 0.82, 0.8],
  },
  {
    id: 'paper-hospital',
    problem: 'Szpital tonął w papierowej dokumentacji',
    icon: 'activity',
    color: '#ef4444',
    industry: 'Healthcare',
    solution: 'Cyfrowy obieg dokumentów z telemedycyną',
    shortDesc: 'Elektroniczna dokumentacja + teleporady — 4000+ wizyt online/mies.',
    fullDesc: [
      'Kartoteki papierowe, ręczne umawianie wizyt przez telefon, brak historii leczenia online. Lekarze tracili czas na szukanie dokumentów, pacjenci czekali godzinami na rejestrację.',
      'Wdrożyliśmy elektroniczną dokumentację medyczną z pełnym RODO compliance i audit trail. Moduł teleporad z wideokonferencjami, e-recepty i e-skierowania.',
      'Integracja z NFZ (eWUŚ), laboratoriami i aptekami. Pacjenci mają portal z historią leczenia, wynikami i możliwością umawiania wizyt online.',
    ],
    results: [
      { label: 'Czas rejestracji', value: '-70%' },
      { label: 'Teleporady/mies.', value: '4 000+' },
      { label: 'Satysfakcja', value: '4.8/5' },
    ],
    tags: ['React Native', 'Kotlin', 'FHIR', 'Azure', 'WebRTC'],
    timeline: [
      { phase: 'Analiza', desc: 'Audyt procesów i wymogów prawnych' },
      { phase: 'EDM', desc: 'Elektroniczna dokumentacja medyczna' },
      { phase: 'Teleporady', desc: 'Wideokonferencje i e-recepty' },
      { phase: 'Portal', desc: 'Samoobsługa dla pacjentów' },
    ],
    chartData: [0, 120, 380, 720, 1200, 1800, 2400, 2900, 3300, 3600, 3850, 4000],
  },
  {
    id: 'excel-erp',
    problem: '15 działów pracowało na osobnych Excelach',
    icon: 'cloud',
    color: '#8b5cf6',
    industry: 'SaaS / ERP',
    solution: 'Jeden system ERP łączący wszystkie procesy',
    shortDesc: 'Jedno źródło prawdy zamiast 15 Exceli — oszczędność 40h/tydzień',
    fullDesc: [
      'Każdy z 15 działów miał własne arkusze. Dane rozsynchronizowane, raporty się nie zgadzały, nikt nie miał pełnego obrazu firmy. Onboarding nowego pracownika trwał tydzień.',
      'Zbudowaliśmy modułowy ERP z jednym źródłem prawdy. Moduły: finanse, HR, magazyn, CRM, projekty. Wszystko połączone, dane aktualizują się w real-time.',
      'System multi-tenant — architektura pozwoliła później oferować go jako SaaS dla innych firm z sektora MŚP. API-first z 40+ gotowymi integracjami.',
    ],
    results: [
      { label: 'Oszczędność', value: '40h/tyg.' },
      { label: 'Błędy danych', value: '-90%' },
      { label: 'Uptime', value: '99.95%' },
    ],
    tags: ['Vue.js', '.NET', 'Azure SQL', 'Docker', 'GraphQL'],
    timeline: [
      { phase: 'Discovery', desc: 'Mapowanie procesów 15 działów' },
      { phase: 'Core', desc: 'Finanse, HR i podstawowy CRM' },
      { phase: 'Magazyn', desc: 'Zarządzanie stanami i zamówieniami' },
      { phase: 'SaaS', desc: 'Multi-tenant i marketplace integracji' },
    ],
    chartData: [15, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1, 1],
  },
  {
    id: 'blind-factory',
    problem: 'Nieplanowane przestoje kosztowały miliony',
    icon: 'cpu',
    color: '#06b6d4',
    industry: 'Produkcja',
    solution: 'IoT monitoring z predykcją awarii przez AI',
    shortDesc: '800 czujników + model ML — przestoje -60%, ROI w 14 miesięcy',
    fullDesc: [
      'Maszyny psuły się bez ostrzeżenia — każda godzina nieplanowanego przestoju to 50k zł strat. Serwisanci reagowali, zamiast zapobiegać. Brak danych o stanie maszyn.',
      'Zainstalowaliśmy 800+ czujników (wibracje, temperatura, ciśnienie) z transmisją MQTT. Dashboard OEE w real-time dla operatorów i managementu.',
      'Model ML analizuje wzorce degradacji i przewiduje awarie z 48h wyprzedzeniem. Automatyczne zlecenia serwisowe i zamówienia części zamiennych.',
    ],
    results: [
      { label: 'Przestoje', value: '-60%' },
      { label: 'Czujników', value: '800+' },
      { label: 'ROI', value: '14 mies.' },
    ],
    tags: ['React', 'Python', 'TensorFlow', 'MQTT', 'InfluxDB'],
    timeline: [
      { phase: 'Sensory', desc: 'Instalacja 800+ czujników IoT' },
      { phase: 'Dashboard', desc: 'Monitoring OEE w real-time' },
      { phase: 'ML', desc: 'Model predykcji awarii' },
      { phase: 'Automatyzacja', desc: 'Auto-zlecenia serwisowe' },
    ],
    chartData: [100, 95, 88, 78, 68, 60, 55, 50, 46, 43, 41, 40],
  },
];

export function CaseStudies() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = cases.find(c => c.id === selected);

  return (
    <div className="cs">
      <AnimatePresence mode="wait">
        {current ? (
          <motion.div className="cs-detail" key={current.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ '--cs-c': current.color, '--cs-cl': `${current.color}12`, '--cs-cm': `${current.color}25` } as React.CSSProperties}>

            {/* Back button */}
            <button className="cs-back" onClick={() => setSelected(null)}>
              <Icon name="arrow-left" size={16} strokeWidth={2} />
              Wszystkie case studies
            </button>

            <div className="cs-detail-grid">
              {/* Left — content */}
              <div className="cs-detail-left">
                <div className="cs-detail-head">
                  <div className="cs-detail-ico">
                    <Icon name={current.icon} size={20} strokeWidth={1.8} />
                  </div>
                  <span className="cs-detail-industry">{current.industry}</span>
                </div>

                <h2 className="cs-detail-problem">{current.problem}</h2>
                <p className="cs-detail-solution">{current.solution}</p>

                <div className="cs-detail-text">
                  {current.fullDesc.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="cs-detail-tags">
                  {current.tags.map(tag => (
                    <span className="cs-dtag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right — metrics, chart, timeline */}
              <div className="cs-detail-right">
                {/* Results */}
                <div className="cs-detail-results">
                  {current.results.map(r => (
                    <div className="cs-dresult" key={r.label}>
                      <span className="cs-dresult-val">{r.value}</span>
                      <span className="cs-dresult-label">{r.label}</span>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="cs-detail-chart">
                  <span className="cs-chart-title">Progres w czasie</span>
                  <div className="cs-chart-bars">
                    {current.chartData.map((v, i) => {
                      const max = Math.max(...current.chartData);
                      return (
                        <div key={i} className="cs-chart-bar"
                          style={{ height: `${(v / max) * 100}%`, background: current.color, opacity: 0.4 + (i / current.chartData.length) * 0.6 }}>
                          <span>{['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'][i]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline */}
                <div className="cs-detail-timeline">
                  <span className="cs-timeline-title">Etapy projektu</span>
                  {current.timeline.map((step, i) => (
                    <div className="cs-tstep" key={i}>
                      <div className="cs-tstep-dot" />
                      <div className="cs-tstep-body">
                        <span className="cs-tstep-phase">{step.phase}</span>
                        <span className="cs-tstep-desc">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div className="cs-grid" key="grid"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            {cases.map((c, i) => (
              <motion.button className="cs-card" key={c.id}
                style={{ '--cs-c': c.color, '--cs-cl': `${c.color}12`, '--cs-cm': `${c.color}25` } as React.CSSProperties}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(c.id)}>

                <div className="cs-card-gradient" />

                <div className="cs-card-top">
                  <div className="cs-card-ico">
                    <Icon name={c.icon} size={18} strokeWidth={1.8} />
                  </div>
                  <span className="cs-card-industry">{c.industry}</span>
                </div>

                <div className="cs-card-body">
                  <h3 className="cs-card-problem">{c.problem}</h3>
                  <p className="cs-card-hint">{c.shortDesc}</p>
                </div>

                <div className="cs-card-results">
                  {c.results.map(r => (
                    <div className="cs-card-result" key={r.label}>
                      <span className="cs-card-rval">{r.value}</span>
                      <span className="cs-card-rlabel">{r.label}</span>
                    </div>
                  ))}
                </div>

                <span className="cs-card-open">
                  Czytaj dalej <Icon name="arrow-up-right" size={12} strokeWidth={2.5} />
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
