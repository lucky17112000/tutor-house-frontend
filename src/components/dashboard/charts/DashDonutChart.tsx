"use client";

import { useEffect, useState } from "react";

type Segment = { label: string; value: number; color: string };

type Props = { title: string; sub?: string; segments: Segment[] };

export default function DashDonutChart({ title, sub, segments }: Props) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const total = segments.reduce((s, x) => s + x.value, 0);
  const R = 64;
  const C = 2 * Math.PI * R;

  let cum = 0;
  const arcs = segments.map((s) => {
    const frac = s.value / total;
    const dash = mounted ? frac * C : 0;
    const offset = -cum * C;
    cum += frac;
    return { ...s, dash, offset, frac };
  });

  const activeSeg = arcs[active] ?? arcs[0];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-[22px] flex flex-col gap-[18px]">
      <div>
        <h3
          className="font-bold text-zinc-900 dark:text-white mb-1 tracking-[-0.01em]"
          style={{ fontSize: 15 }}
        >
          {title}
        </h3>
        {sub && (
          <p className="text-zinc-500 dark:text-zinc-400" style={{ fontSize: 12.5 }}>
            {sub}
          </p>
        )}
      </div>

      <div
        className="grid items-center gap-[18px]"
        style={{ gridTemplateColumns: "160px 1fr" }}
      >
        {/* SVG donut */}
        <div className="relative grid place-items-center">
          <svg viewBox="0 0 160 160" className="w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke="#f4f4f5"
              strokeWidth="20"
            />
            {arcs.map((a, i) => (
              <circle
                key={i}
                cx="80"
                cy="80"
                r={R}
                fill="none"
                stroke={a.color}
                strokeWidth={active === i ? 22 : 20}
                strokeDasharray={`${a.dash} ${C}`}
                strokeDashoffset={a.offset}
                transform="rotate(-90 80 80)"
                style={{
                  transition: `stroke-dasharray 0.9s cubic-bezier(0.2,0.8,0.2,1) ${i * 110}ms, stroke-width 0.25s`,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setActive(i)}
              />
            ))}
            <text
              x="80"
              y="74"
              textAnchor="middle"
              fill="#0a0a0a"
              style={{ font: "700 22px var(--font-sans)" }}
            >
              {Math.round(activeSeg.frac * 100)}%
            </text>
            <text
              x="80"
              y="93"
              textAnchor="middle"
              fill="#71717a"
              style={{
                font: "500 10px var(--font-sans)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
              }}
            >
              {activeSeg.label.length > 9
                ? activeSeg.label.slice(0, 9) + "…"
                : activeSeg.label}
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5">
          {segments.map((s, i) => (
            <div
              key={i}
              className={`grid items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors duration-200 ${
                active === i
                  ? "bg-zinc-50 dark:bg-zinc-800"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
              style={{ gridTemplateColumns: "12px 1fr auto" }}
              onMouseEnter={() => setActive(i)}
            >
              <div
                className="w-2.5 h-2.5 rounded-[3px] flex-shrink-0"
                style={{ background: s.color }}
              />
              <div>
                <div
                  className="font-semibold text-zinc-900 dark:text-white leading-tight"
                  style={{ fontSize: 12.5 }}
                >
                  {s.label}
                </div>
                <div
                  className="text-zinc-400"
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {s.value.toLocaleString()}
                </div>
              </div>
              <div
                className="font-bold text-blue-700 dark:text-blue-400"
                style={{ fontSize: 13 }}
              >
                {Math.round((s.value / total) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
