import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const POST = async (req: NextRequest) => {
  try {
    const { chat, sessionId, cookieId } = await req.json();

    if (!chat || !sessionId || !cookieId) {
      return new Response(
        "Missing required fields (chat, sessionId, cookieId)",
        {
          status: 400,
        }
      );
    }

    let session = await prisma.session.findUnique({
      where: { sessionId: sessionId },
    });

    if (!session) {
      session = await prisma.session.create({
        data: {
          sessionId: sessionId,
          cookieId: cookieId,
        },
      });
    }

    await prisma.message.create({
      data: {
        sessionId: sessionId,
        sender: "user",
        text: chat,
      },
    });

const stream = await client.responses.stream({
  model: "chatgpt-4o-latest",
  input: [
    {
      role: "system",
      content: `You are the official virtual assistant for WEBTUNIX AI. 
      Your sole purpose is to assist users with accurate, professional, and helpful information strictly about:
          
      - WEBTUNIX AI: its services, solutions, expertise, and company information
      - Relevant technology stacks used by WEBTUNIX AI (e.g., React, Node.js, Python, AI/ML frameworks, cloud platforms, etc.)
      - Current and emerging trends in AI, data science, and modern software development that align with WEBTUNIX AI’s work
          
      Strict rules:
      1. Stay strictly within these topics. Do not generate or infer answers outside this scope. 
      2. If a question is unrelated, respond only with:
          "I may not be able to help with that, but I’d be happy to answer questions about WEBTUNIX AI, our services, or the technologies we use."      3. Never speculate or provide unverified information.
      4. Keep responses clear, concise, and professional.
      5. Whenever possible, relate your answer back to WEBTUNIX AI and how its services or technologies connect to the user’s query.`
          },
    {
      role: "user",
      content: chat 
    }
  ],
});


    let botResponse = "";

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            switch (event.type) {
              case "response.output_text.delta": {
                const text = event.delta;
                if (text) {
                  botResponse += text;
                  controller.enqueue(`data: ${JSON.stringify(text)}\n\n`);
                }
                break;
              }
              case "response.completed": {
                await prisma.message.create({
                  data: {
                    sessionId: sessionId,
                    sender: "bot",
                    text: botResponse,
                  },
                });

                controller.enqueue("data: [DONE]\n\n");
                controller.close();
                break;
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
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
