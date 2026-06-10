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
  User,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import categoriesData from "@/data/categories.json";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Cinematic: Clapperboard,
  Anime: Ghost,
  Portrait: User,
  Fantasy: Zap,
  "Sci-Fi": Cpu,
  Architecture: Home,
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
};

const categories = [
  { name: "All", fullName: "All Categories", icon: LayoutGrid, id: "all" },
  ...categoriesData.map((cat) => ({
    name: cat.name,
    fullName: cat.name,
    icon: ICON_MAP[cat.name] || Sparkles,
    id: cat.name,
  })),
];

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  categoryCounts?: Record<string, number>;
  totalCount?: number;
  mode?: "horizontal" | "vertical";
}

// Per-category gradient & color config
const CATEGORY_STYLES: Record<string, {
  gradient: string;
  activeBg: string;
  activeText: string;
  activeBorder: string;
  inactiveBg: string;
  inactiveBorder: string;
  inactiveText: string;
  inactiveIcon: string;
  iconColor: string;
  dot: string;
  glow: string;
}> = {
  all: {
    gradient: "from-slate-400 to-slate-300",
    activeBg: "bg-white/15",
    activeText: "text-white",
    activeBorder: "border-white/30",
    inactiveBg: "bg-white/[0.04]",
    inactiveBorder: "border-white/10",
    inactiveText: "text-white/60",
    inactiveIcon: "bg-white/10 text-white/50",
    iconColor: "text-white",
    dot: "bg-white",
    glow: "shadow-[0_4px_20px_rgba(255,255,255,0.10)]",
  },
  Cinematic: {
    gradient: "from-violet-500 to-violet-400",
    activeBg: "bg-violet-500/20",
    activeText: "text-violet-200",
    activeBorder: "border-violet-400/50",
    inactiveBg: "bg-violet-500/[0.07]",
    inactiveBorder: "border-violet-500/20",
    inactiveText: "text-violet-400/80",
    inactiveIcon: "bg-violet-500/15 text-violet-400",
    iconColor: "text-violet-400",
    dot: "bg-violet-400",
    glow: "shadow-[0_4px_24px_rgba(139,92,246,0.28)]",
  },
  Anime: {
    gradient: "from-pink-500 to-pink-400",
    activeBg: "bg-pink-500/20",
    activeText: "text-pink-200",
    activeBorder: "border-pink-400/50",
    inactiveBg: "bg-pink-500/[0.07]",
    inactiveBorder: "border-pink-500/20",
    inactiveText: "text-pink-400/80",
    inactiveIcon: "bg-pink-500/15 text-pink-400",
    iconColor: "text-pink-400",
    dot: "bg-pink-400",
    glow: "shadow-[0_4px_24px_rgba(236,72,153,0.28)]",
  },
  Portrait: {
    gradient: "from-orange-500 to-amber-400",
    activeBg: "bg-orange-500/20",
    activeText: "text-orange-200",
    activeBorder: "border-orange-400/50",
    inactiveBg: "bg-orange-500/[0.07]",
    inactiveBorder: "border-orange-500/20",
    inactiveText: "text-orange-400/80",
    inactiveIcon: "bg-orange-500/15 text-orange-400",
    iconColor: "text-orange-400",
    dot: "bg-orange-400",
    glow: "shadow-[0_4px_24px_rgba(249,115,22,0.28)]",
  },
  Fantasy: {
    gradient: "from-purple-500 to-purple-400",
    activeBg: "bg-purple-500/20",
    activeText: "text-purple-200",
    activeBorder: "border-purple-400/50",
    inactiveBg: "bg-purple-500/[0.07]",
    inactiveBorder: "border-purple-500/20",
    inactiveText: "text-purple-400/80",
    inactiveIcon: "bg-purple-500/15 text-purple-400",
    iconColor: "text-purple-400",
    dot: "bg-purple-400",
    glow: "shadow-[0_4px_24px_rgba(168,85,247,0.28)]",
  },
  "Sci-Fi": {
    gradient: "from-cyan-500 to-cyan-400",
    activeBg: "bg-cyan-500/20",
    activeText: "text-cyan-200",
    activeBorder: "border-cyan-400/50",
    inactiveBg: "bg-cyan-500/[0.07]",
    inactiveBorder: "border-cyan-500/20",
    inactiveText: "text-cyan-400/80",
    inactiveIcon: "bg-cyan-500/15 text-cyan-400",
    iconColor: "text-cyan-400",
    dot: "bg-cyan-400",
    glow: "shadow-[0_4px_24px_rgba(6,182,212,0.28)]",
  },
  Architecture: {
    gradient: "from-emerald-500 to-emerald-400",
    activeBg: "bg-emerald-500/20",
    activeText: "text-emerald-200",
    activeBorder: "border-emerald-400/50",
    inactiveBg: "bg-emerald-500/[0.07]",
    inactiveBorder: "border-emerald-500/20",
    inactiveText: "text-emerald-400/80",
    inactiveIcon: "bg-emerald-500/15 text-emerald-400",
    iconColor: "text-emerald-400",
    dot: "bg-emerald-400",
    glow: "shadow-[0_4px_24px_rgba(16,185,129,0.28)]",
  },
  Product: {
    gradient: "from-yellow-500 to-yellow-400",
    activeBg: "bg-yellow-500/20",
    activeText: "text-yellow-200",
    activeBorder: "border-yellow-400/50",
    inactiveBg: "bg-yellow-500/[0.07]",
    inactiveBorder: "border-yellow-500/20",
    inactiveText: "text-yellow-400/80",
    inactiveIcon: "bg-yellow-500/15 text-yellow-400",
    iconColor: "text-yellow-400",
    dot: "bg-yellow-400",
    glow: "shadow-[0_4px_24px_rgba(234,179,8,0.28)]",
  },
  Men: {
    gradient: "from-blue-500 to-blue-400",
    activeBg: "bg-blue-500/20",
    activeText: "text-blue-200",
    activeBorder: "border-blue-400/50",
    inactiveBg: "bg-blue-500/[0.07]",
    inactiveBorder: "border-blue-500/20",
    inactiveText: "text-blue-400/80",
    inactiveIcon: "bg-blue-500/15 text-blue-400",
    iconColor: "text-blue-400",
    dot: "bg-blue-400",
    glow: "shadow-[0_4px_24px_rgba(59,130,246,0.28)]",
  },
  Women: {
    gradient: "from-rose-500 to-rose-400",
    activeBg: "bg-rose-500/20",
    activeText: "text-rose-200",
    activeBorder: "border-rose-400/50",
    inactiveBg: "bg-rose-500/[0.07]",
    inactiveBorder: "border-rose-500/20",
    inactiveText: "text-rose-400/80",
    inactiveIcon: "bg-rose-500/15 text-rose-400",
    iconColor: "text-rose-400",
    dot: "bg-rose-400",
    glow: "shadow-[0_4px_24px_rgba(244,63,94,0.28)]",
  },
  Family: {
    gradient: "from-teal-500 to-teal-400",
    activeBg: "bg-teal-500/20",
    activeText: "text-teal-200",
    activeBorder: "border-teal-400/50",
    inactiveBg: "bg-teal-500/[0.07]",
    inactiveBorder: "border-teal-500/20",
    inactiveText: "text-teal-400/80",
    inactiveIcon: "bg-teal-500/15 text-teal-400",
    iconColor: "text-teal-400",
    dot: "bg-teal-400",
    glow: "shadow-[0_4px_24px_rgba(20,184,166,0.28)]",
  },
  Couple: {
    gradient: "from-red-500 to-red-400",
    activeBg: "bg-red-500/20",
    activeText: "text-red-200",
    activeBorder: "border-red-400/50",
    inactiveBg: "bg-red-500/[0.07]",
    inactiveBorder: "border-red-500/20",
    inactiveText: "text-red-400/80",
    inactiveIcon: "bg-red-500/15 text-red-400",
    iconColor: "text-red-400",
    dot: "bg-red-400",
    glow: "shadow-[0_4px_24px_rgba(239,68,68,0.28)]",
  },
  Sport: {
    gradient: "from-amber-500 to-amber-400",
    activeBg: "bg-amber-500/20",
    activeText: "text-amber-200",
    activeBorder: "border-amber-400/50",
    inactiveBg: "bg-amber-500/[0.07]",
    inactiveBorder: "border-amber-500/20",
    inactiveText: "text-amber-400/80",
    inactiveIcon: "bg-amber-500/15 text-amber-400",
    iconColor: "text-amber-400",
    dot: "bg-amber-400",
    glow: "shadow-[0_4px_24px_rgba(245,158,11,0.28)]",
  },
  "Nature & Landscape": {
    gradient: "from-green-500 to-green-400",
    activeBg: "bg-green-500/20",
    activeText: "text-green-200",
    activeBorder: "border-green-400/50",
    inactiveBg: "bg-green-500/[0.07]",
    inactiveBorder: "border-green-500/20",
    inactiveText: "text-green-400/80",
    inactiveIcon: "bg-green-500/15 text-green-400",
    iconColor: "text-green-400",
    dot: "bg-green-400",
    glow: "shadow-[0_4px_24px_rgba(34,197,94,0.28)]",
  },
  "Animals & Wildlife": {
    gradient: "from-lime-500 to-lime-400",
    activeBg: "bg-lime-500/20",
    activeText: "text-lime-200",
    activeBorder: "border-lime-400/50",
    inactiveBg: "bg-lime-500/[0.07]",
    inactiveBorder: "border-lime-500/20",
    inactiveText: "text-lime-400/80",
    inactiveIcon: "bg-lime-500/15 text-lime-400",
    iconColor: "text-lime-400",
    dot: "bg-lime-400",
    glow: "shadow-[0_4px_24px_rgba(132,204,22,0.28)]",
  },
  Vehicles: {
    gradient: "from-slate-400 to-slate-300",
    activeBg: "bg-slate-500/20",
    activeText: "text-slate-200",
    activeBorder: "border-slate-400/50",
    inactiveBg: "bg-slate-500/[0.07]",
    inactiveBorder: "border-slate-500/20",
    inactiveText: "text-slate-400/80",
    inactiveIcon: "bg-slate-500/15 text-slate-400",
    iconColor: "text-slate-400",
    dot: "bg-slate-400",
    glow: "shadow-[0_4px_24px_rgba(100,116,139,0.28)]",
  },
  "Digital Art": {
    gradient: "from-fuchsia-500 to-fuchsia-400",
    activeBg: "bg-fuchsia-500/20",
    activeText: "text-fuchsia-200",
    activeBorder: "border-fuchsia-400/50",
    inactiveBg: "bg-fuchsia-500/[0.07]",
    inactiveBorder: "border-fuchsia-500/20",
    inactiveText: "text-fuchsia-400/80",
    inactiveIcon: "bg-fuchsia-500/15 text-fuchsia-400",
    iconColor: "text-fuchsia-400",
    dot: "bg-fuchsia-400",
    glow: "shadow-[0_4px_24px_rgba(217,70,239,0.28)]",
  },
};

const CategoryFilters = ({
  activeCategory,
  onCategoryChange,
  categoryCounts = {},
  totalCount = 0,
  mode = "horizontal",
}: CategoryFiltersProps) => {

  /* ── VERTICAL MODE (sidebar) ── */
  if (mode === "vertical") {
    return (
      <div className="w-full flex flex-col gap-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const style = CATEGORY_STYLES[cat.id] || CATEGORY_STYLES.all;
          const count = cat.id === "all" ? totalCount : (categoryCounts[cat.id] ?? 0);

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all duration-200 group cursor-pointer",
                isActive
                  ? cn(style.activeBg, style.activeBorder, style.glow)
                  : "bg-transparent border-transparent hover:bg-white/[0.03] hover:border-white/8"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200",
                  isActive
                    ? cn("bg-gradient-to-br", style.gradient, "text-white shadow-sm")
                    : "bg-white/5 text-white/30 group-hover:bg-white/10 group-hover:text-white/60"
                )}>
                  <cat.icon className="w-3.5 h-3.5" />
                </div>
                <span className={cn(
                  "text-[12px] font-semibold truncate transition-colors duration-200",
                  isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                )}>
                  {cat.fullName}
                </span>
              </div>
              <span className={cn(
                "text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border transition-all duration-200 shrink-0 tabular-nums",
                isActive
                  ? cn("border-white/20 text-white/80 bg-white/10")
                  : "border-white/8 text-white/25 bg-transparent group-hover:text-white/50 group-hover:border-white/15"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  /* ── HORIZONTAL MODE (default) — all chips visible, wrapping ── */
  return (
    <div className="w-full space-y-3">
      {/* Label */}
      <div className="flex items-center gap-2">
        <LayoutGrid className="w-4 h-4 text-white/40" />
        <span className="text-xs font-bold text-white/40 uppercase tracking-[0.18em]">
          Filter by Category
        </span>
      </div>

      {/* All chips — wrap onto multiple rows as needed */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const style = CATEGORY_STYLES[cat.id] || CATEGORY_STYLES.all;
          const count = cat.id === "all" ? totalCount : (categoryCounts[cat.id] ?? 0);

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "group flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer select-none hover:-translate-y-0.5 active:scale-95",
                isActive
                  ? cn(style.activeBg, style.activeBorder, style.glow)
                  : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
              )}
            >
              {/* Icon circle */}
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-200",
                isActive
                  ? cn("bg-gradient-to-br", style.gradient, "text-white shadow-sm")
                  : "bg-white/8 text-white/40 group-hover:bg-white/15 group-hover:text-white/70"
              )}>
                <cat.icon className="w-3 h-3" />
              </div>

              {/* Label */}
              <span className={cn(
                "text-[13.5px] font-semibold whitespace-nowrap transition-colors duration-200",
                isActive ? style.activeText : "text-white/55 group-hover:text-white/85"
              )}>
                {cat.name}
              </span>

              {/* Count badge */}
              <span className={cn(
                "text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums transition-all duration-200",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-white/[0.05] text-white/35 group-hover:bg-white/10 group-hover:text-white/65"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilters;
