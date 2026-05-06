import Link from "next/link";

const CHANNELS = [
  {
    label: "General",
    value: "hello@tutorhouse.com",
    hint: "Response in 24h",
  },
  {
    label: "Support",
    value: "support@tutorhouse.com",
    hint: "Response in 2h",
  },
  {
    label: "Partnerships",
    value: "partners@tutorhouse.com",
    hint: "Response in 48h",
  },
];

const OFFICES = [
  { city: "Brooklyn", time: "UTC-5" },
  { city: "Lagos", time: "UTC+1" },
  { city: "Dhaka", time: "UTC+6" },
];

export default function ContactPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] font-semibold">
            <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 motion-safe:animate-pulse" />
              Contact
            </span>
            <span className="hidden sm:inline text-zinc-400">·</span>
            <span className="hidden sm:inline text-zinc-400">
              We reply fast
            </span>
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-[-0.035em] text-zinc-900 dark:text-white">
            Let&apos;s talk about your next{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-blue-600 via-blue-500 to-sky-400 bg-clip-text text-transparent">
                breakthrough
              </span>
              <span
                className="absolute left-0 -bottom-2 h-1 w-full rounded-full bg-blue-100 dark:bg-blue-500/20 motion-safe:animate-pulse"
                aria-hidden="true"
              />
            </span>
            .
          </h1>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Tell us what you need and we will connect you with a specialist
            within one business day.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
              Avg reply: 2 hours
            </span>
            <span className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">
              Mon-Sun coverage
            </span>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10">
          <div className="bg-zinc-900 text-white rounded-3xl p-10 relative overflow-hidden">
            <div
              className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(29,78,216,0.45), transparent 65%)",
              }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.2em] text-blue-400 font-semibold">
                Reach us
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                A real human will reply.
              </h2>
              <p className="mt-4 text-white/70 max-w-sm">
                Our team is spread across three time zones, so you get fast,
                thoughtful answers no matter where you are.
              </p>

              <div className="mt-8 grid gap-3">
                {CHANNELS.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-blue-500/50 hover:translate-x-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 grid place-items-center text-lg">
                      @
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                        {c.label}
                      </div>
                      <div className="text-base font-medium">{c.value}</div>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-blue-200 bg-blue-500/20 px-2.5 py-1 rounded-full">
                      {c.hint}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Offices
                </div>
                <div className="mt-4 grid gap-3">
                  {OFFICES.map((office) => (
                    <div
                      key={office.city}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{office.city}</span>
                      <span className="text-white/60 font-mono text-xs">
                        {office.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-10">
            <div className="text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400 font-semibold">
              Send a message
            </div>
            <h3 className="mt-3 text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white">
              We will get back quickly.
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Prefer email? Write to us at{" "}
              <Link
                href="mailto:hello@tutorhouse.com"
                className="text-blue-700 dark:text-blue-400 font-semibold"
              >
                hello@tutorhouse.com
              </Link>
              .
            </p>

            <form className="mt-8 grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  First name
                  <input
                    className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 text-sm text-zinc-900 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Alex"
                  />
                </label>
                <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  Last name
                  <input
                    className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 text-sm text-zinc-900 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Morgan"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Email
                <input
                  className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 text-sm text-zinc-900 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="you@example.com"
                  type="email"
                />
              </label>

              <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Topic
                <select className="h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 text-sm text-zinc-900 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                  <option>Book a tutor</option>
                  <option>Become a tutor</option>
                  <option>Payments and billing</option>
                  <option>Partnerships</option>
                </select>
              </label>

              <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Message
                <textarea
                  className="min-h-35 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="Tell us about your goals, preferred subjects, and timeline."
                />
              </label>

              <button
                type="submit"
                className="h-12 rounded-full bg-zinc-900 text-white font-semibold text-sm hover:bg-blue-700 transition-all"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
