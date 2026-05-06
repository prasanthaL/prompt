import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedPrompt = await prisma.prompt.update({
      where: { id },
      data: {
        title: body.title,
        category: body.category,
        fullPrompt: body.fullPrompt,
        image: body.image,
        isPremium: Boolean(body.isPremium),
      },
    });

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
    await prisma.prompt.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete prompt" }, { status: 500 });
  }
}
