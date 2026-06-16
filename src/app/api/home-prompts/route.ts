import { NextRequest, NextResponse } from "next/server";
import { getAllPrompts } from "@/lib/json-db";
import { Prompt } from "@/lib/json-db";

export const runtime = "nodejs";

const PAGE_SIZE = 12;

/**
 * GET /api/home-prompts?tab=trending&category=Cinematic&page=1
 *
 * Returns a paginated slice of prompts for the given home tab filter.
 * The full prompt list is fetched via getAllPrompts() which reads from
 * the local JSON files (or KV in production). Results are cached at
 * the HTTP layer so repeated tab switches are served from the browser cache.
 *
 * Query params:
 *   tab       – "trending" | "popular" | "latest" | "all"  (default: "trending")
 *   category  – optional category display name to further filter
 *   page      – 1-indexed page number (default: 1)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const tab = (searchParams.get("tab") ?? "trending") as
    | "trending"
    | "popular"
    | "latest"
    | "all";
  const category = searchParams.get("category")?.trim() ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

  try {
    const all: Prompt[] = await getAllPrompts();

    // ── 1. Apply tab filter ────────────────────────────────────────────────
    let tabFiltered: Prompt[];
    switch (tab) {
      case "trending":
        tabFiltered = all
          .filter((p) => p.isTrending)
          .sort(
            (a, b) =>
              (Number(b.views ?? 0) + Number(b.likes ?? 0)) -
              (Number(a.views ?? 0) + Number(a.likes ?? 0))
          );
        break;
      case "popular":
        tabFiltered = all
          .filter((p) => p.isFeatured)
          .sort(
            (a, b) =>
              (Number(b.views ?? 0) + Number(b.likes ?? 0)) -
              (Number(a.views ?? 0) + Number(a.likes ?? 0))
          );
        break;
      case "latest":
        tabFiltered = all
          .filter((p) => p.isLatest)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        break;
      case "all":
      default:
        tabFiltered = [...all].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    // ── 2. Apply optional category filter ─────────────────────────────────
    const categoryFiltered = category
      ? tabFiltered.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        )
      : tabFiltered;

    // ── 3. Build category counts (before pagination, after tab filter) ────
    const categoryCounts: Record<string, number> = {};
    for (const p of tabFiltered) {
      if (p.category) {
        categoryCounts[p.category] =
          (categoryCounts[p.category] ?? 0) + 1;
      }
    }

    // ── 4. Paginate ───────────────────────────────────────────────────────
    const totalCount = categoryFiltered.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const prompts = categoryFiltered.slice(start, start + PAGE_SIZE);

    return NextResponse.json(
      { prompts, totalCount, totalPages, currentPage: safePage, categoryCounts },
      {
        headers: {
          // Cache in the browser & CDN: 60 s fresh, serve stale for 2 min while revalidating
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (err) {
    console.error("[home-prompts] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
