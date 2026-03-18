import { motion } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

interface CaseStudy {
  id: string;
  problem: string;
  icon: string;
  color: string;
  industry: string;
  solution: string;
  desc: string;
  results: { label: string; value: string }[];
  tags: string[];
}

const cases: CaseStudy[] = [
  {
    id: 'slow-reporting',
    problem: 'Ręczne raportowanie finansowe zajmowało 3 dni',
    icon: 'dollar-sign',
    color: '#10b981',
    industry: 'Finanse',
    solution: 'Dashboard analityczny z raportami real-time',
    desc: 'Firma traciła 3 dni robocze co miesiąc na ręczne generowanie raportów. Wdrożyliśmy platformę z automatycznym zbieraniem danych, wizualizacją KPI i alertami. Raporty generują się w sekundach.',
    results: [
      { label: 'Czas raportowania', value: '3 dni → 10s' },
      { label: 'Oszczędność rocznie', value: '180k zł' },
      { label: 'Błędów w danych', value: '-95%' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'fleet-chaos',
    problem: 'Brak kontroli nad flotą 200 pojazdów',
    icon: 'truck',
    color: '#3b82f6',
    industry: 'Logistyka',
    solution: 'System śledzenia floty z optymalizacją tras',
    desc: 'Dyspozytor zarządzał flotą przez telefon i arkusze kalkulacyjne. Pojazdy jeździły nieoptymalnymi trasami, a klienci nie dostawali informacji o dostawach. Zbudowaliśmy system GPS z live-trackingiem i automatycznym planowaniem.',
    results: [
      { label: 'Koszty paliwa', value: '-28%' },
      { label: 'Terminowość', value: '72% → 97%' },
      { label: 'Wdrożenie', value: '3 miesiące' },
    ],
    tags: ['React', 'Python', 'Redis', 'IoT'],
  },
  {
    id: 'slow-shop',
    problem: 'Sklep ładował się 8 sekund — klienci odchodzili',
    icon: 'shopping-cart',
    color: '#f59e0b',
    industry: 'E-commerce',
    solution: 'Przebudowa na szybką architekturę mikroserwisową',
    desc: 'Monolit na przestarzałym frameworku nie dawał rady. Każda zmiana trwała tygodnie, a wolne ładowanie zabijało konwersję. Przepisaliśmy frontend i backend od zera z myślą o wydajności i skalowalności.',
    results: [
      { label: 'Czas ładowania', value: '8s → 0.8s' },
      { label: 'Konwersja', value: '+65%' },
      { label: 'Przychód', value: '+120%' },
    ],
    tags: ['Next.js', 'Go', 'Elasticsearch'],
  },
  {
    id: 'paper-hospital',
    problem: 'Szpital tonął w papierowej dokumentacji',
    icon: 'activity',
    color: '#ef4444',
    industry: 'Healthcare',
    solution: 'Cyfrowy obieg dokumentów z telemedycyną',
    desc: 'Kartoteki papierowe, ręczne umawianie wizyt, brak historii leczenia online. Wdrożyliśmy elektroniczną dokumentację medyczną, moduł teleporad wideo i system e-recept z integracją NFZ.',
    results: [
      { label: 'Czas rejestracji', value: '-70%' },
      { label: 'Teleporady/mies.', value: '4 000+' },
      { label: 'Satysfakcja', value: '4.8/5' },
    ],
    tags: ['React Native', 'Kotlin', 'FHIR'],
  },
  {
    id: 'excel-erp',
    problem: '15 działów pracowało na osobnych Excelach',
    icon: 'cloud',
    color: '#8b5cf6',
    industry: 'SaaS / ERP',
    solution: 'Jeden system ERP łączący wszystkie procesy',
    desc: 'Każdy dział miał własne arkusze — dane się rozsynchronizowały, nikt nie miał pełnego obrazu firmy. Zbudowaliśmy modułowy ERP z jednym źródłem prawdy: finanse, HR, magazyn i CRM w jednym miejscu.',
    results: [
      { label: 'Oszczędność czasu', value: '40h/tydzień' },
      { label: 'Błędy danych', value: '-90%' },
      { label: 'Uptime', value: '99.95%' },
    ],
    tags: ['Vue.js', '.NET', 'Azure SQL'],
  },
  {
    id: 'blind-factory',
    problem: 'Nieplanowane przestoje kosztowały miliony',
    icon: 'cpu',
    color: '#06b6d4',
    industry: 'Produkcja',
    solution: 'IoT monitoring z predykcją awarii przez AI',
    desc: 'Maszyny psuły się bez ostrzeżenia — każda godzina przestoju to 50k zł straty. Zainstalowaliśmy 800 czujników i model ML, który przewiduje awarie z 48h wyprzedzeniem.',
    results: [
      { label: 'Przestoje', value: '-60%' },
      { label: 'Czujników IoT', value: '800+' },
      { label: 'ROI', value: '14 miesięcy' },
    ],
    tags: ['React', 'Python', 'TensorFlow'],
  },
];

export function CaseStudies() {
  return (
    <div className="cs-grid">
      {cases.map((c, i) => (
        <motion.div className="cs-card" key={c.id}
          style={{ '--cs-c': c.color, '--cs-cl': `${c.color}15`, '--cs-cm': `${c.color}25` } as React.CSSProperties}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>

          <div className="cs-top">
            <div className="cs-ico">
              <Icon name={c.icon} size={16} strokeWidth={1.8} />
            </div>
            <span className="cs-industry">{c.industry}</span>
          </div>

          <h3 className="cs-problem">{c.problem}</h3>
          <p className="cs-solution">{c.solution}</p>
          <p className="cs-desc">{c.desc}</p>

          <div className="cs-results">
            {c.results.map(r => (
              <div className="cs-result" key={r.label}>
                <span className="cs-result-val">{r.value}</span>
                <span className="cs-result-label">{r.label}</span>
              </div>
            ))}
          </div>

          <div className="cs-tags">
            {c.tags.map(tag => (
              <span className="cs-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
