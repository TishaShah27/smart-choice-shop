import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const ConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { orderId?: string; customerName?: string } | null;

  if (!state?.orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
        <CheckCircle2 className="h-9 w-9 text-brand-600" />
      </span>
      <h1 className="text-2xl font-bold text-stone-900">Thanks, {state.customerName}!</h1>
      <p className="text-sm text-stone-500">
        Your order has been received. Our team will review it and reach out shortly to confirm the details.
      </p>
      <p className="mt-2 rounded-full bg-stone-100 px-4 py-1.5 font-mono text-xs text-stone-500">
        Order #{state.orderId.slice(0, 8).toUpperCase()}
      </p>
      <Link
        to="/"
        className="mt-4 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ConfirmationPage;
