import { createFileRoute } from "@tanstack/react-router";
import { categories, dealer } from "@/lib/catalog";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { CategoryCard } from "@/components/app/cards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Order Feed by Category — FeedLink Dealer App" },
      {
        name: "description",
        content:
          "Pick a category and place your feed order in under a minute. Cattle feed, goat feed, poultry feed, husk and minerals at dealer rates.",
      },
      { property: "og:title", content: "Order Feed by Category — FeedLink" },
      {
        property: "og:description",
        content: "Pick a category and place your dealer feed order in under a minute.",
      },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="animate-page pb-28">
      <AppBar title="Categories" back={false} cart />
      <div className="px-4 pt-4">
        <p className="text-sm text-muted-foreground">
          {dealer.business} · {dealer.code}
        </p>
        <div className="mt-4 space-y-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
