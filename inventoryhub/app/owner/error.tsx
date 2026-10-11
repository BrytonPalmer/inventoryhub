"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { PageHeader } from "@/components/owner/OwnerUI";

// Shown when an owner page can't load its data, so a failed query is never
// mistaken for an empty report.
export default function OwnerError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white text-black px-8 py-10">
      <PageHeader
        title="Couldn't load this report"
        description="The inventory data couldn't be reached. The numbers below would not be accurate, so nothing is shown. Please try again in a moment."
      />

      <button
        type="button"
        onClick={() => retry()}
        className="text-sm border border-[#E5E5E5] rounded-md px-3 py-1.5 hover:bg-[#F9F9F9] transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
