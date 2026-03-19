import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { tabs } from '../data/tiles';
import './SoftwarePanel.css';

const softwareTiles = tabs.find(t => t.id === 'software')!.tiles;

/* ── Mockup variants keyed by demoId ── */

function MockupOps() {
  return (
    <>
      <div className="sw-mock-chrome">
        <div className="sw-mock-dots"><span /><span /><span /></div>
        <div className="sw-mock-tab">Centrum operacyjne — WisePlatform</div>
      </div>
      <div className="sw-mock-app">
        <div className="sw-mock-sidebar">
          <div className="sw-mock-sidebar-logo">
            <div className="sw-mock-logo-circle" />
            <div className="sw-mock-logo-text" />
          </div>
          <div className="sw-mock-nav">
            {['Przegląd', 'Procesy', 'Zespół', 'Klienci', 'Raporty', 'Ustawienia'].map((label, i) => (
              <div key={label} className={`sw-mock-nav-item ${i === 0 ? 'active' : ''}`}>
                <div className="sw-mock-nav-icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="sw-mock-sidebar-footer">
            <div className="sw-mock-avatar" />
            <div className="sw-mock-user-info">
              <div className="sw-mock-user-name" />
              <div className="sw-mock-user-role" />
            </div>
          </div>
        </div>

        <div className="sw-mock-main">
          <div className="sw-mock-topbar">
            <div className="sw-mock-breadcrumb">
              <span className="sw-mock-bc-dim">WisePlatform</span>
              <span className="sw-mock-bc-sep">/</span>
              <span>Przegląd operacyjny</span>
            </div>
            <div className="sw-mock-topbar-actions">
              <div className="sw-mock-search-bar">
                <Icon name="search" size={10} strokeWidth={2} />
                <span>Szukaj...</span>
              </div>
              <div className="sw-mock-notif-dot" />
            </div>
          </div>

          <div className="sw-mock-stats">
            {[
              { label: 'Aktywne procesy', value: '83', change: '+7', up: true },
              { label: 'Zamknięte dziś', value: '24', change: '+31%', up: true },
              { label: 'Średni czas', value: '2.4h', change: '-18%', up: true },
              { label: 'Wąskie gardła', value: '3', change: '+1', up: false },
            ].map((stat) => (
              <div key={stat.label} className="sw-mock-stat">
                <div className="sw-mock-stat-label">{stat.label}</div>
                <div className="sw-mock-stat-row">
                  <span className="sw-mock-stat-value">{stat.value}</span>
                  <span className={`sw-mock-stat-change ${stat.up ? 'up' : 'down'}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sw-mock-content">
            <div className="sw-mock-chart-card">
              <div className="sw-mock-chart-header">
                <span className="sw-mock-chart-title">Przepustowość procesów</span>
                <div className="sw-mock-chart-tabs">
                  <span className="active">Dziś</span>
                  <span>Tydzień</span>
                  <span>Miesiąc</span>
                </div>
              </div>
              <div className="sw-mock-chart">
                <svg viewBox="0 0 320 100" className="sw-mock-chart-svg">
                  {[20, 40, 60, 80].map(y => (
                    <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#f0f0ee" strokeWidth="0.5" />
                  ))}
                  <path d="M0,80 Q30,72 60,65 T120,50 T180,42 T240,38 T320,25" fill="none" stroke="#10b981" strokeWidth="2" />
                  <path d="M0,80 Q30,72 60,65 T120,50 T180,42 T240,38 T320,25 V100 H0 Z" fill="url(#grad-ops)" />
                  <path d="M0,75 Q30,70 60,68 T120,60 T180,55 T240,50 T320,45" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
                  <defs>
                    <linearGradient id="grad-ops" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle cx="120" cy="50" r="3" fill="#10b981" />
                  <circle cx="240" cy="38" r="3" fill="#10b981" />
                  <circle cx="320" cy="25" r="3" fill="#10b981" />
                </svg>
                <div className="sw-mock-chart-labels">
                  <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>Teraz</span>
                </div>
              </div>
            </div>

            <div className="sw-mock-table-card">
              <div className="sw-mock-table-header">
                <span className="sw-mock-chart-title">Obłożenie zespołu</span>
                <span className="sw-mock-table-badge">12 osób</span>
              </div>
              <div className="sw-mock-table">
                <div className="sw-mock-table-row head">
                  <span>Osoba</span>
                  <span>Rola</span>
                  <span>Obłożenie</span>
                  <span>Zadania</span>
                </div>
                {[
                  { name: 'Anna K.', val: 'Koordynator', stage: '92%', pct: '8', color: '#ef4444' },
                  { name: 'Tomek W.', val: 'Realizacja', stage: '78%', pct: '6', color: '#f59e0b' },
                  { name: 'Kasia M.', val: 'Realizacja', stage: '65%', pct: '5', color: '#10b981' },
                  { name: 'Marek P.', val: 'Kontrola', stage: '84%', pct: '7', color: '#f59e0b' },
                  { name: 'Ola S.', val: 'Wsparcie', stage: '41%', pct: '3', color: '#10b981' },
                ].map((deal) => (
                  <div key={deal.name} className="sw-mock-table-row">
                    <span className="sw-mock-deal-name">
                      <div className="sw-mock-deal-dot" style={{ background: deal.color }} />
                      {deal.name}
                    </span>
                    <span className="sw-mock-deal-val">{deal.val}</span>
                    <span className="sw-mock-deal-stage" style={{ '--sc': deal.color } as React.CSSProperties}>{deal.stage}</span>
                    <span className="sw-mock-deal-pct">{deal.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MockupWorkflow() {
  return (
    <>
      <div className="sw-mock-chrome">
        <div className="sw-mock-dots"><span /><span /><span /></div>
        <div className="sw-mock-tab">Automatyzacja procesów — FlowEngine</div>
      </div>
      <div className="sw-mock-app">
        <div className="sw-mock-sidebar" style={{ background: '#111827' }}>
          <div className="sw-mock-sidebar-logo">
            <div className="sw-mock-logo-circle" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
            <div className="sw-mock-logo-text" />
          </div>
          <div className="sw-mock-nav">
            {['Procesy', 'Kolejka', 'Automatyzacje', 'Szablony', 'Logi', 'API'].map((label, i) => (
              <div key={label} className={`sw-mock-nav-item ${i === 0 ? 'active' : ''}`}>
                <div className="sw-mock-nav-icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="sw-mock-sidebar-footer">
            <div className="sw-mock-avatar" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }} />
            <div className="sw-mock-user-info">
              <div className="sw-mock-user-name" />
              <div className="sw-mock-user-role" />
            </div>
          </div>
        </div>

        <div className="sw-mock-main">
          <div className="sw-mock-topbar">
            <div className="sw-mock-breadcrumb">
              <span className="sw-mock-bc-dim">FlowEngine</span>
              <span className="sw-mock-bc-sep">/</span>
              <span>Aktywne procesy</span>
            </div>
            <div className="sw-mock-topbar-actions">
              <div className="sw-mock-btn-sm">+ Nowy proces</div>
              <div className="sw-mock-notif-dot" />
            </div>
          </div>

          <div className="sw-mock-stats">
            {[
              { label: 'W kolejce', value: '18', change: '-4', up: true },
              { label: 'W realizacji', value: '31', change: '+5', up: true },
              { label: 'Do akceptacji', value: '7', change: '+2', up: false },
              { label: 'Zakończone dziś', value: '42', change: '+67%', up: true },
            ].map((stat) => (
              <div key={stat.label} className="sw-mock-stat">
                <div className="sw-mock-stat-label">{stat.label}</div>
                <div className="sw-mock-stat-row">
                  <span className="sw-mock-stat-value">{stat.value}</span>
                  <span className={`sw-mock-stat-change ${stat.up ? 'up' : 'down'}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sw-mock-content">
            {/* Flow pipeline visualization */}
            <div className="sw-mock-chart-card">
              <div className="sw-mock-chart-header">
                <span className="sw-mock-chart-title">Proces: Onboarding klienta</span>
                <div className="sw-mock-flow-status">
                  <span className="sw-mock-flow-dot active" />
                  <span style={{ fontSize: 8, fontWeight: 600, color: '#10b981' }}>Aktywny</span>
                </div>
              </div>
              <div className="sw-mock-flow-pipeline">
                {[
                  { label: 'Formularz', status: 'done', color: '#10b981' },
                  { label: 'Weryfikacja', status: 'done', color: '#10b981' },
                  { label: 'Umowa', status: 'active', color: '#3b82f6' },
                  { label: 'Dostępy', status: 'pending', color: '#d4d4d4' },
                  { label: 'Szkolenie', status: 'pending', color: '#d4d4d4' },
                ].map((step, i, arr) => (
                  <div key={step.label} className="sw-mock-flow-step">
                    <div className={`sw-mock-flow-node ${step.status}`} style={{ '--fc': step.color } as React.CSSProperties}>
                      {step.status === 'done' && <Icon name="check" size={8} strokeWidth={3} />}
                      {step.status === 'active' && <div className="sw-mock-flow-pulse" />}
                    </div>
                    <span className={`sw-mock-flow-label ${step.status}`}>{step.label}</span>
                    {i < arr.length - 1 && <div className={`sw-mock-flow-line ${step.status === 'done' ? 'done' : ''}`} />}
                  </div>
                ))}
              </div>
              <div className="sw-mock-flow-details">
                <div className="sw-mock-flow-detail">
                  <span className="sw-mock-fd-label">Klient</span>
                  <span className="sw-mock-fd-value">MediaGroup Sp. z o.o.</span>
                </div>
                <div className="sw-mock-flow-detail">
                  <span className="sw-mock-fd-label">Odpowiedzialny</span>
                  <span className="sw-mock-fd-value">Kasia M.</span>
                </div>
                <div className="sw-mock-flow-detail">
                  <span className="sw-mock-fd-label">Termin</span>
                  <span className="sw-mock-fd-value">22 mar 2026</span>
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="sw-mock-table-card">
              <div className="sw-mock-table-header">
                <span className="sw-mock-chart-title">Ostatnie akcje</span>
                <span className="sw-mock-table-badge">Na żywo</span>
              </div>
              <div className="sw-mock-activity-list">
                {[
                  { time: '14:32', text: 'Faktura #1847 — auto-wystawiona', color: '#10b981', icon: 'check' },
                  { time: '14:28', text: 'Zlecenie ZL-392 → etap: Kontrola', color: '#3b82f6', icon: 'arrow-right' },
                  { time: '14:15', text: 'Akceptacja budżetu — oczekuje na dyrektora', color: '#f59e0b', icon: 'clock' },
                  { time: '14:02', text: 'Nowe zgłoszenie #284 — przypisane auto', color: '#8b5cf6', icon: 'inbox' },
                  { time: '13:51', text: 'SLA przekroczone — eskalacja do managera', color: '#ef4444', icon: 'alert-triangle' },
                ].map((item) => (
                  <div key={item.time} className="sw-mock-activity-item">
                    <span className="sw-mock-activity-time">{item.time}</span>
                    <div className="sw-mock-activity-icon" style={{ background: `${item.color}18`, color: item.color }}>
                      <Icon name={item.icon} size={8} strokeWidth={2.5} />
                    </div>
                    <span className="sw-mock-activity-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MockupIntegrations() {
  return (
    <>
      <div className="sw-mock-chrome">
        <div className="sw-mock-dots"><span /><span /><span /></div>
        <div className="sw-mock-tab">Hub integracji — ConnectorOS</div>
      </div>
      <div className="sw-mock-app">
        <div className="sw-mock-sidebar" style={{ background: '#0f172a' }}>
          <div className="sw-mock-sidebar-logo">
            <div className="sw-mock-logo-circle" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }} />
            <div className="sw-mock-logo-text" />
          </div>
          <div className="sw-mock-nav">
            {['Status', 'Połączenia', 'Przepływy', 'Logi', 'Monitoring', 'Klucze API'].map((label, i) => (
              <div key={label} className={`sw-mock-nav-item ${i === 0 ? 'active' : ''}`}>
                <div className="sw-mock-nav-icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="sw-mock-sidebar-footer">
            <div className="sw-mock-avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }} />
            <div className="sw-mock-user-info">
              <div className="sw-mock-user-name" />
              <div className="sw-mock-user-role" />
            </div>
          </div>
        </div>

        <div className="sw-mock-main">
          <div className="sw-mock-topbar">
            <div className="sw-mock-breadcrumb">
              <span className="sw-mock-bc-dim">ConnectorOS</span>
              <span className="sw-mock-bc-sep">/</span>
              <span>Status integracji</span>
            </div>
            <div className="sw-mock-topbar-actions">
              <div className="sw-mock-btn-sm">+ Dodaj system</div>
              <div className="sw-mock-notif-dot" />
            </div>
          </div>

          <div className="sw-mock-stats">
            {[
              { label: 'Połączone systemy', value: '8', change: 'OK', up: true },
              { label: 'Synchro dziś', value: '2.4K', change: '+340', up: true },
              { label: 'Avg. latency', value: '120ms', change: '-15ms', up: true },
              { label: 'Błędy (24h)', value: '2', change: '-86%', up: true },
            ].map((stat) => (
              <div key={stat.label} className="sw-mock-stat">
                <div className="sw-mock-stat-label">{stat.label}</div>
                <div className="sw-mock-stat-row">
                  <span className="sw-mock-stat-value">{stat.value}</span>
                  <span className={`sw-mock-stat-change ${stat.up ? 'up' : 'down'}`}>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sw-mock-content">
            {/* Integration map */}
            <div className="sw-mock-chart-card">
              <div className="sw-mock-chart-header">
                <span className="sw-mock-chart-title">Mapa przepływów</span>
                <div className="sw-mock-chart-tabs">
                  <span className="active">Aktywne</span>
                  <span>Wszystkie</span>
                </div>
              </div>
              <div className="sw-mock-integration-map">
                <div className="sw-mock-int-center">
                  <div className="sw-mock-int-hub">Hub</div>
                </div>
                {[
                  { name: 'ERP Comarch', status: 'ok', pos: 'top-left' },
                  { name: 'WMS', status: 'ok', pos: 'top-right' },
                  { name: 'Fakturownia', status: 'ok', pos: 'mid-left' },
                  { name: 'Slack', status: 'ok', pos: 'mid-right' },
                  { name: 'GUS API', status: 'warn', pos: 'bot-left' },
                  { name: 'Bank API', status: 'ok', pos: 'bot-right' },
                ].map((sys) => (
                  <div key={sys.name} className={`sw-mock-int-node ${sys.pos} ${sys.status}`}>
                    <div className={`sw-mock-int-status ${sys.status}`} />
                    <span>{sys.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sync log */}
            <div className="sw-mock-table-card">
              <div className="sw-mock-table-header">
                <span className="sw-mock-chart-title">Ostatnie synchronizacje</span>
                <span className="sw-mock-table-badge">Na żywo</span>
              </div>
              <div className="sw-mock-table">
                <div className="sw-mock-table-row head">
                  <span>Przepływ</span>
                  <span>Źródło → Cel</span>
                  <span>Rekordy</span>
                  <span>Status</span>
                </div>
                {[
                  { name: 'Zamówienia', val: 'ERP → WMS', stage: '142', pct: 'OK', color: '#10b981' },
                  { name: 'Faktury', val: 'System → Fakturownia', stage: '38', pct: 'OK', color: '#10b981' },
                  { name: 'Kontrahenci', val: 'GUS → CRM', stage: '12', pct: 'Warn', color: '#f59e0b' },
                  { name: 'Płatności', val: 'Bank → Księgowość', stage: '87', pct: 'OK', color: '#10b981' },
                  { name: 'Powiadomienia', val: 'System → Slack', stage: '214', pct: 'OK', color: '#10b981' },
                ].map((deal) => (
                  <div key={deal.name} className="sw-mock-table-row">
                    <span className="sw-mock-deal-name">
                      <div className="sw-mock-deal-dot" style={{ background: deal.color }} />
                      {deal.name}
                    </span>
                    <span className="sw-mock-deal-val">{deal.val}</span>
                    <span className="sw-mock-deal-val">{deal.stage}</span>
                    <span className="sw-mock-deal-stage" style={{ '--sc': deal.color } as React.CSSProperties}>{deal.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mockupMap: Record<string, { component: React.FC; caption: string }> = {
  ops: {
    component: MockupOps,
    caption: 'System operacyjny firmy — procesy, zespół i KPI w jednym miejscu',
  },
  workflow: {
    component: MockupWorkflow,
    caption: 'Automatyzacja procesów — zlecenia, akceptacje i eskalacje jadą same',
  },
  integrations: {
    component: MockupIntegrations,
    caption: 'Hub integracji — dane przepływają między systemami automatycznie',
  },
};

const demoIds = Object.keys(mockupMap);

export function SoftwarePanel() {
  const [activeMockup, setActiveMockup] = useState('ops');

  const handleCardClick = (demoId?: string) => {
    if (!demoId) return;
    setActiveMockup(demoId);
  };

  const { component: ActiveMockup, caption } = mockupMap[activeMockup];

  return (
    <div className="sw-panel">
      {/* Left — categories */}
      <div className="sw-left">
        <motion.div className="sw-header"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}>
          <span className="sw-eyebrow">Co budujemy</span>
          <h2 className="sw-title">Systemy, które<br />napędzają firmy</h2>
          <p className="sw-subtitle">Budujemy wewnętrzne systemy operacyjne — jeden organizm zamiast rozsypki narzędzi. Kliknij, żeby zobaczyć jak to wygląda w praktyce.</p>
        </motion.div>

        <div className="sw-grid">
          {softwareTiles.map((t, i) => (
            <motion.div
              className={`sw-card ${t.demoId === activeMockup ? 'sw-card-active' : ''}`}
              key={t.id}
              style={{ '--c': t.color, '--c-l': `${t.color}14`, '--c-m': `${t.color}28` } as React.CSSProperties}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              onClick={() => handleCardClick(t.demoId)}>
              <div className="sw-card-icon">
                <Icon name={t.icon} size={16} strokeWidth={2} />
              </div>
              <div className="sw-card-text">
                <span className="sw-card-name">{t.name}</span>
                <span className="sw-card-desc">{t.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right — dynamic mockup */}
      <motion.div className="sw-right"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            className="sw-mockup"
            key={activeMockup}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}>
            <ActiveMockup />
          </motion.div>
        </AnimatePresence>

        <div className="sw-mockup-caption">{caption}</div>

        {/* Mockup indicator dots */}
        <div className="sw-mockup-dots">
          {demoIds.map(id => (
            <button
              key={id}
              className={`sw-mockup-dot ${id === activeMockup ? 'active' : ''}`}
              onClick={() => handleCardClick(id)}
              aria-label={`Pokaż ${mockupMap[id].caption}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
