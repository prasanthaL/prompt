import { NextResponse } from "next/server";
import { getAllPrompts } from "@/lib/json-db";

export const runtime = "nodejs";

/**
 * GET /api/prompts
 *
 * Returns all prompts from src/data/prompts (all JSON files), sorted newest-first.
 * Used by client-side code that needs the full prompt list.
 */
export async function GET() {
  try {
    const all = await getAllPrompts();
    return NextResponse.json(all, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (err) {
    console.error("[prompts] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
