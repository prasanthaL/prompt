import React from "react";
import { getTrendingPrompts } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import PromptCard from "@/components/PromptCard";
import Link from "next/link";
import { TrendingUp, Sparkles } from "lucide-react";

export default async function TrendingPage() {
  // Fetch trending prompts (most views/likes) via JSON DB
  const prompts = await getTrendingPrompts(20);

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">Trending</span>
        </div>

        {/* Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold uppercase tracking-widest">
            <TrendingUp className="w-3 h-3" />
            Top Performance
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Trending <span className="text-primary">Now</span>
          </h1>
          <p className="text-foreground/40 max-w-2xl text-lg">
            The most viewed and liked prompts in the community. See what's 
            inspiring other creators right now.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {prompts.map((p) => (
            <PromptCard 
              key={p.id}
              {...p}
              views={p.views?.toString() || "0"}
              likes={p.likes?.toString() || "0"}
            />
          ))}
        </div>
      </div>

      <footer className="mt-32 py-20 px-4 md:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-foreground">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight">PromptVault</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed">
              The world's leading marketplace for high-quality AI prompts. 
              Helping creators build amazing things with AI since 2026.
            </p>
          </div>
          <p className="text-xs text-foreground/20 self-end">© 2026 PromptVault. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
