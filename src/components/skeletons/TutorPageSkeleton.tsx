import { Skeleton } from "@/components/ui/skeleton";

/* ── Single tutor card skeleton matching TutorCard layout ── */
export function TutorCardSk() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 rounded-[18px] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm w-full">
      {/* Gradient avatar header */}
      <Skeleton className="h-45 w-full rounded-none" />

      {/* Body */}
      <div className="flex flex-col gap-3 p-4.5">
        <Skeleton className="w-3/4 h-5 rounded-lg" />
        <div className="space-y-1.5">
          <Skeleton className="w-full h-3 rounded-full" />
          <Skeleton className="w-5/6 h-3 rounded-full" />
        </div>
        <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
        {/* Stars + actions row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-sm" />
            ))}
            <Skeleton className="w-6 h-4 rounded-full ml-1" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-14 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Full tutor listing page skeleton ── */
export function TutorGridSk({ count = 9 }: { count?: number }) {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="pt-28 pb-10 px-12 space-y-3">
        <Skeleton className="w-28 h-3.5 rounded-full" />
        <Skeleton className="w-52 h-8 rounded-xl" />
        <Skeleton className="w-80 h-3.5 rounded-full" />
      </div>

      {/* Filter / search bar */}
      <div className="px-12 pb-8 flex gap-3 flex-wrap">
        <Skeleton className="w-64 h-10 rounded-full" />
        <Skeleton className="w-36 h-10 rounded-full" />
        <Skeleton className="w-36 h-10 rounded-full" />
      </div>

      {/* Cards grid */}
      <div className="px-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <TutorCardSk key={i} />
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-9 h-9 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
