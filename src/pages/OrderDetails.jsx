import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import { API_URL, getAuthHeaders } from "../utils/api";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/orders/${id}`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setOrder(data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
          <p className="mb-4">Order not found.</p>
          <button type="button" onClick={() => navigate("/orders")} className="text-pink-500 underline">
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const address = order.address;
  const canRetryPayment = order.canRetryPayment;

  const handleRetryPayment = async () => {
    try {
      const payRes = await fetch(`${API_URL}/api/payment/initiate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderId: order.id }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.message);
      window.location.href = payData.redirectUrl;
    } catch (err) {
      alert(err.message || "Could not start payment");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 px-4 sm:px-6 lg:px-8 py-8">
      <SeoHead title={`Order #${order.id} - Velvyana`} robots="noindex, nofollow" />

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Order Details</h1>
          <button type="button" onClick={() => navigate("/orders")} className="text-pink-500 text-sm hover:underline">
            ← Back
          </button>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 shadow-md space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Order ID</p>
              <p className="text-white font-semibold">{order.id}</p>
              <p className="text-gray-400 text-sm mt-4">Payment</p>
              <p className="text-white font-semibold">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Order Date</p>
              <p className="text-white font-semibold">{order.date}</p>
              <p className="text-gray-400 text-sm mt-3">Total Price</p>
              <p className="text-white font-bold text-lg">{order.total}</p>
              <p className="text-gray-400 text-sm mt-4">Status</p>
              <p
                className={`font-semibold ${
                  order.status === "Payment Failed"
                    ? "text-red-400"
                    : order.status === "Awaiting Payment"
                      ? "text-amber-400"
                      : "text-green-400"
                }`}
              >
                {order.status}
              </p>
              {canRetryPayment && (
                <button
                  type="button"
                  onClick={handleRetryPayment}
                  className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md text-sm hover:bg-pink-600"
                >
                  Complete Payment
                </button>
              )}
            </div>
          </div>

          {address && (
            <>
              <div className="border-t border-gray-800" />
              <div>
                <h2 className="text-white font-semibold mb-2">Delivery Address</h2>
                <p className="text-sm text-gray-400">{address.name} · {address.type}</p>
                <p className="text-sm text-gray-400">{address.address}</p>
                <p className="text-sm text-gray-400">{address.city}</p>
                <p className="text-sm text-gray-400">Phone: {address.phone}</p>
              </div>
            </>
          )}

          <div className="border-t border-gray-800" />

          <div>
            <h2 className="text-white font-semibold mb-4">Ordered Items ({order.items?.length || 0})</h2>
            <div className="space-y-4">
              {order.items?.map((item, i) => (
                <div key={i} className="grid grid-cols-[60px_1fr_120px] items-center gap-4 p-2 rounded">
                  <img src={item.img} alt={item.name} className="w-14 h-14 rounded object-cover" />
                  <div>
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <p className="text-gray-400 text-xs">Qty: {item.qty || 1}</p>
                  </div>
                  <p className="text-white font-semibold">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
