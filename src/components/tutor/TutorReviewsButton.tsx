"use client";

import { useState, useEffect, useCallback } from "react";
import { getReviewsByTutorIdAction } from "@/actions/review.actions";
import { Star, X, MessageSquare, Loader2, ChevronRight } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  student?: { name?: string };
  createdAt?: string;
}

const AVATAR_COLORS = [
  "from-violet-500 to-indigo-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

function getColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h += name.charCodeAt(i);
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={13} height={13} viewBox="0 0 24 24"
          fill={i < rating ? "#facc15" : "none"}
          stroke={i < rating ? "#facc15" : "#d1d5db"}
          strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function TutorReviewsButton({
  tutorId,
  tutorName,
  initialReviews = [],
}: {
  tutorId: string;
  tutorName: string;
  initialReviews?: Review[];
}) {
  const [open,    setOpen]    = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(initialReviews.length > 0);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const handleOpen = async () => {
    setOpen(true);
    if (fetched) return;
    setLoading(true);
    try {
      const list = await getReviewsByTutorIdAction(tutorId);
      setReviews(Array.isArray(list) ? list : []);
      setFetched(true);
    } finally {
      setLoading(false);
    }
  };

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      {/* ── Trigger ── */}
      <button
        onClick={handleOpen}
        className="group flex items-center gap-1.5 text-[12.5px] font-semibold
                   text-indigo-600 dark:text-indigo-400
                   border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1
                   hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                   dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200"
      >
        <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
        Reviews
      </button>

      {/* ── Dark overlay — no blur, pure opacity ── */}
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
      />

      {/* ── Side drawer — slides in from right ── */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm
                   bg-white dark:bg-zinc-900
                   border-l border-zinc-100 dark:border-zinc-800
                   shadow-[-24px_0_60px_-12px_rgba(0,0,0,0.18)]
                   flex flex-col
                   transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-3 px-6 pt-6 pb-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="min-w-0">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-1">
              Reviews
            </p>
            <h3 className="text-[16px] font-bold text-zinc-900 dark:text-white leading-tight truncate">
              {tutorName}
            </h3>
            {avg && (
              <div className="flex items-center gap-2 mt-2">
                <Stars rating={Math.round(Number(avg))} />
                <span className="text-[13px] font-bold text-zinc-700 dark:text-zinc-300">
                  {avg}
                </span>
                <span className="text-[12px] text-zinc-400">
                  ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            )}
          </div>
          <button
            onClick={close}
            className="shrink-0 w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800
                       flex items-center justify-center mt-0.5
                       text-zinc-400 hover:text-zinc-900 dark:hover:text-white
                       hover:bg-zinc-200 dark:hover:bg-zinc-700
                       transition-all duration-150"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <Loader2 className="size-6 text-indigo-500 animate-spin" />
              <p className="text-sm text-zinc-400">Loading reviews…</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 grid place-items-center">
                <Star className="size-6 text-zinc-300 dark:text-zinc-600" />
              </div>
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">No reviews yet</p>
              <p className="text-[13px] text-zinc-400 max-w-[180px]">
                Be the first to leave a review for this tutor.
              </p>
            </div>
          ) : (
            reviews.map((r, i) => {
              const name  = r.student?.name ?? "Anonymous";
              const color = getColor(name);
              return (
                <div
                  key={r.id}
                  className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-4"
                >
                  {/* Top row */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl shrink-0 grid place-items-center text-white text-[11px] font-bold bg-linear-to-br ${color}`}>
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13.5px] font-semibold text-zinc-900 dark:text-white truncate">
                          {name}
                        </span>
                        {r.createdAt && (
                          <span className="text-[10.5px] text-zinc-400 shrink-0">
                            {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      <Stars rating={r.rating} />
                    </div>
                  </div>

                  {/* Comment */}
                  {r.comment && (
                    <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed pl-12">
                      &ldquo;{r.comment}&rdquo;
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={close}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       text-[13.5px] font-semibold
                       bg-zinc-100 dark:bg-zinc-800
                       text-zinc-700 dark:text-zinc-300
                       hover:bg-zinc-200 dark:hover:bg-zinc-700
                       transition-colors duration-200"
          >
            <ChevronRight className="size-4 rotate-180" />
            Close
          </button>
        </div>
      </div>
    </>
  );
}
