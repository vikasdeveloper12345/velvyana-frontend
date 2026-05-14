import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";
import semiImg from "../assets/category/semi.png";

const orders = [
  {
    id: "ORD123456789",
    date: "15 Jan 2024",
    total: "₹16,998",
    status: "Delivered",
    items: [
      {
        id: 101, // ✅ important
        name: "pure chanderi panel work",
        price: "₹3,999",
        img: semiImg,
      },
    ],
  },
  {
    id: "ORD987654321",
    date: "10 Jan 2024",
    total: "₹2,499",
    status: "Shipped",
    items: [
      {
        id: 102, // ✅ important
        name: "pure chanderi panel work",
        price: "₹2,499",
        img: semiImg,
      },
    ],
  },
];

const Orders = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyAgain = (order) => {
    order.items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: parseInt(item.price.replace("₹", "").replace(",", "")),
        img: item.img,
        qty: 1,
      });
    });

    navigate("/cart");
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200 px-4 sm:px-6 lg:px-8 py-6">

      {/* ✅ SEO */}
      <Helmet>
        <title>My Orders - Velvyana</title>
        <meta
          name="description"
          content="View your orders and purchase history at Velvyana."
        />
        <meta
          name="keywords"
          content="orders, velvyana orders, purchase history"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          My Orders
        </h1>

        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0f172a] rounded-xl border border-gray-800 p-5 shadow-md"
            >

              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">

                <div className="text-sm text-gray-400 space-y-1">
                  <p><b>Order ID:</b> {order.id}</p>
                  <p><b>Date:</b> {order.date}</p>
                  <p><b>Total:</b> {order.total}</p>
                </div>

                <div className="flex items-center gap-3">

                  <span className={`px-3 py-1 text-xs rounded-full
                    ${
                      order.status === "Delivered"
                        ? "bg-green-900/30 text-green-400"
                        : order.status === "Shipped"
                        ? "bg-purple-900/30 text-purple-400"
                        : "bg-blue-900/30 text-blue-400"
                    }`}
                  >
                    {order.status}
                  </span>

                  {/* ✅ VIEW DETAILS (CTRL + CLICK FIX) */}
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

              {/* ITEMS */}
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

              {/* BUTTONS */}
              <div className="flex gap-3 mt-4 flex-wrap">

                <button
                  onClick={() => navigate(`/track-order/${order.id}`)}
                  className="border border-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                >
                  Track Order
                </button>

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