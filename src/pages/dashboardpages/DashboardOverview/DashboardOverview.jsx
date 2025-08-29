import React from "react";

import RevenueChart from "../../../components/dashboardcomponents/dashboardoverview/RevenueChart";
import { SupportTracker } from "../../../components/dashboardcomponents/dashboardoverview/SupportTracker";
import Analytics from "../../../components/dashboardcomponents/dashboardoverview/Analytics";

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
