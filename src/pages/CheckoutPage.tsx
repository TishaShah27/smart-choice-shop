import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ImageOff } from "lucide-react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../lib/orderService";

const CheckoutPage = () => {
  const { lines, totalPrice, clear } = useCart();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
        <h1 className="text-xl font-bold text-stone-900">Your cart is empty</h1>
        <Link to="/" className="mt-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600">
          Browse Products
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!customerName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in every field so we can confirm your order.");
      return;
    }

    setSubmitting(true);
    try {
      const orderId = await placeOrder({ customerName, email, phone, address }, lines);
      clear();
      navigate("/order-confirmed", { state: { orderId, customerName } });
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-800"
      >
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </button>

      <h1 className="text-2xl font-bold text-stone-900">Checkout</h1>
      <p className="mt-1 text-sm text-stone-500">This is a demo checkout — no payment is collected here.</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 sm:col-span-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Full Name</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none ring-brand-300 focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none ring-brand-300 focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none ring-brand-300 focus:ring-2"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, City, State, ZIP"
              rows={3}
              className="mt-1 w-full resize-none rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none ring-brand-300 focus:ring-2"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-stone-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
          >
            {submitting ? "Placing Order..." : `Place Order — $${totalPrice.toFixed(2)}`}
          </button>
        </form>

        <div className="h-fit space-y-3 rounded-2xl border border-stone-200 bg-white p-5 sm:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">Order Summary</h2>
          <div className="space-y-3">
            {lines.map(({ item, quantity }) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  {item.primaryImageUrl ? (
                    <img src={item.primaryImageUrl} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-stone-300">
                      <ImageOff className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-stone-800">{item.name}</p>
                  <p className="text-[11px] text-stone-400">Qty {quantity}</p>
                </div>
                <span className="text-xs font-bold text-stone-800">${(item.sellingPrice * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-stone-200 pt-3">
            <span className="text-sm font-bold text-stone-900">Total</span>
            <span className="text-lg font-bold text-brand-700">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
