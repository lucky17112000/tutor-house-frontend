"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How does tutor matching work?",
    a: "You tell us your subject, level, learning goal, and schedule. Our system instantly surfaces verified tutors who match your criteria. Most students book their first session within 10 minutes of signing up.",
  },
  {
    q: "Is the first session really free?",
    a: "Yes — completely free, no credit card required. Your first session is a trial so you can experience the tutor's teaching style before committing. If it's not a great fit, we'll match you with someone else at no charge.",
  },
  {
    q: "How are tutors vetted and verified?",
    a: "Every tutor passes a 3-stage process: a subject knowledge assessment, a live teaching trial, and a background check. Less than 15% of applicants are accepted. You'll always see a 'Verified' badge on approved profiles.",
  },
  {
    q: "What subjects and levels do you cover?",
    a: "We cover 40+ subjects from Grade 1 through university level — including Maths, Science, English, Languages, Programming, SAT/ACT prep, music theory, and more. Use the subject explorer to find your exact topic.",
  },
  {
    q: "How much does a session cost?",
    a: "Tutor rates vary based on experience and subject, typically ranging from $25–$80 per hour. You'll see the exact rate on each tutor's profile before booking. There are no hidden platform fees.",
  },
  {
    q: "Can I switch tutors if it's not a good fit?",
    a: "Absolutely. You can book different tutors any time. If a session doesn't meet your expectations, contact us within 24 hours and we'll either re-match you or issue a full refund — no questions asked.",
  },
  {
    q: "How long are sessions and how do I schedule them?",
    a: "Sessions are typically 60 minutes, but tutors also offer 30 and 90-minute slots. Booking is done directly through each tutor's calendar — you'll see their real-time availability and can reschedule up to 24 hours before.",
  },
  {
    q: "Do sessions happen online or in person?",
    a: "All sessions are online via our built-in video platform — interactive whiteboard, screen sharing, and session recordings included. No downloads needed; everything runs in your browser.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-295 mx-auto px-6">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <div
              className="inline-flex items-center gap-2.5 text-blue-700 dark:text-blue-400 mb-4"
              style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              <span style={{ display: "inline-block", width: 24, height: 1, background: "currentColor" }} />
              Common questions
            </div>
            <h2
              className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.035em]"
              style={{ fontSize: "clamp(30px,3.8vw,50px)", lineHeight: 1.06 }}
            >
              Everything you need{" "}
              <em className="not-italic" style={{ fontStyle: "italic", color: "#2563eb" }}>
                to know
              </em>
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 lg:text-right" style={{ fontSize: 15.5, lineHeight: 1.7 }}>
            Can&apos;t find the answer you&apos;re looking for?{" "}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline underline-offset-2 transition-colors">
              Chat with our team →
            </a>
          </p>
        </div>

        {/* ── Accordion ── */}
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 border-t border-zinc-100 dark:border-zinc-800">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span
                    className={`text-[15.5px] font-semibold leading-snug transition-colors duration-200 ${
                      isOpen
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-zinc-800 dark:text-zinc-200 group-hover:text-blue-700 dark:group-hover:text-blue-400"
                    }`}
                  >
                    {faq.q}
                  </span>

                  {/* Icon */}
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-blue-600 border-blue-600 text-white rotate-45"
                        : "border-zinc-200 dark:border-zinc-700 text-zinc-400 group-hover:border-blue-300 group-hover:text-blue-600 dark:group-hover:border-blue-700 dark:group-hover:text-blue-400"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{ maxHeight: isOpen ? 300 : 0 }}
                >
                  <p
                    className="text-zinc-500 dark:text-zinc-400 pb-6 pr-12 leading-relaxed"
                    style={{ fontSize: 15, lineHeight: 1.75 }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom trust strip ── */}
        <div className="mt-16 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-8 py-6 flex flex-wrap items-center justify-between gap-6">
          <p className="text-zinc-600 dark:text-zinc-400 text-[15px] font-medium">
            Still unsure? Talk to a real person — we respond in under 2 minutes.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-blue-700 dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact support
            </a>
            <a
              href="/tutor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-300 hover:text-blue-700 dark:hover:border-blue-700 dark:hover:text-blue-400 transition-all duration-300"
            >
              Browse tutors
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
