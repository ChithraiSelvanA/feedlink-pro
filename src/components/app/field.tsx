import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldProps = React.ComponentProps<typeof Input> & {
  label: string;
  id: string;
  error?: string | undefined;
};

export function Field({ label, id, error, className, ...props }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("mt-1.5 h-12", error && "border-destructive focus-visible:ring-destructive", className)}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
    >
      {message}
    </p>
  );
}
