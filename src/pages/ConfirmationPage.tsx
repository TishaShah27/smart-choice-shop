import { Link, useLocation, Navigate } from "react-router-dom";

// Smiling shopping-bag mascot, drawn in the brand greens.
const CelebrationIllustration = () => (
  <svg viewBox="0 0 360 290" className="h-60 w-auto sm:h-72" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {/* confetti + speed lines */}
    <path d="M40 200 L90 178" className="stroke-brand-300" strokeWidth="2" />
    <path d="M200 278 L250 266" className="stroke-brand-300" strokeWidth="2" />
    <path d="M240 274 L322 228" className="stroke-brand-300" strokeWidth="2" />
    <path d="M28 120 l12 8 -14 6z" className="fill-brand-300" />
    <path d="M110 170 l12 4 -8 10z" className="fill-brand-300" />
    <path d="M268 148 l14 2 -6 12z" className="fill-brand-300" />
    <path d="M205 22 l-6 -8 M214 28 l8 -6 M222 36 l10 -2" className="stroke-brand-400" strokeWidth="2" />

    {/* left bag with heart */}
    <g transform="rotate(-14 70 90)">
      <path d="M40 60 h56 v62 h-56z" className="fill-brand-600" />
      <path d="M48 60 c0 -26 40 -26 40 0" className="stroke-stone-900" strokeWidth="2" />
      <path d="M68 104 c-14 -10 -14 -22 -4 -24 4 0 6 3 4 6 2 -3 4 -6 8 -6 10 2 10 14 -8 24z" className="fill-white" />
    </g>
    {/* right bag with star */}
    <g transform="rotate(12 292 100)">
      <path d="M264 66 h56 v62 h-56z" className="fill-brand-600" />
      <path d="M272 66 c0 -26 40 -26 40 0" className="stroke-stone-900" strokeWidth="2" />
      <path d="M292 82 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1z" className="fill-white" />
    </g>

    {/* credit card + price tag */}
    <rect x="86" y="118" width="34" height="24" rx="3" className="fill-white stroke-stone-900" strokeWidth="1.5" transform="rotate(8 103 130)" />
    <path d="M90 126 h26" className="stroke-brand-400" strokeWidth="3" transform="rotate(8 103 130)" />
    <g transform="rotate(-10 296 178)">
      <path d="M270 166 h40 l12 12 -12 12 h-40z" className="fill-brand-200" />
      <circle cx="280" cy="178" r="2.5" className="fill-white" />
      <text x="292" y="183" fontSize="12" fontWeight="700" className="fill-brand-700">%</text>
    </g>

    {/* mascot body (taller bag). Outlines/face use a fixed dark ink so they stay visible on the white bag in dark mode. */}
    <path d="M138 70 L228 62 L234 186 L144 194z" className="fill-brand-700" />
    <path d="M128 62 L214 54 L218 180 L132 188z" className="fill-white" stroke="#1c1917" strokeWidth="2.5" />
    <path d="M214 54 L232 62 L236 172 L218 180z" className="fill-brand-600" stroke="#1c1917" strokeWidth="2.5" />
    {/* handles */}
    <path d="M148 60 c-2 -34 54 -38 52 -6" className="stroke-stone-900" strokeWidth="2.5" />
    {/* face */}
    <circle cx="158" cy="108" r="5" fill="#1c1917" />
    <circle cx="192" cy="106" r="5" fill="#1c1917" />
    <circle cx="160" cy="106" r="1.6" fill="#fff" />
    <circle cx="194" cy="104" r="1.6" fill="#fff" />
    <path d="M160 126 q17 22 36 -2z" className="fill-brand-600" stroke="#1c1917" strokeWidth="2.5" />
    {/* arms */}
    <path d="M128 92 C100 82 96 50 88 34" className="stroke-stone-900" strokeWidth="2.5" />
    <path d="M232 86 C260 82 276 60 276 40" className="stroke-stone-900" strokeWidth="2.5" />
    {/* legs */}
    <path d="M162 188 C152 214 164 236 142 262" className="stroke-stone-900" strokeWidth="2.5" />
    <path d="M198 182 C206 210 226 222 234 252" className="stroke-stone-900" strokeWidth="2.5" />
    <path d="M130 266 l16 -6 4 8 -18 2z" className="fill-brand-600 stroke-stone-900" strokeWidth="2" />
    <path d="M230 256 l16 -2 2 8 -16 4z" className="fill-brand-600 stroke-stone-900" strokeWidth="2" />
  </svg>
);

const ConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { orderId?: string; customerName?: string } | null;

  if (!state?.orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-3xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm sm:py-16">
        <CelebrationIllustration />
        <h1 className="font-display mt-4 text-3xl font-bold text-brand-700 sm:text-4xl">Your Order Has Been Placed!</h1>
        <p className="text-sm text-stone-600">
          Thanks, {state.customerName}! We&rsquo;ll review it and reach out shortly to confirm the details.
        </p>
        <p className="mt-1 rounded-full bg-brand-50 px-4 py-1.5 font-mono text-xs text-brand-700">
          Order #{state.orderId.slice(0, 8).toUpperCase()}
        </p>
        <Link
          to="/"
          className="mt-4 rounded-lg bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
