import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/Icon';
import './demo.css';
import './hr.css';

// ═══════════════════════════════════════════════════
// Simulated Data
// ═══════════════════════════════════════════════════

const recruitments = [
  { id: 1, title: 'Senior Java Developer', dept: 'IT / Development', candidates: 24, shortlisted: 6, interviews: 3, offers: 1, status: 'active' as const, progress: 72, deadline: '28.03.2026', priority: 'high' as const, color: '#6366f1', daysOpen: 18 },
  { id: 2, title: 'Product Manager', dept: 'Produkt', candidates: 31, shortlisted: 8, interviews: 4, offers: 0, status: 'active' as const, progress: 55, deadline: '15.04.2026', priority: 'medium' as const, color: '#8b5cf6', daysOpen: 12 },
  { id: 3, title: 'UX/UI Designer', dept: 'Design', candidates: 19, shortlisted: 5, interviews: 2, offers: 0, status: 'active' as const, progress: 40, deadline: '30.04.2026', priority: 'medium' as const, color: '#a78bfa', daysOpen: 8 },
  { id: 4, title: 'DevOps Engineer', dept: 'IT / Infra', candidates: 12, shortlisted: 3, interviews: 1, offers: 0, status: 'active' as const, progress: 28, deadline: '20.04.2026', priority: 'high' as const, color: '#818cf8', daysOpen: 5 },
  { id: 5, title: 'Account Manager', dept: 'Sprzedaż', candidates: 45, shortlisted: 10, interviews: 6, offers: 2, status: 'active' as const, progress: 88, deadline: '22.03.2026', priority: 'low' as const, color: '#c084fc', daysOpen: 26 },
  { id: 6, title: 'Data Analyst', dept: 'Business Intelligence', candidates: 16, shortlisted: 4, interviews: 0, offers: 0, status: 'paused' as const, progress: 22, deadline: '10.05.2026', priority: 'low' as const, color: '#7c3aed', daysOpen: 4 },
];

const pipelineCandidates = {
  applied: [
    { name: 'Anna Kowalczyk', role: 'Senior Java Dev', date: '17.03', rating: 3, exp: 5, salary: '16 000 — 20 000 PLN', skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'] },
    { name: 'Piotr Zieliński', role: 'Senior Java Dev', date: '16.03', rating: 4, exp: 7, salary: '18 000 — 22 000 PLN', skills: ['Java', 'Kotlin', 'Microservices', 'AWS', 'Kubernetes'] },
    { name: 'Ewa Jabłońska', role: 'Product Manager', date: '16.03', rating: 3, exp: 4, salary: '14 000 — 18 000 PLN', skills: ['Scrum', 'Jira', 'Analytics', 'Figma'] },
    { name: 'Michał Lewandowski', role: 'UX/UI Designer', date: '15.03', rating: 2, exp: 3, salary: '12 000 — 15 000 PLN', skills: ['Figma', 'Adobe XD', 'HTML/CSS'] },
  ],
  screening: [
    { name: 'Karolina Wójcik', role: 'Senior Java Dev', date: '14.03', rating: 4, exp: 6, salary: '17 000 — 21 000 PLN', skills: ['Java', 'Spring', 'AWS', 'Docker', 'CI/CD'] },
    { name: 'Tomasz Nowak', role: 'Product Manager', date: '14.03', rating: 5, exp: 8, salary: '20 000 — 25 000 PLN', skills: ['Scrum', 'SQL', 'A/B Testing', 'Jira', 'Roadmapping'] },
    { name: 'Jan Mazur', role: 'DevOps Engineer', date: '13.03', rating: 3, exp: 4, salary: '15 000 — 19 000 PLN', skills: ['Terraform', 'Docker', 'Kubernetes', 'AWS'] },
  ],
  interview: [
    { name: 'Marta Szymańska', role: 'Senior Java Dev', date: '12.03', rating: 5, exp: 9, salary: '22 000 — 26 000 PLN', skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker', 'Kubernetes'] },
    { name: 'Robert Wiśniewski', role: 'Account Manager', date: '11.03', rating: 4, exp: 6, salary: '12 000 — 16 000 PLN', skills: ['CRM', 'Negocjacje', 'B2B', 'Prezentacje'] },
    { name: 'Aleksandra Dąbrowska', role: 'Product Manager', date: '10.03', rating: 4, exp: 5, salary: '16 000 — 20 000 PLN', skills: ['Scrum', 'Analytics', 'SQL', 'Figma', 'Jira'] },
  ],
  offer: [
    { name: 'Paweł Kamiński', role: 'Senior Java Dev', date: '08.03', rating: 5, exp: 10, salary: '24 000 — 28 000 PLN', skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker', 'Kubernetes', 'SQL'] },
    { name: 'Natalia Kwiatkowska', role: 'Account Manager', date: '07.03', rating: 5, exp: 7, salary: '14 000 — 18 000 PLN', skills: ['CRM', 'Negocjacje', 'B2B', 'Prezentacje', 'Excel'] },
  ],
  hired: [
    { name: 'Łukasz Grabowski', role: 'Account Manager', date: '01.03', rating: 5, exp: 8, salary: '15 000 PLN', skills: ['CRM', 'B2B', 'Key Accounts', 'SaaS'] },
  ],
};
type CandidateData = typeof pipelineCandidates.applied[0];

const messages = [
  { id: 1, from: 'Katarzyna Maj', role: 'Rekruter', avatar: '#6366f1', preview: 'Przesyłam zaktualizowaną listę kandydatów na stanowisko Senior Java Developer. 3 nowe osoby spełniają wymagania.', time: '14:20', unread: true },
  { id: 2, from: 'Andrzej Kowal', role: 'Konsultant HR', avatar: '#8b5cf6', preview: 'Raport z rozmów kwalifikacyjnych w załączniku. Rekomendacja: Marta Szymańska na stanowisko Java Dev.', time: '11:45', unread: true },
  { id: 3, from: 'Monika Sikora', role: 'Account Manager', avatar: '#a78bfa', preview: 'Podsumowanie tygodnia: 12 nowych aplikacji, 4 rozmowy przeprowadzone, 1 oferta wysłana.', time: 'Wczoraj', unread: false },
  { id: 4, from: 'Team WiseHR', role: 'System', avatar: '#c084fc', preview: 'Termin rekrutacji na DevOps Engineer zbliża się. Pozostało 32 dni.', time: 'Wczoraj', unread: false },
  { id: 5, from: 'Katarzyna Maj', role: 'Rekruter', avatar: '#6366f1', preview: 'Paweł Kamiński zaakceptował warunki oferty! Gratulacje, start 01.04.2026.', time: '2 dni temu', unread: false },
];

const activityFeed = [
  { color: '#10b981', text: '<strong>Paweł Kamiński</strong> zaakceptował ofertę na Senior Java Developer', time: '2 godz. temu' },
  { color: '#6366f1', text: 'Nowa aplikacja: <strong>Anna Kowalczyk</strong> — Senior Java Developer', time: '3 godz. temu' },
  { color: '#f59e0b', text: 'Rozmowa kwalifikacyjna z <strong>Marta Szymańska</strong> zakończona pozytywnie', time: '5 godz. temu' },
  { color: '#8b5cf6', text: '<strong>Tomasz Nowak</strong> przeszedł screening — rekomendowany do rozmowy', time: '6 godz. temu' },
  { color: '#6366f1', text: '3 nowe aplikacje na stanowisko Product Manager', time: 'Wczoraj' },
  { color: '#ef4444', text: 'Rekrutacja Data Analyst wstrzymana na prośbę klienta', time: 'Wczoraj' },
  { color: '#10b981', text: '<strong>Natalia Kwiatkowska</strong> — oferta na Account Manager wysłana', time: '2 dni temu' },
  { color: '#6366f1', text: 'Raport tygodniowy wygenerowany i wysłany', time: '3 dni temu' },
];

const notifications = [
  { icon: 'check-circle', color: '#10b981', text: 'Paweł Kamiński zaakceptował ofertę', time: '2h', go: 'recruitments' as View },
  { icon: 'users', color: '#6366f1', text: '3 nowe aplikacje — Senior Java Dev', time: '3h', go: 'pipeline' as View },
  { icon: 'clock', color: '#f59e0b', text: 'Deadline: DevOps Engineer za 32 dni', time: '5h', go: 'recruitments' as View },
  { icon: 'alert-triangle', color: '#ef4444', text: 'Data Analyst — rekrutacja wstrzymana', time: '1d', go: 'recruitments' as View },
];

const knowledgeArticles = [
  { id: 1, cat: 'Proces', title: 'Jak działa nasz proces rekrutacyjny?', body: 'Każda rekrutacja przechodzi przez 5 etapów: pozyskanie kandydatów, screening CV, rozmowy kwalifikacyjne, oferta i zatrudnienie. Na każdym etapie informujemy Cię o postępach w panelu.', icon: 'briefcase' },
  { id: 2, cat: 'Pipeline', title: 'Co oznaczają statusy kandydatów?', body: 'Aplikacja — nowy kandydat. Screening — weryfikacja CV. Rozmowa — zaplanowane spotkanie. Oferta — wysłane warunki. Zatrudniony — proces zakończony sukcesem.', icon: 'users' },
  { id: 3, cat: 'Raporty', title: 'Jak czytać raporty efektywności?', body: 'Śr. czas rekrutacji to średnia od otwarcia do zatrudnienia. Wskaźnik zatrudnienia to % rekrutacji zakończonych sukcesem. Cost per hire to koszt obsługi jednego procesu.', icon: 'bar-chart' },
  { id: 4, cat: 'Komunikacja', title: 'Jak skontaktować się z rekruterem?', body: 'Możesz napisać wiadomość przez panel (zakładka Wiadomości), zadzwonić na dedykowaną linię lub umówić spotkanie przez sekcję Kontakt z agencją.', icon: 'message-circle' },
  { id: 5, cat: 'Rozliczenia', title: 'Jak wygląda model rozliczeniowy?', body: 'Prowizja success fee naliczana jest po zatrudnieniu kandydata. Szczegóły w umowie ramowej. Faktury dostępne w zakładce Raporty → Eksport PDF.', icon: 'dollar-sign' },
  { id: 6, cat: 'Integracje', title: 'Czy panel integruje się z ATS?', body: 'Tak — oferujemy integracje z popularnymi systemami ATS (eRecruiter, Traffit, Workable). Skontaktuj się z nami, aby skonfigurować połączenie.', icon: 'settings' },
];

const monthlyHires = [2, 3, 1, 4, 3, 5, 4, 6, 3, 5, 7, 4];
const monthLabels = ['Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru', 'Sty', 'Lut', 'Mar'];
const maxHires = Math.max(...monthlyHires);
const satisfactionData = [
  { label: 'Jakość kandydatów', value: 87 },
  { label: 'Czas realizacji', value: 74 },
  { label: 'Komunikacja', value: 92 },
  { label: 'Ogólna ocena', value: 85 },
];

// ═══════════════════════════════════════════════════
// Types & Hooks
// ═══════════════════════════════════════════════════

type View = 'dashboard' | 'recruitments' | 'pipeline' | 'reports' | 'messages' | 'knowledge' | 'contact' | 'profile';

function useAnimatedCounter(target: number, duration = 800) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

// ═══════════════════════════════════════════════════
// Toast system
// ═══════════════════════════════════════════════════

type Toast = { id: number; text: string; icon: string; color: string };

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div style={{ position: 'fixed', bottom: 'clamp(16px,2vh,28px)', right: 'clamp(16px,2vw,32px)', zIndex: 200, display: 'flex', flexDirection: 'column', gap: 'clamp(6px,.5vh,10px)' }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: 20, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .9 }}
            style={{ display: 'flex', alignItems: 'center', gap: '.7vw', padding: 'clamp(12px,1.2vh,18px) clamp(16px,1.4vw,24px)', background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,.12)', border: '1px solid #f0f0f5', minWidth: 'clamp(240px,20vw,360px)' }}>
            <div style={{ width: 'clamp(32px,2.2vw,40px)', height: 'clamp(32px,2.2vw,40px)', borderRadius: 10, background: `${t.color}12`, color: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={t.icon} size={18} strokeWidth={2} />
            </div>
            <span style={{ fontSize: 'clamp(12px,.78vw,15px)', fontWeight: 600, color: '#1e1b4b' }}>{t.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// Nav config
// ═══════════════════════════════════════════════════

const navItems: { icon: string; label: string; view: View; badge?: string }[] = [
  { icon: 'home', label: 'Pulpit', view: 'dashboard' },
  { icon: 'briefcase', label: 'Rekrutacje', view: 'recruitments', badge: '6' },
  { icon: 'users', label: 'Pipeline', view: 'pipeline' },
  { icon: 'bar-chart', label: 'Raporty', view: 'reports' },
  { icon: 'message-circle', label: 'Wiadomości', view: 'messages', badge: '2' },
];

// ═══════════════════════════════════════════════════
// Shared modals/overlays
// ═══════════════════════════════════════════════════

function CandidateModal({ candidate, stageColor, onClose, onToast }: { candidate: CandidateData; stageColor: string; onClose: () => void; onToast: (text: string, icon: string, color: string) => void }) {
  const timeline = [
    { date: '05.03.2026', text: 'Aplikacja otrzymana', note: 'CV + list motywacyjny przesłane przez LinkedIn', status: 'done' as const },
    { date: '07.03.2026', text: 'Screening CV', note: `Pozytywna weryfikacja — spełnia ${70 + candidate.rating * 5}% wymagań`, status: 'done' as const },
    { date: '10.03.2026', text: 'Rozmowa telefoniczna', note: 'Rekruter: Katarzyna Maj — rekomendacja pozytywna', status: 'done' as const },
    { date: '14.03.2026', text: 'Rozmowa techniczna', note: `Panel: 2 osoby, wynik: ${3.5 + candidate.rating * 0.2}/5`, status: 'current' as const },
    { date: 'Planowane', text: 'Rozmowa z hiring managerem', note: '', status: 'pending' as const },
    { date: 'Planowane', text: 'Oferta', note: '', status: 'pending' as const },
  ];
  return (
    <motion.div className="hr-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="hr-modal" onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
        <div className="hr-modal-hdr">
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6vw' }}>
            <div style={{ width: 'clamp(40px,3vw,52px)', height: 'clamp(40px,3vw,52px)', borderRadius: 14, background: `${stageColor}15`, color: stageColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 'clamp(15px,1.1vw,20px)' }}>
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize: 'clamp(18px,1.3vw,26px)', fontWeight: 800, color: '#1e1b4b' }}>{candidate.name}</div>
              <div style={{ fontSize: 'clamp(12px,.75vw,15px)', color: '#9ca3af', marginTop: 2 }}>Kandydat na: {candidate.role}</div>
            </div>
          </div>
          <button className="hr-modal-close" onClick={onClose}><Icon name="x" size={22} strokeWidth={2} /></button>
        </div>
        <div className="hr-modal-body">
          <div className="hr-detail-grid">
            <div><div className="hr-detail-label">Email</div><div className="hr-detail-val">{candidate.name.toLowerCase().replace(/ /g, '.')}@email.com</div></div>
            <div><div className="hr-detail-label">Telefon</div><div className="hr-detail-val">+48 {Math.floor(500000000 + Math.random() * 400000000)}</div></div>
            <div><div className="hr-detail-label">Doświadczenie</div><div className="hr-detail-val">{candidate.exp} lat</div></div>
            <div><div className="hr-detail-label">Oczekiwania finansowe</div><div className="hr-detail-val">{candidate.salary}</div></div>
          </div>
          <div className="hr-detail-label" style={{ marginBottom: '.6vh' }}>Kompetencje</div>
          <div className="hr-skill-tags">{candidate.skills.map(s => <span className="hr-skill-tag" key={s}>{s}</span>)}</div>
          <div style={{ marginTop: '2.5vh' }}>
            <div className="hr-section-title">Historia rekrutacji</div>
            <div className="hr-timeline">
              {timeline.map((t, i) => (
                <div className="hr-timeline-item" key={i}>
                  <div className={`hr-timeline-dot ${t.status}`} />
                  <div className="hr-timeline-date">{t.date}</div>
                  <div className="hr-timeline-text">{t.text}</div>
                  {t.note && <div className="hr-timeline-note">{t.note}</div>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '2vh', display: 'flex', gap: '.8vw' }}>
            <button className="hr-btn pri" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { onToast(`${candidate.name} — zatwierdzony!`, 'check-circle', '#10b981'); onClose(); }}>
              <Icon name="check-circle" size={18} strokeWidth={2} /> Zatwierdź kandydata
            </button>
            <button className="hr-btn sec" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { onToast('Wiadomość wysłana do rekrutera', 'send', '#6366f1'); onClose(); }}>
              <Icon name="message-circle" size={18} strokeWidth={2} /> Napisz do rekrutera
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function NotificationBell({ go }: { go: (v: View) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button className="hr-notif-btn" onClick={() => setOpen(!open)}>
        <Icon name="bell" size={22} strokeWidth={2} />
        <div className="hr-notif-dot" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="hr-notif-dropdown"
            initial={{ opacity: 0, y: -8, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .95 }} transition={{ duration: .2 }}>
            <div className="hr-notif-hdr">Powiadomienia</div>
            {notifications.map((n, i) => (
              <div className="hr-notif-item" key={i} onClick={() => { setOpen(false); go(n.go); }}>
                <div style={{ width: 'clamp(32px,2.4vw,42px)', height: 'clamp(32px,2.4vw,42px)', borderRadius: 10, background: `${n.color}12`, color: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={n.icon} size={16} strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'clamp(11px,.7vw,14px)', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 'clamp(9px,.55vw,11px)', color: '#d1d5db', marginTop: 2 }}>{n.time}</div>
                </div>
                <span style={{ color: '#d1d5db' }}><Icon name="chevron-right" size={14} strokeWidth={2} /></span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// Views
// ═══════════════════════════════════════════════════

function Dashboard({ go, toast: _toast }: { go: (v: View) => void; toast: (t: string, i: string, c: string) => void }) {
  const c1 = useAnimatedCounter(recruitments.filter(r => r.status === 'active').length);
  const c2 = useAnimatedCounter(recruitments.reduce((s, r) => s + r.candidates, 0));
  const c3 = useAnimatedCounter(recruitments.reduce((s, r) => s + r.interviews, 0));
  const c4 = useAnimatedCounter(recruitments.reduce((s, r) => s + r.offers, 0));
  return (
    <>
      <div className="hr-hdr">
        <div>
          <div className="hr-title">Witaj w panelu rekrutacji</div>
          <div className="hr-subtitle">Marzec 2026 &bull; Ostatnia aktualizacja: dziś, 14:32</div>
        </div>
        <div style={{ display: 'flex', gap: '.6vw', alignItems: 'center' }}>
          <NotificationBell go={go} />
          <button className="hr-btn sec" onClick={() => go('reports')}><Icon name="bar-chart" size={17} strokeWidth={2} /> Raporty</button>
          <button className="hr-btn pri" onClick={() => go('messages')}><Icon name="message-circle" size={17} strokeWidth={2} /> Wiadomości</button>
        </div>
      </div>
      <div className="hr-stats">
        {[
          { label: 'Aktywne rekrutacje', val: c1, change: '+2 w tym mies.', dir: 'up', icon: 'briefcase', bg: 'rgba(99,102,241,.08)', iconColor: '#6366f1', target: 'recruitments' as View },
          { label: 'Kandydaci łącznie', val: c2, change: '+18 nowych', dir: 'up', icon: 'users', bg: 'rgba(139,92,246,.08)', iconColor: '#8b5cf6', target: 'pipeline' as View },
          { label: 'Rozmowy w toku', val: c3, change: '4 zaplanowane', dir: 'neutral', icon: 'message-circle', bg: 'rgba(129,140,248,.08)', iconColor: '#818cf8', target: 'pipeline' as View },
          { label: 'Oferty wysłane', val: c4, change: '1 zaakceptowana', dir: 'up', icon: 'send', bg: 'rgba(16,185,129,.08)', iconColor: '#059669', target: 'recruitments' as View },
        ].map(s => (
          <motion.div className="hr-stat" key={s.label} onClick={() => go(s.target)} whileTap={{ scale: 0.97 }}>
            <div className="hr-stat-icon" style={{ background: s.bg, color: s.iconColor }}><Icon name={s.icon} size={20} strokeWidth={2} /></div>
            <div className="hr-stat-label">{s.label}</div>
            <div className="hr-stat-val">{s.val}</div>
            <div className={`hr-stat-change ${s.dir}`}>{s.change}</div>
          </motion.div>
        ))}
      </div>
      <div className="hr-quick-actions">
        {[
          { icon: 'briefcase', label: 'Przegląd rekrutacji', color: '#6366f1', bg: 'rgba(99,102,241,.08)', view: 'recruitments' as View },
          { icon: 'users', label: 'Pipeline kandydatów', color: '#8b5cf6', bg: 'rgba(139,92,246,.08)', view: 'pipeline' as View },
          { icon: 'message-circle', label: 'Wiadomości od agencji', color: '#818cf8', bg: 'rgba(129,140,248,.08)', view: 'messages' as View },
        ].map(a => (
          <motion.button className="hr-quick-action" key={a.label} onClick={() => go(a.view)} whileTap={{ scale: 0.97 }}>
            <div className="hr-quick-action-icon" style={{ background: a.bg, color: a.color }}><Icon name={a.icon} size={20} strokeWidth={2} /></div>
            {a.label}
            <span style={{ marginLeft: 'auto', color: '#d1d5db' }}><Icon name="chevron-right" size={16} strokeWidth={2} /></span>
          </motion.button>
        ))}
      </div>
      <div className="hr-grid-2">
        <div className="hr-card">
          <div className="hr-card-hdr">
            <span className="hr-card-title">Aktywne rekrutacje</span>
            <button className="hr-btn ghost" onClick={() => go('recruitments')}>Wszystkie <Icon name="arrow-up-right" size={14} strokeWidth={2} /></button>
          </div>
          <div className="hr-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,.8vh,14px)' }}>
              {recruitments.filter(r => r.status === 'active').slice(0, 4).map(r => (
                <motion.div key={r.id} whileTap={{ scale: 0.98 }} onClick={() => go('recruitments')}
                  style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,.8vw,14px)', cursor: 'pointer', padding: 'clamp(6px,.5vh,10px) 0', borderBottom: '1px solid #f9f9fc' }}>
                  <div style={{ width: 'clamp(10px,.6vw,14px)', height: 'clamp(10px,.6vw,14px)', borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'clamp(13px,.82vw,16px)', fontWeight: 600, color: '#1e1b4b' }}>{r.title}</div>
                    <div style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#9ca3af', marginTop: 2 }}>{r.dept} &bull; {r.candidates} kandydatów</div>
                  </div>
                  <div className="hr-rec-progress" style={{ width: 'clamp(80px,8vw,140px)' }}>
                    <div className="hr-rec-progress-bar"><div className="hr-rec-progress-fill" style={{ width: `${r.progress}%`, background: r.color }} /></div>
                    <div className="hr-rec-progress-text">{r.progress}%</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="hr-card">
          <div className="hr-card-hdr"><span className="hr-card-title">Ostatnia aktywność</span></div>
          <div className="hr-card-body">
            <div className="hr-feed">
              {activityFeed.slice(0, 6).map((a, i) => (
                <div className="hr-feed-item" key={i}>
                  <div className="hr-feed-dot" style={{ background: a.color }} />
                  <div className="hr-feed-text" dangerouslySetInnerHTML={{ __html: a.text }} />
                  <div className="hr-feed-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hr-card">
        <div className="hr-card-hdr">
          <span className="hr-card-title">Wiadomości od agencji</span>
          <button className="hr-btn ghost" onClick={() => go('messages')}>Wszystkie <Icon name="arrow-up-right" size={14} strokeWidth={2} /></button>
        </div>
        <div className="hr-card-body">
          <div className="hr-msg-list">
            {messages.slice(0, 3).map(m => (
              <motion.div className={`hr-msg ${m.unread ? 'hr-msg-unread' : ''}`} key={m.id} whileTap={{ scale: 0.98 }} onClick={() => go('messages')}>
                <div className="hr-msg-avatar" style={{ background: m.avatar }}>{m.from[0]}</div>
                <div className="hr-msg-body">
                  <div className="hr-msg-from">{m.from} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 'clamp(9px,.55vw,12px)' }}>— {m.role}</span></div>
                  <div className="hr-msg-preview">{m.preview}</div>
                </div>
                <div className="hr-msg-time">{m.time}</div>
                {m.unread && <div className="hr-msg-dot" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Recruitments({ toast: _toast }: { toast: (t: string, i: string, c: string) => void }) {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = recruitments.filter(r => filter === 'all' || r.status === filter);
  const detail = selected !== null ? recruitments.find(r => r.id === selected) : null;
  return (
    <>
      <div className="hr-hdr">
        <div>
          <div className="hr-title">{detail ? detail.title : 'Rekrutacje'}</div>
          <div className="hr-subtitle">{detail ? `${detail.dept} — ${detail.daysOpen} dni otwarte` : `${recruitments.length} procesów rekrutacyjnych`}</div>
        </div>
        {detail ? (
          <button className="hr-btn sec" onClick={() => setSelected(null)}><Icon name="arrow-left" size={17} strokeWidth={2} /> Wróć do listy</button>
        ) : (
          <div className="hr-filters">
            {([['all', 'Wszystkie'], ['active', 'Aktywne'], ['paused', 'Wstrzymane']] as const).map(([v, l]) => (
              <button key={v} className={`hr-filter ${filter === v ? 'on' : ''}`} onClick={() => setFilter(v)}>{l}</button>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {detail ? (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: .2 }}>
            <div className="hr-rec-detail">
              <div className="hr-rec-detail-header">
                <div className="hr-rec-icon" style={{ background: `${detail.color}12`, color: detail.color, width: 'clamp(52px,3.5vw,64px)', height: 'clamp(52px,3.5vw,64px)' }}><Icon name="briefcase" size={24} strokeWidth={2} /></div>
                <div>
                  <div className="hr-rec-detail-title">{detail.title}</div>
                  <div className="hr-rec-detail-dept">{detail.dept} &bull; Deadline: {detail.deadline} &bull; <span className={`hr-badge ${detail.status}`}>{detail.status === 'active' ? 'Aktywna' : 'Wstrzymana'}</span></div>
                </div>
              </div>
              <div className="hr-rec-detail-stats">
                {[{ label: 'Kandydatów', val: detail.candidates }, { label: 'Shortlista', val: detail.shortlisted }, { label: 'Rozmowy', val: detail.interviews }, { label: 'Oferty', val: detail.offers }].map(s => (
                  <div className="hr-rec-detail-stat" key={s.label}><div className="hr-rec-detail-stat-val">{s.val}</div><div className="hr-rec-detail-stat-label">{s.label}</div></div>
                ))}
              </div>
              <div className="hr-rec-detail-progress">
                <div style={{ fontSize: 'clamp(12px,.75vw,15px)', fontWeight: 600, color: '#6b7280', width: 'clamp(60px,5vw,90px)' }}>Postęp</div>
                <div className="hr-rec-detail-progress-bar"><div className="hr-rec-detail-progress-fill" style={{ width: `${detail.progress}%`, background: detail.color }} /></div>
                <div className="hr-rec-detail-progress-text" style={{ color: detail.color }}>{detail.progress}%</div>
              </div>
            </div>
            <div className="hr-section-title">Kandydaci w tym procesie</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,.5vh,10px)' }}>
              {Object.values(pipelineCandidates).flat().filter(c => c.role.includes(detail.title.split(' ')[0]) || c.role.includes(detail.title.split(' ').pop()!)).slice(0, 5).map((c, i) => (
                <motion.div key={i} whileTap={{ scale: 0.98 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,1vw,16px)', padding: 'clamp(12px,1.2vh,18px) clamp(14px,1.2vw,20px)', background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', cursor: 'pointer', minHeight: 52 }}>
                  <div style={{ width: 'clamp(40px,2.8vw,50px)', height: 'clamp(40px,2.8vw,50px)', borderRadius: 12, background: `${detail.color}10`, color: detail.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 'clamp(12px,.8vw,15px)', flexShrink: 0 }}>
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'clamp(13px,.82vw,16px)', fontWeight: 600, color: '#1e1b4b' }}>{c.name}</div>
                    <div style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#9ca3af', marginTop: 2 }}>{c.exp} lat doświadczenia &bull; {c.salary}</div>
                  </div>
                  <div className="hr-pipe-card-rating" style={{ gap: 3 }}>
                    {Array.from({ length: 5 }, (_, j) => <div key={j} className="hr-pipe-card-dot" style={{ background: j < c.rating ? detail.color : '#e5e7eb', width: 'clamp(8px,.5vw,10px)', height: 'clamp(8px,.5vw,10px)' }} />)}
                  </div>
                  <span style={{ color: '#d1d5db' }}><Icon name="chevron-right" size={18} strokeWidth={2} /></span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: .2 }}>
            <div className="hr-rec-list">
              {filtered.map(r => (
                <motion.div className="hr-rec" key={r.id} whileTap={{ scale: 0.985 }} onClick={() => setSelected(r.id)}>
                  <div className="hr-rec-icon" style={{ background: `${r.color}12`, color: r.color }}><Icon name="briefcase" size={22} strokeWidth={2} /></div>
                  <div className="hr-rec-info">
                    <div className="hr-rec-title">{r.title}</div>
                    <div className="hr-rec-meta"><span>{r.dept}</span><span>&bull;</span><span>{r.daysOpen} dni</span><span>&bull;</span><span>Deadline: {r.deadline}</span></div>
                  </div>
                  <div className="hr-rec-stats">
                    {[{ v: r.candidates, l: 'Kandydatów' }, { v: r.shortlisted, l: 'Shortlista' }, { v: r.interviews, l: 'Rozmowy' }].map(s => (
                      <div className="hr-rec-stat-item" key={s.l}><div className="hr-rec-stat-val">{s.v}</div><div className="hr-rec-stat-label">{s.l}</div></div>
                    ))}
                  </div>
                  <div className="hr-rec-progress">
                    <div className="hr-rec-progress-bar"><div className="hr-rec-progress-fill" style={{ width: `${r.progress}%`, background: r.color }} /></div>
                    <div className="hr-rec-progress-text">{r.progress}%</div>
                  </div>
                  <span className={`hr-badge ${r.status}`}>{r.status === 'active' ? 'Aktywna' : 'Wstrzymana'}</span>
                  <span style={{ color: '#d1d5db' }}><Icon name="chevron-right" size={18} strokeWidth={2} /></span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PipelineView({ toast }: { toast: (t: string, i: string, c: string) => void }) {
  const [selected, setSelected] = useState<{ candidate: CandidateData; color: string } | null>(null);
  const stages = [
    { key: 'applied' as const, label: 'Aplikacje', color: '#9ca3af' },
    { key: 'screening' as const, label: 'Screening', color: '#6366f1' },
    { key: 'interview' as const, label: 'Rozmowy', color: '#8b5cf6' },
    { key: 'offer' as const, label: 'Oferta', color: '#f59e0b' },
    { key: 'hired' as const, label: 'Zatrudnieni', color: '#10b981' },
  ];
  return (
    <>
      <div className="hr-hdr"><div><div className="hr-title">Pipeline kandydatów</div><div className="hr-subtitle">Dotknij kandydata, aby zobaczyć szczegóły</div></div></div>
      <div style={{ display: 'flex', gap: 'clamp(6px,.5vw,10px)', marginBottom: '2vh', flexWrap: 'wrap' }}>
        {stages.map(stage => (
          <div key={stage.key} style={{ display: 'flex', alignItems: 'center', gap: '.4vw', padding: 'clamp(6px,.5vh,10px) clamp(10px,.8vw,16px)', background: `${stage.color}08`, borderRadius: 10, border: `1px solid ${stage.color}20` }}>
            <div style={{ width: 'clamp(8px,.5vw,10px)', height: 'clamp(8px,.5vw,10px)', borderRadius: '50%', background: stage.color }} />
            <span style={{ fontSize: 'clamp(11px,.7vw,14px)', fontWeight: 600, color: '#374151' }}>{stage.label}</span>
            <span style={{ fontSize: 'clamp(12px,.8vw,16px)', fontWeight: 800, color: stage.color }}>{pipelineCandidates[stage.key].length}</span>
          </div>
        ))}
      </div>
      <div className="hr-pipeline">
        {stages.map(stage => (
          <div className="hr-pipe-col" key={stage.key}>
            <div className="hr-pipe-hdr" style={{ borderBottom: `3px solid ${stage.color}` }}>
              <span className="hr-pipe-hdr-title">{stage.label}</span>
              <span className="hr-pipe-count">{pipelineCandidates[stage.key].length}</span>
            </div>
            <div className="hr-pipe-body">
              {pipelineCandidates[stage.key].map((c, i) => (
                <motion.div className="hr-pipe-card" key={i} whileTap={{ scale: 0.96 }} onClick={() => setSelected({ candidate: c, color: stage.color })}>
                  <div className="hr-pipe-card-name">{c.name}</div>
                  <div className="hr-pipe-card-role">{c.role}</div>
                  <div style={{ fontSize: 'clamp(9px,.52vw,11px)', color: '#b0b5be', marginTop: 2 }}>{c.exp} lat exp.</div>
                  <div className="hr-pipe-card-foot">
                    <span className="hr-pipe-card-date">{c.date}</span>
                    <div className="hr-pipe-card-rating">{Array.from({ length: 5 }, (_, j) => <div key={j} className="hr-pipe-card-dot" style={{ background: j < c.rating ? stage.color : '#e5e7eb' }} />)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>{selected && <CandidateModal candidate={selected.candidate} stageColor={selected.color} onClose={() => setSelected(null)} onToast={toast} />}</AnimatePresence>
    </>
  );
}

function Reports({ toast }: { toast: (t: string, i: string, c: string) => void }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const handleExport = () => { setExporting(true); setTimeout(() => { setExporting(false); toast('Raport PDF wygenerowany i gotowy do pobrania', 'check-circle', '#10b981'); }, 1500); };
  return (
    <>
      <div className="hr-hdr">
        <div><div className="hr-title">Raporty i analityka</div><div className="hr-subtitle">Podsumowanie współpracy z agencją HR</div></div>
        <button className="hr-btn sec" onClick={handleExport} disabled={exporting}>
          {exporting ? <><Icon name="refresh-cw" size={17} strokeWidth={2} /> Generowanie...</> : <><Icon name="download" size={17} strokeWidth={2} /> Eksport PDF</>}
        </button>
      </div>
      <div className="hr-stats" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[
          { label: 'Śr. czas rekrutacji', val: '23 dni', change: '-4 dni vs Q3', dir: 'up' },
          { label: 'Wskaźnik zatrudnienia', val: '68%', change: '+12pp vs Q3', dir: 'up' },
          { label: 'Koszt per hire', val: '4 200 PLN', change: '-800 PLN vs Q3', dir: 'up' },
        ].map(s => (
          <div className="hr-stat" key={s.label}><div className="hr-stat-label">{s.label}</div><div className="hr-stat-val">{s.val}</div><div className={`hr-stat-change ${s.dir}`}>{s.change}</div></div>
        ))}
      </div>
      <div className="hr-grid-2">
        <div className="hr-card">
          <div className="hr-card-hdr"><span className="hr-card-title">Zatrudnienia miesięcznie</span></div>
          <div className="hr-card-body">
            <div className="hr-chart-bars">
              {monthlyHires.map((v, i) => (
                <div className="hr-chart-bar-wrap" key={i} onPointerDown={() => setHoveredBar(i)} onPointerUp={() => setHoveredBar(null)} onPointerLeave={() => setHoveredBar(null)}>
                  <div className="hr-chart-bar-val" style={{ opacity: hoveredBar === i ? 1 : .6 }}>{v}</div>
                  <div className="hr-chart-bar" style={{ height: `${(v / maxHires) * 100}%`, background: hoveredBar === i ? '#4f46e5' : i >= 10 ? '#6366f1' : '#e0e7ff', transform: hoveredBar === i ? 'scaleX(1.15)' : 'scaleX(1)' }} />
                  <div className="hr-chart-bar-label">{monthLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hr-card">
          <div className="hr-card-hdr"><span className="hr-card-title">Źródła kandydatów</span></div>
          <div className="hr-card-body">
            <div className="hr-donut-wrap">
              <svg viewBox="0 0 100 100" width="clamp(100px,7vw,140px)" height="clamp(100px,7vw,140px)">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="14" strokeDasharray="88 163" strokeDashoffset="0" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="14" strokeDasharray="63 188" strokeDashoffset="-88" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#c084fc" strokeWidth="14" strokeDasharray="50 201" strokeDashoffset="-151" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e7ff" strokeWidth="14" strokeDasharray="50 201" strokeDashoffset="-201" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <text x="50" y="48" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e1b4b">147</text>
                <text x="50" y="60" textAnchor="middle" fontSize="6" fontWeight="600" fill="#9ca3af">kandydatów</text>
              </svg>
              <div className="hr-donut-legend">
                {[{ color: '#6366f1', label: 'LinkedIn', val: '35%' }, { color: '#8b5cf6', label: 'Direct search', val: '25%' }, { color: '#c084fc', label: 'Referencje', val: '20%' }, { color: '#e0e7ff', label: 'Job boards', val: '20%' }].map(d => (
                  <div className="hr-donut-item" key={d.label}><div className="hr-donut-color" style={{ background: d.color }} /><span className="hr-donut-label">{d.label}</span><span className="hr-donut-val">{d.val}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hr-card">
        <div className="hr-card-hdr">
          <span className="hr-card-title">Ocena współpracy z agencją</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.4vw' }}><span style={{ fontSize: 'clamp(22px,1.6vw,34px)', fontWeight: 800, color: '#1e1b4b' }}>85%</span><span style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#059669', fontWeight: 700 }}>Bardzo dobrze</span></div>
        </div>
        <div className="hr-card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,.8vh,14px)' }}>
            {satisfactionData.map(s => (
              <div className="hr-meter" key={s.label}>
                <div style={{ width: 'clamp(100px,9vw,160px)', fontSize: 'clamp(11px,.7vw,14px)', color: '#6b7280', fontWeight: 500 }}>{s.label}</div>
                <div className="hr-meter-bar"><div className="hr-meter-fill" style={{ width: `${s.value}%` }} /></div>
                <div className="hr-meter-val">{s.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function MessagesView({ toast }: { toast: (t: string, i: string, c: string) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [composing, setComposing] = useState(false);
  const [composeText, setComposeText] = useState('');
  const msg = selected !== null ? messages.find(m => m.id === selected) : null;

  if (composing) {
    return (
      <>
        <div className="hr-hdr">
          <div><div className="hr-title">Nowa wiadomość</div><div className="hr-subtitle">Do: Katarzyna Maj — Rekruter</div></div>
          <button className="hr-btn sec" onClick={() => setComposing(false)}><Icon name="arrow-left" size={17} strokeWidth={2} /> Anuluj</button>
        </div>
        <div className="hr-card">
          <div className="hr-card-body">
            <textarea value={composeText} onChange={e => setComposeText(e.target.value)} placeholder="Napisz wiadomość do rekrutera..."
              style={{ width: '100%', minHeight: 'clamp(120px,15vh,200px)', border: '1px solid #e5e7eb', borderRadius: 12, padding: 'clamp(12px,1.2vh,18px) clamp(14px,1.2vw,20px)', fontSize: 'clamp(13px,.85vw,17px)', fontFamily: 'inherit', resize: 'vertical', outline: 'none', color: '#1e1b4b' }} />
            <div style={{ marginTop: '2vh', display: 'flex', gap: '.8vw' }}>
              <button className="hr-btn pri" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { toast('Wiadomość wysłana!', 'check-circle', '#10b981'); setComposing(false); setComposeText(''); }}>
                <Icon name="send" size={17} strokeWidth={2} /> Wyślij wiadomość
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="hr-hdr">
        <div><div className="hr-title">Wiadomości</div><div className="hr-subtitle">Komunikacja z zespołem rekrutacyjnym</div></div>
        <div style={{ display: 'flex', gap: '.6vw' }}>
          {msg && <button className="hr-btn sec" onClick={() => setSelected(null)}><Icon name="arrow-left" size={17} strokeWidth={2} /> Wróć</button>}
          <button className="hr-btn pri" onClick={() => setComposing(true)}><Icon name="send" size={17} strokeWidth={2} /> Nowa wiadomość</button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {!msg ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="hr-card">
              <div className="hr-card-hdr"><span className="hr-card-title">Skrzynka odbiorcza</span><span style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#6366f1', fontWeight: 700 }}>{messages.filter(m => m.unread).length} nowe</span></div>
              <div className="hr-card-body">
                <div className="hr-msg-list">
                  {messages.map(m => (
                    <motion.div className={`hr-msg ${m.unread ? 'hr-msg-unread' : ''}`} key={m.id} whileTap={{ scale: 0.98 }} onClick={() => setSelected(m.id)}>
                      <div className="hr-msg-avatar" style={{ background: m.avatar }}>{m.from[0]}</div>
                      <div className="hr-msg-body"><div className="hr-msg-from">{m.from} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 'clamp(10px,.6vw,12px)' }}>— {m.role}</span></div><div className="hr-msg-preview">{m.preview}</div></div>
                      <div className="hr-msg-time">{m.time}</div>
                      {m.unread && <div className="hr-msg-dot" />}
                      <span style={{ color: '#d1d5db', flexShrink: 0 }}><Icon name="chevron-right" size={18} strokeWidth={2} /></span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: .2 }}>
            <div className="hr-card">
              <div className="hr-card-hdr">
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8vw' }}>
                  <div className="hr-msg-avatar" style={{ background: msg.avatar }}>{msg.from[0]}</div>
                  <div><div style={{ fontSize: 'clamp(14px,.9vw,18px)', fontWeight: 700, color: '#1e1b4b' }}>{msg.from}</div><div style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#9ca3af' }}>{msg.role} &bull; {msg.time}</div></div>
                </div>
              </div>
              <div className="hr-card-body">
                <p style={{ fontSize: 'clamp(13px,.85vw,17px)', color: '#374151', lineHeight: 1.7 }}>{msg.preview}</p>
                <p style={{ fontSize: 'clamp(13px,.85vw,17px)', color: '#374151', lineHeight: 1.7, marginTop: '2vh' }}>W razie pytań proszę o kontakt. Chętnie omówimy dalsze kroki na spotkaniu lub telefonicznie.</p>
                <p style={{ fontSize: 'clamp(12px,.75vw,15px)', color: '#9ca3af', marginTop: '2vh' }}>Pozdrawiam,<br />{msg.from}<br />{msg.role} — WiseHR Agency</p>
                <div style={{ marginTop: '2.5vh', paddingTop: '2vh', borderTop: '1px solid #f5f5fa', display: 'flex', gap: '.8vw' }}>
                  <button className="hr-btn pri" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setComposing(true); setSelected(null); }}><Icon name="send" size={17} strokeWidth={2} /> Odpowiedz</button>
                  <button className="hr-btn sec" style={{ flex: 1, justifyContent: 'center' }} onClick={() => toast('Załącznik pobrany', 'download', '#6366f1')}><Icon name="download" size={17} strokeWidth={2} /> Pobierz załącznik</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Knowledge() {
  const [openArticle, setOpenArticle] = useState<number | null>(null);
  const article = openArticle !== null ? knowledgeArticles.find(a => a.id === openArticle) : null;
  return (
    <>
      <div className="hr-hdr">
        <div><div className="hr-title">Baza wiedzy</div><div className="hr-subtitle">Odpowiedzi na najczęściej zadawane pytania</div></div>
        {article && <button className="hr-btn sec" onClick={() => setOpenArticle(null)}><Icon name="arrow-left" size={17} strokeWidth={2} /> Wróć</button>}
      </div>
      <AnimatePresence mode="wait">
        {article ? (
          <motion.div key="article" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: .2 }}>
            <div className="hr-card">
              <div className="hr-card-hdr">
                <div style={{ display: 'flex', alignItems: 'center', gap: '.8vw' }}>
                  <div style={{ width: 'clamp(40px,3vw,52px)', height: 'clamp(40px,3vw,52px)', borderRadius: 12, background: 'rgba(99,102,241,.08)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={article.icon} size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="hr-badge new" style={{ marginBottom: 4 }}>{article.cat}</span>
                    <div className="hr-card-title">{article.title}</div>
                  </div>
                </div>
              </div>
              <div className="hr-card-body">
                <p style={{ fontSize: 'clamp(13px,.85vw,17px)', color: '#374151', lineHeight: 1.8 }}>{article.body}</p>
                <div style={{ marginTop: '2.5vh', padding: 'clamp(12px,1.2vh,18px) clamp(14px,1.2vw,20px)', background: '#fafafe', borderRadius: 12, border: '1px solid #f0f0f5' }}>
                  <div style={{ fontSize: 'clamp(11px,.7vw,14px)', fontWeight: 600, color: '#9ca3af', marginBottom: '.5vh' }}>Czy to odpowiedziało na Twoje pytanie?</div>
                  <div style={{ display: 'flex', gap: '.6vw' }}>
                    <button className="hr-btn pri" onClick={() => setOpenArticle(null)}><Icon name="check-circle" size={16} strokeWidth={2} /> Tak, dziękuję</button>
                    <button className="hr-btn sec" onClick={() => setOpenArticle(null)}><Icon name="message-circle" size={16} strokeWidth={2} /> Potrzebuję więcej pomocy</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,.5vh,10px)' }}>
              {knowledgeArticles.map(a => (
                <motion.div key={a.id} whileTap={{ scale: 0.98 }} onClick={() => setOpenArticle(a.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,1vw,16px)', padding: 'clamp(14px,1.4vh,20px) clamp(14px,1.4vw,22px)', background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', cursor: 'pointer', minHeight: 56 }}>
                  <div style={{ width: 'clamp(44px,3vw,52px)', height: 'clamp(44px,3vw,52px)', borderRadius: 12, background: 'rgba(99,102,241,.08)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={a.icon} size={20} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="hr-badge new" style={{ marginBottom: 2, display: 'inline-flex' }}>{a.cat}</span>
                    <div style={{ fontSize: 'clamp(13px,.85vw,16px)', fontWeight: 600, color: '#1e1b4b' }}>{a.title}</div>
                  </div>
                  <span style={{ color: '#d1d5db' }}><Icon name="chevron-right" size={18} strokeWidth={2} /></span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Contact({ toast }: { toast: (t: string, i: string, c: string) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="hr-hdr"><div><div className="hr-title">Kontakt z agencją</div><div className="hr-subtitle">Twój dedykowany zespół rekrutacyjny</div></div></div>
      <div className="hr-grid-2" style={{ marginBottom: '2vh' }}>
        {[
          { name: 'Katarzyna Maj', role: 'Rekruter prowadzący', phone: '+48 501 234 567', email: 'k.maj@wisehr.pl', color: '#6366f1' },
          { name: 'Monika Sikora', role: 'Account Manager', phone: '+48 502 345 678', email: 'm.sikora@wisehr.pl', color: '#8b5cf6' },
        ].map(p => (
          <div className="hr-card" key={p.name}>
            <div className="hr-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5vh' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8vw' }}>
                <div style={{ width: 'clamp(48px,3.5vw,60px)', height: 'clamp(48px,3.5vw,60px)', borderRadius: '50%', background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 'clamp(16px,1.1vw,22px)' }}>{p.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div style={{ fontSize: 'clamp(15px,1vw,20px)', fontWeight: 700, color: '#1e1b4b' }}>{p.name}</div>
                  <div style={{ fontSize: 'clamp(11px,.7vw,14px)', color: '#9ca3af' }}>{p.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '.6vw' }}>
                <motion.button className="hr-btn sec" style={{ flex: 1, justifyContent: 'center' }} whileTap={{ scale: 0.96 }} onClick={() => toast(`Dzwonię do ${p.name}...`, 'message-circle', '#6366f1')}>
                  <Icon name="message-circle" size={16} strokeWidth={2} /> {p.phone}
                </motion.button>
                <motion.button className="hr-btn sec" style={{ flex: 1, justifyContent: 'center' }} whileTap={{ scale: 0.96 }} onClick={() => toast(`Email otwarty: ${p.email}`, 'mail', '#8b5cf6')}>
                  <Icon name="mail" size={16} strokeWidth={2} /> Email
                </motion.button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hr-card">
        <div className="hr-card-hdr"><span className="hr-card-title">Umów spotkanie</span></div>
        <div className="hr-card-body">
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: 'clamp(20px,3vh,40px) 0' }}>
              <div style={{ width: 'clamp(48px,3.5vw,60px)', height: 'clamp(48px,3.5vw,60px)', borderRadius: '50%', background: 'rgba(16,185,129,.08)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto clamp(10px,1vh,16px)' }}><Icon name="check-circle" size={28} strokeWidth={2} /></div>
              <div style={{ fontSize: 'clamp(16px,1.1vw,22px)', fontWeight: 700, color: '#1e1b4b' }}>Prośba o spotkanie wysłana!</div>
              <div style={{ fontSize: 'clamp(11px,.7vw,14px)', color: '#9ca3af', marginTop: 4 }}>Skontaktujemy się w ciągu 2 godzin roboczych.</div>
              <button className="hr-btn sec" style={{ marginTop: 'clamp(12px,1.5vh,20px)' }} onClick={() => setSent(false)}><Icon name="refresh-cw" size={16} strokeWidth={2} /> Umów kolejne</button>
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'clamp(8px,.8vw,14px)' }}>
              {['Jutro, 10:00', 'Jutro, 14:00', 'Piątek, 10:00', 'Piątek, 14:00', 'Pon., 10:00', 'Pon., 14:00'].map(slot => (
                <motion.button key={slot} className="hr-btn sec" style={{ justifyContent: 'center' }} whileTap={{ scale: 0.96 }} onClick={() => { setSent(true); toast(`Spotkanie zarezerwowane: ${slot}`, 'check-circle', '#10b981'); }}>
                  <Icon name="clock" size={16} strokeWidth={2} /> {slot}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Profile({ go, toast }: { go: (v: View) => void; toast: (t: string, i: string, c: string) => void }) {
  return (
    <>
      <div className="hr-hdr"><div><div className="hr-title">Profil i ustawienia</div><div className="hr-subtitle">Zarządzaj swoim kontem</div></div></div>
      <div className="hr-card" style={{ marginBottom: '2vh' }}>
        <div className="hr-card-body" style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
          <div style={{ width: 'clamp(56px,4vw,72px)', height: 'clamp(56px,4vw,72px)', borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 'clamp(18px,1.3vw,26px)' }}>JN</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'clamp(18px,1.3vw,26px)', fontWeight: 800, color: '#1e1b4b' }}>Jan Nowicki</div>
            <div style={{ fontSize: 'clamp(12px,.75vw,15px)', color: '#9ca3af', marginTop: 2 }}>HR Director — TechCorp Sp. z o.o.</div>
            <div style={{ fontSize: 'clamp(11px,.68vw,14px)', color: '#6b7280', marginTop: 4 }}>jan.nowicki@techcorp.pl &bull; +48 500 100 200</div>
          </div>
          <button className="hr-btn sec" onClick={() => toast('Profil zaktualizowany', 'check-circle', '#10b981')}><Icon name="settings" size={17} strokeWidth={2} /> Edytuj profil</button>
        </div>
      </div>
      <div className="hr-section-title">Szybkie akcje</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,.5vh,10px)' }}>
        {[
          { icon: 'bell', label: 'Ustawienia powiadomień', desc: 'Email, SMS, push', action: () => toast('Powiadomienia zapisane', 'check-circle', '#10b981') },
          { icon: 'shield', label: 'Bezpieczeństwo', desc: 'Hasło, 2FA', action: () => toast('Ustawienia bezpieczeństwa', 'shield', '#6366f1') },
          { icon: 'download', label: 'Eksport danych', desc: 'Pobierz historię rekrutacji', action: () => toast('Eksport rozpoczęty — otrzymasz email', 'download', '#8b5cf6') },
          { icon: 'users', label: 'Zarządzaj użytkownikami', desc: '3 aktywnych użytkowników', action: () => toast('Panel użytkowników', 'users', '#818cf8') },
          { icon: 'book-open', label: 'Baza wiedzy', desc: 'FAQ i poradniki', action: () => go('knowledge') },
          { icon: 'mail', label: 'Kontakt z agencją', desc: 'Twój dedykowany zespół', action: () => go('contact') },
        ].map(item => (
          <motion.div key={item.label} whileTap={{ scale: 0.98 }} onClick={item.action}
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,1vw,16px)', padding: 'clamp(14px,1.4vh,20px) clamp(14px,1.4vw,22px)', background: '#fff', borderRadius: 14, border: '1px solid #f0f0f5', cursor: 'pointer', minHeight: 56 }}>
            <div style={{ width: 'clamp(40px,2.8vw,50px)', height: 'clamp(40px,2.8vw,50px)', borderRadius: 12, background: 'rgba(99,102,241,.08)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={item.icon} size={20} strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'clamp(13px,.85vw,16px)', fontWeight: 600, color: '#1e1b4b' }}>{item.label}</div>
              <div style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#9ca3af', marginTop: 1 }}>{item.desc}</div>
            </div>
            <span style={{ color: '#d1d5db' }}><Icon name="chevron-right" size={18} strokeWidth={2} /></span>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════

export function HrDemo() {
  const [view, setView] = useState<View>('dashboard');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const addToast = useCallback((text: string, icon: string, color: string) => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, text, icon, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <div className="hr">
      <div className="hr-side">
        <div className="hr-side-brand">
          <div className="hr-side-logo">W</div>
          <div><div className="hr-side-name">WiseHR</div><div className="hr-side-sub">Panel Klienta</div></div>
        </div>
        <div className="hr-side-section">Nawigacja</div>
        {navItems.map(item => (
          <button key={item.view} className={`hr-nav${view === item.view ? ' on' : ''}`} onClick={() => setView(item.view)}>
            <Icon name={item.icon} size={20} strokeWidth={2} /> {item.label}
            {item.badge && <span className="hr-nav-badge">{item.badge}</span>}
          </button>
        ))}
        <div className="hr-side-section">Pomoc</div>
        <button className={`hr-nav${view === 'knowledge' ? ' on' : ''}`} onClick={() => setView('knowledge')}>
          <Icon name="book-open" size={20} strokeWidth={2} /> Baza wiedzy
        </button>
        <button className={`hr-nav${view === 'contact' ? ' on' : ''}`} onClick={() => setView('contact')}>
          <Icon name="mail" size={20} strokeWidth={2} /> Kontakt z agencją
        </button>
        <motion.div className="hr-side-user" style={{ cursor: 'pointer' }} whileTap={{ scale: 0.97 }} onClick={() => setView('profile')}>
          <div className="hr-side-avatar">JN</div>
          <div><div className="hr-side-uname">Jan Nowicki</div><div className="hr-side-urole">HR Director — TechCorp</div></div>
        </motion.div>
      </div>
      <div className="hr-main">
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {view === 'dashboard' && <Dashboard go={setView} toast={addToast} />}
            {view === 'recruitments' && <Recruitments toast={addToast} />}
            {view === 'pipeline' && <PipelineView toast={addToast} />}
            {view === 'reports' && <Reports toast={addToast} />}
            {view === 'messages' && <MessagesView toast={addToast} />}
            {view === 'knowledge' && <Knowledge />}
            {view === 'contact' && <Contact toast={addToast} />}
            {view === 'profile' && <Profile go={setView} toast={addToast} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}
