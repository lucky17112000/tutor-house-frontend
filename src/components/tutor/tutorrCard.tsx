import Link from "next/link";
import TutorReviewsButton from "./TutorReviewsButton";

// Pick a gradient based on tutor name so each card has a consistent unique colour
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
  return (name ?? "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function TutorCard({ tutor }: { tutor: any }) {
  const clampedRating = Math.min(5, Math.max(0, tutor.rating ?? 0));
  const fullStars     = Math.floor(clampedRating);
  const halfStar      = clampedRating % 1 >= 0.5;
  const emptyStars    = 5 - fullStars - (halfStar ? 1 : 0);
  const tutorId       = tutor.id;
  const category      = tutor.category?.name ?? tutor.categoryName ?? null;
  const [gradient, orb1, orb2] = pickGradient(tutor.name ?? "");
  const initials = getInitials(tutor.name ?? "");

  return (
    <div className="group flex flex-col bg-white dark:bg-zinc-900 rounded-[18px] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-[0_4px_8px_-2px_rgb(0_0_0/.10),0_2px_4px_-2px_rgb(0_0_0/.06)] hover:shadow-[0_24px_50px_-12px_rgba(79,70,229,0.22)] hover:-translate-y-1 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 w-full">

      {/* ── Animated gradient avatar header ── */}
      <div className={`relative h-45 w-full overflow-hidden bg-linear-to-br ${gradient} flex items-center justify-center`}>
        {/* Static orbs — no animation to prevent repaint flicker */}
        <div className={`absolute -top-6 -left-6 w-32 h-32 rounded-full ${orb1} blur-2xl`} />
        <div className={`absolute -bottom-6 -right-6 w-28 h-28 rounded-full ${orb2} blur-2xl`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/5 blur-xl" />

        {/* Mesh grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        {/* Initials circle */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl font-black text-white tracking-tight">{initials}</span>
          </div>
        </div>

        {/* Category chip */}
        {category && (
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-[11px] uppercase tracking-[0.14em] font-semibold px-2.5 py-1 rounded-full text-white border border-white/25">
            {category}
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/95 text-indigo-700 text-[13px] font-bold px-3 py-1 rounded-full shadow-md">
          ${tutor.hourlyRate ?? 0}/hr
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col gap-2 p-4.5">
        <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white truncate leading-snug">
          {tutor.name}
        </h3>

        <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 m-0">
          {tutor.bio ?? tutor.description ?? "No description available"}
        </p>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

        {/* Stars + actions row */}
        <div className="flex items-center justify-between gap-2">
          {/* Stars */}
          <div className="flex items-center gap-px text-sm shrink-0">
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={`f${i}`} className="text-yellow-400">★</span>
            ))}
            {halfStar && (
              <span className="bg-[linear-gradient(to_right,#facc15_50%,#e4e4e7_50%)] bg-clip-text text-transparent">★</span>
            )}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <span key={`e${i}`} className="text-zinc-300">★</span>
            ))}
            <span className="ml-1 text-[13px] font-semibold text-zinc-600 dark:text-zinc-300">
              {clampedRating.toFixed(1)}
            </span>
          </div>

          {/* Reviews + View Details */}
          <div className="flex items-center gap-2 shrink-0">
            {tutorId && (
              <TutorReviewsButton
                tutorId={tutorId}
                tutorName={tutor.name ?? "Tutor"}
                initialReviews={Array.isArray(tutor.reviews) ? tutor.reviews : []}
              />
            )}
            {tutorId ? (
              <Link
                href={`/tutor/${tutorId}`}
                className="text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors whitespace-nowrap"
              >
                Details →
              </Link>
            ) : (
              <span className="text-[13px] text-zinc-400">No details</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
