import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;

  try {
    const sessions = await prisma.session.findMany({
      where: { cookieId: id },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc' 
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const cookie = await prisma.cookies.findUnique({
      where: { id: id }
    });

    return NextResponse.json({
      data: {
        cookie: cookie,
        sessions: sessions,
        totalSessions: sessions.length,
        totalMessages: sessions.reduce((total, session) => total + session.messages.length, 0)
      },
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Server Error",
      success: false,
    });
  }
};