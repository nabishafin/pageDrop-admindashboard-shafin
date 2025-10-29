import React, { useState, useEffect } from "react";
import { SupportTracker } from "../../../components/dashboardcomponents/dashboardoverview/SupportTracker";
import Analytics from "../../../components/dashboardcomponents/dashboardoverview/Analytics";
import { useGetAdminOverviewQuery } from "@/redux/features/adminOverview/adminOverviewApi";

const DashboardOverview = () => {
  const [timeFilter, setTimeFilter] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const {
    data: analyticsData,
    isLoading: isLoadingAnalytics,
    isError: isErrorAnalytics,
    refetch,
  } = useGetAdminOverviewQuery({
    timeFilter:
      timeFilter === "custom" ? `${customFrom}_${customTo}` : timeFilter,
  });

  useEffect(() => {
    refetch();
  }, [timeFilter, customFrom, customTo, refetch]);

  const isLoading = isLoadingAnalytics;
  const isError = isErrorAnalytics;

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
        Error loading dashboard overview data.
      </div>
    );
  }

  return (
    <div>
      <Analytics
        data={analyticsData}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        customFrom={customFrom}
        setCustomFrom={setCustomFrom}
        customTo={customTo}
        setCustomTo={setCustomTo}
      />

      <div className="mt-10">
        <SupportTracker />
      </div>
    </div>
  );
};

export default DashboardOverview;
