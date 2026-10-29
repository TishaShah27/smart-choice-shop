import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ShopItem } from "../lib/itemService";

interface WishlistContextValue {
  items: ShopItem[];
  has: (itemId: string) => boolean;
  toggle: (item: ShopItem) => void;
  remove: (itemId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "smart_choice_shop_wishlist";

const loadInitialItems = (): ShopItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShopItem[]) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ShopItem[]>(loadInitialItems);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage disabled: the wishlist just won't persist across reloads.
    }
  }, [items]);

  const has = (itemId: string) => items.some((i) => i.id === itemId);
  const remove = (itemId: string) => setItems((prev) => prev.filter((i) => i.id !== itemId));
  const toggle = (item: ShopItem) =>
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev.filter((i) => i.id !== item.id) : [...prev, item]));

  return <WishlistContext.Provider value={{ items, has, toggle, remove }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextValue => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
};
