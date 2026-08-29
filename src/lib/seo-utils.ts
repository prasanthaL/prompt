import type { Prompt } from "./json-db";

/**
 * Shared function to determine if a prompt record should be indexed by search engines.
 *
 * INDEXING RULE:
 *   Only HIGH quality prompts may be indexed.
 *   MEDIUM and LOW quality prompts receive noindex, follow.
 *
 * Equivalent to:
 *   quality === "high" && seoIndex !== false && !hasUnresolvedPlaceholder && !isDuplicate
 *
 * Used by:
 * 1. Individual prompt page metadata (robots: { index: shouldIndexPrompt(prompt), follow: true })
 * 2. Sitemap generation (filters prompt pages)
 * 3. SEO helpers & audit tools
 */
export function shouldIndexPrompt(prompt: Partial<Prompt> | null | undefined): boolean {
  if (!prompt) return false;

  // 1. Explicit noindex flag
  if (prompt.seoIndex === false) return false;

  // 2. Quality gate — only HIGH quality prompts may be indexed.
  //    MEDIUM and LOW quality both receive noindex, follow.
  if (prompt.quality !== "high") return false;

  const text = prompt.fullPrompt || "";

  // 3. Unresolved placeholders check (e.g. {персонаж}, {character}, [NAME], [SUBJECT], etc.)
  const placeholderRegex = /\{[^{}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/i;
  if (placeholderRegex.test(text)) return false;

  // 4. Minimum meaningful content check (at least 20 words)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 20) return false;

  // 5. Corrupted text check (e.g. raw JSON strings)
  if (text.includes('"title":') && text.includes('"version":') && text.includes('"design_principles":')) {
    return false;
  }

  return true;
}
