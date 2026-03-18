import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { industries } from '../data/industries';
import './IndustryPage.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
});

export function IndustryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = industries[id || ''];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!data) {
    return (
      <div className="ind">
        <div className="ind-topbar">
          <button className="ind-back" onClick={() => navigate('/')}>
            <Icon name="arrow-left" size={16} strokeWidth={2} /> Powrót
          </button>
        </div>
        <div className="ind-empty">
          <h2>Branża niedostępna</h2>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="ind"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ '--ind-c': data.color, '--ind-cl': `${data.color}10`, '--ind-cm': `${data.color}22`, '--ind-cs': `${data.color}40` } as React.CSSProperties}>

      {/* Sticky header */}
      <div className="ind-topbar">
        <button className="ind-back" onClick={() => navigate('/')}>
          <Icon name="arrow-left" size={14} strokeWidth={2.2} />
          <span>Powrót</span>
        </button>
        <div className="ind-topbar-center">
          <Logo className="ind-topbar-logo" />
        </div>
        <div className="ind-topbar-badge">
          <div className="ind-topbar-ico">
            <Icon name={data.icon} size={14} strokeWidth={2} />
          </div>
          <span>{data.name}</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="ind-scroll">

        {/* ═══════ HERO ═══════ */}
        <section className="ind-hero">
          <div className="ind-hero-bg">
            <div className="ind-hero-gradient" />
            <div className="ind-hero-pattern" />
          </div>
          <div className="ind-hero-content">
            <motion.div className="ind-hero-icon" {...fadeUp(0.1)}>
              <Icon name={data.icon} size={32} strokeWidth={1.5} />
            </motion.div>
            <motion.div className="ind-hero-eyebrow" {...fadeUp(0.15)}>
              {data.tagline}
            </motion.div>
            <motion.h1 className="ind-hero-title" {...fadeUp(0.2)}>
              {data.headline}
            </motion.h1>
            <motion.p className="ind-hero-intro" {...fadeUp(0.28)}>
              {data.intro}
            </motion.p>
            <motion.div className="ind-hero-actions" {...fadeUp(0.35)}>
              {data.demoId && (
                <button className="ind-btn ind-btn--primary" onClick={() => navigate(`/demo/${data.demoId}`)}>
                  <Icon name="monitor" size={16} strokeWidth={2} />
                  Zobacz demo
                </button>
              )}
              <button className="ind-btn ind-btn--outline" onClick={() => navigate('/')}>
                <Icon name="send" size={16} strokeWidth={2} />
                Porozmawiajmy
              </button>
            </motion.div>
          </div>
        </section>

        {/* ═══════ STATS BAR ═══════ */}
        <section className="ind-stats-bar">
          {data.stats.map((s, i) => (
            <motion.div className="ind-stat" key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}>
              <span className="ind-stat-val">
                {s.prefix}{s.value}{s.suffix}
              </span>
              <span className="ind-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </section>

        {/* ═══════ INTRO EXTENDED ═══════ */}
        <section className="ind-section ind-about">
          <div className="ind-about-text">
            <h2 className="ind-h2">Dlaczego {data.name.toLowerCase()}?</h2>
            <p className="ind-p">{data.introExtended}</p>
          </div>
          <div className="ind-about-visual">
            <div className="ind-about-ring ind-about-ring--1" />
            <div className="ind-about-ring ind-about-ring--2" />
            <div className="ind-about-icon">
              <Icon name={data.icon} size={40} strokeWidth={1.2} />
            </div>
          </div>
        </section>

        {/* ═══════ CHALLENGES ═══════ */}
        <section className="ind-section">
          <h2 className="ind-h2">Wyzwania, które rozwiązujemy</h2>
          <p className="ind-h2-sub">Znamy problemy Twojej branży — i mamy na nie sprawdzone odpowiedzi.</p>
          <div className="ind-challenges">
            {data.challenges.map((c, i) => (
              <motion.div className="ind-challenge" key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}>
                <div className="ind-challenge-problem">
                  <div className="ind-challenge-icon ind-challenge-icon--problem">
                    <Icon name="alert-triangle" size={14} strokeWidth={2} />
                  </div>
                  <span>{c.problem}</span>
                </div>
                <div className="ind-challenge-arrow">
                  <Icon name="chevron-right" size={14} strokeWidth={2.5} />
                </div>
                <div className="ind-challenge-solution">
                  <div className="ind-challenge-icon ind-challenge-icon--solution">
                    <Icon name="check-circle" size={14} strokeWidth={2} />
                  </div>
                  <span>{c.solution}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════ AUTOMATIONS ═══════ */}
        <section className="ind-section">
          <h2 className="ind-h2">Co najczęściej automatyzujemy</h2>
          <p className="ind-h2-sub">6 kluczowych obszarów, w których automatyzacja przynosi największe efekty.</p>
          <div className="ind-automations">
            {data.automations.map((a, i) => (
              <motion.div className="ind-auto" key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 + i * 0.06 }}>
                <div className="ind-auto-head">
                  <div className="ind-auto-ico">
                    <Icon name={a.icon} size={18} strokeWidth={1.8} />
                  </div>
                  <span className="ind-auto-num">0{i + 1}</span>
                </div>
                <h3 className="ind-auto-title">{a.title}</h3>
                <p className="ind-auto-desc">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════ PROCESS ═══════ */}
        <section className="ind-section ind-process-section">
          <h2 className="ind-h2">Jak pracujemy</h2>
          <p className="ind-h2-sub">Sprawdzony proces w 4 krokach — od analizy do działającego systemu.</p>
          <div className="ind-process">
            {data.process.map((s, i) => (
              <motion.div className="ind-step" key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}>
                <div className="ind-step-num">{i + 1}</div>
                <div className="ind-step-line" />
                <div className="ind-step-body">
                  <div className="ind-step-ico">
                    <Icon name={s.icon} size={16} strokeWidth={2} />
                  </div>
                  <h3 className="ind-step-title">{s.title}</h3>
                  <p className="ind-step-desc">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════ BENEFITS ═══════ */}
        <section className="ind-section">
          <h2 className="ind-h2">Konkretne rezultaty</h2>
          <p className="ind-h2-sub">Nie obiecujemy — pokazujemy liczby z naszych wdrożeń.</p>
          <div className="ind-benefits">
            {data.benefits.map((b, i) => (
              <motion.div className="ind-benefit" key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}>
                <div className="ind-benefit-val">{b.value}</div>
                <div className="ind-benefit-ico">
                  <Icon name={b.icon} size={16} strokeWidth={2} />
                </div>
                <h3 className="ind-benefit-title">{b.title}</h3>
                <p className="ind-benefit-desc">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════ CASE SNIPPET ═══════ */}
        <section className="ind-section">
          <div className="ind-case">
            <div className="ind-case-badge">Case study</div>
            <div className="ind-case-body">
              <div className="ind-case-left">
                <div className="ind-case-company">{data.caseSnippet.company}</div>
                <div className="ind-case-result">{data.caseSnippet.result}</div>
              </div>
              <div className="ind-case-right">
                <blockquote className="ind-case-quote">
                  „{data.caseSnippet.quote}"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ INTEGRATIONS ═══════ */}
        <section className="ind-section">
          <h2 className="ind-h2">Integracje i technologie</h2>
          <p className="ind-h2-sub">Łączymy się z narzędziami, które już znasz i używasz.</p>
          <div className="ind-integrations">
            {data.integrations.map((intg, i) => (
              <motion.div className="ind-intg" key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}>
                <span className="ind-intg-name">{intg.name}</span>
                <span className="ind-intg-cat">{intg.category}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="ind-section">
          <h2 className="ind-h2">Najczęstsze pytania</h2>
          <div className="ind-faq">
            {data.faq.map((f, i) => (
              <div className={`ind-faq-item ${openFaq === i ? 'ind-faq-item--open' : ''}`} key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="ind-faq-q">
                  <span>{f.q}</span>
                  <Icon name={openFaq === i ? 'x' : 'chevron-right'} size={14} strokeWidth={2.5} />
                </div>
                {openFaq === i && (
                  <motion.div className="ind-faq-a"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}>
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ CTA FOOTER ═══════ */}
        <section className="ind-cta">
          <div className="ind-cta-content">
            <h2 className="ind-cta-title">Gotowy na automatyzację?</h2>
            <p className="ind-cta-sub">Bezpłatna konsultacja — analizujemy Twoje procesy i proponujemy konkretne rozwiązania.</p>
            <div className="ind-cta-actions">
              <button className="ind-btn ind-btn--white" onClick={() => navigate('/')}>
                <Icon name="send" size={16} strokeWidth={2} />
                Umów konsultację
              </button>
              {data.demoId && (
                <button className="ind-btn ind-btn--ghost" onClick={() => navigate(`/demo/${data.demoId}`)}>
                  <Icon name="monitor" size={16} strokeWidth={2} />
                  Zobacz demo
                </button>
              )}
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
