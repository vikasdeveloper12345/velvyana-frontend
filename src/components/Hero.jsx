import banner from "../assets/banner/banner.jpeg";
import { Helmet } from "react-helmet";

const Hero = () => {
  return (
    <>
      <Helmet>
        <title>Velvyana | Premium Ethnic Wear for Women</title>

        <meta
          name="description"
          content="Shop premium ethnic wear at Velvyana. Discover handcrafted sarees, kurtis, suits and elegant traditional styles."
        />

        <meta
          name="keywords"
          content="velvyana, ethnic wear, saree, kurti, lehenga, chikankari, women fashion india"
        />
      </Helmet>

      <div className="h-[calc(100vh-80px)] flex items-start bg-gray-900">

        <div className="max-w-7xl mx-auto w-full px-6 
        flex flex-col md:flex-row items-start justify-between gap-10 pt-10">

          {/* LEFT */}
          <div className="max-w-lg md:flex-[0.7]">

            <p className="text-pink-500 font-semibold mb-3 text-sm md:text-base">
              Premium Ethnic Wear
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-white">
              WELCOME TO <br /> OUR GRACE
            </h1>

            <p className="text-gray-300 mb-6 text-base">
              Where tradition meets modern style. Velvyana brings handcrafted
              beauty, comfort and confidence to every piece you wear.
            </p>

            <a
              href="/products"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg 
              hover:bg-pink-600 transition inline-block"
            >
              View New Arrival
            </a>

          </div>

          {/* RIGHT (SAME SIZE) */}
          <div className="w-full md:flex-[1.5] md:-translate-y-12">

            <div className="rounded-2xl overflow-hidden shadow-lg 
            bg-gray-800 h-[400px] md:h-[490px]">

              <img
                src={banner}
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