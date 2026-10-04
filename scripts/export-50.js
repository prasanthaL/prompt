const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/data/prompts');

function shouldIndex(p) {
  if (!p || p.seoIndex === false || p.quality !== 'high') return false;
  const text = p.fullPrompt || '';
  if (/\{[^{}]+\}|\[[A-Z0-9_\s/–-]{2,}\]/i.test(text)) return false;
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 60) return false;
  if (text.includes('"title":') && text.includes('"version":') && text.includes('"design_principles":')) return false;
  return true;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
const list = [];
files.forEach(f => {
  const prompts = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
  prompts.forEach(p => {
    if (shouldIndex(p)) {
      list.push({
        file: f,
        id: p.id,
        slug: p.slug || p.id,
        title: p.title,
        category: p.category,
        fullPrompt: p.fullPrompt
      });
    }
  });
});

fs.writeFileSync(path.join(__dirname, 'indexable-50.json'), JSON.stringify(list, null, 2), 'utf-8');
console.log('Saved', list.length, 'prompts to scripts/indexable-50.json');
