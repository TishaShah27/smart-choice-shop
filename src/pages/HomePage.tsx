import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Truck, PackageCheck, Tag } from "lucide-react";
import { useShopItems } from "../lib/useShopItems";
import ProductGrid from "../components/ProductGrid";
import HeroSplit from "../components/home/HeroSplit";
import BestSellersSection from "../components/home/BestSellersSection";
import OfferBanner from "../components/home/OfferBanner";
import DiscoverSpotlight from "../components/home/DiscoverSpotlight";
import TestimonialsSection from "../components/home/TestimonialsSection";

const HomePage = () => {
  const { items, loading, error } = useShopItems();

  // One representative item image per category — real inventory photos, not stock art.
  const categoryCards = useMemo(() => {
    const byCategory = new Map<string, { count: number; image: string }>();
    for (const item of items) {
      if (!item.category) continue;
      const existing = byCategory.get(item.category);
      if (existing) {
        existing.count += 1;
        if (!existing.image && item.primaryImageUrl) existing.image = item.primaryImageUrl;
      } else {
        byCategory.set(item.category, { count: 1, image: item.primaryImageUrl });
      }
    }
    return Array.from(byCategory.entries())
      .map(([name, info]) => ({ name, ...info }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [items]);

  const featured = items.slice(0, 4);

  return (
    <div>
      <HeroSplit />

      {/* Shop by category — real data */}
      {categoryCards.length > 0 && (
        <div className="bg-white">
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Shop by Category</h2>
              <p className="mt-1 text-sm text-stone-500">Jump straight to what you're looking for.</p>
            </div>
            <Link to="/products" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline">
              View all
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categoryCards.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200"
              >
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-brand-400 to-brand-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-base font-bold text-white">{cat.name}</p>
                  <p className="text-xs text-white/70">{cat.count} item{cat.count === 1 ? "" : "s"}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        </div>
      )}

      {/* Featured products — real data, actually purchasable */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Featured Products</h2>
            <p className="mt-1 text-sm text-stone-500">A sample of what's currently in stock.</p>
          </div>
          <Link to="/products" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-6">
          <ProductGrid items={featured} loading={loading} error={error} skeletonCount={4} />
        </div>
      </section>

      {/* Below this point: decorative sections using placeholder/mock content —
          see src/lib/mockShowcaseData.ts for what to swap out before going live. */}
      <div className="bg-white">
        <BestSellersSection />
      </div>

      <OfferBanner />

      <div className="bg-white">
        <DiscoverSpotlight />
      </div>

      <TestimonialsSection />

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-4 rounded-2xl bg-brand-50 p-8 sm:grid-cols-3 sm:p-10">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Fast Fulfillment</p>
              <p className="mt-0.5 text-xs text-stone-500">Orders are reviewed and confirmed quickly by our team.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600">
              <PackageCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Real-Time Stock</p>
              <p className="mt-0.5 text-xs text-stone-500">What you see here is what's actually available today.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600">
              <Tag className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Ask About Bulk Pricing</p>
              <p className="mt-0.5 text-xs text-stone-500">Ordering in volume? Reach out and we'll work with you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
