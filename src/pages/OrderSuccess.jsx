import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { API_URL, getAuthHeaders } from "../utils/api";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [verifying, setVerifying] = useState(
    () => searchParams.get("provider") === "phonepe" && !!searchParams.get("orderId")
  );
  const [verifyError, setVerifyError] = useState("");
  const [orderMeta, setOrderMeta] = useState({
    orderId: location.state?.orderId || searchParams.get("orderId") || "",
    paymentMethod: location.state?.paymentMethod || "Online",
    total: location.state?.total,
  });

  const provider = searchParams.get("provider");

  useEffect(() => {
    const orderId = searchParams.get("orderId") || location.state?.orderId;

    if (provider !== "phonepe" || !orderId) {
      if (searchParams.get("status") === "success" || location.state?.orderId) {
        clearCart();
        sessionStorage.removeItem("checkout");
        sessionStorage.removeItem("pendingOrder");
      }
      return;
    }

    setVerifying(true);
    fetch(`${API_URL}/api/payment/verify/${orderId}`, {
      headers: getAuthHeaders(),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Verification failed");
        return data;
      })
      .then((data) => {
        if (data.status === "success") {
          setOrderMeta({
            orderId: data.orderId,
            paymentMethod: data.paymentMethod,
            total: data.total,
          });
          clearCart();
          sessionStorage.removeItem("checkout");
          sessionStorage.removeItem("pendingOrder");
          return;
        }

        if (data.status === "failed") {
          setVerifyError(data.message || "Payment failed");
          return;
        }

        setVerifyError(data.message || "Payment is still processing. Check My Orders shortly.");
      })
      .catch((err) => setVerifyError(err.message || "Could not verify payment"))
      .finally(() => setVerifying(false));
  }, [provider, searchParams, location.state, clearCart]);

  const { orderId, paymentMethod, total } = orderMeta;

  return (
    <div className="bg-[#020617] min-h-screen flex items-center justify-center p-4 text-gray-200">
      <SeoHead title="Order Success - Velvyana" robots="noindex, nofollow" />

      <div className="bg-[#0f172a] rounded-xl shadow-xl border border-gray-800 p-6 md:p-10 max-w-2xl w-full text-center">
        {verifying ? (
          <>
            <div className="w-14 h-14 mx-auto border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h1 className="text-2xl font-bold text-white mb-2">Verifying Payment...</h1>
            <p className="text-gray-400">Please wait while we confirm your PhonePe payment.</p>
          </>
        ) : verifyError ? (
          <>
            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-red-900/20 mb-6">
              <span className="text-red-400 text-3xl">!</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Payment Not Completed</h1>
            <p className="text-gray-400 mb-6">{verifyError}</p>
            <button
              type="button"
              onClick={() => navigate("/orders")}
              className="px-6 py-3 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
            >
              Go to My Orders
            </button>
          </>
        ) : (
          <>
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-900/20 mb-6">
          <span className="text-green-400 text-3xl">✔</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-400 mb-6">Thank you for your purchase. Your order has been confirmed.</p>

        <div className="bg-[#020617] border border-gray-800 rounded-lg p-4 md:p-6 text-left mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold text-white">{orderId || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-semibold text-white">{new Date().toDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Payment Method</p>
              <p className="font-semibold text-white">{paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-semibold text-white">
                {total ? `₹${Number(total).toLocaleString("en-IN")}` : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 text-blue-300 p-4 rounded-lg mb-6 text-sm">
          Expected delivery within 5-7 business days
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => {
              if (orderId) {
                navigate(`/order/${orderId}`, { replace: true });
              } else {
                navigate("/orders", { replace: true });
              }
            }}
            className="px-6 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            View Order Details
          </button>

          <button
            type="button"
            onClick={() => navigate("/products", { replace: true })}
            className="px-6 py-3 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Continue Shopping
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Order confirmation has been sent to your email and mobile number
        </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
