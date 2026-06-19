import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import SeoHead from "../components/SeoHead";

const Wishlist = () => {
  const navigate = useNavigate();

  const getWishlist = () => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  };

  const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };

  const [wishlist, setWishlist] = useState(getWishlist());
  const [cart, setCart] = useState(getCart());
  const [addedId, setAddedId] = useState(null);

  // ✅ sync across app
  useEffect(() => {
    const handleUpdate = () => {
      setWishlist(getWishlist());
    };

    window.addEventListener("wishlistUpdated", handleUpdate);
    return () => window.removeEventListener("wishlistUpdated", handleUpdate);
  }, []);

  // ✅ sync localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ FIX: ensure full product data (price issue fix)
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const enrichedWishlist = wishlist.map((item) => {
    if (item.price) return item;

    const full = products.find(
      (p) => String(p.id) === String(item.id)
    );

    return full ? { ...full } : item;
  });

  // ✅ remove item
  const removeItem = (id) => {
    const updated = wishlist.filter(
      (item) => String(item.id) !== String(id)
    );
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    // sync everywhere
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // ✅ add to cart (fixed structure)
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find(
        (c) => String(c.id) === String(item.id)
      );

      if (exists) return prev;

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          images: item.images,
          img: item.img,
        },
      ];
    });

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <>
      <SeoHead
        title="My Wishlist | Velvyana"
        description="Browse your wishlist on Velvyana. Save and shop your favorite kurtis, sarees, and ethnic wear."
        keywords="velvyana wishlist, kurti wishlist, saree wishlist, ethnic wear, online shopping"
      />

      <div className="bg-[#020617] min-h-screen text-gray-200">
        <div className="p-4 md:p-6">

          <h1 className="text-2xl font-bold mb-6 text-white">
            My Wishlist ❤️
          </h1>

          {enrichedWishlist.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-400 mb-4">
                Your wishlist is empty
              </p>

              <button
                onClick={() => navigate("/products")}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
              >
                Shop Now
              </button>
            </div>
          ) : (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">

              {enrichedWishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0f172a] border border-gray-800 
                  rounded-2xl p-4 shadow-xl transition duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative rounded-xl overflow-hidden h-[250px] md:h-[300px]">

                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : item.img
                      }
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* ❤️ ICON */}
                    <FaHeart className="absolute top-3 left-3 text-pink-500 text-lg" />

                    {/* ❌ REMOVE */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 
                      w-9 h-9 flex items-center justify-center 
                      rounded-full bg-black/70 backdrop-blur-md
                      text-white text-lg 
                      hover:bg-pink-500 hover:scale-110
                      transition-all duration-300 shadow-lg"
                    >
                      ✕
                    </button>

                  </div>

                  {/* TEXT */}
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-white">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => addToCart(item)}
                    className={`mt-4 w-full py-2 rounded-lg font-medium transition-all duration-300 ${
                      addedId === item.id
                        ? "bg-green-500 text-white"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                  >
                    {addedId === item.id ? "Added ✓" : "Add to Cart"}
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Wishlist;