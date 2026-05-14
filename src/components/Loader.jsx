import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

const Loader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#020617]/90 backdrop-blur-sm z-50">

      {/* ✅ FIX: removed title so it doesn't override page title */}
      <Helmet key={location.pathname + "loader"}>
        <meta
          name="description"
          content="Loading content, please wait..."
        />
      </Helmet>

      {/* SPINNER */}
      <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>

      {/* TEXT */}
      <p className="mt-4 text-sm text-gray-300 tracking-wide">
        Loading Velvyana...
      </p>

      {/* LINK */}
      <a
        href="/"
        onClick={(e) => {
          if (!(e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigate("/");
          }
        }}
        className="mt-6 text-pink-500 text-sm hover:underline"
      >
        Go to Home
      </a>

    </div>
  );
};

export default Loader;