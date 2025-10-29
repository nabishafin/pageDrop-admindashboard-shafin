import React, { useState, useEffect } from "react";
import { SupportTracker } from "../../../components/dashboardcomponents/dashboardoverview/SupportTracker";
import Analytics from "../../../components/dashboardcomponents/dashboardoverview/Analytics";
import { useGetAdminOverviewQuery } from "@/redux/features/adminOverview/adminOverviewApi";
import { Loader2 } from "lucide-react";

const DashboardOverview = () => {
  const [timeFilter, setTimeFilter] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const { data: analyticsData, isLoading: isLoadingAnalytics, isError: isErrorAnalytics, refetch } = useGetAdminOverviewQuery({
    timeFilter:
      timeFilter === "custom" ? `${customFrom}_${customTo}` : timeFilter,
  });

  useEffect(() => {
    refetch();
  }, [timeFilter, customFrom, customTo, refetch]);

  const isLoading = isLoadingAnalytics; // SupportTracker handles its own loading now
  const isError = isErrorAnalytics; // SupportTracker handles its own error now

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading dashboard overview data.
      </div>
    );
  }

  return (
    <div>
      <Analytics data={analyticsData} timeFilter={timeFilter} setTimeFilter={setTimeFilter} customFrom={customFrom} setCustomFrom={setCustomFrom} customTo={customTo} setCustomTo={setCustomTo} />

      <div className="mt-10">
        <SupportTracker />
      </div>
    </div>
  );
};

export default DashboardOverview;
