import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner/blog.png";
import SeoHead from "../components/SeoHead";
import { useSeo } from "../hooks/useSeo";
import { API_URL, resolveImageUrl, stripHtml } from "../utils/api";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const seo = useSeo("blog", {
    title: "Velvyana Blog - Chikankari & Fashion Guides",
    description:
      "Explore Velvyana blog for chikankari fashion tips, styling guides, and latest ethnic wear trends.",
    keywords: "velvyana blog, chikankari guide, ethnic fashion, styling tips",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data.data || []));
  }, []);

  return (
    <div className="bg-[#020617] text-white min-h-screen">
      <SeoHead {...seo} />

      <div className="w-full h-[260px] md:h-[340px] overflow-hidden">
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        <h1 className="text-2xl font-semibold mb-8">Our Blog</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#0f172a] rounded-xl overflow-hidden shadow-md group"
            >
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={resolveImageUrl(blog.img) || banner}
                  alt={blog.title}
                  onError={(e) => { e.target.src = banner; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4 space-y-2">
                <p className="text-xs text-gray-400">{blog.date}</p>
                <h2 className="text-sm font-semibold uppercase">{blog.title}</h2>
                <p className="text-xs text-gray-400">{stripHtml(blog.short)}</p>
                <button
                  onClick={() => navigate(`/blog/${blog.slug || blog.id}`)}
                  className="text-pink-500 text-sm mt-2"
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
