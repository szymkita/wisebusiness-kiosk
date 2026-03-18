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
      {/* Left column — brand + QR */}
      <div className="cv-brand-col">
        <div className="cv-brand-top">
          <Logo className="cv-logo" />
          <p className="cv-brand-text">
            Tworzymy nowoczesne<br />oprogramowanie dla biznesu
          </p>
        </div>

        <div className="cv-qr-block">
          <div className="cv-qr-frame">
            <QRCodeSVG
              value="https://www.letsautomate.pl"
              size={180}
              bgColor="transparent"
              fgColor="#ffffff"
              level="M"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <span className="cv-qr-label">Zeskanuj, aby odwiedzić stronę</span>
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

      {/* Right column — form */}
      <div className="cv-form-col">
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
              <div className="cv-form-header">
                <h2 className="cv-form-title">Zostaw kontakt</h2>
                <p className="cv-form-sub">Odezwiemy się w ciągu 24 godzin</p>
              </div>

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
                  value={form.message} onChange={set('message')} rows={3} />
              </div>

              <button type="submit" className="cv-submit">
                <Icon name="zap" size={15} strokeWidth={2} />
                Wyślij wiadomość
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
