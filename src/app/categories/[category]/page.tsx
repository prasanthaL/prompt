import React from "react";
import { getPromptsByCategory } from "@/lib/json-db";
import Navbar from "@/components/Navbar";
import PromptCard from "@/components/PromptCard";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  // Format the category name for display (e.g., "anime" -> "Anime")
  const decodedCategory = decodeURIComponent(category);
  const displayName = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

  // Fetch prompts for this category via JSON DB
  const prompts = getPromptsByCategory(decodedCategory);

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground/40">{displayName}</span>
        </div>

        {/* Category Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Discover
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            {displayName} <span className="text-primary">Prompts</span>
          </h1>
          <p className="text-foreground/40 max-w-2xl text-lg">
            Explore our curated collection of high-quality {displayName} prompts. 
            Perfect for your next creative project.
          </p>
        </div>

        {/* Prompts Grid */}
        {prompts.length > 0 ? (
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
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 glass-dark rounded-[3rem] border border-foreground/10">
            <div className="w-20 h-20 bg-foreground/5 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-foreground/10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">No prompts found</h3>
              <p className="text-foreground/40">We haven't added any prompts to this category yet.</p>
            </div>
            <Link 
              href="/browse"
              className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-hover transition-all"
            >
              Browse All Prompts
            </Link>
          </div>
        )}
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
