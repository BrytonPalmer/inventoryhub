"use client";

import type { Product } from "@/lib/owner-data";
import { PageHeader, SummaryCard, Th, Td, ExportCsvButton, formatCurrency } from "@/components/owner/OwnerUI";

export default function StockStatusReport({
  products,
  lowStockCount,
  totalStockValue,
}: {
  products: Product[];
  lowStockCount: number;
  totalStockValue: number;
}) {
  const exportRows = products.map((p) => ({
    product: p.name,
    sku: p.sku,
    quantity: p.quantity,
    restockLevel: p.restockLevel,
    unitPrice: p.price,
    stockValue: (p.quantity * p.price).toFixed(2),
    lowStock: p.isLowStock ? "Yes" : "No",
  }));

  return (
    <main className="min-h-screen bg-white text-black px-8 py-10">
      <PageHeader
        title="Stock Status"
        description="Overall stock levels and total inventory value across all products."
      />

      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard label="Total Products" value={products.length} />
        <SummaryCard label="Total Stock Value" value={formatCurrency(totalStockValue)} />
        <SummaryCard label="Below Restock Level" value={lowStockCount} />
      </section>

      <div className="mb-4 flex justify-end">
        <ExportCsvButton data={exportRows} filename="stock-status-report.csv" />
      </div>

      <div className="border border-[#E5E5E5] rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white">
              <Th>Product</Th>
              <Th>SKU</Th>
              <Th>Quantity</Th>
              <Th>Restock Level</Th>
              <Th>Unit Price</Th>
              <Th>Stock Value</Th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-sm text-center border-t border-[#E5E5E5]">
                  No products have been added yet.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t border-[#E5E5E5]">
                  <Td>{p.name}</Td>
                  <Td>{p.sku}</Td>
                  <Td className={p.isLowStock ? "text-red-800 font-medium" : ""}>{p.quantity}</Td>
                  <Td>{p.restockLevel}</Td>
                  <Td>{formatCurrency(p.price)}</Td>
                  <Td>{formatCurrency(p.quantity * p.price)}</Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}