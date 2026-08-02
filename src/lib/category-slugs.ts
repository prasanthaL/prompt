import categoriesData from "@/data/categories.json";

/**
 * Converts any category display name or raw string to a clean, SEO-friendly URL slug.
 * E.g., "Animals & Wildlife" -> "animals-and-wildlife"
 * E.g., "Nature & Landscape" -> "nature-and-landscape"
 * E.g., "Sci-Fi" -> "sci-fi"
 * E.g., "Digital Art" -> "digital-art"
 */
export function categoryToSlug(categoryName: string): string {
  if (!categoryName) return "";
  return categoryName
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Maps a category name or slug to its corresponding JSON data filename in `src/data/prompts/`.
 * E.g., "animals-and-wildlife" -> "animals-&-wildlife"
 * E.g., "nature-and-landscape" -> "nature-&-landscape"
 */
export function categoryToPromptFileSlug(categoryNameOrSlug: string): string {
  const slug = categoryToSlug(categoryNameOrSlug);
  if (slug === "animals-and-wildlife") return "animals-&-wildlife";
  if (slug === "nature-and-landscape") return "nature-&-landscape";
  return slug;
}

/**
 * Maps any slug (e.g. "animals-and-wildlife", "animals%20&%20wildlife", "animals-&-wildlife")
 * or raw category string back to the official display name in categories.json (e.g. "Animals & Wildlife").
 */
export function slugToCategoryName(slugOrName: string): string {
  if (!slugOrName) return "";
  const decoded = decodeURIComponent(slugOrName).trim();
  const targetSlug = categoryToSlug(decoded);

  const found = categoriesData.find(
    (c) => categoryToSlug(c.name) === targetSlug || c.name.toLowerCase() === decoded.toLowerCase()
  );

  if (found) {
    return found.name;
  }

  // Fallback for known edge-case categories
  if (targetSlug === "sci-fi") return "Sci-Fi";

  // General fallback: format "animals-and-wildlife" -> "Animals & Wildlife"
  return decoded
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\bAnd\b/g, "&");
}

/**
 * Checks whether a given category name matches a target slug or query.
 */
export function isCategoryMatch(categoryName: string, query: string): boolean {
  if (!categoryName || !query) return false;
  return categoryToSlug(categoryName) === categoryToSlug(decodeURIComponent(query));
}
