import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json({
      categories,
      message: "All Categories Fetched",
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

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { category_name } = body;

    if (!category_name || typeof category_name !== "string") {
      return NextResponse.json({
        message: "Invalid category name",
        success: false,
      });
    }
    const existing_Category = await prisma.category.findFirst({
      where: { category_name },
    });

    if (existing_Category) {
      return NextResponse.json({
        message: "Category Already Exists",
        success: false,
      });
    }
    const newCategory = await prisma.category.create({
      data: { category_name },
    });

    return NextResponse.json({
      category: newCategory,
      message: "Category Created Successfully",
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

export const DELETE = async (req: NextRequest) => {
  try {
    const  body  = await req.json();
    const { id } = body;
    const existing_Category = await prisma.category.findFirst({
      where: { id },
    });

    if (!existing_Category) {
      return NextResponse.json({
        message: "Category Doe Not Exist",
        success: false,
      });
    }

    const deleteCategory = await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({
      category: deleteCategory,
      message: "Category Deleted Successfully",
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
