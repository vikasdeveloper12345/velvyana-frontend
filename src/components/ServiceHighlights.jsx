import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const ServiceHighlights = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      desc: "On orders above ₹499",
      path: "/orders",
    },
    {
      icon: <FaUndo />,
      title: "Easy Returns",
      desc: "7 days return policy",
      path: "/orders",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      desc: "100% secure checkout",
      path: "/payment",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Always here to help",
      path: "/contact",
    },
  ];

  // ✅ NAVIGATION FIX (CTRL + CLICK SUPPORT)
  const handleNav = (e, path) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen 
    bg-[#020617] py-10 mt-12"
    >

      {/* ✅ SEO ADDED */}
      <Helmet key={location.pathname}>
        <title>Our Services - Velvyana</title>

        <meta
          name="description"
          content="Explore Velvyana services including free shipping, easy returns, secure payments, and 24/7 support."
        />

        <meta
          name="keywords"
          content="velvyana services, free shipping, easy returns, secure payment, customer support"
        />
      </Helmet>

      {/* CENTER CONTENT */}
      <div
        className="max-w-7xl mx-auto px-6 
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >

        {services.map((item, index) => (
          <a
            key={index}
            href={item.path}
            onClick={(e) => handleNav(e, item.path)}
            className="flex items-center gap-10 p-5 rounded-xl cursor-pointer
            bg-[#0f172a] border border-gray-800
            hover:border-pink-500 transition"
          >

            {/* ICON */}
            <div className="bg-pink-500 text-white p-3 rounded-lg text-xl">
              {item.icon}
            </div>

            {/* TEXT */}
            <div>
              <h3 className="font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.desc}
              </p>
            </div>

          </a>
        ))}

      </div>
    </div>
  );
};

export default ServiceHighlights;