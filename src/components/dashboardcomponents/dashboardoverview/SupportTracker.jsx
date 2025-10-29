import { ActiveCodes } from "./ActiveCodes";
import RevenueChart from "./RevenueChart";
import {
  useGetAdminActiveCouponsQuery,
  useGetAdminOverviewGraphQuery,
} from "@/redux/features/adminOverview/adminOverviewApi";
import { Loader2 } from "lucide-react";

export function SupportTracker() {
  const {
    data: activeCouponsData,
    isLoading: isLoadingActiveCoupons,
    isError: isErrorActiveCoupons,
  } = useGetAdminActiveCouponsQuery();
  const {
    data: revenueChartData,
    isLoading: isLoadingRevenueChart,
    isError: isErrorRevenueChart,
  } = useGetAdminOverviewGraphQuery();

  const isLoading = isLoadingActiveCoupons || isLoadingRevenueChart;
  const isError = isErrorActiveCoupons || isErrorRevenueChart;

  if (isLoading) {
    return (
      <div className="space-y-4 bg-white p-5 rounded-lg shadow mt-5">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4FB2F3] mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading ...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading support tracker data.
      </div>
    );
  }

  return (
    <div className=" mx-auto space-y-6 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueChartData} />
        <ActiveCodes data={activeCouponsData} />
      </div>
    </div>
  );
}
