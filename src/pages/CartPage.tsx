import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ImageOff, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useShopItems } from "../lib/useShopItems";
import ProductGrid from "../components/ProductGrid";

// Sad shopping-bag mascot for the empty state. Face/outline use a fixed dark ink so they stay visible on the white bag in dark mode.
const SadBag = () => (
  <svg viewBox="0 0 260 270" className="h-52 w-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* ground shadow + drifting tumbleweed dots */}
    <ellipse cx="130" cy="256" rx="62" ry="7" className="fill-stone-200" />
    <circle cx="22" cy="150" r="3" className="fill-brand-300" />
    <circle cx="240" cy="110" r="4" className="fill-brand-300" />
    <circle cx="236" cy="190" r="2.5" className="fill-brand-300" />

    {/* handles (slightly drooped) */}
    <path d="M96 62 c-4 -34 72 -38 72 -4" className="stroke-stone-900" strokeWidth="2.5" />
    {/* body (wider) */}
    <path d="M84 70 L214 62 L218 208 L88 214z" className="fill-brand-700" />
    <path d="M70 60 L190 52 L194 202 L74 210z" className="fill-white" stroke="#1c1917" strokeWidth="2.5" />
    <path d="M190 52 L212 62 L216 192 L194 202z" className="fill-brand-600" stroke="#1c1917" strokeWidth="2.5" />
    {/* sad face */}
    <path d="M94 104 q10 -6 20 2 M146 102 q10 -8 20 -1" stroke="#1c1917" strokeWidth="2.5" />
    <circle cx="104" cy="118" r="5" fill="#1c1917" />
    <circle cx="156" cy="116" r="5" fill="#1c1917" />
    <path d="M104 156 q26 -22 54 -2" stroke="#1c1917" strokeWidth="2.5" />
    {/* tear */}
    <path d="M162 130 q6 9 0 14 q-6 -5 0 -14z" className="fill-sky-300" />
    {/* arms hanging down */}
    <path d="M70 112 C46 132 40 164 50 188" className="stroke-stone-900" strokeWidth="2.5" />
    <path d="M194 108 C218 128 226 160 216 184" className="stroke-stone-900" strokeWidth="2.5" />
    {/* legs */}
    <path d="M104 208 C104 228 100 240 96 250" className="stroke-stone-900" strokeWidth="2.5" />
    <path d="M152 204 C154 226 158 240 162 250" className="stroke-stone-900" strokeWidth="2.5" />
    <path d="M84 252 l16 -4 4 8 -20 0z" className="fill-brand-600 stroke-stone-900" strokeWidth="2" />
    <path d="M158 250 l16 4 -2 6 -18 -2z" className="fill-brand-600 stroke-stone-900" strokeWidth="2" />
  </svg>
);

const CartPage = () => {
  const { lines, setQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();
  const { items, loading, error } = useShopItems();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-brand-50 px-6 py-10 text-center">
          <SadBag />
          <h1 className="font-display text-3xl font-semibold text-stone-900">Your cart is empty</h1>
          <p className="max-w-sm text-sm text-stone-500">
            Looks like you haven&rsquo;t added anything yet. Let&rsquo;s fix that!
          </p>
          <Link
            to="/products"
            className="mt-3 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold text-stone-900">You might like</h2>
          <p className="mt-1 text-sm text-stone-500">A few things currently in stock.</p>
          <div className="mt-6">
            <ProductGrid items={items.slice(0, 4)} loading={loading} error={error} skeletonCount={4} />
          </div>
        </div>
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
          <div key={item.id} className="flex flex-wrap items-center gap-x-5 gap-y-4 p-5">
            <div className="flex min-w-[12rem] flex-1 items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                {item.primaryImageUrl ? (
                  <img src={item.primaryImageUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-stone-300">
                    <ImageOff className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold text-stone-900">{item.name}</p>
                <p className="mt-1 text-xs text-stone-400">${item.sellingPrice.toFixed(2)} each</p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-5">
              <div className="flex items-center gap-1 rounded-full border border-stone-200">
                <button
                  onClick={() => setQuantity(item.id, quantity - 1)}
                  className="flex h-9 w-9 items-center justify-center text-stone-500 hover:text-stone-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(item.id, quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center text-stone-500 hover:text-stone-900"
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100 hover:text-red-600"
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6">
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
