const fs = require('fs');
const path = require('path');

const prompts50Path = path.join(__dirname, 'indexable-50.json');
const prompts50 = JSON.parse(fs.readFileSync(prompts50Path, 'utf-8'));

// Detailed, high-value editorial notes written directly from the specific prompt content
const NOTES_MAP = {
  // 1. Animals & Wildlife: Golden Ride
  "golden-ride-cinematic-vintage-scooter-journey-with-playful-wildlife-companions-gbsrn": {
    whyItWorks: "This prompt succeeds through its strong focal anchor—a vintage Italian scooter—combined with dynamic animal motion and directional golden-hour illumination. By specifying warm rim lighting and dust particles suspended in air, it guides the diffusion model to establish tangible atmospheric depth rather than a flat cutout composite.",
    variationGuide: "To vary this composition, substitute the vintage Vespa with an open-top retro safari Land Cruiser or a wooden river skiff. You can also shift the time of day from golden dusk to misty early dawn, which changes the volumetric lighting from amber rays into cool blue-grey haze.",
    failureModes: "AI models frequently struggle with anatomical scale when placing multiple wildlife species together. A common failure is the tiger or companion animals appearing unnaturally small or morphing directly into the scooter chassis. Adding 'distinct subject separation' and 'realistic animal scale' prevents spatial blending.",
    exampleTweak: "Replace 'warm golden sunset lighting' with 'crisp morning mountain mist, soft diffused backlight, 35mm documentary film grain'."
  },

  // 2. Anime: Champion of Legends
  "champion-of-legends-the-pokmon-ascension-poster-gqiak": {
    whyItWorks: "The vertical multi-tiered poster layout creates an unmistakable anime movie key visual aesthetic. By anchoring the central protagonist in a triumphant pose and framing them with elemental energy swirls, floating dust motes, and iconic silhouette creatures, the prompt enforces clear compositional hierarchy from foreground to distant sky.",
    variationGuide: "You can repurpose this structure for any fantasy shonen anime concept. Swap the creatures for mythical guardian spirits, mecha familiars, or cybernetic summons. Adjusting the primary energy color from electric cyan to crimson dragon fire will dramatically shift the visual tension.",
    failureModes: "When generating multiple anime creatures on one canvas, models often blend facial features or spawn extra limbs on smaller background summons. If this happens, reduce the prompt's background character count to two prominent partners and specify 'clean cel-shaded line art with sharp edge definition'.",
    exampleTweak: "Change the central aura instruction to: 'radiant violet astral lightning swirling upward from the trainer's gloves, illuminating the surrounding shadows with vivid magenta rim light'."
  },

  // 3. Architecture: Blueprint of Chaos
  "blueprint-of-chaos-architectural-grunge-portrait-avtl3": {
    whyItWorks: "The contrast between precise drafting linework (cyanotype blueprints, technical grid lines, elevation measurements) and distressed tactile grunge textures (ink splatters, distressed concrete) gives this prompt an industrial fine-art edge. The architectural geometric overlays naturally frame the subject's portrait without cluttering the face.",
    variationGuide: "Exchange modern skyscraper blueprints for Gothic cathedral cross-sections, classical Vitruvian proportions, or nautical ship schematics. You can also alter the color balance from cyanotype blue to sepia drafting parchment with charcoal sketch overlays.",
    failureModes: "Models often attempt to render illegible, garbled text strings across the drafting blueprint. To keep the technical elements clean and abstract, specify 'schematic drafting diagrams and geometric grid lines without alphanumeric lettering'.",
    exampleTweak: "Add 'heavy impasto oil texture intersecting drafting compass circles, monochrome charcoal and graphite palette with sharp white contour highlights'."
  },

  // 4. Characters: Luxury Baby Birthday Collage
  "luxury-baby-birthday-collage-design-binn0": {
    whyItWorks: "This prompt relies on soft editorial pastel tonality, balanced negative space, and studio softbox diffusion. The combination of gentle champagne balloons, muted floral accents, and subtle torn-paper border framing creates a polished high-end keepsake aesthetic rather than a noisy cartoon greeting card.",
    variationGuide: "Shift the celebratory theme from neutral ivory and gold to an enchanted forest concept with sage green linen, botanical fern garlands, and rustic wooden textures. Swap the studio backdrop for an outdoor golden-hour garden picnic setting.",
    failureModes: "Baby portraits in diffusion generators frequently suffer from plastic skin smoothing or unnatural porcelain eye reflections. Ensure you keep 'natural baby skin texture, authentic soft daylight, gentle studio catchlights, no plastic airbrushing' active in your parameters.",
    exampleTweak: "Adjust the palette to 'warm terracotta, oat beige linen textures, dried eucalyptus sprigs, and natural window daylight with soft falloff'."
  },

  // 5. Cinematic: Fragments of a Man
  "fragments-of-a-man-1uvzb": {
    whyItWorks: "This prompt produces exceptional depth by combining double-exposure film techniques with chiaroscuro lighting. The interplay between an intimate character close-up and a wide urban or natural panorama inside the silhouette allows the AI to tell a complex narrative in a single 9:16 vertical frame.",
    variationGuide: "Swap the internal urban city skyline for a stormy coastal cliff, a solitary lighthouse in ocean fog, or a burning pine forest. Switching the lighting from cool tungsten blue to warm amber neon completely shifts the emotional tone from loneliness to anticipation.",
    failureModes: "The secondary exposure can easily bleed into the subject's facial features, obscuring facial expressions and rendering the eyes indistinct. Counter this by emphasizing 'face and eyes remaining razor-sharp in foreground with secondary landscape exposure restricted to silhouette body contours'.",
    exampleTweak: "Modify the exposure overlay: 'inner silhouette contains an aerial view of a winding desert highway at twilight with glowing car taillights tracing long exposure lines'."
  },

  // 6. Couple: Two hearts, one shoelace
  "two-hearts-one-shoelace-kdynr": {
    whyItWorks: "Focusing on a micro-narrative gesture—kneeling on the pavement to tie a partner's shoelace—grounds the composition in believable emotion. The low-angle 35mm perspective draws viewer attention to the hands and footwear while the city street gently blurs into rich cinematic anamorphic bokeh behind them.",
    variationGuide: "Move the setting from a wet metropolitan crosswalk to an autumn park trail with fallen amber maple leaves, or an outdoor train platform under warm evening station lamps. You can also adjust the wardrobe from casual streetwear to tailored wool overcoats.",
    failureModes: "Depicting intertwined hands and footwear is notoriously prone to malformed fingers or mismatched shoelace geometry. Keep the camera distance at a medium shot rather than extreme macro, and specify 'physically accurate hand anatomy resting naturally on leather sneaker'.",
    exampleTweak: "Add 'rain-slicked cobblestone street reflecting neon shop signs, gentle puddle reflections, soft atmospheric mist illuminated by street lamps'."
  },

  // 7. Cyberpunk: Android Assassin
  "android-assassin-rgzwk": {
    whyItWorks: "The contrast between sleek polished synthetic obsidian chassis panels and glowing exposed fiber-optic circuitry gives the android instant tactile realism. Rain-soaked neon backlighting creates vivid specular highlights along the metallic jawline and synthetic shoulders.",
    variationGuide: "Change the stealth operative archetype to a dismantled android repair bay scene or a diplomatic corporate envoy in a high-rise neo-Tokyo boardroom. Substitute violet and cyan neon for monochromatic amber sodium-vapor street lighting.",
    failureModes: "AI generators often add excessive chaotic wires that obscure the character's humanoid silhouette. Counteract this clutter by specifying 'clean industrial seams, matte ceramic plating, and recessed internal wiring'.",
    exampleTweak: "Add 'rain droplets beading on polished carbon-fiber armor, glowing orange thermal optic visor, vertical 9:16 telephoto framing, f/2.0 aperture'."
  },

  // 8. Digital Art: Fading Into Light
  "fading-into-light-cinematic-disintegration-portrait-in-golden-crescent-aura-ru9wn": {
    whyItWorks: "This prompt excels because it balances a serene, high-detail facial expression with a dynamic particle disintegration effect. The golden crescent aura provides a geometric anchor that prevents the disintegrating light motes from feeling like random digital noise.",
    variationGuide: "Swap the golden celestial aura for an eclipse ring or crystalline geometric prism. Transition the disintegration particles from golden embers into iridescent butterfly silhouettes or floating ink drops.",
    failureModes: "The disintegration effect often encroaches too aggressively onto the primary subject's eyes or nose, destroying the emotional focus. Keep the leading half of the face untouched while directing the dissipation toward the rear silhouette.",
    exampleTweak: "Shift the visual effect to 'lapis lazuli blue and liquid silver particles dissolving outward, backlit by a minimalist silver halo against dark velvet'."
  },

  // 9. Family: Timeless Legacy
  "timeless-legacy-lowkey-black-white-family-sideprofile-portrait-a8zu2": {
    whyItWorks: "The low-key multi-generational profile arrangement creates a striking lineage study. By using single-source directional key lighting, it emphasizes the shared facial geometry across generations while keeping distracting clothing and backgrounds submerged in deep shadow.",
    variationGuide: "Experiment with mother-and-daughter or grandfather-and-grandson pairings. You can also transition from pure studio black-and-white to warm monochromatic sepia with delicate analog medium-format film grain.",
    failureModes: "Generators frequently overlap multiple heads awkwardly or merge ear and hair boundaries when stacking profile portraits horizontally. Specifying 'distinct staggered horizontal spacing with clear silhouette separation' keeps each profile crisp.",
    exampleTweak: "Add 'Hasselblad 120mm portrait lens, Kodak Tri-X 400 film profile, deep velvety blacks with subtle hair light separation on each generation'."
  },

  // 10. Fantasy: Dragonzord Vanguard
  "dragonzord-vanguard-the-green-rangers-last-stand-8v83a": {
    whyItWorks: "This prompt blends cinematic scale with tactical kaiju nostalgia. Grounding the human warrior on a fractured cliff in the foreground while the colossal mechanoid towers through thunderous storm clouds establishes dramatic proportional contrast.",
    variationGuide: "Swap the mech aesthetic for an ancient bio-organic leviathan or crystalline titan. Change the environment from a lightning-torn volcanic ridge to a frozen arctic fjord where the beast emerges beneath cracked ice.",
    failureModes: "The scale disparity often causes the AI to omit the human foreground pilot completely or render the giant mech with cartoonish plastic toy materials. Insist on 'monolithic scale contrast, weathered battle-damaged metal plating, and heavy volumetric rain'.",
    exampleTweak: "Add 'flashes of emerald lightning illuminating weathered titanium armor with hydraulic steam venting from shoulder exhaust ports'."
  },

  // 11. Fashion: Elegant Autumn Fashion Portrait
  "elegant-autumn-fashion-portrait-rpjcp": {
    whyItWorks: "Rich organic textures—cable-knit cashmere, brushed wool overcoats, and crisp fallen foliage—harmonize effortlessly with overcast autumnal daylight. The 85mm f/1.8 lens setting produces a soft, creamy background bokeh that highlights fabric weave and stitching.",
    variationGuide: "Transform the mood to high-fashion winter editorial by exchanging camel tones for charcoal and houndstooth, adding light snowfall and frosty breath vapor. Alternatively, shift to spring trench coats with blossoming magnolia branches.",
    failureModes: "Knitwear can sometimes render as smooth muddy plastic if prompts lack micro-texture descriptors. Including 'tactile cashmere wool knit, visible fabric grain, and sharp eye catchlights' guarantees high tactile fidelity.",
    exampleTweak: "Replace camel coat with 'emerald-green heavy wool trench coat paired with a cream turtleneck sweater, holding an umbrella in gentle drizzle'."
  },

  // 12. Food: Gourmet Steak Dinner
  "gourmet-steak-dinner-rf6lq": {
    whyItWorks: "Commercial culinary photography requires precise lighting to look appetizing. This prompt pairs warm directional side lighting with glistening sear marks, melting compound butter, and wisps of rising steam, triggering sensory appeal and depth.",
    variationGuide: "Repurpose the tabletop setup for seared salmon with dill butter on slate, or braised lamb shank with rosemary reduction over polenta. Adjust the background from an intimate candlelit bistro to bright Scandinavian marble daylight.",
    failureModes: "Food prompts often generate unnaturally smooth or rubbery meat surfaces. To keep the sear realistic, emphasize 'caramelized crust texture, visible pink medium-rare interior fibers, and crystalline sea salt flakes'.",
    exampleTweak: "Add 'macro 100mm lens angle, caramelized garlic cloves and roasted thyme sprigs sizzling in browned pan juices on a dark cast-iron skillet'."
  },

  // 13. Horror: The Ghost Ship
  "the-ghost-ship-ldc6g": {
    whyItWorks: "Atmospheric dread is generated through silhouette, negative space, and volumetric fog. By keeping the rotting galleon partially obscured within ocean mist and illuminated solely by cold bioluminescent sea foam, the prompt invites the viewer's imagination to fill in the dark details.",
    variationGuide: "Adapt the nautical curse into a derelict deep-space freighter adrift in asteroid debris, or a Victorian steam locomotive stalled in an eerie mountain tunnel. Shift the lighting from cold green phosphorescence to dying amber embers.",
    failureModes: "Generators can over-render cheesy glowing skeletons or monster faces that cheapen the suspense. Keeping the focus on 'tattered sail silhouettes, decaying wood grain, and heavy ocean fog' produces a far more sophisticated gothic image.",
    exampleTweak: "Add 'creaking timbers shrouded in dense sea mist, cold moonlight breaking through storm clouds to reveal empty decks and spectral lanterns'."
  },

  // 14. Interior Design: Modern Luxury Living Room
  "modern-luxury-living-room-46heh": {
    whyItWorks: "Architectural interiors rely on clean perspective lines and material contrast. This prompt pairs floor-to-ceiling glass, Italian travertine stone, and rich walnut slats with soft ambient cove illumination and plush boucle seating.",
    variationGuide: "Shift the style from sleek contemporary to organic Japandi by replacing dark stone with light blonde oak, rice-paper lamps, and raw linen upholstery. Alternatively, go Mid-Century Modern with teak credenzas and mustard velvet accents.",
    failureModes: "AI interiors often distort wall angles, bend window mullions, or spawn floating furniture legs. Using 'wide-angle 24mm architectural photography, two-point perspective, straight vertical lines, and physically realistic indirect bounce lighting' prevents spatial warping.",
    exampleTweak: "Add 'floor-to-ceiling sliding glass doors opening onto an illuminated infinity pool terrace at blue hour, cast concrete fireplace with sunken pit'."
  },

  // 15. Logo Design: Luxury Geometric Lion "J"
  "luxury-geometric-lion-j-logo-design-p7knz": {
    whyItWorks: "Clean vector heraldry demands sharp polygonal geometry and disciplined negative space. Integrating a subtle letter 'J' into the mane of a geometric lion head creates an upscale, memorable corporate emblem suitable for high-end hospitality or investment branding.",
    variationGuide: "Switch the monogram letter from 'J' to 'M' or 'A', or swap the lion mascot for an eagle, stag, or panther. You can also transition the metallic gradient from champagne gold to platinum silver or brushed rose copper.",
    failureModes: "Vector logo prompts frequently introduce photorealistic fur textures, complex shaded backgrounds, or messy distorted text. Enforce 'flat minimalist vector mark, sharp geometric angles, pure black solid background, zero typography'."
  },

  // 16. Luxury: Billionaire Luxury Editorial
  "billionaire-luxury-editorial-photo-promp-o1ni3": {
    whyItWorks: "This prompt captures old-money understated elegance by emphasizing bespoke craftsmanship over flashy brand emblems. Tailored navy Italian wool, a brushed platinum timepiece, and warm dusk architectural lighting give the scene credibility and prestige.",
    variationGuide: "Shift the location from a private estate driveway to the interior of a Gulfstream cabin at cruising altitude, or a classic wooden Riva motorboat gliding across Lake Como. Experiment with casual luxury: a cream linen shirt and tailored shorts on a sunlit yacht deck.",
    failureModes: "Generators often invent garbled luxury brand logos on sunglasses or watches. Explicitly specify 'unbranded bespoke menswear, minimalist accessories, and realistic fabric drape without visible logos or monograms'.",
    exampleTweak: "Change location to 'Lake Como terrace villa, relaxed seated pose with linen blazer, espresso cup on stone table, golden afternoon sun on water'."
  },

  // 17. Mecha: Mecha Dragon
  "mecha-dragon-a2zf2": {
    whyItWorks: "Fusing mythical draconic anatomy with advanced aerospace engineering creates immediate visual impact. Articulated heat-resistant ceramic scales, glowing plasma thrusters along the wings, and hydraulic tail joints deliver satisfying mechanical credibility.",
    variationGuide: "Pivot the mecha styling from angular industrial sci-fi to sleek Evangelion-inspired biomechanical armor, or rugged dieselpunk aesthetics with exposed copper piping, rivets, and billowing exhaust steam.",
    failureModes: "Models often fail to resolve where the wings join the chassis, creating muddy knots of metal. Include 'clearly defined shoulder joints, segmented hydraulic wing struts, and sharp geometric armor separation'.",
    exampleTweak: "Add 'carbon-composite armor plating in matte arctic white, glowing cyan coolant vents along the spine, landing on a futuristic neon launchpad'."
  },

  // 18. Men: Cinematic Luxury Lifestyle Montage
  "cinematic-luxury-lifestyle-montage-34tow": {
    whyItWorks: "The multi-exposure composition layers an editorial close-up portrait with cinematic lifestyle vignettes. By matching the color grading and lighting angles across both foreground and background scenes, the composite feels intentional rather than slapped together.",
    variationGuide: "Adjust the narrative context from executive city luxury to high-altitude alpine retreat or coastal yacht racing. Swap the tailored midnight navy tuxedo for a vintage leather flight jacket and aviator sunglasses.",
    failureModes: "When combining multiple poses in one frame, the AI can duplicate the subject's face with mismatched facial ages or morph hands together. Emphasize 'consistent subject facial identity, distinct panel borders, and unified cinematic teal-and-orange grading'.",
    exampleTweak: "Shift the composite vignettes to 'vintage sports car driving along the Amalfi coast at sunset, coastal terrace cafe, and razor-sharp profile portrait'."
  },

  // 19. Men: Luxury Jet-Set Sunset Collage
  "luxury-jetset-sunset-collage-eud6k": {
    whyItWorks: "Warm golden-hour runway illumination reflecting across private aviation chrome provides an opulent backdrop. Framing the traveler with travel duffel bags and floor-to-ceiling tarmac glass creates a dynamic sense of motion and travel freedom.",
    variationGuide: "Change the private jet setting to a luxury high-speed European first-class train lounge or a vintage sailing yacht regatta. Shift the wardrobe to relaxed Mediterranean linen styling.",
    failureModes: "Aircraft scale and perspective can distort easily, resulting in miniature airplanes or bent fuselage wings. Anchor the background with 'Gulfstream G650 parked on private tarmac, accurate aviation proportions, realistic ground reflections'.",
    exampleTweak: "Add 'rich caramel leather weekender bag, tailored charcoal blazer, golden sun sinking beneath the airport horizon with soft lens flare'."
  },

  // 20. Men: Santorini Birthday Celebration Collage
  "santorini-birthday-celebration-collage-dhogg": {
    whyItWorks: "The crisp Mediterranean color palette—whitewashed volcanic stone, cobalt blue domes, and bougainvillea fuchsia—provides clean natural contrast. The editorial collage layout balances celebration portraiture with atmospheric architectural views.",
    variationGuide: "Transport the celebration to a Tuscan vineyard during grape harvest, an overwater villa in Bora Bora, or a historic rooftop terrace overlooking Florence's Duomo. Swap the birthday theme for an anniversary or travel milestone.",
    failureModes: "Multi-photo collage prompts can render cluttered borders or inconsistent lighting between panels. Specify 'consistent bright Aegean midday sun, uniform white borders between collage panels, and identical subject appearance across all photos'.",
    exampleTweak: "Update with 'sun-drenched cliffside infinity pool overlooking the caldera, crisp linen shirt, sunglasses, holding a champagne glass with authentic smile'."
  },

  // 21. Men: Neon Tokyo Dreams Cyberpunk Collage
  "neon-tokyo-dreams-a-cyberpunk-portrait--r2gm1": {
    whyItWorks: "Saturated magenta and cyan neon lights reflecting off wet asphalt and transparent holographic vinyl outerwear create rich sci-fi texture. The collage format allows viewing both close-up facial cybernetic details and wide neon streetscapes.",
    variationGuide: "Switch the city backdrop from Shinjuku Tokyo to a rain-swept Neo-Seoul skybridge or an industrial Kowloon Walled City multi-level bazaar. Alter the wardrobe to dark techwear with tactical webbing and LED accents.",
    failureModes: "Cyberpunk scenes easily degrade into incomprehensible noisy neon smears. Preserve structural clarity by enforcing 'shallow depth of field, sharp facial focus with raindrops on cheekbones, and legible background signage reflections'.",
    exampleTweak: "Add 'translucent PVC hooded jacket over black graphic hoodie, subtle glowing cybernetic eye implant, reflections of Shibuya crossing in rain puddles'."
  },

  // 22. Men: Black and Gold Royal Luxury Birthday Poster
  "luxury-birthday-poster-design-440lm": {
    whyItWorks: "The black and gold color scheme is a classic luxury signifier. Combining deep matte charcoal textures with warm metallic foil accents, geometric frames, and a hero portrait yields a magazine-cover aesthetic.",
    variationGuide: "Switch the palette to emerald green and rose gold, or royal navy and polished silver for a cooler, aristocratic tone. Swap the birthday context for an executive keynote or artistic album release poster.",
    failureModes: "AI often attempts to generate garbled birthday greeting text across the image. Request 'clean negative space for typography with decorative metallic border lines and zero generated text characters'.",
    exampleTweak: "Add 'floating gold geometric 3D cubes, brushed obsidian stone pedestal, dramatic single-source studio spotlight carving facial jawline'."
  },

  // 23. Men: Marble Luxury Fashion Campaign
  "marble-luxury-fashion-campaign-s7se8": {
    whyItWorks: "Juxtaposing classical Carrara marble statues and architectural columns with ultra-modern minimalist tailoring creates high-fashion editorial tension. The cool ambient bounce light off marble surfaces flatters facial contours and fabric textures.",
    variationGuide: "Replace white Carrara marble with green Guatemala marble or rough-hewn brutalist concrete monoliths. Alter the fashion styling from sharp monochrome suiting to flowing avant-garde streetwear silhouettes.",
    failureModes: "Models may merge the subject's limbs with the surrounding marble statues. Maintain subject hierarchy with 'crisp full-color human model standing in contrast against monochromatic classical Greek sculptures'.",
    exampleTweak: "Add 'oversized charcoal wool trench coat, tailored trousers, high-contrast natural museum gallery lighting from a skylight overhead'."
  },

  // 24. Men: Old Money Aesthetic Portrait
  "old-money-aesthetic-portrait-kh5ut": {
    whyItWorks: "Captures timeless aristocratic style through heirloom textures: cable-knit sweaters, vintage leather armchairs, oil paintings, and book-lined mahogany libraries. Soft ambient window daylight provides a gentle, unhurried mood.",
    variationGuide: "Relocate the portrait outdoors to an English country estate garden with equestrian stables and stone fountains, or an ivy-covered Oxford university quadrangle. Shift the season to crisp late autumn.",
    failureModes: "Diffusion models often lean into caricatured monocles or overly aged styling. Ground the image in modern youth culture: 'understated collegiate luxury, relaxed natural posture, clean haircut, timeless Ralph Lauren editorial vibe'.",
    exampleTweak: "Change setting to 'vintage wooden sailboat on Lake Geneva, cream Aran sweater over chambray shirt, windblown hair, crisp mountain daylight'."
  },

  // 25. Men: Maldives Escape
  "maldives-escape-life-by-the-ocean-z7ym8": {
    whyItWorks: "Turquoise water clarity and pristine white sand create vibrant natural color harmony. The prompt uses waist-level angles and natural tropical sunlight to render translucent wave ripples, tanned skin tones, and resort architecture.",
    variationGuide: "Switch from a daytime lagoon swim to sunset overwater bungalow relaxation with warm amber deck lanterns and purple dusk skies. Transition clothing from casual swim shorts to an unbuttoned white linen resort shirt.",
    failureModes: "Overwater bungalows frequently generate with crooked stilts or distorted architectural angles. Use 'straight horizon line, architectural symmetry on overwater villa deck, crystal-clear shallow water with visible coral shadows'.",
    exampleTweak: "Add 'standing on wooden bungalow walkway over vibrant turquoise lagoon, holding a chilled coconut, warm sea breeze rustling palm fronds overhead'."
  },

  // 26. Men: Golden Hour Coastal Portrait Montage
  "golden-hour-coastal-portrait-montage-xawol": {
    whyItWorks: "Golden hour backlighting wraps around the subject's hair and shoulders, creating a warm luminous silhouette against breaking ocean waves. The montage framing captures both intimate emotional expression and sweeping coastal scale.",
    variationGuide: "Move the coast from rocky Big Sur cliffs to the black sand beaches of Iceland or the dramatic arches of Portugal's Algarve coast. Shift the mood from joyful summer to brooding coastal winter with heavy surf.",
    failureModes: "Strong backlighting can turn the subject's face entirely black. Ensure the prompt maintains 'gentle golden fill light on the face to preserve eye expression, natural skin texture, and realistic eye catchlights'.",
    exampleTweak: "Add 'rugged sea cliffs at Big Sur, crashing white waves below, warm 85mm lens flare, relaxed linen henley shirt with sea spray in hair'."
  },

  // 27. Men: Modern King Editorial
  "modern-king-editorial-xkwd6": {
    whyItWorks: "Reinterprets royal iconography through contemporary haute couture. A minimalist crown, velvet tailoring, and architectural brutalist throne room replace medieval clutter with commanding fashion-forward authority.",
    variationGuide: "Shift the cultural aesthetic from Western imperial to an Afro-futurist sovereign or Neo-Asian dynasty. Substitute the dark throne room for an open marble courtyard flooded with sunlight.",
    failureModes: "Crowns and regal jewelry often render crooked, misshapen, or covered in melted faux-jewels. Specify 'minimalist geometric matte gold crown with clean architectural lines, zero gaudy ornamentation'.",
    exampleTweak: "Add 'deep emerald-green velvet smoking jacket with gold bullion lapel embroidery, seated on a minimalist black granite block throne'."
  },

  // 28. Men: Rise Above Minimalist White
  "rise-above-minimalist-white-portrait-7swe6": {
    whyItWorks: "High-key white-on-white minimalism demands extreme tonal discipline. By relying on subtle drop shadows, fabric creases, and sculptural facial bone structure, the image achieves striking visual clarity and modern fine-art impact.",
    variationGuide: "Invert the entire scheme into high-contrast low-key black minimalism (black turtleneck, dark slate backdrop, hard rim lighting). Or introduce a single bold accent color like Klein blue or cadmium red.",
    failureModes: "Without deliberate shadow placement, high-key white scenes can wash out into an overexposed flat white silhouette. Ensure the prompt includes 'soft directional shadows carving facial depth and highlighting linen fabric folds'.",
    exampleTweak: "Add 'sculptural white architectural stairs, crisp white linen suit, sharp afternoon sunlight casting geometric angled shadows across the wall'."
  },

  // 29. Men: Surreal Nature Poster Design
  "surreal-nature-poster-design-0ysgx": {
    whyItWorks: "Blends organic wilderness elements directly into the human form—moss-covered stones, floating botanical flora, and gentle mist emerging from the subject's silhouette. It balances magical realism with photographic grounding.",
    variationGuide: "Substitute terrestrial moss and forest for deep-ocean elements: glowing bioluminescent jellyfish, coral formations, and sea anemones. Or try desert geology with sandstone canyons and desert roses.",
    failureModes: "Surreal fusion prompts can produce body horror if botanical growth appears to rupture skin violently. Guide the model toward elegance: 'plants and moss resting gently upon skin as harmonious symbiosis, clean aesthetic composition'.",
    exampleTweak: "Add 'delicate fern fronds and tiny glowing fireflies drifting from the silhouette, soft twilight forest mist, muted sage and pine green palette'."
  },

  // 30. Men: Cinematic Travel Portrait
  "cinematic-travel-portrait-request-mzxhs": {
    whyItWorks: "Captures the authentic spirit of documentary travel photography. A 35mm wide-aperture view frames the solitary traveler looking over an expansive ancient city or mountain valley, conveying wanderlust and quiet contemplation.",
    variationGuide: "Change the destination from a European cobblestone square to a misty Himalayan tea plantation, a bustling Moroccan souk, or the neon alleyways of Kyoto at dusk.",
    failureModes: "Travelers in AI images often look like posed catalog models detached from their environment. Specify 'weathered canvas backpack, worn hiking boots, candid three-quarter turn, natural documentary photojournalism style'.",
    exampleTweak: "Add 'standing on a rustic stone balcony overlooking the terracotta roofs of Florence at dusk, warm streetlamps flickering on in the piazza below'."
  },

  // 31. Men: Cinematic Foggy Portrait
  "cinematic-foggy-portrait-f940e": {
    whyItWorks: "Dense fog provides natural depth separation by softening background contrast while keeping the foreground subject crisp. Muted cool grey tones evoke mystery, stillness, and introspective drama.",
    variationGuide: "Transition the environment from a misty rural road to a foggy harbor dock with silhouettes of fishing trawlers, or a high-altitude redwood forest path with tall redwood trunks fading into white mist.",
    failureModes: "Fog can wash out the foreground subject into a muddy grey blob. Anchor the image with 'razor-sharp focus on the subject in the immediate foreground, high-contrast dark overcoat, and dew drops clinging to wool fabric'.",
    exampleTweak: "Add 'vintage wool peacoat collar turned up against damp chill, distant warm yellow car headlights glowing through thick mountain fog'."
  },

  // 32. Men: Alone on the Misty Forest Road
  "alone-on-the-misty-forest-road-rxk7r": {
    whyItWorks: "Leading lines created by the asphalt road vanishing into forest mist draw the viewer's eye straight toward the solitary walking figure. Tall pine trees frame the scene with majestic scale.",
    variationGuide: "Change the asphalt road to a winding gravel trail or a mossy wooden boardwalk across a peat bog. Shift the season to winter with frost-dusted pines and crunching snow.",
    failureModes: "The solitary subject can render disproportionately large or look pasted onto the road surface. Include 'physically grounded feet with soft contact shadows on damp pavement, realistic perspective scale'.",
    exampleTweak: "Add 'autumn pine needles scattered across wet asphalt, warm red taillights of a distant parked station wagon disappearing in morning fog'."
  },

  // 33. Men: Premium Independence Day DP
  "premium-independence-day-dp-d4u6t": {
    whyItWorks: "Combines patriotic identity with sophisticated portrait lighting. Deep saffron, white, and emerald hues are integrated through ambient backlighting and textured silk drapery rather than flat flag graphics.",
    variationGuide: "Adapt the national celebration theme to any country by swapping the color palette and national symbols. Or adjust the attire from traditional ethnic wear to modern formal suiting.",
    failureModes: "Flags and national emblems are often garbled or distorted by diffusion models. Use 'subtle atmospheric color rim lighting inspired by national colors rather than literal flag banners with distorted wheels or stars'.",
    exampleTweak: "Add 'crisp white khadi kurta, warm saffron rim light on shoulder, soft green ambient fill, clean studio portrait with subtle golden confetti'."
  },

  // 34. Minimalist: Japandi Luxury Living Room
  "japandi-luxury-living-room-prompt-y9ih9": {
    whyItWorks: "Celebrates wabi-sabi simplicity: low-slung wooden platforms, fluted oak wall panels, handmade ceramic vases with a single dried branch, and paper lantern pendants creating soft diffused light pools.",
    variationGuide: "Introduce a tranquil courtyard view with bamboo shoots through a large round picture window. Or transition materials toward slightly darker smoked ash wood and charcoal slate tiles.",
    failureModes: "Minimalist spaces can look barren or sterile if textures are lacking. Insist on 'tactile raw linen cushions, visible wood grain knots, paper texture on lantern, and soft sunlight cast through slatted wooden blinds'.",
    exampleTweak: "Add 'sunken tatami tea area with two meditation cushions, round black granite tea table, soft morning sun casting slatted bamboo shadows'."
  },

  // 35. Mythology: Cinematic Valhalla Gates
  "cinematic-valhalla-gates-prompt-design-q9p9z": {
    whyItWorks: "Colossal golden gates rising into the aurora borealis establish epic Norse mythological grandeur. Intricate knotwork carvings, glowing runic inscriptions, and towering mountain glaciers amplify celestial majesty.",
    variationGuide: "Pivot from Norse mythology to Greek Mount Olympus with towering Corinthian columns above thunderclouds, or Egyptian Duat gates guarded by golden jackal statues under starry cosmic skies.",
    failureModes: "Architectural proportions at massive scale often collapse into chaotic, repetitive staircases. Specify 'clear central gate threshold, monumental symmetry, golden light pouring through open doors into starry sky'.",
    exampleTweak: "Add 'brave warrior silhouette standing at the base of the colossal golden doors, glowing blue runes glowing along the ice-carved archway'."
  },

  // 36. Nature & Landscape: We Return Misty Mountain Reverie
  "we-return-a-misty-mountain-reverie-mkfx4": {
    whyItWorks: "Layered mountain ridges receding into misty atmospheric haze capture classic Chinese shan shui and romantic landscape painting traditions. Golden sunrise light kissing the highest peaks provides breathtaking vertical contrast.",
    variationGuide: "Change from rolling alpine peaks to dramatic jagged granite spires like Patagonia's Torres del Paine or Zhangjiajie sandstone pillars. Swap sunrise for an approaching thunderstorm.",
    failureModes: "Mountain ridges can render with unnatural repetitive fractal edges. Specify 'distinct geological rock strata, sweeping alpine valley, and soft volumetric cloud inversion flowing between ridges'.",
    exampleTweak: "Add 'solitary wooden shelter perched on a grassy ridge, winding hiking trail visible below, pink and gold sunrise reflections on alpine tarn'."
  },

  // 37. Portrait: Surreal Impasto Painting Style
  "surreal-impasto-painting-style-prompt-4j8z3": {
    whyItWorks: "Thick, sculptural palette-knife strokes with visible oil paint ridges create tactile three-dimensional texture. By combining expressive modern portraiture with bold impasto technique, the artwork bridges digital generation and gallery fine art.",
    variationGuide: "Shift the painting style from vibrant post-impressionist color explosions (Van Gogh style) to moody monochrome palette-knife chiaroscuro reminiscent of Lucian Freud or Jenny Saville.",
    failureModes: "Diffusion models often smooth out impasto brushstrokes into flat digital airbrush gradients. Emphasize 'heavy raised oil paint peaks, visible palette-knife ridges, physical canvas weave texture, and glossy paint reflections'.",
    exampleTweak: "Add 'vibrant cobalt blue, cadmium orange, and raw umber impasto strokes carving facial features, heavy paint drips along the lower jawline'."
  },

  // 38. Poster Design: Dubai Skyline Double Exposure
  "dubai-skyline-double-exposure-7e69k": {
    whyItWorks: "Double-exposure architecture creates compelling visual metaphor. Fusing the iconic silhouette of the Burj Khalifa and modern skyscrapers inside the profile of a falcon or visionary architect yields a polished tourism poster.",
    variationGuide: "Swap Dubai for Tokyo, New York, or Paris, adapting the architecture to each city's landmarks (Tokyo Tower, Empire State Building, Eiffel Tower). Change the silhouette from a falcon to an aircraft or traveler.",
    failureModes: "Double exposure can leave the silhouette contour ragged or messy. Keep the outer boundary crisp: 'clean graphic silhouette profile with high contrast against white paper background, skyline seamlessly contained within'.",
    exampleTweak: "Add 'warm sunset reflections on glass towers inside the silhouette, shimmering gold dust particles drifting outside the frame against dark slate'."
  },

  // 39. Product: Flame Grilled Fashion Campaign Poster
  "flame-grilled-fashion-campaign-poster-9yywu": {
    whyItWorks: "Bold conceptual juxtaposition: merging high-fashion luxury editorial lighting with raw barbecue culinary flame elements. Crisp studio flash freezes airborne fire embers and sizzling droplets around the featured product.",
    variationGuide: "Adapt this high-energy elemental contrast to athletic footwear suspended over volcanic lava, or luxury spirits surrounded by splashes of crystal-clear ice and botanical garnish.",
    failureModes: "Fire effects can quickly overwhelm the hero product with messy orange blown-out highlights. Insist on 'product remaining razor-sharp in foreground with controlled studio rim illumination from background flames'.",
    exampleTweak: "Add 'handcrafted leather boot on charred wooden pedestal, controlled flame burst behind, floating sparks frozen at 1/8000s shutter speed'."
  },

  // 40. Sci-Fi: PARADOX III DYSYNCHRONY
  "paradox-iii-dysynchrony-fue40": {
    whyItWorks: "Hard science-fiction minimalism: sterile laboratory cleanrooms, temporal distortion rings, and chrome research equipment. The subdued monochrome palette punctuated by warning lights creates tension and narrative weight.",
    variationGuide: "Transform the scientific paradox from temporal physics to quantum teleportation or zero-gravity botanical containment. Shift the environment from an Earth research lab to an orbital space station interior.",
    failureModes: "Complex sci-fi machinery can disintegrate into random greeble clutter without purpose. Ensure 'clean industrial geometry, functional control consoles, and large cylindrical containment glass'.",
    exampleTweak: "Add 'central glass cylinder containing a floating fractured crystal emitting concentric gravity distortion ripples, two scientists in white hazard suits watching'."
  },

  // 41. Space: Hyperspace Starship Fleet Armada
  "massive-fleet-futuristic-starships-k9zef": {
    whyItWorks: "Epic scale is established through converging hyperspace warp trails that draw the eye toward a distant luminous spiral galaxy. Sleek capital ships in the foreground show detailed hull plating, navigation lights, and engine glows.",
    variationGuide: "Shift the fleet context from peacetime hyperspace transit to an orbital planetary defense perimeter with glowing orbital rings, or an exploration flotilla navigating dense asteroid fields.",
    failureModes: "Starships rendered in fleets frequently look identical and copy-pasted. Specify 'diverse capital ship classes with distinct hull silhouettes, heavy dreadnoughts in center, agile escort frigates on flanks'.",
    exampleTweak: "Add 'azure and violet warp trails bending space-time, colossal command flagship showing illuminated observation decks and glowing plasma thrusters'."
  },

  // 42. Sport: Rise Without Limit Abstract Motion Paint
  "rise-without-limit-abstract-motion-paint-sports-ascension-poster-tw95z": {
    whyItWorks: "Dynamic frozen splash photography pairs with high-speed athletic motion. Exploding plumes of vibrant colored powder and liquid acrylic follow the runner's sprint trajectory, translating physical speed into visual energy.",
    variationGuide: "Apply this kinetic paint explosion technique to basketball dunks, martial arts kicks, gymnastics balance poses, or tennis serves. Change the powder palette to your brand colors.",
    failureModes: "Motion effects can blur the athlete's limbs into an unrecognizable mess. Lock the anatomy down: 'athlete's musculature and face in pin-sharp focus with paint splatter trailing behind the movement trajectory'.",
    exampleTweak: "Add 'sprinter bursting out of starting blocks, neon cyan and crimson Holi powder exploding backward from shoes, studio high-speed strobe lighting'."
  },

  // 43. Steampunk: Steampunk Airship Captain
  "steampunk-airship-captain-3qeh9": {
    whyItWorks: "Classic Victorian retro-futurism: polished brass goggles, weathered leather flight jacket, mechanical compasses, and an observation bridge overlooking a sea of clouds. Natural golden sunlight through brass-framed windows gives the scene warmth.",
    variationGuide: "Shift the character from the airship captain to the clockwork automaton first mate or the ship's chief mechanic inside a roaring boiler room filled with copper pipes and steam pressure gauges.",
    failureModes: "Goggles and clockwork gears can be randomly pasted onto faces by models. Direct the styling: 'functional brass aviator goggles resting on leather flight cap, authentic clockwork pocket watch chain across tweed vest'.",
    exampleTweak: "Add 'captain's hands on polished wooden ship's wheel with brass fittings, stormy clouds and sister dirigibles visible through the curved bridge windows'."
  },

  // 44. Surreal: Mirror Dimension
  "mirror-dimension-0cv82": {
    whyItWorks: "Escher-inspired impossible architecture and reflective glass planes create mind-bending visual puzzles. Repeating archways, floating staircases, and gravity-defying water surfaces challenge viewer perception while maintaining photographic lighting realism.",
    variationGuide: "Take the mirror dimension outdoors into an infinite desert where glass monoliths reflect different seasons (spring blossoms in one mirror, snowy winter in another).",
    failureModes: "Models can easily introduce chaotic shattered glass artifacts that make the image look broken rather than mathematically surreal. Specify 'smooth unbroken floor-to-ceiling mirrors, clean architectural perspective, infinite reflections'.",
    exampleTweak: "Add 'solitary figure walking across a polished black obsidian floor that reflects a sky full of floating marble staircases leading to nowhere'."
  },

  // 45. Travel: Luxury Desert Adventure
  "luxury-desert-adventure-rlnj4": {
    whyItWorks: "Golden dunes sculpt long, sweeping shadows under low afternoon sunlight. Contrasting the stark minimalist desert landscape with high-end luxury details—a private bedouin lounge, vintage off-road vehicle, and billowing linen canopy—delivers wanderlust appeal.",
    variationGuide: "Move the desert setting from rolling Sahara sand dunes to the red sandstone monoliths of Wadi Rum Jordan, or the surreal salt flats of Bolivia under starlight.",
    failureModes: "Sand dunes can look like smooth artificial clay without wind-blown ripple texture. Insist on 'razor-sharp wind ripples across dune crests, warm golden hour sun, and deep amber cast shadows'.",
    exampleTweak: "Add 'luxury desert glamping tent with plush rugs, brass lanterns, tea set, camel train silhouetted against the setting sun on distant dune ridge'."
  },

  // 46. Vehicles: NISSAN GT-R Dystopian Racer
  "nissan-gtr-dystopian-racer-cinematic-storm-motorsport-poster-ecm7t": {
    whyItWorks: "Low, aggressive front three-quarter automotive angle. The wide-body aerodynamic kit, exposed carbon-fiber splitter, glowing amber headlights, and rain-slicked asphalt reflecting storm lightning give the GT-R palpable horsepower and grit.",
    variationGuide: "Swap the GT-R for a Porsche 911 GT3 RS, a retro Lancia Stratos rally car, or an electric futuristic hypercar. Switch the environment from a storm highway to a neon-soaked downtown Tokyo drift tunnel.",
    failureModes: "Car badges and headlight shapes are frequently distorted or hybridized by diffusion engines. Specify 'accurate Nissan GT-R R35 quad-ring taillight design, wide-body stance, realistic tire tread contact on wet asphalt'.",
    exampleTweak: "Add 'water spray billowing from wide rear tires at speed, glowing orange brake rotors visible through forged wheels, dark thundercloud sky with lightning'."
  },

  // 47. Vintage: 1920s Steam Train Sunrise
  "1920s-steam-train-sunrise-prompt-ogdgs": {
    whyItWorks: "Plumes of backlit white steam rising from an authentic black locomotive boiler capture the romance of early 20th-century industrial travel. Sunrise light cutting through the steam produces dramatic god rays across the railway tracks.",
    variationGuide: "Transition the scene from an open countryside trestle bridge to a bustling Victorian train station terminal under iron-and-glass vaulting with passengers in vintage overcoats.",
    failureModes: "Locomotive wheel linkages often generate with tangled or impossible mechanical connections. Use 'accurate steel driving wheels and connecting rods, classic steam engine cowcatcher, and polished brass boiler bands'.",
    exampleTweak: "Add 'wooden passenger carriages behind the locomotive, winding across a stone viaduct over a misty river valley at dawn, golden sun rays cutting through steam'."
  },

  // 48. Wedding: Luxury Wedding Suit Campaign
  "luxury-wedding-suit-campaign-lxr00": {
    whyItWorks: "High-end groom fashion editorial inspired by Vogue Weddings and GQ. The double-exposure layering of a close-up portrait with full-body poses inside grand European architecture creates a cohesive fashion campaign feel.",
    variationGuide: "Switch the attire from an ivory tuxedo to a bespoke emerald-green velvet dinner jacket or classic midnight-blue three-piece suit. Change the venue to an outdoor cliffside villa on Lake Como.",
    failureModes: "Multi-exposure wedding collages can accidentally introduce duplicate bride figures or messy floral textures across the suit fabric. Keep the attire clean: 'tailored luxury tuxedo fabric texture, sharp lapels, clean architectural lines'.",
    exampleTweak: "Add 'grand marble staircase with cream floral arches, soft champagne chandelier illumination, groom adjusting platinum cufflink with natural smile'."
  },

  // 49. Women: Whimsical Adventures in a Doodle World
  "whimsical-adventures-in-a-doodle-world-mls37": {
    whyItWorks: "Combines photorealistic portrait photography with hand-drawn black-and-white doodle illustrations. The contrast between realistic skin texture, realistic fabric, and playful sketched miniature scenes (walking on pencil bridges, sitting in coffee mugs) produces charming visual storytelling.",
    variationGuide: "Shift the doodle theme from everyday miniatures to cosmic exploration (paper airplanes flying past hand-drawn planets) or botanical gardens with oversized sketched flowers and butterflies.",
    failureModes: "The doodle line art can accidentally bleed onto the subject's face as fake facial tattoos. Specify 'clean separation between photographic human subject and surrounding hand-drawn doodle environment on white canvas'.",
    exampleTweak: "Add 'subject wearing casual yellow sundress, sitting comfortably inside a giant sketch of a coffee cup with doodle steam swirling into music notes'."
  },

  // 50. Women: Emerald Regal Portrait with Golden Halo
  "emerald-regal-portrait-with-golden-halo-a3nl6": {
    whyItWorks: "Royal fine-art portraiture: deep emerald green couture lehenga with antique gold embroidery, framed by a soft golden halo backlighting effect. The dramatic chiaroscuro and rich jewel tones convey poise, dignity, and cultural luxury.",
    variationGuide: "Switch the garment color from emerald to royal sapphire blue or rich ruby red. Adapt the halo backlighting into an intricate Mughal arch doorway glowing with sunset light.",
    failureModes: "Heavy traditional embroidery can lose crispness in AI rendering and look like muddy glitter. Enforce 'crisp antique gold zari embroidery, individually defined sequins, and full-grain velvet fabric texture with realistic folds'.",
    exampleTweak: "Add 'subtle diamond and emerald choker necklace, natural warm skin tones with soft beauty dish lighting, dark charcoal studio background with glowing golden halo'."
  }
};

// Now iterate through all files in src/data/prompts/ and attach editorNotes to the 50 matching prompts
const promptsDir = path.join(process.cwd(), 'src/data/prompts');
const files = fs.readdirSync(promptsDir).filter(f => f.endsWith('.json'));

let updatedCount = 0;
const editorialReviewItems = [];

files.forEach(file => {
  const filePath = path.join(promptsDir, file);
  const prompts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let fileModified = false;

  prompts.forEach(p => {
    const slug = p.slug || p.id;
    if (NOTES_MAP[slug]) {
      p.editorNotes = NOTES_MAP[slug];
      fileModified = true;
      updatedCount++;

      editorialReviewItems.push({
        slug,
        title: p.title,
        category: p.category,
        file,
        notes: NOTES_MAP[slug]
      });
    }
  });

  if (fileModified) {
    fs.writeFileSync(filePath, JSON.stringify(prompts, null, 2), 'utf-8');
    console.log(`Updated ${file}`);
  }
});

console.log(`Successfully attached editorNotes to ${updatedCount} prompts!`);

// Generate EDITORIAL-REVIEW.md
let md = `# AIPromptNest — Editorial Review & Verification

> **Proofreading & Pre-Deployment Review Document**  
> This document lists the **50 indexable prompts** that form AIPromptNest's core indexed library.  
> Each prompt features genuine, prompt-specific editorial guidance:
> 1. **What Makes This Prompt Work** (composition, lighting, lenses, color theory)
> 2. **What to Change for Variations** (subject, setting, styling variations)
> 3. **Common Failure Modes & Fixes** (model pitfalls and counter-measures)
> 4. **Concrete Example Tweak** (actionable prompt drop-in)
>
> **TODO for Site Owner**: Replace placeholder \`[OWNER NAME]\` in personal notes if you wish to attach an individual byline, or keep as the collective \`AIPromptNest Editorial Team\`.

---

## Summary of 50 Indexable Prompts
Total indexable prompts reviewed: **${editorialReviewItems.length}**  
Date of Review: **2026-10-01**  
Reviewer: **AIPromptNest Editorial Team**

---

`;

editorialReviewItems.forEach((item, index) => {
  md += `### ${index + 1}. ${item.title}\n`;
  md += `- **Slug**: \`${item.slug}\`\n`;
  md += `- **Category**: ${item.category}\n`;
  md += `- **Source File**: \`src/data/prompts/${item.file}\`\n\n`;
  md += `#### What Makes This Prompt Work\n${item.notes.whyItWorks}\n\n`;
  md += `#### What to Change for Variations\n${item.notes.variationGuide}\n\n`;
  md += `#### Common Failure Modes & Fixes\n${item.notes.failureModes}\n\n`;
  if (item.notes.exampleTweak) {
    md += `#### Concrete Example Tweak\n\`\`\`text\n${item.notes.exampleTweak}\n\`\`\`\n\n`;
  }
  md += `---\n\n`;
});

fs.writeFileSync(path.join(process.cwd(), 'EDITORIAL-REVIEW.md'), md, 'utf-8');
console.log('Successfully wrote EDITORIAL-REVIEW.md with all 50 prompts!');
