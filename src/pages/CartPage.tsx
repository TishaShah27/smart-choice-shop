import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ImageOff, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { lines, setQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
        <ShoppingBag className="h-10 w-10 text-stone-300" />
        <h1 className="text-xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="text-sm text-stone-500">Browse the catalog and add a few items to get started.</p>
        <Link
          to="/"
          className="mt-3 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-800"
      >
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </button>

      <h1 className="text-2xl font-bold text-stone-900">Your Cart</h1>
      <p className="mt-1 text-sm text-stone-500">{lines.length} item{lines.length === 1 ? "" : "s"}</p>

      <div className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        {lines.map(({ item, quantity }) => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
              {item.primaryImageUrl ? (
                <img src={item.primaryImageUrl} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-stone-300">
                  <ImageOff className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-stone-900">{item.name}</p>
              <p className="text-xs text-stone-400">${item.sellingPrice.toFixed(2)} each</p>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-stone-200">
              <button
                onClick={() => setQuantity(item.id, quantity - 1)}
                className="flex h-8 w-8 items-center justify-center text-stone-500 hover:text-stone-900"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(item.id, quantity + 1)}
                className="flex h-8 w-8 items-center justify-center text-stone-500 hover:text-stone-900"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <span className="w-20 shrink-0 text-right text-sm font-bold text-stone-900">
              ${(item.sellingPrice * quantity).toFixed(2)}
            </span>

            <button
              onClick={() => removeItem(item.id)}
              className="shrink-0 text-stone-300 hover:text-red-500"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-400">Total</p>
          <p className="text-2xl font-bold text-stone-900">${totalPrice.toFixed(2)}</p>
        </div>
        <Link
          to="/checkout"
          className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
