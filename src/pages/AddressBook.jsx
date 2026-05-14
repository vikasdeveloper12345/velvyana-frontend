import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AddressBook = () => {

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "HOME",
      name: "John Doe",
      address: "123, Green Valley Apartment, Sector 18",
      city: "Gurugram",
      phone: "9876543210",
      isDefault: true,
    },
    {
      id: 2,
      type: "OFFICE",
      name: "John Doe",
      address: "456, Business Park, Tower A",
      city: "Gurugram",
      phone: "9876543210",
      isDefault: false,
    },
  ]);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);

  const setDefault = (id) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );
  };

  const confirmDelete = () => {
    setAddresses((prev) => prev.filter((a) => a.id !== deleteId));
    setShowDelete(false);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    setAddresses((prev) =>
      prev.map((a) => (a.id === editing.id ? editing : a))
    );

    setEditing(null);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200">
      <Helmet>
  <title>My Addresses - Velvyana</title>

  <meta
    name="description"
    content="Manage your saved addresses on Velvyana. Add, edit, or remove delivery addresses easily."
   />

    <meta
    name="keywords"
    content="velvyana address book, saved addresses, manage address, delivery address, user account"
   />

    <meta name="robots" content="noindex, nofollow" />
  </Helmet>

     

      <div className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Saved Addresses
            </h2>

            <button
              onClick={() =>
                setEditing({
                  id: Date.now(),
                  type: "HOME",
                  name: "",
                  address: "",
                  city: "",
                  phone: "",
                  isDefault: false,
                })
              }
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              + Add New Address
            </button>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">

            {addresses.map((item) => (
              <div
                key={item.id}
                className="bg-[#0f172a] p-5 rounded-xl shadow-xl border border-gray-800"
              >

                <div className="flex justify-between items-center mb-3">

                  <div className="flex gap-2">
                    <span className="bg-gray-800 px-2 py-1 text-xs rounded">
                      {item.type}
                    </span>

                    {item.isDefault && (
                      <span className="bg-green-900/30 text-green-400 px-2 py-1 text-xs rounded">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 text-gray-400">
                    <FaEdit
                      className="cursor-pointer hover:text-pink-500"
                      onClick={() => setEditing(item)}
                    />
                    <FaTrash
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => {
                        setDeleteId(item.id);
                        setShowDelete(true);
                      }}
                    />
                  </div>

                </div>

                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.address}</p>
                <p className="text-sm text-gray-400">{item.city}</p>
                <p className="text-sm text-gray-400">
                  Phone: {item.phone}
                </p>

                {!item.isDefault && (
                  <button
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

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-[#0f172a] p-6 rounded-xl w-[90%] max-w-[300px]">

            <h3 className="text-lg font-semibold mb-2 text-white">
              Delete Address?
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => setShowDelete(false)}
                className="border border-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <form
            onSubmit={saveEdit}
            className="bg-[#0f172a] p-6 rounded-xl w-[90%] max-w-[350px] space-y-3"
          >

            <input
              placeholder="Name"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="w-full border border-gray-700 bg-[#020617] p-2 rounded text-white"
            />

            <input
              placeholder="Address"
              value={editing.address}
              onChange={(e) =>
                setEditing({ ...editing, address: e.target.value })
              }
              className="w-full border border-gray-700 bg-[#020617] p-2 rounded text-white"
            />

            <input
              placeholder="City"
              value={editing.city}
              onChange={(e) =>
                setEditing({ ...editing, city: e.target.value })
              }
              className="w-full border border-gray-700 bg-[#020617] p-2 rounded text-white"
            />

            <input
              placeholder="Phone"
              value={editing.phone}
              onChange={(e) =>
                setEditing({ ...editing, phone: e.target.value })
              }
              className="w-full border border-gray-700 bg-[#020617] p-2 rounded text-white"
            />

            <div className="flex gap-3">
              <button className="bg-pink-500 text-white px-4 py-2 rounded">
                Save
              </button>

              <button
                type="button"
                onClick={() => setEditing(null)}
                className="border border-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};

export default AddressBook;