"use client";

import { useState, useMemo } from "react";
import { SearchX } from "lucide-react";
import TutorCard from "./tutorrCard";
import TutorSearchBar from "./TutorSearchBar";

interface Props {
  tutors: any[];
}

export default function TutorGrid({ tutors }: Props) {
  const [query, setQuery]       = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tutors.filter((t) => {
      /* name / subject text match */
      if (q) {
        const name     = (t.name ?? "").toLowerCase();
        const bio      = (t.bio ?? t.description ?? "").toLowerCase();
        const category = (t.category?.name ?? t.categoryName ?? "").toLowerCase();
        if (!name.includes(q) && !category.includes(q) && !bio.includes(q)) return false;
      }

      /* price range */
      const rate = t.hourlyRate ?? 0;
      if (minPrice !== "" && rate < Number(minPrice)) return false;
      if (maxPrice !== "" && rate > Number(maxPrice)) return false;

      return true;
    });
  }, [tutors, query, minPrice, maxPrice]);

  const hasFilters = query.trim() !== "" || minPrice !== "" || maxPrice !== "";

  return (
    <>
      {/* ── Search bar ── */}
      <div className="px-4 sm:px-6 md:px-12 mb-8">
        <TutorSearchBar
          query={query}
          onQuery={setQuery}
          minPrice={minPrice}
          onMinPrice={setMinPrice}
          maxPrice={maxPrice}
          onMaxPrice={setMaxPrice}
          resultCount={filtered.length}
          totalCount={tutors.length}
        />
      </div>

      {/* ── Grid ── */}
      <div className="px-4 sm:px-6 md:px-12">
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-5">
              <SearchX className="size-7 text-zinc-400" />
            </div>
            <p className="text-[17px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              No tutors match your search
            </p>
            <p className="text-[14px] text-zinc-400 dark:text-zinc-500 mb-6 max-w-xs">
              Try adjusting your search term or clearing the price filter.
            </p>
            <button
              type="button"
              onClick={() => { setQuery(""); setMinPrice(""); setMaxPrice(""); }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            {/* Active filter summary pill */}
            {hasFilters && (
              <div className="mb-5 flex items-center gap-2 flex-wrap">
                <span className="text-[13px] text-zinc-500 dark:text-zinc-400">
                  Showing <span className="font-bold text-zinc-800 dark:text-white">{filtered.length}</span> of{" "}
                  <span className="font-bold text-zinc-800 dark:text-white">{tutors.length}</span> tutors
                </span>
                {query && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                    &ldquo;{query}&rdquo;
                  </span>
                )}
                {(minPrice !== "" || maxPrice !== "") && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                    ${minPrice || "0"} – ${maxPrice || "∞"}/hr
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((tutor: any) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
