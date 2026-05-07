import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, category, fullPrompt, image, isPremium } = await req.json();

    if (!title || !category || !fullPrompt || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Simple slug generator
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-") + "-" + Math.random().toString(36).substring(2, 7);

    const id = `cm${Math.random().toString(36).substring(2, 11)}`; // Simple CUID-like ID
    
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Prompt" (id, title, slug, category, "fullPrompt", image, "isPremium", "updatedAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      id, title, slug, category, fullPrompt, image, Boolean(isPremium)
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Database Error Detail:", error);
    return NextResponse.json({ 
      error: "Failed to save prompt", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const prompts = await prisma.prompt.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}
