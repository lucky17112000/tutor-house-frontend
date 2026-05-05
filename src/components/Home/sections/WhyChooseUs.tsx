const FEATURES = [
  {
    title: "Verified Tutors",
    body: "Every tutor passes a 3-stage interview: background check, teaching trial, and subject assessment.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    body: "Book sessions 24/7 to fit your timetable. Reschedule or cancel up to 12 hours before — no penalties.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Personalized Learning",
    body: "Lessons are tailored to your specific goals, learning pace, and preferred teaching style.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Learn on Any Device",
    body: "Our platform works seamlessly on laptop, tablet, and phone. Learn from anywhere, anytime.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    title: "Money-back Guarantee",
    body: "First session is free. If your second session doesn't meet expectations, we'll refund it — no questions asked.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    body: "Get detailed session reports, milestone badges, and weekly progress summaries to see your growth.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "#eff6ff" }}
    >
      <div className="max-w-295 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div
              className="inline-flex items-center gap-2 text-blue-700 mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "currentColor",
                  flexShrink: 0,
                }}
              />
              Why choose us
            </div>
            <h2
              className="font-extrabold text-zinc-900 tracking-[-0.035em]"
              style={{ fontSize: "clamp(30px,3.5vw,48px)", lineHeight: 1.05 }}
            >
              Everything you need to{" "}
              <em className="not-italic" style={{ fontStyle: "italic", color: "#1d4ed8" }}>
                succeed
              </em>
            </h2>
          </div>
          <p
            className="text-zinc-500 md:max-w-xs md:text-right"
            style={{ fontSize: 15, lineHeight: 1.6 }}
          >
            Built around learners — not algorithms. We sweat the details so you
            can focus on what matters.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-5 md:p-7 border border-white hover:border-blue-200 hover:shadow-[0_20px_40px_-12px_rgba(29,78,216,0.12)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center mb-5 rounded-xl text-blue-700 group-hover:scale-110 transition-transform duration-300"
                style={{
                  width: 52,
                  height: 52,
                  background: "#dbeafe",
                }}
              >
                {feature.icon}
              </div>

              <h3
                className="font-bold text-zinc-900 mb-2"
                style={{ fontSize: 17, letterSpacing: "-0.02em" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-zinc-500"
                style={{ fontSize: 14, lineHeight: 1.65 }}
              >
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
