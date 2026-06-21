"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CategoryFilters from "@/components/CategoryFilters";
import PromptCard from "@/components/PromptCard";
import Pagination from "@/components/Pagination";
import { 
  Search, 
  Filter, 
  SlidersHorizontal 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchPromptsPage, fetchCategoryCounts, PaginatedResult } from "@/lib/client-prompts";

interface BrowseClientProps {
  initialPageResult: PaginatedResult;
  initialTotalAllCount: number;
  initialCategoryCounts: Record<string, number>;
  initialCategory: string;
  initialSearchQuery: string;
  initialPage: number;
}

export default function BrowseClient({
  initialPageResult,
  initialTotalAllCount,
  initialCategoryCounts,
  initialCategory,
  initialSearchQuery,
  initialPage,
}: BrowseClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState(categoryParam || initialCategory || "all");
  const [searchQuery, setSearchQuery] = useState(queryParam || initialSearchQuery || "");
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [pageResult, setPageResult] = useState<PaginatedResult>(initialPageResult);
  const [totalAllCount, setTotalAllCount] = useState(initialTotalAllCount);

  // Category counts for the sidebar/filter badges
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(initialCategoryCounts);

  // Fetch category counts once on mount (data is cached after first load)
  useEffect(() => {
    fetchCategoryCounts().then(setCategoryCounts);
  }, []);

  /**
   * Fetches exactly one page of prompts.
   * client-prompts caches the full category array after the first import,
   * so switching pages is instant after the initial load.
   */
  const loadPage = useCallback(
    async (category: string, page: number, query: string) => {
      setIsLoading(true);
      const [result, allResult] = await Promise.all([
        fetchPromptsPage(category, page, query),
        category === "all" ? Promise.resolve(null) : fetchPromptsPage("all", 1, query)
      ]);
      setPageResult(result);
      setTotalAllCount(allResult ? allResult.totalCount : result.totalCount);
      setIsLoading(false);
    },
    []
  );

  const isFirstRender = React.useRef(true);

  // Re-fetch whenever category, page, or search query changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Skip initial load if parameters match what was pre-fetched on the server
      if (
        activeCategory === initialCategory &&
        currentPage === initialPage &&
        searchQuery === initialSearchQuery
      ) {
        return;
      }
    }
    loadPage(activeCategory, currentPage, searchQuery);
  }, [activeCategory, currentPage, searchQuery, loadPage, initialCategory, initialPage, initialSearchQuery]);

  // Sync URL search-params into state
  useEffect(() => {
    const currentCategory = categoryParam || "all";
    if (currentCategory !== activeCategory) {
      setActiveCategory(currentCategory);
    }

    const currentQuery = queryParam || "";
    if (currentQuery !== searchQuery) {
      setSearchQuery(currentQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam, queryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setSearchQuery("");

    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    params.delete("page");
    params.delete("q");
    router.push(`/browse?${params.toString()}`);
  };

  const handleResetAll = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setCurrentPage(1);
    router.push("/browse");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/browse?${params.toString()}`);
  };

  const { prompts: displayedPrompts, totalCount, totalPages } = pageResult;



  return (
    <div className="animate-fade-in w-full">
      {/* Mobile/Tablet Only Search Header (Search is lg:hidden to avoid duplication) */}
      <div className="flex items-center gap-3 lg:hidden w-full md:w-auto mb-8">
        <div className="relative group flex-1 md:flex-none">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-violet-400 transition-colors" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full md:w-64 text-white"
          />
        </div>
        <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
          <Filter className="w-5 h-5 text-white/70" />
        </button>
        <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
          <SlidersHorizontal className="w-5 h-5 text-white/70" />
        </button>
      </div>

      {/* Mobile/Tablet Category Filters (lg:hidden) */}
      <div className="lg:hidden mb-8">
        <CategoryFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          categoryCounts={categoryCounts}
          totalCount={totalAllCount}
          mode="horizontal"
        />
      </div>

      {/* Main Browse Section - Sidebar Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sticky Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 self-start bg-[#0a0814]/50 border border-white/[0.05] rounded-2xl p-5 backdrop-blur-md space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/90">Filters</span>
              {(activeCategory !== "all" || searchQuery) && (
                <button
                  onClick={handleResetAll}
                  className="text-[10px] font-black uppercase text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Sidebar Search Input */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-wider text-white/40">Search Prompts</label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 group-focus-within:text-violet-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full text-white"
                />
              </div>
            </div>

            {/* Sidebar Categories */}
            <div className="space-y-2 pt-2">
              <label className="text-[9px] font-black uppercase tracking-wider text-white/40">Categories</label>
              <CategoryFilters
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                categoryCounts={categoryCounts}
                totalCount={totalAllCount}
                mode="vertical"
              />
            </div>
          </div>
        </div>

        {/* Content Column: Prompt Grid & Pagination */}
        <div className="col-span-full lg:col-span-3 space-y-8">
          {/* Active Filter Pill display (Desktop only since filters are visible in sidebar) */}
          {(activeCategory !== "all" || searchQuery) && (
            <div className="hidden lg:flex items-center gap-2 flex-wrap text-xs text-white/50">
              <span>Active filters:</span>
              {activeCategory !== "all" && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
                  Category: {activeCategory}
                </span>
              )}
              {searchQuery && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-semibold">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
              <button
                onClick={handleResetAll}
                className="text-white hover:text-violet-400 transition-colors font-bold underline cursor-pointer ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Prompt Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/[0.03] border border-white/[0.05] aspect-[4/3] animate-pulse"
                />
              ))
            ) : displayedPrompts.length > 0 ? (
              displayedPrompts.map((prompt, i) => (
                <PromptCard
                  key={prompt.id || i}
                  {...prompt}
                  priority={i < 6}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-xl font-bold text-white">No prompts found</h3>
                <p className="text-white/40">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
