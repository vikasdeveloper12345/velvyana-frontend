import { useEffect, useState } from "react";
import banner from "../assets/banner/banner.jpeg";
import { API_URL, resolveImageUrl } from "../utils/api";

const defaults = {
  tagline: "Premium Ethnic Wear",
  title_line1: "WELCOME TO",
  title_line2: "OUR GRACE",
  description:
    "Where tradition meets modern style. Velvyana brings handcrafted beauty, comfort and confidence to every piece you wear.",
  button_text: "View New Arrival",
  button_link: "/products",
  banner_image: "",
};

const Hero = () => {
  const [hero, setHero] = useState(defaults);

  useEffect(() => {
    fetch(`${API_URL}/api/home`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.hero) setHero({ ...defaults, ...data.data.hero });
      });
  }, []);

  const bannerSrc = resolveImageUrl(hero.banner_image) || banner;

  return (
    <>
      <div className="h-[calc(100vh-80px)] flex items-start bg-gray-900">

        <div className="max-w-7xl mx-auto w-full px-6 
        flex flex-col md:flex-row items-start justify-between gap-10 pt-10">

          <div className="max-w-lg md:flex-[0.7]">

            <p className="text-pink-500 font-semibold mb-3 text-sm md:text-base">
              {hero.tagline}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">
              {hero.title_line1} <br /> {hero.title_line2}
            </h1>

            <p className="text-gray-300 mb-6 text-base">
              {hero.description}
            </p>

            <a
              href={hero.button_link || "/products"}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg 
              hover:bg-pink-600 transition inline-block"
            >
              {hero.button_text}
            </a>

          </div>

          <div className="w-full md:flex-[1.5] md:-translate-y-12">

            <div className="rounded-2xl overflow-hidden shadow-lg 
            bg-gray-800 h-[400px] md:h-[490px]">

              <img
                src={bannerSrc}
                alt="banner"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Hero;
