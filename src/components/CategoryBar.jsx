import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const categories = [
  { name: "Anarkali", sub: ["Pure mulmul", "Semi stitched", "Unstitched", "Viscose Georgette"] },
  { name: "Angrakha" },
  { name: "Kurti" },
  { name: "Palazzo" },
  { name: "Saree", sub: ["Georgette Saree", "Organza Saree"] },
  { name: "Sherwani suit" },
  { name: "Shirt" },
  {
    name: "Suit Piece",
    sub: [
      "Golden tissue", "Indo Western", "Kota", "Pure chanderi", 
      "Pure mulmul", "Pure organza", "Pure silver tissue", 
      "Semi stitched", "Unstitched", "Viscose Georgette",
    ],
  },
];

const CategoryBar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // Keeps menu open on click

  const menuRef = useRef();
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const activeCategory = params.get("category");

  const handleNav = (e, path) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate(path);
    }
  };

  // Logic for Click (Locking the menu)
  const toggleCategory = (index) => {
    if (openIndex === index && isLocked) {
      setOpenIndex(null);
      setIsLocked(false);
    } else {
      setOpenIndex(index);
      setIsLocked(true);
    }
  };

  // Logic for Hover Enter
  const handleMouseEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isLocked) {
      setOpenIndex(index);
    }
  };

  // Logic for Hover Leave
  const handleMouseLeave = () => {
    if (!isLocked) {
      timeoutRef.current = setTimeout(() => {
        setOpenIndex(null);
      }, 150); // 150ms delay to prevent flicker
    }
  };

  // Reset states on navigation
  useEffect(() => {
    setOpenIndex(null);
    setMobileOpen(false);
    setIsLocked(false);
  }, [location.pathname, location.search]);

  // Outside click to close locked menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenIndex(null);
        setMobileOpen(false);
        setIsLocked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="bg-gray-900 text-white border-b border-gray-700">
      <Helmet key={location.pathname}>
        <title>Categories - Velvyana</title>
      </Helmet>

      {/* MOBILE TOP BAR */}
      <div className="flex justify-between items-center px-4 py-3 md:hidden">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={(e) => { e.stopPropagation(); setMobileOpen(!mobileOpen); }}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:flex justify-center items-center gap-8 px-6 py-3">
        <a href="/" onClick={(e) => handleNav(e, "/")} className="hover:text-pink-500">
          Home
        </a>

        {categories.map((cat, index) => {
          const isActiveCat = activeCategory === cat.name;

          return (
            <div
              key={index}
              className="relative flex items-center gap-2 py-3"
              onMouseEnter={() => cat.sub && handleMouseEnter(index)}
              onMouseLeave={() => cat.sub && handleMouseLeave()}
            >
              {cat.sub ? (
                <button
                  onClick={() => toggleCategory(index)}
                  className={`cursor-pointer transition ${
                    isActiveCat || openIndex === index ? "text-pink-500" : "hover:text-pink-500"
                  }`}
                >
                  {cat.name}
                </button>
              ) : (
                <a
                  href={`/products?category=${cat.name}`}
                  onClick={(e) => handleNav(e, `/products?category=${cat.name}`)}
                  className="hover:text-pink-500"
                >
                  {cat.name}
                </a>
              )}

              {cat.sub && (
                <FaChevronDown
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(index);
                  }}
                  className={`w-4 h-4 cursor-pointer transition-transform duration-200 ${
                    openIndex === index ? "rotate-180 text-pink-500" : ""
                  }`}
                />
              )}

              {/* DROPDOWN MENU */}
              {cat.sub && openIndex === index && (
                /* The wrapper div below uses pt-[10px] to bridge the gap between nav and menu */
                <div className="absolute left-0 top-full pt-[10px] w-56 z-50">
                  <div className="bg-gray-800 border border-gray-700 rounded-md shadow-lg p-2">
                    <a
                      href={`/products?category=${cat.name}`}
                      onClick={(e) => handleNav(e, `/products?category=${cat.name}`)}
                      className="block px-3 py-2 font-semibold text-pink-400 hover:bg-gray-700 rounded"
                    >
                      All {cat.name}
                    </a>

                    {cat.sub.map((subItem, i) => (
                      <a
                        key={i}
                        href={`/products?category=${cat.name}&sub=${subItem}`}
                        onClick={(e) =>
                          handleNav(e, `/products?category=${cat.name}&sub=${subItem}`)
                        }
                        className="block px-3 py-2 hover:bg-gray-700 hover:text-pink-400 rounded transition-colors"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <a href="/blog" className="hover:text-pink-500" onClick={(e) => handleNav(e, "/blog")}>Blog</a>
        <a href="/contact" className="hover:text-pink-500" onClick={(e) => handleNav(e, "/contact")}>Contact</a>
      </div>

      {/* MOBILE MENU CONTENT */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-900">
          <a href="/" onClick={(e) => handleNav(e, "/")} className="block py-2 border-b border-gray-800">
            HOME
          </a>
          {categories.map((cat, index) => (
            <div key={index} className="border-b border-gray-800 pb-2">
              <div className="flex justify-between items-center">
                {cat.sub ? (
                  <button 
                    onClick={() => toggleCategory(index)} 
                    className={`py-2 text-left w-full ${openIndex === index ? "text-pink-500" : ""}`}
                  >
                    {cat.name}
                  </button>
                ) : (
                  <a href={`/products?category=${cat.name}`} onClick={(e) => handleNav(e, `/products?category=${cat.name}`)} className="py-2 block w-full">
                    {cat.name}
                  </a>
                )}
                {cat.sub && (
                  <FaChevronDown
                    onClick={() => toggleCategory(index)}
                    className={`transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                  />
                )}
              </div>
              {cat.sub && openIndex === index && (
                <div className="pl-4 space-y-1 mt-1 bg-gray-800/50 rounded-md p-2">
                  <a
                    href={`/products?category=${cat.name}`}
                    onClick={(e) => handleNav(e, `/products?category=${cat.name}`)}
                    className="block py-1 font-semibold text-pink-500"
                  >
                    All {cat.name}
                  </a>
                  {cat.sub.map((subItem, i) => (
                    <a
                      key={i}
                      href={`/products?category=${cat.name}&sub=${subItem}`}
                      onClick={(e) => handleNav(e, `/products?category=${cat.name}&sub=${subItem}`)}
                      className="block py-1 text-gray-300"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBar;