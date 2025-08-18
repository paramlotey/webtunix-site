import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const singleEnquiry = await prisma.contact.findFirstOrThrow({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      singleEnquiry,
      message: "Enquiry Fetched Succesfully",
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    const singleEnquiry = await prisma.contact.findFirstOrThrow({
      where: { id: Number(id) },
    });
    if (singleEnquiry) {
      const deletedEnquiry = await prisma.contact.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json({
        deletedEnquiry,
        message: "Enquiry Deleted Succesfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Server Error",
      success: false,
    });
  }
};
