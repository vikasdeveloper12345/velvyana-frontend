import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition">

        {/* IMAGE */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-52 object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* CONTENT */}
        <h3 className="mt-3 font-semibold text-black dark:text-white line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          ₹{product.price}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg 
          hover:bg-pink-600 active:scale-95 transition"
        >
          Add to Cart
        </button>

      </div>
    </>
  );
};

export default ProductCard;