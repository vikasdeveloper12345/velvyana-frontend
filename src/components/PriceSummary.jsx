const PriceSummary = ({ pricing, paymentMethod = null }) => {
  if (!pricing) return null;

  const showFreeDelivery =
    pricing.freeDelivery || (paymentMethod !== "COD" && pricing.shipping === 0);

  return (
    <div className="space-y-2 text-sm text-gray-300">
      <div className="flex justify-between">
        <span>Price ({pricing.totalItems} items)</span>
        <span>₹{pricing.subtotal.toLocaleString("en-IN")}</span>
      </div>

      {pricing.discount > 0 && (
        <div className="flex justify-between text-green-400">
          <span>Discount</span>
          <span>-₹{pricing.discount.toLocaleString("en-IN")}</span>
        </div>
      )}

      <div className="flex justify-between text-green-400">
        <span>Delivery Charges</span>
        <span>
          {showFreeDelivery && paymentMethod !== "COD"
            ? "FREE"
            : pricing.shipping > 0
              ? `₹${pricing.shipping.toLocaleString("en-IN")}`
              : "FREE"}
        </span>
      </div>

      {paymentMethod === "COD" && pricing.shipping > 0 && (
        <p className="text-xs text-gray-500">COD handling charge applied</p>
      )}

      <hr className="my-4 border-gray-700" />

      <div className="flex justify-between font-semibold text-white">
        <span>Total Amount</span>
        <span>₹{pricing.total.toLocaleString("en-IN")}</span>
      </div>

      {pricing.discount > 0 && (
        <div className="bg-green-900/40 text-green-300 text-sm p-2 mt-3 rounded">
          You will save ₹{pricing.discount.toLocaleString("en-IN")} on this order
        </div>
      )}
    </div>
  );
};

export default PriceSummary;
