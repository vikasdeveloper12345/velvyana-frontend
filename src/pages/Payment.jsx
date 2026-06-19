import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { API_URL, getAuthHeaders } from "../utils/api";
import { useStoreSettings } from "../hooks/useStoreSettings";
import { calculateCartPricing } from "../utils/cartPricing";
import PriceSummary from "../components/PriceSummary";

const Payment = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { settings } = useStoreSettings();
  const seo = useSeo("payment", {
    title: "Payment - Velvyana",
    description: "Complete your payment securely at Velvyana.",
    keywords: "payment, checkout, velvyana payment",
  });

  const [method, setMethod] = useState("UPI");
  const pricing = calculateCartPricing(cart, settings, method);

  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // ✅ VALIDATION
  const isValid =
    (method === "UPI" && upi.trim() !== "") ||
    (method === "Card" &&
      cardNumber &&
      cardName &&
      expiry &&
      cvv) ||
    (method === "Net Banking" && bank) ||
    method === "COD";

  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!isValid || processing) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      navigate("/login", { state: { from: { pathname: "/payment" } } });
      return;
    }

    const checkoutData = JSON.parse(sessionStorage.getItem("checkout") || "null");
    if (!checkoutData?.address) {
      navigate("/checkout");
      return;
    }

    setProcessing(true);

    try {
      const orderRes = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          items: cart,
          address: checkoutData.address,
          paymentMethod: method,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message);

      const orderTotal = orderData.data.total;

      if (method === "COD") {
        sessionStorage.removeItem("checkout");
        clearCart();
        navigate("/order-success", {
          state: {
            orderId: orderData.data.orderId,
            total: orderTotal,
            paymentMethod: "COD",
          },
        });
        return;
      }

      const payRes = await fetch(`${API_URL}/api/payment/initiate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderId: orderData.data.orderId }),
      });

      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.message);

      sessionStorage.setItem("pendingOrder", orderData.data.orderId);
      sessionStorage.removeItem("checkout");
      sessionStorage.removeItem("directCheckout");
      clearCart();
      window.location.href = payData.redirectUrl;
    } catch (err) {
      alert(err.message || "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200">

      <SeoHead {...seo} />

      <div className="p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 bg-[#0f172a] rounded-xl shadow border border-gray-800 p-6">

            <h2 className="font-semibold text-lg mb-4 text-white">
              Choose Payment Method
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              UPI, Card and Net Banking are processed securely via PhonePe.
            </p>

            {/* METHODS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

              {["UPI", "Card", "Net Banking", "COD"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`border rounded-lg p-4 text-sm font-medium transition
                  ${
                    method === m
                      ? "border-pink-500 bg-pink-900/20 text-white"
                      : "border-gray-700 text-gray-300"
                  }`}
                >
                  {m === "COD" ? "Cash on Delivery" : m}
                </button>
              ))}

            </div>

            {/* UPI */}
            {method === "UPI" && (
              <>
                <p className="text-sm mb-2 text-white">Enter UPI ID</p>

                <input
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                  placeholder="example@upi"
                  className="w-full bg-[#020617] text-white border border-gray-700 p-3 rounded-lg mb-4"
                />
              </>
            )}

            {/* CARD */}
            {method === "Card" && (
              <div className="space-y-4">
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#020617] border border-gray-700 p-3 rounded text-white"
                />

                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name on card"
                  className="w-full bg-[#020617] border border-gray-700 p-3 rounded text-white"
                />

                <div className="flex gap-3">
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-1/2 bg-[#020617] border border-gray-700 p-3 rounded text-white"
                  />
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-1/2 bg-[#020617] border border-gray-700 p-3 rounded text-white"
                  />
                </div>
              </div>
            )}

            {/* NET BANKING */}
            {method === "Net Banking" && (
              <>
                <p className="mb-3 text-sm text-white">Select Your Bank</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBank(b)}
                      className={`border rounded p-3 text-white
                      ${bank === b ? "border-pink-500 bg-pink-900/20" : "border-gray-700"}
                      `}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* COD */}
            {method === "COD" && (
              <div className="bg-green-900/20 text-green-300 p-4 rounded">
                Cash on Delivery selected
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="bg-[#0f172a] rounded-xl shadow border border-gray-800 p-6 h-fit">

            <h2 className="font-semibold mb-4 text-white">
              Order Summary
            </h2>

            <div className="flex gap-2 overflow-x-auto mb-4">
              {cart.map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  className="w-12 h-12 object-cover rounded"
                />
              ))}
            </div>

            <PriceSummary pricing={pricing} paymentMethod={method} />

            <button
              disabled={!isValid || processing}
              onClick={handlePayment}
              className={`w-full py-3 rounded-lg transition
                ${
                  isValid && !processing
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
            >
              {processing ? "Processing..." : method === "COD" ? "Place Order" : "Pay Now"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;