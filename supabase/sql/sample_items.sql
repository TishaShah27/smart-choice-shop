-- Sample products for the storefront. Run in the Supabase SQL Editor.
-- Only the columns the storefront reads are set; if your `items` table has other
-- NOT NULL columns (e.g. cost_price), add them to the column list below.
insert into public.items
  (sku, name, unit, department, category, selling_price, stock_quantity, primary_image_url, secondary_image_url)
values
  ('SKU101', 'Deluxe Gift Set',          'set',  'Gifts',      'Gift Sets',  24.00, 40, 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', ''),
  ('SKU102', 'Premium Fragrance Trio',   'set',  'Beauty',     'Fragrance',  32.50, 25, 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80', ''),
  ('SKU103', 'Everyday Essentials Pack', 'pack', 'Personal Care', 'Skincare', 18.00, 60, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80', ''),
  ('SKU104', 'Specialty Candle Set',     'set',  'Home',       'Candles',    21.00, 35, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80', ''),
  ('SKU105', 'Scented Soy Candle',       'pc',   'Home',       'Candles',    12.00, 80, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80', ''),
  ('SKU106', 'Luxury Bath Bundle',       'set',  'Personal Care', 'Skincare', 27.50, 30, 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80', ''),
  ('SKU107', 'Hydrating Face Cream',     'pc',   'Beauty',     'Skincare',   15.00, 50, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', ''),
  ('SKU108', 'Signature Perfume 50ml',   'pc',   'Beauty',     'Fragrance',  45.00, 20, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', '');
