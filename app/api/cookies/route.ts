import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { userAgent } from "next/server";
import { UAParser } from "ua-parser-js";

export const POST = async (req: NextRequest) => {
  try {
    const ua = userAgent(req);

    const parser = new UAParser(req.headers.get("user-agent") || "");
    const parsedUA = parser.getResult();

    if (!ua.device || Object.keys(ua.device).length === 0) {
      const parsedDevice = parsedUA.device;
      ua.device =
        Object.keys(parsedDevice).length > 0
          ? parsedDevice
          : { vendor: "Generic", model: "Desktop", type: "desktop" };
    }

    if (parsedUA.os?.name === "Android" && parsedUA.os?.version) {
      ua.os.version = parsedUA.os.version;
    }

    if (!ua.cpu?.architecture) {
      if (parsedUA.cpu?.architecture) {
        ua.cpu.architecture = parsedUA.cpu.architecture;
      } else if (ua.os?.name === "iOS") {
        ua.cpu.architecture = "arm64";
      } else if (ua.os?.name === "Android") {
        ua.cpu.architecture = "arm64-v8a";
      } else {
        ua.cpu.architecture = "unknown";
      }
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp =
      forwardedFor?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("fastly-client-ip") ||
      req.headers.get("true-client-ip") ||
      req.headers.get("x-client-ip") ||
      "Unknown";

    let location = null;

    if (realIp !== "Unknown" && !realIp.startsWith("::1")) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${realIp}/json/`);
        if (geoRes.ok) {
          location = await geoRes.json();
        }
        if (!location || !location.city) {
          const backupRes = await fetch(
            `https://ipinfo.io/${realIp}/json?token=3db6fb3b9b48eb`
          );
          if (backupRes.ok) {
            location = await backupRes.json();
          }
        }
      } catch {
        location = null;
      }
    }

    let details;
    const existing = await prisma.cookies.findFirst({
      where: { ip: realIp },
    });

    if (existing) {
      details = await prisma.cookies.update({
        where: { id: existing.id },
        data: {
          visitCount: existing.visitCount + 1,
          location,
          browser: ua.browser,
          os: ua.os,
          device: ua.device,
          isBot: ua.isBot,
          cpu: ua.cpu,
          engine: ua.engine,
          ua: ua.ua,
        },
      });
    } else {
      details = await prisma.cookies.create({
        data: {
          ip: realIp,
          visitCount: 1,
          location,
          browser: ua.browser,
          os: ua.os,
          device: ua.device,
          isBot: ua.isBot,
          cpu: ua.cpu,
          engine: ua.engine,
          ua: ua.ua,
        },
      });
    }

    return NextResponse.json({
      success: true,
      cookieId: details.id,
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
    const data = await prisma.cookies.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      data,
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
