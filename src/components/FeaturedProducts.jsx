import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import semiImg from "../assets/category/semi.png";
import kurtiImg from "../assets/category/kurti.png";
import sareeImg from "../assets/category/saree.png";
import unstichedImg from "../assets/category/unstiched.png";
import suitImg from "../assets/category/suit.png";
import indoImg from "../assets/category/indo.png";

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

  const products = [
    { id: 1, name: "Handblock Printed Mulmul Suit", price: 1499, oldPrice: 2499, discount: "40% off", img: semiImg },
    { id: 2, name: "Elegant Cotton Kurti Set", price: 1199, oldPrice: 1999, discount: "42% off", img: kurtiImg },
    { id: 3, name: "Banarasi Silk Saree", price: 2999, oldPrice: 5499, discount: "48% off", img: sareeImg },
    { id: 4, name: "Designer Wedding Lehenga", price: 7999, oldPrice: 12999, discount: "45% off", img: unstichedImg },
    { id: 5, name: "Summer Cotton Suit", price: 999, oldPrice: 1999, discount: "50% off", img: suitImg },
    { id: 6, name: "Designer Kurti Set", price: 1299, oldPrice: 2499, discount: "48% off", img: kurtiImg },
    { id: 7, name: "Party Wear Lehenga", price: 4999, oldPrice: 8999, discount: "44% off", img: indoImg },
    { id: 8, name: "Designer Silk Saree", price: 2599, oldPrice: 4999, discount: "48% off", img: semiImg },
  ];

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
                navigate(`/product/${item.id}`, { state: item })
              }

              // 🔥 ONLY THIS CHANGED 
              className="group cursor-pointer 
              bg-[#0f172a] border border-gray-800 
              rounded-xl p-3 
              hover:border-pink-500 transition"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-lg">

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[380px] object-cover 
                  transition duration-500 group-hover:scale-110"
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
                  <span className="line-through text-gray-400 ml-2">
                    ₹{item.oldPrice}
                  </span>
                  <span className="text-red-500 ml-2 text-xs">
                    {item.discount}
                  </span>
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