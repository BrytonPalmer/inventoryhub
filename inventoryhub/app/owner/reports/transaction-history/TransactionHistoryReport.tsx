"use client";

import Form from "next/form";
import Link from "next/link";
import type {
  Employee,
  Transaction,
  TransactionFilters,
  TransactionType,
} from "@/lib/owner-data";
import { PageHeader, Th, Td, ExportCsvButton } from "@/components/owner/OwnerUI";

const REPORT_PATH = "/owner/reports/transaction-history";

const TYPE_LABELS: Record<TransactionType, string> = {
  stock_adjustment: "Stock Adjustment",
  restock: "Restock",
  physical_count: "Physical Count",
};

export default function TransactionHistoryReport({
  transactions,
  employees,
  filters,
  isDefaultRange,
  defaultDays,
}: {
  transactions: Transaction[];
  employees: Employee[];
  filters: TransactionFilters;
  isDefaultRange: boolean;
  defaultDays: number;
}) {
  const isFiltered = !isDefaultRange || filters.employeeId !== "";

  const exportRows = transactions.map((t) => ({
    date: t.displayTime,
    product: t.productName,
    sku: t.sku,
    type: TYPE_LABELS[t.transactionType] ?? t.transactionType,
    previousQuantity: t.previousQuantity,
    newQuantity: t.newQuantity,
    change: t.quantityChange,
    employee: t.employeeName,
    reason: t.reason,
  }));

  return (
    <main className="min-h-screen bg-white text-black px-8 py-10">
      <PageHeader
        title="Transaction History"
        description={`Full audit trail of every inventory adjustment, with employee and reason. Shows the last ${defaultDays} days unless you choose a date range.`}
      />

      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        {/* Keyed on the filters so the inputs reset after navigating back/forward */}
        <Form
          key={`${filters.startDate}|${filters.endDate}|${filters.employeeId}`}
          action={REPORT_PATH}
          className="flex flex-wrap items-end gap-3"
        >
          <label className="flex flex-col text-sm">
            <span className="mb-1 text-xs uppercase tracking-wide">Start date</span>
            <input
              type="date"
              name="start"
              defaultValue={filters.startDate}
              aria-label="Filter start date"
              className="border border-[#E5E5E5] rounded-md px-3 py-1.5 text-sm"
            />
          </label>
          <label className="flex flex-col text-sm">
            <span className="mb-1 text-xs uppercase tracking-wide">End date</span>
            <input
              type="date"
              name="end"
              defaultValue={filters.endDate}
              aria-label="Filter end date"
              className="border border-[#E5E5E5] rounded-md px-3 py-1.5 text-sm"
            />
          </label>
          <label className="flex flex-col text-sm">
            <span className="mb-1 text-xs uppercase tracking-wide">Employee</span>
            <select
              name="employee"
              defaultValue={filters.employeeId}
              aria-label="Filter by employee"
              className="border border-[#E5E5E5] rounded-md px-3 py-1.5 text-sm bg-white"
            >
              <option value="">All employees</option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="text-sm border border-[#E5E5E5] rounded-md px-3 py-1.5 hover:bg-[#F9F9F9] transition-colors"
          >
            Apply
          </button>
          {isFiltered && (
            <Link href={REPORT_PATH} className="text-sm underline hover:no-underline">
              Reset filters
            </Link>
          )}
        </Form>

        <ExportCsvButton data={exportRows} filename="transaction-history-report.csv" />
      </div>

      <div className="border border-[#E5E5E5] rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white">
              <Th>Date</Th>
              <Th>Product</Th>
              <Th>Type</Th>
              <Th>Previous</Th>
              <Th>New</Th>
              <Th>Change</Th>
              <Th>Employee</Th>
              <Th>Reason</Th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-3 text-sm text-center border-t border-[#E5E5E5]">
                  No transactions match the selected filters.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="border-t border-[#E5E5E5]">
                  <Td>{t.displayTime}</Td>
                  <Td>
                    {t.productName}{" "}
                    <span className="text-xs">({t.sku})</span>
                  </Td>
                  <Td>{TYPE_LABELS[t.transactionType] ?? t.transactionType}</Td>
                  <Td>{t.previousQuantity}</Td>
                  <Td>{t.newQuantity}</Td>
                  <Td className={t.quantityChange < 0 ? "text-red-800 font-medium" : "text-green-700 font-medium"}>
                    {t.quantityChange > 0 ? `+${t.quantityChange}` : t.quantityChange}
                  </Td>
                  <Td>{t.employeeName}</Td>
                  <Td>{t.reason}</Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
