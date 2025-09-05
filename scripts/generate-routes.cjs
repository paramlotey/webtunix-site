// scripts/generate-routes.cjs
/* Generates public/routes.json by scanning the /app folder.
 * This runs on your build machine (Vercel/CI/local), NOT inside serverless.
 */
const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(process.cwd(), "app");
const OUTPUT = path.join(process.cwd(), "public", "routes.json");

function getRoutesFromFs(dir, baseRoute = "") {
  const routes = [];
  if (!fs.existsSync(dir)) {
    console.warn("⚠️ app directory not found at build:", dir);
    return routes;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
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

    if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
      routePath = baseRoute;
    }

    if (entry.isDirectory()) {
      const files = fs.readdirSync(fullPath);

      const hasPage = files.some((f) => /^page\.(js|jsx|ts|tsx)$/.test(f));
      const hasLayout = files.some((f) => /^layout\.(js|jsx|ts|tsx)$/.test(f));
      const hasLoading = files.some((f) => /^loading\.(js|jsx|ts|tsx)$/.test(f));
      const hasError = files.some((f) => /^error\.(js|jsx|ts|tsx)$/.test(f));

      if (hasPage) {
        let finalPath;
        if (routePath === "" || routePath === "/") {
          finalPath = "/";
        } else if (routePath === "/page") {
          finalPath = "/";
        } else {
          finalPath = "/" + routePath.replace(/\/page$/, "");
        }

        let type = "static";
        if (finalPath.includes("[...")) type = "catch-all";
        else if (/\[[^\]]+\]/.test(finalPath)) type = "dynamic";

        routes.push({
          path: finalPath,
          type,
          hasLayout,
          hasLoading,
          hasError,
        });
      }

      routes.push(...getRoutesFromFs(fullPath, routePath));
    }
  }

  return routes;
}

(function main() {
  const routes = getRoutesFromFs(APP_DIR);
  if (!fs.existsSync(path.dirname(OUTPUT))) {
    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  }
  fs.writeFileSync(OUTPUT, JSON.stringify(routes, null, 2));
  console.log(`✅ Generated ${routes.length} routes to ${OUTPUT}`);
})();
