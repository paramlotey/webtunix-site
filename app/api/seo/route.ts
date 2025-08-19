import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { title, route, description, keywords } = body;

    if (
      (!title || typeof title !== "string") &&
      (!route || typeof route !== "string") &&
      (!description || typeof description !== "string") &&
      (!keywords || typeof keywords !== "string")
    ) {
      return NextResponse.json({
        message: "Please Fill All Fields Correctly",
        success: false,
      });
    }

    const newSeo = await prisma.sEO.create({
      data: { route, description, keywords, title },
    });

    return NextResponse.json({
      seo: newSeo,
      message: "Meta Info Created Successfully",
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

export const GET = async () => {
  try {
    const allSeo = await prisma.sEO.findMany();
    return NextResponse.json({ seo: allSeo, success: true });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      success: false,
    });
  }
};
