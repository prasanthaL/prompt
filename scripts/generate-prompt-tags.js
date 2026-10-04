const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'src/data/prompts');

const CATEGORY_TAG_MAP = {
  'animals-&-wildlife': ['wildlife', 'nature', 'animals', 'animal-photography'],
  'anime': ['anime', 'manga-style', 'illustration', 'character-design'],
  'architecture': ['architecture', 'building-design', 'architectural-photography'],
  'characters': ['character-design', 'digital-art', 'concept-art'],
  'cinematic': ['cinematic', 'filmic', 'dramatic-composition'],
  'couple': ['couple', 'romantic', 'portrait-photography'],
  'cyberpunk': ['cyberpunk', 'futuristic', 'sci-fi', 'neon-aesthetic'],
  'digital-art': ['digital-art', 'concept-art', 'creative-visuals'],
  'family': ['family', 'candid-moments', 'lifestyle-photography'],
  'fantasy': ['fantasy', 'mythical', 'world-building', 'concept-art'],
  'fashion': ['fashion', 'style', 'editorial', 'model-photography'],
  'food': ['food-photography', 'culinary', 'gastronomy'],
  'horror': ['horror', 'dark-art', 'eerie-atmosphere', 'moody'],
  'interior-design': ['interior-design', 'architecture', 'spatial-design'],
  'logo-design': ['logo-design', 'branding', 'vector-art', 'minimal-graphics'],
  'luxury': ['luxury', 'premium-aesthetic', 'high-end', 'editorial'],
  'mecha': ['mecha', 'sci-fi', 'robotics', 'futuristic-machinery'],
  'men': ['men-portrait', 'portrait', 'lifestyle-photography'],
  'minimalist': ['minimalist', 'clean-design', 'simplicity', 'negative-space'],
  'mythology': ['mythology', 'folklore', 'ancient-lore', 'epic-art'],
  'nature-&-landscape': ['landscape', 'nature', 'scenic', 'outdoor-photography'],
  'portrait': ['portrait', 'portraiture', 'facial-detail'],
  'poster-design': ['poster-design', 'graphic-art', 'layout-design', 'typography'],
  'product': ['product-photography', 'commercial', 'advertising', 'studio-shot'],
  'sci-fi': ['sci-fi', 'futuristic', 'science-fiction', 'space-tech'],
  'space': ['space', 'cosmos', 'astronomy', 'interstellar'],
  'sport': ['sports', 'action-photography', 'fitness', 'athletic'],
  'steampunk': ['steampunk', 'victorian-tech', 'retro-futurism', 'brass-machinery'],
  'surreal': ['surrealism', 'dreamlike', 'abstract-art', 'creative-concept'],
  'travel': ['travel', 'destination', 'tourism', 'scenic-views'],
  'vehicles': ['automotive', 'vehicles', 'car-photography', 'transport-design'],
  'vintage': ['vintage', 'retro', 'nostalgic', 'classic-aesthetic'],
  'wedding': ['wedding', 'bridal', 'romantic', 'celebration'],
  'women': ['women-portrait', 'portrait', 'fashion-portrait']
};

const KEYWORD_RULES = [
  // Lighting
  { terms: ['dramatic lighting', 'dramatic light', 'harsh shadow', 'chiaroscuro'], tag: 'dramatic-lighting' },
  { terms: ['golden hour', 'warm glow', 'sunset light', 'sunrise glow'], tag: 'golden-hour' },
  { terms: ['soft lighting', 'soft light', 'diffused light'], tag: 'soft-lighting' },
  { terms: ['studio light', 'studio lighting', 'softbox', 'ring light'], tag: 'studio-lighting' },
  { terms: ['volumetric', 'god rays', 'light rays', 'sunbeams'], tag: 'volumetric-lighting' },
  { terms: ['neon', 'glowing neon', 'neon lights', 'fluorescent'], tag: 'neon-lighting' },
  { terms: ['rim light', 'rim lighting', 'edge light', 'backlit', 'backlight'], tag: 'rim-lighting' },
  { terms: ['cinematic lighting', 'movie lighting', 'anamorphic'], tag: 'cinematic-lighting' },
  { terms: ['moody light', 'moody lighting', 'dark atmosphere', 'low key'], tag: 'moody-lighting' },
  { terms: ['natural light', 'sunlight', 'daylight', 'window light'], tag: 'natural-lighting' },

  // Camera & Composition
  { terms: ['close-up', 'close up', 'macro', 'extreme close up'], tag: 'close-up' },
  { terms: ['wide shot', 'wide angle', 'panoramic', 'ultra wide'], tag: 'wide-angle' },
  { terms: ['bokeh', 'depth of field', 'shallow depth', 'f/1.8', 'f/1.4', 'f/2.8'], tag: 'depth-of-field' },
  { terms: ['85mm', '50mm', 'telephoto', 'prime lens'], tag: 'telephoto' },
  { terms: ['aerial', 'bird\'s eye', 'drone shot', 'top down'], tag: 'aerial-view' },
  { terms: ['low angle', 'from below', 'heroic angle'], tag: 'low-angle' },
  { terms: ['full body', 'full length', 'head to toe'], tag: 'full-body' },
  { terms: ['symmetry', 'symmetrical', 'centered composition'], tag: 'symmetrical' },

  // Style & Medium
  { terms: ['photorealistic', 'photorealism', 'hyperrealistic', 'ultra-realistic', 'realistic photo'], tag: 'photorealistic' },
  { terms: ['cinematic', 'film grain', '35mm film', 'kodak', 'movie still'], tag: 'cinematic' },
  { terms: ['editorial', 'vogue', 'harper', 'magazine cover', 'fashion shoot'], tag: 'editorial' },
  { terms: ['minimalist', 'minimalism', 'clean aesthetic', 'simple background'], tag: 'minimalist' },
  { terms: ['vintage', 'retro', '1970s', '1980s', '1990s', 'nostalgic', 'analog'], tag: 'vintage' },
  { terms: ['cyberpunk', 'neon city', 'high tech low life'], tag: 'cyberpunk' },
  { terms: ['steampunk', 'clockwork', 'brass gears', 'victorian'], tag: 'steampunk' },
  { terms: ['concept art', 'digital painting', 'matte painting', 'speedpaint'], tag: 'concept-art' },
  { terms: ['illustration', 'hand drawn', 'sketch', 'ink drawing', 'watercolor'], tag: 'illustration' },
  { terms: ['3d render', 'octane render', 'unreal engine', 'blender 3d', 'cgi'], tag: '3d-render' },
  { terms: ['black and white', 'monochrome', 'grayscale'], tag: 'monochrome' },
  { terms: ['surreal', 'surrealism', 'dreamlike', 'psychedelic', 'bizarre'], tag: 'surreal' },

  // Subject details
  { terms: ['streetwear', 'hoodie', 'sneakers', 'urban fashion'], tag: 'streetwear' },
  { terms: ['luxury', 'haute couture', 'opulent', 'expensive', 'gold accents', 'elegance'], tag: 'luxury' },
  { terms: ['urban', 'city street', 'downtown', 'skyscrapers', 'metropolis'], tag: 'urban' },
  { terms: ['outdoor', 'wilderness', 'forest', 'mountain', 'nature trail'], tag: 'outdoors' },
  { terms: ['commercial', 'advertising', 'brand campaign', 'product mockup'], tag: 'commercial' },
  { terms: ['restaurant', 'dining', 'culinary', 'gourmet', 'chef'], tag: 'culinary' },
  { terms: ['interior', 'living room', 'bedroom', 'modern apartment', 'furniture'], tag: 'interior' },
  { terms: ['exterior', 'building facade', 'modern architecture', 'concrete and glass'], tag: 'exterior' },
  { terms: ['romantic', 'intimate', 'holding hands', 'affectionate', 'love'], tag: 'romantic' },
  { terms: ['action', 'dynamic pose', 'running', 'jumping', 'intense motion'], tag: 'action-shot' }
];

function extractTags(prompt, fileBaseName) {
  const combined = ((prompt.title || '') + ' ' + (prompt.fullPrompt || '') + ' ' + (prompt.category || '')).toLowerCase();
  const tags = new Set();

  // 1. Domain base tags from category file
  const baseCategoryTags = CATEGORY_TAG_MAP[fileBaseName] || [];
  if (baseCategoryTags.length > 0) {
    tags.add(baseCategoryTags[0]);
    if (baseCategoryTags[1]) tags.add(baseCategoryTags[1]);
  }

  // 2. Keyword rules matched against actual text
  for (const rule of KEYWORD_RULES) {
    if (rule.terms.some(t => combined.includes(t))) {
      tags.add(rule.tag);
    }
  }

  // 3. Fallback to ensure at least 4 tags and at most 7
  if (tags.size < 4 && baseCategoryTags.length > 2) {
    for (let i = 2; i < baseCategoryTags.length && tags.size < 4; i++) {
      tags.add(baseCategoryTags[i]);
    }
  }

  // If still under 4, add high-level descriptive terms that match
  if (tags.size < 4) {
    if (combined.includes('portrait')) tags.add('portrait');
    if (combined.includes('lighting')) tags.add('lighting');
    if (combined.includes('creative')) tags.add('creative-art');
    if (combined.includes('digital')) tags.add('digital-art');
    if (combined.includes('photo')) tags.add('photography');
  }

  // Convert to array and cap at 7 tags max
  return Array.from(tags).slice(0, 7);
}

function detectAspectRatio(promptText) {
  const match = (promptText || '').match(/--ar\s+([0-9]+:[0-9]+)/i);
  return match ? match[1] : null;
}

function run() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  let totalPrompts = 0;
  let updatedTagsCount = 0;
  let updatedAuthorsCount = 0;

  files.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const fileBaseName = file.replace('.json', '');
    const prompts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    prompts.forEach(p => {
      totalPrompts++;

      // Generate tags
      const newTags = extractTags(p, fileBaseName);
      if (!p.tags || p.tags.length === 0 || p.tags.length < newTags.length) {
        p.tags = newTags;
        updatedTagsCount++;
      }

      // Aspect ratio metadata if present
      const ar = detectAspectRatio(p.fullPrompt);
      if (ar && !p.aspectRatio) {
        p.aspectRatio = ar;
      }

      // Public author neutralization (no Admin)
      if (p.author === 'Admin' || !p.author || p.author.toLowerCase() === 'admin') {
        p.author = 'AIPromptNest Editorial Team';
        updatedAuthorsCount++;
      }
    });

    fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2) + '\n', 'utf8');
  });

  console.log(`Finished processing ${files.length} files.`);
  console.log(`Total prompts checked: ${totalPrompts}`);
  console.log(`Prompts with tags assigned/updated: ${updatedTagsCount}`);
  console.log(`Prompts with author normalized to Editorial Team: ${updatedAuthorsCount}`);
}

run();
