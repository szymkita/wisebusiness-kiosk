import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { ContactView } from '../components/ContactView';
import { tabs } from '../data/tiles';
import type { TileData } from '../data/tiles';
import './Home.css';

const allTabs = [
  ...tabs.map(t => ({ id: t.id, label: t.label, icon: t.icon })),
  { id: 'contact', label: 'Kontakt', icon: 'map-pin' },
];

export function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const idleRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const autoRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const tileTabCount = tabs.length;

  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => setActiveTab(p => (p + 1) % tileTabCount), 15000);
  }, [tileTabCount]);

  const resetIdle = useCallback(() => {
    clearTimeout(idleRef.current);
    clearInterval(autoRef.current);
    idleRef.current = setTimeout(startAuto, 30000);
  }, [startAuto]);

  useEffect(() => {
    startAuto();
    const h = () => resetIdle();
    document.addEventListener('pointerdown', h);
    return () => { clearInterval(autoRef.current); clearTimeout(idleRef.current); document.removeEventListener('pointerdown', h); };
  }, [startAuto, resetIdle]);

  const onTile = (t: TileData) => { if (t.demoId) navigate(`/demo/${t.demoId}`); };

  const isContact = allTabs[activeTab]?.id === 'contact';
  const tileTab = !isContact ? tabs[activeTab] : null;

  return (
    <div className="home">
      {/* Top bar — compact single row */}
      <header className="topbar">
        <Logo className="topbar-logo" />
        <span className="topbar-sep" />
        <span className="topbar-tagline">
          Pomagamy firmom pracować mądrzej
        </span>

        <nav className="topbar-tabs">
          {allTabs.map((t, i) => (
            <button key={t.id} className={`topbar-tab ${i === activeTab ? 'on' : ''}`}
              onClick={() => { setActiveTab(i); resetIdle(); }}>
              <Icon name={t.icon} size={13} strokeWidth={2} />
              <span>{t.label}</span>
              {t.id !== 'contact' && (
                <span className="topbar-tab-count">{tabs.find(x => x.id === t.id)?.tiles.length}</span>
              )}
              {i === activeTab && (
                <motion.div className="topbar-tab-bg" layoutId="tab-bg"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
              )}
            </button>
          ))}
        </nav>

        <div className="topbar-site">
          <span className="topbar-site-dot" />
          www.letsautomate.pl
        </div>
      </header>

      {/* Main content — fills everything below */}
      <main className="content">
        <AnimatePresence mode="wait">
          {isContact ? (
            <motion.div key="contact" className="contact-wrap"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <ContactView />
            </motion.div>
          ) : tileTab ? (
            <motion.div className="grid" key={tileTab.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              {tileTab.tiles.map((t, i) => (
                <motion.button className={`tile ${t.demoId ? 'tile--demo' : ''}`} key={t.id}
                  style={{
                    '--c': t.color,
                    '--c-l': `${t.color}18`,
                    '--c-m': `${t.color}30`,
                  } as React.CSSProperties}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onTile(t)}>
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
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
