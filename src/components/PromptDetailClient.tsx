"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Eye, Heart, Share2, Download, Sparkles, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="relative w-full glass-dark border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-w-6xl mx-auto">
      {/* Left: Image Showcase */}
      <div className="w-full lg:w-[42%] relative bg-white/5 aspect-square lg:aspect-auto">
        <img
          src={prompt.image}
          alt={prompt.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 space-y-3">
          <div className="flex gap-2">
            <span className="bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
              {prompt.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{prompt.title}</h1>
          <div className="flex items-center gap-2 pt-1">
            <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden border border-white/20">
              <img src={`https://i.pravatar.cc/100?u=${prompt.author}`} alt={prompt.author} />
            </div>
            <span className="text-sm text-white/70 font-medium">by {prompt.author}</span>
          </div>
        </div>
      </div>

      {/* Right: Prompt Details */}
      <div className="w-full lg:w-[58%] p-6 md:p-10 flex flex-col bg-gradient-to-br from-white/[0.02] to-transparent">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] text-foreground/30 uppercase font-black tracking-widest mb-1">Views</span>
              <div className="flex items-center gap-1.5 text-foreground text-lg font-bold">
                <Eye className="w-4 h-4 text-primary" />
                {prompt.views.toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-foreground/30 uppercase font-black tracking-widest mb-1">Likes</span>
              <div className="flex items-center gap-1.5 text-foreground text-lg font-bold">
                <Heart className="w-4 h-4 text-pink-500" />
                {prompt.likes.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex gap-2 relative" ref={shareMenuRef}>
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className={cn(
                "p-3 rounded-xl transition-all border border-white/10 group relative",
                showShareMenu ? "bg-primary text-white border-primary" : "bg-white/5 hover:bg-white/10 text-foreground/70 hover:text-foreground"
              )}
            >
              <Share2 className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-3 w-48 glass-dark rounded-xl border border-white/10 shadow-2xl p-1.5 z-[110]"
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
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all text-foreground/70",
                            option.color
                          )}
                        >
                          <option.icon className="w-3.5 h-3.5" />
                          {option.name}
                        </a>
                      ) : (
                        <button
                          key={option.name}
                          onClick={option.onClick}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all text-foreground/70",
                            option.color
                          )}
                        >
                          <option.icon className="w-3.5 h-3.5" />
                          {option.name}
                        </button>
                      )
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-foreground/70 hover:text-foreground border border-white/10">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-8 flex-grow">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Prompt Content
              </h3>
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                  copied ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
                )}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Prompt"}
              </button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm leading-relaxed text-foreground/80 select-all selection:bg-primary/30 min-h-[150px]">
                {prompt.fullPrompt}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">Model Settings</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="block text-[9px] text-foreground/30 uppercase font-black mb-1">Model</span>
                <span className="text-xs text-foreground/90 font-bold">Gemini AI</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="block text-[9px] text-foreground/30 uppercase font-black mb-1">Aspect Ratio</span>
                <span className="text-xs text-foreground/90 font-bold">16:9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
