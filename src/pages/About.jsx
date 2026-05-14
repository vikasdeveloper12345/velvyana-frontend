import { useEffect, useState } from "react";
import aboutBg from "../assets/banner/banner.jpeg";
import { Helmet } from "react-helmet";

const About = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    // 🔥 FIX: pb-20 added (footer se gap)
    <div className="bg-[#020617] text-gray-200 min-h-screen pb-20">

      {/* SEO: about page */}
         <Helmet>
         <title>About Velvyana - Chikankari & Ethnic Wear</title>
         <meta
           name="description"
            content="Learn about Velvyana, a premium brand offering handcrafted chikankari and ethnic wear from Lucknow."
          />
        </Helmet>

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

            <p>
              Welcome to <span className="text-white font-medium">Velvyana</span>, a home of handcrafted elegance and timeless Indian artistry.
              Velvyana was born from a deep love for traditional craftsmanship and the desire to bring the soulful beauty of <span className="text-white">Lucknowi Chikankari</span> to women who appreciate grace, heritage, and authenticity.
            </p>

            <p>
              What began as a small dream has now grown into a heartfelt boutique, created with passion and dedication. Every piece at Velvyana is carefully curated and hand-embroidered by skilled artisans.
            </p>

            <p>
              We believe that fashion is not just about wearing clothes — it is about expressing identity, confidence, and emotion.
            </p>

            <p>
              At Velvyana, we focus on premium-quality fabrics like Pure Mulmul, Chanderi, Georgette, Organza, and Silk, paired with intricate handwork and elegant finishing.
            </p>

            {/* PROMISE */}
            <div className="pt-4">
              <h2 className="text-white text-lg font-semibold mb-2">
                Our Promise
              </h2>
              <p>
                To deliver craftsmanship with honesty, luxury with comfort, and beauty with purpose.
              </p>
            </div>

            {/* YOU MATTER */}
            <div className="pt-4">
              <h2 className="text-white text-lg font-semibold mb-2">
                For Us, You Matter
              </h2>
              <p>
                Your feedback, love, and support guide our growth. Velvyana isn’t just a brand — it’s a family built on trust.
              </p>
            </div>

            <p className="text-white font-medium">
              Stay elegant, stay beautiful, stay Velvyana.
            </p>

            {/* CONTACT */}
            <div className="pt-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                For bookings & inquiries:
              </p>

              <p className="text-white mt-1">
                +91 90642 52616
              </p>

              <p className="text-pink-400">
                @velvyanaofficial
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;