"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Pagination from "@/components/Pagination";
import { Blog } from "@/lib/json-db";

interface ManageBlogsClientProps {
  initialBlogs: Blog[];
}

export default function ManageBlogsClient({ initialBlogs }: ManageBlogsClientProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setBlogs(initialBlogs);
  }, [initialBlogs]);

  // Handle active status toggle
  const handleToggle = async (id: string, currentActive: boolean) => {
    setTogglingId(id);
    setMessage(null);
    try {
      const res = await fetch("/api/prasa/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !currentActive }),
      });

      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, active: !currentActive } : b))
        );
        setMessage({
          type: "success",
          text: `Blog visibility updated successfully!`,
        });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error("Failed to update blog status");
      }
    } catch (err: any) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.message || "An error occurred while updating status.",
      });
      setTimeout(() => setMessage(null), 4000);
    } finally {
      setTogglingId(null);
    }
  };

  // Filters
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      (b.title ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.excerpt ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || b.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Calculate real per-category counts (from all blogs)
  const categories = ["All", "Techniques", "Photorealism", "Guides", "Industry", "Tips"];
  const categoryCounts: Record<string, number> = { All: blogs.length };
  for (const b of blogs) {
    const cat = categories.find((c) => c.toLowerCase() === b.category.toLowerCase()) || "Tips";
    categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
  }

  // Calculate Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  // Active vs Inactive counts
  const activeCount = blogs.filter((b) => b.active).length;
  const inactiveCount = blogs.length - activeCount;

  return (
    <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="text-white/40">
            Show or hide blog posts to rotate featured content. (Active: {activeCount} | Hidden: {inactiveCount})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-full md:w-64 text-white"
            />
          </div>
        </div>
      </div>

      {/* Message feedback */}
      {message && (
        <div
          className={cn(
            "p-4 rounded-xl flex items-center gap-3 text-sm border max-w-md animate-fade-in",
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
              : "bg-red-500/10 border-red-500/20 text-red-500"
          )}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 cursor-pointer",
              activeCategory === cat
                ? "bg-primary border-primary text-white"
                : "bg-black border-white/10 text-white/40 hover:text-white hover:bg-white/10"
            )}
          >
            {cat}
            <span
              className={cn(
                "text-[10px] font-black px-1.5 py-0.5 rounded-full",
                activeCategory === cat ? "bg-white/20 text-white" : "bg-white/5 text-white/30"
              )}
            >
              {categoryCounts[cat] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Table List View */}
      <div className="glass-dark border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Blog Article</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Category</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30">Author &amp; Date</th>
                <th className="px-6 py-5 text-[10px] uppercase tracking-widest font-bold text-white/30 text-center">Active Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayedBlogs.map((blog) => (
                <tr key={blog.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 relative">
                        <img src={blog.image} className="w-full h-full object-cover" alt={blog.title} />
                      </div>
                      <div className="min-w-0 max-w-md">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm truncate group-hover:text-primary transition-colors">
                            {blog.title}
                          </h4>
                          {blog.active && (
                            <Link href={`/blog/${blog.slug}`} target="_blank" className="text-white/20 hover:text-white transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                        <p className="text-xs text-white/40 truncate mt-0.5">{blog.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 rounded-full bg-black border border-white/10 text-[10px] font-bold text-white/60">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-semibold text-white/70 flex flex-col gap-1">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-white/30" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1.5 text-white/30 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span
                        className={cn(
                          "text-[10px] font-black tracking-wider transition-colors",
                          blog.active ? "text-primary" : "text-white/20"
                        )}
                      >
                        {blog.active ? "VISIBLE" : "HIDDEN"}
                      </span>
                      
                      {/* Premium Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggle(blog.id, blog.active)}
                        disabled={togglingId === blog.id}
                        className={cn(
                          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50",
                          blog.active ? "bg-primary" : "bg-white/15"
                        )}
                      >
                        {togglingId === blog.id ? (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-3 h-3 animate-spin text-white" />
                          </span>
                        ) : (
                          <span
                            className={cn(
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                              blog.active ? "translate-x-5" : "translate-x-0"
                            )}
                          />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {displayedBlogs.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-xl font-bold text-white">No blogs found</h3>
          <p className="text-white/40">Try adjusting your filters or search query.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
