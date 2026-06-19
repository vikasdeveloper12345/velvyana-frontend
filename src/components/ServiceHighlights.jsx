import { FaTruck, FaUndo, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";
import { defaultServices } from "../constants/homeDefaults";

const ICON_MAP = {
  truck: <FaTruck />,
  undo: <FaUndo />,
  shield: <FaShieldAlt />,
  headset: <FaHeadset />,
};

const ServiceHighlights = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    fetch(`${API_URL}/api/home`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.services?.items?.length) {
          setServices(data.data.services.items);
        }
      });
  }, []);

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

            <div className="bg-pink-500 text-white p-3 rounded-lg text-xl">
              {ICON_MAP[item.icon] || <FaTruck />}
            </div>

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
