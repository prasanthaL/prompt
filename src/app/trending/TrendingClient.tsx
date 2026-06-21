"use client";

import React, { useState, useMemo } from "react";
import PromptCard from "@/components/PromptCard";
import {
  TrendingUp,
  ChevronDown,
  Loader2,
} from "lucide-react";

interface Prompt {
  id: string;
  title: string;
  category: string;
  author: string;
  image: string;
  views: number;
  likes: number;
  isPremium?: boolean;
  slug?: string | null;
  tags?: string[];
  models?: string[];
}

const PAGE_SIZE = 12;

interface TrendingClientProps {
  /** Full sorted trending list — passed as a prop so no extra fetch is needed */
  allTrendingPrompts: Prompt[];
}

const CATEGORY_EMOJIS: Record<string, string> = {
  Cinematic: "🎬",
  Anime: "🌸",
  Fantasy: "🔮",
  "Sci-Fi": "🛸",
  Architecture: "🏢",
  Portrait: "📸",
  Product: "🛍️",
  Men: "👨",
  Women: "👩",
  Family: "👨‍👩‍👧‍👦",
  Couple: "💑",
  Sport: "🏆",
  "Nature & Landscape": "🏔️",
  "Animals & Wildlife": "🐼",
  Vehicles: "🏎️",
  "Digital Art": "🎨",
  Graffiti: "🖌️",
};

export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  cinematic: "Cinematic",
  anime: "Anime",
  fantasy: "Fantasy",
  "sci-fi": "Sci-Fi",
  architecture: "Architecture",
  portrait: "Portrait",
  product: "Product",
  men: "Men",
  women: "Women",
  family: "Family",
  couple: "Couple",
  sport: "Sport",
  "nature & landscape": "Nature & Landscape",
  "animals & wildlife": "Animals & Wildlife",
  vehicles: "Vehicles",
  "digital art": "Digital Art",
  graffiti: "Graffiti",
};

export default function TrendingClient({
  allTrendingPrompts,
}: TrendingClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [timeFilter, setTimeFilter] = useState("This Week");
  // How many prompts of the filtered set to display
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // All unique categories derived from the full trending list
  const trendingCategories = useMemo(
    () =>
      Array.from(
        new Set(allTrendingPrompts.map((p) => p.category).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b)),
    [allTrendingPrompts]
  );

  const categories = useMemo(
    () => [
      { label: "All", id: "all", emoji: "🔥" },
      ...trendingCategories.map((cat) => {
        const displayName = CATEGORY_DISPLAY_NAMES[cat.toLowerCase()] || cat;
        return {
          label: displayName,
          id: cat.toLowerCase(),
          emoji: CATEGORY_EMOJIS[displayName] || "✨",
        };
      }),
    ],
    [trendingCategories]
  );

  // Filter the full list by active category — instant, no network request
  const filteredPrompts = useMemo(
    () =>
      activeCategory === "all"
        ? allTrendingPrompts
        : allTrendingPrompts.filter(
            (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
          ),
    [allTrendingPrompts, activeCategory]
  );

  // The currently displayed slice
  const displayedPrompts = filteredPrompts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPrompts.length;

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setVisibleCount(PAGE_SIZE); // reset to first page on category switch
  };

  const loadMore = () => {
    setIsLoadingMore(true);
    // Simulate a brief tick so React can render the loading state,
    // then expand the slice — data is already in memory, no fetch needed.
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 150);
  };

  return (
    <>
      {/* ═══════════════════════════════════════════ CATEGORY FILTERS ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <span
              className="w-1.5 h-6 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            Trending by Category
          </h2>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar flex-wrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, var(--color-primary) 0%, #7c3aed 100%)",
                          borderColor: "var(--color-primary)",
                          color: "white",
                          boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          borderColor: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.6)",
                        }
                  }
                >
                  <span className="text-sm">{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ PROMPT GRID ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span
                className="w-1.5 h-6 rounded-full"
                style={{ background: "var(--color-primary)" }}
              />
              Trending Prompts
            </h2>

            <div className="flex items-center gap-2">
              {/* Time Filter */}
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="appearance-none text-xs font-semibold px-3 py-2 pr-7 rounded-lg border cursor-pointer focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>All Time</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground/40 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none text-xs font-semibold px-3 py-2 pr-7 rounded-lg border cursor-pointer focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <option>Most Popular</option>
                  <option>Most Viewed</option>
                  <option>Most Liked</option>
                  <option>Newest</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-foreground/40 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          {displayedPrompts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {displayedPrompts.map((p) => (
                  <PromptCard
                    key={p.id}
                    {...p}
                    views={p.views?.toString() || "0"}
                    likes={p.likes?.toString() || "0"}
                  />
                ))}
              </div>

              {/* Load more / Progress */}
              {(hasMore || filteredPrompts.length > PAGE_SIZE) && (
                <div className="flex flex-col items-center gap-4 mt-10">
                  <p className="text-xs text-foreground/30 font-medium">
                    Showing{" "}
                    <span className="text-foreground/60 font-bold">{displayedPrompts.length}</span>{" "}
                    of{" "}
                    <span className="text-foreground/60 font-bold">{filteredPrompts.length}</span>{" "}
                    trending prompts
                  </p>
                  <div className="w-full max-w-xs h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (displayedPrompts.length / filteredPrompts.length) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  {hasMore && (
                    <button
                      onClick={loadMore}
                      disabled={isLoadingMore}
                      className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-primary/30 text-foreground font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isLoadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span>Loading more…</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                          <span>Load More Trending Prompts</span>
                        </>
                      )}
                      <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 text-foreground/40">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-semibold">No prompts found in this category</p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-3 text-sm text-primary hover:underline"
              >
                View all categories
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

