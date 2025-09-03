import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const allFaq = await prisma.fAQ.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json({
      message: "All FAQ's Fetched",
      allFaq,
      success: true,
    });
  } catch (error) {
    console.error("GET /api/faq error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { question, answer, status } = body;

    if (!question || !answer) {
      return NextResponse.json(
        {
          error: "Question and answer are required",
          message: "Validation Error",
          success: false,
        },
        { status: 400 }
      );
    }

    const newFaq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        status: status ?? false,
      },
    });

    return NextResponse.json({
      message: "New FAQ Created Successfully",
      newFaq,
      success: true,
    });
  } catch (error) {
    console.error("POST /api/faq error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body;
  try {
    const faq = await prisma.fAQ.findUnique({ where: { id } });

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "faq not found" },
        { status: 404 }
      );
    }

    const updatedFaq = await prisma.fAQ.update({
      where: { id },
      data: { status: !faq.status },
    });
    return NextResponse.json({
      message: "FAQ Status Changed",
      updatedFaq,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const { id ,answer,question} = body;
  try {
    const faq = await prisma.fAQ.findUnique({ where: { id } });

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "faq not found" },
        { status: 404 }
      );
    }

    const updatedFaq = await prisma.fAQ.update({
      where: { id },
      data: { answer,question },
    });
    return NextResponse.json({
      message: "FAQ Updated",
      updatedFaq,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body;
  try {
    const faq = await prisma.fAQ.findUnique({ where: { id } });

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "faq not found" },
        { status: 404 }
      );
    }

    await prisma.fAQ.delete({
      where: { id },
    });
    return NextResponse.json({
      message: "FAQ Deleted",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};