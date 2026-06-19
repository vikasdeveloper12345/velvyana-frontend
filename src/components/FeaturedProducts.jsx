import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { API_URL, getCategoryPath, getSubcategoryPath, getProductPath, nameToSlug, resolveImageUrl } from "../utils/api";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const [addedId, setAddedId] = useState(null);

  const toggleWishlist = (product) => {
     
    const user = JSON.parse(localStorage.getItem("user"));

       // 🔴 LOGIN REQUIRED
       if (!user) {
        navigate("/login");
        return;
        }

    let updated = [...wishlist];
    const exists = updated.find((item) => item.id === product.id);

    if (exists) {
      updated = updated.filter((item) => item.id !== product.id);
    } else {
      updated.push(product);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products?featured=1`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          (data.data || []).slice(0, 8).map((p) => {
            const salesPrice = p.price;
            const originalPrice = p.original_price || null;
            const discount =
              originalPrice && originalPrice > salesPrice
                ? `${Math.round(((originalPrice - salesPrice) / originalPrice) * 100)}% off`
                : null;

            return {
              id: p.id,
              slug: p.slug,
              name: p.name,
              price: salesPrice,
              original_price: originalPrice,
              oldPrice: originalPrice || Math.round(salesPrice * 1.67),
              discount: discount || "40% off",
              url_segment: p.url_segment,
              category_slug: p.category_slug,
              subcategory_slug: p.subcategory_slug,
              img: resolveImageUrl(p.img || p.images?.[0]),
            };
          })
        );
      });
  }, []);

  return (
    <div className="w-full bg-[#020617] py-16">

      <div className="max-w-7xl mx-auto px-6">
        

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Featured Products
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="text-pink-500 font-medium hover:underline"
          >
            View All →
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {products.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(getProductPath(item), { state: item })
              }

              // 🔥 ONLY THIS CHANGED 
              className="group cursor-pointer 
              bg-[#0f172a] border border-gray-800 
              rounded-xl p-3 
              hover:border-pink-500 transition"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-lg product-photo-frame">

                <img
                  src={item.img}
                  alt={item.name}
                  className="sharp-img transition duration-300"
                />

                {/* ❤️ WISHLIST */}
                <FaHeart
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                  className={`absolute top-3 left-3 text-lg cursor-pointer drop-shadow
                  ${
                    wishlist.some((w) => w.id === item.id)
                      ? "text-pink-500"
                      : "text-white"
                  }`}
                />

                {/* QUICK VIEW */}
                <div className="absolute bottom-0 left-0 w-full 
                bg-black/40 text-white text-center py-2
                opacity-0 group-hover:opacity-100 
                transition">
                  QUICK VIEW
                </div>

              </div>

              {/* TEXT */}
              <div className="mt-3">
                <h3 className="text-sm text-white font-medium">
                  {item.name}
                </h3>

                <div className="mt-1 text-sm">
                  <span className="font-semibold text-white">
                    ₹{item.price}
                  </span>
                  {item.original_price && item.original_price > item.price && (
                    <>
                      <span className="line-through text-gray-400 ml-2">
                        ₹{item.original_price}
                      </span>
                      <span className="text-red-500 ml-2 text-xs">
                        {item.discount}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* ADD TO CART */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);

                  setAddedId(item.id);
                  setTimeout(() => setAddedId(null), 1500);
                }}
                className={`mt-3 w-full py-2 rounded-lg transition
                ${
                  addedId === item.id
                    ? "bg-green-500 text-white"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                {addedId === item.id ? "Added ✓" : "Add to cart"}
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default FeaturedProducts;