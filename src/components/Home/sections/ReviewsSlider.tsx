"use client";

/* ── 3 featured testimonials (static highlight cards) ── */
const FEATURED = [
  {
    quote:
      "My math grade went from a C to an A in just 6 weeks. My tutor broke down every concept until it actually clicked. Best investment I've ever made in my education.",
    name: "Sarah Johnson",
    role: "Mathematics · Grade 10",
    initials: "SJ",
    color: "from-blue-600 to-indigo-600",
    result: "Grade C → A",
    subject: "Mathematics",
  },
  {
    quote:
      "I raised my SAT score by 180 points after 8 weeks of sessions. My tutor gave me strategies I never would have found on my own. Couldn't be happier with the outcome.",
    name: "Emma Rodriguez",
    role: "SAT Prep · Grade 12",
    initials: "ER",
    color: "from-violet-500 to-purple-600",
    result: "+180 SAT Points",
    subject: "SAT Prep",
  },
  {
    quote:
      "Found the perfect Python tutor in under 10 minutes. The matching is incredibly accurate — my tutor knew exactly where I was struggling before our very first session.",
    name: "Michael Chen",
    role: "Computer Science · University",
    initials: "MC",
    color: "from-cyan-500 to-blue-600",
    result: "Built 3 real apps",
    subject: "Programming",
  },
];

/* ── All slider reviews (one continuous row) ── */
const SLIDER_REVIEWS = [
  {
    quote: "SAT score jumped 200 points. I genuinely couldn't believe it until I saw the official results.",
    name: "Priya Mehta",
    role: "SAT Prep · Grade 11",
    initials: "PM",
    color: "from-violet-500 to-purple-600",
    subject: "SAT",
  },
  {
    quote: "Finally clicked with a tutor who explains Python the way I think. Ten sessions in, I'm building real apps.",
    name: "Daniel Kim",
    role: "Programming · University",
    initials: "DK",
    color: "from-cyan-500 to-blue-600",
    subject: "Python",
  },
  {
    quote: "Physics mechanics used to terrify me. After 5 sessions I was the one helping classmates before exams.",
    name: "James Thornton",
    role: "Physics · A-Levels",
    initials: "JT",
    color: "from-amber-500 to-orange-600",
    subject: "Physics",
  },
  {
    quote: "My essay scores went from 6/10 to consistent 9s. The tutor spotted patterns in my writing I'd never noticed.",
    name: "Aisha Balogun",
    role: "English Lit · GCSE",
    initials: "AB",
    color: "from-emerald-500 to-teal-600",
    subject: "English",
  },
  {
    quote: "Calculus II was killing my GPA. Two months of sessions and I walked out of finals feeling genuinely confident.",
    name: "Marcus Liu",
    role: "Calculus · University",
    initials: "ML",
    color: "from-blue-500 to-sky-600",
    subject: "Calculus",
  },
  {
    quote: "Chemistry felt impossible until my tutor made it visual. Passed with a B+ — first pass in three attempts.",
    name: "Amara Osei",
    role: "Chemistry · A-Levels",
    initials: "AO",
    color: "from-indigo-500 to-blue-600",
    subject: "Chemistry",
  },
  {
    quote: "Biology diagrams never made sense until my tutor made me draw every single one. First A in the subject ever.",
    name: "Sophie Ward",
    role: "Biology · Grade 11",
    initials: "SW",
    color: "from-green-500 to-emerald-600",
    subject: "Biology",
  },
  {
    quote: "Went from barely ordering food in Spanish to holding a full conversation with my host family abroad.",
    name: "Ryan Park",
    role: "Spanish · Grade 9",
    initials: "RP",
    color: "from-red-500 to-rose-600",
    subject: "Spanish",
  },
  {
    quote: "I was two years behind in maths. My tutor rebuilt my foundation from scratch and now I'm top of class.",
    name: "Fatima Al-Hassan",
    role: "Mathematics · Grade 8",
    initials: "FA",
    color: "from-fuchsia-500 to-violet-600",
    subject: "Math",
  },
  {
    quote: "History essays used to take me all weekend. My tutor's framework cut that to two hours with better results.",
    name: "Luke Harrison",
    role: "History · GCSE",
    initials: "LH",
    color: "from-yellow-500 to-amber-600",
    subject: "History",
  },
  {
    quote: "Thermodynamics almost made me change my major. My tutor turned it into the most interesting unit of the year.",
    name: "Carlos Mendez",
    role: "Physics · University",
    initials: "CM",
    color: "from-teal-500 to-cyan-600",
    subject: "Physics",
  },
  {
    quote: "Organic chemistry reactions stopped being guesswork after session 3. Distinctions across all my lab reports.",
    name: "Nina Rashid",
    role: "Chemistry · Grade 12",
    initials: "NR",
    color: "from-purple-500 to-indigo-600",
    subject: "Chemistry",
  },
];

const STATS = [
  { value: "4.9★", label: "Average rating" },
  { value: "94K+", label: "Happy learners" },
  { value: "98%",  label: "Would recommend" },
  { value: "500+", label: "Verified tutors" },
];

/* ── Stars ── */
function Stars({ size = 13, color = "#3b82f6" }: { size?: number; color?: string }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Featured testimonial card (static, large) ── */
function FeaturedCard({ t }: { t: (typeof FEATURED)[0] }) {
  return (
    <div className="flex flex-col rounded-2xl p-7 border border-white/9 bg-white/4 hover:border-blue-500/35 hover:bg-white/7 transition-all duration-400 group relative overflow-hidden">
      {/* Subtle corner glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
      />

      {/* Top row: quote mark + result badge */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="font-black leading-none select-none"
          style={{ fontSize: 56, color: "rgba(59,130,246,0.30)", lineHeight: 0.85, fontFamily: "Georgia, serif" }}
        >
          &ldquo;
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold border border-blue-500/30 text-blue-400 bg-blue-500/10">
          {t.result}
        </span>
      </div>

      {/* Stars */}
      <Stars size={14} />

      {/* Quote */}
      <blockquote
        className="flex-1 text-white/75 group-hover:text-white/90 leading-relaxed mt-4 mb-6 transition-colors duration-300"
        style={{ fontSize: 15, lineHeight: 1.75 }}
      >
        {t.quote}
      </blockquote>

      {/* Divider */}
      <div className="h-px w-full mb-5" style={{ background: "linear-gradient(90deg,rgba(59,130,246,0.2),rgba(255,255,255,0.06),transparent)" }} />

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl shrink-0 grid place-items-center text-white font-bold bg-linear-to-br ${t.color} shadow-lg`}
          style={{ fontSize: 12 }}
        >
          {t.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-[14px] font-semibold leading-tight">{t.name}</p>
          <p className="text-white/40 text-[11.5px] mt-0.5">{t.role}</p>
        </div>
        <div className="flex items-center gap-1 text-white/25 shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>Verified</span>
        </div>
      </div>
    </div>
  );
}

/* ── Slider card (compact) ── */
function SliderCard({ r }: { r: (typeof SLIDER_REVIEWS)[0] }) {
  return (
    <div className="w-75 shrink-0 rounded-xl p-5 border border-white/7 bg-white/2.5 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300 group cursor-default">
      {/* Stars + subject tag */}
      <div className="flex items-center justify-between mb-3">
        <Stars size={12} />
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/8 text-white/30">
          {r.subject}
        </span>
      </div>

      {/* Quote */}
      <blockquote
        className="text-white/65 group-hover:text-white/80 leading-relaxed mb-4 transition-colors duration-300"
        style={{ fontSize: 13, lineHeight: 1.7 }}
      >
        &ldquo;{r.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-2.5 pt-3.5 border-t border-white/6">
        <div
          className={`w-8 h-8 rounded-lg shrink-0 grid place-items-center text-white font-bold bg-linear-to-br ${r.color}`}
          style={{ fontSize: 10 }}
        >
          {r.initials}
        </div>
        <div className="min-w-0">
          <p className="text-white/80 text-[12.5px] font-semibold truncate">{r.name}</p>
          <p className="text-white/35 text-[10.5px] truncate">{r.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function ReviewsSlider() {
  const duplicated = [...SLIDER_REVIEWS, ...SLIDER_REVIEWS];

  return (
    <section
      className="relative pt-24 pb-16 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#05080f 0%,#070d1f 55%,#050810 100%)" }}
    >
      {/* Decorative glow orbs */}
      <div className="absolute pointer-events-none" style={{
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)",
        top: -160, left: "10%", filter: "blur(50px)",
      }} />
      <div className="absolute pointer-events-none" style={{
        width: 450, height: 450, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        bottom: -100, right: "8%", filter: "blur(50px)",
      }} />

      {/* ── Header ── */}
      <div className="relative z-10 max-w-295 mx-auto px-6 text-center mb-14">

        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-3 text-blue-400 mb-5"
          style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          <span style={{ display: "inline-block", width: 28, height: 1, background: "currentColor", flexShrink: 0 }} />
          What students say
          <span style={{ display: "inline-block", width: 28, height: 1, background: "currentColor", flexShrink: 0 }} />
        </div>

        {/* Headline */}
        <h2
          className="font-extrabold text-white tracking-[-0.035em] mb-4"
          style={{ fontSize: "clamp(32px,4vw,54px)", lineHeight: 1.06 }}
        >
          Loved by{" "}
          <span className="relative inline-block" style={{ color: "#3b82f6" }}>
            94,000+
            <span
              className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg,transparent,#3b82f6,transparent)" }}
            />
          </span>{" "}
          learners
        </h2>

        <p className="text-white/45 max-w-lg mx-auto" style={{ fontSize: 15, lineHeight: 1.7 }}>
          Real outcomes from real students — across every subject, level, and goal.
        </p>

        {/* Stats */}
        <div className="mt-10 inline-flex flex-wrap justify-center divide-x divide-white/7 rounded-2xl border border-white/7 bg-white/3 overflow-hidden">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-7 py-4">
              <span
                className="font-black text-white leading-none"
                style={{ fontSize: "clamp(22px,2.2vw,30px)", letterSpacing: "-0.03em" }}
              >
                {s.value}
              </span>
              <span
                className="text-white/30 mt-1 uppercase tracking-widest"
                style={{ fontSize: 9.5, fontFamily: "var(--font-mono)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured testimonials (static highlight) ── */}
      <div className="relative z-10 max-w-295 mx-auto px-6 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED.map((t) => (
            <FeaturedCard key={t.name} t={t} />
          ))}
        </div>

        {/* Label beneath featured cards */}
        <div className="flex items-center gap-4 mt-8">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07))" }} />
          <p className="shrink-0 text-white/25" style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            More from our students
          </p>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left,transparent,rgba(255,255,255,0.07))" }} />
        </div>
      </div>

      {/* ── Single continuous slider ── */}
      <div className="relative z-10">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right,#050810,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left,#050810,transparent)" }} />

        <div
          className="flex gap-4 w-max"
          style={{ animation: "marqueeScroll 65s linear infinite", willChange: "transform" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
        >
          {duplicated.map((r, i) => (
            <SliderCard key={i} r={r} />
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="relative z-10 text-center mt-10">
        <p className="text-white/18" style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Hover to pause · Verified student reviews
        </p>
      </div>
    </section>
  );
}
