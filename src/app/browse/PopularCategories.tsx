

import React from "react";
import Link from "next/link";
import {
  Clapperboard,
  Zap,
  Ghost,
  Cpu,
  Home,
  ShoppingBag,
  User,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  Sparkles,
  Grid
} from "lucide-react";
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



export default function PopularCategories() {
  return (
    <section className="p-6 rounded-2xl border border-white/[0.05] bg-[#0c0a15]/30 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
        <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
          <Grid className="w-4.5 h-4.5 text-violet-400" />
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-white">Popular Categories</h3>
          <p className="text-[10px] text-white/40 mt-0.5">Quickly browse prompts by category</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {categoriesData.slice(0, 6).map((cat) => {
          const IconComponent = ICON_MAP[cat.name] || Sparkles;
          return (
            <Link
              key={cat.name}
              href={`/categories/${encodeURIComponent(cat.name.toLowerCase())}`}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] hover:border-violet-500/30 hover:bg-violet-500/10 text-[10px] font-bold text-white/60 hover:text-white transition-all cursor-pointer"
            >
              <IconComponent className="w-3 h-3 text-white/40 group-hover:text-violet-400 transition-colors" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
