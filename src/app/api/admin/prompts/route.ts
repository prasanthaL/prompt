import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, category, fullPrompt, image, isPremium } = await req.json();

    if (!title || !category || !fullPrompt || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = await prisma.prompt.create({
      data: {
        title,
        category,
        fullPrompt,
        image,
        isPremium: Boolean(isPremium),
      },
    });

    return NextResponse.json({ success: true, prompt });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to save prompt" }, { status: 500 });
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
