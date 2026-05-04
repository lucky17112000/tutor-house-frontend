const STEPS = [
  {
    num: "01",
    title: "Search & Browse",
    body: "Browse 500+ verified tutors by subject, availability, and budget. Filter by rating, price, and teaching style.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Book a Session",
    body: "Pick a time slot that works for you. First session is completely free — no credit card required.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Start Learning",
    body: "Join your live session via our built-in video platform. Get personal guidance and track your progress over time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-295 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2.5 text-blue-700 dark:text-blue-400 mb-4"
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
                width: 24,
                height: 1,
                background: "currentColor",
              }}
            />
            How it works
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 1,
                background: "currentColor",
              }}
            />
          </div>
          <h2
            className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.035em] mx-auto"
            style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.05, maxWidth: "16ch" }}
          >
            Three steps to your{" "}
            <em className="not-italic" style={{ fontStyle: "italic", color: "#1d4ed8" }}>
              perfect match
            </em>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px"
            style={{ background: "rgba(29,78,216,0.15)" }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-[0_16px_40px_-12px_rgba(29,78,216,0.12)] transition-all duration-300 group"
            >
              {/* Number badge */}
              <div
                className="flex items-center justify-center mb-6 rounded-2xl text-white font-black flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{
                  width: 64,
                  height: 64,
                  background: i === 1 ? "#0a0a0a" : "#1d4ed8",
                  fontSize: 22,
                  letterSpacing: "-0.04em",
                  boxShadow: i === 1
                    ? "0 12px 28px -8px rgba(10,10,10,0.4)"
                    : "0 12px 28px -8px rgba(29,78,216,0.45)",
                }}
              >
                {step.num}
              </div>

              <h3
                className="font-bold text-zinc-900 dark:text-white mb-3"
                style={{ fontSize: 20, letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
              <p
                className="text-zinc-500 dark:text-zinc-400"
                style={{ fontSize: 15, lineHeight: 1.6 }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
