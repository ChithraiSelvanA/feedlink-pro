import { Link } from "@tanstack/react-router";
import { LayoutGrid, ReceiptText, Settings, User } from "lucide-react";

const items = [
  { to: "/", label: "Categories", icon: LayoutGrid },
  { to: "/orders", label: "Orders", icon: ReceiptText },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card">
      <ul className="flex items-stretch px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex min-h-12 flex-col items-center gap-1 rounded-xl py-1 text-muted-foreground data-[status=active]:text-primary"
            >
              <Icon className="size-6" strokeWidth={1.75} />
              <span className="text-[0.7rem] font-medium">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
