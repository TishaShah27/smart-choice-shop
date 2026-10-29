import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  ImageOff,
  ShieldCheck,
  PackageCheck,
  MessageCircle,
  Check,
} from "lucide-react";
import { useShopItems } from "../lib/useShopItems";
import { useCart } from "../context/CartContext";
import ItemCard from "../components/ItemCard";

const perks = [
  { icon: ShieldCheck, title: "Secure checkout", text: "Your order details stay protected from cart to confirmation." },
  { icon: PackageCheck, title: "Quality-checked stock", text: "Every item is stocked and checked before it reaches the shop." },
  { icon: MessageCircle, title: "Need help?", text: "Questions about this product? Our team is happy to help." },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const { items, loading } = useShopItems();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const item = items.find((i) => i.id === id);

  // Reset local state when navigating from one product straight to another (related products).
  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    window.scrollTo({ top: 0 });
  }, [id]);

  if (loading) {
    return <p className="py-32 text-center text-sm text-stone-500">Loading...</p>;
  }

  if (!item) {
    return (
      <div className="py-32 text-center">
        <p className="text-sm text-stone-500">This product could not be found.</p>
        <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-brand-600">
          Back to products
        </Link>
      </div>
    );
  }

  const images = [item.primaryImageUrl, item.secondaryImageUrl].filter(Boolean);
  const mainImage = images[activeImage] ?? images[0];

  const sameCategory = items.filter((i) => i.id !== item.id && item.category && i.category === item.category);
  const others = items.filter((i) => i.id !== item.id && !sameCategory.includes(i));
  const related = [...sameCategory, ...others].slice(0, 4);

  const inStock = item.stockQuantity > 0;
  const lowStock = item.stockQuantity > 0 && item.stockQuantity <= 10;

  const specs = [
    ["SKU", item.sku],
    ["Category", item.category || "—"],
    ["Department", item.department || "—"],
    ["Unit", item.unit || "—"],
    ["Availability", inStock ? (lowStock ? `Only ${item.stockQuantity} left` : "In stock") : "Out of stock"],
  ];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(item);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-stone-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/products" className="hover:text-brand-600">Products</Link>
        {item.category && (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{item.category}</span>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate font-medium text-stone-900">{item.name}</span>
      </nav>

      {/* Main product block */}
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-stone-200 bg-white p-6">
            {mainImage ? (
              <img src={mainImage} alt={item.name} className="h-full w-full object-contain" />
            ) : (
              <ImageOff className="h-16 w-16 text-stone-300" />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`h-20 w-20 overflow-hidden rounded-2xl border-2 bg-white p-1.5 transition-colors ${
                    idx === activeImage ? "border-brand-500" : "border-stone-200 hover:border-stone-300"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {item.category && (
            <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {item.category}
            </span>
          )}
          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="font-display text-4xl font-semibold leading-tight text-stone-900">{item.name}</h1>
            <button
              type="button"
              onClick={() => setLiked((l) => !l)}
              aria-label="Favourite"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white"
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-orange-500 text-orange-500" : "text-stone-400"}`} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-3xl font-bold text-stone-900">${item.sellingPrice.toFixed(2)}</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                inStock ? "bg-brand-50 text-brand-700" : "bg-stone-100 text-stone-500"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              {inStock ? (lowStock ? `Only ${item.stockQuantity} left` : "In stock") : "Out of stock"}
            </span>
          </div>

          <div className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="font-semibold text-stone-900">Description</h2>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-stone-500">
              {specs.slice(0, 4).map(([label, value]) => (
                <li key={label}>
                  {label}: {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-full bg-white p-1.5 shadow-md">
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
            <button
              type="button"
              onClick={handleAdd}
              className="flex h-14 min-w-64 flex-1 items-center justify-center gap-2 rounded-full bg-stone-900 font-semibold text-white transition-colors hover:bg-black"
            >
              <ShoppingCart className="h-5 w-5" />
              {justAdded ? "Added!" : "Add To Cart"}
            </button>
          </div>
          <p className="mt-3 text-sm text-stone-500">
            Total: <span className="font-semibold text-stone-900">${(item.sellingPrice * quantity).toFixed(2)}</span>
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {perks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-stone-200 bg-white p-4">
                <Icon className="h-6 w-6 text-brand-600" />
                <p className="mt-3 text-sm font-semibold text-stone-900">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-stone-900">Product Details</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          {specs.map(([label, value], idx) => (
            <div
              key={label}
              className={`grid grid-cols-3 gap-4 px-6 py-4 text-sm ${idx % 2 === 0 ? "bg-stone-50/60" : ""}`}
            >
              <span className="font-medium text-stone-500">{label}</span>
              <span className="col-span-2 font-semibold text-stone-900">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-stone-900">You may also like</h2>
            <Link to="/products" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all products
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((r) => (
              <ItemCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
