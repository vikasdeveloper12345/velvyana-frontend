import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, getProductPath } from "../utils/api";

const ProductRedirect = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          navigate(getProductPath(data.data), { replace: true });
        } else {
          navigate("/products", { replace: true });
        }
      })
      .catch(() => navigate("/products", { replace: true }));
  }, [slug, navigate]);

  return <div className="text-white p-10">Loading...</div>;
};

export default ProductRedirect;
