import { ImageOff, Plus, Check } from "lucide-react";
import { useState } from "react";
import type { ShopItem } from "../lib/itemService";
import { useCart } from "../context/CartContext";

const ItemCard = ({ item }: { item: ShopItem }) => {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg hover:shadow-stone-200/60">
      <div className="aspect-square w-full overflow-hidden bg-stone-100">
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
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {item.category && (
          <span className="w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-700">
            {item.category}
          </span>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold text-stone-900">{item.name}</h3>
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
    </div>
  );
};

export default ItemCard;
