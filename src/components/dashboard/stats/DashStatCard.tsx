"use client";

import { useEffect, useState } from "react";

const ICON_GRADIENTS = [
  "linear-gradient(135deg,#a78bfa,#ec4899)",
  "linear-gradient(135deg,#60a5fa,#22d3ee)",
  "linear-gradient(135deg,#fbbf24,#f97316)",
  "linear-gradient(135deg,#34d399,#0ea5e9)",
];

function CountUp({
  to,
  prefix = "",
  suffix = "",
  dur = 1100,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  dur?: number;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setN(to * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, dur]);

  const fmt =
    to >= 1000
      ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
      : n.toFixed(to % 1 ? 2 : 0);

  return (
    <span>
      {prefix}
      {fmt}
      {suffix}
    </span>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const w = 100,
    h = 28;
  const max = Math.max(...points),
    min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((p - min) / range) * h).toFixed(1);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full mt-2.5 block"
      style={{ height: 28 }}
    >
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#sparkfill)" />
      <path
        d={path}
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  icon: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: number;
  spark?: number[];
  colorIndex?: 1 | 2 | 3 | 4;
};

export default function DashStatCard({
  icon,
  label,
  value,
  prefix = "",
  suffix = "",
  delta,
  spark,
  colorIndex = 1,
}: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-[18px] border border-zinc-100 dark:border-zinc-800 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-[0_12px_30px_-10px_rgba(29,78,216,0.12)]">
      <div
        className="flex items-center justify-center mb-3 rounded-xl text-white flex-shrink-0"
        style={{
          width: 40,
          height: 40,
          background: ICON_GRADIENTS[(colorIndex - 1) % 4],
          fontSize: 20,
        }}
      >
        {icon}
      </div>

      <div
        className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.02em] mb-0.5 leading-none"
        style={{ fontSize: 28 }}
      >
        <CountUp to={value} prefix={prefix} suffix={suffix} />
      </div>

      <div
        className="text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-[0.04em]"
        style={{ fontSize: 11 }}
      >
        {label}
      </div>

      <div
        className={`mt-2 text-xs font-semibold ${
          delta >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
        }`}
      >
        {delta >= 0 ? "↑" : "↓"} {Math.abs(delta)}%{" "}
        <span className="text-zinc-400 font-normal">vs last month</span>
      </div>

      {spark && <Sparkline points={spark} />}
    </div>
  );
}
