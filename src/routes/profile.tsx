import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { dealer, type Address } from "@/lib/catalog";
import { useAddresses } from "@/lib/addresses";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Dealer Profile & Addresses — FeedLink" },
      {
        name: "description",
        content:
          "Your business details and delivery addresses. Add, edit or set a default address for faster ordering.",
      },
      { property: "og:title", content: "Dealer Profile — FeedLink" },
      {
        property: "og:description",
        content: "Business details and delivery addresses for faster feed ordering.",
      },
    ],
  }),
  component: Profile,
});

const empty = { id: "", label: "", line: "", city: "", pincode: "" };

function Profile() {
  const { addresses, save, setDefault } = useAddresses();
  const [form, setForm] = useState<typeof empty | null>(null);

  const openNew = () => setForm({ ...empty, id: `addr-${Date.now()}` });
  const openEdit = (a: Address) =>
    setForm({ id: a.id, label: a.label, line: a.line, city: a.city, pincode: a.pincode });

  const submit = () => {
    if (!form) return;
    if (!form.label.trim() || !form.line.trim() || !form.city.trim() || !form.pincode.trim()) {
      toast.error("Please fill all address fields");
      return;
    }
    save(form);
    setForm(null);
    toast.success("Address saved");
  };

  return (
    <div className="animate-page pb-28">
      <AppBar title="Profile" back={false} />

      <section className="glass-card mx-4 mt-4 divide-y divide-border rounded-3xl px-4">
        <Field label="Business Name" value={dealer.business} />
        <Field label="Owner Name" value={dealer.owner} />
        <Field label="Mobile Number" value={dealer.phone} />
      </section>

      <section className="mt-6 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight">Delivery Addresses</h2>
          <Button variant="outline" size="sm" onClick={openNew}>
            Add Address
          </Button>
        </div>

        <ul className="mt-3 space-y-3">
          {addresses.map((a) => (
            <li key={a.id} className="glass-card rounded-3xl p-4">

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{a.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {a.line}, {a.city} — {a.pincode}
                  </p>
                </div>
                {a.isDefault ? (
                  <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                    Default
                  </span>
                ) : null}
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(a)}>
                  Edit
                </Button>
                {!a.isDefault ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDefault(a.id);
                      toast.success("Default address updated");
                    }}
                  >
                    Set Default
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Dialog open={form !== null} onOpenChange={(o) => !o && setForm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Address details</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {(
              [
                ["label", "Label (Shop, Godown)"],
                ["line", "Address line"],
                ["city", "City & state"],
                ["pincode", "Pincode"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <Label htmlFor={key} className="text-xs">
                  {label}
                </Label>
                <Input
                  id={key}
                  className="mt-1.5"
                  value={form?.[key] ?? ""}
                  onChange={(e) =>
                    setForm((f) => (f ? { ...f, [key]: e.target.value } : f))
                  }
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={submit}>
              Save Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-medium">{value}</p>
    </div>
  );
}
