import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

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
  const [business, setBusiness] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (business.trim().length < 2) return setError("Enter your business name");
    if (owner.trim().length < 2) return setError("Enter the owner name");
    if (phone.length !== 10) return setError("Enter a valid 10-digit mobile number");
    if (password.length < 4) return setError("Password must be at least 4 characters");
    if (password !== confirm) return setError("Passwords do not match");

    const err = signUp({
      phone,
      password,
      business: business.trim().slice(0, 80),
      owner: owner.trim().slice(0, 80),
    });
    if (err) return setError(err);
    setError("");
    toast.success("Account created");
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="animate-page flex min-h-screen flex-col px-6 pb-10 pt-16">
      <h1 className="text-gradient text-3xl font-extrabold tracking-tight">Create account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Dealer registration</p>

      <form onSubmit={submit} className="glass-card mt-8 space-y-5 rounded-3xl p-5">
        <div>
          <Label htmlFor="business" className="text-xs">
            Business name
          </Label>
          <Input
            id="business"
            value={business}
            maxLength={80}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Sri Balaji Feeds"
            className="mt-1.5 h-12"
          />
        </div>

        <div>
          <Label htmlFor="owner" className="text-xs">
            Owner name
          </Label>
          <Input
            id="owner"
            value={owner}
            maxLength={80}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Ramesh Kumar"
            className="mt-1.5 h-12"
          />
        </div>

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
            placeholder="Create password"
            className="mt-1.5 h-12"
          />
        </div>

        <div>
          <Label htmlFor="confirm" className="text-xs">
            Confirm password
          </Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter password"
            className="mt-1.5 h-12"
          />
        </div>

        {error ? (
          <p role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="xl" className="w-full">
          Create account
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
