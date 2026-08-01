import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingCart, ReceiptText, User } from "lucide-react";
import { useCart } from "@/lib/cart";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/categories", label: "Catalog", icon: LayoutGrid },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/orders", label: "Orders", icon: ReceiptText },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { bags } = useCart();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-card/95 shadow-nav backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              aria-label={label}
              className="group press relative flex min-h-11 flex-col items-center gap-1 rounded-xl py-1.5 text-muted-foreground data-[status=active]:text-primary"
            >
              <span className="relative rounded-full px-3 py-1 transition-colors group-data-[status=active]:bg-primary-soft">
                <Icon className="size-5" />
                {to === "/cart" && bags > 0 ? (
                  <span className="absolute -top-0.5 right-0.5 animate-pop rounded-full bg-primary px-1.5 text-[0.625rem] font-bold text-primary-foreground">
                    {bags}
                  </span>
                ) : null}
              </span>
              <span className="text-[0.65rem] font-semibold tracking-tight">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
