import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { inspirationIndustries } from '../data/inspirationMap';
import type { InspIndustry, AutomationIdea } from '../data/inspirationMap';
import './InspirationMap.css';

const ease = [0.16, 1, 0.3, 1] as const;
const transition = { duration: 0.35, ease };
const variants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export function InspirationMap() {
  const [industry, setIndustry] = useState<InspIndustry | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pickIndustry = useCallback((ind: InspIndustry) => {
    setIndustry(ind);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [industry]);

  const totalIdeas = industry
    ? industry.sections.reduce((sum, s) => sum + s.ideas.length, 0)
    : 0;

  return (
    <div className="imap">
      {/* Header */}
      <div className="imap-header">
        {industry && (
          <button className="imap-back" onClick={() => setIndustry(null)}>
            <Icon name="arrow-left" size={18} strokeWidth={2} />
          </button>
        )}
        <div className="imap-header-text">
          <span className="imap-title">
            {industry ? industry.name : 'Inspiracje'}
          </span>
          <span className="imap-breadcrumb">
            {industry
              ? `${totalIdeas} pomysłów — co możemy dla Ciebie zbudować`
              : 'Wybierz branżę i zobacz, jak pracować mądrzej'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="imap-body" ref={scrollRef}>
        <AnimatePresence mode="wait">

          {/* Step 1 — Industry picker */}
          {!industry && (
            <motion.div className="imap-content" key="industries"
              variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
              <div className="imap-grid">
                {inspirationIndustries.map((ind, i) => (
                  <motion.button className="imap-tile" key={ind.id}
                    style={{ '--c': ind.color, '--c-l': `${ind.color}15`, '--c-m': `${ind.color}28` } as React.CSSProperties}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease }}
                    onClick={() => pickIndustry(ind)}>
                    <div className="imap-tile-gradient" />
                    <div className="imap-tile-icon">
                      <Icon name={ind.icon} size={20} strokeWidth={1.8} />
                    </div>
                    <div className="imap-tile-info">
                      <span className="imap-tile-name">{ind.name}</span>
                      <span className="imap-tile-sub">{ind.subtitle}</span>
                    </div>
                    <div className="imap-tile-meta">
                      <span className="imap-tile-count">
                        {ind.sections.reduce((s, sec) => s + sec.ideas.length, 0)} pomysłów
                      </span>
                      <span className="imap-tile-arrow">
                        <Icon name="chevron-right" size={14} strokeWidth={2.5} />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — All ideas grouped by section */}
          {industry && (
            <motion.div className="imap-content" key={industry.id}
              variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>

              {industry.sections.map((section, si) => (
                <div className="imap-section" key={section.name}>
                  <motion.div className="imap-section-header"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: si * 0.06 }}>
                    <div className="imap-section-icon" style={{ '--c': industry.color, '--c-m': `${industry.color}25` } as React.CSSProperties}>
                      <Icon name={section.icon} size={16} strokeWidth={2} />
                    </div>
                    <span className="imap-section-name">{section.name}</span>
                  </motion.div>

                  <div className="imap-ideas">
                    {section.ideas.map((idea, ii) => (
                      <IdeaCard
                        key={idea.title}
                        idea={idea}
                        globalIndex={si * 10 + ii}
                        color={industry.color}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <motion.div className="imap-footer"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}>
                <button className="imap-footer-btn" onClick={() => setIndustry(null)}>
                  <Icon name="arrow-left" size={14} strokeWidth={2} />
                  Inna branża
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Idea Card ── */

function IdeaCard({ idea, globalIndex, color }: {
  idea: AutomationIdea;
  globalIndex: number;
  color: string;
}) {
  return (
    <motion.div className="imap-idea"
      style={{ '--c': color, '--c-l': `${color}10` } as React.CSSProperties}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 + globalIndex * 0.03, ease }}>

      <h3 className="imap-idea-title">{idea.title}</h3>
      <p className="imap-idea-desc">{idea.desc}</p>

      <div className="imap-idea-outcome">
        <Icon name="chevron-right" size={11} strokeWidth={2.5} />
        <span>{idea.outcome}</span>
      </div>
    </motion.div>
  );
}
