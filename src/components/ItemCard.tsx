import { ImageOff, Plus, Check, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ShopItem } from "../lib/itemService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductDetailSheet from "./ProductDetailSheet";

const ItemCard = ({ item }: { item: ShopItem }) => {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const wished = has(item.id);
  const [justAdded, setJustAdded] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const navigate = useNavigate();

  // Laptop (md+) opens the full product page; mobile opens the bottom sheet.
  const openDetail = () => {
    if (window.matchMedia("(min-width: 768px)").matches) navigate(`/products/${item.id}`);
    else setDetailOpen(true);
  };

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg hover:shadow-stone-200/60">
      <div className="relative">
      <button
        type="button"
        onClick={openDetail}
        className="block aspect-square w-full overflow-hidden bg-stone-100"
        aria-label={`View ${item.name}`}
      >
        {item.primaryImageUrl ? (
          <img
            src={item.primaryImageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-300">
            <ImageOff className="h-8 w-8" />
          </div>
        )}
      </button>
      <button
        type="button"
        onClick={() => toggle(item)}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-500 shadow-sm backdrop-blur transition-colors hover:text-red-500"
        aria-label={wished ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`}
        aria-pressed={wished}
      >
        <Heart className={`h-4.5 w-4.5 ${wished ? "fill-red-500 text-red-500" : ""}`} />
      </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {item.category && (
          <span className="w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-700">
            {item.category}
          </span>
        )}
        <button
          type="button"
          onClick={openDetail}
          className="line-clamp-2 text-left text-sm font-semibold text-stone-900 hover:text-brand-600"
        >
          {item.name}
        </button>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-stone-900">${item.sellingPrice.toFixed(2)}</span>
          <button
            type="button"
            onClick={handleAdd}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              justAdded ? "bg-brand-600 text-white" : "bg-stone-900 text-white hover:bg-brand-600"
            }`}
            aria-label={`Add ${item.name} to cart`}
          >
            {justAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {detailOpen && <ProductDetailSheet item={item} onClose={() => setDetailOpen(false)} />}
    </div>
  );
};

export default ItemCard;
