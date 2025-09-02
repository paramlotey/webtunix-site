import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const POST = async (req: NextRequest) => {
  try {
    const { chat } = await req.json();
    if (!chat) {
      return new Response("Missing 'chat' in request body", { status: 400 });
    }

    const stream = await client.responses.stream({
      model: "chatgpt-4o-latest",
      input: chat,
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            switch (event.type) {
              case "response.output_text.delta": {
                const text = event.delta;
                if (text) {
                  controller.enqueue(`data: ${JSON.stringify(text)}\n\n`);
                }
                break;
              }
              case "response.completed": {
                controller.enqueue("data: [DONE]\n\n");
                controller.close();
                break;
              }
            }
          }
        } catch (err) {
          controller.enqueue("data: [ERROR]\n\n");
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
