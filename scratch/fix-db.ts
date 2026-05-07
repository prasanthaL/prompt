import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database fix...");
  try {
    // Try to add the slug column manually via raw SQL to bypass any Prisma Client locks
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Prompt" ADD COLUMN IF NOT EXISTS "slug" TEXT;
    `);
    console.log("Column 'slug' verified/added.");

    await prisma.$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Prompt_slug_key" ON "Prompt"("slug");
    `);
    console.log("Unique index on 'slug' verified/added.");

    // Now fill in any missing slugs
    const prompts = await (prisma.prompt as any).findMany();
    for (const prompt of prompts) {
      if (!prompt.slug) {
        const slug = prompt.title
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
        
        await prisma.$executeRawUnsafe(`
          UPDATE "Prompt" SET "slug" = $1 WHERE "id" = $2
        `, slug, prompt.id);
        console.log(`Updated: ${prompt.title} -> ${slug}`);
      }
    }
    console.log("Database fix complete!");
  } catch (err) {
    console.error("Database fix failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
