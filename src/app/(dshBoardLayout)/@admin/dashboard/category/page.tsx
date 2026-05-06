import { BugReportForm } from "@/components/adminCatgory/categoryCreate";
import { getCategories } from "@/service/admin";
import { LayoutGrid, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoryCreatePage() {
  const res = await getCategories();
  const categories: any[] = Array.isArray(res)
    ? res
    : (res?.data ?? res?.categories ?? res?.result ?? []);

  const ICON_GRADIENTS = [
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-600",
    "from-cyan-500 to-blue-600",
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      {/* ── Page header ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">
          Admin · Categories
        </p>
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Manage categories
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Create and browse the subjects tutors can teach on the platform.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

        {/* LEFT — existing categories */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.06em]">
              All categories
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
              <LayoutGrid className="w-3 h-3" />
              {categories.length}
            </span>
          </div>

          {categories.length === 0 ? (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-10 text-center">
              <BookOpen className="w-8 h-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">No categories yet</p>
              <p className="text-xs text-zinc-400 mt-1">Create your first one using the form.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat: any, i: number) => {
                const gradient = ICON_GRADIENTS[i % ICON_GRADIENTS.length];
                const initials = (cat.name ?? "?")
                  .split(" ")
                  .map((w: string) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={cat.id ?? i}
                    className="group flex items-start gap-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-4 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm`}
                    >
                      {initials}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {cat.name}
                      </p>
                      {cat.description && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT — create form */}
        <div className="lg:sticky lg:top-6">
          <BugReportForm />
        </div>
      </div>
    </div>
  );
}
