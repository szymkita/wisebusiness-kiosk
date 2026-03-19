import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/Icon';
import './demo.css';
import './quoting.css';

// ═══════════════════════════════════════════════════
// Simulated Data — Modern Quoting System
// Swiss Style: grid-driven, bold typography, minimal
// ═══════════════════════════════════════════════════

const quotes = [
  { id: 'Q-2026-0047', client: 'TechVentures Sp. z o.o.', contact: 'Marek Wiśniewski', value: 284000, items: 12, status: 'sent' as const, validUntil: '02.04.2026', created: '19.03.2026', probability: 75, color: '#e11d48' },
  { id: 'Q-2026-0046', client: 'Nordic Solutions AB', contact: 'Erik Lindström', value: 156000, items: 7, status: 'draft' as const, validUntil: '—', created: '18.03.2026', probability: 0, color: '#0a0a0a' },
  { id: 'Q-2026-0045', client: 'GreenEnergy SA', contact: 'Anna Zielińska', value: 412000, items: 18, status: 'negotiation' as const, validUntil: '28.03.2026', created: '14.03.2026', probability: 60, color: '#f59e0b' },
  { id: 'Q-2026-0044', client: 'DataStream Inc.', contact: 'James Mitchell', value: 98000, items: 5, status: 'accepted' as const, validUntil: '20.03.2026', created: '10.03.2026', probability: 100, color: '#059669' },
  { id: 'Q-2026-0043', client: 'MediCorp Polska', contact: 'Katarzyna Nowak', value: 567000, items: 24, status: 'sent' as const, validUntil: '25.03.2026', created: '08.03.2026', probability: 45, color: '#e11d48' },
  { id: 'Q-2026-0042', client: 'BuildPro Group', contact: 'Tomasz Kowal', value: 189000, items: 9, status: 'expired' as const, validUntil: '15.03.2026', created: '01.03.2026', probability: 0, color: '#a3a3a3' },
  { id: 'Q-2026-0041', client: 'FinanceHub SA', contact: 'Piotr Jabłoński', value: 340000, items: 15, status: 'accepted' as const, validUntil: '18.03.2026', created: '25.02.2026', probability: 100, color: '#059669' },
  { id: 'Q-2026-0040', client: 'LogiTrack Sp. z o.o.', contact: 'Maria Dąbrowska', value: 225000, items: 11, status: 'rejected' as const, validUntil: '12.03.2026', created: '20.02.2026', probability: 0, color: '#dc2626' },
];

const builderProducts = [
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

const templates = [
  { id: 1, name: 'Startup MVP', desc: 'Platforma + mobile + CRM', items: 3, value: 148000, color: '#e11d48', uses: 24 },
  { id: 2, name: 'Enterprise Suite', desc: 'Full-stack z integracjami', items: 8, value: 380000, color: '#0a0a0a', uses: 12 },
  { id: 3, name: 'E-commerce Pro', desc: 'Sklep + CRM + analityka', items: 5, value: 210000, color: '#e11d48', uses: 18 },
  { id: 4, name: 'Automatyzacja', desc: 'Workflow + integracje', items: 4, value: 96000, color: '#0a0a0a', uses: 31 },
  { id: 5, name: 'Support Pack', desc: 'Wsparcie + szkolenia + hosting', items: 3, value: 52000, color: '#e11d48', uses: 42 },
  { id: 6, name: 'Data & Analytics', desc: 'Dashboard + audyt + API', items: 3, value: 45000, color: '#0a0a0a', uses: 15 },
];

const clients = [
  { name: 'TechVentures Sp. z o.o.', contact: 'Marek Wiśniewski', email: 'marek@techventures.pl', quotes: 4, totalValue: 680000, lastActivity: '19.03.2026' },
  { name: 'Nordic Solutions AB', contact: 'Erik Lindström', email: 'erik@nordic.se', quotes: 2, totalValue: 312000, lastActivity: '18.03.2026' },
  { name: 'GreenEnergy SA', contact: 'Anna Zielińska', email: 'anna.z@greenenergy.pl', quotes: 6, totalValue: 1240000, lastActivity: '14.03.2026' },
  { name: 'DataStream Inc.', contact: 'James Mitchell', email: 'j.mitchell@datastream.io', quotes: 3, totalValue: 456000, lastActivity: '10.03.2026' },
  { name: 'MediCorp Polska', contact: 'Katarzyna Nowak', email: 'k.nowak@medicorp.pl', quotes: 5, totalValue: 890000, lastActivity: '08.03.2026' },
  { name: 'FinanceHub SA', contact: 'Piotr Jabłoński', email: 'pjablonski@financehub.pl', quotes: 7, totalValue: 1560000, lastActivity: '25.02.2026' },
];

const monthlyRevenue = [120, 95, 180, 145, 210, 175, 240, 195, 280, 320, 290, 350];
const monthLabels = ['Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru', 'Sty', 'Lut', 'Mar'];
const maxRevenue = Math.max(...monthlyRevenue);

const funnelStages = [
  { label: 'Wersje robocze', count: 12, value: 890000, width: 100, color: '#d4d4d4' },
  { label: 'Wysłane', count: 8, value: 720000, width: 80, color: '#e11d48' },
  { label: 'Negocjacje', count: 5, value: 510000, width: 60, color: '#f59e0b' },
  { label: 'Zaakceptowane', count: 3, value: 340000, width: 40, color: '#059669' },
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

function formatPLN(n: number) {
  return n.toLocaleString('pl-PL') + ' PLN';
}

// ═══════════════════════════════════════════════════

type View = 'dashboard' | 'quotes' | 'builder' | 'templates' | 'analytics';

const navItems: { icon: string; label: string; view: View; badge?: string }[] = [
  { icon: 'home', label: 'Pulpit', view: 'dashboard' },
  { icon: 'file-text', label: 'Oferty', view: 'quotes', badge: '8' },
  { icon: 'layers', label: 'Konfigurator', view: 'builder' },
  { icon: 'grid', label: 'Szablony', view: 'templates' },
  { icon: 'bar-chart', label: 'Analityka', view: 'analytics' },
];

// ─── Quote Detail Modal ───
function QuoteModal({ quote, onClose }: { quote: typeof quotes[0]; onClose: () => void }) {
  const statusMap: Record<string, { label: string; cls: string }> = {
    draft: { label: 'Wersja robocza', cls: 'draft' },
    sent: { label: 'Wysłana', cls: 'sent' },
    negotiation: { label: 'Negocjacje', cls: 'negotiation' },
    accepted: { label: 'Zaakceptowana', cls: 'accepted' },
    rejected: { label: 'Odrzucona', cls: 'rejected' },
    expired: { label: 'Wygasła', cls: 'expired' },
  };
  const st = statusMap[quote.status];

  const timeline = [
    { date: '01.03.2026', text: 'Oferta utworzona', status: 'done' as const },
    { date: '05.03.2026', text: 'Wysłana do klienta', status: 'done' as const },
    { date: '12.03.2026', text: 'Klient otworzył ofertę', status: 'done' as const },
    { date: '14.03.2026', text: 'Negocjacje — korekta zakresu', status: quote.status === 'negotiation' || quote.status === 'accepted' ? 'current' as const : 'pending' as const },
    { date: 'Oczekuje', text: 'Akceptacja / podpisanie', status: 'pending' as const },
  ];

  return (
    <motion.div className="qt-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <motion.div className="qt-modal" onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
        <div className="qt-modal-hdr">
          <div>
            <div className="qt-modal-id">{quote.id}</div>
            <div className="qt-modal-client">{quote.client}</div>
            <div className="qt-modal-contact">{quote.contact}</div>
          </div>
          <button className="qt-modal-close" onClick={onClose}>
            <Icon name="x" size={22} strokeWidth={2.2} />
          </button>
        </div>
        <div className="qt-modal-body">
          <div className="qt-modal-stats">
            <div className="qt-modal-stat">
              <div className="qt-modal-stat-label">Wartość</div>
              <div className="qt-modal-stat-val">{formatPLN(quote.value)}</div>
            </div>
            <div className="qt-modal-stat">
              <div className="qt-modal-stat-label">Pozycje</div>
              <div className="qt-modal-stat-val">{quote.items}</div>
            </div>
            <div className="qt-modal-stat">
              <div className="qt-modal-stat-label">Status</div>
              <div className="qt-modal-stat-val"><span className={`qt-badge ${st.cls}`}>{st.label}</span></div>
            </div>
            <div className="qt-modal-stat">
              <div className="qt-modal-stat-label">Ważna do</div>
              <div className="qt-modal-stat-val">{quote.validUntil}</div>
            </div>
          </div>

          {quote.probability > 0 && quote.probability < 100 && (
            <div className="qt-modal-probability">
              <div className="qt-modal-prob-label">Prawdopodobieństwo zamknięcia</div>
              <div className="qt-modal-prob-bar">
                <div className="qt-modal-prob-fill" style={{ width: `${quote.probability}%` }} />
              </div>
              <div className="qt-modal-prob-val">{quote.probability}%</div>
            </div>
          )}

          <div className="qt-modal-section-title">Historia</div>
          <div className="qt-timeline">
            {timeline.map((t, i) => (
              <div className="qt-timeline-item" key={i}>
                <div className={`qt-timeline-dot ${t.status}`} />
                <div className="qt-timeline-date">{t.date}</div>
                <div className="qt-timeline-text">{t.text}</div>
              </div>
            ))}
          </div>

          <div className="qt-modal-actions">
            <button className="qt-btn pri">
              <Icon name="send" size={17} strokeWidth={2.2} /> Wyślij ponownie
            </button>
            <button className="qt-btn sec">
              <Icon name="download" size={17} strokeWidth={2.2} /> Eksport PDF
            </button>
            <button className="qt-btn sec">
              <Icon name="clipboard" size={17} strokeWidth={2.2} /> Duplikuj
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Dashboard View ───
function Dashboard({ go }: { go: (v: View) => void }) {
  const totalValue = quotes.reduce((s, q) => s + q.value, 0);
  const sentCount = quotes.filter(q => q.status === 'sent' || q.status === 'negotiation').length;
  const acceptedValue = quotes.filter(q => q.status === 'accepted').reduce((s, q) => s + q.value, 0);
  const conversionRate = Math.round((quotes.filter(q => q.status === 'accepted').length / quotes.length) * 100);

  const c1 = useAnimatedCounter(quotes.length);
  const c2 = useAnimatedCounter(sentCount);
  const c3 = useAnimatedCounter(conversionRate);

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">System Ofertowania</div>
          <div className="qt-subtitle">Marzec 2026 — Przegląd</div>
        </div>
        <div className="qt-hdr-actions">
          <button className="qt-btn pri" onClick={() => go('builder')}>
            <Icon name="layers" size={17} strokeWidth={2.2} /> Nowa oferta
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="qt-kpi-strip">
        <motion.div className="qt-kpi" whileTap={{ scale: 0.97 }} onClick={() => go('quotes')}>
          <div className="qt-kpi-number">{c1}</div>
          <div className="qt-kpi-label">Wszystkie oferty</div>
          <div className="qt-kpi-sub">+3 w tym tygodniu</div>
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
          <div className="qt-kpi-number">{formatPLN(acceptedValue).replace(' PLN', '')}<span className="qt-kpi-unit">PLN</span></div>
          <div className="qt-kpi-label">Wartość zamkniętych</div>
          <div className="qt-kpi-sub">z {formatPLN(totalValue)} łącznie</div>
        </motion.div>
      </div>

      {/* Funnel + Recent */}
      <div className="qt-grid-2">
        {/* Conversion Funnel */}
        <div className="qt-card">
          <div className="qt-card-hdr">
            <span className="qt-card-title">Lejek konwersji</span>
          </div>
          <div className="qt-card-body">
            <div className="qt-funnel">
              {funnelStages.map((stage, i) => (
                <div className="qt-funnel-stage" key={i}>
                  <div className="qt-funnel-bar-wrap">
                    <div className="qt-funnel-bar" style={{ width: `${stage.width}%`, background: stage.color }} />
                  </div>
                  <div className="qt-funnel-info">
                    <div className="qt-funnel-label">{stage.label}</div>
                    <div className="qt-funnel-count">{stage.count} ofert &middot; {formatPLN(stage.value)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="qt-card">
          <div className="qt-card-hdr">
            <span className="qt-card-title">Ostatnie oferty</span>
            <button className="qt-btn ghost" onClick={() => go('quotes')}>
              Wszystkie <Icon name="arrow-right" size={14} strokeWidth={2.2} />
            </button>
          </div>
          <div className="qt-card-body">
            <div className="qt-recent-list">
              {quotes.slice(0, 5).map(q => (
                <div className="qt-recent-item" key={q.id}>
                  <div className="qt-recent-id">{q.id}</div>
                  <div className="qt-recent-client">{q.client}</div>
                  <div className="qt-recent-value">{formatPLN(q.value)}</div>
                  <span className={`qt-badge ${q.status}`}>
                    {{ draft: 'Robocza', sent: 'Wysłana', negotiation: 'Negocjacje', accepted: 'Zamknięta', rejected: 'Odrzucona', expired: 'Wygasła' }[q.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="qt-quick-actions">
        {[
          { icon: 'layers', label: 'Nowa oferta', desc: 'Konfigurator produktów', view: 'builder' as View },
          { icon: 'grid', label: 'Z szablonu', desc: '6 gotowych zestawów', view: 'templates' as View },
          { icon: 'bar-chart', label: 'Analityka', desc: 'Raporty i trendy', view: 'analytics' as View },
        ].map(a => (
          <motion.button className="qt-quick-action" key={a.label} onClick={() => go(a.view)} whileTap={{ scale: 0.97 }}>
            <div className="qt-quick-action-icon">
              <Icon name={a.icon} size={22} strokeWidth={2} />
            </div>
            <div>
              <div className="qt-quick-action-label">{a.label}</div>
              <div className="qt-quick-action-desc">{a.desc}</div>
            </div>
            <span className="qt-quick-action-arrow">
              <Icon name="arrow-right" size={16} strokeWidth={2.2} />
            </span>
          </motion.button>
        ))}
      </div>
    </>
  );
}

// ─── Quotes List View ───
function QuotesList() {
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<typeof quotes[0] | null>(null);
  const filters = [
    ['all', 'Wszystkie'],
    ['sent', 'Wysłane'],
    ['negotiation', 'Negocjacje'],
    ['accepted', 'Zamknięte'],
    ['draft', 'Robocze'],
  ] as const;
  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);

  const statusLabels: Record<string, string> = {
    draft: 'Robocza', sent: 'Wysłana', negotiation: 'Negocjacje',
    accepted: 'Zamknięta', rejected: 'Odrzucona', expired: 'Wygasła',
  };

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">Oferty</div>
          <div className="qt-subtitle">{quotes.length} ofert w systemie</div>
        </div>
        <div className="qt-filters">
          {filters.map(([v, l]) => (
            <button key={v} className={`qt-filter ${filter === v ? 'on' : ''}`} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="qt-quotes-list">
        {filtered.map(q => (
          <motion.div className="qt-quote-row" key={q.id} whileTap={{ scale: 0.985 }}
            onClick={() => setSelected(q)}>
            <div className="qt-quote-id-col">
              <div className="qt-quote-id">{q.id}</div>
              <div className="qt-quote-date">{q.created}</div>
            </div>
            <div className="qt-quote-client-col">
              <div className="qt-quote-client-name">{q.client}</div>
              <div className="qt-quote-contact-name">{q.contact}</div>
            </div>
            <div className="qt-quote-value-col">
              <div className="qt-quote-value">{formatPLN(q.value)}</div>
              <div className="qt-quote-items">{q.items} pozycji</div>
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
        ))}
      </div>

      <AnimatePresence>
        {selected && <QuoteModal quote={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Builder View (Interactive Configurator) ───
function Builder() {
  const [cart, setCart] = useState<{ product: typeof builderProducts[0]; qty: number }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showSummary, setShowSummary] = useState(false);

  const categories = ['all', ...Array.from(new Set(builderProducts.map(p => p.category)))];
  const filtered = activeCategory === 'all' ? builderProducts : builderProducts.filter(p => p.category === activeCategory);
  const total = cart.reduce((s, item) => s + item.product.basePrice * item.qty, 0);
  const totalItems = cart.reduce((s, item) => s + item.qty, 0);

  const addToCart = (product: typeof builderProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === productId);
      if (existing && existing.qty > 1) return prev.map(i => i.product.id === productId ? { ...i, qty: i.qty - 1 } : i);
      return prev.filter(i => i.product.id !== productId);
    });
  };

  const getCartQty = (productId: number) => cart.find(i => i.product.id === productId)?.qty || 0;

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">Konfigurator oferty</div>
          <div className="qt-subtitle">Wybierz produkty i usługi, dostosuj ilości</div>
        </div>
        <div className="qt-hdr-actions">
          {cart.length > 0 && (
            <motion.button className="qt-btn pri" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.97 }} onClick={() => setShowSummary(true)}>
              <Icon name="file-text" size={17} strokeWidth={2.2} />
              Podsumowanie ({totalItems})
            </motion.button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="qt-builder-categories">
        {categories.map(cat => (
          <button key={cat} className={`qt-filter ${activeCategory === cat ? 'on' : ''}`}
            onClick={() => setActiveCategory(cat)}>
            {cat === 'all' ? 'Wszystko' : cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="qt-builder-grid">
        {filtered.map((p, i) => {
          const qty = getCartQty(p.id);
          return (
            <motion.div className={`qt-product-card ${qty > 0 ? 'selected' : ''}`} key={p.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}>
              <div className="qt-product-icon">
                <Icon name={p.icon} size={24} strokeWidth={1.8} />
              </div>
              <div className="qt-product-category">{p.category}</div>
              <div className="qt-product-name">{p.name}</div>
              <div className="qt-product-desc">{p.desc}</div>
              <div className="qt-product-price">
                {formatPLN(p.basePrice)} <span className="qt-product-unit">/ {p.unit}</span>
              </div>
              <div className="qt-product-actions">
                {qty > 0 ? (
                  <div className="qt-product-qty-control">
                    <button className="qt-qty-btn" onClick={() => removeFromCart(p.id)}>−</button>
                    <span className="qt-qty-val">{qty}</span>
                    <button className="qt-qty-btn" onClick={() => addToCart(p)}>+</button>
                  </div>
                ) : (
                  <motion.button className="qt-btn sec qt-add-btn" whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(p)}>
                    <Icon name="layers" size={15} strokeWidth={2.2} /> Dodaj
                  </motion.button>
                )}
              </div>
              {qty > 0 && <div className="qt-product-selected-indicator" />}
            </motion.div>
          );
        })}
      </div>

      {/* Floating total bar */}
      <AnimatePresence>
        {cart.length > 0 && !showSummary && (
          <motion.div className="qt-floating-bar"
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}>
            <div className="qt-floating-info">
              <span className="qt-floating-count">{totalItems} pozycji</span>
              <span className="qt-floating-total">{formatPLN(total)}</span>
            </div>
            <button className="qt-btn pri" onClick={() => setShowSummary(true)}>
              Podsumowanie <Icon name="arrow-right" size={16} strokeWidth={2.2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div className="qt-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowSummary(false)}>
            <motion.div className="qt-modal qt-summary-modal" onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
              <div className="qt-modal-hdr">
                <div>
                  <div className="qt-modal-id">Podsumowanie oferty</div>
                  <div className="qt-modal-contact">{totalItems} pozycji &middot; {formatPLN(total)}</div>
                </div>
                <button className="qt-modal-close" onClick={() => setShowSummary(false)}>
                  <Icon name="x" size={22} strokeWidth={2.2} />
                </button>
              </div>
              <div className="qt-modal-body">
                <div className="qt-summary-items">
                  {cart.map(item => (
                    <div className="qt-summary-item" key={item.product.id}>
                      <div className="qt-summary-item-icon">
                        <Icon name={item.product.icon} size={18} strokeWidth={2} />
                      </div>
                      <div className="qt-summary-item-info">
                        <div className="qt-summary-item-name">{item.product.name}</div>
                        <div className="qt-summary-item-detail">{item.qty} × {formatPLN(item.product.basePrice)}</div>
                      </div>
                      <div className="qt-summary-item-total">{formatPLN(item.product.basePrice * item.qty)}</div>
                    </div>
                  ))}
                </div>
                <div className="qt-summary-total-row">
                  <span>Razem netto</span>
                  <span className="qt-summary-total-value">{formatPLN(total)}</span>
                </div>
                <div className="qt-summary-vat-row">
                  <span>VAT 23%</span>
                  <span>{formatPLN(Math.round(total * 0.23))}</span>
                </div>
                <div className="qt-summary-gross-row">
                  <span>Razem brutto</span>
                  <span className="qt-summary-gross-value">{formatPLN(Math.round(total * 1.23))}</span>
                </div>
                <div className="qt-modal-actions">
                  <button className="qt-btn pri" style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name="send" size={17} strokeWidth={2.2} /> Wyślij ofertę
                  </button>
                  <button className="qt-btn sec" style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon name="download" size={17} strokeWidth={2.2} /> Eksport PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Templates View ───
function Templates({ go }: { go: (v: View) => void }) {
  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">Szablony ofert</div>
          <div className="qt-subtitle">Gotowe zestawy do szybkiego tworzenia ofert</div>
        </div>
      </div>

      <div className="qt-templates-grid">
        {templates.map((t, i) => (
          <motion.div className="qt-template-card" key={t.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => go('builder')}>
            <div className="qt-template-accent" style={{ background: t.color }} />
            <div className="qt-template-header">
              <div className="qt-template-name">{t.name}</div>
              <div className="qt-template-uses">{t.uses}× użyty</div>
            </div>
            <div className="qt-template-desc">{t.desc}</div>
            <div className="qt-template-meta">
              <span>{t.items} produktów</span>
              <span className="qt-template-value">{formatPLN(t.value)}</span>
            </div>
            <div className="qt-template-action">
              Użyj szablonu <Icon name="arrow-right" size={14} strokeWidth={2.2} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Client list */}
      <div className="qt-card" style={{ marginTop: '2.5vh' }}>
        <div className="qt-card-hdr">
          <span className="qt-card-title">Klienci</span>
          <span className="qt-card-count">{clients.length}</span>
        </div>
        <div className="qt-card-body">
          <div className="qt-client-list">
            {clients.map((c, i) => (
              <div className="qt-client-row" key={i}>
                <div className="qt-client-avatar">{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                <div className="qt-client-info">
                  <div className="qt-client-name">{c.name}</div>
                  <div className="qt-client-contact">{c.contact} &middot; {c.email}</div>
                </div>
                <div className="qt-client-stats">
                  <div className="qt-client-stat">
                    <div className="qt-client-stat-val">{c.quotes}</div>
                    <div className="qt-client-stat-label">Ofert</div>
                  </div>
                  <div className="qt-client-stat">
                    <div className="qt-client-stat-val">{(c.totalValue / 1000).toFixed(0)}k</div>
                    <div className="qt-client-stat-label">PLN</div>
                  </div>
                </div>
                <div className="qt-client-date">{c.lastActivity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Analytics View ───
function Analytics() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const totalSent = quotes.filter(q => q.status !== 'draft').length;
  const totalAccepted = quotes.filter(q => q.status === 'accepted').length;
  const avgValue = Math.round(quotes.reduce((s, q) => s + q.value, 0) / quotes.length);
  const avgDaysToClose = 14;

  return (
    <>
      <div className="qt-hdr">
        <div>
          <div className="qt-title">Analityka</div>
          <div className="qt-subtitle">Wyniki i trendy sprzedażowe</div>
        </div>
        <button className="qt-btn sec">
          <Icon name="download" size={17} strokeWidth={2.2} /> Eksport
        </button>
      </div>

      <div className="qt-analytics-stats">
        {[
          { label: 'Śr. wartość oferty', val: formatPLN(avgValue), change: '+12% vs Q3' },
          { label: 'Konwersja', val: `${Math.round((totalAccepted / totalSent) * 100)}%`, change: '+8pp vs Q3' },
          { label: 'Śr. czas zamknięcia', val: `${avgDaysToClose} dni`, change: '−3 dni vs Q3' },
        ].map(s => (
          <div className="qt-analytics-stat" key={s.label}>
            <div className="qt-analytics-stat-label">{s.label}</div>
            <div className="qt-analytics-stat-val">{s.val}</div>
            <div className="qt-analytics-stat-change">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="qt-grid-2">
        {/* Revenue chart */}
        <div className="qt-card">
          <div className="qt-card-hdr">
            <span className="qt-card-title">Przychody miesięczne (tys. PLN)</span>
          </div>
          <div className="qt-card-body">
            <div className="qt-chart-bars">
              {monthlyRevenue.map((v, i) => (
                <div className="qt-chart-bar-wrap" key={i}
                  onPointerDown={() => setHoveredBar(i)} onPointerUp={() => setHoveredBar(null)} onPointerLeave={() => setHoveredBar(null)}>
                  <div className="qt-chart-bar-val" style={{ opacity: hoveredBar === i ? 1 : 0.5 }}>{v}k</div>
                  <div className="qt-chart-bar"
                    style={{
                      height: `${(v / maxRevenue) * 100}%`,
                      background: hoveredBar === i ? '#e11d48' : i >= monthlyRevenue.length - 2 ? '#0a0a0a' : '#e5e5e5',
                      transform: hoveredBar === i ? 'scaleX(1.15)' : 'scaleX(1)',
                    }} />
                  <div className="qt-chart-bar-label">{monthLabels[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status breakdown */}
        <div className="qt-card">
          <div className="qt-card-hdr">
            <span className="qt-card-title">Struktura ofert</span>
          </div>
          <div className="qt-card-body">
            <div className="qt-status-breakdown">
              {[
                { label: 'Zaakceptowane', count: 2, pct: 25, color: '#059669' },
                { label: 'Wysłane', count: 2, pct: 25, color: '#e11d48' },
                { label: 'Negocjacje', count: 1, pct: 12.5, color: '#f59e0b' },
                { label: 'Robocze', count: 1, pct: 12.5, color: '#d4d4d4' },
                { label: 'Odrzucone', count: 1, pct: 12.5, color: '#dc2626' },
                { label: 'Wygasłe', count: 1, pct: 12.5, color: '#a3a3a3' },
              ].map(s => (
                <div className="qt-status-row" key={s.label}>
                  <div className="qt-status-dot" style={{ background: s.color }} />
                  <div className="qt-status-label">{s.label}</div>
                  <div className="qt-status-bar-wrap">
                    <div className="qt-status-bar" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                  <div className="qt-status-count">{s.count}</div>
                  <div className="qt-status-pct">{s.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className="qt-card">
        <div className="qt-card-hdr">
          <span className="qt-card-title">Najczęściej ofertowane produkty</span>
        </div>
        <div className="qt-card-body">
          <div className="qt-top-products">
            {builderProducts.slice(0, 5).map((p, i) => {
              const barWidth = [100, 82, 68, 55, 40][i];
              return (
                <div className="qt-top-product" key={p.id}>
                  <div className="qt-top-product-rank">{i + 1}</div>
                  <div className="qt-top-product-icon">
                    <Icon name={p.icon} size={16} strokeWidth={2} />
                  </div>
                  <div className="qt-top-product-name">{p.name}</div>
                  <div className="qt-top-product-bar-wrap">
                    <div className="qt-top-product-bar" style={{ width: `${barWidth}%` }} />
                  </div>
                  <div className="qt-top-product-price">{formatPLN(p.basePrice)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════

export function QuotingDemo() {
  const [view, setView] = useState<View>('dashboard');

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
            onClick={() => setView(item.view)}>
            <Icon name={item.icon} size={20} strokeWidth={2} />
            {item.label}
            {item.badge && <span className="qt-nav-badge">{item.badge}</span>}
          </button>
        ))}

        <div className="qt-side-section">Więcej</div>
        <button className="qt-nav">
          <Icon name="settings" size={20} strokeWidth={2} /> Ustawienia
        </button>
        <button className="qt-nav">
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
          <motion.div key={view}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            {view === 'dashboard' && <Dashboard go={setView} />}
            {view === 'quotes' && <QuotesList />}
            {view === 'builder' && <Builder />}
            {view === 'templates' && <Templates go={setView} />}
            {view === 'analytics' && <Analytics />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
