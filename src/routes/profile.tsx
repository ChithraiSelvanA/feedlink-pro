import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  FileText,
  Headphones,
  LogOut,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { dealer } from "@/lib/catalog";
import { AppBar, SectionHeader } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Dealer Profile & Business Details — FeedLink" },
      {
        name: "description",
        content:
          "Manage your dealer contact details, delivery address, GST information and credit terms on FeedLink.",
      },
      { property: "og:title", content: "Dealer Profile & Business Details" },
      {
        property: "og:description",
        content: "Manage contact details, delivery address, GST information and credit terms.",
      },
    ],
  }),
  component: Profile,
});

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 px-4 py-3.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="pb-28">
      <AppBar title="Profile" back={false} />

      <section className="px-4 pt-5">
        <div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-raised">
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15 text-lg font-extrabold">
              RT
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-extrabold">{dealer.name}</h2>
              <p className="truncate text-xs text-primary-foreground/80">
                {dealer.tier} · Since {dealer.since}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary-foreground/12 p-3">
              <p className="text-[0.65rem] text-primary-foreground/75">Dealer code</p>
              <p className="mt-0.5 text-sm font-bold">{dealer.code}</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/12 p-3">
              <p className="text-[0.65rem] text-primary-foreground/75">Credit available</p>
              <p className="mt-0.5 text-sm font-bold tabular-nums">₹2,40,000</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Contact details" />
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <Row icon={Phone} label="Contact person" value={`${dealer.contact} · ${dealer.phone}`} />
          <Row icon={Mail} label="Email" value={dealer.email} />
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Delivery address" />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <Row icon={MapPin} label="Primary godown" value={dealer.address} />
        </div>
      </section>

      <section className="px-4 pt-6">
        <SectionHeader title="Business information" />
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <Row icon={Building2} label="Legal entity" value={`${dealer.name} (Proprietorship)`} />
          <Row icon={FileText} label="GSTIN" value={dealer.gstin} />
        </div>
      </section>

      <section className="px-4 pt-6">
        <Link
          to="/orders"
          className="press flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
        >
          <Headphones className="size-4 shrink-0 text-primary" />
          <span className="min-w-0 flex-1 text-sm font-semibold text-foreground">
            Order support & invoices
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      </section>

      <section className="px-4 pt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="xl" className="w-full text-destructive">
              <LogOut className="size-4" /> Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Log out of FeedLink?</AlertDialogTitle>
              <AlertDialogDescription>
                Your cart is saved on this device, so you can pick up right where you left off.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Stay signed in</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link to="/login" className="rounded-xl">
                  Logout
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <BottomNav />
    </div>
  );
}
