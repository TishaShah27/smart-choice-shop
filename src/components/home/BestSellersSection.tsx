import { Star, Package } from "lucide-react";
import { MOCK_BEST_SELLERS } from "../../lib/mockShowcaseData";

const BestSellersSection = () => (
  <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-12">
    <h2 className="font-display text-3xl font-semibold text-stone-900 sm:text-4xl">Best Sellers</h2>
    <p className="mx-auto mt-3 max-w-md text-sm text-stone-500">
      Taking care of our customers and promoting their well-being is at the heart of what we do.
    </p>

    <div className="mt-12 grid grid-cols-2 gap-6 text-left sm:grid-cols-4">
      {MOCK_BEST_SELLERS.map((product) => (
        <div key={product.name}>
          <div className={`aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
            <Package className="h-10 w-10 text-white/80" />
          </div>
          <div className="mt-3 flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < product.rating ? "fill-brand-500 text-brand-500" : "fill-stone-200 text-stone-200"}`}
              />
            ))}
          </div>
          <p className="mt-1.5 text-sm font-semibold text-stone-900">{product.name}</p>
          <p className="text-sm font-bold text-brand-700">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  </section>
);

export default BestSellersSection;
