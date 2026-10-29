import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useShopItems } from "../lib/useShopItems";
import ProductGrid from "../components/ProductGrid";

const ProductsPage = () => {
  const { items, loading, error } = useShopItems();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const category = searchParams.get("category") ?? "all";

  // Jumping back to this page with a different ?category= (e.g. from a Home category
  // card) should always land scrolled to the top of the results.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  const setCategory = (next: string) => {
    if (next === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", next);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category).filter(Boolean))).sort(),
    [items]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !term || item.name.toLowerCase().includes(term) || item.sku.toLowerCase().includes(term);
      const matchesCategory = category === "all" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">All Products</h1>
        <p className="mt-1 text-sm text-stone-500">{items.length} item{items.length === 1 ? "" : "s"} currently in stock</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-brand-300 placeholder:text-stone-400 focus:ring-2"
          />
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === "all" ? "bg-stone-900 text-white" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  category === c ? "bg-stone-900 text-white" : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <ProductGrid items={filtered} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default ProductsPage;
