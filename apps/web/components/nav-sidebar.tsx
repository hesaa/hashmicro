"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@hashmicro/ui/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/products/stats", label: "Stats" },
  { href: "/discount", label: "Discount" },
  { href: "/comparison", label: "Comparison" },
];

export function NavSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r bg-muted/30 min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-6">hashmicro</h2>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted",
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                ? "bg-muted font-medium"
                : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
