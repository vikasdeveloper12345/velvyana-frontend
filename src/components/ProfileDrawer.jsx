import {
  FaUser,
  FaBox,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

const ProfileDrawer = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleNav = (e, path) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate(path);
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* SAFE META (no title) */}
      <Helmet>
        <meta
          name="description"
          content="User account menu with profile, orders, wishlist and address options on Velvyana."
        />
        <meta
          name="keywords"
          content="velvyana profile, user menu, wishlist, orders, account"
        />
      </Helmet>

      <div
        className="absolute right-4 top-16 w-64 
        bg-[#020617] border border-gray-800 
        shadow-2xl rounded-xl z-50"
      >
        <div className="p-4 space-y-4 text-gray-200">

          <a href="/profile" onClick={(e) => handleNav(e, "/profile")}
            className="flex items-center gap-3 cursor-pointer hover:text-pink-500 transition">
            <FaUser className="text-gray-300" />
            <span>My Profile</span>
          </a>

          <a href="/orders" onClick={(e) => handleNav(e, "/orders")}
            className="flex items-center gap-3 cursor-pointer hover:text-pink-500 transition">
            <FaBox className="text-gray-300" />
            <span>My Orders</span>
          </a>

          <a href="/wishlist" onClick={(e) => handleNav(e, "/wishlist")}
            className="flex items-center gap-3 cursor-pointer hover:text-pink-500 transition">
            <FaHeart className="text-gray-300" />
            <span>Wishlist</span>
          </a>

          <a href="/address" onClick={(e) => handleNav(e, "/address")}
            className="flex items-center gap-3 cursor-pointer hover:text-pink-500 transition">
            <FaMapMarkerAlt className="text-gray-300" />
            <span>Addresses</span>
          </a>

          <hr className="border-gray-800" />

          <div
            onClick={() => {
              logout();
              navigate("/login");
              setOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer text-pink-500 hover:text-pink-600 transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;