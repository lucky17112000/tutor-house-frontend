"use client";

import { useState } from "react";
import Link from "next/link";

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
      setEmail("");
    }
  };

  return (
    <section
      className="mx-6 mb-0 rounded-[28px] overflow-hidden relative"
      style={{ background: "#1d4ed8" }}
    >
      {/* Decorative radial glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(circle at 80% 0%, rgba(255,255,255,0.18), transparent 50%), radial-gradient(circle at 0% 100%, rgba(0,0,0,0.25), transparent 50%)",
        }}
      />

      <div
        className="relative grid grid-cols-1 md:grid-cols-2 gap-14 items-center px-12 py-20 max-sm:px-8 max-sm:py-14"
      >
        {/* Left — text */}
        <div>
          <div
            className="mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Get started today
          </div>

          <h2
            className="text-white font-extrabold tracking-[-0.03em] mb-4"
            style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.05 }}
          >
            Ready to find{" "}
            <em style={{ fontStyle: "italic", fontWeight: 500, opacity: 0.75 }}>
              your tutor?
            </em>
          </h2>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.82)",
              maxWidth: "38ch",
            }}
          >
            Drop your email and we&apos;ll send you three personalized tutor
            matches based on what you&apos;re looking for.
          </p>

          <div className="flex flex-wrap gap-5 mt-6">
            {["First session free", "No credit card needed", "Cancel anytime"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
                style={{ fontSize: 13.5, color: "rgba(255,255,255,0.78)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M2 7l4 4 6-7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div
              className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center border border-white/20"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-bold text-xl mb-2">
                You&apos;re on the list!
              </h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)" }}>
                We&apos;ll send your three tutor matches shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-2 rounded-full flex gap-2 shadow-[0_24px_48px_-12px_rgba(10,10,10,0.4)]"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-none outline-none bg-transparent px-5 text-zinc-900 placeholder:text-zinc-400"
                style={{ fontSize: 15, minWidth: 0 }}
              />
              <button
                type="submit"
                className="flex-shrink-0 px-6 py-3 rounded-full bg-zinc-900 text-white font-semibold transition-all duration-300 hover:bg-blue-800 hover:scale-[1.02]"
                style={{ fontSize: 14.5 }}
              >
                Get matched →
              </button>
            </form>
          )}

          <div
            className="mt-5 flex items-center gap-2"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            We never share your email. Unsubscribe in one click.
          </div>

          <div className="mt-6 pt-6 border-t border-white/15 flex items-center gap-4">
            <Link
              href="/signup"
              className="flex-1 text-center py-3 px-5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Create free account
            </Link>
            <Link
              href="/tutor"
              className="flex-1 text-center py-3 px-5 rounded-full font-semibold text-sm bg-white text-blue-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Browse tutors →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
