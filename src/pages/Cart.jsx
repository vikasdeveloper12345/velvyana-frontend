import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import SeoHead from "../components/SeoHead";
import { FaTrash } from "react-icons/fa";
import { getProductPath } from "../utils/api";
import { useStoreSettings } from "../hooks/useStoreSettings";
import { calculateCartPricing } from "../utils/cartPricing";
import PriceSummary from "../components/PriceSummary";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, deleteFromCart } = useCart();
  const { settings } = useStoreSettings();

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(cart.map((item) => item.id));
  }, [cart]);

  const toggleItem = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const selectedItems = cart.filter((item) =>
    selected.includes(item.id)
  );

  const pricing = calculateCartPricing(selectedItems, settings);

  return (
    <div className="bg-[#020617] min-h-screen text-white">

      <SeoHead
        title="My Cart - Velvyana"
        description="View your selected chikankari products in cart at Velvyana and proceed to checkout."
        keywords="cart, velvyana cart, chikankari products, checkout"
        robots="noindex, nofollow"
      />

      <div className="p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 bg-gray-900 border border-gray-700 rounded-xl shadow">

            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="font-semibold text-lg">
                My Cart ({pricing.totalItems} items)
              </h2>

              <button
                onClick={() => setSelected([])}
                className="text-pink-400 text-sm hover:underline"
              >
                Deselect All
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                Your cart is empty
              </div>
            ) : (
              cart.map((item) => {
                const isSelected = selected.includes(item.id);
                const productPath = getProductPath(item);

                const goToProduct = (e) => {
                  if (!(e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    navigate(productPath, { state: item });
                  }
                };

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleItem(item.id)}
                      className="accent-pink-500 mt-1"
                    />

                    <button
                      type="button"
                      onClick={goToProduct}
                      className="shrink-0 p-0 border-0 bg-transparent cursor-pointer"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </button>

                    <div className="flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={goToProduct}
                        className="font-medium text-left hover:text-pink-400 transition bg-transparent border-0 p-0 cursor-pointer text-white"
                      >
                        {item.name}
                      </button>

                      <p className="text-sm text-gray-400">Velvyana Exclusive</p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-semibold">₹{item.price}</span>
                        {item.original_price && item.original_price > item.price && (
                          <span className="line-through text-gray-500 text-sm">
                            ₹{item.original_price}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="min-w-[24px] text-center">{item.qty}</span>

                        <button
                          type="button"
                          onClick={() => addToCart({ ...item, qty: 1 })}
                          className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteFromCart(item.id)}
                          className="ml-4 p-2 text-gray-400 hover:text-red-400 transition"
                          aria-label="Remove from cart"
                        >
                          <FaTrash className="text-base" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl shadow p-4 h-fit">

            <h2 className="font-semibold mb-4">Price Details</h2>
            <PriceSummary pricing={pricing} />

            <a
              href="/checkout"
              onClick={(e) => {
                if (!(e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  navigate("/checkout");
                }
              }}
            >
              <button className="w-full mt-4 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
                Place Order ({pricing.totalItems} items)
              </button>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;