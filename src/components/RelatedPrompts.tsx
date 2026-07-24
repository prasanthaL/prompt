"use client";

import React from "react";
import PromptCard from "./PromptCard";

interface RelatedPromptItem {
  id: string;
  title: string;
  category: string;
  author: string;
  image: string;
  views: number;
  likes: number;
  slug?: string | null;
  tags?: string[];
  models?: string[];
  fullPrompt?: string;
  isPremium?: boolean;
}

interface RelatedPromptsProps {
  sourcePromptId: string;
  similarPrompts: RelatedPromptItem[];
}

export default function RelatedPrompts({
  sourcePromptId,
  similarPrompts,
}: RelatedPromptsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {similarPrompts.map((relatedPrompt) => (
        <PromptCard
          key={relatedPrompt.id}
          {...relatedPrompt}
          views={relatedPrompt.views.toString()}
          likes={relatedPrompt.likes.toString()}
          onClick={() => {
            window.gtag?.("event", "related_prompt_click", {
              source_prompt_id: sourcePromptId,
              target_prompt_id: relatedPrompt.id,
              target_prompt_title: relatedPrompt.title,
            });
          }}
        />
      ))}
    </div>
  );
}
