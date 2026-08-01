import { createFileRoute, notFound } from "@tanstack/react-router";
import { MapPin, Wallet } from "lucide-react";
import { getOrder, getProduct, inr } from "@/lib/catalog";
import { dealer } from "@/lib/catalog";
import { AppBar, SectionHeader } from "@/components/app/app-bar";
import { StatusBadge } from "@/components/app/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/$orderId")({
  loader: ({ params }) => {
    const order = getOrder(params.orderId);
    if (!order) throw notFound();
    return { order };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Order not found — FeedLink" }, { name: "robots", content: "noindex" }],
      };
    const o = loaderData.order;
    const title = `Order ${o.id} — ${o.status} | FeedLink`;
    const description = `Order ${o.id} placed on ${o.date} for ${inr(o.total)}. Track dispatch timeline and delivery details.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: OrderDetails,
});

function OrderDetails() {
  const { order } = Route.useLoaderData();

  return (
    <div className="pb-12">
      <AppBar
        title={order.id}
        subtitle={order.date}
        action={<StatusBadge status={order.status} />}
      />

      <section className="px-4 pt-5">
        <SectionHeader title="Tracking" caption={`Expected ${order.delivery}`} />
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <ol className="relative space-y-5 pl-1">
            {order.timeline.map((t, i) => (
              <li key={t.label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "size-3 shrink-0 rounded-full ring-4",
                      t.done ? "bg-primary ring-primary-soft" : "bg-border ring-muted",
                    )}
                  />
                  {i < order.timeline.length - 1 ? (
                    <span
                      className={cn(
                        "mt-1 w-0.5 flex-1 rounded-full",
                        t.done ? "bg-primary/40" : "bg-border",
                      )}
                    />
                  ) : null}
                </div>
                <div className="min-w-0 pb-1">
                  <p
                    className={cn(
                      "truncate text-sm font-bold",
                      t.done ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Items" caption={`${order.lines.length} products`} />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          {order.lines.map((l, i) => {
            const p = getProduct(l.productId);
            if (!p) return null;
            return (
              <div
                key={l.productId}
                className={cn("flex gap-3 p-3", i > 0 && "border-t border-border")}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="size-14 shrink-0 rounded-xl border border-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.weight} · {l.qty} bags × {inr(p.price)}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold tabular-nums text-foreground">
                  {inr(p.price * l.qty)}
                </p>
              </div>
            );
          })}
          <div className="flex items-center justify-between border-t border-border bg-muted/60 px-4 py-3">
            <span className="text-sm font-bold text-foreground">Order total</span>
            <span className="text-base font-extrabold tabular-nums text-foreground">
              {inr(order.total)}
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Delivery & payment" />
        <div className="space-y-3">
          <div className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">{dealer.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {dealer.address}
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
            <Wallet className="mt-0.5 size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">{order.payment}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Invoice shared on WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
