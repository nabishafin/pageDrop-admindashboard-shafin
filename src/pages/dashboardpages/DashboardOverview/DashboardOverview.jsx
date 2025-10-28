import React from "react";

// import RevenueChart from "../../../components/dashboardcomponents/dashboardoverview/RevenueChart";
import { SupportTracker } from "../../../components/dashboardcomponents/dashboardoverview/SupportTracker";
import Analytics from "../../../components/dashboardcomponents/dashboardoverview/Analytics";

const DashboardOverview = () => {
  return (
    <div>
      <Analytics />
      {/* <RevenueChart /> */}
      <hr />
      <div className="mt-8">
        <SupportTracker />
      </div>
    </div>
  );
};

export default DashboardOverview;
