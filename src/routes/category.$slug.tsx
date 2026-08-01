import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { ProductCard, StickyBar } from "@/components/app/cards";
import { EmptyState, SearchBar } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Category unavailable — FeedLink" }, { name: "robots", content: "noindex" }] };
    const name = loaderData.category.name;
    return {
      meta: [
        { title: `${name} at Dealer Price — FeedLink` },
        {
          name: "description",
          content: `Compare and order ${name.toLowerCase()} SKUs with live dealer pricing, minimum order quantities and stock status.`,
        },
        { property: "og:title", content: `${name} at Dealer Price — FeedLink` },
        {
          property: "og:description",
          content: `Order ${name.toLowerCase()} with live dealer pricing and stock status.`,
        },
      ],
    };
  },
  component: CategoryPage,
});

const sorts = ["Popular", "Price low", "Price high", "In stock"] as const;

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { bags, subtotal } = useCart();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Popular");

  let list = products.filter((p) => p.category === category.slug);
  const q = query.trim().toLowerCase();
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  if (sort === "Price low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "Price high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "In stock") list = list.filter((p) => p.stock !== "out");

  return (
    <div className="pb-32">
      <AppBar title={category.name} subtitle={`${category.items} SKUs`} />

      <div className="px-4 pt-4">
        <SearchBar value={query} onChange={setQuery} placeholder={`Search in ${category.name}`} />
        <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
          {sorts.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              className={cn(
                "press shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold",
                sort === s
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <section className="px-4 pt-4">
        {list.length ? (
          <div className="grid grid-cols-2 gap-3">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="No products match"
            description="Try clearing the filters or search with a different brand name."
            action={
              <Button asChild variant="outline">
                <Link to="/categories">Browse full catalog</Link>
              </Button>
            }
          />
        )}
      </section>

      {bags > 0 ? (
        <StickyBar
          label={`${bags} bags in cart`}
          value={inr(subtotal)}
          cta="View cart"
          to="/cart"
        />
      ) : (
        <BottomNav />
      )}
    </div>
  );
}
