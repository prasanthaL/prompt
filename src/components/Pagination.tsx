"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  scrollTargetId?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, scrollTargetId }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }
  startPage = Math.max(1, startPage);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePageClick = (page: number) => {
    onPageChange(page);
    if (scrollTargetId) {
      const element = document.getElementById(scrollTargetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 pt-12">
      <div className="w-full h-px bg-white/5 max-w-md" />
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white/40 hover:text-white hover:border-primary disabled:opacity-30 transition-all"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white/40 hover:text-white hover:border-primary disabled:opacity-30 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageClick(p)}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-xl border font-bold text-sm transition-all",
              currentPage === p
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                : "border-white/10 bg-black/50 text-white/40 hover:text-white hover:border-primary"
            )}
          >
            {p}
          </button>
        ))}

        {totalPages > endPage && (
          <span className="text-white/20 px-2 font-bold">...</span>
        )}

        {totalPages > endPage && (
          <button
            onClick={() => handlePageClick(totalPages)}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white/40 hover:text-white hover:border-primary transition-all font-bold"
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white/40 hover:text-white hover:border-primary disabled:opacity-30 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-black/50 text-white/40 hover:text-white hover:border-primary disabled:opacity-30 transition-all"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
