-- Orders placed through the public Smart Choice storefront demo.
-- Run this in the Supabase SQL Editor (same project the main ERP app uses).
--
-- This is a separate, lightweight table from the ERP's own `invoices`/`sales_orders` —
-- it's a holding pen for orders a real person places on the public site. Someone on the
-- Smart Choice team reviews these and manually creates the matching invoice/sales order
-- in the ERP once they're ready to fulfill it.

create table if not exists public.storefront_orders (
  id uuid primary key default gen_random_uuid(),

  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,

  -- Line items snapshot at the time of order, e.g.:
  -- [{ "itemId": "...", "sku": "SKU001", "name": "...", "unitPrice": 12.5, "quantity": 2 }]
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(14, 2) not null default 0,

  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),

  created_at timestamptz not null default now()
);

create index if not exists storefront_orders_created_at_idx on public.storefront_orders (created_at);

-- Row Level Security — the storefront is public and unauthenticated, so it talks to
-- Supabase with the shared anon/publishable key, same as the main ERP app. Anyone can
-- INSERT an order (that's the point — it's a public checkout) but nobody using the anon
-- key can read, update, or delete orders back out, so one visitor can't see another's
-- order or tamper with the queue. Only the ERP team (reviewing in Supabase directly, or
-- a future authenticated admin view) can read/manage these.
alter table public.storefront_orders enable row level security;

drop policy if exists "Public can place storefront orders" on public.storefront_orders;
create policy "Public can place storefront orders"
  on public.storefront_orders
  for insert
  to anon, authenticated
  with check (true);
