"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Edit2,
  ArrowLeft,
  LogOut,
  Sparkles,
  Eye,
  Heart,
  ChevronRight,
  Plus,
  LayoutGrid,
  List,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { Prompt } from "@/lib/json-db";
import categoriesData from "@/data/categories.json";

interface ManagePromptsClientProps {
  initialPrompts: Prompt[];
}

export default function ManagePromptsClient({ initialPrompts }: ManagePromptsClientProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Pagination & View More States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const router = useRouter();

  useEffect(() => {
    setPrompts(initialPrompts);
  }, [initialPrompts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/prompts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPrompts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = (p.title ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Real per-category counts
  const categoryCounts: Record<string, number> = { All: prompts.length };
  for (const p of prompts) {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
    }
  }

  // Calculate Pagination
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const displayedPrompts = filteredPrompts.slice(startIndex, startIndex + itemsPerPage);

  const categories = ["All", ...categoriesData.map((cat) => cat.name)];

  return (
    <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Manage Prompts</h1>
          <p className="text-white/40">Showing {displayedPrompts.length} of {filteredPrompts.length} prompts.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex mr-2">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "grid" ? "bg-primary text-white" : "text-white/40 hover:text-white"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "table" ? "bg-primary text-white" : "text-white/40 hover:text-white"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-full md:w-64"
            />
          </div>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2",
              activeCategory === cat
                ? "bg-primary border-primary text-white"
                : "bg-black border-white/10 text-white/40 hover:text-white hover:bg-white/10"
            )}
          >
            {cat}
            <span className={cn(
              "text-[10px] font-black px-1.5 py-0.5 rounded-full",
              activeCategory === cat ? "bg-white/20 text-white" : "bg-white/5 text-white/30"
            )}>
              {categoryCounts[cat] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {viewMode === "table" ? (
        /* Table View */
        <div className="glass-dark border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Prompt Info</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Category</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Stats</th>
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayedPrompts.map((p) => (
                  <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                          <img src={p.image} className="w-full h-full object-cover" alt={p.title} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm truncate max-w-[200px]">{p.title}</h4>
                          <p className="text-xs text-white/20 truncate max-w-[200px]">{p.fullPrompt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full bg-black border border-white/10 text-[10px] font-bold text-white/60">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4 text-xs font-medium text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-primary" />
                          {p.views || 0}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-pink-500" />
                          {p.likes || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/dashboard?edit=${p.id}`)}
                          className="p-2.5 bg-black hover:bg-primary/20 rounded-xl text-white/40 hover:text-primary transition-all border border-white/5"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={isDeleting === p.id}
                          className="p-2.5 bg-black hover:bg-red-500/20 rounded-xl text-white/40 hover:text-red-500 transition-all border border-white/5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {displayedPrompts.map((p) => (
            <div
              key={p.id}
              className="group relative bg-black border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500"
            >
              <div className="aspect-[4/5] relative">
                <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <span className="bg-black/50 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-md text-white">
                    {p.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={() => router.push(`/admin/dashboard?edit=${p.id}`)}
                    className="p-2 bg-primary text-white rounded-lg shadow-xl"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 bg-red-500 text-white rounded-lg shadow-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h4 className="font-bold text-white truncate">{p.title}</h4>
                <div className="flex items-center justify-between text-[10px] font-bold text-white/30 uppercase tracking-widest border-t border-white/5 pt-3">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    {p.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-pink-500" />
                    {p.likes || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {displayedPrompts.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl font-bold text-white">No prompts found</h3>
          <p className="text-white/40">Try adjusting your filters.</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
