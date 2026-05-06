type ReviewItem = {
  id?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
  tutor?: { name?: string };
  user?: { name?: string };
};

type ReviewProps = {
  reviews: ReviewItem[];
};

const Review = ({ reviews }: ReviewProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400 font-semibold">
            Reviews
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-[-0.02em]">
            What students are saying
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Community feedback from recent sessions.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 text-center">
            <div className="text-4xl mb-3">💬</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              No reviews yet
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Once students leave feedback, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review, index) => {
              const createdAt = review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "";

              return (
                <div
                  key={review.id ?? index}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Tutor
                      </div>
                      <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {review.tutor?.name ?? "Tutor"}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {createdAt}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="font-semibold">Rating:</span>
                    <span>{review.rating ?? "—"}</span>
                    <span className="text-zinc-400">•</span>
                    <span className="font-semibold">Student:</span>
                    <span>{review.user?.name ?? "Student"}</span>
                  </div>

                  <p className="mt-4 text-zinc-600 dark:text-zinc-300">
                    {review.comment ?? "No comment provided."}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
