import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import banner from "../assets/banner/blog.png";
import SeoHead from "../components/SeoHead";
import { API_URL, resolveImageUrl, stripHtml } from "../utils/api";
import { useSeo } from "../hooks/useSeo";

const hasHtml = (value) => /<[a-z][\s\S]*>/i.test(value || "");

const isPlainHeading = (line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 90) return false;
  if (trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed)) return true;
  if (/^[A-Z][^.]{0,80}\?$/.test(trimmed)) return true;
  const words = trimmed.split(/\s+/);
  return words.length <= 7 && !/[.!]$/.test(trimmed) && /^[A-Z]/.test(trimmed);
};

const renderPlainContent = (content) =>
  content.split("\n").filter(Boolean).map((line, i) => {
    const trimmed = line.trim();
    if (isPlainHeading(trimmed)) {
      return (
        <h2 key={i} className="text-[13px] font-semibold uppercase text-gray-200 mb-2">
          {trimmed}
        </h2>
      );
    }
    return (
      <p key={i} className="text-[13px] leading-6 text-gray-400 mb-3">
        {trimmed}
      </p>
    );
  });

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  const pageKey = blog?.id ? `blog-${blog.id}` : null;
  const seo = useSeo(pageKey, {
    title: blog ? `${blog.title} - Velvyana Blog` : "Velvyana Blog",
    description: stripHtml(blog?.excerpt || blog?.short || ""),
    keywords: blog ? `${blog.title}, velvyana blog, chikankari` : "",
  });

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.data) return;
        if (/^\d+$/.test(slug) && data.data.slug && data.data.slug !== slug) {
          navigate(`/blog/${data.data.slug}`, { replace: true });
          return;
        }
        setBlog(data.data);
      });
  }, [slug, navigate]);

  if (!blog) {
    return (
      <div className="bg-[#0a0f1c] text-gray-300 min-h-screen p-10">
        Loading...
      </div>
    );
  }

  const heroSrc = resolveImageUrl(blog.img) || banner;

  return (
    <div className="bg-[#0a0f1c] text-gray-300 min-h-screen">
      <SeoHead {...seo} />

      <div
        className="w-full h-[300px] md:h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroSrc})` }}
      />

      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-4xl mx-auto text-left">
          {blog.date && (
            <p className="text-xs text-gray-500 mb-3">{blog.date}</p>
          )}

          <h1 className="text-[16px] md:text-[18px] font-semibold uppercase text-white mb-4">
            {blog.title}
          </h1>

          {hasHtml(blog.content) ? (
            <div
              className="blog-article"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            renderPlainContent(blog.content || "")
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
