export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("blob:") || img.startsWith("data:")) return img;

  // Rewrite localhost URLs saved during local dev / missing API_BASE_URL on server.
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//i.test(img)) {
    try {
      const { pathname } = new URL(img);
      return `${API_URL}${pathname}`;
    } catch {
      return img;
    }
  }

  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return `${API_URL}${img.startsWith("/") ? img : `/${img}`}`;
};

export const stripHtml = (html) => html?.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim() || "";

export const getProductPath = (product) => {
  if (!product?.slug) return "/products";
  const segment = product.url_segment || product.subcategory_slug || product.category_slug;
  if (segment) return `/${segment}/${product.slug}`;
  return `/product/${product.slug}`;
};

export const getCategoryPath = (categorySlug) => `/product-category/${categorySlug}`;

export const getSubcategoryPath = (categorySlug, subSlug) =>
  `/product-category/${categorySlug}/${subSlug}`;

export const nameToSlug = (name) =>
  name
    ?.toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-") || "";

export const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers = { "Content-Type": "application/json" };
  if (user?.token) headers.Authorization = `Bearer ${user.token}`;
  return headers;
};

export const normalizeProduct = (product) => ({
  ...product,
  id: product.id || product._id,
  _id: product._id || product.id,
  img: resolveImageUrl(product.img || product.images?.[0] || ""),
  images: (product.images || []).map(resolveImageUrl).filter(Boolean),
});

export const fetchSeo = async (pageKey) => {
  try {
    const res = await fetch(`${API_URL}/api/seo/${pageKey}`);
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
};
