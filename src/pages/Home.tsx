import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { ContactView } from '../components/ContactView';
import { Inspirator } from '../components/Inspirator';
import { InspirationMap } from '../components/InspirationMap';
import { SoftwarePanel } from '../components/SoftwarePanel';
import { tabs } from '../data/tiles';
import type { TileData } from '../data/tiles';
import './Home.css';

const dockItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'inspiration', label: 'Inspiracje', icon: 'target' },
  { id: 'software', label: 'Co budujemy', icon: 'code', count: tabs[1]?.tiles.length },
  { id: 'demo', label: 'Demo', icon: 'monitor' },
  { id: 'contact', label: 'Kontakt', icon: 'map-pin' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DemoPanel({ navigate }: { navigate: (path: string) => void }) {
  const demoCards = [
    { id: 'custom-crm', icon: 'target', title: 'Dedykowane CRM', desc: 'Zarządzanie kontaktami, pipeline sprzedaży, aktywności i analityka w jednym miejscu.', color: '#ec4899', gradient: 'linear-gradient(135deg, #db2777, #ec4899)' },
    { id: 'hr', icon: 'users', title: 'Panel Klienta HR', desc: 'Śledzenie rekrutacji, pipeline kandydatów, raporty i komunikacja z agencją.', color: '#6366f1', gradient: 'linear-gradient(135deg, #4f46e5, #6366f1)' },
    { id: 'quoting', icon: 'file-text', title: 'System Ofertowania', desc: 'Konfigurator ofert, szablony, analityka sprzedaży — Swiss style design.', color: '#e11d48', gradient: 'linear-gradient(135deg, #be123c, #e11d48)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 'clamp(20px, 2.5vh, 36px)', textAlign: 'center', padding: '0 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ fontSize: 'clamp(18px, 1.5vw, 28px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-.03em', margin: 0 }}>
        Interaktywne demo
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ fontSize: 'clamp(11px, .75vw, 15px)', color: 'var(--text2)', maxWidth: '40vw', lineHeight: 1.6, margin: 0 }}>
        Dotknij, aby zobaczyć w pełni interaktywne demo naszych systemów — działające na ekranie dotykowym.
      </motion.p>
      <div style={{ display: 'flex', gap: 'clamp(12px, 1.2vw, 20px)', flexWrap: 'wrap', justifyContent: 'center' }}>
        {demoCards.map((d, i) => (
          <motion.button
            key={d.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: `0 8px 28px ${d.color}35` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/demo/${d.id}`)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px, .8vh, 14px)', padding: 'clamp(18px, 2vh, 28px) clamp(22px, 2vw, 36px)', background: '#fff', border: `1px solid ${d.color}20`, borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', width: 'clamp(180px, 14vw, 240px)' }}>
            <div style={{ width: 'clamp(44px, 3.5vw, 56px)', height: 'clamp(44px, 3.5vw, 56px)', borderRadius: 14, background: d.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px ${d.color}30` }}>
              <Icon name={d.icon} size={22} strokeWidth={1.8} style={{ color: '#fff' }} />
            </div>
            <div style={{ fontSize: 'clamp(13px, .9vw, 17px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-.02em' }}>{d.title}</div>
            <div style={{ fontSize: 'clamp(10px, .62vw, 13px)', color: 'var(--text2)', lineHeight: 1.5 }}>{d.desc}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.3vw', fontSize: 'clamp(11px, .7vw, 14px)', fontWeight: 700, color: d.color, marginTop: 'clamp(4px, .4vh, 8px)' }}>
              Otwórz <Icon name="arrow-up-right" size={14} strokeWidth={2.2} />
            </div>
          </motion.button>
        ))}
      </div>
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        style={{ fontSize: 'clamp(9px, .55vw, 11px)', color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: '.3vw' }}>
        <Icon name="eye" size={12} strokeWidth={2} /> W pełni interaktywne — kliknij i testuj
      </motion.span>
    </div>
  );
}

export function Home() {
  const [view, setView] = useState<'attract' | 'inspirator' | string>('attract');
  const navigate = useNavigate();

  const onTile = useCallback((t: TileData, panelId: string) => {
    if (panelId === 'industries') navigate(`/industry/${t.id}`);
    else if (t.demoId) navigate(`/demo/${t.demoId}`);
  }, [navigate]);

  const openPanel = typeof view === 'string' && view !== 'attract' && view !== 'inspirator'
    ? view : null;
  const tileTab = openPanel ? tabs.find(t => t.id === openPanel) : null;

  return (
    <div className="home">
      {/* Subtle background shapes */}
      <div className="home-bg">
        <div className="home-bg-shape home-bg-shape--1" />
        <div className="home-bg-shape home-bg-shape--2" />
      </div>

      {/* Header */}
      <header className="home-header">
        <Logo className="home-logo" />
      </header>

      {/* Hero */}
      <div className="hero">
        <motion.span className="hero-eyebrow"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Automatyzacja procesów
        </motion.span>

        <motion.h1 className="hero-title"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}>
          Odkryj, co automatyzacja może{' '}
          <span className="hero-title-accent">zmienić w Twojej firmie</span>
        </motion.h1>

        <motion.p className="hero-sub"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}>
          Odpowiedz na 4 pytania — AI przygotuje spersonalizowane pomysły na automatyzację dla Twojej firmy
        </motion.p>

        <motion.button className="hero-cta"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={() => setView('inspirator')}>
          <span className="hero-cta-icon">
            <Icon name="zap" size={15} strokeWidth={2.2} />
          </span>
          Zaczynamy
        </motion.button>

        <motion.span className="hero-hint"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}>
          Zajmie to 30 sekund
        </motion.span>
      </div>

      {/* Bottom dock */}
      <nav className="dock">
        <motion.div className="dock-bar"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}>
          {dockItems.map(item => (
            <button key={item.id}
              className={`dock-item ${item.id === 'home' ? (view === 'attract' ? 'active' : '') : openPanel === item.id ? 'active' : ''}`}
              onClick={() => setView(item.id === 'home' ? 'attract' : item.id)}>
              <Icon name={item.icon} size={15} strokeWidth={2} />
              <span>{item.label}</span>
              {item.count != null && (
                <span className="dock-item-count">{item.count}</span>
              )}
              {openPanel === item.id && (
                <motion.div className="dock-item-bg" layoutId="dock-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
              )}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Inspirator flow */}
      <AnimatePresence>
        {view === 'inspirator' && (
          <Inspirator onClose={() => setView('attract')} onNavigate={(id) => setView(id)} />
        )}
      </AnimatePresence>

      {/* Content panels (all views except home/inspirator) */}
      <AnimatePresence>
        {openPanel && (
          <motion.div className="home-panel"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>

            <div className="home-panel-header home-panel-header--logo">
              <Logo className="home-panel-logo" />
            </div>

            <div className="home-panel-body">
              <AnimatePresence mode="wait">
                <motion.div key={openPanel} className="home-panel-inner"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}>
                  {openPanel === 'contact' ? <ContactView onNavigateHome={() => setView('attract')} />
                    : openPanel === 'demo' ? <DemoPanel navigate={navigate} />
                    : openPanel === 'inspiration' ? <InspirationMap />
                    : openPanel === 'software' ? <SoftwarePanel />
                    : tileTab ? (
                      <div className="grid">
                        {tileTab.tiles.map((t, i) => (
                          <motion.button className={`tile ${t.demoId ? 'tile--demo' : ''}`}
                            key={t.id}
                            style={{ '--c': t.color, '--c-l': `${t.color}18`, '--c-m': `${t.color}30` } as React.CSSProperties}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: i * 0.02, ease: 'easeOut' }}
                            onClick={() => onTile(t, openPanel)}>
                            <div className="tile-gradient" />
                            <div className="tile-head">
                              <div className="tile-icon">
                                <Icon name={t.icon} size={18} strokeWidth={1.8} />
                              </div>
                              {t.demoId && (
                                <span className="tile-arrow">
                                  <Icon name="arrow-up-right" size={14} strokeWidth={2.5} />
                                </span>
                              )}
                            </div>
                            <div className="tile-info">
                              <span className="tile-name">{t.name}</span>
                              <span className="tile-desc">{t.desc}</span>
                            </div>
                            {t.demoId && <span className="tile-badge">Demo</span>}
                          </motion.button>
                        ))}
                      </div>
                    ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dock-style switcher */}
            <nav className="dock">
              <div className="dock-bar">
                {dockItems.map(item => {
                  const itemId = item.id === 'home' ? 'attract' : item.id;
                  return (
                    <button key={item.id}
                      className={`dock-item ${openPanel === item.id ? 'active' : ''}`}
                      onClick={() => setView(itemId)}>
                      <Icon name={item.icon} size={15} strokeWidth={2} />
                      <span>{item.label}</span>
                      {item.count != null && (
                        <span className="dock-item-count">{item.count}</span>
                      )}
                      {openPanel === item.id && (
                        <motion.div className="dock-item-bg" layoutId="panel-dock-bg"
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
