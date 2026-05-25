"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Eye, Heart, Share2, Download, Sparkles, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Custom Social Icons since Lucide deprecated them
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

interface PromptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: {
    id: string;
    title: string;
    category: string;
    author: string;
    image: string;
    fullPrompt: string;
    views: string | number;
    likes: string | number;
    tags?: string[];
    models?: string[];
  } | null;
}

const PromptDetailModal = ({ isOpen, onClose, prompt }: PromptDetailModalProps) => {
  const [copied, setCopied] = React.useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");
  const shareMenuRef = React.useRef<HTMLDivElement>(null);

  // Set URL on client side
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [isOpen]);

  // Close share menu on click away
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
    if (prompt) {
      navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
      href: `https://wa.me/?text=${encodeURIComponent(`Check out this AI prompt: ${prompt?.title} - ${currentUrl}`)}`
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
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this AI prompt: ${prompt?.title}`)}`
    },
    {
      name: "Copy Link",
      icon: linkCopied ? Check : Link2,
      color: "hover:bg-primary/20 hover:text-primary",
      onClick: handleCopyLink
    }
  ];

  if (!prompt) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-background border border-border rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/10 text-white/70 hover:text-white rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Image Showcase */}
            <div className="w-full md:w-1/2 relative bg-white/5 h-[300px] md:h-auto">
              <Image
                src={prompt.image}
                alt={prompt.title}
                fill
                priority
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 space-y-4">
                <div className="flex gap-2">
                  <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    {prompt.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">{prompt.title}</h2>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                    <Image
                      src={`https://i.pravatar.cc/100?u=${prompt.author}`}
                      alt={prompt.author}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-white/70 font-medium">by {prompt.author}</span>
                </div>
              </div>
            </div>

            {/* Right: Prompt Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-xs text-foreground/30 uppercase font-bold tracking-widest mb-1">Views</span>
                    <div className="flex items-center gap-2 text-foreground font-bold">
                      <Eye className="w-4 h-4 text-primary" />
                      {prompt.views}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-foreground/30 uppercase font-bold tracking-widest mb-1">Likes</span>
                    <div className="flex items-center gap-2 text-foreground font-bold">
                      <Heart className="w-4 h-4 text-pink-500" />
                      {prompt.likes}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 relative" ref={shareMenuRef}>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className={cn(
                      "p-3 rounded-xl transition-all border border-border group relative",
                      showShareMenu ? "bg-primary text-white border-primary" : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground"
                    )}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  {/* Share Dropdown */}
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-48 glass-dark rounded-2xl border border-border shadow-2xl p-2 z-[110]"
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

                  <button className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-all text-foreground/70 hover:text-foreground border border-border">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Prompt Content
                  </h3>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300",
                      copied ? "bg-emerald-500 text-white" : "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20"
                    )}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Prompt"}
                  </button>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-foreground/5 border border-border rounded-2xl p-6 font-mono text-sm leading-relaxed text-foreground/80 select-all">
                    {prompt.fullPrompt}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Model Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-foreground/5 p-3 rounded-xl border border-border">
                      <span className="block text-[10px] text-foreground/30 uppercase font-bold mb-1">Compatible Models</span>
                      <div className="flex flex-wrap gap-1">
                        {prompt.models && prompt.models.length > 0 ? (
                          prompt.models.map((model, idx) => (
                            <span key={model} className="text-xs font-semibold text-primary">
                              {model}{idx < (prompt.models?.length || 0) - 1 ? ", " : ""}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs font-semibold text-primary">Gemini AI</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-foreground/5 p-3 rounded-xl border border-border">
                      <span className="block text-[10px] text-foreground/30 uppercase font-bold mb-1">Aspect Ratio</span>
                      <span className="text-sm text-foreground font-medium">16:9</span>
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromptDetailModal;
