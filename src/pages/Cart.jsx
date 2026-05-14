import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, deleteFromCart } = useCart();

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

  const totalItems = selectedItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const totalPrice = selectedItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const discount = 800;
  const finalAmount = totalPrice - discount;

  return (
    <div className="bg-[#020617] min-h-screen text-white">

      {/* ✅ SEO */}
      <Helmet>
        <title>My Cart - Velvyana</title>
        <meta
          name="description"
          content="View your selected chikankari products in cart at Velvyana and proceed to checkout."
        />
        <meta
          name="keywords"
          content="cart, velvyana cart, chikankari products, checkout"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 bg-gray-900 border border-gray-700 rounded-xl shadow">

            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="font-semibold text-lg">
                My Cart ({totalItems} items)
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

                return (
                  <a
                    key={item.id}
                    href={`/product/${item.id}`}
                    onClick={(e) => {
                      if (!(e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        navigate(`/product/${item.id}`, { state: item });
                      }
                    }}
                    className="block"
                  >
                    <div className="flex gap-4 p-4 border-b border-gray-700 hover:bg-gray-800 transition cursor-pointer">

                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => toggleItem(item.id)}
                        className="accent-pink-500 mt-1"
                      />

                      {/* Image */}
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>

                        <p className="text-sm text-gray-400">
                          Velvyana Exclusive
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-semibold">
                            ₹{item.price}
                          </span>

                          <span className="line-through text-gray-500 text-sm">
                            ₹{item.price + 1000}
                          </span>

                          <span className="text-green-400 text-sm">
                            20% off
                          </span>
                        </div>

                        {/* Buttons */}
                        <div
                          className="flex items-center gap-2 mt-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-3 py-1 border border-gray-600 rounded"
                          >
                            -
                          </button>

                          <span>{item.qty}</span>

                          <button
                            onClick={() => addToCart(item)}
                            className="px-3 py-1 border border-gray-600 rounded"
                          >
                            +
                          </button>

                          <button
                            onClick={() => deleteFromCart(item.id)}
                            className="ml-4 text-gray-400 hover:text-red-400"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl shadow p-4 h-fit">

            <h2 className="font-semibold mb-4">Price Details</h2>

            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Price ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between text-green-400">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <div className="flex justify-between text-green-400">
                <span>Delivery Charges</span>
                <span>FREE</span>
              </div>
            </div>

            <hr className="my-4 border-gray-700" />

            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{finalAmount}</span>
            </div>

            <div className="bg-green-900 text-green-300 text-sm p-2 mt-3 rounded">
              You will save ₹{discount} on this order
            </div>

            {/* Checkout button */}
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
                Place Order ({totalItems} items)
              </button>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;