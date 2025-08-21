import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  try {
    const seoInfo = await prisma.sEO.findUnique({ where: { id } });

    if (!seoInfo) {
      return NextResponse.json(
        { success: false, message: "Meta Info Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: seoInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;

  try {
    const seoInfo = await prisma.sEO.findUnique({ where: { id } });

    if (!seoInfo) {
      return NextResponse.json(
        { success: false, message: "Meta Info Not Found" },
        { status: 404 }
      );
    }

    await prisma.sEO.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "Meta Info deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to delete Meta Info",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const { title, description, keywords } = body;

    const seoInfo = await prisma.sEO.findUnique({ where: { id } });

    if (!seoInfo) {
      return NextResponse.json(
        { success: false, message: "Meta Info Not Found" },
        { status: 404 }
      );
    }

    const updatedSeo = await prisma.sEO.update({
      where: { id },
      data: { title, description, keywords },
    });

    return NextResponse.json(
      { success: true, data: updatedSeo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to update meta info",
      },
      { status: 500 }
    );
  }
}
