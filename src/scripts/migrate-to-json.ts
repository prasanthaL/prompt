import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), "src/data/prompts");

async function migrate() {
  console.log("Starting migration from Neon DB to JSON files...");
  
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  try {
    const prompts = await prisma.prompt.findMany();
    console.log(`Found ${prompts.length} prompts in database.`);

    if (prompts.length === 0) {
      console.log("No prompts to migrate.");
      return;
    }

    const categories = new Set(prompts.map(p => p.category));

    for (const category of categories) {
      const catPrompts = prompts.filter(p => p.category === category);
      const filename = `${category.toLowerCase().replace(/\s+/g, '-')}.json`;
      const filePath = path.join(DATA_DIR, filename);
      
      fs.writeFileSync(filePath, JSON.stringify(catPrompts, null, 2));
      console.log(`Migrated ${catPrompts.length} prompts to ${filename}`);
    }

    console.log("Migration complete! You can now safely remove the database connection.");
  } catch (error) {
    console.error("Migration failed:", error);
    console.log("\nTip: Make sure your DATABASE_URL is still correct in .env for the migration.");
  }
}

migrate()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
