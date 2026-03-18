import { motion } from 'framer-motion';
import { Icon } from './Icon';
import './CaseStudies.css';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  icon: string;
  color: string;
  title: string;
  desc: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

const cases: CaseStudy[] = [
  {
    id: 'fintech-dashboard',
    client: 'Warsaw Tech',
    industry: 'Finanse',
    icon: 'dollar-sign',
    color: '#10b981',
    title: 'System analityki finansowej z dashboardem real-time',
    desc: 'Zaprojektowaliśmy i wdrożyliśmy platformę do monitorowania transakcji i raportowania w czasie rzeczywistym. System obsługuje 50k+ transakcji dziennie z pełną automatyzacją procesów KYC/AML.',
    metrics: [
      { label: 'Wzrost efektywności', value: '+340%' },
      { label: 'Czas wdrożenia', value: '4 mies.' },
      { label: 'Transakcji/dzień', value: '50k+' },
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
  },
  {
    id: 'logistics-platform',
    client: 'GreenEnergy',
    industry: 'Logistyka',
    icon: 'truck',
    color: '#3b82f6',
    title: 'Platforma zarządzania flotą i łańcuchem dostaw',
    desc: 'Kompleksowy system do śledzenia floty 200+ pojazdów, optymalizacji tras i zarządzania magazynami. Integracja z GPS, IoT oraz systemami celno-spedycyjnymi.',
    metrics: [
      { label: 'Redukcja kosztów', value: '-28%' },
      { label: 'Pojazdów w systemie', value: '200+' },
      { label: 'Punktualność dostaw', value: '97%' },
    ],
    tags: ['React', 'Python', 'Redis', 'IoT'],
  },
  {
    id: 'ecommerce-rebuild',
    client: 'ModaPolska',
    industry: 'E-commerce',
    icon: 'shopping-cart',
    color: '#f59e0b',
    title: 'Przebudowa platformy e-commerce z 10x wzrostem wydajności',
    desc: 'Migracja monolitycznego sklepu do architektury mikroserwisowej. Nowy frontend, system rekomendacji AI i omnichannel (web, mobile, kioski). Obsługa 100k użytkowników jednocześnie.',
    metrics: [
      { label: 'Konwersja', value: '+65%' },
      { label: 'Czas ładowania', value: '0.8s' },
      { label: 'Przychód roczny', value: '+120%' },
    ],
    tags: ['Next.js', 'Go', 'Elasticsearch', 'AWS'],
  },
  {
    id: 'healthcare-app',
    client: 'MediCare',
    industry: 'Healthcare',
    icon: 'activity',
    color: '#ef4444',
    title: 'Telemedycyna i system zarządzania szpitalem',
    desc: 'Platforma telemedyczna z wideokonferencjami, e-receptami i systemem zarządzania pacjentami. Integracja z NFZ i laboratoriami. RODO-compliant z pełnym audit trail.',
    metrics: [
      { label: 'Pacjentów/mies.', value: '12k+' },
      { label: 'Lekarzy w systemie', value: '350' },
      { label: 'Satysfakcja', value: '4.8/5' },
    ],
    tags: ['React Native', 'Kotlin', 'FHIR', 'Azure'],
  },
  {
    id: 'saas-erp',
    client: 'CloudSoft',
    industry: 'SaaS',
    icon: 'cloud',
    color: '#8b5cf6',
    title: 'System ERP jako usługa dla sektora MŚP',
    desc: 'Multi-tenant SaaS ERP z modułami: finanse, HR, magazyn, CRM. Architektura umożliwia obsługę 500+ firm z izolacją danych. API-first z 40+ integracjami.',
    metrics: [
      { label: 'Firm w systemie', value: '500+' },
      { label: 'Uptime SLA', value: '99.95%' },
      { label: 'Integracji API', value: '40+' },
    ],
    tags: ['Vue.js', '.NET', 'Azure SQL', 'Docker'],
  },
  {
    id: 'iot-manufacturing',
    client: 'ProdukcjaPL',
    industry: 'Produkcja',
    icon: 'cpu',
    color: '#06b6d4',
    title: 'IoT monitoring linii produkcyjnej z predykcją awarii',
    desc: 'System zbierania danych z 800+ czujników, dashboard OEE w real-time oraz model ML przewidujący awarie z 48h wyprzedzeniem. Redukcja przestojów o 60%.',
    metrics: [
      { label: 'Czujników IoT', value: '800+' },
      { label: 'Mniej przestojów', value: '-60%' },
      { label: 'ROI', value: '14 mies.' },
    ],
    tags: ['React', 'Python', 'TensorFlow', 'MQTT'],
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

          {/* Header — industry + client */}
          <div className="cs-top">
            <div className="cs-ico">
              <Icon name={c.icon} size={16} strokeWidth={1.8} />
            </div>
            <div className="cs-meta">
              <span className="cs-client">{c.client}</span>
              <span className="cs-industry">{c.industry}</span>
            </div>
          </div>

          {/* Title + desc */}
          <h3 className="cs-title">{c.title}</h3>
          <p className="cs-desc">{c.desc}</p>

          {/* Metrics */}
          <div className="cs-metrics">
            {c.metrics.map(m => (
              <div className="cs-metric" key={m.label}>
                <span className="cs-metric-val">{m.value}</span>
                <span className="cs-metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
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
