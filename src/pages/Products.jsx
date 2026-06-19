import { useState, useEffect, useMemo } from "react";

import { useNavigate, useLocation, useParams } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import { FaChevronDown } from "react-icons/fa";

import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { API_URL, getCategoryPath, getProductPath, getSubcategoryPath, nameToSlug, resolveImageUrl } from "../utils/api";



const categoryData = {

  NEW: [],

  Anarkali: ["Pure mulmul", "Semi stitched", "Unstitched", "Viscose Georgette"],

  Angrakha: [],

  Kurti: [],

  Palazzo: [],

  Saree: ["Georgette Saree", "Organza Saree"],

  "Sherwani suit": [],

  Shirt: [],

  "Suit Piece": [

    "Golden tissue",

    "Indo Western",

    "Kota",

    "Pure chanderi",

    "Pure mulmul",

    "Pure organza",

    "Pure silver tissue",

    "Semi stitched",

    "Unstitched",

    "Viscose Georgette",

  ],

};



const Products = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const { categorySlug, subSlug } = useParams();



  const [activeCategory, setActiveCategory] = useState("");

  const [activeSub, setActiveSub] = useState("");

  const [sortOption, setSortOption] = useState("popularity");

  const [showFilter, setShowFilter] = useState(false);

  const [openCat, setOpenCat] = useState(null);

  const [categoryMap, setCategoryMap] = useState({});



  const [wishlist, setWishlist] = useState(

    JSON.parse(localStorage.getItem("wishlist")) || []

  );



  const [products, setProducts] = useState([]);

  const listTitle = useMemo(() => {
    if (activeCategory && activeSub) return `${activeSub} ${activeCategory}`;
    if (activeCategory) return activeCategory;
    return "All Products";
  }, [activeCategory, activeSub]);

  const seo = useSeo("products", {
    title: `${listTitle} | Velvyana`,
    description: `Shop ${listTitle.toLowerCase()} at Velvyana`,
    keywords: "velvyana products, chikankari, ethnic wear, online shopping",
  });



  useEffect(() => {

    fetch(`${API_URL}/api/categories`)

      .then((res) => res.json())

      .then((data) => {

        const map = {};

        (data.data || []).forEach((cat) => {

          map[cat.slug] = { name: cat.name, subs: {} };

          cat.subcategories?.forEach((sub) => {

            map[cat.slug].subs[sub.slug] = sub.name;

          });

        });

        setCategoryMap(map);

      });

  }, []);



  useEffect(() => {

    const params = new URLSearchParams();

    const queryCategory = new URLSearchParams(location.search).get("category");

    const querySub = new URLSearchParams(location.search).get("sub");



    if (categorySlug) {

      params.set("category_slug", categorySlug);

      if (subSlug) params.set("sub_slug", subSlug);

    } else if (queryCategory) {

      params.set("category", queryCategory);

      if (querySub) params.set("sub", querySub);

    }



    const qs = params.toString();

    fetch(`${API_URL}/api/products${qs ? `?${qs}` : ""}`)

      .then((res) => res.json())

      .then((data) => setProducts(data.data || []));

  }, [location.search, categorySlug, subSlug]);



  useEffect(() => {

    const queryCategory = new URLSearchParams(location.search).get("category");

    const querySub = new URLSearchParams(location.search).get("sub");



    if (categorySlug && categoryMap[categorySlug]) {

      setActiveCategory(categoryMap[categorySlug].name);

      if (subSlug && categoryMap[categorySlug].subs[subSlug]) {

        setActiveSub(categoryMap[categorySlug].subs[subSlug]);

      } else {

        setActiveSub("");

      }

      return;

    }



    if (queryCategory) setActiveCategory(queryCategory);

    else setActiveCategory("");



    if (querySub) setActiveSub(querySub);

    else setActiveSub("");

  }, [location.search, categorySlug, subSlug, categoryMap]);



  useEffect(() => {

    const syncWishlist = () => {

      const data = JSON.parse(localStorage.getItem("wishlist")) || [];

      setWishlist(data);

    };



    window.addEventListener("wishlistUpdated", syncWishlist);

    return () => window.removeEventListener("wishlistUpdated", syncWishlist);

  }, []);



  const handleWishlist = (e, product) => {

    e.preventDefault();

    e.stopPropagation();



    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      navigate("/login");

      return;

    }



    setWishlist((prev) => {

      const exists = prev.find((item) => String(item._id) === String(product._id));

      let updated = exists

        ? prev.filter((item) => String(item._id) !== String(product._id))

        : [...prev, product];



      localStorage.setItem("wishlist", JSON.stringify(updated));

      window.dispatchEvent(new Event("wishlistUpdated"));

      return updated;

    });

  };



  const isInWishlist = (id) =>

    wishlist.some((item) => String(item._id) === String(id));



  const goToCategory = (cat, sub = "") => {

    const slug = nameToSlug(cat);

    if (sub) {

      navigate(getSubcategoryPath(slug, nameToSlug(sub)));

    } else {

      navigate(getCategoryPath(slug));

    }

  };



  let filtered = products;



  if (sortOption === "low") {

    filtered = [...filtered].sort((a, b) => a.price - b.price);

  } else if (sortOption === "high") {

    filtered = [...filtered].sort((a, b) => b.price - a.price);

  }



  return (

    <div key={`${categorySlug}-${subSlug}-${location.search}`} className="bg-[#020617] text-white min-h-screen pb-20">

      <SeoHead {...seo} />



      <div className="max-w-7xl mx-auto px-4 pt-6">

        <div className="flex justify-end items-center mb-6 gap-4">

          <button

            onClick={() => setShowFilter(true)}

            className="flex items-center gap-2 px-4 py-2 rounded-lg border 

            bg-gray-800 text-white border-gray-700 hover:border-pink-500 transition"

          >

            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">

              <path d="M3 4h18M6 12h12M10 20h4" />

            </svg>

            Filter

          </button>



          <div className="relative">

            <select

              value={sortOption}

              onChange={(e) => setSortOption(e.target.value)}

              className="appearance-none px-5 py-2 pr-10 rounded-lg

              border-2 border-pink-500 bg-gray-800 text-white text-sm"

            >

              <option value="popularity">Popularity</option>

              <option value="low">Price: Low to High</option>

              <option value="high">Price: High to Low</option>

            </select>



            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">

              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">

                <path d="M6 9l6 6 6-6" />

              </svg>

            </div>

          </div>

        </div>



        {filtered.length === 0 && (

          <div className="text-center py-20 text-gray-400">

            No product available right now

          </div>

        )}



        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {filtered.map((item) => (

            <div

              key={item._id}

              onClick={(e) => {

                if (e.target.closest("[data-wishlist]")) return;

                const path = getProductPath(item);

                if (e.ctrlKey) {

                  window.open(path, "_blank");

                } else {

                  navigate(path, { state: item });

                }

              }}

              className="cursor-pointer group active:scale-95 transition"

            >

              <div className="relative overflow-hidden product-photo-frame rounded">

                <div

                  data-wishlist

                  className="absolute top-3 left-3 z-30 p-2"

                  onClick={(e) => handleWishlist(e, item)}

                >

                  <FaHeart

                    className={`text-lg transition-colors ${

                      isInWishlist(item._id) ? "text-pink-500" : "text-white"

                    }`}

                  />

                </div>



                <img

                  src={resolveImageUrl(item.images?.[0] || item.img)}

                  alt={item.name}

                  className="sharp-img transition duration-300"

                />

              </div>



              <div className="mt-2 px-1">

                <h3 className="text-sm">{item.name}</h3>

                <p className="text-xs text-gray-400">₹{item.price}</p>

              </div>

            </div>

          ))}

        </div>

      </div>



      {showFilter && (

        <div className="fixed inset-0 z-50 flex pointer-events-none">

          <div

            onClick={() => setShowFilter(false)}

            className={`flex-1 bg-black transition-opacity duration-300 ${

              showFilter ? "opacity-50 pointer-events-auto" : "opacity-0"

            }`}

          />

          <div

            className={`w-[280px] bg-[#020617] text-white p-5 shadow-xl overflow-y-auto

            transform transition-transform duration-300 ease-in-out

            ${showFilter ? "translate-x-0" : "-translate-x-full"}

            ${showFilter ? "pointer-events-auto" : ""}`}

          >

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold">Filter</h2>

              <button onClick={() => setShowFilter(false)} className="text-lg hover:text-pink-500 transition">

                ✕

              </button>

            </div>



            <div className="space-y-3 text-sm">

              {Object.entries(categoryData).map(([cat, subs]) => (

                <div key={cat}>

                  <div className="flex justify-between items-center">

                    <p

                      onClick={() => {

                        goToCategory(cat);

                        setShowFilter(false);

                      }}

                      className="cursor-pointer font-semibold"

                    >

                      {cat}

                    </p>

                    {subs.length > 0 && (

                      <FaChevronDown

                        className={`text-[12px] cursor-pointer transition-transform duration-200 ${

                          openCat === cat ? "rotate-180" : ""

                        }`}

                        onClick={(e) => {

                          e.stopPropagation();

                          setOpenCat(openCat === cat ? null : cat);

                        }}

                      />

                    )}

                  </div>

                  {subs.length > 0 && openCat === cat && (

                    <div className="pl-3 mt-1 space-y-1 text-gray-400">

                      {subs.map((sub) => (

                        <p

                          key={sub}

                          className="cursor-pointer hover:text-pink-500"

                          onClick={() => {

                            goToCategory(cat, sub);

                            setShowFilter(false);

                          }}

                        >

                          — {sub}

                        </p>

                      ))}

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>

  );

};



export default Products;

