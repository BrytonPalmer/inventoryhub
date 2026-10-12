// Shown while any owner page waits on the database.
export default function OwnerLoading() {
  return (
    <main className="min-h-screen bg-white text-black px-8 py-10" aria-busy="true">
      <div className="mb-8 space-y-3 animate-pulse">
        <div className="h-8 w-64 rounded-md bg-[#F2F2F2]" />
        <div className="h-4 w-96 max-w-full rounded-md bg-[#F2F2F2]" />
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 rounded-md border border-[#E5E5E5] bg-[#F9F9F9]" />
        ))}
      </div>

      <div className="h-64 rounded-md border border-[#E5E5E5] bg-[#F9F9F9] animate-pulse" />
      <span className="sr-only">Loading report…</span>
    </main>
  );
}
