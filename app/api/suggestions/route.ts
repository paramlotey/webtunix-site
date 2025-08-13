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
      system: `Based on the user input, return ONLY a clean JSON array of 5-10 general questions the user might want to search for. 
      
      Important formatting rules:
      - Return ONLY the JSON array, no markdown formatting, no code blocks, no extra text
      - Each suggestion should be a clear, searchable question
      - Make suggestions relevant to the user's input
      - Keep suggestions concise and actionable
      
      Example format: ["Question 1?", "Question 2?", "Question 3?"]`,
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
    
    let suggestions: string[] = [];
    
    try {
      // First, try to parse as direct JSON
      suggestions = JSON.parse(outputText);
      
      // Ensure it's an array
      if (!Array.isArray(suggestions)) {
        suggestions = [outputText];
      }
    } catch {
      // If direct parsing fails, try to extract JSON from markdown
      try {
        const cleanedText = outputText
          .replace(/```json\s*/g, '')
          .replace(/```\s*/g, '')
          .trim();
        
        suggestions = JSON.parse(cleanedText);
        
        if (!Array.isArray(suggestions)) {
          suggestions = [cleanedText];
        }
      } catch {
        // If all parsing fails, create a fallback suggestion
        suggestions = [
          `Search for: ${user_input}`,
          `What is ${user_input}?`,
          `How does ${user_input} work?`,
          `Benefits of ${user_input}`,
          `${user_input} examples`
        ];
      }
    }

    // Validate and clean suggestions
    const validSuggestions = suggestions
      .filter((suggestion): suggestion is string => 
        typeof suggestion === 'string' && suggestion.trim().length > 0
      )
      .slice(0, 10) // Limit to 10 suggestions max
      .map(suggestion => suggestion.trim());

    return new Response(JSON.stringify({ suggestions: validSuggestions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
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