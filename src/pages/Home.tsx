import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { ContactView } from '../components/ContactView';
import { CaseStudies } from '../components/CaseStudies';
import { Inspirator } from '../components/Inspirator';
import { InspirationMap } from '../components/InspirationMap';
import { tabs } from '../data/tiles';
import type { TileData } from '../data/tiles';
import './Home.css';

const dockItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'industries', label: 'Branże', icon: 'grid', count: tabs[0]?.tiles.length },
  { id: 'software', label: 'Oprogramowanie', icon: 'code', count: tabs[1]?.tiles.length },
  { id: 'inspiration', label: 'Mapa inspiracji', icon: 'target' },
  { id: 'cases', label: 'Case Studies', icon: 'trending-up', count: 35 },
  { id: 'contact', label: 'Kontakt', icon: 'map-pin' },
];

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
          Odpowiedz na 3 pytania — AI przygotuje spersonalizowane pomysły na automatyzację dla Twojej firmy
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
          <Inspirator onClose={() => setView('attract')} />
        )}
      </AnimatePresence>

      {/* Content panels (all views except home/inspirator) */}
      <AnimatePresence>
        {openPanel && (
          <motion.div className="home-panel" key={openPanel}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>

            <div className="home-panel-header home-panel-header--logo">
              <Logo className="home-panel-logo" />
            </div>

            <div className="home-panel-body">
              {openPanel === 'contact' ? <ContactView />
                : openPanel === 'cases' ? <CaseStudies />
                : openPanel === 'inspiration' ? <InspirationMap />
                : tileTab ? (
                  <div className="grid">
                    {tileTab.tiles.map((t, i) => (
                      <motion.button className={`tile ${t.demoId ? 'tile--demo' : ''}`}
                        key={t.id}
                        style={{ '--c': t.color, '--c-l': `${t.color}18`, '--c-m': `${t.color}30` } as React.CSSProperties}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
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
