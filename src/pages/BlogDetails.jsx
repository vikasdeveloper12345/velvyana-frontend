import { useParams } from "react-router-dom";
import banner from "../assets/banner/blog.png";
import { Helmet } from "react-helmet";

const BlogDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#0a0f1c] text-gray-300 min-h-screen">

      <Helmet>
       <title>Velvyana Blog - Chikankari Guide</title>

      <meta
      name="description"
      content="Explore Velvyana blog to learn about chikankari suit pieces, anarkali and saree styling with handcrafted elegance."
      />

     <meta
      name="keywords"
      content="velvyana blog, chikankari guide, saree styling, anarkali dress, ethnic wear tips, indian fashion blog"
     />
    </Helmet>

      {/* IMAGE */}
      <div
        className="w-full h-[300px] md:h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      />

      {/* TEXT ALIGNMENT FIX */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-10">

        {/* 🔥 THIS IS THE KEY FIX */}
        <div className="max-w-4xl mx-auto text-left">

          {/* TITLE */}
          <h1 className="text-[16px] md:text-[18px] font-semibold uppercase text-white mb-4">
            The Essence of Velvyana Chikankari: A Closer Look at Our Signature Categories
          </h1>

          {/* INTRO */}
          <p className="text-[13px] leading-6 text-gray-400 mb-3">
            At Velvyana Chikankari, our design philosophy is simple: purity,
            softness and handcrafted elegance. Every piece is created to bring
            comfort and beauty into your everyday life.
          </p>

          <p className="text-[13px] leading-6 text-gray-400 mb-6">
            To introduce you to our world, here is a closer look at the three
            categories that best reflect who we are as a brand.
          </p>

          {/* SECTION */}
          <h2 className="text-[13px] font-semibold uppercase text-gray-200 mb-2">
            Suit Piece
          </h2>

          <p className="text-[13px] leading-6 text-gray-400 mb-6">
            Our Pure Mulmul suit pieces are loved for their gentle feel and
            breathable fabric. Each set features delicate Chikankari embroidery...
          </p>

          <h2 className="text-[13px] font-semibold uppercase text-gray-200 mb-2">
            Anarkali
          </h2>

          <p className="text-[13px] leading-6 text-gray-400 mb-6">
            Anarkalis at Velvyana are designed to feel light, flowy and effortlessly elegant...
          </p>

          <h2 className="text-[13px] font-semibold uppercase text-gray-200 mb-2">
            Saree
          </h2>

          <p className="text-[13px] leading-6 text-gray-400 mb-6">
            Our sarees embody quiet luxury...
          </p>

          <h2 className="text-[13px] font-semibold uppercase text-gray-200 mb-2">
            A Note from Velvyana
          </h2>

          <p className="text-[13px] leading-6 text-gray-400">
            Every piece at Velvyana is crafted with patience and real human artistry...
          </p>

        </div>
      </div>

    </div>
  );
};

export default BlogDetails;