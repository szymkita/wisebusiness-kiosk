import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { generateIdeas } from '../services/ai';
import type { AIResults } from '../services/ai';
import './Inspirator.css';

/* ── Step 1: Industries ── */
const industries = [
  { id: 'produkcja', name: 'Produkcja', icon: 'layers' },
  { id: 'ecommerce', name: 'E-commerce / Retail', icon: 'shopping-cart' },
  { id: 'b2b', name: 'Usługi B2B', icon: 'briefcase' },
  { id: 'logistyka', name: 'Logistyka / Transport', icon: 'truck' },
  { id: 'finanse', name: 'Finanse / Księgowość', icon: 'dollar-sign' },
  { id: 'hr', name: 'HR / Rekrutacja', icon: 'users' },
  { id: 'budownictwo', name: 'Budownictwo', icon: 'target' },
  { id: 'zdrowie', name: 'Zdrowie / Medycyna', icon: 'activity' },
  { id: 'edukacja', name: 'Edukacja', icon: 'book-open' },
  { id: 'it', name: 'IT / Software House', icon: 'code' },
  { id: 'nieruchomosci', name: 'Nieruchomości', icon: 'home' },
  { id: 'inna', name: 'Inna', icon: 'grid' },
];

/* ── Step 2: Core activity ── */
const coreActivities = [
  { id: 'client-service', label: 'Obsługujemy klientów i realizujemy zlecenia', icon: 'message-circle' },
  { id: 'sales', label: 'Sprzedajemy produkty lub usługi', icon: 'shopping-cart' },
  { id: 'projects', label: 'Realizujemy projekty na zamówienie', icon: 'package' },
  { id: 'production', label: 'Produkujemy, przetwarzamy lub wytwarzamy', icon: 'layers' },
  { id: 'teams', label: 'Zarządzamy zespołami i koordynujemy pracę ludzi', icon: 'users' },
  { id: 'marketplace', label: 'Łączymy strony — dostawców, klientów, partnerów', icon: 'globe' },
];

/* ── Step 3: Current workflow (multi-select 2-3) ── */
const workflowIssues = [
  { text: 'Kluczowe dane trzymamy w Excelu lub na papierze', category: 'Narzędzia' },
  { text: 'Informacje latają mailem — ciężko coś potem znaleźć', category: 'Narzędzia' },
  { text: 'Ręcznie przenosimy dane między systemami lub osobami', category: 'Narzędzia' },
  { text: 'Każdy robi tę samą rzecz inaczej — brak jednego sposobu', category: 'Procesy' },
  { text: 'Kontrola jakości opiera się głównie na ludziach, nie na systemie', category: 'Procesy' },
  { text: 'Nie wiemy na czym zarabiamy, a na czym tracimy', category: 'Procesy' },
  { text: 'Klient musi dzwonić lub pisać żeby poznać status swojej sprawy', category: 'Klienci' },
  { text: 'Wdrożenie nowej osoby trwa tygodniami bo wiedza jest w głowach', category: 'Klienci' },
];

/* ── Step 4: Priority ── */
const priorities = [
  { id: 'speed', label: 'Szybkość', desc: 'Chcemy robić to samo, ale znacznie szybciej', icon: 'zap' },
  { id: 'quality', label: 'Jakość', desc: 'Chcemy wyeliminować błędy i reklamacje', icon: 'shield' },
  { id: 'scale', label: 'Skalowalność', desc: 'Chcemy rosnąć bez proporcjonalnego zatrudniania', icon: 'trending-up' },
  { id: 'control', label: 'Kontrola', desc: 'Chcemy widzieć co się dzieje w firmie na żywo', icon: 'eye' },
];

/* ── Step 5: Size ── */
const sizes = [
  { id: 'small', label: 'Do 20 osób', sub: 'Mały zespół, szybkie decyzje' },
  { id: 'medium', label: '20–100 osób', sub: 'Rosnąca firma, rosnące potrzeby' },
  { id: 'large', label: '100+ osób', sub: 'Duża organizacja, złożone procesy' },
];

const loadingMessages = [
  'Analizuję profil Twojej firmy...',
  'Szukam wzorców w branży...',
  'Dopasowuję pomysły do Twoich priorytetów...',
  'Już prawie gotowe...',
];

const difficultyLabels: Record<string, string> = {
  easy: 'Quick Win',
  medium: 'Game Changer',
  advanced: 'Wizja',
};

const MAX_ISSUES = 3;
const LOADING_MIN_MS = 7000;

const screenTransition = { duration: 0.4, ease: 'easeOut' as const };
const screenVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

interface Props {
  onClose: () => void;
}

export function Inspirator({ onClose }: Props) {
  // 0=industry, 1=activity, 2=workflow, 3=priority, 4=size, 5=loading, 6=results, 7=contact
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState('');
  const [activity, setActivity] = useState('');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [priority, setPriority] = useState('');
  const [size, setSize] = useState('');
  const [results, setResults] = useState<AIResults | null>(null);
  const [previousIdeas, setPreviousIdeas] = useState<string[]>([]);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const aiPromise = useRef<Promise<AIResults> | null>(null);

  const autoAdvance = useCallback((nextStep: number) => {
    setTimeout(() => setStep(nextStep), 350);
  }, []);

  // Step 0 → 1
  const selectIndustry = useCallback((name: string) => {
    setIndustry(name);
    autoAdvance(1);
  }, [autoAdvance]);

  // Step 1 → 2
  const selectActivity = useCallback((label: string) => {
    setActivity(label);
    autoAdvance(2);
  }, [autoAdvance]);

  // Toggle workflow issue
  const toggleIssue = useCallback((s: string) => {
    setSelectedIssues(prev => {
      if (prev.includes(s)) return prev.filter(x => x !== s);
      if (prev.length >= MAX_ISSUES) return prev;
      return [...prev, s];
    });
  }, []);

  // Step 3 → 4
  const selectPriority = useCallback((label: string) => {
    setPriority(label);
    autoAdvance(4);
  }, [autoAdvance]);

  // Step 4 → trigger AI + loading
  const selectSize = useCallback((sizeLabel: string) => {
    setSize(sizeLabel);

    const allContext = [
      activity,
      ...selectedIssues,
      `Priorytet: ${priority}`,
    ];

    const startTime = Date.now();
    aiPromise.current = generateIdeas(industry, allContext, sizeLabel);

    autoAdvance(5);

    aiPromise.current.then(data => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, LOADING_MIN_MS - elapsed);
      setTimeout(() => {
        setResults(data);
        setPreviousIdeas(data.ideas.map(i => i.title));
        setStep(6);
      }, remaining);
    });
  }, [industry, activity, selectedIssues, priority, autoAdvance]);

  // Loading messages
  useEffect(() => {
    if (step !== 5) return;
    setLoadingMsg(0);
    const timer = setInterval(() => {
      setLoadingMsg(prev => Math.min(prev + 1, loadingMessages.length - 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [step]);

  // More ideas
  const requestMoreIdeas = useCallback(async () => {
    setMoreLoading(true);
    try {
      const allContext = [activity, ...selectedIssues, `Priorytet: ${priority}`];
      const data = await generateIdeas(industry, allContext, size, previousIdeas);
      setResults(data);
      setPreviousIdeas(prev => [...prev, ...data.ideas.map(i => i.title)]);
    } catch { /* keep current */ }
    setMoreLoading(false);
  }, [industry, activity, selectedIssues, priority, size, previousIdeas]);

  // Save & send
  const sendEmail = useCallback(() => {
    const sessionData = {
      timestamp: new Date().toISOString(),
      industry,
      activity,
      workflow_issues: selectedIssues,
      priority,
      company_size: size,
      ai_diagnosis: results?.diagnosis.insight,
      ai_ideas: results?.ideas.map(i => i.title),
      email: email || undefined,
      requested_more_ideas: previousIdeas.length > 3,
    };

    const sessions = JSON.parse(localStorage.getItem('inspirator_sessions') || '[]');
    sessions.push(sessionData);
    localStorage.setItem('inspirator_sessions', JSON.stringify(sessions));

    fetch('https://hook.eu1.make.com/w6v0rygk3qgwy0lmqc3na4jr79vtvkqi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    }).catch(() => {});

    setSent(true);
    setTimeout(() => onClose(), 8000);
  }, [industry, activity, selectedIssues, priority, size, results, email, previousIdeas, onClose]);

  const restart = useCallback(() => {
    setStep(0);
    setIndustry('');
    setActivity('');
    setSelectedIssues([]);
    setPriority('');
    setSize('');
    setResults(null);
    setPreviousIdeas([]);
    setLoadingMsg(0);
    setEmail('');
    setSent(false);
  }, []);

  const totalSteps = 6;
  const progressStep = Math.min(step, 5);
  const stepLabels = ['Branża', 'Działalność', 'Realia', 'Priorytet', 'Skala', 'Analiza', 'Wyniki', 'Kontakt'];

  return (
    <motion.div className="insp"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>

      {/* Header */}
      <header className="insp-header">
        <button className="insp-close" onClick={step >= 6 ? restart : onClose}>
          <Icon name={step >= 6 ? 'refresh-cw' : 'x'} size={18} strokeWidth={2} />
        </button>
        <div className="insp-progress">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i}
              className={`insp-progress-dot ${i < progressStep ? 'done' : ''} ${i === progressStep ? 'active' : ''}`} />
          ))}
          <span className="insp-step-label">{stepLabels[step]}</span>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {/* ── STEP 0: Industry ── */}
        {step === 0 && (
          <motion.div className="insp-screen" key="s0"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">W jakiej branży działasz?</h1>
            <div className="insp-industry-grid">
              {industries.map((ind, i) => (
                <motion.button key={ind.id} className="insp-industry-tile"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  onClick={() => selectIndustry(ind.name)}>
                  <div className="insp-industry-icon">
                    <Icon name={ind.icon} size={20} strokeWidth={1.8} />
                  </div>
                  <span className="insp-industry-name">{ind.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 1: Core Activity ── */}
        {step === 1 && (
          <motion.div className="insp-screen" key="s1"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">Czym zajmuje się Twoja firma na co dzień?</h1>
            <p className="insp-subtitle">Co jest sercem Waszego biznesu?</p>
            <div className="insp-activity-list">
              {coreActivities.map((a, i) => (
                <motion.button key={a.id} className="insp-activity-tile"
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => selectActivity(a.label)}>
                  <div className="insp-activity-icon">
                    <Icon name={a.icon} size={18} strokeWidth={1.8} />
                  </div>
                  <span>{a.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Workflow Issues ── */}
        {step === 2 && (
          <motion.div className="insp-screen" key="s2"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">Jak wygląda Wasza codzienna praca?</h1>
            <p className="insp-subtitle">Zaznacz 2–3 rzeczy, które najlepiej opisują Waszą rzeczywistość</p>
            <div className="insp-issues">
              {['Narzędzia', 'Procesy', 'Klienci'].map(cat => (
                <div key={cat} className="insp-issue-group">
                  <span className="insp-issue-cat">{cat}</span>
                  <div className="insp-issue-list">
                    {workflowIssues.filter(w => w.category === cat).map((w, i) => {
                      const sel = selectedIssues.includes(w.text);
                      const dis = !sel && selectedIssues.length >= MAX_ISSUES;
                      return (
                        <motion.button key={w.text}
                          className={`insp-issue-tile ${sel ? 'selected' : ''} ${dis ? 'disabled' : ''}`}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.03 }}
                          onClick={() => !dis && toggleIssue(w.text)}>
                          <div className="insp-issue-check">
                            {sel && <Icon name="check-circle" size={14} strokeWidth={2.5} />}
                          </div>
                          <span>{w.text}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Priority ── */}
        {step === 3 && (
          <motion.div className="insp-screen" key="s3"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">Gdybyś mógł zmienić jedną rzecz — co by to było?</h1>
            <div className="insp-priority-list">
              {priorities.map((p, i) => (
                <motion.button key={p.id} className="insp-priority-tile"
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={() => selectPriority(p.label)}>
                  <div className="insp-priority-icon">
                    <Icon name={p.icon} size={20} strokeWidth={1.8} />
                  </div>
                  <div className="insp-priority-text">
                    <span className="insp-priority-label">{p.label}</span>
                    <span className="insp-priority-desc">{p.desc}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 4: Size ── */}
        {step === 4 && (
          <motion.div className="insp-screen" key="s4"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">Jak duża jest Twoja firma?</h1>
            <div className="insp-size-list">
              {sizes.map((s, i) => (
                <motion.button key={s.id} className="insp-size-tile"
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={() => selectSize(s.label)}>
                  <span className="insp-size-title">{s.label}</span>
                  <span className="insp-size-sub">{s.sub}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 5: Loading ── */}
        {step === 5 && (
          <motion.div className="insp-screen" key="s5"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <div className="insp-loading">
              <div className="insp-loading-anim">
                <div className="insp-loading-ring" />
                <div className="insp-loading-ring" />
                <div className="insp-loading-center">
                  <Icon name="zap" size={22} strokeWidth={1.8} />
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p className="insp-loading-text" key={loadingMsg}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  {loadingMessages[loadingMsg]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── STEP 6: Results ── */}
        {step === 6 && results && (
          <motion.div className="insp-screen" key="s6"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <div className="insp-results">
              {/* Context summary */}
              <motion.div className="insp-context"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}>
                <span className="insp-context-tag">{industry}</span>
                <span className="insp-context-sep">·</span>
                <span className="insp-context-tag">{priority}</span>
                <span className="insp-context-sep">·</span>
                <span className="insp-context-tag">{size}</span>
              </motion.div>

              {/* Diagnosis */}
              <motion.div className="insp-diagnosis"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}>
                <span className="insp-diagnosis-eyebrow">Diagnoza</span>
                <h2 className="insp-diagnosis-process">{results.diagnosis.core_process}</h2>
                <p className="insp-diagnosis-insight">{results.diagnosis.insight}</p>
              </motion.div>

              {/* Ideas */}
              <div className="insp-ideas">
                <span className="insp-ideas-eyebrow">3 pomysły na zmianę</span>
                {results.ideas.map((idea, i) => (
                  <motion.div className="insp-idea" key={idea.title}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.1 }}>

                    <div className="insp-idea-header">
                      <span className="insp-idea-num">{i + 1}</span>
                      <div className="insp-idea-title-wrap">
                        <h3 className="insp-idea-title">{idea.title}</h3>
                        <span className={`insp-idea-badge insp-idea-badge--${idea.difficulty}`}>
                          {difficultyLabels[idea.difficulty] || idea.difficulty}
                        </span>
                      </div>
                    </div>

                    <p className="insp-idea-desc">{idea.description}</p>

                    <div className="insp-idea-comparison">
                      <div className="insp-idea-side insp-idea-side--before">
                        <span className="insp-idea-side-label">Dziś</span>
                        <span className="insp-idea-side-text">{idea.before}</span>
                      </div>
                      <div className="insp-idea-arrow">→</div>
                      <div className="insp-idea-side insp-idea-side--after">
                        <span className="insp-idea-side-label">Po zmianie</span>
                        <span className="insp-idea-side-text">{idea.after}</span>
                      </div>
                    </div>

                    <div className="insp-idea-impact">
                      <Icon name="zap" size={12} strokeWidth={2.5} />
                      {idea.impact}
                    </div>
                  </motion.div>
                ))}

                <button className="insp-btn-more"
                  onClick={requestMoreIdeas} disabled={moreLoading}>
                  <Icon name="refresh-cw" size={14} strokeWidth={2} />
                  {moreLoading ? 'Generuję nowe pomysły...' : 'Pokaż 3 inne pomysły'}
                </button>
              </div>

              {/* CTA */}
              <motion.div className="insp-cta-section"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}>
                <p className="insp-cta-text">{results.cta}</p>
                <div className="insp-cta-buttons">
                  <button className="insp-btn-primary" onClick={() => setStep(7)}>
                    <Icon name="send" size={15} strokeWidth={2} />
                    Wyślij mi te pomysły
                  </button>
                  <button className="insp-btn-secondary" onClick={restart}>
                    <Icon name="refresh-cw" size={15} strokeWidth={2} />
                    Od nowa
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 7: Contact ── */}
        {step === 7 && !sent && (
          <motion.div className="insp-screen" key="s7"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <div className="insp-contact">
              <h1 className="insp-title">Gdzie wysłać pomysły?</h1>
              <input type="email" className="insp-email-input"
                placeholder="twoj@email.pl" value={email}
                onChange={e => setEmail(e.target.value)} autoFocus />
              <button className="insp-btn-primary"
                onClick={sendEmail} disabled={!email.includes('@')}>
                <Icon name="send" size={15} strokeWidth={2} />
                Wyślij
              </button>
              <p className="insp-contact-note">
                Otrzymasz raport z pomysłami + 2 dodatkowe, których tu nie widziałeś
              </p>
              <button className="insp-btn-secondary" onClick={sendEmail}>
                Pomiń
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Thank you ── */}
        {step === 7 && sent && (
          <motion.div className="insp-screen" key="thanks"
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div className="insp-thankyou">
              <div className="insp-thankyou-icon">
                <Icon name="check-circle" size={32} strokeWidth={1.8} />
              </div>
              <h1 className="insp-thankyou-title">Dziękujemy!</h1>
              <p className="insp-thankyou-text">
                {email
                  ? 'Pomysły lecą na Twój mail. Odwiedź nas na stanowisku — porozmawiajmy!'
                  : 'Zapisaliśmy Twoje wyniki. Wpadnij do nas na stanowisku!'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer — only on step 2 (workflow issues multi-select) */}
      {step === 2 && (
        <motion.div className="insp-footer"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}>
          <span className="insp-counter">
            Wybrano: <strong>{selectedIssues.length}</strong> / {MAX_ISSUES}
          </span>
          <button className="insp-next-btn"
            disabled={selectedIssues.length < 2}
            onClick={() => setStep(3)}>
            {selectedIssues.length < 2
              ? `Wybierz jeszcze ${2 - selectedIssues.length}`
              : 'Dalej'}
            <Icon name="chevron-right" size={16} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
