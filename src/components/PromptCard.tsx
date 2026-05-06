"use client";

import React from "react";
import { Copy, Eye, Heart, Bookmark, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  title: string;
  category: string;
  author: string;
  image: string;
  views: string;
  likes: string;
  isPremium?: boolean;
  onClick?: () => void;
}

const PromptCard = ({
  title,
  category,
  author,
  image,
  views,
  likes,
  isPremium,
  onClick
}: PromptCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isPremium && (
            <div className="bg-amber-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
              Premium
            </div>
          )}
          <div className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
            {category}
          </div>
        </div>

        <button className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-xl text-white/70 hover:text-white transition-all">
          <Bookmark className="w-4 h-4" />
        </button>

        {/* Copy Button (Floating on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <button className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/40 flex items-center gap-2 font-bold hover:scale-105 active:scale-95 transition-all">
            <Copy className="w-5 h-5" />
            Copy Prompt
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-xs text-white/40 font-medium">by {author}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary group-hover:bg-primary/10 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {likes}
            </span>
          </div>

          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#111] bg-white/10 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
