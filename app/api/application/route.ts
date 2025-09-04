// app/api/application/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import mammoth from "mammoth";
import OpenAI from "openai";
import fs from "fs/promises";
import os from "os";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// ✅ Extract text from uploaded resume
async function extractResumeText(file: File): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // Handle DOCX
  if (file.name.endsWith(".docx")) {
    const tempFilePath = path.join(os.tmpdir(), file.name);
    await fs.writeFile(tempFilePath, fileBuffer);
    const result = await mammoth.extractRawText({ path: tempFilePath });
    return result.value;
  }

  // Handle PDF
  if (file.name.endsWith(".pdf")) {
    const PDFParser = (await import("pdf2json")).default;
    const pdfParser = new PDFParser();
    return new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        let text = "";
        pdfData.Pages?.forEach((page) => {
          page.Texts?.forEach((textObj) => {
            textObj.R?.forEach((r) => {
              text += decodeURIComponent(r.T) + " ";
            });
          });
        });
        resolve(text);
      });
      pdfParser.parseBuffer(fileBuffer);
    });
  }

  throw new Error("Unsupported file format. Upload .docx or .pdf");
}

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    // Extract fields
    const applicantName = formData.get("applicantName") as string;
    const email = formData.get("email") as string;
    const phoneNo = formData.get("phoneNo") as string;
    const applied_for = formData.get("applied_for") as string;
    const start_date = formData.get("start_date") as string;
    const qualification =
      (formData.get("qualification") as string)?.split(",") || [];
    const cover_letter = formData.get("cover_letter") as string;
    const resumeFile = formData.get("resume") as File;

    // Validate
    if (!applicantName || !email || !phoneNo || !applied_for || !resumeFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Extract text from resume
    const resumeText = await extractResumeText(resumeFile);

    // Get job skills
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

    // Prepare OpenAI prompt
    const prompt = `You are a resume skill matcher. Your task is to check if a resume contains all required skills using semantic matching.

REQUIRED SKILLS TO FIND:
${requiredSkills.map((s: string) => `- ${s}`).join("\n")}

RESUME TEXT:
${resumeText}

RESPONSE FORMAT:
- If ALL skills found: {"response": "successful"}
- If ANY missing: {"response": "unsuccessful", "missing": ["skill1", "skill2"]}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const aiMessage = response.choices[0]?.message?.content || "{}";
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiMessage.replace(/```json|```/g, "").trim());
    } catch {
      parsedResponse = { response: "unsuccessful", missing: requiredSkills };
    }

    if (parsedResponse.response === "successful") {
      await prisma.applications.create({
        data: {
          applicantName,
          email,
          phoneNo: Number(phoneNo),
          start_date: new Date(start_date),
          qualification,
          cover_letter,
          resume: resumeText,
          status: "pending",
          vacancy: { connect: { id: Number(applied_for) } },
        },
      });

      return NextResponse.json(
        { message: "Application submitted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Application unsuccessful - missing skills",
          missing: parsedResponse.missing,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const applications = await prisma.applications.findMany({
      include: { vacancy: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { message: "ID and status are required" },
        { status: 400 }
      );
    }

    const updatedApp = await prisma.applications.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(
      { message: "Status updated", application: updatedApp },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { message: "Failed to update status" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const updatedApp = await prisma.applications.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(
      { message: "Application updated", application: updatedApp },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { message: "Failed to update application" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    await prisma.applications.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Application deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { message: "Failed to delete application" },
      { status: 500 }
    );
  }
};

export const config = { runtime: "node" };
