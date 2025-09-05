import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const config = {
  maxDuration: 30,
};

const appDir = path.join(process.cwd(), "app");

interface RouteInfo {
  path: string;
  type: "static" | "dynamic" | "catch-all";
  hasLayout: boolean;
  hasLoading: boolean;
  hasError: boolean;
}

function getRoutes(dir: string, baseRoute = ""): RouteInfo[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let routes: RouteInfo[] = [];

    for (const entry of entries) {
      // Skip private folders and api routes, but NOT route groups
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

      // Handle route groups: remove parentheses from path
      if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
        routePath = baseRoute; // Route groups don't add to the URL path
      }

      if (entry.isDirectory()) {
        try {
          const files = fs.readdirSync(fullPath);

          // Check if this directory has a page file
          const hasPage = files.some((f) => /^page\.(js|jsx|ts|tsx)$/.test(f));
          const hasLayout = files.some((f) =>
            /^layout\.(js|jsx|ts|tsx)$/.test(f)
          );
          const hasLoading = files.some((f) =>
            /^loading\.(js|jsx|ts|tsx)$/.test(f)
          );
          const hasError = files.some((f) =>
            /^error\.(js|jsx|ts|tsx)$/.test(f)
          );

          if (hasPage) {
            let finalPath;

            // Handle route groups and paths
            if (routePath === "" || routePath === "/") {
              finalPath = "/";
            } else if (routePath === "/page") {
              finalPath = "/";
            } else {
              finalPath = "/" + routePath.replace(/\/page$/, "");
            }

            // Determine route type
            let routeType: "static" | "dynamic" | "catch-all" = "static";
            if (finalPath.includes("[...")) {
              routeType = "catch-all";
            } else if (finalPath.includes("[") && finalPath.includes("]")) {
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

          // Recursively get routes from subdirectories
          routes = routes.concat(getRoutes(fullPath, routePath));
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

// Configuration for dynamic route expansion
const DYNAMIC_ROUTE_CONFIG = [
  {
    pattern: /\/blogs\/\[slug\]$/,
    apiEndpoint: "/api/blogs",
    slugField: "slug",
    limit: 100, // Reduced limit for faster processing
  },
  {
    pattern: /\/careers\/\[id\](\/page)?$/,
    apiEndpoint: "/api/jobs",
    slugField: "id",
    limit: 100, // Reduced limit for faster processing
  },
  {
    pattern: /\/admin\/blogs\/edit\/\[slug\]$/,
    apiEndpoint: "/api/blogs",
    slugField: "slug",
    limit: 100, // Reduced limit for faster processing
  },
];

// Utility function to make HTTP requests with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = 8000
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms`);
    }

    throw error;
  }
}

async function expandDynamicRoutes(routes: RouteInfo[]): Promise<RouteInfo[]> {
  const expandedRoutes: RouteInfo[] = [];
  const baseUrl = process.env.Site_Url
    ? `${process.env.Site_Url}`
    : "http://localhost:3000";

  console.log(`🌐 Using base URL: ${baseUrl}`);

  // Process routes with concurrency limit to avoid overwhelming the server
  const CONCURRENCY_LIMIT = 3;
  const routeChunks = [];

  for (let i = 0; i < routes.length; i += CONCURRENCY_LIMIT) {
    routeChunks.push(routes.slice(i, i + CONCURRENCY_LIMIT));
  }

  for (const chunk of routeChunks) {
    const chunkPromises = chunk.map(async (route) => {
      if (route.type === "dynamic") {
        let expanded = false;

        for (const config of DYNAMIC_ROUTE_CONFIG) {
          if (config.pattern.test(route.path)) {
            try {
              console.log(
                `🔍 Expanding route: ${route.path} with ${config.apiEndpoint}`
              );

              const apiUrl = `${baseUrl}${config.apiEndpoint}?limit=${config.limit}`;
              const res = await fetchWithTimeout(
                apiUrl,
                {
                  cache: "no-store",
                  headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "Route-Explorer/1.0",
                  },
                },
                8000
              ); // 8 second timeout

              if (res.ok) {
                const data = await res.json();
                let items: Record<string, unknown>[] = [];

                if (data.success && Array.isArray(data.data)) {
                  items = data.data;
                } else if (Array.isArray(data)) {
                  items = data;
                } else {
                  // Try to find array in response
                  for (const key of Object.keys(data)) {
                    if (Array.isArray(data[key])) {
                      items = data[key];
                      break;
                    }
                  }
                }
                console.log(
                  "API raw response for",
                  config.apiEndpoint,
                  ":",
                  data
                );

                console.log(`📊 Found ${items.length} items for ${route.path}`);

                if (items.length > 0) {
                  // Limit to first 50 items to avoid timeout
                  const limitedItems = items.slice(0, 50);

                  for (const item of limitedItems) {
                    const slugValue =
                      item[config.slugField] || item.slug || item.id;
                    if (slugValue) {
                      const expandedPath = route.path.replace(
                        /\[[^\]]+\]/,
                        String(slugValue)
                      );

                      expandedRoutes.push({
                        ...route,
                        path: expandedPath,
                        type: route.type,
                      });
                    }
                  }
                  expanded = true;
                  break;
                }
              } else {
                console.error(
                  `❌ API request failed for ${config.apiEndpoint}:`,
                  res.status,
                  res.statusText
                );
              }
            } catch (error) {
              if (error instanceof Error) {
                console.error("🔥 Failed to expand route:", error.message);
                console.error(error.stack);
              } else {
                console.error("🔥 Failed to expand route:", String(error));
              }
            }
          }
        }

        if (!expanded) {
          expandedRoutes.push(route);
        }
      } else {
        expandedRoutes.push(route);
      }
    });

    // Wait for current chunk to complete before processing next
    await Promise.allSettled(chunkPromises);
  }

  return expandedRoutes;
}

export async function GET(request: Request) {
  const startTime = Date.now();

  try {
    console.log("🚀 Starting route discovery...");

    const { searchParams } = new URL(request.url);
    const expand = searchParams.get("expand") === "true";

    // Check if app directory exists
    if (!fs.existsSync(appDir)) {
      console.error("❌ App directory not found:", appDir);
      return NextResponse.json(
        {
          success: false,
          error: "App directory not found",
          routes: [],
          total: 0,
          debug: {
            appDir,
            cwd: process.cwd(),
            nodeEnv: process.env.NODE_ENV,
          },
        },
        { status: 500 }
      );
    }

    console.log("📁 Reading routes from:", appDir);
    let routes = getRoutes(appDir);
    console.log(`📋 Found ${routes.length} base routes`);

    if (expand && routes.length > 0) {
      console.log("🔄 Expanding dynamic routes...");
      try {
        routes = await expandDynamicRoutes(routes);
        console.log(`✅ Expanded to ${routes.length} total routes`);
      } catch (expansionError) {
        console.error("⚠️ Error during route expansion:", expansionError);
        // Continue with unexpanded routes rather than failing completely
      }
    }

    routes.sort((a, b) => a.path.localeCompare(b.path));

    const duration = Date.now() - startTime;
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
  } catch (error) {
    const duration = Date.now() - startTime;

    if (error instanceof Error) {
      console.error("💥 Critical error in route discovery:", error);

      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to fetch routes",
          routes: [],
          total: 0,
          debug: {
            duration: `${duration}ms`,
            error: error.stack,
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
          },
        },
        { status: 500 }
      );
    } else {
      console.error("💥 Critical error in route discovery (non-Error):", error);

      return NextResponse.json(
        {
          success: false,
          error: "Unknown error occurred",
          routes: [],
          total: 0,
          debug: {
            duration: `${duration}ms`,
            error: String(error),
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),
          },
        },
        { status: 500 }
      );
    }
  }
}
