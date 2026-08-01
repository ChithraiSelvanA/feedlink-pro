import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import illustration from "@/assets/login-illustration.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Dealer Login — FeedLink" },
      {
        name: "description",
        content:
          "Sign in with your registered mobile number to access dealer pricing, credit limits and feed order history.",
      },
      { property: "og:title", content: "Dealer Login — FeedLink" },
      {
        property: "og:description",
        content: "Sign in to access dealer pricing, credit limits and feed order history.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    setError("");
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="rounded-b-[2rem] bg-primary-soft px-6 pb-6 pt-10">
        <img
          src={illustration}
          alt="Dealer with dairy cattle in a field"
          width={1024}
          height={768}
          className="mx-auto h-40 w-auto object-contain"
        />
      </div>

      <div className="flex-1 px-6 pt-8">
        <h1 className="text-2xl font-extrabold text-foreground">Welcome back</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sign in to place feed orders at your dealer price.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="phone" className="text-xs font-semibold text-foreground">
              Mobile number
            </label>
            <div className="mt-1.5 flex h-13 items-center gap-2.5 rounded-2xl border border-border bg-card px-4 shadow-card focus-within:border-primary">
              <Phone className="size-4 shrink-0 text-muted-foreground" />
              <span className="shrink-0 text-sm font-semibold text-muted-foreground">+91</span>
              <input
                id="phone"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="98765 43210"
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-semibold text-foreground">
              Password
            </label>
            <div className="mt-1.5 flex h-13 items-center gap-2.5 rounded-2xl border border-border bg-card px-4 shadow-card focus-within:border-primary">
              <Lock className="size-4 shrink-0 text-muted-foreground" />
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
              {error}
            </p>
          ) : null}

          <Button type="submit" size="xl" variant="primaryLg" className="w-full">
            Login
          </Button>

          <button
            type="button"
            className="w-full py-2 text-xs font-semibold text-primary hover:underline"
          >
            Forgot password?
          </button>
        </form>
      </div>

      <p className="px-6 pb-8 pt-4 text-center text-[0.7rem] text-muted-foreground">
        Authorised dealers only · FeedLink Nutrition Pvt Ltd
      </p>
    </div>
  );
}
