import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const prompts = await prisma.prompt.findMany() as any[];
  for (const prompt of prompts) {
    if (!prompt.slug) {
      const slug = prompt.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
      
      await (prisma.prompt as any).update({
        where: { id: prompt.id },
        data: { slug },
      });
      console.log(`Updated prompt ${prompt.title} with slug ${slug}`);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
