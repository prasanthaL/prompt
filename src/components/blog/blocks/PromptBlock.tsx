"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import PromptCard from "@/components/PromptCard";

interface PromptBlockProps {
  title?: string;
  prompt: string;
  image?: string;
  inGrid?: boolean;
  slug?: string;
  href?: string;
  category?: string;
}

export default function PromptBlock({ title, prompt, image, inGrid, slug, href, category }: PromptBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (image) {
    // Generate a safe ID for the PromptCard
    const safeId = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "portrait-prompt";
    const cardElement = (
      <PromptCard
        id={safeId}
        title={title ?? "AI Image Prompt"}
        category={category ?? "Portrait"}
        author="Admin"
        image={image}
        views={100}
        likes={50}
        fullPrompt={prompt}
        slug={slug}
        href={href}
      />
    );

    if (inGrid) {
      return cardElement;
    }

    return (
      <div className="max-w-md mx-auto my-8">
        {cardElement}
      </div>
    );
  }

  return (
    <div className="my-6 rounded-2xl border border-primary/30 bg-primary/5 overflow-hidden">
      {/* header bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-primary/10 border-b border-primary/20">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          {title ?? "Prompt Example"}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-foreground/60 hover:text-primary transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <p className="px-5 py-4 text-foreground/85 leading-relaxed font-mono text-sm whitespace-pre-wrap">
        {prompt}
      </p>
    </div>
  );
}
