export const CATEGORY_DESCRIPTIONS: Record<string, {
  name: string;
  description: string;
}> = {
  all: {
    name: "Browse Prompts",
    description: "Discover a growing library of carefully curated AI prompts for Google Gemini and ChatGPT, designed to help you create better results with less effort. Explore prompts across popular categories, creative styles, and use cases, search for specific ideas or keywords, and instantly copy ready-to-use prompts. Whether you're creating AI images, writing content, brainstorming ideas, improving productivity, or exploring new creative possibilities, find practical prompts you can customize and use with Gemini and ChatGPT."
  },
  Cinematic: {
    name: "Cinematic Prompts",
    description: "Movie-like lighting, dramatic compositions, depth of field, and blockbuster visual styles optimized for Gemini and other high-performance image generators."
  },
  Anime: {
    name: "Anime Prompts",
    description: "Japanese animation style illustrations, vibrant characters, stylized backgrounds, fan-favorite aesthetics, and clean digital linework."
  },
  Portrait: {
    name: "Portrait Prompts",
    description: "Professional human portraits, detailed facial features, realistic lighting, and studio-grade photographic styles with realistic focus."
  },
  Fantasy: {
    name: "Fantasy Prompts",
    description: "Dark, mythical, legendary worlds, magic, mythical creatures, and ethereal fantasy concept art styles with rich textures."
  },
  "Sci-Fi": {
    name: "Sci-Fi Prompts",
    description: "Futuristic technology, space travel, neon-drenched cityscapes, cyberpunk aesthetics, and visionary speculative fiction style directions."
  },
  Architecture: {
    name: "Architecture Prompts",
    description: "Visionary architectural designs, modern interior spaces, historical landmarks, and classical or futuristic building structures."
  },
  Product: {
    name: "Product Prompts",
    description: "Commercial product photography setups, mockups, studio lighting, clean background aesthetics, and professional catalog styling."
  },
  Men: {
    name: "Men Prompts",
    description: "Portraits, fashion, and lifestyle photography featuring male subjects, professional lighting, and realistic facial details."
  },
  Women: {
    name: "Women Prompts",
    description: "Portraits, fashion, and lifestyle photography featuring female subjects, professional lighting, and realistic details."
  },
  Family: {
    name: "Family Prompts",
    description: "Heartwarming family scenes, multi-generational portraits, cozy indoor/outdoor settings, and authentic candid moments."
  },
  Couple: {
    name: "Couple Prompts",
    description: "Romantic portraits, lifestyle photography, engagement shoots, and scenic or candid moments highlighting relationships."
  },
  Sport: {
    name: "Sport Prompts",
    description: "High-energy action shots, dynamic athletic movement, sports training, and professional sports photography style presets."
  },
  "Nature & Landscape": {
    name: "Nature & Landscape Prompts",
    description: "Breathtaking scenic views, mountains, oceans, majestic forests, sunrises, sunsets, and cinematic landscape photography compositions."
  },
  "Animals & Wildlife": {
    name: "Animals & Wildlife Prompts",
    description: "Close-up wildlife photography, detailed pet portraits, action shots of animals in natural habitats, and creative wildlife captures."
  },
  Vehicles: {
    name: "Vehicles Prompts",
    description: "Sleek automotive designs, high-speed sports cars, vintage motorcycles, aviation, and conceptual transport designs."
  },
  "Digital Art": {
    name: "Digital Art Prompts",
    description: "Creative digital illustrations, abstract paintings, 3D character concepts, concept art, and high-fidelity graphic designs."
  },
  Fashion: {
    name: "Fashion Prompts",
    description: "High-end runway styling, outfit conceptualization, modern streetwear, and modeling photography style directions."
  },
  Food: {
    name: "Food Prompts",
    description: "Delectable culinary shots, commercial food styling, gourmet presentation, and realistic food art styles."
  },
  Travel: {
    name: "Travel Prompts",
    description: "Scenic tourist destinations, wanderlust adventures, aerial photography, and cultural exploration style directions."
  },
  "Interior Design": {
    name: "Interior Design Prompts",
    description: "Sleek living spaces, modern kitchen layouts, furniture staging, and luxury home decor visualization."
  },
  Cyberpunk: {
    name: "Cyberpunk Prompts",
    description: "Neon-drenched streets, high-tech low-life, cybernetic augmentations, and futuristic night aesthetics."
  },
  Steampunk: {
    name: "Steampunk Prompts",
    description: "Victorian-era science fiction, clockwork machinery, steam-powered airships, and brass or copper designs."
  },
  Mecha: {
    name: "Mecha Prompts",
    description: "Gigantic robotic armor, sci-fi battle suits, mechanical engineering, and tactical combat robot concepts."
  },
  Horror: {
    name: "Horror Prompts",
    description: "Spooky gothic settings, psychological thrillers, dark shadows, monsters, and eerie ambient lighting directions."
  },
  Surreal: {
    name: "Surreal Prompts",
    description: "Dreamlike logic, floating structures, melted physics, visual paradoxes, and subconscious art concepts."
  },
  Minimalist: {
    name: "Minimalist Prompts",
    description: "Clean lines, vast empty spaces, flat design, limited color palettes, and simple beautiful visual forms."
  },
  Luxury: {
    name: "Luxury Prompts",
    description: "Opulent interiors, premium products, designer apparel, high-end lifestyle, and golden accent lighting."
  },
  Wedding: {
    name: "Wedding Prompts",
    description: "Romantic marital events, elegant receptions, bride and groom portraits, floral decor, and joyous moments."
  },
  "Logo Design": {
    name: "Logo Design Prompts",
    description: "Vector style corporate branding, minimalist brand marks, emblems, and visual identity concepts."
  },
  "Poster Design": {
    name: "Poster Design Prompts",
    description: "Graphic movie posters, retro event print layouts, typographic designs, and illustrative visual themes."
  },
  Characters: {
    name: "Characters Prompts",
    description: "Detailed character design sheets, gaming avatars, concept art sketches, and character portraits."
  },
  Mythology: {
    name: "Mythology Prompts",
    description: "Ancient Greek, Norse, and Eastern legends, mythological gods, magical realms, and historical epic scenes."
  },
  Space: {
    name: "Space Prompts",
    description: "Deep cosmic nebula vistas, stellar space exploration, planetary surfaces, astronaut details, and galaxy stars."
  },
  Vintage: {
    name: "Vintage Prompts",
    description: "Retro photo aesthetics, sepia tones, film grain styles, mid-century lifestyle, and nostalgia visual themes."
  }
};

export const CATEGORY_GUIDES: Record<string, { guideText: string; tips: string[] }> = {
  cinematic: {
    guideText: "Cinematic prompts focus on dramatic storytelling through movie-still compositions, anamorphic lens choices, volumetric lighting, and mood-driven color grading.",
    tips: [
      "Specify camera lenses like 35mm, 50mm, or 85mm anamorphic for depth",
      "Include volumetric lighting terms like fog, haze, rim light, and key light",
      "Define distinct color palettes such as teal and orange or moody monochrome",
      "Describe actor poses and emotional expressions natural to cinematic scenes",
      "Mention aspect ratios and focal plane depth of field"
    ]
  },
  anime: {
    guideText: "Anime prompts help generate authentic Japanese animation artwork spanning shonen action, Studio Ghibli landscapes, and sleek cybernetic character designs.",
    tips: [
      "Reference specific animation aesthetic eras like 90s retro or modern Kyoto Animation",
      "Specify linework style such as clean vector outlines or hand-drawn pencil shading",
      "Describe character outfit details, hair accessories, and expressive eyes",
      "Add environmental atmosphere like floating sakura petals or sunbeams",
      "Include key rendering terms like cell shading and vibrant anime color grading"
    ]
  },
  portrait: {
    guideText: "Portrait prompts engineered for studio headshots, fashion editorials, and realistic human character captures with authentic skin textures.",
    tips: [
      "Detail lighting setups like Rembrandt lighting, ring lights, or softbox diffusion",
      "Specify facial expressions, gaze direction, and subtle skin micro-textures",
      "Choose aperture settings like f/1.4 or f/1.8 for pleasing background bokeh",
      "Define wardrobe styling, accessories, and subtle makeup details",
      "Balance key light with subtle fill and background separation lights"
    ]
  },
  product: {
    guideText: "Product photography prompts deliver studio-quality commercial renders, e-commerce mockups, and sleek hero packaging shots.",
    tips: [
      "Define clean background surfaces such as polished marble, dark slate, or acrylic",
      "Specify studio spotlighting, soft reflections, and subtle drop shadows",
      "Describe product material textures like frosted glass, brushed aluminum, or leather",
      "Incorporate lifestyle props complementary to the featured item",
      "Keep framing focused and centered with ample commercial negative space"
    ]
  },
  "logo-design": {
    guideText: "Logo design prompts focus on vector geometry, brandmark minimalism, corporate identity symbols, and sleek emblems.",
    tips: [
      "Use vector design terms like minimalist emblem, flat geometric brandmark, or icon",
      "Limit color palettes to 2-3 harmonious branding colors on solid backdrops",
      "Avoid overly complex busy backgrounds to ensure clean brand readability",
      "Specify shape harmony such as circular symmetry, golden ratio, or sharp angles",
      "Mention negative space techniques for clever dual-meaning symbols"
    ]
  }
};
