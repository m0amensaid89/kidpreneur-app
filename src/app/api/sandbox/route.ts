import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, lessonContext } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const openrouterKey = process.env.OPENROUTER_API_KEY;

    if (!openrouterKey) {
       console.error("Missing OPENROUTER_API_KEY environment variable");
       return NextResponse.json({ error: "Quacky is thinking... try again!" }, { status: 500 });
    }

    const systemPrompt = "You are Quacky, a friendly AI duck who helps kids aged 8-15 learn about AI tools and entrepreneurship. Keep answers short, fun, and age-appropriate. Use simple words. Add one emoji per response.";

    let finalPrompt = prompt;
    if (lessonContext) {
      finalPrompt = `Context: ${lessonContext}\n\nUser: ${prompt}`;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openrouterKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "KidPreneur Sandbox"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: finalPrompt }
        ]
      })
    });

    if (!response.ok) {
       console.error(`OpenRouter API error: ${response.status} ${response.statusText}`);
       return NextResponse.json({ error: "Quacky is thinking... try again!" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "Quack! I couldn't think of anything to say.";

    return NextResponse.json({ response: reply });

  } catch (error) {
    console.error("Sandbox API Error:", error);
    return NextResponse.json({ error: "Quacky is thinking... try again!" }, { status: 500 });
  }
}
