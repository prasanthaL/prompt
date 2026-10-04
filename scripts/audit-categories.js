const fs = require('fs');
const path = require('path');

function getCategoryGuides() {
  const filePath = path.join(process.cwd(), 'src/data/category-descriptions.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  const start = content.indexOf('export const CATEGORY_GUIDES');
  if (start === -1) {
    throw new Error('CATEGORY_GUIDES not found in src/data/category-descriptions.ts');
  }
  const tsCode = content.slice(start);
  const jsCode = tsCode.replace(
    /export const CATEGORY_GUIDES:\s*Record<string,\s*\{[^}]+\}>\s*=/,
    'const CATEGORY_GUIDES ='
  );
  const fn = new Function(jsCode + '; return CATEGORY_GUIDES;');
  return fn();
}

function runCategoryAudit() {
  console.log('==================================================');
  console.log('AIPROMPTNEST — CATEGORY GUIDES AUDIT');
  console.log('==================================================\n');

  const promptsDir = path.join(process.cwd(), 'src/data/prompts');
  const expectedCategories = fs
    .readdirSync(promptsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
    .sort();

  const guides = getCategoryGuides();
  const guideSlugs = Object.keys(guides).sort();

  let hasError = false;
  const issues = [];
  const rows = [];
  const firstSentences = new Map();

  let totalWords = 0;
  let minWords = Infinity;
  let maxWords = 0;

  for (const slug of expectedCategories) {
    const data = guides[slug];
    if (!data || !data.guideText) {
      issues.push(`Missing guideText for category: "${slug}"`);
      hasError = true;
      rows.push({ slug, words: 0, status: 'MISSING' });
      continue;
    }

    const text = data.guideText.trim();
    const words = text.split(/\s+/).filter(Boolean);
    const count = words.length;

    totalWords += count;
    if (count < minWords) minWords = count;
    if (count > maxWords) maxWords = count;

    if (count < 150) {
      issues.push(`Category "${slug}" guideText is under 150 words (${count} words)`);
      hasError = true;
    }

    // Extract first sentence
    const firstSentenceMatch = text.match(/^.*?[.!?](\s|$)/);
    const firstSentence = firstSentenceMatch ? firstSentenceMatch[0].trim() : text;

    if (firstSentences.has(firstSentence)) {
      const prior = firstSentences.get(firstSentence);
      issues.push(`Duplicate first sentence between "${prior}" and "${slug}": "${firstSentence}"`);
      hasError = true;
    } else {
      firstSentences.set(firstSentence, slug);
    }

    rows.push({
      Category: slug,
      Words: count,
      Tips: Array.isArray(data.tips) ? data.tips.length : 0,
      Status: count >= 150 ? 'PASS' : 'FAIL (<150)'
    });
  }

  // Check for any extra categories in guides not in expected
  for (const slug of guideSlugs) {
    if (!expectedCategories.includes(slug)) {
      issues.push(`Guide has extra category not in dataset: "${slug}"`);
    }
  }

  console.table(rows);

  const avgWords = expectedCategories.length > 0 ? Math.round(totalWords / expectedCategories.length) : 0;
  console.log(`\nSummary:`);
  console.log(`  - Total Categories:   ${expectedCategories.length}`);
  console.log(`  - Min Words:          ${minWords === Infinity ? 0 : minWords}`);
  console.log(`  - Max Words:          ${maxWords}`);
  console.log(`  - Avg Words:          ${avgWords}`);
  console.log(`  - Target Threshold:   >= 150 words per category\n`);

  if (hasError || issues.length > 0) {
    console.error('AUDIT RESULT: CATEGORY AUDIT FAILED');
    issues.forEach(err => console.error(`  * ${err}`));
    console.log('==================================================\n');
    return false;
  }

  console.log('AUDIT RESULT: ALL 34 CATEGORY GUIDES PASSED (>= 150 words, unique intros)');
  console.log('==================================================\n');
  return true;
}

if (require.main === module) {
  const success = runCategoryAudit();
  process.exit(success ? 0 : 1);
}

module.exports = { runCategoryAudit, getCategoryGuides };
