import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Listing IDs in database:");
  try {
    const prompts = await prisma.$queryRaw`SELECT id, title, slug FROM "Prompt"` as any[];
    console.table(prompts);
  } catch (err) {
    console.error("Failed to list IDs:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
