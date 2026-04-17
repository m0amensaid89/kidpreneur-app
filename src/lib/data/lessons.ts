export const WORLDS = [
  {
    id: "w1",
    name: "Canvas Kingdom",
    color: "#FF6340", // Coral
    lessonCount: 18,
    description: "Discover your creative potential with AI art.",
    lessons: [
      {
        id: "l1",
        worldId: "w1",
        title: "Canva Magic Studio",
        toolName: "Canva Magic Studio",
        warmUpChallenge: "Think of an animal that doesn't exist yet! We will try to create it.",
        learningPoints: [
          "How to use Text-to-Image tools",
          "What makes a good prompt",
          "Editing generated images"
        ],
        quiz: [
          {
            question: "What do we type to tell the AI what to draw?",
            options: ["A command", "A prompt", "A secret code", "A whisper"],
            correctAnswer: 1
          },
          {
            question: "Which of these is the BEST prompt?",
            options: ["A dog", "A happy dog", "A happy golden retriever playing with a red ball in the park", "Dog ball"],
            correctAnswer: 2
          },
          {
            question: "Can Canva Magic Studio edit existing photos?",
            options: ["Yes, it can remove backgrounds and change things", "No, it only creates new ones", "Only if the photo is black and white", "It only works on videos"],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "l2",
        worldId: "w1",
        title: "Leonardo AI",
        toolName: "Leonardo AI",
        warmUpChallenge: "Imagine you are designing a new video game character. What do they look like?",
        learningPoints: [
          "Using AI to create character concepts",
          "Understanding different art styles",
          "Refining your AI generations"
        ],
        quiz: [
          {
            question: "What is Leonardo AI mostly used for?",
            options: ["Writing stories", "Creating high-quality images and art", "Doing math homework", "Playing games"],
            correctAnswer: 1
          },
          {
            question: "If you want a picture to look like a cartoon, you should:",
            options: ["Include 'cartoon style' in the prompt", "Ask nicely", "Type in all caps", "You can't change the style"],
            correctAnswer: 0
          },
          {
            question: "What happens if you generate an image and don't like it?",
            options: ["You are stuck with it forever", "You can just try a new prompt to get a different one", "The computer will crash", "You have to pay money immediately"],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "l3",
        worldId: "w1",
        title: "NightCafe Studio",
        toolName: "NightCafe Studio",
        warmUpChallenge: "Let's explore famous painting styles! Have you ever seen 'Starry Night'?",
        learningPoints: [
          "Applying famous art styles to images",
          "The history of AI art",
          "Sharing your creations with the community"
        ],
        quiz: [
          {
            question: "What makes NightCafe special?",
            options: ["It serves real coffee", "You can easily apply famous art styles like Van Gogh", "It's only open at night", "It only creates black and white images"],
            correctAnswer: 1
          },
          {
            question: "Who owns the copyright to AI art you generate?",
            options: ["You do", "The AI company does", "Nobody does, it's public domain", "It's a tricky legal question right now!"],
            correctAnswer: 3
          },
          {
            question: "Can you share your NightCafe art with others on the platform?",
            options: ["Yes, there is a community to share with", "No, it's totally private forever", "Only if you print it out", "Only via email"],
            correctAnswer: 0
          }
        ]
      }
    ]
  },
  {
    id: "w2",
    name: "Story Forge",
    color: "#8B5CF6", // Purple
    lessonCount: 5,
    description: "Write incredible stories with AI companions.",
    lessons: []
  },
  {
    id: "w3",
    name: "Crowd Plaza",
    color: "#3B82F6", // Blue
    lessonCount: 3,
    description: "Learn how to present your ideas to the world.",
    lessons: []
  },
  {
    id: "w4",
    name: "Power Grid",
    color: "#F59E0B", // Amber
    lessonCount: 10,
    description: "Power up your productivity with AI tools.",
    lessons: []
  },
  {
    id: "w5",
    name: "Neural Nexus",
    color: "#10B981", // Emerald
    lessonCount: 2,
    description: "Connect everything together and build the future.",
    lessons: []
  }
];