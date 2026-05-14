import banner from "../assets/banner/banner.jpeg";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Shipping = () => {
  const location = useLocation();

  return (
    <div className="bg-[#020617] min-h-screen pb-20 text-gray-200">

      {/* ✅ SEO FIX */}
      <Helmet key={location.pathname}>
        <title>Shipping & Delivery Policy - Velvyana</title>
        <meta
          name="description"
          content="Learn about Velvyana shipping and delivery timelines, courier process, and policies."
        />
        <meta
          name="keywords"
          content="shipping policy, delivery, velvyana shipping"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="relative h-[300px] md:h-[400px] w-full">

        <img
          src={banner}
          alt="shipping"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

          <p className="text-xs md:text-sm tracking-[4px] text-gray-300 mb-3">
            WE'RE YOUR TEAM IN DIFFICULT TIMES
          </p>

          <h1 className="text-white text-3xl md:text-5xl font-light tracking-widest">
            SHIPPING & DELIVERY POLICY
          </h1>

        </div>

      </div>

      {/* CONTAINER */}
      <div className="relative -mt-16 px-4 flex justify-center">

        <div className="max-w-3xl w-full bg-[#0f172a] text-gray-300 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800">

          <p className="text-sm md:text-base leading-relaxed">
            The orders for the user are shipped through registered domestic courier
            companies and/or speed post only. Orders are delivered within 5–7 days
            from the date of the order and/or payment or as per the delivery date
            agreed at the time of order confirmation and delivering of the shipment,
            subject to courier company / post office norms.
          </p>

          <p className="mt-4 text-sm md:text-base leading-relaxed">
            Platform Owner shall not be liable for any delay in delivery by the courier
            company / postal authorities. Delivery of all orders will be made to the
            address provided by the buyer at the time of purchase.
          </p>

          <p className="mt-4 text-sm md:text-base leading-relaxed">
            Delivery of our services will be confirmed on your email ID as specified
            at the time of registration. If there are any shipping cost(s) levied by
            the seller or the Platform Owner (as the case may be), the same is not
            refundable.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Shipping;