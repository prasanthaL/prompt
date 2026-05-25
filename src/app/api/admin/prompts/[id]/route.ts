import { NextResponse } from "next/server";
import { updatePrompt, deletePrompt } from "@/lib/json-db";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedPrompt = await updatePrompt(id, {
      title: body.title,
      category: body.category,
      fullPrompt: body.fullPrompt,
      image: body.image,
      isPremium: Boolean(body.isPremium),
      tags: Array.isArray(body.tags) ? body.tags : [],
      models: Array.isArray(body.models) ? body.models : [],
    });

    if (!updatedPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPrompt);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update prompt" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deletePrompt(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete prompt" }, { status: 500 });
  }
}
