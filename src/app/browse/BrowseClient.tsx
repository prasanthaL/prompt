"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryFilters from "@/components/CategoryFilters";
import PromptCard from "@/components/PromptCard";
import Pagination from "@/components/Pagination";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Prompt } from "@/lib/json-db";

interface BrowseClientProps {
  initialPrompts: Prompt[];
}

export default function BrowseClient({ initialPrompts }: BrowseClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const queryParam = searchParams.get("q");

  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dbPrompts, setDbPrompts] = useState<Prompt[]>(initialPrompts);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setDbPrompts(initialPrompts);
  }, [initialPrompts]);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [categoryParam, queryParam]);

  const filteredPrompts = dbPrompts.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      (p.title ?? "").toLowerCase().includes(q) ||
      (p.category ?? "").toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Compute real counts per category
  const categoryCounts: Record<string, number> = {};
  for (const p of dbPrompts) {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
    }
  }
  const totalCount = dbPrompts.length;

  // Pagination Logic
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPrompts = filteredPrompts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Browse Prompts</h1>
          <p className="text-white/40">Explore our vast collection of high-quality AI prompts</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-full md:w-64"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <Filter className="w-5 h-5 text-white/70" />
          </button>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <SlidersHorizontal className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </div>

      <CategoryFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        categoryCounts={categoryCounts}
        totalCount={totalCount}
      />

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {displayedPrompts.length > 0 ? (
          displayedPrompts.map((prompt, i) => (
            <PromptCard
              key={prompt.id || i}
              {...prompt}
              priority={i < 8}
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
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
