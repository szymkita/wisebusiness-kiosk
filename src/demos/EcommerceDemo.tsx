import { useState } from 'react';
import { Icon } from '../components/Icon';
import './demo.css';

const navItems = [
  { icon: 'home', label: 'Pulpit', active: true },
  { icon: 'shopping-cart', label: 'Zamówienia' },
  { icon: 'package', label: 'Produkty' },
  { icon: 'users', label: 'Klienci' },
  { icon: 'bar-chart', label: 'Analityka' },
  { icon: 'settings', label: 'Ustawienia' },
];

const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
const ordersHourly = [12,28,35,42,58,67,54,71,63,48,38,22];
const maxOrders = Math.max(...ordersHourly);

const bestsellers = [
  { name: 'Laptop ProBook X5', sales: 342, revenue: '1 368 000 zł' },
  { name: 'Monitor UltraWide 34"', sales: 287, revenue: '574 000 zł' },
  { name: 'Klawiatura MechPro K1', sales: 521, revenue: '182 350 zł' },
  { name: 'Słuchawki ANC Pro', sales: 445, revenue: '311 500 zł' },
  { name: 'Mysz ErgoFit X2', sales: 398, revenue: '119 400 zł' },
  { name: 'Webcam HD 4K', sales: 276, revenue: '138 000 zł' },
];

const orders = [
  { id: 'ORD-9912', date: '16.03.2026', customer: 'Firma ABC Sp. z o.o.', items: 5, total: '12 450,00 zł', status: 'ok', statusText: 'Zrealizowane' },
  { id: 'ORD-9911', date: '16.03.2026', customer: 'Jan Kowalski', items: 2, total: '3 899,00 zł', status: 'warn', statusText: 'W realizacji' },
  { id: 'ORD-9910', date: '16.03.2026', customer: 'Tech Solutions Ltd.', items: 12, total: '45 200,00 zł', status: 'info', statusText: 'Nowe' },
  { id: 'ORD-9909', date: '15.03.2026', customer: 'Anna Nowak', items: 1, total: '1 299,00 zł', status: 'ok', statusText: 'Zrealizowane' },
  { id: 'ORD-9908', date: '15.03.2026', customer: 'DataCorp S.A.', items: 8, total: '28 800,00 zł', status: 'ok', statusText: 'Zrealizowane' },
  { id: 'ORD-9907', date: '15.03.2026', customer: 'Paweł Wiśniewski', items: 3, total: '5 670,00 zł', status: 'err', statusText: 'Zwrot' },
  { id: 'ORD-9906', date: '14.03.2026', customer: 'Smart Office Sp.j.', items: 15, total: '62 100,00 zł', status: 'ok', statusText: 'Zrealizowane' },
  { id: 'ORD-9905', date: '14.03.2026', customer: 'Marta Zielińska', items: 1, total: '449,00 zł', status: 'warn', statusText: 'W realizacji' },
];

export function EcommerceDemo() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="da">
      <div className="da-side">
        <div className="da-stit" style={{ marginBottom: '1vh' }}>Sklep</div>
        {navItems.map((item, i) => (
          <button key={i} className={`da-nav${activeNav === i ? ' on' : ''}`} onClick={() => setActiveNav(i)}>
            <Icon name={item.icon} size={14} strokeWidth={2} /> {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '0 1.2vw' }}>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1vh', marginTop: '1vh' }}>
            <div className="da-stit">Konwersja dziś</div>
            <div style={{ fontSize: 'clamp(20px,1.8vw,32px)', fontWeight: 800, color: 'var(--accent)', marginTop: '.3vh' }}>4.7%</div>
            <div style={{ fontSize: 'clamp(9px,.55vw,11px)', color: 'var(--text3)', marginTop: '.2vh' }}>+0.3pp vs wczoraj</div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1vh', marginTop: '1vh' }}>
            <div className="da-stit">Koszyk śr.</div>
            <div style={{ fontSize: 'clamp(16px,1.3vw,26px)', fontWeight: 800, marginTop: '.3vh' }}>487 zł</div>
            <div style={{ fontSize: 'clamp(9px,.55vw,11px)', color: 'var(--text3)', marginTop: '.2vh' }}>+12.4% vs poprz. tydz.</div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1vh', marginTop: '1vh' }}>
            <div className="da-stit">Odwiedziny dziś</div>
            <div style={{ fontSize: 'clamp(16px,1.3vw,26px)', fontWeight: 800, marginTop: '.3vh' }}>8 412</div>
            <div style={{ fontSize: 'clamp(9px,.55vw,11px)', color: 'var(--text3)', marginTop: '.2vh' }}>Peak: 13:00–14:00</div>
          </div>
        </div>
      </div>

      <div className="da-main">
        <div className="da-mhdr">
          <div>
            <div className="da-mt">Platforma E-commerce</div>
            <div className="da-ms">Sprzedaż i zamówienia &bull; 16 marca 2026</div>
          </div>
          <div style={{ display: 'flex', gap: '.6vw' }}>
            <button className="da-btn sec"><Icon name="bar-chart" size={12} strokeWidth={2} /> Raport</button>
            <button className="da-btn pri"><Icon name="package" size={12} strokeWidth={2} /> Dodaj produkt</button>
          </div>
        </div>

        <div className="da-stats">
          <div className="da-stat">
            <div className="da-stat-l">Zamówienia (dziś)</div>
            <div className="da-stat-v">538</div>
            <div className="da-stat-c pos">+18.2% vs wczoraj</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Przychód (dziś)</div>
            <div className="da-stat-v">159 867 zł</div>
            <div className="da-stat-c pos">+22.4% vs wczoraj</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Produkty aktywne</div>
            <div className="da-stat-v">1 247</div>
            <div className="da-stat-c pos">+32 nowe (tyg.)</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Zwroty (mies.)</div>
            <div className="da-stat-v">2.1%</div>
            <div className="da-stat-c pos">-0.4pp vs poprz.</div>
          </div>
        </div>

        <div className="da-cols da-section">
          <div className="da-chart">
            <div className="da-cht">Zamówienia wg godziny (dziś)</div>
            <div className="da-bars">
              {ordersHourly.map((v, i) => (
                <div key={i} className="da-bar"
                  style={{ height: `${(v / maxOrders) * 100}%`, background: v === maxOrders ? '#f59e0b' : 'rgba(245,158,11,.4)' }}>
                  <span>{hours[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="da-best">
            <div className="da-cht">Bestsellery (marzec)</div>
            {bestsellers.map((item, i) => (
              <div className="da-best-item" key={i}>
                <div className="da-best-rank">{i + 1}</div>
                <div className="da-best-info">
                  <div className="da-best-name">{item.name}</div>
                  <div className="da-best-sales">{item.sales} szt. sprzedanych</div>
                </div>
                <div className="da-best-rev">{item.revenue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="da-section">
          <div className="da-section-title">Ostatnie zamówienia</div>
          <div className="da-tbl">
            <table>
              <thead>
                <tr>
                  <th>Nr zamówienia</th>
                  <th>Data</th>
                  <th>Klient</th>
                  <th>Pozycje</th>
                  <th>Wartość</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{ord.id}</td>
                    <td style={{ color: 'var(--text2)' }}>{ord.date}</td>
                    <td>{ord.customer}</td>
                    <td style={{ textAlign: 'center' }}>{ord.items}</td>
                    <td style={{ fontWeight: 700 }}>{ord.total}</td>
                    <td><span className={`badge ${ord.status}`}>{ord.statusText}</span></td>
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
