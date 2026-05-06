"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Eye, Heart, Share2, Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: {
    title: string;
    category: string;
    author: string;
    image: string;
    fullPrompt: string;
    views: string;
    likes: string;
  } | null;
}

const PromptDetailModal = ({ isOpen, onClose, prompt }: PromptDetailModalProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
              <img
                src={prompt.image}
                alt={prompt.title}
                className="w-full h-full object-cover"
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
                  <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${prompt.author}`} alt={prompt.author} />
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
                <div className="flex gap-2">
                  <button className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-xl transition-all text-foreground/70 hover:text-foreground border border-border">
                    <Share2 className="w-5 h-5" />
                  </button>
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

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Model Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-foreground/5 p-3 rounded-xl border border-border">
                      <span className="block text-[10px] text-foreground/30 uppercase font-bold">Model</span>
                      <span className="text-sm text-foreground font-medium">gemini</span>
                    </div>
                    <div className="bg-foreground/5 p-3 rounded-xl border border-border">
                      <span className="block text-[10px] text-foreground/30 uppercase font-bold">Aspect Ratio</span>
                      <span className="text-sm text-foreground font-medium">16:9</span>
                    </div>
                  </div>
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
