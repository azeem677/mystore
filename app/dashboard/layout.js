"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/add-product", label: "➕ Add Product" },
    { href: "/dashboard/products", label: "🛍️ Display Products" },
    { href: "/dashboard/orders", label: "📦 Orders" },
  ];

  return (
    <div className="flex h-[465px] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">Dashboard</h1>

        <nav className="flex flex-col space-y-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium p-2 rounded-md ${
                  isActive
                    ? "bg-blue-200 p-2 "
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
