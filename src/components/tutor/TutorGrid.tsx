"use client";

import { useState, useMemo } from "react";
import { SearchX, Search, ChevronUp, SlidersHorizontal } from "lucide-react";
import TutorCard from "./tutorrCard";
import TutorSearchBar from "./TutorSearchBar";

interface Props {
  tutors: any[];
}

export default function TutorGrid({ tutors }: Props) {
  const [query, setQuery]         = useState("");
  const [minPrice, setMinPrice]   = useState("");
  const [maxPrice, setMaxPrice]   = useState("");
  const [showSearch, setShowSearch] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tutors.filter((t) => {
      if (q) {
        const name     = (t.name ?? "").toLowerCase();
        const bio      = (t.bio ?? t.description ?? "").toLowerCase();
        const category = (t.category?.name ?? t.categoryName ?? "").toLowerCase();
        if (!name.includes(q) && !category.includes(q) && !bio.includes(q)) return false;
      }
      const rate = t.hourlyRate ?? 0;
      if (minPrice !== "" && rate < Number(minPrice)) return false;
      if (maxPrice !== "" && rate > Number(maxPrice)) return false;
      return true;
    });
  }, [tutors, query, minPrice, maxPrice]);

  const hasFilters  = query.trim() !== "" || minPrice !== "" || maxPrice !== "";
  const filterCount = (query.trim() !== "" ? 1 : 0) + (minPrice !== "" || maxPrice !== "" ? 1 : 0);

  return (
    <div className="px-4 sm:px-6 md:px-12 py-8 space-y-6">

      {/* ── Search toggle bar ── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowSearch((v) => !v)}
          className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[13px] font-semibold border transition-all duration-300 select-none ${
            showSearch
              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:border-indigo-700"
              : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
          }`}
          aria-expanded={showSearch}
          aria-label={showSearch ? "Hide search" : "Show search"}
        >
          {showSearch ? (
            <>
              <ChevronUp className="size-4 transition-transform duration-300" />
              <span>Hide Search</span>
            </>
          ) : (
            <>
              <Search className="size-4" />
              <span>Search & Filter</span>
            </>
          )}

          {/* Active filters badge — only when search is hidden */}
          {!showSearch && filterCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-black grid place-items-center shadow-md ring-2 ring-white dark:ring-zinc-900 animate-bounce">
              {filterCount}
            </span>
          )}
        </button>

        {/* Quick status chip */}
        <div className="flex items-center gap-2 text-[13px] text-zinc-500 dark:text-zinc-400">
          <SlidersHorizontal className="size-3.5 opacity-60" />
          {hasFilters ? (
            <span>
              <span className="font-bold text-zinc-800 dark:text-white">{filtered.length}</span>
              {" "}of{" "}
              <span className="font-bold text-zinc-800 dark:text-white">{tutors.length}</span>
              {" "}tutors match
            </span>
          ) : (
            <span>
              <span className="font-bold text-zinc-800 dark:text-white">{tutors.length}</span>
              {" "}tutors on this page
            </span>
          )}
        </div>
      </div>

      {/* ── Collapsible search bar ── */}
      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          maxHeight: showSearch ? 600 : 0,
          opacity:   showSearch ? 1 : 0,
          transform: showSearch ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-[0_8px_32px_-8px_rgba(79,70,229,0.12)] p-4">
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
      </div>

      {/* ── Tutor grid / empty state ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-5 shadow-inner">
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
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((tutor: any) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
