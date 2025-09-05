import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { title, route, description, keywords } = body;

    if (
      !title ||
      !route ||
      !description ||
      !keywords ||
      typeof title !== "string" ||
      typeof route !== "string" ||
      typeof description !== "string" ||
      typeof keywords !== "string"
    ) {
      return NextResponse.json({
        message: "Please Fill All Fields Correctly",
        success: false,
      });
    }

    const seoData = await prisma.sEO.upsert({
      where: { route }, // unique field in your Prisma schema
      update: { title, description, keywords },
      create: { route, title, description, keywords },
    });

    return NextResponse.json({
      seo: seoData,
      message: "Meta Info Saved Successfully",
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
