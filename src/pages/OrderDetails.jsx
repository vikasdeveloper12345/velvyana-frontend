import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const orderFromState = location.state;

  // ✅ SAFE STORAGE PARSE
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem("orders")) || [];
  } catch {
    orders = [];
  }

  const orderFromStorage = orders.find((o) => o.id === id);
  const order = orderFromState || orderFromStorage;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        No Order Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 px-4 sm:px-6 lg:px-8 py-8">

      {/* ✅ IMPROVED SEO */}
      <Helmet>
        <title>Order #{order.id} - Velvyana</title>

        <meta
          name="description"
          content={`View details of your order ${order.id} at Velvyana.`}
        />

        <meta
          name="keywords"
          content="order details, velvyana order, purchase history"
        />

        {/* private page */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Order Details
          </h1>

          {/* BACK BUTTON */}
          <a
            href="/orders"
            onClick={(e) => {
              if (!(e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                navigate("/orders");
              }
            }}
            className="text-pink-500 text-sm hover:underline"
          >
            ← Back
          </a>
        </div>

        {/* CARD */}
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 shadow-md">

          {/* INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-400 text-sm">Order ID</p>
              <p className="text-white font-semibold">{order.id}</p>

              <p className="text-gray-400 text-sm mt-4">Payment</p>
              <p className="text-white font-semibold">UPI</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Order Date</p>
              <p className="text-white font-semibold">{order.date}</p>

              <p className="text-gray-400 text-sm mt-3">Total Price</p>
              <p className="text-white font-bold text-lg">{order.total}</p>

              <p className="text-gray-400 text-sm mt-4">Status</p>
              <p className="text-green-400 font-semibold">
                {order.status}
              </p>
            </div>

          </div>

          <div className="border-t border-gray-800 my-6"></div>

          {/* ITEMS */}
          <h2 className="text-white font-semibold mb-4">
            Ordered Items
          </h2>

          <div className="space-y-4">

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
                className="block w-full"
              >
                <div className="grid grid-cols-[60px_1fr_120px] items-center gap-4 hover:bg-gray-800 p-2 rounded cursor-pointer w-full">

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
                      Qty: {item.qty || 1}
                    </p>
                  </div>

                  <div className="flex justify-start">
                    <p className="text-white font-semibold">
                      {item.price}
                    </p>
                  </div>

                </div>
              </a>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;