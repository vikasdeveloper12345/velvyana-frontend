import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import ServiceHighlights from "../components/ServiceHighlights";
import NewArrival from "../components/NewArrival";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">

      <Helmet>
  <title>Velvyana - Premium Chikankari & Ethnic Wear for Women</title>

   <meta
    name="description"
    content="Discover premium chikankari kurtis, sarees and ethnic wear for women. Handmade elegance from Lucknow at Velvyana."
   />

   <meta
    name="keywords"
    content="velvyana, chikankari kurti, ethnic wear women, saree, lucknow chikankari, indian fashion"
    />
   </Helmet>

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