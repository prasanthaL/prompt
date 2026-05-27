import { NextResponse } from "next/server";
import { getAllPrompts, savePrompt, Prompt } from "@/lib/json-db";

export async function POST(req: Request) {
  try {
    const { title, category, fullPrompt, image, isPremium, tags, models } = await req.json();

    if (!title || !category || !fullPrompt || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Simple slug generator
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-") + "-" + Math.random().toString(36).substring(2, 7);

    const id = `cm${Math.random().toString(36).substring(2, 11)}`; // Simple CUID-like ID

    const newPrompt: Prompt = {
      id,
      title,
      slug,
      category,
      fullPrompt,
      image,
      isPremium: Boolean(isPremium),
      author: "Admin",
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: Array.isArray(tags) ? tags : [],
      models: Array.isArray(models) ? models : [],
    };

    await savePrompt(newPrompt);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Save Error Detail:", error);
    return NextResponse.json({
      error: "Failed to save prompt",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const prompts = await getAllPrompts();
    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}
