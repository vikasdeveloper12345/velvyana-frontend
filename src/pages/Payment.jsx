import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";

const Payment = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();

  const [method, setMethod] = useState("UPI");

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

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200">

      {/* ✅ SEO */}
      <Helmet>
        <title>Payment - Velvyana</title>
        <meta name="description" content="Complete your payment securely at Velvyana." />
        <meta name="keywords" content="payment, checkout, velvyana payment" />
      </Helmet>

      <div className="p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 bg-[#0f172a] rounded-xl shadow border border-gray-800 p-6">

            <h2 className="font-semibold text-lg mb-4 text-white">
              Choose Payment Method
            </h2>

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

            <div className="flex justify-between font-semibold text-white mb-4">
              <span>Total</span>
              <span>
                ₹{method === "COD" ? totalPrice + 40 : totalPrice}
              </span>
            </div>

            {/* ✅ FIXED BUTTON */}
            <button
              disabled={!isValid}
              onClick={() => {
                if (!isValid) return;
                navigate("/order-success");
              }}
              className={`w-full py-3 rounded-lg transition
                ${
                  isValid
                    ? "bg-pink-500 hover:bg-pink-600 text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
            >
              {method === "COD" ? "Place Order" : "Pay Now"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;