import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo/velvyana.png";
import SearchIcon from "@mui/icons-material/Search";
import {
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProfileDrawer from "./ProfileDrawer";
import { useAuth } from "../context/AuthContext";
import { allProducts } from "../data/products";

const categoryList = [
  "Anarkali",
  "Angrakha",
  "Kurti",
  "Palazzo",
  "Saree",
  "Sherwani suit",
  "Shirt",
  "Suit Piece",
];

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { user, logout } = useAuth();

  // 🔍 SEARCH STATES
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // ❤️ WISHLIST COUNT
  useEffect(() => {
    const updateWishlist = () => {
      const data = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(data.length);
    };
    updateWishlist();
    window.addEventListener("wishlistUpdated", updateWishlist);
    return () =>
      window.removeEventListener("wishlistUpdated", updateWishlist);
  }, []);

  // 🛒 CART COUNT
  const totalItems = cart.reduce(
    (acc, item) => acc + (item.qty || 1),
    0
  );

  // 🔍 FILTER LOGIC (FIXED)
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const searchLower = search.toLowerCase();

    // 🔹 PRODUCTS
    const productResults = allProducts.filter((item) =>
      item.name.toLowerCase().includes(searchLower) ||
      item.category?.toLowerCase().includes(searchLower)
    );

    // 🔹 CATEGORIES
    const categoryResults = categoryList
      .filter((cat) => cat.toLowerCase().includes(searchLower))
      .map((cat, index) => ({
        id: "cat-" + index,
        name: cat,
        category: cat,
        isCategory: true,
      }));

    // 🔥 MERGE
    setResults([...categoryResults, ...productResults]);
    setShowDropdown(true);
  }, [search]);

  // 🔥 OUTSIDE CLICK
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 🔥 SEARCH BUTTON
  const handleSearch = () => {
    if (!search.trim()) return;

    const searchLower = search.toLowerCase();

    const categoryMatch = categoryList.find(
      (cat) => cat.toLowerCase() === searchLower
    );

    if (categoryMatch) {
      navigate(`/products?category=${categoryMatch}`);
      setShowDropdown(false);
      return;
    }

    const productMatch = allProducts.find(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower)
    );

    if (productMatch) {
      navigate(`/product/${productMatch.id}`, { state: productMatch });
      setShowDropdown(false);
    } else {
      alert("Not found");
    }
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 
    bg-gray-900 text-white shadow-md border-b border-gray-700">

      {/* LOGO */}
      <img
        src={logo}
        alt="Velvyana"
        onClick={() => navigate("/")}
        className="h-12 cursor-pointer object-contain"
      />

      {/* SEARCH */}
      <div className="hidden md:block w-[40%] relative" ref={ref}>

        <div className="flex items-stretch border border-gray-600 
        rounded-full overflow-hidden bg-gray-800">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search..."
            className="flex-1 px-4 py-2 outline-none bg-gray-800 text-white"
          />

          <button
            onClick={handleSearch}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 flex items-center justify-center"
          >
            <SearchIcon style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* DROPDOWN */}
        {showDropdown && (
          <div className="absolute w-full bg-gray-800 shadow-lg mt-2 rounded-lg max-h-[300px] overflow-y-auto z-50">

            {results.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400">
                No results found
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  onMouseDown={() => {
                    if (item.isCategory) {
                      navigate(`/products?category=${item.category}`);
                    } else {
                      navigate(`/product/${item.id}`, { state: item });
                    }
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-700"
                >
                  <img
                    src={
                      item.isCategory
                        ? "/product/p1/p1.png"
                        : item.images
                        ? item.images[0]
                        : item.img
                    }
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-xs text-gray-400">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))
            )}

          </div>
        )}
      </div>

      {/* ICONS */}
      <div className="flex items-center gap-3 md:gap-5 text-xl">

        <button
          onClick={() => {
          if (!user) {
          navigate("/login");
        } else {
          navigate("/wishlist");
        }
        }}
          className="relative p-2 rounded-full hover:bg-gray-700"
        >
          <FaHeart />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] 
            w-4 h-4 flex items-center justify-center rounded-full">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="relative p-2 rounded-full hover:bg-gray-700"
        >
          <FaShoppingBag />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] 
            w-4 h-4 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-700"
          >
            <FaUser />
            <FaChevronDown className="text-xs hidden md:block" />
          </button>

          <ProfileDrawer
            open={open}
            setOpen={setOpen}
            logout={logout}
            user={user}
          />
        </div>

      </div>
    </div>
  );
};

export default Navbar;