import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";
import { DEFAULT_STORE_SETTINGS } from "../utils/cartPricing";

export const useStoreSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_STORE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/store/settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSettings({
            cart_discount_amount: Number(data.data.cart_discount_amount),
            free_delivery_enabled: !!data.data.free_delivery_enabled,
            cod_charge: Number(data.data.cod_charge),
            standard_shipping_charge: Number(data.data.standard_shipping_charge),
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
};
