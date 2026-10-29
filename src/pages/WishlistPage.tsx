import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import ItemCard from "../components/ItemCard";

const WishlistPage = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-20 text-center lg:px-12">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Heart className="h-9 w-9" />
        </span>
        <h1 className="font-display text-3xl font-semibold text-stone-900">Your wishlist is empty</h1>
        <p className="max-w-sm text-sm text-stone-500">Tap the heart on any product to save it here for later.</p>
        <Link
          to="/products"
          className="mt-3 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
      <h1 className="text-2xl font-bold text-stone-900">Your Wishlist</h1>
      <p className="mt-1 text-sm text-stone-500">
        {items.length} saved item{items.length === 1 ? "" : "s"}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
