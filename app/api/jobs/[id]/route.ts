import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = parseInt((await params).id, 10);

  try {
    const job = await prisma.vacancies.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "No jobs found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, job }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          message: "Failed To Fetch Jobs",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "An unknown error occurred" },
      { status: 500 }
    );
  }
};
