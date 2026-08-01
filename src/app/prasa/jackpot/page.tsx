"use client";

import React, { useState, useEffect, Suspense } from "react";
import categoriesData from "@/data/categories.json";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  LogOut,
  Type,
  Tag,
  Flame,
  Globe,
  HelpCircle,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JackpotPrompt {
  id: number;
  title: string;
  category: string;
  rarity: "legendary" | "epic" | "rare" | "common";
  weight: number;
  prompt: string;
  tip?: string;
}

const CATEGORY_OPTIONS = [
  "Photography",
  "Lifestyle",
  "UI/UX",
  "3D Art",
  "Illustration",
  "Branding",
  ...categoriesData.map((c) => c.name),
].filter((v, i, a) => a.indexOf(v) === i).sort();

const DEFAULT_WEIGHTS: Record<string, number> = {
  legendary: 2,
  epic: 5,
  rare: 10,
  common: 15,
};

function JackpotAdminContent() {
  const [prompts, setPrompts] = useState<JackpotPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string>("all");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({
    type: "",
    text: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    category: CATEGORY_OPTIONS[0],
    rarity: "rare" as "legendary" | "epic" | "rare" | "common",
    weight: DEFAULT_WEIGHTS.rare,
    prompt: "",
    tip: "",
  });

  const router = useRouter();

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/prasa/jackpot");
      if (res.ok) {
        const data = await res.json();
        setPrompts(data);
      }
    } catch (err) {
      console.error("Failed to fetch jackpot prompts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleRarityChange = (rarity: "legendary" | "epic" | "rare" | "common") => {
    setFormData({
      ...formData,
      rarity,
      weight: DEFAULT_WEIGHTS[rarity] || 10,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: CATEGORY_OPTIONS[0],
      rarity: "rare",
      weight: DEFAULT_WEIGHTS.rare,
      prompt: "",
      tip: "",
    });
    setEditingId(null);
    setMessage({ type: "", text: "" });
  };

  const handleEditClick = (promptItem: JackpotPrompt) => {
    setEditingId(promptItem.id);
    setFormData({
      title: promptItem.title,
      category: promptItem.category,
      rarity: promptItem.rarity,
      weight: promptItem.weight,
      prompt: promptItem.prompt,
      tip: promptItem.tip || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this Jackpot prompt?")) return;

    try {
      const res = await fetch(`/api/prasa/jackpot/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessage({ type: "success", text: "Jackpot prompt deleted successfully!" });
        setPrompts(prompts.filter((p) => p.id !== id));
        if (editingId === id) resetForm();
      } else {
        throw new Error("Failed to delete prompt");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Delete failed" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.prompt.trim()) {
      setMessage({ type: "error", text: "Title and Prompt text are required!" });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const isEditing = editingId !== null;
      const url = isEditing ? `/api/prasa/jackpot/${editingId}` : "/api/prasa/jackpot";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: isEditing
            ? "Jackpot prompt updated successfully!"
            : "New Jackpot prompt published successfully!",
        });
        resetForm();
        fetchPrompts();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save prompt");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered prompts list
  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRarity =
      selectedRarityFilter === "all" || p.rarity === selectedRarityFilter;

    return matchesSearch && matchesRarity;
  });

  const rarityCounts = {
    legendary: prompts.filter((p) => p.rarity === "legendary").length,
    epic: prompts.filter((p) => p.rarity === "epic").length,
    rare: prompts.filter((p) => p.rarity === "rare").length,
    common: prompts.filter((p) => p.rarity === "common").length,
  };

  const getRarityBadgeStyle = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40 font-black";
      case "epic":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold";
      case "rare":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40 font-bold";
      default:
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold";
    }
  };

  return (
    <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-dark border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Total Prompts</span>
          <span className="text-2xl font-black text-white">{prompts.length}</span>
        </div>
        <div className="glass-dark border border-amber-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-amber-500/5">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Legendary</span>
          <span className="text-2xl font-black text-amber-300">{rarityCounts.legendary}</span>
        </div>
        <div className="glass-dark border border-purple-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-purple-500/5">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Epic</span>
          <span className="text-2xl font-black text-purple-300">{rarityCounts.epic}</span>
        </div>
        <div className="glass-dark border border-blue-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-blue-500/5">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Rare</span>
          <span className="text-2xl font-black text-blue-300">{rarityCounts.rare}</span>
        </div>
        <div className="glass-dark border border-emerald-500/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-emerald-500/5">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Common</span>
          <span className="text-2xl font-black text-emerald-300">{rarityCounts.common}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Add / Edit Jackpot Prompt Form */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-dark border border-white/5 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                {editingId ? <Edit2 className="w-5 h-5 text-amber-400" /> : <Plus className="w-5 h-5 text-amber-400" />}
                {editingId ? "Edit Jackpot Prompt" : "Add Jackpot Prompt"}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-xs font-bold text-white/40 hover:text-white flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {message.text && (
                <div
                  className={cn(
                    "p-3.5 rounded-xl flex items-center gap-2.5 text-xs border",
                    message.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  )}
                >
                  {message.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                  <span>{message.text}</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-amber-400" />
                  Prompt Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Royal Cinematic Wedding"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white cursor-pointer"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rarity & Weight Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Rarity Tier
                  </label>
                  <select
                    value={formData.rarity}
                    onChange={(e) => handleRarityChange(e.target.value as any)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white cursor-pointer font-bold"
                  >
                    <option value="legendary">⭐ Legendary (2%)</option>
                    <option value="epic">✨ Epic (8%)</option>
                    <option value="rare">🔹 Rare (20%)</option>
                    <option value="common">🍀 Common (40%)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    Weight
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white font-bold"
                    required
                  />
                </div>
              </div>

              {/* Full Prompt */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  Full Prompt Text
                </label>
                <textarea
                  rows={4}
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  placeholder="Paste ultra detailed AI prompt string here..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none text-white font-mono"
                  required
                ></textarea>
              </div>

              {/* Pro Tip */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  Pro Tip / Usage Guide (Optional)
                </label>
                <input
                  type="text"
                  value={formData.tip}
                  onChange={(e) => setFormData({ ...formData, tip: e.target.value })}
                  placeholder="e.g. Best rendered with Midjourney v6"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingId ? "Update Jackpot Prompt" : "Save Jackpot Prompt"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Prompts List & Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-dark border border-white/5 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Filter Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white"
                />
              </div>

              {/* Rarity Tabs */}
              <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-semibold overflow-x-auto w-full sm:w-auto">
                {["all", "legendary", "epic", "rare", "common"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRarityFilter(r)}
                    className={cn(
                      "px-3 py-1 rounded-lg uppercase text-[10px] tracking-wider transition-all cursor-pointer",
                      selectedRarityFilter === r
                        ? "bg-amber-500 text-slate-950 font-black shadow"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt List Table */}
            {loading ? (
              <div className="text-center py-12 text-white/40 flex items-center justify-center gap-2 text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                Loading jackpot prompts...
              </div>
            ) : filteredPrompts.length === 0 ? (
              <div className="text-center py-12 text-white/40 text-sm">
                No jackpot prompts found matching filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPrompts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950/60 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] uppercase border",
                            getRarityBadgeStyle(item.rarity)
                          )}
                        >
                          {item.rarity} (wt: {item.weight})
                        </span>
                        <span className="text-xs font-bold text-white">{item.title}</span>
                        <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs font-mono text-slate-300 line-clamp-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      {item.prompt}
                    </p>

                    {item.tip && (
                      <p className="text-[10px] text-amber-400/80 italic flex items-center gap-1">
                        <Sparkles className="w-3 h-3 shrink-0" />
                        Tip: {item.tip}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JackpotAdminPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-t-0 border-x-0 border-b border-white/5 py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">PromptNest Admin</span>
            </Link>

            <div className="h-6 w-px bg-white/10 hidden md:block" />

            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/prasa/dashboard" className="text-white/60 hover:text-white transition-colors">
                Upload Prompt
              </Link>
              <Link href="/prasa/prompts" className="text-white/60 hover:text-white transition-colors">
                Manage Prompts
              </Link>
              <Link href="/prasa/jackpot" className="text-amber-400 border-b-2 border-amber-400 pb-1 font-bold">
                🎰 Jackpot Prompts
              </Link>
              <Link href="/prasa/blogs" className="text-white/60 hover:text-white transition-colors">
                Manage Blogs
              </Link>
            </div>
          </div>
          <button
            onClick={async () => {
              await fetch("/api/prasa/logout", { method: "POST" });
              router.push("/");
            }}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer text-sm"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </nav>

      <Suspense fallback={<div className="pt-40 text-center text-white/40">Loading Jackpot Admin...</div>}>
        <JackpotAdminContent />
      </Suspense>
    </main>
  );
}
