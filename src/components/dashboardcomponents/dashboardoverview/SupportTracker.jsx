import { SupportTrackerChart } from "@/components/support-tracker-chart";
import { ActiveCodes } from "@/components/active-codes";

export function SupportTracker() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SupportTrackerChart />
        <ActiveCodes />
      </div>
    </div>
  );
}
