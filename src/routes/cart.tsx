import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAddresses } from "@/lib/addresses";
import { getProduct, inr } from "@/lib/catalog";
import { AppBar } from "@/components/app/app-bar";
import { CartLineRow } from "@/components/app/cards";
import { EmptyState, Row } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart & Place Order — FeedLink Dealer App" },
      {
        name: "description",
        content:
          "Review bag sizes, quantities and delivery address, then place your feed order in one tap.",
      },
      { property: "og:title", content: "Cart & Place Order — FeedLink" },
      {
        property: "og:description",
        content: "Review your feed order and place it in one tap.",
      },
    ],
  }),
  component: Cart,
});

function Cart() {
  const navigate = useNavigate();
  const { lines, setQty, remove, subtotal, bags } = useCart();
  const { addresses, selected, select } = useAddresses();
  const [picker, setPicker] = useState(false);

  const delivery = subtotal > 0 && subtotal < 5000 ? 250 : 0;
  const total = subtotal + delivery;

  if (!lines.length) {
    return (
      <div className="animate-page">
        <AppBar title="Cart" />
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Pick a category to start your order."
          action={
            <Button asChild size="lg">
              <Link to="/">Browse categories</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="animate-page pb-36">
      <AppBar title="Cart" />

      <section className="border-b border-border px-4 py-4">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground">Delivery address</p>
            <p className="mt-1 text-sm font-semibold">{selected?.label}</p>
            <p className="text-sm text-muted-foreground">
              {selected?.line}, {selected?.city} — {selected?.pincode}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="default"
          className="mt-3 w-full"
          onClick={() => setPicker(true)}
        >
          Change Address
        </Button>
      </section>

      <section className="divide-y divide-border px-4">
        {lines.map((l) => {
          const product = getProduct(l.productId);
          if (!product) return null;
          return (
            <CartLineRow
              key={`${l.productId}-${l.kg}`}
              product={product}
              kg={l.kg}
              qty={l.qty}
              onQty={(n) => setQty(l.productId, l.kg, n)}
              onRemove={() => remove(l.productId, l.kg)}
            />
          );
        })}
      </section>

      <section className="mt-2 border-t border-border px-4 py-3">
        <Row label={`Subtotal (${bags} bags)`} value={inr(subtotal)} />
        <Row label="Delivery" value={delivery === 0 ? "Free" : inr(delivery)} />
        <div className="border-t border-border">
          <Row label="Total" value={inr(total)} strong />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-md">
          <Button
            size="xl"
            className="w-full"
            onClick={() => navigate({ to: "/order-success", search: { total } })}
          >
            Place Order · {inr(total)}
          </Button>
        </div>
      </div>

      <Dialog open={picker} onOpenChange={setPicker}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Select delivery address</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {addresses.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => {
                  select(a.id);
                  setPicker(false);
                }}
                className={cn(
                  "press w-full rounded-xl border p-3 text-left",
                  selected?.id === a.id ? "border-primary bg-primary-soft" : "border-border",
                )}
              >
                <p className="text-sm font-semibold">{a.label}</p>
                <p className="text-sm text-muted-foreground">
                  {a.line}, {a.city} — {a.pincode}
                </p>
              </button>
            ))}
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link to="/profile">Manage addresses</Link>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
