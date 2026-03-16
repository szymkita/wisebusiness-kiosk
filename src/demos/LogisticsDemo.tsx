import { useState } from 'react';
import { Icon } from '../components/Icon';
import './demo.css';

const navItems = [
  { icon: 'home', label: 'Pulpit', active: true },
  { icon: 'truck', label: 'Przesyłki' },
  { icon: 'map-pin', label: 'Mapa' },
  { icon: 'package', label: 'Magazyn' },
  { icon: 'users', label: 'Kierowcy' },
  { icon: 'settings', label: 'Ustawienia' },
];

const fleetStats = [
  { label: 'Aktywne', value: 24, color: 'var(--accent)' },
  { label: 'W trasie', value: 18, color: '#3b82f6' },
  { label: 'Postój', value: 4, color: '#f59e0b' },
  { label: 'Serwis', value: 2, color: '#ef4444' },
];

const shipments = [
  { id: 'SH-4421', from: 'Warszawa', to: 'Kraków', driver: 'Jan Kowalski', progress: 82, status: 'ok', statusText: 'W trasie', eta: '14:30' },
  { id: 'SH-4420', from: 'Gdańsk', to: 'Poznań', driver: 'Anna Nowak', progress: 45, status: 'ok', statusText: 'W trasie', eta: '17:15' },
  { id: 'SH-4419', from: 'Wrocław', to: 'Łódź', driver: 'Piotr Wiśniewski', progress: 100, status: 'ok', statusText: 'Dostarczono', eta: '-' },
  { id: 'SH-4418', from: 'Katowice', to: 'Warszawa', driver: 'Marek Zieliński', progress: 15, status: 'warn', statusText: 'Opóźnienie', eta: '20:45' },
  { id: 'SH-4417', from: 'Lublin', to: 'Gdańsk', driver: 'Tomasz Lewandowski', progress: 67, status: 'ok', statusText: 'W trasie', eta: '16:00' },
  { id: 'SH-4416', from: 'Szczecin', to: 'Wrocław', driver: 'Kamil Dąbrowski', progress: 0, status: 'info', statusText: 'Zaplanowano', eta: '08:00' },
  { id: 'SH-4415', from: 'Poznań', to: 'Katowice', driver: 'Robert Szymański', progress: 93, status: 'ok', statusText: 'W trasie', eta: '13:00' },
  { id: 'SH-4414', from: 'Kraków', to: 'Lublin', driver: 'Łukasz Wójcik', progress: 0, status: 'err', statusText: 'Anulowano', eta: '-' },
];

const mapDots = [
  { cx: '30%', cy: '35%', label: 'WAW' },
  { cx: '22%', cy: '60%', label: 'KRK' },
  { cx: '45%', cy: '18%', label: 'GDA' },
  { cx: '18%', cy: '40%', label: 'POZ' },
  { cx: '35%', cy: '55%', label: 'WRO' },
  { cx: '55%', cy: '42%', label: 'LUB' },
  { cx: '15%', cy: '50%', label: 'KAT' },
  { cx: '28%', cy: '45%', label: 'LOD' },
];

const routes = [
  { x1: '30%', y1: '35%', x2: '22%', y2: '60%' },
  { x1: '45%', y1: '18%', x2: '18%', y2: '40%' },
  { x1: '35%', y1: '55%', x2: '28%', y2: '45%' },
  { x1: '15%', y1: '50%', x2: '30%', y2: '35%' },
  { x1: '55%', y1: '42%', x2: '45%', y2: '18%' },
];

export function LogisticsDemo() {
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
        <div className="da-stit" style={{ marginTop: '1.5vh' }}>Flota pojazdów</div>
        <div style={{ padding: '0 1.2vw' }}>
          {fleetStats.map((fs, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.5vh 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.4vw' }}>
                <div style={{ width: 'clamp(6px,.5vw,8px)', height: 'clamp(6px,.5vw,8px)', borderRadius: '50%', background: fs.color }} />
                <span style={{ fontSize: 'clamp(10px,.65vw,13px)', color: 'var(--text2)' }}>{fs.label}</span>
              </div>
              <span style={{ fontSize: 'clamp(12px,.85vw,16px)', fontWeight: 800, color: fs.color }}>{fs.value}</span>
            </div>
          ))}
          <div style={{ marginTop: '1vh', padding: '1vh 0', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 'clamp(9px,.55vw,11px)', color: 'var(--text3)', fontWeight: 600, marginBottom: '.3vh' }}>ŁĄCZNY DYSTANS DZIŚ</div>
            <div style={{ fontSize: 'clamp(14px,1.1vw,20px)', fontWeight: 800 }}>4 287 km</div>
          </div>
          <div style={{ marginTop: '.5vh' }}>
            <div style={{ fontSize: 'clamp(9px,.55vw,11px)', color: 'var(--text3)', fontWeight: 600, marginBottom: '.3vh' }}>PALIWO ŁĄCZNIE</div>
            <div style={{ fontSize: 'clamp(14px,1.1vw,20px)', fontWeight: 800 }}>1 842 L</div>
          </div>
        </div>
      </div>

      <div className="da-main">
        <div className="da-mhdr">
          <div>
            <div className="da-mt">Zarządzanie Logistyką</div>
            <div className="da-ms">Śledzenie przesyłek i floty &bull; 16 marca 2026</div>
          </div>
          <div style={{ display: 'flex', gap: '.6vw' }}>
            <button className="da-btn sec"><Icon name="map-pin" size={12} strokeWidth={2} /> Mapa</button>
            <button className="da-btn pri"><Icon name="package" size={12} strokeWidth={2} /> Nowa przesyłka</button>
          </div>
        </div>

        <div className="da-stats">
          <div className="da-stat">
            <div className="da-stat-l">Aktywne przesyłki</div>
            <div className="da-stat-v">142</div>
            <div className="da-stat-c pos">+12 dziś</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Dostarczono (tyg.)</div>
            <div className="da-stat-v">487</div>
            <div className="da-stat-c pos">+8.3% vs poprz.</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Śr. czas dostawy</div>
            <div className="da-stat-v">4.2h</div>
            <div className="da-stat-c pos">-12min vs poprz.</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Opóźnienia</div>
            <div className="da-stat-v">3</div>
            <div className="da-stat-c neg">+1 vs wczoraj</div>
          </div>
        </div>

        <div className="da-map da-section">
          <div className="da-cht">Mapa przesyłek na żywo</div>
          <svg viewBox="0 0 100 70" style={{ width: '100%', height: 'min(22vh,240px)' }}>
            <rect x="5" y="5" width="90" height="60" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth=".3" />
            {/* Grid */}
            {[20, 35, 50, 65, 80].map(x => (
              <line key={`gx${x}`} x1={`${x}%`} y1="8%" x2={`${x}%`} y2="92%" stroke="var(--border)" strokeWidth=".15" />
            ))}
            {[25, 45, 65].map(y => (
              <line key={`gy${y}`} x1="8%" y1={`${y}%`} x2="92%" y2={`${y}%`} stroke="var(--border)" strokeWidth=".15" />
            ))}
            {/* Routes */}
            {routes.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                stroke="var(--green-mid)" strokeWidth=".4" strokeDasharray="1.5 1" opacity=".6" />
            ))}
            {/* City dots */}
            {mapDots.map((d, i) => (
              <g key={i}>
                <circle cx={d.cx} cy={d.cy} r="1.8" fill="var(--green)" opacity=".8">
                  <animate attributeName="r" values="1.8;2.4;1.8" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={d.cx} cy={d.cy} r="3.5" fill="var(--green)" opacity=".15">
                  <animate attributeName="r" values="3.5;5;3.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <text x={d.cx} y={`calc(${d.cy} - 4%)`} textAnchor="middle" fill="var(--text2)"
                  fontSize="2.5" fontWeight="700" dy="-1">{d.label}</text>
              </g>
            ))}
            {/* Moving dots on routes */}
            {routes.slice(0, 3).map((r, i) => (
              <circle key={`mv${i}`} r="1" fill="#3b82f6">
                <animateMotion dur={`${4 + i}s`} repeatCount="indefinite"
                  path={`M${parseFloat(r.x1)},${parseFloat(r.y1)} L${parseFloat(r.x2)},${parseFloat(r.y2)}`} />
              </circle>
            ))}
          </svg>
        </div>

        <div className="da-section">
          <div className="da-section-title">Przesyłki</div>
          <div className="da-tbl">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Trasa</th>
                  <th>Kierowca</th>
                  <th>Postęp</th>
                  <th>ETA</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((sh, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{sh.id}</td>
                    <td>{sh.from} → {sh.to}</td>
                    <td style={{ color: 'var(--text2)' }}>{sh.driver}</td>
                    <td style={{ width: '15%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5vw' }}>
                        <div className="da-progress" style={{ flex: 1 }}>
                          <div className="da-progress-fill" style={{
                            width: `${sh.progress}%`,
                            background: sh.progress === 100 ? 'var(--green)' : sh.status === 'warn' ? '#f59e0b' : sh.status === 'err' ? '#ef4444' : '#3b82f6'
                          }} />
                        </div>
                        <span style={{ fontSize: 'clamp(8px,.52vw,11px)', fontWeight: 700, color: 'var(--text2)', minWidth: '2.5vw' }}>{sh.progress}%</span>
                      </div>
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{sh.eta}</td>
                    <td><span className={`badge ${sh.status}`}>{sh.statusText}</span></td>
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
