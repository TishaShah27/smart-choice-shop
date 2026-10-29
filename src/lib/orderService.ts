import { supabase } from "./supabaseClient";
import type { CartLine } from "../context/CartContext";

export interface CheckoutDetails {
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

export const placeOrder = async (details: CheckoutDetails, lines: CartLine[]): Promise<string> => {
  const subtotal = lines.reduce((sum, line) => sum + line.item.sellingPrice * line.quantity, 0);

  const { data, error } = await supabase
    .from("storefront_orders")
    .insert({
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
    })
    .select("id")
    .single();

  if (error) throw error;
  return (data as { id: string }).id;
};
