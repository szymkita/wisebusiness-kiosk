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
  { id: 'inna', name: 'Inna branża', icon: 'grid' },
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
  'Za dużo pracy ręcznej — kopiowanie, przepisywanie, klikanie w wielu miejscach',
  'Dane rozsiane po Excelach, mailach i systemach — brak jednego źródła prawdy',
  'Zbyt długi czas realizacji — klient lub szef czeka na odpowiedź',
  'Brak widoczności — nie wiadomo co jest na jakim etapie i kto za co odpowiada',
  'Zależność od konkretnych ludzi — jak ktoś odejdzie, proces się sypie',
  'Powtarzające się błędy i pomyłki wynikające z ręcznej pracy',
  'Brak standaryzacji — każdy robi to samo inaczej',
  'Proces nie skaluje się — przy wzroście firmy chaos rośnie szybciej',
  'Trudne wdrożenie nowych osób — potrzeba tygodni zanim ktoś ogarnie',
  'Brak raportów i analityki — decyzje podejmowane na wyczucie',
  'Komunikacja przez telefon i maile — rzeczy giną i się opóźniają',
  'Klienci nie znają statusu — muszą dzwonić żeby się czegokolwiek dowiedzieć',
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
  const [industry, setIndustry] = useState('');
  const [selectedProcesses, setSelectedProcesses] = useState<typeof processes[0][]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [cost, setCost] = useState('');
  const [size, setSize] = useState('');
  const [results, setResults] = useState<AIResults | null>(null);
  const [prevIdeas, setPrevIdeas] = useState<string[]>([]);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const [phone, setPhone] = useState('+48');
  const [smsSent, setSmsSent] = useState(false);
  const aiRef = useRef<Promise<AIResults> | null>(null);

  const go = useCallback((s: number) => setTimeout(() => setStep(s), 250), []);
  const pickIndustry = useCallback((n: string) => { setIndustry(n); go(1); }, [go]);
  const toggleProcess = useCallback((p: typeof processes[0]) => {
    setSelectedProcesses(prev => prev.some(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  }, []);
  const toggleProblem = useCallback((p: string) => {
    setSelectedProblems(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }, []);
  const pickCost = useCallback((label: string) => { setCost(label); go(4); }, [go]);

  const processCtx = selectedProcesses.map(p => `${p.name}: ${p.desc}`).join('; ');

  const pickSize = useCallback((label: string) => {
    setSize(label);
    const ctx = [`Procesy do usprawnienia: ${processCtx}`, ...selectedProblems, `Największy koszt: ${cost}`];
    const t0 = Date.now();
    aiRef.current = generateIdeas(industry, ctx, label);
    go(5);
    aiRef.current.then(data => {
      const wait = Math.max(0, LOADING_MIN_MS - (Date.now() - t0));
      setTimeout(() => { setResults(data); setPrevIdeas(data.ideas.map(i => i.title)); setStep(6); }, wait);
    });
  }, [industry, processCtx, selectedProblems, cost, go]);

  useEffect(() => {
    if (step !== 5) return;
    setLoadingIdx(0);
    const t = setInterval(() => setLoadingIdx(i => Math.min(i + 1, loadingMessages.length - 1)), 2000);
    return () => clearInterval(t);
  }, [step]);

  const moreIdeas = useCallback(async () => {
    setMoreLoading(true);
    try {
      const ctx = [`Procesy: ${processCtx}`, ...selectedProblems, `Największy koszt: ${cost}`];
      const data = await generateIdeas(industry, ctx, size, prevIdeas);
      setResults(data);
      setPrevIdeas(prev => [...prev, ...data.ideas.map(i => i.title)]);
    } catch { /* keep */ }
    setMoreLoading(false);
  }, [industry, processCtx, selectedProblems, cost, size, prevIdeas]);

  const shareUrl = useMemo(() => {
    if (!results) return '';
    try { return encodeResults({ industry, processes: selectedProcesses.map(p => p.name), outcome: cost, size, results }); }
    catch { return ''; }
  }, [results, industry, selectedProcesses, cost, size]);

  const sendSms = useCallback(() => {
    const clean = phone.replace(/[^0-9+]/g, '');
    if (clean.length < 11) return;
    const session = {
      timestamp: new Date().toISOString(), industry,
      processes: selectedProcesses.map(p => p.name), problems: selectedProblems,
      cost, company_size: size, ai_diagnosis: results?.diagnosis.insight,
      ai_ideas: results?.ideas.map(i => i.title), phone: clean, share_url: shareUrl,
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
  }, [industry, selectedProcesses, selectedProblems, cost, size, results, phone, shareUrl, onClose]);

  const restart = useCallback(() => {
    setStep(0); setIndustry(''); setSelectedProcesses([]);
    setSelectedProblems([]); setCost(''); setSize('');
    setResults(null); setPrevIdeas([]); setLoadingIdx(0);
    setPhone('+48'); setSmsSent(false);
  }, []);

  const stepNames = ['Branża', 'Proces', 'Problemy', 'Koszt', 'Skala', 'Analiza', 'Wyniki', ''];

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
                  <button key={ind.id} className="insp-tile" onClick={() => pickIndustry(ind.name)}>
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
                {processes.map(p => {
                  const on = selectedProcesses.some(x => x.id === p.id);
                  return (
                    <button key={p.id} className={`insp-opt ${on ? 'on' : ''}`} onClick={() => toggleProcess(p)}>
                      <span className="insp-chk">{on && <Icon name="check-circle" size={14} strokeWidth={2.5} />}</span>
                      <span className="insp-opt-body">
                        <span className="insp-opt-title">{p.name}</span>
                        <span className="insp-opt-sub">{p.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2 — Problemy */}
        {step === 2 && (
          <motion.div className="insp-body" key="s2" {...fade}>
            <div className="insp-inner">
              <span className="insp-ctx">{selectedProcesses.map(p => p.name).join(', ')}</span>
              <h1 className="insp-q">Co w tych procesach nie działa?</h1>
              <p className="insp-hint">Zaznacz wszystko, co pasuje</p>
              <div className="insp-opts">
                {problems.map(p => {
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
              <p className="insp-hint">Co jest największą konsekwencją tych problemów?</p>
              <div className="insp-opts">
                {costs.map(c => (
                  <button key={c.id} className="insp-opt" onClick={() => pickCost(c.label)}>
                    <span className="insp-opt-body">
                      <span className="insp-opt-title">{c.label}</span>
                      <span className="insp-opt-sub">{c.desc}</span>
                    </span>
                  </button>
                ))}
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

              {/* Bottom CTA */}
              <div className="res-bottom">
                <p className="res-bottom-text">{results.cta}</p>
                <button className="res-bottom-btn" onClick={() => setStep(7)}>
                  <Icon name="download" size={15} strokeWidth={2} />
                  Zabierz pomysły ze sobą
                </button>
                <button className="res-bottom-link" onClick={restart}>
                  <Icon name="refresh-cw" size={13} strokeWidth={2} />
                  Zacznij od nowa
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* 7 — QR + SMS */}
        {step === 7 && !smsSent && (
          <motion.div className="insp-body" key="s7" {...fade}>
            <div className="insp-inner insp-inner--narrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 24 }}>
              <h1 className="insp-q">Zabierz pomysły ze sobą</h1>
              <p className="insp-hint">Zeskanuj kod QR telefonem</p>
              {shareUrl ? (
                <div className="insp-qr-frame">
                  <QRCodeSVG value={shareUrl} size={200} bgColor="#ffffff" fgColor="#1a1a1a" level="L" style={{ width: '100%', height: '100%' }} />
                </div>
              ) : (
                <div className="insp-qr-frame" style={{ border: '2px dashed rgba(0,0,0,0.1)' }}>
                  <span style={{ color: '#bbb', fontSize: 13, textAlign: 'center' as const }}>QR niedostępny</span>
                </div>
              )}
              <span className="insp-qr-caption">Otwórz aparat i zeskanuj kod</span>
              <div className="insp-divider"><span>lub wyślij SMS-em</span></div>
              <div className="insp-sms-row">
                <input type="tel" className="insp-input insp-input--phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+48 123 456 789" />
                <button className="insp-btn" onClick={sendSms} disabled={phone.replace(/[^0-9]/g, '').length < 11}>
                  <Icon name="send" size={14} strokeWidth={2} /> Wyślij
                </button>
              </div>
              <button className="insp-btn insp-btn--ghost" onClick={restart}>Zacznij od nowa</button>
            </div>
          </motion.div>
        )}

        {step === 7 && smsSent && (
          <motion.div className="insp-body insp-body--mid" key="thx" {...fade}>
            <div className="insp-done-icon"><Icon name="check-circle" size={28} strokeWidth={1.8} /></div>
            <h1 className="insp-q">Wysłano!</h1>
            <p className="insp-note">Link leci na Twój telefon. Wpadnij do nas na stanowisku!</p>
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
    </motion.div>
  );
}
