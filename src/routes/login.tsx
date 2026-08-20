import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FormError } from "@/components/app/field";
import { useAuth } from "@/lib/auth";
import { fieldErrors, loginSchema } from "@/lib/auth-validation";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Dealer Login — FeedLink Feed Ordering" },
      {
        name: "description",
        content:
          "Sign in with your registered mobile number to order cattle, goat and poultry feed at dealer rates.",
      },
      { property: "og:title", content: "Dealer Login — FeedLink" },
      {
        property: "og:description",
        content: "Sign in to order feed at dealer rates.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const clear = (key: string) =>
    setErrors((e) => {
      const { [key]: _drop, form: _f, ...rest } = e;
      return rest;
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ phone, password });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setLoading(true);
    const err = await signIn(parsed.data.phone, parsed.data.password);
    setLoading(false);
    if (err) {
      setErrors({ form: err });
      return;
    }
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="animate-page flex min-h-screen flex-col px-6 pt-24">
      <h1 className="text-gradient text-3xl font-extrabold tracking-tight">FeedLink</h1>
      <p className="mt-1 text-sm text-muted-foreground">Dealer feed ordering</p>

      <form onSubmit={submit} noValidate className="glass-card mt-8 space-y-5 rounded-3xl p-5">
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

        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          error={errors.password}
          disabled={loading}
          onChange={(e) => {
            setPassword(e.target.value);
            clear("password");
          }}
          placeholder="Enter password"
        />

        <div className="text-right">
          <Link to="/forgot-password" className="text-xs font-semibold text-primary">
            Forgot password?
          </Link>
        </div>

        <FormError message={errors.form} />

        <Button type="submit" size="xl" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          {loading ? "Signing in…" : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        New dealer?{" "}
        <Link to="/signup" className="font-semibold text-primary">
          Create an account
        </Link>
      </p>

      <p className="mt-auto pb-8 pt-10 text-center text-xs text-muted-foreground">
        Authorised dealers only
      </p>
    </div>
  );
}
