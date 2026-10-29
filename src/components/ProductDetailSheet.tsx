import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, ShoppingCart, Minus, Plus, Heart, ImageOff } from "lucide-react";
import type { ShopItem } from "../lib/itemService";
import { useCart } from "../context/CartContext";

interface Props {
  item: ShopItem;
  onClose: () => void;
}

// Bottom sheet on mobile (slides up over the current screen, rounded top); centered two-column dialog on laptop.
const ProductDetailSheet = ({ item, onClose }: Props) => {
  const { addItem, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(item);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  const details = [
    item.category && `Category: ${item.category}`,
    item.department && `Department: ${item.department}`,
    item.unit && `Unit: ${item.unit}`,
    `SKU: ${item.sku}`,
  ].filter(Boolean) as string[];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true">
      <div className="sheet-backdrop absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="sheet-panel relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-stone-50 md:max-h-[90vh] md:max-w-4xl md:rounded-[2rem]">
        <div className="flex items-center justify-between px-5 pb-2 pt-5 md:px-8 md:pt-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <X className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">Product Details</h1>
          <Link
            to="/cart"
            onClick={onClose}
            aria-label="Cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <div className="grid flex-1 gap-6 overflow-y-auto px-5 pb-28 md:grid-cols-2 md:items-start md:gap-10 md:px-8 md:pb-8">
          <div className="flex flex-col items-center">
            <div className="flex aspect-square w-full max-w-[16rem] items-center justify-center md:max-w-sm">
              {item.primaryImageUrl ? (
                <img src={item.primaryImageUrl} alt={item.name} className="h-full w-full object-contain" />
              ) : (
                <ImageOff className="h-12 w-12 text-stone-300" />
              )}
            </div>
            <div className="-mt-3 flex items-center gap-4 rounded-full bg-white p-1.5 shadow-md">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-6 text-center font-semibold">{String(quantity).padStart(2, "0")}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(Math.max(item.stockQuantity, 1), q + 1))}
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold leading-snug">{item.name}</h2>
              <button
                type="button"
                onClick={() => setLiked((l) => !l)}
                aria-label="Favourite"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
              >
                <Heart className={`h-6 w-6 ${liked ? "fill-orange-500 text-orange-500" : "text-stone-400"}`} />
              </button>
            </div>

            <p className="mt-4 text-2xl font-bold">${item.sellingPrice.toFixed(2)}</p>

            <h3 className="mt-6 font-semibold">Description</h3>
            <ul className="mt-2 space-y-1 text-[15px] leading-relaxed text-stone-500">
              {details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-8 hidden h-14 w-full items-center justify-center gap-2 rounded-full bg-stone-900 font-semibold text-white transition-colors hover:bg-black md:flex"
            >
              <ShoppingCart className="h-5 w-5" />
              {justAdded ? "Added!" : "Add To Cart"}
            </button>
          </div>
        </div>

        {/* Mobile: pinned to the bottom of the sheet */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent px-5 pb-6 pt-6 md:hidden">
          <button
            type="button"
            onClick={handleAdd}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-stone-900 font-semibold text-white"
          >
            <ShoppingCart className="h-5 w-5" />
            {justAdded ? "Added!" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProductDetailSheet;
