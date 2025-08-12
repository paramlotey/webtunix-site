import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { user_input } = await req.json();

    if (!user_input) {
      return new Response("Missing 'user_input' in request body", {
        status: 400,
      });
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      temperature: 0.7,
      system:
        "Based on the user input, return a short JSON array of 5-10 general questions the user might want to search for.",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: user_input }],
        },
      ],
    });

    const firstTextBlock = response.content.find(
      (block): block is TextBlock => block.type === "text"
    );

    const outputText = firstTextBlock?.text || "";
    let suggestions;
    try {
      suggestions = JSON.parse(outputText);
    } catch {
      suggestions = [outputText];
    }

    return new Response(JSON.stringify({ suggestions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }catch (error: unknown) {
  if (error instanceof Error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  // Handle cases where the error is not an Error object
  console.error("An unknown error occurred:", error);
  return new Response(JSON.stringify({ error: "An unknown error occurred" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
}
