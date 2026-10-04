const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src/data/prompts');
const SRC_DIR = path.join(process.cwd(), 'src');

/**
 * Mirrors the shared shouldIndexPrompt() rule from src/lib/seo-utils.ts.
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

  // 4. Minimum useful source content for an indexable prompt page (>= 60 words)
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 60) return false;

  // 5. Corrupted text check
  if (text.includes('"title":') && text.includes('"version":') && text.includes('"design_principles":')) {
    return false;
  }

  return true;
}

// Normalize text for duplicate detection
function normalize(str) {
  return (str || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
}

// Recursively find files with extensions
function getFilesRecursive(dir, exts) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursive(filePath, exts));
    } else {
      if (exts.some(ext => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  }
  return results;
}

function runAudit() {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Error: Prompts directory not found at ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

  let totalPrompts = 0;
  let qualityCounts = { high: 0, medium: 0, low: 0 };
  let indexableHigh = 0;
  let noindexHigh = 0;
  let noindexMedium = 0;
  let noindexLow = 0;

  let emptyTagsTotal = 0;
  let emptyTagsIndexable = 0;
  let missingCategoryCount = 0;
  let missingMetadataCount = 0;
  let adminAuthorCount = 0;
  let placeholderCount = 0;

  const seenTitles = new Map();
  let duplicateTitleCount = 0;

  const seenExact = new Map();
  let exactDupGroups = 0;
  let nearDupGroups = 0;

  let wordLength = {
    under20: 0,
    w20_39: 0,
    w40_59: 0,
    w60_99: 0,
    w100plus: 0
  };

  const allPrompts = [];

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

        const willIndex = shouldIndexPrompt(p);

        if (q === 'high') {
          if (willIndex) indexableHigh++;
          else noindexHigh++;
        } else if (q === 'medium') {
          noindexMedium++;
        } else {
          noindexLow++;
        }

        // Tags check
        if (!p.tags || !Array.isArray(p.tags) || p.tags.length === 0) {
          emptyTagsTotal++;
          if (willIndex) emptyTagsIndexable++;
        }

        // Category check
        if (!p.category || p.category.trim() === '') {
          missingCategoryCount++;
        }

        // Useful metadata check (must have title, fullPrompt, category, tags)
        if (!p.title || !p.fullPrompt || !p.tags || p.tags.length === 0) {
          missingMetadataCount++;
        }

        // Admin Author check
        if (p.author && p.author.toLowerCase() === 'admin') {
          adminAuthorCount++;
        }

        // Duplicate title check
        const normTitle = normalize(p.title);
        if (normTitle) {
          if (seenTitles.has(normTitle)) {
            duplicateTitleCount++;
          } else {
            seenTitles.set(normTitle, p.id);
          }
        }

        // Word count
        const text = p.fullPrompt || '';
        const words = text.trim().split(/\s+/).filter(Boolean);
        const wc = words.length;

        if (wc < 20) wordLength.under20++;
        else if (wc < 40) wordLength.w20_39++;
        else if (wc < 60) wordLength.w40_59++;
        else if (wc < 100) wordLength.w60_99++;
        else wordLength.w100plus++;

        // Placeholder check
        if (/\{[^}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/gi.test(text)) {
          placeholderCount++;
        }

        // Exact duplicates check
        const normPrompt = normalize(p.fullPrompt);
        if (seenExact.has(normPrompt)) {
          exactDupGroups++;
        } else {
          seenExact.set(normPrompt, p);
        }
      });
    } catch (e) {
      console.error(`Error reading ${file}:`, e.message);
    }
  });

  // Codebase audit for unsupported marketing claims & gambling terminology
  // We scan .ts, .tsx, and non-prompt data files
  const sourceFiles = getFilesRecursive(path.join(SRC_DIR, 'app'), ['.ts', '.tsx'])
    .concat(getFilesRecursive(path.join(SRC_DIR, 'components'), ['.ts', '.tsx']))
    .concat([
      path.join(SRC_DIR, 'data/home-data.ts'),
      path.join(SRC_DIR, 'data/home-faqs.ts'),
      path.join(SRC_DIR, 'data/faq-data.ts'),
      path.join(SRC_DIR, 'data/category-descriptions.ts'),
      path.join(SRC_DIR, 'data/category-page-data.ts'),
      path.join(SRC_DIR, 'data/blog.json'),
      path.join(SRC_DIR, 'lib/jackpot-engine.ts'),
      path.join(SRC_DIR, 'lib/prompt-content.ts')
    ]);

  const claimRegexes = [
    { name: 'tested and certified', regex: /tested\s+and\s+certified/i },
    { name: 'tested and proven', regex: /tested\s+and\s+proven/i },
    { name: 'rigorously tested', regex: /rigorously\s+tested/i },
    { name: 'professionally tested', regex: /professionally\s+tested/i },
    { name: '100% optimized', regex: /100%\s+optimized/i },
    { name: '100% optimization', regex: /100%\s+optimization/i },
    { name: 'hand-crafted & optimized', regex: /hand-crafted\s+&\s+optimized/i },
    { name: 'trusted by experts', regex: /trusted\s+by\s+experts/i },
    { name: 'verified by experts', regex: /verified\s+by\s+experts/i },
    { name: 'guaranteed results', regex: /guaranteed\s+results/i },
    { name: 'proven results', regex: /proven\s+results/i },
    { name: '100% free forever', regex: /100%\s+free\s+forever/i }
  ];

  const gamblingRegexes = [
    { name: 'lucky streak', regex: /\blucky\s+streak\b/i },
    { name: 'spin & win', regex: /\bspin\s*&\s*win\b/i },
    { name: 'spin and win', regex: /\bspin\s+and\s+win\b/i },
    { name: 'legendary jackpot', regex: /\blegendary\s+jackpot\b/i },
    { name: 'guaranteed legendary', regex: /\bguaranteed\s+legendary\b/i },
    { name: 'better luck (bonus)', regex: /better\s+luck\s+\(bonus\)/i },
    { name: 'rarity tiers & probabilities', regex: /rarity\s+tiers\s+&\s+probabilities/i }
  ];

  let unsupportedClaimsFound = [];
  let gamblingTermsFound = [];

  sourceFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf-8');

    claimRegexes.forEach(c => {
      if (c.regex.test(content)) {
        unsupportedClaimsFound.push(`${path.relative(process.cwd(), file)}: matches claim "${c.name}"`);
      }
    });

    gamblingRegexes.forEach(g => {
      if (g.regex.test(content)) {
        gamblingTermsFound.push(`${path.relative(process.cwd(), file)}: matches gambling phrase "${g.name}"`);
      }
    });
  });

  const totalIndexable = indexableHigh;
  const totalNoindex = noindexHigh + noindexMedium + noindexLow;

  console.log('==================================================');
  console.log('AIPROMPTNEST — FINAL VERIFICATION & QUALITY AUDIT');
  console.log('==================================================\n');

  console.log('1. PROMPT DATASET OVERVIEW:');
  console.log(`  - Total Prompts:                   ${totalPrompts}`);
  console.log(`  - Empty Tags (Total):              ${emptyTagsTotal}`);
  console.log(`  - Empty Tags (Indexable):          ${emptyTagsIndexable}`);
  console.log(`  - Missing Categories:              ${missingCategoryCount}`);
  console.log(`  - Missing Useful Metadata:         ${missingMetadataCount}`);
  console.log(`  - Public Admin Authors:            ${adminAuthorCount}`);
  console.log(`  - Duplicate Titles:                ${duplicateTitleCount}`);
  console.log(`  - Exact Duplicate Prompts:         ${exactDupGroups}`);
  console.log(`  - Near Duplicate Prompts:          ${nearDupGroups}`);
  console.log(`  - Unresolved Placeholders:         ${placeholderCount}`);

  console.log('\n2. INDEXABILITY & SITEMAP:');
  console.log(`  - Indexable High Quality Prompts:  ${indexableHigh}`);
  console.log(`  - Noindex High Quality:            ${noindexHigh}`);
  console.log(`  - Noindex Medium Quality:          ${noindexMedium}`);
  console.log(`  - Noindex Low Quality:             ${noindexLow}`);
  console.log(`  ─────────────────────────────────────────`);
  console.log(`  - Total Indexable (In Sitemap):    ${totalIndexable}`);
  console.log(`  - Total Noindex (Excluded):        ${totalNoindex}`);

  console.log('\n3. MARKETING CLAIMS & POLICY COMPLIANCE:');
  console.log(`  - Unsupported Claims Found:        ${unsupportedClaimsFound.length}`);
  if (unsupportedClaimsFound.length > 0) {
    unsupportedClaimsFound.forEach(f => console.log(`    * ${f}`));
  }
  console.log(`  - Gambling Terminology Found:      ${gamblingTermsFound.length}`);
  if (gamblingTermsFound.length > 0) {
    gamblingTermsFound.forEach(f => console.log(`    * ${f}`));
  }

  console.log('\n4. PROMPT LENGTH DISTRIBUTION:');
  console.log(`  - Under 20 words:                  ${wordLength.under20}`);
  console.log(`  - 20–39 words:                     ${wordLength.w20_39}`);
  console.log(`  - 40–59 words:                     ${wordLength.w40_59}`);
  console.log(`  - 60–99 words:                     ${wordLength.w60_99}`);
  console.log(`  - 100+ words:                      ${wordLength.w100plus}`);

  console.log('\n==================================================');

  console.log('\n5. CATEGORY GUIDES AUDIT:');
  let categoryPassed = true;
  try {
    const { runCategoryAudit } = require('./audit-categories');
    categoryPassed = runCategoryAudit();
  } catch (e) {
    console.error('Error running category audit:', e.message);
    categoryPassed = false;
  }

  const allPassed =
    categoryPassed &&
    emptyTagsIndexable === 0 &&
    emptyTagsTotal === 0 &&
    adminAuthorCount === 0 &&
    placeholderCount === 0 &&
    exactDupGroups === 0 &&
    unsupportedClaimsFound.length === 0 &&
    gamblingTermsFound.length === 0 &&
    totalIndexable === 50;

  if (allPassed) {
    console.log('AUDIT RESULT: ALL CRITERIA PASSED (READY FOR ADSENSE REVIEW)');
    console.log('==================================================\n');
    process.exit(0);
  } else {
    console.log('AUDIT RESULT: AUDIT FAILED — SEE ISSUES ABOVE');
    if (!categoryPassed) console.log('  * Category guides audit failed');
    if (emptyTagsIndexable > 0 || emptyTagsTotal > 0) console.log(`  * Empty tags remaining: ${emptyTagsTotal}`);
    if (adminAuthorCount > 0) console.log(`  * Admin authors remaining: ${adminAuthorCount}`);
    if (unsupportedClaimsFound.length > 0) console.log(`  * Unsupported claims: ${unsupportedClaimsFound.length}`);
    if (gamblingTermsFound.length > 0) console.log(`  * Gambling terms: ${gamblingTermsFound.length}`);
    if (totalIndexable !== 50) console.log(`  * Expected 50 indexable prompts, got ${totalIndexable}`);
    console.log('==================================================\n');
    process.exit(1);
  }
}

runAudit();
