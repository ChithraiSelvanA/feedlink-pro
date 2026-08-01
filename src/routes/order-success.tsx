import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Package, Truck } from "lucide-react";
import { z } from "zod";
import { inr } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useTotals } from "./cart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order-success")({
  validateSearch: z.object({ date: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Order Placed — FeedLink" },
      {
        name: "description",
        content: "Your feed order is confirmed. Track dispatch and delivery from the orders tab.",
      },
      { property: "og:title", content: "Order Placed — FeedLink" },
      {
        property: "og:description",
        content: "Your feed order is confirmed and scheduled for depot dispatch.",
      },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { date } = Route.useSearch();
  const { bags, clear } = useCart();
  const totals = useTotals();
  const [snapshot] = useState(() => ({ bags, total: totals.total }));
  const orderId = useMemo(() => `ORD-${24816 + Math.floor(Math.random() * 40)}`, []);

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center px-6 pb-10 pt-16 text-center">
      <span className="grid size-24 animate-check place-items-center rounded-full bg-primary-soft">
        <span className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-8" strokeWidth={3} />
        </span>
      </span>

      <h1 className="animate-rise mt-7 text-2xl font-extrabold text-foreground">Order placed</h1>
      <p className="animate-rise mt-2 max-w-xs text-sm text-muted-foreground">
        Your order has been sent to the Nashik depot for confirmation.
      </p>

      <div className="animate-rise mt-7 w-full rounded-2xl border border-border bg-card p-4 text-left shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Order number</span>
          <span className="text-sm font-bold text-foreground">{orderId}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="size-3.5" /> Bags ordered
          </span>
          <span className="text-sm font-bold tabular-nums text-foreground">{snapshot.bags}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="size-3.5" /> Estimated delivery
          </span>
          <span className="text-sm font-bold text-foreground">{date ?? "Tue, 04 Aug"}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">Order value</span>
          <span className="text-base font-extrabold tabular-nums text-foreground">
            {inr(snapshot.total)}
          </span>
        </div>
      </div>

      <div className="mt-auto w-full space-y-3 pt-10">
        <Button asChild size="xl" variant="primaryLg" className="w-full">
          <Link to="/">Continue Shopping</Link>
        </Button>
        <Button asChild size="xl" variant="outline" className="w-full">
          <Link to="/orders">View my orders</Link>
        </Button>
      </div>
    </div>
  );
}
