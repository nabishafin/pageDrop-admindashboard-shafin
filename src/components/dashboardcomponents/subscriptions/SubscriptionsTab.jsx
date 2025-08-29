import { RecentSubscriptionsTable } from "./RecentSubscriptionsTable";
import { SubscriptionGrowthChart } from "./SubscriptionGrowthChart";

export default function SubscriptionsTab() {
  return (
    <main className="">
      <div className="space-y-6">
        <SubscriptionGrowthChart />
        <RecentSubscriptionsTable />
      </div>
    </main>
  );
}
