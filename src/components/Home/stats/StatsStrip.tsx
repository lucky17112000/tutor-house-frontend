"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { raw: 94200, display: "94K", suffix: "+",  label: "Happy learners",  em: true  },
  { raw: 2400,  display: null,  suffix: "",   label: "Vetted tutors",   em: false },
  { raw: 180,   display: null,  suffix: "+",  label: "Subjects covered", em: false },
  { raw: 4.9,   display: null,  suffix: "/5", label: "Avg session rating", em: false },
];

function CountUp({ to, suffix = "", duration = 1800, started }: {
  to: number;
  suffix?: string;
  duration?: number;
  started: boolean;
}) {
  const [n, setN] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!started || ran.current) return;
    ran.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setN(to * e);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, to, duration]);

  const fmt =
    to >= 1000
      ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
      : n.toFixed(to % 1 ? 1 : 0);

  return <span>{fmt}{suffix}</span>;
}

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-22 px-12 max-sm:px-6" style={{ background: "#0a0a0a" }}>
      <div
        className="mx-auto grid gap-8 max-sm:grid-cols-2"
        style={{ maxWidth: 1280, gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="pl-6 transition-all duration-400 hover:translate-x-1.5"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.12)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#3b82f6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <div
              className="font-extrabold leading-none tracking-[-0.035em] mb-2"
              style={{ fontSize: "clamp(48px,5vw,72px)", color: "#fff" }}
            >
              {stat.em ? (
                <>
                  <em className="not-italic" style={{ color: "#3b82f6" }}>
                    {/* 94K special — static label with animated number underneath */}
                    <CountUp to={94} suffix="K" duration={1600 + i * 150} started={visible} />
                  </em>
                  {stat.suffix}
                </>
              ) : (
                <>
                  <em className="not-italic" style={{ color: "#fff" }}>
                    <CountUp to={stat.raw} suffix="" duration={1600 + i * 150} started={visible} />
                  </em>
                  <em className="not-italic" style={{ color: "#3b82f6" }}>
                    {stat.suffix}
                  </em>
                </>
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
