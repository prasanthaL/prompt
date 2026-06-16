import {
  Clapperboard,
  Zap,
  Ghost,
  Cpu,
  Home,
  ShoppingBag,
  User,
  Sparkles,
  Users,
  Flame,
  Trees,
  Dog,
  Car,
  Palette,
  PaintBucket,
} from "lucide-react";
import type { ComponentType } from "react";

// ---------------------------------------------------------------------------
// Icon map – maps a category display name to its Lucide icon component
// ---------------------------------------------------------------------------
export const ICON_MAP: Record<string, ComponentType<any>> = {
  Cinematic: Clapperboard,
  Anime: Ghost,
  Portrait: User,
  Fantasy: Zap,
  "Sci-Fi": Cpu,
  Architecture: Home,
  Product: ShoppingBag,
  Men: User,
  Women: User,
  Family: Users,
  Couple: Users,
  Sport: Flame,
  "Nature & Landscape": Trees,
  "Animals & Wildlife": Dog,
  Vehicles: Car,
  "Digital Art": Palette,
  Graffiti: PaintBucket,
};

// ---------------------------------------------------------------------------
// SEO metadata per category
// ---------------------------------------------------------------------------
export const categoryDescriptions: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  anime: {
    title:
      "Anime AI Art Prompts – Generate Stunning Anime Characters & Scenes | AiPromptNest",
    description:
      "Browse AiPromptNest's curated anime AI prompts to generate stunning characters, landscapes, and action scenes. Tested across Midjourney, Stable Diffusion, and DALL·E for gallery-worthy results.",
    keywords: [
      "anime AI prompts",
      "anime art generator",
      "AI anime characters",
      "anime Midjourney prompts",
      "anime Stable Diffusion prompts",
      "anime DALL-E prompts",
      "anime character design",
      "anime wallpaper AI",
      "anime illustration prompts",
      "manga art AI",
      "chibi art prompts",
      "anime background prompts",
      "anime concept art",
      "AI art anime style",
      "AiPromptNest anime",
    ],
  },

  cinematic: {
    title:
      "Cinematic AI Art Prompts – Create Movie-Quality Visuals & Film Stills | AiPromptNest",
    description:
      "Generate Hollywood-grade film stills, dramatic compositions, and cinematic scenes with AiPromptNest's curated prompts. Engineered for Midjourney, Stable Diffusion XL, and DALL·E 3 with anamorphic lighting and color grading built in.",
    keywords: [
      "cinematic AI prompts",
      "movie still AI art",
      "film noir prompts",
      "cinematic Midjourney prompts",
      "Hollywood AI art",
      "cinematic lighting prompts",
      "AI cinematography",
      "cinematic Stable Diffusion",
      "film aesthetic AI",
      "dramatic scene prompts",
      "cinematic wallpaper AI",
      "movie poster AI",
      "anamorphic AI art",
      "cinematic concept art",
      "AiPromptNest cinematic",
    ],
  },

  portrait: {
    title:
      "Portrait AI Art Prompts – Generate Stunning AI Portraits & Headshots | AiPromptNest",
    description:
      "Create photorealistic headshots, editorial beauty shots, and expressive character portraits with AiPromptNest's optimized prompts. Validated across Midjourney, Stable Diffusion XL, Flux, and DALL·E 3.",
    keywords: [
      "portrait AI prompts",
      "AI headshot generator",
      "photorealistic portrait prompts",
      "AI portrait Midjourney",
      "portrait Stable Diffusion prompts",
      "character portrait AI",
      "beauty portrait prompts",
      "studio headshot AI",
      "editorial portrait AI",
      "AI face generator prompts",
      "portrait photography AI",
      "realistic face prompts",
      "portrait concept art",
      "AI avatar prompts",
      "AiPromptNest portrait",
    ],
  },

  fantasy: {
    title:
      "Fantasy AI Art Prompts – Create Epic Magical Worlds & Mythical Creatures | AiPromptNest",
    description:
      "Summon dragons, mythical heroes, and enchanted worlds with AiPromptNest's epic fantasy AI prompts. Perfect for D&D campaigns, book covers, and concept art — tested on Midjourney, DALL·E 3, and Leonardo AI.",
    keywords: [
      "fantasy AI prompts",
      "fantasy art generator",
      "AI fantasy characters",
      "fantasy Midjourney prompts",
      "dragon art AI prompts",
      "magical world AI art",
      "D&D character art AI",
      "fantasy landscape prompts",
      "mythical creature prompts",
      "epic fantasy AI art",
      "dark fantasy prompts",
      "fantasy concept art AI",
      "elven art prompts",
      "fantasy illustration AI",
      "AiPromptNest fantasy",
    ],
  },

  "sci-fi": {
    title:
      "Sci-Fi AI Art Prompts – Generate Futuristic Worlds & Space Art | AiPromptNest",
    description:
      "Explore cyberpunk cities, alien worlds, and deep-space vistas with AiPromptNest's sci-fi AI prompts. Optimized for Midjourney, Stable Diffusion XL, Flux, and Gemini for maximum visual impact.",
    keywords: [
      "sci-fi AI prompts",
      "futuristic art generator",
      "cyberpunk AI prompts",
      "space art AI prompts",
      "sci-fi Midjourney prompts",
      "spaceship concept art AI",
      "futuristic city prompts",
      "AI space art generator",
      "cyberpunk Stable Diffusion",
      "alien world prompts",
      "sci-fi concept art AI",
      "neon city AI art",
      "post-apocalyptic prompts",
      "sci-fi illustration AI",
      "AiPromptNest sci-fi",
    ],
  },

  architecture: {
    title:
      "Architecture AI Art Prompts – Design Stunning Buildings & Interiors | AiPromptNest",
    description:
      "Render photorealistic buildings, interiors, and urban landscapes with AiPromptNest's architecture AI prompts. From Brutalist to parametric design — tested on Midjourney, Stable Diffusion XL, and Leonardo AI.",
    keywords: [
      "architecture AI prompts",
      "building design AI art",
      "interior design prompts",
      "architectural render AI",
      "architecture Midjourney prompts",
      "modern building AI art",
      "interior design AI generator",
      "AI architecture visualization",
      "futuristic building prompts",
      "luxury interior prompts",
      "minimalist architecture AI",
      "parametric design prompts",
      "architectural concept art",
      "real estate render AI",
      "AiPromptNest architecture",
    ],
  },

  product: {
    title:
      "Product Photography AI Prompts – Create Professional Product Shots | AiPromptNest",
    description:
      "Produce studio-quality product shots, lifestyle imagery, and e-commerce hero images with AiPromptNest's product AI prompts. Optimized for Midjourney, Stable Diffusion XL, and Gemini — no studio required.",
    keywords: [
      "product photography AI prompts",
      "e-commerce product shots AI",
      "product render prompts",
      "AI product photography",
      "product Midjourney prompts",
      "commercial photography AI",
      "product lifestyle shots AI",
      "Amazon product image AI",
      "cosmetics photography prompts",
      "tech product render AI",
      "food photography AI prompts",
      "product mockup AI",
      "advertising product shots",
      "product concept art AI",
      "AiPromptNest product",
    ],
  },

  men: {
    title:
      "Men Portrait AI Prompts – Generate Stunning Male Portraits & Fashion Shots | AiPromptNest",
    description:
      "Create powerful, photorealistic male portraits, fashion editorials, and lifestyle shots with AiPromptNest's curated men AI prompts. Tested on Midjourney, Stable Diffusion XL, and DALL·E 3.",
    keywords: [
      "men portrait AI prompts",
      "male model AI art",
      "men fashion photography AI",
      "male headshot AI generator",
      "men lifestyle photography prompts",
      "AI male portrait Midjourney",
      "men Stable Diffusion prompts",
      "professional men portrait AI",
      "men editorial photography AI",
      "masculine portrait prompts",
      "men character design AI",
      "male face AI generator",
      "men fashion editorial AI",
      "men concept art prompts",
      "AiPromptNest men",
    ],
  },

  women: {
    title:
      "Women Portrait AI Prompts – Create Stunning Female Portraits & Fashion Art | AiPromptNest",
    description:
      "Generate breathtaking female portraits, beauty editorials, and lifestyle imagery with AiPromptNest's women AI prompts. Optimized for Midjourney, Stable Diffusion XL, Flux, and DALL·E 3.",
    keywords: [
      "women portrait AI prompts",
      "female model AI art",
      "women fashion photography AI",
      "female headshot AI generator",
      "women beauty photography prompts",
      "AI female portrait Midjourney",
      "women Stable Diffusion prompts",
      "women editorial photography AI",
      "beauty portrait AI prompts",
      "women lifestyle photography AI",
      "female character design AI",
      "women face AI generator",
      "women fashion editorial AI",
      "women concept art prompts",
      "AiPromptNest women",
    ],
  },

  family: {
    title:
      "Family Portrait AI Prompts – Create Heartwarming Family Photos & Group Shots | AiPromptNest",
    description:
      "Generate warm, authentic family portraits, group lifestyle shots, and candid moments with AiPromptNest's family AI prompts. Tested on Midjourney, DALL·E 3, and Stable Diffusion XL.",
    keywords: [
      "family portrait AI prompts",
      "family photo AI generator",
      "group portrait AI art",
      "family lifestyle photography AI",
      "family Midjourney prompts",
      "candid family moment AI",
      "family photoshoot AI",
      "parents and children AI portrait",
      "family outdoor photography AI",
      "family holiday photo AI",
      "generational family portrait AI",
      "family photography prompts",
      "family concept art AI",
      "home family scene AI",
      "AiPromptNest family",
    ],
  },

  couple: {
    title:
      "Couple Portrait AI Prompts – Generate Romantic & Engagement Photography | AiPromptNest",
    description:
      "Create romantic couple portraits, engagement shoots, and scenic pair photography with AiPromptNest's couple AI prompts. Perfect for wedding inspiration — tested on Midjourney, DALL·E 3, and Flux.",
    keywords: [
      "couple portrait AI prompts",
      "romantic AI art prompts",
      "engagement photography AI",
      "couple Midjourney prompts",
      "wedding photography AI prompts",
      "couple lifestyle photography AI",
      "romantic scene AI art",
      "couple photoshoot prompts",
      "anniversary portrait AI",
      "couple outdoor photography AI",
      "love portrait AI generator",
      "couple concept art AI",
      "intimate portrait prompts",
      "couple fashion photography AI",
      "AiPromptNest couple",
    ],
  },

  sport: {
    title:
      "Sport AI Art Prompts – Generate Dynamic Action Shots & Athletic Photography | AiPromptNest",
    description:
      "Capture high-energy action shots, athletic performance, and dynamic sports photography with AiPromptNest's sport AI prompts. Optimized for Midjourney, Stable Diffusion XL, and DALL·E 3.",
    keywords: [
      "sport AI art prompts",
      "action shot AI generator",
      "athletic photography AI prompts",
      "sport Midjourney prompts",
      "sports Stable Diffusion prompts",
      "dynamic action AI art",
      "athlete portrait AI",
      "sport concept art AI",
      "football AI photography",
      "basketball AI art prompts",
      "running athlete AI image",
      "sport extreme action AI",
      "sports editorial photography AI",
      "athletic training AI art",
      "AiPromptNest sport",
    ],
  },

  "nature-&-landscape": {
    title:
      "Nature & Landscape AI Art Prompts – Generate Breathtaking Outdoor Scenery | AiPromptNest",
    description:
      "Explore mountains, oceans, forests, and natural wonders with AiPromptNest's nature & landscape AI prompts. Tested on Midjourney, Stable Diffusion XL, and DALL·E 3 for stunning environmental art.",
    keywords: [
      "nature landscape AI prompts",
      "landscape AI art generator",
      "mountain scenery AI prompts",
      "nature Midjourney prompts",
      "forest landscape AI art",
      "ocean sunset AI prompts",
      "nature photography AI",
      "scenic landscape Stable Diffusion",
      "wildlife habitat AI art",
      "desert landscape AI prompts",
      "waterfall scenery AI",
      "aerial landscape AI art",
      "nature concept art AI",
      "environmental art AI prompts",
      "AiPromptNest nature landscape",
    ],
  },

  "animals-&-wildlife": {
    title:
      "Animals & Wildlife AI Art Prompts – Generate Stunning Wildlife Photography | AiPromptNest",
    description:
      "Create majestic wildlife portraits, animal photography, and pet imagery with AiPromptNest's animals & wildlife AI prompts. Tested on Midjourney, Stable Diffusion XL, and DALL·E 3.",
    keywords: [
      "wildlife AI art prompts",
      "animal photography AI generator",
      "wildlife Midjourney prompts",
      "animal portrait AI art",
      "wildlife Stable Diffusion prompts",
      "lion portrait AI prompts",
      "bird photography AI art",
      "underwater wildlife AI prompts",
      "pet photography AI",
      "exotic animal AI art",
      "wolf portrait AI prompts",
      "animal concept art AI",
      "jungle animal AI photography",
      "macro insect AI art prompts",
      "AiPromptNest animals wildlife",
    ],
  },

  vehicles: {
    title:
      "Vehicles AI Art Prompts – Generate Stunning Car & Transportation Concept Art | AiPromptNest",
    description:
      "Design sleek sports cars, motorcycles, aircraft, and futuristic transportation concepts with AiPromptNest's vehicles AI prompts. Tested on Midjourney, Stable Diffusion XL, and DALL·E 3.",
    keywords: [
      "vehicles AI art prompts",
      "car concept art AI",
      "automotive AI photography",
      "vehicle Midjourney prompts",
      "sports car AI art",
      "motorcycle AI prompts",
      "futuristic vehicle concept AI",
      "aircraft AI art prompts",
      "supercar studio shot AI",
      "vehicles Stable Diffusion prompts",
      "car design concept AI",
      "luxury car AI photography",
      "motorcycle editorial AI",
      "transportation concept art AI",
      "AiPromptNest vehicles",
    ],
  },

  "digital-art": {
    title:
      "Digital Art AI Prompts – Generate Creative Illustrations & Abstract Designs | AiPromptNest",
    description:
      "Explore creative digital paintings, abstract illustrations, 3D concepts, and graphic designs with AiPromptNest's digital art AI prompts. Tested on Midjourney, Stable Diffusion XL, and Adobe Firefly.",
    keywords: [
      "digital art AI prompts",
      "abstract illustration AI generator",
      "digital painting AI prompts",
      "digital art Midjourney prompts",
      "abstract AI art",
      "3D digital concept art AI",
      "graphic design AI prompts",
      "digital illustration Stable Diffusion",
      "concept art AI generator",
      "surreal digital art AI",
      "generative art prompts",
      "glitch art AI prompts",
      "vaporwave AI art",
      "digital art concept prompts",
      "AiPromptNest digital art",
    ],
  },
};

// ---------------------------------------------------------------------------
// Visual / UI metadata per category (hero card, accent colours, stats)
// ---------------------------------------------------------------------------
export const categoryMetaLookup: Record<
  string,
  {
    icon: ComponentType<any>;
    accent: string;
    color: string;
    image: string;
    statCount: string;
    copies: string;
  }
> = {
  anime: {
    icon: Ghost,
    accent: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    color: "from-pink-500/30 to-rose-500/30",
    image: "/images/categories/anime.png",
    statCount: "1,870",
    copies: "52K+",
  },
  cinematic: {
    icon: Clapperboard,
    accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    color: "from-blue-500/30 to-indigo-500/30",
    image: "/images/categories/cinematic.png",
    statCount: "2,450",
    copies: "64K+",
  },
  portrait: {
    icon: User,
    accent: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    color: "from-orange-500/30 to-amber-500/30",
    image: "/images/categories/portrait.png",
    statCount: "1,520",
    copies: "41K+",
  },
  fantasy: {
    icon: Zap,
    accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    color: "from-purple-500/30 to-violet-500/30",
    image: "/images/categories/fantasy.png",
    statCount: "2,450",
    copies: "78K+",
  },
  "sci-fi": {
    icon: Cpu,
    accent: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    color: "from-cyan-500/30 to-blue-500/30",
    image: "/images/categories/scifi.png",
    statCount: "1,280",
    copies: "35K+",
  },
  architecture: {
    icon: Home,
    accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    color: "from-emerald-500/30 to-teal-500/30",
    image: "/images/categories/architecture.png",
    statCount: "980",
    copies: "22K+",
  },
  product: {
    icon: ShoppingBag,
    accent: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    color: "from-yellow-500/30 to-orange-500/30",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    statCount: "840",
    copies: "18K+",
  },
  men: {
    icon: User,
    accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    color: "from-blue-500/30 to-indigo-500/30",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80",
    statCount: "720",
    copies: "16K+",
  },
  women: {
    icon: User,
    accent: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    color: "from-rose-500/30 to-pink-500/30",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    statCount: "890",
    copies: "24K+",
  },
  family: {
    icon: Users,
    accent: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    color: "from-teal-500/30 to-emerald-500/30",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80",
    statCount: "540",
    copies: "12K+",
  },
  couple: {
    icon: Users,
    accent: "text-red-500 bg-red-500/10 border-red-500/20",
    color: "from-red-500/30 to-rose-500/30",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    statCount: "610",
    copies: "14K+",
  },
  sport: {
    icon: Flame,
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    color: "from-amber-500/30 to-yellow-500/30",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    statCount: "760",
    copies: "19K+",
  },
  "nature-&-landscape": {
    icon: Trees,
    accent: "text-green-500 bg-green-500/10 border-green-500/20",
    color: "from-green-500/30 to-emerald-500/30",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
    statCount: "1,140",
    copies: "31K+",
  },
  "animals-&-wildlife": {
    icon: Dog,
    accent: "text-lime-500 bg-lime-500/10 border-lime-500/20",
    color: "from-lime-500/30 to-green-500/30",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80",
    statCount: "920",
    copies: "25K+",
  },
  vehicles: {
    icon: Car,
    accent: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    color: "from-slate-500/30 to-zinc-500/30",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    statCount: "680",
    copies: "15K+",
  },
  "digital-art": {
    icon: Palette,
    accent: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20",
    color: "from-fuchsia-500/30 to-purple-500/30",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
    statCount: "1,050",
    copies: "28K+",
  },
};

// ---------------------------------------------------------------------------
// FAQ entries per category
// ---------------------------------------------------------------------------
export const categoryFaqData: Record<
  string,
  { question: string; answer: string }[]
> = {
  anime: [
    {
      question: "What are anime AI prompts?",
      answer:
        "Anime AI prompts are descriptive text instructions used to guide AI art models like Midjourney, Stable Diffusion, or Gemini in generating stunning anime-inspired characters, immersive fantasy backgrounds, and dynamic action scenes.",
    },
    {
      question: "Which AI models are best for generating anime art?",
      answer:
        "Midjourney (especially with the --niji model) and Stable Diffusion (using anime-focused checkpoints like Anything, Counterfeit, or AbyssOrange) deliver outstanding anime outputs. Google Gemini also yields crisp, creative anime illustrations.",
    },
    {
      question: "How can I customize these anime prompts?",
      answer:
        "You can easily modify descriptive parameters such as character hairstyles, clothing details, emotional expressions, backdrop settings, lighting (e.g., 'bioluminescent glow', 'golden hour'), and camera angles to craft a unique visual.",
    },
  ],
  cinematic: [
    {
      question: "What makes an AI prompt 'cinematic'?",
      answer:
        "Cinematic prompts utilize professional photography and filmmaking terms—such as 'anamorphic lens flare', 'shallow depth of field', 'chiaroscuro lighting', and aspect ratios like 21:9—to evoke the look and feel of high-budget film stills.",
    },
    {
      question: "Which AI models produce the best movie-quality visuals?",
      answer:
        "Midjourney v6 and Stable Diffusion XL (SDXL) are widely regarded as the best tools for cinematic realism. They capture complex film grains, atmospheric fog, and precise color grading exceptionally well.",
    },
    {
      question:
        "Can I use cinematic AI art for storyboards and pre-visualization?",
      answer:
        "Absolutely. Many directors, game design leads, and writers use our cinematic prompts to generate quick, expressive storyboards, concept pitches, and character mockups before production begins.",
    },
  ],
  portrait: [
    {
      question: "What are portrait AI prompts?",
      answer:
        "Portrait AI prompts are carefully formatted instructions designed to generate highly realistic, expressive human faces, corporate headshots, fashion editorials, and character studies with pristine anatomical features.",
    },
    {
      question: "How do I get photorealistic skin texture and eye detail?",
      answer:
        "Our prompts contain specific camera styles (e.g., '85mm lens', 'f/1.8 aperture') and lighting formats (e.g., 'Rembrandt lighting') that naturally direct the AI model to generate high-resolution skin, hair, and eye reflections.",
    },
    {
      question: "How do I avoid anatomical distortions in portraits?",
      answer:
        "By using optimized keywords in your prompts and configuring precise negative prompts (like 'double head', 'mutated hands', 'blurry details') when working with Stable Diffusion models.",
    },
  ],
  fantasy: [
    {
      question: "What makes a fantasy AI prompt successful?",
      answer:
        "A great fantasy prompt blends magical, legendary elements (castles, mythical beasts, elven architecture) with rich descriptions of atmosphere, color palettes (e.g., 'mystical violet', 'deep emerald'), and high-detail textures.",
    },
    {
      question: "Can I generate characters for tabletop RPG games?",
      answer:
        "Yes, these prompts are excellent for creating detailed avatars, custom NPC tokens, magical items, and scenic backdrops for campaigns like Dungeons & Dragons, Pathfinder, or custom fantasy worlds.",
    },
    {
      question: "Which generators work best for magical particle effects?",
      answer:
        "Midjourney and Leonardo AI excel at generating vibrant, complex particle animations, bioluminescent landscapes, and magical glows with realistic reflection and lighting.",
    },
  ],
  "sci-fi": [
    {
      question: "How do I write effective sci-fi and cyberpunk prompts?",
      answer:
        "Effective sci-fi prompts specify high-tech materials (e.g., 'carbon fiber', 'brushed steel'), atmospheric environments (e.g., 'neon-drenched Tokyo streets', 'holographic projections'), and futuristic aesthetics (e.g., retro-futurism, solarpunk).",
    },
    {
      question: "Which models are recommended for spaceships and vehicles?",
      answer:
        "Midjourney excels at high-concept spacecraft designs, while DALL-E 3 and Gemini are highly accurate when rendering complex structural hulls, geometric shapes, and clean panel structures.",
    },
    {
      question: "Can I generate solarpunk or utopian future designs?",
      answer:
        "Yes, by incorporating green-energy aesthetics, biophilic integration, clean white materials, flowing waterfalls, and bright natural sunlight into the prompt description.",
    },
  ],
  architecture: [
    {
      question: "What are architecture AI prompts?",
      answer:
        "Architecture AI prompts are text instructions that define building forms, structural materials (concrete, raw timber, double-glazed glass), interior designs, and architectural movements (Bauhaus, brutalism, parametric).",
    },
    {
      question: "How can architects and interior designers use these prompts?",
      answer:
        "They are highly effective for rapid concept iteration, exploring different spatial distributions, testing material finishes under various light conditions, and building inspiring presentation boards.",
    },
    {
      question: "Which AI tools are best for interior lighting rendering?",
      answer:
        "Midjourney and Stable Diffusion produce stunning interior daylight rendering, capturing ray-traced reflections, shadows, and subtle textural behaviors across wood, concrete, and metal surfaces.",
    },
  ],
  product: [
    {
      question: "How do I create professional product shots using AI?",
      answer:
        "Use photographic techniques like 'macro lens', 'three-point studio lighting', 'soft box shadows', and placement specifications (e.g., 'placed on a polished stone plinth surrounded by botanicals').",
    },
    {
      question: "Are these prompts suitable for real e-commerce stores?",
      answer:
        "Yes, many brands use AI-generated lifestyle backdrops and staging for their product catalog, generating highly clean, studio-quality product photos that significantly reduce cost.",
    },
    {
      question: "Which generators capture glass and metal reflections best?",
      answer:
        "Midjourney v6 and Stable Diffusion XL excel at rendering physical properties like frosted glass, metallic chrome, and fluid textures, making them perfect for cosmetics and tech product listings.",
    },
  ],
  men: [
    {
      question: "What are men portrait AI prompts?",
      answer:
        "Men portrait AI prompts are carefully crafted text instructions designed to generate powerful, photorealistic male portraits, fashion editorials, athletic shots, and lifestyle imagery using AI models like Midjourney, Stable Diffusion, or DALL·E 3.",
    },
    {
      question: "How do I achieve a professional look in male portrait AI art?",
      answer:
        "Use specific lighting setups (e.g., 'dramatic Rembrandt lighting', 'studio three-point lighting'), camera specs (e.g., '85mm lens', 'f/1.4 aperture'), and descriptors like 'sharp jawline', 'confident expression', and 'editorial styling'.",
    },
    {
      question: "Which AI models work best for realistic male portraits?",
      answer:
        "Midjourney v6 and Stable Diffusion XL produce highly realistic skin textures and masculine features. Flux and DALL·E 3 are also excellent choices for editorial-style male photography.",
    },
  ],
  women: [
    {
      question: "What types of women portraits can I generate with AI?",
      answer:
        "You can generate a wide range from professional headshots and beauty editorials to fashion campaigns, fantasy characters, and lifestyle imagery. Our prompts are crafted to produce stunning, high-resolution female portraits.",
    },
    {
      question: "How do I get natural, flattering skin tones in AI-generated women portraits?",
      answer:
        "Incorporate specific lighting descriptors (e.g., 'golden hour glow', 'soft diffused light') and camera terms (e.g., 'f/2.0 aperture', 'portrait lens') that guide the model to produce natural skin tones and soft highlights.",
    },
    {
      question: "Can I use these prompts for fashion and beauty brand content?",
      answer:
        "Absolutely. Many fashion brands and beauty companies use AI-generated imagery for mood boards, social media content, and advertising concepts. Our prompts are optimized for editorial and commercial quality output.",
    },
  ],
  family: [
    {
      question: "What are family portrait AI prompts?",
      answer:
        "Family portrait AI prompts are text instructions that guide AI models to generate warm, authentic group portraits, candid family moments, and lifestyle scenes capturing the bonds of family life.",
    },
    {
      question: "How do I make family AI portraits look natural and not staged?",
      answer:
        "Use candid-style descriptors like 'candid moment', 'natural lighting', 'outdoor setting', and 'genuine laughter'. Avoid overly formal posing keywords and instead focus on environmental storytelling.",
    },
    {
      question: "Which AI generators are best for diverse family compositions?",
      answer:
        "DALL·E 3 and Midjourney handle diverse family groupings, ages, and ethnicities well. Stable Diffusion with appropriate fine-tuned models also produces natural group shots.",
    },
  ],
  couple: [
    {
      question: "What makes a great couple portrait AI prompt?",
      answer:
        "A great couple prompt blends romantic atmosphere (e.g., 'golden hour light', 'soft bokeh background') with emotional descriptors (e.g., 'tender gaze', 'intimate moment') and a scenic setting to create a compelling and heartfelt image.",
    },
    {
      question: "Can I use these prompts for wedding photography inspiration?",
      answer:
        "Yes, many wedding photographers use AI-generated couple images for pre-shoot inspiration, mood board creation, and client presentations to align on the desired aesthetic and lighting style.",
    },
    {
      question: "Which AI models capture romantic lighting best?",
      answer:
        "Midjourney excels at atmospheric romantic scenes with soft, dreamy lighting. DALL·E 3 is great for environmental storytelling, while Stable Diffusion allows more granular control over lighting and composition.",
    },
  ],
  sport: [
    {
      question: "What are sport AI art prompts?",
      answer:
        "Sport AI art prompts are action-focused text instructions that guide AI models to generate high-energy athletic photos, dynamic movement shots, and intense sports scenes with motion blur and dramatic lighting.",
    },
    {
      question: "How do I capture motion and speed in AI sport images?",
      answer:
        "Use terms like 'motion blur', 'high-speed shutter', 'explosive movement', 'dynamic composition', and 'low angle action shot' to create a powerful sense of speed and athletic energy.",
    },
    {
      question: "Which AI models are best for sports action photography?",
      answer:
        "Midjourney and Stable Diffusion XL produce excellent high-energy action shots. Adding descriptors like 'sports photography', '1/2000s shutter speed', and 'bokeh background' helps achieve a realistic athletic photo look.",
    },
  ],
  "nature-&-landscape": [
    {
      question: "What are nature & landscape AI art prompts?",
      answer:
        "Nature & landscape AI art prompts are descriptive instructions that guide AI models to generate breathtaking outdoor environments — from mountain peaks and ocean vistas to forest glades and desert dunes.",
    },
    {
      question: "How do I achieve photorealistic outdoor lighting in landscape AI art?",
      answer:
        "Use time-of-day descriptors (e.g., 'golden hour', 'blue hour dusk', 'misty morning') and atmospheric keywords (e.g., 'volumetric rays', 'soft fog', 'dramatic cloud formations') to create immersive natural lighting.",
    },
    {
      question: "Which AI models produce the most stunning landscape art?",
      answer:
        "Midjourney v6 consistently generates awe-inspiring landscapes. Stable Diffusion XL with landscape-tuned models and DALL·E 3 are also excellent for wide, panoramic nature scenes.",
    },
  ],
  "animals-&-wildlife": [
    {
      question: "What are animals & wildlife AI art prompts?",
      answer:
        "Animals & wildlife AI art prompts are detailed text instructions used to generate stunning wildlife photography, majestic animal portraits, and habitat scenes using AI models like Midjourney, Stable Diffusion, and DALL·E 3.",
    },
    {
      question: "How do I capture realistic fur and feather textures in animal AI art?",
      answer:
        "Use highly specific material descriptors like 'ultra-detailed fur texture', 'individual feather detail', 'wet coat sheen', and photographic terms like 'macro lens', '400mm telephoto', and 'natural lighting'.",
    },
    {
      question: "Can I generate endangered species or exotic animals accurately?",
      answer:
        "Yes, AI models like Midjourney and DALL·E 3 have extensive training data on diverse wildlife. Being specific with species names (e.g., 'Siberian tiger', 'blue morpho butterfly') yields far more accurate and detailed results.",
    },
  ],
  vehicles: [
    {
      question: "What are vehicles AI art prompts?",
      answer:
        "Vehicles AI art prompts are text instructions crafted to generate sleek automotive concept art, sports car renders, motorcycle photography, aircraft designs, and futuristic transportation concepts.",
    },
    {
      question: "How do I achieve realistic paint and chrome finishes in vehicle AI art?",
      answer:
        "Use material-specific terms like 'deep gloss lacquer', 'metallic chrome finish', 'matte carbon fiber panel', 'studio lighting reflections', and 'octane render quality' to produce convincing vehicle surface details.",
    },
    {
      question: "Which AI models are best for automotive concept art?",
      answer:
        "Midjourney and DALL·E 3 excel at sleek automotive designs with accurate proportions. Stable Diffusion with car-focused LoRA models can produce highly detailed and customizable vehicle renders.",
    },
  ],
  "digital-art": [
    {
      question: "What are digital art AI prompts?",
      answer:
        "Digital art AI prompts are creative text instructions that guide AI models to produce abstract illustrations, digital paintings, 3D concept designs, generative art patterns, and mixed-media graphic compositions.",
    },
    {
      question: "How do I create truly unique abstract digital art with AI?",
      answer:
        "Combine art movement keywords (e.g., 'vaporwave', 'glitch art', 'surrealism') with specific techniques (e.g., 'layered transparency', 'fractured geometry', 'neon color palette') and texture descriptors to push beyond generic results.",
    },
    {
      question: "Which AI tools are best for generative and abstract digital art?",
      answer:
        "Midjourney and Adobe Firefly are excellent for abstract generative art. Stable Diffusion with custom models enables deep stylistic experimentation, while DALL·E 3 handles conceptual and surreal digital compositions very well.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Prompt-writing tips per category
// ---------------------------------------------------------------------------
export const categoryTipsLookup: Record<string, string[]> = {
  anime: [
    "Be specific with character details",
    "Add lighting, mood, and environment",
    "Use art style keywords (e.g., anime, ghibli)",
    "Include camera angle and composition",
    "Experiment and refine your prompts",
  ],
  cinematic: [
    "Specify film stock (e.g., 35mm, Kodak Portra)",
    "Incorporate cinematic lighting (e.g., chiaroscuro)",
    "Use direct aspect ratios (e.g., --ar 21:9)",
    "Add camera details (e.g., anamorphic, shallow depth of field)",
    "Describe the emotional grading and color tone",
  ],
  portrait: [
    "Detail face symmetry, gaze direction, and expression",
    "Reference lighting setups (e.g., studio lighting, Rembrandt)",
    "Define specific camera setups (e.g., 85mm lens, f/1.8)",
    "Control skin, hair, and eye texture keywords",
    "Add descriptive clothing and accessories",
  ],
  fantasy: [
    "Describe mythical creatures and high-fantasy gear",
    "Specify bioluminescent or magical lighting colors",
    "Incorporate art styles (e.g., digital concept art, matte painting)",
    "Detail background vistas (e.g., floating castle, magical woods)",
    "Experiment with atmospheric fog and spell particles",
  ],
  "sci-fi": [
    "Describe high-tech materials (e.g., carbon fiber, neon grids)",
    "Specify futuristic tech (e.g., holograms, modular hulls)",
    "Reference distinct sub-genres (e.g., cyberpunk, solarpunk)",
    "Define celestial backdrops (e.g., gas giants, nebula clusters)",
    "Incorporate camera scale (e.g., wide dynamic shot)",
  ],
  architecture: [
    "Define architectural movements (e.g., Brutalist, Bauhaus)",
    "Detail raw structural materials (e.g., raw concrete, oak wood)",
    "Incorporate interior light angles and glass reflection",
    "Use realistic render terms (e.g., architectural photography)",
    "Specify exact spatial setups (e.g., open-concept layout)",
  ],
  product: [
    "Reference studio lighting (e.g., three-point lighting, softbox)",
    "Control background placement (e.g., white background, minimalist plinth)",
    "Describe exact material textures (e.g., frosted glass, metal chrome)",
    "Use photography settings (e.g., macro lens, close-up)",
    "Add styling props (e.g., natural water droplets, organic leaves)",
  ],
  men: [
    "Define specific age range, facial features, and expression",
    "Use lighting setups (e.g., Rembrandt, dramatic side lighting)",
    "Specify camera and lens details (e.g., 85mm, f/1.4)",
    "Add clothing style and grooming details",
    "Include environment and background context",
  ],
  women: [
    "Describe hair style, color, and texture precisely",
    "Specify makeup style and beauty descriptors",
    "Use flattering lighting setups (e.g., golden hour, soft box)",
    "Include fashion and wardrobe details",
    "Add emotional tone and expression keywords",
  ],
  family: [
    "Describe the group composition (ages, relationships)",
    "Use candid, lifestyle-style descriptors for natural poses",
    "Specify the environment (e.g., park, beach, living room)",
    "Include lighting and time-of-day for mood",
    "Add emotional descriptors (e.g., laughter, warmth, togetherness)",
  ],
  couple: [
    "Describe the setting and romantic atmosphere",
    "Use emotional and relational descriptors (e.g., tender, intimate)",
    "Specify lighting (e.g., golden hour, candlelight, soft bokeh)",
    "Include fashion styling and color coordination",
    "Incorporate environmental storytelling elements",
  ],
  sport: [
    "Use action and motion descriptors (e.g., motion blur, explosive jump)",
    "Specify sport type and athlete body language",
    "Add camera terms (e.g., low angle, high shutter speed)",
    "Include environment and stadium/venue context",
    "Use dramatic lighting for intensity (e.g., stadium floodlights)",
  ],
  "nature-&-landscape": [
    "Specify time of day and atmospheric conditions",
    "Describe the geographic setting and terrain type",
    "Use weather and light descriptors (e.g., golden hour, misty)",
    "Include foreground, midground, and background elements",
    "Add volumetric lighting and atmospheric effects",
  ],
  "animals-&-wildlife": [
    "Be specific with the species name for accuracy",
    "Describe the animal's pose, behavior, and expression",
    "Use appropriate lens (e.g., 400mm telephoto, macro lens)",
    "Include natural habitat and environmental context",
    "Add lighting conditions (e.g., dappled forest light, golden savanna)",
  ],
  vehicles: [
    "Specify make, model era, and design style",
    "Describe paint finish and surface material (e.g., gloss, matte)",
    "Use studio or environmental lighting descriptors",
    "Include shooting angle (e.g., three-quarter view, low-angle)",
    "Add background and scene context (e.g., mountain road, city night)",
  ],
  "digital-art": [
    "Combine art movements and visual styles (e.g., vaporwave, surrealism)",
    "Use specific color palette descriptors",
    "Include texture and material descriptors (e.g., glitch, holographic)",
    "Specify composition and layout (e.g., symmetrical, chaotic)",
    "Reference influential artists or design schools for style",
  ],
};

// ---------------------------------------------------------------------------
// Trending search terms per category
// ---------------------------------------------------------------------------
export const trendingSearchesLookup: Record<string, string[]> = {
  anime: [
    "cyberpunk anime girl",
    "fantasy anime landscape",
    "anime wallpaper",
    "dark anime character",
    "anime girl portrait",
    "anime city background",
    "studio ghibli prompts",
    "anime fight scene",
    "anime couple",
    "sakura anime",
  ],
  cinematic: [
    "cyberpunk film still",
    "epic battlefield panorama",
    "moody detective street",
    "golden hour highway drive",
    "sci-fi spacesuit close up",
    "vintage 1970s film style",
    "dramatic high contrast silhouette",
    "medieval village dawn",
    "neon alley rain scene",
    "underwater dive cinematic",
  ],
  portrait: [
    "realistic model headshot",
    "cyberpunk neon face",
    "vintage black and white portrait",
    "editorial beauty close-up",
    "fantasy elf queen portrait",
    "rustic explorer face",
    "studio lighting corporate headshot",
    "chibi character design avatar",
    "dramatic side lighting portrait",
    "futuristic cybernetic eye portrait",
  ],
  fantasy: [
    "epic dragon ridge",
    "bioluminescent magic forest",
    "floating crystal citadel",
    "dark sorcerer spellcast",
    "elven kingdom waterfall",
    "mystical phoenix birth",
    "ancient dungeon vault",
    "steampunk cloud city",
    "celestial palace gates",
    "underwater mermaid castle",
  ],
  "sci-fi": [
    "cyberpunk neon metropolis",
    "orbital ring habitat",
    "mars colony sunset dome",
    "futuristic mech hangar",
    "warp speed wormhole transit",
    "solarpunk organic city",
    "deep space exploratory vessel",
    "holographic command center",
    "alien flora bioluminescence",
    "cybernetic assembly line",
  ],
  architecture: [
    "brutalist concrete museum",
    "parametric glass villa",
    "minimalist japanese tearoom",
    "mid century modern forest house",
    "biophilic skyscraper design",
    "art deco theater lobby",
    "scandinavian luxury penthouse",
    "industrial loft workspace",
    "futuristic smart city terminal",
    "rustic stone mountain retreat",
  ],
  product: [
    "minimalist perfume bottle",
    "luxury smartwatch studio",
    "wireless headphones layout",
    "organic skincare flat lay",
    "cyberpunk sneaker showcase",
    "gourmet beverage splash",
    "modern smartphone draft",
    "frosted glass cosmetics tube",
    "premium camera lens product",
    "handcrafted leather bag mock",
  ],
  men: [
    "bearded gentleman editorial",
    "athletic male portrait outdoors",
    "corporate headshot dark suit",
    "rugged explorer face close-up",
    "tattooed urban male style",
    "cinematic male silhouette",
    "vintage gentleman portrait",
    "dramatic male side lighting",
    "surfer male golden hour",
    "futuristic male cyborg portrait",
  ],
  women: [
    "editorial beauty close-up",
    "fashion model golden hour",
    "bohemian woman outdoor portrait",
    "luxury lifestyle female shot",
    "cyberpunk neon woman portrait",
    "vintage Hollywood glamour",
    "natural beauty no makeup",
    "empowered woman city backdrop",
    "fantasy warrior queen portrait",
    "soft light feminine editorial",
  ],
  family: [
    "family beach sunset portrait",
    "candid kitchen breakfast scene",
    "outdoor picnic family moment",
    "grandmother and grandchild hug",
    "family holiday christmas morning",
    "toddler and parent play time",
    "family hiking mountain trail",
    "multi-generational family portrait",
    "siblings laughing in garden",
    "cozy family living room winter",
  ],
  couple: [
    "golden hour couple silhouette",
    "engagement shoot flower field",
    "romantic Paris street scene",
    "candid couple coffee shop",
    "wedding dance under fairy lights",
    "couple hiking mountain peak",
    "intimate couple portrait bokeh",
    "couple beach sunrise walk",
    "anniversary dinner candlelight",
    "couple laughing rooftop city",
  ],
  sport: [
    "sprinter explosive start track",
    "basketball slam dunk stadium",
    "surfer barrel wave ride",
    "rock climber cliff face",
    "martial arts flying kick",
    "cyclist mountain descent blur",
    "football player touchdown dive",
    "swimmer underwater race",
    "gymnast mid-air flip",
    "skateboarder urban trick shot",
  ],
  "nature-&-landscape": [
    "golden hour mountain ridge",
    "misty forest morning light",
    "turquoise ocean aerial view",
    "desert dunes dramatic shadows",
    "cherry blossom valley spring",
    "northern lights arctic panorama",
    "volcanic eruption dramatic sky",
    "waterfall rainforest mist",
    "autumn forest trail carpet",
    "storm approaching prairie",
  ],
  "animals-&-wildlife": [
    "lion pride golden savanna",
    "humpback whale ocean surface",
    "snow leopard mountain rock",
    "wolf pack winter forest",
    "eagle in flight dramatic sky",
    "elephant family waterhole",
    "red fox autumn leaves",
    "underwater shark coral reef",
    "jaguar rainforest portrait",
    "polar bear arctic ice floe",
  ],
  vehicles: [
    "sports car mountain hairpin",
    "vintage muscle car neon night",
    "futuristic concept car studio",
    "motorcycle desert highway",
    "fighter jet afterburner launch",
    "luxury yacht ocean sunset",
    "cyberpunk hovercraft city",
    "classic ferrari rolling hills",
    "electric supercar rain reflections",
    "steampunk airship clouds",
  ],
  "digital-art": [
    "vaporwave retro grid city",
    "glitch portrait neon fracture",
    "surreal floating island dream",
    "abstract geometric light burst",
    "holographic crystal sculpture",
    "dark surrealism melting clock",
    "cyberpunk neon mandala",
    "generative wave pattern flow",
    "art deco poster digital remake",
    "liquid chrome abstract pour",
  ],
};
