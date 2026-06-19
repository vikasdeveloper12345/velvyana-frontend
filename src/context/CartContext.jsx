import { createContext, useContext, useState, useEffect } from "react";
import { normalizeProduct } from "../utils/api";

const CartContext = createContext();

// ✅ custom hook
export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {

  // ✅ LOAD FROM LOCAL STORAGE
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ ADD TO CART
  const addToCart = (product) => {
    const item = normalizeProduct(product);
    setCart((prev) => {
      const exist = prev.find((i) => String(i.id) === String(item.id));

      if (exist) {
        return prev.map((i) =>
          String(i.id) === String(item.id)
            ? { ...i, qty: i.qty + (product.qty || 1) }
            : i
        );
      }

      return [...prev, { ...item, qty: product.qty || 1 }];
    });
  };

  // ➖ DECREASE / REMOVE
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          String(item.id) === String(id)
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const replaceCart = (items) => {
    setCart(
      (items || []).map((product) => ({
        ...normalizeProduct(product),
        qty: Number(product.qty) || 1,
      }))
    );
  };

  const clearCart = () => setCart([]);

  // 💰 TOTAL ITEMS
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        replaceCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;