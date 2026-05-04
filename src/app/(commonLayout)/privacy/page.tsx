"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  {
    id: "summary",
    title: "The short version",
    body: [
      "We collect what we need to run the service and never sell your data.",
      "You can access, export, or delete your data at any time by contacting support.",
    ],
  },
  {
    id: "collect",
    title: "What we collect",
    body: [
      "Account details, booking activity, and basic usage analytics.",
      "Device and location data used for security and fraud prevention.",
    ],
  },
  {
    id: "use",
    title: "How we use it",
    body: [
      "Match you with tutors, schedule sessions, and process payments.",
      "Improve the product with aggregated, de-identified usage data.",
    ],
  },
  {
    id: "share",
    title: "Who we share with",
    body: [
      "Trusted processors like payment, video, hosting, and email vendors.",
      "We never share your data with advertisers or sell it to third parties.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "Request access, corrections, or deletion of your data at any time.",
      "Contact privacy@tutorhouse.com for assistance within 30 days.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "Data is encrypted in transit and at rest.",
      "Access is restricted to authorized staff and audited regularly.",
    ],
  },
];

export default function PrivacyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0]?.id ?? "");

  useEffect(() => {
    const headings = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -65% 0px" },
    );

    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <section className="pt-28 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.18em] font-semibold">
            Legal
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 dark:text-white">
            Privacy policy.
          </h1>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            We collect the minimum required to run Tutor House. Here is the
            plain-English breakdown.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          <aside className="lg:sticky lg:top-28 h-fit border-l border-zinc-200 dark:border-zinc-800 pl-5">
            <div className="text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 font-semibold mb-4">
              On this page
            </div>
            <ol className="grid gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`flex gap-3 transition-colors ${
                      activeId === s.id
                        ? "text-blue-700 dark:text-blue-400"
                        : "hover:text-blue-700 dark:hover:text-blue-400"
                    }`}
                    aria-current={activeId === s.id ? "location" : undefined}
                  >
                    <span className="font-mono text-[11px] text-zinc-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 md:p-14">
            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.16em] text-zinc-400 mb-10 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <span>Effective: April 1, 2026</span>
              <span>Version 4.2</span>
            </div>

            {SECTIONS.map((section, i) => (
              <section key={section.id} id={section.id} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white tracking-[-0.02em]">
                  <span className="font-mono text-xs text-blue-700 dark:text-blue-400 mr-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-4 grid gap-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {section.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
