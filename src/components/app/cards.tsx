import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Beef, Bird, ChevronRight, Gem, Rabbit, Wheat } from "lucide-react";
import { inr, type Category, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { QuantityStepper, SizeSelector } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const catIcon: Record<Category["icon"], typeof Beef> = {
  cattle: Beef,
  goat: Rabbit,
  poultry: Bird,
  husk: Wheat,
  mineral: Gem,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = catIcon[category.icon];
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className="press glass-card flex min-h-20 items-center gap-4 rounded-2xl px-4 py-4 hover:-translate-y-0.5 hover:shadow-raised"
    >
      <span className="gradient-primary grid size-12 shrink-0 place-items-center rounded-2xl text-primary-foreground shadow-glow">
        <Icon className="size-6" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-semibold tracking-tight">{category.name}</span>
        <span className="block text-sm text-muted-foreground">{category.items} products</span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-primary/70" />
    </Link>

  );
}

export function ProductOrderCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [kg, setKg] = useState(product.sizes[0]?.kg ?? 0);
  const [qty, setQty] = useState(1);
  const price = product.sizes.find((s) => s.kg === kg)?.price ?? 0;

  return (
    <article className="glass-card rounded-3xl p-4">
      <div className="flex gap-4">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="size-20 shrink-0 rounded-2xl border border-glass-border object-cover shadow-card"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-snug tracking-tight">{product.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">Brand: {product.brand}</p>
          {!product.inStock ? (
            <p className="mt-1 text-xs font-medium text-destructive">Out of stock</p>
          ) : null}
        </div>
      </div>

      <div className={cn("mt-4", !product.inStock && "opacity-50")}>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Bag Size
        </p>
        <SizeSelector sizes={product.sizes.map((s) => s.kg)} value={kg} onChange={setKg} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-glass-border bg-primary-soft/70 px-3 py-2.5">
        <p className="text-gradient text-2xl font-bold tabular-nums">{inr(price)}</p>
        <QuantityStepper qty={qty} onChange={setQty} disabled={!product.inStock} />
      </div>


      <Button
        size="lg"
        disabled={!product.inStock}
        onClick={() => {
          add(product.id, kg, qty);
          toast.success("Added to cart", { description: `${qty} × ${kg} KG · ${product.name}` });
        }}
        className="mt-4 w-full"
      >
        Add to Cart
      </Button>
    </article>
  );
}

export function CartLineRow({
  product,
  kg,
  qty,
  onQty,
  onRemove,
}: {
  product: Product;
  kg: number;
  qty: number;
  onQty: (n: number) => void;
  onRemove: () => void;
}) {
  const price = product.sizes.find((s) => s.kg === kg)?.price ?? 0;
  return (
    <div className="flex gap-4 py-4">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={512}
        height={512}
        className="size-16 shrink-0 rounded-xl border border-border object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{product.name}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {product.brand} · {kg} KG bag
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="press text-xs font-medium text-destructive"
          >
            Remove
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <QuantityStepper qty={qty} onChange={onQty} />
          <p className="text-base font-semibold tabular-nums">{inr(price * qty)}</p>
        </div>
      </div>
    </div>
  );
}
