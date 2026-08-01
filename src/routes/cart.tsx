import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, MapPin } from "lucide-react";
import { useCart } from "@/lib/cart";
import { dealer, getProduct, inr } from "@/lib/catalog";
import { AppBar, SectionHeader } from "@/components/app/app-bar";
import { ProductRow, StickyBar } from "@/components/app/cards";
import { EmptyState } from "@/components/app/primitives";
import { BottomNav } from "@/components/app/bottom-nav";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Order Cart — FeedLink" },
      {
        name: "description",
        content:
          "Review bag quantities, delivery details and net payable before placing your feed order with FeedLink.",
      },
      { property: "og:title", content: "Your Order Cart — FeedLink" },
      {
        property: "og:description",
        content: "Review quantities, delivery details and net payable before placing your order.",
      },
    ],
  }),
  component: Cart,
});

export function PriceSummary({
  subtotal,
  savings,
  freight,
  gst,
  total,
}: {
  subtotal: number;
  savings: number;
  freight: number;
  gst: number;
  total: number;
}) {
  const rows = [
    { label: "Item subtotal", value: inr(subtotal) },
    { label: "Scheme discount", value: `− ${inr(savings)}`, accent: true },
    { label: "Freight", value: freight === 0 ? "Free" : inr(freight) },
    { label: "GST (est.)", value: inr(gst) },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{r.label}</span>
            <span
              className={
                r.accent
                  ? "font-semibold tabular-nums text-primary"
                  : "font-semibold tabular-nums text-foreground"
              }
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-bold text-foreground">Grand total</span>
        <span className="text-lg font-extrabold tabular-nums text-foreground">{inr(total)}</span>
      </div>
    </div>
  );
}

export function useTotals() {
  const { subtotal, savings } = useCart();
  const freight = subtotal > 10000 || subtotal === 0 ? 0 : 450;
  const gst = Math.round(subtotal * 0.05);
  return { subtotal, savings, freight, gst, total: subtotal + freight + gst };
}

function Cart() {
  const { lines, bags, notes, setNotes } = useCart();
  const totals = useTotals();

  if (!lines.length)
    return (
      <div className="pb-28">
        <AppBar title="Cart" back={false} />
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add feed bags from the catalog and they will show up here for a one-tap order."
          action={
            <Button asChild size="lg">
              <Link to="/categories">Browse catalog</Link>
            </Button>
          }
        />
        <BottomNav />
      </div>
    );

  return (
    <div className="pb-32">
      <AppBar title="Cart" subtitle={`${lines.length} items · ${bags} bags`} back={false} />

      <section className="space-y-3 px-4 pt-4">
        {lines.map((l) => {
          const product = getProduct(l.productId);
          if (!product) return null;
          return <ProductRow key={l.productId} product={product} qty={l.qty} />;
        })}
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Delivery" />
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">{dealer.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {dealer.address}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-primary">Dispatch in 2–3 days</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Order notes" caption="Optional instructions for the depot" />
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Deliver before 11 AM, unload at rear gate"
          className="min-h-24 rounded-2xl border-border bg-card shadow-card"
        />
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Price summary" />
        <PriceSummary {...totals} />
      </section>

      <StickyBar label="Grand total" value={inr(totals.total)} cta="Place Order" to="/checkout" />
    </div>
  );
}
