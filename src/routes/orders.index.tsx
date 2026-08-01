import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ReceiptText } from "lucide-react";
import { inr, orders, type OrderStatus } from "@/lib/catalog";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { OrderCard } from "@/components/app/cards";
import { EmptyState } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "Order History & Dispatch Status — FeedLink" },
      {
        name: "description",
        content:
          "Track every feed order: dispatch status, bag counts, invoice value and delivery dates in one place.",
      },
      { property: "og:title", content: "Order History & Dispatch Status" },
      {
        property: "og:description",
        content: "Track dispatch status, bag counts and delivery dates for every feed order.",
      },
    ],
  }),
  component: Orders,
});

const filters: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "processing", label: "Processing" },
  { key: "in-transit", label: "In transit" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

function Orders() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const spend = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);

  return (
    <div className="pb-28">
      <AppBar title="Orders" subtitle={`${orders.length} orders · ${inr(spend)} lifetime`} back={false} />

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-4">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "press shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold",
              filter === f.key
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-card text-muted-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="space-y-3 px-4 pt-4">
        {list.length ? (
          list.map((o) => <OrderCard key={o.id} order={o} />)
        ) : (
          <EmptyState
            icon={ReceiptText}
            title="No orders here"
            description="You have no orders with this status yet. Place a new order from the catalog."
            action={
              <Button asChild>
                <Link to="/categories">Start ordering</Link>
              </Button>
            }
          />
        )}
      </section>

      <BottomNav />
    </div>
  );
}
