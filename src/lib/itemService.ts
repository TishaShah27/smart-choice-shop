import { supabase } from "./supabaseClient";

export interface ShopItem {
  id: string;
  sku: string;
  name: string;
  unit: string;
  department: string;
  category: string;
  sellingPrice: number;
  stockQuantity: number;
  primaryImageUrl: string;
  secondaryImageUrl: string;
}

interface ItemRow {
  id: string;
  sku: string;
  name: string;
  unit: string | null;
  department: string | null;
  category: string | null;
  selling_price: number;
  stock_quantity: number;
  primary_image_url: string | null;
  secondary_image_url: string | null;
}

const toShopItem = (row: ItemRow): ShopItem => ({
  id: row.id,
  sku: row.sku,
  name: row.name,
  unit: row.unit ?? "",
  department: row.department ?? "",
  category: row.category ?? "",
  sellingPrice: Number(row.selling_price) || 0,
  stockQuantity: Number(row.stock_quantity) || 0,
  primaryImageUrl: row.primary_image_url ?? "",
  secondaryImageUrl: row.secondary_image_url ?? "",
});

// Only items with stock on hand are shown in the storefront — out-of-stock items stay
// hidden rather than shown as unavailable, keeping the catalog feeling fully "in stock."
export const fetchShopItems = async (): Promise<ShopItem[]> => {
  const { data, error } = await supabase
    .from("items")
    .select("id, sku, name, unit, department, category, selling_price, stock_quantity, primary_image_url, secondary_image_url")
    .gt("stock_quantity", 0)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as ItemRow[]).map(toShopItem);
};
