import { getSession } from "@/service/auth";
import { getTutorBookings } from "@/service/tutor/user.services";

export const dynamic = "force-dynamic";

export default async function TutorReviewPage() {
  const [sessionRes, result] = await Promise.all([
    getSession(),
    getTutorBookings(),
  ]);

  if (!result || result.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-semibold">
          ❌ {result?.error || "Could not load reviews."}
        </p>
      </div>
    );
  }

  const tutors = Array.isArray(result)
    ? result
    : (result?.data ??
        result?.tutors ??
        result?.result ??
        result?.data?.data ??
        result?.data?.result ??
        []);

  const userId = sessionRes?.data?.user?.id ?? sessionRes?.data?.id ?? null;
  const userEmail = sessionRes?.data?.user?.email ?? null;

  const scopedById = userId
    ? tutors.filter((tutor: any) => tutor?.userId === userId)
    : [];
  const scopedByEmail = userEmail
    ? tutors.filter((tutor: any) => tutor?.user?.email === userEmail)
    : [];

  const usedScope = scopedById.length > 0
    ? "id"
    : scopedByEmail.length > 0
      ? "email"
      : "all";

  const scopedTutors = scopedById.length > 0
    ? scopedById
    : scopedByEmail.length > 0
      ? scopedByEmail
      : tutors;

  const reviewsFromTutors = scopedTutors.flatMap((tutor: any) =>
    (tutor?.reviews ?? []).map((review: any) => ({
      ...review,
      tutorName: tutor?.name,
    })),
  );

  const reviewsFromBookings = scopedTutors.flatMap((tutor: any) =>
    (tutor?.bookings ?? []).flatMap((booking: any) =>
      (booking?.reviews ?? booking?.review ? [booking?.review ?? booking?.reviews] : []).flat().map(
        (review: any) => ({
          ...review,
          tutorName: tutor?.name,
        }),
      ),
    ),
  );

  const reviews = reviewsFromTutors.length > 0
    ? reviewsFromTutors
    : reviewsFromBookings;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400 font-semibold">
            My Reviews
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-[-0.02em]">
            Student feedback
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Reviews collected from your bookings.
          </p>
        </div>

        {usedScope === "all" && (userId || userEmail) && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
            Could not match your tutor profile from session; showing all reviews.
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 text-center">
            <div className="text-4xl mb-3">💬</div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              No reviews yet
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              When students leave feedback, it will show up here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {reviews.map((review: any, index: number) => {
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
                        {review.tutorName ?? "Tutor"}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {createdAt}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="font-semibold">Rating:</span>
                    <span>{review.rating ?? "—"}</span>
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
}
