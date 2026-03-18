import { QRCodeSVG } from 'qrcode.react';
import { Icon } from './Icon';
import { Logo } from './Logo';
import './ContactView.css';

const PHONE = '+48 515 522 824';
const SMS_URI = 'sms:+48515522824?body=Dzień dobry, proszę o kontakt w sprawie oprogramowania.';

const digits = ['1','2','3','4','5','6','7','8','9','*','0','#'];

export function ContactView() {
  return (
    <div className="cv">
      {/* Left — QR + brand */}
      <div className="cv-brand-col">
        <div className="cv-brand-top">
          <Logo className="cv-logo" />
          <p className="cv-brand-text">
            Pomagamy firmom<br />pracować mądrzej
          </p>
        </div>

        <div className="cv-qr-block">
          <div className="cv-qr-frame">
            <QRCodeSVG
              value={SMS_URI}
              size={200}
              bgColor="transparent"
              fgColor="#ffffff"
              level="M"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <span className="cv-qr-label">
            Zeskanuj — wyślemy gotowy SMS z prośbą o kontakt
          </span>
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

      {/* Right — phone display */}
      <div className="cv-phone-col">
        <div className="cv-phone-header">
          <Icon name="zap" size={18} strokeWidth={2} />
          <h2 className="cv-phone-title">Zadzwoń do nas</h2>
        </div>

        <div className="cv-phone-number">{PHONE}</div>
        <p className="cv-phone-sub">Odezwiemy się w ciągu 24 godzin</p>

        {/* Dialer-style grid */}
        <div className="cv-dialer">
          {digits.map(d => (
            <div className="cv-dial-key" key={d}>
              <span className="cv-dial-digit">{d}</span>
            </div>
          ))}
        </div>

        <div className="cv-phone-actions">
          <div className="cv-phone-action cv-phone-action--sms">
            <div className="cv-phone-action-ico">
              <Icon name="zap" size={20} strokeWidth={2} />
            </div>
            <div>
              <span className="cv-phone-action-title">Wyślij SMS</span>
              <span className="cv-phone-action-desc">Zeskanuj QR po lewej — automatycznie wyślesz wiadomość</span>
            </div>
          </div>
          <div className="cv-phone-action">
            <div className="cv-phone-action-ico cv-phone-action-ico--blue">
              <Icon name="globe" size={20} strokeWidth={2} />
            </div>
            <div>
              <span className="cv-phone-action-title">Odwiedź stronę</span>
              <span className="cv-phone-action-desc">www.letsautomate.pl</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
