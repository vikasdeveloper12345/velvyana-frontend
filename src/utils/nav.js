export const isNavActive = (pathname, to) => {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
};

export const navLinkClass = (pathname, to, base = "transition") => {
  const active = isNavActive(pathname, to);
  return `${base} ${active ? "text-pink-500" : "hover:text-pink-500"}`;
};
