// Curated library of premium, high-resolution surreal, ethereal, and cosmic digital art images from Unsplash.
// These are selected specifically to match the "antigravity" and dreamy sci-fi visual style of our application.
const IMAGE_LIBRARY = [
  {
    id: "cosmic-nebula",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    tags: ["space", "nebula", "galaxy", "stars", "cosmic", "purple", "stardust"],
    credit: "Alexander Andrews"
  },
  {
    id: "glowing-astronaut",
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80",
    tags: ["astronaut", "space", "glowing", "cosmic", "dust", "gold", "stars"],
    credit: "Manuel Cosentino"
  },
  {
    id: "ethereal-spirit",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
    tags: ["ethereal", "spirit", "dream", "surreal", "glowing", "portrait", "pink", "fantasy"],
    credit: "Jr Korpa"
  },
  {
    id: "retro-synthwave",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    tags: ["synthwave", "cyberpunk", "neon", "grid", "retro", "pink", "mountains", "violet"],
    credit: "Zoltan Tasi"
  },
  {
    id: "cosmic-ocean",
    url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1200&q=80",
    tags: ["ocean", "sea", "sky", "glowing", "cosmic", "sunset", "clouds", "water"],
    credit: "Sébastien Bennett"
  },
  {
    id: "neon-futuristic-street",
    url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    tags: ["cyberpunk", "city", "neon", "street", "rain", "reflections", "tokyo", "blue"],
    credit: "Jezael Melgoza"
  },
  {
    id: "glass-abstract",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    tags: ["glass", "abstract", "prism", "3d", "shapes", "gradient", "minimalist", "refraction"],
    credit: "Google DeepMind"
  },
  {
    id: "surreal-portal",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    tags: ["portal", "doorway", "dream", "surreal", "clouds", "sky", "stars", "fantasy"],
    credit: "Jr Korpa"
  },
  {
    id: "abstract-ribbons",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["abstract", "ribbons", "waves", "gradient", "liquid", "purple", "neon", "flowing"],
    credit: "Milad Fakurian"
  },
  {
    id: "cosmic-satellite",
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
    tags: ["satellite", "space", "earth", "station", "orbit", "technology", "blue"],
    credit: "NASA"
  },
  {
    id: "crystal-cavern",
    url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    tags: ["crystal", "cave", "prism", "refraction", "glowing", "rainbow", "light", "emerald"],
    credit: "Sora Sagano"
  },
  {
    id: "magical-forest",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    tags: ["forest", "trees", "mist", "glowing", "magical", "green", "dreamy", "fairy"],
    credit: "Sebastian Unrau"
  },
  {
    id: "cosmic-lighthouse",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    tags: ["lighthouse", "ocean", "stars", "beach", "night", "glowing", "cosmic", "sand"],
    credit: "Sean Oulashin"
  },
  {
    id: "deep-nebula-blue",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    tags: ["nebula", "space", "blue", "cyan", "network", "digital", "abstract"],
    credit: "NASA"
  },
  {
    id: "cyber-punk-headset",
    url: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=1200&q=80",
    tags: ["vr", "headset", "cyberpunk", "neon", "man", "technology", "pink", "purple"],
    credit: "Stella Jacob"
  },
  {
    id: "aurora-borealis",
    url: "https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=1200&q=80",
    tags: ["aurora", "green", "night", "stars", "sky", "mountains", "cold", "dreamy"],
    credit: "Vincent Guth"
  },
  {
    id: "floating-clouds",
    url: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=1200&q=80",
    tags: ["clouds", "sunset", "pink", "sky", "floating", "ethereal", "dreamy"],
    credit: "Billy Huynh"
  },
  {
    id: "glass-spheres",
    url: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1200&q=80",
    tags: ["spheres", "glass", "art", "paint", "colorful", "surreal", "glowing", "red"],
    credit: "Pawel Czerwinski"
  }
];

// Helper to extract keywords from a prompt string
function extractKeywords(prompt) {
  if (!prompt) return [];
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with", 
    "by", "of", "about", "showing", "draw", "generate", "create", "make", "image", "photo"
  ]);
  
  return prompt
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

/**
 * Sequential Contextual AI Image Generator (Mock)
 * Simulates blending the current prompt with past generated context to maintain visual narrative.
 * 
 * @param {string} prompt - Current prompt submitted by the user
 * @param {Array} history - List of previous image generations
 * @returns {Promise<Object>} The generated image data with blending explanation
 */
export function generateContextualImage(prompt, history = []) {
  return new Promise((resolve) => {
    // 1. Extract terms from the current prompt
    const currentKeywords = extractKeywords(prompt);
    
    // 2. Identify the active context (if history exists)
    const previousImage = history[history.length - 1];
    const previousKeywords = previousImage ? extractKeywords(previousImage.prompt) : [];
    const previousTags = previousImage ? previousImage.tags : [];
    
    // 3. Sequential contextual blending logic
    // Merge keywords to represent combined context
    const blendedKeywords = Array.from(new Set([...currentKeywords, ...previousKeywords]));
    
    // Determine style blending tags
    let styleSeed = [];
    if (previousImage) {
      // Inherit prominent visual tags from previous image to maintain continuity
      const styles = ["space", "nebula", "neon", "cyberpunk", "synthwave", "ethereal", "dream", "surreal", "glass", "abstract", "crystal", "magical"];
      styleSeed = previousTags.filter(tag => styles.includes(tag));
    }
    
    // 4. Select the best match from our library based on blended keywords
    // Calculate a matching score for each image in the library
    let bestMatch = null;
    let highestScore = -1;
    
    // Also track standard tags of current prompt to find primary focus
    const matchTags = Array.from(new Set([...currentKeywords, ...styleSeed]));
    
    IMAGE_LIBRARY.forEach(image => {
      let score = 0;
      image.tags.forEach(tag => {
        // Direct matches to current keywords get double points
        if (currentKeywords.includes(tag)) score += 2.5;
        // Matches to style seed or historic context get single point
        else if (matchTags.includes(tag)) score += 1.0;
      });
      
      // Add slight randomness so the same prompt doesn't ALWAYS yield the same image
      score += Math.random() * 0.5;
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = image;
      }
    });
    
    // Fallback in case of zero matches (pick random from library)
    if (!bestMatch || highestScore <= 0) {
      bestMatch = IMAGE_LIBRARY[Math.floor(Math.random() * IMAGE_LIBRARY.length)];
    }
    
    // 5. Generate beautiful "Thinking/Blending Logs"
    const thinkingLogs = [];
    
    if (history.length === 0) {
      thinkingLogs.push(
        "Initializing neural canvas...",
        `Parsing primary intent: "${prompt}"`,
        `Analyzing keywords: [${currentKeywords.join(", ")}]`,
        `Applying base aesthetics: Volumetric lighting, 8K resolution, unreal engine render`,
        "Rendering newly materialized visual concept."
      );
    } else {
      thinkingLogs.push(
        "Scanning contextual visual history...",
        `Retrieved history anchor: "${previousImage.prompt}"`,
        `Fusing new instructions: "${prompt}"`,
        `Merging keywords: [${currentKeywords.slice(0, 3).join(", ")}] + historic [${previousKeywords.slice(0, 3).join(", ")}]`,
        styleSeed.length > 0 
          ? `Preserving visual aesthetic style parameters: [${styleSeed.join(", ")}]`
          : "Analyzing style bridge: blending smooth gradients & particle clouds",
        `Simulating contextual continuation with weight index 0.65`,
        "Synthesizing composite visual outputs to preserve narrative consistency."
      );
    }

    // 6. Refined final prompt details for display in the Lightbox
    let refinedPrompt = prompt;
    if (history.length > 0 && styleSeed.length > 0) {
      refinedPrompt = `${prompt} (Seamless narrative sequel. Blended with style: ${styleSeed.join(", ")})`;
    } else {
      refinedPrompt = `${prompt} (Original composition, high-detail volumetric renderer)`;
    }

    // 7. Calculate randomized 3D coordinates in a weightless antigravity layout
    // We want staggered coordinates to prevent rigid grids.
    // Z range: -150px (deep back) to +150px (floating forward)
    // X and Y are scattered around the viewport
    const zOffset = (Math.random() * 300) - 150; 
    const xOffset = (Math.random() * 70) - 35; // percentage bounds
    const yOffset = (Math.random() * 50) - 25; // percentage bounds
    const rotX = (Math.random() * 30) - 15; // deg
    const rotY = (Math.random() * 30) - 15; // deg
    const rotZ = (Math.random() * 10) - 5; // deg

    // Simulate network delay
    setTimeout(() => {
      resolve({
        id: `img-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        url: bestMatch.url,
        prompt: prompt,
        refinedPrompt: refinedPrompt,
        tags: bestMatch.tags,
        credit: bestMatch.credit,
        thinkingLogs: thinkingLogs,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        position: { x: xOffset, y: yOffset, z: zOffset },
        rotation: { x: rotX, y: rotY, z: rotZ },
        scale: 0.85 + (Math.random() * 0.25), // dynamic scale sizes
        parentPrompt: previousImage ? previousImage.prompt : null
      });
    }, 2500); // 2.5 second natural delay
  });
}
