import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

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
  const { login } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    if (password.length < 4) {
      setError("Enter your password");
      return;
    }
    setError("");
    login(phone);
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="animate-page flex min-h-screen flex-col px-6 pt-24">
      <h1 className="text-gradient text-3xl font-extrabold tracking-tight">FeedLink</h1>
      <p className="mt-1 text-sm text-muted-foreground">Dealer feed ordering</p>

      <form onSubmit={submit} className="glass-card mt-8 space-y-5 rounded-3xl p-5">

        <div>
          <Label htmlFor="phone" className="text-xs">
            Mobile number
          </Label>
          <Input
            id="phone"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="98765 43210"
            className="mt-1.5 h-12"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-xs">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="mt-1.5 h-12"
          />
        </div>

        {error ? (
          <p role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="xl" className="w-full">
          Login
        </Button>
      </form>

      <p className="mt-auto pb-8 pt-10 text-center text-xs text-muted-foreground">
        Authorised dealers only
      </p>
    </div>
  );
}
