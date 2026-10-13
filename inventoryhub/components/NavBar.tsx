import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3"
      >
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="text-sm font-black uppercase tracking-widest text-black"
          >
            InventoryHub
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Products
          </Link>
          <Link
            href="/owner/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-black"
          >
            Owner Dashboard
          </Link>
        </div>
        <LogoutButton />
      </nav>
    </header>
  );
}
