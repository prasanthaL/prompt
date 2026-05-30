import { NextRequest, NextResponse } from "next/server";
import { getPromptsByCategory } from "@/lib/json-db";

export const runtime = "nodejs";

/**
 * GET /api/category-prompts?category=anime&offset=8&limit=8
 *
 * Returns a paginated slice of prompts for the given category.
 * The full list is fetched via the cached `getPromptsByCategory` helper
 * so repeated calls within the same cache window are free.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category")?.trim();
  const offset = Math.max(0, parseInt(searchParams.get("offset") ?? "0", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "8", 10)));

  if (!category) {
    return NextResponse.json({ error: "category is required" }, { status: 400 });
  }

  try {
    const all = await getPromptsByCategory(category);
    const slice = all.slice(offset, offset + limit);
    return NextResponse.json(slice, {
      headers: {
        // Cache for 60 s in the browser so rapid "See More" clicks don't re-hit the server
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err) {
    console.error("[category-prompts] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
