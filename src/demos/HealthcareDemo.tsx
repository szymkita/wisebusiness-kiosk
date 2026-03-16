import { useState } from 'react';
import { Icon } from '../components/Icon';
import './demo.css';

const navItems = [
  { icon: 'home', label: 'Pulpit', active: true },
  { icon: 'users', label: 'Pacjenci' },
  { icon: 'clock', label: 'Wizyty' },
  { icon: 'activity', label: 'Monitoring' },
  { icon: 'shield', label: 'Recepty' },
  { icon: 'settings', label: 'Ustawienia' },
];

const departments = [
  { name: 'Kardiologia', patients: 24, beds: 30, color: '#ef4444' },
  { name: 'Neurologia', patients: 18, beds: 22, color: '#3b82f6' },
  { name: 'Ortopedia', patients: 15, beds: 20, color: '#f59e0b' },
  { name: 'Chirurgia', patients: 28, beds: 35, color: '#00CD77' },
  { name: 'Interna', patients: 32, beds: 40, color: '#8b5cf6' },
];

const vitals = [
  { label: 'Tętno', value: '72', unit: 'BPM', color: '#ef4444' },
  { label: 'Ciśnienie', value: '120/80', unit: 'mmHg', color: '#3b82f6' },
  { label: 'SpO₂', value: '98', unit: '%', color: '#00CD77' },
  { label: 'Temp.', value: '36.6', unit: '°C', color: '#f59e0b' },
  { label: 'Glukoza', value: '95', unit: 'mg/dL', color: '#8b5cf6' },
  { label: 'BMI', value: '23.4', unit: 'kg/m²', color: '#64748b' },
];

const appointments = [
  { time: '08:00', patient: 'Maria Kowalska', type: 'Kontrola', doctor: 'dr Nowak', dept: 'Kardiologia', status: 'ok', statusText: 'Zakończona' },
  { time: '08:30', patient: 'Jan Wiśniewski', type: 'Badanie EKG', doctor: 'dr Nowak', dept: 'Kardiologia', status: 'ok', statusText: 'Zakończona' },
  { time: '09:15', patient: 'Anna Zielińska', type: 'Konsultacja', doctor: 'dr Kowalczyk', dept: 'Neurologia', status: 'ok', statusText: 'Zakończona' },
  { time: '10:00', patient: 'Piotr Dąbrowski', type: 'USG', doctor: 'dr Lewandowski', dept: 'Interna', status: 'warn', statusText: 'W trakcie' },
  { time: '10:45', patient: 'Katarzyna Szymańska', type: 'Rehabilitacja', doctor: 'dr Wójcik', dept: 'Ortopedia', status: 'info', statusText: 'Oczekuje' },
  { time: '11:30', patient: 'Tomasz Mazur', type: 'Konsultacja', doctor: 'dr Nowak', dept: 'Kardiologia', status: 'info', statusText: 'Oczekuje' },
  { time: '12:00', patient: 'Ewa Krawczyk', type: 'Badanie krwi', doctor: 'dr Kowalczyk', dept: 'Interna', status: 'info', statusText: 'Oczekuje' },
  { time: '13:15', patient: 'Robert Jankowski', type: 'Operacja', doctor: 'dr Lewandowski', dept: 'Chirurgia', status: 'err', statusText: 'Odwołana' },
];

export function HealthcareDemo() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="da">
      <div className="da-side">
        <div className="da-stit" style={{ marginBottom: '1vh' }}>System</div>
        {navItems.map((item, i) => (
          <button key={i} className={`da-nav${activeNav === i ? ' on' : ''}`} onClick={() => setActiveNav(i)}>
            <Icon name={item.icon} size={14} strokeWidth={2} /> {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div className="da-stit" style={{ marginTop: '1.5vh' }}>Oddziały</div>
        <div style={{ padding: '0 1.2vw' }}>
          {departments.map((dept, i) => (
            <div key={i} style={{ padding: '.6vh 0', borderBottom: i < departments.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.4vw' }}>
                  <div style={{ width: 'clamp(6px,.5vw,8px)', height: 'clamp(6px,.5vw,8px)', borderRadius: '50%', background: dept.color }} />
                  <span style={{ fontSize: 'clamp(10px,.65vw,13px)', fontWeight: 600 }}>{dept.name}</span>
                </div>
                <span style={{ fontSize: 'clamp(9px,.55vw,11px)', color: 'var(--text2)' }}>{dept.patients}/{dept.beds}</span>
              </div>
              <div className="da-progress" style={{ marginTop: '.3vh' }}>
                <div className="da-progress-fill" style={{ width: `${(dept.patients / dept.beds) * 100}%`, background: dept.color }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '1vh 1.2vw', marginTop: '1vh' }}>
          <div style={{ background: 'rgba(239,68,68,.08)', borderRadius: 'var(--rs)', padding: '1vh 1vw' }}>
            <div style={{ fontSize: 'clamp(9px,.55vw,11px)', fontWeight: 700, color: '#dc2626', marginBottom: '.3vh' }}>Alert</div>
            <div style={{ fontSize: 'clamp(8px,.5vw,10px)', color: 'var(--text2)' }}>2 pacjentów wymaga pilnej konsultacji</div>
          </div>
        </div>
      </div>

      <div className="da-main">
        <div className="da-mhdr">
          <div>
            <div className="da-mt">System Medyczny</div>
            <div className="da-ms">Panel lekarza &bull; 16 marca 2026</div>
          </div>
          <div style={{ display: 'flex', gap: '.6vw' }}>
            <button className="da-btn sec"><Icon name="clock" size={12} strokeWidth={2} /> Harmonogram</button>
            <button className="da-btn pri"><Icon name="users" size={12} strokeWidth={2} /> Nowy pacjent</button>
          </div>
        </div>

        <div className="da-stats">
          <div className="da-stat">
            <div className="da-stat-l">Pacjenci (dziś)</div>
            <div className="da-stat-v">117</div>
            <div className="da-stat-c pos">+8 nowych</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Wizyty (dziś)</div>
            <div className="da-stat-v">42</div>
            <div className="da-stat-c pos">14 zakończonych</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Łóżka zajęte</div>
            <div className="da-stat-v">79.6%</div>
            <div className="da-stat-c neg">+3.2pp vs wczoraj</div>
          </div>
          <div className="da-stat">
            <div className="da-stat-l">Czas oczekiwania</div>
            <div className="da-stat-v">18 min</div>
            <div className="da-stat-c pos">-5 min vs wczoraj</div>
          </div>
        </div>

        <div className="da-patient">
          <div className="da-patient-avatar">PD</div>
          <div className="da-patient-info">
            <div className="da-patient-name">Piotr Dąbrowski</div>
            <div className="da-patient-meta">Wiek: 54 lata &bull; PESEL: 72031XXXXX &bull; Grupa krwi: A+ &bull; Oddział: Interna</div>
          </div>
          <div style={{ display: 'flex', gap: '.5vw' }}>
            <button className="da-btn sec" style={{ fontSize: 'clamp(9px,.55vw,11px)' }}><Icon name="book-open" size={11} strokeWidth={2} /> Historia</button>
            <button className="da-btn pri" style={{ fontSize: 'clamp(9px,.55vw,11px)' }}><Icon name="activity" size={11} strokeWidth={2} /> Wyniki</button>
          </div>
        </div>

        <div className="da-section">
          <div className="da-section-title">Parametry życiowe - bieżący pacjent</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 'min(1vh,10px)' }}>
            {vitals.map((v, i) => (
              <div className="da-vital" key={i}>
                <div className="da-vital-label">{v.label}</div>
                <div className="da-vital-val" style={{ color: v.color }}>{v.value}</div>
                <div className="da-vital-unit">{v.unit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="da-section">
          <div className="da-section-title">Wizyty - dzisiejszy harmonogram</div>
          <div className="da-tbl">
            <table>
              <thead>
                <tr>
                  <th>Godzina</th>
                  <th>Pacjent</th>
                  <th>Typ wizyty</th>
                  <th>Lekarz</th>
                  <th>Oddział</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{apt.time}</td>
                    <td style={{ fontWeight: 600 }}>{apt.patient}</td>
                    <td>{apt.type}</td>
                    <td style={{ color: 'var(--text2)' }}>{apt.doctor}</td>
                    <td style={{ color: 'var(--text2)' }}>{apt.dept}</td>
                    <td><span className={`badge ${apt.status}`}>{apt.statusText}</span></td>
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
