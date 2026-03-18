import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { industries } from '../data/industries';
import './IndustryPage.css';

export function IndustryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = industries[id || ''];

  if (!data) {
    return (
      <div className="ind">
        <div className="ind-hdr">
          <button className="ind-back" onClick={() => navigate('/')}>
            <Icon name="arrow-left" size={16} strokeWidth={2} /> Powrót
          </button>
        </div>
        <div className="ind-empty">
          <h2>Branża niedostępna</h2>
        </div>
      </div>
    );
  }

  return (
    <motion.div className="ind"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ '--ind-c': data.color, '--ind-cl': `${data.color}12`, '--ind-cm': `${data.color}25` } as React.CSSProperties}>

      {/* Header */}
      <div className="ind-hdr">
        <button className="ind-back" onClick={() => navigate('/')}>
          <Icon name="arrow-left" size={16} strokeWidth={2} /> Powrót
        </button>
        <div className="ind-hdr-center"><Logo className="ind-logo" /></div>
        <div className="ind-hdr-title">
          <div className="ind-hdr-ico">
            <Icon name={data.icon} size={16} strokeWidth={2} />
          </div>
          <span className="ind-hdr-name">{data.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="ind-body">
        {/* Left — intro + automations */}
        <div className="ind-left">
          <div className="ind-hero">
            <div className="ind-hero-ico">
              <Icon name={data.icon} size={28} strokeWidth={1.6} />
            </div>
            <div>
              <h1 className="ind-hero-title">{data.name}</h1>
              <p className="ind-hero-tagline">{data.tagline}</p>
            </div>
          </div>

          <p className="ind-intro">{data.intro}</p>

          <h2 className="ind-section-title">Co najczęściej automatyzujemy</h2>

          <div className="ind-automations">
            {data.automations.map((a, i) => (
              <motion.div className="ind-auto" key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                <div className="ind-auto-ico">
                  <Icon name={a.icon} size={16} strokeWidth={1.8} />
                </div>
                <div className="ind-auto-body">
                  <span className="ind-auto-title">{a.title}</span>
                  <span className="ind-auto-desc">{a.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — stats + actions */}
        <div className="ind-right">
          {/* Stats */}
          <div className="ind-stats">
            {data.stats.map((s, i) => (
              <div className="ind-stat" key={i}>
                <span className="ind-stat-val">{s.value}</span>
                <span className="ind-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="ind-actions">
            {data.demoId && (
              <button className="ind-action ind-action--demo" onClick={() => navigate(`/demo/${data.demoId}`)}>
                <div className="ind-action-ico">
                  <Icon name="monitor" size={22} strokeWidth={1.8} />
                </div>
                <div className="ind-action-text">
                  <span className="ind-action-title">Zobacz demo</span>
                  <span className="ind-action-desc">Interaktywna prezentacja systemu dla branży {data.name.toLowerCase()}</span>
                </div>
                <Icon name="arrow-up-right" size={18} strokeWidth={2} />
              </button>
            )}

            <button className="ind-action ind-action--contact" onClick={() => navigate('/')}>
              <div className="ind-action-ico ind-action-ico--green">
                <Icon name="zap" size={22} strokeWidth={1.8} />
              </div>
              <div className="ind-action-text">
                <span className="ind-action-title">Porozmawiajmy</span>
                <span className="ind-action-desc">Zostaw numer — oddzwonimy i porozmawiamy o Twoich potrzebach</span>
              </div>
              <Icon name="arrow-up-right" size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Quote */}
          <div className="ind-quote">
            <Icon name="zap" size={16} strokeWidth={2} />
            <p>Każdy projekt zaczynamy od bezpłatnej konsultacji, na której analizujemy procesy i proponujemy konkretne rozwiązania.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
