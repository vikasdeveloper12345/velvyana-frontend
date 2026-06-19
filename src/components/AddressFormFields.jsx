export const emptyAddressForm = {
  name: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  type: "HOME",
  isDefault: false,
};

const AddressFormFields = ({ form, onChange, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    <div className="flex gap-2">
      {["HOME", "OFFICE", "OTHER"].map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange({ ...form, type })}
          className={`flex-1 py-2 text-xs rounded border transition ${
            form.type === type
              ? "border-pink-500 bg-pink-500/20 text-pink-400"
              : "border-gray-700 text-gray-400 hover:border-gray-500"
          }`}
        >
          {type}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input
        placeholder="Full Name *"
        value={form.name}
        onChange={(e) => onChange({ ...form, name: e.target.value })}
        className="border border-gray-700 bg-[#020617] p-2 rounded text-white"
        required
      />
      <input
        placeholder="Phone *"
        value={form.phone}
        onChange={(e) => onChange({ ...form, phone: e.target.value })}
        className="border border-gray-700 bg-[#020617] p-2 rounded text-white"
        required
      />
    </div>

    <input
      placeholder="Address Line 1 *"
      value={form.address1}
      onChange={(e) => onChange({ ...form, address1: e.target.value })}
      className="w-full border border-gray-700 bg-[#020617] p-2 rounded text-white"
      required
    />

    <input
      placeholder="Address Line 2"
      value={form.address2}
      onChange={(e) => onChange({ ...form, address2: e.target.value })}
      className="w-full border border-gray-700 bg-[#020617] p-2 rounded text-white"
    />

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <input
        placeholder="City *"
        value={form.city}
        onChange={(e) => onChange({ ...form, city: e.target.value })}
        className="border border-gray-700 bg-[#020617] p-2 rounded text-white"
        required
      />
      <input
        placeholder="State *"
        value={form.state}
        onChange={(e) => onChange({ ...form, state: e.target.value })}
        className="border border-gray-700 bg-[#020617] p-2 rounded text-white"
        required
      />
      <input
        placeholder="Pincode"
        value={form.pincode}
        onChange={(e) => onChange({ ...form, pincode: e.target.value })}
        className="border border-gray-700 bg-[#020617] p-2 rounded text-white"
      />
    </div>

    <label className="flex items-center gap-2 text-sm text-gray-400">
      <input
        type="checkbox"
        checked={form.isDefault}
        onChange={(e) => onChange({ ...form, isDefault: e.target.checked })}
        className="accent-pink-500"
      />
      Set as default address
    </label>
  </div>
);

export default AddressFormFields;
