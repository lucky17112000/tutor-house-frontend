// Hero — animated blob backdrop, gradient wordmark, two CTAs, stat row
function Hero({ onPrimary, onSecondary }) {
  return (
    <section className="th-hero">
      <div className="th-hero-bg">
        <div className="th-blob th-blob-1" />
        <div className="th-blob th-blob-2" />
        <div className="th-blob th-blob-3" />
        <div className="th-blob th-blob-4" />
      </div>
      <div className="th-hero-inner">
        <div className="th-eyebrow"><span className="th-eyebrow-dot"></span>Premium Learning Experience</div>
        <h1 className="th-display">
          <span className="th-display-line">Empowering Minds,</span>
          <span className="th-display-line th-grad-text">Shaping Futures</span>
        </h1>
        <p className="th-hero-sub">
          Your perfect tutor is just a click away. Browse vetted experts, book sessions on your schedule,
          and start your journey to excellence ✨
        </p>
        <div className="th-hero-ctas">
          <button className="th-btn th-btn-primary th-btn-lg" onClick={onPrimary}>Get Started Free →</button>
          <button className="th-btn th-btn-outline th-btn-lg" onClick={onSecondary}>Browse Tutors</button>
        </div>
        <div className="th-hero-stats">
          <div className="th-stat"><div className="th-stat-num">500+</div><div className="th-stat-lbl">Expert Tutors</div></div>
          <div className="th-stat"><div className="th-stat-num">15K+</div><div className="th-stat-lbl">Happy Students</div></div>
          <div className="th-stat"><div className="th-stat-num">200+</div><div className="th-stat-lbl">Subjects</div></div>
          <div className="th-stat"><div className="th-stat-num">4.9★</div><div className="th-stat-lbl">Avg. Rating</div></div>
        </div>
      </div>
      <div className="th-hero-glow" />
    </section>
  );
}
window.Hero = Hero;
