import { useMemo } from 'react';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { decodeResults } from '../services/share';
import './SharedResults.css';

const difficultyLabels: Record<string, string> = {
  easy: 'Quick Win',
  medium: 'Game Changer',
  advanced: 'Wizja',
};

export function SharedResults() {
  const data = useMemo(() => decodeResults(window.location.hash), []);

  if (!data) {
    return (
      <div className="sr">
        <div className="sr-empty">
          <Logo className="sr-logo" />
          <h1>Link wygasł lub jest nieprawidłowy</h1>
          <p>Odwiedź nas na <a href="https://letsautomate.pl">letsautomate.pl</a></p>
        </div>
      </div>
    );
  }

  const { industry, processes, outcome, size, results } = data;

  return (
    <div className="sr">
      <header className="sr-header">
        <Logo className="sr-logo" />
      </header>

      <main className="sr-main">
        {/* Context */}
        <div className="sr-tags">
          <span className="sr-tag">{industry}</span>
          {processes.map(p => <span key={p} className="sr-tag">{p}</span>)}
          <span className="sr-tag">{outcome}</span>
          <span className="sr-tag">{size}</span>
        </div>

        <p className="sr-intro">
          Na podstawie Twoich odpowiedzi przygotowaliśmy spersonalizowaną diagnozę i pomysły na automatyzację.
        </p>

        {/* Diagnosis */}
        <div className="sr-diag">
          <span className="sr-label">Diagnoza</span>
          <h2 className="sr-diag-title">{results.diagnosis.core_process}</h2>
          <p className="sr-diag-text">{results.diagnosis.insight}</p>
        </div>

        {/* Ideas */}
        <span className="sr-label">Pomysły na zmianę</span>
        <div className="sr-ideas">
          {results.ideas.map((idea, i) => (
            <div className="sr-idea" key={i}>
              <div className="sr-idea-top">
                <span className="sr-idea-n">{i + 1}</span>
                <h3 className="sr-idea-name">{idea.title}</h3>
                <span className={`sr-badge sr-badge--${idea.difficulty}`}>
                  {difficultyLabels[idea.difficulty] || idea.difficulty}
                </span>
              </div>
              <p className="sr-idea-text">{idea.description}</p>
              <div className="sr-ba">
                <div className="sr-ba-col sr-ba-col--b">
                  <span className="sr-ba-label">Dziś</span>
                  <span className="sr-ba-text">{idea.before}</span>
                </div>
                <span className="sr-ba-arrow">→</span>
                <div className="sr-ba-col sr-ba-col--a">
                  <span className="sr-ba-label">Po zmianie</span>
                  <span className="sr-ba-text">{idea.after}</span>
                </div>
              </div>
              <span className="sr-impact">
                <Icon name="zap" size={11} strokeWidth={2.5} />
                {idea.impact}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="sr-cta">
          <p className="sr-cta-text">{results.cta}</p>
          <a href="https://letsautomate.pl/darmowa-konsultacja" className="sr-cta-btn">
            Umów darmową konsultację
          </a>
          <a href="tel:+48571399932" className="sr-cta-link">
            <Icon name="zap" size={13} strokeWidth={2} />
            Zadzwoń: 571 399 932
          </a>
        </div>

        <footer className="sr-footer">
          <Logo className="sr-footer-logo" />
          <span>Pomagamy firmom pracować mądrzej</span>
        </footer>
      </main>
    </div>
  );
}
