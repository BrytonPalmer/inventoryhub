import type { Metadata } from "next";
import { connection } from "next/server";
import { getProducts, getLowStockProducts, getTotalStockValue } from "@/lib/owner-data";
import StockStatusReport from "./StockStatusReport";

export const metadata: Metadata = {
  title: "Stock Status",
  description: "Overall stock levels and total inventory value.",
};

export default async function StockStatusReportPage() {
  await connection();
  const products = await getProducts();

  return (
    <StockStatusReport
      products={products}
      lowStockCount={getLowStockProducts(products).length}
      totalStockValue={getTotalStockValue(products)}
    />
  );
}
