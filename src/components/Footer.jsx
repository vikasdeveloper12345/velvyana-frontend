import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Footer = () => {

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <meta
          name="description"
          content="Explore Velvyana Chikankari collections, blogs, categories and premium ethnic wear."
        />

        <meta
          name="keywords"
          content="Velvyana, Chikankari, Anarkali, Saree, Suit Piece, Ethnic Wear, Blog"
        />
      </Helmet>

      <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">

        <div
          className="max-w-7xl mx-auto px-6 py-12
          grid grid-cols-1 md:grid-cols-4 gap-12"
        >

          {/* PAGES */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              PAGES
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/refund"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Privacy Policy
                </Link>
              </li>

            </ul>

          </div>

          {/* CATEGORIES */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              CATEGORIES
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/products?category=Anarkali"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Anarkali
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Angrakha"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Angrakha
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Kurti"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Kurti
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Palazzo"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Palazzo
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Saree"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Saree
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Sherwani suit"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Sherwani Suit
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Shirt"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Shirt
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Suit Piece"
                  onClick={handleClick}
                  className="hover:text-pink-500 transition"
                >
                  Suit Piece
                </Link>
              </li>

            </ul>

          </div>

          {/* RECENT POSTS */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              RECENT POSTS
            </h3>

            <div className="space-y-2">

              {/* CTRL + CLICK WORKING */}
              <Link
                to="/blog/a-closer-look"
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-relaxed hover:text-pink-500 transition block"
              >
                A Closer Look at Our Signature Categories
              </Link>

              <p className="text-xs text-gray-500">
                December 13, 2025
              </p>

            </div>

          </div>

          {/* WHY US */}
          <div>

            <h3 className="text-white font-semibold mb-5">
              WHY US?
            </h3>

            <p className="text-sm text-gray-400 leading-7">

              Velvyana is a fashion brand created for women who love
              timeless chikankari elegance and effortless style.

              Our collections blend handcrafted artistry,
              comfort and premium-quality fabrics designed for
              modern ethnic wear lovers.

            </p>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 py-4">

          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

            <p className="text-sm">
              VELVYANA © 2025 Copy-right
            </p>

            <div className="flex gap-5 mt-3 md:mt-0 text-lg">

              <a
                href="https://www.facebook.com/velvyanaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/velvyanaofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.whatsapp.com/catalog/919064252616"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.youtube.com/@VelvyanaChikankari"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>

      </footer>
    </>
  );
};

export default Footer;