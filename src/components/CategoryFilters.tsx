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
  { name: "All Categories", icon: LayoutGrid, count: "120+", id: "all" },
  { name: "Cinematic", icon: Clapperboard, count: "2450", id: "Cinematic" },
  { name: "Anime", icon: Ghost, count: "1870", id: "Anime" },
  { name: "Portrait", icon: User, count: "1520", id: "Portrait" },
  { name: "Fantasy", icon: Zap, count: "2450", id: "Fantasy" },
  { name: "Sci-Fi", icon: Cpu, count: "1280", id: "Sci-Fi" },
  { name: "Architecture", icon: Home, count: "980", id: "Architecture" },
  { name: "Product", icon: ShoppingBag, count: "840", id: "Product" },
];

interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilters = ({ activeCategory, onCategoryChange }: CategoryFiltersProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <span className="w-2 h-8 bg-primary rounded-full"></span>
          Explore Categories
        </h2>
        <button className="text-sm font-medium text-foreground/40 hover:text-foreground transition-colors">
          View All Categories →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "flex-shrink-0 group flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300",
                isActive 
                  ? "bg-primary/20 border-primary shadow-lg shadow-primary/10" 
                  : "bg-foreground/5 border-border hover:border-foreground/20 hover:bg-foreground/10"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive ? "bg-primary text-white" : "bg-foreground/5 text-foreground/40 group-hover:text-foreground group-hover:bg-foreground/10"
              )}>
                <cat.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className={cn(
                  "text-sm font-bold transition-colors",
                  isActive ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
                )}>
                  {cat.name}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold">
                  {cat.count} Prompts
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
