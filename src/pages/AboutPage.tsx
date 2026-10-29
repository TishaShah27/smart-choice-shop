import { Boxes, ShieldCheck, Users } from "lucide-react";

const AboutPage = () => (
  <div>
    <section className="bg-stone-900 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">About Smart Choice</h1>
        <p className="mt-4 text-base text-stone-300">
          Smart Choice keeps its full inventory in one place and in sync in real time, so what you see here is what
          we actually have on hand, ready to go.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-3">
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Boxes className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-sm font-bold text-stone-900">Live Inventory</h3>
          <p className="mt-1.5 text-sm text-stone-500">
            Every product on this site is pulled straight from our own stock records — no guesswork.
          </p>
        </div>
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-sm font-bold text-stone-900">Orders Reviewed by a Person</h3>
          <p className="mt-1.5 text-sm text-stone-500">
            A real member of our team looks over every order before it's confirmed and fulfilled.
          </p>
        </div>
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Users className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-sm font-bold text-stone-900">Here to Help</h3>
          <p className="mt-1.5 text-sm text-stone-500">
            Questions about an order, bulk pricing, or anything else? Reach out through our Contact page.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
