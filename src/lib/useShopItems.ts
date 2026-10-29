import { useEffect, useState } from "react";
import { fetchShopItems, type ShopItem } from "./itemService";

export const useShopItems = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetchShopItems()
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((err) => {
        console.error("Error loading items:", err);
        if (active) setError(true);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { items, loading, error };
};
