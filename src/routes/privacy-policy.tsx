import { createFileRoute } from "@tanstack/react-router";
import { AppBar } from "@/components/app/app-bar";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FeedLink Dealer App" },
      {
        name: "description",
        content:
          "How FeedLink collects, uses and protects dealer account, order and delivery information.",
      },
      { property: "og:title", content: "Privacy Policy — FeedLink" },
      {
        property: "og:description",
        content: "How FeedLink handles dealer account, order and delivery data.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="animate-page pb-12">
      <AppBar title="Privacy Policy" />
      <div className="space-y-4 px-4 pt-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          FeedLink stores only the information needed to process your feed orders: business name,
          owner name, mobile number, delivery addresses and order history.
        </p>
        <p>
          Order data is shared with the supplying plant and the transporter assigned to your
          delivery. We never sell dealer data to third parties.
        </p>
        <p>
          You can request correction or deletion of your account data by contacting your area sales
          manager.
        </p>
      </div>
    </div>
  );
}
