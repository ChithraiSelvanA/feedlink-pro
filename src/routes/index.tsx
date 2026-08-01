import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bell, Leaf, ShoppingCart, Truck } from "lucide-react";
import {
  byIds,
  categories,
  dealer,
  featuredIds,
  frequentIds,
  inr,
  products,
  recentIds,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { BottomNav } from "@/components/app/bottom-nav";
import { SectionHeader } from "@/components/app/app-bar";
import { CategoryCard, ProductCard } from "@/components/app/cards";
import { ProductSkeleton, SearchBar } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FeedLink — B2B Cattle Feed Ordering for Dealers" },
      {
        name: "description",
        content:
          "Order cattle, goat and poultry feed in under a minute. Live dealer pricing, credit terms and depot dispatch tracking for distributors.",
      },
      { property: "og:title", content: "FeedLink — B2B Cattle Feed Ordering for Dealers" },
      {
        property: "og:description",
        content:
          "Order cattle, goat and poultry feed in under a minute with live dealer pricing and dispatch tracking.",
      },
    ],
  }),
  component: Home,
});

function Splash() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-primary">
      <span className="grid size-20 animate-pop place-items-center rounded-3xl bg-primary-foreground/15 text-primary-foreground">
        <Leaf className="size-10" />
      </span>
      <div className="animate-fade-in text-center">
        <p className="text-2xl font-extrabold tracking-tight text-primary-foreground">FeedLink</p>
        <p className="mt-1 text-xs font-medium text-primary-foreground/80">
          Dealer feed ordering, simplified
        </p>
      </div>
      <span className="mt-6 h-1 w-24 overflow-hidden rounded-full bg-primary-foreground/25">
        <span className="skeleton block h-full w-full rounded-full" />
      </span>
    </div>
  );
}

function Home() {
  const [splash, setSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const { bags, subtotal } = useCart();

  useEffect(() => {
    const a = setTimeout(() => setSplash(false), 1500);
    const b = setTimeout(() => setLoading(false), 1900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
    );
  }, [query]);

  if (splash) return <Splash />;

  return (
    <div className="animate-fade-in pb-28">
      <header className="rounded-b-3xl bg-primary px-4 pb-6 pt-5 text-primary-foreground">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-primary-foreground/80">Good morning</p>
            <h1 className="truncate text-xl font-extrabold">{dealer.name}</h1>
            <p className="mt-0.5 truncate text-[0.7rem] text-primary-foreground/75">
              {dealer.tier} · {dealer.code}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Notifications"
              className="press grid size-11 place-items-center rounded-full bg-primary-foreground/12"
            >
              <Bell className="size-5" />
            </button>
            <Link
              to="/cart"
              aria-label="Cart"
              className="press relative grid size-11 place-items-center rounded-full bg-primary-foreground/12"
            >
              <ShoppingCart className="size-5" />
              {bags > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 animate-pop rounded-full bg-secondary px-1.5 text-[0.625rem] font-bold text-secondary-foreground">
                  {bags}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-foreground/12 px-3.5 py-2.5">
          <Truck className="size-4 shrink-0" />
          <p className="min-w-0 flex-1 truncate text-xs font-medium">
            Next depot dispatch closes today, 4 PM
          </p>
          <span className="shrink-0 text-xs font-bold tabular-nums">{inr(subtotal)}</span>
        </div>
      </header>

      {results ? (
        <section className="px-4 pt-5">
          <SectionHeader title={`${results.length} results`} caption={`for "${query}"`} />
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="px-4 pt-5">
            <SectionHeader
              title="Shop by category"
              action={
                <Button asChild variant="link" size="sm" className="px-0">
                  <Link to="/categories">See all</Link>
                </Button>
              }
            />
            <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
              {categories.map((c) => (
                <CategoryCard key={c.slug} category={c} wide />
              ))}
            </div>
          </section>

          <section className="px-4 pt-6">
            <div className="overflow-hidden rounded-2xl bg-secondary p-5 text-secondary-foreground shadow-card">
              <p className="text-[0.7rem] font-bold uppercase tracking-widest">Monsoon scheme</p>
              <h3 className="mt-1.5 text-lg font-extrabold leading-tight">
                Order 50+ bags, get 2% extra margin
              </h3>
              <p className="mt-1 text-xs font-medium opacity-80">Valid till 15 Aug 2026</p>
              <Button asChild size="sm" className="mt-4">
                <Link to="/category/$slug" params={{ slug: "cattle-feed" }}>
                  Shop cattle feed
                </Link>
              </Button>
            </div>
          </section>

          <section className="px-4 pt-6">
            <SectionHeader title="Featured products" caption="Handpicked for your region" />
            <div className="grid grid-cols-2 gap-3">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => <ProductSkeleton key={i} />)
                : byIds(featuredIds).map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          <section className="pt-6">
            <div className="px-4">
              <SectionHeader title="Frequently ordered" caption="Reorder in one tap" />
            </div>
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {byIds(frequentIds).map((p) => (
                <ProductCard key={p.id} product={p} wide />
              ))}
            </div>
          </section>

          <section className="pt-4">
            <div className="px-4">
              <SectionHeader title="Recently ordered" caption="From your last 3 orders" />
            </div>
            <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
              {byIds(recentIds).map((p) => (
                <ProductCard key={p.id} product={p} wide />
              ))}
            </div>
          </section>
        </>
      )}

      <BottomNav />
    </div>
  );
}
