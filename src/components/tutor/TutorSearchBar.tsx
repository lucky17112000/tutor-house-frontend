"use client";

import { useRef, useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Sparkles, DollarSign } from "lucide-react";

interface Props {
  query: string;
  onQuery: (v: string) => void;
  minPrice: string;
  onMinPrice: (v: string) => void;
  maxPrice: string;
  onMaxPrice: (v: string) => void;
  resultCount: number;
  totalCount: number;
}

const PRICE_PRESETS = [
  { label: "Any price", min: "", max: "" },
  { label: "Under $25", min: "", max: "25" },
  { label: "$25 – $50", min: "25", max: "50" },
  { label: "$50 – $80", min: "50", max: "80" },
  { label: "$80+",      min: "80", max: ""   },
];

export default function TutorSearchBar({
  query, onQuery,
  minPrice, onMinPrice,
  maxPrice, onMaxPrice,
  resultCount, totalCount,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [focused,  setFocused]  = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasPriceFilter = minPrice !== "" || maxPrice !== "";
  const hasAnyFilter   = query.trim() !== "" || hasPriceFilter;
  const activeFilters  = (hasPriceFilter ? 1 : 0);   // count of filter groups active
  const isFiltered     = resultCount < totalCount;

  const clearAll = () => {
    onQuery("");
    onMinPrice("");
    onMaxPrice("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="w-full space-y-2">

      {/* ── Top row: search bar + separate filter button ── */}
      <div className="flex items-center gap-3">

        {/* ── Compact search input ── */}
        <div
          className={`relative flex items-center flex-1 min-w-0 rounded-xl border transition-all duration-300 ${
            focused
              ? "border-blue-400 dark:border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.13)] bg-white dark:bg-zinc-900"
              : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600"
          }`}
        >
          {/* Icon */}
          <span className={`pl-3 pr-2 shrink-0 transition-colors duration-200 ${focused ? "text-blue-500" : "text-zinc-400"}`}>
            <Search className="size-4" />
          </span>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search by name, subject or skill…"
            className="flex-1 py-2.5 bg-transparent text-[13.5px] text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none min-w-0"
          />

          {/* Animated result badge */}
          {hasAnyFilter && (
            <span
              className="shrink-0 mx-2 px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums
                         bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400
                         border border-blue-100 dark:border-blue-900
                         animate-fade-in"
            >
              {resultCount}
            </span>
          )}

          {/* Clear × */}
          {query.trim() !== "" && (
            <button
              type="button"
              onClick={() => { onQuery(""); inputRef.current?.focus(); }}
              className="shrink-0 mr-2 w-6 h-6 rounded-full grid place-items-center
                         text-zinc-400 hover:text-zinc-700 dark:hover:text-white
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         transition-all duration-150"
              aria-label="Clear search"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* ── Separate filter button ── */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={`shrink-0 relative flex items-center gap-2 px-4 py-2.5 rounded-xl
                      text-[13px] font-semibold border transition-all duration-250
                      ${expanded
                        ? "bg-blue-600 border-blue-600 text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] scale-[1.02]"
                        : hasPriceFilter
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400"
                          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 shadow-sm"
                      }`}
          aria-expanded={expanded}
        >
          <SlidersHorizontal className="size-3.5 shrink-0" />
          <span className="hidden sm:inline">Filters</span>

          {/* Active filter count badge */}
          {activeFilters > 0 && !expanded && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-black grid place-items-center shadow-sm animate-scale-in">
              {activeFilters}
            </span>
          )}

          <ChevronDown
            className={`size-3.5 shrink-0 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* ── Filter panel — slides in below ── */}
      <div
        className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          maxHeight: expanded ? 380 : 0,
          opacity:   expanded ? 1   : 0,
          transform: expanded ? "translateY(0)" : "translateY(-6px)",
        }}
      >
        <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] overflow-hidden">

          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-50 dark:border-zinc-800/80"
            style={{ background: "linear-gradient(to right, rgba(239,246,255,0.6), transparent)" }}>
            <div className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-blue-500" />
              <span className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Price filters
              </span>
            </div>
            {hasPriceFilter && (
              <button
                type="button"
                onClick={() => { onMinPrice(""); onMaxPrice(""); }}
                className="text-[11.5px] font-semibold text-red-500 dark:text-red-400 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <X className="size-3" /> Clear
              </button>
            )}
          </div>

          <div className="px-5 py-4 space-y-5">

            {/* Preset price chips */}
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.14em] mb-3 flex items-center gap-1.5">
                <DollarSign className="size-3" />
                Quick select
              </p>
              <div className="flex flex-wrap gap-2">
                {PRICE_PRESETS.map((p, i) => {
                  const active = p.min === minPrice && p.max === maxPrice;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => { onMinPrice(p.min); onMaxPrice(p.max); }}
                      style={{ animationDelay: `${i * 40}ms` }}
                      className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold border
                                  transition-all duration-200 animate-fade-in
                                  ${active
                                    ? "bg-blue-600 border-blue-600 text-white shadow-[0_2px_10px_rgba(37,99,235,0.4)] scale-105"
                                    : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                                  }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom range inputs */}
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.14em] mb-3">
                Custom range
              </p>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[13px]">$</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => onMinPrice(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700
                               bg-zinc-50 dark:bg-zinc-800 text-[13px] text-zinc-900 dark:text-white
                               outline-none focus:border-blue-400 dark:focus:border-blue-500
                               focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] transition-all"
                  />
                </div>
                <span className="text-zinc-300 dark:text-zinc-600 text-sm shrink-0">—</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[13px]">$</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => onMaxPrice(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700
                               bg-zinc-50 dark:bg-zinc-800 text-[13px] text-zinc-900 dark:text-white
                               outline-none focus:border-blue-400 dark:focus:border-blue-500
                               focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel footer */}
          <div className="px-5 pb-4 flex items-center justify-between">
            <p className="text-[12px] text-zinc-400 dark:text-zinc-500 tabular-nums">
              {isFiltered
                ? <><span className="font-bold text-zinc-700 dark:text-zinc-300">{resultCount}</span> of {totalCount} tutors</>
                : <><span className="font-bold text-zinc-700 dark:text-zinc-300">{totalCount}</span> tutors available</>
              }
            </p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {/* ── Active filter pills row ── */}
      {hasAnyFilter && (
        <div className="flex items-center gap-2 flex-wrap pt-0.5 animate-fade-in">
          {query.trim() !== "" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold
                             bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              <Search className="size-3 opacity-60" />
              &ldquo;{query}&rdquo;
              <button
                type="button"
                onClick={() => onQuery("")}
                className="ml-0.5 hover:text-red-500 transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {hasPriceFilter && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold
                             bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400
                             border border-blue-100 dark:border-blue-900">
              <DollarSign className="size-3 opacity-70" />
              {minPrice || "0"} – {maxPrice ? `$${maxPrice}` : "any"}/hr
              <button
                type="button"
                onClick={() => { onMinPrice(""); onMaxPrice(""); }}
                className="ml-0.5 hover:text-red-500 transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          )}
          {hasAnyFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[11.5px] font-semibold text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-1"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
