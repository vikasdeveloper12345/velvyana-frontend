import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// CONTEXT
import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// LAYOUT
import MainLayout from "./layout/MainLayout";

// PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";

// LOADER
import Loader from "./components/Loader";

// PAGES
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import AddressBook from "./pages/AddressBook";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Contact from "./pages/Contact";
import TrackOrder from "./pages/TrackOrder";

// FOOTER
import About from "./pages/About";
import Blog from "./pages/Blog";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";
import Privacy from "./pages/Privacy";

// BLOG DETAIL
import ACloserLook from "./pages/ACloserLook";
import BlogDetails from "./pages/BlogDetails";

// 🔥 SCROLL + LOADER FIX
const ScrollHandler = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      
      <ScrollHandler setLoading={setLoading} />

      <Helmet>
        <title>Velvyana - Premium Chikankari & Ethnic Wear</title>
        <meta
          name="description"
          content="Shop premium chikankari kurtis and ethnic wear for women at Velvyana."
        />
      </Helmet>

      {loading && <Loader />}

      <CartProvider>
        <AuthProvider>

          <Routes>

            <Route path="/login" element={<Login />} />

            <Route path="/" element={<MainLayout />}>

              {/* PUBLIC */}
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />

              {/* FOOTER */}
              <Route path="about" element={<About />} />
              <Route path="blog" element={<Blog />} />
              <Route path="terms" element={<Terms />} />
              <Route path="refund" element={<Refund />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="privacy" element={<Privacy />} />

              {/* BLOG DETAIL */}
              <Route path="/blog" element={<ACloserLook />} />
              <Route path="blog/:id" element={<BlogDetails />} />

              {/* PROTECTED */}
              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
              <Route path="track-order/:id" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />

              {/* ✅ FIXED: Wishlist is now PUBLIC */}
              <Route path="wishlist" element={<Wishlist />} />

              <Route path="address" element={<ProtectedRoute><AddressBook /></ProtectedRoute>} />

              {/* FLOW */}
              <Route path="checkout" element={<Checkout />} />
              <Route path="payment" element={<Payment />} />
              <Route path="order-success" element={<OrderSuccess />} />

            </Route>

          </Routes>

        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;