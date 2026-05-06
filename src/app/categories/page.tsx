"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { 
  Clapperboard, 
  Zap, 
  Ghost, 
  Cpu, 
  Home, 
  ShoppingBag,
  LayoutGrid,
  User,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Cinematic", icon: Clapperboard, count: "2,450", id: "Cinematic", color: "from-blue-500/20 to-indigo-500/20" },
  { name: "Anime", icon: Ghost, count: "1,870", id: "Anime", color: "from-pink-500/20 to-rose-500/20" },
  { name: "Portrait", icon: User, count: "1,520", id: "Portrait", color: "from-orange-500/20 to-amber-500/20" },
  { name: "Fantasy", icon: Zap, count: "2,450", id: "Fantasy", color: "from-purple-500/20 to-violet-500/20" },
  { name: "Sci-Fi", icon: Cpu, count: "1,280", id: "Sci-Fi", color: "from-cyan-500/20 to-blue-500/20" },
  { name: "Architecture", icon: Home, count: "980", id: "Architecture", color: "from-emerald-500/20 to-teal-500/20" },
  { name: "Product", icon: ShoppingBag, count: "840", id: "Product", color: "from-yellow-500/20 to-orange-500/20" },
  { name: "All Prompts", icon: LayoutGrid, count: "10,000+", id: "all", color: "from-gray-500/20 to-slate-500/20" },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-1 rounded-full text-sm font-bold text-primary">
            <Sparkles className="w-4 h-4" />
            Browse by Style
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Explore Categories</h1>
          <p className="text-white/40 max-w-xl mx-auto">
            Discover the perfect prompt for your next masterpiece. 
            Choose from our wide variety of curated categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/browse?category=${cat.id}`}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col items-center text-center space-y-6 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-500">
                <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl">
                  <cat.icon className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <div className="text-sm text-white/30 font-bold uppercase tracking-widest">
                    {cat.count} Prompts
                  </div>
                </div>

                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    Explore Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
