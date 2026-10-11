import type { Metadata } from "next";
import { connection } from "next/server";
import { getProducts, getLowStockProducts } from "@/lib/owner-data";
import LowStockReport from "./LowStockReport";

export const metadata: Metadata = {
  title: "Low Stock Alerts",
  description: "Products currently below their restock threshold.",
};

export default async function LowStockReportPage() {
  await connection();
  const lowStockProducts = getLowStockProducts(await getProducts());

  return <LowStockReport lowStockProducts={lowStockProducts} />;
}
