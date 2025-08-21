import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json(
        { message: "Invalid credentials", success: false },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );

    const refreshToken = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    await prisma.admin.update({
      where: { email },
      data: { access_token: accessToken, refresh_token: refreshToken },
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
        admin: { id: admin.id, name: admin.name, email: admin.email },
      },
      { status: 200 }
    );

    // Set tokens in cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 Hours
      sameSite: "lax",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
};
