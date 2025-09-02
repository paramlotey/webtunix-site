import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "No refresh token", success: false },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
    };
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );
    const response = NextResponse.json({
      message: "Token Refreshed",
      success: true,
    });
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Invalid refresh token", success: false },
      { status: 403 }
    );
  }
};
