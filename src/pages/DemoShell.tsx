import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { demos } from '../demos';
import './DemoShell.css';

export function DemoShell() {
  const { demoId } = useParams<{ demoId: string }>();
  const navigate = useNavigate();
  const demo = demos[demoId || ''];

  if (!demo) {
    return (
      <div className="ds">
        <div className="ds-hdr">
          <button className="ds-back" onClick={() => navigate('/')}>
            <Icon name="arrow-left" size={16} strokeWidth={2} /> Powrót
          </button>
        </div>
        <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1,gap:12,color:'var(--text3)' }}>
          <h2 style={{ fontSize:'clamp(18px,1.5vw,28px)', color:'var(--text)' }}>Demo niedostępne</h2>
          <p>Ta aplikacja demonstracyjna jest w przygotowaniu.</p>
        </div>
      </div>
    );
  }

  const C = demo.component;
  return (
    <motion.div className="ds"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <div className="ds-hdr">
        <button className="ds-back" onClick={() => navigate('/')}>
          <Icon name="arrow-left" size={16} strokeWidth={2} /> <span>Powrót</span>
        </button>
        <div className="ds-center"><Logo className="ds-logo" /></div>
        <div className="ds-title" style={{ '--dc': demo.color } as React.CSSProperties}>
          <div className="ds-tico"><Icon name={demo.icon} size={16} strokeWidth={2} /></div>
          <span className="ds-tname">{demo.title}</span>
          <span className="ds-badge">DEMO</span>
        </div>
      </div>
      <div className="ds-body"><C /></div>
    </motion.div>
  );
}
