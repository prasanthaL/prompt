import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const JACKPOT_FILE_PATH = path.join(process.cwd(), "src/data/jackpot-prompts.json");

export interface JackpotPromptData {
  id: number;
  title: string;
  category: string;
  rarity: "legendary" | "epic" | "rare" | "common";
  weight: number;
  prompt: string;
  tip?: string;
}

function readJackpotPrompts(): JackpotPromptData[] {
  try {
    if (!fs.existsSync(JACKPOT_FILE_PATH)) {
      return [];
    }
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

export async function GET() {
  try {
    const prompts = readJackpotPrompts();
    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jackpot prompts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, rarity, weight, prompt, tip } = body;

    if (!title || !category || !rarity || !prompt) {
      return NextResponse.json(
        { error: "Missing required fields: title, category, rarity, and prompt are required." },
        { status: 400 }
      );
    }

    const currentPrompts = readJackpotPrompts();

    // Determine default weight based on rarity if not specified
    let calculatedWeight = Number(weight);
    if (!calculatedWeight || isNaN(calculatedWeight) || calculatedWeight <= 0) {
      switch (rarity) {
        case "legendary":
          calculatedWeight = 2;
          break;
        case "epic":
          calculatedWeight = 5;
          break;
        case "rare":
          calculatedWeight = 10;
          break;
        default:
          calculatedWeight = 15;
          break;
      }
    }

    // Generate unique numeric ID
    const maxId = currentPrompts.reduce((max, p) => (p.id > max ? p.id : max), 100);
    const newId = maxId + 1;

    const newPrompt: JackpotPromptData = {
      id: newId,
      title: title.trim(),
      category: category.trim(),
      rarity,
      weight: calculatedWeight,
      prompt: prompt.trim(),
      tip: tip ? tip.trim() : undefined,
    };

    // Prepend to list so newest appears at top
    currentPrompts.unshift(newPrompt);
    writeJackpotPrompts(currentPrompts);

    return NextResponse.json({ success: true, prompt: newPrompt });
  } catch (error) {
    console.error("Failed to add jackpot prompt:", error);
    return NextResponse.json(
      { error: "Failed to save jackpot prompt", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
