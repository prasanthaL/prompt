import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { JackpotPromptData } from "../route";

const JACKPOT_FILE_PATH = path.join(process.cwd(), "src/data/jackpot-prompts.json");

function readJackpotPrompts(): JackpotPromptData[] {
  try {
    if (!fs.existsSync(JACKPOT_FILE_PATH)) return [];
    const content = fs.readFileSync(JACKPOT_FILE_PATH, "utf-8");
    return JSON.parse(content) as JackpotPromptData[];
  } catch (err) {
    console.error("Error reading jackpot prompts file:", err);
    return [];
  }
}

function writeJackpotPrompts(data: JackpotPromptData[]): void {
  fs.writeFileSync(JACKPOT_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const targetId = parseInt(id, 10);
    if (isNaN(targetId)) {
      return NextResponse.json({ error: "Invalid prompt ID" }, { status: 400 });
    }

    const body = await req.json();
    const { title, category, rarity, weight, prompt, tip } = body;

    const currentPrompts = readJackpotPrompts();
    const index = currentPrompts.findIndex((p) => p.id === targetId);

    if (index === -1) {
      return NextResponse.json({ error: "Jackpot prompt not found" }, { status: 404 });
    }

    const updatedItem: JackpotPromptData = {
      ...currentPrompts[index],
      title: title ? title.trim() : currentPrompts[index].title,
      category: category ? category.trim() : currentPrompts[index].category,
      rarity: rarity || currentPrompts[index].rarity,
      weight: weight ? Number(weight) : currentPrompts[index].weight,
      prompt: prompt ? prompt.trim() : currentPrompts[index].prompt,
      tip: tip !== undefined ? (tip ? tip.trim() : undefined) : currentPrompts[index].tip,
    };

    currentPrompts[index] = updatedItem;
    writeJackpotPrompts(currentPrompts);

    return NextResponse.json({ success: true, prompt: updatedItem });
  } catch (error) {
    console.error("Error updating jackpot prompt:", error);
    return NextResponse.json({ error: "Failed to update jackpot prompt" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const targetId = parseInt(id, 10);
    if (isNaN(targetId)) {
      return NextResponse.json({ error: "Invalid prompt ID" }, { status: 400 });
    }

    const currentPrompts = readJackpotPrompts();
    const filteredPrompts = currentPrompts.filter((p) => p.id !== targetId);

    if (filteredPrompts.length === currentPrompts.length) {
      return NextResponse.json({ error: "Jackpot prompt not found" }, { status: 404 });
    }

    writeJackpotPrompts(filteredPrompts);

    return NextResponse.json({ success: true, deletedId: targetId });
  } catch (error) {
    console.error("Error deleting jackpot prompt:", error);
    return NextResponse.json({ error: "Failed to delete jackpot prompt" }, { status: 500 });
  }
}
