import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/Icon';
import './demo.css';
import './crm.css';

// ═══════════════════════════════════════════════════
// Simulated Data — Dedicated CRM System
// ═══════════════════════════════════════════════════

const contacts = [
  { id: 1, name: 'Mateusz Kowalski', company: 'TechVentures Sp. z o.o.', role: 'CEO', email: 'mateusz@techventures.pl', phone: '+48 512 345 678', deals: 3, totalValue: 185000, status: 'hot' as const, lastContact: '2 godz. temu', color: '#ec4899', tags: ['VIP', 'Tech'] },
  { id: 2, name: 'Anna Wiśniewska', company: 'GreenLogic S.A.', role: 'VP Sales', email: 'anna.w@greenlogic.pl', phone: '+48 698 123 456', deals: 2, totalValue: 124000, status: 'warm' as const, lastContact: 'Wczoraj', color: '#8b5cf6', tags: ['Enterprise', 'Logistyka'] },
  { id: 3, name: 'Piotr Nowak', company: 'DataStream Labs', role: 'CTO', email: 'piotr@datastream.io', phone: '+48 784 567 890', deals: 1, totalValue: 96000, status: 'hot' as const, lastContact: '3 godz. temu', color: '#3b82f6', tags: ['SaaS', 'AI'] },
  { id: 4, name: 'Katarzyna Dąbrowska', company: 'FinBridge Group', role: 'Head of Operations', email: 'k.dabrowska@finbridge.pl', phone: '+48 601 234 567', deals: 2, totalValue: 210000, status: 'warm' as const, lastContact: '2 dni temu', color: '#f59e0b', tags: ['Finanse', 'Enterprise'] },
  { id: 5, name: 'Tomasz Zieliński', company: 'CloudFirst Polska', role: 'Founder', email: 'tomasz@cloudfirst.pl', phone: '+48 515 678 901', deals: 1, totalValue: 68000, status: 'cold' as const, lastContact: '5 dni temu', color: '#10b981', tags: ['Startup', 'Cloud'] },
  { id: 6, name: 'Magdalena Lewandowska', company: 'RetailMax', role: 'Dyrektor zakupów', email: 'm.lewandowska@retailmax.pl', phone: '+48 722 345 678', deals: 2, totalValue: 156000, status: 'warm' as const, lastContact: '1 dzień temu', color: '#06b6d4', tags: ['Retail', 'E-commerce'] },
];

const deals = {
  lead: [
    { id: 1, name: 'System ERP — TechVentures', company: 'TechVentures', value: 85000, prob: 20, date: '18.03', owner: 'MK', color: '#ec4899' },
    { id: 2, name: 'Integracja API — CloudFirst', company: 'CloudFirst', value: 68000, prob: 15, date: '17.03', owner: 'TZ', color: '#10b981' },
    { id: 3, name: 'Dashboard analityczny — RetailMax', company: 'RetailMax', value: 42000, prob: 25, date: '16.03', owner: 'ML', color: '#06b6d4' },
  ],
  qualified: [
    { id: 4, name: 'CRM dedykowany — GreenLogic', company: 'GreenLogic', value: 74000, prob: 45, date: '14.03', owner: 'AW', color: '#8b5cf6' },
    { id: 5, name: 'Automatyzacja procesów — FinBridge', company: 'FinBridge', value: 120000, prob: 50, date: '13.03', owner: 'KD', color: '#f59e0b' },
  ],
  proposal: [
    { id: 6, name: 'Platforma B2B — TechVentures', company: 'TechVentures', value: 65000, prob: 65, date: '10.03', owner: 'MK', color: '#ec4899' },
    { id: 7, name: 'System logistyczny — GreenLogic', company: 'GreenLogic', value: 50000, prob: 70, date: '09.03', owner: 'AW', color: '#8b5cf6' },
    { id: 8, name: 'Panel klienta — RetailMax', company: 'RetailMax', value: 114000, prob: 60, date: '08.03', owner: 'ML', color: '#06b6d4' },
  ],
  negotiation: [
    { id: 9, name: 'Hub integracji — FinBridge', company: 'FinBridge', value: 90000, prob: 80, date: '05.03', owner: 'KD', color: '#f59e0b' },
    { id: 10, name: 'Moduł raportowy — DataStream', company: 'DataStream', value: 96000, prob: 85, date: '04.03', owner: 'PN', color: '#3b82f6' },
  ],
  won: [
    { id: 11, name: 'Panel administracyjny — TechVentures', company: 'TechVentures', value: 35000, prob: 100, date: '01.03', owner: 'MK', color: '#ec4899' },
  ],
};

type DealData = typeof deals.lead[0];

const activities = [
  { color: '#10b981', text: '<strong>Paweł Kamiński</strong> podpisał umowę — Panel administracyjny (35 000 PLN)', time: '1 godz. temu' },
  { color: '#ec4899', text: 'Nowy lead: <strong>Dashboard analityczny</strong> od RetailMax', time: '2 godz. temu' },
  { color: '#f59e0b', text: 'Spotkanie z <strong>FinBridge</strong> — negocjacje Hub integracji', time: '3 godz. temu' },
  { color: '#8b5cf6', text: '<strong>Anna Wiśniewska</strong> otworzyła propozycję CRM dedykowany', time: '4 godz. temu' },
  { color: '#3b82f6', text: 'Follow-up wysłany do <strong>DataStream Labs</strong>', time: '5 godz. temu' },
  { color: '#ec4899', text: 'Nowy kontakt: <strong>Magdalena Lewandowska</strong> z RetailMax', time: 'Wczoraj' },
  { color: '#10b981', text: '<strong>GreenLogic</strong> — propozycja systemu logistycznego zaakceptowana', time: 'Wczoraj' },
  { color: '#f59e0b', text: 'Zadanie: przygotuj ofertę dla <strong>CloudFirst</strong> do piątku', time: '2 dni temu' },
];

const notifications = [
  { icon: 'check-circle', color: '#10b981', text: 'Nowa umowa — TechVentures, 35 000 PLN', time: '1h' },
  { icon: 'users', color: '#ec4899', text: '3 nowe leady w tym tygodniu', time: '2h' },
  { icon: 'clock', color: '#f59e0b', text: 'Follow-up: FinBridge — jutro deadline', time: '4h' },
  { icon: 'alert-triangle', color: '#ef4444', text: 'CloudFirst — brak kontaktu od 5 dni', time: '1d' },
];

const monthlyRevenue = [42, 58, 35, 72, 64, 88, 76, 95, 68, 82, 110, 92];
const monthLabels = ['Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru', 'Sty', 'Lut', 'Mar'];
const maxRevenue = Math.max(...monthlyRevenue);

const tasks = [
  { id: 1, text: 'Przygotować ofertę dla CloudFirst', due: 'Piątek, 21.03', priority: 'high' as const, contact: 'Tomasz Zieliński', done: false },
  { id: 2, text: 'Follow-up z FinBridge — negocjacje', due: 'Jutro, 20.03', priority: 'high' as const, contact: 'Katarzyna Dąbrowska', done: false },
  { id: 3, text: 'Demo produktu dla DataStream Labs', due: 'Pon., 24.03', priority: 'medium' as const, contact: 'Piotr Nowak', done: false },
  { id: 4, text: 'Wysłać case study do GreenLogic', due: 'Środa, 26.03', priority: 'low' as const, contact: 'Anna Wiśniewska', done: false },
  { id: 5, text: 'Zaktualizować dane kontaktowe RetailMax', due: 'Czwartek, 20.03', priority: 'low' as const, contact: 'Magdalena Lewandowska', done: true },
];

// ═══════════════════════════════════════════════════
// Hooks
// ═══════════════════════════════════════════════════

function useAnimatedCounter(target: number, duration = 800) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

function formatPLN(v: number) {
  return v.toLocaleString('pl-PL') + ' PLN';
}

// ═══════════════════════════════════════════════════

type View = 'dashboard' | 'contacts' | 'pipeline' | 'reports' | 'tasks';

const navItems: { icon: string; label: string; view: View; badge?: string }[] = [
  { icon: 'home', label: 'Pulpit', view: 'dashboard' },
  { icon: 'users', label: 'Kontakty', view: 'contacts', badge: '6' },
  { icon: 'target', label: 'Pipeline', view: 'pipeline' },
  { icon: 'bar-chart', label: 'Raporty', view: 'reports' },
  { icon: 'clipboard', label: 'Zadania', view: 'tasks', badge: '4' },
];

// ─── Deal Detail Modal ───
function DealModal({ deal, stageColor, onClose }: { deal: DealData; stageColor: string; onClose: () => void }) {
  const timeline = [
    { date: '01.03.2026', text: 'Lead zidentyfikowany', note: 'Kontakt pozyskany z LinkedIn — wstępne zainteresowanie', status: 'done' as const },
    { date: '05.03.2026', text: 'Pierwszy kontakt', note: 'Rozmowa wideo 30 min — omówienie potrzeb biznesowych', status: 'done' as const },
    { date: '08.03.2026', text: 'Propozycja wysłana', note: `Wartość: ${formatPLN(deal.value)} — zakres i harmonogram uzgodniony`, status: 'done' as const },
    { date: '12.03.2026', text: 'Negocjacje', note: `Prawdopodobieństwo zamknięcia: ${deal.prob}%`, status: 'current' as const },
    { date: 'Planowane', text: 'Podpisanie umowy', note: '', status: 'pending' as const },
    { date: 'Planowane', text: 'Kick-off projektu', note: '', status: 'pending' as const },
  ];

  return (
    <motion.div className="crm-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <motion.div className="crm-modal" onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
        <div className="crm-modal-hdr">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6vw' }}>
              <div style={{ width: 'clamp(40px,3vw,52px)', height: 'clamp(40px,3vw,52px)', borderRadius: 14, background: `${stageColor}15`, color: stageColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 'clamp(15px,1.1vw,20px)' }}>
                {deal.owner}
              </div>
              <div>
                <div style={{ fontSize: 'clamp(18px, 1.3vw, 26px)', fontWeight: 800, color: '#1a1225' }}>{deal.name}</div>
                <div style={{ fontSize: 'clamp(12px, .75vw, 15px)', color: '#9ca3af', marginTop: 2 }}>{deal.company}</div>
              </div>
            </div>
          </div>
          <button className="crm-modal-close" onClick={onClose}>
            <Icon name="x" size={22} strokeWidth={2} />
          </button>
        </div>
        <div className="crm-modal-body">
          <div className="crm-detail-grid">
            <div>
              <div className="crm-detail-label">Wartość deala</div>
              <div className="crm-detail-val" style={{ color: '#059669', fontWeight: 800 }}>{formatPLN(deal.value)}</div>
            </div>
            <div>
              <div className="crm-detail-label">Prawdopodobieństwo</div>
              <div className="crm-detail-val">{deal.prob}%</div>
            </div>
            <div>
              <div className="crm-detail-label">Oczekiwany przychód</div>
              <div className="crm-detail-val">{formatPLN(Math.round(deal.value * deal.prob / 100))}</div>
            </div>
            <div>
              <div className="crm-detail-label">Opiekun</div>
              <div className="crm-detail-val">{deal.owner}</div>
            </div>
          </div>

          {/* Probability bar */}
          <div style={{ marginBottom: '2vh' }}>
            <div className="crm-detail-label" style={{ marginBottom: '.6vh' }}>Szansa zamknięcia</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              <div style={{ flex: 1, height: 'clamp(10px,.7vw,14px)', background: '#f3f4f6', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ width: `${deal.prob}%`, height: '100%', borderRadius: 100, background: `linear-gradient(90deg, ${stageColor}, ${stageColor}aa)`, transition: 'width .6s cubic-bezier(.16,1,.3,1)' }} />
              </div>
              <div style={{ fontSize: 'clamp(16px,1.1vw,22px)', fontWeight: 800, color: stageColor }}>{deal.prob}%</div>
            </div>
          </div>

          <div style={{ marginTop: '2.5vh' }}>
            <div className="crm-section-title">Historia deala</div>
            <div className="crm-timeline">
              {timeline.map((t, i) => (
                <div className="crm-timeline-item" key={i}>
                  <div className={`crm-timeline-dot ${t.status}`} />
                  <div className="crm-timeline-date">{t.date}</div>
                  <div className="crm-timeline-text">{t.text}</div>
                  {t.note && <div className="crm-timeline-note">{t.note}</div>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2vh', display: 'flex', gap: '.8vw' }}>
            <button className="crm-btn pri" style={{ flex: 1, justifyContent: 'center' }}>
              <Icon name="check-circle" size={18} strokeWidth={2} /> Zamknij deal
            </button>
            <button className="crm-btn sec" style={{ flex: 1, justifyContent: 'center' }}>
              <Icon name="calendar" size={18} strokeWidth={2} /> Zaplanuj spotkanie
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Notification Dropdown ───
function NotificationBell() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button className="crm-notif-btn" onClick={() => setOpen(!open)}>
        <Icon name="bell" size={22} strokeWidth={2} />
        <div className="crm-notif-dot" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="crm-notif-dropdown"
            initial={{ opacity: 0, y: -8, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .95 }}
            transition={{ duration: .2 }}>
            <div className="crm-notif-hdr">Powiadomienia</div>
            {notifications.map((n, i) => (
              <div className="crm-notif-item" key={i} onClick={() => setOpen(false)}>
                <div style={{ width: 'clamp(32px,2.4vw,42px)', height: 'clamp(32px,2.4vw,42px)', borderRadius: 10, background: `${n.color}12`, color: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={n.icon} size={16} strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'clamp(11px,.7vw,14px)', color: '#374151', fontWeight: 500, lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 'clamp(9px,.55vw,11px)', color: '#d1d5db', marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dashboard View ───
function Dashboard({ go }: { go: (v: View) => void }) {
  const totalDeals = Object.values(deals).flat().length;
  const pipelineValue = Object.values(deals).flat().reduce((s, d) => s + d.value, 0);
  const wonValue = deals.won.reduce((s, d) => s + d.value, 0);
  const conversionRate = Math.round((deals.won.length / totalDeals) * 100);

  const c1 = useAnimatedCounter(totalDeals);
  const c2 = useAnimatedCounter(Math.round(pipelineValue / 1000));
  const c3 = useAnimatedCounter(Math.round(wonValue / 1000));
  const c4 = useAnimatedCounter(conversionRate);

  return (
    <>
      <div className="crm-hdr">
        <div>
          <div className="crm-title">Pulpit CRM</div>
          <div className="crm-subtitle">Marzec 2026 &bull; Ostatnia aktualizacja: dziś, 15:12</div>
        </div>
        <div style={{ display: 'flex', gap: '.6vw', alignItems: 'center' }}>
          <NotificationBell />
          <button className="crm-btn sec" onClick={() => go('reports')}>
            <Icon name="bar-chart" size={17} strokeWidth={2} /> Raporty
          </button>
          <button className="crm-btn pri" onClick={() => go('contacts')}>
            <Icon name="user-plus" size={17} strokeWidth={2} /> Nowy kontakt
          </button>
        </div>
      </div>

      <div className="crm-stats">
        {[
          { label: 'Aktywne deale', val: c1, change: '+3 w tym mies.', dir: 'up', icon: 'target', bg: 'rgba(236,72,153,.08)', iconColor: '#ec4899', goTo: 'pipeline' as View },
          { label: 'Wartość pipeline', val: `${c2}k`, change: '+48k vs luty', dir: 'up', icon: 'trending-up', bg: 'rgba(139,92,246,.08)', iconColor: '#8b5cf6', goTo: 'pipeline' as View },
          { label: 'Wygrane (marzec)', val: `${c3}k`, change: '1 deal zamknięty', dir: 'up', icon: 'check-circle', bg: 'rgba(16,185,129,.08)', iconColor: '#059669', goTo: 'reports' as View },
          { label: 'Konwersja', val: `${c4}%`, change: '+4pp vs Q3', dir: 'up', icon: 'pie-chart', bg: 'rgba(59,130,246,.08)', iconColor: '#3b82f6', goTo: 'reports' as View },
        ].map(s => (
          <motion.div className="crm-stat" key={s.label} onClick={() => go(s.goTo)}
            whileTap={{ scale: 0.97 }}>
            <div className="crm-stat-icon" style={{ background: s.bg, color: s.iconColor }}>
              <Icon name={s.icon} size={20} strokeWidth={2} />
            </div>
            <div className="crm-stat-label">{s.label}</div>
            <div className="crm-stat-val">{s.val}</div>
            <div className={`crm-stat-change ${s.dir}`}>{s.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="crm-quick-actions">
        {[
          { icon: 'target', label: 'Pipeline sprzedaży', color: '#ec4899', bg: 'rgba(236,72,153,.08)', view: 'pipeline' as View },
          { icon: 'users', label: 'Baza kontaktów', color: '#8b5cf6', bg: 'rgba(139,92,246,.08)', view: 'contacts' as View },
          { icon: 'clipboard', label: 'Moje zadania', color: '#3b82f6', bg: 'rgba(59,130,246,.08)', view: 'tasks' as View },
        ].map(a => (
          <motion.button className="crm-quick-action" key={a.label} onClick={() => go(a.view)} whileTap={{ scale: 0.97 }}>
            <div className="crm-quick-action-icon" style={{ background: a.bg, color: a.color }}>
              <Icon name={a.icon} size={20} strokeWidth={2} />
            </div>
            {a.label}
            <span style={{ marginLeft: 'auto', color: '#d1d5db' }}>
              <Icon name="chevron-right" size={16} strokeWidth={2} />
            </span>
          </motion.button>
        ))}
      </div>

      <div className="crm-grid-2">
        {/* Top deals */}
        <div className="crm-card">
          <div className="crm-card-hdr">
            <span className="crm-card-title">Najgorętsze deale</span>
            <button className="crm-btn ghost" onClick={() => go('pipeline')}>
              Wszystkie <Icon name="arrow-up-right" size={14} strokeWidth={2} />
            </button>
          </div>
          <div className="crm-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,.8vh,14px)' }}>
              {[...deals.negotiation, ...deals.proposal].slice(0, 4).map(d => (
                <motion.div key={d.id} whileTap={{ scale: 0.98 }} onClick={() => go('pipeline')}
                  style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,.8vw,14px)', cursor: 'pointer', padding: 'clamp(6px,.5vh,10px) 0', borderBottom: '1px solid #f5f0eb' }}>
                  <div style={{ width: 'clamp(10px,.6vw,14px)', height: 'clamp(10px,.6vw,14px)', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'clamp(13px,.82vw,16px)', fontWeight: 600, color: '#1a1225' }}>{d.name}</div>
                    <div style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#9ca3af', marginTop: 2 }}>{d.company}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 'clamp(13px,.82vw,16px)', fontWeight: 800, color: '#1a1225' }}>{formatPLN(d.value)}</div>
                    <div style={{ fontSize: 'clamp(9px,.55vw,12px)', color: d.prob >= 70 ? '#059669' : '#f59e0b', fontWeight: 700 }}>{d.prob}% szans</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="crm-card">
          <div className="crm-card-hdr">
            <span className="crm-card-title">Ostatnia aktywność</span>
          </div>
          <div className="crm-card-body">
            <div className="crm-feed">
              {activities.slice(0, 6).map((a, i) => (
                <div className="crm-feed-item" key={i}>
                  <div className="crm-feed-dot" style={{ background: a.color }} />
                  <div className="crm-feed-text" dangerouslySetInnerHTML={{ __html: a.text }} />
                  <div className="crm-feed-time">{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming tasks */}
      <div className="crm-card">
        <div className="crm-card-hdr">
          <span className="crm-card-title">Nadchodzące zadania</span>
          <button className="crm-btn ghost" onClick={() => go('tasks')}>
            Wszystkie <Icon name="arrow-up-right" size={14} strokeWidth={2} />
          </button>
        </div>
        <div className="crm-card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,.4vh,8px)' }}>
            {tasks.filter(t => !t.done).slice(0, 3).map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,.8vw,14px)', padding: 'clamp(8px,.7vh,12px) 0', borderBottom: '1px solid #f5f0eb' }}>
                <div style={{ width: 'clamp(8px,.5vw,12px)', height: 'clamp(8px,.5vw,12px)', borderRadius: '50%', background: t.priority === 'high' ? '#ef4444' : t.priority === 'medium' ? '#f59e0b' : '#3b82f6', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'clamp(12px,.78vw,15px)', fontWeight: 600, color: '#1a1225' }}>{t.text}</div>
                  <div style={{ fontSize: 'clamp(10px,.6vw,12px)', color: '#9ca3af', marginTop: 2 }}>{t.contact} &bull; {t.due}</div>
                </div>
                <span className={`crm-badge ${t.priority === 'high' ? 'hot' : t.priority === 'medium' ? 'warm' : 'cold'}`}>
                  {t.priority === 'high' ? 'Pilne' : t.priority === 'medium' ? 'Średnie' : 'Niskie'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Contacts View ───
function Contacts() {
  const [filter, setFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all');
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = contacts.filter(c => filter === 'all' || c.status === filter);
  const detail = selected !== null ? contacts.find(c => c.id === selected) : null;

  return (
    <>
      <div className="crm-hdr">
        <div>
          <div className="crm-title">{detail ? detail.name : 'Kontakty'}</div>
          <div className="crm-subtitle">{detail ? `${detail.company} — ${detail.role}` : `${contacts.length} kontaktów w bazie`}</div>
        </div>
        <div style={{ display: 'flex', gap: '.6vw', alignItems: 'center' }}>
          {detail ? (
            <button className="crm-btn sec" onClick={() => setSelected(null)}>
              <Icon name="arrow-left" size={17} strokeWidth={2} /> Wróć do listy
            </button>
          ) : (
            <div className="crm-filters">
              {([['all', 'Wszystkie'], ['hot', 'Gorące'], ['warm', 'Ciepłe'], ['cold', 'Zimne']] as const).map(([v, l]) => (
                <button key={v} className={`crm-filter ${filter === v ? 'on' : ''}`} onClick={() => setFilter(v)}>{l}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {detail ? (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: .2 }}>
            <div className="crm-contact-detail">
              <div className="crm-contact-detail-header">
                <div className="crm-contact-avatar" style={{ background: detail.color, width: 'clamp(52px,3.5vw,64px)', height: 'clamp(52px,3.5vw,64px)', fontSize: 'clamp(18px,1.3vw,24px)' }}>
                  {detail.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(18px,1.3vw,26px)', fontWeight: 800, color: '#1a1225' }}>{detail.name}</div>
                  <div style={{ fontSize: 'clamp(11px,.7vw,14px)', color: '#9ca3af', marginTop: 2 }}>{detail.role} &bull; {detail.company} &bull; <span className={`crm-badge ${detail.status}`}>{detail.status === 'hot' ? 'Gorący' : detail.status === 'warm' ? 'Ciepły' : 'Zimny'}</span></div>
                </div>
              </div>

              <div className="crm-detail-grid">
                <div>
                  <div className="crm-detail-label">Email</div>
                  <div className="crm-detail-val">{detail.email}</div>
                </div>
                <div>
                  <div className="crm-detail-label">Telefon</div>
                  <div className="crm-detail-val">{detail.phone}</div>
                </div>
                <div>
                  <div className="crm-detail-label">Aktywne deale</div>
                  <div className="crm-detail-val">{detail.deals}</div>
                </div>
                <div>
                  <div className="crm-detail-label">Łączna wartość</div>
                  <div className="crm-detail-val" style={{ color: '#059669', fontWeight: 800 }}>{formatPLN(detail.totalValue)}</div>
                </div>
              </div>

              <div className="crm-detail-label" style={{ marginBottom: '.6vh' }}>Tagi</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(5px,.4vw,8px)', marginBottom: '2vh' }}>
                {detail.tags.map(tag => (
                  <span key={tag} style={{ padding: 'clamp(5px,.4vh,8px) clamp(10px,.8vw,16px)', borderRadius: 10, background: `${detail.color}10`, fontSize: 'clamp(10px,.62vw,13px)', fontWeight: 600, color: detail.color }}>{tag}</span>
                ))}
              </div>

              <div className="crm-detail-label" style={{ marginBottom: '.6vh' }}>Ostatni kontakt</div>
              <div style={{ fontSize: 'clamp(13px,.85vw,17px)', color: '#374151', marginBottom: '2vh' }}>{detail.lastContact}</div>

              {/* Deals for this contact */}
              <div className="crm-section-title">Deale kontaktu</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,.5vh,10px)' }}>
                {Object.values(deals).flat().filter(d => d.company.includes(detail.company.split(' ')[0])).map(d => (
                  <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,1vw,16px)', padding: 'clamp(10px,1vh,16px) clamp(12px,1vw,18px)', background: '#faf8f6', borderRadius: 12, border: '1px solid #f0ebe6' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'clamp(13px,.82vw,16px)', fontWeight: 600, color: '#1a1225' }}>{d.name}</div>
                      <div style={{ fontSize: 'clamp(10px,.6vw,12px)', color: '#9ca3af', marginTop: 2 }}>{d.prob}% szans</div>
                    </div>
                    <div style={{ fontSize: 'clamp(14px,.9vw,18px)', fontWeight: 800, color: '#059669' }}>{formatPLN(d.value)}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2vh', display: 'flex', gap: '.8vw' }}>
                <button className="crm-btn pri" style={{ flex: 1, justifyContent: 'center' }}>
                  <Icon name="send" size={18} strokeWidth={2} /> Wyślij email
                </button>
                <button className="crm-btn sec" style={{ flex: 1, justifyContent: 'center' }}>
                  <Icon name="calendar" size={18} strokeWidth={2} /> Zaplanuj spotkanie
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: .2 }}>
            <div className="crm-contact-list">
              {filtered.map(c => (
                <motion.div className="crm-contact" key={c.id} whileTap={{ scale: 0.985 }} onClick={() => setSelected(c.id)}>
                  <div className="crm-contact-avatar" style={{ background: c.color }}>
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="crm-contact-info">
                    <div className="crm-contact-name">{c.name}</div>
                    <div className="crm-contact-meta">
                      <span>{c.company}</span>
                      <span>&bull;</span>
                      <span>{c.role}</span>
                      <span>&bull;</span>
                      <span>{c.lastContact}</span>
                    </div>
                  </div>
                  <div className="crm-contact-tags">
                    {c.tags.map(tag => (
                      <span className="crm-contact-tag" key={tag} style={{ background: `${c.color}10`, color: c.color }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 'clamp(70px,7vw,120px)' }}>
                    <div style={{ fontSize: 'clamp(14px,.9vw,18px)', fontWeight: 800, color: '#1a1225' }}>{formatPLN(c.totalValue)}</div>
                    <div style={{ fontSize: 'clamp(10px,.6vw,12px)', color: '#9ca3af', marginTop: 2 }}>{c.deals} deali</div>
                  </div>
                  <span className={`crm-badge ${c.status}`}>
                    {c.status === 'hot' ? 'Gorący' : c.status === 'warm' ? 'Ciepły' : 'Zimny'}
                  </span>
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

// ─── Pipeline View (Kanban) ───
function Pipeline() {
  const [selected, setSelected] = useState<{ deal: DealData; color: string } | null>(null);
  const stages = [
    { key: 'lead' as const, label: 'Nowe leady', color: '#9ca3af' },
    { key: 'qualified' as const, label: 'Kwalifikacja', color: '#8b5cf6' },
    { key: 'proposal' as const, label: 'Propozycja', color: '#ec4899' },
    { key: 'negotiation' as const, label: 'Negocjacje', color: '#f59e0b' },
    { key: 'won' as const, label: 'Wygrane', color: '#10b981' },
  ];

  return (
    <>
      <div className="crm-hdr">
        <div>
          <div className="crm-title">Pipeline sprzedaży</div>
          <div className="crm-subtitle">Dotknij deala, aby zobaczyć szczegóły</div>
        </div>
        <button className="crm-btn pri">
          <Icon name="target" size={17} strokeWidth={2} /> Nowy deal
        </button>
      </div>

      {/* Summary strip */}
      <div style={{ display: 'flex', gap: 'clamp(6px,.5vw,10px)', marginBottom: '2vh', flexWrap: 'wrap' }}>
        {stages.map(stage => {
          const stageDeals = deals[stage.key];
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage.key} style={{ display: 'flex', alignItems: 'center', gap: '.4vw', padding: 'clamp(6px,.5vh,10px) clamp(10px,.8vw,16px)', background: `${stage.color}08`, borderRadius: 10, border: `1px solid ${stage.color}20` }}>
              <div style={{ width: 'clamp(8px,.5vw,10px)', height: 'clamp(8px,.5vw,10px)', borderRadius: '50%', background: stage.color }} />
              <span style={{ fontSize: 'clamp(11px,.7vw,14px)', fontWeight: 600, color: '#374151' }}>{stage.label}</span>
              <span style={{ fontSize: 'clamp(11px,.7vw,14px)', fontWeight: 800, color: stage.color }}>{formatPLN(stageValue)}</span>
            </div>
          );
        })}
      </div>

      <div className="crm-pipeline">
        {stages.map(stage => {
          const stageDeals = deals[stage.key];
          return (
            <div className="crm-pipe-col" key={stage.key}>
              <div className="crm-pipe-hdr" style={{ borderBottom: `3px solid ${stage.color}` }}>
                <span className="crm-pipe-hdr-title">{stage.label}</span>
                <span className="crm-pipe-count">{stageDeals.length}</span>
              </div>
              <div className="crm-pipe-body">
                {stageDeals.map(d => (
                  <motion.div className="crm-pipe-card" key={d.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelected({ deal: d, color: stage.color })}>
                    <div className="crm-pipe-card-name">{d.name.split(' — ')[0]}</div>
                    <div className="crm-pipe-card-company">{d.company}</div>
                    <div className="crm-pipe-card-val">{formatPLN(d.value)}</div>
                    <div className="crm-pipe-card-foot">
                      <span className="crm-pipe-card-date">{d.date}</span>
                      <span className="crm-pipe-card-prob" style={{
                        background: d.prob >= 70 ? 'rgba(16,185,129,.1)' : d.prob >= 40 ? 'rgba(245,158,11,.1)' : 'rgba(107,114,128,.1)',
                        color: d.prob >= 70 ? '#059669' : d.prob >= 40 ? '#d97706' : '#6b7280',
                      }}>{d.prob}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline total */}
      <div className="crm-card">
        <div className="crm-card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 'clamp(11px,.7vw,14px)', color: '#9ca3af', fontWeight: 600 }}>Łączna wartość pipeline</div>
            <div style={{ fontSize: 'clamp(24px,1.8vw,38px)', fontWeight: 800, color: '#1a1225', letterSpacing: '-.03em' }}>
              {formatPLN(Object.values(deals).flat().reduce((s, d) => s + d.value, 0))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(14px,1.4vw,24px)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(20px,1.5vw,32px)', fontWeight: 800, color: '#ec4899' }}>{Object.values(deals).flat().length}</div>
              <div style={{ fontSize: 'clamp(9px,.55vw,12px)', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Deali</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(20px,1.5vw,32px)', fontWeight: 800, color: '#059669' }}>{formatPLN(Math.round(Object.values(deals).flat().reduce((s, d) => s + d.value * d.prob / 100, 0)))}</div>
              <div style={{ fontSize: 'clamp(9px,.55vw,12px)', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Ważona wartość</div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <DealModal deal={selected.deal} stageColor={selected.color} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Reports View ───
function Reports() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <>
      <div className="crm-hdr">
        <div>
          <div className="crm-title">Raporty i analityka</div>
          <div className="crm-subtitle">Podsumowanie wyników sprzedaży</div>
        </div>
        <button className="crm-btn sec">
          <Icon name="download" size={17} strokeWidth={2} /> Eksport PDF
        </button>
      </div>

      <div className="crm-stats" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[
          { label: 'Śr. wartość deala', val: '78 000 PLN', change: '+12k vs Q3', dir: 'up' },
          { label: 'Śr. czas zamknięcia', val: '34 dni', change: '-6 dni vs Q3', dir: 'up' },
          { label: 'Win rate', val: '24%', change: '+4pp vs Q3', dir: 'up' },
        ].map(s => (
          <div className="crm-stat" key={s.label}>
            <div className="crm-stat-label">{s.label}</div>
            <div className="crm-stat-val">{s.val}</div>
            <div className={`crm-stat-change ${s.dir}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="crm-grid-2">
        <div className="crm-card">
          <div className="crm-card-hdr">
            <span className="crm-card-title">Przychody miesięczne (tys. PLN)</span>
          </div>
          <div className="crm-card-body">
            <div className="crm-chart-bars">
              {monthlyRevenue.map((v, i) => (
                <div className="crm-chart-bar-wrap" key={i}
                  onPointerDown={() => setHoveredBar(i)} onPointerUp={() => setHoveredBar(null)} onPointerLeave={() => setHoveredBar(null)}>
                  <div className="crm-chart-bar-val" style={{ opacity: hoveredBar === i ? 1 : .6 }}>{v}k</div>
                  <div className="crm-chart-bar"
                    style={{
                      height: `${(v / maxRevenue) * 100}%`,
                      background: hoveredBar === i ? '#be185d' : i === monthlyRevenue.length - 1 ? '#ec4899' : i === monthlyRevenue.length - 2 ? '#f472b6' : '#fce7f3',
                      transform: hoveredBar === i ? 'scaleX(1.15)' : 'scaleX(1)',
                    }} />
                  <div className="crm-chart-bar-label">{monthLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="crm-card">
          <div className="crm-card-hdr">
            <span className="crm-card-title">Źródła leadów</span>
          </div>
          <div className="crm-card-body">
            <div className="crm-donut-wrap">
              <svg viewBox="0 0 100 100" width="clamp(100px,7vw,140px)" height="clamp(100px,7vw,140px)">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="14" strokeDasharray="88 163" strokeDashoffset="0" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="14" strokeDasharray="63 188" strokeDashoffset="-88" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="14" strokeDasharray="50 201" strokeDashoffset="-151" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#fce7f3" strokeWidth="14" strokeDasharray="50 201" strokeDashoffset="-201" transform="rotate(-90 50 50)" strokeLinecap="round" />
                <text x="50" y="48" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1a1225">48</text>
                <text x="50" y="60" textAnchor="middle" fontSize="6" fontWeight="600" fill="#9ca3af">leadów</text>
              </svg>
              <div className="crm-donut-legend">
                {[
                  { color: '#ec4899', label: 'Polecenia', val: '35%' },
                  { color: '#8b5cf6', label: 'LinkedIn', val: '25%' },
                  { color: '#3b82f6', label: 'Strona www', val: '20%' },
                  { color: '#fce7f3', label: 'Cold outreach', val: '20%' },
                ].map(d => (
                  <div className="crm-donut-item" key={d.label}>
                    <div className="crm-donut-color" style={{ background: d.color }} />
                    <span className="crm-donut-label">{d.label}</span>
                    <span className="crm-donut-val">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales funnel */}
      <div className="crm-card">
        <div className="crm-card-hdr">
          <span className="crm-card-title">Lejek sprzedażowy</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.4vw' }}>
            <span style={{ fontSize: 'clamp(22px,1.6vw,34px)', fontWeight: 800, color: '#1a1225' }}>24%</span>
            <span style={{ fontSize: 'clamp(10px,.62vw,13px)', color: '#059669', fontWeight: 700 }}>Win rate</span>
          </div>
        </div>
        <div className="crm-card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,.8vh,14px)' }}>
            {[
              { label: 'Nowe leady', value: 100, count: 48, color: '#9ca3af' },
              { label: 'Kwalifikacja', value: 65, count: 31, color: '#8b5cf6' },
              { label: 'Propozycja', value: 42, count: 20, color: '#ec4899' },
              { label: 'Negocjacje', value: 30, count: 14, color: '#f59e0b' },
              { label: 'Wygrane', value: 24, count: 11, color: '#10b981' },
            ].map(s => (
              <div className="crm-meter" key={s.label}>
                <div style={{ width: 'clamp(100px,9vw,160px)', fontSize: 'clamp(11px,.7vw,14px)', color: '#6b7280', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '.4vw' }}>
                  <div style={{ width: 'clamp(8px,.5vw,10px)', height: 'clamp(8px,.5vw,10px)', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  {s.label}
                </div>
                <div className="crm-meter-bar">
                  <div className="crm-meter-fill" style={{ width: `${s.value}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}aa)` }} />
                </div>
                <div style={{ fontSize: 'clamp(13px,.85vw,17px)', fontWeight: 800, color: '#1a1225', minWidth: 'clamp(30px,2.5vw,50px)', textAlign: 'right' }}>{s.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Tasks View ───
function Tasks() {
  const [taskList, setTaskList] = useState(tasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const toggleTask = (id: number) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const filtered = taskList.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <>
      <div className="crm-hdr">
        <div>
          <div className="crm-title">Zadania</div>
          <div className="crm-subtitle">{taskList.filter(t => !t.done).length} do wykonania &bull; {taskList.filter(t => t.done).length} ukończonych</div>
        </div>
        <div style={{ display: 'flex', gap: '.6vw', alignItems: 'center' }}>
          <div className="crm-filters">
            {([['all', 'Wszystkie'], ['pending', 'Do zrobienia'], ['done', 'Ukończone']] as const).map(([v, l]) => (
              <button key={v} className={`crm-filter ${filter === v ? 'on' : ''}`} onClick={() => setFilter(v)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,.5vh,10px)' }}>
        {filtered.map(t => (
          <motion.div key={t.id} whileTap={{ scale: 0.985 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 'clamp(10px,1vw,18px)',
              padding: 'clamp(14px,1.4vh,20px) clamp(14px,1.4vw,22px)',
              background: '#fff', borderRadius: 14,
              border: '1px solid #f0ebe6', boxShadow: '0 1px 4px rgba(0,0,0,.04)',
              cursor: 'pointer', transition: 'all .15s',
              opacity: t.done ? 0.6 : 1,
            }}
            onClick={() => toggleTask(t.id)}>
            <div style={{
              width: 'clamp(28px,2vw,36px)', height: 'clamp(28px,2vw,36px)',
              borderRadius: 10, border: `2px solid ${t.done ? '#10b981' : t.priority === 'high' ? '#ef4444' : t.priority === 'medium' ? '#f59e0b' : '#3b82f6'}`,
              background: t.done ? 'rgba(16,185,129,.1)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all .2s',
            }}>
              {t.done && <Icon name="check" size={16} strokeWidth={3} style={{ color: '#10b981' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'clamp(14px,.9vw,18px)', fontWeight: 600, color: '#1a1225', textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</div>
              <div style={{ fontSize: 'clamp(11px,.65vw,14px)', color: '#9ca3af', marginTop: 3 }}>
                <span>{t.contact}</span>
                <span> &bull; </span>
                <span>{t.due}</span>
              </div>
            </div>
            <span className={`crm-badge ${t.priority === 'high' ? 'hot' : t.priority === 'medium' ? 'warm' : 'cold'}`}>
              {t.priority === 'high' ? 'Pilne' : t.priority === 'medium' ? 'Średnie' : 'Niskie'}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Summary card */}
      <div className="crm-card" style={{ marginTop: '2.2vh' }}>
        <div className="crm-card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: 'clamp(16px,1.6vh,24px)' }}>
          {[
            { label: 'Pilne', val: taskList.filter(t => t.priority === 'high' && !t.done).length, color: '#ef4444' },
            { label: 'Średnie', val: taskList.filter(t => t.priority === 'medium' && !t.done).length, color: '#f59e0b' },
            { label: 'Niskie', val: taskList.filter(t => t.priority === 'low' && !t.done).length, color: '#3b82f6' },
            { label: 'Ukończone', val: taskList.filter(t => t.done).length, color: '#10b981' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(24px,1.8vw,38px)', fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 'clamp(10px,.6vw,13px)', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════

export function CrmDemo() {
  const [view, setView] = useState<View>('dashboard');

  return (
    <div className="crm">
      <div className="crm-side">
        <div className="crm-side-brand">
          <div className="crm-side-logo">W</div>
          <div>
            <div className="crm-side-name">WiseCRM</div>
            <div className="crm-side-sub">Dedykowany CRM</div>
          </div>
        </div>

        <div className="crm-side-section">Nawigacja</div>
        {navItems.map(item => (
          <button key={item.view} className={`crm-nav${view === item.view ? ' on' : ''}`}
            onClick={() => setView(item.view)}>
            <Icon name={item.icon} size={20} strokeWidth={2} />
            {item.label}
            {item.badge && <span className="crm-nav-badge">{item.badge}</span>}
          </button>
        ))}

        <div className="crm-side-section">Ustawienia</div>
        <button className="crm-nav">
          <Icon name="settings" size={20} strokeWidth={2} /> Konfiguracja
        </button>
        <button className="crm-nav">
          <Icon name="mail" size={20} strokeWidth={2} /> Integracje
        </button>

        <div className="crm-side-user">
          <div className="crm-side-avatar">AK</div>
          <div>
            <div className="crm-side-uname">Aleksandra Kamińska</div>
            <div className="crm-side-urole">Sales Director — WiseCRM</div>
          </div>
        </div>
      </div>

      <div className="crm-main">
        <AnimatePresence mode="wait">
          <motion.div key={view}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            {view === 'dashboard' && <Dashboard go={setView} />}
            {view === 'contacts' && <Contacts />}
            {view === 'pipeline' && <Pipeline />}
            {view === 'reports' && <Reports />}
            {view === 'tasks' && <Tasks />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
