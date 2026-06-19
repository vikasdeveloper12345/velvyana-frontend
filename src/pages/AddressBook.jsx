import { useState, useEffect, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import SeoHead from "../components/SeoHead";
import { API_URL, getAuthHeaders } from "../utils/api";
import AddressFormFields, { emptyAddressForm } from "../components/AddressFormFields";
import Toast from "../components/Toast";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  const loadAddresses = useCallback(() => {
    fetch(`${API_URL}/api/addresses`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => setAddresses(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const openNew = () => {
    setEditing({ ...emptyAddressForm, id: null });
  };

  const openEdit = (item) => {
    setEditing({
      id: item.id,
      name: item.name,
      phone: item.phone,
      address1: item.address_line1 || item.address?.split(",")[0] || "",
      address2: item.address_line2 || "",
      city: item.city?.split(",")[0]?.trim() || item.city || "",
      state: item.state || "",
      pincode: item.pincode || "",
      type: item.type || "HOME",
      isDefault: !!item.default,
    });
  };

  const setDefault = async (id) => {
    await fetch(`${API_URL}/api/addresses/${id}/default`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });
    loadAddresses();
  };

  const confirmDelete = async () => {
    await fetch(`${API_URL}/api/addresses/${deleteId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    setShowDelete(false);
    setDeleteId(null);
    loadAddresses();
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    if (!editing.name || !editing.phone || !editing.address1 || !editing.city || !editing.state) {
      setToast("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: editing.name,
        phone: editing.phone,
        address1: editing.address1,
        address2: editing.address2,
        city: editing.city,
        state: editing.state,
        pincode: editing.pincode,
        type: editing.type,
        isDefault: editing.isDefault,
      };

      const url = editing.id
        ? `${API_URL}/api/addresses/${editing.id}`
        : `${API_URL}/api/addresses`;
      const res = await fetch(url, {
        method: editing.id ? "PUT" : "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setEditing(null);
      loadAddresses();
    } catch (err) {
      setToast(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200">
      <SeoHead
        title="My Addresses - Velvyana"
        description="Manage your saved addresses on Velvyana."
        robots="noindex, nofollow"
      />

      <div className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-white">Saved Addresses</h2>
            <button
              type="button"
              onClick={openNew}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              + Add New Address
            </button>
          </div>

          {loading && <p className="text-gray-400">Loading addresses...</p>}

          {!loading && addresses.length === 0 && (
            <p className="text-gray-400 mb-4">No saved addresses yet. Add your first address.</p>
          )}

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((item) => (
              <div key={item.id} className="bg-[#0f172a] p-5 rounded-xl shadow-xl border border-gray-800">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2">
                    <span className="bg-gray-800 px-2 py-1 text-xs rounded">{item.type}</span>
                    {item.default && (
                      <span className="bg-green-900/30 text-green-400 px-2 py-1 text-xs rounded">Default</span>
                    )}
                  </div>
                  <div className="flex gap-3 text-gray-400">
                    <FaEdit className="cursor-pointer hover:text-pink-500" onClick={() => openEdit(item)} />
                    <FaTrash
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => { setDeleteId(item.id); setShowDelete(true); }}
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.address}</p>
                <p className="text-sm text-gray-400">{item.city}</p>
                <p className="text-sm text-gray-400">Phone: {item.phone}</p>

                {!item.default && (
                  <button
                    type="button"
                    onClick={() => setDefault(item.id)}
                    className="mt-3 w-full border border-pink-500 text-pink-500 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] p-6 rounded-xl w-[90%] max-w-[300px]">
            <h3 className="text-lg font-semibold mb-2 text-white">Delete Address?</h3>
            <p className="text-sm text-gray-400 mb-4">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button type="button" onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              <button type="button" onClick={() => setShowDelete(false)} className="border border-gray-600 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <form onSubmit={saveAddress} className="bg-[#0f172a] p-6 rounded-xl w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white">
              {editing.id ? "Edit Address" : "Add New Address"}
            </h3>
            <AddressFormFields form={editing} onChange={setEditing} />
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-60">
                {saving ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="border border-gray-600 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
};

export default AddressBook;
