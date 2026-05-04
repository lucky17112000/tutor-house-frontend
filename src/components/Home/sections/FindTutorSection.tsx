"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback } from "react";

/* ── Marquee subjects ── */
const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Computer Science",
  "English Literature",
  "Spanish",
  "Chemistry",
  "Biology",
  "SAT Prep",
  "Calculus",
  "Music Theory",
];

/* ── Tilt card 3-D mouse tracking ── */
function useTilt() {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef<number>(0);

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5; // –0.5 → 0.5
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.03,1.03,1.03)`;
    });
  }, []);

  const onLeave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/* ── Single tilt card ── */
interface TiltCardProps {
  tag: string;
  meta: string;
  title: string;
  sub: string;
  image: string;
  variant?: "dark" | "blue" | "white";
  href?: string;
}

function TiltCard({
  tag,
  meta,
  title,
  sub,
  image,
  variant = "dark",
  href = "/tutor",
}: TiltCardProps) {
  const tilt = useTilt();

  const bg =
    variant === "blue"
      ? "bg-blue-700"
      : variant === "white"
        ? "bg-white border border-black/8"
        : "bg-zinc-900";

  const textColor = variant === "white" ? "text-zinc-900" : "text-white";
  const subColor = variant === "white" ? "text-zinc-500" : "text-white/70";
  const metaColor = variant === "white" ? "text-zinc-400" : "text-white/60";
  const overlayGrad =
    variant === "blue"
      ? "from-blue-700/40 via-blue-700/60 to-blue-700/95"
      : variant === "white"
        ? "from-transparent via-black/10 to-black/60"
        : "from-transparent via-black/30 to-black/90";

  return (
    <article
      ref={tilt.ref as React.RefObject<HTMLElement>}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`relative ${bg} rounded-4xl overflow-hidden cursor-pointer`}
      style={{
        aspectRatio: "4/5",
        transformStyle: "preserve-3d",
        transition:
          "transform 0.6s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.6s cubic-bezier(0.2,0.8,0.2,1)",
        willChange: "transform",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className={`absolute inset-0 bg-linear-to-b ${overlayGrad}`} />
      </div>

      {/* Tag — top left */}
      <span
        className="absolute top-6 left-6 z-10 px-3 py-1.5 rounded-full bg-white/18 backdrop-blur-md border border-white/25 text-white font-mono text-[11px] font-medium tracking-[0.12em] uppercase"
        style={{ transform: "translateZ(60px)" }}
      >
        {tag}
      </span>

      {/* Arrow — top right */}
      <Link
        href={href}
        className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/95 flex items-center justify-center text-zinc-900 hover:bg-white transition-all duration-300 group"
        style={{ transform: "translateZ(60px)" }}
        aria-label={`Go to ${title}`}
      >
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* Body — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 p-7"
        style={{ transform: "translateZ(40px)" }}
      >
        <div
          className={`flex items-center gap-2 mb-3.5 font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase ${metaColor}`}
        >
          {meta.split("·").map((m, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-white/50" />}
              {m.trim()}
            </span>
          ))}
        </div>
        <h3
          className={`text-[26px] font-extrabold leading-[1.05] tracking-[-0.025em] mb-2.5 ${textColor}`}
        >
          {title}
        </h3>
        <p className={`text-[14px] leading-relaxed max-w-65 ${subColor}`}>
          {sub}
        </p>
      </div>
    </article>
  );
}

/* ── Avatar stack placeholders ── */
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-amber-500",
];
const AVATAR_LETTERS = ["S", "A", "M", "J"];

export default function FindTutorSection() {
  return (
    <>
      {/* ════════════════════════════════════════════
          HERO — blue block + photo + chip + marquee
          ════════════════════════════════════════════ */}
      <section className="relative bg-white dark:bg-zinc-950 pt-16 pb-0 px-6">
        <div
          className="max-w-295 mx-auto grid items-stretch"
          style={{ gridTemplateColumns: "1.05fr 1fr", minHeight: 620 }}
        >
          {/* ── Blue block ── */}
          <div
            className="relative z-20 bg-blue-700 text-white flex flex-col justify-center px-16 py-18 rounded-sm shadow-[0_40px_80px_-20px_rgba(29,78,216,0.35)] overflow-hidden animate-hero-block"
            style={{ marginTop: 40, marginBottom: 40 }}
          >
            {/* Inner glows */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/18 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-14 -left-14 w-52 h-52 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            {/* Eyebrow */}
            <div className="relative z-10 inline-flex items-center gap-2 mb-7 font-mono text-[12px] font-medium tracking-[0.18em] uppercase text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-stat-pulse" />
              Now matching · 12,400+ tutors online
            </div>

            {/* Title */}
            <h2
              className="relative z-10 font-black text-white leading-[0.98] tracking-[-0.035em] uppercase mb-6"
              style={{ fontSize: "clamp(40px, 5.2vw, 76px)" }}
            >
              Find your tutor.
              <br />
              Master{" "}
              <em className="relative font-black italic">
                any
                <span className="absolute left-0 right-0 bottom-1.5 h-2 bg-white/25 rounded-sm -z-10" />
              </em>{" "}
              subject.
            </h2>

            {/* Sub */}
            <p className="relative z-10 text-[17px] leading-[1.6] text-white/85 max-w-115 mb-9">
              Book 1-on-1 sessions with verified experts in math, science,
              languages, and 40+ more subjects. Learn at your pace, on your
              schedule.
            </p>

            {/* CTA row */}
            <div className="relative z-10 flex items-center gap-4 flex-wrap">
              <Link
                href="/tutor"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 text-[13px] font-bold tracking-[0.16em] uppercase rounded-full transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(0,0,0,0.35)]"
              >
                <span>Browse tutors</span>
                <span className="w-8 h-8 rounded-full bg-blue-700 grid place-items-center text-white transition-transform duration-400 group-hover:translate-x-1.5 group-hover:-rotate-45">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2.5 px-6 py-4 text-white text-[13px] font-semibold tracking-[0.14em] uppercase border border-white/35 rounded-full hover:bg-white/12 hover:border-white/70 transition-all duration-300"
              >
                <span className="w-5 h-5 rounded-full bg-white text-blue-700 grid place-items-center text-[9px]">
                  ▶
                </span>
                Watch demo
              </Link>
            </div>
          </div>

          {/* ── Photo ── */}
          <div
            className="relative z-10 rounded-sm overflow-hidden animate-hero-photo"
            style={{ minHeight: 620 }}
          >
            <Image
              src="/images/pexels-thisisengineering-3862130.jpg"
              alt="Students in a tutoring session"
              fill
              className="object-cover transition-transform duration-[8s] ease-out hover:scale-[1.04]"
              priority
            />
            {/* Floating chip */}
            <div className="absolute bottom-8 right-8 z-10 bg-white/95 backdrop-blur-xl rounded-2xl p-[18px_22px] flex items-center gap-3.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] animate-chip-in">
              <div className="flex">
                {AVATAR_COLORS.map((c, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full border-2 border-white ${c} grid place-items-center text-white text-xs font-bold ${i > 0 ? "-ml-2.5" : ""}`}
                  >
                    {AVATAR_LETTERS[i]}
                  </div>
                ))}
              </div>
              <div className="leading-tight">
                <div className="text-[18px] font-extrabold tracking-[-0.02em] text-zinc-900">
                  94,200+
                </div>
                <div className="text-[11.5px] text-zinc-500 mt-0.5">
                  happy learners this month
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Marquee strip ── */}
        <div
          className="mt-20 py-6 border-t border-b border-black/8 dark:border-white/8 overflow-hidden bg-white dark:bg-zinc-950"
          aria-hidden="true"
        >
          <div className="flex gap-16 animate-marquee-scroll w-max">
            {[...SUBJECTS, ...SUBJECTS].map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 text-[16px] font-semibold tracking-[-0.01em] text-zinc-900 dark:text-white whitespace-nowrap"
              >
                {s}
                <span className="text-blue-700 text-[18px]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CARDS — 3-D parallax tilt
          ════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-zinc-950 px-6 py-28">
        {/* Header */}
        <div className="max-w-295 mx-auto flex items-end justify-between gap-12 flex-wrap mb-16">
          <div className="max-w-160">
            <div className="inline-flex items-center gap-2.5 text-blue-700 dark:text-blue-400 mb-5 font-mono text-[12px] font-medium tracking-[0.18em] uppercase">
              <span className="w-8 h-px bg-blue-700 dark:bg-blue-400" />
              Featured pathways
            </div>
            <h2
              className="font-black leading-[1.02] tracking-[-0.035em] text-zinc-900 dark:text-white"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
            >
              Three ways to <em className="italic text-blue-700">learn</em>{" "}
              better.
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-zinc-500 dark:text-zinc-400 max-w-95 pb-2">
            Pick a format that fits how you study. Switch between them anytime —
            all on the same plan, all in one place.
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="max-w-295 mx-auto grid gap-7"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", perspective: 1200 }}
        >
          <TiltCard
            tag="01 · Live"
            meta="1-on-1 · HD video"
            title="Live tutoring sessions"
            sub="Real-time whiteboard, screen share, and instant feedback with verified tutors."
            image="/images/pexels-cottonbro-5483071.jpg"
            variant="dark"
          />
          <TiltCard
            tag="02 · Self-paced"
            meta="On-demand · 40+ subjects"
            title="Curated study tracks"
            sub="Structured lesson paths built by top tutors. Learn anywhere, finish at your own pace."
            image="/images/pexels-jeshoots-com-147458-714699.jpg"
            variant="blue"
          />
          <TiltCard
            tag="03 · Group"
            meta="Cohort · Weekly"
            title="Small-group cohorts"
            sub="Learn alongside 4–8 peers in focused weekly sessions led by a senior tutor."
            image="/images/pexels-karola-g2-5775.jpg"
            variant="dark"
          />
        </div>
      </section>
    </>
  );
}
