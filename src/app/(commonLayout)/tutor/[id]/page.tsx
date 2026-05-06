import { getSession } from "@/service/auth";
import { getSingleTutor } from "@/service/tutor/user.services";
import { getReviewsByTutorId } from "@/service/booking";
import Link from "next/link";
import { Star, Clock, DollarSign, BookOpen, ArrowLeft } from "lucide-react";

const GRADIENTS = [
  ["from-blue-600 via-indigo-600 to-violet-600",   "bg-blue-500/20",   "bg-indigo-500/20"],
  ["from-indigo-500 via-purple-600 to-pink-500",   "bg-purple-500/20", "bg-pink-500/20"],
  ["from-cyan-500 via-blue-600 to-indigo-700",     "bg-cyan-500/20",   "bg-blue-500/20"],
  ["from-violet-600 via-purple-600 to-indigo-600", "bg-violet-500/20", "bg-purple-500/20"],
  ["from-blue-500 via-cyan-500 to-teal-600",       "bg-blue-500/20",   "bg-teal-500/20"],
];

function pickGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < (name ?? "").length; i++) hash += name.charCodeAt(i);
  return GRADIENTS[hash % GRADIENTS.length];
}

function getInitials(name: string) {
  return (name ?? "?").split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

function StarRow({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5 text-base">
      {Array.from({ length: full  }).map((_, i) => <span key={`f${i}`} className="text-yellow-400">★</span>)}
      {half && <span className="bg-[linear-gradient(to_right,#facc15_50%,#e4e4e7_50%)] bg-clip-text text-transparent">★</span>}
      {Array.from({ length: empty }).map((_, i) => <span key={`e${i}`} className="text-zinc-300">★</span>)}
    </span>
  );
}

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [res, session] = await Promise.all([getSingleTutor(id), getSession()]);

  const tutor     = res?.result ?? res;
  const userRole  = session?.data?.user?.role ?? session?.data?.role ?? null;
  const isStudent = userRole?.toLowerCase() === "student";

  // Reviews are keyed by profile UUID (tutor.id), which is the URL param
  const reviewsRes = await getReviewsByTutorId(id);

  const normalise = (raw: any): any[] => {
    if (Array.isArray(raw))          return raw;
    if (Array.isArray(raw?.result))  return raw.result;
    if (Array.isArray(raw?.data))    return raw.data;
    if (Array.isArray(raw?.reviews)) return raw.reviews;
    return [];
  };

  const reviews = normalise(reviewsRes);

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
    : tutor?.rating ?? 0;

  let availability: Record<string, string[]> = {};
  try {
    const raw = tutor?.availability;
    if (raw) availability = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch { availability = {}; }

  const [gradient, orb1, orb2] = pickGradient(tutor?.name ?? "");
  const initials = getInitials(tutor?.name ?? "");

  const stats = [
    { icon: Star,        label: "Rating",      value: avgRating ? `${Number(avgRating).toFixed(1)} / 5` : "—" },
    { icon: Clock,       label: "Experience",  value: tutor?.experience ?? "—" },
    { icon: DollarSign,  label: "Hourly Rate", value: tutor?.hourlyRate ? `$${tutor.hourlyRate}` : "—" },
    { icon: BookOpen,    label: "Category",    value: tutor?.category?.name ?? "—" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f1] dark:bg-zinc-950 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Back link */}
        <Link
          href="/tutor"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-8 hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to tutors
        </Link>

        {/* ── Hero card ── */}
        <div className="bg-white dark:bg-zinc-900 rounded-[28px] overflow-hidden shadow-[0_20px_60px_-16px_rgba(79,70,229,0.18)] border border-zinc-100 dark:border-zinc-800 mb-6">

          {/* Gradient banner */}
          <div className={`relative h-52 bg-linear-to-br ${gradient} flex items-end overflow-hidden`}>
            {/* Static orbs */}
            <div className={`absolute -top-8 -left-8 w-48 h-48 rounded-full ${orb1} blur-3xl`} />
            <div className={`absolute -bottom-8 -right-8 w-40 h-40 rounded-full ${orb2} blur-3xl`} />
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />

            {/* Avatar */}
            <div className="relative z-10 mb-0 px-8 pb-0 flex items-end gap-5 w-full">
              <div className="translate-y-1/2 w-24 h-24 rounded-2xl bg-white/25 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-xl shrink-0">
                <span className="text-3xl font-black text-white">{initials}</span>
              </div>
              {/* Category chip */}
              {tutor?.category?.name && (
                <div className="mb-4 bg-white/20 backdrop-blur-sm text-xs uppercase tracking-[0.16em] font-semibold px-3 py-1 rounded-full text-white border border-white/25">
                  {tutor.category.name}
                </div>
              )}
            </div>
          </div>

          {/* Name + bio */}
          <div className="px-8 pt-16 pb-6">
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {tutor?.name}
            </h1>
            {avgRating > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <StarRow rating={avgRating} />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                  {Number(avgRating).toFixed(1)}
                </span>
                <span className="text-sm text-zinc-400">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
              </div>
            )}
            {tutor?.bio && (
              <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm max-w-2xl italic">
                &ldquo;{tutor.bio}&rdquo;
              </p>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-100 dark:bg-zinc-800 border-t border-zinc-100 dark:border-zinc-800">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 py-5 px-4 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <Icon className="w-4 h-4 text-indigo-500" />
                <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-400 font-semibold">{label}</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Availability ── */}
        {Object.keys(availability).length > 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-[22px] border border-zinc-100 dark:border-zinc-800 shadow-sm p-6 mb-6">
            <h2 className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-semibold mb-4">Availability</h2>
            <div className="grid gap-2">
              {Object.entries(availability).map(([day, slots]) => (
                <div key={day} className="flex items-center gap-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl px-4 py-2.5">
                  <span className="capitalize font-semibold text-indigo-700 dark:text-indigo-400 text-sm w-24 shrink-0">
                    {day}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(slots as string[]).map((slot, i) => (
                      <span key={i} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Book Now / CTA ── */}
        <div className="mb-6">
          {isStudent ? (
            <Link
              href={`/dashboard/createBook/${id}`}
              className="group relative w-full flex items-center justify-center gap-2 h-13 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-[15px] overflow-hidden isolate shadow-[0_8px_22px_-8px_rgba(10,10,10,0.4)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(79,70,229,0.5)] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10" />
              <span className="group-hover:text-white transition-colors duration-300">Book a session</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : (
            <div className="w-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 py-4 px-5 rounded-2xl text-center text-sm font-medium">
              {session?.data
                ? "Only students can book a tutor session."
                : "Please log in as a student to book this tutor."}
            </div>
          )}
        </div>

        {/* ── Reviews ── */}
        <div className="bg-white dark:bg-zinc-900 rounded-[22px] border border-zinc-100 dark:border-zinc-800 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs uppercase tracking-[0.2em] text-indigo-600 font-semibold">
              Student Reviews
            </h2>
            <span className="text-sm text-zinc-400">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
          </div>

          {reviews.length === 0 ? (
            <div className="flex flex-col items-center py-10 gap-2 text-center">
              <Star className="w-8 h-8 text-zinc-300" />
              <p className="font-semibold text-zinc-600 dark:text-zinc-400">No reviews yet</p>
              <p className="text-xs text-zinc-400">Be the first to leave a review after your session.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="group bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-5 border border-zinc-100 dark:border-zinc-700 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm">
                        {(review.student?.name ?? "A").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {review.student?.name ?? "Anonymous"}
                        </p>
                        {review.createdAt && (
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <StarRow rating={review.rating ?? 0} />
                      <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 ml-1">
                        {review.rating ?? 0}
                      </span>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-12">
                      {review.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
