import React from "react";
import Analytics from "../../../components/dashboardcomponents/dashboardoverview/Analytics";
import RevenueChart from "../../../components/dashboardcomponents/dashboardoverview/RevenueChart";
import { SupportTracker } from "../../../components/dashboardcomponents/dashboardoverview/SupportTracker";

const DashboardOverview = () => {
  return (
    <div>
      <Analytics />
      <RevenueChart />
      <SupportTracker />
    </div>
  );
};

export default DashboardOverview;
