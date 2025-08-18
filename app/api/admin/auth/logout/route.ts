import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const POST = async () => {
  const response = NextResponse.json({ message: "Logged out", success: true });

  // await prisma.admin.update({
  //   data: { access_token: null, refresh_token: null },
  //   where: {email}
  // });
  // response.cookies.set("accessToken", "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  //   maxAge: 0,
  // });

  // response.cookies.set("refreshToken", "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   path: "/",
  //   maxAge: 0,
  // });

  return response;
};
