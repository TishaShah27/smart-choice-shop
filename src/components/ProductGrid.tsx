import { PackageSearch } from "lucide-react";
import type { ShopItem } from "../lib/itemService";
import ItemCard from "./ItemCard";

interface ProductGridProps {
  items: ShopItem[];
  loading: boolean;
  error: boolean;
  emptyMessage?: string;
  skeletonCount?: number;
}

const ProductGrid = ({ items, loading, error, emptyMessage = "No products match your search.", skeletonCount = 8 }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="aspect-square bg-stone-100" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-1/3 rounded bg-stone-100" />
              <div className="h-4 w-4/5 rounded bg-stone-100" />
              <div className="h-5 w-1/2 rounded bg-stone-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-stone-200 bg-white py-20 text-center">
        <PackageSearch className="h-8 w-8 text-stone-300" />
        <p className="text-sm text-stone-500">We couldn't load the catalog right now. Please try again shortly.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-stone-200 bg-white py-20 text-center">
        <PackageSearch className="h-8 w-8 text-stone-300" />
        <p className="text-sm text-stone-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductGrid;
