import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { inspirationIndustries } from '../data/inspirationMap';
import type { InspIndustry, Department, AutomationIdea } from '../data/inspirationMap';
import './InspirationMap.css';

const transition = { duration: 0.35, ease: "easeOut" as const };
const variants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const difficultyMeta: Record<string, { label: string; color: string }> = {
  easy: { label: 'Quick Win', color: '#10b981' },
  medium: { label: 'Game Changer', color: '#f59e0b' },
  advanced: { label: 'Wizja', color: '#8b5cf6' },
};

interface Props {
  onClose: () => void;
}

export function InspirationMap({ onClose }: Props) {
  const [industry, setIndustry] = useState<InspIndustry | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);

  const pickIndustry = useCallback((ind: InspIndustry) => {
    setIndustry(ind);
    setDepartment(null);
  }, []);

  const pickDepartment = useCallback((dept: Department) => {
    setDepartment(dept);
  }, []);

  const goBack = useCallback(() => {
    if (department) setDepartment(null);
    else if (industry) setIndustry(null);
    else onClose();
  }, [department, industry, onClose]);

  const stepKey = department ? 'ideas' : industry ? 'departments' : 'industries';
  const title = department
    ? department.name
    : industry
      ? industry.name
      : 'Mapa inspiracji';

  const breadcrumb = industry
    ? department
      ? `${industry.name} / ${department.name}`
      : industry.name
    : null;

  return (
    <motion.div className="imap"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.35, ease: "easeOut" as const }}>

      {/* Header */}
      <div className="imap-header">
        <button className="imap-back" onClick={goBack}>
          <Icon name="arrow-left" size={18} strokeWidth={2} />
        </button>
        <div className="imap-header-text">
          <span className="imap-title">{title}</span>
          {breadcrumb && !department && (
            <span className="imap-breadcrumb">Wybierz dział firmy</span>
          )}
          {department && (
            <span className="imap-breadcrumb">Pomysły na automatyzację</span>
          )}
          {!industry && (
            <span className="imap-breadcrumb">Wybierz branżę</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="imap-body">
        <AnimatePresence mode="wait">

          {/* Step 1 — Industries */}
          {stepKey === 'industries' && (
            <motion.div className="imap-content" key="industries"
              variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
              <div className="imap-grid">
                {inspirationIndustries.map((ind, i) => (
                  <motion.button className="imap-tile" key={ind.id}
                    style={{ '--c': ind.color, '--c-l': `${ind.color}15`, '--c-m': `${ind.color}28` } as React.CSSProperties}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" as const }}
                    onClick={() => pickIndustry(ind)}>
                    <div className="imap-tile-gradient" />
                    <div className="imap-tile-icon">
                      <Icon name={ind.icon} size={20} strokeWidth={1.8} />
                    </div>
                    <div className="imap-tile-info">
                      <span className="imap-tile-name">{ind.name}</span>
                      <span className="imap-tile-count">{ind.departments.length} działy</span>
                    </div>
                    <span className="imap-tile-arrow">
                      <Icon name="chevron-right" size={14} strokeWidth={2.5} />
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Departments */}
          {stepKey === 'departments' && industry && (
            <motion.div className="imap-content" key="departments"
              variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
              <div className="imap-dept-grid">
                {industry.departments.map((dept, i) => (
                  <motion.button className="imap-dept" key={dept.id}
                    style={{ '--c': industry.color, '--c-l': `${industry.color}12`, '--c-m': `${industry.color}25` } as React.CSSProperties}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" as const }}
                    onClick={() => pickDepartment(dept)}>
                    <div className="imap-dept-icon">
                      <Icon name={dept.icon} size={20} strokeWidth={1.8} />
                    </div>
                    <div className="imap-dept-info">
                      <span className="imap-dept-name">{dept.name}</span>
                      <span className="imap-dept-count">{dept.ideas.length} pomysły</span>
                    </div>
                    <span className="imap-dept-arrow">
                      <Icon name="chevron-right" size={14} strokeWidth={2.5} />
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Ideas */}
          {stepKey === 'ideas' && department && industry && (
            <motion.div className="imap-content" key="ideas"
              variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
              <div className="imap-ideas">
                {department.ideas.map((idea, i) => (
                  <IdeaCard key={idea.title} idea={idea} index={i} color={industry.color} />
                ))}
              </div>

              <motion.div className="imap-explore-more"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}>
                <p className="imap-explore-text">
                  Chcesz zobaczyć więcej działów?
                </p>
                <button className="imap-explore-btn" onClick={() => setDepartment(null)}>
                  <Icon name="arrow-left" size={14} strokeWidth={2} />
                  Wróć do działów
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Idea Card sub-component ── */

function IdeaCard({ idea, index, color }: { idea: AutomationIdea; index: number; color: string }) {
  const meta = difficultyMeta[idea.difficulty];

  return (
    <motion.div className="imap-idea"
      style={{ '--c': color, '--c-l': `${color}10`, '--badge-c': meta.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 + index * 0.1, ease: "easeOut" as const }}>

      <div className="imap-idea-header">
        <div className="imap-idea-num">{index + 1}</div>
        <div className="imap-idea-meta">
          <h3 className="imap-idea-title">{idea.title}</h3>
          <span className="imap-idea-badge" style={{ background: `${meta.color}18`, color: meta.color }}>
            {meta.label}
          </span>
        </div>
      </div>

      <p className="imap-idea-desc">{idea.desc}</p>

      <div className="imap-idea-footer">
        <div className="imap-idea-impact">
          <Icon name="zap" size={12} strokeWidth={2.5} />
          <span>{idea.impact}</span>
        </div>
      </div>
    </motion.div>
  );
}
