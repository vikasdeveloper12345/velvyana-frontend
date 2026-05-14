import banner from "../assets/banner/banner.jpeg";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Refund = () => {
  const location = useLocation();

  return (
    <div className="bg-[#020617] min-h-screen pb-20 text-gray-200">

      {/* ✅ SEO FIX */}
      <Helmet key={location.pathname}>
        <title>Refund & Cancellation Policy - Velvyana</title>
        <meta
          name="description"
          content="Read Velvyana's refund and cancellation policy including return eligibility and refund timelines."
        />
        <meta
          name="keywords"
          content="refund policy, cancellation, returns, velvyana refund"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* HERO */}
      <div className="relative h-[300px] md:h-[400px] w-full">

        <img
          src={banner}
          alt="refund"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-light tracking-widest text-center px-4">
            REFUND & CANCELLATION POLICY
          </h1>
        </div>

      </div>

      {/* CONTAINER */}
      <div className="relative -mt-16 px-4 flex justify-center">

        <div className="max-w-3xl w-full bg-[#0f172a] text-gray-300 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800">

          {/* RETURN POLICY */}
          <div className="mb-6">
            <h2 className="text-white font-semibold mb-2">
              Return Policy
            </h2>

            <p className="text-sm leading-relaxed">
              We offer returns within 1 day from the date of your purchase.
              If 1 day has passed since your purchase, unfortunately we cannot
              offer a return or exchange. To be eligible for a return, your item
              must be unused and in the same condition that you received it.
            </p>
          </div>

          {/* REFUND POLICY */}
          <div>
            <h2 className="text-white font-semibold mb-2">
              Refund Policy
            </h2>

            <p className="text-sm leading-relaxed">
              In case of any refunds approved by the company, it may take
              5–7 working days for the amount to be credited back to your
              original payment method. Refunds will only be processed after
              inspection and approval of the returned product.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Refund;