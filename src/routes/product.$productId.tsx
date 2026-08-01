import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, ShieldCheck, Truck } from "lucide-react";
import { getProduct, inr, products, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { AppBar, SectionHeader } from "@/components/app/app-bar";
import { ProductCard, StickyBar } from "@/components/app/cards";
import { QuantityStepper, StatusBadge } from "@/components/app/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Product unavailable — FeedLink" }, { name: "robots", content: "noindex" }],
      };
    const p = loaderData.product;
    const title = `${p.name} ${p.weight} — ${p.brand} | FeedLink`;
    const description = `${p.description.slice(0, 150)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { qtyOf, setQty } = useCart();
  const [qty, setLocal] = useState(Math.max(qtyOf(product.id), product.moq));
  const [active, setActive] = useState(0);
  const inCart = qtyOf(product.id);
  const soldOut = product.stock === "out";
  const related = products.filter((p) => p.category === product.category && p.id !== product.id);

  return (
    <div className="pb-32">
      <AppBar
        title={product.brand}
        subtitle={product.weight}
        action={
          <button
            type="button"
            aria-label="Save product"
            className="press grid size-11 place-items-center rounded-full hover:bg-muted"
          >
            <Heart className="size-5 text-muted-foreground" />
          </button>
        }
      />

      <div className="bg-card px-4 pb-5">
        <div
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl"
          onScroll={(e) => {
            const el = e.currentTarget;
            setActive(Math.round(el.scrollLeft / (el.clientWidth + 12)));
          }}
        >
          {product.gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${product.name} view ${i + 1}`}
              width={768}
              height={768}
              className="aspect-square w-full shrink-0 snap-center rounded-2xl border border-border bg-muted object-cover"
            />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {product.gallery.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-5 bg-primary" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
      </div>

      <section className="px-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mt-1 text-xl font-extrabold leading-snug text-foreground">
              {product.name}
            </h1>
          </div>
          <StatusBadge status={product.stock} />
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-2.5">
          <p className="text-2xl font-extrabold tabular-nums text-foreground">
            {inr(product.price)}
          </p>
          <p className="text-sm text-muted-foreground line-through tabular-nums">
            {inr(product.mrp)}
          </p>
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary">
            Save {inr(product.mrp - product.price)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Per {product.weight} bag · MOQ {product.moq} bags · inclusive of GST
        </p>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-card p-3 shadow-card">
          <div>
            <p className="text-xs font-semibold text-foreground">Quantity</p>
            <p className="text-[0.7rem] text-muted-foreground">
              {inr(product.price * qty)} for {qty} bags
            </p>
          </div>
          <QuantityStepper qty={qty} disabled={soldOut} onChange={(n) => setLocal(Math.max(1, n))} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-3 shadow-card">
            <Truck className="size-4 text-primary" />
            <p className="mt-1.5 text-xs font-bold text-foreground">2–3 day delivery</p>
            <p className="text-[0.7rem] text-muted-foreground">From Nashik depot</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-3 shadow-card">
            <ShieldCheck className="size-4 text-primary" />
            <p className="mt-1.5 text-xs font-bold text-foreground">Batch tested</p>
            <p className="text-[0.7rem] text-muted-foreground">FSSAI compliant</p>
          </div>
        </div>
      </section>

      <section className="px-4 pt-7">
        <SectionHeader title="Description" />
        <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      </section>

      <section className="px-4 pt-7">
        <SectionHeader title="Key benefits" />
        <ul className="space-y-2">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 pt-7">
        <SectionHeader title="Nutritional information" caption="Guaranteed analysis" />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          {product.nutrition.map((n, i) => (
            <div
              key={n.label}
              className={cn(
                "flex items-center justify-between px-4 py-3 text-sm",
                i % 2 === 1 && "bg-muted/60",
              )}
            >
              <span className="text-muted-foreground">{n.label}</span>
              <span className="font-semibold text-foreground">{n.value}</span>
            </div>
          ))}
        </div>
      </section>

      {related.length ? (
        <section className="pt-7">
          <div className="px-4">
            <SectionHeader title="Related products" />
          </div>
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} wide />
            ))}
          </div>
        </section>
      ) : null}

      <StickyBar
        label={inCart ? `${inCart} bags already in cart` : "Total for selection"}
        value={inr(product.price * qty)}
        cta={soldOut ? "Out of stock" : "Add to Cart"}
        disabled={soldOut}
        onClick={() => {
          setQty(product.id, qty);
          toast.success("Added to cart", { description: `${qty} × ${product.name}` });
        }}
      />
    </div>
  );
}
