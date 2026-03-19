import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { tabs } from '../data/tiles';
import './SoftwarePanel.css';

const softwareTiles = tabs.find(t => t.id === 'software')!.tiles;

/* ═══════════════════════════════════════
   MINI PREVIEWS — Small SVG illustrations per card
   ═══════════════════════════════════════ */

function MiniClientPortal({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      <rect x="0" y="0" width="36" height="90" fill={color} opacity="0.1" />
      <circle cx="18" cy="14" r="5" fill={color} opacity="0.35" />
      <rect x="8" y="24" width="20" height="2.5" rx="1" fill={color} opacity="0.2" />
      <rect x="8" y="30" width="16" height="2.5" rx="1" fill={color} opacity="0.12" />
      <rect x="8" y="36" width="18" height="2.5" rx="1" fill={color} opacity="0.12" />
      {/* Status cards */}
      <rect x="44" y="6" width="40" height="28" rx="4" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <circle cx="52" cy="14" r="3" fill="#10b981" opacity="0.7" />
      <rect x="58" y="12" width="20" height="2.5" rx="1" fill={color} opacity="0.15" />
      <rect x="48" y="22" width="32" height="2" rx="1" fill={color} opacity="0.08" />
      <rect x="48" y="27" width="24" height="2" rx="1" fill={color} opacity="0.06" />

      <rect x="90" y="6" width="40" height="28" rx="4" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <circle cx="98" cy="14" r="3" fill="#f59e0b" opacity="0.7" />
      <rect x="104" y="12" width="20" height="2.5" rx="1" fill={color} opacity="0.15" />
      <rect x="94" y="22" width="32" height="2" rx="1" fill={color} opacity="0.08" />
      <rect x="94" y="27" width="20" height="2" rx="1" fill={color} opacity="0.06" />

      <rect x="136" y="6" width="38" height="28" rx="4" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <circle cx="144" cy="14" r="3" fill={color} opacity="0.5" />
      <rect x="150" y="12" width="18" height="2.5" rx="1" fill={color} opacity="0.15" />
      <rect x="140" y="22" width="28" height="2" rx="1" fill={color} opacity="0.08" />
      {/* Document rows */}
      <rect x="44" y="42" width="130" height="3" rx="1.5" fill={color} opacity="0.08" />
      <rect x="44" y="50" width="110" height="3" rx="1.5" fill={color} opacity="0.06" />
      <rect x="44" y="58" width="120" height="3" rx="1.5" fill={color} opacity="0.05" />
      <rect x="44" y="66" width="90" height="3" rx="1.5" fill={color} opacity="0.04" />
    </svg>
  );
}

function MiniCRM({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      {/* Pipeline columns */}
      <rect x="6" y="4" width="52" height="82" rx="5" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
      <rect x="10" y="8" width="28" height="3" rx="1" fill={color} opacity="0.25" />
      <rect x="40" y="8" width="10" height="6" rx="3" fill={color} opacity="0.15" />
      <rect x="10" y="18" width="44" height="14" rx="3" fill="#fff" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <rect x="10" y="36" width="44" height="14" rx="3" fill="#fff" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <rect x="10" y="54" width="44" height="14" rx="3" fill="#fff" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />

      <rect x="64" y="4" width="52" height="82" rx="5" fill={color} opacity="0.04" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <rect x="68" y="8" width="24" height="3" rx="1" fill={color} opacity="0.2" />
      <rect x="98" y="8" width="10" height="6" rx="3" fill="#f59e0b" opacity="0.2" />
      <rect x="68" y="18" width="44" height="14" rx="3" fill="#fff" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
      <rect x="68" y="36" width="44" height="14" rx="3" fill="#fff" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />

      <rect x="122" y="4" width="52" height="82" rx="5" fill={color} opacity="0.03" stroke={color} strokeOpacity="0.08" strokeWidth="0.5" />
      <rect x="126" y="8" width="20" height="3" rx="1" fill="#10b981" opacity="0.3" />
      <rect x="156" y="8" width="10" height="6" rx="3" fill="#10b981" opacity="0.15" />
      <rect x="126" y="18" width="44" height="14" rx="3" fill="#fff" stroke="#10b981" strokeOpacity="0.15" strokeWidth="0.5" />
    </svg>
  );
}

function MiniDashboard({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      {/* KPI blocks */}
      <rect x="6" y="4" width="40" height="22" rx="4" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
      <rect x="10" y="8" width="18" height="3" rx="1" fill={color} opacity="0.12" />
      <rect x="10" y="16" width="12" height="6" rx="1" fill={color} opacity="0.3" />
      <rect x="24" y="18" width="12" height="3" rx="1" fill="#10b981" opacity="0.3" />

      <rect x="50" y="4" width="40" height="22" rx="4" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
      <rect x="54" y="8" width="22" height="3" rx="1" fill={color} opacity="0.12" />
      <rect x="54" y="16" width="14" height="6" rx="1" fill={color} opacity="0.3" />

      <rect x="94" y="4" width="40" height="22" rx="4" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
      <rect x="138" y="4" width="36" height="22" rx="4" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
      {/* Chart area */}
      <rect x="6" y="32" width="168" height="54" rx="5" fill={color} opacity="0.04" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <path d="M16,72 Q40,65 60,58 T100,45 T140,38 T164,30" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M16,72 Q40,65 60,58 T100,45 T140,38 T164,30 V78 H16 Z" fill={color} fillOpacity="0.06" />
      <path d="M16,70 Q40,68 60,64 T100,56 T140,52 T164,48" stroke={color} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3,2" />
    </svg>
  );
}

function MiniOperations({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      <rect x="0" y="0" width="32" height="90" fill={color} opacity="0.08" />
      <rect x="6" y="6" width="20" height="6" rx="2" fill={color} opacity="0.25" />
      <rect x="6" y="18" width="20" height="2.5" rx="1" fill={color} opacity="0.15" />
      <rect x="6" y="24" width="16" height="2.5" rx="1" fill={color} opacity="0.08" />
      <rect x="6" y="30" width="18" height="2.5" rx="1" fill={color} opacity="0.08" />
      <rect x="6" y="36" width="14" height="2.5" rx="1" fill={color} opacity="0.08" />
      {/* Stats row */}
      <rect x="38" y="6" width="32" height="18" rx="3" fill={color} opacity="0.05" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <rect x="74" y="6" width="32" height="18" rx="3" fill={color} opacity="0.05" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <rect x="110" y="6" width="32" height="18" rx="3" fill={color} opacity="0.05" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <rect x="146" y="6" width="28" height="18" rx="3" fill={color} opacity="0.05" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      {/* Chart + table */}
      <rect x="38" y="30" width="80" height="54" rx="4" fill={color} opacity="0.04" stroke={color} strokeOpacity="0.08" strokeWidth="0.5" />
      <path d="M46,74 Q62,68 78,60 T108,48" stroke={color} strokeWidth="1.2" strokeOpacity="0.35" />
      <rect x="124" y="30" width="50" height="54" rx="4" fill={color} opacity="0.04" stroke={color} strokeOpacity="0.08" strokeWidth="0.5" />
      <rect x="128" y="38" width="42" height="3" rx="1" fill={color} opacity="0.08" />
      <rect x="128" y="46" width="42" height="3" rx="1" fill={color} opacity="0.06" />
      <rect x="128" y="54" width="42" height="3" rx="1" fill={color} opacity="0.05" />
      <rect x="128" y="62" width="42" height="3" rx="1" fill={color} opacity="0.04" />
    </svg>
  );
}

function MiniWorkflow({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      {/* Flow nodes */}
      <circle cx="28" cy="38" r="10" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M24,38 L27,41 L33,35" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="38" y1="38" x2="56" y2="38" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.3" />

      <circle cx="66" cy="38" r="10" fill="#10b981" opacity="0.2" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M62,38 L65,41 L71,35" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1="76" y1="38" x2="94" y2="38" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />

      <circle cx="104" cy="38" r="10" fill={color} opacity="0.15" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
      <circle cx="104" cy="38" r="3.5" fill={color} opacity="0.5" />
      <line x1="114" y1="38" x2="132" y2="38" stroke="#ddd" strokeWidth="1.5" />

      <circle cx="142" cy="38" r="10" fill="none" stroke="#ddd" strokeWidth="1.5" />
      <line x1="152" y1="38" x2="170" y2="38" stroke="#ddd" strokeWidth="1.5" />
      <circle cx="170" cy="38" r="5" fill="none" stroke="#ddd" strokeWidth="1.5" />

      {/* Labels */}
      <rect x="14" y="54" width="28" height="2.5" rx="1" fill="#10b981" opacity="0.25" />
      <rect x="52" y="54" width="28" height="2.5" rx="1" fill="#10b981" opacity="0.25" />
      <rect x="90" y="54" width="28" height="2.5" rx="1" fill={color} opacity="0.3" />
      <rect x="128" y="54" width="28" height="2.5" rx="1" fill="#ccc" opacity="0.4" />

      {/* Activity items */}
      <rect x="14" y="68" width="152" height="3" rx="1" fill={color} opacity="0.06" />
      <rect x="14" y="76" width="130" height="3" rx="1" fill={color} opacity="0.04" />
    </svg>
  );
}

function MiniHelpdesk({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      {/* Header */}
      <rect x="6" y="4" width="168" height="12" rx="3" fill={color} opacity="0.05" />
      <rect x="10" y="8" width="30" height="3" rx="1" fill={color} opacity="0.2" />
      <rect x="134" y="7" width="32" height="5" rx="2" fill={color} opacity="0.15" />
      {/* Ticket rows */}
      {[22, 38, 54, 70].map((y, i) => (
        <g key={y}>
          <rect x="6" y={y} width="168" height="12" rx="3" fill={color} opacity={i === 0 ? 0.06 : 0.03} stroke={color} strokeOpacity={i === 0 ? 0.12 : 0.06} strokeWidth="0.5" />
          <circle cx="14" cy={y + 6} r="3" fill={i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : i === 2 ? color : '#10b981'} opacity="0.5" />
          <rect x="22" y={y + 3} width={44 - i * 4} height="2.5" rx="1" fill={color} opacity="0.15" />
          <rect x="80" y={y + 3} width={30 - i * 2} height="2.5" rx="1" fill={color} opacity="0.08" />
          <rect x="130" y={y + 2} width="24" height="5" rx="2" fill={i === 0 ? '#ef4444' : i === 3 ? '#10b981' : color} opacity="0.12" />
          <rect x="158" y={y + 3} width="12" height="2.5" rx="1" fill={color} opacity="0.06" />
        </g>
      ))}
    </svg>
  );
}

function MiniIntegrations({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      {/* Central hub */}
      <rect x="72" y="28" width="36" height="34" rx="8" fill={color} opacity="0.15" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
      <rect x="80" y="40" width="20" height="4" rx="1" fill={color} opacity="0.35" />
      <rect x="82" y="48" width="16" height="3" rx="1" fill={color} opacity="0.2" />
      {/* Connected nodes */}
      <rect x="8" y="8" width="42" height="20" rx="5" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <circle cx="16" cy="18" r="3" fill="#10b981" opacity="0.5" />
      <rect x="22" y="15" width="22" height="2.5" rx="1" fill={color} opacity="0.15" />
      <line x1="50" y1="22" x2="72" y2="36" stroke={color} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3,2" />

      <rect x="130" y="8" width="42" height="20" rx="5" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <circle cx="138" cy="18" r="3" fill="#10b981" opacity="0.5" />
      <rect x="144" y="15" width="22" height="2.5" rx="1" fill={color} opacity="0.15" />
      <line x1="130" y1="22" x2="108" y2="36" stroke={color} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3,2" />

      <rect x="8" y="62" width="42" height="20" rx="5" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <circle cx="16" cy="72" r="3" fill="#f59e0b" opacity="0.5" />
      <rect x="22" y="69" width="22" height="2.5" rx="1" fill={color} opacity="0.15" />
      <line x1="50" y1="68" x2="72" y2="56" stroke={color} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3,2" />

      <rect x="130" y="62" width="42" height="20" rx="5" fill={color} opacity="0.06" stroke={color} strokeOpacity="0.15" strokeWidth="0.5" />
      <circle cx="138" cy="72" r="3" fill="#10b981" opacity="0.5" />
      <rect x="144" y="69" width="22" height="2.5" rx="1" fill={color} opacity="0.15" />
      <line x1="130" y1="68" x2="108" y2="56" stroke={color} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3,2" />
    </svg>
  );
}

function MiniHR({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 180 90" fill="none" className="sw-card-svg">
      {/* People cards */}
      <rect x="6" y="4" width="52" height="82" rx="5" fill={color} opacity="0.05" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <rect x="10" y="8" width="28" height="3" rx="1" fill={color} opacity="0.2" />
      {[18, 32, 46, 60, 74].map((y, i) => (
        <g key={y}>
          <circle cx="16" cy={y + 4} r="4" fill={color} opacity={0.25 - i * 0.03} />
          <rect x="24" y={y + 1} width="28" height="2.5" rx="1" fill={color} opacity={0.15 - i * 0.02} />
          <rect x="24" y={y + 5} width="18" height="2" rx="1" fill={color} opacity="0.06" />
        </g>
      ))}
      {/* Onboarding progress */}
      <rect x="64" y="4" width="110" height="38" rx="5" fill={color} opacity="0.04" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      <rect x="68" y="8" width="32" height="3" rx="1" fill={color} opacity="0.2" />
      <rect x="68" y="16" width="100" height="4" rx="2" fill={color} opacity="0.06" />
      <rect x="68" y="16" width="72" height="4" rx="2" fill={color} opacity="0.2" />
      <rect x="68" y="26" width="100" height="4" rx="2" fill={color} opacity="0.06" />
      <rect x="68" y="26" width="45" height="4" rx="2" fill="#f59e0b" opacity="0.25" />
      <rect x="68" y="36" width="100" height="4" rx="2" fill={color} opacity="0.06" />
      <rect x="68" y="36" width="100" height="4" rx="2" fill="#10b981" opacity="0.15" />
      {/* Checklist */}
      <rect x="64" y="48" width="110" height="38" rx="5" fill={color} opacity="0.03" stroke={color} strokeOpacity="0.08" strokeWidth="0.5" />
      <rect x="68" y="52" width="24" height="3" rx="1" fill={color} opacity="0.15" />
      {[60, 68, 76].map((y, i) => (
        <g key={y}>
          <rect x="68" y={y} width="8" height="5" rx="1.5" fill={i < 2 ? '#10b981' : color} opacity={i < 2 ? 0.2 : 0.08} stroke={i < 2 ? '#10b981' : color} strokeOpacity="0.2" strokeWidth="0.5" />
          <rect x="80" y={y + 1} width={40 - i * 6} height="2.5" rx="1" fill={color} opacity="0.1" />
        </g>
      ))}
    </svg>
  );
}

const miniPreviewMap: Record<string, React.FC<{ color: string }>> = {
  'client-portal': MiniClientPortal,
  'custom-crm': MiniCRM,
  'dashboards': MiniDashboard,
  'operations-os': MiniOperations,
  'workflow-auto': MiniWorkflow,
  'helpdesk': MiniHelpdesk,
  'integrations': MiniIntegrations,
  'hr-onboarding': MiniHR,
};

/* ═══════════════════════════════════════
   MOCKUP SHELL — Shared wrapper
   ═══════════════════════════════════════ */

interface ShellProps {
  tabTitle: string;
  sidebarBg?: string;
  logoBg?: string;
  avatarBg?: string;
  navItems: string[];
  breadcrumb: [string, string];
  topAction?: string;
  stats: { label: string; value: string; change: string; up: boolean }[];
  accentColor?: string;
  children: React.ReactNode;
}

function MockupShell({ tabTitle, sidebarBg, logoBg, avatarBg, navItems, breadcrumb, topAction, stats, accentColor, children }: ShellProps) {
  const accent = accentColor || '#10b981';
  return (
    <>
      <div className="sw-mock-chrome">
        <div className="sw-mock-dots"><span /><span /><span /></div>
        <div className="sw-mock-tab">{tabTitle}</div>
      </div>
      <div className="sw-mock-app">
        <div className="sw-mock-sidebar" style={{ background: sidebarBg || '#1a1a1a' }}>
          <div className="sw-mock-sidebar-logo">
            <div className="sw-mock-logo-circle" style={{ background: logoBg || 'linear-gradient(135deg, #10b981, #06b6d4)' }} />
            <div className="sw-mock-logo-text" />
          </div>
          <div className="sw-mock-nav">
            {navItems.map((label, i) => (
              <div key={label} className={`sw-mock-nav-item ${i === 0 ? 'active' : ''}`} style={{ '--nav-accent': accent } as React.CSSProperties}>
                <div className="sw-mock-nav-icon" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="sw-mock-sidebar-footer">
            <div className="sw-mock-avatar" style={{ background: avatarBg || 'linear-gradient(135deg, #f59e0b, #ec4899)' }} />
            <div className="sw-mock-user-info">
              <div className="sw-mock-user-name" />
              <div className="sw-mock-user-role" />
            </div>
          </div>
        </div>

        <div className="sw-mock-main">
          <div className="sw-mock-topbar">
            <div className="sw-mock-breadcrumb">
              <span className="sw-mock-bc-dim">{breadcrumb[0]}</span>
              <span className="sw-mock-bc-sep">/</span>
              <span>{breadcrumb[1]}</span>
            </div>
            <div className="sw-mock-topbar-actions">
              {topAction && <div className="sw-mock-btn-sm">{topAction}</div>}
              <div className="sw-mock-notif-dot" />
            </div>
          </div>

          <div className="sw-mock-stats">
            {stats.map((stat) => (
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
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 1: Panel klienta
   ═══════════════════════════════════════ */

function MockupClientPortal() {
  return (
    <MockupShell
      tabTitle="Panel klienta — ClientHub"
      sidebarBg="#1e1b4b"
      logoBg="linear-gradient(135deg, #8b5cf6, #a78bfa)"
      avatarBg="linear-gradient(135deg, #8b5cf6, #c084fc)"
      navItems={['Moje zlecenia', 'Dokumenty', 'Faktury', 'Wiadomości', 'Profil']}
      breadcrumb={['ClientHub', 'Moje zlecenia']}
      accentColor="#8b5cf6"
      stats={[
        { label: 'Aktywne zlecenia', value: '4', change: 'W toku', up: true },
        { label: 'Oczekujące', value: '2', change: 'Do potwierdzenia', up: false },
        { label: 'Dokumenty', value: '18', change: '+3 nowe', up: true },
        { label: 'Nieprzeczytane', value: '5', change: 'Wiadomości', up: false },
      ]}
    >
      {/* Order status cards */}
      <div className="sw-mock-chart-card">
        <div className="sw-mock-chart-header">
          <span className="sw-mock-chart-title">Status zleceń</span>
          <div className="sw-mock-chart-tabs">
            <span className="active">Aktywne</span>
            <span>Archiwum</span>
          </div>
        </div>
        <div className="sw-mock-portal-orders">
          {[
            { name: 'Wdrożenie CRM', status: 'W realizacji', pct: '68%', color: '#8b5cf6' },
            { name: 'Migracja danych', status: 'Weryfikacja', pct: '90%', color: '#10b981' },
            { name: 'Szkolenie zespołu', status: 'Zaplanowane', pct: '15%', color: '#f59e0b' },
            { name: 'Integracja ERP', status: 'Oczekuje', pct: '0%', color: '#94a3b8' },
          ].map((order) => (
            <div key={order.name} className="sw-mock-portal-order">
              <div className="sw-mock-portal-order-info">
                <span className="sw-mock-portal-order-name">{order.name}</span>
                <span className="sw-mock-portal-order-status" style={{ color: order.color }}>{order.status}</span>
              </div>
              <div className="sw-mock-portal-progress-track">
                <div className="sw-mock-portal-progress-bar" style={{ width: order.pct, background: order.color }} />
              </div>
              <span className="sw-mock-portal-pct">{order.pct}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sw-mock-table-card">
        <div className="sw-mock-table-header">
          <span className="sw-mock-chart-title">Ostatnie dokumenty</span>
          <span className="sw-mock-table-badge">18 plików</span>
        </div>
        <div className="sw-mock-activity-list">
          {[
            { time: 'Dziś', text: 'Umowa_wdrożenie_v3.pdf', color: '#8b5cf6', icon: 'file-text' },
            { time: 'Wczoraj', text: 'Raport_postępu_marzec.xlsx', color: '#10b981', icon: 'file-text' },
            { time: '15 mar', text: 'Specyfikacja_integracji.pdf', color: '#3b82f6', icon: 'file-text' },
            { time: '12 mar', text: 'Faktura_FV_2026_0089.pdf', color: '#f59e0b', icon: 'file-text' },
            { time: '10 mar', text: 'Protokol_odbioru.pdf', color: '#10b981', icon: 'check' },
          ].map((item) => (
            <div key={item.text} className="sw-mock-activity-item">
              <span className="sw-mock-activity-time">{item.time}</span>
              <div className="sw-mock-activity-icon" style={{ background: `${item.color}18`, color: item.color }}>
                <Icon name={item.icon} size={8} strokeWidth={2.5} />
              </div>
              <span className="sw-mock-activity-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 2: Dedykowane CRM
   ═══════════════════════════════════════ */

function MockupCRM() {
  return (
    <MockupShell
      tabTitle="CRM — SalesPipe"
      sidebarBg="#1a0a2e"
      logoBg="linear-gradient(135deg, #ec4899, #f472b6)"
      avatarBg="linear-gradient(135deg, #ec4899, #f9a8d4)"
      navItems={['Pipeline', 'Kontakty', 'Firmy', 'Aktywności', 'Raporty', 'Szablony']}
      breadcrumb={['SalesPipe', 'Pipeline sprzedaży']}
      topAction="+ Nowy deal"
      accentColor="#ec4899"
      stats={[
        { label: 'Wartość pipeline', value: '842K', change: '+12%', up: true },
        { label: 'Otwarte deale', value: '34', change: '+6', up: true },
        { label: 'Win rate', value: '38%', change: '+4pp', up: true },
        { label: 'Avg. cykl', value: '23 dni', change: '-3 dni', up: true },
      ]}
    >
      {/* Kanban pipeline */}
      <div className="sw-mock-kanban">
        {[
          { name: 'Kwalifikacja', count: 8, color: '#94a3b8', deals: [
            { name: 'TechCorp', val: '45K', hot: false },
            { name: 'DataSoft', val: '28K', hot: true },
            { name: 'LogiPro', val: '62K', hot: false },
          ]},
          { name: 'Ofertowanie', count: 6, color: '#ec4899', deals: [
            { name: 'MediaGroup', val: '120K', hot: true },
            { name: 'BudEx', val: '85K', hot: false },
          ]},
          { name: 'Negocjacje', count: 4, color: '#f59e0b', deals: [
            { name: 'RetailMax', val: '210K', hot: true },
            { name: 'FinServ', val: '95K', hot: false },
          ]},
          { name: 'Wygrane', count: 3, color: '#10b981', deals: [
            { name: 'AutoParts', val: '155K', hot: false },
          ]},
        ].map((col) => (
          <div key={col.name} className="sw-mock-kanban-col">
            <div className="sw-mock-kanban-header">
              <div className="sw-mock-kanban-dot" style={{ background: col.color }} />
              <span className="sw-mock-kanban-title">{col.name}</span>
              <span className="sw-mock-kanban-count">{col.count}</span>
            </div>
            <div className="sw-mock-kanban-cards">
              {col.deals.map((deal) => (
                <div key={deal.name} className="sw-mock-kanban-card">
                  <div className="sw-mock-kanban-card-top">
                    <span className="sw-mock-kanban-card-name">{deal.name}</span>
                    {deal.hot && <div className="sw-mock-kanban-hot" />}
                  </div>
                  <span className="sw-mock-kanban-card-val">{deal.val} PLN</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sw-mock-table-card">
        <div className="sw-mock-table-header">
          <span className="sw-mock-chart-title">Ostatnie aktywności</span>
          <span className="sw-mock-table-badge" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899' }}>Na żywo</span>
        </div>
        <div className="sw-mock-activity-list">
          {[
            { time: '14:32', text: 'MediaGroup — wysłano ofertę 120K PLN', color: '#ec4899', icon: 'send' },
            { time: '14:15', text: 'RetailMax — spotkanie zaplanowane na jutro', color: '#f59e0b', icon: 'calendar' },
            { time: '13:48', text: 'TechCorp — nowy lead z formularza www', color: '#3b82f6', icon: 'user-plus' },
            { time: '13:22', text: 'AutoParts — deal zamknięty: 155K PLN', color: '#10b981', icon: 'check' },
            { time: '12:55', text: 'FinServ — follow-up auto-email wysłany', color: '#8b5cf6', icon: 'mail' },
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
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 3: Dashboardy i analityka
   ═══════════════════════════════════════ */

function MockupDashboards() {
  return (
    <MockupShell
      tabTitle="Dashboard — WiseAnalytics"
      sidebarBg="#0c1929"
      logoBg="linear-gradient(135deg, #3b82f6, #60a5fa)"
      avatarBg="linear-gradient(135deg, #3b82f6, #93c5fd)"
      navItems={['Przegląd', 'Sprzedaż', 'Operacje', 'Finanse', 'Zespół', 'Eksport']}
      breadcrumb={['WiseAnalytics', 'Przegląd miesięczny']}
      accentColor="#3b82f6"
      stats={[
        { label: 'Przychód', value: '1.2M', change: '+18%', up: true },
        { label: 'Marża', value: '34%', change: '+2pp', up: true },
        { label: 'Nowi klienci', value: '47', change: '+23%', up: true },
        { label: 'Churn', value: '2.1%', change: '-0.4pp', up: true },
      ]}
    >
      <div className="sw-mock-chart-card">
        <div className="sw-mock-chart-header">
          <span className="sw-mock-chart-title">Przychód vs koszty</span>
          <div className="sw-mock-chart-tabs">
            <span className="active">Miesiąc</span>
            <span>Kwartał</span>
            <span>Rok</span>
          </div>
        </div>
        <div className="sw-mock-chart">
          <svg viewBox="0 0 320 100" className="sw-mock-chart-svg">
            {[20, 40, 60, 80].map(y => (
              <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#f0f0ee" strokeWidth="0.5" />
            ))}
            <path d="M0,75 Q40,68 80,58 T160,42 T240,30 T320,18" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <path d="M0,75 Q40,68 80,58 T160,42 T240,30 T320,18 V100 H0 Z" fill="url(#grad-dash)" />
            <path d="M0,80 Q40,76 80,70 T160,62 T240,56 T320,50" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6" />
            <defs>
              <linearGradient id="grad-dash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="160" cy="42" r="3" fill="#3b82f6" />
            <circle cx="240" cy="30" r="3" fill="#3b82f6" />
            <circle cx="320" cy="18" r="3" fill="#3b82f6" />
          </svg>
          <div className="sw-mock-chart-labels">
            <span>Sty</span><span>Lut</span><span>Mar</span><span>Kwi</span><span>Maj</span><span>Cze</span>
          </div>
        </div>
        <div className="sw-mock-chart-legend">
          <div className="sw-mock-legend-item"><div className="sw-mock-legend-dot" style={{ background: '#3b82f6' }} /><span>Przychód</span></div>
          <div className="sw-mock-legend-item"><div className="sw-mock-legend-dot" style={{ background: '#ef4444' }} /><span>Koszty</span></div>
        </div>
      </div>

      <div className="sw-mock-table-card">
        <div className="sw-mock-table-header">
          <span className="sw-mock-chart-title">Top usługi</span>
          <span className="sw-mock-table-badge" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>Marzec</span>
        </div>
        <div className="sw-mock-table">
          <div className="sw-mock-table-row head">
            <span>Usługa</span>
            <span>Przychód</span>
            <span>Marża</span>
            <span>Trend</span>
          </div>
          {[
            { name: 'Wdrożenia CRM', val: '380K', stage: '42%', pct: '+15%', color: '#3b82f6' },
            { name: 'Integracje', val: '290K', stage: '38%', pct: '+22%', color: '#10b981' },
            { name: 'Dashboardy', val: '210K', stage: '31%', pct: '+8%', color: '#8b5cf6' },
            { name: 'Automatyzacje', val: '185K', stage: '29%', pct: '+34%', color: '#f59e0b' },
            { name: 'Consulting', val: '135K', stage: '52%', pct: '-5%', color: '#ef4444' },
          ].map((item) => (
            <div key={item.name} className="sw-mock-table-row">
              <span className="sw-mock-deal-name">
                <div className="sw-mock-deal-dot" style={{ background: item.color }} />
                {item.name}
              </span>
              <span className="sw-mock-deal-val">{item.val}</span>
              <span className="sw-mock-deal-stage" style={{ '--sc': item.color } as React.CSSProperties}>{item.stage}</span>
              <span className="sw-mock-deal-pct" style={{ color: item.pct.startsWith('+') ? '#10b981' : '#ef4444' }}>{item.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 4: System operacyjny firmy
   ═══════════════════════════════════════ */

function MockupOperations() {
  return (
    <MockupShell
      tabTitle="Centrum operacyjne — WisePlatform"
      navItems={['Przegląd', 'Procesy', 'Zespół', 'Klienci', 'Raporty', 'Ustawienia']}
      breadcrumb={['WisePlatform', 'Przegląd operacyjny']}
      accentColor="#10b981"
      stats={[
        { label: 'Aktywne procesy', value: '83', change: '+7', up: true },
        { label: 'Zamknięte dziś', value: '24', change: '+31%', up: true },
        { label: 'Średni czas', value: '2.4h', change: '-18%', up: true },
        { label: 'Wąskie gardła', value: '3', change: '+1', up: false },
      ]}
    >
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
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 5: Automatyzacja procesów
   ═══════════════════════════════════════ */

function MockupWorkflow() {
  return (
    <MockupShell
      tabTitle="Automatyzacja procesów — FlowEngine"
      sidebarBg="#111827"
      logoBg="linear-gradient(135deg, #f59e0b, #fbbf24)"
      avatarBg="linear-gradient(135deg, #f59e0b, #fcd34d)"
      navItems={['Procesy', 'Kolejka', 'Automatyzacje', 'Szablony', 'Logi', 'API']}
      breadcrumb={['FlowEngine', 'Aktywne procesy']}
      topAction="+ Nowy proces"
      accentColor="#f59e0b"
      stats={[
        { label: 'W kolejce', value: '18', change: '-4', up: true },
        { label: 'W realizacji', value: '31', change: '+5', up: true },
        { label: 'Do akceptacji', value: '7', change: '+2', up: false },
        { label: 'Zakończone dziś', value: '42', change: '+67%', up: true },
      ]}
    >
      {/* Flow pipeline */}
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
            { label: 'Umowa', status: 'active', color: '#f59e0b' },
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

      {/* Activity log */}
      <div className="sw-mock-table-card">
        <div className="sw-mock-table-header">
          <span className="sw-mock-chart-title">Ostatnie akcje</span>
          <span className="sw-mock-table-badge" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Na żywo</span>
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
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 6: Helpdesk / obsługa zgłoszeń
   ═══════════════════════════════════════ */

function MockupHelpdesk() {
  return (
    <MockupShell
      tabTitle="Helpdesk — TicketFlow"
      sidebarBg="#1c1008"
      logoBg="linear-gradient(135deg, #f97316, #fb923c)"
      avatarBg="linear-gradient(135deg, #f97316, #fdba74)"
      navItems={['Zgłoszenia', 'Kolejka', 'SLA', 'Baza wiedzy', 'Raporty', 'Ustawienia']}
      breadcrumb={['TicketFlow', 'Wszystkie zgłoszenia']}
      topAction="+ Nowe zgłoszenie"
      accentColor="#f97316"
      stats={[
        { label: 'Otwarte', value: '23', change: '-3', up: true },
        { label: 'Krytyczne', value: '2', change: '+1', up: false },
        { label: 'Avg. czas reakcji', value: '14min', change: '-22%', up: true },
        { label: 'Rozwiązane dziś', value: '18', change: '+45%', up: true },
      ]}
    >
      <div className="sw-mock-chart-card sw-mock-ticket-list">
        <div className="sw-mock-chart-header">
          <span className="sw-mock-chart-title">Zgłoszenia</span>
          <div className="sw-mock-chart-tabs">
            <span className="active">Otwarte</span>
            <span>Moje</span>
            <span>Wszystkie</span>
          </div>
        </div>
        <div className="sw-mock-table">
          <div className="sw-mock-table-row head">
            <span>Priorytet</span>
            <span>Zgłoszenie</span>
            <span>Klient</span>
            <span>SLA</span>
          </div>
          {[
            { priority: 'Krytyczny', name: '#312 Brak dostępu do systemu', client: 'RetailMax', sla: '28min', pColor: '#ef4444', slaWarn: true },
            { priority: 'Wysoki', name: '#310 Błąd importu danych', client: 'TechCorp', sla: '2h 15m', pColor: '#f97316', slaWarn: false },
            { priority: 'Wysoki', name: '#308 Raport nie generuje się', client: 'MediaGroup', sla: '3h 40m', pColor: '#f97316', slaWarn: false },
            { priority: 'Średni', name: '#306 Pytanie o integrację API', client: 'DataSoft', sla: '5h 20m', pColor: '#f59e0b', slaWarn: false },
            { priority: 'Niski', name: '#305 Sugestia: nowy filtr', client: 'BudEx', sla: '1d 4h', pColor: '#10b981', slaWarn: false },
            { priority: 'Średni', name: '#303 Wolne ładowanie listy', client: 'LogiPro', sla: '4h 50m', pColor: '#f59e0b', slaWarn: false },
          ].map((ticket) => (
            <div key={ticket.name} className="sw-mock-table-row">
              <span className="sw-mock-deal-stage" style={{ '--sc': ticket.pColor } as React.CSSProperties}>{ticket.priority}</span>
              <span className="sw-mock-deal-name" style={{ gap: '4px' }}>
                <span>{ticket.name}</span>
              </span>
              <span className="sw-mock-deal-val">{ticket.client}</span>
              <span className={`sw-mock-ticket-sla ${ticket.slaWarn ? 'warn' : ''}`}>{ticket.sla}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sw-mock-table-card">
        <div className="sw-mock-table-header">
          <span className="sw-mock-chart-title">Czas reakcji</span>
          <span className="sw-mock-table-badge" style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>Dziś</span>
        </div>
        <div className="sw-mock-chart" style={{ flex: 1 }}>
          <svg viewBox="0 0 140 100" className="sw-mock-chart-svg">
            {/* Bar chart */}
            {[
              { x: 10, h: 45, color: '#f97316' },
              { x: 30, h: 30, color: '#f97316' },
              { x: 50, h: 55, color: '#f97316' },
              { x: 70, h: 20, color: '#10b981' },
              { x: 90, h: 35, color: '#f97316' },
              { x: 110, h: 15, color: '#10b981' },
            ].map((bar) => (
              <rect key={bar.x} x={bar.x} y={90 - bar.h} width="14" height={bar.h} rx="2" fill={bar.color} opacity="0.3" />
            ))}
            <line x1="0" y1="90" x2="140" y2="90" stroke="#eee" strokeWidth="0.5" />
          </svg>
          <div className="sw-mock-chart-labels">
            <span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span><span>14:00</span>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 7: Hub integracji
   ═══════════════════════════════════════ */

function MockupIntegrations() {
  return (
    <MockupShell
      tabTitle="Hub integracji — ConnectorOS"
      sidebarBg="#0f172a"
      logoBg="linear-gradient(135deg, #06b6d4, #22d3ee)"
      avatarBg="linear-gradient(135deg, #06b6d4, #67e8f9)"
      navItems={['Status', 'Połączenia', 'Przepływy', 'Logi', 'Monitoring', 'Klucze API']}
      breadcrumb={['ConnectorOS', 'Status integracji']}
      topAction="+ Dodaj system"
      accentColor="#06b6d4"
      stats={[
        { label: 'Połączone systemy', value: '8', change: 'OK', up: true },
        { label: 'Synchro dziś', value: '2.4K', change: '+340', up: true },
        { label: 'Avg. latency', value: '120ms', change: '-15ms', up: true },
        { label: 'Błędy (24h)', value: '2', change: '-86%', up: true },
      ]}
    >
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
            <div className="sw-mock-int-hub" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>Hub</div>
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
          <span className="sw-mock-table-badge" style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4' }}>Na żywo</span>
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
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP 8: HR i onboarding
   ═══════════════════════════════════════ */

function MockupHR() {
  return (
    <MockupShell
      tabTitle="HR System — PeopleOS"
      sidebarBg="#1e1145"
      logoBg="linear-gradient(135deg, #6366f1, #818cf8)"
      avatarBg="linear-gradient(135deg, #6366f1, #a5b4fc)"
      navItems={['Zespół', 'Onboarding', 'Grafiki', 'Wnioski', 'Dokumenty', 'Raporty']}
      breadcrumb={['PeopleOS', 'Onboarding']}
      topAction="+ Nowy pracownik"
      accentColor="#6366f1"
      stats={[
        { label: 'Pracownicy', value: '48', change: '+3', up: true },
        { label: 'W onboardingu', value: '4', change: 'Aktywne', up: true },
        { label: 'Wnioski', value: '7', change: 'Do akceptacji', up: false },
        { label: 'Szkolenia', value: '12', change: 'W tym miesiącu', up: true },
      ]}
    >
      {/* Onboarding progress */}
      <div className="sw-mock-chart-card">
        <div className="sw-mock-chart-header">
          <span className="sw-mock-chart-title">Onboarding w toku</span>
          <div className="sw-mock-chart-tabs">
            <span className="active">Aktywne</span>
            <span>Zakończone</span>
          </div>
        </div>
        <div className="sw-mock-onboarding-list">
          {[
            { name: 'Michał N.', role: 'Frontend Dev', progress: 72, steps: '8/11', startDate: '10 mar', color: '#6366f1' },
            { name: 'Agata W.', role: 'PM', progress: 45, steps: '5/11', startDate: '14 mar', color: '#f59e0b' },
            { name: 'Kamil R.', role: 'Backend Dev', progress: 90, steps: '10/11', startDate: '3 mar', color: '#10b981' },
            { name: 'Ewa D.', role: 'UX Designer', progress: 18, steps: '2/11', startDate: '17 mar', color: '#ec4899' },
          ].map((person) => (
            <div key={person.name} className="sw-mock-onboard-card">
              <div className="sw-mock-onboard-top">
                <div className="sw-mock-onboard-avatar" style={{ background: `linear-gradient(135deg, ${person.color}, ${person.color}88)` }}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="sw-mock-onboard-info">
                  <span className="sw-mock-onboard-name">{person.name}</span>
                  <span className="sw-mock-onboard-role">{person.role}</span>
                </div>
                <span className="sw-mock-onboard-steps">{person.steps}</span>
              </div>
              <div className="sw-mock-onboard-progress-track">
                <div className="sw-mock-onboard-progress-bar" style={{ width: `${person.progress}%`, background: person.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task checklist */}
      <div className="sw-mock-table-card">
        <div className="sw-mock-table-header">
          <span className="sw-mock-chart-title">Checklist: Michał N.</span>
          <span className="sw-mock-table-badge" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>8/11</span>
        </div>
        <div className="sw-mock-checklist">
          {[
            { text: 'Podpisanie umowy', done: true },
            { text: 'Konto w systemie', done: true },
            { text: 'Dostęp do repozytorium', done: true },
            { text: 'Sprzęt i narzędzia', done: true },
            { text: 'Szkolenie BHP', done: true },
            { text: 'Szkolenie wewnętrzne', done: true },
            { text: 'Buddy meeting', done: true },
            { text: 'Pierwszy code review', done: true },
            { text: 'Spotkanie z zespołem', done: false },
            { text: 'Ocena po 2 tygodniach', done: false },
            { text: 'Zamknięcie onboardingu', done: false },
          ].map((item) => (
            <div key={item.text} className={`sw-mock-check-item ${item.done ? 'done' : ''}`}>
              <div className={`sw-mock-check-box ${item.done ? 'done' : ''}`}>
                {item.done && <Icon name="check" size={7} strokeWidth={3} />}
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}

/* ═══════════════════════════════════════
   MOCKUP MAP + MAIN COMPONENT
   ═══════════════════════════════════════ */

const mockupMap: Record<string, { component: React.FC; caption: string }> = {
  'client-portal': {
    component: MockupClientPortal,
    caption: 'Panel klienta — zlecenia, dokumenty i komunikacja w jednym miejscu',
  },
  'custom-crm': {
    component: MockupCRM,
    caption: 'Dedykowany CRM — pipeline, kontakty i aktywności pod kontrolą',
  },
  'dashboards': {
    component: MockupDashboards,
    caption: 'Dashboard analityczny — KPI, przychody i trendy w czasie rzeczywistym',
  },
  'operations-os': {
    component: MockupOperations,
    caption: 'System operacyjny firmy — procesy, zespół i KPI w jednym miejscu',
  },
  'workflow-auto': {
    component: MockupWorkflow,
    caption: 'Automatyzacja procesów — zlecenia, akceptacje i eskalacje jadą same',
  },
  'helpdesk': {
    component: MockupHelpdesk,
    caption: 'Helpdesk — zgłoszenia, SLA i priorytety pod pełną kontrolą',
  },
  'integrations': {
    component: MockupIntegrations,
    caption: 'Hub integracji — dane przepływają między systemami automatycznie',
  },
  'hr-onboarding': {
    component: MockupHR,
    caption: 'System HR — onboarding, grafiki i wnioski bez papierologii',
  },
};

const demoIds = Object.keys(mockupMap);

export function SoftwarePanel() {
  const [activeMockup, setActiveMockup] = useState(demoIds[0]);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  const handleCardClick = (e: React.MouseEvent, demoId?: string) => {
    e.stopPropagation();
    if (!demoId) return;
    setActiveMockup(demoId);
  };

  // Safety fallback for stale state (e.g. after HMR)
  const entry = mockupMap[activeMockup] || mockupMap[demoIds[0]];
  const { component: ActiveMockup, caption } = entry;
  const activeColor = softwareTiles.find(t => t.demoId === activeMockup)?.color || '#10b981';
  const activeIdx = demoIds.indexOf(activeMockup);

  return (
    <div className="sw-panel">
      {/* Decorative background elements */}
      <div className="sw-bg-accent" style={{ '--accent': activeColor } as React.CSSProperties} />

      {/* Left — categories */}
      <div className="sw-left">
        <motion.div className="sw-header"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}>
          <div className="sw-eyebrow">
            <span className="sw-eyebrow-dot" />
            Co budujemy
            <span className="sw-eyebrow-count">{softwareTiles.length}</span>
          </div>
          <h2 className="sw-title">Z Excela do<br /><span className="sw-title-accent" style={{ '--accent': activeColor } as React.CSSProperties}>przewagi konkurencyjnej</span></h2>
          <p className="sw-subtitle">Przenosimy firmy z arkuszy, maili i chaosu do dedykowanych systemów, które dają realną przewagę nad konkurencją. Kliknij kategorię, żeby zobaczyć jak to wygląda.</p>
          <div className="sw-header-line" style={{ '--accent': activeColor } as React.CSSProperties} />
        </motion.div>

        <div className="sw-grid">
          {softwareTiles.map((t, i) => {
            const MiniPreview = miniPreviewMap[t.demoId || ''];
            const isActive = t.demoId === activeMockup;
            return (
              <motion.div
                className={`sw-card ${isActive ? 'sw-card-active' : ''}`}
                key={t.id}
                style={{ '--c': t.color, '--c-l': `${t.color}14`, '--c-m': `${t.color}28` } as React.CSSProperties}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: 'easeOut' }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => handleCardClick(e, t.demoId)}>
                <div className="sw-card-preview">
                  {MiniPreview && <MiniPreview color={t.color} />}
                  {isActive && <div className="sw-card-shimmer" />}
                </div>
                <div className="sw-card-bottom">
                  <div className="sw-card-icon">
                    <Icon name={t.icon} size={14} strokeWidth={2} />
                  </div>
                  <div className="sw-card-text">
                    <span className="sw-card-name">{t.name}</span>
                    <span className="sw-card-desc">{t.desc}</span>
                  </div>
                  {isActive && <span className="sw-card-active-indicator" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right — dynamic mockup */}
      <motion.div className="sw-right"
        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}>

        {/* Mockup label bar */}
        <div className="sw-mockup-bar">
          <div className="sw-mockup-live">
            <span className="sw-mockup-live-dot" />
            LIVE PREVIEW
          </div>
          <div className="sw-mockup-counter">
            {String(activeIdx + 1).padStart(2, '0')} / {String(demoIds.length).padStart(2, '0')}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="sw-mockup"
            key={activeMockup}
            style={{ '--mockup-accent': activeColor } as React.CSSProperties}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}>
            <ActiveMockup />
          </motion.div>
        </AnimatePresence>

        <div className="sw-mockup-caption">{caption}</div>

        {/* Mockup indicator dots — enhanced */}
        <div className="sw-mockup-dots">
          {demoIds.map((id, idx) => {
            const tileColor = softwareTiles[idx]?.color || '#10b981';
            return (
              <div key={id} className="sw-mockup-dot-wrap"
                onMouseEnter={() => setHoveredDot(id)}
                onMouseLeave={() => setHoveredDot(null)}>
                <button
                  className={`sw-mockup-dot ${id === activeMockup ? 'active' : ''}`}
                  style={{ '--dot-c': tileColor } as React.CSSProperties}
                  onClick={(e) => handleCardClick(e, id)}
                  aria-label={`Pokaż ${mockupMap[id].caption}`}
                />
                <AnimatePresence>
                  {hoveredDot === id && id !== activeMockup && (
                    <motion.span
                      className="sw-dot-tooltip"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}>
                      {softwareTiles[idx]?.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
