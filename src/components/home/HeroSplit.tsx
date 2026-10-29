import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80";

const HeroSplit = () => (
  <section className="hero-split bg-brand-50">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 sm:py-16 md:grid-cols-2 lg:px-12">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Live from our warehouse
        </span>
        <h1 className="font-display mt-5 text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
          Shop our full inventory, direct from stock.
        </h1>
        <p className="mt-4 max-w-md text-base text-stone-600">
          Everything here is on our shelves right now. Add what you need to your cart and our team will confirm your
          order shortly.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            to="/products"
            className="hero-cta inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Browse All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/about" className="text-sm font-semibold text-stone-700 hover:text-brand-700">
            Learn about us
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-6 text-sm text-stone-500">
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-brand-600" /> Fast fulfillment
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-600" /> Real-time stock
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -bottom-4 -right-4 h-full w-full hero-offset rounded-[2rem] bg-brand-200/60" />
        <img
          src={HERO_IMAGE}
          alt="Gift set"
          className="hero-photo relative aspect-[5/4] w-full rounded-[2rem] object-cover shadow-xl"
        />
      </div>
    </div>
  </section>
);

export default HeroSplit;
