import { useEffect, useState } from "react";
import aboutBg from "../assets/banner/banner.jpeg";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { API_URL } from "../utils/api";
import { aboutContent } from "../content/policyContent";

const About = () => {
  const [show, setShow] = useState(false);
  const [pageContent, setPageContent] = useState(null);
  const seo = useSeo("about", {
    title: "About Velvyana - Chikankari & Ethnic Wear",
    description:
      "Learn about Velvyana, a premium brand offering handcrafted chikankari and ethnic wear from Lucknow.",
    keywords: "about velvyana, chikankari brand, lucknow ethnic wear",
  });

  useEffect(() => {
    setShow(true);
    fetch(`${API_URL}/api/pages/about`)
      .then((res) => res.json())
      .then((data) => setPageContent(data.data));
  }, []);

  return (
    // 🔥 FIX: pb-20 added (footer se gap)
    <div className="bg-[#020617] text-gray-200 min-h-screen pb-20">

      <SeoHead {...seo} />

      {/* HERO SECTION */}
      <div className="relative h-[300px] md:h-[400px] w-full">

        <img
          src={aboutBg}
          alt="about"
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* TEXT */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-light tracking-widest">
            ABOUT US
          </h1>
        </div>

      </div>

      {/* FLOATING CONTAINER */}
      <div className="relative -mt-16 px-4 flex justify-center">

        <div
          className={`max-w-4xl w-full bg-[#0f172a] rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800 transition-all duration-700
          ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >

          <div className="space-y-5 text-sm md:text-base leading-relaxed text-gray-300">

            {pageContent ? (
              <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;