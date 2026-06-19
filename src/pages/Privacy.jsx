import banner from "../assets/banner/banner.jpeg";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { privacySections } from "../content/policyContent";

const Privacy = () => {
  const seo = useSeo("privacy", {
    title: "Privacy Policy - Velvyana",
    description:
      "Read Velvyana's privacy policy to understand how we collect, use, and protect your personal data.",
    keywords: "privacy policy, velvyana privacy, data protection",
    robots: "index, follow",
  });

  return (
    <div className="bg-[#020617] min-h-screen pb-20 text-gray-200">
      <SeoHead {...seo} />

      <div className="relative h-[280px] md:h-[380px] w-full">
        <img
          src={banner}
          alt="privacy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-light tracking-widest">
            PRIVACY POLICY
          </h1>
        </div>
      </div>

      <div className="px-4 md:px-6 mt-10 flex justify-center">
        <div className="max-w-4xl w-full bg-[#0f172a] text-gray-300 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800 leading-relaxed text-sm md:text-base">
          {privacySections.map((section, i) => (
            <div key={section.title} className={i > 0 ? "mt-6" : ""}>
              <h2 className="text-white text-lg font-semibold mb-2">{section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
