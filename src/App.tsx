import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { IndustryPage } from './pages/IndustryPage';
import { DemoShell } from './pages/DemoShell';
import { SharedResults } from './pages/SharedResults';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/industry/:id" element={<IndustryPage />} />
        <Route path="/demo/:demoId" element={<DemoShell />} />
        <Route path="/r" element={<SharedResults />} />
      </Routes>
    </AnimatePresence>
  );
}
