import { supabase } from "./supabaseClient";
import type { CartLine } from "../context/CartContext";

export interface CheckoutDetails {
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

// Temporary UI-only switch: with VITE_MOCK_ORDERS=true (see .env.local) no database call is made and
// checkout goes straight to the confirmation page. Remove the variable to save real orders again.
const MOCK_ORDERS = import.meta.env.VITE_MOCK_ORDERS === "true";

export const placeOrder = async (details: CheckoutDetails, lines: CartLine[]): Promise<string> => {
  const subtotal = lines.reduce((sum, line) => sum + line.item.sellingPrice * line.quantity, 0);

  // The id is generated here rather than read back with .select(): anon users only have INSERT on
  // this table (no SELECT policy), so asking Postgres to return the row fails with an RLS error.
  const id = crypto.randomUUID();

  if (MOCK_ORDERS) return id;

  const { error } = await supabase
    .from("storefront_orders")
    .insert({
      id,
      customer_name: details.customerName.trim(),
      email: details.email.trim(),
      phone: details.phone.trim(),
      address: details.address.trim(),
      items: lines.map((line) => ({
        itemId: line.item.id,
        sku: line.item.sku,
        name: line.item.name,
        unitPrice: line.item.sellingPrice,
        quantity: line.quantity,
      })),
      subtotal,
    });

  if (error) throw error;
  return id;
};
