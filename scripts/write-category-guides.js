// scripts/write-category-guides.js
// Writes the CATEGORY_GUIDES export to src/data/category-descriptions.ts
// Run: node scripts/write-category-guides.js
import { writeFileSync } from "fs";

const CATEGORY_DESCRIPTIONS = `export const CATEGORY_DESCRIPTIONS: Record<string, {
  name: string;
  description: string;
}> = {
  all: {
    name: "Browse Prompts",
    description: "Discover a growing library of structured AI prompts for Google Gemini and ChatGPT, designed to help you create better results with less effort. Explore prompts across popular categories, creative styles, and use cases, search for specific ideas or keywords, and instantly copy ready-to-use prompts. Whether you're creating AI images, writing content, brainstorming ideas, improving productivity, or exploring new creative possibilities, find practical prompts you can customize and use with Gemini and ChatGPT."
  },
  Cinematic: { name: "Cinematic Prompts", description: "Movie-like lighting, dramatic compositions, depth of field, and blockbuster visual styles formatted for Gemini, Midjourney, and other modern image generators." },
  Anime: { name: "Anime Prompts", description: "Japanese animation style illustrations, vibrant characters, stylized backgrounds, fan-favorite aesthetics, and clean digital linework." },
  Portrait: { name: "Portrait Prompts", description: "Professional human portraits, detailed facial features, realistic lighting, and studio-grade photographic styles with realistic focus." },
  Fantasy: { name: "Fantasy Prompts", description: "Dark, mythical, legendary worlds, magic, mythical creatures, and ethereal fantasy concept art styles with rich textures." },
  "Sci-Fi": { name: "Sci-Fi Prompts", description: "Futuristic technology, space travel, neon-drenched cityscapes, cyberpunk aesthetics, and visionary speculative fiction style directions." },
  Architecture: { name: "Architecture Prompts", description: "Visionary architectural designs, modern interior spaces, historical landmarks, and classical or futuristic building structures." },
  Product: { name: "Product Prompts", description: "Commercial product photography setups, mockups, studio lighting, clean background aesthetics, and professional catalog styling." },
  Men: { name: "Men Prompts", description: "Portraits, fashion, and lifestyle photography featuring male subjects, professional lighting, and realistic facial details." },
  Women: { name: "Women Prompts", description: "Portraits, fashion, and lifestyle photography featuring female subjects, professional lighting, and realistic details." },
  Family: { name: "Family Prompts", description: "Heartwarming family scenes, multi-generational portraits, cozy indoor/outdoor settings, and authentic candid moments." },
  Couple: { name: "Couple Prompts", description: "Romantic portraits, lifestyle photography, engagement shoots, and scenic or candid moments highlighting relationships." },
  Sport: { name: "Sport Prompts", description: "High-energy action shots, dynamic athletic movement, sports training, and professional sports photography style presets." },
  "Nature & Landscape": { name: "Nature & Landscape Prompts", description: "Breathtaking scenic views, mountains, oceans, majestic forests, sunrises, sunsets, and cinematic landscape photography compositions." },
  "Animals & Wildlife": { name: "Animals & Wildlife Prompts", description: "Close-up wildlife photography, detailed pet portraits, action shots of animals in natural habitats, and creative wildlife captures." },
  Vehicles: { name: "Vehicles Prompts", description: "Sleek automotive designs, high-speed sports cars, vintage motorcycles, aviation, and conceptual transport designs." },
  "Digital Art": { name: "Digital Art Prompts", description: "Creative digital illustrations, abstract paintings, 3D character concepts, concept art, and high-fidelity graphic designs." },
  Fashion: { name: "Fashion Prompts", description: "High-end runway styling, outfit conceptualization, modern streetwear, and modeling photography style directions." },
  Food: { name: "Food Prompts", description: "Delectable culinary shots, commercial food styling, gourmet presentation, and realistic food art styles." },
  Travel: { name: "Travel Prompts", description: "Scenic tourist destinations, wanderlust adventures, aerial photography, and cultural exploration style directions." },
  "Interior Design": { name: "Interior Design Prompts", description: "Sleek living spaces, modern kitchen layouts, furniture staging, and luxury home decor visualization." },
  Cyberpunk: { name: "Cyberpunk Prompts", description: "Neon-drenched streets, high-tech low-life, cybernetic augmentations, and futuristic night aesthetics." },
  Steampunk: { name: "Steampunk Prompts", description: "Victorian-era science fiction, clockwork machinery, steam-powered airships, and brass or copper designs." },
  Mecha: { name: "Mecha Prompts", description: "Gigantic robotic armor, sci-fi battle suits, mechanical engineering, and tactical combat robot concepts." },
  Horror: { name: "Horror Prompts", description: "Spooky gothic settings, psychological thrillers, dark shadows, monsters, and eerie ambient lighting directions." },
  Surreal: { name: "Surreal Prompts", description: "Dreamlike logic, floating structures, melted physics, visual paradoxes, and subconscious art concepts." },
  Minimalist: { name: "Minimalist Prompts", description: "Clean lines, vast empty spaces, flat design, limited color palettes, and simple beautiful visual forms." },
  Luxury: { name: "Luxury Prompts", description: "Opulent interiors, high-end products, designer apparel, upscale lifestyle, and golden accent lighting." },
  Wedding: { name: "Wedding Prompts", description: "Romantic marital events, elegant receptions, bride and groom portraits, floral decor, and joyous moments." },
  "Logo Design": { name: "Logo Design Prompts", description: "Vector style corporate branding, minimalist brand marks, emblems, and visual identity concepts." },
  "Poster Design": { name: "Poster Design Prompts", description: "Graphic movie posters, retro event print layouts, typographic designs, and illustrative visual themes." },
  Characters: { name: "Characters Prompts", description: "Detailed character design sheets, gaming avatars, concept art sketches, and character portraits." },
  Mythology: { name: "Mythology Prompts", description: "Ancient Greek, Norse, and Eastern legends, mythological gods, magical realms, and historical epic scenes." },
  Space: { name: "Space Prompts", description: "Deep cosmic nebula vistas, stellar space exploration, planetary surfaces, astronaut details, and galaxy stars." },
  Vintage: { name: "Vintage Prompts", description: "Retro photo aesthetics, sepia tones, film grain styles, mid-century lifestyle, and nostalgia visual themes." }
};
`;

const GUIDES = {
  cinematic: {
    guideText: "The cinematic collection covers dramatic film-still compositions—soldiers walking through smoke at dawn, ethereal astral projections in lush forests, urban silhouettes against neon-soaked skylines, and split-identity portraits that feel like stills from a prestige drama. The recurring energy is emotional weight: each prompt is built around a mood, not just a setting.\n\nWhat makes these prompts visually distinctive is attention to lens choice and colour grading. Prompts regularly call for 50mm or 85mm f/1.8 lenses to give faces comfortable working distance, shallow depth of field to separate subject from background, and specific grade palettes—muted earth tones, teal-and-orange film LUTs, or high-contrast chiaroscuro shadows that read as intentional rather than accidental. Anamorphic lens flare and volumetric haze appear often to push the \"shot on 35mm\" impression.\n\nWhen adapting these prompts, the most useful first edit is the colour grade description: swap \"muted earthy\" for \"cool blue-grey\" and the mood shifts entirely without changing the composition. For widescreen editorial shots, add --ar 21:9 or \"anamorphic widescreen 2.39:1\". Avoid stacking too many style qualifiers—three precise terms beat ten vague ones. Results vary between Gemini, DALL-E, and Midjourney, so test the same prompt across at least two models before settling on your output.",
    tips: [
      "Specify film stock or grade palette explicitly (e.g., Kodak Vision3, teal-orange LUT)",
      "Use focal length + aperture pairs like '85mm f/1.8' rather than just 'blurry background'",
      "Add aspect ratio descriptors such as '21:9 anamorphic widescreen' for film-like crops",
      "Name the dominant light source (key light direction, rim light color, ambient fill)",
      "Limit style modifiers to 3-4 precise terms; more creates contradictory outputs",
    ],
  },
  anime: {
    guideText: "Anime prompts in this library span a wide tonal range: shonen-style action characters with dynamic energy auras, quiet Studio Ghibli-esque countryside scenes with drifting dust motes, cyberpunk girls with chrome limbs and neon-backlit hair, and classical Japanese festival settings under lantern light. Many prompts combine a strong character design with a carefully described environmental backdrop.\n\nThe visual techniques that separate polished anime output from generic results include linework clarity (specifying \"clean vector outlines\" or \"hand-drawn pencil shading\"), cell-shading for flat colour fills, and lighting notes like \"rim-lit from behind with orange sunset glow\" or \"bioluminescent underwater atmosphere\". Eye design is one of the biggest differentiators—large, detailed irises with catch lights and gradient colouring read as intentionally anime, while under-described eyes often drift toward photorealism.\n\nStart customisation by swapping the character's outfit and hair colour, which are low-risk changes that dramatically alter the feel. For backgrounds, adding weather (\"cherry blossom petals falling\", \"light rain on cobblestones\") immediately lifts the atmosphere without touching composition. Note that older aesthetic eras like 90s retro grain respond differently between Gemini and Midjourney—Gemini tends toward cleaner modern outputs, while Midjourney handles vintage grain better.",
    tips: [
      "Reference animation styles explicitly: 'Kyoto Animation watercolour', '90s cel-shaded', 'Trigger Studios energy'",
      "Describe eye design in detail—iris gradient colour, catch light position, lash thickness",
      "Specify linework type: clean vector outlines vs. hand-inked pencil shading",
      "Add weather or particle effects (sakura petals, fireflies, light rain) for atmosphere",
      "Use 'cell shading' and a named colour palette for flat-fill anime looks",
    ],
  },
  portrait: {
    guideText: "Portrait prompts here cover a broad range of human subjects: editorial fashion shots with strong directional rim lighting, moody low-key male portraits with chiaroscuro shadows, conceptual pieces where a subject's silhouette is formed from hundreds of tiny human figures, and beauty close-ups targeting skin texture at near-macro magnification. There is a strong thread of photographic precision—most prompts specify lens, aperture, and lighting setup directly.\n\nFor skin texture and facial detail, the key variables are lens focal length and lighting pattern. An 85mm lens at f/1.4 produces flattering compression and naturally smooth background separation. Rembrandt lighting—a small triangular highlight on the shadow-side cheek—gives faces sculptural depth. Soft box diffusion or a ring light creates even, commercial-grade skin tones. High-contrast side lighting with minimal fill emphasises bone structure for editorial or character work.\n\nWhen adapting these prompts, start with the lighting description since it has the largest visual impact. Change the gaze direction and expression next—\"introspective downward gaze\" versus \"direct confident eye contact\" produce entirely different emotional registers at identical technical settings. Avoid appending full-body anatomy instructions into portrait prompts; they tend to confuse the model. Results for hyperrealistic skin texture are noticeably better in Gemini than in older DALL-E versions.",
    tips: [
      "Pair focal length with aperture: '85mm f/1.4' beats 'portrait lens' every time",
      "Name the lighting pattern: Rembrandt, split, butterfly, broad, or loop lighting",
      "Specify gaze direction and expression separately—they carry distinct emotional weight",
      "Include one wardrobe detail for context (collar, fabric texture, accessory colour)",
      "Add a background separation note: 'shallow depth of field, clean gradient background'",
    ],
  },
  fantasy: {
    guideText: "The fantasy collection spans mythic battles, enchanted architecture, and character concept art: warriors wielding elemental powers against stormy volcanic landscapes, floating crystal citadels above mist-filled valleys, dark sorcerers mid-spell in ancient dungeon vaults, and ethereal phoenix birds rising from golden fire. There is a consistent emphasis on atmosphere—many prompts call for bioluminescent particle effects, magical glows, or volumetric light shafts through forest canopies.\n\nVisual richness in fantasy comes from layered depth: a foreground subject (character, creature), a mid-ground architectural or environmental feature (crumbling archway, crystal formation), and a background that sets the world scale (mountain range, sky filled with dragon silhouettes). Colour palettes lean dramatic—violet and crimson for dark magic scenes, teal-and-gold for celestial environments, deep emerald for forest biomes. Art style references like \"digital matte painting\", \"concept art for AAA game studio\", or \"oil painting on dark canvas\" steer outputs toward the professional fantasy illustration aesthetic.\n\nWhen adapting, the quickest change is swapping the magic element (fire to ice to lightning) without touching composition. For tabletop RPG character prompts, specify class, armour material, and weapon in separate phrases rather than one run-on sentence. Results for complex magical particle systems vary widely—Gemini handles glowing energy auras more predictably than DALL-E at the same prompt length.",
    tips: [
      "Layer your scene: subject in foreground, landmark mid-ground, world-scale background",
      "Name your colour palette explicitly: 'violet and crimson for shadow magic', 'teal-gold for celestial light'",
      "Use 'digital matte painting' or 'concept art for AAA game studio' for the illustration aesthetic",
      "Describe magic as a material: 'liquid fire tendrils', 'crystalline ice shards', 'crackling arc lightning'",
      "For RPG characters, specify class, armour material, and weapon as separate phrases",
    ],
  },
  "sci-fi": {
    guideText: "Sci-fi prompts in this collection skew toward near-future and high-concept: cybernetic guardians with glowing crimson visors, holographic hacker interfaces bathed in neon blue, alien bioluminescent planets with floating crystal formations, and orbital ring habitats silhouetted against gas giants. Sub-genres represented include cyberpunk, solarpunk, military sci-fi, and deep space exploration—each with different visual signatures.\n\nThe visual logic of convincing sci-fi imagery depends heavily on material specificity. \"Carbon fibre panel seams\", \"brushed titanium surface with micro-etched lettering\", \"holographic blue readout grid over a translucent glass visor\"—these are the phrases that separate plausible future tech from generic silver suits. Environmental atmosphere matters equally: \"neon-drenched Tokyo-style street at 2 a.m.\", \"Mars canyon lit by two moons and a setting sun\" or \"zero-gravity debris field with rotating hull fragments\" anchor the viewer in a specific world.\n\nFor adapting these prompts, changing the lighting temperature is the fastest way to shift sub-genre feel—cool cyan-white reads as hard military sci-fi, warm amber-orange reads as solarpunk or retro-futurism. Gemini handles large architectural structures (space stations, colony domes) with solid proportional accuracy. Midjourney tends to produce more stylised outputs for character-focused sci-fi. Test both before committing to a model for a series.",
    tips: [
      "Describe materials precisely: 'carbon fibre seam panels', 'translucent blue holographic readout'",
      "Name the sub-genre up front: cyberpunk, solarpunk, military sci-fi, retro-futurism",
      "Set lighting temperature to control mood: cool cyan-white = hard sci-fi, amber = solarpunk",
      "Include a scale reference for space scenes (compare ship to planet or station to moon)",
      "Specify camera angle for vehicles and architecture: three-quarter, low-angle upshot, bird's eye",
    ],
  },
  architecture: {
    guideText: "Architecture prompts in this library lean toward the conceptual and the dramatic: a brutalist concrete museum with raw aggregate walls and narrow skylight slits, a biophilic skyscraper where vertical gardens cascade between glazed office floors, a mid-century modern forest house cantilevered over a creek, a Japandi tearoom with shoji screens and raked gravel. The collection also includes photorealistic interior renders—open-concept loft kitchens, Scandinavian bedroom retreats, and industrial workspace conversions.\n\nLighting is the single most important variable in architectural output. For exteriors, \"golden hour raking light across concrete textures\" reveals material depth that flat noon lighting hides. For interiors, \"soft north-facing diffused daylight with subtle warm lamp accents\" gives spaces a liveable authenticity. Material descriptions drive credibility: \"raw board-formed concrete\", \"quarter-sawn white oak millwork\", \"polished Calacatta marble with book-matched veining\" are the kinds of phrases that prevent the AI from defaulting to generic grey surfaces.\n\nAdapting these prompts works best by changing one variable at a time—switch the architectural movement (Brutalist to Bauhaus to Parametric) while holding materials constant, then swap materials. Use \"architectural photography, wide-angle tilt-shift lens\" for exterior shots and \"interior architectural render, natural daylight, 24mm lens\" for spaces. Gemini is notably consistent with glass and steel structures; wood-heavy interiors sometimes require an additional material qualifier to avoid over-smoothing.",
    tips: [
      "Name the architectural movement: Brutalist, Bauhaus, Parametric, Japandi, Mid-Century Modern",
      "Describe materials at a specific level: 'board-formed raw concrete' not just 'concrete'",
      "Specify lighting by time and direction: 'raking golden hour from the east across the facade'",
      "Use 'tilt-shift architectural photography' for exteriors to control converging verticals",
      "For interiors, add a north/south light descriptor to suggest natural daylight quality",
    ],
  },
  product: {
    guideText: "Product prompts here span commercial photography and editorial branding: a frosted perfume bottle on a black polished stone plinth with soft specular highlights, wireless headphones on a minimal white acrylic surface with a single leaf prop, a cyberpunk-styled sneaker under dramatic neon underlighting, and a luxury watch face photographed macro with the dial filling the frame. The unifying thread is a controlled studio environment—every element in the frame is deliberate.\n\nThe visual techniques that distinguish professional product shots are background surface, lighting configuration, and material rendering. For hard surfaces (metal, glass, ceramics), a three-point studio setup with a clean white or dark gradient background isolates the object cleanly. Lifestyle shots work better with complementary props—organic elements like water droplets, botanicals, or raw linen fabric add tactile warmth without distracting from the product. Material descriptors drive realism: \"frosted borosilicate glass with micro-condensation\", \"brushed aluminium with hairline finish\", \"genuine leather with saddle stitching\" all prevent the model from producing plasticky generic surfaces.\n\nThe most effective first edit when customising is the background surface—marble, concrete, velvet, or acrylic each carry a distinct price-point signal. Then adjust the number and direction of light sources. Gemini and DALL-E both handle clean product shots well; for reflective surfaces like chrome or mirrored glass, Gemini tends to be more consistent. Add \"commercial product photography, sharp focus\" explicitly if the model drifts toward artistic abstraction.",
    tips: [
      "Define the background surface material and colour specifically, not just 'clean background'",
      "Describe material properties: 'frosted glass', 'brushed aluminium hairline finish', 'matte rubber grip'",
      "Specify the number of light sources and their positions: 'softbox left, rim light right, no fill'",
      "Use lifestyle props sparingly—one or two complementary elements, not a full scene",
      "Add 'commercial product photography, sharp focus, shallow depth of field' to prevent artistic drift",
    ],
  },
  men: {
    guideText: "Male-subject prompts in this collection cover considerable ground: regal halo-of-power editorial portraits with elaborate golden backgrounds, double-exposure composites merging urban architecture with a man's profile, gritty street-art style close-ups with painted vector overlays, rugged traveller faces captured at golden hour, and conceptual hero-versus-villain mirror portraits that split the frame into contrasting personalities. The common thread is a strong formal composition built around the face.\n\nFor photorealistic male portraits, lighting pattern and skin tone treatment are the most influential variables. Dramatic Rembrandt lighting—a single key light at 45 degrees with minimal fill—emphasises angular jawlines and brow structure. Three-point studio setups with a separation light behind the ear give corporate and editorial shots clean separation from the background. Descriptors like \"defined jawline, light stubble, confident direct gaze\" direct the model toward commercial portrait conventions; \"weathered skin, crow's feet, thousand-yard stare\" push toward documentary authenticity.\n\nAdapting these prompts is straightforward: change the outfit description and background setting first, since they shape context without touching facial parameters. For layered editorial concepts (double exposure, collage, glitch), it helps to describe each visual layer in its own phrase rather than one combined sentence. Results for complex face composites are notably more stable in Gemini than in DALL-E; Midjourney can produce more stylised artistic treatments for editorial pieces.",
    tips: [
      "Specify lighting pattern by name: Rembrandt, split, loop, or broad for different facial shapes",
      "Use specific facial feature descriptors: 'defined jawline', 'light stubble', 'high cheekbones'",
      "Describe outfit material, not just style: 'charcoal wool blazer, open collar linen shirt'",
      "For composite concepts, describe each visual layer as a separate phrase in sequence",
      "Add camera lens and aperture for photorealistic outputs: '85mm f/1.4, full-frame sensor'",
    ],
  },
  women: {
    guideText: "The women's portrait collection ranges from cinematic sports-poster collages featuring specific stadium environments, to minimalist studio editorial shots, to multi-exposure fashion composites layering three full-body poses over a golden hour riverside. Many prompts include precise face-lock instructions designed for use with reference photos, while others are fully descriptive standalone prompts for editorial or fantasy characters.\n\nLighting and background handling shape outputs more than any other single variable. Golden hour diffusion gives skin a warm luminosity that flatters a wide range of skin tones—\"soft directional golden hour from camera left\" is a phrase that produces consistent warmth without overexposure. Studio setups for fashion editorial work best with a clearly specified backdrop: \"matte grey seamless\", \"deep charcoal, illuminated only by a single rim light from behind\". For beauty close-ups, \"ring light catchlights, 90mm macro lens, 8K skin texture\" drives the AI toward the detail level needed for editorial use.\n\nWhen adapting these prompts, modify the environmental setting before touching facial descriptors. A \"Parisian rooftop at dusk\" swap for \"industrial warehouse interior\" changes the entire mood while keeping the same character intact. Prompts involving face references or uploaded photos produce more stable results in Gemini than in DALL-E. For fantasy or conceptual character prompts where no reference exists, both models perform comparably at the same detail level.",
    tips: [
      "Specify light direction and colour temperature: 'soft golden hour from camera left'",
      "For beauty shots, use 'ring light catchlights, macro lens, 8K skin texture'",
      "Describe backdrop precisely: 'matte grey seamless' or 'dark charcoal single rim light'",
      "Change the environmental setting first when adapting—it shifts mood without touching the character",
      "For multi-exposure composites, describe each layer in order from background to foreground",
    ],
  },
  family: {
    guideText: "Family prompts in this library focus on candid authenticity over posed formality: grandparents embracing a grandchild on a sunlit park bench, a multi-generational family at an outdoor picnic with natural dappled light filtering through trees, siblings laughing on a garden swing, and parents with a toddler in a cosy living room at winter afternoon light. The goal across these prompts is emotional warmth that reads as a genuine moment rather than a directed shoot.\n\nThe visual difference between a stiff family portrait and a natural one lies mainly in posing language and light quality. Descriptors like \"candid moment\", \"mid-laugh\", \"reaching toward each other\" replace static pose instructions and allow the model more compositional flexibility. Soft, diffused outdoor light—\"overcast natural light\", \"open shade with warm reflector fill\"—flatters all ages and skin tones without harsh shadows. For indoor scenes, \"warm 2700K practical lamps with window fill from the left\" creates the domestic cosiness that studio-style hard light cannot replicate.\n\nAdapt these prompts by specifying the age range of subjects more precisely than the originals often do—\"grandmother in her seventies, toddler of about two years\" produces more coherent age relationships than vague \"multigenerational\" instruction. Outdoor settings with a clear time of day and season anchor the atmosphere: \"autumn afternoon, fallen leaves on the ground\" versus \"summer midday beach\". Gemini handles age diversity in groups relatively well; highly specific age combinations sometimes need a second pass to produce consistent family resemblance.",
    tips: [
      "Use candid pose language: 'mid-laugh', 'reaching toward each other', 'looking at the child'",
      "Specify ages precisely: 'grandmother in her seventies', 'toddler of about two years'",
      "Choose diffused natural light for flattering group shots: 'overcast sky', 'open shade'",
      "Anchor outdoor scenes with season and time of day: 'autumn afternoon, fallen leaves'",
      "For indoor warmth, use 'practical 2700K lamp light with soft window fill from the left'",
    ],
  },
  couple: {
    guideText: "Couple prompts span from quietly romantic to cinematically dramatic: foreheads-touching silhouettes against blazing sunset skies, cinematic lockscreen portrait composites with smartphone UI overlays, prewedding editorial walks down tree-lined pathways in flowing red fabric, and vintage diary concept posters assembled from memory-style layered photographs. Some prompts are highly compositional blueprints; others are atmospheric mood studies.\n\nRomantic lighting is the category's signature technique. Golden hour is the most-used reference—specifically, the period fifteen to thirty minutes before sunset when light is directional, warm, and soft simultaneously. \"Soft golden backlighting creating rim glow around both subjects\" is more precise than \"beautiful sunset light\" and produces more consistent results. Bokeh backgrounds with subject-isolating foreground depth (f/1.8 or lower) are common, as is the \"walking away from camera, hand-holding\" compositional convention that conveys intimacy without requiring detailed facial rendering.\n\nWhen adapting these prompts, the setting swap is the highest-leverage change: move a beach portrait to a mountain peak or a city rooftop and the entire atmosphere transforms. For editorial couple concepts, describe clothing colour coordination explicitly—\"both in white linen against terracotta wall\" reads as intentional styling. Skin tone diversity in couple portraits sometimes needs explicit mention in Gemini to produce well-matched exposure across two subjects.",
    tips: [
      "Use the specific golden-hour descriptor: 'fifteen minutes before sunset, warm directional backlight'",
      "For intimate moments, describe posture over pose: 'foreheads touching', 'hand resting on shoulder'",
      "Specify clothing colour coordination for editorial shots: 'matching earth tones', 'white on white'",
      "Use f/1.8 or lower aperture descriptors to create natural subject isolation",
      "Mention the walking-away-from-camera convention explicitly when you want that cinematic composition",
    ],
  },
  sport: {
    guideText: "Sport prompts here lean heavily toward cinematic editorial: FIFA World Cup championship poster composites with stadium particle effects, Formula 1 driver promotional posters in full team livery, NFL gridiron hero composites with motion blur and stadium lighting, and athlete ascension posters using abstract paint motion fields. The collection blends sports photography with graphic design—many outputs are designed to function as finished promotional assets rather than raw action shots.\n\nCapturing movement convincingly in AI sport imagery depends on three elements: motion blur direction, body language, and light source drama. \"Explosive start from starting blocks, motion blur on trailing limbs, stadium floodlights from above and behind\" communicates all three simultaneously. High shutter speed descriptors (\"1/2000s freeze-frame\") produce sharp captures; panning motion language produces intentional blur. Stadium context—\"roaring crowd slightly out of focus in the background\", \"chalk dust rising from the court\"—adds scale without overwhelming the athlete subject.\n\nAdapting these prompts works best by swapping the sport and team references while keeping the compositional logic (low camera angle, dynamic body position, dramatic lighting). For a personalised athlete poster, insert a name into title text elements and specify the team colour palette. Results for multi-layer poster composites are more stable in Gemini than in DALL-E, which sometimes flattens the layered depth. Physical motion blur is one area where Midjourney often outperforms both for purely artistic treatments.",
    tips: [
      "Combine motion descriptor with camera speed: 'explosive jump, 1/2000s freeze, zero blur'",
      "Use low camera angles for drama: 'low-angle upshot, athlete filling two-thirds of frame'",
      "Add stadium context without overwhelming: 'blurred roaring crowd, chalk dust, court reflections'",
      "For poster designs, specify typography placement and team colour palette separately",
      "Name the sport and position for accurate body language: 'centre-forward receiving a through-ball'",
    ],
  },
  "nature-&-landscape": {
    guideText: "Landscape prompts in this collection favour cinematic adventure photography over static scenic shots: a hiker crossing a mountain river at dawn with teal-and-orange fog filling the valley, a traveller silhouetted at a dramatic mountain ridge at sunset, a redwood forest series with god-rays slanting through sequoias, and surreal mirrored mountain valley composites reflected on a still lake. The subjects are often humans placed within grand landscapes to convey scale and journey.\n\nThe atmospheric techniques that separate strong landscape outputs from generic ones are time-of-day specificity, weather condition, and foreground detail. \"Golden hour, backlit fog rolling through the valley, warm amber sky gradient above cool blue shadows\" establishes a specific light environment. \"Wildflowers in the immediate foreground, shallow depth of field, mountain range two kilometres behind\" gives the image the layered depth that makes landscape photography visually satisfying. Dramatic weather conditions—storm light, post-rain rainbow, snowstorm clearing—create instant visual interest that clear-sky shots rarely match.\n\nFor adapting these prompts, change the geographic terrain type first (alpine to coastal to desert) while keeping the time of day constant. Aspect ratio matters significantly for landscapes: 16:9 suits the panoramic convention, 4:5 better fits social media portrait orientation, and 21:9 is available for ultra-widescreen cinematic treatment. Gemini produces consistently strong landscape results; DALL-E sometimes struggles with accurate distant atmospheric haze, so add \"atmospheric perspective, distant mountains slightly hazy\" explicitly.",
    tips: [
      "Specify time of day AND weather together: 'golden hour, fog in the valley, clearing storm'",
      "Use foreground elements for depth: 'wildflowers, mossy rocks, shallow stream at camera level'",
      "Name the geographic terrain type: alpine, coastal cliff, red desert, boreal forest, tropical reef",
      "Aspect ratio changes the feel significantly: 16:9 for panoramic, 4:5 for social, 21:9 for cinematic",
      "Add 'atmospheric perspective' explicitly for distant mountains and hazy horizon lines",
    ],
  },
  "animals-&-wildlife": {
    guideText: "Wildlife prompts in this library combine natural habitat photography with more cinematic human-animal interaction scenes: a safari-style golden-savannah lion portrait with sunlight rays filtering through acacia, an eagle perched on a boat bow being hand-fed fish, a 3D cartoon animal group on a colourful studio background, and a comic-realism chase scene in a city street. The collection spans documentary wildlife, pet portraiture, and creative fantasy-animal compositions.\n\nCapturing convincing wildlife detail depends on lens simulation and environmental specificity. A 400mm telephoto lens descriptor produces the natural background compression and subject isolation characteristic of wildlife photography; a macro lens descriptor shifts the scale toward insect, amphibian, or reptile close-ups. For fur and feather rendering, phrases like \"ultra-detailed individual fur strands\", \"iridescent feather barb detail\", or \"wet coat sheen\" direct the model toward the textural depth that makes animal portraits feel real rather than illustrated.\n\nWhen adapting these prompts, specifying the species name precisely produces dramatically more accurate results than using genus or common descriptors alone—\"Siberian tiger\" over \"big cat\", \"Victoria crowned pigeon\" over \"exotic bird\". Light time and habitat together define the mood: \"polar bear on Arctic blue-ice at overcast midday\" versus \"polar bear in warm orange midnight sun\" are entirely different images. Gemini handles species variety and accurate anatomy well; results for very small or unusual species can drift toward plausible-but-incorrect morphology, so verify anatomy against a reference image.",
    tips: [
      "Use full species names for accuracy: 'Amur leopard' not 'exotic cat'",
      "Simulate lens type for perspective: '400mm telephoto' for wildlife, 'macro lens' for insects",
      "Specify fur and feather texture: 'individual fur strand detail', 'iridescent barb structure'",
      "Define habitat and light together: 'golden savannah grass, late afternoon backlighting'",
      "For cartoon or stylised animal prompts, name the style: '3D Pixar-style', 'comic realism'",
    ],
  },
  vehicles: {
    guideText: "Vehicle prompts here mix cinematic automotive photography with graphic poster design: a black compact SUV emerging through thick white smoke on wet asphalt with aggressive headlights glowing, a modified Nissan GT-R against stormy dystopian clouds, a Forza-concept Toyota Supra under cherry blossom drift, and a Cyber-Truck neon hyper-performance poster with blue underglow lights. The collection blends real-world car brands with fictional and futuristic transport concepts.\n\nThe technical variables that define automotive image quality are surface reflectivity, background environment, and shooting angle. Paint and surface descriptions determine the lighting behaviour: \"deep gloss black lacquer with pool-of-sky reflections\" responds very differently from \"matte carbon fibre with panel seam detail\" under the same studio lighting. Background choices signal context—wet urban asphalt at night with neon reflections reads as cinematic action; neutral grey studio sweep reads as commercial catalog. Shooting angle shapes the personality of any vehicle: low three-quarter front communicates aggression and power; high-angle overhead communicates design precision.\n\nAdapt these prompts by swapping the vehicle model and colour first, then adjusting the environment to match the intended use: editorial poster, studio catalog, or cinematic scene. Always verify that the aspect ratio fits the output use—4:5 for social, 16:9 for wallpaper, 3:2 for print. DALL-E can struggle with accurate panel gap geometry on specific car models; Gemini is generally more consistent with brand-recognisable proportions, though both benefit from adding \"correct proportions, accurate body panels\" explicitly.",
    tips: [
      "Describe paint finish specifically: 'deep gloss black lacquer', 'matte carbon fibre with seam detail'",
      "Choose shooting angle to set personality: 'low three-quarter front' for aggression, 'high angle' for design",
      "Set the environment to signal context: 'studio sweep' for catalog, 'wet urban night' for cinematic",
      "Add 'correct proportions, accurate body panels' to reduce geometry errors on real car brands",
      "Specify aspect ratio for end use: 4:5 for social media posts, 16:9 for wallpaper, 3:2 for print",
    ],
  },
  "digital-art": {
    guideText: "Digital art prompts here span a wide range of styles and intents: vaporwave retrowave city grids with magenta-and-cyan neon, glitch-fracture portraits where the face dissolves into pixel noise and neon fragments, abstract geometric light burst compositions, holographic crystal sculptures, and surreal melting-clock dreamscapes. Many prompts function as creative direction rather than strict instructions, leaving the model compositional latitude.\n\nThe visual techniques that define this category vary more dramatically than in photography-based categories. For glitch aesthetics, \"chromatic aberration shift on left half, pixel displacement on the face\" is the operative phrase. For vaporwave, \"pink and purple gradient sky, reflective grid plane, low-sun wireframe geometry\" establishes the genre instantly. For generative-style abstract work, describing mathematical or natural processes—\"fluid simulation pour of chrome paint\", \"Voronoi cell fracture pattern\"—steers the AI toward genuinely interesting compositions rather than generic abstract blobs.\n\nAdapting digital art prompts rewards experimentation more than other categories. Swapping the named art movement reference (vaporwave to Bauhaus to Art Nouveau) while keeping the colour palette often produces surprisingly coherent hybrid aesthetics. Colour palette specification is critical here—\"limited palette: black, deep crimson, bone white only\" forces restraint that elevates abstract outputs. Adobe Firefly handles pattern-based generative art well; Gemini produces stronger character-forward digital illustrations; Midjourney's stylisation often works best for pure aesthetic experiments.",
    tips: [
      "Name the art movement or aesthetic era: 'vaporwave', 'Bauhaus', 'Art Nouveau', 'glitch art'",
      "For glitch effects: 'chromatic aberration shift left, pixel displacement on face, scan line artifact'",
      "Specify colour palette rigidly for abstract work: 'black, crimson, bone white only'",
      "Describe process for generative looks: 'fluid simulation', 'Voronoi cell fracture', 'reaction-diffusion'",
      "Swap the art movement reference while keeping the palette for hybrid aesthetic experiments",
    ],
  },
  fashion: {
    guideText: "Fashion prompts here mix high-street editorial with conceptual styling: a glamorous woman in a glossy emerald satin bomber jacket on a bold urban street, post-apocalyptic tribal streetwear on a desolate plain, high-contrast monochrome studio editorials, and cinematic fashion campaign posters with layered backgrounds. The collection treats clothing as a primary visual subject alongside the model, rather than just a costume detail.\n\nThe visual techniques that elevate fashion AI output are fabric description, styling intent, and lighting match. Fabric behaves differently under the same light—\"glossy satin catches speculars as bright highlights\", \"matte jersey diffuses light evenly\", \"tulle layers scatter light softly\". Styling intent—\"high street editorial\", \"luxury campaign\", \"underground streetwear\"—frames the aesthetic register and helps the model choose appropriate poses and backgrounds. Lighting should match the setting: \"harsh side strobe for editorial drama\" works for a studio but not outdoors.\n\nAdapt fashion prompts by swapping the garment description first, then the environment—a streetwear look moves from a parking lot to a Tokyo alley by changing three words. Always describe footwear if the full body is in frame; it disproportionately affects fashion authenticity. Skin tone representation is an area where explicit specification helps—state ethnicity or skin tone descriptor to get consistent model representation. Both Gemini and DALL-E handle fashion well, but Gemini is more consistent at preserving complex garment texture across the full frame.",
    tips: [
      "Describe fabric behaviour, not just colour: 'glossy satin with specular highlights', 'matte jersey'",
      "State the styling intent: 'high street editorial', 'underground streetwear', 'luxury campaign'",
      "Include footwear when the full body is in frame—it anchors fashion authenticity",
      "Match lighting to the setting: 'harsh side strobe' for studio, 'golden street ambient' for outdoor",
      "Specify skin tone or ethnicity for consistent model representation across outputs",
    ],
  },
  food: {
    guideText: "Food photography prompts cover the full commercial spectrum: gourmet plated dishes with precise component placement, steaming ramen bowls with extreme close-up broth texture, beverage splash composites with coloured liquid arcs, luxury chocolate desserts under spot lighting, and minimalist organic salad plates on bleached wood surfaces. The production aesthetic varies from aspirational restaurant photography to editorial magazine-style hero shots.\n\nFood photography has a tighter set of visual conventions than most categories. Hero angle choice is fundamental: the 45-degree three-quarter angle is universal for complex dishes, flat lay (straight overhead) suits bowls and arranged plates, while a low near-table angle with shallow depth of field emphasises ingredient height. Steam and condensation are mood multipliers—\"visible steam wisps curling above the bowl\", \"condensation beading on a chilled glass\" add immediacy and appetite appeal. Colour palette consistency matters too: warm amber tones suit hearty or rustic dishes; cool white-and-green palettes suit fresh, healthy, or sushi-style presentations.\n\nAdapt these prompts by changing the dish type and its hero colour while keeping the lighting setup constant. The most common failure in food AI output is an unrealistic texture—specify surface materials explicitly: \"crisp caramelised crust\", \"glossy teriyaki lacquer\", \"matte dusted cocoa powder\". Gemini handles complex arranged dishes with good compositional stability; DALL-E sometimes adds extraneous elements. For beverage splash composites, Midjourney's motion rendering tends to be more dynamic than the other models.",
    tips: [
      "Choose hero angle deliberately: 45-degree for complex dishes, flat lay for bowls, low-angle for height",
      "Add steam or condensation for appetite appeal: 'visible steam wisps', 'condensation beads on glass'",
      "Match colour palette to the dish register: warm amber for hearty, cool white-green for fresh",
      "Describe surface texture in detail: 'crisp caramelised crust', 'glossy teriyaki lacquer', 'matte cocoa'",
      "Specify plate and surface material: 'matte black ceramic', 'bleached oak board', 'slate tile'",
    ],
  },
  travel: {
    guideText: "Travel prompts here cover a curated selection of aspirational destinations and travel experiences: Santorini white domes catching a misty golden sunrise, a Japanese cherry blossom river pagoda scene in soft spring light, a luxury desert adventure with camel caravans crossing wind-sculpted dunes, a tropical overwater villa with turquoise lagoon below, and a European fairytale village with cobblestone streets and flower-filled balconies. The prompts prioritise atmosphere over strict geographic accuracy.\n\nThe visual techniques that separate compelling travel photography from generic postcard shots are light quality, a sense of scale, and atmospheric depth. Golden hour provides warm directional light that picks out surface textures—cobblestone depth, water ripple detail, architectural relief carving. Atmospheric haze, mist, or morning fog add the layered depth planes that make a landscape feel three-dimensional rather than flat. Including a human figure at a distance or a single boat on the water establishes scale and invites the viewer into the scene rather than simply showing them a landmark.\n\nAdapting travel prompts works well with simple destination swaps—replace \"Santorini\" with \"Positano\" or \"Dubrovnik\" while keeping the time of day and atmosphere constant. Specify weather and season for each destination: \"spring cherry blossom mist\" and \"autumn golden maple overcast\" are entirely different visual registers even in the same location. Drone aerial view descriptors add a perspective that is often underused in this category. Gemini handles famous landmark accuracy well for major destinations; lesser-known locations may benefit from a more general descriptor.",
    tips: [
      "Include weather and season: 'misty spring morning', 'golden autumn afternoon', 'winter blue hour'",
      "Add atmospheric depth: 'morning mist in the valley', 'soft haze over the harbour'",
      "Use a human or small boat to establish scale in wide landscape shots",
      "Try aerial perspective: 'bird's eye view, 400m altitude, geometric patterns below'",
      "For lesser-known locations, use descriptive terms rather than relying on the place name alone",
    ],
  },
  "interior-design": {
    guideText: "Interior design prompts span residential and hospitality spaces: a Minimalist Japandi living room with low-profile furniture and warm oak accents, a Scandinavian bedroom retreat with linen bedding and morning window light, a contemporary luxury kitchen in matte black cabinetry with integrated brass hardware, a luxury hotel lobby with terrazzo floors and sculptural lighting fixtures, and an industrial loft workspace with exposed concrete ceilings and pendant Edison bulbs. Each prompt specifies materials, spatial layout, and lighting quality.\n\nLighting is the most influential single element in interior render quality. Daylight direction matters enormously—\"north-facing diffused daylight\" is softer and cooler than \"east-facing morning sun casting hard shadows across the floor\". Colour temperature describes warmth: \"2700K warm pendant lamps against cool natural daylight\" creates the layered interior light quality that feels lived-in rather than sterile. Material descriptions determine surface behaviour: \"quarter-sawn white oak\" has a linear grain pattern, \"book-matched Calacatta marble\" has symmetrical veining—these specifics prevent the model from defaulting to generic wood and stone textures.\n\nAdapt interior prompts by changing the design style label (Japandi to Biophilic to Art Deco) while keeping the spatial type constant, then update the material palette to match. For kitchen and bathroom renders, always include counter surface material and fixture finish—they read as the primary quality signals. Gemini handles large furniture arrangements and spatial flow well; adding \"accurate spatial perspective, architectural interior photography\" helps maintain believable proportions in both Gemini and DALL-E.",
    tips: [
      "Specify light direction and colour temperature: 'north-facing diffused daylight, 2700K warm pendants'",
      "Describe materials with grain or texture detail: 'quarter-sawn white oak', 'book-matched marble'",
      "Name the design style: Japandi, Biophilic, Art Deco, Scandinavian, Industrial, Mid-Century Modern",
      "Always include counter or surface material and fixture finish for kitchens and bathrooms",
      "Add 'architectural interior photography, accurate spatial perspective' to maintain room proportions",
    ],
  },
  cyberpunk: {
    guideText: "Cyberpunk prompts in this collection blend urban decay with high technology: a neon-drenched Tokyo-style rainy alley at 2 a.m. reflected in puddles, a cybernetic hacker at a holographic blue terminal interface under harsh strobe, a delivery hoverbike weaving through elevated highway traffic, and an augmented portrait where glowing circuits replace the iris. The genre's visual language depends heavily on the tension between advanced technology and run-down environments.\n\nThe signature visual techniques are neon-on-wet-surface reflections, technological body modifications, and environmental density. Neon reflections require both a light source description (\"magenta and cyan tube signs on the building facade\") and a surface to catch them (\"wet asphalt pavement at camera level, shallow puddle reflections\"). For cyborg character work, specific augmentation placement matters: \"chrome forearm replacement below the elbow\", \"neural jack port behind the left ear\", \"bioluminescent circuit traces along the jawline\"—generic \"cybernetic elements\" produces inconsistent results. Environmental density—layers of signage, cables, fire escapes—is part of the visual grammar.\n\nAdapt cyberpunk prompts by adjusting the decade register: near-future (2040s) looks clean and corporate; far-future (2200s) looks collapsed and improvised. Changing the neon colour palette shifts the mood—magenta-and-cyan reads classic cyberpunk; amber-and-green reads more biopunk or retro-futurist. Both Gemini and Midjourney handle neon cityscape rendering well; Gemini is more consistent with character-embedded augmentation detail.",
    tips: [
      "Pair neon light source with a reflective surface: 'magenta tube signs' + 'wet pavement puddles'",
      "Describe cybernetic augmentations by location and material: 'chrome forearm below elbow'",
      "Use environmental density descriptors: 'layers of signage, overhead cables, fire escape ladders'",
      "Adjust decade register: near-future (clean, corporate) vs. far-future (collapsed, improvised)",
      "Shift genre palette: magenta-cyan = classic cyberpunk, amber-green = biopunk/retro-futurist",
    ],
  },
  steampunk: {
    guideText: "Steampunk prompts cover the genre's central imagery: an intricate brass-and-copper steam locomotive chugging through a Victorian station with billowing white steam, a fearless airship captain on the deck of a colossal flying battleship above the clouds, a magnificent metropolis of polished brass and copper with towering clock towers and rotating gear facades, and a mechanically engineered owl with sapphire crystal eyes and exposed clockwork. All prompts share the genre's signature blend of Victorian aesthetic with fantastical engineering.\n\nThe material palette is the most distinctive visual element in steampunk: polished brass, antique bronze, weathered copper, riveted iron plate, frosted glass gauges, and dark-stained oak panelling. Every surface should carry visible evidence of craft and age—\"patina'd copper with green oxidation on the relief edges\", \"riveted iron hull plates with heat discolouration around the seams\". Lighting in steampunk scenes often comes from warm internal sources: \"amber gas lamp glow\", \"orange furnace light spilling from open furnace doors\", \"steam-lit backlighting from the boiler room\". These warm light sources should be explicitly named rather than implied.\n\nAdapt steampunk prompts by swapping the central engineering subject (locomotive to submarine to clockwork golem) while keeping the material palette and lighting character constant. The most common weakness in steampunk AI output is clean, modern-looking surfaces—counter this by adding \"aged, weathered, decades of use visible in the patina\" explicitly. Both Gemini and Midjourney handle the genre's material complexity well; DALL-E sometimes struggles with the dense mechanical detail of clockwork close-ups.",
    tips: [
      "Specify every surface material from the genre palette: brass, antique bronze, copper, riveted iron",
      "Add age markers explicitly: 'patina'd copper, green oxidation on relief edges, wear on rivet heads'",
      "Name warm internal light sources: 'amber gas lamp glow', 'orange furnace spill', 'boiler backlight'",
      "Include a Victorian character for scale and narrative in environment shots",
      "Counter smooth-surface drift by adding 'aged, weathered, decades of use visible in patina'",
    ],
  },
  mecha: {
    guideText: "Mecha prompts in this collection span tactical military hardware to anime-style warrior suits: a Tactical Armored Mech in a cavernous hangar bay with hydraulic servicing arms and technician figures for scale, a Mecha Dragon fusing organic draconic biology with mechanical components, a Mecha Samurai with layered folded-steel plate armour and glowing energy katanas, and a Mecha Guardian Titan towering above a city skyline in dramatic backlighting. Scale and engineering detail are the defining visual qualities.\n\nMecha design communicates through three interlocking elements: panel geometry, energy system visualisation, and scale. Panel geometry—\"asymmetric angular shoulder pylons\", \"stacked layered torso plates with recessed joints\", \"articulated knee actuator with piston detail\"—defines the mechanical character. Energy systems give the mech life: \"glowing blue energy conduit lines along the spine\", \"plasma exhaust vents on the calves venting teal light\". Scale is established by relationship: a hangar with human technicians, a city skyline, or an aircraft carrier docked beside the mech's ankle.\n\nAdapt these prompts by deciding the design school first—Japanese super-robot (chunky, expressive, colour-coded), Western military (angular, camouflage, functional), or organic-hybrid (partially biological, fused rather than bolted). Then swap the armament. For dramatic single-mech hero shots, use a low upward camera angle and a sky-heavy background to maximise the sense of towering scale. Both Gemini and Midjourney handle hard-surface mechanical design well; Midjourney's default stylisation often adds desirable cinematic quality without extra prompting.",
    tips: [
      "Specify panel geometry in detail: 'asymmetric angular shoulder pylons, layered torso plates'",
      "Describe energy systems explicitly: 'glowing blue conduit lines', 'plasma exhaust venting teal'",
      "Establish scale with a reference: human technicians, a city, or a docked aircraft carrier",
      "Choose your design school: Japanese super-robot, Western military, or organic-hybrid",
      "Use low upward camera angle and sky background to maximise the towering scale impression",
    ],
  },
  horror: {
    guideText: "Horror prompts here cover the genre's major registers: gothic architecture in perpetual overcast twilight with creaking gates, psychological unease in abandoned sanitarium corridors with peeling wallpaper and overturned wheelchairs, creature-feature silhouettes in dark forests with minimal moonlight, and supernatural tableaux in ordinary domestic settings made sinister by one wrong detail. The prompts prioritise atmospheric dread over explicit gore.\n\nThe visual techniques of effective horror AI imagery concentrate on shadow ratio, environmental decay markers, and the uncanny placement of familiar objects. High shadow ratio—a single hard light source throwing deep shadows across the majority of the frame—creates the chiaroscuro effect central to horror aesthetics. Decay markers (peeling paint, cracked plaster, water-stained ceiling, broken glass, rusted hinges) signal abandonment and age. The uncanny works by placing ordinary things in wrong contexts: a child's tricycle at the end of a dark hallway, a single lamp lit in an empty room.\n\nAdapt horror prompts by adjusting the register: gothic architecture, urban decay, and domestic uncanny each require different material palettes. The most effective single-line addition to any horror prompt is a specific light source in the dark—\"a single bare tungsten bulb hanging from a rusted chain\", \"green-tinged fluorescent hospital light flickering at one corner\". Results for atmospheric fog and shadow depth are strong in both Gemini and Midjourney. DALL-E tends to brighten horror scenes; add \"high contrast, deep shadow, very low key\" explicitly to counteract.",
    tips: [
      "Use a single hard light source in darkness for chiaroscuro: 'bare tungsten bulb on rusted chain'",
      "Add decay markers to set the environment: 'peeling paint, cracked plaster, water-stained ceiling'",
      "Place ordinary objects in wrong contexts for uncanny effect: 'child's toy at end of a dark corridor'",
      "Specify 'high contrast, deep shadow, very low key' to prevent AI models from brightening the scene",
      "Choose a register and match materials: gothic (stone, iron, candles) vs. domestic uncanny (wallpaper, linoleum)",
    ],
  },
  surreal: {
    guideText: "Surreal prompts here draw on the genre's classic iconography while pushing into original territory: grassy floating islands with waterfalls pouring into clouds below, a marble staircase ascending toward a gigantic glowing moon with waterfalls cascading upward against gravity, an ocean suspended above the sky with whales swimming overhead while boats float below, an enormous clock face emerging from a forest like a tree, and a mirror dimension where an upside-down city hangs beneath a reflective glass plain. The prompts prize logical impossibility over random chaos.\n\nEffective surreal imagery works because it applies consistent internal logic to physically impossible scenarios. The ocean-in-the-sky works because the water surface behaves naturally, the fish swim normally, and the viewer's perspective simply happens to be inverted. This \"one rule change\" approach is more visually compelling than piling multiple physics violations together. Lighting in surreal scenes should often behave normally even when geometry does not—realistic light direction on an impossible object is what makes it feel genuinely uncanny rather than simply broken.\n\nAdapt surreal prompts by choosing a single physical property to violate and keeping everything else consistent: gravity, scale, material state (solid/liquid), or temporal direction. Specifying a colour palette helps maintain the dreamlike quality—\"desaturated muted palette except for one vivid scarlet element\" forces the viewer's eye where you intend. Both Gemini and Midjourney excel at surreal concepts; for photorealistic surreal composites, Gemini's accuracy of real-world object rendering creates more convincing impossible scenes.",
    tips: [
      "Violate one physical rule, not many—'gravity inverted for water only' beats 'everything is wrong'",
      "Keep lighting realistic even when geometry is impossible—it creates genuine uncanny tension",
      "Limit your palette: 'muted grey-blue except one vivid scarlet element' for dreamlike focus",
      "Use a scale violation for immediate visual impact: 'enormous moon filling half the sky'",
      "Describe the scene from a grounded viewer's perspective even as the world around them defies physics",
    ],
  },
  minimalist: {
    guideText: "Minimalist prompts in this collection focus on the power of reduction: a solitary tree in a white negative space composition with no visible horizon line, a Japandi luxury living room with low furniture and a single ceramic vase, a product shot of a single item on a matte surface with deliberately restrained shadow, and a fashion portrait of one figure in a neutral tone on a flat-white background. Every prompt removes rather than adds.\n\nThe visual grammar of minimalist AI imagery is governed by negative space ratio, colour restraint, and compositional geometry. Negative space should exceed the subject in area—\"subject occupying twenty percent of the frame, surrounded by clean white space\" is a useful directive. Colour restraint means a maximum of two or three related tones: \"off-white, warm sand, and a single dusty rose accent\" or \"monochrome greyscale only\". Geometric precision matters—edges should be intentional, shadows should be controlled (one direction, consistent angle), and any element should be aligned to a visible invisible grid.\n\nAdapt minimalist prompts by identifying the one element you want to feature and removing everything else from the description. The most common failure in minimalist AI output is unwanted background detail; use \"perfectly clean background, no texture, no shadow except controlled soft shadow below subject\" to suppress it. Aspect ratio choices are more deliberate here: square format (1:1) emphasises symmetry; portrait format (4:5) emphasises height and isolation. Both Gemini and DALL-E handle minimalist compositions well, though DALL-E sometimes adds subtle background gradients that require suppression.",
    tips: [
      "Specify negative space ratio: 'subject in twenty percent of frame, clean white space surrounding'",
      "Limit colour palette rigidly: 'off-white, warm sand, single dusty rose accent only'",
      "Control shadows explicitly: 'soft shadow below only, consistent angle, no other shadows'",
      "Suppress background detail: 'perfectly clean background, no texture, no additional elements'",
      "Square format emphasises symmetry; portrait format emphasises isolation—choose deliberately",
    ],
  },
  luxury: {
    guideText: "Luxury prompts span aspirational lifestyle categories: a gold chronograph watch on a polished ebony surface under a single spotlight with specular highlights on the case, a penthouse architectural visualisation with floor-to-ceiling glass overlooking a city at night, a billionaire lifestyle editorial portrait in tailored clothing against a marble interior, a private yacht at sunset on open ocean, and a diamond necklace advertisement with macro jewel detail. Each prompt centres on high material quality and controlled, deliberate staging.\n\nThe visual language of luxury communicates through material specificity, restraint, and lighting quality. Materials that read as high-end in AI output include \"hand-applied gold leaf\", \"matched bookend Calacatta marble\", \"hand-stitched nappa leather\", \"cold-pressed champagne satin\". Restraint is as important as richness—a single beautiful object with room to breathe is more convincing than a crowded frame. Lighting should be deliberate and directional: \"single overhead spot with clean circular specular on the watch crystal\" or \"soft fill from a north window with one warm table lamp\".\n\nAdapt luxury prompts by swapping the central object while keeping the staging logic constant. The background material conveys the brand tier: dark polished granite reads as masculine menswear; blush marble reads as beauty and jewellery; brushed gold and navy reads as watchmaking. Both Gemini and DALL-E handle jewellery and surface material texture well at the same prompt complexity. For interior architectural luxury—penthouse views, hotel lobbies—Gemini's spatial accuracy tends to produce more believable proportions, which is critical for high-end real estate contexts.",
    tips: [
      "Name every material at a specific level: 'hand-applied gold leaf', 'matched Calacatta marble bookend'",
      "Use restraint: one beautiful object with breathing room beats a crowded luxury tableau",
      "Specify light as a single deliberate source: 'single overhead spot, circular specular on the watch face'",
      "Match background material to the brand tier: dark granite (menswear), blush marble (beauty/jewels)",
      "For jewellery macro, add 'extreme close-up macro lens, gem facet detail, light refraction inside stone'",
    ],
  },
  wedding: {
    guideText: "Wedding prompts here cover the genre's full emotional range: a rustic wooden arch draped in white roses and eucalyptus leaves on an outdoor lawn at golden hour, a royal European palace ceremony with a cathedral-length veil, a dreamy beach sunset where a couple walks hand-in-hand along the shoreline, an Indian bride in a deep red heavily embroidered lehenga in a double-exposure collage, and a South Indian bridal portrait in a blush-pink kanjivaram silk saree with temple jewellery. The collection is notably diverse in cultural aesthetic.\n\nWedding photography's visual conventions are built around romantic light quality and depth of field choices. Golden hour and the few minutes of blue hour after sunset provide the warm directional light that makes skin glow and floral colours saturate naturally. Shallow depth of field (f/1.8 or f/2.0) separates the couple from background reception detail, creating intimacy. For detail shots—floral arch close-up, ring, bridal jewellery—macro lens descriptors and controlled spot lighting give the images the crisp elegance that catalogue wedding photography demands.\n\nFor adapting wedding prompts, cultural specificity gives the most distinctive outputs: specify the garment name, regional style, and jewellery tradition rather than using generic \"traditional\" descriptors. Environmental substitutions work well—move a beach ceremony to a vineyard or a mountain meadow by changing three words. Results for flowing fabric in movement (veil, dupatta, train) vary: Gemini handles fabric motion with relative accuracy. DALL-E produces well-composed wedding scenes but can default to Western aesthetic unless a cultural style is explicitly named.",
    tips: [
      "Name cultural garment and style specifically: 'red zari-embroidered lehenga', 'kanjivaram silk saree'",
      "Use golden hour for outdoor ceremonies and blue hour for post-ceremony romantic portraits",
      "Specify f/1.8 or f/2.0 for subject isolation; macro for ring, jewellery, and floral detail shots",
      "Describe the setting with season and time: 'late summer vineyard, golden light through the vines'",
      "For fabric in motion (veil, train), add 'flowing naturally in a gentle breeze, backlit' for best results",
    ],
  },
  "logo-design": {
    guideText: "Logo design prompts in this library cover the key commercial categories: a minimalist bird symbol in negative-space vector geometry, a lion head brandmark with Art Deco geometric structure, a futuristic AI technology logo with flowing circuit-line letterforms, an elegant coffee brand mark combining a cup silhouette and leaf elements, and a pixel art logo transformation sequence. The collection ranges from flat minimalist marks to more elaborate emblem-style treatments.\n\nLogo AI generation has specific technical requirements that differ from other image categories. White or transparent backgrounds isolate the mark for evaluation; vector-style descriptions (\"flat geometric\", \"clean outline\", \"negative space\") prevent the model from adding photorealistic textures to what should be graphic elements. Colour palette discipline is essential—a wordmark or brandmark reads as professional when limited to one or two colours. Requesting \"isolated on white background, vector style\" in every prompt prevents common failure modes like gradient-filled letter strokes or complex textured backgrounds.\n\nAdapt logo prompts by specifying the industry or brand personality first—\"outdoor adventure brand\" signals earthy tones and organic shapes, \"tech startup\" signals blue-grey and geometric precision, \"artisan bakery\" signals warm amber and hand-drawn qualities. Always test the concept in both a dark-background and white-background version. Logo generation works best as a conceptual starting point; the output rarely has the mathematical precision needed for production files, so treat AI logo prompts as a fast way to explore directions rather than generate final assets.",
    tips: [
      "Always include 'isolated on white background, flat vector style' to get a clean graphic output",
      "Limit to one or two colours explicitly: 'monochrome black on white' or 'navy and sand only'",
      "State the industry for automatic style alignment: 'outdoor adventure', 'tech startup', 'artisan bakery'",
      "Request both dark-background and light-background versions for versatility",
      "Treat outputs as directional concepts, not production files—AI rarely achieves vector precision",
    ],
  },
  "poster-design": {
    guideText: "Poster design prompts here treat the output as a finished print or social-media asset: a retro Bauhaus-style event poster with geometric shapes in a restricted primary palette, a futuristic action movie poster with motion-blur hero figure against an explosive backdrop, a luxury fashion advertising poster with high-contrast negative space and serif typography placeholder, a modern music concert poster with layered photographic and illustrated elements, and a Maldives travel poster with aerial lagoon photography and clean headline layout.\n\nPoster design requires thinking in visual hierarchy: a dominant hero element (the image or headline), a secondary supporting element (subheading, date, venue), and environmental background. AI poster prompts work best when they specify the hierarchy relationship explicitly—\"large central subject occupying 70% of height, small supporting text at bottom third\". Typography style is a significant variable: \"Bauhaus geometric sans-serif\", \"Art Deco serif with gold inline\", \"condensed grotesque bold\" each carry strong genre associations and help the model choose proportions that fit the style.\n\nAdapt poster prompts by swapping subject content and occasion while retaining the compositional structure. Aspect ratio matters more here than in other categories—portrait format for print, 4:5 for Instagram, 9:16 for Story format. Add a colour palette as a constraint: \"restricted palette: black, off-white, signal red only\" produces the focused graphic impact that multicolour palettes dilute. Both Gemini and DALL-E produce strong poster compositions; DALL-E handles typography placeholder layout more consistently.",
    tips: [
      "Define visual hierarchy: 'subject in 70% of frame height, supporting text in bottom third'",
      "Name typography style: 'Bauhaus geometric sans', 'Art Deco serif with inline', 'condensed grotesque bold'",
      "Specify aspect ratio for intended use: portrait for print, 4:5 for Instagram, 9:16 for Story",
      "Constrain the colour palette: 'black, off-white, signal red only' for focused graphic impact",
      "Use design movement references as style anchors: Bauhaus, Art Deco, Swiss International Style",
    ],
  },
  characters: {
    guideText: "Character design prompts in this collection cover the full range from gaming concept art to franchise-ready character sheets: a concept art knight in layered gothic plate armour with a glowing runic sword, a sci-fi pilot in tactical pressure suit with a custom helmet HUD, a magical wizard with a staff and pouch-covered robes with a familiar perched on the shoulder, and full-turnaround reference sheet requests for game-ready character assets. The prompts are structured to produce reference-quality design proposals.\n\nCharacter design works visually through costume complexity, silhouette readability, and colour-coding the character's role. Silhouette is the most important variable—a hero should have a distinct readable outline at thumbnail size. Costume complexity signals character background: a warrior accumulates battle scars and field repairs; a court mage has ceremonial embroidery and impractical flourishes. Colour-coding is practical: assigning a hero's primary hue (royal blue, war crimson) and a villain's contrasting accent immediately communicates allegiance without text.\n\nAdapt character prompts by locking three defining characteristics first (silhouette shape, primary colour, role symbol) and then layering costume detail on top. For turnaround sheets, request \"front view, 3/4 view, side view, back view on white background\" and specify that all views must show the same character with consistent proportions. Results for highly detailed armour with inlaid decoration vary between models—Gemini's spatial consistency makes it more reliable for full-body reference sheets, while Midjourney's default stylisation often produces more atmospheric single-hero portraits.",
    tips: [
      "Design the silhouette first—it should be readable at thumbnail size before adding detail",
      "Colour-code by role: hero (primary warm hue), villain (cold desaturated contrast), support (neutral)",
      "Layer costume complexity to signal backstory: field repairs for a warrior, ceremonial trim for a mage",
      "For turnaround sheets: 'front, 3/4, side, back views, white background, consistent proportions'",
      "Name a weapon or prop with material detail: 'runic iron longsword with etched glowing sigils'",
    ],
  },
  mythology: {
    guideText: "Mythology prompts draw from multiple traditions: the Norse pantheon (Odin enthroned in Valhalla with ravens circling, the Bifrost bridge arching to golden gates), Greek mythology (Zeus commanding storm lightning over Olympus, Poseidon rising from the ocean with trident), Egyptian iconography (Anubis standing guard at a temple entrance with torch-lit hieroglyphics behind), and the phoenix archetype (rising from golden fire in dramatic updraft). The prompts capture the epic register that mythology requires.\n\nMythological imagery relies on architectural grandeur, divine light, and symbolic object specificity. Scale is fundamental—gods should dwarf their surroundings or at minimum command them through pose and implied power. Divine light sources (celestial rays breaking through cloud banks, bioluminescent aura emanating from the deity's form, golden nimbus) are genre conventions that instantly signal godhood. Symbolic objects need material precision: \"Odin's spear Gungnir with runic engravings along the ash shaft\", \"the golden scales of Anubis with precise balance pans holding a feather and a heart\".\n\nAdapt mythology prompts by choosing the cultural tradition first and matching the visual aesthetic—Greek mythology favours marble architecture and azure skies, Norse mythology favours dark stone, icy landscapes, and torchlight, Egyptian mythology favours golden desert light and hieroglyphic stonework. AI models have broad training on the major pantheons; for less common traditions (Aztec, Yoruba, Hindu), use specific deity names and iconographic symbols rather than relying on the model's general knowledge.",
    tips: [
      "Choose the cultural tradition first and match its visual aesthetic: marble for Greek, dark stone for Norse",
      "Establish divine scale: 'the god towers above the temple's tallest column'",
      "Name symbolic objects with material precision: 'Gungnir, ash-wood shaft with runic engravings'",
      "Use divine light conventions: 'celestial ray breaking through stormclouds', 'golden nimbus around the head'",
      "For less-common pantheons, use specific deity names and iconographic symbols rather than general terms",
    ],
  },
  space: {
    guideText: "Space prompts here range from hard science-inspired imagery to cinematic speculative fiction: a deep-space nebula with glowing gas clouds of violet, cyan, and magenta surrounding millions of sparkling stars, a lone astronaut on an alien cliff edge overlooking a ringed gas giant filling the sky, a colossal space station orbiting a blue giant with thousands of illuminated windows and docking craft, a bioluminescent alien planet with floating mountains and crystal rivers, and a starship fleet in hyperspace with warp trails stretching across deep space. The collection spans NASA-referencing realism and full science-fiction spectacle.\n\nSpace imagery's visual quality depends on scale communication, lighting source logic, and atmospheric depth. Stars don't fill a single focal plane—a convincing starfield has multiple layers of brightness and focus to convey astronomical depth. Nebula colours need light-source logic: \"magenta hydrogen-alpha emission against dark molecular cloud\" is more accurate than random colour choices and produces more astrophotography-credible results. Scale is communicated by relationship: the astronaut's visor reflecting the ringed planet tells the viewer more about scale than any size specification can.\n\nAdapt space prompts by choosing between astrophotography realism and cinematic spectacle, then adjusting the colour palette accordingly—real nebulae tend toward red-orange (hydrogen) and blue-green (oxygen), while cinematic sci-fi uses more saturated and varied palettes. Add \"NASA Hubble style astrophotography\" to steer the output toward realism. Both Gemini and DALL-E handle space scenes reliably; Midjourney's default stylisation adds cinematic drama without extra effort, making it a strong choice for atmospheric spectacle shots.",
    tips: [
      "Layer the starfield: multiple brightness levels simulate astronomical depth better than flat stars",
      "Give nebulae logical light sources: 'hydrogen-alpha magenta emission nebula, dark molecular cloud edges'",
      "Communicate scale through relationship: astronaut helmet visor reflecting the planet above",
      "Specify register: 'Hubble astrophotography style' for realism, 'cinematic sci-fi blockbuster' for spectacle",
      "Use 'Unreal Engine 5 render quality' to push toward photorealistic volumetric space atmosphere",
    ],
  },
  vintage: {
    guideText: "Vintage prompts capture specific historical aesthetics across different eras: a 1970s Polaroid-style beach day group snapshot with faded warm colours and authentic film vignetting, a 1940s gentleman portrait beside a polished vintage automobile on rain-soaked cobblestones, a 1950s European town scene with bicycles and retro cafe awnings, a 1930s Art Deco living room with brass chandeliers and Persian carpets, and a 1920s steam train passing through countryside at sunrise. Each prompt anchors firmly in a specific decade's visual grammar.\n\nThe technical variables that create convincing vintage aesthetics are film grain type, colour shift, and contrast curve. 1920s to 1940s output benefits from sepia or orthochromatic toning, heavy grain, and low colour saturation. 1950s to 1960s colour photography uses warm red shifts in the shadows and slightly faded highlights. 1970s film stock has a characteristic orange-yellow skin tone bias and visible grain at moderate ISO. 1980s and 1990s imagery often features slightly oversaturated colours and the specific hot pink-magenta balance of early chromogenic prints.\n\nAdapt vintage prompts by specifying the decade and then the camera technology of that era—\"Polaroid OneStep, 1978\", \"35mm Kodak Portra 400, 1992\", \"glass plate wet collodion, 1880\". This double-specification (decade plus camera type) narrows the aesthetic much more precisely than either alone. Both Gemini and DALL-E handle the major era aesthetics from the 1920s onward; very early photography (daguerreotype, wet plate) can be inconsistent and benefits from explicit process naming.",
    tips: [
      "Specify both decade and camera technology: 'Polaroid OneStep 1978', '35mm Kodak Portra 400 1992'",
      "Add the film stock's characteristic colour bias for each era: orange-yellow for 1970s, red-shadow for 1950s",
      "Use grain descriptors at the era-appropriate level: 'fine grain 1950s' vs. 'visible 1970s ISO grain'",
      "Include period-accurate props and wardrobe as supporting details rather than the main subject",
      "For very early photography, name the process explicitly: 'daguerreotype silver plate', 'wet collodion glass'",
    ],
  },
};

// Build the TypeScript file content
let guidesTS = "\nexport const CATEGORY_GUIDES: Record<string, { guideText: string; tips: string[] }> = {\n";

for (const [slug, data] of Object.entries(GUIDES)) {
  // Escape backticks, backslashes, and ${ that might cause template literal issues
  const escapedGuide = JSON.stringify(data.guideText);
  const tipsArr = data.tips.map((t) => `    ${JSON.stringify(t)}`).join(",\n");
  guidesTS += `  ${JSON.stringify(slug)}: {\n`;
  guidesTS += `    guideText: ${escapedGuide},\n`;
  guidesTS += `    tips: [\n${tipsArr},\n    ],\n`;
  guidesTS += `  },\n`;
}

guidesTS += "};\n";

const fullContent = CATEGORY_DESCRIPTIONS + guidesTS;

writeFileSync(new URL("../src/data/category-descriptions.ts", import.meta.url), fullContent, "utf8");
console.log("category-descriptions.ts written successfully");
console.log(`Total entries: ${Object.keys(GUIDES).length} categories`);
