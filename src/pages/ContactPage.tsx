import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    // Demo-only: this doesn't send anywhere yet. Wire it up to an email service or a
    // Supabase table (same pattern as storefront_orders) once this site goes live.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
          <CheckCircle2 className="h-7 w-7 text-brand-600" />
        </span>
        <h1 className="text-xl font-bold text-stone-900">Message received</h1>
        <p className="text-sm text-stone-500">Thanks for reaching out — we'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Mail className="h-6 w-6" />
      </span>
      <h1 className="mt-4 text-2xl font-bold text-stone-900">Get in Touch</h1>
      <p className="mt-1 text-sm text-stone-500">Have a question about a product or an order? Send us a message.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none ring-brand-300 focus:ring-2"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none ring-brand-300 focus:ring-2"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="How can we help?"
            rows={4}
            className="mt-1 w-full resize-none rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none ring-brand-300 focus:ring-2"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-stone-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
