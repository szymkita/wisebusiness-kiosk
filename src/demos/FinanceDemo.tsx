import { useState } from 'react';
import { Icon } from '../components/Icon';
import './demo.css';

const months = ['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'];
const revenue = [42,58,51,67,73,68,81,77,89,95,88,102];
const maxRev = Math.max(...revenue);

const accounts = [
  { name: 'Konto Główne', bal: '284 520,00 zł', spark: [30,45,38,52,48,60,55,68] },
  { name: 'Konto Oszczędnościowe', bal: '152 840,00 zł', spark: [20,22,25,28,30,33,36,40] },
  { name: 'Konto Walutowe (EUR)', bal: '€41 200,00', spark: [50,48,52,47,55,53,58,56] },
  { name: 'Konto Inwestycyjne', bal: '98 310,00 zł', spark: [10,18,15,28,22,35,30,42] },
];

const donutSegments = [
  { label: 'Przychody', pct: 42, color: '#00CD77' },
  { label: 'Koszty operacyjne', pct: 28, color: '#3b82f6' },
  { label: 'Podatki', pct: 15, color: '#f59e0b' },
  { label: 'Inwestycje', pct: 15, color: '#8b5cf6' },
];

const transactions = [
  { id: 'TX-8842', date: '15.03.2026', desc: 'Przelew od Klienta A', amount: '+12 400,00 zł', status: 'ok', statusText: 'Zaksięgowane' },
  { id: 'TX-8841', date: '15.03.2026', desc: 'Opłata za serwer AWS', amount: '-3 220,00 zł', status: 'warn', statusText: 'Oczekuje' },
  { id: 'TX-8840', date: '14.03.2026', desc: 'Faktura #1247 - Projekt X', amount: '+28 500,00 zł', status: 'ok', statusText: 'Zaksięgowane' },
  { id: 'TX-8839', date: '14.03.2026', desc: 'Wynagrodzenia - Marzec', amount: '-45 800,00 zł', status: 'ok', statusText: 'Zaksięgowane' },
  { id: 'TX-8838', date: '13.03.2026', desc: 'Przelew od Klienta B', amount: '+8 900,00 zł', status: 'ok', statusText: 'Zaksięgowane' },
  { id: 'TX-8837', date: '13.03.2026', desc: 'Subskrypcja narzędzi SaaS', amount: '-1 450,00 zł', status: 'err', statusText: 'Odrzucone' },
  { id: 'TX-8836', date: '12.03.2026', desc: 'Refaktura - Hosting', amount: '+4 200,00 zł', status: 'ok', statusText: 'Zaksięgowane' },
  { id: 'TX-8835', date: '12.03.2026', desc: 'Materiały biurowe', amount: '-890,00 zł', status: 'ok', statusText: 'Zaksięgowane' },
];

const navItems = [
  { icon: 'home', label: 'Pulpit', active: true },
  { icon: 'bar-chart', label: 'Raporty' },
  { icon: 'dollar-sign', label: 'Transakcje' },
  { icon: 'pie-chart', label: 'Budżety' },
  { icon: 'users', label: 'Kontrahenci' },
  { icon: 'settings', label: 'Ustawienia' },
];

const quickActions = [
  { icon: 'dollar-sign', label: 'Nowy przelew' },
  { icon: 'bar-chart', label: 'Generuj raport' },
  { icon: 'users', label: 'Dodaj kontrahenta' },
  { icon: 'pie-chart', label: 'Planuj budżet' },
];

function Sparkline({ data, color = 'var(--green)' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 60;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'clamp(18px,1.8vh,28px)' }} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function DonutChart() {
  let offset = 0;
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <div className="da-donut">
      <svg viewBox="0 0 120 120" style={{ width: 'clamp(80px,8vw,140px)', height: 'clamp(80px,8vw,140px)' }}>
        {donutSegments.map((seg, i) => {
          const dash = (seg.pct / 100) * c;
          const gap = c - dash;
          const o = offset;
          offset += dash;
          return (
            <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={seg.color} strokeWidth="14"
              strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-o}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
          );
        })}
        <text x="60" y="58" textAnchor="middle" fill="var(--text)" fontSize="14" fontWeight="800">576K</text>
        <text x="60" y="72" textAnchor="middle" fill="var(--text3)" fontSize="8" fontWeight="600">PLN</text>
      </svg>
      <div style={{ marginLeft: '1vw' }}>
        {donutSegments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.4vw', marginBottom: '.3vh' }}>
            <div style={{ width: 'clamp(6px,.5vw,10px)', height: 'clamp(6px,.5vw,10px)', borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: 'clamp(8px,.55vw,11px)', color: 'var(--text2)' }}>{seg.label} ({seg.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinanceDemo() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="da">
      <div className="da-side">
        <div className="da-stit" style={{ marginBottom: '1vh' }}>Nawigacja</div>
        {navItems.map((item, i) => (
          <button key={i} className={`da-nav${activeNav === i ? ' on' : ''}`} onClick={() => setActiveNav(i)}>
            <Icon name={item.icon} size={14} strokeWidth={2} /> {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div className="da-stit" style={{ marginTop: '1.5vh' }}>Szybkie akcje</div>
        {quickActions.map((qa, i) => (
          <button key={i} className="da-qa">
            <Icon name={qa.icon} size={12} strokeWidth={2} /> {qa.label}
          </button>
        ))}
        <div style={{ padding: '1vh 1.2vw', marginTop: '1vh' }}>
          <div style={{ background: 'var(--green-light)', borderRadius: 'var(--rs)', padding: '1vh 1vw' }}>
            <div style={{ fontSize: 'clamp(9px,.55vw,11px)', fontWeight: 700, color: 'var(--accent)', marginBottom: '.3vh' }}>Powiadomienia</div>
            <div style={{ fontSize: 'clamp(8px,.5vw,10px)', color: 'var(--text2)' }}>3 nowe alerty wymagają uwagi</div>
          </div>
        </div>
      </div>

      <div className="da-main">
        <div className="da-mhdr">
          <div>
            <div className="da-mt">Panel Finansowy</div>
            <div className="da-ms">Przegląd stanu finansów firmy &bull; Marzec 2026</div>
          </div>
          <div style={{ display: 'flex', gap: '.6vw' }}>
            <button className="da-btn sec"><Icon name="bell" size={12} strokeWidth={2} /> <span className="da-notif" style={{ position: 'relative' }}>Alerty</span></button>
            <button className="da-btn pri"><Icon name="bar-chart" size={12} strokeWidth={2} /> Raport</button>
          </div>
        </div>

        <div className="da-stats">
          <div className="da-stat">
            <div className="da-stat-l">Przychody (mies.)</div>
            <div className="da-stat-v">102 400 zł</div>
            <div className="da-stat-c pos">+15.9% vs poprz.</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Koszty (mies.)</div>
            <div className="da-stat-v">67 200 zł</div>
            <div className="da-stat-c neg">+4.2% vs poprz.</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Zysk netto</div>
            <div className="da-stat-v">35 200 zł</div>
            <div className="da-stat-c pos">+34.5% vs poprz.</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Saldo łącznie</div>
            <div className="da-stat-v">576 870 zł</div>
            <div className="da-stat-c pos">+8.1% vs poprz.</div>
          </div>
        </div>

        <div className="da-accounts">
          {accounts.map((acc, i) => (
            <div className="da-account" key={i}>
              <div className="da-account-name">{acc.name}</div>
              <div className="da-account-bal">{acc.bal}</div>
              <Sparkline data={acc.spark} />
            </div>
          ))}
        </div>

        <div className="da-cols da-section">
          <div className="da-chart">
            <div className="da-cht">Przychody miesięczne (tys. PLN)</div>
            <div className="da-bars">
              {revenue.map((v, i) => (
                <div key={i} className="da-bar"
                  style={{ height: `${(v / maxRev) * 100}%`, background: i === 11 ? 'var(--green)' : 'var(--green-mid)' }}>
                  <span>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="da-chart">
            <div className="da-cht">Struktura wydatków</div>
            <DonutChart />
          </div>
        </div>

        <div className="da-section">
          <div className="da-section-title">Ostatnie transakcje</div>
          <div className="da-tbl">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Opis</th>
                  <th>Kwota</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{tx.id}</td>
                    <td style={{ color: 'var(--text2)' }}>{tx.date}</td>
                    <td>{tx.desc}</td>
                    <td style={{ fontWeight: 700, color: tx.amount.startsWith('+') ? 'var(--accent)' : 'var(--text)' }}>{tx.amount}</td>
                    <td><span className={`badge ${tx.status}`}>{tx.statusText}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
