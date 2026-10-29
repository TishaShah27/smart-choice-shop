import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Sparkles, Menu, X, Heart, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { totalItems } = useCart();
  const { items: wishlist } = useWishlist();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] font-medium transition-colors ${isActive ? "text-stone-900" : "text-stone-500 hover:text-stone-900"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-10 sm:py-5 lg:px-16">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        {pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-colors hover:bg-stone-100 md:hidden"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
        )}
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap text-base font-bold tracking-tight text-stone-900 sm:text-lg">Smart Choice</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-wider text-stone-400 sm:block">Online Store</span>
          </span>
        </Link>
        </div>

        {/* Nav + Cart grouped together on the right */}
        <div className="flex shrink-0 items-center gap-6 lg:gap-10">
          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              to="/wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-colors hover:bg-stone-100 sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="h-4.5 w-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative flex h-10 items-center gap-2 rounded-full bg-brand-500 px-3.5 text-sm sm:px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-stone-200 bg-white px-6 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-brand-50 text-brand-700" : "text-stone-600"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-brand-50 text-brand-700" : "text-stone-600"}`
            }
          >
            Wishlist
            {wishlist.length > 0 && <span className="text-xs text-stone-400">{wishlist.length}</span>}
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
