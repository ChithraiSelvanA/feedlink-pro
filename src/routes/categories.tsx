import { createFileRoute } from "@tanstack/react-router";
import { categories, products } from "@/lib/catalog";
import { AppBar, SectionHeader } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { CategoryCard, ProductCard } from "@/components/app/cards";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Feed Catalog — Cattle, Goat, Poultry & Minerals | FeedLink" },
      {
        name: "description",
        content:
          "Browse the full FeedLink catalog: cattle feed, goat feed, poultry feed, supplements and chelated mineral mixtures at dealer rates.",
      },
      { property: "og:title", content: "Feed Catalog — FeedLink" },
      {
        property: "og:description",
        content: "Cattle feed, goat feed, poultry feed, supplements and minerals at dealer rates.",
      },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="pb-28">
      <AppBar title="Catalog" subtitle={`${products.length} SKUs available`} back={false} />
      <section className="px-4 pt-5">
        <SectionHeader title="All categories" />
        <div className="grid grid-cols-3 gap-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="px-4 pt-7">
        <SectionHeader title="All products" caption="Sorted by best margin" />
        <div className="grid grid-cols-2 gap-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <BottomNav />
    </div>
  );
}
