import { Link } from "react-router-dom";

const OfferBanner = () => (
  <section className="bg-stone-900">
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:grid-cols-2 lg:px-12">
      <img
        src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80"
        alt="Gift bundle offer"
        className="aspect-[4/3] w-full rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Buy 2 &amp; Get 1 Free</h2>
        <p className="max-w-sm text-sm text-stone-300">
          A sample promotion — swap this copy and the linked bundle for a real offer when you're ready to run one.
        </p>
        <Link
          to="/products"
          className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-brand-100"
        >
          Shop the Offer
        </Link>
      </div>
    </div>
  </section>
);

export default OfferBanner;
