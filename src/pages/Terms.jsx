import banner from "../assets/banner/banner.jpeg";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import {
  termsIntro,
  termsBulletIntro,
  termsBullets,
  termsClosing,
} from "../content/policyContent";

const Terms = () => {
  const seo = useSeo("terms", {
    title: "Terms & Conditions - Velvyana",
    description: "Read Velvyana terms and conditions for using our website, services, and policies.",
    keywords: "terms and conditions, velvyana terms, website policy, user agreement",
    robots: "index, follow",
  });

  return (
    <div className="bg-[#020617] text-gray-200 min-h-screen pb-20">
      <SeoHead {...seo} />

      <div className="relative h-[300px] md:h-[400px] w-full">
        <img
          src={banner}
          alt="terms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-light tracking-widest text-center">
            TERMS & CONDITIONS
          </h1>
        </div>
      </div>

      <div className="relative -mt-16 px-4 flex justify-center">
        <div className="max-w-4xl w-full bg-[#0f172a] rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800 text-gray-300 leading-relaxed text-sm md:text-base">

          {termsIntro.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))}

          <p className="mt-4">{termsBulletIntro}</p>

          <ul className="mt-4 list-disc pl-5 space-y-3">
            {termsBullets.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {termsClosing.map((paragraph, i) => (
            <p key={i} className="mt-4">
              {paragraph}
            </p>
          ))}

          <div className="mt-6 pt-4 border-t border-gray-800">
            <p className="text-gray-400">For any queries or support, please contact us at:</p>
            <p className="text-white mt-2">Phone: +91 90642 52616</p>
            <p className="text-pink-400">Email: INFO@VELVYANA.COM</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Terms;
