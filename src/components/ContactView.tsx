import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Icon } from './Icon';
import { Logo } from './Logo';
import './ContactView.css';

const TARGET_PHONE = '+48 515 522 824';
const SMS_URI = 'sms:+48515522824?body=Dzień dobry, proszę o kontakt w sprawie oprogramowania.';
const CONSULT_URL = 'https://letsautomate.pl/darmowa-konsultacja';

const keys = ['1','2','3','4','5','6','7','8','9','*','0','#'];

export function ContactView() {
  const [typed, setTyped] = useState('');

  const press = (d: string) => {
    setTyped(prev => prev + d);
  };

  const clear = () => setTyped('');

  const backspace = () => setTyped(prev => prev.slice(0, -1));

  const formatted = typed
    ? typed.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4').replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
    : TARGET_PHONE;

  return (
    <div className="cv">
      {/* Left — QR codes + brand */}
      <div className="cv-brand-col">
        <div className="cv-brand-top">
          <Logo className="cv-logo" />
          <p className="cv-brand-text">
            Pomagamy firmom<br />pracować mądrzej
          </p>
        </div>

        <div className="cv-qr-pair">
          <div className="cv-qr-item">
            <div className="cv-qr-frame">
              <QRCodeSVG
                value={SMS_URI}
                size={180}
                bgColor="transparent"
                fgColor="#ffffff"
                level="M"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <span className="cv-qr-label">
              <Icon name="zap" size={12} strokeWidth={2} />
              Wyślij SMS z prośbą o kontakt
            </span>
          </div>

          <div className="cv-qr-item">
            <div className="cv-qr-frame">
              <QRCodeSVG
                value={CONSULT_URL}
                size={180}
                bgColor="transparent"
                fgColor="#ffffff"
                level="M"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <span className="cv-qr-label">
              <Icon name="globe" size={12} strokeWidth={2} />
              Darmowa konsultacja online
            </span>
          </div>
        </div>

        <div className="cv-info-items">
          <div className="cv-info-item">
            <Icon name="globe" size={14} />
            <span>www.letsautomate.pl</span>
          </div>
          <div className="cv-info-item">
            <Icon name="map-pin" size={14} />
            <span>Polska</span>
          </div>
        </div>
      </div>

      {/* Right — dialer */}
      <div className="cv-phone-col">
        <div className="cv-phone-header">
          <Icon name="zap" size={18} strokeWidth={2} />
          <h2 className="cv-phone-title">Zadzwoń do nas</h2>
        </div>

        <div className={`cv-phone-number ${typed ? 'cv-phone-number--typed' : ''}`}>
          {formatted}
        </div>
        {typed ? (
          <div className="cv-phone-controls">
            <button className="cv-phone-ctrl" onClick={backspace}>
              <Icon name="arrow-left" size={14} strokeWidth={2} /> Cofnij
            </button>
            <button className="cv-phone-ctrl cv-phone-ctrl--clear" onClick={clear}>
              Wyczyść
            </button>
          </div>
        ) : (
          <p className="cv-phone-sub">Wpisz numer lub zeskanuj QR kod</p>
        )}

        <div className="cv-dialer">
          {keys.map(d => (
            <button className="cv-dial-key" key={d} onClick={() => press(d)}>
              <span className="cv-dial-digit">{d}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
