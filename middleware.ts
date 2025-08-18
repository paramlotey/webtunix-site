// middleware.ts
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    await jwtVerify(accessToken, secret); // will throw if invalid or expired

    return NextResponse.next(); // ✅ Valid token
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return NextResponse.json(
      { message: "Invalid or expired token", success: false },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
