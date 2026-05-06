// About — values grid + story stack
function About() {
  const values = [
    { emoji: '✨', g: 'g1', title: 'Excellence', body: "Excellence is not just a goal — it's our standard, in every session and every interaction." },
    { emoji: '❤️', g: 'g2', title: 'Empathy', body: 'We meet learners where they are. No judgement, no shortcuts, just steady forward motion.' },
    { emoji: '🎯', g: 'g3', title: 'Outcomes', body: 'We measure success in breakthroughs and confidence, not in hours billed.' },
    { emoji: '🌍', g: 'g4', title: 'Access', body: "Quality education isn't a privilege — it's a right we work to extend to everyone." },
  ];
  return (
    <section className="th-section th-section-tinted">
      <div className="th-container">
        <div className="th-eyebrow"><span className="th-eyebrow-dot"></span>What Drives Us</div>
        <h2 className="th-h2">Our core <span className="th-grad-text">values</span></h2>
        <p className="th-section-sub">Four principles that guide every decision — from who we partner with to how we show up.</p>

        <div className="th-values-grid">
          {values.map(v => (
            <div className="th-value-card" key={v.title}>
              <div className={"th-value-icon " + v.g}>{v.emoji}</div>
              <h3 className="th-value-title">{v.title}</h3>
              <p className="th-value-body">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="th-story">
          <div className="th-story-stack">
            <div className="th-story-card s3"></div>
            <div className="th-story-card s2"></div>
            <div className="th-story-card s1">
              <img src="../../assets/images/classroom-1.jpg" alt="" />
            </div>
          </div>
          <div className="th-story-text">
            <div className="th-eyebrow"><span className="th-eyebrow-dot"></span>Our Story</div>
            <h3 className="th-h3">It started with a <span className="th-grad-text-italic">simple idea</span></h3>
            <p>Every student deserves a tutor who gets them. Not a script, not a schedule — a real person who can meet you where you are and walk forward with you.</p>
            <p>We started Tutor House to make that connection effortless. Vetted experts. Honest reviews. Schedules that bend to yours.</p>
            <div className="th-story-stats">
              <div><b>5+</b><span>Years</span></div>
              <div><b>50+</b><span>Cities</span></div>
              <div><b>15K+</b><span>Students</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.About = About;
