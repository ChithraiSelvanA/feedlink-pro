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
    <header
      className={cn(
        "glass-strong sticky top-0 z-30 border-b border-glass-border shadow-card",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-md items-center gap-2 px-4">
        {back ? (
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Go back"
            className="press -ml-2 grid size-11 shrink-0 place-items-center rounded-full text-foreground hover:bg-primary-soft"
          >
            <ArrowLeft className="size-5" />
          </button>
        ) : null}
        <h1 className="min-w-0 flex-1 truncate text-lg font-semibold tracking-tight">{title}</h1>

        {action}
        {cart ? (
          <Link
            to="/cart"
            aria-label="Cart"
            className="press relative -mr-2 grid size-11 shrink-0 place-items-center rounded-full border border-glass-border bg-glass text-primary shadow-card hover:bg-primary-soft"
          >
            <ShoppingCart className="size-5" />
            {bags > 0 ? (
              <span className="gradient-primary absolute -right-0.5 -top-0.5 animate-pop rounded-full px-1.5 text-[0.625rem] font-semibold text-primary-foreground shadow-glow">
                {bags}
              </span>
            ) : null}
          </Link>
        ) : null}

      </div>
    </header>
  );
}
