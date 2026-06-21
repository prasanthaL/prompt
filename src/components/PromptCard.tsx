"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  priority?: boolean;
  tags?: string[];
  models?: string[];
  description?: string;
  fullPrompt?: string;
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
  priority,
  tags,
  models,
  description,
  fullPrompt,
}: PromptCardProps) => {
  const cardHref = href || (slug ? `/prompts/${slug}` : `/prompts/${id}`);
  const promptDescription = description || fullPrompt;

  const CardInner = (
    <>
      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          quality={95}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
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

        {promptDescription && (
          <p className="text-xs text-foreground/50 line-clamp-2 mt-1">
            {promptDescription}
          </p>
        )}

        {/* Models & Tags */}
        {((models && models.length > 0) || (tags && tags.length > 0)) && (
          <div className="flex flex-wrap gap-1 items-center">
            {models?.map((model) => (
              <span
                key={model}
                className="bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-md border border-primary/20"
              >
                {model}
              </span>
            ))}
            {tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-foreground/5 text-foreground/50 text-[9px] font-medium px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

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
              <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-foreground/10 overflow-hidden relative">
                <Image
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="user avatar"
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const containerClasses = "group relative bg-foreground/5 border border-border rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col";

  if (cardHref) {
    return (
      <article className={containerClasses}>
        <Link href={cardHref} className="block h-full">
          {CardInner}
        </Link>
      </article>
    );
  }

  return (
    <article className={containerClasses} onClick={onClick}>
      {CardInner}
    </article>
  );
};

export default PromptCard;
