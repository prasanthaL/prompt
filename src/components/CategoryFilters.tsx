"use client";

import React from "react";
import { 
  Clapperboard, 
  Zap, 
  Ghost, 
  Cpu, 
  Home, 
  ShoppingBag,
  LayoutGrid,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All Categories", icon: LayoutGrid, id: "all" },
  { name: "Cinematic", icon: Clapperboard, id: "Cinematic" },
  { name: "Anime", icon: Ghost, id: "Anime" },
  { name: "Portrait", icon: User, id: "Portrait" },
  { name: "Fantasy", icon: Zap, id: "Fantasy" },
  { name: "Sci-Fi", icon: Cpu, id: "Sci-Fi" },
  { name: "Architecture", icon: Home, id: "Architecture" },
  { name: "Product", icon: ShoppingBag, id: "Product" },
];

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categoryCounts?: Record<string, number>;
  totalCount?: number;
  mode?: "horizontal" | "vertical";
}

const CATEGORY_STYLES: Record<string, {
  color: string;
  badgeBg: string;
  badgeText: string;
  glow: string;
  iconBg: string;
  activeBorder: string;
}> = {
  all: {
    color: "text-white/70",
    badgeBg: "bg-white/5",
    badgeText: "text-white/60 border-white/10",
    glow: "shadow-[0_0_20px_rgba(255,255,255,0.05)]",
    iconBg: "bg-white/10 text-white",
    activeBorder: "border-white/20",
  },
  Cinematic: {
    color: "text-violet-400",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400 border-violet-500/20",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    iconBg: "bg-violet-500/20 text-violet-400",
    activeBorder: "border-violet-500/30",
  },
  Anime: {
    color: "text-pink-400",
    badgeBg: "bg-pink-500/10",
    badgeText: "text-pink-400 border-pink-500/20",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    iconBg: "bg-pink-500/20 text-pink-400",
    activeBorder: "border-pink-500/30",
  },
  Portrait: {
    color: "text-orange-400",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400 border-orange-500/20",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
    iconBg: "bg-orange-500/20 text-orange-400",
    activeBorder: "border-orange-500/30",
  },
  Fantasy: {
    color: "text-purple-400",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400 border-purple-500/20",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    iconBg: "bg-purple-500/20 text-purple-400",
    activeBorder: "border-purple-500/30",
  },
  "Sci-Fi": {
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400 border-cyan-500/20",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    iconBg: "bg-cyan-500/20 text-cyan-400",
    activeBorder: "border-cyan-500/30",
  },
  Architecture: {
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400 border-emerald-500/20",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    activeBorder: "border-emerald-500/30",
  },
  Product: {
    color: "text-yellow-400",
    badgeBg: "bg-yellow-500/10",
    badgeText: "text-yellow-400 border-yellow-500/20",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
    iconBg: "bg-yellow-500/20 text-yellow-400",
    activeBorder: "border-yellow-500/30",
  }
};

const CategoryFilters = ({ 
  activeCategory, 
  onCategoryChange, 
  categoryCounts = {}, 
  totalCount = 0,
  mode = "horizontal"
}: CategoryFiltersProps) => {
  if (mode === "vertical") {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const style = CATEGORY_STYLES[cat.id] || CATEGORY_STYLES.all;
          const count = cat.id === "all" ? totalCount : (categoryCounts[cat.id] ?? 0);

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all duration-300 group cursor-pointer",
                isActive 
                  ? cn("bg-white/[0.03] border-white/10", style.glow) 
                  : "bg-transparent border-transparent text-white/50 hover:bg-white/[0.015] hover:text-white"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Colored visual left indicator strip */}
                <span className={cn(
                  "w-1 h-5 rounded-full transition-all duration-300 shrink-0",
                  isActive 
                    ? cn(
                        cat.id === "all" ? "bg-white" :
                        cat.id === "Cinematic" ? "bg-violet-500" :
                        cat.id === "Anime" ? "bg-pink-500" :
                        cat.id === "Portrait" ? "bg-orange-500" :
                        cat.id === "Fantasy" ? "bg-purple-500" :
                        cat.id === "Sci-Fi" ? "bg-cyan-500" :
                        cat.id === "Architecture" ? "bg-emerald-500" :
                        "bg-yellow-500",
                        "opacity-100"
                      )
                    : "bg-transparent opacity-0"
                )} />

                {/* Themed Icon */}
                <div className={cn(
                  "w-7.5 h-7.5 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0",
                  isActive 
                    ? style.iconBg 
                    : "bg-white/5 text-white/30 group-hover:bg-white/10 group-hover:text-white/70"
                )}>
                  <cat.icon className="w-4 h-4" />
                </div>

                <span className={cn(
                  "text-xs font-bold transition-colors truncate",
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                )}>
                  {cat.name}
                </span>
              </div>

              {/* Counts Badge */}
              <div className={cn(
                "text-[9px] font-extrabold px-2 py-0.5 rounded-full border transition-all duration-300 shrink-0",
                isActive 
                  ? style.badgeText + " " + style.badgeBg
                  : "bg-white/5 border-white/10 text-white/30 group-hover:text-white/60 group-hover:bg-white/10"
              )}>
                {count}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  // Default: mode === "horizontal"
  return (
    <div className="w-full">
      <div className="flex gap-2.5 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const style = CATEGORY_STYLES[cat.id] || CATEGORY_STYLES.all;
          const count = cat.id === "all" ? totalCount : (categoryCounts[cat.id] ?? 0);

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "flex-shrink-0 group flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer",
                isActive 
                  ? cn("bg-white/[0.03] border-white/10", style.glow) 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/5"
              )}
            >
              <div className={cn(
                "w-7.5 h-7.5 rounded-lg flex items-center justify-center transition-all shrink-0",
                isActive 
                  ? style.iconBg 
                  : "bg-white/5 text-white/30 group-hover:text-white/70 group-hover:bg-white/10"
              )}>
                <cat.icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className={cn(
                  "text-[11px] font-bold transition-colors leading-tight",
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                )}>
                  {cat.name}
                </div>
                <div className={cn(
                  "text-[8.5px] uppercase tracking-wider font-extrabold transition-colors mt-0.5",
                  isActive ? style.color : "text-white/30"
                )}>
                  {count} Prompts
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilters;
