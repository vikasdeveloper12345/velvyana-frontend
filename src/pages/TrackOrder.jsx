import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import semiImg from "../assets/category/semi.png";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const TrackOrder = () => {
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-10">

      {/* ✅ SEO + DYNAMIC TITLE FIX */}
      <Helmet key={location.pathname + showDetails}>
        <title>
          {showDetails
            ? "Order Details - Velvyana"
            : "Track Order - Velvyana"}
        </title>
        <meta
          name="description"
          content="Track your order status, delivery progress and order details at Velvyana."
        />
      </Helmet>

      <div className="max-w-2xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
          <div className="flex justify-between items-center">

            <h2 className="font-semibold text-lg">
              {showDetails ? "Order Details" : "Track Your Order"}
            </h2>

            {/* ✅ CTRL CLICK SUPPORT */}
            <a
              href="/orders"
              onClick={(e) => {
                if (!(e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  setShowDetails(!showDetails);
                }
              }}
            >
              <button
                className="text-sm px-3 py-1 rounded-md 
                bg-gray-700 text-white 
                hover:bg-pink-500 transition"
              >
                {showDetails ? "Track Order" : "View All"}
              </button>
            </a>

          </div>

          <div className="grid grid-cols-3 mt-4 text-sm">
            <div>
              <p className="text-gray-400">Order ID</p>
              <p className="font-medium">ORD987654321</p>
            </div>

            <div>
              <p className="text-gray-400">Tracking ID</p>
              <p className="font-medium">TRK456789012</p>
            </div>

            <div>
              <p className="text-gray-400">Expected Delivery</p>
              <p className="font-medium">16 January</p>
            </div>
          </div>
        </div>

        {!showDetails ? (
          <>
            {/* STATUS */}
            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold mb-4">Order Status</h3>

              <div className="space-y-6">
                {[
                  { title: "Order Confirmed", active: true },
                  { title: "Shipped", active: true },
                  { title: "Out for Delivery", active: false },
                  { title: "Delivered", active: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">

                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full
                      ${
                        step.active
                          ? "bg-green-500 text-white"
                          : "bg-gray-700"
                      }`}
                    >
                      {step.active && <FaCheckCircle size={14} />}
                    </div>

                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-gray-400">
                        {step.active ? "Completed" : "Pending"}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* DETAILS */}
            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow space-y-4">

              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">Order Date</p>
                  <p className="font-medium">10 January 2024</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Total Amount</p>
                  <p className="font-medium">₹2,499</p>
                </div>
              </div>

              <div className="bg-blue-900 p-3 rounded">
                <p className="text-sm">
                  <b>Tracking ID:</b> TRK456789012
                </p>
              </div>

            </div>

            {/* ITEM */}
            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold mb-3">Items Ordered</h3>

              {/* ✅ NEW TAB SUPPORT */}
              <a href="/product/101" className="flex items-center gap-3">
                <img
                  src={semiImg}
                  className="w-14 h-14 rounded object-cover"
                />
                <div>
                  <p>Designer Anarkali Kurti</p>
                  <p className="text-sm text-gray-400">
                    Fabric: Chanderi · Size: M · Qty: 1
                  </p>
                  <p className="text-sm font-medium">₹2,499</p>
                </div>
              </a>

            </div>

            {/* ADDRESS */}
            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Delivery Address</h3>
              <p className="text-sm text-gray-400">
                Velvyana Studio, Dewa Road, Chinhat, Lucknow - 226028
              </p>
            </div>

            {/* PAYMENT */}
            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <div className="flex justify-between text-sm">
                <span>Payment Method</span>
                <span>UPI</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="text-green-400">Paid</span>
              </div>
            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;