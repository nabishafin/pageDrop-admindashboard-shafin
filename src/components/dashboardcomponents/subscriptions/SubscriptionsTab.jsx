import { useGetSubscriptionAnalyticsQuery } from "@/redux/features/suscribtation/suscribtationApi";
import { RecentSubscriptionsTable } from "./RecentSubscriptionsTable";
import { SubscriptionGrowthChart } from "./SubscriptionGrowthChart";
import { Loader2 } from "lucide-react";
import CustomLoading from "@/components/ui/CustomLoading";

export default function SubscriptionsTab() {
  const { data, isLoading, isError } = useGetSubscriptionAnalyticsQuery();

  console.log(data);

  if (isLoading) {
    return <CustomLoading />;
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
