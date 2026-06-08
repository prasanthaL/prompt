"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  Upload,
  Plus,
  Type,
  Tag,
  Globe,
  CheckCircle2,
  LogOut,
  Loader2,
  Sparkles,
  Edit2,
  XCircle,
  LayoutGrid,
  ArrowRight
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import PromptCard from "@/components/PromptCard";

// Canvas-based image compression + WebP conversion helper
const compressImage = async (
  file: File,
  maxKb: number = 400
): Promise<{ file: File; originalSize: number; compressedSize: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Downscale to max 1600px dimension if it's very large
        const maxDimension = 1600;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve({ file, originalSize: file.size, compressedSize: file.size });

        // White background for images with transparency (e.g. PNG)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.92;
        const tryCompress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return resolve({ file, originalSize: file.size, compressedSize: file.size });
              }
              if (blob.size / 1024 <= maxKb || quality <= 0.1) {
                // Always output as .webp for maximum compression & quality
                const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                  type: "image/webp",
                  lastModified: Date.now(),
                });
                resolve({
                  file: webpFile,
                  originalSize: file.size,
                  compressedSize: blob.size,
                });
              } else {
                quality -= 0.08;
                tryCompress();
              }
            },
            "image/webp",
            quality
          );
        };
        tryCompress();
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

function DashboardContent() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Cinematic",
    fullPrompt: "",
    isTrending: false,
    isLatest: false,
    isFeatured: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // New features state variables
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [models, setModels] = useState<string[]>([]);
  const [customModelInput, setCustomModelInput] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{
    original: number;
    compressed: number;
  } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  useEffect(() => {
    if (editId) {
      fetchPromptToEdit(editId);
    }
  }, [editId]);

  const fetchPromptToEdit = async (id: string) => {
    try {
      const res = await fetch("/api/admin/prompts");
      if (res.ok) {
        const data = await res.json();
        const prompt = data.find((p: any) => p.id === id);
        if (prompt) {
          setEditingId(prompt.id);
          setFormData({
            title: prompt.title,
            category: prompt.category,
            fullPrompt: prompt.fullPrompt,
            isTrending: prompt.isTrending || false,
            isLatest: prompt.isLatest || false,
            isFeatured: prompt.isFeatured || false,
          });
          setPreview(prompt.image);
          setExistingImageUrl(prompt.image);
          setTags(prompt.tags || []);
          setModels(prompt.models || []);
          setCompressionStats(null);
        }
      }
    } catch (err) {
      console.error("Failed to fetch prompt for editing", err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setIsCompressing(true);
      setCompressionStats(null);
      try {
        const result = await compressImage(selectedFile, 400);
        setFile(result.file);
        setPreview(URL.createObjectURL(result.file));
        setExistingImageUrl(null);
        setCompressionStats({
          original: result.originalSize,
          compressed: result.compressedSize,
        });
      } catch (err) {
        console.error("Failed to compress image:", err);
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setExistingImageUrl(null);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", category: "Cinematic", fullPrompt: "", isTrending: false, isLatest: false, isFeatured: false });
    setFile(null);
    setPreview("");
    setEditingId(null);
    setExistingImageUrl(null);
    setMessage({ type: "", text: "" });
    setTags([]);
    setModels([]);
    setCompressionStats(null);
    setTagInput("");
    setCustomModelInput("");
    router.replace("/admin/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !existingImageUrl) {
      setMessage({ type: "error", text: "Please upload an image" });
      return;
    }

    setIsUploading(true);
    setMessage({ type: "", text: "" });

    try {
      let imageUrl = existingImageUrl;

      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("file", file);

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.secure_url;
      }

      const url = editingId ? `/api/admin/prompts/${editingId}` : "/api/admin/prompts";
      const method = editingId ? "PUT" : "POST";

      const promptRes = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imageUrl, tags, models }),
      });

      if (promptRes.ok) {
        setMessage({
          type: "success",
          text: editingId ? "Prompt updated successfully!" : "Prompt uploaded successfully!"
        });
        setTimeout(() => {
          if (editingId) router.push("/admin/prompts");
          resetForm();
        }, 1500);
      } else {
        throw new Error("Failed to save prompt to database");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An error occurred" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Left: Upload/Edit Form */}
      <div className="lg:col-span-2 space-y-8">
        <div className="glass-dark border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {editingId ? <Edit2 className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-primary" />}
              {editingId ? "Edit Prompt" : "Upload New Prompt"}
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-xs font-bold text-white/40 hover:text-white flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {message.text && (
              <div className={cn(
                "p-4 rounded-xl flex items-center gap-3 text-sm border",
                message.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  : "bg-red-500/10 border-red-500/20 text-red-500"
              )}>
                {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">
                Prompt Image Preview
              </label>
              <div
                className="relative group border-2 border-dashed border-white/10 rounded-[2rem] h-[300px] overflow-hidden flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer mb-2"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-white/40 group-hover:text-primary" />
                    </div>
                    <p className="font-bold text-white/40">Select image for upload</p>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              {/* Compression feedback panel */}
              {isCompressing && (
                <div className="text-[11px] text-primary font-medium bg-primary/10 border border-primary/20 p-3 rounded-xl flex items-center gap-2 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Converting to WebP &amp; compressing below 400KB...
                </div>
              )}
              {compressionStats && (
                <div className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center justify-between">
                  <span>✓ Converted to WebP &amp; compressed!</span>
                  <span>
                    {(compressionStats.original / 1024).toFixed(0)}KB →{" "}
                    <strong className="text-white">
                      {(compressionStats.compressed / 1024).toFixed(0)}KB
                    </strong>{" "}
                    ({Math.round(((compressionStats.original - compressionStats.compressed) / compressionStats.original) * 100)}% saved)
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Type className="w-4 h-4 text-primary" />
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter prompt title"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer text-white"
                >
                  <option value="Cinematic">Cinematic</option>
                  <option value="Anime">Anime</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Product">Product</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Full Prompt Text
              </label>
              <textarea
                rows={4}
                value={formData.fullPrompt}
                onChange={(e) => setFormData({ ...formData, fullPrompt: e.target.value })}
                placeholder="Paste the full AI prompt here..."
                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-6 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none text-white"
                required
              ></textarea>
            </div>

            {/* Tags Selection Component */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                Tags (Multi-select)
              </label>
              <div className="flex flex-wrap gap-1.5 p-3.5 bg-white/5 border border-white/10 rounded-2xl">
                {["3D Render", "Photorealistic", "Cyberpunk", "Minimalist", "Fantasy", "Illustration", "Anime", "Vibrant"].map((t) => {
                  const isSelected = tags.includes(t);
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => {
                        if (isSelected) {
                          setTags(tags.filter((x) => x !== t));
                        } else {
                          setTags([...tags, t]);
                        }
                      }}
                      className={cn(
                        "text-xs px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer",
                        isSelected
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                          : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {isSelected ? "✓ " : ""}{t}
                    </button>
                  );
                })}
              </div>

              {/* Custom tag input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = tagInput.trim();
                      if (val && !tags.includes(val)) {
                        setTags([...tags, val]);
                        setTagInput("");
                      }
                    }
                  }}
                  placeholder="Type custom tag and press Enter"
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    const val = tagInput.trim();
                    if (val && !tags.includes(val)) {
                      setTags([...tags, val]);
                      setTagInput("");
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 rounded-2xl transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((t) => (
                    <span
                      key={t}
                      onClick={() => setTags(tags.filter((x) => x !== t))}
                      className="bg-primary/20 hover:bg-red-500/20 hover:text-red-400 text-primary-foreground border border-primary/30 hover:border-red-500/30 text-[10px] font-bold px-2.5 py-1 rounded-md cursor-pointer transition-all flex items-center gap-1 group"
                    >
                      #{t} <span className="text-[8px] opacity-60 group-hover:text-red-400">✕</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Model Selection Component */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                AI Models (Multi-select)
              </label>
              <div className="flex flex-wrap gap-1.5 p-3.5 bg-white/5 border border-white/10 rounded-2xl">
                {["Gemini AI", "Chat GPT", "Flow AI"].map((m) => {
                  const isSelected = models.includes(m);
                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => {
                        if (isSelected) {
                          setModels(models.filter((x) => x !== m));
                        } else {
                          setModels([...models, m]);
                        }
                      }}
                      className={cn(
                        "text-xs px-4 py-2 rounded-xl font-bold border transition-all cursor-pointer",
                        isSelected
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                          : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                      )}
                    >
                      {isSelected ? "✓ " : ""}{m}
                    </button>
                  );
                })}
              </div>

              {/* Custom model input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customModelInput}
                  onChange={(e) => setCustomModelInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = customModelInput.trim();
                      if (val && !models.includes(val)) {
                        setModels([...models, val]);
                        setCustomModelInput("");
                      }
                    }
                  }}
                  placeholder="Add custom model (e.g. Midjourney) and press Enter"
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl py-3.5 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    const val = customModelInput.trim();
                    if (val && !models.includes(val)) {
                      setModels([...models, val]);
                      setCustomModelInput("");
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 rounded-2xl transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>

              {models.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {models.map((m) => (
                    <span
                      key={m}
                      onClick={() => setModels(models.filter((x) => x !== m))}
                      className="bg-primary/20 hover:bg-red-500/20 hover:text-red-400 text-primary-foreground border border-primary/30 hover:border-red-500/30 text-[10px] font-bold px-2.5 py-1 rounded-md cursor-pointer transition-all flex items-center gap-1 group"
                    >
                      {m} <span className="text-[8px] opacity-60 group-hover:text-red-400">✕</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Status Badges Section */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Prompt Labels
              </label>
              <div className="grid grid-cols-3 gap-3">

                {/* Trending */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isTrending: !formData.isTrending })}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer text-left",
                    formData.isTrending
                      ? "bg-orange-500/15 border-orange-500/40 text-orange-400"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
                  )}
                >
                  <span className="text-xl">🔥</span>
                  <div>
                    <p className="font-bold text-sm">Trending</p>
                    <p className="text-[10px] opacity-60">Show in trending</p>
                  </div>
                  {formData.isTrending && <span className="ml-auto text-orange-400 font-black text-xs">ON</span>}
                </button>

                {/* Latest */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isLatest: !formData.isLatest })}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer text-left",
                    formData.isLatest
                      ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
                  )}
                >
                  <span className="text-xl">🆕</span>
                  <div>
                    <p className="font-bold text-sm">Latest</p>
                    <p className="text-[10px] opacity-60">Show in latest</p>
                  </div>
                  {formData.isLatest && <span className="ml-auto text-blue-400 font-black text-xs">ON</span>}
                </button>

                {/* Featured */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer text-left",
                    formData.isFeatured
                      ? "bg-purple-500/15 border-purple-500/40 text-purple-400"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
                  )}
                >
                  <span className="text-xl">⭐</span>
                  <div>
                    <p className="font-bold text-sm">Featured</p>
                    <p className="text-[10px] opacity-60">Homepage spotlight</p>
                  </div>
                  {formData.isFeatured && <span className="ml-auto text-purple-400 font-black text-xs">ON</span>}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading || isCompressing}
              className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {editingId ? "Updating..." : "Publishing..."}
                </>
              ) : (
                <>
                  {editingId ? <Edit2 className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  {editingId ? "Update Prompt" : "Publish Prompt"}
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Sidebar: Preview Card & Shortcuts */}
      <div className="space-y-8">
        {/* Live Preview Card */}
        <div className="glass-dark border border-white/10 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
          <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest ml-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            Live Preview Card
          </h3>
          <div className="h-[430px]">
            <PromptCard
              id="preview"
              title={formData.title || "Untitled Prompt"}
              category={formData.category}
              author="Admin"
              image={preview || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"}
              views={0}
              likes={0}
              tags={tags}
              models={models}
            />
          </div>
        </div>

        <div
          onClick={() => router.push("/admin/prompts")}
          className="glass-dark border border-white/5 rounded-[2.5rem] p-8 shadow-2xl group cursor-pointer hover:border-primary/50 transition-all"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <LayoutGrid className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Manage Prompts</h3>
          <p className="text-sm text-white/40 leading-relaxed mb-6">
            View all your prompts in a professional table layout. Edit, delete, and monitor performance.
          </p>
          <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
            Go to Management
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div className="glass-dark border border-white/5 rounded-[2.5rem] p-8 shadow-2xl bg-primary/5">
          <h3 className="text-xl font-bold text-white mb-2">Pro Tip</h3>
          <p className="text-sm text-white/40 leading-relaxed">
            Organizing prompts by category helps users find exactly what they need. Current popular category: <span className="text-primary font-bold">Cinematic</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="min-h-screen mesh-gradient pb-20">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5 py-4 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Admin Dashboard</span>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </nav>

      <Suspense fallback={<div className="pt-40 text-center text-white/40">Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
