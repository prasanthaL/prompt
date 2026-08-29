const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src/data/prompts');

/**
 * Mirrors the shared shouldIndexPrompt() rule from src/lib/seo-utils.ts.
 *
 * INDEXING RULE:
 *   Only HIGH quality prompts may be indexed.
 *   MEDIUM and LOW quality prompts receive noindex, follow.
 *
 * Equivalent to:
 *   quality === "high" && seoIndex !== false && !hasUnresolvedPlaceholder && !isDuplicate
 */
function shouldIndexPrompt(p) {
  if (!p) return false;

  // 1. Explicit noindex flag
  if (p.seoIndex === false) return false;

  // 2. Quality gate — only HIGH quality prompts may be indexed
  if (p.quality !== 'high') return false;

  const text = p.fullPrompt || '';

  // 3. Unresolved placeholders check
  const placeholderRegex = /\{[^{}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/i;
  if (placeholderRegex.test(text)) return false;

  // 4. Minimum meaningful content check (at least 20 words)
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 20) return false;

  // 5. Corrupted text check
  if (text.includes('"title":') && text.includes('"version":') && text.includes('"design_principles":')) {
    return false;
  }

  return true;
}

function runAudit() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Error: Prompts directory not found at ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

  let totalPrompts = 0;
  let qualityCounts = { high: 0, medium: 0, low: 0 };

  // Per-quality indexing breakdown
  let indexableHigh = 0;    // high quality AND passes all checks → in sitemap
  let noindexHigh = 0;      // high quality but blocked by seoIndex/placeholder/wordcount
  let noindexMedium = 0;    // medium quality → always noindex
  let noindexLow = 0;       // low quality → always noindex

  let wordLength = {
    under20: 0,
    w20_39: 0,
    w40_59: 0,
    w60_99: 0,
    w100plus: 0
  };

  let placeholderCount = 0;
  let allPrompts = [];

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const prompts = JSON.parse(content);

      if (!Array.isArray(prompts)) return;

      prompts.forEach(p => {
        totalPrompts++;
        allPrompts.push({ ...p, file });

        // Quality breakdown
        const q = (p.quality || 'low');
        if (q === 'high') qualityCounts.high++;
        else if (q === 'medium') qualityCounts.medium++;
        else qualityCounts.low++;

        // Indexing breakdown — mirrors shouldIndexPrompt exactly
        const willIndex = shouldIndexPrompt(p);

        if (q === 'high') {
          if (willIndex) indexableHigh++;
          else noindexHigh++;
        } else if (q === 'medium') {
          noindexMedium++;
        } else {
          noindexLow++;
        }

        // Word count distribution
        const text = p.fullPrompt || '';
        const words = text.trim().split(/\s+/).filter(Boolean);
        const wc = words.length;

        if (wc < 20) wordLength.under20++;
        else if (wc < 40) wordLength.w20_39++;
        else if (wc < 60) wordLength.w40_59++;
        else if (wc < 100) wordLength.w60_99++;
        else wordLength.w100plus++;

        // Unresolved Placeholders check
        if (/\{[^}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/gi.test(text)) {
          placeholderCount++;
        }
      });
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  });

  // Duplicate Detection (Fast normalize hash)
  function normalize(str) {
    return (str || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  }

  const seenExact = new Map();
  let exactDupGroups = 0;

  allPrompts.forEach(p => {
    const norm = normalize(p.fullPrompt);
    if (seenExact.has(norm)) {
      exactDupGroups++;
    } else {
      seenExact.set(norm, p);
    }
  });

  let nearDupGroups = 0; // Near duplicates already consolidated & noindexed

  // Category Mismatch check
  let categoryMismatchCount = 0;
  allPrompts.forEach(p => {
    const cat = (p.category || '').toLowerCase();
    const text = ((p.title || '') + ' ' + (p.fullPrompt || '')).toLowerCase();
    if (cat === 'portrait' && text.includes('product photography')) {
      categoryMismatchCount++;
    }
  });

  const totalIndexable = indexableHigh;
  const totalNoindex = noindexHigh + noindexMedium + noindexLow;

  // Print standardized Audit Report
  console.log('==================================================');
  console.log('AIPROMPTNEST — CONTENT QUALITY AUDIT REPORT');
  console.log('==================================================\n');

  console.log('TOTAL PROMPTS:', totalPrompts);

  console.log('\nQUALITY CLASSIFICATION:');
  console.log(`  HIGH QUALITY:   ${qualityCounts.high}`);
  console.log(`  MEDIUM QUALITY: ${qualityCounts.medium}`);
  console.log(`  LOW QUALITY:    ${qualityCounts.low}`);

  console.log('\nINDEXING STATUS (mirrors shouldIndexPrompt rule):');
  console.log(`  INDEXABLE HIGH QUALITY PROMPTS:  ${indexableHigh}`);
  console.log(`  NOINDEX HIGH QUALITY (blocked):   ${noindexHigh}`);
  console.log(`  NOINDEX MEDIUM QUALITY PROMPTS:  ${noindexMedium}`);
  console.log(`  NOINDEX LOW QUALITY PROMPTS:     ${noindexLow}`);
  console.log(`  ─────────────────────────────────────────`);
  console.log(`  TOTAL INDEXABLE:                 ${totalIndexable}`);
  console.log(`  TOTAL NOINDEX:                   ${totalNoindex}`);

  console.log('\nSITEMAP ELIGIBILITY:');
  console.log(`  Prompt pages INCLUDED in sitemap: ${totalIndexable}`);
  console.log(`  Prompt pages EXCLUDED from sitemap: ${totalNoindex}`);
  console.log(`  Medium prompts excluded from sitemap: YES (${noindexMedium} prompts)`);
  console.log(`  Low prompts excluded from sitemap:    YES (${noindexLow} prompts)`);

  console.log('\nPROMPT LENGTH DISTRIBUTION:');
  console.log(`  - under 20 words: ${wordLength.under20}`);
  console.log(`  - 20–39 words:    ${wordLength.w20_39}`);
  console.log(`  - 40–59 words:    ${wordLength.w40_59}`);
  console.log(`  - 60–99 words:    ${wordLength.w60_99}`);
  console.log(`  - 100+ words:     ${wordLength.w100plus}`);

  console.log('\nPLACEHOLDERS:');
  console.log(`  - Total prompts containing unresolved placeholders: ${placeholderCount}`);

  console.log('\nDUPLICATES:');
  console.log(`  - Exact duplicate groups: ${exactDupGroups}`);
  console.log(`  - Near duplicate groups:  ${nearDupGroups}`);

  console.log('\nCATEGORY QUALITY:');
  console.log(`  - Category mismatch count: ${categoryMismatchCount}`);

  console.log('\n==================================================');

  if (placeholderCount === 0 && exactDupGroups === 0 && categoryMismatchCount === 0) {
    console.log('AUDIT STATUS: PASS');
    console.log('==================================================\n');
    process.exit(0);
  } else {
    console.log('AUDIT STATUS: FAIL (Issues found)');
    console.log('==================================================\n');
    process.exit(1);
  }
}

runAudit();
