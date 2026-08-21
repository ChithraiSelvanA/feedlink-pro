import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, FileText, KeyRound, LogOut } from "lucide-react";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { useAuth } from "@/lib/auth";
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

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — FeedLink Dealer App" },
      {
        name: "description",
        content: "Change your password, read the privacy policy, check the app version or log out.",
      },
      { property: "og:title", content: "Settings — FeedLink" },
      {
        property: "og:description",
        content: "Password, privacy policy, app version and logout.",
      },
    ],
  }),
  component: Settings,
});

function Settings() {
  const navigate = useNavigate();
  const { logout: signOut, resetPassword, session } = useAuth();
  const [pwd, setPwd] = useState(false);
  const [logout, setLogout] = useState(false);
  const [saving, setSaving] = useState(false);
  const [next, setNext] = useState("");

  return (
    <div className="animate-page pb-28">
      <AppBar title="Settings" back={false} />

      <ul className="glass-card mx-4 mt-4 divide-y divide-border rounded-3xl px-4">
        <li>
          <button
            type="button"
            onClick={() => setPwd(true)}
            className="press flex min-h-14 w-full items-center gap-3 py-4 text-left"
          >
            <KeyRound className="size-5 text-primary" strokeWidth={1.75} />
            <span className="flex-1 text-base font-medium">Change Password</span>
            <ChevronRight className="size-5 text-muted-foreground" />
          </button>
        </li>
        <li>
          <a
            href="/privacy-policy"
            className="press flex min-h-14 w-full items-center gap-3 py-4"
          >
            <FileText className="size-5 text-primary" strokeWidth={1.75} />
            <span className="flex-1 text-base font-medium">Privacy Policy</span>
            <ChevronRight className="size-5 text-muted-foreground" />
          </a>
        </li>
        <li className="flex min-h-14 items-center gap-3 py-4">
          <span className="flex-1 text-base font-medium">App Version</span>
          <span className="text-sm text-muted-foreground">1.0.0</span>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setLogout(true)}
            className="press flex min-h-14 w-full items-center gap-3 py-4 text-left text-destructive"
          >
            <LogOut className="size-5" strokeWidth={1.75} />
            <span className="flex-1 text-base font-medium">Logout</span>
          </button>
        </li>
      </ul>


      <Dialog open={pwd} onOpenChange={setPwd}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="new-password" className="text-xs">
              New password
            </Label>
            <Input
              id="new-password"
              type="password"
              className="mt-1.5"
              value={next}
              onChange={(e) => setNext(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              disabled={saving}
              onClick={async () => {
                if (next.length < 6) {
                  toast.error("Password must be at least 6 characters");
                  return;
                }
                if (!session) return;
                setSaving(true);
                const err = await resetPassword(session.phone, next);
                setSaving(false);
                if (err) {
                  toast.error(err);
                  return;
                }
                setNext("");
                setPwd(false);
                toast.success("Password updated");
              }}
            >
              {saving ? "Updating…" : "Update Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={logout} onOpenChange={setLogout}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Log out of FeedLink?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="w-full" onClick={() => setLogout(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => { signOut(); navigate({ to: "/login", replace: true }); }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
