import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Check, CreditCard, MapPin, Pencil, Smartphone, Wallet } from "lucide-react";
import { dealer, getProduct, inr } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { AppBar, SectionHeader } from "@/components/app/app-bar";
import { StickyBar } from "@/components/app/cards";
import { PriceSummary, useTotals } from "./cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Confirm Your Feed Order | FeedLink" },
      {
        name: "description",
        content:
          "Confirm delivery address, dispatch date and payment terms, then place your dealer feed order in one tap.",
      },
      { property: "og:title", content: "Checkout — Confirm Your Feed Order" },
      {
        property: "og:description",
        content: "Confirm address, dispatch date and payment terms, then place your order.",
      },
    ],
  }),
  component: Checkout,
});

const dates = [
  { label: "Tue, 04 Aug", note: "Earliest" },
  { label: "Thu, 06 Aug", note: "Standard" },
  { label: "Sat, 08 Aug", note: "Weekend" },
];

const payments = [
  { id: "credit", label: "Credit — 30 days", note: "₹2,40,000 limit available", icon: Wallet },
  { id: "upi", label: "UPI", note: "Pay on dispatch", icon: Smartphone },
  { id: "neft", label: "NEFT / RTGS", note: "Bank transfer", icon: CreditCard },
];

function Checkout() {
  const navigate = useNavigate();
  const { lines, bags } = useCart();
  const totals = useTotals();
  const [date, setDate] = useState(dates[0]!.label);
  const [payment, setPayment] = useState("credit");

  return (
    <div className="pb-32">
      <AppBar title="Checkout" subtitle={`${bags} bags · ${lines.length} items`} />

      <section className="px-4 pt-4">
        <SectionHeader title="Delivery address" />
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">{dealer.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {dealer.address}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{dealer.phone}</p>
            </div>
            <button
              type="button"
              aria-label="Edit address"
              className="press grid size-11 shrink-0 place-items-center rounded-xl bg-muted text-foreground"
            >
              <Pencil className="size-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Delivery date" caption="Depot dispatch slots" />
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
          {dates.map((d) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setDate(d.label)}
              className={cn(
                "press w-32 shrink-0 rounded-2xl border p-3 text-left shadow-card",
                date === d.label
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-card",
              )}
            >
              <CalendarDays
                className={cn(
                  "size-4",
                  date === d.label ? "text-primary" : "text-muted-foreground",
                )}
              />
              <p className="mt-2 text-sm font-bold text-foreground">{d.label}</p>
              <p className="text-[0.7rem] text-muted-foreground">{d.note}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Payment method" />
        <div className="space-y-3">
          {payments.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPayment(p.id)}
              className={cn(
                "press flex w-full items-center gap-3 rounded-2xl border p-4 text-left shadow-card",
                payment === p.id ? "border-primary bg-primary-soft" : "border-border bg-card",
              )}
            >
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-xl",
                  payment === p.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                <p.icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-foreground">{p.label}</span>
                <span className="block truncate text-xs text-muted-foreground">{p.note}</span>
              </span>
              {payment === p.id ? (
                <span className="grid size-6 shrink-0 animate-pop place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" />
                </span>
              ) : (
                <span className="size-6 shrink-0 rounded-full border border-border" />
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Order summary" />
        <div className="mb-3 space-y-2 rounded-2xl border border-border bg-card p-4 shadow-card">
          {lines.map((l) => {
            const product = getProduct(l.productId);
            if (!product) return null;
            return (
              <div key={l.productId} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 flex-1 truncate text-muted-foreground">
                  {product.name} × {l.qty}
                </span>
                <span className="shrink-0 font-semibold tabular-nums text-foreground">
                  {inr(product.price * l.qty)}
                </span>
              </div>
            );
          })}
        </div>
        <PriceSummary {...totals} />
      </section>

      <StickyBar
        label="Payable"
        value={inr(totals.total)}
        cta="Confirm Order"
        disabled={!lines.length}
        onClick={() => navigate({ to: "/order-success", search: { date } })}
      />
    </div>
  );
}
