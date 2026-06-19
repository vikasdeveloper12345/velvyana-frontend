import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import SeoHead from "../components/SeoHead";

import { useCart } from "../context/CartContext";

import { useAuth } from "../context/AuthContext";

import {

  API_URL,

  getAuthHeaders,

  getProductPath,

  normalizeProduct,

  resolveImageUrl,

} from "../utils/api";

import { useSeo } from "../hooks/useSeo";



import Lightbox from "yet-another-react-lightbox";

import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";



import ZoomInIcon from "@mui/icons-material/ZoomIn";

import ZoomOutIcon from "@mui/icons-material/ZoomOut";

import CloseIcon from "@mui/icons-material/Close";

import CropFreeIcon from "@mui/icons-material/CropFree";



const REVIEWER_KEY = "velvyana_reviewer";

const getLengthLabel = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("anarkali")) return "Length of Anarkali";
  if (cat.includes("saree")) return "Length of Saree";
  if (cat.includes("kurti")) return "Length of Kurti";
  return "Length";
};

const getProductSpecs = (product) => {
  if (!product) return [];
  const rows = [
    ["Fabric (Top)", product.fabric_top || product.fabric],
    ["Fabric (Bottom)", product.fabric_bottom],
    [getLengthLabel(product.category), product.length_size],
    ["Chest", product.chest],
    ["Hip", product.hip],
    ["Color", product.color],
    ["Embroidery", product.embroidery],
    ["Thread", product.thread],
    ["Thread Color", product.thread_color],
    ["Touch & Feel", product.touch_feel],
    ["Work", product.work_type],
  ];
  return rows.filter(([, value]) => value);
};



const StarRating = ({ value, onChange, readOnly = false }) => (

  <div className="flex gap-1">

    {[1, 2, 3, 4, 5].map((star) => (

      <button

        key={star}

        type="button"

        disabled={readOnly}

        onClick={() => onChange?.(star)}

        className={`text-xl leading-none ${readOnly ? "cursor-default" : "cursor-pointer"} ${

          star <= value ? "text-yellow-400" : "text-gray-600"

        }`}

        aria-label={`${star} of 5 stars`}

      >

        ★

      </button>

    ))}

  </div>

);



const ProductDetails = () => {

  const navigate = useNavigate();

  const { addToCart, replaceCart } = useCart();

  const { user } = useAuth();

  const { segment, productSlug, slug: legacySlug } = useParams();



  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);

  const [activeIndex, setActiveIndex] = useState(0);

  const [added, setAdded] = useState(false);

  const [open, setOpen] = useState(false);

  const [related, setRelated] = useState([]);

  const [activeTab, setActiveTab] = useState("description");

  const [reviews, setReviews] = useState([]);

  const [reviewForm, setReviewForm] = useState({

    rating: 0,

    review: "",

    name: "",

    email: "",

    save_info: false,

  });

  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const [reviewMessage, setReviewMessage] = useState("");

  const seo = useSeo(

    product ? `product-${product.id}` : "",

    {

      title: product ? `${product.name} - Velvyana` : "Product - Velvyana",

      description: product ? `${product.name} - Premium chikankari wear from Velvyana` : "",

      keywords: product ? `${product.name}, velvyana, chikankari` : "",

    }

  );



  const slugKey = productSlug || legacySlug;



  useEffect(() => {

    setLoading(true);

    const url = segment && productSlug

      ? `${API_URL}/api/products/by-path/${segment}/${productSlug}`

      : `${API_URL}/api/products/${legacySlug}`;



    fetch(url)

      .then((res) => res.json())

      .then((data) => {

        setProduct(data.data || null);

      })

      .finally(() => setLoading(false));

  }, [segment, productSlug, legacySlug]);



  useEffect(() => {

    window.scrollTo(0, 0);

    setActiveIndex(0);

    setActiveTab("description");

  }, [slugKey]);



  useEffect(() => {

    if (!product?.id) return;



    fetch(`${API_URL}/api/products/reviews/${product.id}`)

      .then((res) => res.json())

      .then((data) => setReviews(data.data || []));



    fetch(`${API_URL}/api/products?category=${encodeURIComponent(product.category)}`)

      .then((res) => res.json())

      .then((data) => {

        setRelated((data.data || []).filter((p) => p.id !== product.id));

      });

  }, [product]);



  useEffect(() => {

    if (user) {

      setReviewForm((prev) => ({

        ...prev,

        name: user.name || "",

        email: user.email || "",

      }));

      return;

    }



    const saved = localStorage.getItem(REVIEWER_KEY);

    if (saved) {

      try {

        const parsed = JSON.parse(saved);

        setReviewForm((prev) => ({

          ...prev,

          name: parsed.name || "",

          email: parsed.email || "",

          save_info: true,

        }));

      } catch {

        // ignore

      }

    }

  }, [user]);



  const images = product?.images?.length

    ? product.images.map(resolveImageUrl)

    : product?.img

      ? [resolveImageUrl(product.img)]

      : [];



  const handleAddToCart = () => {

    addToCart(normalizeProduct({ ...product, qty }));

    setAdded(true);

    setTimeout(() => setAdded(false), 1500);

  };



  const handleBuyNow = () => {
    const buyNowItem = { ...product, qty: 1 };
    sessionStorage.setItem(
      "directCheckout",
      JSON.stringify({ product: buyNowItem, qty: 1 })
    );
    replaceCart([buyNowItem]);
    navigate("/checkout");
  };



  const handleReviewSubmit = async (e) => {

    e.preventDefault();

    if (!product?.id) return;



    if (!reviewForm.rating) {

      setReviewMessage("Please select a rating.");

      return;

    }

    if (!reviewForm.review.trim()) {

      setReviewMessage("Please write your review.");

      return;

    }

    if (!user && (!reviewForm.name.trim() || !reviewForm.email.trim())) {

      setReviewMessage("Name and email are required.");

      return;

    }



    setReviewSubmitting(true);

    setReviewMessage("");



    try {

      const res = await fetch(`${API_URL}/api/products/reviews/${product.id}`, {

        method: "POST",

        headers: getAuthHeaders(),

        body: JSON.stringify({

          rating: reviewForm.rating,

          review: reviewForm.review,

          name: reviewForm.name,

          email: reviewForm.email,

          save_info: reviewForm.save_info,

        }),

      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);



      if (!user && reviewForm.save_info) {

        localStorage.setItem(

          REVIEWER_KEY,

          JSON.stringify({ name: reviewForm.name, email: reviewForm.email })

        );

      }



      setReviewForm((prev) => ({

        ...prev,

        rating: 0,

        review: "",

      }));

      setReviewMessage("Thank you! Your review has been submitted.");



      const listRes = await fetch(`${API_URL}/api/products/reviews/${product.id}`);

      const listData = await listRes.json();

      setReviews(listData.data || []);

    } catch (err) {

      setReviewMessage(err.message);

    } finally {

      setReviewSubmitting(false);

    }

  };



  if (loading) {

    return <div className="text-white p-10">Loading...</div>;

  }



  if (!product) {

    return <div className="text-white p-10">Product not found.</div>;

  }



  return (

    <div className="bg-[#020617] text-white min-h-screen pb-20">

      <SeoHead {...seo} />



      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid md:grid-cols-2 gap-10">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">

            {images.map((img, i) => (

              <img

                key={i}

                src={img}

                alt=""

                onClick={() => setActiveIndex(i)}

                className={`sharp-img w-16 h-20 md:w-20 md:h-24 object-cover rounded cursor-pointer border-2 transition-all duration-300 ${

                  activeIndex === i ? "border-pink-500 scale-105" : "border-gray-700"

                }`}

              />

            ))}

          </div>



          <div className="relative rounded-xl overflow-hidden product-detail-main flex-1 min-w-0">

            <img

              src={images[activeIndex] || ""}

              alt={product.name}

              onClick={() => setOpen(true)}

              className="sharp-img w-full h-full cursor-zoom-in"

            />



            <button

              type="button"

              onClick={() => setOpen(true)}

              className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-black rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300 z-20"

              aria-label="Zoom image"

            >

              <ZoomInIcon fontSize="small" />

            </button>

          </div>

        </div>



        <div className="flex flex-col justify-center">

          <div className="space-y-5">

            <h1 className="text-2xl md:text-3xl font-semibold">{product.name}</h1>

            <p className="text-lg md:text-xl font-medium">
              {product.original_price && product.original_price > product.price ? (
                <>
                  <span className="line-through text-gray-500 mr-3">₹ {product.original_price}</span>
                  <span className="text-pink-400">₹ {product.price}</span>
                </>
              ) : (
                <>₹ {product.price}</>
              )}
            </p>



            <div className="space-y-2 text-sm text-gray-300">

              <p

                className="cursor-pointer hover:text-pink-500 transition"

                onClick={() => window.open(product.instagram, "_blank")}

              >

                CLICK HERE TO CHECK OUT THE REAL PRODUCT VIEW ON INSTAGRAM!

              </p>

              <p

                className="cursor-pointer hover:text-pink-500 transition"

                onClick={() => window.open(product.whatsapp, "_blank")}

              >

                WANT A CLOSER LOOK? CONNECT ON WHATSAPP FOR A LIVE VIDEO CALL!

              </p>

            </div>



            <div className="flex items-center gap-4">

              <div className="flex border border-gray-700 rounded overflow-hidden">

                <button

                  type="button"

                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}

                  className="px-3 py-2 hover:bg-gray-700 transition"

                >

                  −

                </button>

                <span className="px-5 py-2">{qty}</span>

                <button

                  type="button"

                  onClick={() => setQty(qty + 1)}

                  className="px-3 py-2 hover:bg-gray-700 transition"

                >

                  +

                </button>

              </div>

            </div>



            <div className="flex flex-col sm:flex-row gap-3">

              <button

                type="button"

                onClick={handleAddToCart}

                className={`flex-1 py-3 font-semibold rounded transition-all duration-300 ${

                  added ? "bg-green-500 text-white" : "bg-white text-black hover:bg-gray-200"

                }`}

              >

                {added ? "Added ✓" : "Add to Cart"}

              </button>

              <button

                type="button"

                onClick={handleBuyNow}

                className="flex-1 py-3 font-semibold bg-pink-500 text-white rounded hover:bg-pink-600 transition-all duration-300"

              >

                Buy Now

              </button>

            </div>



            <p className="text-sm text-gray-400">Category: {product.category}</p>

            <hr className="border-gray-700" />



            <div className="flex gap-6 border-b border-gray-700 text-sm">

              <button

                type="button"

                onClick={() => setActiveTab("description")}

                className={`pb-3 ${activeTab === "description" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-400"}`}

              >

                Description

              </button>

              <button

                type="button"

                onClick={() => setActiveTab("reviews")}

                className={`pb-3 ${activeTab === "reviews" ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-400"}`}

              >

                Reviews ({reviews.length})

              </button>

            </div>



            {activeTab === "description" ? (

              <div className="text-sm text-gray-300 space-y-2 pt-2">

                <h2 className="text-lg font-semibold">Product Description</h2>

                {product.description && <p>{product.description}</p>}

                {getProductSpecs(product).map(([label, value]) => (
                  <p key={label}><b>{label}:</b> {value}</p>
                ))}

                {!product.description && !getProductSpecs(product).length && (
                  <p>Elegant handcrafted ethnic wear for premium look.</p>
                )}

              </div>

            ) : (

              <div className="pt-4 grid md:grid-cols-2 gap-8 text-sm">

                <div>

                  <h2 className="text-lg font-semibold mb-3">REVIEWS</h2>

                  {reviews.length === 0 ? (

                    <p className="text-gray-400">There are no reviews yet.</p>

                  ) : (

                    <div className="space-y-4">

                      {reviews.map((r) => (

                        <div key={r.id} className="border-b border-gray-800 pb-3">

                          <StarRating value={r.rating} readOnly />

                          <p className="mt-2 text-gray-300">{r.review}</p>

                          <p className="mt-1 text-xs text-gray-500">— {r.name}</p>

                        </div>

                      ))}

                    </div>

                  )}

                </div>



                <form onSubmit={handleReviewSubmit} className="space-y-4">

                  <p className="text-gray-300">
                    {reviews.length === 0
                      ? `Be the first to review "${product.name}"`
                      : `Add a review for "${product.name}"`}
                  </p>

                  <p className="text-xs text-gray-500">

                    Your email address will not be published. Required fields are marked *

                  </p>



                  <div>

                    <label className="block mb-1">Your rating *</label>

                    <StarRating

                      value={reviewForm.rating}

                      onChange={(rating) => setReviewForm((p) => ({ ...p, rating }))}

                    />

                  </div>



                  <div>

                    <label className="block mb-1">Your review *</label>

                    <textarea

                      value={reviewForm.review}

                      onChange={(e) => setReviewForm((p) => ({ ...p, review: e.target.value }))}

                      rows={5}

                      className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"

                      required

                    />

                  </div>



                  {!user && (

                    <>

                      <div>

                        <label className="block mb-1">Name *</label>

                        <input

                          type="text"

                          value={reviewForm.name}

                          onChange={(e) => setReviewForm((p) => ({ ...p, name: e.target.value }))}

                          className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"

                          required

                        />

                      </div>

                      <div>

                        <label className="block mb-1">Email *</label>

                        <input

                          type="email"

                          value={reviewForm.email}

                          onChange={(e) => setReviewForm((p) => ({ ...p, email: e.target.value }))}

                          className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white"

                          required

                        />

                      </div>

                      <label className="flex items-start gap-2 text-xs text-gray-400">

                        <input

                          type="checkbox"

                          checked={reviewForm.save_info}

                          onChange={(e) =>

                            setReviewForm((p) => ({ ...p, save_info: e.target.checked }))

                          }

                          className="mt-1"

                        />

                        Save my name, email, and website in this browser for the next time I comment.

                      </label>

                    </>

                  )}



                  {reviewMessage && (

                    <p className={`text-sm ${reviewMessage.includes("Thank") ? "text-green-400" : "text-red-400"}`}>

                      {reviewMessage}

                    </p>

                  )}



                  <button

                    type="submit"

                    disabled={reviewSubmitting}

                    className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition disabled:opacity-60"

                  >

                    {reviewSubmitting ? "Submitting..." : "Submit"}

                  </button>

                </form>

              </div>

            )}

          </div>

        </div>

      </div>



      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <h2 className="text-xl font-semibold text-center mb-6">RELATED PRODUCTS</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

          {related.slice(0, 6).map((item) => (

            <a

              key={item.id}

              href={getProductPath(item)}

              onClick={(e) => {

                if (!(e.ctrlKey || e.metaKey)) {

                  e.preventDefault();

                  navigate(getProductPath(item), { state: item });

                }

              }}

              className="cursor-pointer group block"

            >

              <div className="product-photo-frame rounded">
              <img

                src={resolveImageUrl(item.images?.[0] || item.img)}

                alt={item.name}

                className="sharp-img transition duration-300"

              />
              </div>

              <div className="mt-2 text-center">

                <h3 className="text-sm">{item.name}</h3>

                <p className="text-gray-400 text-sm">₹ {item.price}</p>

              </div>

            </a>

          ))}

        </div>

      </div>



      <Lightbox

        open={open}

        close={() => setOpen(false)}

        index={activeIndex}

        plugins={[Zoom]}

        slides={images.map((img) => ({ src: img }))}

        zoom={{

          maxZoomPixelRatio: 4,

          zoomInMultiplier: 2,

          scrollToZoom: true,

          pinchZoomDistanceFactor: 100,

          doubleClickDelay: 0,

          doubleTapDelay: 0,

        }}

        carousel={{ finite: false }}

        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}

        styles={{

          container: { backgroundColor: "rgba(0,0,0,0.96)", cursor: "grab" },

          slide: { cursor: "grab" },

        }}

        render={{

          slideHeader: () => (

            <div className="absolute top-5 left-5 z-[999] text-white text-sm font-medium tracking-wide">

              {activeIndex + 1} / {images.length}

            </div>

          ),

          iconPrev: () => (

            <div className="text-white text-5xl font-light hover:scale-110 transition-all duration-200">

              ‹

            </div>

          ),

          iconNext: () => (

            <div className="text-white text-5xl font-light hover:scale-110 transition-all duration-200">

              ›

            </div>

          ),

          toolbar: () => (

            <div className="flex items-center gap-5 pr-5 pt-4">

              <button type="button" className="text-white hover:scale-110 transition-all duration-200">

                <ZoomInIcon fontSize="medium" />

              </button>

              <button type="button" className="text-white hover:scale-110 transition-all duration-200">

                <ZoomOutIcon fontSize="medium" />

              </button>

              <button type="button" className="text-white hover:scale-110 transition-all duration-200">

                <CropFreeIcon fontSize="medium" />

              </button>

              <button

                type="button"

                onClick={() => setOpen(false)}

                className="text-white hover:scale-110 transition-all duration-200"

              >

                <CloseIcon fontSize="large" />

              </button>

            </div>

          ),

        }}

      />

    </div>

  );

};



export default ProductDetails;

