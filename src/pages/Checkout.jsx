import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(0);

  const [addresses, setAddresses] = useState([
    {
      name: "John Doe",
      type: "HOME",
      default: true,
      address: "123, Green Valley Apartment, Near City Mall, Sector 18",
      city: "Gurugram, Haryana - 122001",
      phone: "+91 9876543210",
    },
    {
      name: "John Doe",
      type: "OFFICE",
      default: false,
      address: "456, Business Park, Tower A, 5th Floor",
      city: "Gurugram, Haryana - 122002",
      phone: "+91 9876543210",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    type: "HOME",
  });

  const handleSave = () => {
    setAddresses([
      ...addresses,
      {
        name: newAddress.name,
        type: newAddress.type,
        address: newAddress.address1 + " " + newAddress.address2,
        city: newAddress.city + ", " + newAddress.state,
        phone: newAddress.phone,
      },
    ]);
    setShowForm(false);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200">

      <Helmet>
   <title>Checkout - Velvyana</title>

   <meta
    name="description"
    content="Complete your order securely at Velvyana checkout."
  />

   <meta
    name="keywords"
    content="checkout, velvyana, payment, order"
   />

   <meta name="robots" content="noindex, nofollow" />
    </Helmet>

      <div className="p-4 md:p-6">

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">

            {/* ADDRESS */}
            <div className="bg-[#0f172a] rounded-xl shadow border border-gray-800">

              <div className="flex justify-between p-6 border-b border-gray-800">
                <h2 className="font-semibold text-white">
                  Delivery Address
                </h2>

                <button
                  onClick={() => setShowForm(true)}
                  className="text-pink-500 text-sm"
                >
                  + Add New Address
                </button>
              </div>

              <div className="p-4 space-y-4">

                {addresses.map((addr, index) => (
                  <label
                    key={index}
                    className={`block border rounded-lg p-4 cursor-pointer transition
                    ${
                      selectedAddress === index
                        ? "border-pink-500 bg-gray-800"
                        : "border-gray-700 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex gap-3">

                      <input
                        type="radio"
                        checked={selectedAddress === index}
                        onChange={() => setSelectedAddress(index)}
                        className="mt-1 accent-pink-500"
                      />

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white">
                            {addr.name}
                          </span>

                          <span className="text-xs bg-gray-800 px-2 rounded">
                            {addr.type}
                          </span>

                          {addr.default && (
                            <span className="text-xs bg-green-900/30 text-green-400 px-2 rounded">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-sm mt-2 text-gray-400">
                          {addr.address}
                        </p>

                        <p className="text-sm text-gray-400">
                          {addr.city}
                        </p>

                        <p className="text-sm text-gray-400">
                          Phone: {addr.phone}
                        </p>
                      </div>

                    </div>
                  </label>
                ))}

              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="bg-[#0f172a] rounded-xl shadow border border-gray-800">

              <div className="p-4 border-b border-gray-800 font-semibold text-white">
                Order Items ({cart.length})
              </div>

              {cart.map((item) => (
  <a
    key={item.id}
    href={`/product/${item.id}`}
    onClick={(e) => {
      if (!(e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        navigate(`/product/${item.id}`, { state: item });
      }
    }}
    className="block"
  >
    <div className="flex gap-4 p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer">

      <img
        src={item.img}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="text-white">{item.name}</h3>
        <p className="text-sm text-gray-500">Color: Default</p>
        <div className="mt-2 font-semibold text-white">
          ₹{item.price}
        </div>
      </div>

      <div className="text-sm text-gray-400">
        Qty: {item.qty}
      </div>

    </div>
     </a>
    ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="bg-[#0f172a] rounded-xl shadow border border-gray-800 p-4 h-fit">

            <h2 className="font-semibold mb-4 text-white">
              Price Details
            </h2>

            {/* 🔥 MINI PRODUCT PREVIEW */}
            <div className="flex gap-2 overflow-x-auto mb-4">
              {cart.map((item) => (
                <img
                  key={item.id}
                  src={item.img}
                  className="w-24 h-50
                   object-cover rounded"
                />
              ))}
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Price ({cart.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={() => navigate("/payment")}
              className="w-full mt-4 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600"
            >
              Continue to Payment
            </button>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#0f172a] w-full max-w-2xl rounded-xl p-6 text-white">

            <h2 className="text-xl font-semibold mb-6">
              Add New Address
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input placeholder="Full Name" className="border border-gray-700 bg-[#020617] p-2 rounded"
                onChange={(e)=>setNewAddress({...newAddress,name:e.target.value})} />

              <input placeholder="Phone" className="border border-gray-700 bg-[#020617] p-2 rounded"
                onChange={(e)=>setNewAddress({...newAddress,phone:e.target.value})} />

              <input placeholder="Address Line 1" className="border border-gray-700 bg-[#020617] p-2 rounded col-span-2"
                onChange={(e)=>setNewAddress({...newAddress,address1:e.target.value})} />

              <input placeholder="Address Line 2" className="border border-gray-700 bg-[#020617] p-2 rounded col-span-2"
                onChange={(e)=>setNewAddress({...newAddress,address2:e.target.value})} />

              <input placeholder="City" className="border border-gray-700 bg-[#020617] p-2 rounded"
                onChange={(e)=>setNewAddress({...newAddress,city:e.target.value})} />

              <input placeholder="State" className="border border-gray-700 bg-[#020617] p-2 rounded"
                onChange={(e)=>setNewAddress({...newAddress,state:e.target.value})} />

            </div>

            <div className="flex gap-4 mt-6">

              <button
                onClick={handleSave}
                className="bg-pink-500 text-white px-6 py-2 rounded"
              >
                Save Address
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="border border-gray-600 px-6 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Checkout;