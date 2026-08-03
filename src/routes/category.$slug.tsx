import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { getCategory, productsIn, type Category, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { AppBar } from "@/components/app/app-bar";
import { ProductOrderCard } from "@/components/app/cards";
import { EmptyState } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category, items: productsIn(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Category unavailable — FeedLink" }, { name: "robots", content: "noindex" }],
      };
    const title = `${loaderData.category.name} — Order at Dealer Rates | FeedLink`;
    const description = `Order ${loaderData.category.name.toLowerCase()} by bag size and quantity. ${loaderData.items.length} products available for dealer delivery.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryProducts,
});

function CategoryProducts() {
  const { category, items } = Route.useLoaderData() as {
    category: Category;
    items: Product[];
  };
  const { bags } = useCart();

  return (
    <div className="animate-page pb-28">
      <AppBar title={category.name} cart />

      {items.length ? (
        <div className="space-y-3 px-4 pt-4">
          {items.map((p) => (
            <ProductOrderCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Package}
          title="No products yet"
          description="This category has no products available right now."
        />
      )}

      {bags > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto max-w-md">
            <Button asChild size="lg" className="w-full">
              <Link to="/cart">View Cart · {bags} bags</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
