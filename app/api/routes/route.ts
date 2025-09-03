import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const appDir = path.join(process.cwd(), "app");

interface RouteInfo {
  path: string;
  type: "static" | "dynamic" | "catch-all";
  hasLayout: boolean;
  hasLoading: boolean;
  hasError: boolean;
}

function getRoutes(dir: string, baseRoute = ""): RouteInfo[] {
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
      const files = fs.readdirSync(fullPath);

      // Check if this directory has a page file
      const hasPage = files.some((f) => /^page\.(js|jsx|ts|tsx)$/.test(f));
      const hasLayout = files.some((f) => /^layout\.(js|jsx|ts|tsx)$/.test(f));
      const hasLoading = files.some((f) =>
        /^loading\.(js|jsx|ts|tsx)$/.test(f)
      );
      const hasError = files.some((f) => /^error\.(js|jsx|ts|tsx)$/.test(f));

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
    }
  }

  return routes;
}

// Configuration for dynamic route expansion
const DYNAMIC_ROUTE_CONFIG = [
  {
    pattern: /\/blogs\/\[slug\]$/,
    apiEndpoint: "/api/blogs",
    slugField: "slug",
    limit: 1000,
  },
  {
    pattern: /\/careers\/\[id\](\/page)?$/,
    apiEndpoint: "/api/jobs",
    slugField: "id",
    limit: 1000,
  },
  {
    pattern: /\/admin\/blogs\/edit\/\[slug\]$/,
    apiEndpoint: "/api/blogs",
    slugField: "slug",
    limit: 1000,
  },
  // Add more patterns as needed
  // {
  //   pattern: /\/products\/\[slug\]$/,
  //   apiEndpoint: '/api/products',
  //   slugField: 'slug',
  //   limit: 1000
  // }
];

async function expandDynamicRoutes(routes: RouteInfo[]): Promise<RouteInfo[]> {
  const expandedRoutes: RouteInfo[] = [];
  const baseUrl = process.env.Site_Url || "http://localhost:3000";

  for (const route of routes) {
    if (route.type === "dynamic") {
      let expanded = false;

      for (const config of DYNAMIC_ROUTE_CONFIG) {
        // ✅ only match against the defined regex pattern
        if (config.pattern.test(route.path)) {
          console.log(
            `🔍 Expanding route: ${route.path} using ${config.apiEndpoint}`
          );

          try {
            const res = await fetch(
              `${baseUrl}${config.apiEndpoint}?limit=${config.limit}`,
              {
                cache: "no-store",
                headers: { "Content-Type": "application/json" },
              }
            );

            if (res.ok) {
              const data = await res.json();

              // Normalize response formats
              let items: Record<string, unknown>[] = [];
              if (data.success && Array.isArray(data.data)) {
                items = data.data;
              } else if (Array.isArray(data)) {
                items = data;
              } else {
                // Fallback: take first array in the response
                for (const key of Object.keys(data)) {
                  if (Array.isArray(data[key])) {
                    items = data[key];
                    break;
                  }
                }
              }

              if (items.length > 0) {
                for (const item of items) {
                  const slugValue =
                    item[config.slugField] || item.slug || item.id;
                  if (slugValue) {
                    // ✅ Replace ANY placeholder ([id], [slug], [productId], etc.)
                    const expandedPath = route.path.replace(
                      /\[[^\]]+\]/,
                      String(slugValue)
                    );

                    expandedRoutes.push({
                      ...route,
                      path: expandedPath,
                      type: "static",
                    });
                  }
                }
                expanded = true;
                break; // stop after first matching config
              }
            } else {
              console.error(
                `❌ API request failed for ${config.apiEndpoint}:`,
                res.status,
                res.statusText
              );
            }
          } catch (error) {
            console.error(`🔥 Failed to expand route ${route.path}:`, error);
          }
        }
      }

      // keep original route if not expanded
      if (!expanded) {
        expandedRoutes.push(route);
      }
    } else {
      expandedRoutes.push(route);
    }
  }

  return expandedRoutes;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const expand = searchParams.get("expand") === "true";

    let routes = getRoutes(appDir);

    if (expand) {
      routes = await expandDynamicRoutes(routes);
    }

    // Sort routes alphabetically
    routes.sort((a, b) => a.path.localeCompare(b.path));

    return NextResponse.json({
      success: true,
      routes,
      total: routes.length,
      expanded: expand,
    });
  } catch (error) {
    console.error("Error fetching routes:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch routes",
        routes: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
