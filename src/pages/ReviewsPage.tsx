import { MessageSquareText } from "lucide-react";

const ReviewsPage = () => (
  <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
      <MessageSquareText className="h-7 w-7 text-brand-600" />
    </span>
    <h1 className="mt-5 text-2xl font-bold text-stone-900">Customer Reviews</h1>
    <p className="mx-auto mt-3 max-w-md text-sm text-stone-500">
      We're just getting started taking orders through this store, so there aren't any reviews yet. Once customers
      start checking out, their feedback will show up here.
    </p>
  </div>
);

export default ReviewsPage;
