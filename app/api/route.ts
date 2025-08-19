import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return NextResponse.json({ message: "Api Running Succsefully" });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Server Error",
      success: false,
    });
  }
};
