import { NextRequest, NextResponse } from "next/server";
import { userAgent } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const ua = userAgent(req);

    // --- Extract IP Address (from common proxy/CDN headers) ---
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp =
      forwardedFor?.split(",")[0].trim() || // first in list = client IP
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") || // Cloudflare
      req.headers.get("fastly-client-ip") || // Fastly
      req.headers.get("true-client-ip") ||   // Akamai
      req.headers.get("x-client-ip") ||
      "Unknown";

    // --- Location Lookup (via external API) ---
    let location = null;
    if (realIp !== "Unknown" && !realIp.startsWith("::1")) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${realIp}/json/`);
        console.log(geoRes)
        if (geoRes.ok) {
          location = await geoRes.json();
        }
      } catch {
        location = null;
      }
    }

    return NextResponse.json({
      ip: realIp,
      location,
      browser: ua.browser,
      os: ua.os,
      device: ua.device,
      isBot: ua.isBot,
      cpu: ua.cpu,
      engine: ua.engine,
      ua: ua.ua,
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
