// Placeholder content for the Home page's decorative sections (Best Sellers, Offer,
// Discover, Testimonials). These aren't tied to real inventory/ratings/reviews yet —
// swap them out for real data (ratings table, curated picks, actual customer reviews)
// before this site goes live. Deliberately uses generic names/initials rather than
// fabricated product photos or invented "verified customer" names+photos.

export interface MockProduct {
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const MOCK_BEST_SELLERS: MockProduct[] = [
  { name: "Deluxe Gift Set", price: 24.0, rating: 5, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80" },
  { name: "Premium Fragrance Trio", price: 32.5, rating: 5, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80" },
  { name: "Everyday Essentials Pack", price: 18.0, rating: 4, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80" },
  { name: "Specialty Candle Set", price: 21.0, rating: 5, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80" },
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
