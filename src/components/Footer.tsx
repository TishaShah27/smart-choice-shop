import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-stone-200 bg-stone-100/60">
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight text-stone-900">Smart Choice</span>
          </Link>
          <p className="mt-3 text-sm text-stone-500">
            This is a demo storefront for Smart Choice. Orders placed here are reviewed by our team before
            fulfillment.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li><Link to="/products" className="hover:text-brand-700">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-brand-700">Cart</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li><Link to="/about" className="hover:text-brand-700">About Us</Link></li>
              <li><Link to="/reviews" className="hover:text-brand-700">Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-brand-700">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-stone-100 pt-6 text-center text-xs text-stone-400">
        &copy; {new Date().getFullYear()} Smart Choice. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
