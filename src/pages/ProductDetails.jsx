import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useCart } from "../context/CartContext";

// ✅ LIGHTBOX
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

// ✅ MUI ICONS
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CloseIcon from "@mui/icons-material/Close";
import CropFreeIcon from "@mui/icons-material/CropFree";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
  fetch(`http://localhost:5000/api/products/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      setProduct(data.data);
    });
  }, [id]);


  const [qty, setQty] = useState(1);

  const [activeIndex, setActiveIndex] = useState(0);

  const [added, setAdded] = useState(false);

  // ✅ LIGHTBOX
  const [open, setOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product?.images?.length
  ? product.images
  : [];
   
  console.log(images);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveIndex(0);
  }, [id]);

  if (!product) {
  return <div className="text-white p-10">Loading...</div>;
}

  const handleAddToCart = () => {
    addToCart({
      ...product,
      qty,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product,
        qty,
      },
    });
  };
  
  const [related, setRelated] = useState([]);

  useEffect(() => {
  if (!product) return;

  fetch(`http://localhost:5000/api/products?category=${product.category}`)
    .then((res) => res.json())
    .then((data) => {
      setRelated(data.data);
    });
   }, [product]);
  
  return (
    <div className="bg-[#020617] text-white min-h-screen pb-20">

      {/* SEO */}
      <Helmet>
        <title>
          {product?.name} - Velvyana
        </title>

        <meta
          name="description"
          content={`${product?.name} - Premium chikankari wear from Velvyana`}
        />
      </Helmet>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* THUMBNAILS */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">

            {images.map((img, i) => (
              <img
                key={i}
                src={img || ""}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`
                  w-16 h-20
                  md:w-20 md:h-24
                  object-cover
                  rounded
                  cursor-pointer
                  border-2
                  transition-all
                  duration-300
                  ${
                    activeIndex === i
                      ? "border-pink-500 scale-105"
                      : "border-gray-700"
                  }
                `}
              />
            ))}

          </div>

          {/* MAIN IMAGE */}
          <div className="relative rounded-xl overflow-hidden group">

            <img
              src={images?.[activeIndex] || ""}
              onClick={() => setOpen(true)}
              className="
                w-full
                md:w-[450px]
                h-[350px]
                md:h-[600px]
                object-cover
                rounded-xl
                cursor-default
                transition-all
                duration-300
              "
            />

            {/* ZOOM ICON */}
            <button
              onClick={() => setOpen(true)}
              className="
                absolute
                top-3
                right-3
                bg-white/90
                backdrop-blur-md
                text-black
                rounded-full
                p-2
                shadow-lg
                opacity-0
                group-hover:opacity-100
                hover:scale-110
                transition-all
                duration-300
                z-20
              "
            >
              <ZoomInIcon fontSize="small" />
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center">

          <div className="space-y-5">

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-semibold">
              {product.name}
            </h1>

            {/* PRICE */}
            <p className="text-lg md:text-xl font-medium">
              ₹ {product.price}
            </p>

            {/* LINKS */}
            <div className="space-y-2 text-sm text-gray-300">

              <p
                className="cursor-pointer hover:text-pink-500 transition"
                onClick={() =>
                  window.open(
                    product.instagram,
                    "_blank"
                  )
                }
              >
                CLICK HERE TO CHECK OUT THE REAL PRODUCT VIEW ON INSTAGRAM!
              </p>

              <p
                className="cursor-pointer hover:text-pink-500 transition"
                onClick={() =>
                  window.open(
                    product.whatsapp,
                    "_blank"
                  )
                }
              >
                WANT A CLOSER LOOK? CONNECT ON WHATSAPP FOR A LIVE VIDEO CALL!
              </p>

            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-4">

              <div className="flex border border-gray-700 rounded overflow-hidden">

                <button
                  onClick={() =>
                    setQty(
                      qty > 1
                        ? qty - 1
                        : 1
                    )
                  }
                  className="
                    px-3 py-2
                    hover:bg-gray-700
                    transition
                  "
                >
                  −
                </button>

                <span className="px-5 py-2">
                  {qty}
                </span>

                <button
                  onClick={() =>
                    setQty(qty + 1)
                  }
                  className="
                    px-3 py-2
                    hover:bg-gray-700
                    transition
                  "
                >
                  +
                </button>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleAddToCart}
                className={`
                  flex-1
                  py-3
                  font-semibold
                  rounded
                  transition-all
                  duration-300
                  ${
                    added
                      ? "bg-green-500 text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }
                `}
              >
                {added
                  ? "Added ✓"
                  : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="
                  flex-1
                  py-3
                  font-semibold
                  bg-pink-500
                  text-white
                  rounded
                  hover:bg-pink-600
                  transition-all
                  duration-300
                "
              >
                Buy Now
              </button>

            </div>

            {/* CATEGORY */}
            <p className="text-sm text-gray-400">
              Category: {product.category}
            </p>

            <hr className="border-gray-700" />

            {/* DESCRIPTION */}
            <div className="text-sm text-gray-300 space-y-2">

              <h2 className="text-lg font-semibold">
                Product Description
              </h2>

              <p>
                <b>Fabric:</b>{" "}
                Premium Quality
              </p>

              <p>
                <b>Work:</b>{" "}
                Chikankari
              </p>

              <p>
                Elegant handcrafted ethnic wear for premium look.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        <h2 className="text-xl font-semibold text-center mb-6">
          RELATED PRODUCTS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

          {related.map((item) => (
            <a
              key={item._id}
              href={`/product/${item._id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (
                  !(
                    e.ctrlKey ||
                    e.metaKey
                  )
                ) {
                  e.preventDefault();

                  navigate(
                    `/product/${item._id}`,
                    {
                      state: item,
                    }
                  );
                }
              }}
              className="
                cursor-pointer
                group
                block
              "
            >

              <img
                src={
                  item.images?.[0] || item.img
                }
                className="
                  w-full
                  h-[220px]
                  md:h-[400px]
                  object-cover
                  rounded
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="mt-2 text-center">

                <h3 className="text-sm">
                  {item.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  ₹ {item.price}
                </p>

              </div>

            </a>
          ))}

        </div>

      </div>

      {/* PREMIUM LIGHTBOX */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={activeIndex}
        plugins={[Zoom]}
        zoom={{ scrollToZoom: true }}


        slides={images.map((img) => ({
          src: img,
        }))}

        zoom={{
        maxZoomPixelRatio: 4,
        zoomInMultiplier: 2,
         scrollToZoom: true,
        pinchZoomDistanceFactor: 100,
      doubleClickDelay: 0,
      doubleTapDelay: 0,
     }}

        carousel={{
          finite: false,
        }}

        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}

        styles={{
          container: {
            backgroundColor:
              "rgba(0,0,0,0.96)",
              cursor: "grab",
          },
         slide: {
         cursor: "grab",
          },

        }}

        render={{

          /* PHOTO COUNT */
          slideHeader: () => (
            <div
              className="
                absolute
                top-5
                left-5
                z-[999]
                text-white
                text-sm
                font-medium
                tracking-wide
              "
            >
              {activeIndex + 1} / {images.length}
            </div>
          ),

          /* LEFT */
          iconPrev: () => (
            <div
              className="
                text-white
                text-5xl
                font-light
                hover:scale-110
                transition-all
                duration-200
              "
            >
              ‹
            </div>
          ),

          /* RIGHT */
          iconNext: () => (
            <div
              className="
                text-white
                text-5xl
                font-light
                hover:scale-110
                transition-all
                duration-200
              "
            >
              ›
            </div>
          ),

          /* TOOLBAR */
          toolbar: () => (
            <div
              className="
                flex
                items-center
                gap-5
                pr-5
                pt-4
              "
            >

              {/* ZOOM IN */}
              <button
                className="
                  text-white
                  hover:scale-110
                  transition-all
                  duration-200
                "
              >
                <ZoomInIcon fontSize="medium" />
              </button>

              {/* ZOOM OUT */}
              <button
                className="
                  text-white
                  hover:scale-110
                  transition-all
                  duration-200
                "
              >
                <ZoomOutIcon fontSize="medium" />
              </button>

              {/* FULLSCREEN */}
              <button
                className="
                  text-white
                  hover:scale-110
                  transition-all
                  duration-200
                "
              >
                <CropFreeIcon fontSize="medium" />
              </button>

              {/* CLOSE */}
              <button
                onClick={() =>
                  setOpen(false)
                }
                className="
                  text-white
                  hover:scale-110
                  transition-all
                  duration-200
                "
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