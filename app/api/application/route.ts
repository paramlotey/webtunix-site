import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      applicantName,
      email,
      phoneNo,
      applied_for,
      start_date,
      qualification,
      cover_letter,
      resume,
    } = body;

    if (!applicantName || !email || !phoneNo || !resume) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const vacancy = await prisma.vacancies.findUnique({
      where: { id: Number(applied_for) },
      select: { Primary_Skills: true },
    });

    if (!vacancy) {
      return NextResponse.json(
        { message: "Invalid vacancy ID" },
        { status: 400 }
      );
    }

    const requiredSkills = vacancy.Primary_Skills;

    // Enhanced prompt with better instructions
    const prompt = `You are a resume skill matcher. Your task is to check if a resume contains all required skills using semantic matching.

REQUIRED SKILLS TO FIND:
${requiredSkills.map((skill) => `- ${skill}`).join("\n")}

RESUME TEXT:
${resume}

MATCHING RULES:
1. Use semantic/fuzzy matching - look for variations and related terms
2. These should be considered MATCHES:
   - "JavaScript (ES6+)" matches "JavaScript"
   - "React.js" or "ReactJS" matches "React" 
   - "Node" or "NodeJS" matches "Node.js"
   - "Postgres" matches "PostgreSQL"
   - Case-insensitive matching
   - Ignore version numbers, punctuation, and plurals
3. Count a skill as found if it appears anywhere in the resume
4. Be generous with matching - if unsure, consider it a match

RESPONSE FORMAT:
Return ONLY valid JSON with no explanations:
- If ALL skills found: {"response": "successful"}
- If ANY missing: {"response": "unsuccessful", "missing": ["skill1", "skill2"]}

Analyze the resume and respond:`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    });

    const aiMessage = response.content[0]?.text || "{}";

    // Log for debugging
    console.log("AI Response:", aiMessage);
    console.log("Required Skills:", requiredSkills);

    let parsedResponse: any;
    try {
      // Clean the response to ensure it's valid JSON
      const cleanedResponse = aiMessage.trim().replace(/```json|```/g, "");
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (err) {
      console.error("Failed to parse AI response:", aiMessage);

      // Fallback: manual skill checking as backup
      const resumeLower = resume.toLowerCase();
      const missingSkills = requiredSkills.filter((skill) => {
        const skillLower = skill.toLowerCase();
        // Basic keyword matching as fallback
        return (
          !resumeLower.includes(skillLower) &&
          !resumeLower.includes(skillLower.replace(".js", "")) &&
          !resumeLower.includes(skillLower.replace("js", ""))
        );
      });

      if (missingSkills.length === 0) {
        parsedResponse = { response: "successful" };
      } else {
        parsedResponse = { response: "unsuccessful", missing: missingSkills };
      }
    }

    // If successful, save application
    if (parsedResponse.response === "successful") {
      await prisma.applications.create({
        data: {
          applicantName,
          email,
          phoneNo,
          applied_for: Number(applied_for),
          start_date,
          qualification,
          cover_letter,
          resume,
          status: "pending",
        },
      });

      return NextResponse.json(
        { message: "Application submitted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Application unsuccessful - missing required skills",
          missing: parsedResponse.missing || [],
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
