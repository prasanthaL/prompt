"use client";

import React from "react";
import Link from "next/link";
import { Copy, Eye, Heart, ArrowUpRight } from "lucide-react";

interface PromptCardProps {
  id: string;
  title: string;
  category: string;
  author: string;
  image: string;
  views: string | number;
  likes: string | number;
  isPremium?: boolean;
  onClick?: () => void;
  href?: string;
  slug?: string | null;
}

const PromptCard = ({
  id,
  title,
  category,
  author,
  image,
  views,
  likes,
  isPremium,
  onClick,
  href,
  slug,
}: PromptCardProps) => {
  const cardHref = href || (slug ? `/prompts/${slug}` : `/prompts/${id}`);

  const CardContent = (
    <div
      onClick={!cardHref ? onClick : undefined}
      className="group relative bg-foreground/5 border border-border rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden shrink-0">
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

        {/* Visual Button (Floating on Hover) */}
        {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10 pointer-events-none">
          <div className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/40 flex items-center gap-2 font-bold transform transition-transform group-hover:scale-105">
            <Copy className="w-5 h-5" />
            Copy Prompt
          </div>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-grow">
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            <p className="text-xs text-foreground/40 font-medium">by {author}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
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
              <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-foreground/10 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user avatar" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (cardHref) {
    return (
      <Link href={cardHref} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default PromptCard;
