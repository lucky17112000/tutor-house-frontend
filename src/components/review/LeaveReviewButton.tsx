"use client";

import { useState, useTransition } from "react";
import { leaveReviewAction } from "@/actions/review.actions";

type LeaveReviewButtonProps = {
  tutorId: string;
  tutorName?: string;
};

export default function LeaveReviewButton({
  tutorId,
  tutorName,
}: LeaveReviewButtonProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => {
          setMessage(null);
          setOpen((prev) => !prev);
        }}
        className="px-4 py-2 rounded-full text-sm font-semibold bg-zinc-900 text-white hover:bg-blue-700 transition-all"
      >
        Review
      </button>

      {open && (
        <form
          action={(formData) => {
            startTransition(async () => {
              const result = await leaveReviewAction(formData);
              if (result?.error) {
                setMessage(result.error);
                return;
              }
              setMessage("Review submitted.");
              setOpen(false);
            });
          }}
          className="w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-lg"
        >
          <input type="hidden" name="tutorId" value={tutorId} />
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            Review {tutorName ?? "Tutor"}
          </div>

          <label className="mt-3 block text-xs uppercase tracking-[0.18em] text-zinc-400">
            Rating
          </label>
          <select
            name="rating"
            required
            defaultValue=""
            className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Select rating
            </option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label className="mt-3 block text-xs uppercase tracking-[0.18em] text-zinc-400">
            Comment
          </label>
          <textarea
            name="comment"
            rows={3}
            placeholder="Share a quick note"
            className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm"
          />

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-700 text-white hover:bg-blue-600 disabled:opacity-70"
            >
              {pending ? "Sending..." : "Submit"}
            </button>
          </div>

          {message && (
            <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
