import { ActiveCodes } from "./ActiveCodes";
import RevenueChart from "./RevenueChart";
import { useGetAdminActiveCouponsQuery, useGetAdminOverviewGraphQuery } from "@/redux/features/adminOverview/adminOverviewApi";
import { Loader2 } from "lucide-react";

export function SupportTracker() {
  const { data: activeCouponsData, isLoading: isLoadingActiveCoupons, isError: isErrorActiveCoupons } = useGetAdminActiveCouponsQuery();
  const { data: revenueChartData, isLoading: isLoadingRevenueChart, isError: isErrorRevenueChart } = useGetAdminOverviewGraphQuery();

  const isLoading = isLoadingActiveCoupons || isLoadingRevenueChart;
  const isError = isErrorActiveCoupons || isErrorRevenueChart;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
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
