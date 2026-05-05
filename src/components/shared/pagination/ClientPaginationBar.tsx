"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  total: number;
  page: number;
  perPage: number;
  onPage: (p: number) => void;
}

export default function ClientPaginationBar({ total, page, perPage, onPage }: Props) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const from = (page - 1) * perPage + 1;
  const to   = Math.min(page * perPage, total);

  /* build page number list with ellipsis */
  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-zinc-100 dark:border-zinc-800">
      {/* Info */}
      <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 tabular-nums">
        Showing <span className="font-semibold text-zinc-700 dark:text-zinc-300">{from}–{to}</span> of{" "}
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{total}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400
                     hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white
                     disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-150"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-zinc-400 text-[13px]">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={`w-8 h-8 rounded-lg text-[13px] font-semibold transition-all duration-150 ${
                p === page
                  ? "bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.35)]"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400
                     hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white
                     disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-150"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
