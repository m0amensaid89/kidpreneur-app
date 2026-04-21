// KidPreneur Tool Sandbox — lesson to mode mapping
// Mode determines which API route gets called

export type SandboxMode =
  | 'IMAGE_GEN'    // fal.ai / DALL-E — Canva, Midjourney, Leonardo etc.
  | 'TEXT_GEN'     // Gemini Flash — ChatGPT, Claude, Copy.ai etc.
  | 'VOICE_GEN'    // Gemini TTS — ElevenLabs, Descript etc.
  | 'RESEARCH'     // Gemini search — Perplexity, Consensus, Elicit etc.
  | 'GUIDE_ONLY'   // Screenshots + deep link — Notion, Zapier, CapCut etc.

export interface SandboxConfig {
  mode: SandboxMode
  promptLabel: { en: string; ar: string }
  placeholderEn: string
  placeholderAr: string
  quackyTipEn: string
  quackyTipAr: string
  outputType: 'image' | 'text' | 'audio' | 'none'
  toolDeepLink?: string
  toolName: string
}

export const LESSON_SANDBOX: Record<string, SandboxConfig> = {
  // ── CANVAS KINGDOM ──────────────────────────────────────
  l1: {
    mode: 'IMAGE_GEN',
    promptLabel: { en: 'Describe what you want to create', ar: 'اوصف اللي عايز تعمله' },
    placeholderEn: 'A golden retriever astronaut floating in space, cartoon style...',
    placeholderAr: 'كلب ذهبي يطير في الفضاء، أسلوب كارتون...',
    quackyTipEn: 'Add details: colors, mood, style, setting. More specific = better image!',
    quackyTipAr: 'أضف تفاصيل: الألوان، المزاج، الأسلوب، المكان. كلما كنت أكثر تحديداً، كانت الصورة أحسن!',
    outputType: 'image',
    toolName: 'Canva Magic Studio',
    toolDeepLink: 'https://www.canva.com/magic-studio/',
  },
  l2: {
    mode: 'IMAGE_GEN',
    promptLabel: { en: 'Describe your concept art', ar: 'اوصف الفن المفاهيمي بتاعك' },
    placeholderEn: 'A cyberpunk dragon with neon wings, dark city background, cinematic...',
    placeholderAr: 'تنين سايبربانك بأجنحة نيون، خلفية مدينة مظلمة، سينمائي...',
    quackyTipEn: 'Try style words: cinematic, hyperrealistic, watercolor, oil painting, anime...',
    quackyTipAr: 'جرب كلمات أسلوب: سينمائي، واقعي جداً، ألوان مائية، رسم زيتي، أنيمي...',
    outputType: 'image',
    toolName: 'Midjourney',
    toolDeepLink: 'https://www.midjourney.com',
  },
  l3: {
    mode: 'IMAGE_GEN',
    promptLabel: { en: 'Describe your illustrated poster', ar: 'اوصف البوستر المصور بتاعك' },
    placeholderEn: 'A vintage travel poster for the moon, retro style, warm colors...',
    placeholderAr: 'بوستر سفر قديم للقمر، أسلوب ريترو، ألوان دافئة...',
    quackyTipEn: 'Try: vintage, retro, surrealism, impressionist, flat design, pop art...',
    quackyTipAr: 'جرب: فنتاج، ريترو، سريالية، تصميم مسطح، فن بوب...',
    outputType: 'image',
    toolName: 'NightCafe Studio',
    toolDeepLink: 'https://creator.nightcafe.studio/',
  },
  l4: {
    mode: 'IMAGE_GEN',
    promptLabel: { en: 'Describe your game character', ar: 'اوصف شخصية اللعبة بتاعتك' },
    placeholderEn: 'A female warrior with silver armor and fire powers, front view, character sheet...',
    placeholderAr: 'محاربة بدرع فضي وقوى النار، منظور أمامي، شيت شخصية...',
    quackyTipEn: 'For character sheets: try "front view, side view, character reference sheet, white background"',
    quackyTipAr: 'لشيت الشخصية: جرب "منظور أمامي، منظور جانبي، ورقة مرجعية للشخصية، خلفية بيضاء"',
    outputType: 'image',
    toolName: 'Leonardo AI',
    toolDeepLink: 'https://app.leonardo.ai/',
  },
  l5: {
    mode: 'IMAGE_GEN',
    promptLabel: { en: 'Chat to create your image', ar: 'تكلم عشان تعمل الصورة' },
    placeholderEn: 'Create a logo for a kids AI learning app with a cute duck mascot...',
    placeholderAr: 'اعمل لوجو لتطبيق تعليم الذكاء الاصطناعي للأطفال بماسكوت بطة كيوت...',
    quackyTipEn: 'Describe it like you are texting a friend. Conversational works great!',
    quackyTipAr: 'اوصفها زي ما بتكتب لصاحبك. الكلام الطبيعي بيشتغل ممتاز!',
    outputType: 'image',
    toolName: 'DALL-E (ChatGPT)',
    toolDeepLink: 'https://chat.openai.com',
  },
  l6: {
    mode: 'IMAGE_GEN',
    promptLabel: { en: 'Describe your image edit or new scene', ar: 'اوصف التعديل أو المشهد الجديد' },
    placeholderEn: 'A cafe interior with neon signs and plants, cozy evening atmosphere...',
    placeholderAr: 'داخل مقهى بلافتات نيون ونباتات، أجواء مسائية دافئة...',
    quackyTipEn: 'Be specific about lighting: golden hour, neon glow, soft morning light...',
    quackyTipAr: 'كن محدداً في الإضاءة: الساعة الذهبية، توهج النيون، ضوء الصباح الناعم...',
    outputType: 'image',
    toolName: 'Runway',
    toolDeepLink: 'https://app.runwayml.com/',
  },
  l7: {
    mode: 'TEXT_GEN',
    promptLabel: { en: 'Describe your app idea', ar: 'اوصف فكرة التطبيق بتاعتك' },
    placeholderEn: 'A social app for kids to share their AI art, with worlds and badges...',
    placeholderAr: 'تطبيق اجتماعي للأطفال يشاركوا فيه فنهم بالذكاء الاصطناعي، بعوالم وشارات...',
    quackyTipEn: 'Include: who uses it, what problem it solves, main features (3 max)',
    quackyTipAr: 'اذكر: مين بيستخدمه، إيه المشكلة اللي بيحلها، المميزات الرئيسية (٣ كحد أقصى)',
    outputType: 'text',
    toolName: 'Galileo AI',
    toolDeepLink: 'https://www.usegalileo.ai/',
  },
  l8: {
    mode: 'IMAGE_GEN',
    promptLabel: { en: 'Describe your logo with text', ar: 'اوصف لوجوك مع النص' },
    placeholderEn: 'Logo for "QUACKY" — a duck emoji with bold yellow text, minimal, modern...',
    placeholderAr: 'لوجو لـ"كواكي" — إيموجي بطة مع نص أصفر غامق، بسيط، عصري...',
    quackyTipEn: 'Keep the text short (1-2 words). Add: minimal, flat, vector, bold typography',
    quackyTipAr: 'خلّي النص قصير (كلمة أو كلمتين). أضف: بسيط، مسطح، فيكتور، تايبوجرافي غامق',
    outputType: 'image',
    toolName: 'Ideogram',
    toolDeepLink: 'https://ideogram.ai/',
  },
  l9: {
    mode: 'TEXT_GEN',
    promptLabel: { en: 'What do you want to write?', ar: 'إيه اللي عايز تكتبه؟' },
    placeholderEn: 'Write a short blog post about why kids should learn AI tools...',
    placeholderAr: 'اكتب بوست قصير عن سبب إن الأطفال لازم يتعلموا أدوات الذكاء الاصطناعي...',
    quackyTipEn: 'Give ChatGPT a role: "You are a 13-year-old entrepreneur writing for other kids..."',
    quackyTipAr: 'إدي ChatGPT دور: "أنت رائد أعمال عنده 13 سنة بيكتب لأطفال تانيين..."',
    outputType: 'text',
    toolName: 'ChatGPT',
    toolDeepLink: 'https://chat.openai.com',
  },
  l10: {
    mode: 'TEXT_GEN',
    promptLabel: { en: 'What do you want Claude to think through with you?', ar: 'إيه اللي عايز Claude يفكر فيه معاك؟' },
    placeholderEn: 'Help me think through a business idea for teaching AI to younger kids...',
    placeholderAr: 'ساعدني أفكر في فكرة بيزنس عشان أعلم الأطفال الأصغر الذكاء الاصطناعي...',
    quackyTipEn: 'Push back on Claude's answers: "But what if that's wrong?" or "What am I missing?"',
    quackyTipAr: 'تحدّى إجابات Claude: "بس إيه لو ده غلط؟" أو "إيه اللي مش شايفه؟"',
    outputType: 'text',
    toolName: 'Claude',
    toolDeepLink: 'https://claude.ai',
  },
  // ── STORY FORGE ──────────────────────────────────────────
  l11: { mode: 'VOICE_GEN', promptLabel: { en: 'Type what you want to narrate', ar: 'اكتب اللي عايز تسجّله' }, placeholderEn: 'Hey everyone, welcome to my podcast about AI tools for kids...', placeholderAr: 'أهلاً يا جماعة، أهلاً ببودكاستي عن أدوات الذكاء الاصطناعي للأطفال...', quackyTipEn: 'Keep it conversational. Record like you are talking to a friend.', quackyTipAr: 'خليها محادثة. سجّل زي ما بتتكلم مع صاحبك.', outputType: 'audio', toolName: 'Descript', toolDeepLink: 'https://www.descript.com' },
  l12: { mode: 'VOICE_GEN', promptLabel: { en: 'Write your script to narrate', ar: 'اكتب السكريبت اللي عايز ينتج صوت منه' }, placeholderEn: 'In a world where kids build businesses with AI, one duck changed everything...', placeholderAr: 'في عالم حيث الأطفال يبنون مشاريع بالذكاء الاصطناعي، بطة واحدة غيّرت كل حاجة...', quackyTipEn: 'Try different voice speeds — slower for educational, faster for exciting content!', quackyTipAr: 'جرب سرعات صوت مختلفة — أبطأ للتعليمي، أسرع للمحتوى المثير!', outputType: 'audio', toolName: 'ElevenLabs', toolDeepLink: 'https://elevenlabs.io' },
  l13: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open HeyGen to create your avatar', ar: 'افتح HeyGen عشان تعمل أفاتارك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: '1. Upload your photo → 2. Write your script → 3. Pick a voice → 4. Generate!', quackyTipAr: '١. ارفع صورتك → ٢. اكتب السكريبت → ٣. اختار صوت → ٤. ولّد!', outputType: 'none', toolName: 'HeyGen', toolDeepLink: 'https://www.heygen.com' },
  l14: { mode: 'TEXT_GEN', promptLabel: { en: 'Write your video script', ar: 'اكتب سكريبت الفيديو بتاعك' }, placeholderEn: 'Write a 60-second video script about how I learned to use AI tools this week...', placeholderAr: 'اكتب سكريبت فيديو ٦٠ ثانية عن إزاي اتعلمت أدوات الذكاء الاصطناعي الأسبوع ده...', quackyTipEn: 'Structure: Hook (5s) → Story (40s) → Call to action (15s)', quackyTipAr: 'الهيكل: هوك (٥ ثواني) → القصة (٤٠ ثانية) → دعوة للعمل (١٥ ثانية)', outputType: 'text', toolName: 'Fliki', toolDeepLink: 'https://fliki.ai' },
  l15: { mode: 'TEXT_GEN', promptLabel: { en: 'Write your script scene', ar: 'اكتب مشهد السكريبت بتاعك' }, placeholderEn: 'INT. BEDROOM - DAY
A 13-year-old sits at a computer, staring at a blank screen...', placeholderAr: 'داخلي. غرفة نوم - نهار
طفل عنده 13 سنة جالس عند الكمبيوتر، بيحدق في شاشة فاضية...', quackyTipEn: 'Format: Location. Time. Then action. Then dialogue. Simple!', quackyTipAr: 'الشكل: المكان. الوقت. ثم الحدث. ثم الحوار. بسيط!', outputType: 'text', toolName: 'Script AI', toolDeepLink: 'https://scriptai.com' },
  l16: { mode: 'TEXT_GEN', promptLabel: { en: 'Write your copy', ar: 'اكتب الكوبي بتاعك' }, placeholderEn: 'Write 5 different headlines for a KidPreneur subscription selling AI education for kids...', placeholderAr: 'اكتب ٥ هيدلاينز مختلفة لاشتراك KidPreneur بيبيع تعليم الذكاء الاصطناعي للأطفال...', quackyTipEn: 'Test curiosity, fear, aspiration, social proof, and urgency headlines — all 5 at once!', quackyTipAr: 'اختبر هيدلاينز الفضول، الخوف، الطموح، الإثبات الاجتماعي، والإلحاح — كل الخمسة مع بعض!', outputType: 'text', toolName: 'Copy.ai', toolDeepLink: 'https://www.copy.ai' },
  l17: { mode: 'TEXT_GEN', promptLabel: { en: 'Write your social media post', ar: 'اكتب بوست السوشيال ميديا بتاعك' }, placeholderEn: 'Write 3 Instagram captions for a post about my first AI-generated artwork...', placeholderAr: 'اكتب ٣ كابشنز انستجرام لبوست عن أول رسمة بالذكاء الاصطناعي عملتها...', quackyTipEn: 'Give it your voice: "Write this in the style of a curious 12-year-old who loves design..."', quackyTipAr: 'إدّيه صوتك: "اكتب ده بأسلوب طفل فضولي عنده ١٢ سنة بيحب التصميم..."', outputType: 'text', toolName: 'Simplified', toolDeepLink: 'https://simplified.com' },
  l18: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Opus Clip to clip your video', ar: 'افتح Opus Clip عشان تقطع فيديوهاتك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: '1. Upload a long video → 2. Let it find top clips → 3. Download best 3 → 4. Post!', quackyTipAr: '١. ارفع فيديو طويل → ٢. خليه يلاقي أحسن كليبات → ٣. حمّل أحسن ٣ → ٤. انشر!', outputType: 'none', toolName: 'Opus Clip', toolDeepLink: 'https://www.opus.pro' },
  l19: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open CapCut to edit your video', ar: 'افتح CapCut عشان تعدّل فيديوك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Hook formula: Start with the most interesting moment. Never start from the beginning!', quackyTipAr: 'فورمولا الهوك: ابدأ بأكتر لحظة مثيرة. ما تبدأش من الأول أبداً!', outputType: 'none', toolName: 'CapCut', toolDeepLink: 'https://www.capcut.com' },
  l20: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Submagic to add captions', ar: 'افتح Submagic عشان تضيف كابشنز' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Yellow highlighted keywords get 34% more watch time. Always highlight the power word!', quackyTipAr: 'الكلمات المظلّلة باللون الأصفر بتاخد ٣٤٪ وقت مشاهدة أكتر. دايماً ضلّل الكلمة القوية!', outputType: 'none', toolName: 'Submagic', toolDeepLink: 'https://www.submagic.co' },
  // ── CROWD PLAZA ──────────────────────────────────────────
  l21: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Later to schedule your content', ar: 'افتح Later عشان تجدول محتواك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Best posting times: Tuesday-Thursday, 11am or 7pm in your audience's timezone.', quackyTipAr: 'أحسن أوقات النشر: الثلاثاء-الخميس، ١١ صباحاً أو ٧ مساءً في توقيت جمهورك.', outputType: 'none', toolName: 'Later', toolDeepLink: 'https://later.com' },
  l22: { mode: 'TEXT_GEN', promptLabel: { en: 'Analyze a competitor or topic', ar: 'حلّل منافس أو موضوع' }, placeholderEn: 'Analyze the content strategy of KidPreneur — an AI learning platform for kids aged 8-15...', placeholderAr: 'حلّل استراتيجية محتوى KidPreneur — منصة تعليم الذكاء الاصطناعي للأطفال من ٨-١٥ سنة...', quackyTipEn: 'Ask: "What are they doing well? What gaps can I fill? What would I do differently?"', quackyTipAr: 'اسأل: "إيه اللي بيعملوه كويس؟ إيه الفجوات اللي أقدر أملأها؟ إيه اللي كنت هأعمله بشكل مختلف؟"', outputType: 'text', toolName: 'Predis.ai', toolDeepLink: 'https://predis.ai' },
  l23: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Notion AI to build your workspace', ar: 'افتح Notion AI عشان تبني مساحة عملك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Start with 3 pages: Projects, Ideas, Goals. Link them together. That's your second brain!', quackyTipAr: 'ابدأ بـ٣ صفحات: مشاريع، أفكار، أهداف. اربطهم ببعض. ده هو عقلك الثاني!', outputType: 'none', toolName: 'Notion AI', toolDeepLink: 'https://notion.so' },
  l24: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Reclaim.ai to protect your time', ar: 'افتح Reclaim.ai عشان تحمي وقتك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Set 3 protected blocks: Deep Work, Learning, and Exercise. Guard these with your life!', quackyTipAr: 'اعمل ٣ بلوكات محمية: عمل عميق، تعلم، ورياضة. احميهم بحياتك!', outputType: 'none', toolName: 'Reclaim.ai', toolDeepLink: 'https://reclaim.ai' },
  l25: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Superhuman to process your inbox', ar: 'افتح Superhuman عشان تعالج إيميلاتك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Keyboard shortcut rule: E = archive, R = reply, K = move up. Master these 3 first.', quackyTipAr: 'قاعدة الاختصارات: E = أرشفة، R = رد، K = تحرك لأعلى. أتقن الثلاثة دول أول.', outputType: 'none', toolName: 'Superhuman', toolDeepLink: 'https://superhuman.com' },
  l26: { mode: 'TEXT_GEN', promptLabel: { en: 'Capture and connect your ideas', ar: 'سجّل أفكارك وربطها' }, placeholderEn: 'I have 3 ideas: AI stickers business, YouTube about AI tools, AI tutoring service. Connect them.', placeholderAr: 'عندي ٣ أفكار: بيزنس ستيكرز ذكاء اصطناعي، يوتيوب عن أدوات الذكاء الاصطناعي، خدمة مذاكرة بالذكاء الاصطناعي. ربطهم.', quackyTipEn: 'Ask AI: "What pattern do you see in these ideas? What core skill connects them?"', quackyTipAr: 'اسأل الذكاء الاصطناعي: "إيه النمط اللي شايفه في الأفكار دي؟ إيه المهارة الأساسية اللي بتربطهم؟"', outputType: 'text', toolName: 'Mem.ai', toolDeepLink: 'https://mem.ai' },
  l27: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Zapier to automate your workflow', ar: 'افتح Zapier عشان تأتمت سير عملك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'First Zap idea: When someone fills my form → send them a welcome email automatically!', quackyTipAr: 'أول فكرة Zap: لما حد يملي الفورم بتاعي ← ابعتله إيميل ترحيب تلقائياً!', outputType: 'none', toolName: 'Zapier', toolDeepLink: 'https://zapier.com' },
  l28: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Krisp to cancel background noise', ar: 'افتح Krisp عشان تلغي الضوضاء الخلفية' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Test: Record 10 seconds with Krisp OFF, then ON. Hear the magic difference!', quackyTipAr: 'اختبر: سجّل ١٠ ثواني مع Krisp مطفي، بعدين شغّاله. اسمع الفرق السحري!', outputType: 'none', toolName: 'Krisp', toolDeepLink: 'https://krisp.ai' },
  // ── POWER GRID ───────────────────────────────────────────
  l29: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Otter.ai to transcribe', ar: 'افتح Otter.ai عشان تفرّغ' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'After transcribing: search for "actually, basically, you know" — delete them all!', quackyTipAr: 'بعد التفريغ: ابحث عن "في الحقيقة، بشكل أساسي، يعني" — امسحهم كلهم!', outputType: 'none', toolName: 'Otter.ai', toolDeepLink: 'https://otter.ai' },
  l30: { mode: 'GUIDE_ONLY', promptLabel: { en: 'Open Timely to track your time', ar: 'افتح Timely عشان تتتبع وقتك' }, placeholderEn: '', placeholderAr: '', quackyTipEn: 'Track one full day. Be honest. Where is time really going vs where you think it is?', quackyTipAr: 'تتبّع يوم كامل. كن صادقاً. فين الوقت بيروح فعلاً مقارنةً بما تعتقده؟', outputType: 'none', toolName: 'Timely', toolDeepLink: 'https://timelyapp.com' },
  l31: { mode: 'RESEARCH', promptLabel: { en: 'Research any topic with AI', ar: 'ابحث عن أي موضوع بالذكاء الاصطناعي' }, placeholderEn: 'What are the best AI tools for kids learning entrepreneurship in 2025?', placeholderAr: 'إيه أحسن أدوات الذكاء الاصطناعي للأطفال اللي بيتعلموا ريادة الأعمال في ٢٠٢٥؟', quackyTipEn: 'Ask follow-up questions: "What evidence supports this?" or "What are the counterarguments?"', quackyTipAr: 'اسأل متابعة: "إيه الأدلة اللي بتدعم ده؟" أو "إيه الحجج المضادة؟"', outputType: 'text', toolName: 'Perplexity', toolDeepLink: 'https://perplexity.ai' },
  l32: { mode: 'RESEARCH', promptLabel: { en: 'Ask questions about any topic', ar: 'اسأل أسئلة عن أي موضوع' }, placeholderEn: 'Summarize the key findings on how games improve learning for children aged 8-15...', placeholderAr: 'لخّص النتائج الرئيسية عن كيف الألعاب بتحسّن التعلم للأطفال من ٨-١٥ سنة...', quackyTipEn: 'Best questions: "What do we know for certain?" and "What is still debated?"', quackyTipAr: 'أحسن أسئلة: "إيه اللي نعرفه على يقين؟" و"إيه اللي لسه محل جدل؟"', outputType: 'text', toolName: 'NotebookLM', toolDeepLink: 'https://notebooklm.google.com' },
  l33: { mode: 'RESEARCH', promptLabel: { en: 'Research with scientific evidence', ar: 'ابحث بأدلة علمية' }, placeholderEn: 'What does the research say about the effectiveness of gamification in education?', placeholderAr: 'إيه اللي البحث العلمي بيقوله عن فعالية التلعيب في التعليم؟', quackyTipEn: 'Check: How many studies agree? Is the evidence recent? What is the sample size?', quackyTipAr: 'راجع: كام بحث متفق؟ هل الأدلة حديثة؟ إيه حجم العينة؟', outputType: 'text', toolName: 'Consensus', toolDeepLink: 'https://consensus.app' },
  l34: { mode: 'RESEARCH', promptLabel: { en: 'Research academic papers on any topic', ar: 'ابحث في الأبحاث العلمية عن أي موضوع' }, placeholderEn: 'Find research on AI tools in K-12 education and their impact on student engagement...', placeholderAr: 'لاقي أبحاث عن أدوات الذكاء الاصطناعي في تعليم ما قبل الجامعة وتأثيرها على انخراط الطلاب...', quackyTipEn: 'For each paper: note the year, sample size, and main finding. Three data points per paper.', quackyTipAr: 'لكل بحث: سجّل السنة، حجم العينة، والنتيجة الرئيسية. ثلاث نقاط بيانات لكل بحث.', outputType: 'text', toolName: 'Elicit', toolDeepLink: 'https://elicit.com' },
  l35: { mode: 'TEXT_GEN', promptLabel: { en: 'Give the AI agent a goal', ar: 'إدي لوكيل الذكاء الاصطناعي هدف' }, placeholderEn: 'Research and write a brief competitive analysis of the top 5 AI learning apps for kids...', placeholderAr: 'ابحث واكتب تحليل تنافسي مختصر لأفضل ٥ تطبيقات تعليم الذكاء الاصطناعي للأطفال...', quackyTipEn: 'Agent goal format: Research X, then analyze Y, then produce Z. Multi-step = better results!', quackyTipAr: 'شكل هدف الوكيل: ابحث عن X، ثم حلّل Y، ثم أنتج Z. متعدد الخطوات = نتائج أحسن!', outputType: 'text', toolName: 'ChatGPT Agents', toolDeepLink: 'https://chat.openai.com' },
  l36: { mode: 'TEXT_GEN', promptLabel: { en: 'Build with your brand context', ar: 'ابني بسياق براندك' }, placeholderEn: 'You are the brand voice for KidPreneur — an AI learning platform for kids. Write a social media bio that sounds like a 12-year-old founder would write...', placeholderAr: 'أنت صوت براند KidPreneur — منصة تعليم الذكاء الاصطناعي للأطفال. اكتب بايو سوشيال ميديا يبدو إن مؤسس عنده ١٢ سنة كتبه...', quackyTipEn: 'Upload your brand doc first, then every output will match your voice perfectly!', quackyTipAr: 'ارفع وثيقة براندك أول، وبعدين كل ناتج هيطابق صوتك بشكل مثالي!', outputType: 'text', toolName: 'Claude Projects', toolDeepLink: 'https://claude.ai' },
  l37: { mode: 'RESEARCH', promptLabel: { en: 'Ask for a deep research report', ar: 'اطلب تقرير بحث معمّق' }, placeholderEn: 'Write a comprehensive research report on the global EdTech market for AI learning tools targeting children aged 8-15...', placeholderAr: 'اكتب تقرير بحثي شامل عن سوق التقنية التعليمية العالمي لأدوات تعليم الذكاء الاصطناعي للأطفال من ٨-١٥ سنة...', quackyTipEn: 'Ask for: market size, key players, growth trends, and gaps. One paragraph each!', quackyTipAr: 'اطلب: حجم السوق، اللاعبين الرئيسيين، اتجاهات النمو، والفجوات. فقرة لكل واحد!', outputType: 'text', toolName: 'Gemini Deep Research', toolDeepLink: 'https://gemini.google.com' },
  l38: { mode: 'TEXT_GEN', promptLabel: { en: 'Design your Custom GPT', ar: 'صمّم Custom GPT بتاعك' }, placeholderEn: 'Write a system prompt for a Custom GPT that helps kids aged 8-15 come up with business ideas in under 5 minutes...', placeholderAr: 'اكتب سيستم برومبت لـCustom GPT بيساعد الأطفال من ٨-١٥ سنة يلاقوا أفكار بيزنس في أقل من ٥ دقايق...', quackyTipEn: 'Best GPT system prompts include: role, audience, tone, output format, and 3 example interactions.', quackyTipAr: 'أحسن سيستم برومبت للـGPT يشمل: الدور، الجمهور، الطبقة، شكل الناتج، و٣ تفاعلات مثال.', outputType: 'text', toolName: 'Custom GPTs', toolDeepLink: 'https://chat.openai.com/gpts' },
}

export function getSandboxConfig(lessonId: string): SandboxConfig | null {
  return LESSON_SANDBOX[lessonId] ?? null
}
