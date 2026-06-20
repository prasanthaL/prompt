"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Eye,
  Heart,
  Share2,
  Link2,
  Sparkles,
  LayoutGrid,
  Ratio,
  FileText,
  Palette,
  Gauge,
  CalendarDays,
  Maximize2,
  Info,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ─── Social SVG icons ─────────────────────────────────────────── */
const IconTwitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconFacebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const IconPinterest = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const IconWhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ─── Types ────────────────────────────────────────────────────── */
interface PromptDetailClientProps {
  prompt: {
    id: string;
    title: string;
    category: string;
    author: string;
    image: string;
    fullPrompt: string;
    views: number;
    likes: number;
    tags?: string[];
    models?: string[];
    about?: string;
    howToUse?: string[];
    createdAt?: string;
  };
}

/* ─── Helper: derive display metadata ─────────────────────────── */
function derivePromptLength(text: string): string {
  const words = text.trim().split(/\s+/).length;
  if (words < 80) return "Short";
  if (words < 200) return "Medium";
  return "Long";
}

function deriveStyle(category: string): string {
  const map: Record<string, string> = {
    Fantasy: "Dark Fantasy",
    Cinematic: "Cinematic",
    Anime: "Anime / Manga",
    Portrait: "Photorealistic",
    Architecture: "Architectural",
    "Sci-Fi": "Sci-Fi",
    Nature: "Nature & Landscape",
    Abstract: "Abstract",
  };
  return map[category] ?? category;
}

function deriveDifficulty(text: string): string {
  const words = text.trim().split(/\s+/).length;
  if (words < 60) return "Beginner";
  if (words < 180) return "Intermediate";
  return "Advanced";
}

function formatPublished(dateStr?: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/* ─── Component ────────────────────────────────────────────────── */
export default function PromptDetailClient({ prompt }: PromptDetailClientProps) {
  const [copied, setCopied] = React.useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");
  const shareMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") setCurrentUrl(window.location.href);
  }, []);

  React.useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    };
    if (showShareMenu) document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [showShareMenu]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const promptLength = derivePromptLength(prompt.fullPrompt);
  const style = deriveStyle(prompt.category);
  const difficulty = deriveDifficulty(prompt.fullPrompt);
  const published = formatPublished(prompt.createdAt);
  const primaryModel =
    prompt.models && prompt.models.length > 0 ? prompt.models[0] : "Gemini AI";

  const detailRows = [
    { icon: LayoutGrid, label: "Category", value: prompt.category },
    { icon: Sparkles, label: "Model", value: primaryModel, highlight: true },
    { icon: Ratio, label: "Aspect Ratio", value: "16:9" },
    { icon: FileText, label: "Prompt Length", value: promptLength },
    { icon: Palette, label: "Style", value: style },
    { icon: Gauge, label: "Difficulty", value: difficulty },
    { icon: CalendarDays, label: "Published", value: published },
  ];

  const socialLinks = [
    {
      label: "Copy Link",
      icon: linkCopied ? Check : Link2,
      bg: "bg-[#1a1a2e]",
      color: "text-white",
      onClick: handleCopyLink,
    },
    {
      label: "Twitter / X",
      icon: IconTwitter,
      bg: "bg-black",
      color: "text-white",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this AI prompt: ${prompt.title}`)}`,
    },
    {
      label: "Facebook",
      icon: IconFacebook,
      bg: "bg-[#1877f2]",
      color: "text-white",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
    {
      label: "Pinterest",
      icon: IconPinterest,
      bg: "bg-[#e60023]",
      color: "text-white",
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(prompt.title)}`,
    },
    {
      label: "WhatsApp",
      icon: IconWhatsApp,
      bg: "bg-[#25d366]",
      color: "text-white",
      href: `https://wa.me/?text=${encodeURIComponent(`Check out this AI prompt: ${prompt.title} - ${currentUrl}`)}`,
    },
  ];

  return (
    <article className="prompt-detail-root space-y-0">
      {/* ── HEADER BAND ─────────────────────────────────────────── */}
      <section className="prompt-detail-header">
        <div className="prompt-detail-header-inner">
          {/* Category badge */}
          <span className="prompt-detail-category-badge">{prompt.category}</span>

          {/* Title */}
          <h1 className="prompt-detail-title">{prompt.title}</h1>

          {/* Description */}
          <p className="prompt-detail-description">
            {prompt.about ??
              `Create an epic ${prompt.category.toLowerCase()} AI image using this high-quality prompt optimized for ${primaryModel} image generation.`}
          </p>

          {/* Stats + actions row */}
          <div className="prompt-detail-stats-row">
            <div className="prompt-detail-stats">
              <div className="prompt-detail-stat">
                <Eye className="w-5 h-5" />
                <span className="prompt-detail-stat-value">{prompt.views.toLocaleString()}</span>
                <span className="prompt-detail-stat-label">Views</span>
              </div>
              <div className="prompt-detail-stat">
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="prompt-detail-stat-value">{prompt.likes.toLocaleString()}</span>
                <span className="prompt-detail-stat-label">Likes</span>
              </div>
            </div>

            <div className="prompt-detail-actions" ref={shareMenuRef}>
              {/* Share button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu((v) => !v)}
                  className={cn(
                    "prompt-detail-btn-share",
                    showShareMenu && "prompt-detail-btn-share--active"
                  )}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      className="prompt-share-dropdown"
                    >
                      {socialLinks.map((s) =>
                        s.href ? (
                          <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="prompt-share-item"
                          >
                            <span className={cn("prompt-share-icon-wrap", s.bg, s.color)}>
                              <s.icon className="w-3.5 h-3.5" />
                            </span>
                            {s.label}
                          </a>
                        ) : (
                          <button
                            key={s.label}
                            onClick={s.onClick}
                            className="prompt-share-item"
                          >
                            <span className={cn("prompt-share-icon-wrap", s.bg, s.color)}>
                              <s.icon className="w-3.5 h-3.5" />
                            </span>
                            {s.label}
                          </button>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Copy Prompt button */}
              <button
                onClick={handleCopy}
                className={cn(
                  "prompt-detail-btn-copy",
                  copied && "prompt-detail-btn-copy--done"
                )}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Prompt"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-COLUMN BODY ───────────────────────────────────────── */}
      <div className="prompt-detail-body">
        {/* LEFT — Image */}
        <div className="prompt-detail-image-col">
          <div className="prompt-detail-image-wrap">
            <Image
              src={prompt.image}
              alt={prompt.title}
              fill
              priority
              quality={95}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              style={{ backfaceVisibility: "hidden" }}
            />
            <div className="prompt-detail-image-overlay" />
            <button className="prompt-detail-fullsize-btn">
              <Maximize2 className="w-4 h-4" />
              View Full Size
            </button>
          </div>
        </div>

        {/* MIDDLE — Prompt Content */}
        <section className="prompt-detail-content-col">
          <div className="prompt-detail-card">
            <div className="prompt-detail-card-header">
              <div className="flex items-center gap-2">
                <div className="prompt-detail-card-icon-wrap bg-primary/10">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <h2 className="prompt-detail-card-title">Prompt Content</h2>
              </div>
              <p className="prompt-detail-card-subtitle">Use this prompt in your favorite AI image generator.</p>
            </div>

            <div className="prompt-detail-prompt-text-wrap">
              <p className="prompt-detail-prompt-text">{prompt.fullPrompt}</p>
            </div>

            <button
              onClick={handleCopy}
              className={cn(
                "prompt-detail-copy-inline-btn",
                copied && "prompt-detail-copy-inline-btn--done"
              )}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </section>

        {/* RIGHT — Details + Tags + Share */}
        <div className="prompt-detail-meta-col">
          {/* Prompt Details card */}
          <section className="prompt-detail-card">
            <div className="prompt-detail-card-header">
              <div className="flex items-center gap-2">
                <div className="prompt-detail-card-icon-wrap bg-violet-500/10">
                  <FileText className="w-4 h-4 text-violet-400" />
                </div>
                <h2 className="prompt-detail-card-title">Prompt Details</h2>
              </div>
            </div>

            <ul className="prompt-detail-meta-list">
              {detailRows.map(({ icon: Icon, label, value, highlight }) => (
                <li key={label} className="prompt-detail-meta-row">
                  <div className="prompt-detail-meta-label">
                    <Icon className="w-4 h-4 text-foreground/30" />
                    <span>{label}</span>
                  </div>
                  <span
                    className={cn(
                      "prompt-detail-meta-value",
                      highlight && "text-primary font-bold"
                    )}
                  >
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Share this prompt card */}
          <section className="prompt-detail-card">
            <div className="prompt-detail-card-header">
              <div className="flex items-center gap-2">
                <div className="prompt-detail-card-icon-wrap bg-sky-500/10">
                  <Share2 className="w-4 h-4 text-sky-400" />
                </div>
                <h2 className="prompt-detail-card-title">Share this prompt</h2>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((s) =>
                s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={cn("prompt-detail-social-btn", s.bg, s.color)}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ) : (
                  <button
                    key={s.label}
                    onClick={s.onClick}
                    title={s.label}
                    className={cn("prompt-detail-social-btn", s.bg, s.color)}
                  >
                    <s.icon className="w-5 h-5" />
                  </button>
                )
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ── About This Prompt + How To Use ──────────────────────────── */}
      <div className="prompt-detail-bottom-grid">

        {/* About This Prompt */}
        <section className="prompt-detail-card">
          <div className="prompt-detail-card-header">
            <div className="flex items-center gap-3">
              <div className="prompt-detail-card-icon-wrap bg-primary/10">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="prompt-detail-card-title">About This Prompt</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Auto Generated</span>
              </div>
            </div>
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed">
            {prompt.about ??
              `This is a high-quality ${prompt.category} AI prompt crafted by ${prompt.author}. It is designed to produce ${prompt.category === "Cinematic" ? "cinematic, film-quality" :
                prompt.category === "Fantasy" ? "rich, imaginative fantasy" :
                  prompt.category === "Anime" ? "detailed anime-style" :
                    prompt.category === "Portrait" ? "realistic, expressive portrait" :
                      prompt.category === "Architecture" ? "architecturally precise" :
                        prompt.category === "Sci-Fi" ? "futuristic sci-fi" :
                          "stunning"
              } visuals with minimal iteration. The prompt uses carefully selected descriptors and stylistic cues ${prompt.models && prompt.models.length > 0
                ? `optimised for ${prompt.models.join(" and ")}`
                : "compatible with leading AI image models"
              }, making it ideal for creators who want consistent, professional results.`
            }
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              { icon: CheckCircle2, label: "Production Ready" },
              { icon: CheckCircle2, label: "Beginner Friendly" },
              { icon: Lightbulb, label: "Creative Freedom" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[11px] font-bold px-3 py-1.5 rounded-full"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* How To Use */}
        <section className="prompt-detail-card">
          <div className="prompt-detail-card-header">
            <div className="flex items-center gap-3">
              <div className="prompt-detail-card-icon-wrap bg-emerald-500/10">
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="prompt-detail-card-title">How To Use</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Reusable Guide</span>
              </div>
            </div>
          </div>

          <ol className="space-y-3">
            {(prompt.howToUse ?? [
              "Copy the prompt using the \"Copy Prompt\" button above.",
              `Open your preferred AI model (${prompt.models && prompt.models.length > 0
                ? prompt.models[0]
                : "Gemini, Midjourney, or DALL·E"
              }) and paste the prompt into the input field.`,
              "Optionally, replace bracketed placeholders (e.g. [subject], [style]) with your own values to personalise the output.",
              "Run the prompt and review the result — iterate by tweaking descriptors for different moods or compositions.",
              "Save or export your favourite generations directly from the AI tool's interface.",
            ]).map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-foreground/60 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex items-start gap-2.5 bg-amber-500/5 border border-amber-500/15 rounded-2xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-400/80 leading-relaxed">
              For best results, use this prompt as-is before making edits — the defaults are already optimised.
            </p>
          </div>
        </section>

      </div>
    </article >
  );
}
