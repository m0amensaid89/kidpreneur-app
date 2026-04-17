// src/lib/data/lessons.ts
// KidPreneur Lesson Data : v1.0
// Authored: NELLY + SAMI, April 17 2026
// Schema locked by SAMI. Do not modify lesson shape without schema revision.

export type WorldId = "w1" | "w2" | "w3" | "w4" | "w5";
export type Difficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explainer: string;
}

export interface Mission {
  id: string;
  title: string;
  objective: string;
  instructions: string[];
  sandboxPrompt: string;
  quackySystemPrompt: string;
  reflectionQuestion: string;
  xpReward: number;
}

export interface FeatureHighlight {
  feature: string;
  description: string;
  example: string;
}

export interface Lesson {
  id: string;
  worldId: WorldId;
  lessonNumber: number;
  title: string;
  toolName: string;
  toolUrl: string;
  toolCategory: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  heroLine: string;
  warmUpChallenge: string;
  warmUpQuiz: {
    question: string;
    options: [string, string, string];
  };
  features: FeatureHighlight[];
  costInfo: string;
  parentTip: string;
  learningPoints: string[];
  quiz: [QuizQuestion, QuizQuestion, QuizQuestion];
  missions: [Mission, Mission, Mission];
  empireBuilderTip: string;
  completionBadge: string | null;
  nextLesson: string | null;
}

export interface World {
  id: WorldId;
  name: string;
  color: string;
  icon: string;
  description: string;
  empireBuilderConcept: string;
  lessonCount: number;
  unlockRequirement: {
    previousWorld: WorldId | null;
    minXP: number;
  };
  capstoneProject: string;
  lessons: Lesson[];
  empireBuilderModule: EmpireBuilderModule;
  capstone: Capstone;
}

// ─── Schema v2 additions: Empire Builder + Capstone ───
// Empire Builder : 1 per world. Kid turns world skills into a mini-business.
export interface EmpireBuilderModule {
  id: string;
  worldId: WorldId;
  title: string;
  tagline: string;
  estimatedMinutes: number;
  businessArchetype: string;
  targetCustomer: string;
  realWorldExamples: string[];
  businessSteps: {
    step: number;
    title: string;
    description: string;
    usingTools: string[];
    deliverable: string;
  }[];
  quackyPlaybook: string;
  pricingLesson: {
    yourFirstPrice: string;
    whyThisPrice: string;
    scaleUp: string;
  };
  firstCustomerExercise: {
    task: string;
    prompt: string;
    quackySystemPrompt: string;
  };
  xpReward: number;
  completionBadge: string;
}

// Capstone : 1 per world. Portfolio-grade deliverable that unlocks next world.
export interface Capstone {
  id: string;
  worldId: WorldId;
  title: string;
  narrative: string;
  requiredMissions: string[];
  deliverableSpec: string;
  submissionFormat: "image" | "video" | "document" | "portfolio" | "pitch";
  parentReviewPrompt: string;
  xpReward: number;
  unlocksWorld: WorldId | null;
}

// ═══════════════════════════════════════════════════════════
// WORLD 1 : CANVAS KINGDOM
// AI art, design, and visual creation
// Empire Builder: Portfolio & creative services
// ═══════════════════════════════════════════════════════════

const CANVAS_KINGDOM: World = {
  id: "w1",
  name: "Canvas Kingdom",
  color: "#FF6340",
  icon: "palette",
  description: "Turn words and sketches into stunning AI art. Your imagination becomes real.",
  empireBuilderConcept: "Portfolio & creative services : designers, illustrators, and visual storytellers get paid to bring ideas to life.",
  lessonCount: 8,
  unlockRequirement: { previousWorld: null, minXP: 0 },
  capstoneProject: "Build a 5-piece visual portfolio using 3 different AI tools, then design a simple pitch poster that sells your portfolio as a service.",
  lessons: [
    // ─────────────────────────────────────────────────────────
    // L1 : CANVA MAGIC STUDIO
    // ─────────────────────────────────────────────────────────
    {
      id: "l1",
      worldId: "w1",
      lessonNumber: 1,
      title: "Canva Magic Studio",
      toolName: "Canva Magic Studio",
      toolUrl: "https://www.canva.com/magic-studio/",
      toolCategory: "AI image generation and design",
      difficulty: "easy",
      estimatedMinutes: 15,
      heroLine: "Turn your words into magical pictures in seconds.",
      warmUpChallenge: "Close your eyes and imagine an animal that does not exist yet. Maybe it has dragon wings and fur like a teddy bear. Today we will bring your imagination to life.",
      warmUpQuiz: {
        question: "If you could invent one magical creature, what would it be?",
        options: [
          "A flying jellyfish cat",
          "A rainbow snow lion",
          "A robot unicorn with laser eyes"
        ]
      },
      features: [
        {
          feature: "Text to Image",
          description: "Type what you want to see and Canva paints it for you.",
          example: "A happy golden retriever playing with a red ball at sunset"
        },
        {
          feature: "Magic Edit",
          description: "Erase something in your photo and replace it with anything.",
          example: "Remove a tree in a photo, add a spaceship instead"
        },
        {
          feature: "Magic Expand",
          description: "Make your photo wider or taller while the AI fills in the new space.",
          example: "Turn a portrait photo into a full landscape scene"
        },
        {
          feature: "Magic Design",
          description: "Type a theme and Canva builds a whole layout for you.",
          example: "Type beach party and get a full themed template"
        }
      ],
      costInfo: "Free plan includes limited magic credits per day. Canva Pro is $14.99 per month with way more magic credits and features.",
      parentTip: "Start with the free plan and sit with your kid for the first three prompts so they learn what makes a good description.",
      learningPoints: [
        "What a prompt is and why detail matters",
        "How to describe colors, moods, and setting",
        "Editing and refining generated images",
        "Using AI as a creative partner, not a replacement for imagination"
      ],
      quiz: [
        {
          question: "What do we type to tell the AI what to draw?",
          options: ["A command", "A prompt", "A secret code", "A whisper"],
          correctAnswer: 1,
          explainer: "A prompt is the description you give the AI. The better the prompt, the better the picture."
        },
        {
          question: "Which of these is the BEST prompt?",
          options: [
            "A dog",
            "A happy dog",
            "A happy golden retriever playing with a red ball at sunset",
            "Dog ball park"
          ],
          correctAnswer: 2,
          explainer: "Details matter. The AI needs colors, mood, setting, and action to paint the right picture."
        },
        {
          question: "Can Canva Magic Studio edit photos you already have?",
          options: [
            "Yes, with Magic Edit and Magic Expand",
            "No, it only makes brand new pictures",
            "Only black and white photos",
            "Only videos"
          ],
          correctAnswer: 0,
          explainer: "Magic Edit and Magic Expand let you change or extend real photos in amazing ways."
        }
      ],
      missions: [
        {
          id: "l1_m1",
          title: "Design Your Dream Pet",
          objective: "Create an AI image of the magical pet you imagined in the warm-up.",
          instructions: [
            "Open Canva Magic Studio with a grown-up",
            "Write a prompt describing your creature in detail",
            "Include colors, textures, size, and what it is doing",
            "Generate and save your favorite version"
          ],
          sandboxPrompt: "Help me write a Canva Magic Studio prompt for my dream pet: a creature with [describe it here]",
          quackySystemPrompt: "You are Quacky helping a kid (8-15) design a dream pet in Canva Magic Studio. Expand their idea with colors, textures, and a fun action. Return ONE polished prompt under 60 words they can paste directly. One emoji max.",
          reflectionQuestion: "What part of your creature was hardest to describe in words?",
          xpReward: 50
        },
        {
          id: "l1_m2",
          title: "Poster for Your Favorite Thing",
          objective: "Make a poster about something you love using AI images.",
          instructions: [
            "Pick a topic you love: a sport, hobby, or subject",
            "Generate 3 different hero images in Canva Magic Studio",
            "Pick the best one and add a bold title on top",
            "Export your poster as a PNG"
          ],
          sandboxPrompt: "Help me design a poster about [your favorite topic]. Give me 3 image prompts and a catchy title.",
          quackySystemPrompt: "You are Quacky helping a kid design a poster. Give them 3 DIFFERENT image prompts (wide shot, close-up, action scene) and one title under 5 words. Return a short numbered list. One emoji.",
          reflectionQuestion: "Which of the 3 images came out closest to what you imagined?",
          xpReward: 50
        },
        {
          id: "l1_m3",
          title: "Event Brand Kit",
          objective: "Design a 3-piece visual kit for an imaginary event: a hero poster, an invite card, a social post.",
          instructions: [
            "Invent an event: a birthday bash, a talent show, a local gaming tournament, a bake sale",
            "Use Magic Design to build a poster around that theme",
            "Use Magic Media to create a matching invite card",
            "Use Magic Expand to turn one of them into a wide social post"
          ],
          sandboxPrompt: "I am designing a brand kit for an imaginary event: [event type and theme]. Help me describe the 3 pieces.",
          quackySystemPrompt: "You are Quacky helping a kid design a 3-piece event brand kit in Canva Magic Studio. Given the event, suggest a theme, a color pair, and describe 3 pieces (poster, invite, social post) with ONE visual through-line. Short numbered list. One party emoji.",
          reflectionQuestion: "If this event was real, who would sign up just from seeing your poster?",
          xpReward: 75
        }
      ],
      empireBuilderTip: "Designers, marketers, and founders use AI image tools every single day to pitch ideas and sell products. You just learned a real-world professional skill.",
      completionBadge: "canvas_kingdom_l1",
      nextLesson: "l2"
    },

    // ─────────────────────────────────────────────────────────
    // L2 : MIDJOURNEY
    // ─────────────────────────────────────────────────────────
    {
      id: "l2",
      worldId: "w1",
      lessonNumber: 2,
      title: "Midjourney",
      toolName: "Midjourney",
      toolUrl: "https://www.midjourney.com/",
      toolCategory: "AI image generation",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Turn any idea into stunning art in 40 seconds.",
      warmUpChallenge: "Every movie, game, and book starts with one image that makes someone say yes. Today your frame is the one that sells the idea. Pick a story beat: a chase, a discovery, a reveal. That is your scene.",
      warmUpQuiz: {
        question: "Which story beat would you build the hero image for?",
        options: [
          "The exact moment a secret door opens for the first time",
          "A rooftop chase at sunset in a city where gravity is broken",
          "The portrait of someone who just discovered they have powers"
        ]
      },
      features: [
        {
          feature: "Text to Image",
          description: "Type /imagine and a description, Midjourney creates 4 versions.",
          example: "/imagine a cute puppy playing in the park, cartoon style"
        },
        {
          feature: "Style Control",
          description: "Pick your art style: cartoon, realistic, painting, or anime.",
          example: "Add 'cartoon style' or 'oil painting' to guide the look"
        },
        {
          feature: "Upscale and Variation",
          description: "Make your favorite version bigger or try fresh variations.",
          example: "Click U1 to upscale, V1 for variations of image 1"
        }
      ],
      costInfo: "Basic Plan $10 per month for around 200 pictures. Standard Plan $30 per month for 1,000 pictures. Pro and Mega plans offer more privacy and unlimited pictures.",
      parentTip: "Start with the Basic Plan. Help your child type the first few prompts, discuss the images together, and only upgrade if they are truly hooked.",
      learningPoints: [
        "How to use /imagine commands in Discord",
        "Why style keywords change everything",
        "How to iterate: upscale, variation, try again",
        "Finding your own visual style through experimentation"
      ],
      quiz: [
        {
          question: "Which command starts a Midjourney image?",
          options: ["/start", "/draw", "/imagine", "/make"],
          correctAnswer: 2,
          explainer: "/imagine is the command, followed by your description of what you want to see."
        },
        {
          question: "If you want your picture to look like a cartoon, you should:",
          options: [
            "Just ask nicely",
            "Add 'cartoon style' to your prompt",
            "Type in all caps",
            "Hope for the best"
          ],
          correctAnswer: 1,
          explainer: "Style keywords are powerful. Add 'cartoon style', 'oil painting', or 'photorealistic' to guide the AI."
        },
        {
          question: "Midjourney gives you 4 versions. What does U1 do?",
          options: [
            "Deletes image 1",
            "Upscales image 1 to bigger size",
            "Makes image 1 black and white",
            "Sends image 1 to your email"
          ],
          correctAnswer: 1,
          explainer: "U1 upscales (makes bigger and sharper) version 1. V1 gives you variations of that version."
        }
      ],
      missions: [
        {
          id: "l2_m1",
          title: "Concept Art Commission",
          objective: "Pretend a game studio hired you. Design 3 enemy characters with one shared style.",
          instructions: [
            "Invent the game: horror, sci-fi, fantasy, or something new",
            "Write 3 Midjourney prompts, one per enemy, with the SAME style keyword",
            "Upscale your favorite of each set",
            "Put all 3 side by side so the shared style is obvious"
          ],
          sandboxPrompt: "Help me design 3 enemy characters for a [game genre] game that share the same art style.",
          quackySystemPrompt: "You are Quacky helping a kid design 3 enemy characters with ONE shared style. Given the game genre, suggest one style keyword (cinematic, dark anime, stylized 3D, low-poly, watercolor horror) and 3 distinct enemy prompts that ALL use that same style keyword. Return as 3 numbered /imagine prompts. One sword emoji.",
          reflectionQuestion: "If a studio actually saw your 3 enemies, which one would they green-light first?",
          xpReward: 75
        },
        {
          id: "l2_m2",
          title: "Book Cover Commission",
          objective: "Design the cover for a fantasy book that does not exist yet. Pitch the book in 3 words first.",
          instructions: [
            "Write a 3-word book pitch (ex: 'a sunken library', 'last dragon flies')",
            "Turn the pitch into a Midjourney prompt with mood, lighting, and style",
            "Upscale your favorite version",
            "Write a fake author name and title across the top of the cover using a design tool"
          ],
          sandboxPrompt: "My imaginary fantasy book is about [3-word pitch]. Help me write a Midjourney prompt for the cover.",
          quackySystemPrompt: "You are Quacky helping a kid design a fantasy book cover in Midjourney. Given the 3-word pitch, expand it into ONE /imagine prompt under 60 words with atmosphere, lighting, and style (oil painting, epic fantasy, cinematic). End with --ar 2:3 for book format. One book emoji.",
          reflectionQuestion: "What line would you put on the back cover to make someone buy it?",
          xpReward: 75
        },
        {
          id: "l2_m3",
          title: "Album Art Pitch",
          objective: "A musician friend drops their first song. Design 3 different cover options in 3 different moods.",
          instructions: [
            "Pick a song title (real or invented) and write one line about the song's mood",
            "Generate 3 Midjourney covers: one bold, one quiet, one strange",
            "Upscale each and line them up as a pitch sheet",
            "Pick your personal favorite and say why in one sentence"
          ],
          sandboxPrompt: "My song is called [title] and feels like [mood]. Help me pitch 3 different album cover directions in Midjourney.",
          quackySystemPrompt: "You are Quacky helping a kid pitch 3 album cover directions. Given the song title and mood, return 3 numbered /imagine prompts in 3 distinct moods (bold/quiet/strange) keeping the SAME subject. Each under 40 words. One music emoji.",
          reflectionQuestion: "Which of your 3 covers tells the story of the song best?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Concept artists, book cover designers, and album art freelancers charge $200 to $2000 per commission. You just did three commissions in one sitting. Studios pay for speed.",
      completionBadge: "canvas_kingdom_l2",
      nextLesson: "l3"
    },

    // ─────────────────────────────────────────────────────────
    // L3 : NIGHTCAFE STUDIO
    // ─────────────────────────────────────────────────────────
    {
      id: "l3",
      worldId: "w1",
      lessonNumber: 3,
      title: "NightCafe Studio",
      toolName: "NightCafe Studio",
      toolUrl: "https://creator.nightcafe.studio/",
      toolCategory: "AI image generation with animation",
      difficulty: "easy",
      estimatedMinutes: 18,
      heroLine: "Paint with words and make your art move.",
      warmUpChallenge: "Most AI art looks the same because most people ask for the same things. Your edge is style. Today you pick a look that feels like you, and everything you make becomes instantly recognizable.",
      warmUpQuiz: {
        question: "Which signature style would you build your whole portfolio around?",
        options: [
          "Pixar 3D with oil painting textures",
          "Watercolor storybook come to life",
          "Retro 90s anime with glowing neon edges"
        ]
      },
      features: [
        {
          feature: "Text to Image",
          description: "Describe your vision and NightCafe paints it in seconds.",
          example: "A coral reef filled with bioluminescent creatures"
        },
        {
          feature: "Animate Your Art",
          description: "Turn a still picture into a short captivating video.",
          example: "Make the fairy lights twinkle or the dragon breathe fire"
        },
        {
          feature: "Enhance and Upscale",
          description: "Make your picture larger and sharper for printing or sharing.",
          example: "Turn a small image into a poster-quality one"
        }
      ],
      costInfo: "Free plan lets you create a few amazing pictures. Paid plans start at $5.99 per month for 100 credits, with monthly and quarterly options.",
      parentTip: "Explore the free plan first. NightCafe has a friendly community gallery, so chat with your kid about what makes other artists' work interesting.",
      learningPoints: [
        "Choosing art styles that match your vision",
        "Adding animation to bring images to life",
        "Enhancing images for real-world use",
        "Learning from other artists in the gallery"
      ],
      quiz: [
        {
          question: "What is NightCafe Studio best known for?",
          options: [
            "Writing stories",
            "Creating AI pictures you can also animate",
            "Editing videos",
            "Making music"
          ],
          correctAnswer: 1,
          explainer: "NightCafe creates beautiful AI art and can also animate your favorite images into short videos."
        },
        {
          question: "What happens when you enhance a picture?",
          options: [
            "The picture disappears",
            "It becomes larger and sharper",
            "It turns into a song",
            "It gets deleted"
          ],
          correctAnswer: 1,
          explainer: "Enhancing makes your picture bigger and clearer, perfect for printing or showing off."
        },
        {
          question: "Which feature makes your art move?",
          options: ["Enhance", "Text to Image", "Animate", "Upload"],
          correctAnswer: 2,
          explainer: "The Animate feature turns your still picture into a captivating short video."
        }
      ],
      missions: [
        {
          id: "l3_m1",
          title: "Brand Mascot Design",
          objective: "Design a cute mascot character for a made-up business. Same character, 3 poses.",
          instructions: [
            "Invent a business: a bakery, a sports team, a tutoring service, an app",
            "Describe the mascot in NightCafe and generate with your signature style",
            "Generate 3 poses keeping the same look: waving, cheering, thinking",
            "Save the 3-pose sheet as your mascot kit"
          ],
          sandboxPrompt: "I am designing a mascot for [imaginary business name]. Help me describe the mascot for NightCafe.",
          quackySystemPrompt: "You are Quacky helping a kid design a mascot for an imaginary business. Given the business, suggest the mascot (animal, object, or character), personality, and signature color. Return ONE NightCafe prompt under 50 words plus a 'make 3 poses' note. One star emoji.",
          reflectionQuestion: "If this business was real, would your mascot work on a t-shirt?",
          xpReward: 50
        },
        {
          id: "l3_m2",
          title: "Editorial Illustration",
          objective: "An online magazine needs hero art for an article. Design 3 options they can pick from.",
          instructions: [
            "Invent a headline (ex: 'Why Teenagers Sleep Too Much', 'The Kid Who Invented a Language')",
            "Describe 3 different illustration directions for the same headline",
            "Generate each in NightCafe using the same art style",
            "Enhance your favorite so it is publication-ready"
          ],
          sandboxPrompt: "My fake magazine article is called [headline]. Help me describe 3 NightCafe illustration directions.",
          quackySystemPrompt: "You are Quacky helping a kid pitch editorial illustrations. Given a headline, return 3 numbered NightCafe prompts in 3 different visual metaphors (literal, symbolic, abstract) sharing one style. Each under 40 words. One newspaper emoji.",
          reflectionQuestion: "Which of your 3 illustrations would actually make a reader stop scrolling?",
          xpReward: 50
        },
        {
          id: "l3_m3",
          title: "Menu Hero Images",
          objective: "A local restaurant needs 4 hero images for their menu, one per section.",
          instructions: [
            "Invent the restaurant: cuisine, name, vibe (cozy, futuristic, cartoon)",
            "Design 4 NightCafe images: starters, mains, desserts, drinks",
            "Keep the SAME art style across all four",
            "Animate one of them as a bonus for social media"
          ],
          sandboxPrompt: "I am designing 4 menu hero images for [restaurant name, cuisine]. Help me describe them.",
          quackySystemPrompt: "You are Quacky helping a kid design 4 menu illustrations. Given the cuisine and vibe, return 4 numbered NightCafe prompts (starters, mains, desserts, drinks) all sharing ONE style keyword. Under 35 words each. One fork emoji.",
          reflectionQuestion: "If your menu art was hanging in a real cafe, what would the cafe name be?",
          xpReward: 75
        }
      ],
      empireBuilderTip: "Local cafes, magazines, and small brands all need illustrations but cannot afford agencies. Freelancers with a signature style earn $40 to $200 per illustration. You just built a 4-piece portfolio.",
      completionBadge: "canvas_kingdom_l3",
      nextLesson: "l4"
    },

    // ─────────────────────────────────────────────────────────
    // L4 : LEONARDO AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l4",
      worldId: "w1",
      lessonNumber: 4,
      title: "Leonardo AI",
      toolName: "Leonardo AI",
      toolUrl: "https://leonardo.ai/",
      toolCategory: "AI image generation for game art and characters",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Design characters and game art like a real studio.",
      warmUpChallenge: "Imagine you are starting your own video game. What does your main character look like? Sketch the hero. Today we make them real.",
      warmUpQuiz: {
        question: "What kind of game hero would you design?",
        options: [
          "A shape-shifting ninja",
          "A dragon-riding princess",
          "A robot with a secret heart"
        ]
      },
      features: [
        {
          feature: "Character Generator",
          description: "Design game characters with consistent style.",
          example: "Create a warrior hero and make 5 different poses of them"
        },
        {
          feature: "Prompt Magic",
          description: "Leonardo auto-improves your prompt to give better results.",
          example: "Type 'wizard' and it adds flowing robes, magical staff, and mood lighting"
        },
        {
          feature: "Finetuned Models",
          description: "Pick a model trained on exactly the style you want: anime, photorealistic, game art.",
          example: "Use the Anime Pastel Dream model for soft anime heroes"
        }
      ],
      costInfo: "Free plan gives you 150 tokens per day (enough for around 15 images). Paid plans start at $10 per month for 8,500 tokens and faster generation.",
      parentTip: "Leonardo is amazing for kids who love games. Encourage them to pick ONE character and make many versions, rather than jumping to new ideas each time.",
      learningPoints: [
        "How to design consistent characters",
        "Why choosing the right model matters",
        "Using Prompt Magic to learn what makes a great prompt",
        "Building a character sheet like a real game studio"
      ],
      quiz: [
        {
          question: "What is Leonardo AI best at?",
          options: [
            "Writing essays",
            "Creating characters and game art",
            "Making music",
            "Editing video"
          ],
          correctAnswer: 1,
          explainer: "Leonardo is a favorite of game designers and character artists because it makes consistent, high-quality character art."
        },
        {
          question: "What does Prompt Magic do?",
          options: [
            "Deletes your prompt",
            "Automatically improves your prompt for better results",
            "Adds music to your image",
            "Translates your prompt to Spanish"
          ],
          correctAnswer: 1,
          explainer: "Prompt Magic expands your short prompt into a detailed one, helping you learn what makes images better."
        },
        {
          question: "Why do finetuned models matter?",
          options: [
            "They are free forever",
            "They are trained on a specific style you want",
            "They make images faster only",
            "They do not matter"
          ],
          correctAnswer: 1,
          explainer: "Different models are trained on different styles (anime, realistic, pixel art). Picking the right one gives you the look you want."
        }
      ],
      missions: [
        {
          id: "l4_m1",
          title: "Your Game Hero",
          objective: "Design a main character for your imaginary video game.",
          instructions: [
            "Pick your game genre: adventure, fantasy, sci-fi, or sports",
            "Write a detailed Leonardo prompt for your hero",
            "Try 3 different models and compare the styles",
            "Save your favorite hero image"
          ],
          sandboxPrompt: "Help me write a Leonardo AI prompt for my video game hero: [name, powers, look].",
          quackySystemPrompt: "You are Quacky helping a kid design a video game hero in Leonardo AI. Expand their hero idea with pose, costume details, facial expression, and recommend a model (anime, realistic, or game art). Return ONE prompt under 70 words. One sword emoji.",
          reflectionQuestion: "What is the coolest thing your hero can do that others cannot?",
          xpReward: 50
        },
        {
          id: "l4_m2",
          title: "Boss Battle",
          objective: "Design the villain your hero must face.",
          instructions: [
            "Imagine the opposite of your hero",
            "Describe their lair, weapons, and special powers",
            "Generate with Prompt Magic on",
            "Compare the AI-improved prompt to your original"
          ],
          sandboxPrompt: "Help me describe a video game boss villain: their name, power, and lair.",
          quackySystemPrompt: "You are Quacky helping a kid design a game villain. Suggest a dramatic lair setting, a signature weapon, and a chilling pose. Return ONE Leonardo prompt under 70 words. One skull emoji.",
          reflectionQuestion: "Why would your villain turn out this way? What made them evil?",
          xpReward: 50
        },
        {
          id: "l4_m3",
          title: "Character Sheet",
          objective: "Build a mini character sheet with 4 poses of your hero.",
          instructions: [
            "Take your hero prompt from Mission 1",
            "Generate 4 versions: standing, running, fighting, victory pose",
            "Keep the character consistent (same outfit, same style)",
            "Arrange the 4 images side by side to make a character sheet"
          ],
          sandboxPrompt: "I need 4 pose variations of my hero: [describe hero]. Poses: standing, running, fighting, victory.",
          quackySystemPrompt: "You are Quacky helping a kid build a character sheet. Give them 4 separate Leonardo prompts (one per pose: standing neutral, running action, fighting attack, victory celebration) keeping the SAME costume and style across all. Return as a numbered list. One flex emoji.",
          reflectionQuestion: "Which pose looks the most like how you imagined your hero?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Every big video game and animated movie has a character sheet exactly like the one you just built. Studios pay character designers $60-120K per year to do this. You are learning the same craft.",
      completionBadge: "canvas_kingdom_l4",
      nextLesson: "l5"
    },

    // ─────────────────────────────────────────────────────────
    // L5 : DALL-E via ChatGPT
    // ─────────────────────────────────────────────────────────
    {
      id: "l5",
      worldId: "w1",
      lessonNumber: 5,
      title: "DALL-E via ChatGPT",
      toolName: "DALL-E (ChatGPT)",
      toolUrl: "https://chat.openai.com/",
      toolCategory: "AI image generation with conversation",
      difficulty: "easy",
      estimatedMinutes: 15,
      heroLine: "Chat with AI, and it draws for you while you talk.",
      warmUpChallenge: "Imagine you could talk to an artist friend who never gets tired. You describe a picture, they paint it, you ask for changes, they fix it. That friend exists now.",
      warmUpQuiz: {
        question: "What is the coolest thing about a chatting AI artist?",
        options: [
          "It remembers what you said before",
          "It can ask you questions to make art better",
          "It never runs out of ideas"
        ]
      },
      features: [
        {
          feature: "Conversational Art",
          description: "Ask for a picture, then say 'make it bigger' or 'add a cat'.",
          example: "Draw a castle. Now add a moat. Now make it night time."
        },
        {
          feature: "Image Editing",
          description: "Upload your own picture and ask for changes.",
          example: "Upload a photo of a dog and ask: give it a superhero cape"
        },
        {
          feature: "Style Matching",
          description: "Upload a reference image and DALL-E matches the style.",
          example: "Show it a Van Gogh painting and ask for your pet in that style"
        }
      ],
      costInfo: "ChatGPT Plus is $20 per month and includes DALL-E 3 image generation plus GPT-4. The free version does not include image generation.",
      parentTip: "DALL-E is very kid-friendly because you can talk to it like a friend. Teach your kid to iterate: first image, then refinement, then final. Three rounds usually gets perfection.",
      learningPoints: [
        "How conversation makes AI art better",
        "Iteration: not getting it perfect first try",
        "Using reference images to guide style",
        "When ChatGPT vs. dedicated image tools is the right call"
      ],
      quiz: [
        {
          question: "What makes DALL-E different from other AI art tools?",
          options: [
            "It is always free",
            "You talk to it in a conversation",
            "It only does black and white",
            "It needs no prompt"
          ],
          correctAnswer: 1,
          explainer: "DALL-E lives inside ChatGPT, so you can have a conversation: generate, discuss, refine."
        },
        {
          question: "Your first image is not quite right. What do you do?",
          options: [
            "Start over from scratch",
            "Tell ChatGPT what to change",
            "Delete the whole chat",
            "Give up"
          ],
          correctAnswer: 1,
          explainer: "That's the magic of conversational AI. Just say 'make the dragon bigger' or 'change the color to purple'."
        },
        {
          question: "What happens if you upload a photo and ask for changes?",
          options: [
            "Nothing",
            "DALL-E refuses",
            "DALL-E edits the photo for you",
            "The photo gets deleted"
          ],
          correctAnswer: 2,
          explainer: "DALL-E can take your photo as a starting point and apply whatever changes you ask for."
        }
      ],
      missions: [
        {
          id: "l5_m1",
          title: "The Iteration Game",
          objective: "Start with a simple prompt and make it AMAZING in 4 rounds.",
          instructions: [
            "Round 1: ask ChatGPT for a simple image ('a cat')",
            "Round 2: ask it to add setting ('now put it on a pirate ship')",
            "Round 3: change the mood ('make it stormy and dramatic')",
            "Round 4: add one last twist and save the final"
          ],
          sandboxPrompt: "Help me plan 4 iterations of an image that starts simple and becomes amazing. Starting subject: [your choice].",
          quackySystemPrompt: "You are Quacky helping a kid plan 4 DALL-E iterations. Given their starting subject, return 4 numbered refinement steps, each adding detail, setting, mood, and a final surprise twist. Keep each step under 15 words. One magic emoji.",
          reflectionQuestion: "Which round changed the image the most?",
          xpReward: 50
        },
        {
          id: "l5_m2",
          title: "Pet Superhero Makeover",
          objective: "Upload a real photo and transform it into AI art.",
          instructions: [
            "Pick a photo of your pet, a family member, or yourself (with permission)",
            "Upload it to ChatGPT",
            "Ask DALL-E to make them a superhero with a cape and powers",
            "Try different styles: cartoon, realistic, anime"
          ],
          sandboxPrompt: "Help me describe a superhero transformation for a photo of [who or what]: their powers, costume, and setting.",
          quackySystemPrompt: "You are Quacky helping a kid transform a photo into a superhero version. Suggest a superhero name, 3 superpowers, and a dramatic setting. Return as a quick numbered list. One cape emoji.",
          reflectionQuestion: "What would be the most surprising power for your superhero to have?",
          xpReward: 75
        },
        {
          id: "l5_m3",
          title: "Style Detective",
          objective: "Find a famous art style, then make your own picture in that style.",
          instructions: [
            "Pick a famous artist or style (Van Gogh, Studio Ghibli, Pixar, comic book)",
            "Ask ChatGPT about what makes that style unique",
            "Ask DALL-E to draw your pet or favorite thing in that style",
            "Compare it to the real style and see what matches"
          ],
          sandboxPrompt: "Tell me what makes [artist or style] unique, and give me a DALL-E prompt for my pet in that style.",
          quackySystemPrompt: "You are Quacky teaching a kid about art styles. Give them 3 signature traits of the style they picked, then ONE DALL-E prompt under 50 words for their subject in that style. One artist emoji.",
          reflectionQuestion: "Did your picture actually look like the famous style, or not quite?",
          xpReward: 75
        }
      ],
      empireBuilderTip: "Brand designers use DALL-E every day to quickly test logo ideas, mockups, and social media art before hiring an artist. You just learned how real agencies work.",
      completionBadge: "canvas_kingdom_l5",
      nextLesson: "l6"
    },

    // ─────────────────────────────────────────────────────────
    // L6 : RUNWAY
    // ─────────────────────────────────────────────────────────
    {
      id: "l6",
      worldId: "w1",
      lessonNumber: 6,
      title: "Runway",
      toolName: "Runway",
      toolUrl: "https://runwayml.com/",
      toolCategory: "AI image editing and expansion",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Edit images like a wizard with tools that feel like magic.",
      warmUpChallenge: "Imagine a paintbrush that can erase anything in a photo and fill it with whatever you want. That brush is real now. It is called Runway.",
      warmUpQuiz: {
        question: "If you could magically change one thing in a photo, what would it be?",
        options: [
          "Remove my annoying sibling from vacation pics",
          "Add a dragon to a school photo",
          "Change the weather to a rainbow"
        ]
      },
      features: [
        {
          feature: "AI Image Generation",
          description: "Create brand-new images from descriptions.",
          example: "A neon city skyline at midnight with flying cars"
        },
        {
          feature: "Expand Images",
          description: "Make a picture bigger by letting AI fill in the new space.",
          example: "Turn a selfie into a full scene with a background"
        },
        {
          feature: "Inpainting",
          description: "Erase anything in a picture and tell AI what to replace it with.",
          example: "Remove a tree and replace it with a flying carpet"
        }
      ],
      costInfo: "Free Basic plan includes limited credits. Standard plan is $12 per month, Pro is $28 per month, Unlimited is $76 per month with faster generation.",
      parentTip: "Runway is powerful. Start your kid on the free plan with image tools only before exploring its more advanced video features, which can be overwhelming.",
      learningPoints: [
        "How inpainting lets you edit any photo",
        "Using image expansion to turn small images into full scenes",
        "The difference between creating and editing with AI",
        "Professional image editing workflows"
      ],
      quiz: [
        {
          question: "What does inpainting let you do?",
          options: [
            "Delete all your pictures",
            "Erase and replace parts of an image",
            "Make pictures smaller only",
            "Convert images to text"
          ],
          correctAnswer: 1,
          explainer: "Inpainting is the magic of erasing something and telling the AI what should go there instead."
        },
        {
          question: "What is image expansion good for?",
          options: [
            "Shrinking images",
            "Turning a small photo into a larger scene",
            "Only works on selfies",
            "Nothing useful"
          ],
          correctAnswer: 1,
          explainer: "You can take a tight photo and expand it into a full landscape with AI filling in the new space."
        },
        {
          question: "What makes Runway different from Canva or Midjourney?",
          options: [
            "It cannot generate images",
            "It focuses on editing and transforming existing images",
            "It is only for music",
            "It does not work in browsers"
          ],
          correctAnswer: 1,
          explainer: "Runway is an editing powerhouse, while most tools are image generators. Both skills are useful."
        }
      ],
      missions: [
        {
          id: "l6_m1",
          title: "Listing Glow-Up",
          objective: "Take an ordinary room photo and stage it with AI so it looks like a real estate listing.",
          instructions: [
            "Take a photo of a real room with permission (or use a public photo)",
            "Use Runway inpainting to tidy clutter, add furniture, or fix lighting",
            "Use image expansion to reveal more of the room than the original shot",
            "Save before and after side by side"
          ],
          sandboxPrompt: "I want to stage a room photo for a real estate listing using Runway. Help me plan what to add, remove, and expand.",
          quackySystemPrompt: "You are Quacky helping a kid stage a room photo for a listing. Given the room type, suggest 2 things to remove (clutter), 2 to add (warm light, one accent piece), and 1 to expand. Short numbered list. One house emoji.",
          reflectionQuestion: "Would you actually rent or buy your staged version over the original?",
          xpReward: 50
        },
        {
          id: "l6_m2",
          title: "The Impossible Edit",
          objective: "Use inpainting to change a real photo in a wild way.",
          instructions: [
            "Pick a photo you have permission to use",
            "Open it in Runway and pick inpainting",
            "Paint over one thing in the photo",
            "Tell AI what should replace it (make it wild and funny)"
          ],
          sandboxPrompt: "I want to edit a photo of [describe photo] using Runway inpainting. I want to remove [thing] and add [wild new thing].",
          quackySystemPrompt: "You are Quacky helping a kid plan a wild photo edit. Give them 5 funny or wild replacement ideas for whatever they want to erase. Return as a numbered list. One sparkle emoji.",
          reflectionQuestion: "Did the AI blend the new element in smoothly, or could you tell it was edited?",
          xpReward: 75
        },
        {
          id: "l6_m3",
          title: "Expand Your World",
          objective: "Take a tight image and expand it into a full landscape.",
          instructions: [
            "Generate a close-up image of a subject (a knight, a fish, a robot)",
            "Use image expansion to zoom out in all 4 directions",
            "Let AI invent the surrounding world",
            "Save the expanded version as your final scene"
          ],
          sandboxPrompt: "I have a close-up image of [subject]. Help me describe what the surrounding world should look like when I expand it.",
          quackySystemPrompt: "You are Quacky helping a kid expand an image. Suggest what surrounds the subject in 4 directions (above, below, left, right). Return as a short list. One magnifying emoji.",
          reflectionQuestion: "Did the expanded world feel right for your subject, or did it surprise you?",
          xpReward: 75
        }
      ],
      empireBuilderTip: "Social media managers and e-commerce designers use Runway every day to polish product photos and expand hero images for websites. You are learning a $50/hour freelance skill.",
      completionBadge: "canvas_kingdom_l6",
      nextLesson: "l7"
    },

    // ─────────────────────────────────────────────────────────
    // L7 : GALILEO AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l7",
      worldId: "w1",
      lessonNumber: 7,
      title: "Galileo AI",
      toolName: "Galileo AI",
      toolUrl: "https://www.usegalileo.ai/",
      toolCategory: "AI app and website design",
      difficulty: "medium",
      estimatedMinutes: 18,
      heroLine: "Turn your app idea into a real design in seconds.",
      warmUpChallenge: "What app would you build if you could? An app for tracking your pet's meals? A game for matching music to feelings? Today you design its look.",
      warmUpQuiz: {
        question: "Which app design would you start with?",
        options: [
          "A magical pet tracker app",
          "A portfolio site for a creative friend",
          "A design that turns your drawings into real layouts"
        ]
      },
      features: [
        {
          feature: "Text to Design",
          description: "Describe your app or website and Galileo creates the design.",
          example: "A page for tracking my puppy's meals with cute icons"
        },
        {
          feature: "Picture to Design",
          description: "Upload a sketch and Galileo turns it into a real UI design.",
          example: "Sketch a treehouse app on paper, upload, get a polished design"
        },
        {
          feature: "Explore Gallery",
          description: "See designs other people made for inspiration.",
          example: "Flip through hundreds of AI designs like a magazine"
        }
      ],
      costInfo: "Standard plan is $19 per month with solid limits. Pro plan is $39 per month for heavy users. There is usually a free trial.",
      parentTip: "Galileo is perfect for kids who love apps. Ask them to sketch first on paper. The physical sketching teaches design thinking before AI shortcuts kick in.",
      learningPoints: [
        "The basics of UI (user interface) design",
        "How to describe what an app should do",
        "Turning sketches into digital designs",
        "Finding inspiration from other designers' work"
      ],
      quiz: [
        {
          question: "What is Galileo AI made for?",
          options: [
            "Drawing cartoons",
            "Designing apps and websites",
            "Writing songs",
            "Editing videos"
          ],
          correctAnswer: 1,
          explainer: "Galileo turns your ideas or sketches into app and website designs instantly."
        },
        {
          question: "What does 'UI' stand for?",
          options: [
            "Unlimited Ideas",
            "User Interface",
            "Ultimate Image",
            "Under Investigation"
          ],
          correctAnswer: 1,
          explainer: "UI is User Interface: everything a person sees and touches in an app (buttons, screens, icons)."
        },
        {
          question: "Which of these would you ask Galileo AI to do?",
          options: [
            "Write a poem",
            "Design a login screen for a game app",
            "Bake a cake",
            "Translate Spanish"
          ],
          correctAnswer: 1,
          explainer: "Galileo designs screens, pages, and layouts. Perfect for 'design me a login screen for...'."
        }
      ],
      missions: [
        {
          id: "l7_m1",
          title: "Startup Pitch Screens",
          objective: "Design the 3 key screens for a startup idea you would actually invest in: landing, signup, dashboard.",
          instructions: [
            "Pick a startup idea (solving a problem you actually have)",
            "Write a 1-sentence pitch: 'I help [who] [do what] so they [outcome]'",
            "Use Galileo to design 3 screens: landing page, signup flow, main dashboard",
            "Keep colors and fonts consistent across all 3"
          ],
          sandboxPrompt: "My startup idea is [one sentence]. Help me describe the 3 key screens to design in Galileo AI.",
          quackySystemPrompt: "You are Quacky helping a kid design a startup pitch deck in Galileo. Given the pitch, describe 3 screens (landing hook, signup flow, dashboard view) with specific elements for each. Short numbered list under 80 words total. One rocket emoji.",
          reflectionQuestion: "If an investor saw these 3 screens, what is the FIRST question they would ask?",
          xpReward: 75
        },
        {
          id: "l7_m2",
          title: "Portfolio Site for a Friend",
          objective: "Pick a creative friend (or family member). Design a 3-page portfolio site that shows off their work.",
          instructions: [
            "Pick your friend: photographer, musician, writer, baker, gamer",
            "List what their 3 pages should be: home, gallery, contact",
            "Use Galileo to design all 3 pages with one consistent style",
            "Show them the mockup and ask what they would change"
          ],
          sandboxPrompt: "My friend is a [what they do]. Help me describe a 3-page portfolio site for them in Galileo.",
          quackySystemPrompt: "You are Quacky helping a kid design a portfolio site for a friend. Given the friend's craft, describe 3 pages (hero introduction, work gallery, get-in-touch) with style suggestions that match the craft. Short numbered list under 80 words. One palette emoji.",
          reflectionQuestion: "What would your friend actually use this site for if it were real?",
          xpReward: 75
        },
        {
          id: "l7_m3",
          title: "Sketch to Screen",
          objective: "Draw an app on paper and let Galileo make it real.",
          instructions: [
            "Draw an app screen on paper with buttons and images",
            "Take a clear photo of your sketch",
            "Upload it to Galileo with a description",
            "Compare the AI version to your hand-drawn sketch"
          ],
          sandboxPrompt: "I drew an app screen for [purpose]. Help me describe it to Galileo so the AI version looks right.",
          quackySystemPrompt: "You are Quacky helping a kid describe their hand-drawn app sketch to Galileo. Guide them to describe each element: header, buttons, images, colors. Return a short description template under 80 words. One pencil emoji.",
          reflectionQuestion: "Did the AI version look like you drew, or did it go in a different direction?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Product designers at companies like Apple and Google sketch apps exactly like you just did. Then they turn sketches into polished designs. This is called the 'low-fi to hi-fi' pipeline, and it pays six figures.",
      completionBadge: "canvas_kingdom_l7",
      nextLesson: "l8"
    },

    // ─────────────────────────────────────────────────────────
    // L8 : IDEOGRAM (Text in Images)
    // ─────────────────────────────────────────────────────────
    {
      id: "l8",
      worldId: "w1",
      lessonNumber: 8,
      title: "Ideogram",
      toolName: "Ideogram",
      toolUrl: "https://ideogram.ai/",
      toolCategory: "AI image generation with readable text",
      difficulty: "medium",
      estimatedMinutes: 18,
      heroLine: "The only AI artist that can actually write words in your art.",
      warmUpChallenge: "Have you ever noticed AI pictures usually get letters all wrong? Like a sign that reads 'WELRKME' instead of 'WELCOME'? Today we fix that with Ideogram.",
      warmUpQuiz: {
        question: "What would you want AI to write in a picture for you?",
        options: [
          "Your name in giant glowing letters",
          "A shop sign for your dream business",
          "A birthday card for someone you love"
        ]
      },
      features: [
        {
          feature: "Perfect Text",
          description: "Ideogram draws letters and words correctly inside your image.",
          example: "A neon sign that actually reads 'PIZZA' without typos"
        },
        {
          feature: "Style Variety",
          description: "Choose from many styles: realistic, anime, typography, illustration.",
          example: "Your dream logo in watercolor vs. neon vs. 3D"
        },
        {
          feature: "Remix Feature",
          description: "Tweak any image by remixing it with small prompt changes.",
          example: "Start with a green logo, remix to make it purple and bigger"
        }
      ],
      costInfo: "Free plan gives solid daily credits. Plus plan is $8 per month for more speed and privacy. Pro plan is $20 per month for heavy designers.",
      parentTip: "Ideogram is the best AI for creating kid projects that need words (posters, certificates, logos). The free plan is generous.",
      learningPoints: [
        "Why text in AI images was broken until Ideogram",
        "How to write readable logos and signs",
        "Iterating with the remix feature",
        "When typography is the star of the design"
      ],
      quiz: [
        {
          question: "What is special about Ideogram?",
          options: [
            "It is only for 3D animation",
            "It can write words correctly in pictures",
            "It has only one style",
            "It does not need a prompt"
          ],
          correctAnswer: 1,
          explainer: "Most AI tools mess up text in images. Ideogram actually writes words correctly, which makes it perfect for logos, signs, and posters."
        },
        {
          question: "Which of these is the BEST job for Ideogram?",
          options: [
            "Making a 10-second TikTok",
            "Designing a logo for your lemonade stand",
            "Writing a novel",
            "Recording a podcast"
          ],
          correctAnswer: 1,
          explainer: "Logos need readable text. Ideogram is the king of AI logo and sign design."
        },
        {
          question: "What does remix let you do?",
          options: [
            "Delete an image",
            "Tweak an existing image with new prompt changes",
            "Only rotate the image",
            "Share the image on social media"
          ],
          correctAnswer: 1,
          explainer: "Remix takes an image and lets you change small things (color, style, size) while keeping the core the same."
        }
      ],
      missions: [
        {
          id: "l8_m1",
          title: "Your Name in Lights",
          objective: "Create a dramatic image with your name in it.",
          instructions: [
            "Pick a style: neon sign, Hollywood marquee, glowing magic",
            "Write an Ideogram prompt that includes your name",
            "Generate 4 versions and pick your favorite",
            "Use it as a phone wallpaper or share with your family"
          ],
          sandboxPrompt: "Help me write an Ideogram prompt with my name [name] in a dramatic style (neon, marquee, or magical).",
          quackySystemPrompt: "You are Quacky helping a kid create an image with their name in it. Given the name and chosen style, return ONE polished Ideogram prompt under 50 words where the name is clearly spelled out. One sparkle emoji.",
          reflectionQuestion: "Did Ideogram spell your name correctly on the first try?",
          xpReward: 50
        },
        {
          id: "l8_m2",
          title: "Your Future Business Logo",
          objective: "Design the logo for a business you might start one day.",
          instructions: [
            "Brainstorm a business idea: pet-sitting, design, gaming, baking",
            "Pick a name for your business",
            "Write an Ideogram prompt for a clean, memorable logo",
            "Remix 2 variations and pick the strongest"
          ],
          sandboxPrompt: "Help me design a logo in Ideogram for my future business: [name] which does [what].",
          quackySystemPrompt: "You are Quacky helping a kid design a logo in Ideogram. Given their business name and purpose, suggest a visual symbol, color pair, and font style. Return ONE logo prompt under 60 words with the name spelled out. One crown emoji.",
          reflectionQuestion: "If someone saw your logo on a storefront, what would they think your business sells?",
          xpReward: 75
        },
        {
          id: "l8_m3",
          title: "Gift Card Design",
          objective: "Make a birthday or thank-you card for someone special using Ideogram.",
          instructions: [
            "Pick who the card is for and what the message should say",
            "Pick a style: cartoon, elegant, watercolor, bold",
            "Write an Ideogram prompt with the message as text in the card",
            "Print or share with the recipient"
          ],
          sandboxPrompt: "Help me design a card for [person] that says [message] using Ideogram.",
          quackySystemPrompt: "You are Quacky helping a kid design a personalized card. Suggest a cheerful style, a color palette, and a visual theme that matches the recipient. Return ONE Ideogram prompt under 60 words with the message spelled clearly. One heart emoji.",
          reflectionQuestion: "How did it feel to give (or share) your card to the person you made it for?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Every brand you know (Nike, Apple, Coca-Cola) started as a logo design. Graphic designers get $500 to $5,000 for a single logo. You just did it yourself. Repeat this 10 times and you have a portfolio.",
      completionBadge: "canvas_kingdom_l8",
      nextLesson: null // End of world : next lesson unlocks Capstone
    }
  ],
  empireBuilderModule: {
    id: "eb_w1",
    worldId: "w1",
    title: "Your First Creative Studio",
    tagline: "Turn your AI art skills into a real service that people will pay for.",
    estimatedMinutes: 40,
    businessArchetype: "Freelance creative designer",
    targetCustomer: "Friends, family, small local businesses, youth-led organizations, indie creators.",
    realWorldExamples: [
      "14-year-old Zoe makes $200 a month designing custom pet portraits with DALL-E.",
      "A 12-year-old in Dubai runs an Instagram shop selling AI-generated sticker packs.",
      "Kid creators on Fiverr charge $5 to $50 for AI logos for small businesses."
    ],
    businessSteps: [
      {
        step: 1,
        title: "Pick your lane",
        description: "Choose ONE thing you will design. Specialists win over generalists.",
        usingTools: ["Leonardo AI", "Ideogram", "Canva Magic Studio"],
        deliverable: "A one-sentence pitch: I design [thing] for [who] using AI."
      },
      {
        step: 2,
        title: "Build your first 3 samples",
        description: "Make 3 examples of your service. These are your portfolio.",
        usingTools: ["Leonardo AI", "Midjourney", "Canva Magic Studio"],
        deliverable: "3 finished pieces saved in a folder you control."
      },
      {
        step: 3,
        title: "Design your own brand",
        description: "Use Ideogram to create a logo for your studio. Pick a name, a color, and a style.",
        usingTools: ["Ideogram"],
        deliverable: "One logo plus one banner with your studio name."
      },
      {
        step: 4,
        title: "Build your pitch page",
        description: "Use Galileo AI to design a simple one-page site showing your 3 samples, logo, and contact.",
        usingTools: ["Galileo AI"],
        deliverable: "One mockup of your studio page."
      },
      {
        step: 5,
        title: "Make your first offer",
        description: "Write a short message you can send to 5 people asking if they want one piece from you.",
        usingTools: ["DALL-E via ChatGPT"],
        deliverable: "A sendable pitch message in your notes app."
      }
    ],
    quackyPlaybook: "You built skills. Now build a business. No one starts big. Zoe started with one pet portrait for her aunt. Your first customer will be someone you already know. Your first price will be small. That is the point.",
    pricingLesson: {
      yourFirstPrice: "$0 for your first piece (trade for feedback). $5 to $10 for pieces 2 through 5. $15 to $25 once you have five happy clients.",
      whyThisPrice: "Free work builds a portfolio. Cheap work builds confidence. Real prices build a business. Kids skip steps. Empire builders do all three.",
      scaleUp: "Every 10 happy clients, double your price. If people say no, your work is not bad. Your audience is wrong. Change lanes."
    },
    firstCustomerExercise: {
      task: "Pick ONE person in your life. Design a message asking if they want free art in exchange for feedback. Send it.",
      prompt: "Help me write a short friendly message to [person] offering to make them one [thing] for free in exchange for honest feedback.",
      quackySystemPrompt: "You are Quacky helping a kid write a first-customer pitch. Keep it friendly, short, under 80 words. Structure: warm opener, what you built, what you offer (one free piece), what you want (feedback only), soft close. One encouraging emoji."
    },
    xpReward: 500,
    completionBadge: "canvas_kingdom_champion"
  },
  capstone: {
    id: "cap_w1",
    worldId: "w1",
    title: "The Canvas Kingdom Portfolio",
    narrative: "A real portfolio beats any certificate. By the end of Canvas Kingdom, you have earned the right to call yourself a designer. This is your graduation piece.",
    requiredMissions: ["l1_m1", "l2_m2", "l4_m3", "l7_m1", "l8_m2"],
    deliverableSpec: "Submit ONE portfolio document (PDF or slide deck) with: your studio name and logo, 5 best pieces from Canvas Kingdom (one per tool), a one-line description of each piece, and your services-and-prices page.",
    submissionFormat: "portfolio",
    parentReviewPrompt: "Your child has just built a designer portfolio. Please review it together, pick their strongest piece, and discuss who in your network might be their first real client.",
    xpReward: 1000,
    unlocksWorld: "w2"
  }
};

// ═══════════════════════════════════════════════════════════
// WORLD REGISTRY (other worlds to follow in next sessions)
// ═══════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════
// WORLD 2 : STORY FORGE
// AI writing, storytelling, voice, and screenplays
// Empire Builder: Storytelling as a product
// ═══════════════════════════════════════════════════════════

const STORY_FORGE: World = {
  id: "w2",
  name: "Story Forge",
  color: "#7B52EE",
  icon: "scroll",
  description: "Turn your voice, your ideas, and your imagination into stories people actually want to hear.",
  empireBuilderConcept: "Storytelling as a product : writers, podcasters, and creators get paid to make people feel something.",
  lessonCount: 8,
  unlockRequirement: { previousWorld: "w1", minXP: 2000 },
  capstoneProject: "Publish a 5-piece story collection across text, audio, and video using 3 different AI writing tools.",
  lessons: [
    // ─────────────────────────────────────────────────────────
    // L9 : CHATGPT
    // ─────────────────────────────────────────────────────────
    {
      id: "l9",
      worldId: "w2",
      lessonNumber: 1,
      title: "ChatGPT",
      toolName: "ChatGPT",
      toolUrl: "https://chat.openai.com/",
      toolCategory: "AI conversation and writing assistant",
      difficulty: "easy",
      estimatedMinutes: 18,
      heroLine: "Your always-on writing partner who never runs out of ideas.",
      warmUpChallenge: "Writing used to take hours of staring at a blank page. Now your blank page talks back. Today you stop writing alone.",
      warmUpQuiz: {
        question: "What would you write first if you had a 24/7 writing partner?",
        options: [
          "The birthday speech I keep avoiding",
          "The first chapter of a book I have in my head",
          "A tough email I do not know how to start"
        ]
      },
      features: [
        {
          feature: "Conversation mode",
          description: "Ask, get a draft, ask for changes. It remembers the whole conversation.",
          example: "Write a thank you note. Now make it funnier. Now cut it in half."
        },
        {
          feature: "Custom instructions",
          description: "Tell ChatGPT how you write so it always matches your voice.",
          example: "I am 12, I write short sentences, I use humor not formal words"
        },
        {
          feature: "Role-play mode",
          description: "Ask ChatGPT to play a role: interviewer, editor, tutor, critic.",
          example: "Be my English teacher and give me honest notes on this paragraph"
        }
      ],
      costInfo: "Free plan covers most writing tasks. ChatGPT Plus is $20 per month for faster responses, GPT-4, and DALL-E images.",
      parentTip: "Teach your kid to iterate, not accept the first draft. Three rounds of refinement is where real writing lives.",
      learningPoints: [
        "How to give clear writing instructions",
        "The power of asking for revisions",
        "Setting your own voice and tone",
        "Using AI as an editor, not a replacement"
      ],
      quiz: [
        {
          question: "What is the BEST way to get a great draft from ChatGPT?",
          options: [
            "Ask for one line and hope",
            "Describe who it is for, the tone, and the length",
            "Type just one word",
            "Copy a boring example"
          ],
          correctAnswer: 1,
          explainer: "Great prompts give audience, tone, and length. Skip any of those and the output is random."
        },
        {
          question: "The first draft is not quite right. You should:",
          options: [
            "Start over in a new chat",
            "Ask ChatGPT to revise specific parts",
            "Use it anyway",
            "Give up on the project"
          ],
          correctAnswer: 1,
          explainer: "Iteration is the whole game. Say what to change and ChatGPT rewrites only that part."
        },
        {
          question: "Why set custom instructions?",
          options: [
            "To make ChatGPT slower",
            "So every answer matches your voice and context",
            "It looks cool",
            "It costs less"
          ],
          correctAnswer: 1,
          explainer: "Custom instructions mean ChatGPT knows your age, style, and goals from the first message of every chat."
        }
      ],
      missions: [
        {
          id: "l9_m1",
          title: "School Newsletter Feature",
          objective: "Write a 300-word feature for a school newsletter about a topic you care about.",
          instructions: [
            "Pick your topic: a cause, a club, a person you admire",
            "Ask ChatGPT to draft 300 words in a friendly student voice",
            "Revise twice: tighten the intro, add a memorable ending",
            "Read it out loud and fix anything that sounds robotic"
          ],
          sandboxPrompt: "Help me write a 300-word school newsletter feature about [topic] in a friendly student voice.",
          quackySystemPrompt: "You are Quacky helping a kid write a school newsletter feature. Given the topic, draft around 300 words in a warm, student-to-student voice with a strong hook line and a memorable closer. One newspaper emoji.",
          reflectionQuestion: "Which sentence would make a friend actually stop scrolling and read?",
          xpReward: 50
        },
        {
          id: "l9_m2",
          title: "Partnership Email to a Brand",
          objective: "Draft a real email pitching yourself to a brand you love.",
          instructions: [
            "Pick a brand you genuinely love and use",
            "Identify what you could offer: review, content, student ambassador role",
            "Ask ChatGPT to draft a short, respectful email",
            "Revise so it sounds like YOU wrote it, not a robot"
          ],
          sandboxPrompt: "Help me draft a short partnership email to [brand] offering [what you can do] as a student ambassador or reviewer.",
          quackySystemPrompt: "You are Quacky helping a kid pitch a brand partnership. Draft a short, genuine email under 120 words: personal intro, why you love the brand, what you can offer, what you ask for, soft close. One handshake emoji.",
          reflectionQuestion: "What made your email feel like a real person wrote it?",
          xpReward: 75
        },
        {
          id: "l9_m3",
          title: "Grandparent Memory Chapter",
          objective: "Interview a family elder and turn their story into a polished chapter.",
          instructions: [
            "Prepare 5 good questions about their childhood or a life moment",
            "Record the conversation on your phone (with permission)",
            "Transcribe the key quotes and feed them to ChatGPT",
            "Ask it to shape the raw quotes into a warm 500-word chapter"
          ],
          sandboxPrompt: "I recorded my grandparent talking about [topic]. Help me turn these notes into a 500-word chapter that feels like them.",
          quackySystemPrompt: "You are Quacky helping a kid shape grandparent interview notes into a warm family memory chapter. Keep their original phrases intact, add only connective narrative. Aim for around 500 words. One heart emoji.",
          reflectionQuestion: "What did you learn about your elder that you did not know before?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Ghostwriters charge $50 to $500 per article. Family legacy writers charge $500 to $5000 per memoir chapter. You are learning the same craft.",
      completionBadge: "story_forge_l1",
      nextLesson: "l10"
    },

    // ─────────────────────────────────────────────────────────
    // L10 : CLAUDE
    // ─────────────────────────────────────────────────────────
    {
      id: "l10",
      worldId: "w2",
      lessonNumber: 2,
      title: "Claude",
      toolName: "Claude",
      toolUrl: "https://claude.ai/",
      toolCategory: "AI writing with deep reasoning",
      difficulty: "medium",
      estimatedMinutes: 22,
      heroLine: "The writing partner that actually thinks before it writes.",
      warmUpChallenge: "Some writing needs speed. Some writing needs depth. Today you learn when to slow down and let an AI actually think.",
      warmUpQuiz: {
        question: "Which kind of writing needs the most careful thinking?",
        options: [
          "A 2000-word chapter for younger siblings",
          "A tutorial that actually teaches a skill",
          "A persuasive letter that asks for something big"
        ]
      },
      features: [
        {
          feature: "Long context",
          description: "Feed Claude a whole book chapter or a 50-page document and it remembers everything.",
          example: "Paste an entire short story, then ask Claude to revise chapter 3 only"
        },
        {
          feature: "Honest reasoning",
          description: "Claude explains why it made a writing choice.",
          example: "Ask: why did you start with dialogue instead of description?"
        },
        {
          feature: "Voice matching",
          description: "Paste your old writing and Claude learns your style.",
          example: "Here are 3 things I wrote. Write a new one in the same voice."
        }
      ],
      costInfo: "Free plan is generous. Claude Pro is $20 per month with priority access, longer conversations, and the newest model.",
      parentTip: "Claude is best for deep work. Use it for assignments that deserve real time and attention, not quick chats.",
      learningPoints: [
        "When depth matters more than speed",
        "Feeding context into long writing tasks",
        "Asking why to learn from the AI",
        "Matching voice instead of writing generic text"
      ],
      quiz: [
        {
          question: "What is Claude especially strong at?",
          options: [
            "Generating images",
            "Long-form thinking and nuanced writing",
            "Only one-sentence replies",
            "Coding games"
          ],
          correctAnswer: 1,
          explainer: "Claude shines on long, careful writing like chapters, tutorials, and nuanced letters."
        },
        {
          question: "You paste 3 of your old writing samples. Why?",
          options: [
            "To delete them",
            "So Claude can match your voice",
            "It does nothing",
            "It translates them"
          ],
          correctAnswer: 1,
          explainer: "When Claude sees examples of your voice, it stops writing generic text and starts writing like YOU."
        },
        {
          question: "Claude wrote something you love. Next step?",
          options: [
            "Ask why it made those choices so you learn",
            "Never ask questions",
            "Delete the chat",
            "Always rewrite it"
          ],
          correctAnswer: 0,
          explainer: "Asking WHY teaches you the craft. Over time you can write like Claude even without Claude."
        }
      ],
      missions: [
        {
          id: "l10_m1",
          title: "First Chapter for Younger Kids",
          objective: "Write chapter one of a children's book for kids younger than you.",
          instructions: [
            "Pick an age: 5-7, 8-10",
            "Tell Claude the theme, setting, and main character",
            "Ask for a 500-word first chapter with simple sentences",
            "Revise so the hook line is unforgettable"
          ],
          sandboxPrompt: "Help me write chapter one of a children's book for ages [X-Y]. Theme: [theme]. Character: [character].",
          quackySystemPrompt: "You are Quacky helping a kid write a children's book chapter one. Given theme and character, write around 500 words with short, vivid sentences and a gripping hook. End on a cliffhanger. One book emoji.",
          reflectionQuestion: "Would a kid that age actually turn the page?",
          xpReward: 75
        },
        {
          id: "l10_m2",
          title: "Tutorial That Teaches",
          objective: "Pick something you are good at. Write the tutorial you wish existed.",
          instructions: [
            "Pick your skill: a video game, a craft, a study trick, a sport move",
            "List 5 steps from beginner to intermediate",
            "Ask Claude to write a warm, student-friendly tutorial",
            "Add one personal story that makes the tutorial feel human"
          ],
          sandboxPrompt: "I am good at [skill]. Help me write a 600-word tutorial for beginners with 5 steps.",
          quackySystemPrompt: "You are Quacky helping a kid write a tutorial. Structure: personal hook, 5 numbered steps with why each matters, one mistake to avoid, encouraging closer. Around 600 words. One spark emoji.",
          reflectionQuestion: "Who is the one person who would read this and say thank you?",
          xpReward: 75
        },
        {
          id: "l10_m3",
          title: "Persuasive Letter",
          objective: "Write the most thoughtful letter of your life asking for something big.",
          instructions: [
            "Pick your ask: extended curfew, a pet, a trip, a class change",
            "Tell Claude your actual situation and what the parent or teacher might worry about",
            "Ask for a letter that answers those worries before they bring them up",
            "Read it aloud to feel the tone before you send it"
          ],
          sandboxPrompt: "I want to ask [parent or teacher] for [thing]. Their likely concerns are [list]. Help me write a thoughtful letter that addresses each concern.",
          quackySystemPrompt: "You are Quacky helping a kid write a persuasive letter. Use structure: warm opener, the ask, three concerns the reader has, how you handle each, what changes if they say yes, respectful close. Mature but still a kid's voice. One letter emoji.",
          reflectionQuestion: "Which worry were you least ready to answer before Claude helped you?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Editorial ghostwriters, tutorial creators on Skillshare, and speechwriters all get paid for the same skill. Depth writing is a six-figure freelance path.",
      completionBadge: "story_forge_l2",
      nextLesson: "l11"
    },

    // ─────────────────────────────────────────────────────────
    // L11 : DESCRIPT
    // ─────────────────────────────────────────────────────────
    {
      id: "l11",
      worldId: "w2",
      lessonNumber: 3,
      title: "Descript",
      toolName: "Descript",
      toolUrl: "https://www.descript.com/",
      toolCategory: "AI podcast and audio editing",
      difficulty: "medium",
      estimatedMinutes: 22,
      heroLine: "Record like a beginner, edit like a professional.",
      warmUpChallenge: "The hardest part of making a podcast used to be editing out every ah and um. Now that takes one click. Today you sound professional the moment you stop recording.",
      warmUpQuiz: {
        question: "Which audio show would you start if editing was easy?",
        options: [
          "A 3-minute interview show with one guest per week",
          "Solo audio diary where I talk through my week",
          "Review show where I test things and share honest takes"
        ]
      },
      features: [
        {
          feature: "Edit audio by editing text",
          description: "Descript transcribes your recording, so delete a word and the audio cuts to match.",
          example: "Delete an embarrassing sentence from the transcript and the audio disappears"
        },
        {
          feature: "One-click filler word removal",
          description: "Remove every um, uh, like in one action.",
          example: "A 10-minute recording loses 47 ums automatically"
        },
        {
          feature: "AI voice cloning",
          description: "Record enough of your voice and Descript can type new sentences in your voice.",
          example: "Add a missing line to your podcast without re-recording"
        }
      ],
      costInfo: "Free plan includes solid editing. Paid plans start at $12 per month with more hours and AI voice features.",
      parentTip: "Descript is powerful. Start with the free plan and focus on editing real recordings before unlocking the AI voice clone.",
      learningPoints: [
        "Why editing matters more than recording gear",
        "Text-based editing as a superpower",
        "Confidence from knowing mistakes are fixable",
        "When to use AI voice (and when not to)"
      ],
      quiz: [
        {
          question: "What is Descript famous for?",
          options: [
            "Editing audio by editing the transcript",
            "Only recording music",
            "Generating images",
            "Translating languages"
          ],
          correctAnswer: 0,
          explainer: "Descript turns your audio into editable text. Delete a word, delete the audio. Game changing."
        },
        {
          question: "One-click filler removal kills:",
          options: [
            "All your audio",
            "Every um, uh, and like",
            "Your podcast file",
            "Nothing useful"
          ],
          correctAnswer: 1,
          explainer: "Filler word removal makes amateur recordings sound studio-grade instantly."
        },
        {
          question: "When is AI voice cloning useful?",
          options: [
            "Replacing your whole voice forever",
            "Adding small missing lines without re-recording",
            "Pretending to be someone else",
            "Never"
          ],
          correctAnswer: 1,
          explainer: "The honest use case: patch small gaps in your own voice. Pretending to be someone else is not cool."
        }
      ],
      missions: [
        {
          id: "l11_m1",
          title: "Interview Show Pilot",
          objective: "Record and publish a 3-minute interview show pilot.",
          instructions: [
            "Interview one family member or friend for 5 minutes",
            "Import the recording into Descript",
            "Edit down to the best 3 minutes by cutting the weak parts",
            "Run filler word removal and export"
          ],
          sandboxPrompt: "I interviewed [who] about [topic]. Help me plan 5 good questions to guide editing.",
          quackySystemPrompt: "You are Quacky helping a kid prep an interview. Given the guest and topic, return 5 numbered questions that move from easy to deep to surprising. Each question under 15 words. One mic emoji.",
          reflectionQuestion: "Which sentence of your guest would you put on a poster?",
          xpReward: 75
        },
        {
          id: "l11_m2",
          title: "Audio Diary Episode",
          objective: "Record a 2-minute personal narrative about a moment from this month.",
          instructions: [
            "Pick a moment from this month that changed how you think",
            "Record it on your phone as one take",
            "Import to Descript, clean the fillers, cut any slow parts",
            "Add 10 seconds of silence at start and end for breathing room"
          ],
          sandboxPrompt: "I want to record an audio diary about [moment]. Help me outline the emotional arc in 4 beats.",
          quackySystemPrompt: "You are Quacky helping a kid structure a 2-minute audio diary. Given the moment, outline 4 beats: where you started, what happened, what you felt, what changed. Under 60 words total. One heart emoji.",
          reflectionQuestion: "How did hearing your own voice back change how you felt about the moment?",
          xpReward: 75
        },
        {
          id: "l11_m3",
          title: "30-Second Ad Read",
          objective: "Write and voice a 30-second ad for an imaginary product you actually want to exist.",
          instructions: [
            "Invent the product: something you wish existed",
            "Write a 70-word script that ends with a clear call to action",
            "Record in one take, punchy and energetic",
            "Edit in Descript so it feels like real radio"
          ],
          sandboxPrompt: "I want to write and record a 30-second ad for [imaginary product]. Help me write the script.",
          quackySystemPrompt: "You are Quacky helping a kid write a 30-second radio ad. Structure: attention hook, problem, product solution, one specific benefit, call to action. Exactly 70-75 words, punchy energy. One megaphone emoji.",
          reflectionQuestion: "Would YOU buy your own product after hearing your ad?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Podcast editors charge $50 to $300 per episode. Ad voice actors earn $100 to $1000 per spot. You can learn both crafts before you finish middle school.",
      completionBadge: "story_forge_l3",
      nextLesson: "l12"
    },

    // ─────────────────────────────────────────────────────────
    // L12 : ELEVENLABS
    // ─────────────────────────────────────────────────────────
    {
      id: "l12",
      worldId: "w2",
      lessonNumber: 4,
      title: "ElevenLabs",
      toolName: "ElevenLabs",
      toolUrl: "https://elevenlabs.io/",
      toolCategory: "AI voice generation and narration",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Make any words sound like a real human speaking them.",
      warmUpChallenge: "Before this year, audiobook narration cost thousands of dollars per chapter. Now one line of text becomes a professional performance. Today you become a narrator.",
      warmUpQuiz: {
        question: "Which voice project would you launch first?",
        options: [
          "Narrate a chapter of my favorite book in my own voice",
          "Make a museum-style guide for my neighborhood",
          "Create a multilingual welcome message to the world"
        ]
      },
      features: [
        {
          feature: "Text to speech",
          description: "Type anything, pick a voice, get professional audio instantly.",
          example: "Paste a 500-word story and get a 3-minute narrated audio file"
        },
        {
          feature: "Voice library",
          description: "Pick from dozens of voices by age, accent, mood, and gender.",
          example: "Find a British grandmother voice for a cozy bedtime story"
        },
        {
          feature: "Voice cloning",
          description: "Record yourself for a few minutes and make your clone narrate anything.",
          example: "Record 2 minutes, then type new words and hear yourself say them"
        }
      ],
      costInfo: "Free plan includes 10,000 characters per month. Starter plan is $5 per month for 30,000 characters plus voice cloning.",
      parentTip: "Set ground rules early: ElevenLabs voice cloning is NEVER used to imitate someone without their knowledge. Only your own voice, only with permission.",
      learningPoints: [
        "How AI narration sounds so human",
        "Picking the right voice for the right story",
        "Voice cloning ethics : your voice, your rules",
        "Building audio content at scale"
      ],
      quiz: [
        {
          question: "What does ElevenLabs do?",
          options: [
            "Draws pictures",
            "Turns typed text into human-sounding speech",
            "Writes your text for you",
            "Plays music"
          ],
          correctAnswer: 1,
          explainer: "ElevenLabs is the best text-to-speech AI. You type, it reads it out in a natural human voice."
        },
        {
          question: "When is it OK to clone someone's voice?",
          options: [
            "Anytime, no rules",
            "Only your own voice, or with clear permission",
            "Anyone famous",
            "Only during weekends"
          ],
          correctAnswer: 1,
          explainer: "Only clone YOUR voice, or someone who said yes with full understanding. Never imitate without consent. That is a rule that protects everyone."
        },
        {
          question: "The voice library lets you:",
          options: [
            "Only pick one robot voice",
            "Choose by age, mood, accent, and gender",
            "Read minds",
            "Write songs"
          ],
          correctAnswer: 1,
          explainer: "Hundreds of voices by age, mood, and accent. Pick the voice that fits the story."
        }
      ],
      missions: [
        {
          id: "l12_m1",
          title: "Audiobook Sample",
          objective: "Narrate a 1-minute passage from a favorite book (or your own writing).",
          instructions: [
            "Pick a 150-word passage with emotion",
            "Choose 3 different ElevenLabs voices and preview each",
            "Pick the voice that serves the passage best",
            "Export the audio and save it as your sample"
          ],
          sandboxPrompt: "I want to narrate this passage: [paste passage]. Help me decide what voice style fits: age, mood, accent.",
          quackySystemPrompt: "You are Quacky helping a kid pick a narration voice in ElevenLabs. Given the passage, recommend 3 voices (age, accent, mood) and explain why each would work differently. Short numbered list. One headphone emoji.",
          reflectionQuestion: "Did the voice change how the passage felt? How much?",
          xpReward: 75
        },
        {
          id: "l12_m2",
          title: "Neighborhood Audio Guide",
          objective: "Create a 90-second guide to a real or imagined place you know well.",
          instructions: [
            "Pick your place: your street, a favorite park, an imagined shop",
            "Write a 200-word script like you are walking a visitor through it",
            "Use ElevenLabs to narrate in a warm, welcoming voice",
            "Export and imagine playing it when someone new visits"
          ],
          sandboxPrompt: "Help me write a 200-word narrated guide to [place], like a warm local showing a visitor around.",
          quackySystemPrompt: "You are Quacky helping a kid write an audio walking guide. Given the place, write 200 words in first person, walking pace, with specific sensory details. Warm and welcoming. One compass emoji.",
          reflectionQuestion: "What did your narrator notice that you usually walk past?",
          xpReward: 75
        },
        {
          id: "l12_m3",
          title: "Hello World Multilingual",
          objective: "Write a 30-second welcome message and voice it in 3 languages.",
          instructions: [
            "Write the message in your native language (about 50 words)",
            "Use ChatGPT or Claude to translate into 2 other languages",
            "Use ElevenLabs multilingual voices to narrate all 3",
            "Line them up as one continuous intro"
          ],
          sandboxPrompt: "Help me write a 50-word welcome message about who I am, then translate it into [language 2] and [language 3].",
          quackySystemPrompt: "You are Quacky helping a kid write a multilingual intro. Given the native language message, return the English version first, then the 2 translations the kid requested. Keep meaning and warmth identical across all 3. One globe emoji.",
          reflectionQuestion: "Which version of you felt most true to yourself?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Voice narration is a global business. Audiobook narrators earn $100 to $500 per finished hour. Voice actors for ads, games, and animations can make it a full career.",
      completionBadge: "story_forge_l4",
      nextLesson: "l13"
    },

    // ─────────────────────────────────────────────────────────
    // L13 : HEYGEN
    // ─────────────────────────────────────────────────────────
    {
      id: "l13",
      worldId: "w2",
      lessonNumber: 5,
      title: "HeyGen",
      toolName: "HeyGen",
      toolUrl: "https://www.heygen.com/",
      toolCategory: "AI avatar video generation",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Star in your own video without ever turning on the camera.",
      warmUpChallenge: "Some kids love being on camera. Some hate it. HeyGen does not care. Today your message is a star, and your face is optional.",
      warmUpQuiz: {
        question: "What video would you make if you never had to be on camera?",
        options: [
          "A how-to video explaining a skill I am great at",
          "A welcome video for a creative project I am launching",
          "A translated message for kids in another country"
        ]
      },
      features: [
        {
          feature: "Avatar library",
          description: "Pick a realistic human avatar that reads your script on camera.",
          example: "Choose from 100+ avatars by age, style, and setting"
        },
        {
          feature: "Custom avatar",
          description: "Record 2 minutes of yourself on camera and create your personal AI avatar.",
          example: "Your own face, your own voice, saying any new words you type"
        },
        {
          feature: "Video translation",
          description: "Upload a video in one language, get a dubbed version in another with matching lip sync.",
          example: "Your English explainer becomes Arabic, Spanish, or Japanese"
        }
      ],
      costInfo: "Free plan gives 3 minutes of avatar video per month. Creator plan starts at $24 per month for 15 minutes and more features.",
      parentTip: "HeyGen creating your kid's custom avatar needs parent consent. Start with stock avatars first. Move to custom only if and when the family wants to.",
      learningPoints: [
        "Storytelling without being on camera",
        "When an avatar works better than real footage",
        "How translation unlocks global audiences",
        "Ethics of AI avatars and likeness rights"
      ],
      quiz: [
        {
          question: "What is HeyGen's main magic?",
          options: [
            "Only editing photos",
            "Making realistic avatars speak any script",
            "Writing emails",
            "Making music"
          ],
          correctAnswer: 1,
          explainer: "HeyGen turns typed scripts into videos with realistic talking avatars. Wild stuff."
        },
        {
          question: "When you translate a video in HeyGen, what happens?",
          options: [
            "It gets deleted",
            "You get a version in another language with matching lip sync",
            "Nothing changes",
            "Only the subtitles change"
          ],
          correctAnswer: 1,
          explainer: "Full dubbed version in the new language, with the avatar's mouth matching the new words. Insane for reaching global audiences."
        },
        {
          question: "Who can make a HeyGen avatar of themselves?",
          options: [
            "Only you (with permission) and with grown-up consent",
            "Anyone you want",
            "Your teacher without asking",
            "Celebrities only"
          ],
          correctAnswer: 0,
          explainer: "Custom avatars need consent. Only you, with a grown-up's sign-off. Never anyone else without their clear yes."
        }
      ],
      missions: [
        {
          id: "l13_m1",
          title: "Explainer Reel for Your Project",
          objective: "Make a 60-second explainer video about something you built this year.",
          instructions: [
            "Pick something you built or learned recently",
            "Write a 150-word script that hooks, explains, and closes",
            "Pick a HeyGen avatar whose vibe matches your project",
            "Export and share with one person who would care"
          ],
          sandboxPrompt: "I built [project]. Help me write a 150-word explainer script with a strong hook and clear takeaway.",
          quackySystemPrompt: "You are Quacky helping a kid write a 60-second explainer script. Structure: 1-sentence hook, what it is, why it matters, one specific detail, takeaway line. Exactly 140-160 words. One video emoji.",
          reflectionQuestion: "Did your avatar make the project feel bigger or smaller than it is?",
          xpReward: 75
        },
        {
          id: "l13_m2",
          title: "Studio Welcome Video",
          objective: "Create the welcome video for your future creative studio.",
          instructions: [
            "Use your Canvas Kingdom studio name (or invent a new one)",
            "Write a 100-word welcome script: who you are, what you do, how to work with you",
            "Pick an avatar that matches your brand vibe",
            "Export as your landing page hero video"
          ],
          sandboxPrompt: "I run a creative studio called [name] that does [what]. Help me write a 100-word welcome script.",
          quackySystemPrompt: "You are Quacky helping a kid write a studio welcome video script. Structure: warm welcome, who you are, what you do, who you help, how to reach you. Under 100 words. Confident but kid-real. One wave emoji.",
          reflectionQuestion: "Would someone hire you after watching this video?",
          xpReward: 75
        },
        {
          id: "l13_m3",
          title: "Message to the World",
          objective: "Record a message in your language, translate it into 2 others with HeyGen.",
          instructions: [
            "Write a 60-second message about something important to you",
            "Record it once using an avatar (or your own)",
            "Translate to 2 languages with HeyGen's translation",
            "Share all 3 versions side by side"
          ],
          sandboxPrompt: "Help me write a 60-second message about [topic] that will work when translated into [language 2] and [language 3].",
          quackySystemPrompt: "You are Quacky helping a kid write a translation-ready message. Keep sentences simple and metaphor-free so translation lands well. Around 120 words with emotional clarity. One earth emoji.",
          reflectionQuestion: "How did it feel hearing your message in a language you do not speak?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Explainer video freelancers earn $200 to $2000 per video. Multilingual creators unlock 5x the audience. HeyGen gives you both.",
      completionBadge: "story_forge_l5",
      nextLesson: "l14"
    },

    // ─────────────────────────────────────────────────────────
    // L14 : FLIKI
    // ─────────────────────────────────────────────────────────
    {
      id: "l14",
      worldId: "w2",
      lessonNumber: 6,
      title: "Fliki",
      toolName: "Fliki",
      toolUrl: "https://fliki.ai/",
      toolCategory: "AI text to video for social content",
      difficulty: "easy",
      estimatedMinutes: 18,
      heroLine: "Type your story, get a full video ready for social in minutes.",
      warmUpChallenge: "Ten years ago, making a video meant cameras, microphones, and editing software. Today you type a paragraph and you have a video. The only bottleneck left is your ideas.",
      warmUpQuiz: {
        question: "What kind of short video would get you excited?",
        options: [
          "A 30-second explainer for a topic I love",
          "A 90-second tutorial that actually helps kids",
          "A cinematic teaser that looks like a movie trailer"
        ]
      },
      features: [
        {
          feature: "Text to video",
          description: "Paste text and Fliki picks visuals, voice, and music automatically.",
          example: "Paste a 200-word script and get a 60-second short video"
        },
        {
          feature: "Blog to video",
          description: "Give Fliki a URL and it turns the article into a video.",
          example: "Your school newsletter feature becomes a 90-second video"
        },
        {
          feature: "Voice + visual library",
          description: "Swap voices, stock footage, and music with one click.",
          example: "Try the same script with 3 different narrators to find the right fit"
        }
      ],
      costInfo: "Free plan includes 5 minutes per month. Basic plan is $21 per month for 180 minutes of HD video.",
      parentTip: "Fliki is the fastest path from 'I have an idea' to 'I have a video'. Help your kid focus on script quality. Visuals are easy, ideas are hard.",
      learningPoints: [
        "Scripts as the real asset, not visuals",
        "Turning existing writing into video",
        "Matching tone, pace, and music",
        "Building a library of short videos fast"
      ],
      quiz: [
        {
          question: "What does Fliki do best?",
          options: [
            "Only plays music",
            "Turns your written script into a finished short video",
            "Writes essays",
            "Designs logos"
          ],
          correctAnswer: 1,
          explainer: "Paste script, get video. Fliki handles voice, visuals, and music automatically."
        },
        {
          question: "What makes Fliki a time saver?",
          options: [
            "You record everything yourself",
            "It handles voice, visuals, and music automatically",
            "It only does 1 second videos",
            "It needs no ideas"
          ],
          correctAnswer: 1,
          explainer: "The heavy lifting (voice recording, stock footage, music sync) happens automatically. You write, it produces."
        },
        {
          question: "Why would you turn a blog into a video?",
          options: [
            "To delete the blog",
            "Because video reaches audiences who do not read",
            "To make it smaller",
            "No reason"
          ],
          correctAnswer: 1,
          explainer: "Different people learn differently. Turning one piece of writing into a video doubles your audience for the same effort."
        }
      ],
      missions: [
        {
          id: "l14_m1",
          title: "30-Second Explainer",
          objective: "Turn one paragraph of your own writing into a 30-second video.",
          instructions: [
            "Pick a 80-word paragraph you wrote in an earlier lesson",
            "Paste it into Fliki and let it auto-generate",
            "Swap the voice until it fits the tone",
            "Export and watch it back to check pacing"
          ],
          sandboxPrompt: "I want to turn this 80-word paragraph into a 30-second video. [Paste paragraph.] What voice and vibe should I pick?",
          quackySystemPrompt: "You are Quacky helping a kid pick voice and visuals for a 30-second Fliki video. Given the paragraph, recommend one voice profile (age, energy, accent), one music mood, and one visual theme. Short numbered list. One clapperboard emoji.",
          reflectionQuestion: "Did your writing hit harder as a video or as text?",
          xpReward: 50
        },
        {
          id: "l14_m2",
          title: "Kid's Guide Mini-Series",
          objective: "Build the first 3 episodes of a 90-second tutorial series.",
          instructions: [
            "Pick your topic: something you know better than most kids your age",
            "Plan 3 short lessons in one sentence each",
            "Write a 200-word script per lesson and generate in Fliki",
            "Keep the same voice and style across all 3 so it feels like a real series"
          ],
          sandboxPrompt: "I want to build a 3-episode kid's tutorial series on [topic]. Help me outline and write the 3 scripts.",
          quackySystemPrompt: "You are Quacky helping a kid plan a 3-episode tutorial series. Given the topic, return the series title and 3 episode outlines (1 sentence each) plus one full 200-word script for episode 1. One school emoji.",
          reflectionQuestion: "Which episode do you think would help a kid the most?",
          xpReward: 100
        },
        {
          id: "l14_m3",
          title: "Life Movie Trailer",
          objective: "Create a cinematic 60-second trailer of your actual life this year.",
          instructions: [
            "List 5 real moments from this year that felt like movie scenes",
            "Write a dramatic 100-word trailer script around them",
            "Generate in Fliki with cinematic music",
            "Share with one family member who was in those moments"
          ],
          sandboxPrompt: "Help me write a cinematic 100-word trailer script about these 5 real moments from my year: [list].",
          quackySystemPrompt: "You are Quacky helping a kid write their life's movie trailer script. Take the 5 moments. Write around 100 words in dramatic trailer voice: hook, build, stakes, twist, close. One film reel emoji.",
          reflectionQuestion: "When you watched your own year as a trailer, did it feel bigger than you thought?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Content creators who publish every week win because of volume. Fliki makes volume easy. Your 50th video beats someone's 1 perfect video.",
      completionBadge: "story_forge_l6",
      nextLesson: "l15"
    },

    // ─────────────────────────────────────────────────────────
    // L15 : SCRIPT AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l15",
      worldId: "w2",
      lessonNumber: 7,
      title: "Script AI",
      toolName: "Script AI",
      toolUrl: "https://scripai.com/",
      toolCategory: "AI screenplay and script writing",
      difficulty: "medium",
      estimatedMinutes: 22,
      heroLine: "Write Hollywood-format scripts in the time it takes to eat lunch.",
      warmUpChallenge: "Every movie, every show, every cutscene starts as a script. The format looks scary but it is only pattern. Today you learn the pattern and start writing like a screenwriter.",
      warmUpQuiz: {
        question: "Which script would you write first?",
        options: [
          "A short film scene between two friends at a turning point",
          "A video game cutscene where the hero realizes they are wrong",
          "A 30-second commercial for a product people actually need"
        ]
      },
      features: [
        {
          feature: "Format-aware writing",
          description: "Script AI automatically formats your writing into proper screenplay style.",
          example: "Write one paragraph, get formatted scene headings, action lines, and dialogue"
        },
        {
          feature: "Scene beats",
          description: "Ask Script AI for the classic beats of your scene type.",
          example: "Get the 5 beats of a confession scene, a chase scene, a reveal"
        },
        {
          feature: "Character voice lock",
          description: "Define your characters once and Script AI keeps their voices distinct.",
          example: "Teen-sarcastic brother vs. serious-calm sister never sound alike"
        }
      ],
      costInfo: "Free plan covers short scripts. Paid plans start around $10 per month for longer scripts and more characters.",
      parentTip: "Screenwriting teaches story structure better than any other writing. Encourage your kid to write scripts even if they never get filmed.",
      learningPoints: [
        "Screenplay format and why it matters",
        "Scene beats as story engines",
        "Distinct character voices",
        "Dialogue that moves the scene forward"
      ],
      quiz: [
        {
          question: "Why does screenplay format matter?",
          options: [
            "It does not matter at all",
            "Industry people trust scripts that look professional",
            "It is always boring",
            "Only Netflix uses it"
          ],
          correctAnswer: 1,
          explainer: "Format is the first credibility signal. Scripts with weird formatting get rejected before the first page."
        },
        {
          question: "What are scene beats?",
          options: [
            "Musical instruments",
            "The classic emotional checkpoints of a scene type",
            "Only for comedy",
            "A dance style"
          ],
          correctAnswer: 1,
          explainer: "Every scene type (chase, reveal, confession) has 4-6 emotional beats that audiences expect. Great writers know them."
        },
        {
          question: "What makes good script dialogue?",
          options: [
            "Everyone sounds the same",
            "Each character has a distinct voice and dialogue moves the scene",
            "Lots of long speeches",
            "Only one-word answers"
          ],
          correctAnswer: 1,
          explainer: "Each character should sound like themselves. Every line should either reveal character or push the scene forward."
        }
      ],
      missions: [
        {
          id: "l15_m1",
          title: "Short Film Turning Point",
          objective: "Write a 2-page short film scene where two friends face a decision together.",
          instructions: [
            "Define the 2 characters in one line each",
            "Pick the turning point: a choice they disagree on",
            "Ask Script AI to draft the scene with proper format",
            "Revise so each character has a distinct voice throughout"
          ],
          sandboxPrompt: "I want to write a 2-page short film scene where [character A] and [character B] face [decision]. Help me draft it.",
          quackySystemPrompt: "You are Quacky helping a kid write a short film scene. Given 2 characters and a decision, draft a 2-page scene with proper scene heading, action lines, and dialogue. Each character must sound distinct. One film emoji.",
          reflectionQuestion: "Whose side would YOU take if you were watching this scene?",
          xpReward: 75
        },
        {
          id: "l15_m2",
          title: "Game Cutscene Reveal",
          objective: "Write the cutscene where your game hero realizes they were wrong.",
          instructions: [
            "Use your Leonardo AI hero from Canvas Kingdom (or invent one)",
            "Pick the thing they were wrong about: an enemy, a friend, a choice",
            "Write a 90-second cutscene with internal thought and one dramatic line",
            "Script AI will format it, you bring the truth"
          ],
          sandboxPrompt: "My game hero [name] realizes they were wrong about [thing]. Help me write a 90-second cutscene reveal.",
          quackySystemPrompt: "You are Quacky helping a kid write a game cutscene reveal. Given the hero and the realization, draft a 90-second scene with internal monologue, one dramatic spoken line, and a visual beat that lands the truth. One controller emoji.",
          reflectionQuestion: "What would your hero do differently in the next level because of this scene?",
          xpReward: 100
        },
        {
          id: "l15_m3",
          title: "30-Second Product Commercial",
          objective: "Write a 30-second commercial for an imaginary product kids would actually want.",
          instructions: [
            "Invent a product that solves a real kid problem",
            "Write a 70-word commercial script with format: problem, product, proof, call to action",
            "Use Script AI to add proper pacing marks",
            "Record it on your phone as a quick test read"
          ],
          sandboxPrompt: "I am writing a 30-second commercial for [imaginary product]. Help me write a 70-word script.",
          quackySystemPrompt: "You are Quacky helping a kid write a 30-second commercial. Given the imaginary product, draft 70 words with 4 beats: problem, product, proof, call to action. Tight, punchy, fun. One shopping emoji.",
          reflectionQuestion: "If you heard this commercial on the radio, would you actually look up the product?",
          xpReward: 75
        }
      ],
      empireBuilderTip: "Screenwriters earn $20K to $200K per short film script. Commercial writers earn $1K to $20K per spot. Script AI makes you competitive before you graduate high school.",
      completionBadge: "story_forge_l7",
      nextLesson: "l16"
    },

    // ─────────────────────────────────────────────────────────
    // L16 : COPY.AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l16",
      worldId: "w2",
      lessonNumber: 8,
      title: "Copy.ai",
      toolName: "Copy.ai",
      toolUrl: "https://www.copy.ai/",
      toolCategory: "AI marketing and brand copywriting",
      difficulty: "medium",
      estimatedMinutes: 18,
      heroLine: "The words that sell a product are worth more than the product itself.",
      warmUpChallenge: "Every brand you love spent weeks on one headline. You can now test ten headlines in one minute. The winning words of the future belong to whoever writes the most and picks the best.",
      warmUpQuiz: {
        question: "Which copy project would you ship first?",
        options: [
          "A product launch email that people actually want to open",
          "A landing page headline that makes visitors buy",
          "A caption pack that makes posts go viral"
        ]
      },
      features: [
        {
          feature: "Copy templates",
          description: "Prebuilt frameworks for emails, headlines, social captions, and ad copy.",
          example: "Product launch email: hook, story, offer, CTA"
        },
        {
          feature: "Brand voice memory",
          description: "Paste examples of your voice and Copy.ai matches it every time.",
          example: "Feed it 3 sample captions and all future captions sound like you"
        },
        {
          feature: "Variation generator",
          description: "Get 10 versions of the same idea with one click.",
          example: "10 different headlines for the same product in 3 seconds"
        }
      ],
      costInfo: "Free plan covers basic needs. Starter plan is $49 per month for unlimited generation.",
      parentTip: "Copy.ai is where marketers live. Teach your kid that copy is a SKILL, not a shortcut. The AI suggests, but the human chooses. Choosing is the real skill.",
      learningPoints: [
        "Why copy matters more than product features",
        "Frameworks that sell: hook, story, offer, CTA",
        "Matching voice across all marketing",
        "Testing variations to find the winner"
      ],
      quiz: [
        {
          question: "What is great copy's real job?",
          options: [
            "Impress the writer",
            "Get the reader to DO something",
            "Sound smart",
            "Be long"
          ],
          correctAnswer: 1,
          explainer: "Copy has one job: drive action. Buy, click, sign up, reply. If it does not drive action, it is decoration."
        },
        {
          question: "Why is the variation generator powerful?",
          options: [
            "It makes you lazy",
            "It lets you test 10 versions and pick the winner",
            "It deletes your work",
            "It is for images only"
          ],
          correctAnswer: 1,
          explainer: "The best marketers do not guess. They test. 10 versions, ship the winner, learn, iterate."
        },
        {
          question: "What is brand voice memory good for?",
          options: [
            "Nothing",
            "Keeping all your marketing consistent",
            "Changing topic constantly",
            "Making you sound like someone else"
          ],
          correctAnswer: 1,
          explainer: "Consistency builds trust. Brand voice memory means every caption, email, and headline feels like the same person wrote it."
        }
      ],
      missions: [
        {
          id: "l16_m1",
          title: "Launch Email",
          objective: "Write the launch email for an imaginary product you actually want to exist.",
          instructions: [
            "Invent the product: something you wish was real",
            "Use the product launch email framework: hook, story, offer, CTA",
            "Generate 3 email versions, pick the one with the strongest hook",
            "Revise the subject line 5 times until it is unignorable"
          ],
          sandboxPrompt: "I want to launch [imaginary product]. Help me write a launch email with hook, story, offer, and call to action.",
          quackySystemPrompt: "You are Quacky helping a kid write a product launch email. Given the imaginary product, write under 200 words: attention-grabbing subject line, 1-line hook, 2-sentence story, clear offer, urgent CTA. One rocket emoji.",
          reflectionQuestion: "Which word in your subject line did you agonize over the most?",
          xpReward: 75
        },
        {
          id: "l16_m2",
          title: "Landing Page Hero Copy",
          objective: "Write the 3 most important lines on a landing page for your future business.",
          instructions: [
            "Take your Canvas Kingdom studio (or invent a new business)",
            "Write the 3-part hero: headline, subhead, call-to-action button",
            "Generate 10 variations with Copy.ai and pick the winner",
            "Explain in one sentence why your winner beats the other 9"
          ],
          sandboxPrompt: "I am writing hero copy for my business: [business]. Help me draft 10 versions of headline, subhead, and CTA.",
          quackySystemPrompt: "You are Quacky helping a kid write 10 landing page hero variations. Given the business, return 10 numbered sets. Each set: 1 bold headline (under 10 words), 1 subhead (under 20 words), 1 CTA button text (2-4 words). One target emoji.",
          reflectionQuestion: "What did you learn by seeing 10 different ways to say the same thing?",
          xpReward: 75
        },
        {
          id: "l16_m3",
          title: "Social Caption Pack",
          objective: "Write 5 post captions for the same product, each aimed at a different feeling.",
          instructions: [
            "Take your launch email product (or any product)",
            "Target 5 different moods: curious, urgent, funny, proof, FOMO",
            "Generate 5 captions, each under 150 characters",
            "Drop them in a notes doc so your future self has a caption bank"
          ],
          sandboxPrompt: "Help me write 5 social captions for [product]. Each one targets a different feeling: curious, urgent, funny, proof, FOMO.",
          quackySystemPrompt: "You are Quacky helping a kid build a 5-caption social pack. Given the product, return 5 numbered captions (curious, urgent, funny, proof, FOMO). Each under 150 characters. Label each with its feeling. One phone emoji.",
          reflectionQuestion: "Which emotion do you think would actually drive the most taps?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Copywriters are the highest-paid freelance writers. Brand copy jobs pay $500 to $5000 per week of work. The best never run out of clients.",
      completionBadge: "story_forge_l8",
      nextLesson: null
    }
  ],
  empireBuilderModule: {
    id: "eb_w2",
    worldId: "w2",
    title: "Your First Story Studio",
    tagline: "Turn your AI writing, voice, and video skills into a content service people pay for.",
    estimatedMinutes: 45,
    businessArchetype: "Freelance storyteller or content creator",
    targetCustomer: "Small businesses, local authors, YouTubers, family historians, indie brands.",
    realWorldExamples: [
      "A 13-year-old in India runs a $500 a month newsletter-writing side business.",
      "Teen podcasters on Anchor earn $100 to $1000 per episode through sponsors once they hit 1000 listeners.",
      "Kid ghostwriters on Fiverr earn $50 to $300 per article for local businesses."
    ],
    businessSteps: [
      {
        step: 1,
        title: "Pick your medium",
        description: "Choose ONE: written articles, audio podcast, short video, screenplays, or copywriting.",
        usingTools: ["ChatGPT", "Claude", "Descript", "ElevenLabs", "Fliki", "Copy.ai"],
        deliverable: "Your one-line pitch: I write/record [medium] for [who] about [theme]."
      },
      {
        step: 2,
        title: "Build your first 3 pieces",
        description: "Make 3 examples of your best work in your chosen medium. These are your portfolio.",
        usingTools: ["Claude", "Descript", "Fliki"],
        deliverable: "3 finished pieces ready to show a potential client."
      },
      {
        step: 3,
        title: "Create your signature voice",
        description: "Define your tone in 3 words. Every future piece must match those 3 words.",
        usingTools: ["Claude"],
        deliverable: "A 1-page brand voice guide you can share with ChatGPT or Claude for every project."
      },
      {
        step: 4,
        title: "Launch your studio page",
        description: "Use Galileo AI from Canvas Kingdom to design a simple studio page with samples, voice, and contact.",
        usingTools: ["Galileo AI", "Ideogram"],
        deliverable: "One mockup of your Story Forge studio page."
      },
      {
        step: 5,
        title: "Write your first pitch",
        description: "Write a real pitch email using Copy.ai frameworks and send it to a small business you admire.",
        usingTools: ["ChatGPT", "Copy.ai"],
        deliverable: "A sent pitch email with a screenshot of the send."
      }
    ],
    quackyPlaybook: "Stories are not hobbies. Stories sell companies, win elections, and build movements. Every brand you admire has a writer behind it who got paid. You are becoming that writer. Start small, stay consistent, get louder every month.",
    pricingLesson: {
      yourFirstPrice: "$0 for your first piece (trade for a testimonial). $25 to $50 per short piece (500 words or 60-second video) for pieces 2 through 5. $75 to $200 once you have a visible portfolio.",
      whyThisPrice: "Writers get paid per word, per minute, or per project. Start low to build proof. Testimonials beat portfolios. A real quote from a real client is your most valuable asset in month one.",
      scaleUp: "Every 5 happy clients, raise your price 25%. Writers who never raise prices never grow. Writers who raise too fast lose clients. Steady beats heroic."
    },
    firstCustomerExercise: {
      task: "Pick ONE person who runs something: a family member's business, a local cafe, your school. Offer to write ONE piece for free in exchange for a quote you can use on your site.",
      prompt: "Help me write a friendly pitch to [person] offering one free [article, video, podcast episode] in exchange for a testimonial.",
      quackySystemPrompt: "You are Quacky helping a kid write a first-client pitch email. Short, warm, under 120 words. Structure: personal opener, what you noticed about their work, one free thing you will make them, what you ask in return (a short quote), soft close. One pen emoji."
    },
    xpReward: 500,
    completionBadge: "story_forge_champion"
  },
  capstone: {
    id: "cap_w2",
    worldId: "w2",
    title: "The Story Forge Collection",
    narrative: "Writers prove themselves by publishing. By the end of Story Forge, you have real pieces in multiple mediums. This collection is your evidence.",
    requiredMissions: ["l9_m3", "l10_m1", "l11_m1", "l14_m2", "l16_m1"],
    deliverableSpec: "Submit a 5-piece Story Forge Collection as a shareable folder or PDF: one family chapter (L9), one children's book chapter (L10), one audio episode (L11), one tutorial video (L14), and one launch email (L16). Include a 1-page cover with your studio name and a 3-line bio.",
    submissionFormat: "portfolio",
    parentReviewPrompt: "Your child just published a 5-piece multimedia collection. Pick their strongest piece and discuss where they could share it publicly. A family newsletter? A small local publication? A social account?",
    xpReward: 1000,
    unlocksWorld: "w3"
  }
};

// ═══════════════════════════════════════════════════════════
// WORLD 3 : CROWD PLAZA
// AI for audience building, personal brand, and social reach
// Empire Builder: Audience and personal brand
// ═══════════════════════════════════════════════════════════

const CROWD_PLAZA: World = {
  id: "w3",
  name: "Crowd Plaza",
  color: "#2E8CE6",
  icon: "megaphone",
  description: "Build a real audience online. Your voice, your story, your following.",
  empireBuilderConcept: "Audience and personal brand : creators who own a following never need permission to launch anything.",
  lessonCount: 6,
  unlockRequirement: { previousWorld: "w2", minXP: 4500 },
  capstoneProject: "Launch a real content channel with 10 published pieces and a defined niche.",
  lessons: [
    // ─────────────────────────────────────────────────────────
    // L17 : SIMPLIFIED
    // ─────────────────────────────────────────────────────────
    {
      id: "l17",
      worldId: "w3",
      lessonNumber: 1,
      title: "Simplified",
      toolName: "Simplified",
      toolUrl: "https://simplified.com/",
      toolCategory: "AI social content and brand studio",
      difficulty: "easy",
      estimatedMinutes: 20,
      heroLine: "One tool that designs, writes, and schedules your whole social game.",
      warmUpChallenge: "Most creators quit not because their ideas are bad, but because tools are scattered. Simplified puts design, writing, and scheduling in one place. Today you stop juggling.",
      warmUpQuiz: {
        question: "What breaks most creators before they grow?",
        options: [
          "Too many apps to manage one post",
          "Not knowing what to post next",
          "Fear nobody will see their work"
        ]
      },
      features: [
        {
          feature: "AI content creator",
          description: "Pick a platform and vibe, Simplified drafts the full post with image and caption.",
          example: "Instagram carousel about your weekend coding project in 10 seconds"
        },
        {
          feature: "Brand kit",
          description: "Lock your colors, fonts, and logo so every post stays on-brand automatically.",
          example: "One brand kit means 100 posts look like they came from one studio"
        },
        {
          feature: "Cross-platform sizing",
          description: "One design auto-resizes for Instagram, TikTok, YouTube, and LinkedIn.",
          example: "Build once, publish everywhere, never resize manually"
        }
      ],
      costInfo: "Free plan covers basic posts. Small team plan is $29 per month for unlimited AI content and scheduling.",
      parentTip: "Simplified is like a training ground. Start with one platform only, master it for 30 days, then expand. Spreading thin early kills consistency.",
      learningPoints: [
        "Why consistency beats perfection",
        "Brand kits as leverage",
        "Building once and publishing many",
        "Platform-native thinking vs copy-paste"
      ],
      quiz: [
        {
          question: "Why is a brand kit powerful?",
          options: [
            "It makes every post look like it came from one studio",
            "It deletes your old posts",
            "It costs nothing",
            "It is only decoration"
          ],
          correctAnswer: 0,
          explainer: "When 50 posts all share colors, fonts, and logo, people recognize you instantly. That is brand."
        },
        {
          question: "One image for all platforms is:",
          options: [
            "Always fine",
            "A problem because platforms need different sizes",
            "Impossible",
            "The same as good design"
          ],
          correctAnswer: 1,
          explainer: "Each platform has its own size (9:16 for TikTok, 1:1 for Instagram feed, 16:9 for YouTube). Posting wrong sizes looks amateur."
        },
        {
          question: "What does platform-native thinking mean?",
          options: [
            "Post the same thing everywhere",
            "Shape each post for the platform it lives on",
            "Only post to one platform",
            "Never use AI"
          ],
          correctAnswer: 1,
          explainer: "TikTok users watch in seconds. LinkedIn readers scroll slower. The same story needs a different shape on each."
        }
      ],
      missions: [
        {
          id: "l17_m1",
          title: "Brand Kit in a Day",
          objective: "Design a full 10-post kit for an imaginary creator account you might actually start.",
          instructions: [
            "Define the account: what is the niche, who is it for, what is the tone",
            "Build your brand kit in Simplified: colors, fonts, logo, voice",
            "Generate 10 posts with consistent style but different topics",
            "Export the kit as your starter pack"
          ],
          sandboxPrompt: "I want to start a creator account about [niche] for [audience]. Help me design the brand: colors, fonts, voice, and 10 post ideas.",
          quackySystemPrompt: "You are Quacky helping a kid design a creator brand kit. Given the niche and audience, suggest 3 colors with hex codes, 1 font pair, a 3-word voice statement, and 10 post ideas for the first month. Numbered list. One spark emoji.",
          reflectionQuestion: "Which post in your kit would you want to publish first? Why?",
          xpReward: 75
        },
        {
          id: "l17_m2",
          title: "Cross-Platform Remix",
          objective: "Take one content idea and reshape it for 3 platforms properly.",
          instructions: [
            "Pick ONE story or tip you actually care about",
            "Use Simplified to design for Instagram (square + carousel)",
            "Adapt for TikTok (vertical, fast hook)",
            "Adapt for LinkedIn (paragraph format, professional tone)"
          ],
          sandboxPrompt: "My story or tip is: [paste idea]. Help me adapt it 3 ways: Instagram carousel, TikTok short, LinkedIn post.",
          quackySystemPrompt: "You are Quacky helping a kid adapt one idea for 3 platforms. Return 3 labeled sections: Instagram carousel (5 slides), TikTok (15-second script with hook), LinkedIn (4 short paragraphs). Match platform norms. One share emoji.",
          reflectionQuestion: "Which platform made your idea feel strongest? Why that one?",
          xpReward: 75
        },
        {
          id: "l17_m3",
          title: "Launch Week Calendar",
          objective: "Plan 7 posts for the launch week of an imaginary product or project.",
          instructions: [
            "Invent the launch: a new app, a class, a zine, a local meetup",
            "Plan 7 posts: tease, reveal, story, behind-the-scenes, social proof, last-call, launch",
            "Use Simplified to design and schedule all 7",
            "Preview the week and pick the 1 post you would pay to boost"
          ],
          sandboxPrompt: "I am launching [product or project] next week. Help me plan 7 daily posts: tease, reveal, story, BTS, proof, last call, launch.",
          quackySystemPrompt: "You are Quacky helping a kid plan a 7-day launch content calendar. Given the launch, return 7 numbered days: tease, reveal, story, behind-the-scenes, social proof, last call, launch. One hook line per day under 15 words. One rocket emoji.",
          reflectionQuestion: "Which post would you boost with real money if you had $20 to spend?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Creators who post for 90 days straight beat creators who post sporadically for 3 years. Simplified makes 90-day consistency possible for one person. That is your unfair advantage.",
      completionBadge: "crowd_plaza_l1",
      nextLesson: "l18"
    },

    // ─────────────────────────────────────────────────────────
    // L18 : OPUS CLIP
    // ─────────────────────────────────────────────────────────
    {
      id: "l18",
      worldId: "w3",
      lessonNumber: 2,
      title: "Opus Clip",
      toolName: "Opus Clip",
      toolUrl: "https://www.opus.pro/",
      toolCategory: "AI long-video to viral shorts",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Feed it a long video, get back the 10 best short clips.",
      warmUpChallenge: "The best creators do not make more. They squeeze more out of what they already made. One 30-minute video becomes 10 shorts, 5 reels, and 3 memes. Today you stop wasting content.",
      warmUpQuiz: {
        question: "Why do clips go viral when full videos don't?",
        options: [
          "Clips start with the best moment, not the intro",
          "Clips cost more to make",
          "Clips are longer"
        ]
      },
      features: [
        {
          feature: "Auto clip detection",
          description: "Opus scans a long video and picks the 10 moments most likely to go viral.",
          example: "A 30-minute podcast becomes 10 shareable 30-second clips in 5 minutes"
        },
        {
          feature: "Virality score",
          description: "Each clip gets a score predicting how well it will perform.",
          example: "Post only the clips with 80+ score, archive the rest"
        },
        {
          feature: "Auto captions and reframing",
          description: "Clips get dynamic captions and automatic vertical reframing.",
          example: "Landscape 16:9 video becomes 9:16 vertical with captions baked in"
        }
      ],
      costInfo: "Free plan allows 60 minutes of processing per month. Starter plan is $19 per month for 150 minutes.",
      parentTip: "Opus teaches your kid the most valuable skill in content: finding the best moment. Watch the score: clips with high scores usually open with surprise, tension, or humor.",
      learningPoints: [
        "Why the first 3 seconds decide everything",
        "How to recognize viral moments",
        "Repurposing one recording into many",
        "Captions as retention tools"
      ],
      quiz: [
        {
          question: "What is Opus Clip's superpower?",
          options: [
            "It creates videos from text",
            "It finds the 10 best short clips inside a long video",
            "It only edits music",
            "It generates images"
          ],
          correctAnswer: 1,
          explainer: "Opus scans, picks, and reformats. Hours of editing become minutes."
        },
        {
          question: "What makes a short clip go viral?",
          options: [
            "Length over 5 minutes",
            "Starts with the hook, not the intro",
            "No captions",
            "Quiet opening"
          ],
          correctAnswer: 1,
          explainer: "Viral clips open with the most interesting moment. Intros are for long-form. Shorts start mid-action."
        },
        {
          question: "Why do shorts need captions?",
          options: [
            "They do not",
            "80 percent of people watch with sound off",
            "Captions slow videos down",
            "Only for foreign languages"
          ],
          correctAnswer: 1,
          explainer: "Most social scrolling happens with sound off. No captions means no retention."
        }
      ],
      missions: [
        {
          id: "l18_m1",
          title: "Clip Your Own Content",
          objective: "Take a 5-10 minute video (yours or with permission) and find the 3 best shareable clips.",
          instructions: [
            "Pick your source: a family video, a school project, a tutorial you recorded",
            "Upload to Opus Clip and wait for the auto-clip pass",
            "Compare virality scores and pick the top 3",
            "Write a caption for each that makes it clickable"
          ],
          sandboxPrompt: "I have a long video about [topic]. Help me write 3 punchy captions for the clips that would make people watch.",
          quackySystemPrompt: "You are Quacky helping a kid write 3 short-form video captions. Given the topic, return 3 numbered captions under 120 characters each with a strong hook, a benefit, and a call to watch. One scissors emoji.",
          reflectionQuestion: "Which clip surprised you with a high virality score?",
          xpReward: 75
        },
        {
          id: "l18_m2",
          title: "Interview Clips Pack",
          objective: "Turn a long interview (yours or a podcast you love, with permission) into 5 micro-lessons.",
          instructions: [
            "Grab a 20-minute interview source",
            "Let Opus generate clips and filter for the top 5",
            "Label each clip with the exact lesson it teaches",
            "Arrange as a mini-series ready for a feed"
          ],
          sandboxPrompt: "I have a long interview about [topic]. Help me label 5 clips as mini-lessons a viewer would actually search for.",
          quackySystemPrompt: "You are Quacky helping a kid label interview clips as micro-lessons. Given the interview topic, return 5 numbered lesson labels under 8 words each, each phrased like a viewer's search query. One speech bubble emoji.",
          reflectionQuestion: "If all 5 clips had to survive as one show title, what would you call the show?",
          xpReward: 75
        },
        {
          id: "l18_m3",
          title: "Viral Hook Study",
          objective: "Analyze your own clips to learn what a winning hook looks like.",
          instructions: [
            "Generate 10 clips from any source video",
            "Rank them by virality score",
            "Study the top 2 and the bottom 2 side by side",
            "Write 3 patterns you notice about what makes the top ones win"
          ],
          sandboxPrompt: "I have 2 high-score clips and 2 low-score clips from the same video. Help me write a 3-point pattern analysis of what makes hooks work.",
          quackySystemPrompt: "You are Quacky helping a kid extract hook patterns from clip analysis. Given the observation, return 3 numbered patterns (each under 20 words) phrased as rules. One magnifying glass emoji.",
          reflectionQuestion: "Which pattern surprised you? Which one confirmed what you already felt?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Content strategists charge $100 to $500 per hour to tell brands what to clip and repost. You are learning that skill on yourself first.",
      completionBadge: "crowd_plaza_l2",
      nextLesson: "l19"
    },

    // ─────────────────────────────────────────────────────────
    // L19 : CAPCUT
    // ─────────────────────────────────────────────────────────
    {
      id: "l19",
      worldId: "w3",
      lessonNumber: 3,
      title: "CapCut",
      toolName: "CapCut",
      toolUrl: "https://www.capcut.com/",
      toolCategory: "AI short-form video editing",
      difficulty: "easy",
      estimatedMinutes: 22,
      heroLine: "The editor almost every viral video on your feed was made with.",
      warmUpChallenge: "You have probably watched 10,000 videos made in CapCut without knowing it. Today you move from watcher to maker.",
      warmUpQuiz: {
        question: "What signature piece would you build first?",
        options: [
          "A 3-second intro I can slap on every video",
          "A 30-second tutorial for something I am good at",
          "A before-and-after story of a skill I learned"
        ]
      },
      features: [
        {
          feature: "AI effects library",
          description: "Trending effects, transitions, and filters updated weekly.",
          example: "The glitch transition everyone uses this week is already in CapCut"
        },
        {
          feature: "Auto captions",
          description: "CapCut transcribes your voice and lays out captions with smart styling.",
          example: "Speak, and stylish captions appear matching your tone automatically"
        },
        {
          feature: "Templates",
          description: "Thousands of trending templates you can remix with your own footage.",
          example: "A viral birthday edit can be remade with your footage in 5 minutes"
        }
      ],
      costInfo: "Free for most features. CapCut Pro is $7.99 per month for exclusive effects, cloud storage, and watermark removal.",
      parentTip: "CapCut is free and massively popular with teens. Ground rule: review anything before it gets posted. Help your kid see editing as a craft, not just a vibe.",
      learningPoints: [
        "How a signature edit style builds recognition",
        "Pacing, cuts, and rhythm in short form",
        "Captions as storytelling, not just accessibility",
        "When to use templates vs build from scratch"
      ],
      quiz: [
        {
          question: "What is CapCut known for?",
          options: [
            "3D animation",
            "Short-form video editing with trending effects",
            "Writing essays",
            "Audio podcasts"
          ],
          correctAnswer: 1,
          explainer: "CapCut is the editor behind a huge share of TikTok, Reels, and Shorts you see every day."
        },
        {
          question: "Why have a signature opening?",
          options: [
            "It wastes time",
            "It builds instant recognition across your videos",
            "It has to be 10 minutes long",
            "Only YouTubers need one"
          ],
          correctAnswer: 1,
          explainer: "A 3-second signature means viewers recognize your channel before they see your face. Brand on autopilot."
        },
        {
          question: "Auto captions matter because:",
          options: [
            "They are only for accessibility",
            "They boost retention when people watch with sound off",
            "They slow videos down",
            "They make videos harder to understand"
          ],
          correctAnswer: 1,
          explainer: "Retention is everything on shorts. Captions keep viewers watching even with sound off."
        }
      ],
      missions: [
        {
          id: "l19_m1",
          title: "Your Signature Opening",
          objective: "Design a 3-second branded opening you can reuse on every video you make.",
          instructions: [
            "Pick one sound or catchphrase that feels like you",
            "Match it to one visual: logo reveal, text animation, signature gesture",
            "Build it in CapCut with a transition into normal footage",
            "Save it as a reusable project for every future video"
          ],
          sandboxPrompt: "I want to design a 3-second signature opening for all my videos. My vibe is [describe]. Help me design it.",
          quackySystemPrompt: "You are Quacky helping a kid design a 3-second signature video opening. Given the vibe, suggest one visual element, one sound cue, one transition style, and one text hook. Short numbered list. One film emoji.",
          reflectionQuestion: "Would a stranger recognize this opening after watching 3 of your videos?",
          xpReward: 75
        },
        {
          id: "l19_m2",
          title: "30-Second Tutorial Short",
          objective: "Teach one thing you are genuinely good at in 30 seconds.",
          instructions: [
            "Pick your skill: a study trick, a game move, a craft step, a life hack",
            "Record 3 takes and pick the cleanest",
            "Edit in CapCut with auto captions and 3 quick cuts",
            "Add a 1-second call-to-follow at the end"
          ],
          sandboxPrompt: "I want to teach [skill] in 30 seconds. Help me write a tight script with a 3-second hook and a clear payoff.",
          quackySystemPrompt: "You are Quacky helping a kid write a 30-second tutorial script. Given the skill, return 3 labeled beats: hook (3 seconds, under 10 words), teach (20 seconds, 3 clear steps), payoff (7 seconds, one memorable closer). One lightning emoji.",
          reflectionQuestion: "What was the hardest part of fitting a real teaching into 30 seconds?",
          xpReward: 75
        },
        {
          id: "l19_m3",
          title: "Before and After Transformation",
          objective: "Tell a transformation story about a skill you actually improved.",
          instructions: [
            "Pick something you got better at in the last year",
            "Find or create a before clip and an after clip",
            "Edit in CapCut with a bold title card, split screen or cut transition",
            "Add one sentence in captions about what you did to improve"
          ],
          sandboxPrompt: "I got better at [skill]. Help me write a 20-second before-and-after transformation script.",
          quackySystemPrompt: "You are Quacky helping a kid tell a before-and-after skill story. Given the skill, write 20 seconds across 3 beats: before state, one-line about practice, after state. Under 50 words total. One trophy emoji.",
          reflectionQuestion: "Did watching your own transformation change how you feel about it?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Short-form video editors charge $50 to $500 per polished short. Kids who can edit better than their parents already have a freelance career waiting.",
      completionBadge: "crowd_plaza_l3",
      nextLesson: "l20"
    },

    // ─────────────────────────────────────────────────────────
    // L20 : SUBMAGIC
    // ─────────────────────────────────────────────────────────
    {
      id: "l20",
      worldId: "w3",
      lessonNumber: 4,
      title: "Submagic",
      toolName: "Submagic",
      toolUrl: "https://www.submagic.co/",
      toolCategory: "AI captions and viral short formatting",
      difficulty: "easy",
      estimatedMinutes: 18,
      heroLine: "The invisible edge that makes short-form content actually get watched.",
      warmUpChallenge: "You have scrolled past thousands of videos without sound. The ones that stopped you had a caption screaming your eye to the screen. Today you learn to be that caption.",
      warmUpQuiz: {
        question: "Which caption style grabs your attention first?",
        options: [
          "Bold words that pulse in time with speech",
          "One color-coded emoji per keyword",
          "Big highlighted phrases that pop one at a time"
        ]
      },
      features: [
        {
          feature: "Dynamic captions",
          description: "Submagic places captions word-by-word in sync with speech.",
          example: "Each word lands on beat so viewers cannot look away"
        },
        {
          feature: "Auto B-roll suggestions",
          description: "Submagic suggests relevant stock footage for the words you say.",
          example: "You say 'pizza' and a pizza shot auto-appears for that second"
        },
        {
          feature: "Multi-language subtitles",
          description: "Translate and subtitle into 20+ languages for global reach.",
          example: "Your English short becomes Spanish, Arabic, and Japanese instantly"
        }
      ],
      costInfo: "Starter plan is $10 per month. Pro plan is $25 per month with more languages and unlimited uploads.",
      parentTip: "Submagic is where short-form retention actually lives. Watch your kid's caption choices: simpler and bigger usually wins over decorated and tiny.",
      learningPoints: [
        "Why sound-off viewing dominates social",
        "Captions as storytelling, not translation",
        "Retention math: first 3 seconds, first 10 seconds",
        "Multi-language reach as leverage"
      ],
      quiz: [
        {
          question: "Why do dynamic captions boost retention?",
          options: [
            "They do not",
            "They keep the viewer's eye engaged even with sound off",
            "They make videos longer",
            "They are only for translations"
          ],
          correctAnswer: 1,
          explainer: "Dynamic captions keep visual interest. Viewers stay because their eyes have something to track."
        },
        {
          question: "What fraction of scrolling happens with sound off?",
          options: [
            "Basically zero",
            "Around 80 percent",
            "Only on airplanes",
            "Only on mute buttons"
          ],
          correctAnswer: 1,
          explainer: "Roughly 80 percent of social scrolling is sound off. That is why captions win."
        },
        {
          question: "What does Submagic do better than regular captions?",
          options: [
            "Nothing",
            "Times word-by-word delivery to match speech rhythm",
            "Adds music only",
            "Deletes audio"
          ],
          correctAnswer: 1,
          explainer: "Standard captions sit as blocks. Submagic delivers word-by-word in sync, which is why it feels viral."
        }
      ],
      missions: [
        {
          id: "l20_m1",
          title: "Retention Caption Test",
          objective: "Take a short video and create 3 caption styles to see which feels strongest.",
          instructions: [
            "Pick one 30-second short you already made",
            "Generate 3 Submagic versions: minimalist, maximalist, and emoji-heavy",
            "Preview all 3 back to back with sound off",
            "Pick a winner and note why"
          ],
          sandboxPrompt: "I have one 30-second video. Help me design 3 different caption styles: minimalist, maximalist, and emoji-heavy.",
          quackySystemPrompt: "You are Quacky helping a kid design 3 caption styles for the same short. Return 3 numbered styles with: font weight, color pair, word-per-frame, and emoji use. Under 30 words each. One magnifier emoji.",
          reflectionQuestion: "Which style made you want to keep watching even without sound?",
          xpReward: 75
        },
        {
          id: "l20_m2",
          title: "Silent Mode Storytelling",
          objective: "Make a 45-second video that works with zero sound.",
          instructions: [
            "Plan a story that does not need voiceover",
            "Let captions carry the whole narrative",
            "Use Submagic to style captions as the main visual",
            "Test by watching it muted front to back"
          ],
          sandboxPrompt: "I want to tell a 45-second story that works with no sound. Topic: [pick one]. Help me outline the visual and caption script.",
          quackySystemPrompt: "You are Quacky helping a kid script a silent-mode short. Given the topic, return a 3-beat structure with on-screen captions only: setup (10 seconds), tension (25 seconds), payoff (10 seconds). Each line under 8 words. One eye emoji.",
          reflectionQuestion: "Was it harder or easier to tell a story without sound?",
          xpReward: 75
        },
        {
          id: "l20_m3",
          title: "Global Reach Remix",
          objective: "Subtitle one of your videos into 2 other languages for wider audiences.",
          instructions: [
            "Pick your best 30 to 60 second video",
            "Use Submagic to translate into 2 non-native languages",
            "Post all 3 versions as separate uploads with platform-matching captions",
            "Note which version gets the most views after 48 hours"
          ],
          sandboxPrompt: "I want to translate my video into [language 2] and [language 3] for wider reach. Help me write platform-matching hooks for each version.",
          quackySystemPrompt: "You are Quacky helping a kid localize a short video. Given the 2 target languages, return 2 platform-ready opening hooks (under 12 words each) in those languages with English translations in parentheses. One globe emoji.",
          reflectionQuestion: "Which language version brought the biggest surprise audience?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Short-form retention specialists are the highest-paid editors in social right now. A 10% retention bump can double a brand's ad revenue. Submagic makes that bump routine.",
      completionBadge: "crowd_plaza_l4",
      nextLesson: "l21"
    },

    // ─────────────────────────────────────────────────────────
    // L21 : LATER
    // ─────────────────────────────────────────────────────────
    {
      id: "l21",
      worldId: "w3",
      lessonNumber: 5,
      title: "Later",
      toolName: "Later",
      toolUrl: "https://later.com/",
      toolCategory: "AI social scheduling and content calendar",
      difficulty: "easy",
      estimatedMinutes: 20,
      heroLine: "Schedule a month of content in one afternoon, then go live your life.",
      warmUpChallenge: "Most creators burn out because they post when inspiration hits. Real pros schedule when life is calm and auto-publish during the week. Today you stop letting chaos run your calendar.",
      warmUpQuiz: {
        question: "Which scheduling habit would change your content game the most?",
        options: [
          "Batching a month of posts in one sitting",
          "Posting at the best time for my audience automatically",
          "Reusing content across platforms with one click"
        ]
      },
      features: [
        {
          feature: "Visual calendar",
          description: "See a month of posts as a grid, drag and drop to reorder.",
          example: "Swap Tuesday and Thursday posts by dragging, publish times auto-adjust"
        },
        {
          feature: "Best time AI",
          description: "Later learns when your audience is most active and auto-schedules for those windows.",
          example: "Your 7pm Saturday post outperforms your 2pm Tuesday post automatically"
        },
        {
          feature: "Cross-platform scheduling",
          description: "Plan Instagram, TikTok, LinkedIn, Pinterest from one dashboard.",
          example: "Schedule 4 platforms in 15 minutes instead of 4 separate apps"
        }
      ],
      costInfo: "Starter plan is $25 per month for 1 social set. Growth plan is $45 per month for 3 social sets and team features.",
      parentTip: "Scheduling is the secret weapon against burnout. Help your kid treat scheduling as part of creation, not an afterthought. One afternoon of planning beats 30 days of scrambling.",
      learningPoints: [
        "Why batch creation beats daily improvisation",
        "Timing as a multiplier, not a detail",
        "Calendar as strategy, not just a tool",
        "Cross-platform leverage without burnout"
      ],
      quiz: [
        {
          question: "Why is batch creation powerful?",
          options: [
            "It lets you create consistently without daily pressure",
            "It makes content worse",
            "It is only for big brands",
            "It takes more time"
          ],
          correctAnswer: 0,
          explainer: "Creating 30 posts in one session is faster than 30 separate days. Plus you can plan themes better."
        },
        {
          question: "What is a content calendar really for?",
          options: [
            "Tracking deadlines only",
            "Showing you the big picture of your strategy before posts go live",
            "Counting posts",
            "Nothing important"
          ],
          correctAnswer: 1,
          explainer: "A good calendar reveals gaps, repetition, and rhythm before posts are public. That is strategy."
        },
        {
          question: "Why does the best time AI matter?",
          options: [
            "It does not",
            "Posting when your audience is online can double views",
            "It only works for celebrities",
            "It makes videos longer"
          ],
          correctAnswer: 1,
          explainer: "Same content, wrong time equals fewer views. Later's AI learns YOUR audience and nails the window."
        }
      ],
      missions: [
        {
          id: "l21_m1",
          title: "30-Day Content Calendar",
          objective: "Plan and schedule 30 days of posts for one platform with clear themes.",
          instructions: [
            "Pick your single platform for this sprint",
            "Define 3 content pillars (topics you will rotate)",
            "Draft 30 post hooks: 10 per pillar",
            "Schedule them in Later with best-time AI on"
          ],
          sandboxPrompt: "I want to plan 30 days of content for [platform] about [niche]. Help me define 3 pillars and draft 30 post hooks.",
          quackySystemPrompt: "You are Quacky helping a kid plan a 30-day content calendar. Given the niche, return 3 numbered content pillars plus 30 post hooks (10 per pillar). Each hook under 15 words. Numbered. One calendar emoji.",
          reflectionQuestion: "Which pillar felt easiest to fill? Which one stretched you?",
          xpReward: 100
        },
        {
          id: "l21_m2",
          title: "Best Time Discovery",
          objective: "Run a 14-day experiment to find your real best posting time.",
          instructions: [
            "Post the same content at 2 different times on alternating days for 14 days",
            "Let Later track performance",
            "Read the analytics at day 15 and identify the winning window",
            "Commit to that window going forward"
          ],
          sandboxPrompt: "I want to test 2 posting times for 14 days: [time A] and [time B]. Help me design an experiment that gives a clean answer.",
          quackySystemPrompt: "You are Quacky helping a kid design a 14-day posting-time experiment. Given the 2 time slots, return a 14-day schedule alternating slots with one metric to track (views, comments, or saves). Short numbered list. One clock emoji.",
          reflectionQuestion: "Were you surprised by which time won?",
          xpReward: 75
        },
        {
          id: "l21_m3",
          title: "Batch Creation Day",
          objective: "Create a full week of content in one single 2-hour session.",
          instructions: [
            "Block 2 hours on a weekend",
            "Generate 7 post ideas at once using your pillars",
            "Design all 7 in Simplified or CapCut in one sitting",
            "Schedule the whole week in Later before you close your laptop"
          ],
          sandboxPrompt: "I have 2 hours to batch 7 days of content about [niche]. Help me write a tight workflow for the session.",
          quackySystemPrompt: "You are Quacky helping a kid batch 7 days of content in 2 hours. Given the niche, return a numbered workflow with time boxes: 15 minutes planning, 60 minutes creation, 30 minutes scheduling, 15 minutes buffer. Each step has 1-2 specific actions. One stopwatch emoji.",
          reflectionQuestion: "How did it feel to end the session knowing next week was already done?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "The top 1% of creators publish 3 to 5 times a week without burning out. Their secret is almost always batch and schedule. Later makes you a top-1% operator from week one.",
      completionBadge: "crowd_plaza_l5",
      nextLesson: "l22"
    },

    // ─────────────────────────────────────────────────────────
    // L22 : PREDIS.AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l22",
      worldId: "w3",
      lessonNumber: 6,
      title: "Predis.ai",
      toolName: "Predis.ai",
      toolUrl: "https://predis.ai/",
      toolCategory: "AI social post generator and competitor analysis",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Generate posts in your voice and read competitors at the same time.",
      warmUpChallenge: "Most creators copy what is already working. Smart creators analyze what is working, then add what nobody else has. Predis does both. Today you become the smart one.",
      warmUpQuiz: {
        question: "Which move separates pros from beginners?",
        options: [
          "Studying competitors before creating anything",
          "Never looking at other creators",
          "Copying viral posts exactly"
        ]
      },
      features: [
        {
          feature: "AI post generation",
          description: "Describe a topic and get 10 post drafts with image, caption, and hashtags.",
          example: "Type 'study tips for finals' and get 10 ready-to-publish posts"
        },
        {
          feature: "Competitor analysis",
          description: "Paste a competitor's social handle and see what is working for them.",
          example: "Drop any creator's handle, see their top 10 posts of the month"
        },
        {
          feature: "Brand voice training",
          description: "Feed Predis your old posts and it matches your tone automatically.",
          example: "Paste 5 samples, get new posts in your voice every time"
        }
      ],
      costInfo: "Free plan covers 15 AI posts per month. Lite plan is $27 per month for 120 posts and competitor analysis.",
      parentTip: "Competitor analysis is not stealing. It is the same thing top athletes do watching game tape. Help your kid frame it as study, not shortcut.",
      learningPoints: [
        "How to study competitors ethically",
        "Voice training for consistent AI output",
        "Post variation to find what works",
        "Hooks and hashtags as hypotheses, not guesses"
      ],
      quiz: [
        {
          question: "Why study competitors?",
          options: [
            "To copy them exactly",
            "To learn what your audience already responds to",
            "To troll them",
            "It has no value"
          ],
          correctAnswer: 1,
          explainer: "Audiences reveal themselves through what they engage with. Competitor study shows you the proof."
        },
        {
          question: "What does voice training do in Predis?",
          options: [
            "Changes your real voice",
            "Teaches the AI to write in your actual tone",
            "Deletes your posts",
            "Adds music"
          ],
          correctAnswer: 1,
          explainer: "You paste samples of your voice, Predis learns it, and every new post sounds like you wrote it."
        },
        {
          question: "Why generate 10 variations instead of 1?",
          options: [
            "Variations are a test",
            "One post is enough",
            "Variations waste time",
            "Quantity is always bad"
          ],
          correctAnswer: 0,
          explainer: "Ten variations let you pick the strongest. Pros test, amateurs settle for the first idea."
        }
      ],
      missions: [
        {
          id: "l22_m1",
          title: "Content from Zero",
          objective: "Generate 10 posts from a topic you know nothing about, then refine to 3 keepers.",
          instructions: [
            "Pick a topic outside your usual zone",
            "Generate 10 posts in Predis",
            "Kill the 7 weakest using honest criteria (hook, clarity, originality)",
            "Refine the top 3 into publish-ready posts"
          ],
          sandboxPrompt: "My topic is [pick something unfamiliar]. Generate 10 post angles and help me score them on hook, clarity, and originality.",
          quackySystemPrompt: "You are Quacky helping a kid score 10 social post drafts. Given the topic, return 10 numbered post angles (under 20 words each) then score each on hook/clarity/originality out of 10 and suggest the top 3. One clipboard emoji.",
          reflectionQuestion: "Did scoring change your favorite? What did you notice?",
          xpReward: 75
        },
        {
          id: "l22_m2",
          title: "Competitor Breakdown",
          objective: "Analyze one creator in your space and extract 3 things that work for them.",
          instructions: [
            "Pick a creator whose content you admire (and is roughly your niche)",
            "Drop their handle into Predis competitor analysis",
            "Read their top 10 posts and write down what makes each work",
            "Create 3 of your own posts that use what works without copying"
          ],
          sandboxPrompt: "I am analyzing [creator handle or style]. Help me extract 3 specific tactics they use I can adapt ethically.",
          quackySystemPrompt: "You are Quacky helping a kid ethically analyze a competitor. Given the creator style, return 3 numbered tactics they use (format, hook style, visual treatment) and for each, a respectful way to adapt it. One binoculars emoji.",
          reflectionQuestion: "What is one thing they do that you would never want to copy?",
          xpReward: 75
        },
        {
          id: "l22_m3",
          title: "Voice Match",
          objective: "Train Predis on your voice, then generate 5 posts that sound undeniably like you.",
          instructions: [
            "Paste 5 of your own best written posts into Predis voice training",
            "Let Predis analyze your tone patterns",
            "Generate 5 new posts on new topics",
            "Blindly read them to a friend without telling them they are AI"
          ],
          sandboxPrompt: "I trained Predis on 5 of my own posts. Help me write 5 new post prompts on different topics that will test whether the AI captured my voice.",
          quackySystemPrompt: "You are Quacky helping a kid test AI voice-matching. Given their niche, return 5 numbered topic prompts that would reveal voice mismatches if the AI is off. Each prompt under 15 words. One microphone emoji.",
          reflectionQuestion: "Could your friend tell which posts were AI? What gave it away, or what didn't?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Social media strategists get paid $50 to $200 per hour to do exactly this work for brands. You just did it for yourself first, which is the better order.",
      completionBadge: "crowd_plaza_l6",
      nextLesson: null
    }
  ],
  empireBuilderModule: {
    id: "eb_w3",
    worldId: "w3",
    title: "Your First Audience",
    tagline: "Build a real following by posting consistently in one niche for 30 days.",
    estimatedMinutes: 45,
    businessArchetype: "Personal brand creator",
    targetCustomer: "Anyone in your niche: future collaborators, sponsors, students, customers.",
    realWorldExamples: [
      "Ryan Kaji launched a YouTube channel at age 3 and built a $250 million empire by age 11.",
      "A 14-year-old in Egypt grew a book review TikTok to 100K followers in 6 months by posting daily.",
      "Teen podcasters on Spotify go from 0 to 10K listeners in 90 days by niching down tight."
    ],
    businessSteps: [
      {
        step: 1,
        title: "Pick your niche and platform",
        description: "Choose ONE topic you love and ONE platform. Tight niche beats broad appeal every time.",
        usingTools: ["Predis.ai", "Simplified"],
        deliverable: "A one-sentence channel pitch: I help [who] [do what] on [platform]."
      },
      {
        step: 2,
        title: "Define your 3 content pillars",
        description: "Pick 3 subtopics you will rotate through. All 90 future posts fall under these 3.",
        usingTools: ["Simplified", "Predis.ai"],
        deliverable: "3 pillar names plus 10 post ideas each (30 ideas total)."
      },
      {
        step: 3,
        title: "Build your first 10 posts",
        description: "Create 10 posts using Simplified, CapCut, and Submagic. Consistent style throughout.",
        usingTools: ["Simplified", "CapCut", "Submagic", "Opus Clip"],
        deliverable: "10 finished posts, all on-brand, ready to schedule."
      },
      {
        step: 4,
        title: "Launch the 30-day calendar",
        description: "Schedule all 10 plus draft 20 more in Later. Go live for 30 straight days.",
        usingTools: ["Later"],
        deliverable: "A fully populated Later calendar for the next 30 days."
      },
      {
        step: 5,
        title: "Make your first 100 followers",
        description: "Focus on response quality over follower count. Reply to every comment. DM people who engage.",
        usingTools: ["Simplified", "Later"],
        deliverable: "A tracker of your first 100 followers with notes on how each found you."
      }
    ],
    quackyPlaybook: "Audiences do not appear. They accumulate. One post today, another tomorrow, 90 more over the next 3 months. Ryan Kaji, MrBeast, and every creator you admire were all unknown on day 1. The only difference between them and 99% of people who quit is consistency. You are betting on yourself for 30 days.",
    pricingLesson: {
      yourFirstPrice: "Free content for 100 followers. Brand-curious followers at 1000. Real sponsor conversations at 5000. Paid partnerships start around $50 to $500 per post at 10,000 followers in a tight niche.",
      whyThisPrice: "Audience size is only half the equation. Niche depth matters more. 2000 followers who care about one specific thing sell better than 20,000 followers who follow everyone.",
      scaleUp: "Double your rate every 10,000 new followers. Triple if engagement rate is above 5%. Brands pay for reach AND trust. You build both by not selling out early."
    },
    firstCustomerExercise: {
      task: "Post your first content piece in your niche today. Tag 3 real friends and ask them to share if they like it.",
      prompt: "I am launching a [niche] content channel on [platform]. Help me write a launch post with a hook that makes my friends actually share it.",
      quackySystemPrompt: "You are Quacky helping a kid write their channel launch post. Given the niche and platform, write a 3-part launch post: hook (1 line that makes the feed stop), story (why this niche, in 2 sentences), invite (ask for shares with specificity). Platform-appropriate length. One rocket emoji."
    },
    xpReward: 500,
    completionBadge: "crowd_plaza_champion"
  },
  capstone: {
    id: "cap_w3",
    worldId: "w3",
    title: "The Crowd Plaza Launch Kit",
    narrative: "Creators prove themselves by launching, not by planning. The Launch Kit is real: a live channel with 10 published pieces and a defined audience strategy.",
    requiredMissions: ["l17_m1", "l18_m1", "l19_m1", "l20_m2", "l21_m1", "l22_m3"],
    deliverableSpec: "Submit one shareable folder or link containing: channel name and platform, brand kit (colors, fonts, logo), 10 published pieces with URLs, 3 content pillars documented, 30-day calendar exported from Later, first follower tracker with 10 entries minimum.",
    submissionFormat: "portfolio",
    parentReviewPrompt: "Your child just launched a real content channel. Review the 10 pieces, name which is strongest, and discuss what a steady 90-day commitment would mean. Creator discipline at 12 beats adult hustle at 30.",
    xpReward: 1000,
    unlocksWorld: "w4"
  }
};

// ═══════════════════════════════════════════════════════════
// WORLD 4 : POWER GRID
// AI for productivity, systems, time, and automation
// Empire Builder: Systems and time as money
// ═══════════════════════════════════════════════════════════

const POWER_GRID: World = {
  id: "w4",
  name: "Power Grid",
  color: "#00A878",
  icon: "bolt",
  description: "Build systems that work while you sleep. Time is the one asset you can't make more of.",
  empireBuilderConcept: "Systems and time as money : operators who systematize their work earn more while working less.",
  lessonCount: 8,
  unlockRequirement: { previousWorld: "w3", minXP: 7000 },
  capstoneProject: "Design a complete personal operating system that runs your week across notes, tasks, email, and automations.",
  lessons: [
    // ─────────────────────────────────────────────────────────
    // L23 : NOTION AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l23",
      worldId: "w4",
      lessonNumber: 1,
      title: "Notion AI",
      toolName: "Notion AI",
      toolUrl: "https://www.notion.so/product/ai",
      toolCategory: "AI knowledge base and workspace",
      difficulty: "medium",
      estimatedMinutes: 25,
      heroLine: "Build your second brain where everything lives, searches, and writes itself.",
      warmUpChallenge: "Your brain forgets things. Not because you are dumb, because that is what brains do. The best operators do not rely on memory. They build systems. Today you start yours.",
      warmUpQuiz: {
        question: "What would you put in a second brain first?",
        options: [
          "Every project I have ever started and abandoned",
          "All the ideas I lose because I never write them down",
          "My goals and the weekly review that makes them happen"
        ]
      },
      features: [
        {
          feature: "AI writing inside any page",
          description: "Press space and ask the AI to write, summarize, or rewrite anything inline.",
          example: "Turn rough bullet notes into a clean weekly review in one command"
        },
        {
          feature: "Database with AI fill",
          description: "Notion databases can auto-fill fields using AI based on the content.",
          example: "A task list auto-tags urgency, category, and next action"
        },
        {
          feature: "Semantic search",
          description: "Search by meaning, not just keywords. Ask a question, get an answer from your notes.",
          example: "Ask: what did I decide about the logo last month? Notion finds it."
        }
      ],
      costInfo: "Free plan covers personal use. Notion AI add-on is $10 per month with unlimited use.",
      parentTip: "Notion is the gold-standard tool for operators. Help your kid build ONE system first (weekly review, or reading log) before expanding. Tool sprawl kills systems.",
      learningPoints: [
        "Second brain principles: capture, organize, retrieve",
        "Databases as systems, not lists",
        "Why semantic search changes the game",
        "When to use AI inline vs asking questions"
      ],
      quiz: [
        {
          question: "What is a second brain for?",
          options: [
            "Replacing your real brain",
            "Catching ideas your brain forgets and making them useful later",
            "Storing passwords",
            "Nothing important"
          ],
          correctAnswer: 1,
          explainer: "Your brain is for thinking, not storing. A second brain holds everything so you can focus on thinking."
        },
        {
          question: "Why do databases beat lists?",
          options: [
            "They do not",
            "Databases let you filter, sort, and view the same info in 5 ways",
            "Databases are uglier",
            "Lists are always better"
          ],
          correctAnswer: 1,
          explainer: "A task list is flat. A task database lets you view by priority, by project, by week, by status, all from the same data."
        },
        {
          question: "What is semantic search?",
          options: [
            "Search for exact words only",
            "Search by meaning, so 'logo decision' finds 'branding choice'",
            "Search inside videos",
            "A type of file"
          ],
          correctAnswer: 1,
          explainer: "Semantic search understands meaning. You do not need to remember the exact words you wrote, just what you were thinking about."
        }
      ],
      missions: [
        {
          id: "l23_m1",
          title: "Weekly Review Template",
          objective: "Build a weekly review page that forces you to reflect every Sunday in 10 minutes.",
          instructions: [
            "Create a Notion page called Weekly Review",
            "Add 4 sections: wins, misses, lessons, next week",
            "Add AI prompts inside each section that ask the right question",
            "Duplicate it to a database so every week has its own entry"
          ],
          sandboxPrompt: "I want a 10-minute weekly review template in Notion with 4 sections: wins, misses, lessons, next week. Help me write the AI prompts for each section.",
          quackySystemPrompt: "You are Quacky helping a kid design a weekly review template. For each of the 4 sections (wins, misses, lessons, next week), write 1 specific inline AI prompt that surfaces honest reflection. Keep each under 20 words. Numbered. One spiral emoji.",
          reflectionQuestion: "Which section do you think you will dread most? That is the one that matters most.",
          xpReward: 75
        },
        {
          id: "l23_m2",
          title: "Project Database",
          objective: "Build a database that tracks every project you start, with auto-tagged next actions.",
          instructions: [
            "Create a Projects database with 5 fields: name, status, category, next action, deadline",
            "Add AI fill on the category and next action fields",
            "Log 5 real projects (finished, active, or idea stage)",
            "View by status to see what is actually moving"
          ],
          sandboxPrompt: "I want to build a Notion project database with 5 fields. Help me write the AI prompts for auto-tagging category and next action.",
          quackySystemPrompt: "You are Quacky helping a kid set up a project database with AI auto-fill. Write 2 short AI prompts: one for category tagging (creative/learning/business/personal), one for next-action extraction (under 10 words each output). One folder emoji.",
          reflectionQuestion: "How many of your 5 projects have moved in the last 30 days? Be honest.",
          xpReward: 75
        },
        {
          id: "l23_m3",
          title: "Second Brain Search Test",
          objective: "Prove your second brain works by retrieving an idea you had weeks ago.",
          instructions: [
            "Drop 10 ideas you have had recently into Notion as quick notes",
            "Wait 48 hours",
            "Use semantic search to find 3 of them with partial memory",
            "Note which ideas you could not have found without search"
          ],
          sandboxPrompt: "I want to test Notion's semantic search by retrieving 3 ideas from vague memory. Help me write 3 test queries based on typical vague recall.",
          quackySystemPrompt: "You are Quacky helping a kid test semantic search. Given the experiment, return 3 vague-memory query examples (like 'the thing about late-night focus' or 'that idea about a teen newsletter'). Each under 12 words. Numbered. One magnifier emoji.",
          reflectionQuestion: "Which idea would have been lost forever without your second brain?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Operations consultants charge $150 to $400 per hour to build Notion systems for founders. The skill is worth real money and makes your own life calmer.",
      completionBadge: "power_grid_l1",
      nextLesson: "l24"
    },

    // ─────────────────────────────────────────────────────────
    // L24 : RECLAIM.AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l24",
      worldId: "w4",
      lessonNumber: 2,
      title: "Reclaim.ai",
      toolName: "Reclaim.ai",
      toolUrl: "https://reclaim.ai/",
      toolCategory: "AI calendar and focus time scheduler",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "The AI that defends your calendar like a bodyguard.",
      warmUpChallenge: "Most calendars are full of other people's priorities. Reclaim flips it. Your habits and focus time come first, then everything else fits around them. Today you stop giving your time away by default.",
      warmUpQuiz: {
        question: "What would you defend on your calendar if you could?",
        options: [
          "A daily 90-minute focus block for deep work",
          "Protected time for exercise and rest",
          "Space for the projects that never get scheduled"
        ]
      },
      features: [
        {
          feature: "Habits that auto-schedule",
          description: "Tell Reclaim what matters (exercise, reading, focus blocks), it finds time automatically.",
          example: "Set habit: focus work 2 hours per day. Reclaim places it where it fits."
        },
        {
          feature: "Smart defenses",
          description: "Reclaim reshuffles habits when meetings come up instead of deleting them.",
          example: "A last-minute meeting on Tuesday, focus time auto-moves to Wednesday"
        },
        {
          feature: "Task time blocking",
          description: "Import tasks, Reclaim schedules them based on priority and deadline.",
          example: "A 2-hour project due Friday gets blocked in before it."
        }
      ],
      costInfo: "Free plan covers habits and tasks. Starter plan is $10 per month for smarter scheduling and team features.",
      parentTip: "Teach calendar defense early. A kid who protects focus time at 12 is someone who can compete with adults at 20. It is the rarest adult skill and the easiest to start young.",
      learningPoints: [
        "Calendar as a system, not a scratchpad",
        "Defending time before giving it away",
        "Habits as the foundation of productivity",
        "Time-blocking vs to-do lists"
      ],
      quiz: [
        {
          question: "What is the problem with most calendars?",
          options: [
            "Calendars are fine",
            "They are full of other people's priorities",
            "They cost too much",
            "They are too colorful"
          ],
          correctAnswer: 1,
          explainer: "Open your calendar. Count how many blocks YOU chose vs someone else scheduled. Most people lose the game by default."
        },
        {
          question: "What does a Reclaim habit do?",
          options: [
            "Nothing special",
            "Auto-schedules recurring time for what matters to you",
            "Sends spam emails",
            "Deletes meetings"
          ],
          correctAnswer: 1,
          explainer: "A habit is a recurring block Reclaim defends. Exercise, focus, reading, meditation. It finds the time, you just show up."
        },
        {
          question: "What happens when a meeting conflicts with a habit?",
          options: [
            "The habit is deleted",
            "Reclaim reshuffles the habit to protect it",
            "Nothing",
            "The meeting gets cancelled"
          ],
          correctAnswer: 1,
          explainer: "Reclaim does not abandon your habits. It moves them to another slot so they still happen."
        }
      ],
      missions: [
        {
          id: "l24_m1",
          title: "Calendar Audit",
          objective: "Audit your current week and catch where your time actually goes.",
          instructions: [
            "Screenshot this week's calendar",
            "Color-code: blue for your choices, red for others' choices, yellow for reactive",
            "Count hours in each color",
            "Write a one-line verdict: who owned your week"
          ],
          sandboxPrompt: "I audited my calendar: [X hours my choices], [Y hours others' choices], [Z hours reactive]. Help me interpret what this means for my week.",
          quackySystemPrompt: "You are Quacky helping a kid analyze a calendar audit. Given the 3 numbers, return a direct verdict (1 sentence), 3 observations, and 1 specific change to try next week. Under 100 words. One pie chart emoji.",
          reflectionQuestion: "Were you surprised by who actually owned your week?",
          xpReward: 75
        },
        {
          id: "l24_m2",
          title: "3-Habit Stack",
          objective: "Install 3 non-negotiable habits on your calendar that Reclaim defends automatically.",
          instructions: [
            "Pick 3 habits that would compound if you did them weekly: exercise, deep work, reading",
            "Configure each in Reclaim with preferred time windows",
            "Let Reclaim auto-schedule for 7 days",
            "Mark completion each night and see the hit rate"
          ],
          sandboxPrompt: "I want to install 3 weekly habits: [list]. Help me set Reclaim rules: preferred time windows and minimum completions per week.",
          quackySystemPrompt: "You are Quacky helping a kid configure 3 Reclaim habits. Given the habits, return 3 labeled configs: frequency per week, duration per session, preferred time window, and 1 recovery rule for when life breaks. Numbered. One shield emoji.",
          reflectionQuestion: "Which habit did you skip most this week? Why is it the hardest?",
          xpReward: 100
        },
        {
          id: "l24_m3",
          title: "The Deep Work Block",
          objective: "Lock one 90-minute deep work block daily for 7 days and track what you do in it.",
          instructions: [
            "Configure a Reclaim habit: 90 minutes of focus, 5 days per week",
            "Before each block, write ONE specific outcome you will achieve",
            "Work with phone out of reach",
            "Log the outcome at the end of each block"
          ],
          sandboxPrompt: "I am doing 5 days of 90-minute deep work. Help me pick 5 specific outcomes, one per day, around my project [describe].",
          quackySystemPrompt: "You are Quacky helping a kid pick 5 deep-work outcomes. Given the project, return 5 numbered daily outcomes, each a specific deliverable that fits in 90 minutes. Start each with an action verb. One focus emoji.",
          reflectionQuestion: "What became possible in 90 protected minutes that never got done in normal days?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "The single biggest advantage any solo operator has is focus time. People who protect 90 minutes a day ship more work than people who grind 8 hours unfocused. Reclaim makes that possible at 12 years old.",
      completionBadge: "power_grid_l2",
      nextLesson: "l25"
    },

    // ─────────────────────────────────────────────────────────
    // L25 : SUPERHUMAN AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l25",
      worldId: "w4",
      lessonNumber: 3,
      title: "Superhuman AI",
      toolName: "Superhuman AI",
      toolUrl: "https://superhuman.com/",
      toolCategory: "AI email triage and writing",
      difficulty: "medium",
      estimatedMinutes: 18,
      heroLine: "The email client that makes inbox zero feel like a fair fight.",
      warmUpChallenge: "Most adults spend 3 hours a day on email. The best operators spend 20 minutes total. The secret is not working harder, it is triaging smarter. Today you become faster than any adult you know.",
      warmUpQuiz: {
        question: "What is the biggest email trap?",
        options: [
          "Checking email every 5 minutes all day",
          "Replying immediately to everything",
          "Writing responses longer than they need to be"
        ]
      },
      features: [
        {
          feature: "AI reply drafts",
          description: "Superhuman drafts responses based on the email thread and your past replies.",
          example: "Open an email, see 3 reply drafts ready before you type anything"
        },
        {
          feature: "Triage keyboard shortcuts",
          description: "Clear inbox 3x faster using single-key actions for archive, snooze, reply.",
          example: "E to archive, H to snooze until tomorrow, R to reply. 100 emails in 10 minutes."
        },
        {
          feature: "Split inbox",
          description: "Separate VIP emails, newsletters, and team stuff into their own streams.",
          example: "Only your top 5 senders appear in your main inbox, everything else waits"
        }
      ],
      costInfo: "Superhuman is $30 per month. Free alternatives with similar AI features: Gmail with Copilot-like third-party extensions like Flowrite.",
      parentTip: "Email triage is a lifelong skill. Start with Gmail and free AI tools first. Superhuman is a power upgrade for heavy users, not a starter tool.",
      learningPoints: [
        "Why batch email beats real-time email",
        "Triage before writing",
        "Short replies are a gift, not rudeness",
        "Keyboard shortcuts as leverage"
      ],
      quiz: [
        {
          question: "What is the real cost of checking email all day?",
          options: [
            "There is no cost",
            "Every interruption takes 20 minutes to recover focus",
            "It saves time",
            "Only the internet bill"
          ],
          correctAnswer: 1,
          explainer: "Research shows it takes 15 to 25 minutes to fully regain focus after an interruption. Email 10 times a day kills 3 hours."
        },
        {
          question: "Why does triage matter more than writing?",
          options: [
            "It does not",
            "Most emails do not need a reply, and triage decides that fast",
            "Only the reply matters",
            "Triage is the same as writing"
          ],
          correctAnswer: 1,
          explainer: "Most emails can be archived, snoozed, or forwarded in one second. Only 10% actually deserve your thoughtful reply."
        },
        {
          question: "What makes a short reply a gift?",
          options: [
            "It respects both people's time",
            "It means you do not care",
            "It is lazy",
            "Short replies are rude"
          ],
          correctAnswer: 0,
          explainer: "Long emails signal you are disorganized. Tight emails signal respect for the reader's time."
        }
      ],
      missions: [
        {
          id: "l25_m1",
          title: "Inbox Zero Sprint",
          objective: "Clear your inbox from current state to zero in one focused 45-minute sprint.",
          instructions: [
            "Set a 45-minute timer",
            "For every email: archive, snooze, or reply in under 60 seconds",
            "No writing over 3 sentences",
            "Screenshot the empty inbox when done"
          ],
          sandboxPrompt: "I have [X] unread emails. Help me build a decision tree for the sprint: when to archive, when to snooze, when to reply.",
          quackySystemPrompt: "You are Quacky helping a kid triage emails in a 45-minute sprint. Return a simple 3-branch decision tree: 1. Does it need me personally (no → archive); 2. Can it wait (yes → snooze, no → reply); 3. Can I reply in 3 sentences (yes → reply now, no → schedule). One trash emoji.",
          reflectionQuestion: "What did you realize about your own inbox while triaging at speed?",
          xpReward: 75
        },
        {
          id: "l25_m2",
          title: "The 3-Sentence Reply",
          objective: "Reply to 5 real emails this week using only 3 sentences each.",
          instructions: [
            "Pick 5 recent emails you need to reply to",
            "Draft each reply in exactly 3 sentences: acknowledge, answer, close",
            "Use AI to tighten any that feel rough",
            "Send them and notice how much time you saved"
          ],
          sandboxPrompt: "I need to reply to this email: [paste]. Help me draft a 3-sentence reply: acknowledge, answer, close.",
          quackySystemPrompt: "You are Quacky helping a kid write 3-sentence email replies. Given the original email, write exactly 3 sentences: 1. acknowledge what they said, 2. give your answer or position, 3. close with next step or warm sign-off. No extra lines. One envelope emoji.",
          reflectionQuestion: "Did anyone complain about your shorter replies? Or did they just move on?",
          xpReward: 75
        },
        {
          id: "l25_m3",
          title: "Inbox Quiet Hours",
          objective: "Batch all email into 2 fixed check-ins per day for 5 days.",
          instructions: [
            "Lock 2 email windows on your calendar: one morning, one afternoon, 30 minutes each",
            "Close email outside those windows",
            "Log how many times you felt the urge to check outside the windows",
            "Compare your week to previous weeks"
          ],
          sandboxPrompt: "I am batching email to 2 windows per day for 5 days. Help me design a tracking sheet for urges and outcomes.",
          quackySystemPrompt: "You are Quacky helping a kid track an email batching experiment. Return a 5-day tracking table template: columns for date, check-in times, emails handled, urge count, one observation. Simple text format. One clock emoji.",
          reflectionQuestion: "Did the world actually end when you did not reply within an hour?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "The highest-paid executives in the world all have assistants or systems that triage email before they see it. You are building that system for yourself decades earlier than they did.",
      completionBadge: "power_grid_l3",
      nextLesson: "l26"
    },

    // ─────────────────────────────────────────────────────────
    // L26 : MEM.AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l26",
      worldId: "w4",
      lessonNumber: 4,
      title: "Mem.ai",
      toolName: "Mem.ai",
      toolUrl: "https://mem.ai/",
      toolCategory: "AI note-taking with connection discovery",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "Notes that connect themselves so you see patterns you did not know existed.",
      warmUpChallenge: "Most people take notes and never look at them again. The genius is in connections. Mem surfaces the link between a note you wrote today and a thought you had 6 months ago. Today you become a pattern hunter.",
      warmUpQuiz: {
        question: "What kind of connection would blow your mind to find?",
        options: [
          "Two ideas I had months apart that form a real business",
          "A pattern in my weekly reviews I never noticed",
          "Things I keep forgetting I already learned"
        ]
      },
      features: [
        {
          feature: "Auto-connections",
          description: "Mem suggests related notes as you write, surfacing your past thinking.",
          example: "Type 'pricing' and Mem shows every pricing thought you ever had"
        },
        {
          feature: "Mem Chat",
          description: "Ask questions about your own notes and Mem answers from your past self.",
          example: "Ask: what did I learn from my last failed project? Mem tells you."
        },
        {
          feature: "Automatic tagging",
          description: "Mem reads your note and tags it without you doing any organizing.",
          example: "Write about a class project, Mem tags it: school, project, specific-topic"
        }
      ],
      costInfo: "Free plan covers personal capture. Mem X is $14.99 per month for full AI features.",
      parentTip: "Mem is the lowest-friction capture tool. Install it on your kid's phone. The easier capture is, the more ideas survive.",
      learningPoints: [
        "Why capture beats organization",
        "The connection principle: ideas compound",
        "Your own past thinking as a resource",
        "Low-friction capture as a daily habit"
      ],
      quiz: [
        {
          question: "What do most people do wrong with notes?",
          options: [
            "They take too many",
            "They never look at them again after writing",
            "They write them too fast",
            "They use too many colors"
          ],
          correctAnswer: 1,
          explainer: "Notes that never get revisited are dead weight. The value is in returning to them later when you need them."
        },
        {
          question: "What is the connection principle?",
          options: [
            "Ideas are isolated",
            "Two separate ideas often combine into something bigger",
            "Ideas only work one at a time",
            "Only new ideas matter"
          ],
          correctAnswer: 1,
          explainer: "Your best work usually comes from connecting two ideas you had at different times. Mem surfaces those connections."
        },
        {
          question: "What is low-friction capture?",
          options: [
            "Making notes take longer",
            "Capturing thoughts so fast you barely stop thinking",
            "Using the biggest notebook",
            "Always typing, never voice"
          ],
          correctAnswer: 1,
          explainer: "If capturing takes effort, you skip it. Mem's whole design is about removing friction so nothing is lost."
        }
      ],
      missions: [
        {
          id: "l26_m1",
          title: "Capture Sprint",
          objective: "Capture every thought, idea, and observation for 3 days. No filtering.",
          instructions: [
            "Set up Mem on your phone's home screen",
            "For 3 days, capture anything: ideas, complaints, observations, song lyrics",
            "Do not organize, do not edit, just capture",
            "On day 4, scroll through and count how many surprised you"
          ],
          sandboxPrompt: "I am doing a 3-day capture sprint. Help me set 5 capture triggers (moments or questions) that will remind me to save ideas.",
          quackySystemPrompt: "You are Quacky helping a kid build capture triggers for a 3-day note sprint. Return 5 specific trigger moments (like 'right before falling asleep' or 'after every class') with one question to ask at each. Numbered. One pencil emoji.",
          reflectionQuestion: "How many ideas from those 3 days would have been forgotten forever?",
          xpReward: 75
        },
        {
          id: "l26_m2",
          title: "Ask Your Past Self",
          objective: "Use Mem Chat to ask 5 questions that only your past self can answer.",
          instructions: [
            "Wait at least a week after your capture sprint",
            "Write 5 questions like: 'What did I decide about X?' or 'What was I excited about in March?'",
            "Let Mem Chat answer from your notes",
            "Note which answers surprised you"
          ],
          sandboxPrompt: "I want to ask Mem 5 questions only my past self can answer. Help me phrase them to get real insights.",
          quackySystemPrompt: "You are Quacky helping a kid phrase questions for Mem Chat. Return 5 numbered questions that probe past thinking (patterns, decisions, recurring worries, abandoned ideas, surprising wins). Each under 15 words. One mirror emoji.",
          reflectionQuestion: "Which answer from your past self felt like advice from a different person?",
          xpReward: 75
        },
        {
          id: "l26_m3",
          title: "Connection Hunt",
          objective: "Find 3 real connections between notes from different months and turn them into something new.",
          instructions: [
            "Browse Mem's auto-connections view",
            "Find 3 pairs of notes that seem unrelated but click when joined",
            "For each pair, write a 2-sentence description of the new idea that emerges",
            "Pick the strongest and turn it into a real project or post"
          ],
          sandboxPrompt: "I found 3 connected notes: [describe each pair]. Help me turn the strongest connection into one concrete project.",
          quackySystemPrompt: "You are Quacky helping a kid extract a project from 2 connected notes. Given the pair, return a concrete project outline: what it is (1 sentence), why it matters (1 sentence), first 3 steps. Under 100 words. One link emoji.",
          reflectionQuestion: "Would you have seen this connection without the tool? Or is this why you needed a second brain?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "The best founders keep idea notebooks their whole lives. Richard Branson, Ray Dalio, Austin Kleon. Mem is that notebook on steroids, and you get it at 12.",
      completionBadge: "power_grid_l4",
      nextLesson: "l27"
    },

    // ─────────────────────────────────────────────────────────
    // L27 : ZAPIER AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l27",
      worldId: "w4",
      lessonNumber: 5,
      title: "Zapier AI",
      toolName: "Zapier",
      toolUrl: "https://zapier.com/",
      toolCategory: "AI automation between apps",
      difficulty: "hard",
      estimatedMinutes: 25,
      heroLine: "Make your tools talk to each other and do work while you sleep.",
      warmUpChallenge: "Every boring repetitive task in your digital life can probably be automated. Zapier connects 7000 apps. You write the rule once. It runs forever. Today you stop doing busywork.",
      warmUpQuiz: {
        question: "What would you automate first if you could?",
        options: [
          "Every time I save a note, post a summary to my journal",
          "Every new follower, send them a welcome DM",
          "Every completed task, add the win to my weekly review"
        ]
      },
      features: [
        {
          feature: "Zaps (if-this-then-that)",
          description: "A trigger in one app starts an action in another.",
          example: "When I get a new Calendly booking, create a Notion page for the meeting"
        },
        {
          feature: "AI steps",
          description: "Insert an AI step that transforms data before it moves to the next app.",
          example: "Take a raw note, have AI summarize it, then save the summary to your journal"
        },
        {
          feature: "Paths (if/else logic)",
          description: "Different actions based on conditions you set.",
          example: "If the email contains urgent → Slack me. If not → auto-file in Gmail."
        }
      ],
      costInfo: "Free plan covers 100 tasks per month. Starter plan is $19.99 per month for 750 tasks and multi-step zaps.",
      parentTip: "Zapier is a superpower but also a rabbit hole. Help your kid automate ONE real-life task completely before exploring more. Winning fast beats exploring endlessly.",
      learningPoints: [
        "Trigger-action thinking",
        "AI as a middle layer between apps",
        "When to automate vs do manually",
        "Why automation compounds"
      ],
      quiz: [
        {
          question: "What is a trigger in Zapier?",
          options: [
            "A button you press",
            "An event in one app that starts an automation",
            "A type of password",
            "A social media post"
          ],
          correctAnswer: 1,
          explainer: "A trigger is the starting event: new email, new form submission, new calendar event. It fires the Zap."
        },
        {
          question: "Why add an AI step?",
          options: [
            "To slow things down",
            "To transform or decide on data between apps",
            "AI steps cannot do anything",
            "Just for decoration"
          ],
          correctAnswer: 1,
          explainer: "AI steps summarize, categorize, or extract info from raw data before passing it to the next app. They are the smart middle."
        },
        {
          question: "When should you NOT automate?",
          options: [
            "Always automate everything",
            "When you only do the task once or twice",
            "When you hate the task",
            "Never question automation"
          ],
          correctAnswer: 1,
          explainer: "Automation has setup cost. If a task happens once, just do it. If it happens weekly, automate it. Math wins."
        }
      ],
      missions: [
        {
          id: "l27_m1",
          title: "Note-to-Journal Zap",
          objective: "Build a Zap that takes your Mem notes and adds a weekly AI summary to Notion.",
          instructions: [
            "Connect Mem and Notion to Zapier",
            "Trigger: every Sunday at 6pm",
            "Action: fetch all Mem notes from the week, AI-summarize, post to Notion journal",
            "Let it run for a week and review the output"
          ],
          sandboxPrompt: "I want to build a Zap: every Sunday, summarize my Mem notes and post to Notion. Help me write the AI prompt for the summary step.",
          quackySystemPrompt: "You are Quacky helping a kid design an AI summary prompt for a weekly notes-to-journal Zap. The AI step must output: 3 themes this week, 1 standout idea, 1 pattern worth watching. Each section 1-2 sentences. Keep output under 120 words. One loop emoji.",
          reflectionQuestion: "When you read your own AI-summarized week, did you see yourself more clearly?",
          xpReward: 100
        },
        {
          id: "l27_m2",
          title: "Follower Welcome Automation",
          objective: "Set up a Zap that sends a warm DM to every new follower on your main platform.",
          instructions: [
            "Pick your main platform (from Crowd Plaza)",
            "Trigger: new follower",
            "Add AI step: generate a personalized welcome using their bio",
            "Action: send the DM and log the new follower in a Notion database"
          ],
          sandboxPrompt: "I want a Zap that welcomes new followers with a personalized DM. Help me write the AI prompt that makes the DM feel personal, not spam.",
          quackySystemPrompt: "You are Quacky helping a kid design an AI welcome DM that does not feel spammy. The AI step: read the new follower's bio, write a 2-sentence DM that references something specific from their profile, no emojis, no links. Output exactly 2 sentences. One wave emoji.",
          reflectionQuestion: "What is the line between warm and creepy in an automated DM?",
          xpReward: 100
        },
        {
          id: "l27_m3",
          title: "Win Tracker",
          objective: "Automate adding every completed task to your weekly review automatically.",
          instructions: [
            "Trigger: task marked complete in your task manager",
            "Add filter: only tasks tagged important or project",
            "Action: add an entry to your Notion weekly review wins section",
            "Include the task name, completion date, and any notes"
          ],
          sandboxPrompt: "I want a Zap that logs every important completed task to my weekly review. Help me design the filter rule so small tasks do not flood the review.",
          quackySystemPrompt: "You are Quacky helping a kid design a task filter for an automation. Return 3 numbered filter rules that separate wins worth logging from routine tasks (priority level, tag match, time spent threshold). Each rule under 20 words. One filter emoji.",
          reflectionQuestion: "Which routine tasks were you tempted to log as wins? Why?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Automation consultants earn $75 to $300 per hour building Zapier flows for businesses. Once you get the trigger-action mindset, you see automation opportunities everywhere.",
      completionBadge: "power_grid_l5",
      nextLesson: "l28"
    },

    // ─────────────────────────────────────────────────────────
    // L28 : KRISP
    // ─────────────────────────────────────────────────────────
    {
      id: "l28",
      worldId: "w4",
      lessonNumber: 6,
      title: "Krisp",
      toolName: "Krisp",
      toolUrl: "https://krisp.ai/",
      toolCategory: "AI noise cancellation and meeting assistant",
      difficulty: "easy",
      estimatedMinutes: 15,
      heroLine: "Sound professional on every call, even if a lawnmower is running outside.",
      warmUpChallenge: "Sound quality is the difference between being taken seriously and being muted. Most kids will lose opportunities because their room echoes or a sibling yells. Today you remove that excuse forever.",
      warmUpQuiz: {
        question: "Which call would you want to sound studio-quality on?",
        options: [
          "A real interview or pitch call with an adult",
          "A live stream or podcast guest spot",
          "A family call where grandparents actually hear you"
        ]
      },
      features: [
        {
          feature: "Noise cancellation",
          description: "Strips out background noise in real time on both sides of the call.",
          example: "Lawn mower, dog barking, sibling yelling : all gone instantly"
        },
        {
          feature: "Meeting notes",
          description: "Krisp transcribes calls and auto-generates summaries with action items.",
          example: "End a 30-minute meeting with a 5-bullet summary and 3 action items"
        },
        {
          feature: "Echo and voice cancellation",
          description: "Removes room echo and other people's voices leaking through speakers.",
          example: "Work in a kitchen with siblings on a loud call, only your voice gets through"
        }
      ],
      costInfo: "Free plan covers noise cancellation for personal calls. Pro plan is $16 per month with unlimited transcription and meeting notes.",
      parentTip: "Krisp is one of those tools that feels invisible. Install it on your kid's laptop as a default for every video call. The sound upgrade alone opens more doors than any other single fix.",
      learningPoints: [
        "Why sound quality signals competence",
        "Meeting notes as leverage",
        "Showing up professionally at any age",
        "Removing environmental excuses"
      ],
      quiz: [
        {
          question: "Why does sound quality matter so much?",
          options: [
            "It does not",
            "It is the fastest signal of 'this person is serious'",
            "Only video matters",
            "Bad sound is cute"
          ],
          correctAnswer: 1,
          explainer: "Adults subconsciously judge competence by sound clarity in the first 10 seconds. Good audio buys you trust."
        },
        {
          question: "What is an AI meeting note good for?",
          options: [
            "Nothing",
            "Turning a 30-minute call into a 5-bullet summary with action items",
            "Only recording audio",
            "Only for music"
          ],
          correctAnswer: 1,
          explainer: "Instead of taking notes during a call (missing context), let AI. Your full attention stays on the conversation."
        },
        {
          question: "Who benefits from noise cancellation?",
          options: [
            "Only adults in offices",
            "Anyone who takes calls from imperfect environments (most of us)",
            "Nobody",
            "Only professional podcasters"
          ],
          correctAnswer: 1,
          explainer: "Kitchen, car, noisy neighborhood, shared room. Krisp erases environment so your voice does the work."
        }
      ],
      missions: [
        {
          id: "l28_m1",
          title: "Before and After Call",
          objective: "Record yourself once without Krisp and once with, then compare the difference.",
          instructions: [
            "Pick any call app (Zoom, Meet, Teams)",
            "Record a 60-second sample speaking normally with ambient noise around you",
            "Turn on Krisp and record the same passage again",
            "Play both back and note the difference"
          ],
          sandboxPrompt: "I recorded myself without Krisp and with Krisp. Help me write a 5-point comparison checklist for judging the difference.",
          quackySystemPrompt: "You are Quacky helping a kid compare audio recordings. Return a 5-point checklist: background noise, voice clarity, echo, consistency, overall polish. For each, a yes/no question under 10 words. Numbered. One sound emoji.",
          reflectionQuestion: "Would you hire your pre-Krisp self for anything serious?",
          xpReward: 50
        },
        {
          id: "l28_m2",
          title: "Real Interview Prep",
          objective: "Use Krisp for one real call this week and send the AI meeting notes to the other person.",
          instructions: [
            "Schedule a call with someone (teacher, mentor, family member, collaborator)",
            "Run Krisp on the full call",
            "After the call, download the AI summary",
            "Send the summary to the other person with a note: 'from my notes'"
          ],
          sandboxPrompt: "I just had a call with [person] about [topic]. Help me turn the Krisp transcript into a professional follow-up email with 3 action items.",
          quackySystemPrompt: "You are Quacky helping a kid draft a follow-up email after a call. Given the transcript summary, write 4 short paragraphs: thank you line, 1-sentence recap, 3 bulleted action items with owners, warm close. Under 150 words. One clipboard emoji.",
          reflectionQuestion: "How did the other person react when you sent them organized notes?",
          xpReward: 100
        },
        {
          id: "l28_m3",
          title: "Podcast Guest Spot",
          objective: "Record a mock podcast guest interview with a friend using Krisp-level audio.",
          instructions: [
            "Pair up with a friend playing interviewer",
            "Have them ask you 5 questions about something you know",
            "Record with Krisp active throughout",
            "Export the audio and run it through Descript captions from Story Forge"
          ],
          sandboxPrompt: "I am doing a mock podcast interview about [topic]. Help my friend write 5 interviewer questions that get surprising answers out of me.",
          quackySystemPrompt: "You are Quacky helping a friend prepare podcast interview questions. Given the guest topic, return 5 numbered questions that progress from easy warm-up to deep insight to surprising personal angle. Each question under 20 words. One microphone emoji.",
          reflectionQuestion: "Which question pulled an answer out of you that surprised even you?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "The kids who show up professionally on calls at 14 are the kids who get sponsorships, internships, and collaborations at 17. Sound quality is the cheapest professional upgrade available.",
      completionBadge: "power_grid_l6",
      nextLesson: "l29"
    },

    // ─────────────────────────────────────────────────────────
    // L29 : OTTER.AI
    // ─────────────────────────────────────────────────────────
    {
      id: "l29",
      worldId: "w4",
      lessonNumber: 7,
      title: "Otter.ai",
      toolName: "Otter.ai",
      toolUrl: "https://otter.ai/",
      toolCategory: "AI meeting transcription and search",
      difficulty: "easy",
      estimatedMinutes: 15,
      heroLine: "Transcribe anything said anywhere, then search it like a document.",
      warmUpChallenge: "Most of your learning is in things that get said once and never written down. Teacher explanations, family wisdom, friend advice. Otter captures it all so you can come back years later.",
      warmUpQuiz: {
        question: "What would you record if you knew you could search it later?",
        options: [
          "Every class so I can search what the teacher actually said",
          "Family conversations about childhood stories and advice",
          "My own brainstorms when I am thinking out loud"
        ]
      },
      features: [
        {
          feature: "Live transcription",
          description: "Otter turns speech into searchable text in real time.",
          example: "Record a class, see words appearing on your phone as the teacher talks"
        },
        {
          feature: "Speaker identification",
          description: "Otter learns who is talking and labels each speaker separately.",
          example: "Teacher, you, classmate, grandparent : each labeled so you can find who said what"
        },
        {
          feature: "Smart summaries",
          description: "Long conversations get auto-summarized with key takeaways and action items.",
          example: "A 60-minute conversation becomes a 6-bullet summary you can scan in 30 seconds"
        }
      ],
      costInfo: "Free plan includes 300 minutes per month. Pro plan is $8.33 per month for 1,200 minutes and advanced features.",
      parentTip: "Otter is powerful but needs rules. Always get permission before recording anyone. Teach consent as part of using it. This becomes a habit your kid will carry forever.",
      learningPoints: [
        "Capture beats memory, every time",
        "Consent as the foundation of recording",
        "Search turns passive learning into active",
        "Speaker labels as context"
      ],
      quiz: [
        {
          question: "What is the rule for recording conversations?",
          options: [
            "Record whatever you want",
            "Always ask permission first",
            "Only record family",
            "Recording is illegal"
          ],
          correctAnswer: 1,
          explainer: "Always, always ask permission. Consent is not optional. It is the foundation of being trustworthy."
        },
        {
          question: "Why does search beat memory?",
          options: [
            "It does not",
            "Memory loses details, search keeps everything exact",
            "Only elders need search",
            "Memory is unlimited"
          ],
          correctAnswer: 1,
          explainer: "You forget 80% of what you hear within a week. Searchable transcripts make you able to reach back forever."
        },
        {
          question: "What do speaker labels add?",
          options: [
            "Nothing useful",
            "Context: who said what matters as much as what was said",
            "Just color",
            "They slow things down"
          ],
          correctAnswer: 1,
          explainer: "Knowing who said what matters. Your grandmother's story hits different than a stranger's. Labels preserve that."
        }
      ],
      missions: [
        {
          id: "l29_m1",
          title: "Class Capture Experiment",
          objective: "Record and search one class (with permission) to see what you actually retain vs miss.",
          instructions: [
            "Ask your teacher for permission to record for personal study",
            "Record one full class with Otter",
            "At the end of the day, write down what you remember",
            "Search the transcript for 3 things you could not remember precisely"
          ],
          sandboxPrompt: "I recorded one class. Help me write 5 search queries that test my memory against the transcript.",
          quackySystemPrompt: "You are Quacky helping a kid test memory against class recording. Return 5 specific search queries: key terms, examples the teacher used, questions from other students, specific dates or numbers, assigned homework. Each under 10 words. Numbered. One study emoji.",
          reflectionQuestion: "What percentage of class details did you actually remember correctly?",
          xpReward: 75
        },
        {
          id: "l29_m2",
          title: "Family Wisdom Archive",
          objective: "Interview a family elder and build a searchable archive of their stories.",
          instructions: [
            "Ask permission to record a 30-minute conversation",
            "Prepare 5 open questions about their life and lessons",
            "Record with Otter",
            "Send them the transcript with their favorite quote highlighted"
          ],
          sandboxPrompt: "I am interviewing my [grandparent/uncle/aunt] about their life. Help me write 5 open-ended questions that pull out real stories.",
          quackySystemPrompt: "You are Quacky helping a kid interview a family elder. Return 5 numbered questions that invite stories rather than facts (use 'tell me about the time when' structure). Each under 20 words. One heart emoji.",
          reflectionQuestion: "Which story did they tell that you would never have known to ask about?",
          xpReward: 100
        },
        {
          id: "l29_m3",
          title: "Think Out Loud Journal",
          objective: "Record 5 days of verbal journaling and extract patterns from the transcripts.",
          instructions: [
            "Each day, record 3 minutes of thinking out loud about the day",
            "Let Otter transcribe and auto-summarize",
            "On day 6, read all 5 transcripts back to back",
            "Pick 3 themes that repeat across the week"
          ],
          sandboxPrompt: "I have 5 days of spoken journal transcripts. Help me design a pattern-hunting framework to find themes.",
          quackySystemPrompt: "You are Quacky helping a kid find patterns in 5 days of spoken journals. Return a 4-step framework: 1. read cold, 2. highlight repeated phrases, 3. cluster into themes, 4. name top 3 themes. Each step under 20 words. Numbered. One compass emoji.",
          reflectionQuestion: "Which theme showed up that you did not know was on your mind all week?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Journalists, researchers, lawyers, and therapists all use transcription tools to do their real work. You are learning the same habit decades earlier.",
      completionBadge: "power_grid_l7",
      nextLesson: "l30"
    },

    // ─────────────────────────────────────────────────────────
    // L30 : TIMELY
    // ─────────────────────────────────────────────────────────
    {
      id: "l30",
      worldId: "w4",
      lessonNumber: 8,
      title: "Timely",
      toolName: "Timely",
      toolUrl: "https://timelyapp.com/",
      toolCategory: "AI time tracking and insight",
      difficulty: "medium",
      estimatedMinutes: 20,
      heroLine: "See where your time actually goes, not where you think it went.",
      warmUpChallenge: "Ask any adult what they spent Tuesday doing. They will say 'work'. Timely shows the truth: 2 hours of email, 1 hour of real work, 5 hours of context switching. Today you get honest.",
      warmUpQuiz: {
        question: "Which time discovery would shake you most?",
        options: [
          "I spent 6 hours on social media when I thought it was 1",
          "I only did 45 minutes of real deep work all week",
          "My best work happens at a time I never block on calendar"
        ]
      },
      features: [
        {
          feature: "Automatic tracking",
          description: "Timely runs in the background, tracking every app and website you use.",
          example: "No manual start/stop. End the week and see all 40 hours auto-mapped."
        },
        {
          feature: "AI time grouping",
          description: "AI groups similar activities into project categories automatically.",
          example: "All Photoshop + Figma time becomes 'design work' with no manual tagging"
        },
        {
          feature: "Insight reports",
          description: "Weekly reports surface your real productivity patterns.",
          example: "Your deep work peak is 10am-noon on Tuesdays and Thursdays"
        }
      ],
      costInfo: "Starter plan is $9 per user per month. Premium plan is $16 per user per month with more insights.",
      parentTip: "Time tracking feels heavy to kids. Frame it as an experiment, not surveillance. One honest week of tracking changes how they think about time forever.",
      learningPoints: [
        "The gap between perceived time and actual time",
        "Deep work patterns are personal",
        "What you measure, you improve",
        "Context switching as the hidden cost"
      ],
      quiz: [
        {
          question: "Why is automatic tracking better than manual?",
          options: [
            "It is not",
            "Manual tracking misses half of what happened",
            "Manual is always more accurate",
            "Only celebrities track time"
          ],
          correctAnswer: 1,
          explainer: "Manual tracking is honest about big blocks but forgets small ones. Automatic captures everything."
        },
        {
          question: "What is context switching?",
          options: [
            "A kind of computer game",
            "Jumping between different types of work, which kills focus",
            "Only a problem for adults",
            "A type of learning"
          ],
          correctAnswer: 1,
          explainer: "Every switch between types of work costs 15 minutes of focus. Ten switches a day equals 2.5 hours lost."
        },
        {
          question: "Why should you track time?",
          options: [
            "For fun",
            "Because awareness is the first step to improvement",
            "Because adults do it",
            "Only if someone tells you to"
          ],
          correctAnswer: 1,
          explainer: "You cannot improve what you do not measure. One honest tracking week beats 10 guessing weeks."
        }
      ],
      missions: [
        {
          id: "l30_m1",
          title: "One Honest Week",
          objective: "Track every minute for 7 days and compare actual time spent to your estimate.",
          instructions: [
            "Install Timely on your laptop and phone",
            "Before starting, write down your estimate: how many hours on schoolwork, entertainment, creation, social",
            "Let Timely track 7 days automatically",
            "On day 8, compare the report to your estimate"
          ],
          sandboxPrompt: "I tracked 7 days. My estimate was [list] but actual was [list]. Help me interpret the gap honestly.",
          quackySystemPrompt: "You are Quacky helping a kid interpret a time tracking gap. Given the estimate vs actual, return: 1 biggest surprise (1 sentence), 1 pattern of overestimation, 1 pattern of underestimation, 1 specific experiment for next week. Under 100 words. One mirror emoji.",
          reflectionQuestion: "Which gap made you uncomfortable? That is where the real work lives.",
          xpReward: 100
        },
        {
          id: "l30_m2",
          title: "Peak Hour Discovery",
          objective: "Find your personal deep work peak hour by tracking 14 days.",
          instructions: [
            "Track 14 days with Timely",
            "Review the heat map of when your deep work happens",
            "Identify your top 2 productive time windows",
            "Move your calendar habits (Reclaim) to defend those windows"
          ],
          sandboxPrompt: "After 14 days of tracking, my peak focus windows are [time A] and [time B]. Help me design a weekly schedule that protects those windows.",
          quackySystemPrompt: "You are Quacky helping a kid redesign their week around peak hours. Given the 2 windows, return a weekly structure: Monday-Friday layout with peak hours locked for deep work, admin in non-peak, and 1 rule for emergencies. Under 100 words. One chart emoji.",
          reflectionQuestion: "Did your peak hour surprise you? Was it different from when you thought you worked best?",
          xpReward: 100
        },
        {
          id: "l30_m3",
          title: "Context Switch Reduction",
          objective: "Run a 5-day experiment cutting context switches in half.",
          instructions: [
            "Review your Timely context switch count from the previous week",
            "Set a target: half that number",
            "Group similar tasks into blocks (all email in one, all writing in one)",
            "Track the following week and compare"
          ],
          sandboxPrompt: "I am running a 5-day experiment to halve my context switches. Help me design 3 grouping rules to follow daily.",
          quackySystemPrompt: "You are Quacky helping a kid reduce context switches. Return 3 numbered grouping rules: what gets batched together, when during the day, and how long per block. Each rule under 20 words. One puzzle emoji.",
          reflectionQuestion: "Did cutting context switches feel peaceful, boring, or both?",
          xpReward: 100
        }
      ],
      empireBuilderTip: "Agencies and freelancers charge clients by the tracked hour. Consultants who know their real hours charge 3x more. Time awareness at 12 is a six-figure advantage at 25.",
      completionBadge: "power_grid_l8",
      nextLesson: null
    }
  ],
  empireBuilderModule: {
    id: "eb_w4",
    worldId: "w4",
    title: "Your First Operating System",
    tagline: "Build a personal OS that makes you more productive than most adults you know.",
    estimatedMinutes: 50,
    businessArchetype: "Operations consultant for small businesses",
    targetCustomer: "Busy parents, small business owners, overwhelmed creators, solopreneurs.",
    realWorldExamples: [
      "Tiago Forte built Building a Second Brain into a $10M+ education business teaching these exact systems.",
      "Operations consultants charge small businesses $500 to $5000 to set up Notion and Zapier automations.",
      "Young virtual assistants on Fiverr earn $25 to $100 per hour setting up systems for entrepreneurs."
    ],
    businessSteps: [
      {
        step: 1,
        title: "Build your own OS first",
        description: "Before selling systems, run one. Set up Notion + Reclaim + Zapier for yourself.",
        usingTools: ["Notion AI", "Reclaim.ai", "Zapier AI", "Mem.ai"],
        deliverable: "A working personal OS documented in one Notion page."
      },
      {
        step: 2,
        title: "Document what you built",
        description: "Screenshot every key template and write a 1-sentence description of what it does.",
        usingTools: ["Notion AI"],
        deliverable: "A 'How I run my life' guide with 5 to 10 screenshots."
      },
      {
        step: 3,
        title: "Define your niche",
        description: "Pick who you serve: overwhelmed parents, solo creators, or small local businesses.",
        usingTools: ["Notion AI"],
        deliverable: "Your one-line pitch: I help [who] build [what system] so they can [outcome]."
      },
      {
        step: 4,
        title: "Package 1 starter service",
        description: "Offer one specific package: 'Notion weekly review setup' or 'email inbox zero system'.",
        usingTools: ["Notion AI", "Copy.ai"],
        deliverable: "A 1-page service description with price, scope, and deliverable."
      },
      {
        step: 5,
        title: "Land your first client",
        description: "Offer your starter service free to 1 person in exchange for testimonial and case study.",
        usingTools: ["ChatGPT", "Copy.ai"],
        deliverable: "A completed setup for 1 real person plus their written testimonial."
      }
    ],
    quackyPlaybook: "Productivity is not about doing more. It is about doing the right things easily and reliably. Most adults fight their tools every day. You are learning to make tools work for you. That is worth real money. The best operators in any field all share one habit: they systematize relentlessly.",
    pricingLesson: {
      yourFirstPrice: "$0 for your first client in exchange for a testimonial. $50 to $150 flat rate for a basic Notion setup. $100 to $500 per Zapier automation as you build skill.",
      whyThisPrice: "Systems save time. Time has a dollar value. A business owner paying you $200 to save 10 hours a month is getting a bargain. Price the value, not the hour.",
      scaleUp: "Every 5 clients, raise your price 50%. Move from flat rate to monthly retainer once you have a body of work ($300-$1000 per month to maintain and improve the system)."
    },
    firstCustomerExercise: {
      task: "Offer a free 30-minute setup call to one busy adult you know (parent's friend, teacher, local shop owner).",
      prompt: "Help me write a short message to [person] offering a free 30-minute Notion or automation setup call in exchange for their feedback.",
      quackySystemPrompt: "You are Quacky helping a kid pitch a free systems consulting call. Write under 100 words: warm intro, what you noticed about their busy life, what you will offer (specific: 30 minutes, one specific setup), what you ask (feedback + testimonial if it works), soft close. One spark emoji."
    },
    xpReward: 500,
    completionBadge: "power_grid_champion"
  },
  capstone: {
    id: "cap_w4",
    worldId: "w4",
    title: "The Power Grid Playbook",
    narrative: "Operators prove themselves by showing their systems running, not by talking about productivity. The Playbook is your evidence that you run a life most adults would envy.",
    requiredMissions: ["l23_m1", "l24_m2", "l25_m1", "l26_m1", "l27_m1", "l30_m2"],
    deliverableSpec: "Submit a Power Grid Playbook as a shared Notion page or PDF containing: your weekly review template (filled for 1 real week), 3 Reclaim habits with 14-day completion record, inbox zero screenshot, Mem capture sprint export, 1 live Zapier automation showing output, 14-day Timely tracking report with peak hours identified.",
    submissionFormat: "portfolio",
    parentReviewPrompt: "Your child just built a personal operating system most adults would struggle to maintain. Review the Playbook, pick the single element that surprised you most, and discuss how this discipline compounds over the next 10 years.",
    xpReward: 1000,
    unlocksWorld: "w5"
  }
};

export const WORLDS: World[] = [
  CANVAS_KINGDOM,
  STORY_FORGE,
  CROWD_PLAZA,
  POWER_GRID,
  // w5 Neural Nexus    : next session
];
