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
          "A portfolio site for a creative friend"
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

export const WORLDS: World[] = [
  CANVAS_KINGDOM,
  // w2 Story Forge     : next session
  // w3 Crowd Plaza     : next session
  // w4 Power Grid      : next session
  // w5 Neural Nexus    : next session
];
