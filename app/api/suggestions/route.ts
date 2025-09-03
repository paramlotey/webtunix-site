import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { user_input } = await req.json();

    if (!user_input) {
      return new Response("Missing 'user_input' in request body", {
        status: 400,
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 500,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `Based on the user input, return ONLY a clean JSON array of 5-10 general questions the user might want to search for.
          Important formatting rules:
          - Return ONLY the JSON array, no markdown formatting, no code blocks, no extra text
          - Each suggestion should be a clear, searchable question
          - Make suggestions relevant to the user's input
          - Keep suggestions concise and actionable
          Example format: ["Question 1?", "Question 2?", "Question 3?"]`,
        },
        {
          role: "user",
          content: user_input,
        },
      ],
    });

    const outputText = response.choices[0]?.message?.content?.trim() || "";

    let suggestions: string[] = [];

    try {
      // Direct parse
      suggestions = JSON.parse(outputText);
      if (!Array.isArray(suggestions)) {
        suggestions = [outputText];
      }
    } catch {
      try {
        const cleanedText = outputText
          .replace(/```json\s*/g, "")
          .replace(/```\s*/g, "")
          .trim();

        suggestions = JSON.parse(cleanedText);
        if (!Array.isArray(suggestions)) {
          suggestions = [cleanedText];
        }
      } catch {
        // Final fallback
        suggestions = [
          `Search for: ${user_input}`,
          `What is ${user_input}?`,
          `How does ${user_input} work?`,
          `Benefits of ${user_input}`,
          `${user_input} examples`,
        ];
      }
    }

    const validSuggestions = suggestions
      .filter((s): s is string => typeof s === "string" && s.trim().length > 0)
      .slice(0, 10)
      .map((s) => s.trim());

    return new Response(JSON.stringify({ suggestions: validSuggestions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
