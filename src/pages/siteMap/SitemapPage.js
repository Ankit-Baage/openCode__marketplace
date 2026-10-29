import { Link } from "react-router-dom";
import { mainRoutes } from "../router/mainRoutes"; // adjust the import path

// 🛠 Recursive function to render routes
function RenderRoutes({ routes, basePath = "" }) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: "1rem" }}>
      {routes.map((route, index) => {
        // Compute full path (avoid double slashes)
        const fullPath =
          route.path === "/"
            ? "/"
            : `${basePath}${route.path ? `/${route.path}` : ""}`.replace(
                /\/+/g,
                "/"
              );

        // Some routes are index routes (path is undefined but "index: true")
        const isIndex = route.index;

        return (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            {!isIndex && route.path ? (
              <Link
                to={fullPath}
                style={{ textDecoration: "none", color: "#182035" }}
              >
                {fullPath}
              </Link>
            ) : null}

            {/* Recurse for children */}
            {route.children && (
              <RenderRoutes routes={route.children} basePath={fullPath} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function SitemapPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "#ff6f3f", marginBottom: "1rem" }}>Sitemap</h1>
      {mainRoutes.map((route, idx) => (
        <div key={idx}>
          <RenderRoutes routes={[route]} basePath="" />
        </div>
      ))}
    </div>
  );
}
