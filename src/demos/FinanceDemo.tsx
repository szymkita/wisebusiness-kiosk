import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/Icon';
import './demo.css';
import './finance.css';

// ─── Data ───
const accounts = [
  { id: 1, name: 'Konto Główne PLN', num: 'PL61 1090 ···· 4521', bal: '284 520,00', cur: 'PLN', color: '#00CD77' },
  { id: 2, name: 'Konto EUR', num: 'PL83 1090 ···· 7744', bal: '41 200,00', cur: 'EUR', color: '#3b82f6' },
  { id: 3, name: 'Konto USD', num: 'PL27 1090 ···· 9182', bal: '18 430,00', cur: 'USD', color: '#8b5cf6' },
  { id: 4, name: 'Lokata 6M', num: 'PL44 1090 ···· 3305', bal: '150 000,00', cur: 'PLN', color: '#f59e0b' },
];

const transactions = [
  { id: 'TX-8842', date: '15.03', desc: 'Przelew od Warsaw Tech', amount: '+12 400,00 zł', pos: true, status: 'ok', cat: 'Przychód' },
  { id: 'TX-8841', date: '15.03', desc: 'AWS - serwery', amount: '-3 220,00 zł', pos: false, status: 'warn', cat: 'IT' },
  { id: 'TX-8840', date: '14.03', desc: 'Faktura #1247 - Projekt X', amount: '+28 500,00 zł', pos: true, status: 'ok', cat: 'Przychód' },
  { id: 'TX-8839', date: '14.03', desc: 'Wynagrodzenia - Marzec', amount: '-45 800,00 zł', pos: false, status: 'ok', cat: 'Kadry' },
  { id: 'TX-8838', date: '13.03', desc: 'Przelew od GreenEnergy', amount: '+8 900,00 zł', pos: true, status: 'ok', cat: 'Przychód' },
  { id: 'TX-8837', date: '13.03', desc: 'Subskrypcje SaaS', amount: '-1 450,00 zł', pos: false, status: 'err', cat: 'IT' },
  { id: 'TX-8836', date: '12.03', desc: 'Refaktura hosting', amount: '+4 200,00 zł', pos: true, status: 'ok', cat: 'Przychód' },
  { id: 'TX-8835', date: '12.03', desc: 'Materiały biurowe', amount: '-890,00 zł', pos: false, status: 'ok', cat: 'Biuro' },
];

const contractors = [
  { name: 'Warsaw Tech Sp. z o.o.', nip: '5272938471', total: '156 200 PLN', txCount: 12, status: 'Aktywny' },
  { name: 'GreenEnergy S.A.', nip: '7891234560', total: '89 400 PLN', txCount: 8, status: 'Aktywny' },
  { name: 'MediCare Polska', nip: '6342178905', total: '234 100 PLN', txCount: 15, status: 'Aktywny' },
  { name: 'CloudSoft Sp. z o.o.', nip: '1128374650', total: '67 900 PLN', txCount: 6, status: 'Nowy' },
  { name: 'BuildPro S.A.', nip: '9182736450', total: '312 000 PLN', txCount: 21, status: 'Aktywny' },
  { name: 'LogiTrans Sp. z o.o.', nip: '4536271809', total: '178 500 PLN', txCount: 9, status: 'Zawieszony' },
];

const revenue = [42,58,51,67,73,68,81,77,89,95,88,102];
const months = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'];
const maxRev = Math.max(...revenue);

const savedRecipients = [
  { name: 'Warsaw Tech Sp. z o.o.', iban: 'PL 27 1140 2004 0000 3102 7654 3210' },
  { name: 'GreenEnergy S.A.', iban: 'PL 61 1090 1014 0000 0712 1981 2874' },
  { name: 'CloudSoft Sp. z o.o.', iban: 'PL 83 1020 1026 0000 0302 0128 9387' },
];

// ─── Views ───
type View = 'dashboard' | 'transactions' | 'transfer' | 'reports' | 'contractors';

const navItems: { icon: string; label: string; view: View }[] = [
  { icon: 'home', label: 'Pulpit', view: 'dashboard' },
  { icon: 'dollar-sign', label: 'Transakcje', view: 'transactions' },
  { icon: 'zap', label: 'Nowy przelew', view: 'transfer' },
  { icon: 'bar-chart', label: 'Raporty', view: 'reports' },
  { icon: 'users', label: 'Kontrahenci', view: 'contractors' },
];

// ─── Sparkline ───
function Spark({ data, color = 'var(--green)' }: { data: number[]; color?: string }) {
  const mx = Math.max(...data), mn = Math.min(...data), rng = mx - mn || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 60},${24 - ((v - mn) / rng) * 24}`).join(' ');
  return <svg viewBox="0 0 60 24" className="fin-spark"><polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" /></svg>;
}

// ─── Dashboard View ───
function Dashboard({ go }: { go: (v: View) => void }) {
  return (
    <>
      <div className="da-mhdr">
        <div>
          <div className="da-mt">Panel Finansowy</div>
          <div className="da-ms">Marzec 2026 &bull; Ostatnia aktualizacja: 15.03, 14:32</div>
        </div>
        <button className="fin-big-btn pri" onClick={() => go('transfer')}>
          <Icon name="zap" size={18} strokeWidth={2} /> Nowy przelew
        </button>
      </div>

      <div className="da-stats">
        {[
          { l: 'Przychody', v: '102 400 zł', c: '+15.9%', p: true },
          { l: 'Koszty', v: '67 200 zł', c: '+4.2%', p: false },
          { l: 'Zysk netto', v: '35 200 zł', c: '+34.5%', p: true },
          { l: 'Saldo łącznie', v: '494 150 zł', c: '+8.1%', p: true },
        ].map(s => (
          <div className="da-stat" key={s.l}>
            <div className="da-stat-l">{s.l}</div>
            <div className="da-stat-v">{s.v}</div>
            <div className={`da-stat-c ${s.p ? 'pos' : 'neg'}`}>{s.c} vs poprz.</div>
          </div>
        ))}
      </div>

      <div className="fin-accounts">
        {accounts.map(a => (
          <div className="fin-acc" key={a.id} style={{ borderTopColor: a.color }}>
            <div className="fin-acc-top">
              <span className="fin-acc-name">{a.name}</span>
              <span className="fin-acc-cur" style={{ color: a.color }}>{a.cur}</span>
            </div>
            <div className="fin-acc-bal">{a.bal} {a.cur}</div>
            <div className="fin-acc-num">{a.num}</div>
            <Spark data={[30,45,38,52,48,60,55,68].map(x => x + a.id * 10)} color={a.color} />
          </div>
        ))}
      </div>

      <div className="fin-section-title">Ostatnie transakcje</div>
      <div className="fin-tx-list">
        {transactions.slice(0, 5).map(tx => (
          <div className="fin-tx" key={tx.id}>
            <div className={`fin-tx-dot ${tx.pos ? 'in' : 'out'}`}>
              <Icon name={tx.pos ? 'arrow-left' : 'arrow-up-right'} size={14} strokeWidth={2.5} />
            </div>
            <div className="fin-tx-info">
              <span className="fin-tx-desc">{tx.desc}</span>
              <span className="fin-tx-cat">{tx.cat} &bull; {tx.date}</span>
            </div>
            <span className={`fin-tx-amt ${tx.pos ? 'pos' : ''}`}>{tx.amount}</span>
          </div>
        ))}
        <button className="fin-link-btn" onClick={() => go('transactions')}>
          Pokaż wszystkie transakcje <Icon name="arrow-up-right" size={13} strokeWidth={2} />
        </button>
      </div>
    </>
  );
}

// ─── Transactions View ───
function Transactions() {
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');
  const filtered = transactions.filter(t => filter === 'all' || (filter === 'in' ? t.pos : !t.pos));
  return (
    <>
      <div className="da-mhdr">
        <div className="da-mt">Transakcje</div>
        <div className="fin-filters">
          {(['all', 'in', 'out'] as const).map(f => (
            <button key={f} className={`fin-filter ${filter === f ? 'on' : ''}`}
              onClick={() => setFilter(f)}>
              {f === 'all' ? 'Wszystkie' : f === 'in' ? 'Przychody' : 'Wydatki'}
            </button>
          ))}
        </div>
      </div>
      <div className="fin-tx-list full">
        {filtered.map(tx => (
          <div className="fin-tx" key={tx.id}>
            <div className={`fin-tx-dot ${tx.pos ? 'in' : 'out'}`}>
              <Icon name={tx.pos ? 'arrow-left' : 'arrow-up-right'} size={14} strokeWidth={2.5} />
            </div>
            <div className="fin-tx-info">
              <span className="fin-tx-desc">{tx.desc}</span>
              <span className="fin-tx-cat">{tx.cat} &bull; {tx.date}.2026</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`fin-tx-amt ${tx.pos ? 'pos' : ''}`}>{tx.amount}</span>
              <span className={`badge ${tx.status}`} style={{ display: 'block', marginTop: 4 }}>
                {tx.status === 'ok' ? 'Zaksięgowane' : tx.status === 'warn' ? 'Oczekuje' : 'Odrzucone'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Transfer Flow ───
function TransferFlow({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [iban, setIban] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [fromAcc, setFromAcc] = useState(0);

  const pickSaved = (r: typeof savedRecipients[0]) => {
    setRecipient(r.name);
    setIban(r.iban);
    setStep(1);
  };

  const steps = ['Odbiorca', 'Kwota', 'Potwierdzenie', 'Gotowe'];

  return (
    <div className="fin-flow">
      {/* Step indicator */}
      <div className="fin-steps">
        {steps.map((s, i) => (
          <div key={s} className={`fin-step ${i <= step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
            <div className="fin-step-num">{i < step ? <Icon name="check-circle" size={18} /> : i + 1}</div>
            <span className="fin-step-label">{s}</span>
            {i < steps.length - 1 && <div className="fin-step-line" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Recipient */}
        {step === 0 && (
          <motion.div key="s0" className="fin-flow-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h3 className="fin-flow-title">Wybierz lub wpisz odbiorcę</h3>

            <div className="fin-saved-list">
              <div className="fin-saved-title">Zapisani odbiorcy</div>
              {savedRecipients.map(r => (
                <button className="fin-saved" key={r.iban} onClick={() => pickSaved(r)}>
                  <div className="fin-saved-avatar">{r.name[0]}</div>
                  <div className="fin-saved-info">
                    <span className="fin-saved-name">{r.name}</span>
                    <span className="fin-saved-iban">{r.iban}</span>
                  </div>
                  <Icon name="arrow-up-right" size={16} />
                </button>
              ))}
            </div>

            <div className="fin-divider"><span>lub wpisz ręcznie</span></div>

            <div className="fin-form-row">
              <label className="fin-label">Nazwa odbiorcy</label>
              <input className="fin-input" placeholder="Firma Sp. z o.o." value={recipient} onChange={e => setRecipient(e.target.value)} />
            </div>
            <div className="fin-form-row">
              <label className="fin-label">Numer rachunku (IBAN)</label>
              <input className="fin-input mono" placeholder="PL 00 0000 0000 0000 0000 0000 0000" value={iban} onChange={e => setIban(e.target.value)} />
            </div>
            <button className="fin-big-btn pri full" disabled={!recipient || !iban} onClick={() => setStep(1)}>
              Dalej <Icon name="arrow-up-right" size={16} />
            </button>
          </motion.div>
        )}

        {/* Step 1: Amount */}
        {step === 1 && (
          <motion.div key="s1" className="fin-flow-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h3 className="fin-flow-title">Kwota i szczegóły</h3>

            <div className="fin-form-row">
              <label className="fin-label">Z rachunku</label>
              <div className="fin-acc-select">
                {accounts.filter(a => a.cur === 'PLN').map((a, i) => (
                  <button key={a.id} className={`fin-acc-opt ${fromAcc === i ? 'on' : ''}`} onClick={() => setFromAcc(i)}>
                    <span className="fin-acc-opt-name">{a.name}</span>
                    <span className="fin-acc-opt-bal">{a.bal} {a.cur}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="fin-form-row">
              <label className="fin-label">Kwota</label>
              <div className="fin-amount-wrap">
                <input className="fin-input fin-amount" type="text" inputMode="decimal" placeholder="0,00"
                  value={amount} onChange={e => setAmount(e.target.value)} />
                <span className="fin-amount-cur">PLN</span>
              </div>
            </div>

            <div className="fin-quick-amounts">
              {['500', '1 000', '5 000', '10 000'].map(a => (
                <button key={a} className="fin-quick-amt" onClick={() => setAmount(a)}>{a} zł</button>
              ))}
            </div>

            <div className="fin-form-row">
              <label className="fin-label">Tytuł przelewu</label>
              <input className="fin-input" placeholder="Faktura / Zapłata za..." value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="fin-flow-actions">
              <button className="fin-big-btn sec" onClick={() => setStep(0)}><Icon name="arrow-left" size={16} /> Wstecz</button>
              <button className="fin-big-btn pri" disabled={!amount} onClick={() => setStep(2)}>Dalej <Icon name="arrow-up-right" size={16} /></button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <motion.div key="s2" className="fin-flow-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <h3 className="fin-flow-title">Potwierdzenie przelewu</h3>

            <div className="fin-confirm-card">
              <div className="fin-confirm-row">
                <span className="fin-confirm-label">Odbiorca</span>
                <span className="fin-confirm-val">{recipient}</span>
              </div>
              <div className="fin-confirm-row">
                <span className="fin-confirm-label">Rachunek</span>
                <span className="fin-confirm-val mono">{iban}</span>
              </div>
              <div className="fin-confirm-row">
                <span className="fin-confirm-label">Z konta</span>
                <span className="fin-confirm-val">{accounts[fromAcc]?.name}</span>
              </div>
              <div className="fin-confirm-row big">
                <span className="fin-confirm-label">Kwota</span>
                <span className="fin-confirm-val amount">{amount} PLN</span>
              </div>
              <div className="fin-confirm-row">
                <span className="fin-confirm-label">Tytuł</span>
                <span className="fin-confirm-val">{title || '—'}</span>
              </div>
              <div className="fin-confirm-row">
                <span className="fin-confirm-label">Data realizacji</span>
                <span className="fin-confirm-val">Dziś, 15.03.2026</span>
              </div>
            </div>

            <div className="fin-flow-actions">
              <button className="fin-big-btn sec" onClick={() => setStep(1)}><Icon name="arrow-left" size={16} /> Wstecz</button>
              <button className="fin-big-btn pri confirm" onClick={() => setStep(3)}>
                <Icon name="shield" size={18} /> Potwierdź i wyślij
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div key="s3" className="fin-flow-body center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="fin-success-ico"><Icon name="check-circle" size={48} strokeWidth={1.5} /></div>
            <h3 className="fin-success-title">Przelew wysłany!</h3>
            <p className="fin-success-sub">Przelew na kwotę <strong>{amount} PLN</strong> do <strong>{recipient}</strong> został zlecony.</p>
            <p className="fin-success-sub">Numer referencyjny: <strong>REF-2026031542</strong></p>
            <div className="fin-flow-actions" style={{ justifyContent: 'center' }}>
              <button className="fin-big-btn sec" onClick={onDone}><Icon name="home" size={16} /> Powrót do pulpitu</button>
              <button className="fin-big-btn pri" onClick={() => { setStep(0); setRecipient(''); setIban(''); setAmount(''); setTitle(''); }}>
                <Icon name="zap" size={16} /> Nowy przelew
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Reports View ───
function Reports() {
  return (
    <>
      <div className="da-mhdr">
        <div className="da-mt">Raporty finansowe</div>
        <button className="fin-big-btn sec"><Icon name="package" size={16} /> Eksportuj PDF</button>
      </div>
      <div className="da-cols da-section">
        <div className="da-chart">
          <div className="da-cht">Przychody miesięczne (tys. PLN)</div>
          <div className="da-bars">
            {revenue.map((v, i) => (
              <div key={i} className="da-bar" style={{ height: `${(v / maxRev) * 100}%`, background: i === 11 ? 'var(--green)' : 'var(--green-mid)' }}>
                <span>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="da-chart">
          <div className="da-cht">Struktura kosztów</div>
          <div className="fin-cost-list">
            {[
              { label: 'Wynagrodzenia', pct: 45, color: '#00CD77', val: '30 240 zł' },
              { label: 'Infrastruktura IT', pct: 22, color: '#3b82f6', val: '14 784 zł' },
              { label: 'Biuro i administracja', pct: 15, color: '#8b5cf6', val: '10 080 zł' },
              { label: 'Marketing', pct: 10, color: '#f59e0b', val: '6 720 zł' },
              { label: 'Inne', pct: 8, color: '#e5e7eb', val: '5 376 zł' },
            ].map(c => (
              <div key={c.label} className="fin-cost-row">
                <div className="fin-cost-dot" style={{ background: c.color }} />
                <span className="fin-cost-label">{c.label}</span>
                <div className="fin-cost-bar-wrap">
                  <div className="fin-cost-bar" style={{ width: `${c.pct}%`, background: c.color }} />
                </div>
                <span className="fin-cost-val">{c.val}</span>
                <span className="fin-cost-pct">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fin-kpi-grid da-section">
        {[
          { label: 'Marża operacyjna', value: '34.4%', icon: 'trending-up', trend: '+2.1pp' },
          { label: 'Cash flow', value: '+48 200 zł', icon: 'dollar-sign', trend: '+12%' },
          { label: 'Należności', value: '32 600 zł', icon: 'clock', trend: '5 faktur' },
          { label: 'Zobowiązania', value: '18 400 zł', icon: 'shield', trend: '3 faktury' },
          { label: 'ROI (YTD)', value: '28.3%', icon: 'bar-chart', trend: '+4.6pp' },
          { label: 'Burn rate', value: '67 200 zł/m', icon: 'zap', trend: '7.3 mies.' },
        ].map(k => (
          <div className="fin-kpi" key={k.label}>
            <div className="fin-kpi-ico"><Icon name={k.icon} size={18} /></div>
            <div className="fin-kpi-body">
              <span className="fin-kpi-label">{k.label}</span>
              <span className="fin-kpi-val">{k.value}</span>
              <span className="fin-kpi-trend">{k.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Contractors View ───
function Contractors() {
  return (
    <>
      <div className="da-mhdr">
        <div className="da-mt">Kontrahenci</div>
        <button className="fin-big-btn pri"><Icon name="users" size={16} /> Dodaj kontrahenta</button>
      </div>
      <div className="fin-contractors">
        {contractors.map(c => (
          <div className="fin-contractor" key={c.nip}>
            <div className="fin-contractor-avatar">{c.name[0]}</div>
            <div className="fin-contractor-info">
              <span className="fin-contractor-name">{c.name}</span>
              <span className="fin-contractor-nip">NIP: {c.nip}</span>
            </div>
            <div className="fin-contractor-stats">
              <span className="fin-contractor-total">{c.total}</span>
              <span className="fin-contractor-count">{c.txCount} transakcji</span>
            </div>
            <span className={`badge ${c.status === 'Aktywny' ? 'ok' : c.status === 'Nowy' ? 'info' : 'warn'}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Main ───
export function FinanceDemo() {
  const [view, setView] = useState<View>('dashboard');

  return (
    <div className="da">
      <div className="da-side">
        <div className="da-stit" style={{ marginBottom: '1vh' }}>Panel</div>
        {navItems.map(item => (
          <button key={item.view} className={`da-nav${view === item.view ? ' on' : ''}`} onClick={() => setView(item.view)}>
            <Icon name={item.icon} size={16} strokeWidth={2} /> {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />

        <div style={{ padding: '0 1.2vw' }}>
          <div className="fin-side-card">
            <div className="fin-side-card-ico"><Icon name="bell" size={16} /></div>
            <div>
              <div className="fin-side-card-title">3 nowe alerty</div>
              <div className="fin-side-card-sub">Wymagają uwagi</div>
            </div>
          </div>
        </div>
      </div>

      <div className="da-main">
        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {view === 'dashboard' && <Dashboard go={setView} />}
            {view === 'transactions' && <Transactions />}
            {view === 'transfer' && <TransferFlow onDone={() => setView('dashboard')} />}
            {view === 'reports' && <Reports />}
            {view === 'contractors' && <Contractors />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
