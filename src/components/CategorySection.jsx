import anarkaliImg from "../assets/category/anarkali1.png";
import angrakhaImg from "../assets/category/angrakha.png";
import kurtiImg from "../assets/category/kurti.png";
import palazzoImg from "../assets/category/palazzo.png";
import sareeImg from "../assets/category/saree.png";
import sherwaniImg from "../assets/category/sherwani.png";
import shirtImg from "../assets/category/shirt.png";
import suitImg from "../assets/category/suit.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getCategoryPath, nameToSlug, resolveImageUrl } from "../utils/api";

const FALLBACK_IMAGES = {
  Anarkali: anarkaliImg,
  Angrakha: angrakhaImg,
  Kurti: kurtiImg,
  Palazzo: palazzoImg,
  Saree: sareeImg,
  "Sherwani suit": sherwaniImg,
  Shirt: shirtImg,
  "Suit Piece": suitImg,
};

const defaultSection = {
  heading: "Shop by Category",
  subtitle: "Discover our curated collections",
};

const CategorySection = ({ showAll = false }) => {
  const navigate = useNavigate();
  const [section, setSection] = useState(defaultSection);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/home`)
      .then((res) => res.json())
      .then((data) => {
        const catSection = data.data?.category_section;
        if (catSection) {
          setSection({
            heading: catSection.heading || defaultSection.heading,
            subtitle: catSection.subtitle || defaultSection.subtitle,
          });
          const items = (catSection.categories || []).map((cat) => ({
            name: cat.name,
            img: resolveImageUrl(cat.image) || FALLBACK_IMAGES[cat.name] || anarkaliImg,
          }));
          if (items.length) setCategories(items);
        }
      });
  }, []);

  const fallbackCategories = Object.entries(FALLBACK_IMAGES).map(([name, img]) => ({
    name,
    img,
  }));

  const displayList = categories.length ? categories : fallbackCategories;
  const displayCategories = showAll ? displayList : displayList.slice(0, 8);

  const handleNav = (e, path) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <div className="mt-24 md:mt-24 py-12 bg-gray-900 flex justify-center">

      <div className="w-full max-w-7xl px-6 
      bg-white/5 backdrop-blur-lg border border-white/10 
      rounded-3xl shadow-xl p-8 text-center">

        <h2 className="text-3xl font-semibold mb-2 text-white">
          {section.heading}
        </h2>

        <p className="text-gray-400 mb-8 text-sm">
          {section.subtitle}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

          {displayCategories.map((item, index) => (
            <a
              key={index}
              href={getCategoryPath(nameToSlug(item.name))}
              onClick={(e) =>
                handleNav(e, getCategoryPath(nameToSlug(item.name)))
              }
              className="flex flex-col items-center group"
            >

              <div className="w-full max-w-[220px] aspect-[9/16] 
              rounded-[120px] overflow-hidden shadow-md 
              group-hover:scale-105 transition">

                <img
                  src={item.img}
                  alt={item.name}
                  onError={(e) => {
                    const fallback = FALLBACK_IMAGES[item.name];
                    if (fallback && e.target.src !== fallback) {
                      e.target.src = fallback;
                    }
                  }}
                  className="sharp-img w-full h-full object-cover"
                />
              </div>

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
