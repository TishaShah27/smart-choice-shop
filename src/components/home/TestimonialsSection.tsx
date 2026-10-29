import { MOCK_TESTIMONIALS } from "../../lib/mockShowcaseData";

// The list is rendered in two identical halves (wide enough for large screens) so the track can loop seamlessly (see .marquee-track in index.css).
const LOOP = [...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS, ...MOCK_TESTIMONIALS];

const TestimonialsSection = () => (
  <section className="bg-amber-50 py-20">
    <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
      <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Testimonials</span>
      <h2 className="font-display mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">Reviews From Customers</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">
        Placeholder cards — replace with real reviews once customers start checking out.
      </p>
    </div>

    <div className="marquee mt-10 overflow-hidden">
      <div className="marquee-track flex w-max gap-5 pr-5">
        {LOOP.map((t, i) => (
          <div key={i} className="w-80 shrink-0 rounded-2xl border border-stone-200 bg-white p-6 text-left">
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
