import { useEffect, useState } from "react";
import { fetchSeo } from "../utils/api";

export const useSeo = (pageKey, fallback = {}) => {
  const [seo, setSeo] = useState({
    title: fallback.title || "",
    description: fallback.description || "",
    keywords: fallback.keywords || "",
    robots: fallback.robots || "",
  });

  useEffect(() => {
    const nextFallback = {
      title: fallback.title || "",
      description: fallback.description || "",
      keywords: fallback.keywords || "",
      robots: fallback.robots || "",
    };

    if (!pageKey) {
      setSeo(nextFallback);
      return;
    }

    let active = true;

    fetchSeo(pageKey).then((data) => {
      if (!active) return;
      if (data?.meta_title) {
        setSeo({
          title: data.meta_title,
          description: data.meta_description || "",
          keywords: data.meta_keywords || "",
          robots: data.robots || "",
        });
      } else {
        setSeo(nextFallback);
      }
    });

    return () => {
      active = false;
    };
  }, [
    pageKey,
    fallback.title,
    fallback.description,
    fallback.keywords,
    fallback.robots,
  ]);

  return seo;
};
