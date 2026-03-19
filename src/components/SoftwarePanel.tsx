import { motion } from 'framer-motion';
import { Icon } from './Icon';
import { tabs } from '../data/tiles';
import './SoftwarePanel.css';

const softwareTiles = tabs.find(t => t.id === 'software')!.tiles;

export function SoftwarePanel() {
  return (
    <div className="sw-panel">
      {/* Left — categories */}
      <div className="sw-left">
        <motion.div className="sw-header"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}>
          <span className="sw-eyebrow">Co budujemy</span>
          <h2 className="sw-title">Dedykowane systemy<br />dla Twojej firmy</h2>
          <p className="sw-subtitle">Każdy system projektujemy pod konkretne procesy — nie sprzedajemy gotowców. Poniżej przykłady tego, co tworzymy najczęściej.</p>
        </motion.div>

        <div className="sw-grid">
          {softwareTiles.map((t, i) => (
            <motion.div className="sw-card" key={t.id}
              style={{ '--c': t.color, '--c-l': `${t.color}14`, '--c-m': `${t.color}28` } as React.CSSProperties}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}>
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

      {/* Right — realistic dashboard mockup */}
      <motion.div className="sw-right"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}>
        <div className="sw-mockup">
          {/* Window chrome */}
          <div className="sw-mock-chrome">
            <div className="sw-mock-dots">
              <span /><span /><span />
            </div>
            <div className="sw-mock-tab">Panel zarządzania — CRM Pro</div>
          </div>

          {/* App layout */}
          <div className="sw-mock-app">
            {/* Sidebar */}
            <div className="sw-mock-sidebar">
              <div className="sw-mock-sidebar-logo">
                <div className="sw-mock-logo-circle" />
                <div className="sw-mock-logo-text" />
              </div>
              <div className="sw-mock-nav">
                {['Dashboard', 'Klienci', 'Pipeline', 'Faktury', 'Raporty', 'Zespół'].map((label, i) => (
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

            {/* Main content */}
            <div className="sw-mock-main">
              {/* Top bar */}
              <div className="sw-mock-topbar">
                <div className="sw-mock-breadcrumb">
                  <span className="sw-mock-bc-dim">CRM Pro</span>
                  <span className="sw-mock-bc-sep">/</span>
                  <span>Dashboard</span>
                </div>
                <div className="sw-mock-topbar-actions">
                  <div className="sw-mock-search-bar">
                    <Icon name="search" size={10} strokeWidth={2} />
                    <span>Szukaj...</span>
                  </div>
                  <div className="sw-mock-notif-dot" />
                </div>
              </div>

              {/* Stats row */}
              <div className="sw-mock-stats">
                {[
                  { label: 'Nowi klienci', value: '47', change: '+12%', up: true },
                  { label: 'Pipeline', value: '1.2M', change: '+8%', up: true },
                  { label: 'Konwersja', value: '34%', change: '+3pp', up: true },
                  { label: 'Avg. deal', value: '28.5K', change: '-2%', up: false },
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

              {/* Content area */}
              <div className="sw-mock-content">
                {/* Chart */}
                <div className="sw-mock-chart-card">
                  <div className="sw-mock-chart-header">
                    <span className="sw-mock-chart-title">Przychody vs cel</span>
                    <div className="sw-mock-chart-tabs">
                      <span className="active">Miesiąc</span>
                      <span>Kwartał</span>
                      <span>Rok</span>
                    </div>
                  </div>
                  <div className="sw-mock-chart">
                    <svg viewBox="0 0 320 100" className="sw-mock-chart-svg">
                      {/* Grid lines */}
                      {[20, 40, 60, 80].map(y => (
                        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#f0f0ee" strokeWidth="0.5" />
                      ))}
                      {/* Target area */}
                      <path d="M0,55 Q40,50 80,48 T160,42 T240,35 T320,28" fill="none" stroke="#e5e5e0" strokeWidth="1" strokeDasharray="4,3" />
                      {/* Revenue line */}
                      <path d="M0,70 Q40,62 80,55 T160,40 T240,30 T320,22" fill="none" stroke="#10b981" strokeWidth="2" />
                      {/* Area fill */}
                      <path d="M0,70 Q40,62 80,55 T160,40 T240,30 T320,22 V100 H0 Z" fill="url(#grad)" />
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Data points */}
                      <circle cx="80" cy="55" r="3" fill="#10b981" />
                      <circle cx="160" cy="40" r="3" fill="#10b981" />
                      <circle cx="240" cy="30" r="3" fill="#10b981" />
                      <circle cx="320" cy="22" r="3" fill="#10b981" />
                    </svg>
                    <div className="sw-mock-chart-labels">
                      <span>Sty</span><span>Lut</span><span>Mar</span><span>Kwi</span><span>Maj</span><span>Cze</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline table */}
                <div className="sw-mock-table-card">
                  <div className="sw-mock-table-header">
                    <span className="sw-mock-chart-title">Aktywne deale</span>
                    <span className="sw-mock-table-badge">24 aktywne</span>
                  </div>
                  <div className="sw-mock-table">
                    <div className="sw-mock-table-row head">
                      <span>Firma</span>
                      <span>Wartość</span>
                      <span>Etap</span>
                      <span>Szansa</span>
                    </div>
                    {[
                      { name: 'Logistex Sp. z o.o.', val: '85 000 zł', stage: 'Negocjacje', pct: '75%', color: '#f59e0b' },
                      { name: 'MedCore S.A.', val: '120 000 zł', stage: 'Oferta', pct: '60%', color: '#3b82f6' },
                      { name: 'FreshMarket', val: '45 000 zł', stage: 'Demo', pct: '40%', color: '#8b5cf6' },
                      { name: 'BuildPro Group', val: '210 000 zł', stage: 'Zamknięcie', pct: '90%', color: '#10b981' },
                      { name: 'EduStar Academy', val: '38 000 zł', stage: 'Kwalifikacja', pct: '25%', color: '#ef4444' },
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
        </div>

        <div className="sw-mockup-caption">
          Przykład panelu CRM — każdy system projektujemy od zera pod Twoje procesy
        </div>
      </motion.div>
    </div>
  );
}
