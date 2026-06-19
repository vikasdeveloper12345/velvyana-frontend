import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL, getCategoryPath, nameToSlug } from "../utils/api";
import { navLinkClass, isNavActive } from "../utils/nav";

const PAGE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/refund", label: "Refund Policy" },
  { to: "/shipping", label: "Shipping Policy" },
  { to: "/privacy", label: "Privacy Policy" },
];

const CATEGORY_LINKS = [
  "Anarkali",
  "Angrakha",
  "Kurti",
  "Palazzo",
  "Saree",
  "Sherwani suit",
  "Shirt",
  "Suit Piece",
];

const Footer = () => {
  const location = useLocation();
  const [recentBlogs, setRecentBlogs] = useState([]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setRecentBlogs((data.data || []).slice(0, 3)));
  }, []);

  const categoryLinkClass = (name) => {
    const slug = nameToSlug(name);
    const active = location.pathname.startsWith(getCategoryPath(slug));
    return `transition ${active ? "text-pink-500" : "hover:text-pink-500"}`;
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">

        <div
          className="max-w-7xl mx-auto px-6 py-12
          grid grid-cols-1 md:grid-cols-4 gap-12"
        >

          {/* PAGES */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              PAGES
            </h3>

            <ul className="space-y-3 text-sm">
              {PAGE_LINKS.map((page) => (
                <li key={page.to}>
                  <Link
                    to={page.to}
                    onClick={handleClick}
                    className={navLinkClass(location.pathname, page.to)}
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* CATEGORIES */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              CATEGORIES
            </h3>

            <ul className="space-y-3 text-sm">
              {CATEGORY_LINKS.map((name) => (
                <li key={name}>
                  <Link
                    to={getCategoryPath(nameToSlug(name))}
                    onClick={handleClick}
                    className={categoryLinkClass(name)}
                  >
                    {name === "Sherwani suit" ? "Sherwani Suit" : name}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* RECENT POSTS */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              RECENT POSTS
            </h3>

            <div className="space-y-4">
              {recentBlogs.length ? (
                recentBlogs.map((blog) => (
                  <div key={blog.id}>
                    <Link
                      to={`/blog/${blog.slug || blog.id}`}
                      onClick={handleClick}
                      className={`text-sm leading-relaxed transition block ${
                        isNavActive(location.pathname, `/blog/${blog.slug || blog.id}`)
                          ? "text-pink-500"
                          : "hover:text-pink-500"
                      }`}
                    >
                      {blog.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{blog.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No posts yet</p>
              )}
            </div>

          </div>

          {/* WHY US */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              WHY US?
            </h3>

            <p className="text-sm text-gray-400 leading-7">

              Velvyana is a fashion brand created for women who love
              timeless chikankari elegance and effortless style.

              Our collections blend handcrafted artistry,
              comfort and premium-quality fabrics designed for
              modern ethnic wear lovers.

            </p>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 py-4">

          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

            <p className="text-sm">
              VELVYANA © 2025 Copy-right
            </p>

            <div className="flex gap-5 mt-3 md:mt-0 text-lg">

              <a
                href="https://www.facebook.com/velvyanaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/velvyanaofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.whatsapp.com/catalog/919064252616"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.youtube.com/@VelvyanaChikankari"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
};

export default Footer;