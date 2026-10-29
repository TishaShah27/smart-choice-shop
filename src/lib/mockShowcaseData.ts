// Placeholder content for the Home page's decorative sections (Best Sellers, Offer,
// Discover, Testimonials). These aren't tied to real inventory/ratings/reviews yet —
// swap them out for real data (ratings table, curated picks, actual customer reviews)
// before this site goes live. Deliberately uses generic names/initials rather than
// fabricated product photos or invented "verified customer" names+photos.

export interface MockProduct {
  name: string;
  price: number;
  rating: number;
  gradient: string;
}

export const MOCK_BEST_SELLERS: MockProduct[] = [
  { name: "Deluxe Gift Set", price: 24.0, rating: 5, gradient: "from-brand-300 to-brand-600" },
  { name: "Premium Fragrance Trio", price: 32.5, rating: 5, gradient: "from-amber-200 to-amber-500" },
  { name: "Everyday Essentials Pack", price: 18.0, rating: 4, gradient: "from-sky-200 to-sky-500" },
  { name: "Specialty Candle Set", price: 21.0, rating: 5, gradient: "from-rose-200 to-rose-500" },
];

export interface MockTestimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
}

export const MOCK_TESTIMONIALS: MockTestimonial[] = [
  {
    initials: "AK",
    quote: "Placeholder review — swap in a real customer quote once orders start coming through.",
    name: "Sample Customer",
    role: "Placeholder",
  },
  {
    initials: "JR",
    quote: "Placeholder review — swap in a real customer quote once orders start coming through.",
    name: "Sample Customer",
    role: "Placeholder",
  },
  {
    initials: "MT",
    quote: "Placeholder review — swap in a real customer quote once orders start coming through.",
    name: "Sample Customer",
    role: "Placeholder",
  },
];
