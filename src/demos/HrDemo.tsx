import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/Icon';
import './demo.css';
import './hr.css';

// ═══════════════════════════════════════════════════
// Simulated Data — HR Agency Client Panel
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
    { name: 'Anna Kowalczyk', role: 'Senior Java Dev', date: '17.03', rating: 3 },
    { name: 'Piotr Zieliński', role: 'Senior Java Dev', date: '16.03', rating: 4 },
    { name: 'Ewa Jabłońska', role: 'Product Manager', date: '16.03', rating: 3 },
    { name: 'Michał Lewandowski', role: 'UX/UI Designer', date: '15.03', rating: 2 },
  ],
  screening: [
    { name: 'Karolina Wójcik', role: 'Senior Java Dev', date: '14.03', rating: 4 },
    { name: 'Tomasz Nowak', role: 'Product Manager', date: '14.03', rating: 5 },
    { name: 'Jan Mazur', role: 'DevOps Engineer', date: '13.03', rating: 3 },
  ],
  interview: [
    { name: 'Marta Szymańska', role: 'Senior Java Dev', date: '12.03', rating: 5 },
    { name: 'Robert Wiśniewski', role: 'Account Manager', date: '11.03', rating: 4 },
    { name: 'Aleksandra Dąbrowska', role: 'Product Manager', date: '10.03', rating: 4 },
  ],
  offer: [
    { name: 'Paweł Kamiński', role: 'Senior Java Dev', date: '08.03', rating: 5 },
    { name: 'Natalia Kwiatkowska', role: 'Account Manager', date: '07.03', rating: 5 },
  ],
  hired: [
    { name: 'Łukasz Grabowski', role: 'Account Manager', date: '01.03', rating: 5 },
  ],
};

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

const monthlyHires = [2, 3, 1, 4, 3, 5, 4, 6, 3, 5, 7, 4];
const monthLabels = ['Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru','Sty','Lut','Mar'];
const maxHires = Math.max(...monthlyHires);

const satisfactionData = [
  { label: 'Jakość kandydatów', value: 87 },
  { label: 'Czas realizacji', value: 74 },
  { label: 'Komunikacja', value: 92 },
  { label: 'Ogólna ocena', value: 85 },
];

// ═══════════════════════════════════════════════════

type View = 'dashboard' | 'recruitments' | 'pipeline' | 'reports' | 'messages';

const navItems: { icon: string; label: string; view: View; badge?: string }[] = [
  { icon: 'home', label: 'Pulpit', view: 'dashboard' },
  { icon: 'briefcase', label: 'Rekrutacje', view: 'recruitments', badge: '6' },
  { icon: 'users', label: 'Pipeline', view: 'pipeline' },
  { icon: 'bar-chart', label: 'Raporty', view: 'reports' },
  { icon: 'message-circle', label: 'Wiadomości', view: 'messages', badge: '2' },
];

// ─── Candidate Detail Modal ───
function CandidateModal({ candidate, onClose }: { candidate: typeof pipelineCandidates.interview[0]; onClose: () => void }) {
  const timeline = [
    { date: '05.03.2026', text: 'Aplikacja otrzymana', note: 'CV + list motywacyjny', status: 'done' as const },
    { date: '07.03.2026', text: 'Screening CV', note: 'Pozytywna weryfikacja — spełnia 90% wymagań', status: 'done' as const },
    { date: '10.03.2026', text: 'Rozmowa telefoniczna', note: 'Rekruter: Katarzyna Maj — rekomendacja pozytywna', status: 'done' as const },
    { date: '14.03.2026', text: 'Rozmowa techniczna', note: 'Panel: 2 osoby, wynik: 4.5/5', status: 'current' as const },
    { date: 'Planowane', text: 'Rozmowa z hiring managerem', note: '', status: 'pending' as const },
    { date: 'Planowane', text: 'Oferta', note: '', status: 'pending' as const },
  ];

  return (
    <motion.div className="hr-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <motion.div className="hr-modal" onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}>
        <div className="hr-modal-hdr">
          <div>
            <div style={{ fontSize: 'clamp(16px,1.2vw,22px)', fontWeight: 800, color: '#1e1b4b' }}>{candidate.name}</div>
            <div style={{ fontSize: 'clamp(10px,.65vw,13px)', color: '#9ca3af', marginTop: 3 }}>Kandydat na: {candidate.role}</div>
          </div>
          <button className="hr-modal-close" onClick={onClose}>
            <Icon name="x" size={20} strokeWidth={2} />
          </button>
        </div>
        <div className="hr-modal-body">
          <div className="hr-detail-grid">
            <div className="hr-detail-item">
              <div className="hr-detail-label">Email</div>
              <div className="hr-detail-val">{candidate.name.toLowerCase().replace(' ', '.')}@email.com</div>
            </div>
            <div className="hr-detail-item">
              <div className="hr-detail-label">Telefon</div>
              <div className="hr-detail-val">+48 {Math.floor(500000000 + Math.random() * 400000000)}</div>
            </div>
            <div className="hr-detail-item">
              <div className="hr-detail-label">Doświadczenie</div>
              <div className="hr-detail-val">{3 + candidate.rating} lat</div>
            </div>
            <div className="hr-detail-item">
              <div className="hr-detail-label">Oczekiwania finansowe</div>
              <div className="hr-detail-val">{12 + candidate.rating * 2} 000 — {16 + candidate.rating * 2} 000 PLN</div>
            </div>
          </div>

          <div className="hr-detail-label" style={{ marginBottom: '.5vh' }}>Kompetencje</div>
          <div className="hr-skill-tags">
            {['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker', 'Kubernetes', 'SQL'].slice(0, 4 + candidate.rating).map(s => (
              <span className="hr-skill-tag" key={s}>{s}</span>
            ))}
          </div>

          <div style={{ marginTop: '2vh' }}>
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
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Dashboard View ───
function Dashboard({ go }: { go: (v: View) => void }) {
  const totalCandidates = recruitments.reduce((s, r) => s + r.candidates, 0);
  const totalInterviews = recruitments.reduce((s, r) => s + r.interviews, 0);
  const totalOffers = recruitments.reduce((s, r) => s + r.offers, 0);
  const activeCount = recruitments.filter(r => r.status === 'active').length;

  return (
    <>
      <div className="hr-hdr">
        <div>
          <div className="hr-title">Witaj w panelu rekrutacji</div>
          <div className="hr-subtitle">Marzec 2026 &bull; Ostatnia aktualizacja: dziś, 14:32</div>
        </div>
        <div style={{ display: 'flex', gap: '.6vw' }}>
          <button className="hr-btn sec" onClick={() => go('reports')}>
            <Icon name="bar-chart" size={15} strokeWidth={2} /> Raporty
          </button>
          <button className="hr-btn pri" onClick={() => go('messages')}>
            <Icon name="message-circle" size={15} strokeWidth={2} /> Wiadomości
          </button>
        </div>
      </div>

      <div className="hr-stats">
        {[
          { label: 'Aktywne rekrutacje', val: activeCount.toString(), change: '+2 w tym mies.', dir: 'up', icon: 'briefcase', bg: 'rgba(99,102,241,.08)', iconColor: '#6366f1' },
          { label: 'Kandydaci łącznie', val: totalCandidates.toString(), change: '+18 nowych', dir: 'up', icon: 'users', bg: 'rgba(139,92,246,.08)', iconColor: '#8b5cf6' },
          { label: 'Rozmowy w toku', val: totalInterviews.toString(), change: '4 zaplanowane', dir: 'neutral', icon: 'message-circle', bg: 'rgba(129,140,248,.08)', iconColor: '#818cf8' },
          { label: 'Oferty wysłane', val: totalOffers.toString(), change: '1 zaakceptowana', dir: 'up', icon: 'send', bg: 'rgba(16,185,129,.08)', iconColor: '#059669' },
        ].map(s => (
          <div className="hr-stat" key={s.label}>
            <div className="hr-stat-icon" style={{ background: s.bg, color: s.iconColor }}>
              <Icon name={s.icon} size={16} strokeWidth={2} />
            </div>
            <div className="hr-stat-label">{s.label}</div>
            <div className="hr-stat-val">{s.val}</div>
            <div className={`hr-stat-change ${s.dir}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="hr-grid-2">
        {/* Active recruitments */}
        <div className="hr-card">
          <div className="hr-card-hdr">
            <span className="hr-card-title">Aktywne rekrutacje</span>
            <button className="hr-btn ghost" onClick={() => go('recruitments')}>
              Wszystkie <Icon name="arrow-up-right" size={12} strokeWidth={2} />
            </button>
          </div>
          <div className="hr-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.8vh' }}>
              {recruitments.filter(r => r.status === 'active').slice(0, 4).map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '.8vw' }}>
                  <div style={{ width: 'clamp(6px,.4vw,8px)', height: 'clamp(6px,.4vw,8px)', borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'clamp(10px,.68vw,13px)', fontWeight: 600, color: '#1e1b4b' }}>{r.title}</div>
                    <div style={{ fontSize: 'clamp(8px,.5vw,10px)', color: '#9ca3af' }}>{r.dept} &bull; {r.candidates} kandydatów</div>
                  </div>
                  <div className="hr-rec-progress" style={{ width: 'clamp(60px,6vw,100px)' }}>
                    <div className="hr-rec-progress-bar">
                      <div className="hr-rec-progress-fill" style={{ width: `${r.progress}%`, background: r.color }} />
                    </div>
                    <div className="hr-rec-progress-text">{r.progress}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="hr-card">
          <div className="hr-card-hdr">
            <span className="hr-card-title">Ostatnia aktywność</span>
          </div>
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

      {/* Messages preview */}
      <div className="hr-card">
        <div className="hr-card-hdr">
          <span className="hr-card-title">Wiadomości od agencji</span>
          <button className="hr-btn ghost" onClick={() => go('messages')}>
            Wszystkie <Icon name="arrow-up-right" size={12} strokeWidth={2} />
          </button>
        </div>
        <div className="hr-card-body">
          <div className="hr-msg-list">
            {messages.slice(0, 3).map(m => (
              <div className={`hr-msg ${m.unread ? 'hr-msg-unread' : ''}`} key={m.id}>
                <div className="hr-msg-avatar" style={{ background: m.avatar }}>{m.from[0]}</div>
                <div className="hr-msg-body">
                  <div className="hr-msg-from">{m.from} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: 'clamp(8px,.48vw,10px)' }}>— {m.role}</span></div>
                  <div className="hr-msg-preview">{m.preview}</div>
                </div>
                <div className="hr-msg-time">{m.time}</div>
                {m.unread && <div className="hr-msg-dot" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Recruitments View ───
function Recruitments() {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const filtered = recruitments.filter(r => filter === 'all' || r.status === filter);

  return (
    <>
      <div className="hr-hdr">
        <div>
          <div className="hr-title">Rekrutacje</div>
          <div className="hr-subtitle">{recruitments.length} procesów rekrutacyjnych</div>
        </div>
        <div className="hr-filters">
          {([['all', 'Wszystkie'], ['active', 'Aktywne'], ['paused', 'Wstrzymane']] as const).map(([v, l]) => (
            <button key={v} className={`hr-filter ${filter === v ? 'on' : ''}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="hr-rec-list">
        {filtered.map(r => (
          <div className="hr-rec" key={r.id}>
            <div className="hr-rec-icon" style={{ background: `${r.color}12`, color: r.color }}>
              <Icon name="briefcase" size={18} strokeWidth={2} />
            </div>
            <div className="hr-rec-info">
              <div className="hr-rec-title">{r.title}</div>
              <div className="hr-rec-meta">
                <span>{r.dept}</span>
                <span>&bull;</span>
                <span>{r.daysOpen} dni otwarte</span>
                <span>&bull;</span>
                <span>Deadline: {r.deadline}</span>
              </div>
            </div>
            <div className="hr-rec-stats">
              <div className="hr-rec-stat-item">
                <div className="hr-rec-stat-val">{r.candidates}</div>
                <div className="hr-rec-stat-label">Kandydatów</div>
              </div>
              <div className="hr-rec-stat-item">
                <div className="hr-rec-stat-val">{r.shortlisted}</div>
                <div className="hr-rec-stat-label">Shortlista</div>
              </div>
              <div className="hr-rec-stat-item">
                <div className="hr-rec-stat-val">{r.interviews}</div>
                <div className="hr-rec-stat-label">Rozmowy</div>
              </div>
              <div className="hr-rec-stat-item">
                <div className="hr-rec-stat-val">{r.offers}</div>
                <div className="hr-rec-stat-label">Oferty</div>
              </div>
            </div>
            <div className="hr-rec-progress">
              <div className="hr-rec-progress-bar">
                <div className="hr-rec-progress-fill" style={{ width: `${r.progress}%`, background: r.color }} />
              </div>
              <div className="hr-rec-progress-text">{r.progress}%</div>
            </div>
            <span className={`hr-badge ${r.status}`}>
              {r.status === 'active' ? 'Aktywna' : 'Wstrzymana'}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Pipeline View (Kanban) ───
function Pipeline() {
  const [selected, setSelected] = useState<typeof pipelineCandidates.applied[0] | null>(null);
  const stages = [
    { key: 'applied' as const, label: 'Aplikacje', color: '#9ca3af' },
    { key: 'screening' as const, label: 'Screening', color: '#6366f1' },
    { key: 'interview' as const, label: 'Rozmowy', color: '#8b5cf6' },
    { key: 'offer' as const, label: 'Oferta', color: '#f59e0b' },
    { key: 'hired' as const, label: 'Zatrudnieni', color: '#10b981' },
  ];

  return (
    <>
      <div className="hr-hdr">
        <div>
          <div className="hr-title">Pipeline kandydatów</div>
          <div className="hr-subtitle">Wszystkie aktywne rekrutacje &bull; Kliknij kandydata, aby zobaczyć szczegóły</div>
        </div>
      </div>

      <div className="hr-pipeline">
        {stages.map(stage => {
          const candidates = pipelineCandidates[stage.key];
          return (
            <div className="hr-pipe-col" key={stage.key}>
              <div className="hr-pipe-hdr" style={{ borderBottom: `2px solid ${stage.color}` }}>
                <span className="hr-pipe-hdr-title">{stage.label}</span>
                <span className="hr-pipe-count">{candidates.length}</span>
              </div>
              <div className="hr-pipe-body">
                {candidates.map((c, i) => (
                  <motion.div className="hr-pipe-card" key={i}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelected(c)}>
                    <div className="hr-pipe-card-name">{c.name}</div>
                    <div className="hr-pipe-card-role">{c.role}</div>
                    <div className="hr-pipe-card-foot">
                      <span className="hr-pipe-card-date">{c.date}</span>
                      <div className="hr-pipe-card-rating">
                        {Array.from({ length: 5 }, (_, j) => (
                          <div key={j} className="hr-pipe-card-dot" style={{ background: j < c.rating ? stage.color : '#e5e7eb' }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && <CandidateModal candidate={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Reports View ───
function Reports() {
  return (
    <>
      <div className="hr-hdr">
        <div>
          <div className="hr-title">Raporty i analityka</div>
          <div className="hr-subtitle">Podsumowanie współpracy z agencją HR</div>
        </div>
        <button className="hr-btn sec">
          <Icon name="download" size={15} strokeWidth={2} /> Eksport PDF
        </button>
      </div>

      <div className="hr-stats" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[
          { label: 'Śr. czas rekrutacji', val: '23 dni', change: '-4 dni vs Q3', dir: 'up' },
          { label: 'Wskaźnik zatrudnienia', val: '68%', change: '+12pp vs Q3', dir: 'up' },
          { label: 'Koszt per hire', val: '4 200 PLN', change: '-800 PLN vs Q3', dir: 'up' },
        ].map(s => (
          <div className="hr-stat" key={s.label}>
            <div className="hr-stat-label">{s.label}</div>
            <div className="hr-stat-val">{s.val}</div>
            <div className={`hr-stat-change ${s.dir}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="hr-grid-2">
        {/* Monthly hires chart */}
        <div className="hr-card">
          <div className="hr-card-hdr">
            <span className="hr-card-title">Zatrudnienia miesięcznie</span>
          </div>
          <div className="hr-card-body">
            <div className="hr-chart-bars">
              {monthlyHires.map((v, i) => (
                <div className="hr-chart-bar-wrap" key={i}>
                  <div className="hr-chart-bar-val">{v}</div>
                  <div className="hr-chart-bar"
                    style={{
                      height: `${(v / maxHires) * 100}%`,
                      background: i === monthlyHires.length - 1 ? '#6366f1' : i === monthlyHires.length - 2 ? '#818cf8' : '#e0e7ff'
                    }} />
                  <div className="hr-chart-bar-label">{monthLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Source breakdown */}
        <div className="hr-card">
          <div className="hr-card-hdr">
            <span className="hr-card-title">Źródła kandydatów</span>
          </div>
          <div className="hr-card-body">
            <div className="hr-donut-wrap">
              <svg viewBox="0 0 100 100" width="clamp(80px,6vw,120px)" height="clamp(80px,6vw,120px)">
                {/* Simple donut segments */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="12" strokeDasharray="88 163" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="63 188" strokeDashoffset="-88" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#c084fc" strokeWidth="12" strokeDasharray="50 201" strokeDashoffset="-151" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e0e7ff" strokeWidth="12" strokeDasharray="50 201" strokeDashoffset="-201" transform="rotate(-90 50 50)" />
              </svg>
              <div className="hr-donut-legend">
                {[
                  { color: '#6366f1', label: 'LinkedIn', val: '35%' },
                  { color: '#8b5cf6', label: 'Direct search', val: '25%' },
                  { color: '#c084fc', label: 'Referencje', val: '20%' },
                  { color: '#e0e7ff', label: 'Job boards', val: '20%' },
                ].map(d => (
                  <div className="hr-donut-item" key={d.label}>
                    <div className="hr-donut-color" style={{ background: d.color }} />
                    <span className="hr-donut-label">{d.label}</span>
                    <span className="hr-donut-val">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Satisfaction */}
      <div className="hr-card">
        <div className="hr-card-hdr">
          <span className="hr-card-title">Ocena współpracy z agencją</span>
        </div>
        <div className="hr-card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.2vw' }}>
            {satisfactionData.map(s => (
              <div className="hr-meter" key={s.label}>
                <div style={{ width: 'clamp(80px,7vw,120px)', fontSize: 'clamp(9px,.58vw,12px)', color: '#6b7280', fontWeight: 500 }}>{s.label}</div>
                <div className="hr-meter-bar">
                  <div className="hr-meter-fill" style={{ width: `${s.value}%` }} />
                </div>
                <div className="hr-meter-val">{s.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Messages View ───
function Messages() {
  const [selected, setSelected] = useState<number | null>(null);
  const msg = selected !== null ? messages.find(m => m.id === selected) : null;

  return (
    <>
      <div className="hr-hdr">
        <div>
          <div className="hr-title">Wiadomości</div>
          <div className="hr-subtitle">Komunikacja z zespołem rekrutacyjnym</div>
        </div>
      </div>

      <div className="hr-grid-2" style={{ gridTemplateColumns: selected !== null ? '1fr 1.5fr' : '1fr' }}>
        <div className="hr-card">
          <div className="hr-card-hdr">
            <span className="hr-card-title">Skrzynka odbiorcza</span>
            <span style={{ fontSize: 'clamp(8px,.48vw,10px)', color: '#6366f1', fontWeight: 700 }}>
              {messages.filter(m => m.unread).length} nowe
            </span>
          </div>
          <div className="hr-card-body">
            <div className="hr-msg-list">
              {messages.map(m => (
                <div className={`hr-msg ${m.unread ? 'hr-msg-unread' : ''}`} key={m.id}
                  style={{ cursor: 'pointer', borderRadius: 8, padding: '.6vh .6vw', background: selected === m.id ? '#f5f3ff' : 'transparent' }}
                  onClick={() => setSelected(m.id)}>
                  <div className="hr-msg-avatar" style={{ background: m.avatar }}>{m.from[0]}</div>
                  <div className="hr-msg-body">
                    <div className="hr-msg-from">{m.from}</div>
                    <div className="hr-msg-preview">{m.preview}</div>
                  </div>
                  <div className="hr-msg-time">{m.time}</div>
                  {m.unread && <div className="hr-msg-dot" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {msg && (
            <motion.div className="hr-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="hr-card-hdr">
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6vw' }}>
                  <div className="hr-msg-avatar" style={{ background: msg.avatar, width: 'clamp(32px,2.4vw,40px)', height: 'clamp(32px,2.4vw,40px)', fontSize: 'clamp(11px,.75vw,15px)' }}>
                    {msg.from[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 'clamp(11px,.75vw,14px)', fontWeight: 700, color: '#1e1b4b' }}>{msg.from}</div>
                    <div style={{ fontSize: 'clamp(8px,.5vw,10px)', color: '#9ca3af' }}>{msg.role} &bull; {msg.time}</div>
                  </div>
                </div>
                <button className="hr-modal-close" onClick={() => setSelected(null)}>
                  <Icon name="x" size={16} strokeWidth={2} />
                </button>
              </div>
              <div className="hr-card-body">
                <p style={{ fontSize: 'clamp(11px,.72vw,14px)', color: '#374151', lineHeight: 1.7 }}>
                  {msg.preview}
                </p>
                <p style={{ fontSize: 'clamp(11px,.72vw,14px)', color: '#374151', lineHeight: 1.7, marginTop: '1.5vh' }}>
                  W razie pytań proszę o kontakt. Chętnie omówimy dalsze kroki na spotkaniu lub telefonicznie.
                </p>
                <p style={{ fontSize: 'clamp(10px,.65vw,13px)', color: '#9ca3af', marginTop: '1.5vh' }}>
                  Pozdrawiam,<br />{msg.from}<br />{msg.role} — WiseHR Agency
                </p>
                <div style={{ marginTop: '2vh', paddingTop: '1.5vh', borderTop: '1px solid #f5f5fa', display: 'flex', gap: '.6vw' }}>
                  <button className="hr-btn pri">
                    <Icon name="send" size={14} strokeWidth={2} /> Odpowiedz
                  </button>
                  <button className="hr-btn sec">
                    <Icon name="download" size={14} strokeWidth={2} /> Załączniki
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════

export function HrDemo() {
  const [view, setView] = useState<View>('dashboard');

  return (
    <div className="hr">
      <div className="hr-side">
        <div className="hr-side-brand">
          <div className="hr-side-logo">W</div>
          <div>
            <div className="hr-side-name">WiseHR</div>
            <div className="hr-side-sub">Panel Klienta</div>
          </div>
        </div>

        <div className="hr-side-section">Nawigacja</div>
        {navItems.map(item => (
          <button key={item.view} className={`hr-nav${view === item.view ? ' on' : ''}`}
            onClick={() => setView(item.view)}>
            <Icon name={item.icon} size={16} strokeWidth={2} />
            {item.label}
            {item.badge && <span className="hr-nav-badge">{item.badge}</span>}
          </button>
        ))}

        <div className="hr-side-section">Pomoc</div>
        <button className="hr-nav">
          <Icon name="book-open" size={16} strokeWidth={2} /> Baza wiedzy
        </button>
        <button className="hr-nav">
          <Icon name="mail" size={16} strokeWidth={2} /> Kontakt z agencją
        </button>

        <div className="hr-side-user">
          <div className="hr-side-avatar">JN</div>
          <div>
            <div className="hr-side-uname">Jan Nowicki</div>
            <div className="hr-side-urole">HR Director — TechCorp</div>
          </div>
        </div>
      </div>

      <div className="hr-main">
        <AnimatePresence mode="wait">
          <motion.div key={view}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}>
            {view === 'dashboard' && <Dashboard go={setView} />}
            {view === 'recruitments' && <Recruitments />}
            {view === 'pipeline' && <Pipeline />}
            {view === 'reports' && <Reports />}
            {view === 'messages' && <Messages />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
