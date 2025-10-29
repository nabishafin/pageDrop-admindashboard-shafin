import React, { useState, useEffect } from "react";
import { SupportTracker } from "../../../components/dashboardcomponents/dashboardoverview/SupportTracker";
import Analytics from "../../../components/dashboardcomponents/dashboardoverview/Analytics";
import { useGetAdminOverviewQuery } from "@/redux/features/adminOverview/adminOverviewApi";
import CustomLoading from "@/components/ui/CustomLoading";

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
    return <CustomLoading />;
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
        <hr />
      </div>
      <div className="mt-8">
        <SupportTracker />
      </div>
    </div>
  );
};

export default DashboardOverview;
