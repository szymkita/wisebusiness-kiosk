import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Icon } from './Icon';
import { Logo } from './Logo';
import './ContactView.css';

const SMS_URI = 'sms:+48515522824?body=Dzień dobry, proszę o kontakt w sprawie oprogramowania.';
const CONSULT_URL = 'https://letsautomate.pl/darmowa-konsultacja';

const keys = ['1','2','3','4','5','6','7','8','9','+','0','del'];

function formatPhone(raw: string): string {
  const clean = raw.replace(/[^0-9+]/g, '');
  if (!clean) return '';
  // Try formatting as +48 XXX XXX XXX
  const m = clean.match(/^(\+?\d{0,2})(\d{0,3})(\d{0,3})(\d{0,3})(.*)$/);
  if (!m) return clean;
  return [m[1], m[2], m[3], m[4], m[5]].filter(Boolean).join(' ');
}

export function ContactView() {
  const [typed, setTyped] = useState('+48');

  const press = (d: string) => {
    if (d === 'del') {
      setTyped(prev => prev.slice(0, -1));
      return;
    }
    setTyped(prev => prev + d);
  };

  const display = formatPhone(typed) || '+48';
  const hasNumber = typed.replace(/[^0-9]/g, '').length >= 9;

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

          <div className="cv-qr-divider" />

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
              Umów darmową konsultację
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
          <h2 className="cv-phone-title">Zostaw numer — oddzwonimy</h2>
        </div>

        <div className={`cv-phone-number ${typed.length > 3 ? 'cv-phone-number--typed' : ''}`}>
          {display}
        </div>

        <p className="cv-phone-sub">Wpisz swój numer telefonu</p>

        <div className="cv-dialer">
          {keys.map(d => (
            <button
              className={`cv-dial-key ${d === 'del' ? 'cv-dial-key--del' : ''} ${d === '+' ? 'cv-dial-key--plus' : ''}`}
              key={d}
              onClick={() => press(d)}>
              {d === 'del' ? (
                <Icon name="arrow-left" size={18} strokeWidth={2} />
              ) : (
                <span className="cv-dial-digit">{d}</span>
              )}
            </button>
          ))}
        </div>

        {hasNumber && (
          <button className="cv-send-btn">
            <Icon name="zap" size={18} strokeWidth={2} />
            Wyślij — oddzwonimy!
          </button>
        )}
      </div>
    </div>
  );
}
