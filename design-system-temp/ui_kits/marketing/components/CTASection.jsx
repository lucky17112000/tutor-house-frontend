// CTA — full gradient panel, two big blurred white circles
function CTASection({ onSignup }) {
  return (
    <section className="th-section">
      <div className="th-container">
        <div className="th-cta-panel">
          <div className="th-cta-blur th-cta-blur-1" />
          <div className="th-cta-blur th-cta-blur-2" />
          <div className="th-cta-content">
            <h2 className="th-cta-h2">Ready to start your <em>journey</em>?</h2>
            <p className="th-cta-sub">Join 15,000+ students learning with the world's best tutors. First session, risk-free.</p>
            <div className="th-cta-actions">
              <button className="th-btn th-btn-white" onClick={onSignup}>Get Started Free →</button>
              <button className="th-btn th-btn-glass">Book a Demo</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.CTASection = CTASection;
