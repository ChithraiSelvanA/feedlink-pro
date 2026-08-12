import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { Check } from "lucide-react";
import { z } from "zod";
import { inr } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { BottomNav } from "@/components/app/bottom-nav";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order-success")({
  validateSearch: z.object({ total: z.number().optional() }),
  head: () => ({
    meta: [
      { title: "Order Placed — FeedLink Dealer App" },
      {
        name: "description",
        content: "Your feed order is confirmed. View it any time from the orders tab.",
      },
      { property: "og:title", content: "Order Placed — FeedLink" },
      { property: "og:description", content: "Your dealer feed order is confirmed." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { total } = Route.useSearch();
  const { clear } = useCart();
  const orderId = useMemo(() => `ORD-${24816 + Math.floor(Math.random() * 40)}`, []);

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-page flex min-h-screen flex-col items-center px-6 pb-32 pt-24 text-center">
      <span className="gradient-primary grid size-16 place-items-center rounded-full text-primary-foreground shadow-glow">
        <Check className="size-8" strokeWidth={2.5} />
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">Order placed</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Order {orderId} {typeof total === "number" ? `· ${inr(total)}` : ""}
      </p>


      <div className="mt-auto w-full space-y-3 pt-12">
        <Button asChild size="xl" className="w-full">
          <Link to="/orders">View Orders</Link>
        </Button>
        <Button asChild size="xl" variant="outline" className="w-full">
          <Link to="/">Order Again</Link>
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}

