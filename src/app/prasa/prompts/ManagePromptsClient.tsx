"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Edit2,
  LogOut,
  Sparkles,
  Eye,
  Heart,
  Plus,
  LayoutGrid,
  List,
  TrendingUp,
  Clock,
  Flame,
  Star,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { Prompt } from "@/lib/json-db";
import categoriesData from "@/data/categories.json";

interface ManagePromptsClientProps {
  initialPrompts: Prompt[];
}

type FilterMode = "all" | "trending" | "popular" | "latest" | "featured";

export default function ManagePromptsClient({ initialPrompts }: ManagePromptsClientProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

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
      const res = await fetch(`/api/prasa/prompts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPrompts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    } finally {
      setIsDeleting(null);
    }
  };

  // Quick toggle a flag (isTrending / isLatest / isFeatured) without going to edit page
  const handleToggleFlag = async (
    prompt: Prompt,
    flag: "isTrending" | "isLatest" | "isFeatured"
  ) => {
    setTogglingId(`${prompt.id}-${flag}`);
    try {
      const newValue = !prompt[flag];
      const res = await fetch(`/api/prasa/prompts/${prompt.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: prompt.title,
          category: prompt.category,
          fullPrompt: prompt.fullPrompt,
          image: prompt.image,
          isTrending: flag === "isTrending" ? newValue : prompt.isTrending,
          isLatest: flag === "isLatest" ? newValue : prompt.isLatest,
          isFeatured: flag === "isFeatured" ? newValue : prompt.isFeatured,
          tags: prompt.tags || [],
          models: prompt.models || [],
        }),
      });
      if (res.ok) {
        setPrompts(prev =>
          prev.map(p =>
            p.id === prompt.id ? { ...p, [flag]: newValue } : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle flag", err);
    } finally {
      setTogglingId(null);
    }
  };

  // Apply filter mode
  const applyFilterMode = (p: Prompt) => {
    if (filterMode === "trending") return Boolean(p.isTrending);
    if (filterMode === "latest") return Boolean(p.isLatest);
    if (filterMode === "featured") return Boolean(p.isFeatured);
    if (filterMode === "popular") return (p.views || 0) >= 10;
    return true;
  };

  // Prompts filtered by mode only (before category/search) — used for category counts
  const modeFilteredPrompts = prompts.filter(applyFilterMode);

  const filteredPrompts = modeFilteredPrompts
    .filter(p => {
      const matchesSearch = (p.title ?? "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (filterMode === "popular") return (b.views || 0) - (a.views || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Category counts — scoped to current filterMode
  const categoryCounts: Record<string, number> = { All: modeFilteredPrompts.length };
  for (const p of modeFilteredPrompts) {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
    }
  }

  // Filter mode counts
  const filterCounts = {
    all: prompts.length,
    trending: prompts.filter(p => p.isTrending).length,
    popular: prompts.filter(p => (p.views || 0) >= 10).length,
    latest: prompts.filter(p => p.isLatest).length,
    featured: prompts.filter(p => p.isFeatured).length,
  };

  // Calculate Pagination
  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPrompts = filteredPrompts.slice(startIndex, startIndex + itemsPerPage);

  const categories = ["All", ...categoriesData.map((cat) => cat.name)];

  const filterButtons: { key: FilterMode; label: string; icon: React.ReactNode; color: string; activeClass: string }[] = [
    {
      key: "all",
      label: "All Prompts",
      icon: <LayoutGrid className="w-4 h-4" />,
      color: "text-white/60",
      activeClass: "bg-primary border-primary text-white shadow-lg shadow-primary/20",
    },
    {
      key: "trending",
      label: "Trending",
      icon: <Flame className="w-4 h-4" />,
      color: "text-orange-400",
      activeClass: "bg-orange-500/20 border-orange-500/50 text-orange-400 shadow-lg shadow-orange-500/10",
    },
    {
      key: "popular",
      label: "Popular",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "text-pink-400",
      activeClass: "bg-pink-500/20 border-pink-500/50 text-pink-400 shadow-lg shadow-pink-500/10",
    },
    {
      key: "latest",
      label: "Latest",
      icon: <Clock className="w-4 h-4" />,
      color: "text-blue-400",
      activeClass: "bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-lg shadow-blue-500/10",
    },
    {
      key: "featured",
      label: "Featured",
      icon: <Star className="w-4 h-4" />,
      color: "text-purple-400",
      activeClass: "bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-lg shadow-purple-500/10",
    },
  ];

  return (
    <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto space-y-8 pb-20">
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
            onClick={() => router.push("/prasa/dashboard")}
            className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* ── Filter Mode Section ── */}
      <div className="glass-dark border border-white/5 rounded-[2rem] p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">Filter by Section</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {filterButtons.map(fb => (
            <button
              key={fb.key}
              onClick={() => {
                setFilterMode(fb.key);
                setActiveCategory("All"); // reset category when switching filter mode
                setCurrentPage(1);
              }}
              className={cn(
                "flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all duration-200 cursor-pointer",
                filterMode === fb.key
                  ? fb.activeClass
                  : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
              )}
            >
              <span className={cn("transition-colors", filterMode === fb.key ? "" : fb.color)}>
                {fb.icon}
              </span>
              <span className="font-bold text-xs">{fb.label}</span>
              <span className={cn(
                "text-[10px] font-black px-2 py-0.5 rounded-full",
                filterMode === fb.key ? "bg-white/20 text-white" : "bg-white/5 text-white/30"
              )}>
                {filterCounts[fb.key]}
              </span>
            </button>
          ))}
        </div>

        {filterMode !== "all" && (
          <div className={cn(
            "text-xs font-medium px-4 py-2.5 rounded-xl border flex items-center gap-2",
            filterMode === "trending" ? "bg-orange-500/10 border-orange-500/20 text-orange-400" :
            filterMode === "popular"  ? "bg-pink-500/10 border-pink-500/20 text-pink-400" :
            filterMode === "latest"   ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                                        "bg-purple-500/10 border-purple-500/20 text-purple-400"
          )}>
            {filterMode === "trending" && <><Flame className="w-3.5 h-3.5" /> Showing prompts marked as <strong>Trending</strong>. Toggle the 🔥 button to remove from trending.</>}
            {filterMode === "popular"  && <><TrendingUp className="w-3.5 h-3.5" /> Showing prompts with <strong>10+ views</strong>, sorted by most views.</>}
            {filterMode === "latest"   && <><Clock className="w-3.5 h-3.5" /> Showing prompts marked as <strong>Latest</strong>. Toggle the 🆕 button to remove.</>}
            {filterMode === "featured" && <><Star className="w-3.5 h-3.5" /> Showing prompts marked as <strong>Featured</strong> (homepage spotlight).</>}
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories
          .filter(cat => cat === "All" || (categoryCounts[cat] ?? 0) > 0)
          .map(cat => (
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
                  <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Flags</th>
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
                    {/* Flags column with quick toggles */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5">
                        {/* Trending toggle */}
                        <button
                          onClick={() => handleToggleFlag(p, "isTrending")}
                          disabled={togglingId === `${p.id}-isTrending`}
                          title={p.isTrending ? "Remove from Trending" : "Add to Trending"}
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer",
                            p.isTrending
                              ? "bg-orange-500/20 border-orange-500/40 text-orange-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                              : "bg-white/5 border-white/10 text-white/30 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-400"
                          )}
                        >
                          {togglingId === `${p.id}-isTrending`
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : p.isTrending
                              ? <ToggleRight className="w-3.5 h-3.5" />
                              : <ToggleLeft className="w-3.5 h-3.5" />
                          }
                          🔥
                        </button>

                        {/* Latest toggle */}
                        <button
                          onClick={() => handleToggleFlag(p, "isLatest")}
                          disabled={togglingId === `${p.id}-isLatest`}
                          title={p.isLatest ? "Remove from Latest" : "Add to Latest"}
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer",
                            p.isLatest
                              ? "bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                              : "bg-white/5 border-white/10 text-white/30 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400"
                          )}
                        >
                          {togglingId === `${p.id}-isLatest`
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : p.isLatest
                              ? <ToggleRight className="w-3.5 h-3.5" />
                              : <ToggleLeft className="w-3.5 h-3.5" />
                          }
                          🆕
                        </button>

                        {/* Featured toggle */}
                        <button
                          onClick={() => handleToggleFlag(p, "isFeatured")}
                          disabled={togglingId === `${p.id}-isFeatured`}
                          title={p.isFeatured ? "Remove from Featured" : "Add to Featured"}
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer",
                            p.isFeatured
                              ? "bg-purple-500/20 border-purple-500/40 text-purple-400 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400"
                              : "bg-white/5 border-white/10 text-white/30 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400"
                          )}
                        >
                          {togglingId === `${p.id}-isFeatured`
                            ? <Loader2 className="w-3 h-3 animate-spin" />
                            : p.isFeatured
                              ? <ToggleRight className="w-3.5 h-3.5" />
                              : <ToggleLeft className="w-3.5 h-3.5" />
                          }
                          ⭐
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/prasa/dashboard?edit=${p.id}`)}
                          className="p-2.5 bg-black hover:bg-primary/20 rounded-xl text-white/40 hover:text-primary transition-all border border-white/5"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={isDeleting === p.id}
                          className="p-2.5 bg-black hover:bg-red-500/20 rounded-xl text-white/40 hover:text-red-500 transition-all border border-white/5"
                        >
                          {isDeleting === p.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />
                          }
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

                {/* Flag badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                  {p.isTrending && (
                    <span className="bg-orange-500/80 backdrop-blur-md text-[9px] font-bold px-2 py-1 rounded-md text-white flex items-center gap-1">
                      🔥 Trending
                    </span>
                  )}
                  {p.isLatest && (
                    <span className="bg-blue-500/80 backdrop-blur-md text-[9px] font-bold px-2 py-1 rounded-md text-white flex items-center gap-1">
                      🆕 Latest
                    </span>
                  )}
                  {p.isFeatured && (
                    <span className="bg-purple-500/80 backdrop-blur-md text-[9px] font-bold px-2 py-1 rounded-md text-white flex items-center gap-1">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <button
                    onClick={() => router.push(`/prasa/dashboard?edit=${p.id}`)}
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
                {/* Quick flag toggles in grid view */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => handleToggleFlag(p, "isTrending")}
                    disabled={togglingId === `${p.id}-isTrending`}
                    className={cn(
                      "text-[9px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer",
                      p.isTrending
                        ? "bg-orange-500/20 border-orange-500/30 text-orange-400"
                        : "bg-white/5 border-white/10 text-white/30 hover:text-orange-400"
                    )}
                  >
                    🔥
                  </button>
                  <button
                    onClick={() => handleToggleFlag(p, "isLatest")}
                    disabled={togglingId === `${p.id}-isLatest`}
                    className={cn(
                      "text-[9px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer",
                      p.isLatest
                        ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                        : "bg-white/5 border-white/10 text-white/30 hover:text-blue-400"
                    )}
                  >
                    🆕
                  </button>
                  <button
                    onClick={() => handleToggleFlag(p, "isFeatured")}
                    disabled={togglingId === `${p.id}-isFeatured`}
                    className={cn(
                      "text-[9px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer",
                      p.isFeatured
                        ? "bg-purple-500/20 border-purple-500/30 text-purple-400"
                        : "bg-white/5 border-white/10 text-white/30 hover:text-purple-400"
                    )}
                  >
                    ⭐
                  </button>
                </div>
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
        <div className="py-20 text-center glass-dark border border-white/5 rounded-[2rem]">
          <div className="text-5xl mb-4">
            {filterMode === "trending" ? "🔥" : filterMode === "popular" ? "📈" : filterMode === "latest" ? "🆕" : filterMode === "featured" ? "⭐" : "🔍"}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No prompts found</h3>
          <p className="text-white/40 text-sm">
            {filterMode !== "all"
              ? `No prompts are marked as "${filterMode}" yet. Use the toggle buttons to add some.`
              : "Try adjusting your filters."}
          </p>
          {filterMode !== "all" && (
            <button
              onClick={() => setFilterMode("all")}
              className="mt-6 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
            >
              View All Prompts
            </button>
          )}
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
