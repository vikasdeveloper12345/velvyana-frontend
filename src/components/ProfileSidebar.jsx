import {
  FaUser,
  FaBox,
  FaHeart,
  FaMapMarkerAlt,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ✅ CTRL + CLICK SUPPORT
  const handleNav = (e, path) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <div
      className="bg-[#0f172a]
      w-full md:w-72 p-6 rounded-xl shadow-xl 
      text-gray-200 space-y-4 border border-gray-800"
    >

      {/* USER */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
          J
        </div>
        <div>
          <p className="font-semibold text-white">John Doe</p>
          <p className="text-sm text-gray-400">
            velvyana@support.com
          </p>
        </div>
      </div>

      <hr className="border-gray-800" />

      {/* MENU */}
      <div className="space-y-2 text-gray-300">

        <div className="flex items-center gap-3 cursor-pointer bg-pink-900/30 text-pink-400 p-2 rounded-lg">
          <FaUser /> My Profile
        </div>

        {/* ✅ ORDERS */}
        <a
          href="/orders"
          onClick={(e) => handleNav(e, "/orders")}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#020617] p-2 rounded-lg transition"
        >
          <FaBox /> My Orders
        </a>

        {/* ✅ WISHLIST */}
        <a
          href="/wishlist"
          onClick={(e) => handleNav(e, "/wishlist")}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#020617] p-2 rounded-lg transition"
        >
          <FaHeart /> Wishlist
        </a>

        {/* ✅ ADDRESS */}
        <a
          href="/address"
          onClick={(e) => handleNav(e, "/address")}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#020617] p-2 rounded-lg transition"
        >
          <FaMapMarkerAlt /> Address Book
        </a>

        {/* ✅ SUPPORT */}
        <a
          href="/contact"
          onClick={(e) => handleNav(e, "/contact")}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#020617] p-2 rounded-lg transition"
        >
          <FaHeadset /> Support
        </a>

        {/*  LOGOUT */}
        <div
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 cursor-pointer text-pink-500 hover:bg-[#020617] p-2 rounded-lg transition"
        >
          <FaSignOutAlt /> Logout
        </div>

      </div>
    </div>
  );
};

export default ProfileSidebar;