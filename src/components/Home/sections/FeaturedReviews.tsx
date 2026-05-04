const RATING_METRICS = [
  { label: "Tutor quality",    score: 4.9, total: 5 },
  { label: "Session value",    score: 4.8, total: 5 },
  { label: "Platform ease",    score: 4.9, total: 5 },
  { label: "Would recommend",  score: 98,  total: 100, isPercent: true },
];

const MINI_REVIEWS = [
  {
    quote: "My SAT score jumped 200 points. I genuinely couldn't believe it until I saw the results.",
    name: "Priya M.",
    role: "SAT Prep · Grade 11",
    initials: "PM",
    color: "from-violet-500 to-purple-600",
    rating: 5,
  },
  {
    quote: "Finally clicked with a tutor who explains Python the way I think. 10 sessions in, I'm building real apps.",
    name: "Daniel K.",
    role: "Programming · University",
    initials: "DK",
    color: "from-blue-600 to-cyan-500",
    rating: 5,
  },
  {
    quote: "Chemistry felt impossible until my tutor made it visual. Passed with a B+ — first pass in 3 attempts.",
    name: "Amara O.",
    role: "Chemistry · A-Levels",
    initials: "AO",
    color: "from-emerald-500 to-teal-600",
    rating: 5,
  },
];

function Stars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#1d4ed8">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function FeaturedReviews() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg,#f8fafc 0%,#eff6ff 50%,#f8fafc 100%)" }}
    >
      <div className="max-w-295 mx-auto space-y-16">

        {/* ── Section header ── */}
        <div className="text-center">
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
            What students say
            <span style={{ display: "inline-block", width: 24, height: 1, background: "currentColor" }} />
          </div>
          <h2
            className="font-extrabold text-zinc-900 tracking-[-0.035em]"
            style={{ fontSize: "clamp(30px,3.5vw,48px)", lineHeight: 1.05 }}
          >
            Loved by{" "}
            <em className="not-italic" style={{ fontStyle: "italic", color: "#1d4ed8" }}>
              94,000+
            </em>{" "}
            learners
          </h2>
        </div>

        {/* ── Rating metrics row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {RATING_METRICS.map((m) => {
            const pct = (m.score / m.total) * 100;
            return (
              <div
                key={m.label}
                className="bg-white rounded-2xl border border-zinc-100 p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="font-black text-blue-700 tracking-tight mb-1"
                  style={{ fontSize: 36, letterSpacing: "-0.03em" }}
                >
                  {m.isPercent ? `${m.score}%` : `${m.score}`}
                  {!m.isPercent && (
                    <span className="text-zinc-300 text-2xl font-bold"> /5</span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: "linear-gradient(90deg,#1d4ed8,#3b82f6)",
                    }}
                  />
                </div>

                <p
                  className="font-semibold text-zinc-500 uppercase tracking-[0.04em]"
                  style={{ fontSize: 11 }}
                >
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Featured big quote ── */}
        <div
          className="relative rounded-3xl overflow-hidden text-white p-10 sm:p-14 text-center"
          style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1d4ed8 60%,#2563eb 100%)" }}
        >
          {/* Decorative blurs */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 300, height: 300,
              background: "rgba(255,255,255,0.07)",
              filter: "blur(60px)",
              top: -80, right: -60,
            }}
          />
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 200, height: 200,
              background: "rgba(255,255,255,0.07)",
              filter: "blur(50px)",
              bottom: -60, left: -40,
            }}
          />

          <div className="relative">
            <Stars count={5} size={20} />

            <blockquote
              className="text-white font-bold leading-snug tracking-[-0.02em] my-6 max-w-3xl mx-auto"
              style={{ fontSize: "clamp(22px,3vw,36px)" }}
            >
              &ldquo;I raised my SAT score by 180 points after 8 weeks of sessions. My tutor gave me
              strategies I never would have found on my own.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full grid place-items-center text-blue-700 font-black text-sm shrink-0"
                style={{ background: "#fff" }}
              >
                ER
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-sm">Emma Rodriguez</p>
                <p className="text-white/60 text-xs">SAT Prep · 180-point score improvement</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3 mini review cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {MINI_REVIEWS.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-2xl border border-zinc-100 p-6 hover:border-blue-200 hover:shadow-[0_16px_36px_-12px_rgba(29,78,216,0.1)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Stars count={r.rating} size={13} />

              <blockquote
                className="text-zinc-700 leading-relaxed mt-4 mb-5"
                style={{ fontSize: 14 }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div
                  className={`w-9 h-9 rounded-full shrink-0 grid place-items-center text-white font-bold bg-gradient-to-br ${r.color}`}
                  style={{ fontSize: 12 }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{r.name}</p>
                  <p className="text-zinc-400 leading-tight" style={{ fontSize: 11 }}>{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
