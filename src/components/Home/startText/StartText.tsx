"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Animated counter ── */
function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 2200,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setN(to * e);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, duration]);

  const fmt =
    to >= 1000
      ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
      : n.toFixed(to % 1 ? 1 : 0);

  return (
    <span>
      {prefix}
      {fmt}
      {suffix}
    </span>
  );
}

/* ── Slide data ── */
const SLIDES = [
  {
    bg: "/images/pexels-cottonbro-5483071.jpg",
    overlay: "from-black/80 via-black/60 to-black/30",
    eyebrow: "Now matching · 12,400+ tutors online",
    title: ["Find Your Perfect Tutor.", "Master Any Subject."],
    sub: "Book 1-on-1 sessions with verified experts in math, science, languages, and 40+ more subjects. Learn at your pace, on your schedule.",
    primary: { label: "Browse Tutors →", href: "/tutor" },
    secondary: { label: "Get Started Free", href: "/signup" },
    accent: "#3b82f6",
  },
  {
    bg: "/images/pexels-thisisengineering-3862130.jpg",
    overlay: "from-blue-950/85 via-blue-900/60 to-blue-800/25",
    eyebrow: "500+ verified tutors across 40+ subjects",
    title: ["Expert Tutors,", "Personalized for You."],
    sub: "Every tutor passes a 3-stage interview: background check, teaching trial, and subject assessment. Only the best teach here.",
    primary: { label: "View All Tutors →", href: "/tutor" },
    secondary: { label: "How It Works", href: "#how" },
    accent: "#60a5fa",
  },
  {
    bg: "/images/pexels-jeshoots-com-147458-714699.jpg",
    overlay: "from-zinc-950/85 via-zinc-900/60 to-zinc-800/25",
    eyebrow: "94,200+ happy learners this month",
    title: ["Real Learning.", "Real Results."],
    sub: "Join thousands of students already achieving their goals with Tutor House. Your first session is completely free — no credit card needed.",
    primary: { label: "Start for Free →", href: "/signup" },
    secondary: { label: "Read Reviews", href: "#reviews" },
    accent: "#a78bfa",
  },
];

const STATS = [
  { value: 94200, label: "Happy learners", suffix: "+" },
  { value: 500, label: "Expert tutors", suffix: "+" },
  { value: 40, label: "Subjects", suffix: "+" },
  { value: 4.9, label: "Average rating", suffix: "★" },
];

/* ── Hero Slider ── */
export default function StartText() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const total = SLIDES.length;
  const heroRef = useRef<HTMLDivElement | null>(null);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const prev = () => {
    setPaused(true);
    setCurrent((c) => (c - 1 + total) % total);
  };
  const next = () => {
    setPaused(true);
    setCurrent((c) => (c + 1) % total);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
          aria-hidden={i !== current}
        >
          {/* Background image */}
          <img
            src={slide.bg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-linear-to-r ${slide.overlay}`} />
        </div>
      ))}

      {/* Content — sits above slides */}
      <div className="relative z-10 flex flex-col justify-center min-h-svh px-5 sm:px-14 lg:px-24 pt-24 sm:pt-28 pb-40 sm:pb-16">
        <div ref={heroRef} className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 text-white/80 mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ background: SLIDES[current].accent }}
            />
            <span key={current} className="animate-fade-in-down">
              {SLIDES[current].eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            key={current + "-h"}
            className="text-white font-black tracking-tight leading-none mb-6"
            style={{
              fontSize: "clamp(42px, 7vw, 88px)",
              letterSpacing: "-0.035em",
              textTransform: "uppercase",
            }}
          >
            {SLIDES[current].title.map((line, i) => (
              <span
                key={i}
                className={
                  inView
                    ? "block animate-fade-in-up"
                    : "block opacity-0 translate-y-6"
                }
                style={inView ? { animationDelay: `${120 * i}ms` } : undefined}
              >
                {i === 1 ? (
                  <em
                    className="not-italic"
                    style={{
                      fontStyle: "italic",
                      fontWeight: 900,
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <span
                      className="absolute inset-x-0 -z-10 rounded"
                      style={{
                        bottom: "8px",
                        height: "10px",
                        background: `${SLIDES[current].accent}40`,
                      }}
                    />
                    {line}
                  </em>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            key={current + "-p"}
            className="text-white/80 mb-9 animate-fade-in max-w-xl"
            style={{ fontSize: 17, lineHeight: 1.65 }}
          >
            {SLIDES[current].sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={SLIDES[current].primary.href}
              className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-bold tracking-[0.12em] uppercase bg-white text-zinc-900 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              {SLIDES[current].primary.label}
            </Link>
            <Link
              href={SLIDES[current].secondary.href}
              className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-semibold tracking-widest text-white hover:bg-white/10 transition-colors duration-300"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}
            >
              {SLIDES[current].secondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Animated stats bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-295 mx-auto px-4 sm:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/10">
          {STATS.map((s, i) => (
            <div key={i} className="text-center sm:px-8">
              <div
                className="font-black text-white tracking-tight leading-none"
                style={{
                  fontSize: "clamp(28px,3vw,40px)",
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedCounter
                  to={s.value}
                  suffix={s.suffix}
                  duration={2000 + i * 200}
                />
              </div>
              <div
                className="text-white/55 mt-1 uppercase tracking-widest font-semibold"
                style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 grid place-items-center text-white transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 grid place-items-center text-white transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* ── Navigation dots ── */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPaused(true);
              setCurrent(i);
            }}
            className="transition-all duration-300"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 999,
              background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Strong scroll cue ── */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3">
          <div className="px-5 py-2 rounded-full bg-white/90 text-zinc-900 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-[0_10px_26px_-12px_rgba(0,0,0,0.45)]">
            Up next · video call · find tutor · stats · how it works
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <ChevronDown className="size-4 animate-bounce" />
            <ChevronDown className="size-4 animate-bounce" />
            <ChevronDown className="size-4 animate-bounce" />
          </div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div
        className="absolute bottom-20 left-0 right-0 z-10 py-2 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="flex gap-12 animate-marquee-scroll whitespace-nowrap w-max"
          style={{
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.12em",
          }}
        >
          {[
            "Mathematics",
            "Physics",
            "Chemistry",
            "English Literature",
            "Spanish",
            "Biology",
            "SAT Prep",
            "Calculus",
            "Computer Science",
            "Music Theory",
            "History",
            "Programming",
            "Mathematics",
            "Physics",
            "Chemistry",
            "English Literature",
            "Spanish",
            "Biology",
            "SAT Prep",
            "Calculus",
            "Computer Science",
            "Music Theory",
            "History",
            "Programming",
          ].map((subject, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 text-white/65 uppercase font-semibold"
            >
              {subject}
              <span style={{ color: SLIDES[current].accent }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
