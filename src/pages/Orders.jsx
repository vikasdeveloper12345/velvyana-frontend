import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { API_URL, getAuthHeaders } from "../utils/api";

const Orders = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const seo = useSeo("orders", {
    title: "My Orders - Velvyana",
    description: "View your orders and purchase history at Velvyana.",
    keywords: "orders, velvyana orders, purchase history",
    robots: "noindex, nofollow",
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/orders`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRetryPayment = async (orderId) => {
    try {
      const payRes = await fetch(`${API_URL}/api/payment/initiate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderId }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.message);
      window.location.href = payData.redirectUrl;
    } catch (err) {
      alert(err.message || "Could not start payment");
    }
  };

  const statusClass = (status) => {
    if (status === "Delivered") return "bg-green-900/30 text-green-400";
    if (status === "Shipped") return "bg-purple-900/30 text-purple-400";
    if (status === "Awaiting Payment") return "bg-amber-900/30 text-amber-400";
    if (status === "Payment Failed") return "bg-red-900/30 text-red-400";
    if (status === "Confirmed") return "bg-green-900/30 text-green-400";
    return "bg-blue-900/30 text-blue-400";
  };

  const handleBuyAgain = (order) => {
    order.items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: parseInt(String(item.price).replace(/[₹,]/g, "")),
        img: item.img,
        qty: 1,
      });
    });

    navigate("/cart");
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200 px-4 sm:px-6 lg:px-8 py-6">

      <SeoHead {...seo} />

      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          My Orders
        </h1>

        {loading && (
          <p className="text-gray-400">Loading orders...</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-gray-400">No orders yet.</p>
        )}

        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0f172a] rounded-xl border border-gray-800 p-5 shadow-md"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">

                <div className="text-sm text-gray-400 space-y-1">
                  <p><b>Order ID:</b> {order.id}</p>
                  <p><b>Date:</b> {order.date}</p>
                  <p><b>Total:</b> {order.total}</p>
                </div>

                <div className="flex items-center gap-3">

                  <span className={`px-3 py-1 text-xs rounded-full ${statusClass(order.status)}`}>
                    {order.status}
                  </span>

                  <a
                    href={`/order/${order.id}`}
                    onClick={(e) => {
                      if (!(e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        navigate(`/order/${order.id}`, { state: order });
                      }
                    }}
                    className="text-pink-500 text-sm hover:underline"
                  >
                    View Details
                  </a>

                </div>

              </div>

              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <a
                    key={i}
                    href={`/product/${item.id}`}
                    onClick={(e) => {
                      if (!(e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        navigate(`/product/${item.id}`, { state: item });
                      }
                    }}
                    className="flex items-center gap-4 block"
                  >

                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded object-cover"
                    />

                    <div>
                      <p className="text-white text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.price}
                      </p>
                    </div>

                  </a>
                ))}
              </div>

              <div className="flex gap-3 mt-4 flex-wrap">

                {order.canRetryPayment && (
                  <button
                    onClick={() => handleRetryPayment(order.id)}
                    className="bg-pink-500 text-white px-4 py-2 rounded-md text-sm hover:bg-pink-600"
                  >
                    Complete Payment
                  </button>
                )}

                {!order.canRetryPayment && (
                  <button
                    onClick={() => navigate(`/track-order/${order.id}`)}
                    className="border border-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                  >
                    Track Order
                  </button>
                )}

                <button
                  onClick={() => handleBuyAgain(order)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-md text-sm hover:bg-pink-600"
                >
                  Buy Again
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Orders;
