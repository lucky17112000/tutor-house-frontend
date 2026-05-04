import PaginationControles from "@/components/shared/pagination/paginationControles";
import TutorCard from "@/components/tutor/tutorrCard";
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

  const tutors     = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
  const pagination = res?.pagination ?? null;

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="pt-28 pb-10 px-12">
        <p className="text-xs uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
          Find your tutor
        </p>
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Browse tutors
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-xl">
          Vetted experts across 180+ subjects — book a session in minutes.
        </p>
      </div>

      {/* Grid */}
      <div className="px-12">
        {Array.isArray(tutors) && tutors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">No tutors found</p>
            <p className="text-sm text-zinc-500 mt-1">Try a different page or check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(Array.isArray(tutors) ? tutors : []).map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination — only render when there is more than one page */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 mb-16 px-12">
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
