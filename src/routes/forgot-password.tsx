import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FormError } from "@/components/app/field";
import { useAuth } from "@/lib/auth";
import { fieldErrors, phoneField, resetSchema } from "@/lib/auth-validation";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — FeedLink Feed Ordering" },
      {
        name: "description",
        content:
          "Reset your FeedLink dealer password using your registered mobile number and get back to ordering feed.",
      },
      { property: "og:title", content: "Reset Password — FeedLink" },
      {
        property: "og:description",
        content: "Reset your dealer password with your registered mobile number.",
      },
    ],
  }),
  component: ForgotPassword;
});

function ForgotPassword() {
  const navigate = useNavigate();
  const { findAccount, resetPassword } = useAuth();
  const [step, setStep] = useState<"phone" | "reset">("phone");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const clear = (key: string) =>
    setErrors((e) => {
      const { [key]: _drop, form: _f, ...rest } = e;
      return rest;
    });

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = phoneField.safeParse(phone);
    if (!parsed.success) {
      setErrors({ phone: parsed.error.issues[0].message });
      return;
    }
    setErrors({});
    setLoading(true);
    const res = await findAccount(parsed.data);
    setLoading(false);
    if (!res.ok) {
      setErrors({ phone: res.error ?? "No account found" });
      return;
    }
    setStep("reset");
  };

  const submitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = resetSchema.safeParse({ password, confirm });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setLoading(true);
    const err = await resetPassword(phone, parsed.data.password);
    setLoading(false);
    if (err) {
      setErrors({ form: err });
      return;
    }
    toast.success("Password updated — please login");
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="animate-page flex min-h-screen flex-col px-6 pt-24">
      <h1 className="text-gradient text-3xl font-extrabold tracking-tight">Reset password</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {step === "phone"
          ? "Enter your registered mobile number"
          : `Set a new password for ${phone}`}
      </p>

      {step === "phone" ? (
        <form
          onSubmit={submitPhone}
          noValidate
          className="glass-card mt-8 space-y-5 rounded-3xl p-5"
        >
          <Field
            id="phone"
            label="Mobile number"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            value={phone}
            error={errors.phone}
            disabled={loading}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ""));
              clear("phone");
            }}
            placeholder="98765 43210"
          />

          <FormError message={errors.form} />

          <Button type="submit" size="xl" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : null}
            {loading ? "Checking…" : "Continue"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={submitReset}
          noValidate
          className="glass-card mt-8 space-y-5 rounded-3xl p-5"
        >
          <Field
            id="password"
            label="New password"
            type="password"
            autoComplete="new-password"
            value={password}
            error={errors.password}
            disabled={loading}
            onChange={(e) => {
              setPassword(e.target.value);
              clear("password");
            }}
            placeholder="Minimum 6 characters"
          />

          <Field
            id="confirm"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            value={confirm}
            error={errors.confirm}
            disabled={loading}
            onChange={(e) => {
              setConfirm(e.target.value);
              clear("confirm");
            }}
            placeholder="Re-enter password"
          />

          <FormError message={errors.form} />

          <Button type="submit" size="xl" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : null}
            {loading ? "Updating…" : "Update password"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={loading}
            onClick={() => {
              setStep("phone");
              setErrors({});
            }}
          >
            Use a different number
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Remembered it?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Back to login
        </Link>
      </p>
    </div>
  );
}
