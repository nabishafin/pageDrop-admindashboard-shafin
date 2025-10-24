import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionsTab from "@/components/dashboardcomponents/subscriptions/SubscriptionsTab";
import {
  useGetSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} from "@/redux/features/suscribtation/suscribtationApi";
import SubscriptionPlans from "@/components/dashboardcomponents/subscriptions/SubscriptionPlans";

export default function SubscriptionTabs() {
  // ✅ Fetch data first
  const {
    data: subscriptionPlans,
    isLoading,
    error,
  } = useGetSubscriptionPlansQuery();
  const [updateSubscriptionPlan] = useUpdateSubscriptionPlanMutation();

  // ✅ Initialize state after data is available (fallback empty array)
  const [plans, setPlans] = useState([]);

  // ✅ Sync fetched plans when loaded
  useEffect(() => {
    if (subscriptionPlans && subscriptionPlans.data) {
      setPlans(subscriptionPlans.data);
    }
  }, [subscriptionPlans]);

  const updatePlan = async (updatedPlan) => {
    try {
      // Call the API to update the plan
      const result = await updateSubscriptionPlan({
        _id: updatedPlan._id, // or updatedPlan._id depending on your API
        ...updatedPlan,
      }).unwrap();

      // Update local state with the response from API
      setPlans((prev) =>
        prev.map((plan) => (plan._id === updatedPlan._id ? result : plan))
      );
    } catch (error) {
      console.error("Failed to update plan:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="">
      <Tabs defaultValue="plans" className="w-full">
        <div className="w-1/2">
          <TabsList className="inline-flex mb-6 bg-transparent p-0 h-auto w-auto">
            <TabsTrigger
              value="plans"
              className="data-[state=active]:text-[#4FB2F3] mr-2 border-0 shadow-sm transition-all duration-300 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center justify-center p-2"
            >
              Subscription Plans
            </TabsTrigger>

            <TabsTrigger
              value="analytics"
              className="data-[state=active]:text-[#4FB2F3] border-0 shadow-sm transition-all duration-300 ease-in-out focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center justify-center p-2"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="plans" className="space-y-6 w-full">
          <SubscriptionPlans plans={plans} onUpdatePlan={updatePlan} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 w-full">
          <SubscriptionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
