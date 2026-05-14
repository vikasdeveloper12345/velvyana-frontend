import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar"; // ✅ ADD

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* 🔥 CATEGORY BAR ADD */}
      <div className="bg-[#0f172a] border-b border-gray-800">
        <CategoryBar />
      </div>

      {/* CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default MainLayout;