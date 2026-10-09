import Header from "./components/Header";
import PredictionForm from "./components/PredictionForm";

export default function Home() {
  return (
    <main className="site-shell">
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> MACHINE LEARNING DEMO</div>
          <h1>Understand your heart health <span>one step at a time.</span></h1>
          <p className="hero-description">
            Explore how selected health indicators are processed by a machine-learning model.
            Enter the requested values to receive an educational model output.
          </p>
          <div className="trust-row">
            <span><span className="mini-check">✓</span> Clear, guided inputs</span>
            <span><span className="mini-check">✓</span> Private by design</span>
          </div>
          <div className="hero-note">
            <div className="note-icon">i</div>
            <p>This tool is for educational purposes only and cannot diagnose heart disease or replace medical advice.</p>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="heart-glow">
            <svg viewBox="0 0 180 180" role="img" aria-label="Decorative heart pulse">
              <defs>
                <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff8c9a" />
                  <stop offset="100%" stopColor="#ed4567" />
                </linearGradient>
              </defs>
              <path d="M90 151 C78 140 28 108 28 66 C28 31 71 21 90 54 C109 21 152 31 152 66 C152 108 102 140 90 151Z" fill="url(#heartGradient)" />
              <path d="M24 91 H57 L72 69 L91 111 L108 83 L119 92 H157" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="floating-card pulse-card"><span className="pulse-dot" /><div><strong>Heart health</strong><small>Know your indicators</small></div></div>
          <div className="floating-card data-card"><span className="data-icon">✳</span><div><strong>ML-powered</strong><small>Model-based output</small></div></div>
          <div className="art-caption">A more informed conversation starts here.</div>
        </div>
      </section>

      <section className="form-section" id="assessment">
        <div className="section-heading">
          <div>
            <div className="section-kicker">YOUR ASSESSMENT</div>
            <h2>Enter health indicators</h2>
            <p>Complete the fields below, then submit them to the prediction API.</p>
          </div>
          <div className="step-pill"><span>01</span> Patient details</div>
        </div>
        <PredictionForm />
      </section>
      <footer className="footer">
        <span className="footer-brand"><span className="brand-mark small">♥</span> CardioSense</span>
        <span>Educational project · Not a medical diagnosis</span>
      </footer>
    </main>
  );
}
