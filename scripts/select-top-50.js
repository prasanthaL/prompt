const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src/data/prompts');

function shouldIndexCheck(p) {
  if (!p || p.quality !== 'high') return false;
  const text = p.fullPrompt || '';
  if (/\{[^{}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/i.test(text)) return false;
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 60) return false;
  if (text.includes('"title":') && text.includes('"version":') && text.includes('"design_principles":')) return false;
  return true;
}

function selectTop50() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  let allEligible = [];

  files.forEach(file => {
    const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
    const prompts = JSON.parse(content);
    prompts.forEach(p => {
      if (shouldIndexCheck(p)) {
        const text = p.fullPrompt || '';
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        // Ranking score: word count, featured bonus, trending bonus, likes, views
        const score = (p.isFeatured ? 50 : 0) +
                      (p.isTrending ? 30 : 0) +
                      (p.views || 0) * 0.1 +
                      (p.likes || 0) * 0.2 +
                      wordCount;

        allEligible.push({
          id: p.id,
          title: p.title,
          category: p.category,
          wordCount,
          file,
          score
        });
      }
    });
  });

  console.log(`Total eligible prompts passing quality baseline: ${allEligible.length}`);

  // Group by category
  const byCat = {};
  allEligible.forEach(p => {
    if (!byCat[p.category]) byCat[p.category] = [];
    byCat[p.category].push(p);
  });

  // Sort each category by score descending
  Object.keys(byCat).forEach(cat => {
    byCat[cat].sort((a, b) => b.score - a.score);
  });

  const selectedMap = new Map();

  // Step 1: Top 1 from each category (to ensure full category coverage)
  Object.keys(byCat).forEach(cat => {
    if (byCat[cat].length > 0) {
      const top = byCat[cat][0];
      selectedMap.set(top.id, top);
    }
  });

  console.log(`Step 1 (1 top prompt per category): ${selectedMap.size} selected`);

  // Step 2: Fill remaining slots up to 50 using highest overall score
  const remaining = allEligible
    .filter(p => !selectedMap.has(p.id))
    .sort((a, b) => b.score - a.score);

  for (const p of remaining) {
    if (selectedMap.size >= 50) break;
    selectedMap.set(p.id, p);
  }

  console.log(`Step 2 (Top overall score fill): ${selectedMap.size} total selected prompts`);

  const finalList = Array.from(selectedMap.values());
  console.log('\nTop 50 Selected Prompts Overview:');
  finalList.slice(0, 15).forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.category}] "${p.title}" (${p.wordCount} words, score: ${p.score.toFixed(1)})`);
  });
  console.log(`... and ${finalList.length - 15} more.`);

  return finalList;
}

selectTop50();
