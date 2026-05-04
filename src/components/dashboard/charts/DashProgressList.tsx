"use client";

import { useEffect, useState } from "react";

type ProgressItem = {
  label: string;
  value: number;
  max: number;
  accent?: string;
};

type Props = {
  title: string;
  sub?: string;
  items: ProgressItem[];
};

export default function DashProgressList({ title, sub, items }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

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

      <div className="flex flex-col gap-3.5">
        {items.map((item, i) => {
          const pct = Math.min(100, (item.value / item.max) * 100);
          return (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1.5">
                <span
                  className="font-semibold text-zinc-900 dark:text-white"
                  style={{ fontSize: 13 }}
                >
                  {item.label}
                </span>
                <span
                  className="text-zinc-400"
                  style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
                >
                  <strong className="text-zinc-900 dark:text-white font-bold">
                    {item.value.toLocaleString()}
                  </strong>
                  {" / "}
                  {item.max.toLocaleString()}
                </span>
              </div>

              <div className="relative h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
                  style={{
                    width: mounted ? `${pct}%` : "0%",
                    background:
                      item.accent ||
                      "linear-gradient(90deg,#1d4ed8,#2563eb)",
                    transition: `width 1.1s cubic-bezier(0.2,0.8,0.2,1) ${i * 90}ms`,
                  }}
                >
                  <div
                    className="absolute top-0 h-full animate-th-shine"
                    style={{
                      left: "-40%",
                      width: "30%",
                      background:
                        "linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
