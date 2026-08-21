import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FormError } from "@/components/app/field";
import { useAuth } from "@/lib/auth";
import { fieldErrors, signupSchema } from "@/lib/auth-validation";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Dealer Signup — FeedLink Feed Ordering" },
      {
        name: "description",
        content:
          "Create your FeedLink dealer account with your business name, owner name and mobile number to order feed at dealer rates.",
      },
      { property: "og:title", content: "Dealer Signup — FeedLink" },
      {
        property: "og:description",
        content: "Create a dealer account to order cattle, goat and poultry feed.",
      },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [values, setValues] = useState({
    business: "",
    owner: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof values) => (v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((e) => {
      const { [key]: _drop, form: _f, ...rest } = e;
      return rest;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setLoading(true);
    const err = await signUp({
      phone: parsed.data.phone,
      password: parsed.data.password,
      business: parsed.data.business,
      owner: parsed.data.owner,
    });
    setLoading(false);
    if (err) {
      setErrors({ form: err });
      return;
    }
    toast.success("Account created");
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="animate-page flex min-h-screen flex-col px-6 pb-10 pt-16">
      <h1 className="text-gradient text-3xl font-extrabold tracking-tight">Create account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Dealer registration</p>

      <form onSubmit={submit} noValidate className="glass-card mt-8 space-y-5 rounded-3xl p-5">
        <Field
          id="business"
          label="Business name"
          maxLength={80}
          value={values.business}
          error={errors["business"]}
          disabled={loading}
          onChange={(e) => set("business")(e.target.value)}
          placeholder="Sri Balaji Feeds"
        />

        <Field
          id="owner"
          label="Owner name"
          maxLength={80}
          value={values.owner}
          error={errors["owner"]}
          disabled={loading}
          onChange={(e) => set("owner")(e.target.value)}
          placeholder="Ramesh Kumar"
        />

        <Field
          id="phone"
          label="Mobile number"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          value={values.phone}
          error={errors["phone"]}
          disabled={loading}
          onChange={(e) => set("phone")(e.target.value.replace(/\D/g, ""))}
          placeholder="98765 43210"
        />

        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          error={errors["password"]}
          disabled={loading}
          onChange={(e) => set("password")(e.target.value)}
          placeholder="Minimum 6 characters"
        />

        <Field
          id="confirm"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={values.confirm}
          error={errors["confirm"]}
          disabled={loading}
          onChange={(e) => set("confirm")(e.target.value)}
          placeholder="Re-enter password"
        />

        <FormError message={errors["form"]} />

        <Button type="submit" size="xl" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : null}
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}
