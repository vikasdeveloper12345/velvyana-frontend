import { useLayoutEffect } from "react";

const setMeta = (name, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setTitle = (title) => {
  if (!title) return;
  document.title = title;
  let el = document.head.querySelector("title");
  if (!el) {
    el = document.createElement("title");
    document.head.appendChild(el);
  }
  el.textContent = title;
};

const SeoHead = ({ title, description, keywords, robots }) => {
  useLayoutEffect(() => {
    setTitle(title);
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", robots);
  }, [title, description, keywords, robots]);

  return null;
};

export default SeoHead;
