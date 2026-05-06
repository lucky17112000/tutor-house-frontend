const TESTIMONIALS = [
  {
    quote:
      "My math grade went from a C to an A in just 6 weeks. My tutor broke down every concept until it actually clicked. Best investment I've ever made.",
    name: "Sarah Johnson",
    role: "Grade 10 Student",
    initials: "SJ",
    color: "#1d4ed8",
    rating: 5,
  },
  {
    quote:
      "Found the perfect Python tutor in under 10 minutes. The matching is incredibly accurate — my tutor knew exactly where I was struggling before the first session.",
    name: "Michael Chen",
    role: "CS University Student",
    initials: "MC",
    color: "#0a0a0a",
    rating: 5,
  },
  {
    quote:
      "I raised my SAT score by 180 points after 8 weeks of sessions. My tutor gave me strategies I never would have found on my own. Couldn't be happier.",
    name: "Emma Rodriguez",
    role: "SAT Prep Student",
    initials: "ER",
    color: "#1d4ed8",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-295 mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
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
            <span style={{ display: "inline-block", width: 24, height: 1, background: "currentColor" }} />
            Student reviews
            <span style={{ display: "inline-block", width: 24, height: 1, background: "currentColor" }} />
          </div>
          <h2
            className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.035em]"
            style={{ fontSize: "clamp(30px,3.5vw,48px)", lineHeight: 1.05 }}
          >
            Results that{" "}
            <em className="not-italic" style={{ fontStyle: "italic", color: "#1d4ed8" }}>
              speak
            </em>{" "}
            for themselves
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col p-5 md:p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-[0_20px_40px_-12px_rgba(29,78,216,0.1)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1d4ed8">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="flex-1 text-zinc-700 dark:text-zinc-300 mb-7"
                style={{ fontSize: 15, lineHeight: 1.7 }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <div
                  className="grid place-items-center text-white text-sm font-bold rounded-full flex-shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    background: t.color,
                    fontSize: 13,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div
                    className="font-semibold text-zinc-900 dark:text-white"
                    style={{ fontSize: 14 }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-zinc-400"
                    style={{ fontSize: 12, marginTop: 1 }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-wrap justify-center items-center gap-8 mt-14 pt-10 border-t border-zinc-100 dark:border-zinc-800"
        >
          {[
            { val: "4.9/5", lbl: "Average rating" },
            { val: "94K+", lbl: "Students taught" },
            { val: "98%", lbl: "Would recommend" },
            { val: "500+", lbl: "Verified tutors" },
          ].map((item) => (
            <div key={item.lbl} className="text-center">
              <div
                className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.03em]"
                style={{ fontSize: 28 }}
              >
                {item.val}
              </div>
              <div
                className="text-zinc-400 mt-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {item.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
