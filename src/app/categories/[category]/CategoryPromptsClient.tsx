"use client";

import React, { useState, useRef, useTransition } from "react";
import PromptCard from "@/components/PromptCard";
import Link from "next/link";
import { Sparkles, ChevronDown, Loader2 } from "lucide-react";
import type { Prompt } from "@/lib/json-db";
import { fetchPromptsByCategory } from "@/lib/client-prompts";

const PAGE_SIZE = 8;

interface CategoryPromptsClientProps {
  /** First batch of prompts pre-rendered on the server */
  initialPrompts: Prompt[];
  /** Total number of prompts available for this category */
  totalCount: number;
  /** Lowercase category key used to load more prompts */
  categoryKey: string;
  displayName: string;
}

export default function CategoryPromptsClient({
  initialPrompts,
  totalCount,
  categoryKey,
  displayName,
}: CategoryPromptsClientProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  /**
   * Full category array, loaded once on first "See More" click and cached
   * in the module-level Map inside client-prompts.ts. Subsequent clicks are
   * instant — no network request needed.
   */
  const allPromptsRef = useRef<Prompt[] | null>(null);

  const hasMore = prompts.length < totalCount;

  const loadMore = () => {
    startTransition(async () => {
      try {
        setError(null);

        // Load (or retrieve from cache) the full list for this category
        if (!allPromptsRef.current) {
          allPromptsRef.current = await fetchPromptsByCategory(categoryKey);
        }

        const all = allPromptsRef.current;
        const offset = prompts.length;
        const next = all.slice(offset, offset + PAGE_SIZE);

        setPrompts((prev) => [...prev, ...next]);
      } catch (err) {
        setError("Could not load more prompts. Please try again.");
        console.error(err);
      }
    });
  };

  if (prompts.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center space-y-6 glass-dark rounded-[2.5rem] border border-foreground/10">
        <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-foreground/10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">No prompts found</h3>
          <p className="text-foreground/40 text-sm">
            We haven&apos;t added any prompts to this category yet.
          </p>
        </div>
        <Link
          href="/browse"
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-hover transition-all text-sm"
        >
          Browse All Prompts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Prompt grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {prompts.map((p) => (
          <PromptCard
            key={p.id}
            {...p}
            views={p.views?.toString() || "0"}
            likes={p.likes?.toString() || "0"}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-xs text-foreground/30 font-medium">
          Showing{" "}
          <span className="text-foreground/60 font-bold">{prompts.length}</span>{" "}
          of{" "}
          <span className="text-foreground/60 font-bold">{totalCount}</span>{" "}
          {displayName} prompts
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-xs h-1 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min((prompts.length / totalCount) * 100, 100)}%` }}
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {hasMore && (
          <button
            onClick={loadMore}
            disabled={isPending}
            id={`see-more-${categoryKey}`}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-primary/30 text-foreground font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Loading more…</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors group-hover:translate-y-0.5 transition-transform" />
                <span>See More {displayName} Prompts</span>
              </>
            )}
            {/* Glow ring on hover */}
            <span className="absolute inset-0 rounded-2xl ring-2 ring-primary/0 group-hover:ring-primary/20 transition-all duration-300 pointer-events-none" />
          </button>
        )}
      </div>
    </div>
  );
}
