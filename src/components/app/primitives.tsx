import { Minus, Plus, type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  qty,
  onChange,
  min = 1,
  disabled,
}: {
  qty: number;
  onChange: (n: number) => void;
  min?: number;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass inline-flex h-11 items-center rounded-2xl border shadow-card",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, qty - 1))}
        className="press grid size-11 place-items-center rounded-l-2xl text-primary hover:bg-primary-soft"
      >
        <Minus className="size-4" />
      </button>
      <span
        key={qty}
        className="min-w-10 animate-pop text-center text-base font-semibold tabular-nums"
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="press grid size-11 place-items-center rounded-r-2xl text-primary hover:bg-primary-soft"
      >
        <Plus className="size-4" />
      </button>
    </div>

  );
}

export function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: number[];
  value: number;
  onChange: (kg: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((kg) => (
        <button
          key={kg}
          type="button"
          onClick={() => onChange(kg)}
          aria-pressed={value === kg}
          className={cn(
            "press h-10 min-w-20 rounded-2xl border px-4 text-sm font-semibold tabular-nums",
            value === kg
              ? "gradient-primary border-transparent text-primary-foreground shadow-glow"
              : "border-glass-border bg-glass text-muted-foreground hover:text-primary",
          )}
        >
          {kg} KG
        </button>
      ))}
    </div>

  );
}

const statusMap: Record<string, string> = {
  delivered: "text-success",
  "in-transit": "text-info",
  processing: "text-warning-foreground",
  cancelled: "text-destructive",
};

const statusLabel: Record<string, string> = {
  delivered: "Delivered",
  "in-transit": "In transit",
  processing: "Processing",
  cancelled: "Cancelled",
};

export function StatusText({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        statusMap[status] ?? "text-muted-foreground",
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel[status] ?? status}
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
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <Icon className="size-10 text-muted-foreground" strokeWidth={1.5} />
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className={cn("text-sm", strong ? "font-semibold" : "text-muted-foreground")}>
        {label}
      </span>
      <span
        className={cn("tabular-nums", strong ? "text-lg font-semibold" : "text-sm font-medium")}
      >
        {value}
      </span>
    </div>
  );
}
