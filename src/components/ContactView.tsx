import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import './ContactView.css';

const PHONE_DISPLAY = '571 399 932';
const SMS_URI = 'sms:+48571399932?body=Dzień dobry, proszę o kontakt w sprawie oprogramowania.';
const CONSULT_URL = 'https://letsautomate.pl/darmowa-konsultacja';

const keys = ['1','2','3','4','5','6','7','8','9','+','0','del'];

function formatPhone(raw: string): string {
  const clean = raw.replace(/[^0-9+]/g, '');
  if (!clean) return '';
  const m = clean.match(/^(\+?\d{0,2})(\d{0,3})(\d{0,3})(\d{0,3})(.*)$/);
  if (!m) return clean;
  return [m[1], m[2], m[3], m[4], m[5]].filter(Boolean).join(' ');
}

function countDigits(raw: string): number {
  // Count only the digits AFTER the +48 prefix
  const clean = raw.replace(/[^0-9+]/g, '');
  const withoutPrefix = clean.replace(/^\+48/, '');
  return withoutPrefix.replace(/[^0-9]/g, '').length;
}

export function ContactView() {
  const [typed, setTyped] = useState('+48');
  const [sent, setSent] = useState(false);

  const press = (d: string) => {
    if (sent) return;
    if (d === 'del') {
      setTyped(prev => prev.slice(0, -1));
      return;
    }
    setTyped(prev => prev + d);
  };

  const send = () => {
    setSent(true);

    fetch('https://hook.eu1.make.com/w6v0rygk3qgwy0lmqc3na4jr79vtvkqi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: typed }),
    }).catch(() => {});

    setTimeout(() => {
      setSent(false);
      setTyped('+48');
    }, 5000);
  };

  const display = formatPhone(typed) || '+48';
  const isReady = countDigits(typed) >= 9;

  return (
    <div className="cv">
      {/* Left — QR codes + brand */}
      <div className="cv-brand-col">
        <div className="cv-brand-top">
          <h2 className="cv-brand-headline">
            Zeskanuj i<br />porozmawiajmy
          </h2>
          <p className="cv-brand-sub">Wybierz wygodny sposób kontaktu</p>
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
              Przejdź do letsautomate.pl
            </span>
          </div>
        </div>

        <div className="cv-our-phone">
          <span className="cv-our-phone-hint">lub zapisz nasz numer, aby zadzwonić w dogodnym momencie</span>
          <span className="cv-our-phone-number">{PHONE_DISPLAY}</span>
        </div>
      </div>

      {/* Right — dialer or thank you */}
      <div className="cv-phone-col">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div className="cv-thank" key="thank"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
              <div className="cv-thank-ico">
                <Icon name="check-circle" size={44} strokeWidth={1.5} />
              </div>
              <h2 className="cv-thank-title">Dziękujemy!</h2>
              <p className="cv-thank-text">
                Zapisaliśmy Twój numer.<br />
                Oddzwonimy najszybciej jak to możliwe.
              </p>
              <div className="cv-thank-number">{display}</div>
            </motion.div>
          ) : (
            <motion.div className="cv-dialer-wrap" key="dialer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
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

              <button className={`cv-send-btn ${isReady ? '' : 'cv-send-btn--disabled'}`}
                onClick={isReady ? send : undefined}
                disabled={!isReady}>
                <Icon name="zap" size={18} strokeWidth={2} />
                Wyślij — oddzwonimy!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
