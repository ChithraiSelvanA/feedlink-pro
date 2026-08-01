import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { inr, type Product, type Category, type Order, byIds } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { AddButton, QuantityStepper, StatusBadge } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Beef, Bird, ChevronRight, FlaskConical, Gem, Package, Rabbit } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductCard({ product, wide }: { product: Product; wide?: boolean }) {
  const { qtyOf, setQty } = useCart();
  const qty = qtyOf(product.id);
  const soldOut = product.stock === "out";
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-card transition-shadow active:shadow-raised",
        wide && "w-44 shrink-0",
      )}
    >
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={768}
            height={768}
            className="size-full object-cover transition-transform duration-300 group-active:scale-[1.04]"
          />
          {off > 0 ? (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground">
              {off}% off
            </span>
          ) : null}
        </div>
        <p className="mt-2.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {product.weight} · MOQ {product.moq}
        </p>
        <div className="mt-2">
          <StatusBadge status={product.stock} />
        </div>
      </Link>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-base font-bold tabular-nums text-foreground">{inr(product.price)}</p>
          <p className="text-[0.7rem] text-muted-foreground line-through tabular-nums">
            {inr(product.mrp)}
          </p>
        </div>
        {soldOut ? (
          <span className="text-xs font-semibold text-muted-foreground">Unavailable</span>
        ) : qty > 0 ? (
          <QuantityStepper qty={qty} size="sm" onChange={(n) => setQty(product.id, n)} />
        ) : (
          <AddButton
            onClick={() => {
              setQty(product.id, product.moq);
              toast.success(`${product.name} added`, {
                description: `${product.moq} × ${product.weight} in cart`,
              });
            }}
          />
        )}
      </div>
    </article>
  );
}

const catStyle: Record<Category["icon"], { Icon: typeof Beef; bg: string; fg: string }> = {
  cattle: { Icon: Beef, bg: "bg-primary-soft", fg: "text-primary" },
  goat: { Icon: Rabbit, bg: "bg-warning-soft", fg: "text-warning-foreground" },
  poultry: { Icon: Bird, bg: "bg-info-soft", fg: "text-info" },
  supplement: { Icon: FlaskConical, bg: "bg-success-soft", fg: "text-success" },
  mineral: { Icon: Gem, bg: "bg-muted", fg: "text-foreground" },
};

export function CategoryCard({ category, wide }: { category: Category; wide?: boolean }) {
  const s = catStyle[category.icon];
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className={cn(
        "press flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-card",
        wide && "w-24 shrink-0",
      )}
    >
      <span className={cn("grid size-14 place-items-center rounded-2xl", s.bg, s.fg)}>
        <s.Icon className="size-6" />
      </span>
      <span className="line-clamp-2 text-center text-xs font-bold leading-tight text-foreground">
        {category.name}
      </span>
      <span className="text-[0.65rem] text-muted-foreground">{category.items} SKUs</span>
    </Link>
  );
}

export function OrderCard({ order }: { order: Order }) {
  const items = byIds(order.lines.map((l) => l.productId));
  return (
    <Link
      to="/orders/$orderId"
      params={{ orderId: order.id }}
      className="press block rounded-2xl border border-border bg-card p-4 shadow-card"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">{order.id}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{order.date}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        {items.slice(0, 3).map((p) => (
          <img
            key={p.id}
            src={p.image}
            alt={p.name}
            loading="lazy"
            width={768}
            height={768}
            className="size-10 rounded-lg border border-border object-cover"
          />
        ))}
        <span className="ml-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Package className="size-3.5" />
          {order.lines.length} items · {order.lines.reduce((s, l) => s + l.qty, 0)} bags
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <p className="text-sm font-bold tabular-nums text-foreground">{inr(order.total)}</p>
        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
          View details <ChevronRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function ProductRow({ product, qty }: { product: Product; qty: number }) {
  const { setQty } = useCart();
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-card">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={768}
        height={768}
        className="size-20 shrink-0 rounded-xl border border-border object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </p>
        <h3 className="truncate text-sm font-bold text-foreground">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.weight}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="text-sm font-bold tabular-nums text-foreground">
            {inr(product.price * qty)}
          </p>
          <QuantityStepper qty={qty} size="sm" onChange={(n) => setQty(product.id, n)} />
        </div>
      </div>
    </div>
  );
}

export function StickyBar({
  label,
  value,
  cta,
  onClick,
  to,
  disabled,
}: {
  label: string;
  value: string;
  cta: string;
  onClick?: () => void;
  to?: "/checkout" | "/cart";
  disabled?: boolean;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-nav backdrop-blur">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] text-muted-foreground">{label}</p>
          <p className="truncate text-lg font-bold tabular-nums text-foreground">{value}</p>
        </div>
        {to ? (
          <Button asChild size="xl" variant="primaryLg" className="flex-1">
            <Link to={to}>{cta}</Link>
          </Button>
        ) : (
          <Button
            size="xl"
            variant="primaryLg"
            className="flex-1"
            disabled={disabled}
            onClick={onClick}
          >
            {cta}
          </Button>
        )}
      </div>
    </div>
  );
}
