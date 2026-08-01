import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppBar({
  title,
  subtitle,
  action,
  back = true,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  back?: boolean;
  className?: string;
}) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border/70 bg-card/95 backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto grid max-w-md grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        {back ? (
          <button
            type="button"
            onClick={() => router.history.back()}
            aria-label="Go back"
            className="press grid size-11 shrink-0 place-items-center rounded-full text-foreground hover:bg-muted"
          >
            <ChevronLeft className="size-5" />
          </button>
        ) : (
          <span className="size-1" />
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-foreground">{title}</h1>
          {subtitle ? (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-1">{action}</div>
      </div>
    </header>
  );
}

export function SectionHeader({
  title,
  caption,
  to,
  params,
  actionLabel = "See all",
}: {
  title: string;
  caption?: string;
  to?: string;
  params?: Record<string, string>;
  actionLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="truncate text-base font-bold text-foreground">{title}</h2>
        {caption ? <p className="truncate text-xs text-muted-foreground">{caption}</p> : null}
      </div>
      {to ? (
        <Link
          to={to}
          params={params}
          className="shrink-0 text-xs font-semibold text-primary hover:underline"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
