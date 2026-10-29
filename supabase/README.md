# Supabase SQL for Smart Choice Shop

All database SQL for this project lives in `supabase/sql/`. Run files in the Supabase SQL Editor in this order:

1. `storefront_orders.sql` — creates the `storefront_orders` table and the public insert policy used by checkout.
2. `sample_items.sql` — optional sample products for the storefront catalog.

New queries for this project should be added as separate files in `supabase/sql/`.

## UI-only mode

While the table doesn't exist, `.env.local` sets `VITE_MOCK_ORDERS=true`, so checkout skips the database and shows
the confirmation page. Delete that line (and restart `npm run dev`) once `storefront_orders.sql` has been run.
