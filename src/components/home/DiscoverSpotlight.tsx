import { Link } from "react-router-dom";

const DiscoverSpotlight = () => (
  <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
    <div className="grid items-center gap-10 sm:grid-cols-2">
      <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-brand-300">
        <img
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80"
          alt="Spotlight product of the month"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h2 className="font-display text-3xl font-semibold text-stone-900 sm:text-4xl">
          Spotlight Product of the Month
        </h2>
        <p className="mt-4 max-w-md text-sm text-stone-500">
          A sample spotlight slot — feature a real product here once you've got one you want to highlight to every
          visitor.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex w-fit rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Discover More
        </Link>
      </div>
    </div>
  </section>
);

export default DiscoverSpotlight;
