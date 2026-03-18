import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { generateIdeas } from '../services/ai';
import type { AIResults } from '../services/ai';
import './Inspirator.css';

/* ── Data ── */
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

const symptoms = [
  'Klienci pytają o status i nikt nie wie',
  'Nowy pracownik potrzebuje miesiąca żeby się wdrożyć',
  'Każdy dział ma swoją prawdę w swoim Excelu',
  'Wdrożenie klienta to za każdym razem improwizacja',
  'Szef pyta o raport i zaczyna się panika',
  'Tracimy klientów bo jesteśmy za wolni',
  'Jedna osoba odchodzi i zabiera wiedzę ze sobą',
  'Robimy te same rzeczy ręcznie każdego dnia',
  'Nie wiemy ile naprawdę zarabiamy na projekcie',
  'Reklamacje i błędy wynikają z ludzkich pomyłek',
  'Każda oferta wygląda inaczej bo każdy robi po swojemu',
  'Nie ogarniamy terminów i rzeczy się gubią',
];

const sizes = [
  { id: 'small', label: 'Do 20 osób', sub: 'Mały zespół, szybkie decyzje' },
  { id: 'medium', label: '20–100 osób', sub: 'Rosnąca firma, rosnące potrzeby' },
  { id: 'large', label: '100+ osób', sub: 'Duża organizacja, złożone procesy' },
];

const loadingMessages = [
  'Analizuję Twoje odpowiedzi...',
  'Szukam wzorców w Twojej branży...',
  'Przygotowuję pomysły...',
  'Już prawie gotowe...',
];

const difficultyLabels: Record<string, string> = {
  easy: 'Quick Win',
  medium: 'Game Changer',
  advanced: 'Wizja',
};

const MAX_SYMPTOMS = 3;
const LOADING_MIN_MS = 7000;

/* ── Animation variants ── */
const screenVariants = {
  enter: { opacity: 0, x: 80 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -80 },
};

const screenTransition = { duration: 0.45, ease: 'easeOut' as const };

interface Props {
  onClose: () => void;
}

export function Inspirator({ onClose }: Props) {
  const [step, setStep] = useState(0); // 0=industry, 1=symptoms, 2=size, 3=loading, 4=results, 5=contact
  const [industry, setIndustry] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [size, setSize] = useState('');
  const [results, setResults] = useState<AIResults | null>(null);
  const [previousIdeas, setPreviousIdeas] = useState<string[]>([]);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const aiPromise = useRef<Promise<AIResults> | null>(null);

  // Select industry → auto-advance
  const selectIndustry = useCallback((name: string) => {
    setIndustry(name);
    setTimeout(() => setStep(1), 400);
  }, []);

  // Toggle symptom
  const toggleSymptom = useCallback((s: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(s)) return prev.filter(x => x !== s);
      if (prev.length >= MAX_SYMPTOMS) return prev;
      return [...prev, s];
    });
  }, []);

  // Select size → trigger AI + go to loading
  const selectSize = useCallback((sizeLabel: string) => {
    setSize(sizeLabel);

    // Start AI call immediately
    const startTime = Date.now();
    aiPromise.current = generateIdeas(industry, selectedSymptoms, sizeLabel);

    setTimeout(() => setStep(3), 400);

    // Ensure minimum loading time
    aiPromise.current.then(data => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, LOADING_MIN_MS - elapsed);
      setTimeout(() => {
        setResults(data);
        setPreviousIdeas(data.ideas.map(i => i.title));
        setStep(4);
      }, remaining);
    });
  }, [industry, selectedSymptoms]);

  // Loading messages rotation
  useEffect(() => {
    if (step !== 3) return;
    setLoadingMsg(0);
    const timer = setInterval(() => {
      setLoadingMsg(prev => Math.min(prev + 1, loadingMessages.length - 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [step]);

  // "More ideas"
  const requestMoreIdeas = useCallback(async () => {
    setMoreLoading(true);
    try {
      const data = await generateIdeas(industry, selectedSymptoms, size, previousIdeas);
      setResults(data);
      setPreviousIdeas(prev => [...prev, ...data.ideas.map(i => i.title)]);
    } catch {
      // keep current results
    }
    setMoreLoading(false);
  }, [industry, selectedSymptoms, size, previousIdeas]);

  // Send email / save session
  const sendEmail = useCallback(() => {
    const sessionData = {
      timestamp: new Date().toISOString(),
      industry,
      symptoms: selectedSymptoms,
      company_size: size,
      ai_diagnosis: results?.diagnosis.insight,
      ai_ideas: results?.ideas.map(i => i.title),
      email: email || undefined,
      requested_more_ideas: previousIdeas.length > 3,
    };

    // Save to localStorage
    const sessions = JSON.parse(localStorage.getItem('inspirator_sessions') || '[]');
    sessions.push(sessionData);
    localStorage.setItem('inspirator_sessions', JSON.stringify(sessions));

    // Send to webhook (fire and forget)
    fetch('https://hook.eu1.make.com/w6v0rygk3qgwy0lmqc3na4jr79vtvkqi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sessionData),
    }).catch(() => {});

    setSent(true);
    setTimeout(() => onClose(), 8000);
  }, [industry, selectedSymptoms, size, results, email, previousIdeas, onClose]);

  // Restart
  const restart = useCallback(() => {
    setStep(0);
    setIndustry('');
    setSelectedSymptoms([]);
    setSize('');
    setResults(null);
    setPreviousIdeas([]);
    setLoadingMsg(0);
    setEmail('');
    setSent(false);
  }, []);

  const stepLabels = ['Branża', 'Bolączki', 'Skala', 'Analiza', 'Wyniki', 'Kontakt'];

  return (
    <motion.div
      className="insp"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}>

      {/* Background */}
      <div className="insp-bg">
        <div className="insp-bg-orb insp-bg-orb--1" />
        <div className="insp-bg-orb insp-bg-orb--2" />
        <div className="insp-bg-grid" />
      </div>

      {/* Header with progress */}
      <header className="insp-header">
        <button className="insp-close" onClick={step === 4 || step === 5 ? restart : onClose}>
          <Icon name={step === 4 || step === 5 ? 'refresh-cw' : 'x'} size={20} strokeWidth={2} />
        </button>

        <div className="insp-progress">
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`insp-progress-dot ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}
            />
          ))}
          <span className="insp-step-label">{stepLabels[step]}</span>
        </div>
      </header>

      {/* Screens */}
      <AnimatePresence mode="wait">
        {/* ── STEP 0: Industry ── */}
        {step === 0 && (
          <motion.div className="insp-screen" key="industry"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">W jakiej branży działasz?</h1>
            <div className="insp-industry-grid">
              {industries.map((ind, i) => (
                <motion.button
                  key={ind.id}
                  className="insp-industry-tile"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => selectIndustry(ind.name)}>
                  <div className="insp-industry-icon">
                    <Icon name={ind.icon} size={22} strokeWidth={1.8} />
                  </div>
                  <span className="insp-industry-name">{ind.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 1: Symptoms ── */}
        {step === 1 && (
          <motion.div className="insp-screen" key="symptoms"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">Co najbardziej Cię boli?</h1>
            <p className="insp-subtitle">Wybierz 2–3 rzeczy, które najbardziej Ci przeszkadzają</p>
            <div className="insp-symptom-grid">
              {symptoms.map((s, i) => {
                const isSelected = selectedSymptoms.includes(s);
                const isDisabled = !isSelected && selectedSymptoms.length >= MAX_SYMPTOMS;
                return (
                  <motion.button
                    key={s}
                    className={`insp-symptom-tile ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => !isDisabled && toggleSymptom(s)}>
                    <div className="insp-symptom-check">
                      {isSelected && <Icon name="check-circle" size={16} strokeWidth={2.5} />}
                    </div>
                    {s}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: Size ── */}
        {step === 2 && (
          <motion.div className="insp-screen" key="size"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <h1 className="insp-title">Jak duża jest Twoja firma?</h1>
            <div className="insp-size-list">
              {sizes.map((s, i) => (
                <motion.button
                  key={s.id}
                  className="insp-size-tile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => selectSize(s.label)}>
                  <span className="insp-size-title">{s.label}</span>
                  <span className="insp-size-sub">{s.sub}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Loading ── */}
        {step === 3 && (
          <motion.div className="insp-screen" key="loading"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <div className="insp-loading">
              <div className="insp-loading-anim">
                <div className="insp-loading-ring" />
                <div className="insp-loading-ring" />
                <div className="insp-loading-ring" />
                <div className="insp-loading-center">
                  <Icon name="zap" size={24} strokeWidth={1.8} />
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  className="insp-loading-text"
                  key={loadingMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}>
                  {loadingMessages[loadingMsg]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── STEP 4: Results ── */}
        {step === 4 && results && (
          <motion.div className="insp-screen" key="results"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <div className="insp-results">
              {/* Diagnosis */}
              <motion.div className="insp-diagnosis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="insp-diagnosis-label">
                  <Icon name="eye" size={14} strokeWidth={2} />
                  Twój główny problem
                </div>
                <h2 className="insp-diagnosis-process">{results.diagnosis.core_process}</h2>
                <p className="insp-diagnosis-insight">{results.diagnosis.insight}</p>
              </motion.div>

              {/* Ideas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <h3 className="insp-ideas-label">3 pomysły na zmianę</h3>
                <div className="insp-ideas-list">
                  {results.ideas.map((idea, i) => (
                    <motion.div
                      className="insp-idea-card"
                      key={idea.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}>
                      <div className="insp-idea-head">
                        <h4 className="insp-idea-title">{idea.title}</h4>
                        <span className={`insp-idea-badge insp-idea-badge--${idea.difficulty}`}>
                          {difficultyLabels[idea.difficulty] || idea.difficulty}
                        </span>
                      </div>
                      <p className="insp-idea-desc">{idea.description}</p>
                      <div className="insp-idea-transform">
                        <div className="insp-idea-before">{idea.before}</div>
                        <div className="insp-idea-after">{idea.after}</div>
                      </div>
                      <div className="insp-idea-impact">
                        <Icon name="zap" size={13} strokeWidth={2} />
                        {idea.impact}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* More ideas button */}
                <button
                  className="insp-btn-more"
                  onClick={requestMoreIdeas}
                  disabled={moreLoading}>
                  <Icon name="refresh-cw" size={15} strokeWidth={2} />
                  {moreLoading ? 'Generuję...' : 'Chcę więcej pomysłów'}
                </button>
              </motion.div>

              {/* CTA */}
              <motion.div className="insp-results-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}>
                <p className="insp-results-cta-text">
                  To wygenerował <em>AI w 10 sekund</em> — wyobraź sobie, co zrobimy gdy naprawdę poznamy Twoją firmę.
                </p>
                <div className="insp-results-buttons">
                  <button className="insp-btn-primary" onClick={() => setStep(5)}>
                    <Icon name="send" size={16} strokeWidth={2} />
                    Wyślij mi te pomysły
                  </button>
                  <button className="insp-btn-secondary" onClick={restart}>
                    <Icon name="refresh-cw" size={16} strokeWidth={2} />
                    Zacznij od nowa
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 5: Contact ── */}
        {step === 5 && !sent && (
          <motion.div className="insp-screen" key="contact"
            variants={screenVariants} initial="enter" animate="center" exit="exit"
            transition={screenTransition}>
            <div className="insp-contact">
              <h1 className="insp-title">Gdzie wysłać Twoje pomysły?</h1>
              <input
                type="email"
                className="insp-email-input"
                placeholder="twoj@email.pl"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              <button
                className="insp-btn-primary"
                onClick={sendEmail}
                disabled={!email.includes('@')}>
                <Icon name="send" size={16} strokeWidth={2} />
                Wyślij
              </button>
              <p className="insp-contact-note">
                Otrzymasz spersonalizowany raport z pomysłami + 2 dodatkowe, których tu nie widziałeś
              </p>
              <button className="insp-btn-secondary" onClick={() => { sendEmail(); }}>
                Pomiń — nie chcę podawać maila
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Thank you ── */}
        {step === 5 && sent && (
          <motion.div className="insp-screen" key="thankyou"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="insp-thankyou">
              <div className="insp-thankyou-icon">
                <Icon name="check-circle" size={36} strokeWidth={1.8} />
              </div>
              <h1 className="insp-thankyou-title">Dziękujemy!</h1>
              <p className="insp-thankyou-text">
                {email
                  ? 'Wysłaliśmy Twoje pomysły na podany adres. Odwiedź nas na stanowisku — porozmawiajmy!'
                  : 'Zapisaliśmy Twoje wyniki. Odwiedź nas na stanowisku — porozmawiajmy!'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer — symptom counter + next btn */}
      {step === 1 && (
        <motion.div className="insp-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}>
          <span className="insp-counter">
            Wybrano: <strong>{selectedSymptoms.length}</strong> / {MAX_SYMPTOMS}
          </span>
          <button
            className="insp-next-btn"
            disabled={selectedSymptoms.length < 2}
            onClick={() => setStep(2)}>
            {selectedSymptoms.length < 2
              ? `Wybierz jeszcze ${2 - selectedSymptoms.length}`
              : 'Dalej'}
            <Icon name="chevron-right" size={18} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
