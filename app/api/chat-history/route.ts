import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const cookieId = searchParams.get("cookieId");
    const sessionId = searchParams.get("sessionId");

    if (!cookieId) {
      return NextResponse.json(
        {
          error: "Cookie ID is required",
        },
        { status: 400 }
      );
    }

    const whereClause: {
      cookieId: string;
      sessionId?: string;
    } = {
      cookieId,
    };

    if (sessionId) {
      whereClause.sessionId = sessionId;
    }

    const sessions = await prisma.session.findMany({
      where: whereClause,
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      sessions: sessions,
      success: true,
    });
  } catch (error) {
    console.error("Chat history API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch chat history",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        {
          error: "Session ID is required",
        },
        { status: 400 }
      );
    }

    await prisma.session.delete({
      where: {
        sessionId: sessionId,
      },
    });

    return NextResponse.json({
      message: "Session deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Delete session API error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete session",
        success: false,
      },
      { status: 500 }
    );
  }
};
