import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import anarkali1Img from "../assets/category/anarkali1.png";
import semiImg from "../assets/category/semi.png";
import suitImg from "../assets/category/suit.png";
import kurtiImg from "../assets/category/kurti.png";

const products = [
  {
    id: 1,
    name: "Floral Yellow Multi Coloured Noor Organza Resham Chikankari Kurta Set",
    brand: "VELVYANA",
    img: anarkali1Img,
    soldOut: true,
  },
  {
    id: 2,
    name: "Pastel Green Mulmul Pearl White Chikankari Ready to Wear Kurta Set",
    brand: "VELVYANA",
    img: semiImg,
    soldOut: true,
  },
  {
    id: 3,
    name: "Sea Green Mulmul Pearl White Chikankari Ready to Wear Kurta Set",
    brand: "VELVYANA",
    img: suitImg,
    soldOut: true,
  },
  {
    id: 4,
    name: "Pink Mulmul Pearl White Chikankari Ready to Wear Kurta Set",
    brand: "VELVYANA",
    img: kurtiImg,
    soldOut: false,
  },

  ...Array(20).fill().map((_, i) => ({
    id: i + 5,
    name: "Chikankari Kurta Set " + (i + 5),
    brand: "VELVYANA",
    img: i % 2 === 0 ? anarkali1Img : semiImg,
    soldOut: i % 2 === 0,
  })),
];

const NewArrival = () => {
  const scrollRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ wishlist
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const isInWishlist = (id) => {
    return wishlist.some((item) => String(item.id) === String(id));
  };

  const handleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("user"));

    //  LOGIN REQUIRED
       if (!user) {
      navigate("/login", { state: { from: location } });
      return;
      }

    let updated = [...wishlist];

    const exists = updated.find(
      (item) => String(item.id) === String(product.id)
    );

    if (exists) {
      updated = updated.filter(
        (item) => String(item.id) !== String(product.id)
      );
    } else {
      updated.push(product);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // nav
  const handleNav = (e, path, state = null) => {
    if (!(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigate(path, state ? { state } : {});
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-gray-900 px-4 md:px-10 py-10">

      <Helmet key={location.pathname}>
    <title>New Arrivals - Velvyana</title>

    <meta
      name="description"
      content="Shop the latest new arrivals at Velvyana. Discover trending chikankari kurtas, ethnic wear, and premium styles for every occasion."
    />

    <meta
      name="keywords"
      content="velvyana new arrivals, chikankari kurta, ethnic wear, latest fashion india, kurti, saree, designer suits"
    />
  </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-white">
          NEW ARRIVAL
        </h2>

        <a
          href="/products"
          onClick={(e) => handleNav(e, "/products")}
          className="text-sm underline hover:text-pink-500 text-gray-300"
        >
          View all
        </a>
      </div>

      <div className="relative">

        {/* LEFT  */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
          bg-gray-800 hover:bg-gray-700 text-white shadow-lg 
          w-14 h-14 rounded-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* RIGHT  */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
          bg-gray-800 hover:bg-gray-700 text-white shadow-lg 
          w-14 h-14 rounded-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div ref={scrollRef} className="flex gap-5 overflow-x-hidden scroll-smooth">

          {products.map((item) => (
            <a
              key={item.id}
              href={`/product/${item.id}`}
              onClick={(e) =>
                handleNav(e, `/product/${item.id}`, item)
              }
              className="min-w-[220px] md:min-w-[260px] group"
            >

              <div className="relative overflow-hidden">

                {/* ❤️ ONLY ADDITION */}
                <div
                  className="absolute top-3 left-3 z-50"
                  onClick={(e) => handleWishlist(e, item)}
                >
                  <FaHeart
                    className={`text-lg cursor-pointer ${
                      isInWishlist(item.id)
                        ? "text-pink-500"
                        : "text-white"
                    }`}
                  />
                </div>

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-[260px] md:h-[350px] object-cover 
                  transition duration-500 group-hover:scale-105"
                />

                {item.soldOut && (
                  <span className="absolute bottom-3 left-3 
                  bg-black text-white text-xs px-3 py-1 rounded-full">
                    Sold out
                  </span>
                )}

              </div>

              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-300 line-clamp-2">
                  {item.name}
                </p>

                <p className="text-xs text-gray-400 tracking-wide">
                  {item.brand}
                </p>
              </div>

            </a>
          ))}

        </div>

      </div>
    </div>
  );
};

export default NewArrival;