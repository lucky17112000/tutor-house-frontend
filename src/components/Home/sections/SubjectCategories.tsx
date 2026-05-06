import Link from "next/link";

const SUBJECTS = [
  { emoji: "➕", name: "Mathematics",     count: 142, color: "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900 hover:border-blue-400"  },
  { emoji: "⚛️", name: "Physics",         count: 98,  color: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900 hover:border-indigo-400" },
  { emoji: "🧪", name: "Chemistry",       count: 87,  color: "bg-violet-50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-900 hover:border-violet-400" },
  { emoji: "🧬", name: "Biology",         count: 74,  color: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900 hover:border-emerald-400" },
  { emoji: "🔤", name: "English",         count: 120, color: "bg-sky-50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900 hover:border-sky-400"  },
  { emoji: "📜", name: "History",         count: 56,  color: "bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900 hover:border-amber-400" },
  { emoji: "👨‍💻", name: "Programming",    count: 110, color: "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"  },
  { emoji: "🎵", name: "Music",           count: 45,  color: "bg-pink-50 dark:bg-pink-950/20 border-pink-100 dark:border-pink-900 hover:border-pink-400"  },
  { emoji: "🇫🇷", name: "French",          count: 38,  color: "bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900 hover:border-blue-400"  },
  { emoji: "🎨", name: "Art & Design",    count: 32,  color: "bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900 hover:border-rose-400"  },
  { emoji: "📐", name: "SAT / ACT Prep",  count: 64,  color: "bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900 hover:border-orange-400" },
  { emoji: "🌍", name: "Geography",       count: 29,  color: "bg-teal-50 dark:bg-teal-950/20 border-teal-100 dark:border-teal-900 hover:border-teal-400"  },
];

export default function SubjectCategories() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-295 mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2.5 text-blue-700 dark:text-blue-400 mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "currentColor",
                  flexShrink: 0,
                }}
              />
              Explore subjects
            </div>
            <h2
              className="font-extrabold text-zinc-900 dark:text-white tracking-[-0.035em]"
              style={{ fontSize: "clamp(30px,3.5vw,48px)", lineHeight: 1.05 }}
            >
              Learn anything from{" "}
              <em className="not-italic" style={{ fontStyle: "italic", color: "#1d4ed8" }}>
                40+ subjects
              </em>
            </h2>
          </div>
          <Link
            href="/tutor"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-700 hover:text-blue-700 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300"
          >
            View all tutors →
          </Link>
        </div>

        {/* Subject grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.name}
              href={`/tutor?subject=${encodeURIComponent(subject.name)}`}
              className={`group flex flex-col items-center gap-2.5 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${subject.color}`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {subject.emoji}
              </span>
              <div className="text-center">
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 leading-tight">
                  {subject.name}
                </p>
                <p
                  className="text-zinc-400 mt-0.5"
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {subject.count} tutors
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse all chip */}
        <div className="text-center mt-10">
          <Link
            href="/tutor"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(29,78,216,0.5)] transition-all duration-300"
          >
            Browse all 40+ subjects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
