import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { Logo } from './Logo';
import './ContactView.css';

export function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || (!form.email && !form.phone)) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }, 4000);
  };

  return (
    <div className="cv">
      {/* Left — QR + info */}
      <div className="cv-left">
        <div className="cv-qr-card">
          <div className="cv-qr-frame">
            <QRCodeSVG
              value="https://www.letsautomate.pl"
              size={220}
              bgColor="transparent"
              fgColor="#0a0a0a"
              level="M"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <p className="cv-qr-hint">Zeskanuj kod, aby odwiedzić naszą stronę</p>
          <span className="cv-qr-url">www.letsautomate.pl</span>
        </div>

        <div className="cv-info">
          <div className="cv-info-row">
            <div className="cv-info-ico"><Icon name="globe" size={18} /></div>
            <div>
              <div className="cv-info-label">Strona WWW</div>
              <div className="cv-info-val">www.letsautomate.pl</div>
            </div>
          </div>
          <div className="cv-info-row">
            <div className="cv-info-ico" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
              <Icon name="map-pin" size={18} />
            </div>
            <div>
              <div className="cv-info-label">Siedziba</div>
              <div className="cv-info-val">Polska</div>
            </div>
          </div>
        </div>

        <div className="cv-brand">
          <Logo className="cv-brand-logo" />
        </div>
      </div>

      {/* Right — form */}
      <div className="cv-right">
        <div className="cv-form-card">
          <h2 className="cv-form-title">Zostaw kontakt</h2>
          <p className="cv-form-sub">Odezwiemy się do Ciebie w ciągu 24 godzin</p>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div className="cv-success"
                key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="cv-success-ico">
                  <Icon name="check-circle" size={40} strokeWidth={1.5} />
                </div>
                <h3>Dziękujemy!</h3>
                <p>Wiadomość została wysłana.<br />Skontaktujemy się wkrótce.</p>
              </motion.div>
            ) : (
              <motion.form className="cv-form" onSubmit={send}
                key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="cv-field">
                  <label className="cv-label">Imię i nazwisko *</label>
                  <input className="cv-input" type="text" placeholder="Jan Kowalski"
                    value={form.name} onChange={set('name')} required />
                </div>

                <div className="cv-row">
                  <div className="cv-field">
                    <label className="cv-label">E-mail</label>
                    <input className="cv-input" type="email" placeholder="jan@firma.pl"
                      value={form.email} onChange={set('email')} />
                  </div>
                  <div className="cv-field">
                    <label className="cv-label">Telefon</label>
                    <input className="cv-input" type="tel" placeholder="+48 600 000 000"
                      value={form.phone} onChange={set('phone')} />
                  </div>
                </div>

                <div className="cv-field">
                  <label className="cv-label">Wiadomość</label>
                  <textarea className="cv-input cv-textarea" placeholder="Czym jesteś zainteresowany?"
                    value={form.message} onChange={set('message')} rows={4} />
                </div>

                <button type="submit" className="cv-submit">
                  <Icon name="zap" size={16} strokeWidth={2} />
                  Wyślij wiadomość
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
