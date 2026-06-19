import banner from "../assets/banner/banner.jpeg";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";

const Refund = () => {
  const seo = useSeo("refund", {
    title: "Refund & Cancellation Policy - Velvyana",
    description:
      "Read Velvyana's refund and cancellation policy including return eligibility and refund timelines.",
    keywords: "refund policy, cancellation, returns, velvyana refund",
    robots: "index, follow",
  });

  return (
    <div className="bg-[#020617] min-h-screen pb-20 text-gray-200">
      <SeoHead {...seo} />

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

      <div className="relative -mt-16 px-4 flex justify-center">
        <div className="max-w-3xl w-full bg-[#0f172a] text-gray-300 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800">

          <div className="mb-6">
            <h2 className="text-white font-semibold mb-2">Return Policy</h2>
            <p className="text-sm leading-relaxed">
              We offer Return within first 1 day from the date of your purchase. If 1 days have passed since your purchase, you will not be offered a return
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-2">Refund Policy</h2>
            <p className="text-sm leading-relaxed">
              In case of any refunds approved by company, it will take 7 days for the refund to be credited to your original payment method
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Refund;
