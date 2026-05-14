import anarkaliImg from "../assets/category/anarkali1.png";
import angrakhaImg from "../assets/category/angrakha.png";
import kurtiImg from "../assets/category/kurti.png";
import palazzoImg from "../assets/category/palazzo.png";
import sareeImg from "../assets/category/saree.png";
import sherwaniImg from "../assets/category/sherwani.png";
import shirtImg from "../assets/category/shirt.png";
import suitImg from "../assets/category/suit.png";

import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const CategorySection = ({ showAll = false }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { name: "Anarkali", img: anarkaliImg },
    { name: "Angrakha", img: angrakhaImg },
    { name: "Kurti", img: kurtiImg },
    { name: "Palazzo", img: palazzoImg },
    { name: "Saree", img: sareeImg },
    { name: "Sherwani suit", img: sherwaniImg },
    { name: "Shirt", img: shirtImg },
    { name: "Suit Piece", img: suitImg },
  ];

  const displayCategories = showAll ? categories : categories.slice(0, 8);

  // ✅ CTRL + CLICK SUPPORT
  const handleNav = (e, path) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    // ✅ MOBILE spacing increased, DESKTOP unchanged
    <div className="mt-24 md:mt-24 py-12 bg-gray-900 flex justify-center">

      {/* SEO */}
      <Helmet key={location.pathname}>
        <title>Shop by Category - Velvyana</title>
        <meta
          name="description"
          content="Browse Velvyana categories like Anarkali, Kurti, Saree and more premium chikankari collections."
        />
        <meta
          name="keywords"
          content="velvyana categories, anarkali, kurti, saree, chikankari, ethnic wear"
        />
      </Helmet>

      <div className="w-full max-w-7xl px-6 
      bg-white/5 backdrop-blur-lg border border-white/10 
      rounded-3xl shadow-xl p-8 text-center">

        {/* HEADING */}
        <h2 className="text-3xl font-semibold mb-2 text-white">
          Shop by Category
        </h2>

        <p className="text-gray-400 mb-8 text-sm">
          Discover our curated collections
        </p>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

          {displayCategories.map((item, index) => (
            <a
              key={index}
              href={`/products?category=${item.name}`}
              onClick={(e) =>
                handleNav(e, `/products?category=${item.name}`)
              }
              className="flex flex-col items-center group"
            >

              {/* IMAGE */}
              <div className="w-full max-w-[220px] aspect-[9/16] 
              rounded-[120px] overflow-hidden shadow-md 
              group-hover:scale-105 transition">

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT */}
              <p className="mt-4 text-white font-medium 
              group-hover:text-pink-500 transition text-center">
                {item.name}
              </p>

            </a>
          ))}

        </div>

      </div>

    </div>
  );
};

export default CategorySection;