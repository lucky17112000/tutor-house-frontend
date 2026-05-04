"use client";

import { useEffect, useState } from "react";

type Bar = { label: string; value: number };

type Props = {
  title: string;
  sub?: string;
  data: Bar[];
  footer?: string;
};

export default function DashBarChart({ title, sub, data, footer }: Props) {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const max = Math.max(...data.map((d) => d.value));
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-[22px] flex flex-col gap-[18px] overflow-hidden">
      {/* Head */}
      <div className="flex items-start justify-between gap-4">
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
          className="flex gap-3.5 text-zinc-500 font-semibold uppercase tracking-[0.04em] flex-shrink-0"
          style={{ fontSize: 11 }}
        >
          <span className="flex items-center gap-1.5">
            <i
              className="inline-block w-2.5 h-2.5 rounded-[3px]"
              style={{ background: "#1d4ed8" }}
            />
            Sessions
          </span>
          <span className="flex items-center gap-1.5">
            <i
              className="inline-block w-2.5 h-2.5 rounded-[3px]"
              style={{ background: "#0a0a0a" }}
            />
            Earnings
          </span>
        </div>
      </div>

      {/* Chart */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "36px 1fr", height: 240 }}
      >
        {/* Y axis */}
        <div className="flex flex-col justify-between py-2">
          {yTicks
            .slice()
            .reverse()
            .map((t, i) => (
              <div
                key={i}
                className="text-right text-zinc-400"
                style={{
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                }}
              >
                {t}
              </div>
            ))}
        </div>

        {/* Bars + grid */}
        <div className="relative py-2">
          {yTicks.map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-zinc-100 dark:bg-zinc-800"
              style={{ bottom: `${i * 25}%` }}
            />
          ))}

          <div
            className="absolute flex items-end gap-3 px-1"
            style={{ inset: "8px 0 22px" }}
          >
            {data.map((d, i) => {
              const h = mounted ? (d.value / max) * 100 : 0;
              const isHov = hover === i;
              return (
                <div
                  key={i}
                  className="flex-1 h-full flex flex-col items-center justify-end relative cursor-pointer"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  {isHov && (
                    <div
                      className="absolute z-10 bg-zinc-900 text-white rounded-lg text-center whitespace-nowrap"
                      style={{
                        top: -10,
                        left: "50%",
                        transform: "translate(-50%,-100%)",
                        padding: "6px 10px",
                        fontSize: 11,
                      }}
                    >
                      <div className="font-bold" style={{ fontSize: 13 }}>
                        {d.value}
                      </div>
                      <div
                        className="text-zinc-400 uppercase tracking-[0.06em]"
                        style={{ fontSize: 10 }}
                      >
                        sessions
                      </div>
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                        style={{
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: "5px solid #0a0a0a",
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="w-full flex items-end justify-center gap-0.5"
                    style={{ maxWidth: 38, height: "100%" }}
                  >
                    <div
                      style={{
                        width: "50%",
                        minWidth: 8,
                        height: `${h}%`,
                        borderRadius: "6px 6px 2px 2px",
                        background: "linear-gradient(180deg,#2563eb,#1d4ed8)",
                        transition: `height 850ms cubic-bezier(0.2,0.8,0.2,1) ${i * 70}ms`,
                        boxShadow: isHov
                          ? "0 6px 16px -4px rgba(29,78,216,0.45)"
                          : "none",
                        filter: isHov ? "brightness(1.08)" : "none",
                      }}
                    />
                    <div
                      style={{
                        width: "50%",
                        minWidth: 8,
                        height: `${h * 0.55}%`,
                        borderRadius: "6px 6px 2px 2px",
                        background: "linear-gradient(180deg,#18181b,#0a0a0a)",
                        transition: `height 850ms cubic-bezier(0.2,0.8,0.2,1) ${i * 70 + 40}ms`,
                      }}
                    />
                  </div>

                  <div
                    className="absolute font-semibold text-zinc-500"
                    style={{ bottom: -22, fontSize: 11 }}
                  >
                    {d.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {footer && (
        <div
          className="text-zinc-500 pt-1.5 border-t border-zinc-100 dark:border-zinc-800"
          style={{ fontSize: 12 }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
