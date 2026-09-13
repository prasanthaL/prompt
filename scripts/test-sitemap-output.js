const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src/data/prompts');

function shouldIndexPrompt(p) {
  if (!p) return false;
  if (p.seoIndex === false) return false;
  if (p.quality !== 'high') return false;
  const text = p.fullPrompt || '';
  const placeholderRegex = /\{[^{}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/i;
  if (placeholderRegex.test(text)) return false;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < 60) return false;
  if (text.includes('"title":') && text.includes('"version":') && text.includes('"design_principles":')) return false;
  return true;
}

function checkSitemapPrompts() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  let indexablePrompts = [];
  let noindexPrompts = [];

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const prompts = JSON.parse(content);
    prompts.forEach(p => {
      if ((p.slug || p.id) && shouldIndexPrompt(p)) {
        indexablePrompts.push(p);
      } else {
        noindexPrompts.push(p);
      }
    });
  });

  console.log(`Prompt pages filtered for sitemap inclusion: ${indexablePrompts.length}`);
  console.log(`Prompt pages excluded from sitemap: ${noindexPrompts.length}`);
}

checkSitemapPrompts();
