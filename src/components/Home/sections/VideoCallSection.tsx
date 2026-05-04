"use client";
import { useEffect, useRef, useState } from "react";

/* ── Intersection-observer hook for scroll-triggered entrance ── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Animated connection-quality bars ── */
function SignalBars() {
  return (
    <div className="flex items-end gap-[3px]">
      {[3, 5, 7, 9].map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-emerald-400"
          style={{ height: h, opacity: i < 3 ? 1 : 0.3 }}
        />
      ))}
    </div>
  );
}

/* ── Floating feature chip ── */
function Chip({
  icon,
  label,
  delay = 0,
}: {
  icon: string;
  label: string;
  delay?: number;
}) {
  return (
    <div
      className="flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 rounded-full px-3.5 py-2 text-xs font-semibold text-white/80 whitespace-nowrap"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span>{icon}</span>
      {label}
    </div>
  );
}

const FEATURES = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: "HD video & crystal-clear audio",
    body: "Every session runs at full HD. Both sides see and hear each other perfectly — no pixelated freeze-frames.",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Screen sharing & whiteboard",
    body: "Share your screen to walk through problems together, or use the built-in whiteboard to sketch solutions.",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Private, encrypted rooms",
    body: "Each session gets a unique room link. Only your tutor and you can join — end-to-end secured.",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Join in one click",
    body: "No downloads, no sign-in. When it's time for your session, just click the link and you're live in seconds.",
  },
];

export default function VideoCallSection() {
  const { ref, visible } = useInView();
  const [time, setTime] = useState("00:00");

  /* Live session timer ticking in the mockup */
  useEffect(() => {
    if (!visible) return;
    let s = 0;
    const id = setInterval(() => {
      s++;
      const mm = String(Math.floor(s / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setTime(`${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden py-28">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial blue glow centre-left */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-700/12 blur-[120px]" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-295 mx-auto px-6">
        {/* ── Section badge ── */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <div className="inline-flex items-center gap-2.5 border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 text-xs font-semibold uppercase tracking-[0.2em]">
              New — Live video sessions
            </span>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — copy */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <h2
                className="font-extrabold text-white tracking-[-0.03em] leading-[1.05]"
                style={{ fontSize: "clamp(34px, 4vw, 54px)" }}
              >
                Learn face-to-face,{" "}
                <em
                  className="not-italic"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontStyle: "italic",
                  }}
                >
                  from anywhere.
                </em>
              </h2>
              <p
                className="mt-5 text-zinc-400 leading-relaxed"
                style={{ fontSize: 17 }}
              >
                Every Tutor House session includes a private HD video room. No
                third-party apps, no friction — just you, your tutor, and a
                focused hour of learning.
              </p>
            </div>

            {/* Feature list */}
            <ul className="space-y-5">
              {FEATURES.map((f, i) => (
                <li
                  key={i}
                  className={`flex gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                  style={{ transitionDelay: `${200 + i * 90}ms` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-700/20 border border-blue-700/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {f.title}
                    </p>
                    <p className="text-zinc-500 text-sm leading-relaxed mt-0.5">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className={`flex items-center gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "650ms" }}
            >
              <a
                href="/signup"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700 text-white font-semibold text-sm overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-8px_rgba(29,78,216,0.6)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-blue-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400" />
                <span className="relative">Start a free session</span>
                <svg
                  className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
              </a>
              <span className="text-zinc-500 text-sm">No card required</span>
            </div>
          </div>

          {/* RIGHT — video call mockup */}
          <div
            className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Outer glow ring */}
            <div className="relative p-px rounded-[28px] bg-gradient-to-br from-blue-600/40 via-violet-600/20 to-transparent">
              <div className="relative rounded-[27px] overflow-hidden bg-zinc-900 border border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                {/* ── Top bar ── */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6">
                  <div className="flex items-center gap-2">
                    {/* Traffic lights */}
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 font-semibold">REC</span>
                    <span className="ml-1">{time}</span>
                  </div>
                  <SignalBars />
                </div>

                {/* ── Video tiles ── */}
                <div className="grid grid-cols-2 gap-2 p-3">
                  {/* Tutor tile */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/80 to-indigo-900/80 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                        T
                      </div>
                      <span className="text-white/60 text-xs font-medium">
                        Tutor
                      </span>
                    </div>
                    {/* Speaking indicator */}
                    <div className="absolute inset-0 rounded-xl border-2 border-blue-500/70 animate-pulse" />
                    {/* Name tag */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                      <svg
                        className="w-3 h-3 text-emerald-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path
                          d="M19 10v2a7 7 0 0 1-14 0v-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-white text-[10px] font-semibold">
                        Sarah K.
                      </span>
                    </div>
                  </div>

                  {/* Student tile */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-violet-900/80 to-purple-900/80 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                        A
                      </div>
                      <span className="text-white/60 text-xs font-medium">
                        Student
                      </span>
                    </div>
                    {/* Name tag */}
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                      <span className="text-white text-[10px] font-semibold">
                        Alex M.
                      </span>
                    </div>
                    {/* Muted badge */}
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
                      <svg
                        className="w-3 h-3 text-red-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ── Subject / topic bar ── */}
                <div className="mx-3 mb-3 rounded-xl bg-white/4 border border-white/6 px-4 py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-500 font-semibold">
                      Current topic
                    </div>
                    <div className="text-white text-sm font-semibold mt-0.5">
                      Calculus — Integration by Parts
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    45 min left
                  </div>
                </div>

                {/* ── Control bar ── */}
                <div className="flex items-center justify-center gap-3 px-5 py-4 border-t border-white/6">
                  {[
                    { icon: "🎙️", label: "Mic", active: true },
                    { icon: "📷", label: "Cam", active: true },
                    { icon: "🖥️", label: "Share", active: false },
                    { icon: "💬", label: "Chat", active: false },
                  ].map(({ icon, label, active }) => (
                    <button
                      key={label}
                      type="button"
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        active
                          ? "bg-blue-700/30 text-blue-400 border border-blue-700/40"
                          : "bg-white/5 text-zinc-500 border border-white/6 hover:bg-white/8"
                      }`}
                    >
                      <span className="text-base leading-none">{icon}</span>
                      {label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30 transition-colors"
                  >
                    <span className="text-base leading-none">📵</span>
                    End
                  </button>
                </div>
              </div>
            </div>

            {/* ── Floating chips around the mockup ── */}
            <div className="absolute -top-4 -right-4 hidden xl:block">
              <Chip icon="🔒" label="End-to-end encrypted" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden xl:block">
              <Chip icon="⚡" label="< 50ms latency" />
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden xl:block">
              <Chip icon="🌍" label="Works worldwide" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
