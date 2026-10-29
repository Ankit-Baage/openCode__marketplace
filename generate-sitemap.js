const fs = require("fs");
const { mainRoutes } = require("./src/router/router"); // adjust path if needed

const BASE_URL = "https://backend.mobigarage.com/"; 

function collectPaths(routes, parentPath = "") {
  let paths = [];

  routes.forEach((route) => {
    if (route.path) {
      // Handle absolute vs relative path
      let fullPath = route.path.startsWith("/")
        ? route.path
        : `${parentPath}/${route.path}`.replace(/\/+/g, "/");

      if (fullPath === "") fullPath = "/"; // root case

      paths.push(fullPath);
    }

    if (route.index) {
      // index route = same as parent
      paths.push(parentPath === "" ? "/" : parentPath);
    }

    if (route.children) {
      const childPaths = collectPaths(route.children, route.path.startsWith("/") ? route.path : `${parentPath}/${route.path}`);
      paths = paths.concat(childPaths);
    }
  });

  return paths;
}

function generateSitemap() {
  const paths = collectPaths(mainRoutes);

  const uniquePaths = [...new Set(paths)]; // remove duplicates

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniquePaths
    .map((path) => {
      return `<url>
        <loc>${BASE_URL}${path === "/" ? "" : path}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
    })
    .join("\n")}
  </urlset>`;

  fs.writeFileSync("./public/sitemap.xml", sitemap, "utf8");
  console.log("✅ Sitemap generated at /public/sitemap.xml");
}

generateSitemap();
