import PaginationControles from "@/components/shared/pagination/paginationControles";
import TutorGrid from "@/components/tutor/TutorGrid";
import { getAllTutors } from "@/service/tutor/user.services";
import { Suspense } from "react";
import { GraduationCap, Users, Star } from "lucide-react";

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
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900">

      {/* ── Hero header ── */}
      <div className="relative overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-blue-50/70 to-violet-50 dark:from-indigo-950/40 dark:via-blue-950/20 dark:to-violet-950/30" />
        <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-blue-200/50 dark:bg-blue-900/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-violet-200/50 dark:bg-violet-900/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full bg-indigo-100/40 dark:bg-indigo-900/10 blur-3xl pointer-events-none" />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #4f46e5 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative pt-28 pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800/60 mb-5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 font-bold">
              Expert Tutors
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4 leading-tight">
            Find Your Perfect
            <span className="block bg-linear-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Tutor Today
            </span>
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
            Connect with expert tutors and unlock your learning potential. Search by name, subject, or price range.
          </p>

          {/* Stats row */}
          {pagination && (
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-white/80 dark:border-zinc-800/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-xl font-black text-zinc-900 dark:text-white leading-none">{pagination.total}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Tutors</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-white/80 dark:border-zinc-800/80 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xl font-black text-zinc-900 dark:text-white leading-none">{pagination.totalPages}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Pages</p>
                </div>
              </div>

              <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
                Page <span className="font-bold text-zinc-700 dark:text-zinc-300">{currentPage}</span> of{" "}
                <span className="font-bold text-zinc-700 dark:text-zinc-300">{pagination.totalPages}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Search + Grid (client) ── */}
      <div className="max-w-7xl mx-auto">
        <TutorGrid tutors={tutors} />
      </div>

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 mb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
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
