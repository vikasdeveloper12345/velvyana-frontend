import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { API_URL, getAuthHeaders, getProductPath } from "../utils/api";
import AddressFormFields, { emptyAddressForm } from "../components/AddressFormFields";
import Toast from "../components/Toast";
import { useStoreSettings } from "../hooks/useStoreSettings";
import { calculateCartPricing } from "../utils/cartPricing";
import PriceSummary from "../components/PriceSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, replaceCart } = useCart();
  const hydratedRef = useRef(false);
  const { settings } = useStoreSettings();
  const pricing = calculateCartPricing(cart, settings);
  const seo = useSeo("checkout", {
    title: "Checkout - Velvyana",
    description: "Complete your order securely at Velvyana checkout.",
    robots: "noindex, nofollow",
  });

  // Restore Buy Now cart only after page refresh (route state is lost on reload).
  useEffect(() => {
    if (hydratedRef.current || cart.length > 0) return;

    try {
      const saved = JSON.parse(sessionStorage.getItem("directCheckout") || "null");
      if (!saved?.product?.id) return;

      hydratedRef.current = true;
      replaceCart([{ ...saved.product, qty: saved.qty || 1 }]);
      sessionStorage.removeItem("directCheckout");
    } catch {
      // ignore invalid session data
    }
  }, [cart.length, replaceCart]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState(emptyAddressForm);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const loadAddresses = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) return Promise.resolve();

    return fetch(`${API_URL}/api/addresses`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        const list = data.data || [];
        setAddresses(list);
        if (list.length) {
          const defaultAddr = list.find((a) => a.default) || list[0];
          setSelectedAddress(defaultAddr.id);
        }
      });
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      setToast("Please login to save addresses");
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    if (!newAddress.name || !newAddress.phone || !newAddress.address1 || !newAddress.city || !newAddress.state) {
      setToast("Please fill all required address fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/addresses`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newAddress),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await loadAddresses();
      setShowForm(false);
      setNewAddress(emptyAddressForm);
    } catch (err) {
      setToast(err.message);
    } finally {
      setSaving(false);
    }
  };

  const goToPayment = () => {
    const addr = addresses.find((a) => a.id === selectedAddress);
    if (!addr) {
      setToast("Please select a delivery address");
      return;
    }
    sessionStorage.setItem("checkout", JSON.stringify({ address: addr }));
    navigate("/payment");
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200">
      <SeoHead {...seo} />

      <div className="p-4 md:p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0f172a] rounded-xl shadow border border-gray-800">
              <div className="flex justify-between p-6 border-b border-gray-800">
                <h2 className="font-semibold text-white">Delivery Address</h2>
                <button type="button" onClick={() => setShowForm(true)} className="text-pink-500 text-sm">
                  + Add New Address
                </button>
              </div>

              <div className="p-4 space-y-4">
                {addresses.length === 0 && (
                  <p className="text-gray-400 text-sm">
                    No saved addresses. Add one to continue — same addresses appear in your Address Book.
                  </p>
                )}

                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block border rounded-lg p-4 cursor-pointer transition ${
                      selectedAddress === addr.id
                        ? "border-pink-500 bg-gray-800"
                        : "border-gray-700 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex gap-3">
                      <input
                        type="radio"
                        name="delivery-address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1 accent-pink-500"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white">{addr.name}</span>
                          <span className="text-xs bg-gray-800 px-2 rounded">{addr.type}</span>
                          {addr.default && (
                            <span className="text-xs bg-green-900/30 text-green-400 px-2 rounded">Default</span>
                          )}
                        </div>
                        <p className="text-sm mt-2 text-gray-400">{addr.address}</p>
                        <p className="text-sm text-gray-400">{addr.city}</p>
                        <p className="text-sm text-gray-400">Phone: {addr.phone}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-xl shadow border border-gray-800">
              <div className="p-4 border-b border-gray-800 font-semibold text-white">
                Order Items ({pricing.totalItems})
              </div>
              {cart.length === 0 ? (
                <div className="p-4 text-sm text-gray-400">
                  Your cart is empty. Select a product first to see price details.
                </div>
              ) : (
                cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border-b border-gray-800">
                  <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => navigate(getProductPath(item), { state: item })}
                      className="text-white text-left hover:text-pink-400 bg-transparent border-0 p-0 cursor-pointer"
                    >
                      {item.name}
                    </button>
                    <div className="mt-2 font-semibold text-white">₹{item.price}</div>
                  </div>
                  <div className="text-sm text-gray-400">Qty: {item.qty}</div>
                </div>
              ))
              )}
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-xl shadow border border-gray-800 p-4 h-fit">
            <h2 className="font-semibold mb-4 text-white">Price Details</h2>
            {cart.length === 0 ? <div className="text-sm text-gray-400">—</div> : <PriceSummary pricing={pricing} />}
            <button
              type="button"
              onClick={goToPayment}
              disabled={cart.length === 0}
              className={`w-full mt-4 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] w-full max-w-lg rounded-xl p-6 text-white max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
            <AddressFormFields form={newAddress} onChange={setNewAddress} />
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={handleSave} disabled={saving} className="bg-pink-500 text-white px-6 py-2 rounded disabled:opacity-60">
                {saving ? "Saving..." : "Save Address"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-gray-600 px-6 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
};

export default Checkout;
