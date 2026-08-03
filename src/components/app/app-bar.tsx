import { useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function AppBar({
  title,
  back = true,
  cart = false,
  action,
  className,
}: {
  title: string;
  back?: boolean;
  cart?: boolean;
  action?: ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const { bags } = useCart();

  return (
    <header className={cn("sticky top-0 z-30 border-b border-border bg-card", className)}>
      <div className="mx-auto flex h-16 max-w-md items-center gap-2 px-4">
        {back ? (
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Go back"
            className="press -ml-2 grid size-11 shrink-0 place-items-center rounded-full text-foreground hover:bg-muted"
          >
            <ArrowLeft className="size-5" />
          </button>
        ) : null}
        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
        {action}
        {cart ? (
          <Link
            to="/cart"
            aria-label="Cart"
            className="press relative -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-foreground hover:bg-muted"
          >
            <ShoppingCart className="size-5" />
            {bags > 0 ? (
              <span className="absolute right-1 top-1 animate-pop rounded-full bg-primary px-1.5 text-[0.625rem] font-semibold text-primary-foreground">
                {bags}
              </span>
            ) : null}
          </Link>
        ) : null}
      </div>
    </header>
  );
}
