import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SeoHead from "../components/SeoHead";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, getAuthHeaders } from "../utils/api";

const statusSteps = (rawStatus) => {
  const status = (rawStatus || "confirmed").toLowerCase();
  return [
    {
      title: "Order Confirmed",
      active: ["pending", "confirmed", "shipped", "delivered"].includes(status),
    },
    {
      title: "Shipped",
      active: ["shipped", "delivered"].includes(status),
    },
    {
      title: "Out for Delivery",
      active: status === "delivered",
    },
    {
      title: "Delivered",
      active: status === "delivered",
    },
  ];
};

const formatExpectedDelivery = (createdAt) => {
  if (!createdAt) return "—";
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long" });
};

const paymentStatusLabel = (status) => {
  const map = {
    cod: "Cash on Delivery",
    paid: "Paid",
    pending: "Pending",
    failed: "Failed",
  };
  return map[status?.toLowerCase()] || status;
};

const TrackOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/api/orders/${id}`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setOrder(data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Order not found.</p>
          <button type="button" onClick={() => navigate("/orders")} className="text-pink-500 underline">
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const steps = statusSteps(order.rawStatus || order.status);
  const trackingId = `TRK${String(order.id).replace(/\D/g, "").slice(-9)}`;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-10">
      <SeoHead
        title={`${showDetails ? "Order Details" : "Track Order"} - Velvyana`}
        description="Track your Velvyana order status and delivery progress."
        robots="noindex, nofollow"
      />

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">
              {showDetails ? "Order Details" : "Track Your Order"}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-pink-500 transition"
              >
                {showDetails ? "Track Order" : "Order Details"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="text-sm px-3 py-1 rounded-md border border-gray-600 text-gray-300 hover:border-pink-500 transition"
              >
                All Orders
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-sm">
            <div>
              <p className="text-gray-400">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-400">Tracking ID</p>
              <p className="font-medium">{trackingId}</p>
            </div>
            <div>
              <p className="text-gray-400">Expected Delivery</p>
              <p className="font-medium">{formatExpectedDelivery(order.createdAt)}</p>
            </div>
          </div>
        </div>

        {!showDetails ? (
          <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold mb-4">Order Status</h3>
            <p className="text-sm text-pink-400 mb-4">Current: {order.status}</p>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      step.active ? "bg-green-500 text-white" : "bg-gray-700"
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
        ) : (
          <>
            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">Order Date</p>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Amount</p>
                  <p className="font-medium">{order.total}</p>
                </div>
              </div>
              <div className="bg-blue-900/30 border border-blue-800 p-3 rounded">
                <p className="text-sm">
                  <b>Tracking ID:</b> {trackingId}
                </p>
              </div>
            </div>

            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold mb-3">Items Ordered</h3>
              <div className="space-y-4">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.img && (
                      <img src={item.img} alt={item.name} className="w-14 h-14 rounded object-cover" />
                    )}
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.qty || 1}</p>
                      <p className="text-sm font-medium">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {order.address && (
              <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Delivery Address</h3>
                <p className="text-sm text-gray-400">{order.address.name} · {order.address.type}</p>
                <p className="text-sm text-gray-400">{order.address.address}</p>
                <p className="text-sm text-gray-400">{order.address.city}</p>
                <p className="text-sm text-gray-400">Phone: {order.address.phone}</p>
              </div>
            )}

            <div className="bg-[#0f172a] border border-gray-800 p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="text-green-400">{paymentStatusLabel(order.paymentStatus)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
