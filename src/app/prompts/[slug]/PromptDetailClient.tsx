"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Eye, Heart, Share2, Download, Sparkles, Link2, Info, BookOpen, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Custom Social Icons
const Facebook = (props: any) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = (props: any) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const MessageCircle = (props: any) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

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
    /** Auto-generated description about this prompt (future JSON field) */
    about?: string;
    /** Step-by-step usage instructions (future JSON field) */
    howToUse?: string[];
  };
}

export default function PromptDetailClient({ prompt }: PromptDetailClientProps) {
  const [copied, setCopied] = React.useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");
  const shareMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  React.useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setShowShareMenu(false);
      }
    };
    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickAway);
    }
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

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "hover:bg-emerald-500/20 hover:text-emerald-500",
      href: `https://wa.me/?text=${encodeURIComponent(`Check out this AI prompt: ${prompt.title} - ${currentUrl}`)}`
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-600/20 hover:text-blue-600",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-sky-500/20 hover:text-sky-500",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this AI prompt: ${prompt.title}`)}`
    },
    {
      name: "Copy Link",
      icon: linkCopied ? Check : Link2,
      color: "hover:bg-primary/20 hover:text-primary",
      onClick: handleCopyLink
    }
  ];

  return (
    <>
    <div className="relative w-full bg-background border border-border rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
      {/* Left: Image Showcase */}
      <div className="w-full md:w-1/2 relative bg-white/5 h-[400px] md:h-auto overflow-hidden">
        <Image
          src={prompt.image}
          alt={prompt.title}
          fill
          priority
          quality={100}
          sizes="(max-width: 1200px) 100vw, 50vw"
          className="w-full h-full object-cover animate-fade-in"
          style={{ backfaceVisibility: "hidden", transform: "translate3d(0, 0, 0)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-12 left-12 right-12 space-y-4">
          <div className="flex gap-2">
            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
              {prompt.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{prompt.title}</h1>
          <div className="flex items-center gap-3 pt-2">
            <div className="relative w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
              <Image
                src={`https://i.pravatar.cc/100?u=${prompt.author}`}
                alt={prompt.author}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="text-base text-white font-medium">by {prompt.author}</span>
          </div>
        </div>
      </div>

      {/* Right: Prompt Details */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col">
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-xs text-foreground/30 uppercase font-bold tracking-widest mb-1">Views</span>
              <div className="flex items-center gap-2 text-foreground text-xl font-bold">
                <Eye className="w-5 h-5 text-primary" />
                {prompt.views.toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-foreground/30 uppercase font-bold tracking-widest mb-1">Likes</span>
              <div className="flex items-center gap-2 text-foreground text-xl font-bold">
                <Heart className="w-5 h-5 text-pink-500" />
                {prompt.likes.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex gap-3 relative" ref={shareMenuRef}>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className={cn(
                "p-4 rounded-2xl transition-all border border-border group relative",
                showShareMenu ? "bg-primary text-white border-primary" : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground"
              )}
            >
              <Share2 className="w-6 h-6" />
            </button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-3 w-56 glass-dark rounded-2xl border border-border shadow-2xl p-2 z-[110]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {shareOptions.map((option) => (
                      option.href ? (
                        <a
                          key={option.name}
                          href={option.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-foreground/70",
                            option.color
                          )}
                        >
                          <option.icon className="w-4 h-4" />
                          {option.name}
                        </a>
                      ) : (
                        <button
                          key={option.name}
                          onClick={option.onClick}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-foreground/70",
                            option.color
                          )}
                        >
                          <option.icon className="w-4 h-4" />
                          {option.name}
                        </button>
                      )
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button className="p-4 bg-foreground/5 hover:bg-foreground/10 rounded-2xl transition-all text-foreground/70 hover:text-foreground border border-border">
              <Download className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="space-y-10 flex-grow">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Prompt Content
              </h3>
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300",
                  copied ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
                )}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copied!" : "Copy Prompt"}
              </button>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Outer wrapper constrains height and clips overflow */}
              <div className="relative rounded-[2rem] overflow-hidden">
                <div
                  className="bg-foreground/5 border border-border rounded-[2rem] p-8 font-mono text-base leading-relaxed text-foreground/80 select-all selection:bg-primary/30 overflow-y-auto"
                  style={{ maxHeight: "18rem" }}
                >
                  {prompt.fullPrompt}
                </div>
                {/* Fade-out hint at the bottom */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent rounded-b-[2rem]" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Model Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-foreground/5 p-4 rounded-2xl border border-border">
                <span className="block text-[10px] text-foreground/30 uppercase font-bold mb-1">Compatible Models</span>
                <div className="flex flex-wrap gap-1">
                  {prompt.models && prompt.models.length > 0 ? (
                    prompt.models.map((model, idx) => (
                      <span key={model} className="text-sm text-primary font-bold">
                        {model}{idx < (prompt.models?.length || 0) - 1 ? ", " : ""}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-primary font-bold">Gemini AI</span>
                  )}
                </div>
              </div>
              <div className="bg-foreground/5 p-4 rounded-2xl border border-border">
                <span className="block text-[10px] text-foreground/30 uppercase font-bold mb-1">Aspect Ratio</span>
                <span className="text-sm text-foreground font-bold">16:9</span>
              </div>
            </div>

            {prompt.tags && prompt.tags.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-foreground/5 hover:bg-foreground/10 text-foreground/70 text-xs px-3 py-1 rounded-full border border-border transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

      {/* ── About This Prompt ─────────────────────────────────── */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* About This Prompt */}
        <div className="bg-foreground/[0.03] border border-border rounded-[2rem] p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">About This Prompt</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Auto Generated</span>
            </div>
          </div>

          <p className="text-foreground/60 text-sm leading-relaxed">
            {prompt.about ??
              `This is a high-quality ${prompt.category} AI prompt crafted by ${prompt.author}. It is designed to produce ${
                prompt.category === "Cinematic" ? "cinematic, film-quality" :
                prompt.category === "Fantasy" ? "rich, imaginative fantasy" :
                prompt.category === "Anime" ? "detailed anime-style" :
                prompt.category === "Portrait" ? "realistic, expressive portrait" :
                prompt.category === "Architecture" ? "architecturally precise" :
                prompt.category === "Sci-Fi" ? "futuristic sci-fi" :
                "stunning"
              } visuals with minimal iteration. The prompt uses carefully selected descriptors and stylistic cues ${
                prompt.models && prompt.models.length > 0
                  ? `optimised for ${prompt.models.join(" and ")}`
                  : "compatible with leading AI image models"
              }, making it ideal for creators who want consistent, professional results.`
            }
          </p>

          {/* Highlight chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { icon: CheckCircle2, label: "Production Ready" },
              { icon: CheckCircle2, label: "Beginner Friendly" },
              { icon: Lightbulb,    label: "Creative Freedom" },
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
        </div>

        {/* How To Use */}
        <div className="bg-foreground/[0.03] border border-border rounded-[2rem] p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">How To Use</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Reusable Guide</span>
            </div>
          </div>

          <ol className="space-y-3">
            {(prompt.howToUse ?? [
              "Copy the prompt using the \"Copy Prompt\" button above.",
              `Open your preferred AI model (${
                prompt.models && prompt.models.length > 0
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

          <div className="flex items-start gap-2.5 bg-amber-500/5 border border-amber-500/15 rounded-2xl px-4 py-3 mt-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-400/80 leading-relaxed">
              For best results, use this prompt as-is before making edits — the defaults are already optimised.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
