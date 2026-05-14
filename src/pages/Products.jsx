import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { Helmet } from "react-helmet";

const categoryData = {
  NEW: [],
  Anarkali: ["Pure mulmul", "Semi stitched", "Unstitched", "Viscose Georgette"],
  Angrakha: [],
  Kurti: [],
  Palazzo: [],
  Saree: ["Georgette Saree", "Organza Saree"],
  "Sherwani suit": [],
  Shirt: [],
  "Suit Piece": [
    "Golden tissue",
    "Indo Western",
    "Kota",
    "Pure chanderi",
    "Pure mulmul",
    "Pure organza",
    "Pure silver tissue",
    "Semi stitched",
    "Unstitched",
    "Viscose Georgette",
  ],
};

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState("");
  const [activeSub, setActiveSub] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [showFilter, setShowFilter] = useState(false);
  const [openCat, setOpenCat] = useState(null);

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [products, setProducts] = useState([]);
  useEffect(() => {
  fetch("http://localhost:5000/api/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.data);
    });
    }, []);

  // SEO TITLE LOGIC
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const sub = params.get("sub");

  let title = "All Products";

  if (category && sub) {
    title = `${sub} ${category}`;
  } else if (category) {
    title = `${category} Products`;
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const sub = params.get("sub");

    if (category) setActiveCategory(category);
    else setActiveCategory("");

    if (sub) setActiveSub(sub);
    else setActiveSub("");
  }, [location.search]);

  useEffect(() => {
    const syncWishlist = () => {
      const data = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(data);
    };

    window.addEventListener("wishlistUpdated", syncWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", syncWishlist);
    };
  }, []);

  // ✅ FIXED WISHLIST LOGIC
  const handleWishlist = (e, product) => {
  e.preventDefault();
  e.stopPropagation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return;
  }

  setWishlist((prev) => {
    const exists = prev.find(
      (item) => String(item._id) === String(product._id)
    );

    let updated;

    if (exists) {
      updated = prev.filter(
        (item) => String(item._id) !== String(product._id)
      );
    } else {
      updated = [...prev, product];
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));

    return updated;
  });
};

  const isInWishlist = (id) =>
    wishlist.some((item) => String(item._id) === String(id));

  let filtered = products;

  if (activeCategory) {
    filtered = filtered.filter(
      (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }

  if (activeSub) {
    filtered = filtered.filter(
      (p) =>
        p.subCategory?.toLowerCase() === activeSub.toLowerCase() ||
        p.sub?.toLowerCase() === activeSub.toLowerCase()
    );
  }

  if (sortOption === "low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOption === "high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div key={location.search} className="bg-[#020617] text-white min-h-screen pb-20">
      <Helmet>
        <title>{title} | Velvyana</title>
        <meta name="description" content={`Shop ${title.toLowerCase()} at Velvyana`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex justify-end items-center mb-6 gap-4">
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border 
            bg-gray-800 text-white border-gray-700 hover:border-pink-500 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 4h18M6 12h12M10 20h4" />
            </svg>
            Filter
          </button>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none px-5 py-2 pr-10 rounded-lg
              border-2 border-pink-500 bg-gray-800 text-white text-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No product available right now
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              onClick={(e) => {
                // ✅ Added check to prevent navigation if heart icon is clicked
                if (e.target.closest("[data-wishlist]")) return;
            if (e.ctrlKey) {
            window.open(`/product/${item.slug}`, "_blank");
        } else {
           navigate(`/product/${item.slug}`, { state: item });
       }
              }}
              className="cursor-pointer group active:scale-95 transition"
            >
              <div className="relative overflow-hidden">
                <div
                  data-wishlist
                  className="absolute top-3 left-3 z-30 p-2"
                  onClick={(e) => handleWishlist(e, item)}
                >
                  <FaHeart
                    className={`text-lg transition-colors ${
                      isInWishlist(item._id) ? "text-pink-500" : "text-white"
                    }`}
                  />
                </div>

                <img
                 src={item.images?.[0] || ""}
                  alt={item.name}
                  className="w-full h-[420px] md:h-[550px] object-cover 
                  transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-2 px-1">
                <h3 className="text-sm">{item.name}</h3>
                <p className="text-xs text-gray-400">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          <div
            onClick={() => setShowFilter(false)}
            className={`flex-1 bg-black transition-opacity duration-300 ${
              showFilter ? "opacity-50 pointer-events-auto" : "opacity-0"
            }`}
          />
          <div
            className={`w-[280px] bg-[#020617] text-white p-5 shadow-xl overflow-y-auto
            transform transition-transform duration-300 ease-in-out
            ${showFilter ? "translate-x-0" : "-translate-x-full"}
            ${showFilter ? "pointer-events-auto" : ""}`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-lg hover:text-pink-500 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              {Object.entries(categoryData).map(([cat, subs]) => (
                <div key={cat}>
                  <div className="flex justify-between items-center">
                    <p
                      onClick={() => {
                        setActiveCategory(cat);
                        setActiveSub("");
                        setShowFilter(false);
                      }}
                      className="cursor-pointer font-semibold"
                    >
                      {cat}
                    </p>
                    {subs.length > 0 && (
                      <FaChevronDown
                        className={`text-[12px] cursor-pointer transition-transform duration-200 ${
                          openCat === cat ? "rotate-180" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenCat(openCat === cat ? null : cat);
                        }}
                      />
                    )}
                  </div>
                  {subs.length > 0 && openCat === cat && (
                    <div className="pl-3 mt-1 space-y-1 text-gray-400">
                      {subs.map((sub) => (
                        <p
                          key={sub}
                          className="cursor-pointer hover:text-pink-500"
                          onClick={() => {
                            setActiveCategory(cat);
                            setActiveSub(sub);
                            setShowFilter(false);
                          }}
                        >
                          — {sub}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;