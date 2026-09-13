const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src/data/prompts');

/**
 * Baseline quality checks (high quality, no placeholders, no JSON corruption, min 60 words)
 */
function passesQualityBaseline(p) {
  if (!p || p.quality !== 'high') return false;
  const text = p.fullPrompt || '';
  if (/\{[^{}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/i.test(text)) return false;
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 60) return false;
  if (text.includes('"title":') && text.includes('"version":') && text.includes('"design_principles":')) return false;
  return true;
}

function updateTop50Indexing() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Error: Prompts directory not found at ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  let allPrompts = [];
  const fileDataMap = new Map();

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const prompts = JSON.parse(content);
      if (Array.isArray(prompts)) {
        fileDataMap.set(file, prompts);
        prompts.forEach(p => {
          const text = p.fullPrompt || '';
          const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
          const eligible = passesQualityBaseline(p);
          const score = (p.isFeatured ? 50 : 0) +
                        (p.isTrending ? 30 : 0) +
                        (p.views || 0) * 0.1 +
                        (p.likes || 0) * 0.2 +
                        wordCount;
          allPrompts.push({
            prompt: p,
            file,
            wordCount,
            eligible,
            score
          });
        });
      }
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  });

  const eligiblePrompts = allPrompts.filter(item => item.eligible);
  console.log(`Total prompts evaluated: ${allPrompts.length}`);
  console.log(`Eligible prompts passing quality baseline: ${eligiblePrompts.length}`);

  // Group eligible prompts by category
  const byCat = {};
  eligiblePrompts.forEach(item => {
    const cat = item.prompt.category || 'Uncategorized';
    if (!byCat[cat]) byCat[cat] = [];
    byCat[cat].push(item);
  });

  // Sort each category by score descending
  Object.keys(byCat).forEach(cat => {
    byCat[cat].sort((a, b) => b.score - a.score);
  });

  const selectedIds = new Set();
  const selectedDetails = [];

  // Step 1: Pick top 1 from each category for broad coverage
  Object.keys(byCat).forEach(cat => {
    if (byCat[cat].length > 0) {
      const top = byCat[cat][0];
      selectedIds.add(top.prompt.id);
      selectedDetails.push(top);
    }
  });

  console.log(`Step 1 (Category coverage - 1 top prompt per category): ${selectedIds.size} selected`);

  // Step 2: Fill remaining up to 50 with highest overall score across entire site
  const remaining = eligiblePrompts
    .filter(item => !selectedIds.has(item.prompt.id))
    .sort((a, b) => b.score - a.score);

  for (const item of remaining) {
    if (selectedIds.size >= 50) break;
    selectedIds.add(item.prompt.id);
    selectedDetails.push(item);
  }

  console.log(`Step 2 (Top overall score fill): ${selectedIds.size} total selected prompts`);

  if (selectedIds.size !== 50) {
    console.warn(`Warning: Expected 50 prompts selected, but got ${selectedIds.size}`);
  }

  // Update prompt records across all JSON files
  let updatedTrueCount = 0;
  let updatedFalseCount = 0;

  fileDataMap.forEach((prompts, file) => {
    let fileModified = false;
    prompts.forEach(p => {
      const isTop50 = selectedIds.has(p.id);
      const newSeoIndex = isTop50;

      if (p.seoIndex !== newSeoIndex) {
        p.seoIndex = newSeoIndex;
        fileModified = true;
      }

      if (p.seoIndex) updatedTrueCount++;
      else updatedFalseCount++;
    });

    if (fileModified) {
      const filePath = path.join(DATA_DIR, file);
      fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2) + '\n', 'utf-8');
    }
  });

  console.log('\n==================================================');
  console.log('TOP 50 INDEXING UPDATE COMPLETE');
  console.log('==================================================');
  console.log(`Total Prompts Updated with seoIndex = true:  ${updatedTrueCount}`);
  console.log(`Total Prompts Updated with seoIndex = false: ${updatedFalseCount}`);
  console.log('==================================================\n');

  console.log('Sample of Top 10 Indexed Prompts:');
  selectedDetails.slice(0, 10).forEach((item, idx) => {
    console.log(`  ${idx + 1}. [${item.prompt.category}] "${item.prompt.title}" (${item.wordCount} words, score: ${item.score.toFixed(1)})`);
  });
}

updateTop50Indexing();
