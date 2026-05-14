import blogBg from "../assets/banner/blog.png";
import { Helmet } from "react-helmet";

const ACloserLook = () => {
  return (
    <div className="bg-[#f5f5f5] text-[#374151] min-h-screen">

      {/* SEO */}
      <Helmet>
        <title>A Closer Look - Velvyana Chikankari</title>

        <meta
          name="description"
          content="Explore Velvyana’s signature chikankari categories including suit pieces, anarkali and sarees."
        />
      </Helmet>

      {/* HERO */}
      <div className="relative h-[280px] md:h-[380px] w-full">

        <img
          src={blogBg}
          alt="blog"
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* title */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-white text-2xl md:text-4xl font-light text-center max-w-3xl leading-relaxed">
            A Closer Look at Our Signature Categories
          </h1>
        </div>

      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">

          <div className="bg-white p-6 md:p-10 rounded-sm shadow-sm leading-8 text-[15px] space-y-6">

            <h2 className="text-2xl md:text-3xl text-[#111827] font-light leading-relaxed">
              The Essence of Velvyana Chikankari
            </h2>

            <p>
              At Velvyana Chikankari, our design philosophy is rooted in softness,
              elegance and timeless handcrafted artistry.
            </p>

            <p>
              Every collection is thoughtfully created to celebrate traditional
              chikankari while bringing comfort and effortless beauty into modern wardrobes.
            </p>

            {/* Suit */}
            <div>
              <h3 className="text-xl text-[#111827] font-medium mb-3">
                Suit Piece
              </h3>

              <p>
                Our Pure Mulmul suit pieces are admired for their breathable feel,
                lightweight texture and graceful embroidery patterns.
              </p>
            </div>

            {/* Anarkali */}
            <div>
              <h3 className="text-xl text-[#111827] font-medium mb-3">
                Anarkali
              </h3>

              <p>
                Designed with flowing silhouettes and refined chikankari work,
                our Anarkalis bring elegance to festive and special occasions.
              </p>
            </div>

            {/* Saree */}
            <div>
              <h3 className="text-xl text-[#111827] font-medium mb-3">
                Saree
              </h3>

              <p>
                Crafted on soft fabrics like Organza, Kota and Georgette,
                our sarees reflect understated luxury and timeless femininity.
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div>

          <div className="bg-[#f3f3f3] p-8">

            <h3 className="uppercase tracking-[2px] text-sm text-gray-500 mb-8">
              Recent Posts
            </h3>

            <div className="space-y-2">

              <h4 className="text-[28px] leading-[42px] font-light text-[#374151] hover:text-black transition cursor-pointer">
                A Closer Look at Our Signature Categories
              </h4>

              <p className="text-gray-400 text-lg">
                MAY, 4 2025
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ACloserLook;