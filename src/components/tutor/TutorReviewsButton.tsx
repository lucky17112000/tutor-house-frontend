"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { getReviewsByTutorIdAction } from "@/actions/review.actions";
import { Star, X, MessageSquare, Loader2 } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  student?: { name?: string };
  createdAt?: string;
}

const AVATAR_GRADIENTS = [
  "from-violet-500 to-indigo-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
];

function avatarGradient(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h += name.charCodeAt(i);
  return AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < rating ? "#facc15" : "none"}
          stroke={i < rating ? "#f59e0b" : "#d1d5db"}
          strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewModal({
  tutorId,
  tutorName,
  initialReviews,
  onClose,
}: {
  tutorId: string;
  tutorName: string;
  initialReviews: Review[];
  onClose: () => void;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Fetch if not pre-loaded */
  useEffect(() => {
    if (initialReviews.length > 0) return;
    getReviewsByTutorIdAction(tutorId).then((list) => {
      setReviews(Array.isArray(list) ? list : []);
      setLoading(false);
    });
  }, [tutorId, initialReviews.length]);

  /* Animate in */
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Lock scroll & handle Escape */
  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = saved;
      document.removeEventListener("keydown", onKey);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return createPortal(
    /* Backdrop */
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      style={{ transition: "background 280ms ease", background: visible ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-md max-h-[85vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
        style={{
          transition: "opacity 280ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.16,1,0.3,1)",
          opacity:   visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(16px)",
        }}
      >
        {/* Gradient top bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-pink-500 shrink-0" />

        {/* Header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="min-w-0">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-1">
              Student Reviews
            </p>
            <h3 className="text-[17px] font-extrabold text-zinc-900 dark:text-white leading-tight truncate">
              {tutorName}
            </h3>
            {avg && (
              <div className="flex items-center gap-2 mt-2">
                <StarRow rating={Math.round(Number(avg))} size={15} />
                <span className="text-[13px] font-bold text-zinc-700 dark:text-zinc-200">{avg}</span>
                <span className="text-[12px] text-zinc-400 dark:text-zinc-500">
                  · {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="shrink-0 w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 grid place-items-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-150 mt-0.5"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-44 gap-3">
              <Loader2 className="size-7 text-indigo-500 animate-spin" />
              <p className="text-sm text-zinc-400">Loading reviews…</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-44 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 grid place-items-center">
                <Star className="size-6 text-zinc-300 dark:text-zinc-600" />
              </div>
              <p className="font-semibold text-zinc-700 dark:text-zinc-300">No reviews yet</p>
              <p className="text-[13px] text-zinc-400 max-w-[180px]">
                Be the first to leave a review for this tutor.
              </p>
            </div>
          ) : (
            reviews.map((r) => {
              const name     = r.student?.name ?? "Anonymous";
              const gradient = avatarGradient(name);
              const initials = name.charAt(0).toUpperCase();
              return (
                <div
                  key={r.id}
                  className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-xl shrink-0 grid place-items-center text-white text-[13px] font-bold bg-linear-to-br ${gradient} shadow-sm`}>
                      {initials}
                    </div>
                    {/* Name + stars */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[13.5px] font-semibold text-zinc-900 dark:text-white truncate">
                          {name}
                        </span>
                        {r.createdAt && (
                          <span className="text-[10.5px] text-zinc-400 shrink-0">
                            {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                          </span>
                        )}
                      </div>
                      <StarRow rating={r.rating} size={13} />
                    </div>
                  </div>
                  {r.comment && (
                    <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed pl-13 border-l-2 border-indigo-100 dark:border-indigo-900 ml-1">
                      {r.comment}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
          <button
            onClick={handleClose}
            className="w-full py-2.5 rounded-xl text-[13.5px] font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-1.5 text-[12.5px] font-semibold
                   text-indigo-600 dark:text-indigo-400
                   border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1
                   hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                   dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200"
      >
        <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
        Reviews
      </button>

      {open && (
        <ReviewModal
          tutorId={tutorId}
          tutorName={tutorName}
          initialReviews={initialReviews}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
