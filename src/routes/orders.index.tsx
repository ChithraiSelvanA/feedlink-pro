import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { inr, orders } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { StatusText } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "Order History & Reorder — FeedLink Dealer App" },
      {
        name: "description",
        content:
          "See every feed order with date, status and amount, and reorder the same bags in one tap.",
      },
      { property: "og:title", content: "Order History — FeedLink" },
      {
        property: "og:description",
        content: "Every feed order with date, status and amount, plus one-tap reorder.",
      },
    ],
  }),
  component: Orders,
});

function Orders() {
  const navigate = useNavigate();
  const { add } = useCart();

  return (
    <div className="animate-page pb-28">
      <AppBar title="Orders" back={false} cart />

      <ul className="divide-y divide-border px-4">
        {orders.map((o) => (
          <li key={o.id} className="py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-base font-semibold">{o.id}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{o.date}</p>
                <div className="mt-1.5">
                  <StatusText status={o.status} />
                </div>
              </div>
              <p className="text-base font-semibold tabular-nums">{inr(o.total)}</p>
            </div>
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => {
                o.lines.forEach((l) => add(l.productId, l.kg, l.qty));
                toast.success("Items added to cart");
                navigate({ to: "/cart" });
              }}
            >
              Reorder
            </Button>
          </li>
        ))}
      </ul>

      <BottomNav />
    </div>
  );
}
