import type { Prompt } from "./json-db";

export interface CustomizableVariable {
  name: string;
  description: string;
  example: string;
}

export interface RecommendedSettings {
  aspectRatio: string;
  guidanceScale: string;
  styleStrength: string;
  negativePromptAvoid: string[];
}

export interface ModelRecommendation {
  model: string;
  recommendation: string;
}

export interface PromptEditorialContent {
  overview: string;
  whatItCreates: string;
  whyItWorks: string;
  bestFor: string[];
  customizableVariables: CustomizableVariable[];
  recommendedSettings: RecommendedSettings;
  modelCompatibility: ModelRecommendation[];
  customization: string[];
  tips: string[];
  breakdown: Array<{ label: string; text: string }>;
  howToUse: string[];
}

function cleanText(value: string): string {
  return (value || "").replace(/\s+/g, " ").trim();
}

function words(text: string): string[] {
  return cleanText(text).split(/\s+/).filter(Boolean);
}

function sentenceExcerpt(text: string, max = 220): string {
  const cleaned = cleanText(text);
  if (cleaned.length <= max) return cleaned;
  const cut = cleaned.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).replace(/[,:;.-]+$/, "")}…`;
}

function hasAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((term) => lower.includes(term));
}

function extractFirstMatch(text: string, terms: string[]): string | null {
  const lower = text.toLowerCase();
  for (const t of terms) {
    if (lower.includes(t)) return t;
  }
  return null;
}

// ─── Prompt Breakdown Extraction ──────────────────────────────────────────
function extractBreakdown(promptText: string, category: string): Array<{ label: string; text: string }> {
  const text = promptText.replace(/\r/g, "").trim();
  const rawParts = text
    .split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map(cleanText)
    .filter((part) => part.length >= 20);

  const parts = rawParts.slice(0, 20);
  const rules: Array<[string, string[]]> = [
    ["Subject & Focus", ["man", "woman", "person", "model", "couple", "character", "robot", "car", "building", "dish", "portrait", "subject", "dragon", "warrior"]],
    ["Composition & Framing", ["close-up", "close up", "full-body", "full body", "medium shot", "wide shot", "low angle", "overhead", "centered", "depth of field", "bokeh", "panoramic", "rule of thirds"]],
    ["Lighting & Ambiance", ["lighting", "light", "sunset", "sunrise", "rim light", "soft light", "hard light", "volumetric", "neon", "golden hour", "diffused", "backlit", "chiaroscuro"]],
    ["Camera & Technical Detail", ["lens", "85mm", "50mm", "35mm", "f/1.8", "f/2.8", "aperture", "shutter", "raw photo", "film grain", "photorealistic", "8k", "hyperrealistic"]],
    ["Styling, Attire & Finish", ["suit", "dress", "lehenga", "jacket", "wardrobe", "armor", "streetwear", "texture", "fabric", "materials", "polished", "matte"]],
    ["Environment & Setting", ["background", "backdrop", "street", "city", "studio", "forest", "mountain", "palace", "interior", "room", "landscape", "sky"]],
    ["Color Grading & Mood", ["color grading", "palette", "warm", "cool", "moody", "dramatic", "vibrant", "golden", "teal", "high contrast", "hdr"]],
  ];

  const used = new Set<number>();
  const result: Array<{ label: string; text: string }> = [];

  for (const [label, terms] of rules) {
    const index = parts.findIndex((part, i) => !used.has(i) && hasAny(part, terms));
    if (index >= 0) {
      used.add(index);
      result.push({ label, text: sentenceExcerpt(parts[index], 260) });
    }
  }

  if (result.length < 3) {
    for (let i = 0; i < parts.length && result.length < 5; i += 1) {
      if (used.has(i)) continue;
      used.add(i);
      result.push({
        label: result.length === 0 ? "Core Creative Directive" : `Scene Detail ${result.length + 1}`,
        text: sentenceExcerpt(parts[i], 260),
      });
    }
  }

  if (result.length === 0) {
    result.push({
      label: "Visual Directive",
      text: `Structured ${category.toLowerCase()} creative instructions providing guidance for subject composition, lighting, and textural fidelity.`,
    });
  }

  return result;
}

// ─── Category-Tailored Variables ──────────────────────────────────────────
function getCategoryVariables(category: string, promptText: string): CustomizableVariable[] {
  const cat = category.toLowerCase();
  const text = promptText.toLowerCase();

  if (cat.includes("fashion") || cat.includes("streetwear")) {
    return [
      { name: "Subject & Model", description: "Alter the model's ethnicity, silhouette, pose, or expression.", example: "Swap an athletic runway model for a relaxed streetwear enthusiast." },
      { name: "Wardrobe & Garments", description: "Modify primary clothing items, layering, fabric textures, or footwear.", example: "Change an oversized trench coat to a tailored wool blazer or puffer jacket." },
      { name: "Backdrop & Setting", description: "Switch between minimalist studio cyclorama, urban alley, or luxury interior.", example: "Change concrete architecture to an editorial studio setup with soft diffusion." },
      { name: "Lighting & Contrast", description: "Adjust between soft directional studio strobes, neon rim highlights, or harsh daylight.", example: "Shift from neon rim lighting to a warm golden-hour side light." },
      { name: "Color Palette", description: "Define the dominant fashion color scheme across garments and scene.", example: "Transition from monochromatic neutrals to high-contrast neon accents." },
    ];
  }

  if (cat.includes("portrait") || cat.includes("men") || cat.includes("women") || cat.includes("characters")) {
    return [
      { name: "Subject Identity", description: "Customize the subject's age, facial features, hairstyle, or emotional expression.", example: "Refine hairstyle, eye color, or micro-expression from intense focus to a gentle smile." },
      { name: "Focal Length & Lens", description: "Control the perspective and depth of field to isolate facial features.", example: "Use 85mm f/1.4 for soft background bokeh or 35mm for an environmental portrait." },
      { name: "Key Lighting Quality", description: "Define key, fill, and rim light positioning to sculpt cheekbones and jawlines.", example: "Switch from diffused softbox lighting to dramatic Rembrandt chiaroscuro." },
      { name: "Styling & Wardrobe", description: "Update attire and accessories to align with your concept.", example: "Swap formal collar attire for vintage knitwear or casual leather jacket." },
      { name: "Depth & Background", description: "Tune background blur and ambient environment texture.", example: "Adjust background from blurred cityscape lights to a textured painted canvas backdrop." },
    ];
  }

  if (cat.includes("wedding") || cat.includes("couple") || cat.includes("family")) {
    return [
      { name: "Couple Posing & Chemistry", description: "Adjust the intimate interaction, stance, or candid emotion.", example: "Change from a formal portrait pose to an affectionate, candid forehead-touch." },
      { name: "Ceremony & Bridal Attire", description: "Specify cultural or modern wedding garments, veil, or suit details.", example: "Customize embroidered royal lehenga, lace bridal gown, or ivory sherwani." },
      { name: "Venue & Floral Arrangement", description: "Modify the ceremony backdrop, floral arch, and decorative installations.", example: "Switch from a royal lakeside palace to a sunlit rustic vineyard or cathedral." },
      { name: "Ambient Lighting & Magic", description: "Control romantic atmospheric glow such as golden sunset, fairy lights, or candles.", example: "Enhance golden hour rim lighting with floating rose petals and soft bokeh." },
      { name: "Color Harmony", description: "Set the floral and scenic accent palette.", example: "Coordinate blush pink, champagne gold, and emerald botanical accents." },
    ];
  }

  if (cat.includes("architecture") || cat.includes("interior")) {
    return [
      { name: "Architectural Style", description: "Choose the design language, structural philosophy, and facade silhouette.", example: "Shift between Scandinavian minimalism, brutalist concrete, or modern glass fusion." },
      { name: "Material Textures", description: "Specify primary structural materials and surface finishes.", example: "Combine polished terrazzo, warm slatted cedar, and floor-to-ceiling curtain glass." },
      { name: "Spatial Context & Location", description: "Situate the building in an urban, natural, or mountain landscape.", example: "Place the townhouse in a historic European quarter or an alpine hillside." },
      { name: "Time of Day & Sunlight", description: "Set natural illumination angle and shadow length across the facade.", example: "Capture crisp morning architectural light with soft geometric cast shadows." },
      { name: "Interior Furnishing & Scale", description: "Add interior layout accents, bespoke furniture, and human scale figures.", example: "Introduce minimalist mid-century seating and recessed warm LED cove lighting." },
    ];
  }

  if (cat.includes("food")) {
    return [
      { name: "Culinary Dish & Focus", description: "Specify the main recipe, plating style, and freshness highlights.", example: "Replace artisan noodles with slow-roasted wagyu or glazed pastry." },
      { name: "Garnish & Micro-Details", description: "Add appetizing tactile garnishes, seasoning, or sauce drizzle.", example: "Sprinkle toasted sesame seeds, micro basil, and glistening olive oil drizzle." },
      { name: "Tableware & Serving Surface", description: "Customize the plate, bowl, cutlery, and tabletop texture.", example: "Serve on artisanal handmade matte ceramic over dark weathered timber." },
      { name: "Directional Lighting", description: "Position soft side-lighting to highlight culinary steam and ingredient sheen.", example: "Angle 45-degree diffused window light to reveal rich surface textures." },
      { name: "Shooting Angle", description: "Select the ideal culinary camera angle.", example: "Switch between 45-degree diner perspective, straight macro, or flat-lay top-down." },
    ];
  }

  if (cat.includes("product")) {
    return [
      { name: "Product Hero Item", description: "Replace the centerpiece item with your own packaging or hardware.", example: "Swap the cosmetic bottle for a luxury perfume atomizer or premium headphones." },
      { name: "Pedestal & Staging", description: "Select podium material, geometric props, and elevation.", example: "Stage atop raw travertine stone, floating acrylic, or mirrored water surface." },
      { name: "Studio Rim Lighting", description: "Define edges and silhouettes to separate the product from the backdrop.", example: "Add twin subtle rim lights to accentuate metallic edges and glass bevels." },
      { name: "Atmospheric Accents", description: "Incorporate organic elements, smoke, water drops, or dynamic particles.", example: "Introduce crisp water droplet splashes or botanical leaf shadow projections." },
      { name: "Commercial Background", description: "Choose studio gradient, colored seamless backdrop, or environmental setting.", example: "Use a clean two-tone pastel gradient with subtle ground shadow reflection." },
    ];
  }

  if (cat.includes("landscape") || cat.includes("nature") || cat.includes("travel")) {
    return [
      { name: "Terrain & Topography", description: "Define geographical landforms, water bodies, and elevation.", example: "Transition from jagged coastal cliffs to mist-covered pine valleys or sand dunes." },
      { name: "Weather & Atmosphere", description: "Set atmospheric conditions such as ground fog, storm clouds, or clear sky.", example: "Layer low-lying morning valley mist beneath dramatic sunrise light." },
      { name: "Golden Hour Horizon", description: "Control the sun position for panoramic color gradients across the sky.", example: "Place the setting sun just above mountain peaks for intense crepuscular rays." },
      { name: "Foreground Natural Anchor", description: "Add foreground elements for natural depth and scale.", example: "Include moss-covered volcanic boulders or wildflowers in sharp focus." },
      { name: "Compositional Depth", description: "Layer foreground, midground, and distant horizon.", example: "Frame distant alpine peaks through nearby pine boughs." },
    ];
  }

  if (cat.includes("fantasy") || cat.includes("sci-fi") || cat.includes("cyberpunk") || cat.includes("mecha")) {
    return [
      { name: "World-Building Setting", description: "Establish the fictional era, architectural scale, and environment.", example: "Set the scene in an ancient floating citadel or rain-slicked cyberpunk alley." },
      { name: "Technological / Magic FX", description: "Introduce energy fields, glowing runes, neon signage, or plasma glow.", example: "Add subtle cyan holographic displays or crackling golden arcane particles." },
      { name: "Character Armor & Gear", description: "Detail mechanized exoskeletons, ornate plate armor, or futuristic garments.", example: "Equip matte-black carbon fiber plate armor with glowing internal circuitry." },
      { name: "Atmospheric Scale & Depth", description: "Incorporate colossal structures, flying vessels, or dramatic sky phenomena.", example: "Silhouette twin moons and distant mega-structures through atmospheric haze." },
      { name: "Dramatic Backlighting", description: "Use strong rim or backlighting to heighten epic narrative tension.", example: "Backlight the character against a blazing nebula or volcanic fissure." },
    ];
  }

  // Default balanced variables
  return [
    { name: "Subject & Focal Point", description: "Define the core subject, character, or centerpiece.", example: `Tailor the main subject while keeping the ${category.toLowerCase()} composition intact.` },
    { name: "Lighting & Atmosphere", description: "Control light source, intensity, direction, and shadow softness.", example: "Choose between soft diffused daylight, studio strobe, or dramatic rim lighting." },
    { name: "Environment & Setting", description: "Swap the surrounding background, location, or spatial context.", example: "Switch from an indoor minimalist setup to an outdoor natural or urban scene." },
    { name: "Camera & Lens Perspective", description: "Adjust framing, lens focal length, and depth of field.", example: "Select prime 85mm for subject isolation or wide-angle for broad scenic perspective." },
    { name: "Color Palette & Grading", description: "Establish the tone and color harmony across the scene.", example: "Tune between warm golden tones, desaturated film aesthetics, or rich cinematic contrast." },
  ];
}

// ─── Technical "Why This Prompt Works" Generation ─────────────────────────
function generateWhyItWorks(prompt: Prompt): string {
  const text = prompt.fullPrompt.toLowerCase();
  const insights: string[] = [];

  // Lighting insights
  if (hasAny(text, ["golden hour", "sunset", "sunrise"])) {
    insights.push("Natural golden-hour directional light creates warm skin tones and long, soft cast shadows that build volumetric depth.");
  } else if (hasAny(text, ["neon", "cyberpunk", "fluorescent"])) {
    insights.push("Vibrant neon and high-contrast color illumination provides striking dual-tone separation between the subject and dark background.");
  } else if (hasAny(text, ["studio lighting", "softbox", "diffused"])) {
    insights.push("Controlled studio-style lighting balances highlights and preserves micro-textures across surfaces without harsh blowout.");
  } else if (hasAny(text, ["rim light", "backlit", "edge light"])) {
    insights.push("Precise rim lighting outlines the subject's silhouette, cleanly separating foreground elements from the environment.");
  } else if (hasAny(text, ["dramatic lighting", "chiaroscuro", "moody"])) {
    insights.push("Chiaroscuro lighting introduces deep shadow contrast, evoking mood and artistic gravitas.");
  }

  // Camera / lens insights
  if (hasAny(text, ["85mm", "50mm", "f/1.8", "f/1.4", "bokeh", "depth of field"])) {
    insights.push("Shallow depth of field with creamy optical bokeh draws immediate visual attention to fine subject details.");
  } else if (hasAny(text, ["wide", "panoramic", "aerial", "drone"])) {
    insights.push("Wide-angle framing establishes environmental scale and spatial context across foreground, midground, and horizon.");
  } else if (hasAny(text, ["close-up", "macro", "extreme close-up"])) {
    insights.push("Macro-level framing forces the image generator to prioritize micro-textures such as skin pores, fabric weave, or culinary steam.");
  }

  // Texture & material insights
  if (hasAny(text, ["texture", "fabric", "materials", "concrete", "timber", "leather", "marble", "silk"])) {
    insights.push("Specific tactile material descriptors prevent flat procedural rendering, prompting the AI to render realistic tactile surface qualities.");
  }

  // Composition / styling
  if (hasAny(text, ["cinematic", "film grain", "editorial", "archdaily"])) {
    insights.push("Industry-standard editorial and compositional cues guide the generative model toward balanced framing and restrained color harmony.");
  }

  if (insights.length >= 2) {
    return insights.slice(0, 3).join(" ");
  }

  return `This prompt balances a distinct ${prompt.category.toLowerCase()} subject with concrete composition, directional lighting, and textural cues. By explicitly defining the atmosphere and photographic parameters, it prevents the generator from resorting to generic procedural styling.`;
}

// ─── What This Prompt Creates ─────────────────────────────────────────────
function generateWhatItCreates(prompt: Prompt): string {
  const text = prompt.fullPrompt;
  const wordCount = words(text).length;
  const model = prompt.models?.[0] || "Gemini AI / Midjourney";

  return `A detailed ${prompt.category.toLowerCase()} image titled "${prompt.title}", crafted with approximately ${wordCount} words of visual direction for ${model}. It produces a finished visual showcasing clear subject focus, harmonious color treatment, and refined environmental context suitable for portfolio, editorial, or commercial concept projects.`;
}

// ─── Recommended Settings ─────────────────────────────────────────────────
function generateRecommendedSettings(prompt: Prompt): RecommendedSettings {
  const text = prompt.fullPrompt.toLowerCase();
  const cat = prompt.category.toLowerCase();

  let aspectRatio = "1:1";
  if (text.includes("--ar 16:9") || cat.includes("cinematic") || cat.includes("landscape") || cat.includes("architecture")) {
    aspectRatio = "16:9 (Cinematic Widescreen)";
  } else if (text.includes("--ar 9:16") || cat.includes("portrait") || cat.includes("fashion") || cat.includes("women") || cat.includes("men")) {
    aspectRatio = "9:16 or 4:5 (Vertical Portrait)";
  } else if (text.includes("--ar 4:5")) {
    aspectRatio = "4:5 (Standard Social Portrait)";
  } else if (text.includes("--ar 21:9")) {
    aspectRatio = "21:9 (Anamorphic Ultrawide)";
  } else if (cat.includes("product") || cat.includes("food") || cat.includes("logo")) {
    aspectRatio = "1:1 (Square Studio Composition)";
  }

  const negativeAvoid: string[] = [
    "blurry details",
    "unnatural anatomical distortion",
    "oversaturated color cast",
    "low resolution artifacts",
  ];

  if (cat.includes("portrait") || cat.includes("fashion") || cat.includes("people")) {
    negativeAvoid.push("distorted hands/fingers", "plastic airbrushed skin", "misaligned pupils");
  } else if (cat.includes("architecture") || cat.includes("interior")) {
    negativeAvoid.push("warped perspective lines", "crooked walls", "blurry facade textures");
  } else if (cat.includes("product") || cat.includes("food")) {
    negativeAvoid.push("cluttered background", "unnatural specular glare", "plastic food appearance");
  }

  return {
    aspectRatio,
    guidanceScale: "CFG 7.0 - 8.5 (Balanced prompt fidelity)",
    styleStrength: "Stylize 100 - 250 (Midjourney) or Step 28-35 (Flux/SD)",
    negativePromptAvoid: negativeAvoid.slice(0, 5),
  };
}

// ─── Model Compatibility ──────────────────────────────────────────────────
function generateModelCompatibility(prompt: Prompt): ModelRecommendation[] {
  const text = prompt.fullPrompt.toLowerCase();
  const isPhotorealistic = hasAny(text, ["photorealistic", "photo", "85mm", "lens", "skin texture"]);

  return [
    {
      model: "Midjourney (v6 / v6.1)",
      recommendation: isPhotorealistic
        ? "Add '--style raw' to preserve natural skin and authentic lighting rather than idealized smoothing."
        : "Excels at color harmony and stylized visual depth; render at default stylize settings.",
    },
    {
      model: "Flux.1 / Stable Diffusion XL",
      recommendation: "Use 28-35 inference steps with Euler sampler; excels at anatomical precision and complex prompt adherence.",
    },
    {
      model: "Google Gemini / DALL-E 3",
      recommendation: "Translate descriptive sentences directly into conversational instructions; maintains strong subject consistency.",
    },
    {
      model: "ChatGPT (GPT-4o Image Generation)",
      recommendation: "Paste the full prompt as-is, then refine conversationally (e.g., 'keep the composition, change the lighting'); specify the aspect ratio in plain words such as 'vertical 9:16'.",
    },
  ];
}

// ─── Prompt-Specific Tips ─────────────────────────────────────────────────
function generateTips(prompt: Prompt): string[] {
  const text = prompt.fullPrompt.toLowerCase();
  const tips: string[] = [];

  if (hasAny(text, ["lens", "85mm", "50mm", "f/1.8", "depth of field"])) {
    tips.push("Preserve the camera focal length and aperture cues to maintain identical depth of field and subject separation.");
  }

  if (hasAny(text, ["lighting", "golden hour", "sunset", "rim light", "softbox"])) {
    tips.push("Keep the primary lighting direction consistent when modifying the subject, as directional light defines the scene's emotional tone.");
  }

  if (hasAny(text, ["color grading", "palette", "teal", "orange", "monochrome"])) {
    tips.push("Anchor the color grading to two harmonious primary tones rather than listing numerous competing accent colors.");
  }

  if (hasAny(text, ["outfit", "wardrobe", "lehenga", "suit", "jacket", "fabric"])) {
    tips.push("When updating wardrobe, specify exact material textures (e.g. raw silk, distressed denim, wool) to ensure rich tactile rendering.");
  }

  if (hasAny(text, ["background", "backdrop", "studio", "environment"])) {
    tips.push("Modify the background environment separately from the subject to prevent unintended alterations to model pose or expression.");
  }

  if (tips.length < 3) {
    tips.push("Keep the core composition intact on your initial generation to establish a solid baseline before customizing individual variables.");
    tips.push("When testing variations, adjust one visual element at a time to clearly evaluate its impact on the resulting output.");
  }

  return tips.slice(0, 4);
}

// ─── Main Exported Function ───────────────────────────────────────────────
export function getPromptEditorialContent(prompt: Prompt): PromptEditorialContent {
  const cleanFullPrompt = cleanText(prompt.fullPrompt || "");
  const categoryVariables = getCategoryVariables(prompt.category, cleanFullPrompt);
  const whatItCreates = generateWhatItCreates(prompt);
  const whyItWorks = generateWhyItWorks(prompt);
  const recommendedSettings = generateRecommendedSettings(prompt);
  const modelCompatibility = generateModelCompatibility(prompt);
  const breakdown = extractBreakdown(cleanFullPrompt, prompt.category);
  const tips = generateTips(prompt);

  const bestFor = categoryVariables.map((v) => `${v.name} customization for ${prompt.category.toLowerCase()} projects`);

  const customization = categoryVariables.map((v) => `${v.name}: ${v.description} (${v.example})`);

  const howToUse = [
    `Copy the complete prompt text into your preferred AI image generator (e.g., ${prompt.models?.[0] || "Gemini AI, Midjourney, or Flux"}).`,
    `Review the initial output against the recommended aspect ratio (${recommendedSettings.aspectRatio.split(" ")[0]}) to verify composition.`,
    `Customize the key variables above (such as ${categoryVariables[0]?.name.toLowerCase() || "subject"} or ${categoryVariables[1]?.name.toLowerCase() || "lighting"}) to suit your creative vision.`,
    `Refine the guidance scale or apply negative prompt exclusions to eliminate any artifacts without compromising image fidelity.`,
  ];

  const overview = `${whatItCreates} ${whyItWorks}`;

  return {
    overview,
    whatItCreates,
    whyItWorks,
    bestFor: bestFor.slice(0, 4),
    customizableVariables: categoryVariables,
    recommendedSettings,
    modelCompatibility,
    customization,
    tips,
    breakdown,
    howToUse: prompt.howToUse?.length ? prompt.howToUse : howToUse,
  };
}
