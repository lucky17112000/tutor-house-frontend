import PaginationControles from "@/components/shared/pagination/paginationControles";
import TutorGrid from "@/components/tutor/TutorGrid";
import { getAllTutors } from "@/service/tutor/user.services";
import { Suspense } from "react";

const TutorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const res = await getAllTutors(currentPage);

  const tutors = Array.isArray(res?.data)
    ? res.data
    : Array.isArray(res)
      ? res
      : [];
  const pagination = res?.pagination ?? null;

  return (
    <div className="min-h-screen">
      {/* ── Page header ── */}
      <div className="pt-24 pb-6 px-4 sm:px-6 md:px-12 sm:pt-28">
        <p className="text-xs uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
          Find your tutor
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Browse tutors
            </h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400 text-sm">
              Find Your Brain Doctor Here
            </p>
          </div>
        </div>
      </div>

      {/* ── Search + Grid (client) ── */}
      <TutorGrid tutors={tutors} />

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 mb-16 px-4 sm:px-6 md:px-12">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3.5 shadow-sm">
            <Suspense>
              <PaginationControles meta={pagination} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorPage;
