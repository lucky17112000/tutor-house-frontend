import { Skeleton } from "@/components/ui/skeleton";

/* ── Stat card ── */
function StatCardSk() {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-11 h-11 rounded-xl" />
        <Skeleton className="w-14 h-4 rounded-full" />
      </div>
      <div className="space-y-1.5">
        <Skeleton className="w-20 h-8 rounded-lg" />
        <Skeleton className="w-32 h-3 rounded-full" />
      </div>
      <Skeleton className="w-full h-8 rounded-lg" />
    </div>
  );
}

/* ── Bar chart ── */
function BarChartSk() {
  const heights = [52, 68, 45, 80, 62, 90, 72, 85];
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-6 space-y-5">
      <div className="space-y-2">
        <Skeleton className="w-52 h-4 rounded-lg" />
        <Skeleton className="w-72 h-3 rounded-full" />
      </div>
      <div className="flex items-end gap-2.5 h-36">
        {heights.map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <Skeleton className="w-64 h-3 rounded-full" />
    </div>
  );
}

/* ── Donut chart ── */
function DonutChartSk() {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-6 space-y-5">
      <div className="space-y-2">
        <Skeleton className="w-36 h-4 rounded-lg" />
        <Skeleton className="w-48 h-3 rounded-full" />
      </div>
      <div className="flex items-center justify-center">
        <Skeleton className="w-32 h-32 rounded-full" />
      </div>
      <div className="space-y-2.5">
        {[80, 65, 50, 40].map((w, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <Skeleton className="w-3 h-3 rounded-full shrink-0" />
            <Skeleton className={`h-3 rounded-full`} style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Progress list ── */
function ProgressListSk() {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-6 space-y-5">
      <div className="space-y-2">
        <Skeleton className="w-40 h-4 rounded-lg" />
        <Skeleton className="w-56 h-3 rounded-full" />
      </div>
      <div className="space-y-5">
        {[75, 55, 88, 62].map((pct, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="w-28 h-3 rounded-full" />
              <Skeleton className="w-10 h-3 rounded-full" />
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
              <Skeleton className="h-full rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Summary pills ── */
function PillsSk({ count = 4 }: { count?: number }) {
  return (
    <div className={`grid gap-3.5 grid-cols-2 ${count === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-5 space-y-2"
        >
          <Skeleton className="w-16 h-9 rounded-lg" />
          <Skeleton className="w-24 h-3 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/* ── Table / list ── */
function TableSk({ rows = 5, cols = 3 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 overflow-hidden">
      {/* Header bar */}
      <div className="flex justify-between items-center px-5.5 py-4.5 border-b border-zinc-100 dark:border-zinc-800">
        <Skeleton className="w-36 h-4 rounded-lg" />
        <Skeleton className="w-16 h-3 rounded-full" />
      </div>
      {/* Rows */}
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-5.5 py-4 border-b border-zinc-50 dark:border-zinc-800/50 last:border-b-0"
          >
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-36 h-3.5 rounded-full" />
              <Skeleton className="w-52 h-3 rounded-full" />
            </div>
            {cols >= 2 && <Skeleton className="w-12 h-4 rounded-full shrink-0" />}
            {cols >= 3 && <Skeleton className="w-16 h-5 rounded-full shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Full dashboard overview (student / tutor share same shape) ── */
export function DashboardOverviewSk({ pillCount = 4 }: { pillCount?: number }) {
  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="pb-1 space-y-2">
        <Skeleton className="w-64 h-7 rounded-xl" />
        <Skeleton className="w-80 h-3.5 rounded-full" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[0, 1, 2, 3].map((i) => <StatCardSk key={i} />)}
      </div>

      {/* Charts row */}
      <div className="grid gap-3.5 grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
        <BarChartSk />
        <DonutChartSk />
      </div>

      {/* Progress list (full width) */}
      <ProgressListSk />

      {/* Pills */}
      <PillsSk count={pillCount} />

      {/* Table */}
      <TableSk />
    </div>
  );
}

/* ── Profile hero skeleton ── */
export function ProfileHeroSk() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        {/* Banner */}
        <Skeleton className="h-28 w-full rounded-none" />
        <div className="px-7 pb-7">
          {/* Avatar row */}
          <div className="flex items-start gap-5 mb-5">
            <Skeleton className="-mt-10 w-20 h-20 rounded-2xl shrink-0" />
            <div className="pt-2 space-y-2">
              <Skeleton className="w-16 h-5 rounded-full" />
              <Skeleton className="w-44 h-5 rounded-lg" />
              <Skeleton className="w-56 h-3.5 rounded-full" />
            </div>
          </div>
          {/* Info grid */}
          <div className="grid sm:grid-cols-2 gap-2.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 px-4 py-3 space-y-1.5">
                <Skeleton className="w-16 h-2.5 rounded-full" />
                <Skeleton className="w-36 h-3.5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-4 space-y-2">
            <Skeleton className="w-6 h-6 rounded-lg" />
            <Skeleton className="w-12 h-7 rounded-lg" />
            <Skeleton className="w-20 h-2.5 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Generic page skeleton (for sub-dashboard pages) ── */
export function PageSk() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton className="w-48 h-6 rounded-xl" />
        <Skeleton className="w-64 h-3.5 rounded-full" />
      </div>
      <TableSk rows={8} />
    </div>
  );
}
