import { MOCK_TESTIMONIALS } from "../../lib/mockShowcaseData";

const TestimonialsSection = () => (
  <section className="bg-brand-50 py-20">
    <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
      <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Testimonials</span>
      <h2 className="font-display mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">Reviews From Customers</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">
        Placeholder cards — replace with real reviews once customers start checking out.
      </p>

      <div className="mt-10 grid gap-5 text-left sm:grid-cols-3">
        {MOCK_TESTIMONIALS.map((t, i) => (
          <div key={i} className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-sm italic text-stone-600">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {t.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                <p className="text-xs text-stone-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
