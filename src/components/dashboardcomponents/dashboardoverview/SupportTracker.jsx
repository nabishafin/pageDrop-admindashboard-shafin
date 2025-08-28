import { ActiveCodes } from "./ActiveCodes";
import { SupportTrackerChart } from "./SupportTrackerChart";

export function SupportTracker() {
  return (
    <div className=" mx-auto space-y-6 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SupportTrackerChart />
        <ActiveCodes />
      </div>
    </div>
  );
}
