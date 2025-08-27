import React from "react";
import Analytics from "../../../components/dashboardcomponents/dashboardoverview/Analytics";
import RevenueChart from "../../../components/dashboardcomponents/dashboardoverview/RevenueChart";

const DashboardOverview = () => {
  return (
    <div>
      <Analytics />
      <RevenueChart />
    </div>
  );
};

export default DashboardOverview;
