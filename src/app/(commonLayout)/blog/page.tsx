import Image from "next/image";
import Link from "next/link";

const FEATURED = {
  title: "How top students build a weekly study rhythm",
  excerpt:
    "A practical schedule template and accountability rituals used by high-performing learners.",
  date: "Apr 20, 2026",
  read: "6 min read",
  author: "Priya Banerjee",
  role: "Learning Scientist",
  image: "/images/photo-1649180556628-9ba704115795.avif",
};

const POSTS = [
  {
    title: "Choosing a tutor: 7 questions to ask before your first session",
    date: "Apr 13, 2026",
    read: "5 min read",
    tag: "Guide",
    author: "Noah Williams",
    image: "/images/photo-1565022536102-f7645c84354a.avif",
  },
  {
    title: "Why spaced repetition beats cramming every single time",
    date: "Apr 5, 2026",
    read: "4 min read",
    tag: "Science",
    author: "Ayesha Rahman",
    image: "/images/photo-1554475901-4538ddfbccc2.avif",
  },
  {
    title: "The art of asking better questions in tutoring sessions",
    date: "Mar 28, 2026",
    read: "7 min read",
    tag: "Skills",
    author: "Ben Carter",
    image: "/images/premium_photo-1661715935533-507e796866e5.avif",
  },
  {
    title: "How to set a realistic target score and actually hit it",
    date: "Mar 20, 2026",
    read: "6 min read",
    tag: "Planning",
    author: "Ariana Silva",
    image: "/images/photo-1649180556628-9ba704115795.avif",
  },
  {
    title: "Building focus: a 15-minute warmup routine for study days",
    date: "Mar 12, 2026",
    read: "4 min read",
    tag: "Focus",
    author: "Kai Yoshida",
    image: "/images/photo-1554475901-4538ddfbccc2.avif",
  },
  {
    title: "Math anxiety is real. Here is how to beat it fast",
    date: "Mar 6, 2026",
    read: "5 min read",
    tag: "Mindset",
    author: "Lina Ahmed",
    image: "/images/photo-1565022536102-f7645c84354a.avif",
  },
];

const FILTERS = ["All", "Guides", "Science", "Skills", "Planning", "Mindset"];

export default function BlogPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <section className="pt-28 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.18em] font-semibold">
            Blog
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-zinc-900 dark:text-white">
            Insights for smarter learning.
          </h1>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Research-backed strategies, tutor tips, and student stories to help
            you learn faster.
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden">
            <div className="relative min-h-80">
              <Image
                src={FEATURED.image}
                alt={FEATURED.title}
                fill
                className="object-cover"
                priority
              />
              <span className="absolute top-5 left-5 bg-blue-700 text-white text-[11px] uppercase tracking-[0.16em] font-semibold px-3 py-1.5 rounded-full">
                Featured
              </span>
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                {FEATURED.date} · {FEATURED.read}
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white">
                <Link
                  href="#"
                  className="hover:text-blue-700 dark:hover:text-blue-400"
                >
                  {FEATURED.title}
                </Link>
              </h2>
              <p className="mt-4 text-zinc-500 dark:text-zinc-400">
                {FEATURED.excerpt}
              </p>
              <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-300 font-semibold">
                {FEATURED.author}
                <span className="text-zinc-400 font-normal">
                  {" "}
                  · {FEATURED.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400 font-semibold">
            Browse topics
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                  i === 0
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-blue-700 hover:border-blue-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-16/10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-white/90 text-[10px] uppercase tracking-[0.16em] px-3 py-1 rounded-full">
                  {post.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                  {post.date} · {post.read}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  <Link
                    href="#"
                    className="hover:text-blue-700 dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                </h3>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  By {post.author}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
