"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PromptCard from "@/components/PromptCard";
import { fetchHomeTabPrompts, HomeTab, HomeTabResult } from "@/lib/client-prompts";
import {
  ArrowRight,
  Search,
  TrendingUp,
  LayoutGrid,
  Sparkles,
  Flame,
  Clapperboard,
  User,
  Zap,
  Cpu,
  Home as HomeIcon,
  ShoppingBag,
  Users,
  Trees,
  Dog,
  Car,
  Palette,
  PaintBucket
} from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import categoriesDataJson from "@/data/categories.json";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Cinematic: Clapperboard,
  Anime: Sparkles,
  Portrait: User,
  Fantasy: Zap,
  "Sci-Fi": Cpu,
  Architecture: HomeIcon,
  Product: ShoppingBag,
  Men: User,
  Women: User,
  Family: Users,
  Couple: Users,
  Sport: Flame,
  "Nature & Landscape": Trees,
  "Animals & Wildlife": Dog,
  Vehicles: Car,
  "Digital Art": Palette,
  Graffiti: PaintBucket,
};

const STYLE_MAP: Record<
  string,
  {
    badgeBg: string;
    badgeText: string;
    image: string;
    hoverBorder: string;
    hoverShadow: string;
    hoverText: string;
    hoverBgGrad: string;
    iconHover: string;
  }
> = {
  Cinematic: {
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400 border-violet-500/20",
    image: "/images/categories/cinematic.png",
    hoverBorder: "hover:border-violet-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)]",
    hoverText: "group-hover:text-violet-400",
    hoverBgGrad: "hover:bg-violet-950/10",
    iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30",
  },
  Anime: {
    badgeBg: "bg-pink-500/10",
    badgeText: "text-pink-400 border-pink-500/20",
    image: "/images/categories/anime.png",
    hoverBorder: "hover:border-pink-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(236,72,153,0.35)]",
    hoverText: "group-hover:text-pink-400",
    hoverBgGrad: "hover:bg-pink-950/10",
    iconHover: "group-hover:bg-pink-500/20 group-hover:text-pink-300 group-hover:border-pink-500/30",
  },
  Portrait: {
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400 border-orange-500/20",
    image: "/images/categories/portrait.png",
    hoverBorder: "hover:border-orange-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.35)]",
    hoverText: "group-hover:text-orange-400",
    hoverBgGrad: "hover:bg-orange-950/10",
    iconHover: "group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/30",
  },
  Fantasy: {
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400 border-purple-500/20",
    image: "/images/categories/fantasy.png",
    hoverBorder: "hover:border-purple-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(168,85,247,0.35)]",
    hoverText: "group-hover:text-purple-400",
    hoverBgGrad: "hover:bg-purple-950/10",
    iconHover: "group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/30",
  },
  "Sci-Fi": {
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400 border-cyan-500/20",
    image: "/images/categories/scifi.png",
    hoverBorder: "hover:border-cyan-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(6,182,212,0.35)]",
    hoverText: "group-hover:text-cyan-400",
    hoverBgGrad: "hover:bg-cyan-950/10",
    iconHover: "group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:border-cyan-500/30",
  },
  Architecture: {
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400 border-emerald-500/20",
    image: "/images/categories/architecture.png",
    hoverBorder: "hover:border-emerald-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.35)]",
    hoverText: "group-hover:text-emerald-400",
    hoverBgGrad: "hover:bg-emerald-950/10",
    iconHover: "group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:border-emerald-500/30",
  },
  Product: {
    badgeBg: "bg-yellow-500/10",
    badgeText: "text-yellow-400 border-yellow-500/20",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    hoverBorder: "hover:border-yellow-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(234,179,8,0.35)]",
    hoverText: "group-hover:text-yellow-400",
    hoverBgGrad: "hover:bg-yellow-950/10",
    iconHover: "group-hover:bg-yellow-500/20 group-hover:text-yellow-300 group-hover:border-yellow-500/30",
  },
  Men: {
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400 border-blue-500/20",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80",
    hoverBorder: "hover:border-blue-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.35)]",
    hoverText: "group-hover:text-blue-400",
    hoverBgGrad: "hover:bg-blue-950/10",
    iconHover: "group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:border-blue-500/30",
  },
  Women: {
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400 border-rose-500/20",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    hoverBorder: "hover:border-rose-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(244,63,94,0.35)]",
    hoverText: "group-hover:text-rose-400",
    hoverBgGrad: "hover:bg-rose-950/10",
    iconHover: "group-hover:bg-rose-500/20 group-hover:text-rose-300 group-hover:border-rose-500/30",
  },
  Family: {
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-400 border-teal-500/20",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
    hoverBorder: "hover:border-teal-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(20,184,166,0.35)]",
    hoverText: "group-hover:text-teal-400",
    hoverBgGrad: "hover:bg-teal-950/10",
    iconHover: "group-hover:bg-teal-500/20 group-hover:text-teal-300 group-hover:border-teal-500/30",
  },
  Couple: {
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-400 border-red-500/20",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    hoverBorder: "hover:border-red-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(239,68,68,0.35)]",
    hoverText: "group-hover:text-red-400",
    hoverBgGrad: "hover:bg-red-950/10",
    iconHover: "group-hover:bg-red-500/20 group-hover:text-red-300 group-hover:border-red-500/30",
  },
  Sport: {
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400 border-amber-500/20",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    hoverBorder: "hover:border-amber-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.35)]",
    hoverText: "group-hover:text-amber-400",
    hoverBgGrad: "hover:bg-amber-950/10",
    iconHover: "group-hover:bg-amber-500/20 group-hover:text-amber-300 group-hover:border-amber-500/30",
  },
  "Nature & Landscape": {
    badgeBg: "bg-green-500/10",
    badgeText: "text-green-400 border-green-500/20",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    hoverBorder: "hover:border-green-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(34,197,94,0.35)]",
    hoverText: "group-hover:text-green-400",
    hoverBgGrad: "hover:bg-green-950/10",
    iconHover: "group-hover:bg-green-500/20 group-hover:text-green-300 group-hover:border-green-500/30",
  },
  "Animals & Wildlife": {
    badgeBg: "bg-lime-500/10",
    badgeText: "text-lime-400 border-lime-500/20",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
    hoverBorder: "hover:border-lime-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(132,204,22,0.35)]",
    hoverText: "group-hover:text-lime-400",
    hoverBgGrad: "hover:bg-lime-950/10",
    iconHover: "group-hover:bg-lime-500/20 group-hover:text-lime-300 group-hover:border-lime-500/30",
  },
  Vehicles: {
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-400 border-slate-500/20",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    hoverBorder: "hover:border-slate-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(100,116,139,0.35)]",
    hoverText: "group-hover:text-slate-400",
    hoverBgGrad: "hover:bg-slate-950/10",
    iconHover: "group-hover:bg-slate-500/20 group-hover:text-slate-300 group-hover:border-slate-500/30",
  },
  "Digital Art": {
    badgeBg: "bg-fuchsia-500/10",
    badgeText: "text-fuchsia-400 border-fuchsia-500/20",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    hoverBorder: "hover:border-fuchsia-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(217,70,239,0.35)]",
    hoverText: "group-hover:text-fuchsia-400",
    hoverBgGrad: "hover:bg-fuchsia-950/10",
    iconHover: "group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-300 group-hover:border-fuchsia-500/30",
  },
  Graffiti: {
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400 border-orange-500/20",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    hoverBorder: "hover:border-orange-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(234,88,12,0.35)]",
    hoverText: "group-hover:text-orange-400",
    hoverBgGrad: "hover:bg-orange-950/10",
    iconHover: "group-hover:bg-orange-500/20 group-hover:text-orange-300 group-hover:border-orange-500/30",
  },
};

const categoriesData = categoriesDataJson.map((cat) => {
  const style = STYLE_MAP[cat.name] || {
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400 border-violet-500/20",
    image: "https://images.unsplash.com/photo-1634017839464-5c339afa60f0?w=600&q=80",
    hoverBorder: "hover:border-violet-500/40",
    hoverShadow: "hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)]",
    hoverText: "group-hover:text-violet-400",
    hoverBgGrad: "hover:bg-violet-950/10",
    iconHover: "group-hover:bg-violet-500/20 group-hover:text-violet-300 group-hover:border-violet-500/30",
  };
  return {
    name: cat.name,
    id: cat.name,
    icon: ICON_MAP[cat.name] || Sparkles,
    description: cat.description,
    ...style,
  };
});

interface HomeClientProps {
  initialTabResult: HomeTabResult;
  initialTab: HomeTab;
  initialCategory: string | null;
  initialPage: number;
}

export default function HomeClient({
  initialTabResult,
  initialTab,
  initialCategory,
  initialPage,
}: HomeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab") as HomeTab | null;
  const categoryParam = searchParams.get("category");
  const pageParam = searchParams.get("page");

  const [activeTab, setActiveTab] = useState<HomeTab>(tabParam || initialTab || "trending");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam || initialCategory || null);
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam, 10) : initialPage || 1);

  // ── On-demand data state (mirrors BrowseClient pattern) ─────────────────
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [tabResult, setTabResult] = useState<HomeTabResult>(initialTabResult);

  // ── Load one page of prompts directly from JSON files ────────────────────
  const loadTabData = useCallback(
    async (tab: HomeTab, category: string, page: number) => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await fetchHomeTabPrompts(tab, category, page);
        setTabResult(data);
      } catch (err) {
        setFetchError("Failed to load prompts. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const isFirstRender = React.useRef(true);

  // Re-fetch whenever tab, category, or page changes (identical to BrowseClient)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Skip initial load if parameters match what was pre-fetched on the server
      if (
        activeTab === initialTab &&
        selectedCategory === initialCategory &&
        currentPage === initialPage
      ) {
        return;
      }
    }
    loadTabData(activeTab, selectedCategory ?? "", currentPage);
  }, [activeTab, selectedCategory, currentPage, loadTabData, initialTab, initialCategory, initialPage]);

  // Sync URL search-params into state
  useEffect(() => {
    const currentTab = (tabParam || "trending") as HomeTab;
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }

    const currentCategory = categoryParam || null;
    if (currentCategory !== selectedCategory) {
      setSelectedCategory(currentCategory);
    }

    const currentPageNum = pageParam ? parseInt(pageParam, 10) : 1;
    if (currentPageNum !== currentPage) {
      setCurrentPage(currentPageNum);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabParam, categoryParam, pageParam]);

  const handleTabChange = (tabId: HomeTab) => {
    setActiveTab(tabId);
    setSelectedCategory(null);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    params.delete("category");
    params.delete("page");
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (catId: string | null) => {
    setSelectedCategory(catId);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());
    if (catId) {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    params.delete("page");
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  // ── Derived display data ─────────────────────────────────────────────────
  const { prompts: displayedPrompts, totalPages, currentPage: safePage, categoryCounts: tabCategoryCounts } = tabResult;

  const tabCategories = React.useMemo(() => {
    if (activeTab === "all") return categoriesData;
    return categoriesData.filter((cat) => (tabCategoryCounts[cat.id] ?? 0) > 0);
  }, [tabCategoryCounts, activeTab]);

  return (
    <section id="prompts-section" className="max-w-7xl mx-auto px-4 md:px-8 pb-32 pt-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <span className="w-2 h-10 bg-primary rounded-full"></span>
            Featured Gemini AI Image Prompts
          </h2>
          <p className="text-foreground/40 text-sm">Handpicked premium prompts from our community</p>
        </div>
        <button
          onClick={() => router.push("/browse")}
          className="hidden sm:flex items-center gap-2 text-sm font-bold bg-foreground/5 hover:bg-foreground/10 px-6 py-3 rounded-xl border border-border transition-all text-foreground"
        >
          Browse All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tab bar */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          {([
            { id: "trending" as HomeTab, label: "Trending",  icon: Flame,       iconColor: "text-amber-500", activeClass: "bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-500/20 shadow-[0_2px_12px_rgba(245,158,11,0.3)]" },
            { id: "popular"  as HomeTab, label: "Popular",   icon: TrendingUp,  iconColor: "text-violet-400", activeClass: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-500/20 shadow-[0_2px_12px_rgba(124,58,237,0.3)]" },
            { id: "latest"   as HomeTab, label: "Latest",    icon: Sparkles,    iconColor: "text-cyan-400",   activeClass: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-cyan-500/20 shadow-[0_2px_12px_rgba(6,182,212,0.3)]" },
            { id: "all"      as HomeTab, label: "All",       icon: LayoutGrid,  iconColor: "text-white/40",   activeClass: "bg-white/10 text-white border-white/10 shadow-lg" },
          ] as const).map(({ id, label, icon: Icon, iconColor, activeClass }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                disabled={isLoading}
                onClick={() => {
                  if (activeTab === id) return;
                  handleTabChange(id);
                }}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer select-none border",
                  id === "trending" && !isLoading && "animate-pulse",
                  isActive
                    ? activeClass
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.05] border-transparent",
                  isLoading && "opacity-60 cursor-not-allowed"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : iconColor)} />
                {label}
              </button>
            );
          })}
        </div>
        {/* Subtitle per tab */}
        <p className="mt-3 text-sm text-foreground/40">
          {activeTab === "all"      && "Browse all prompts from our library"}
          {activeTab === "trending" && "Prompts marked as trending by our curators"}
          {activeTab === "popular"  && "Most viewed & liked prompts from our library"}
          {activeTab === "latest"   && "Freshly added prompts, newest first"}
        </p>
      </div>

      {/* Category Pills (Respective to Active Tab) */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
          {/* "All" Pill */}
          <button
            onClick={() => {
              if (selectedCategory === null) return;
              handleCategoryChange(null);
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer select-none",
              !selectedCategory
                ? "bg-primary/10 text-primary border-primary/20 shadow-[0_4px_12px_rgba(139,92,246,0.1)]"
                : "bg-white/[0.02] text-white/50 border-white/[0.06] hover:text-white hover:bg-white/[0.05] hover:border-white/[0.1]"
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            All Prompts ({tabResult.tabTotalCount})
          </button>

          {/* Dynamic Category Pills */}
          {tabCategories.map((cat) => {
            const count = tabCategoryCounts[cat.id] ?? 0;
            const isSelected = selectedCategory?.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => {
                  const next = isSelected ? null : cat.id;
                  handleCategoryChange(next);
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer select-none",
                  isSelected
                    ? cn(cat.badgeBg, cat.badgeText, "shadow-[0_4px_12px_rgba(139,92,246,0.1)]")
                    : "bg-white/[0.02] text-white/50 border-white/[0.06] hover:text-white hover:bg-white/[0.05] hover:border-white/[0.1]"
                )}
              >
                <cat.icon className="w-3.5 h-3.5" />
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Error banner */}
      {fetchError && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-400">
          <Search className="w-4 h-4 shrink-0" />
          {fetchError}
          <button
            onClick={() => loadTabData(activeTab, selectedCategory ?? "", currentPage)}
            className="ml-auto text-xs font-bold underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.05] bg-white/[0.02] animate-pulse overflow-hidden"
            >
              <div className="aspect-[4/3] bg-white/[0.04]" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-white/[0.06]" />
                <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
              </div>
            </div>
          ))
        ) : displayedPrompts.length > 0 ? (
          displayedPrompts.map((prompt, i) => (
            <div key={prompt.id || i}>
              <PromptCard
                {...prompt}
                priority={i < 8}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-foreground/20" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No prompts found</h3>
            <p className="text-foreground/40">Try selecting a different category or search term.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        scrollTargetId="prompts-section"
      />
    </section>
  );
}
