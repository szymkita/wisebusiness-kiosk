import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Icon } from './Icon';
import { generateIdeas } from '../services/ai';
import { encodeResults } from '../services/share';
import type { AIResults } from '../services/ai';
import './Inspirator.css';

/* ═══ DATA ═══ */

const industries = [
  { id: 'produkcja', name: 'Produkcja', icon: 'layers' },
  { id: 'ecommerce', name: 'E-commerce', icon: 'shopping-cart' },
  { id: 'b2b', name: 'Usługi B2B', icon: 'briefcase' },
  { id: 'logistyka', name: 'Logistyka', icon: 'truck' },
  { id: 'finanse', name: 'Finanse', icon: 'dollar-sign' },
  { id: 'hr', name: 'HR / Rekrutacja', icon: 'users' },
  { id: 'budownictwo', name: 'Budownictwo', icon: 'target' },
  { id: 'zdrowie', name: 'Medycyna', icon: 'activity' },
  { id: 'edukacja', name: 'Edukacja', icon: 'book-open' },
  { id: 'it', name: 'IT / Software', icon: 'code' },
  { id: 'nieruchomosci', name: 'Nieruchomości', icon: 'home' },
  { id: 'inna', name: 'Inna', icon: 'grid' },
];

const processes = [
  { id: 'sales', name: 'Sprzedaż', desc: 'Od pierwszego kontaktu do zamknięcia dealu' },
  { id: 'fulfillment', name: 'Realizacja zamówień', desc: 'Od zamówienia do dostarczenia klientowi' },
  { id: 'client-service', name: 'Obsługa klienta', desc: 'Zapytania, reklamacje, serwis posprzedażowy' },
  { id: 'projects', name: 'Projekty', desc: 'Planowanie, realizacja i rozliczenie projektów' },
  { id: 'finance', name: 'Rozliczenia', desc: 'Fakturowanie, koszty, kontrola rentowności' },
  { id: 'people', name: 'Ludzie', desc: 'Rekrutacja, wdrożenie, zarządzanie zespołem' },
  { id: 'quality', name: 'Jakość', desc: 'Standardy, kontrola, zgodność, audyty' },
  { id: 'operations', name: 'Operacje', desc: 'Magazyn, dostawy, codzienna koordynacja' },
];

const problems = [
  'Za dużo pracy ręcznej — kopiowanie, przepisywanie, klikanie',
  'Dane w wielu miejscach — brak jednego źródła prawdy',
  'Zbyt długi czas realizacji — klient lub szef czeka',
  'Brak widoczności — nie wiadomo co się dzieje na jakim etapie',
  'Zależność od ludzi — jak ktoś odejdzie, proces się sypie',
  'Powtarzające się błędy wynikające z ręcznej pracy',
  'Brak standaryzacji — każdy robi po swojemu',
  'Proces nie skaluje się — przy wzroście, chaos rośnie szybciej',
];

const goals = [
  { id: 'speed', label: 'Przyspieszyć', desc: 'Ten sam proces, ale 3–5× szybciej' },
  { id: 'errors', label: 'Wyeliminować błędy', desc: 'Zero pomyłek, zero reklamacji z tego powodu' },
  { id: 'scale', label: 'Rosnąć bez chaosu', desc: '2× więcej klientów bez 2× więcej ludzi' },
  { id: 'visibility', label: 'Mieć kontrolę', desc: 'Widzieć co się dzieje w firmie na żywo' },
];

const sizes = [
  { id: 'small', label: 'Do 20 osób' },
  { id: 'medium', label: '20–100 osób' },
  { id: 'large', label: '100+ osób' },
];

const loadingMessages = [
  'Analizuję Twój proces...',
  'Szukam wzorców w branży...',
  'Dopasowuję rozwiązania do celu...',
  'Już prawie...',
];

const difficultyLabels: Record<string, string> = {
  easy: 'Quick Win',
  medium: 'Game Changer',
  advanced: 'Wizja',
};

const MIN_PROBLEMS = 2;
const LOADING_MIN_MS = 7000;

const transition = { duration: 0.35, ease: 'easeOut' as const };
const variants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

/* ═══ COMPONENT ═══ */

interface Props { onClose: () => void; }

export function Inspirator({ onClose }: Props) {
  // 0=industry 1=process 2=problems 3=goal 4=size 5=loading 6=results 7=contact
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState('');
  const [selectedProcesses, setSelectedProcesses] = useState<typeof processes[0][]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [size, setSize] = useState('');
  const [results, setResults] = useState<AIResults | null>(null);
  const [prevIdeas, setPrevIdeas] = useState<string[]>([]);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const [phone, setPhone] = useState('+48');
  const [smsSent, setSmsSent] = useState(false);
  const aiRef = useRef<Promise<AIResults> | null>(null);

  const go = useCallback((s: number) => setTimeout(() => setStep(s), 300), []);

  const pickIndustry = useCallback((name: string) => { setIndustry(name); go(1); }, [go]);

  const toggleProcess = useCallback((p: typeof processes[0]) => {
    setSelectedProcesses(prev =>
      prev.some(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]
    );
  }, []);

  const toggleProblem = useCallback((p: string) => {
    setSelectedProblems(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  }, []);

  const pickGoal = useCallback((label: string) => { setGoal(label); go(4); }, [go]);

  const processContext = selectedProcesses.map(p => `${p.name}: ${p.desc}`).join('; ');

  const pickSize = useCallback((label: string) => {
    setSize(label);
    const context = [
      `Procesy do usprawnienia: ${processContext}`,
      ...selectedProblems,
      `Cel: ${goal}`,
    ];
    const t0 = Date.now();
    aiRef.current = generateIdeas(industry, context, label);
    go(5);
    aiRef.current.then(data => {
      const wait = Math.max(0, LOADING_MIN_MS - (Date.now() - t0));
      setTimeout(() => { setResults(data); setPrevIdeas(data.ideas.map(i => i.title)); setStep(6); }, wait);
    });
  }, [industry, processContext, selectedProblems, goal, go]);

  useEffect(() => {
    if (step !== 5) return;
    setLoadingIdx(0);
    const t = setInterval(() => setLoadingIdx(i => Math.min(i + 1, loadingMessages.length - 1)), 2000);
    return () => clearInterval(t);
  }, [step]);

  const moreIdeas = useCallback(async () => {
    setMoreLoading(true);
    try {
      const ctx = [`Procesy: ${processContext}`, ...selectedProblems, `Cel: ${goal}`];
      const data = await generateIdeas(industry, ctx, size, prevIdeas);
      setResults(data);
      setPrevIdeas(prev => [...prev, ...data.ideas.map(i => i.title)]);
    } catch { /* keep current */ }
    setMoreLoading(false);
  }, [industry, processContext, selectedProblems, goal, size, prevIdeas]);

  // Generate share URL when results are ready
  const shareUrl = useMemo(() => {
    if (!results) return '';
    return encodeResults({
      industry,
      processes: selectedProcesses.map(p => p.name),
      goal,
      size,
      results,
    });
  }, [results, industry, selectedProcesses, goal, size]);

  const sendSms = useCallback(() => {
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 11) return;

    const session = {
      timestamp: new Date().toISOString(),
      industry, processes: selectedProcesses.map(p => p.name),
      problems: selectedProblems, goal, company_size: size,
      ai_diagnosis: results?.diagnosis.insight,
      ai_ideas: results?.ideas.map(i => i.title),
      phone: cleanPhone,
      share_url: shareUrl,
    };
    const sessions = JSON.parse(localStorage.getItem('inspirator_sessions') || '[]');
    sessions.push(session);
    localStorage.setItem('inspirator_sessions', JSON.stringify(sessions));
    fetch('https://hook.eu1.make.com/w6v0rygk3qgwy0lmqc3na4jr79vtvkqi', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    }).catch(() => {});
    setSmsSent(true);
    setTimeout(() => onClose(), 8000);
  }, [industry, selectedProcesses, selectedProblems, goal, size, results, phone, shareUrl, onClose]);

  const restart = useCallback(() => {
    setStep(0); setIndustry(''); setSelectedProcesses([]);
    setSelectedProblems([]); setGoal(''); setSize('');
    setResults(null); setPrevIdeas([]); setLoadingIdx(0);
    setPhone('+48'); setSmsSent(false);
  }, []);

  const labels = ['Branża', 'Proces', 'Problemy', 'Cel', 'Skala', 'Analiza', 'Wyniki', 'Kontakt'];
  const progressMax = 5;

  return (
    <motion.div className="insp"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}>

      <header className="insp-header">
        <button className="insp-close" onClick={step >= 6 ? restart : onClose}>
          <Icon name={step >= 6 ? 'refresh-cw' : 'x'} size={17} strokeWidth={2} />
        </button>
        <div className="insp-progress">
          {Array.from({ length: progressMax }).map((_, i) => (
            <div key={i} className={`insp-dot ${i < Math.min(step, progressMax) ? 'done' : ''} ${i === step ? 'now' : ''}`} />
          ))}
          <span className="insp-step-name">{labels[step]}</span>
        </div>
      </header>

      <AnimatePresence mode="wait">

        {/* 0 — Industry */}
        {step === 0 && (
          <motion.div className="insp-body" key="s0" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <h1 className="insp-q">W jakiej branży działasz?</h1>
            <div className="insp-grid-3">
              {industries.map((ind, i) => (
                <motion.button key={ind.id} className="insp-card-icon"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.025 }}
                  onClick={() => pickIndustry(ind.name)}>
                  <div className="insp-card-icon-circle">
                    <Icon name={ind.icon} size={18} strokeWidth={1.8} />
                  </div>
                  <span>{ind.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 1 — Process (multi-select 1-3) */}
        {step === 1 && (
          <motion.div className="insp-body" key="s1" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <h1 className="insp-q">Które procesy chcesz usprawnić?</h1>
            <p className="insp-hint">Zaznacz wszystkie, które chcesz usprawnić</p>
            <div className="insp-list">
              {processes.map((p, i) => {
                const on = selectedProcesses.some(x => x.id === p.id);
                return (
                  <motion.button key={p.id} className={`insp-card-row ${on ? 'insp-card-row--on' : ''}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.035 }}
                    onClick={() => toggleProcess(p)}>
                    <div className="insp-card-row-left">
                      <span className="insp-check-box">
                        {on && <Icon name="check-circle" size={14} strokeWidth={2.5} />}
                      </span>
                      <div>
                        <span className="insp-card-row-name">{p.name}</span>
                        <span className="insp-card-row-desc">{p.desc}</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2 — Problems */}
        {step === 2 && (
          <motion.div className="insp-body" key="s2" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <h1 className="insp-q">Co w tym procesie nie działa?</h1>
            <p className="insp-hint">Zaznacz wszystko, co pasuje</p>
            <div className="insp-list">
              {problems.map((p, i) => {
                const on = selectedProblems.includes(p);
                return (
                  <motion.button key={p} className={`insp-check-row ${on ? 'on' : ''}`}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.025 }}
                    onClick={() => toggleProblem(p)}>
                    <span className="insp-check-box">
                      {on && <Icon name="check-circle" size={14} strokeWidth={2.5} />}
                    </span>
                    <span>{p}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 3 — Goal */}
        {step === 3 && (
          <motion.div className="insp-body" key="s3" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <h1 className="insp-q">Co chcesz osiągnąć?</h1>
            <div className="insp-list insp-list--narrow">
              {goals.map((g, i) => (
                <motion.button key={g.id} className="insp-card-goal"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  onClick={() => pickGoal(g.label)}>
                  <span className="insp-card-goal-label">{g.label}</span>
                  <span className="insp-card-goal-desc">{g.desc}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 4 — Size */}
        {step === 4 && (
          <motion.div className="insp-body" key="s4" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <h1 className="insp-q">Ile osób pracuje w firmie?</h1>
            <div className="insp-sizes">
              {sizes.map((s, i) => (
                <motion.button key={s.id} className="insp-size-pill"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  onClick={() => pickSize(s.label)}>
                  {s.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* 5 — Loading */}
        {step === 5 && (
          <motion.div className="insp-body insp-body--center" key="s5" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <div className="insp-loader">
              <div className="insp-loader-ring" />
              <div className="insp-loader-ring insp-loader-ring--2" />
            </div>
            <AnimatePresence mode="wait">
              <motion.p className="insp-loader-text" key={loadingIdx}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                {loadingMessages[loadingIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}

        {/* 6 — Results */}
        {step === 6 && results && (
          <motion.div className="insp-body" key="s6" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <div className="insp-results">

              {/* Tags */}
              <div className="insp-tags">
                <span className="insp-tag">{industry}</span>
                {selectedProcesses.map(p => (
                  <span key={p.id} className="insp-tag">{p.name}</span>
                ))}
                <span className="insp-tag">{goal}</span>
              </div>

              {/* Diagnosis */}
              <motion.div className="insp-diag"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}>
                <span className="insp-diag-label">Diagnoza</span>
                <h2 className="insp-diag-title">{results.diagnosis.core_process}</h2>
                <p className="insp-diag-text">{results.diagnosis.insight}</p>
              </motion.div>

              {/* Ideas */}
              <div className="insp-ideas-section">
                <span className="insp-section-label">Pomysły na zmianę</span>
                {results.ideas.map((idea, i) => (
                  <motion.div className="insp-idea" key={idea.title}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}>

                    <div className="insp-idea-top">
                      <span className="insp-idea-n">{i + 1}</span>
                      <h3 className="insp-idea-name">{idea.title}</h3>
                      <span className={`insp-badge insp-badge--${idea.difficulty}`}>
                        {difficultyLabels[idea.difficulty] || idea.difficulty}
                      </span>
                    </div>

                    <p className="insp-idea-text">{idea.description}</p>

                    <div className="insp-ba">
                      <div className="insp-ba-col insp-ba-col--b">
                        <span className="insp-ba-label">Dziś</span>
                        <span className="insp-ba-text">{idea.before}</span>
                      </div>
                      <span className="insp-ba-arrow">→</span>
                      <div className="insp-ba-col insp-ba-col--a">
                        <span className="insp-ba-label">Po zmianie</span>
                        <span className="insp-ba-text">{idea.after}</span>
                      </div>
                    </div>

                    <span className="insp-impact">
                      <Icon name="zap" size={11} strokeWidth={2.5} />
                      {idea.impact}
                    </span>
                  </motion.div>
                ))}

                <button className="insp-more" onClick={moreIdeas} disabled={moreLoading}>
                  <Icon name="refresh-cw" size={13} strokeWidth={2} />
                  {moreLoading ? 'Generuję...' : 'Pokaż inne pomysły'}
                </button>
              </div>

              {/* CTA */}
              <motion.div className="insp-cta"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.5 }}>
                <p className="insp-cta-text">{results.cta}</p>
                <div className="insp-cta-row">
                  <button className="insp-btn" onClick={() => setStep(7)}>
                    <Icon name="download" size={14} strokeWidth={2} />
                    Zabierz pomysły ze sobą
                  </button>
                  <button className="insp-btn insp-btn--ghost" onClick={restart}>
                    Od nowa
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* 7 — Share: QR + SMS */}
        {step === 7 && !smsSent && (
          <motion.div className="insp-body" key="s7" variants={variants} initial="enter" animate="center" exit="exit" transition={transition}>
            <div className="insp-share">
              <h1 className="insp-q">Zabierz pomysły ze sobą</h1>
              <p className="insp-hint">Zeskanuj kod QR telefonem lub wyślij link SMS-em</p>

              {/* QR Code */}
              <div className="insp-qr-wrap">
                <div className="insp-qr-frame">
                  {shareUrl && (
                    <QRCodeSVG
                      value={shareUrl}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#1a1a1a"
                      level="L"
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                </div>
                <span className="insp-qr-label">Zeskanuj aparatem w telefonie</span>
              </div>

              {/* SMS */}
              <div className="insp-sms">
                <span className="insp-sms-label">lub wyślij link SMS-em</span>
                <div className="insp-sms-row">
                  <input type="tel" className="insp-input insp-input--phone"
                    value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+48 123 456 789" />
                  <button className="insp-btn" onClick={sendSms}
                    disabled={phone.replace(/[^0-9]/g, '').length < 11}>
                    <Icon name="send" size={14} strokeWidth={2} />
                    Wyślij
                  </button>
                </div>
              </div>

              <button className="insp-btn insp-btn--ghost" onClick={restart} style={{ marginTop: 8 }}>
                Zacznij od nowa
              </button>
            </div>
          </motion.div>
        )}

        {step === 7 && smsSent && (
          <motion.div className="insp-body insp-body--center" key="thx"
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="insp-done-icon">
              <Icon name="check-circle" size={28} strokeWidth={1.8} />
            </div>
            <h1 className="insp-q">Wysłano!</h1>
            <p className="insp-note">
              Link do pomysłów leci na Twój telefon. Wpadnij do nas na stanowisku!
            </p>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Footer for multi-select steps */}
      {step === 1 && (
        <div className="insp-footer">
          <span className="insp-counter">
            Wybrano: <strong>{selectedProcesses.length}</strong>
          </span>
          <button className="insp-btn" disabled={selectedProcesses.length < 1} onClick={() => setStep(2)}>
            {selectedProcesses.length < 1 ? 'Wybierz min. 1' : 'Dalej'}
            <Icon name="chevron-right" size={15} strokeWidth={2.5} />
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="insp-footer">
          <span className="insp-counter">
            Wybrano: <strong>{selectedProblems.length}</strong>
          </span>
          <button className="insp-btn" disabled={selectedProblems.length < MIN_PROBLEMS} onClick={() => setStep(3)}>
            {selectedProblems.length < MIN_PROBLEMS ? `Jeszcze ${MIN_PROBLEMS - selectedProblems.length}` : 'Dalej'}
            <Icon name="chevron-right" size={15} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
