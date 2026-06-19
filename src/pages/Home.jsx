import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import ServiceHighlights from "../components/ServiceHighlights";
import NewArrival from "../components/NewArrival";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";

const Home = () => {
  const seo = useSeo("home", {
    title: "Velvyana - Premium Chikankari & Ethnic Wear for Women",
    description: "Discover premium chikankari kurtis, sarees and ethnic wear for women. Handmade elegance from Lucknow at Velvyana.",
    keywords: "velvyana, chikankari kurti, ethnic wear women, saree, lucknow chikankari, indian fashion",
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">

      <SeoHead {...seo} />

      {/* MAIN CONTENT */}
      <div className="flex-grow">

        <div className="py-10">
          <div className="max-w-7xl mx-auto px-6">

            <Hero />
            <CategorySection />
            <NewArrival />
            <FeaturedProducts />

          </div>
        </div>

        {/* FULL WIDTH */}
        <ServiceHighlights />

      </div>

    </div>
  );
};

export default Home;