// app/api/routes/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

/**
 * This API works in dev by scanning the /app directory.
 * In production it reads a prebuilt .next/routes.json written during build.
 * It can also expand dynamic routes by calling your APIs.
 */

export const config = {
  maxDuration: 30,
};

const APP_DIR = path.join(process.cwd(), "app");
const ROUTES_JSON = path.join(process.cwd(), ".next", "routes.json");

// ---------- Types ----------
interface RouteInfo {
  path: string;
  type: "static" | "dynamic" | "catch-all";
  hasLayout: boolean;
  hasLoading: boolean;
  hasError: boolean;
}

// ---------- Helpers ----------
function normalizeBaseUrl(input?: string): string {
  const fallback = `http://localhost:${process.env.PORT || 3000}`;
  const raw = (input && input.trim()) || fallback;

  // if missing protocol, assume https in prod else http
  const withProto = /^https?:\/\//i.test(raw)
    ? raw
    : (process.env.NODE_ENV === "production" ? `https://${raw}` : `http://${raw}`);

  // remove trailing slash
  return withProto.replace(/\/$/, "");
}

// ---------- DEV-ONLY: scan /app with fs ----------
function getRoutesFromFs(dir: string, baseRoute = ""): RouteInfo[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let routes: RouteInfo[] = [];

    for (const entry of entries) {
      // Skip folders you don't want listed (but allow route groups)
      if (
        entry.name.startsWith("_") ||
        entry.name === "api" ||
        entry.name === "admin" ||
        entry.name === "admin-login" ||
        entry.name === "signup"
      ) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);
      let routePath = path.join(baseRoute, entry.name).replace(/\\/g, "/");

      // Route groups: (group) doesn't affect URL
      if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
        routePath = baseRoute;
      }

      if (entry.isDirectory()) {
        try {
          const files = fs.readdirSync(fullPath);

          const hasPage = files.some((f) => /^page\.(js|jsx|ts|tsx)$/.test(f));
          const hasLayout = files.some((f) => /^layout\.(js|jsx|ts|tsx)$/.test(f));
          const hasLoading = files.some((f) => /^loading\.(js|jsx|ts|tsx)$/.test(f));
          const hasError = files.some((f) => /^error\.(js|jsx|ts|tsx)$/.test(f));

          if (hasPage) {
            let finalPath: string;
            if (routePath === "" || routePath === "/") {
              finalPath = "/";
            } else if (routePath === "/page") {
              finalPath = "/";
            } else {
              finalPath = "/" + routePath.replace(/\/page$/, "");
            }

            let routeType: RouteInfo["type"] = "static";
            if (finalPath.includes("[...")) {
              routeType = "catch-all";
            } else if (/\[[^\]]+\]/.test(finalPath)) {
              routeType = "dynamic";
            }

            routes.push({
              path: finalPath,
              type: routeType,
              hasLayout,
              hasLoading,
              hasError,
            });
          }

          routes = routes.concat(getRoutesFromFs(fullPath, routePath));
        } catch (dirError) {
          console.warn(`⚠️ Could not read directory ${fullPath}:`, dirError);
          continue;
        }
      }
    }

    return routes;
  } catch (error) {
    console.error(`❌ Error reading directory ${dir}:`, error);
    return [];
  }
}

// ---------- Dynamic route expansion config ----------
const DYNAMIC_ROUTE_CONFIG: Array<{
  pattern: RegExp;
  apiEndpoint: string;
  slugField: string;
  limit: number;
}> = [
  { pattern: /\/blogs\/\[slug\]$/, apiEndpoint: "/api/blogs", slugField: "slug", limit: 100 },
  { pattern: /\/careers\/\[id\](\/page)?$/, apiEndpoint: "/api/jobs", slugField: "id", limit: 100 },
  { pattern: /\/admin\/blogs\/edit\/\[slug\]$/, apiEndpoint: "/api/blogs", slugField: "slug", limit: 100 },
];

// ---------- fetch with timeout ----------
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 8000
): Promise<Response> {
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(to);
    return res;
  } catch (err) {
    clearTimeout(to);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw err;
  }
}

// ---------- expansion ----------
async function expandDynamicRoutes(routes: RouteInfo[]): Promise<RouteInfo[]> {
  const expandedRoutes: RouteInfo[] = [];
  const baseUrl = normalizeBaseUrl(process.env.Site_Url);

  console.log(`🌐 Using base URL: ${baseUrl}`);

  const CONCURRENCY = 3;
  for (let i = 0; i < routes.length; i += CONCURRENCY) {
    const batch = routes.slice(i, i + CONCURRENCY).map(async (route) => {
      if (route.type !== "dynamic") {
        expandedRoutes.push(route);
        return;
      }

      let expanded = false;

      for (const cfg of DYNAMIC_ROUTE_CONFIG) {
        if (!cfg.pattern.test(route.path)) continue;

        try {
          console.log(`🔍 Expanding route: ${route.path} with ${cfg.apiEndpoint}`);

          const apiUrl = `${baseUrl}${cfg.apiEndpoint}?limit=${cfg.limit}`;
          const res = await fetchWithTimeout(
            apiUrl,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                "User-Agent": "Route-Explorer/1.0",
              },
            },
            10_000
          );

          if (!res.ok) {
            console.error(`❌ API request failed for ${cfg.apiEndpoint}:`, res.status, res.statusText);
            continue;
          }

          const data = await res.json();
          let items: Record<string, any>[] = [];

          if (data && typeof data === "object" && data.success && Array.isArray(data.data)) {
            items = data.data;
          } else if (Array.isArray(data)) {
            items = data;
          } else if (data && typeof data === "object") {
            // find first array
            for (const key of Object.keys(data)) {
              if (Array.isArray(data[key])) {
                items = data[key];
                break;
              }
            }
          }

          console.log(`📊 Found ${items.length} items for ${route.path}`);

          if (items.length > 0) {
            for (const item of items.slice(0, 50)) {
              const slugValue = item[cfg.slugField] ?? item.slug ?? item.id;
              if (!slugValue) continue;

              const expandedPath = route.path.replace(/\[[^\]]+\]/, String(slugValue));

              expandedRoutes.push({
                ...route,
                path: expandedPath,
                // Mark expanded instances as static so your UI shows 📄
                type: "static",
              });
            }
            expanded = true;
            break;
          }
        } catch (err) {
          console.error("🔥 Failed to expand route:", err instanceof Error ? err.message : String(err));
        }
      }

      if (!expanded) {
        // keep original dynamic route if nothing expanded
        expandedRoutes.push(route);
      }
    });

    await Promise.allSettled(batch);
  }

  return expandedRoutes;
}

// ---------- handler ----------
export async function GET(request: Request) {
  const started = Date.now();
  try {
    console.log("🚀 Starting route discovery...");

    const { searchParams } = new URL(request.url);
    const expand = searchParams.get("expand") === "true";

    let routes: RouteInfo[] = [];

    if (process.env.NODE_ENV === "development") {
      // Dev: Use FS to scan the /app directory
      if (!fs.existsSync(APP_DIR)) {
        console.error("❌ App directory not found in dev:", APP_DIR);
        return NextResponse.json(
          {
            success: false,
            error: "App directory not found (dev)",
            routes: [],
            total: 0,
            debug: { APP_DIR, cwd: process.cwd(), env: process.env.NODE_ENV },
          },
          { status: 500 }
        );
      }
      console.log("📁 Reading routes from:", APP_DIR);
      routes = getRoutesFromFs(APP_DIR);
    } else {
      // Prod: read prebuilt JSON (generated at build time)
      if (fs.existsSync(ROUTES_JSON)) {
        console.log("📖 Reading routes from build artifact:", ROUTES_JSON);
        const json = fs.readFileSync(ROUTES_JSON, "utf8");
        routes = JSON.parse(json);
      } else {
        console.warn("⚠️ Build routes.json not found. Returning empty list.");
        routes = [];
      }
    }

    console.log(`📋 Found ${routes.length} base routes`);

    if (expand && routes.length > 0) {
      console.log("🔄 Expanding dynamic routes...");
      try {
        routes = await expandDynamicRoutes(routes);
        console.log(`✅ Expanded to ${routes.length} total routes`);
      } catch (expansionError) {
        console.error("⚠️ Error during route expansion:", expansionError);
      }
    }

    routes.sort((a, b) => a.path.localeCompare(b.path));

    const duration = Date.now() - started;
    console.log(`⏱️ Route discovery completed in ${duration}ms`);

    return NextResponse.json({
      success: true,
      routes,
      total: routes.length,
      expanded: expand,
      debug: {
        duration: `${duration}ms`,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    const duration = Date.now() - started;
    console.error("💥 Critical error in route discovery:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch routes",
        routes: [],
        total: 0,
        debug: {
          duration: `${duration}ms`,
          stack: error?.stack,
          environment: process.env.NODE_ENV,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
