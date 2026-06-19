export const DEFAULT_STORE_SETTINGS = {
  cart_discount_amount: 800,
  free_delivery_enabled: true,
  cod_charge: 40,
  standard_shipping_charge: 0,
};

export const calculateCartPricing = (cart, settings = {}, paymentMethod = null) => {
  const cfg = { ...DEFAULT_STORE_SETTINGS, ...settings };
  const items = cart || [];

  const subtotal = items.reduce((acc, item) => acc + Number(item.price) * Number(item.qty || 1), 0);
  const totalItems = items.reduce((acc, item) => acc + Number(item.qty || 1), 0);
  const discount =
    cfg.cart_discount_amount > 0 && subtotal > 0
      ? Math.min(Number(cfg.cart_discount_amount), subtotal)
      : 0;

  let shipping = 0;
  if (paymentMethod === "COD") {
    shipping = Number(cfg.cod_charge) || 0;
  } else if (!cfg.free_delivery_enabled) {
    shipping = Number(cfg.standard_shipping_charge) || 0;
  }

  const total = Math.max(subtotal - discount + shipping, 0);

  return {
    subtotal,
    totalItems,
    lineCount: items.length,
    discount,
    shipping,
    total,
    freeDelivery: !!cfg.free_delivery_enabled && paymentMethod !== "COD",
  };
};
