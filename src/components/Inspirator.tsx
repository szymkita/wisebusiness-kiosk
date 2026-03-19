import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { generateIdeas } from '../services/ai';
import { inspirationIndustries } from '../data/inspirationMap';
import type { AIResults } from '../services/ai';
import './Inspirator.css';

/* ═══ DATA ═══ */

const industries = inspirationIndustries.map(ind => ({
  id: ind.id,
  name: ind.name,
  icon: ind.icon,
}));

interface ProcessOption {
  id: string;
  name: string;
  icon: string;
}

/* Get processes (sections) for selected industry */
function getProcessesForIndustry(industryId: string): ProcessOption[] {
  const ind = inspirationIndustries.find(i => i.id === industryId);
  if (!ind) return [];
  return ind.sections.map((s, i) => ({ id: `${industryId}-${i}`, name: s.name, icon: s.icon }));
}

/* Universal problems that apply per-area — shown grouped by selected process */
const universalProblems = [
  'Ręczna praca — przepisywanie, kopiowanie, klikanie w wielu miejscach',
  'Brak jednego źródła prawdy — dane w Excelach, mailach, głowach',
  'Brak widoczności — nie wiadomo co jest na jakim etapie',
  'Zależność od ludzi — jak ktoś odejdzie, proces się sypie',
  'Powtarzające się błędy i pomyłki',
  'Brak standaryzacji — każdy robi po swojemu',
  'Nie skaluje się — przy wzroście chaos rośnie szybciej',
  'Wdrożenie nowej osoby trwa tygodniami',
  'Brak raportów — decyzje na wyczucie',
  'Klient nie zna statusu — musi dzwonić',
];

const costs = [
  { id: 'clients', label: 'Tracimy klientów', desc: 'Odchodzą do szybszej konkurencji' },
  { id: 'money', label: 'Tracimy pieniądze', desc: 'Błędy, poprawki, nadgodziny, kary' },
  { id: 'people', label: 'Tracimy ludzi', desc: 'Wypalenie, rotacja, frustracja w zespole' },
  { id: 'time', label: 'Tracimy czas', desc: 'Ręcznie robimy to, co powinno działać samo' },
  { id: 'control', label: 'Tracimy kontrolę', desc: 'Nie wiemy co się naprawdę dzieje w firmie' },
];

const sizes = [
  { id: 'small', label: 'Do 20 osób', desc: 'Mały zespół, szybkie decyzje' },
  { id: 'medium', label: '20–100 osób', desc: 'Rosnąca firma, rośnie złożoność' },
  { id: 'large', label: '100+ osób', desc: 'Duża organizacja, duże procesy' },
];

const loadingMessages = [
  'Analizuję Twoje procesy...',
  'Szukam wzorców w branży...',
  'Dopasowuję rozwiązania...',
  'Już prawie...',
];

const difficultyLabels: Record<string, string> = {
  easy: 'Quick Win',
  medium: 'Game Changer',
  advanced: 'Wizja',
};

const MIN_PROBLEMS = 2;
const LOADING_MIN_MS = 7000;

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25 } };

interface Props { onClose: () => void; }

export function Inspirator({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [industryId, setIndustryId] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedProcesses, setSelectedProcesses] = useState<ProcessOption[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);
  const [size, setSize] = useState('');
  const [results, setResults] = useState<AIResults | null>(null);
  const [prevIdeas, setPrevIdeas] = useState<string[]>([]);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [typed, setTyped] = useState('+48');
  const aiRef = useRef<Promise<AIResults> | null>(null);

  const dialKeys = ['1','2','3','4','5','6','7','8','9','+','0','del'];
  const pressKey = useCallback((d: string) => {
    if (contactSent) return;
    if (d === 'del') { setTyped(prev => prev.slice(0, -1)); return; }
    setTyped(prev => prev + d);
  }, [contactSent]);
  const formatPhone = (raw: string) => {
    const c = raw.replace(/[^0-9+]/g, '');
    if (!c) return '';
    const m = c.match(/^(\+?\d{0,2})(\d{0,3})(\d{0,3})(\d{0,3})(.*)$/);
    if (!m) return c;
    return [m[1], m[2], m[3], m[4], m[5]].filter(Boolean).join(' ');
  };
  const phoneDigits = typed.replace(/^\+48/, '').replace(/[^0-9]/g, '').length;

  const go = useCallback((s: number) => setTimeout(() => setStep(s), 250), []);
  const pickIndustry = useCallback((id: string, name: string) => { setIndustryId(id); setIndustry(name); go(1); }, [go]);

  const availableProcesses = getProcessesForIndustry(industryId);
  const toggleProcess = useCallback((p: ProcessOption) => {
    setSelectedProcesses(prev => prev.some(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  }, []);
  const toggleProblem = useCallback((p: string) => {
    setSelectedProblems(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }, []);
  const toggleCost = useCallback((label: string) => {
    setSelectedCosts(prev => prev.includes(label) ? prev.filter(x => x !== label) : [...prev, label]);
  }, []);

  const processCtx = selectedProcesses.map(p => p.name).join('; ');

  const pickSize = useCallback((label: string) => {
    setSize(label);
    const ctx = [`Procesy do usprawnienia: ${processCtx}`, ...selectedProblems, `Największe koszty: ${selectedCosts.join(', ')}`];
    const t0 = Date.now();
    aiRef.current = generateIdeas(industry, ctx, label);
    go(5);
    aiRef.current.then(data => {
      const wait = Math.max(0, LOADING_MIN_MS - (Date.now() - t0));
      setTimeout(() => { setResults(data); setPrevIdeas(data.ideas.map(i => i.title)); setStep(6); }, wait);
    });
  }, [industry, processCtx, selectedProblems, selectedCosts, go]);

  useEffect(() => {
    if (step !== 5) return;
    setLoadingIdx(0);
    const t = setInterval(() => setLoadingIdx(i => Math.min(i + 1, loadingMessages.length - 1)), 2000);
    return () => clearInterval(t);
  }, [step]);

  const moreIdeas = useCallback(async () => {
    setMoreLoading(true);
    try {
      const ctx = [`Procesy: ${processCtx}`, ...selectedProblems, `Największe koszty: ${selectedCosts.join(', ')}`];
      const data = await generateIdeas(industry, ctx, size, prevIdeas);
      setResults(data);
      setPrevIdeas(prev => [...prev, ...data.ideas.map(i => i.title)]);
    } catch { /* keep */ }
    setMoreLoading(false);
  }, [industry, processCtx, selectedProblems, selectedCosts, size, prevIdeas]);

  const sendContact = useCallback(() => {
    if (phoneDigits < 9) return;
    const session = {
      timestamp: new Date().toISOString(), industry,
      processes: selectedProcesses.map(p => p.name), problems: selectedProblems,
      costs: selectedCosts, company_size: size, ai_diagnosis: results?.diagnosis.insight,
      ai_ideas: results?.ideas.map(i => i.title), phone: typed,
    };
    const sessions = JSON.parse(localStorage.getItem('inspirator_sessions') || '[]');
    sessions.push(session);
    localStorage.setItem('inspirator_sessions', JSON.stringify(sessions));
    fetch('https://hook.eu1.make.com/w6v0rygk3qgwy0lmqc3na4jr79vtvkqi', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    }).catch(() => {});
    setContactSent(true);
  }, [industry, selectedProcesses, selectedProblems, selectedCosts, size, results, typed, phoneDigits]);

  const restart = useCallback(() => {
    setStep(0); setIndustryId(''); setIndustry(''); setSelectedProcesses([]);
    setSelectedProblems([]); setSelectedCosts([]); setSize('');
    setResults(null); setPrevIdeas([]); setLoadingIdx(0);
    setTyped('+48'); setContactSent(false);
  }, []);

  const stepNames = ['Branża', 'Proces', 'Problemy', 'Koszt', 'Skala', 'Analiza', 'Wyniki', 'Udostępnij'];

  return (
    <motion.div className="insp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

      <header className="insp-header">
        <button className="insp-close" onClick={step >= 6 ? restart : onClose}>
          <Icon name={step >= 6 ? 'refresh-cw' : 'x'} size={17} strokeWidth={2} />
        </button>
        <div className="insp-progress">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`insp-dot ${i < Math.min(step, 5) ? 'done' : ''} ${i === step ? 'now' : ''}`} />
          ))}
          {step <= 7 && <span className="insp-step-name">{stepNames[step]}</span>}
        </div>
      </header>

      <AnimatePresence mode="wait">

        {/* 0 — Branża */}
        {step === 0 && (
          <motion.div className="insp-body" key="s0" {...fade}>
            <div className="insp-inner">
              <h1 className="insp-q">W jakiej branży działasz?</h1>
              <div className="insp-grid-3">
                {industries.map(ind => (
                  <button key={ind.id} className="insp-tile" onClick={() => pickIndustry(ind.id, ind.name)}>
                    <div className="insp-tile-icon"><Icon name={ind.icon} size={18} strokeWidth={1.8} /></div>
                    <span className="insp-tile-label">{ind.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 1 — Procesy */}
        {step === 1 && (
          <motion.div className="insp-body" key="s1" {...fade}>
            <div className="insp-inner">
              <span className="insp-ctx">{industry}</span>
              <h1 className="insp-q">Które procesy chcesz usprawnić?</h1>
              <p className="insp-hint">Zaznacz wszystkie, które dotyczą Twojej firmy</p>
              <div className="insp-opts">
                {availableProcesses.map(p => {
                  const on = selectedProcesses.some(x => x.id === p.id);
                  return (
                    <button key={p.id} className={`insp-opt ${on ? 'on' : ''}`} onClick={() => toggleProcess(p)}>
                      <span className="insp-chk">{on && <Icon name="check-circle" size={14} strokeWidth={2.5} />}</span>
                      <span className="insp-opt-body">
                        <span className="insp-opt-title">{p.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2 — Problemy (per-process) */}
        {step === 2 && (
          <motion.div className="insp-body" key="s2" {...fade}>
            <div className="insp-inner">
              <h1 className="insp-q">Co konkretnie nie działa?</h1>
              <p className="insp-hint">Zaznacz wszystko, co pasuje — im więcej, tym lepsza diagnoza</p>
              <div className="insp-opts">
                {universalProblems.map(p => {
                  const on = selectedProblems.includes(p);
                  return (
                    <button key={p} className={`insp-opt insp-opt--sm ${on ? 'on' : ''}`} onClick={() => toggleProblem(p)}>
                      <span className="insp-chk">{on && <Icon name="check-circle" size={14} strokeWidth={2.5} />}</span>
                      <span>{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3 — Koszt */}
        {step === 3 && (
          <motion.div className="insp-body" key="s3" {...fade}>
            <div className="insp-inner">
              <h1 className="insp-q">Co Was to kosztuje?</h1>
              <p className="insp-hint">Zaznacz wszystkie konsekwencje, które odczuwacie</p>
              <div className="insp-opts">
                {costs.map(c => {
                  const on = selectedCosts.includes(c.label);
                  return (
                    <button key={c.id} className={`insp-opt ${on ? 'on' : ''}`} onClick={() => toggleCost(c.label)}>
                      <span className="insp-chk">{on && <Icon name="check-circle" size={14} strokeWidth={2.5} />}</span>
                      <span className="insp-opt-body">
                        <span className="insp-opt-title">{c.label}</span>
                        <span className="insp-opt-sub">{c.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 4 — Skala */}
        {step === 4 && (
          <motion.div className="insp-body" key="s4" {...fade}>
            <div className="insp-inner insp-inner--narrow">
              <h1 className="insp-q">Ostatnie pytanie</h1>
              <p className="insp-hint">Jak duża jest Twoja firma?</p>
              <div className="insp-opts">
                {sizes.map(s => (
                  <button key={s.id} className="insp-opt" onClick={() => pickSize(s.label)}>
                    <span className="insp-opt-body">
                      <span className="insp-opt-title">{s.label}</span>
                      <span className="insp-opt-sub">{s.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 5 — Loading */}
        {step === 5 && (
          <motion.div className="insp-body insp-body--mid" key="s5" {...fade}>
            <div className="insp-loader"><div className="insp-loader-ring" /><div className="insp-loader-ring insp-loader-ring--2" /></div>
            <AnimatePresence mode="wait">
              <motion.p className="insp-loader-text" key={loadingIdx}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {loadingMessages[loadingIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}

        {/* 6 — Wyniki */}
        {step === 6 && results && (
          <motion.div className="insp-body" key="s6" {...fade}>
            <div className="insp-results">

              {/* Hero diagnosis */}
              <div className="res-hero">
                <span className="res-hero-label">Twoja diagnoza</span>
                <h1 className="res-hero-title">{results.diagnosis.core_process}</h1>
                <p className="res-hero-text">{results.diagnosis.insight}</p>
                <div className="res-hero-tags">
                  <span>{industry}</span>
                  {selectedProcesses.map(p => <span key={p.id}>{p.name}</span>)}
                  <span>{size}</span>
                </div>
              </div>

              {/* Ideas */}
              <div className="res-ideas">
                <h2 className="res-section-title">
                  {results.ideas.length} pomysłów na zmianę
                </h2>

                {results.ideas.map((idea, i) => {
                  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];
                  const accent = colors[i % colors.length];
                  return (
                    <div className="res-card" key={i} style={{ '--accent': accent } as React.CSSProperties}>
                      <div className="res-card-top">
                        <span className="res-card-num" style={{ background: `${accent}12`, color: accent }}>{i + 1}</span>
                        <div className="res-card-title-wrap">
                          <h3 className="res-card-title">{idea.title}</h3>
                          <span className={`res-card-badge res-card-badge--${idea.difficulty}`}>
                            {difficultyLabels[idea.difficulty] || idea.difficulty}
                          </span>
                        </div>
                      </div>

                      <p className="res-card-desc">{idea.description}</p>

                      <div className="res-card-compare">
                        <div className="res-card-side res-card-side--before">
                          <span className="res-card-side-label">Dziś</span>
                          {idea.before}
                        </div>
                        <div className="res-card-side res-card-side--after">
                          <span className="res-card-side-label">Po zmianie</span>
                          {idea.after}
                        </div>
                      </div>

                      <div className="res-card-impact">
                        <Icon name="zap" size={12} strokeWidth={2.5} />
                        <span>{idea.impact}</span>
                      </div>
                    </div>
                  );
                })}

                <button className="res-more" onClick={moreIdeas} disabled={moreLoading}>
                  <Icon name="refresh-cw" size={13} strokeWidth={2} />
                  {moreLoading ? 'Generuję...' : 'Wygeneruj inne pomysły'}
                </button>
              </div>

              {/* Contact dialer */}
              <div className="res-contact">
                <h2 className="res-contact-title">Porozmawiajmy, co możemy z tym zrobić</h2>
                <p className="res-contact-text">
                  To wygenerował AI w kilka sekund. Wyobraź sobie, co zrobimy gdy naprawdę poznamy Twoje procesy.
                </p>
                {contactSent ? (
                  <div className="res-contact-done">
                    <Icon name="check-circle" size={20} strokeWidth={2} />
                    <div>
                      <strong>Dziękujemy!</strong><br />
                      Oddzwonimy najszybciej jak to możliwe.
                    </div>
                  </div>
                ) : (
                  <div className="res-dialer">
                    <span className="res-dialer-label">Zostaw numer — oddzwonimy</span>
                    <div className={`res-dialer-display ${typed.length > 3 ? 'res-dialer-display--on' : ''}`}>
                      {formatPhone(typed) || '+48'}
                    </div>
                    <div className="res-dialer-keys">
                      {dialKeys.map(d => (
                        <button key={d} className={`res-dial-key ${d === 'del' ? 'res-dial-key--del' : ''}`}
                          onClick={() => pressKey(d)}>
                          {d === 'del' ? <Icon name="arrow-left" size={16} strokeWidth={2} /> : d}
                        </button>
                      ))}
                    </div>
                    <button className={`res-dial-send ${phoneDigits >= 9 ? '' : 'res-dial-send--off'}`}
                      onClick={phoneDigits >= 9 ? sendContact : undefined}>
                      <Icon name="zap" size={16} strokeWidth={2} />
                      Wyślij — oddzwonimy!
                    </button>
                  </div>
                )}
              </div>

              {/* Restart */}
              <div className="res-restart">
                <button className="res-bottom-link" onClick={restart}>
                  <Icon name="refresh-cw" size={13} strokeWidth={2} />
                  Zacznij od nowa
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {step === 1 && (
        <div className="insp-footer">
          <span className="insp-counter">Wybrano: <strong>{selectedProcesses.length}</strong></span>
          <button className="insp-btn" disabled={selectedProcesses.length < 1} onClick={() => setStep(2)}>
            {selectedProcesses.length < 1 ? 'Wybierz min. 1' : 'Dalej'} <Icon name="chevron-right" size={15} strokeWidth={2.5} />
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="insp-footer">
          <span className="insp-counter">Wybrano: <strong>{selectedProblems.length}</strong></span>
          <button className="insp-btn" disabled={selectedProblems.length < MIN_PROBLEMS} onClick={() => setStep(3)}>
            {selectedProblems.length < MIN_PROBLEMS ? `Jeszcze ${MIN_PROBLEMS - selectedProblems.length}` : 'Dalej'} <Icon name="chevron-right" size={15} strokeWidth={2.5} />
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="insp-footer">
          <span className="insp-counter">Wybrano: <strong>{selectedCosts.length}</strong></span>
          <button className="insp-btn" disabled={selectedCosts.length < 1} onClick={() => setStep(4)}>
            {selectedCosts.length < 1 ? 'Wybierz min. 1' : 'Dalej'} <Icon name="chevron-right" size={15} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
