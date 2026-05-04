"use client";
import { useState } from "react";
import { getReviewsByTutorIdAction } from "@/actions/review.actions";
import { Star, X, MessageSquare, Loader2 } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  student?: { name?: string };
  createdAt?: string;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-zinc-300"}>★</span>
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
  const [open, setOpen]       = useState(false);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);

  const openModal = async () => {
    setOpen(true);
    // If we already have data (from embedded response), skip the fetch
    if (reviews.length > 0) return;
    setLoading(true);
    try {
      const list = await getReviewsByTutorIdAction(tutorId);
      setReviews(Array.isArray(list) ? list : []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openModal}
        className="group flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-full px-3 py-1 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200"
      >
        <MessageSquare className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
        Reviews
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-indigo-600 font-semibold">Reviews</p>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5">{tutorName}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-all duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                  <p className="text-sm text-zinc-500">Loading reviews…</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
                  <Star className="w-8 h-8 text-zinc-300" />
                  <p className="font-semibold text-zinc-700 dark:text-zinc-300">No reviews yet</p>
                  <p className="text-xs text-zinc-400">Be the first to review this tutor.</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-700"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {(review.student?.name ?? "A").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {review.student?.name ?? "Anonymous"}
                        </span>
                      </div>
                      <StarRow rating={review.rating} />
                    </div>
                    {review.comment && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-10">
                        {review.comment}
                      </p>
                    )}
                    {review.createdAt && (
                      <p className="text-[11px] text-zinc-400 mt-2 pl-10">
                        {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
