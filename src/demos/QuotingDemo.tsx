import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/Icon';
import './demo.css';
import './quoting.css';

// ═══════════════════════════════════════════════════
// Data — Modern Quoting System (Swiss Style)
// Every button works. Every flow is complete.
// ═══════════════════════════════════════════════════

type QuoteStatus = 'draft' | 'sent' | 'negotiation' | 'accepted' | 'rejected' | 'expired';
interface QuoteItem { productId: number; qty: number; discount: number; }
interface Quote {
  id: string; clientId: number; value: number; items: QuoteItem[];
  status: QuoteStatus; validUntil: string; created: string;
  probability: number; note: string;
}
interface Client {
  id: number; name: string; contact: string; email: string; phone: string;
  company: string; nip: string;
}

const initialQuotes: Quote[] = [
  { id: 'Q-2026-0047', clientId: 1, value: 284000, items: [{ productId: 1, qty: 2, discount: 0 }, { productId: 2, qty: 1, discount: 5 }, { productId: 5, qty: 3, discount: 0 }, { productId: 7, qty: 6, discount: 10 }], status: 'sent', validUntil: '02.04.2026', created: '19.03.2026', probability: 75, note: 'Klient zainteresowany, czeka na akceptację budżetu' },
  { id: 'Q-2026-0046', clientId: 2, value: 156000, items: [{ productId: 1, qty: 1, discount: 0 }, { productId: 3, qty: 1, discount: 0 }, { productId: 6, qty: 2, discount: 0 }], status: 'draft', validUntil: '—', created: '18.03.2026', probability: 0, note: '' },
  { id: 'Q-2026-0045', clientId: 3, value: 412000, items: [{ productId: 1, qty: 3, discount: 5 }, { productId: 2, qty: 2, discount: 5 }, { productId: 4, qty: 4, discount: 0 }, { productId: 8, qty: 2, discount: 0 }], status: 'negotiation', validUntil: '28.03.2026', created: '14.03.2026', probability: 60, note: 'Negocjacje cenowe w toku, klient prosi o rabat 10%' },
  { id: 'Q-2026-0044', clientId: 4, value: 98000, items: [{ productId: 6, qty: 1, discount: 0 }, { productId: 5, qty: 2, discount: 0 }, { productId: 10, qty: 12, discount: 15 }], status: 'accepted', validUntil: '20.03.2026', created: '10.03.2026', probability: 100, note: 'Podpisane! Start projektu 01.04' },
  { id: 'Q-2026-0043', clientId: 5, value: 567000, items: [{ productId: 1, qty: 2, discount: 0 }, { productId: 2, qty: 2, discount: 0 }, { productId: 3, qty: 1, discount: 0 }, { productId: 4, qty: 3, discount: 0 }, { productId: 7, qty: 12, discount: 20 }], status: 'sent', validUntil: '25.03.2026', created: '08.03.2026', probability: 45, note: 'Oferta prezentowana na boardzie, decyzja w przyszłym tygodniu' },
  { id: 'Q-2026-0042', clientId: 6, value: 189000, items: [{ productId: 4, qty: 2, discount: 0 }, { productId: 5, qty: 4, discount: 0 }, { productId: 9, qty: 1, discount: 0 }], status: 'expired', validUntil: '15.03.2026', created: '01.03.2026', probability: 0, note: '' },
  { id: 'Q-2026-0041', clientId: 6, value: 340000, items: [{ productId: 1, qty: 1, discount: 10 }, { productId: 3, qty: 2, discount: 5 }, { productId: 7, qty: 12, discount: 15 }], status: 'accepted', validUntil: '18.03.2026', created: '25.02.2026', probability: 100, note: 'Realizacja w toku' },
  { id: 'Q-2026-0040', clientId: 3, value: 225000, items: [{ productId: 2, qty: 1, discount: 0 }, { productId: 9, qty: 2, discount: 0 }], status: 'rejected', validUntil: '12.03.2026', created: '20.02.2026', probability: 0, note: 'Klient wybrał konkurencję — za wysoka cena' },
];

const products = [
  { id: 1, name: 'Platforma webowa', desc: 'Dedykowana aplikacja SaaS', basePrice: 48000, unit: 'projekt', icon: 'monitor', category: 'Software' },
  { id: 2, name: 'Aplikacja mobilna', desc: 'iOS + Android (React Native)', basePrice: 62000, unit: 'projekt', icon: 'smartphone', category: 'Software' },
  { id: 3, name: 'System CRM', desc: 'Custom CRM z integracjami', basePrice: 38000, unit: 'licencja', icon: 'users', category: 'Software' },
  { id: 4, name: 'Automatyzacja procesów', desc: 'Workflow & business rules', basePrice: 24000, unit: 'moduł', icon: 'git-merge', category: 'Usługi' },
  { id: 5, name: 'Integracja API', desc: 'REST/GraphQL + webhooks', basePrice: 12000, unit: 'endpoint', icon: 'share-2', category: 'Usługi' },
  { id: 6, name: 'Dashboard analityczny', desc: 'KPI & real-time monitoring', basePrice: 18000, unit: 'dashboard', icon: 'bar-chart', category: 'Software' },
  { id: 7, name: 'Wsparcie techniczne', desc: 'SLA 4h / 24/7', basePrice: 4800, unit: 'miesiąc', icon: 'shield', category: 'Wsparcie' },
  { id: 8, name: 'Szkolenie zespołu', desc: 'Warsztaty + dokumentacja', basePrice: 8000, unit: 'sesja', icon: 'book-open', category: 'Usługi' },
  { id: 9, name: 'Audyt UX', desc: 'Analiza + rekomendacje', basePrice: 15000, unit: 'raport', icon: 'eye', category: 'Usługi' },
  { id: 10, name: 'Hosting & DevOps', desc: 'AWS/GCP, CI/CD, monitoring', basePrice: 3200, unit: 'miesiąc', icon: 'cloud', category: 'Infrastruktura' },
];

const templateDefs = [
  { id: 1, name: 'Startup MVP', desc: 'Platforma + mobile + CRM — idealne na start', items: [{ productId: 1, qty: 1 }, { productId: 2, qty: 1 }, { productId: 3, qty: 1 }], color: '#e11d48', uses: 24 },
  { id: 2, name: 'Enterprise Suite', desc: 'Full-stack z integracjami i wsparciem', items: [{ productId: 1, qty: 2 }, { productId: 2, qty: 1 }, { productId: 3, qty: 1 }, { productId: 4, qty: 2 }, { productId: 5, qty: 3 }, { productId: 7, qty: 12 }, { productId: 8, qty: 2 }, { productId: 10, qty: 12 }], color: '#0a0a0a', uses: 12 },
  { id: 3, name: 'E-commerce Pro', desc: 'Sklep + CRM + analityka sprzedaży', items: [{ productId: 1, qty: 1 }, { productId: 3, qty: 1 }, { productId: 5, qty: 2 }, { productId: 6, qty: 1 }, { productId: 10, qty: 6 }], color: '#e11d48', uses: 18 },
  { id: 4, name: 'Automatyzacja', desc: 'Workflow + integracje API', items: [{ productId: 4, qty: 3 }, { productId: 5, qty: 4 }, { productId: 10, qty: 6 }], color: '#0a0a0a', uses: 31 },
  { id: 5, name: 'Support Pack', desc: 'Wsparcie + szkolenia + hosting 12m', items: [{ productId: 7, qty: 12 }, { productId: 8, qty: 3 }, { productId: 10, qty: 12 }], color: '#e11d48', uses: 42 },
  { id: 6, name: 'Data & Analytics', desc: 'Dashboard + audyt UX + integracje', items: [{ productId: 6, qty: 2 }, { productId: 9, qty: 1 }, { productId: 5, qty: 2 }], color: '#0a0a0a', uses: 15 },
];

const clientsList: Client[] = [
  { id: 1, name: 'TechVentures Sp. z o.o.', contact: 'Marek Wiśniewski', email: 'marek@techventures.pl', phone: '+48 501 234 567', company: 'TechVentures Sp. z o.o.', nip: '521-38-12-456' },
  { id: 2, name: 'Nordic Solutions AB', contact: 'Erik Lindström', email: 'erik@nordic.se', phone: '+46 70 123 4567', company: 'Nordic Solutions AB', nip: 'SE556012-3456' },
  { id: 3, name: 'GreenEnergy SA', contact: 'Anna Zielińska', email: 'anna.z@greenenergy.pl', phone: '+48 502 345 678', company: 'GreenEnergy SA', nip: '113-27-89-012' },
  { id: 4, name: 'DataStream Inc.', contact: 'James Mitchell', email: 'j.mitchell@datastream.io', phone: '+1 415 555 0142', company: 'DataStream Inc.', nip: 'US-82-1234567' },
  { id: 5, name: 'MediCorp Polska', contact: 'Katarzyna Nowak', email: 'k.nowak@medicorp.pl', phone: '+48 503 456 789', company: 'MediCorp Polska Sp. z o.o.', nip: '782-21-45-678' },
  { id: 6, name: 'FinanceHub SA', contact: 'Piotr Jabłoński', email: 'pjablonski@financehub.pl', phone: '+48 504 567 890', company: 'FinanceHub SA', nip: '525-24-67-890' },
];

const monthlyRevenue = [120, 95, 180, 145, 210, 175, 240, 195, 280, 320, 290, 350];
const monthLabels = ['Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru', 'Sty', 'Lut', 'Mar'];
const statusLabels: Record<QuoteStatus, string> = {
  draft: 'Robocza', sent: 'Wysłana', negotiation: 'Negocjacje',
  accepted: 'Zamknięta', rejected: 'Odrzucona', expired: 'Wygasła',
};

// ═══════════════════════════════════════════════════
// Helpers
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
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

function fmt(n: number) { return n.toLocaleString('pl-PL') + ' PLN'; }
function fmtShort(n: number) { return n >= 1000 ? (n / 1000).toFixed(0) + 'k' : String(n); }
function getProduct(id: number) { return products.find(p => p.id === id)!; }
function getClient(id: number) { return clientsList.find(c => c.id === id)!; }
function calcItemPrice(item: QuoteItem) {
  const p = getProduct(item.productId);
  return Math.round(p.basePrice * item.qty * (1 - item.discount / 100));
}
function calcQuoteTotal(items: QuoteItem[]) { return items.reduce((s, i) => s + calcItemPrice(i), 0); }
function nextQuoteId(quotes: Quote[]) {
  const max = quotes.reduce((m, q) => { const n = parseInt(q.id.split('-')[2]); return n > m ? n : m; }, 0);
  return `Q-2026-${String(max + 1).padStart(4, '0')}`;
}

// ═══════════════════════════════════════════════════

type View = 'dashboard' | 'quotes' | 'builder' | 'templates' | 'analytics';

const navItems: { icon: string; label: string; view: View }[] = [
  { icon: 'home', label: 'Pulpit', view: 'dashboard' },
  { icon: 'file-text', label: 'Oferty', view: 'quotes' },
  { icon: 'layers', label: 'Konfigurator', view: 'builder' },
  { icon: 'grid', label: 'Szablony', view: 'templates' },
  { icon: 'bar-chart', label: 'Analityka', view: 'analytics' },
];

// ═══════════════════════════════════════════════════
// Toast notification system
// ═══════════════════════════════════════════════════

function Toast({ message, type, onDone }: { message: string; type: 'success' | 'info'; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div className={`qt-toast qt-toast-${type}`}
      initial={{ y: 60, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 60, opacity: 0, scale: 0.9 }} transition={{ type: 'spring', damping: 20 }}>
      <Icon name={type === 'success' ? 'check-circle' : 'bell'} size={18} strokeWidth={2.2} />
      {message}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// Send animation overlay
// ═══════════════════════════════════════════════════

function SendingOverlay({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'sending' | 'done'>('sending');
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('done'), 1600);
    const t2 = setTimeout(onDone, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <motion.div className="qt-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="qt-send-overlay"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}>
        <AnimatePresence mode="wait">
          {phase === 'sending' ? (
            <motion.div key="sending" className="qt-send-phase" exit={{ opacity: 0, scale: 0.8 }}>
              <div className="qt-send-spinner" />
              <div className="qt-send-text">Wysyłanie oferty...</div>
            </motion.div>
          ) : (
            <motion.div key="done" className="qt-send-phase"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}>
              <motion.div className="qt-send-check"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, delay: 0.1 }}>
                <Icon name="check" size={40} strokeWidth={3} />
              </motion.div>
              <div className="qt-send-text">Oferta wysłana!</div>
              <div className="qt-send-sub">Klient otrzyma powiadomienie email</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// Client picker modal
// ═══════════════════════════════════════════════════

function ClientPicker({ onSelect, onClose }: { onSelect: (id: number) => void; onClose: () => void }) {
  const [search, setSearch] = useState('');
  const filtered = clientsList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <motion.div className="qt-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="qt-modal qt-client-picker-modal" onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
        <div className="qt-modal-hdr">
          <div>
            <div className="qt-modal-client">Wybierz klienta</div>
            <div className="qt-modal-contact">Kliknij, aby przypisać do oferty</div>
          </div>
          <button className="qt-modal-close" onClick={onClose}>
            <Icon name="x" size={22} strokeWidth={2.2} />
          </button>
        </div>
        <div className="qt-modal-body">
          <div className="qt-search-box">
            <Icon name="search" size={16} strokeWidth={2} />
            <input type="text" className="qt-search-input" placeholder="Szukaj klienta..." value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="qt-client-picker-list">
            {filtered.map(c => (
              <motion.div className="qt-client-picker-item" key={c.id} whileTap={{ scale: 0.97 }}
                onClick={() => { onSelect(c.id); onClose(); }}>
                <div className="qt-client-avatar">{c.contact.split(' ').map(n => n[0]).join('')}</div>
                <div className="qt-client-info">
                  <div className="qt-client-name">{c.name}</div>
                  <div className="qt-client-contact">{c.contact} &middot; {c.email}</div>
                </div>
                <span className="qt-quote-arrow"><Icon name="chevron-right" size={16} strokeWidth={2.2} /></span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// Notification bell
// ═══════════════════════════════════════════════════

function NotificationBell({ quotes }: { quotes: Quote[] }) {
  const [open, setOpen] = useState(false);
  const recent = quotes.slice(0, 3);
  const notifications = [
    ...recent.filter(q => q.status === 'accepted').map(q => ({ icon: 'check-circle' as const, color: '#059669', text: `${getClient(q.clientId).name} — oferta zaakceptowana`, time: '2h' })),
    ...recent.filter(q => q.status === 'sent').map(q => ({ icon: 'send' as const, color: '#e11d48', text: `${q.id} wysłana do ${getClient(q.clientId).contact}`, time: '5h' })),
    { icon: 'clock' as const, color: '#f59e0b', text: 'Q-2026-0043 — termin ważności za 6 dni', time: '1d' },
    { icon: 'alert-triangle' as const, color: '#a3a3a3', text: 'Q-2026-0042 wygasła — rozważ ponowne wysłanie', time: '4d' },
  ].slice(0, 5);

  return (
    <div style={{ position: 'relative' }}>
      <button className="qt-notif-btn" onClick={() => setOpen(!open)}>
        <Icon name="bell" size={22} strokeWidth={2} />
        <div className="qt-notif-dot" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="qt-notif-dropdown"
            initial={{ opacity: 0, y: -8, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .95 }}
            transition={{ duration: .2 }}>
            <div className="qt-notif-hdr">Powiadomienia</div>
            {notifications.map((n, i) => (
              <div className="qt-notif-item" key={i} onClick={() => setOpen(false)}>
                <div className="qt-notif-icon" style={{ background: `${n.color}12`, color: n.color }}>
                  <Icon name={n.icon} size={15} strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="qt-notif-text">{n.text}</div>
                  <div className="qt-notif-time">{n.time}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// Quote Detail (inline, not modal — full page)
// ═══════════════════════════════════════════════════

function QuoteDetail({ quote, onBack, onStatusChange, onDuplicate, onSend }: {
  quote: Quote; onBack: () => void;
  onStatusChange: (id: string, s: QuoteStatus) => void;
  onDuplicate: (q: Quote) => void;
  onSend: (id: string) => void;
}) {
  const client = getClient(quote.clientId);
  const total = calcQuoteTotal(quote.items);
  const vat = Math.round(total * 0.23);

  const timeline = [
    { date: quote.created, text: 'Oferta utworzona', status: 'done' as const },
    ...(quote.status !== 'draft' ? [{ date: quote.created, text: 'Wysłana do klienta', status: 'done' as const }] : []),
    ...(quote.status === 'negotiation' ? [{ date: '14.03.2026', text: 'Negocjacje w toku', status: 'current' as const }] : []),
    ...(quote.status === 'accepted' ? [
      { date: '14.03.2026', text: 'Negocjacje zakończone', status: 'done' as const },
      { date: '16.03.2026', text: 'Oferta zaakceptowana', status: 'done' as const },
    ] : []),
    ...(quote.status === 'rejected' ? [{ date: '12.03.2026', text: 'Oferta odrzucona', status: 'done' as const }] : []),
    ...(['draft', 'sent'].includes(quote.status) ? [{ date: 'Oczekuje', text: 'Decyzja klienta', status: quote.status === 'sent' ? 'current' as const : 'pending' as const }] : []),
    ...(!['accepted', 'rejected', 'expired'].includes(quote.status) ? [{ date: 'Planowane', text: 'Podpisanie umowy', status: 'pending' as const }] : []),
  ];

  const nextStatuses: { label: string; status: QuoteStatus; color: string }[] = [];
  if (quote.status === 'draft') nextStatuses.push({ label: 'Wyślij do klienta', status: 'sent', color: '#e11d48' });
  if (quote.status === 'sent') nextStatuses.push({ label: 'Rozpocznij negocjacje', status: 'negotiation', color: '#f59e0b' });
  if (quote.status === 'sent' || quote.status === 'negotiation') {
    nextStatuses.push({ label: 'Oznacz jako zaakceptowaną', status: 'accepted', color: '#059669' });
    nextStatuses.push({ label: 'Oznacz jako odrzuconą', status: 'rejected', color: '#dc2626' });
  }
  if (quote.status === 'expired' || quote.status === 'rejected') nextStatuses.push({ label: 'Wznów jako roboczą', status: 'draft', color: '#737373' });

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: .2 }}>
      <div className="qt-hdr">
        <div>
          <div className="qt-detail-id">{quote.id}</div>
          <div className="qt-title">{client.name}</div>
          <div className="qt-subtitle">{client.contact} &middot; {client.email}</div>
        </div>
        <div className="qt-hdr-actions">
          <button className="qt-btn sec" onClick={onBack}>
            <Icon name="arrow-left" size={17} strokeWidth={2.2} /> Lista ofert
          </button>
        </div>
      </div>

      {/* Status + value strip */}
      <div className="qt-detail-strip">
        <div className="qt-detail-strip-item">
          <div className="qt-detail-strip-label">Status</div>
          <span className={`qt-badge ${quote.status}`}>{statusLabels[quote.status]}</span>
        </div>
        <div className="qt-detail-strip-divider" />
        <div className="qt-detail-strip-item">
          <div className="qt-detail-strip-label">Wartość netto</div>
          <div className="qt-detail-strip-val">{fmt(total)}</div>
        </div>
        <div className="qt-detail-strip-divider" />
        <div className="qt-detail-strip-item">
          <div className="qt-detail-strip-label">Brutto</div>
          <div className="qt-detail-strip-val">{fmt(total + vat)}</div>
        </div>
        <div className="qt-detail-strip-divider" />
        <div className="qt-detail-strip-item">
          <div className="qt-detail-strip-label">Pozycji</div>
          <div className="qt-detail-strip-val">{quote.items.length}</div>
        </div>
        <div className="qt-detail-strip-divider" />
        <div className="qt-detail-strip-item">
          <div className="qt-detail-strip-label">Ważna do</div>
          <div className="qt-detail-strip-val">{quote.validUntil}</div>
        </div>
        {quote.probability > 0 && quote.probability < 100 && (
          <>
            <div className="qt-detail-strip-divider" />
            <div className="qt-detail-strip-item">
              <div className="qt-detail-strip-label">Szansa</div>
              <div className="qt-detail-strip-val">{quote.probability}%</div>
            </div>
          </>
        )}
      </div>

      {/* Status actions */}
      {nextStatuses.length > 0 && (
        <div className="qt-detail-status-actions">
          {nextStatuses.map(ns => (
            <motion.button key={ns.status}
              className={ns.status === 'sent' ? 'qt-btn pri' : 'qt-btn sec'}
              whileTap={{ scale: 0.96 }}
              onClick={() => ns.status === 'sent' ? onSend(quote.id) : onStatusChange(quote.id, ns.status)}
              style={ns.status !== 'sent' ? { borderColor: ns.color + '40', color: ns.color } : {}}>
              {ns.label}
            </motion.button>
          ))}
          <motion.button className="qt-btn sec" whileTap={{ scale: 0.96 }} onClick={() => onDuplicate(quote)}>
            <Icon name="clipboard" size={16} strokeWidth={2.2} /> Duplikuj do konfiguratora
          </motion.button>
        </div>
      )}

      {/* Note */}
      {quote.note && (
        <div className="qt-detail-note">
          <Icon name="file-text" size={15} strokeWidth={2} />
          {quote.note}
        </div>
      )}

      <div className="qt-grid-2">
        {/* Line items */}
        <div className="qt-card">
          <div className="qt-card-hdr">
            <span className="qt-card-title">Pozycje oferty</span>
            <span className="qt-card-count">{quote.items.length}</span>
          </div>
          <div className="qt-card-body">
            <div className="qt-line-items">
              <div className="qt-line-items-header">
                <span className="qt-li-h-name">Produkt</span>
                <span className="qt-li-h-qty">Ilość</span>
                <span className="qt-li-h-price">Cena jedn.</span>
                <span className="qt-li-h-disc">Rabat</span>
                <span className="qt-li-h-total">Razem</span>
              </div>
              {quote.items.map((item, i) => {
                const p = getProduct(item.productId);
                return (
                  <motion.div className="qt-line-item" key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}>
                    <div className="qt-li-name">
                      <div className="qt-li-icon"><Icon name={p.icon} size={15} strokeWidth={2} /></div>
                      <div>
                        <div className="qt-li-product-name">{p.name}</div>
                        <div className="qt-li-product-cat">{p.category}</div>
                      </div>
                    </div>
                    <div className="qt-li-qty">{item.qty} {p.unit}</div>
                    <div className="qt-li-price">{fmt(p.basePrice)}</div>
                    <div className="qt-li-disc">{item.discount > 0 ? `−${item.discount}%` : '—'}</div>
                    <div className="qt-li-total">{fmt(calcItemPrice(item))}</div>
                  </motion.div>
                );
              })}
              <div className="qt-line-items-footer">
                <span>Netto</span><span>{fmt(total)}</span>
              </div>
              <div className="qt-line-items-footer qt-li-vat">
                <span>VAT 23%</span><span>{fmt(vat)}</span>
              </div>
              <div className="qt-line-items-footer qt-li-gross">
                <span>Brutto</span><span>{fmt(total + vat)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline + client info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.2vw,20px)' }}>
          <div className="qt-card">
            <div className="qt-card-hdr">
              <span className="qt-card-title">Historia</span>
            </div>
            <div className="qt-card-body">
              <div className="qt-timeline">
                {timeline.map((t, i) => (
                  <div className="qt-timeline-item" key={i}>
                    <div className={`qt-timeline-dot ${t.status}`} />
                    <div className="qt-timeline-date">{t.date}</div>
                    <div className="qt-timeline-text">{t.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="qt-card">
            <div className="qt-card-hdr">
              <span className="qt-card-title">Dane klienta</span>
            </div>
            <div className="qt-card-body">
              <div className="qt-client-detail-grid">
                <div><div className="qt-cd-label">Firma</div><div className="qt-cd-val">{client.company}</div></div>
                <div><div className="qt-cd-label">NIP</div><div className="qt-cd-val">{client.nip}</div></div>
                <div><div className="qt-cd-label">Kontakt</div><div className="qt-cd-val">{client.contact}</div></div>
                <div><div className="qt-cd-label">Email</div><div className="qt-cd-val">{client.email}</div></div>
                <div><div className="qt-cd-label">Telefon</div><div className="qt-cd-val">{client.phone}</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// Dashboard
// ═══════════════════════════════════════════════════

function Dashboard({ quotes, go }: { quotes: Quote[]; go: (v: View) => void }) {
  const total = quotes.reduce((s, q) => s + calcQuoteTotal(q.items), 0);
  const active = quotes.filter(q => q.status === 'sent' || q.status === 'negotiation').length;
  const accepted = quotes.filter(q => q.status === 'accepted');
  const acceptedVal = accepted.reduce((s, q) => s + calcQuoteTotal(q.items), 0);
  const convRate = quotes.length > 0 ? Math.round((accepted.length / quotes.filter(q => q.status !== 'draft').length) * 100) : 0;

  const c1 = useAnimatedCounter(quotes.length);
  const c2 = useAnimatedCounter(active);
  const c3 = useAnimatedCounter(convRate);

  const funnelStages = [
    { label: 'Robocze', count: quotes.filter(q => q.status === 'draft').length, color: '#d4d4d4', pct: 100 },
    { label: 'Wysłane', count: quotes.filter(q => q.status === 'sent').length, color: '#e11d48', pct: 80 },
    { label: 'Negocjacje', count: quotes.filter(q => q.status === 'negotiation').length, color: '#f59e0b', pct: 55 },
    { label: 'Zamknięte', count: accepted.length, color: '#059669', pct: 35 },
  ];

  const activity = [
    { color: '#059669', text: `<b>${getClient(4).name}</b> zaakceptowała ofertę Q-2026-0044`, time: '2h temu' },
    { color: '#e11d48', text: `Oferta <b>Q-2026-0047</b> wysłana do ${getClient(1).contact}`, time: '5h temu' },
    { color: '#f59e0b', text: `<b>${getClient(3).name}</b> — negocjacje cenowe`, time: 'Wczoraj' },
    { color: '#0a0a0a', text: `Nowa oferta <b>Q-2026-0046</b> utworzona (draft)`, time: 'Wczoraj' },
    { color: '#a3a3a3', text: `Oferta <b>Q-2026-0042</b> wygasła`, time: '4 dni temu' },
    { color: '#059669', text: `<b>${getClient(6).name}</b> — umowa podpisana (Q-2026-0041)`, time: '5 dni temu' },
  ];

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">System Ofertowania</div>
          <div className="qt-subtitle">Marzec 2026 — Przegląd</div>
        </div>
        <div className="qt-hdr-actions">
          <NotificationBell quotes={quotes} />
          <button className="qt-btn pri" onClick={() => go('builder')}>
            <Icon name="layers" size={17} strokeWidth={2.2} /> Nowa oferta
          </button>
        </div>
      </div>

      <div className="qt-kpi-strip">
        <motion.div className="qt-kpi" whileTap={{ scale: 0.97 }} onClick={() => go('quotes')}>
          <div className="qt-kpi-number">{c1}</div>
          <div className="qt-kpi-label">Wszystkie oferty</div>
          <div className="qt-kpi-sub">+{quotes.filter(q => q.created >= '15.03.2026').length} w tym tyg.</div>
        </motion.div>
        <div className="qt-kpi-divider" />
        <motion.div className="qt-kpi" whileTap={{ scale: 0.97 }} onClick={() => go('quotes')}>
          <div className="qt-kpi-number">{c2}</div>
          <div className="qt-kpi-label">W toku</div>
          <div className="qt-kpi-sub">wysłane + negocjacje</div>
        </motion.div>
        <div className="qt-kpi-divider" />
        <motion.div className="qt-kpi" whileTap={{ scale: 0.97 }} onClick={() => go('analytics')}>
          <div className="qt-kpi-number">{c3}<span className="qt-kpi-unit">%</span></div>
          <div className="qt-kpi-label">Konwersja</div>
          <div className="qt-kpi-sub">+8pp vs Q3</div>
        </motion.div>
        <div className="qt-kpi-divider" />
        <motion.div className="qt-kpi" whileTap={{ scale: 0.97 }} onClick={() => go('analytics')}>
          <div className="qt-kpi-number">{fmtShort(acceptedVal)}<span className="qt-kpi-unit">PLN</span></div>
          <div className="qt-kpi-label">Zamknięte</div>
          <div className="qt-kpi-sub">z {fmtShort(total)} łącznie</div>
        </motion.div>
      </div>

      <div className="qt-grid-2">
        <div className="qt-card">
          <div className="qt-card-hdr"><span className="qt-card-title">Lejek konwersji</span></div>
          <div className="qt-card-body">
            <div className="qt-funnel">
              {funnelStages.map((stage, i) => (
                <div className="qt-funnel-stage" key={i}>
                  <div className="qt-funnel-bar-wrap">
                    <motion.div className="qt-funnel-bar"
                      initial={{ width: 0 }} animate={{ width: `${stage.pct}%` }}
                      transition={{ duration: 0.6, delay: i * 0.1, ease: [.16, 1, .3, 1] }}
                      style={{ background: stage.color }} />
                  </div>
                  <div className="qt-funnel-info">
                    <div className="qt-funnel-label">{stage.label}</div>
                    <div className="qt-funnel-count">{stage.count} ofert</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="qt-card">
          <div className="qt-card-hdr">
            <span className="qt-card-title">Ostatnia aktywność</span>
          </div>
          <div className="qt-card-body">
            <div className="qt-activity-feed">
              {activity.map((a, i) => (
                <motion.div className="qt-activity-item" key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}>
                  <div className="qt-activity-dot" style={{ background: a.color }} />
                  <div className="qt-activity-text" dangerouslySetInnerHTML={{ __html: a.text }} />
                  <div className="qt-activity-time">{a.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="qt-quick-actions">
        {[
          { icon: 'layers', label: 'Nowa oferta', desc: 'Konfigurator produktów', view: 'builder' as View },
          { icon: 'grid', label: 'Z szablonu', desc: `${templateDefs.length} gotowych zestawów`, view: 'templates' as View },
          { icon: 'bar-chart', label: 'Analityka', desc: 'Raporty i trendy', view: 'analytics' as View },
        ].map(a => (
          <motion.button className="qt-quick-action" key={a.label} onClick={() => go(a.view)} whileTap={{ scale: 0.97 }}>
            <div className="qt-quick-action-icon"><Icon name={a.icon} size={22} strokeWidth={2} /></div>
            <div>
              <div className="qt-quick-action-label">{a.label}</div>
              <div className="qt-quick-action-desc">{a.desc}</div>
            </div>
            <span className="qt-quick-action-arrow"><Icon name="arrow-right" size={16} strokeWidth={2.2} /></span>
          </motion.button>
        ))}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Quotes List
// ═══════════════════════════════════════════════════

function QuotesList({ quotes, onSelect, onNewQuote }: {
  quotes: Quote[]; onSelect: (q: Quote) => void; onNewQuote: () => void;
}) {
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<'date' | 'value'>('date');
  const filters = [['all', 'Wszystkie'], ['sent', 'Wysłane'], ['negotiation', 'Negocjacje'], ['accepted', 'Zamknięte'], ['draft', 'Robocze']] as const;
  let filtered = filter === 'all' ? [...quotes] : quotes.filter(q => q.status === filter);
  if (sort === 'value') filtered = filtered.sort((a, b) => calcQuoteTotal(b.items) - calcQuoteTotal(a.items));

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">Oferty</div>
          <div className="qt-subtitle">{quotes.length} ofert w systemie &middot; {fmt(quotes.reduce((s, q) => s + calcQuoteTotal(q.items), 0))} łącznie</div>
        </div>
        <div className="qt-hdr-actions">
          <div className="qt-sort-btns">
            <button className={`qt-sort-btn ${sort === 'date' ? 'on' : ''}`} onClick={() => setSort('date')}>
              <Icon name="clock" size={14} strokeWidth={2} /> Data
            </button>
            <button className={`qt-sort-btn ${sort === 'value' ? 'on' : ''}`} onClick={() => setSort('value')}>
              <Icon name="bar-chart" size={14} strokeWidth={2} /> Wartość
            </button>
          </div>
          <button className="qt-btn pri" onClick={onNewQuote}>
            <Icon name="layers" size={17} strokeWidth={2.2} /> Nowa
          </button>
        </div>
      </div>

      <div className="qt-filters" style={{ marginBottom: '2vh' }}>
        {filters.map(([v, l]) => (
          <button key={v} className={`qt-filter ${filter === v ? 'on' : ''}`}
            onClick={() => setFilter(v)}>
            {l}
            <span className="qt-filter-count">{v === 'all' ? quotes.length : quotes.filter(q => q.status === v).length}</span>
          </button>
        ))}
      </div>

      <div className="qt-quotes-list">
        {filtered.map((q, i) => {
          const client = getClient(q.clientId);
          const total = calcQuoteTotal(q.items);
          return (
            <motion.div className="qt-quote-row" key={q.id} whileTap={{ scale: 0.985 }}
              onClick={() => onSelect(q)}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}>
              <div className="qt-quote-id-col">
                <div className="qt-quote-id">{q.id}</div>
                <div className="qt-quote-date">{q.created}</div>
              </div>
              <div className="qt-quote-client-col">
                <div className="qt-quote-client-name">{client.name}</div>
                <div className="qt-quote-contact-name">{client.contact}</div>
              </div>
              <div className="qt-quote-value-col">
                <div className="qt-quote-value">{fmt(total)}</div>
                <div className="qt-quote-items">{q.items.length} pozycji</div>
              </div>
              {q.probability > 0 && q.probability < 100 && (
                <div className="qt-quote-prob-col">
                  <div className="qt-quote-prob-bar">
                    <div className="qt-quote-prob-fill" style={{ width: `${q.probability}%` }} />
                  </div>
                  <div className="qt-quote-prob-text">{q.probability}%</div>
                </div>
              )}
              <span className={`qt-badge ${q.status}`}>{statusLabels[q.status]}</span>
              <span className="qt-quote-arrow"><Icon name="chevron-right" size={18} strokeWidth={2.2} /></span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Builder (full flow: select client → products → discount → send)
// ═══════════════════════════════════════════════════

function Builder({ initialItems, onCreateQuote, toast }: {
  initialItems: QuoteItem[];
  onCreateQuote: (clientId: number, items: QuoteItem[], note: string) => void;
  toast: (msg: string, type?: 'success' | 'info') => void;
}) {
  const [cart, setCart] = useState<QuoteItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [step, setStep] = useState<'products' | 'review'>('products');
  const [clientId, setClientId] = useState<number | null>(null);
  const [showClientPicker, setShowClientPicker] = useState(false);
  const [note, setNote] = useState('');
  const [globalDiscount, setGlobalDiscount] = useState(0);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  const cartWithDiscount = cart.map(i => ({ ...i, discount: Math.min(i.discount + globalDiscount, 50) }));
  const total = calcQuoteTotal(cartWithDiscount);
  const totalItems = cart.reduce((s, item) => s + item.qty, 0);

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) return prev.map(i => i.productId === productId ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { productId, qty: 1, discount: 0 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing && existing.qty > 1) return prev.map(i => i.productId === productId ? { ...i, qty: i.qty - 1 } : i);
      return prev.filter(i => i.productId !== productId);
    });
  };

  const setItemDiscount = (productId: number, discount: number) => {
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, discount } : i));
  };

  const getQty = (productId: number) => cart.find(i => i.productId === productId)?.qty || 0;

  const handleCreate = () => {
    if (!clientId) { setShowClientPicker(true); return; }
    onCreateQuote(clientId, cartWithDiscount, note);
    setCart([]); setClientId(null); setNote(''); setGlobalDiscount(0); setStep('products');
  };

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">{step === 'products' ? 'Konfigurator oferty' : 'Podsumowanie oferty'}</div>
          <div className="qt-subtitle">
            {step === 'products' ? 'Wybierz produkty, ustaw ilości i rabaty'
              : clientId ? `Klient: ${getClient(clientId).name}` : 'Wybierz klienta i wyślij ofertę'}
          </div>
        </div>
        <div className="qt-hdr-actions">
          {step === 'review' && (
            <button className="qt-btn sec" onClick={() => setStep('products')}>
              <Icon name="arrow-left" size={17} strokeWidth={2.2} /> Edytuj produkty
            </button>
          )}
          {step === 'products' && cart.length > 0 && (
            <motion.button className="qt-btn pri" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.97 }} onClick={() => setStep('review')}>
              Dalej: podsumowanie ({totalItems}) <Icon name="arrow-right" size={16} strokeWidth={2.2} />
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'products' ? (
          <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="qt-builder-categories">
              {categories.map(cat => (
                <button key={cat} className={`qt-filter ${activeCategory === cat ? 'on' : ''}`}
                  onClick={() => setActiveCategory(cat)}>
                  {cat === 'all' ? 'Wszystko' : cat}
                </button>
              ))}
            </div>

            <div className="qt-builder-grid">
              {filtered.map((p, i) => {
                const qty = getQty(p.id);
                const itemDiscount = cart.find(c => c.productId === p.id)?.discount || 0;
                return (
                  <motion.div className={`qt-product-card ${qty > 0 ? 'selected' : ''}`} key={p.id}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}>
                    {qty > 0 && <div className="qt-product-selected-indicator" />}
                    <div className="qt-product-icon"><Icon name={p.icon} size={24} strokeWidth={1.8} /></div>
                    <div className="qt-product-category">{p.category}</div>
                    <div className="qt-product-name">{p.name}</div>
                    <div className="qt-product-desc">{p.desc}</div>
                    <div className="qt-product-price">
                      {fmt(p.basePrice)} <span className="qt-product-unit">/ {p.unit}</span>
                    </div>
                    <div className="qt-product-actions">
                      {qty > 0 ? (
                        <>
                          <div className="qt-product-qty-control">
                            <button className="qt-qty-btn" onClick={() => removeFromCart(p.id)}>−</button>
                            <span className="qt-qty-val">{qty}</span>
                            <button className="qt-qty-btn" onClick={() => addToCart(p.id)}>+</button>
                          </div>
                          <div className="qt-product-discount">
                            <span className="qt-discount-label">Rabat</span>
                            <div className="qt-discount-btns">
                              {[0, 5, 10, 15, 20].map(d => (
                                <button key={d} className={`qt-discount-btn ${itemDiscount === d ? 'on' : ''}`}
                                  onClick={() => setItemDiscount(p.id, d)}>
                                  {d}%
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <motion.button className="qt-btn sec qt-add-btn" whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(p.id)}>
                          <Icon name="layers" size={15} strokeWidth={2.2} /> Dodaj
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {cart.length > 0 && (
                <motion.div className="qt-floating-bar"
                  initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
                  <div className="qt-floating-info">
                    <span className="qt-floating-count">{totalItems} pozycji</span>
                    <span className="qt-floating-total">{fmt(total)}</span>
                  </div>
                  <button className="qt-btn pri" onClick={() => setStep('review')}>
                    Dalej <Icon name="arrow-right" size={16} strokeWidth={2.2} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <div className="qt-grid-2">
              {/* Left: items */}
              <div className="qt-card">
                <div className="qt-card-hdr">
                  <span className="qt-card-title">Pozycje ({totalItems})</span>
                  <div className="qt-global-discount">
                    <span className="qt-discount-label">Rabat globalny:</span>
                    <div className="qt-discount-btns">
                      {[0, 5, 10, 15].map(d => (
                        <button key={d} className={`qt-discount-btn ${globalDiscount === d ? 'on' : ''}`}
                          onClick={() => setGlobalDiscount(d)}>
                          {d}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="qt-card-body">
                  <div className="qt-summary-items">
                    {cartWithDiscount.map(item => {
                      const p = getProduct(item.productId);
                      return (
                        <div className="qt-summary-item" key={item.productId}>
                          <div className="qt-summary-item-icon"><Icon name={p.icon} size={18} strokeWidth={2} /></div>
                          <div className="qt-summary-item-info">
                            <div className="qt-summary-item-name">{p.name}</div>
                            <div className="qt-summary-item-detail">
                              {item.qty} × {fmt(p.basePrice)}
                              {item.discount > 0 && <span className="qt-summary-disc"> (−{item.discount}%)</span>}
                            </div>
                          </div>
                          <div className="qt-summary-item-total">{fmt(calcItemPrice(item))}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="qt-summary-total-row"><span>Netto</span><span className="qt-summary-total-value">{fmt(total)}</span></div>
                  <div className="qt-summary-vat-row"><span>VAT 23%</span><span>{fmt(Math.round(total * 0.23))}</span></div>
                  <div className="qt-summary-gross-row"><span>Brutto</span><span className="qt-summary-gross-value">{fmt(Math.round(total * 1.23))}</span></div>
                </div>
              </div>

              {/* Right: client + note + actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.2vw,20px)' }}>
                <div className="qt-card">
                  <div className="qt-card-hdr"><span className="qt-card-title">Klient</span></div>
                  <div className="qt-card-body">
                    {clientId ? (
                      <div className="qt-selected-client">
                        <div className="qt-client-avatar">{getClient(clientId).contact.split(' ').map(n => n[0]).join('')}</div>
                        <div className="qt-client-info">
                          <div className="qt-client-name">{getClient(clientId).name}</div>
                          <div className="qt-client-contact">{getClient(clientId).contact} &middot; {getClient(clientId).email}</div>
                        </div>
                        <button className="qt-btn sec" onClick={() => setShowClientPicker(true)} style={{ marginLeft: 'auto', flexShrink: 0 }}>
                          Zmień
                        </button>
                      </div>
                    ) : (
                      <motion.button className="qt-client-select-btn" whileTap={{ scale: 0.97 }}
                        onClick={() => setShowClientPicker(true)}>
                        <Icon name="user-plus" size={20} strokeWidth={2} />
                        <span>Wybierz klienta</span>
                        <Icon name="chevron-right" size={16} strokeWidth={2.2} />
                      </motion.button>
                    )}
                  </div>
                </div>

                <div className="qt-card">
                  <div className="qt-card-hdr"><span className="qt-card-title">Notatka</span></div>
                  <div className="qt-card-body">
                    <textarea className="qt-note-input" placeholder="Uwagi do oferty, warunki specjalne..."
                      value={note} onChange={e => setNote(e.target.value)} rows={3} />
                  </div>
                </div>

                <div className="qt-builder-final-actions">
                  <motion.button className="qt-btn pri qt-btn-lg" whileTap={{ scale: 0.96 }}
                    onClick={handleCreate}
                    style={{ opacity: cart.length === 0 ? 0.5 : 1 }}>
                    <Icon name="send" size={18} strokeWidth={2.2} />
                    {clientId ? 'Wyślij ofertę' : 'Wybierz klienta i wyślij'}
                  </motion.button>
                  <motion.button className="qt-btn sec qt-btn-lg" whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      if (!clientId) { toast('Najpierw wybierz klienta', 'info'); setShowClientPicker(true); return; }
                      onCreateQuote(clientId, cartWithDiscount, note);
                      setCart([]); setClientId(null); setNote(''); setGlobalDiscount(0); setStep('products');
                    }}>
                    <Icon name="file-text" size={18} strokeWidth={2.2} /> Zapisz jako roboczą
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClientPicker && (
          <ClientPicker onSelect={setClientId} onClose={() => setShowClientPicker(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Templates
// ═══════════════════════════════════════════════════

function Templates({ onUseTemplate, toast }: {
  onUseTemplate: (items: QuoteItem[]) => void;
  toast: (msg: string, type?: 'success' | 'info') => void;
}) {
  const handleUse = (t: typeof templateDefs[0]) => {
    const items: QuoteItem[] = t.items.map(i => ({ productId: i.productId, qty: i.qty, discount: 0 }));
    onUseTemplate(items);
    toast(`Załadowano szablon "${t.name}" do konfiguratora`, 'success');
  };

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">Szablony ofert</div>
          <div className="qt-subtitle">Gotowe zestawy — kliknij, aby załadować do konfiguratora</div>
        </div>
      </div>

      <div className="qt-templates-grid">
        {templateDefs.map((t, i) => {
          const value = t.items.reduce((s, item) => s + getProduct(item.productId).basePrice * item.qty, 0);
          return (
            <motion.div className="qt-template-card" key={t.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleUse(t)}>
              <div className="qt-template-accent" style={{ background: t.color }} />
              <div className="qt-template-header">
                <div className="qt-template-name">{t.name}</div>
                <div className="qt-template-uses">{t.uses}× użyty</div>
              </div>
              <div className="qt-template-desc">{t.desc}</div>
              <div className="qt-template-products">
                {t.items.map(item => {
                  const p = getProduct(item.productId);
                  return (
                    <div className="qt-template-product-tag" key={item.productId}>
                      <Icon name={p.icon} size={11} strokeWidth={2} />
                      {p.name} ×{item.qty}
                    </div>
                  );
                })}
              </div>
              <div className="qt-template-meta">
                <span>{t.items.length} produktów</span>
                <span className="qt-template-value">{fmt(value)}</span>
              </div>
              <div className="qt-template-action">
                Użyj szablonu <Icon name="arrow-right" size={14} strokeWidth={2.2} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Analytics
// ═══════════════════════════════════════════════════

function Analytics({ quotes }: { quotes: Quote[] }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [period, setPeriod] = useState<'month' | 'quarter'>('month');

  const sent = quotes.filter(q => q.status !== 'draft');
  const accepted = quotes.filter(q => q.status === 'accepted');
  const avgValue = quotes.length > 0 ? Math.round(quotes.reduce((s, q) => s + calcQuoteTotal(q.items), 0) / quotes.length) : 0;
  const convRate = sent.length > 0 ? Math.round((accepted.length / sent.length) * 100) : 0;

  const statusBreakdown = [
    { label: 'Zamknięte', count: accepted.length, color: '#059669' },
    { label: 'Wysłane', count: quotes.filter(q => q.status === 'sent').length, color: '#e11d48' },
    { label: 'Negocjacje', count: quotes.filter(q => q.status === 'negotiation').length, color: '#f59e0b' },
    { label: 'Robocze', count: quotes.filter(q => q.status === 'draft').length, color: '#d4d4d4' },
    { label: 'Odrzucone', count: quotes.filter(q => q.status === 'rejected').length, color: '#dc2626' },
    { label: 'Wygasłe', count: quotes.filter(q => q.status === 'expired').length, color: '#a3a3a3' },
  ];
  const maxCount = Math.max(...statusBreakdown.map(s => s.count), 1);

  const productPopularity = products.map(p => {
    const count = quotes.reduce((s, q) => s + q.items.filter(i => i.productId === p.id).reduce((ss, i) => ss + i.qty, 0), 0);
    return { ...p, count };
  }).sort((a, b) => b.count - a.count).slice(0, 6);
  const maxProd = Math.max(...productPopularity.map(p => p.count), 1);

  const displayRevenue = period === 'month' ? monthlyRevenue : [
    monthlyRevenue.slice(0, 3).reduce((a, b) => a + b, 0),
    monthlyRevenue.slice(3, 6).reduce((a, b) => a + b, 0),
    monthlyRevenue.slice(6, 9).reduce((a, b) => a + b, 0),
    monthlyRevenue.slice(9, 12).reduce((a, b) => a + b, 0),
  ];
  const displayLabels = period === 'month' ? monthLabels : ['Q1', 'Q2', 'Q3', 'Q4'];
  const displayMax = Math.max(...displayRevenue);

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">Analityka</div>
          <div className="qt-subtitle">Wyniki i trendy sprzedażowe — dane na żywo</div>
        </div>
      </div>

      <div className="qt-analytics-stats">
        {[
          { label: 'Śr. wartość oferty', val: fmt(avgValue), change: '+12% vs Q3' },
          { label: 'Konwersja', val: `${convRate}%`, change: '+8pp vs Q3' },
          { label: 'Śr. czas zamknięcia', val: '14 dni', change: '−3 dni vs Q3' },
          { label: 'Łącznie ofert', val: String(quotes.length), change: `${accepted.length} zamkniętych` },
        ].map(s => (
          <div className="qt-analytics-stat" key={s.label}>
            <div className="qt-analytics-stat-label">{s.label}</div>
            <div className="qt-analytics-stat-val">{s.val}</div>
            <div className="qt-analytics-stat-change">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="qt-grid-2">
        <div className="qt-card">
          <div className="qt-card-hdr">
            <span className="qt-card-title">Przychody (tys. PLN)</span>
            <div className="qt-sort-btns">
              <button className={`qt-sort-btn ${period === 'month' ? 'on' : ''}`} onClick={() => setPeriod('month')}>Miesiące</button>
              <button className={`qt-sort-btn ${period === 'quarter' ? 'on' : ''}`} onClick={() => setPeriod('quarter')}>Kwartały</button>
            </div>
          </div>
          <div className="qt-card-body">
            <div className="qt-chart-bars">
              {displayRevenue.map((v, i) => (
                <div className="qt-chart-bar-wrap" key={i}
                  onPointerDown={() => setHoveredBar(i)} onPointerUp={() => setHoveredBar(null)} onPointerLeave={() => setHoveredBar(null)}>
                  <div className="qt-chart-bar-val" style={{ opacity: hoveredBar === i ? 1 : 0.5 }}>{v}k</div>
                  <motion.div className="qt-chart-bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${(v / displayMax) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    style={{
                      background: hoveredBar === i ? '#e11d48' : i >= displayRevenue.length - 2 ? '#0a0a0a' : '#e5e5e5',
                      transform: hoveredBar === i ? 'scaleX(1.15)' : 'scaleX(1)',
                    }} />
                  <div className="qt-chart-bar-label">{displayLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="qt-card">
          <div className="qt-card-hdr"><span className="qt-card-title">Struktura ofert</span></div>
          <div className="qt-card-body">
            <div className="qt-status-breakdown">
              {statusBreakdown.map(s => (
                <div className="qt-status-row" key={s.label}>
                  <div className="qt-status-dot" style={{ background: s.color }} />
                  <div className="qt-status-label">{s.label}</div>
                  <div className="qt-status-bar-wrap">
                    <motion.div className="qt-status-bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${(s.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ background: s.color }} />
                  </div>
                  <div className="qt-status-count">{s.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="qt-card">
        <div className="qt-card-hdr"><span className="qt-card-title">Popularność produktów (wg ilości w ofertach)</span></div>
        <div className="qt-card-body">
          <div className="qt-top-products">
            {productPopularity.map((p, i) => (
              <motion.div className="qt-top-product" key={p.id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}>
                <div className="qt-top-product-rank">{i + 1}</div>
                <div className="qt-top-product-icon"><Icon name={p.icon} size={16} strokeWidth={2} /></div>
                <div className="qt-top-product-name">{p.name}</div>
                <div className="qt-top-product-bar-wrap">
                  <motion.div className="qt-top-product-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.count / maxProd) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }} />
                </div>
                <div className="qt-top-product-count">{p.count}×</div>
                <div className="qt-top-product-price">{fmt(p.basePrice)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Main Export — state lives here, flows connected
// ═══════════════════════════════════════════════════

export function QuotingDemo() {
  const [view, setView] = useState<View>('dashboard');
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [builderItems, setBuilderItems] = useState<QuoteItem[]>([]);
  const [toastMsg, setToastMsg] = useState<{ msg: string; type: 'success' | 'info' } | null>(null);
  const [sending, setSending] = useState(false);
  const sendingQuoteRef = useRef<string | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'info' = 'success') => {
    setToastMsg({ msg, type });
  }, []);

  const changeStatus = useCallback((id: string, status: QuoteStatus) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status, probability: status === 'accepted' ? 100 : status === 'rejected' || status === 'expired' ? 0 : q.probability } : q));
    setSelectedQuote(prev => prev && prev.id === id ? { ...prev, status, probability: status === 'accepted' ? 100 : status === 'rejected' || status === 'expired' ? 0 : prev.probability } : prev);
    showToast(`${id} — ${statusLabels[status]}`, 'success');
  }, [showToast]);

  const handleSend = useCallback((id: string) => {
    sendingQuoteRef.current = id;
    setSending(true);
  }, []);

  const handleSendDone = useCallback(() => {
    setSending(false);
    if (sendingQuoteRef.current) {
      changeStatus(sendingQuoteRef.current, 'sent');
      sendingQuoteRef.current = null;
    }
  }, [changeStatus]);

  const duplicateToBuilder = useCallback((q: Quote) => {
    setBuilderItems(q.items.map(i => ({ ...i })));
    setView('builder');
    showToast('Pozycje skopiowane do konfiguratora', 'info');
  }, [showToast]);

  const createQuote = useCallback((clientId: number, items: QuoteItem[], note: string) => {
    const id = nextQuoteId(quotes);
    const newQ: Quote = {
      id, clientId, value: calcQuoteTotal(items), items,
      status: 'sent', validUntil: '18.04.2026', created: '19.03.2026',
      probability: 50, note,
    };
    sendingQuoteRef.current = id;
    setSending(true);
    setQuotes(prev => [newQ, ...prev]);
  }, [quotes]);

  const useTemplate = useCallback((items: QuoteItem[]) => {
    setBuilderItems(items);
    setView('builder');
  }, []);

  const goToQuoteDetail = useCallback((q: Quote) => { setSelectedQuote(q); }, []);
  const goBackFromDetail = useCallback(() => { setSelectedQuote(null); }, []);
  const goToNewQuote = useCallback(() => { setBuilderItems([]); setView('builder'); }, []);

  const quoteBadge = String(quotes.filter(q => q.status === 'sent' || q.status === 'negotiation').length);

  return (
    <div className="qt">
      <div className="qt-side">
        <div className="qt-side-brand">
          <div className="qt-side-logo">W</div>
          <div>
            <div className="qt-side-name">WiseQuote</div>
            <div className="qt-side-sub">System Ofertowania</div>
          </div>
        </div>

        <div className="qt-side-section">Menu</div>
        {navItems.map(item => (
          <button key={item.view} className={`qt-nav${view === item.view ? ' on' : ''}`}
            onClick={() => { setView(item.view); setSelectedQuote(null); }}>
            <Icon name={item.icon} size={20} strokeWidth={2} />
            {item.label}
            {item.view === 'quotes' && <span className="qt-nav-badge">{quoteBadge}</span>}
          </button>
        ))}

        <div className="qt-side-section">Więcej</div>
        <button className="qt-nav" onClick={() => showToast('Ustawienia — wkrótce', 'info')}>
          <Icon name="settings" size={20} strokeWidth={2} /> Ustawienia
        </button>
        <button className="qt-nav" onClick={() => showToast('Centrum pomocy — wkrótce', 'info')}>
          <Icon name="book-open" size={20} strokeWidth={2} /> Pomoc
        </button>

        <div className="qt-side-user">
          <div className="qt-side-avatar">AK</div>
          <div>
            <div className="qt-side-uname">Adam Kaczyński</div>
            <div className="qt-side-urole">Sales Director</div>
          </div>
        </div>
      </div>

      <div className="qt-main">
        <AnimatePresence mode="wait">
          <motion.div key={view + (selectedQuote?.id || '')}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            {view === 'dashboard' && <Dashboard quotes={quotes} go={setView} />}
            {view === 'quotes' && !selectedQuote && (
              <QuotesList quotes={quotes} onSelect={goToQuoteDetail} onNewQuote={goToNewQuote} />
            )}
            {view === 'quotes' && selectedQuote && (
              <QuoteDetail quote={selectedQuote} onBack={goBackFromDetail}
                onStatusChange={changeStatus} onDuplicate={duplicateToBuilder} onSend={handleSend} />
            )}
            {view === 'builder' && (
              <Builder initialItems={builderItems} onCreateQuote={createQuote} toast={showToast} />
            )}
            {view === 'templates' && <Templates onUseTemplate={useTemplate} toast={showToast} />}
            {view === 'analytics' && <Analytics quotes={quotes} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && <Toast message={toastMsg.msg} type={toastMsg.type} onDone={() => setToastMsg(null)} />}
      </AnimatePresence>

      {/* Sending overlay */}
      <AnimatePresence>
        {sending && <SendingOverlay onDone={handleSendDone} />}
      </AnimatePresence>
    </div>
  );
}
