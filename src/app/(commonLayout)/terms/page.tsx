"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  {
    id: "agreement",
    title: "Acceptance of terms",
    body: [
      "By using Tutor House, you agree to these terms. If you do not agree, please do not use the service.",
      "You must be at least 13 years old to create an account. If you are under 18, a parent or guardian must approve these terms on your behalf.",
    ],
  },
  {
    id: "accounts",
    title: "Your account",
    body: [
      "Keep your login credentials secure. You are responsible for all activity under your account.",
      "Do not share, sell, or transfer your account. We may suspend accounts that appear automated or abusive.",
    ],
  },
  {
    id: "sessions",
    title: "Booking sessions",
    body: [
      "Tutors set their own availability and rates. Tutor House helps with scheduling and payments, but tutors deliver the service.",
      "You can reschedule or cancel for free up to 12 hours before a session begins. No-shows may be charged in full.",
    ],
  },
  {
    id: "payments",
    title: "Payments and refunds",
    body: [
      "Payments are collected at booking and released to tutors after sessions complete.",
      "If your first paid session with a new tutor does not meet expectations, contact support within 7 days for a full refund.",
    ],
  },
  {
    id: "use",
    title: "Acceptable use",
    body: [
      "Do not harass, discriminate, or threaten other users.",
      "Do not use Tutor House to cheat on graded work or exams.",
      "Do not scrape, reverse engineer, or misuse the platform in ways that harm others.",
    ],
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: [
      "We may update these terms from time to time. We will notify you of material changes.",
      "Questions? Email legal@tutorhouse.com for help.",
    ],
  },
];

export default function TermsPage() {
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
            Terms of service.
          </h1>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            The plain-English version. Be respectful, follow the law, and use
            the platform as intended.
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
