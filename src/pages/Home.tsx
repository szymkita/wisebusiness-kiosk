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
      {/* Decorative background */}
      <div className="mesh">
        <div className="mesh-orb mesh-orb--1" />
        <div className="mesh-orb mesh-orb--2" />
        <div className="mesh-orb mesh-orb--3" />
        <div className="mesh-orb mesh-orb--4" />
        <div className="mesh-grid" />
      </div>

      <header className="hdr">
        <div className="hdr-left">
          <Logo className="hdr-logo" />
          <div className="hdr-divider" />
          <span className="hdr-tag">
            <span className="hdr-tag-accent">Tworzymy</span> oprogramowanie dla biznesu
          </span>
        </div>
        <div className="hdr-pill">
          <span className="hdr-pill-dot" />
          <span className="hdr-pill-text">www.letsautomate.pl</span>
        </div>
      </header>

      <nav className="tabs">
        <div className="tabs-track">
          {allTabs.map((t, i) => (
            <button key={t.id} className={`tab ${i === activeTab ? 'on' : ''}`}
              onClick={() => { setActiveTab(i); resetIdle(); }}>
              <Icon name={t.icon} size={14} strokeWidth={2} />
              <span className="tab-label">{t.label}</span>
              {t.id !== 'contact' && (
                <span className="tab-n">{tabs.find(x => x.id === t.id)?.tiles.length}</span>
              )}
              {i === activeTab && (
                <motion.div className="tab-indicator" layoutId="tab-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="tiles">
        <AnimatePresence mode="wait">
          {isContact ? (
            <motion.div key="contact" className="contact-wrap"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <ContactView />
            </motion.div>
          ) : tileTab ? (
            <motion.div className="grid" key={tileTab.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              {tileTab.tiles.map((t, i) => (
                <motion.button className={`tile ${t.demoId ? 'tile--has-demo' : ''}`} key={t.id}
                  style={{ '--c': t.color, '--cbg': `${t.color}10`, '--cbrd': `${t.color}30`, '--cglow': `${t.color}0a` } as React.CSSProperties}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onTile(t)}>
                  <div className="tile-glow" />
                  <div className="tile-top">
                    <div className="tile-ico">
                      <Icon name={t.icon} size={20} strokeWidth={1.6} />
                    </div>
                    {t.demoId && (
                      <span className="tile-go">
                        <Icon name="arrow-up-right" size={12} strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                  <div className="tile-body">
                    <span className="tile-name">{t.name}</span>
                    <span className="tile-desc">{t.desc}</span>
                  </div>
                  {t.demoId && <span className="tile-demo-badge">Demo</span>}
                </motion.button>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
