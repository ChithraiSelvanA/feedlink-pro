import { Minus, Plus, Search, Trash2, type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search feed, brand or SKU",
  autoFocus,
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="flex h-12 w-full items-center gap-2.5 rounded-2xl border border-border bg-card px-4 shadow-card focus-within:border-primary">
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <input
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}

export function QuantityStepper({
  qty,
  onChange,
  step = 1,
  size = "md",
  disabled,
}: {
  qty: number;
  onChange: (n: number) => void;
  step?: number;
  size?: "sm" | "md";
  disabled?: boolean;
}) {
  const box = size === "sm" ? "h-9" : "h-11";
  const btn = size === "sm" ? "size-9" : "size-11";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-primary/25 bg-primary-soft",
        box,
        disabled && "pointer-events-none opacity-45",
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(0, qty - step))}
        className={cn("press grid shrink-0 place-items-center rounded-xl text-primary", btn)}
      >
        {qty <= step ? <Trash2 className="size-4" /> : <Minus className="size-4" />}
      </button>
      <span
        key={qty}
        className="min-w-8 animate-pop text-center text-sm font-bold tabular-nums text-primary"
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + step)}
        className={cn("press grid shrink-0 place-items-center rounded-xl text-primary", btn)}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    delivered: { label: "Delivered", cls: "bg-success-soft text-success" },
    "in-transit": { label: "In transit", cls: "bg-info-soft text-info" },
    processing: { label: "Processing", cls: "bg-warning-soft text-warning-foreground" },
    cancelled: { label: "Cancelled", cls: "bg-destructive/10 text-destructive" },
    in: { label: "In stock", cls: "bg-success-soft text-success" },
    low: { label: "Low stock", cls: "bg-warning-soft text-warning-foreground" },
    out: { label: "Out of stock", cls: "bg-destructive/10 text-destructive" },
  };
  const s = map[status] ?? { label: status, cls: "bg-muted text-muted-foreground" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold",
        s.cls,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="animate-rise flex flex-col items-center px-6 py-14 text-center">
      <span className="grid size-20 place-items-center rounded-3xl bg-primary-soft text-primary">
        <Icon className="size-9" />
      </span>
      <h3 className="mt-5 text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-card">
      <div className="skeleton aspect-square w-full rounded-xl" />
      <div className="skeleton mt-3 h-3.5 w-4/5 rounded-full" />
      <div className="skeleton mt-2 h-3 w-1/2 rounded-full" />
      <div className="mt-3 flex items-center justify-between">
        <div className="skeleton h-4 w-16 rounded-full" />
        <div className="skeleton h-9 w-9 rounded-lg" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="skeleton h-3.5 w-2/5 rounded-full" />
          <div className="skeleton mt-2.5 h-3 w-3/5 rounded-full" />
          <div className="skeleton mt-4 h-9 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export function AddButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button size="sm" disabled={disabled} onClick={onClick} className="px-4">
      Add
    </Button>
  );
}
