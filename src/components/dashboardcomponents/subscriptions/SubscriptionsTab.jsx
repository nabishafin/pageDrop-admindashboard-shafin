import { useGetSubscriptionAnalyticsQuery } from "@/redux/features/suscribtation/suscribtationApi";
import { RecentSubscriptionsTable } from "./RecentSubscriptionsTable";
import { SubscriptionGrowthChart } from "./SubscriptionGrowthChart";
import { Loader2 } from "lucide-react";

export default function SubscriptionsTab() {
  const { data, isLoading, isError } = useGetSubscriptionAnalyticsQuery();

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[#4FB2F3]" />
        <span className="ml-2">Loading analytics...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error loading subscription analytics. Please try again.
      </div>
    );
  }

  return (
    <main className="">
      <div className="space-y-6">
        <SubscriptionGrowthChart chartData={data?.data?.growth} />

        <RecentSubscriptionsTable subscriptionData={data?.data?.recent} />
      </div>
    </main>
  );
}
