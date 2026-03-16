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

  // Auto-switch only between tile tabs (not contact)
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
      <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />

      <header className="hdr">
        <Logo className="hdr-logo" />
        <span className="hdr-tag">Tworzymy oprogramowanie dla biznesu</span>
      </header>

      <nav className="tabs">
        {allTabs.map((t, i) => (
          <button key={t.id} className={`tab ${i === activeTab ? 'on' : ''}`}
            onClick={() => { setActiveTab(i); resetIdle(); }}>
            <Icon name={t.icon} size={15} strokeWidth={2} />
            {t.label}
            {t.id !== 'contact' && (
              <span className="tab-n">{tabs.find(x => x.id === t.id)?.tiles.length}</span>
            )}
          </button>
        ))}
      </nav>

      <main className="tiles">
        <AnimatePresence mode="wait">
          {isContact ? (
            <motion.div key="contact" className="contact-wrap"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              <ContactView />
            </motion.div>
          ) : tileTab ? (
            <motion.div className="grid" key={tileTab.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              {tileTab.tiles.map((t, i) => (
                <motion.button className="tile" key={t.id}
                  style={{ '--c': t.color, '--cbg': `${t.color}10`, '--cbrd': `${t.color}30` } as React.CSSProperties}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => onTile(t)}>
                  <div className="tile-ico"><Icon name={t.icon} size={22} strokeWidth={1.6} /></div>
                  <div className="tile-body">
                    <span className="tile-name">{t.name}</span>
                    <span className="tile-desc">{t.desc}</span>
                  </div>
                  {t.demoId && <span className="tile-go"><Icon name="arrow-up-right" size={13} strokeWidth={2.5} /></span>}
                </motion.button>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

    </div>
  );
}
