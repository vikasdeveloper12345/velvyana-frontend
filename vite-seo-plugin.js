import fs from "fs";
import path from "path";

const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

const STATIC_ROUTES = {
  "/": "home",
  "/blog": "blog",
  "/about": "about",
  "/contact": "contact",
  "/products": "products",
  "/terms": "terms",
  "/privacy": "privacy",
  "/refund": "refund",
  "/shipping": "shipping",
  "/checkout": "checkout",
  "/cart": "cart",
  "/login": "login",
  "/orders": "orders",
  "/wishlist": "wishlist",
};

const escapeAttr = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

async function resolvePageKey(pathname) {
  if (STATIC_ROUTES[pathname]) return STATIC_ROUTES[pathname];

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const json = await fetchJson(`${API_URL}/api/blogs/${blogMatch[1]}`);
    if (json?.data?.id) return `blog-${json.data.id}`;
  }

  const productMatch = pathname.match(/^\/([^/]+)\/([^/]+)$/);
  if (productMatch && !pathname.startsWith("/product-category")) {
    const json = await fetchJson(`${API_URL}/api/products/${productMatch[2]}`);
    if (json?.data?.id) return `product-${json.data.id}`;
  }

  const legacyProduct = pathname.match(/^\/product\/([^/]+)$/);
  if (legacyProduct) {
    const json = await fetchJson(`${API_URL}/api/products/${legacyProduct[1]}`);
    if (json?.data?.id) return `product-${json.data.id}`;
  }

  return null;
}

function injectSeo(html, seo) {
  if (!seo?.meta_title) return html;

  let out = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttr(seo.meta_title)}</title>`
  );

  const description = escapeAttr(seo.meta_description);
  if (description) {
    if (/<meta\s+name="description"/i.test(out)) {
      out = out.replace(
        /<meta\s+name="description"[^>]*>/i,
        `<meta name="description" content="${description}" />`
      );
    } else {
      out = out.replace("</title>", `</title>\n    <meta name="description" content="${description}" />`);
    }
  }

  const keywords = escapeAttr(seo.meta_keywords);
  if (keywords) {
    if (/<meta\s+name="keywords"/i.test(out)) {
      out = out.replace(
        /<meta\s+name="keywords"[^>]*>/i,
        `<meta name="keywords" content="${keywords}" />`
      );
    } else {
      out = out.replace("</title>", `</title>\n    <meta name="keywords" content="${keywords}" />`);
    }
  }

  const robots = escapeAttr(seo.robots);
  if (robots) {
    if (/<meta\s+name="robots"/i.test(out)) {
      out = out.replace(
        /<meta\s+name="robots"[^>]*>/i,
        `<meta name="robots" content="${robots}" />`
      );
    } else {
      out = out.replace("</title>", `</title>\n    <meta name="robots" content="${robots}" />`);
    }
  }

  return out;
}

function isDocumentRequest(url) {
  if (!url || url.startsWith("/@") || url.startsWith("/src") || url.startsWith("/node_modules")) {
    return false;
  }
  if (url.startsWith("/api") || url.startsWith("/uploads")) return false;
  const pathOnly = url.split("?")[0];
  if (pathOnly === "/" || !pathOnly.includes(".")) return true;
  return pathOnly.endsWith(".html");
}

export function seoInjectPlugin() {
  const indexPath = path.resolve("index.html");

  const handleDocument = async (req, res, next, server) => {
    if (req.method !== "GET" || !isDocumentRequest(req.url)) {
      return next();
    }

    try {
      const pathname = (req.url || "/").split("?")[0] || "/";
      const pageKey = await resolvePageKey(pathname);
      let html = fs.readFileSync(indexPath, "utf-8");

      if (pageKey) {
        const json = await fetchJson(`${API_URL}/api/seo/${pageKey}`);
        if (json?.data) html = injectSeo(html, json.data);
      }

      html = await server.transformIndexHtml(req.url, html);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    } catch {
      next();
    }
  };

  return {
    name: "velvyana-seo-inject",
    configureServer(server) {
      server.middlewares.use((req, res, next) => handleDocument(req, res, next, server));
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => handleDocument(req, res, next, server));
    },
  };
}
