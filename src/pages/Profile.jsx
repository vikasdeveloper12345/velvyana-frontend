import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import ProfileSidebar from "../components/ProfileSidebar";

const Profile = () => {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  const handleSave = () => {
    setEditing(false);
    // here you can also save to backend/localStorage
  };

  return (
    <div className="bg-[#020617] min-h-screen text-gray-200">

      <SeoHead
        title="My Profile - Velvyana"
        description="Manage your Velvyana account profile, settings, and preferences."
        keywords="profile, account, velvyana user profile"
        robots="noindex, nofollow"
      />

      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">

          <ProfileSidebar />

          <div className="flex-1 space-y-6">

            {/* PERSONAL INFO */}
            <div className="bg-[#0f172a] p-6 rounded-xl shadow-xl border border-gray-800">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Personal Information
                </h2>

                <button
                  onClick={() => (editing ? handleSave() : setEditing(true))}
                  className="border border-pink-500 text-pink-500 
                  px-4 py-1 rounded-md hover:bg-pink-500 hover:text-white transition"
                >
                  {editing ? "Save" : "Edit Profile"}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-sm">

                <div>
                  <p className="text-gray-400">Full Name</p>
                  {editing ? (
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-700 bg-[#020617] p-1 rounded w-full text-white"
                    />
                  ) : (
                    <p className="font-medium text-white">{name}</p>
                  )}
                </div>

                <div>
                  <p className="text-gray-400">Email Address</p>
                  {editing ? (
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-700 bg-[#020617] p-1 rounded w-full text-white"
                    />
                  ) : (
                    <p className="font-medium text-white">{email}</p>
                  )}
                </div>

                <div>
                  <p className="text-gray-400">Phone Number</p>
                  <p className="font-medium text-white">+91 9876543210</p>
                </div>

                <div>
                  <p className="text-gray-400">Gender</p>
                  <p className="font-medium text-white">Male</p>
                </div>

                <div>
                  <p className="text-gray-400">Date of Birth</p>
                  <p className="font-medium text-white">15 January 1990</p>
                </div>

              </div>
            </div>

            {/* SETTINGS */}
            <div className="bg-[#0f172a] p-6 rounded-xl shadow-xl space-y-4 border border-gray-800">

              <h2 className="text-lg font-semibold text-white">
                Account Settings
              </h2>

              {/* CHANGE PASSWORD (CTRL + CLICK FIX) */}
              <a
                href="/change-password"
                onClick={(e) => {
                  if (!(e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    alert("Open Change Password Modal");
                  }
                }}
              >
                <div className="flex justify-between items-center border border-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-800">

                  <div>
                    <p className="font-medium text-white">Change Password</p>
                    <p className="text-sm text-gray-400">
                      Update your password regularly
                    </p>
                  </div>

                  <span className="border border-gray-600 px-4 py-1 rounded-md">
                    Change
                  </span>

                </div>
              </a>

              {/* EMAIL NOTIF */}
              <div className="flex justify-between items-center border border-gray-800 p-4 rounded-lg">
                <div>
                  <p className="font-medium text-white">Email Notifications</p>
                  <p className="text-sm text-gray-400">
                    Receive updates about your orders
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={() => setEmailNotif(!emailNotif)}
                />
              </div>

              {/* SMS NOTIF */}
              <div className="flex justify-between items-center border border-gray-800 p-4 rounded-lg">
                <div>
                  <p className="font-medium text-white">SMS Notifications</p>
                  <p className="text-sm text-gray-400">
                    Get order updates via SMS
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={() => setSmsNotif(!smsNotif)}
                />
              </div>

              {/* DELETE ACCOUNT */}
              <div className="flex justify-between items-center border border-pink-500/30 p-4 rounded-lg bg-pink-900/20">
                <div>
                  <p className="font-medium text-pink-400">Delete Account</p>
                  <p className="text-sm text-gray-400">
                    Permanently delete your account
                  </p>
                </div>

                <button
                  onClick={() => alert("Account Deleted")}
                  className="bg-pink-500 text-white px-4 py-1 rounded-md hover:bg-pink-600 transition"
                >
                  Delete
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;