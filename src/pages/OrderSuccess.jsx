import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020617] min-h-screen flex items-center justify-center p-4 text-gray-200">

      {/* ✅ SEO */}
      <Helmet>
        <title>Order Success - Velvyana</title>
        <meta
          name="description"
          content="Your order has been placed successfully at Velvyana. Thank you for shopping with us."
        />
        <meta
          name="keywords"
          content="order success, velvyana order placed"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="bg-[#0f172a] rounded-xl shadow-xl border border-gray-800 p-6 md:p-10 max-w-2xl w-full text-center">

        {/* SUCCESS ICON */}
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-900/20 mb-6">
          <span className="text-green-400 text-3xl">✔</span>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-400 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* ORDER DETAILS */}
        <div className="bg-[#020617] border border-gray-800 rounded-lg p-4 md:p-6 text-left mb-6">

          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold text-white">
                ORD{Math.floor(Math.random() * 1000000)}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-semibold text-white">
                {new Date().toDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Payment Method</p>
              <p className="font-semibold text-white">
                UPI
              </p>
            </div>

            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-semibold text-white">
                ₹16,998
              </p>
            </div>

          </div>

        </div>

        {/* DELIVERY INFO */}
        <div className="bg-blue-900/20 text-blue-300 p-4 rounded-lg mb-6 text-sm">
          🚚 Expected delivery by 29 April
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">

          {/* ✅ VIEW ORDERS (CTRL + CLICK FIX) */}
          <a
            href="/orders"
            onClick={(e) => {
              if (!(e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                navigate("/orders");
              }
            }}
          >
            <button className="px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition w-full">
              View Order Details
            </button>
          </a>

          {/* ✅ CONTINUE SHOPPING (CTRL + CLICK FIX) */}
          <a
            href="/products"
            onClick={(e) => {
              if (!(e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                navigate("/products");
              }
            }}
          >
            <button className="px-6 py-3 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition w-full">
              Continue Shopping
            </button>
          </a>

        </div>

        {/* FOOTER */}
        <p className="text-gray-500 text-sm mt-6">
          Order confirmation has been sent to your email and mobile number
        </p>

      </div>
    </div>
  );
};

export default OrderSuccess;