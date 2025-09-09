import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlans from "../../../components/dashboardcomponents/subscriptions/SubscriptionPlans";
import SubscriptionsTab from "@/components/dashboardcomponents/subscriptions/SubscriptionsTab";

const initialPlans = [
  {
    id: "monthly",
    name: "Monthly Plan",
    price: 5.8,
    period: "month",
    features: [
      "Unlimited access",
      "Unlimited access",
      "Unlimited access",
      "Unlimited access",
      "Unlimited access",
    ],
    activeUsers: 2111,
    isPopular: true,
  },
  {
    id: "yearly",
    name: "Yearly Plan",
    price: 5.8,
    period: "year",
    features: [
      "Unlimited access",
      "Unlimited access",
      "Unlimited access",
      "Unlimited access",
      "Unlimited access",
    ],
    activeUsers: 2111,
  },
];

export default function SubscriptionTabs() {
  const [plans, setPlans] = useState(initialPlans);

  const updatePlan = (updatedPlan) => {
    setPlans(
      plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
    );
  };

  return (
    <div className="">
      <Tabs defaultValue="plans" className="w-full">
        <div className="w-1/2">
          <TabsList className="inline-flex mb-6 bg-transparent p-0 h-auto w-auto">
            <TabsTrigger
              value="plans"
              className=" 
    data-[state=active]:text-[#4FB2F3] 
    mr-2 border-0 shadow-sm transition-all duration-300 ease-in-out
    focus-visible:ring-0 focus-visible:ring-offset-0
    flex items-center justify-center p-2" // Add flexbox utilities
            >
              Subscription Plans
            </TabsTrigger>

            <TabsTrigger
              value="analytics"
              className="
    data-[state=active]:text-[#4FB2F3]
    border-0 shadow-sm transition-all duration-300 ease-in-out
    focus-visible:ring-0 focus-visible:ring-offset-0
    flex items-center justify-center  p-2" // Add flexbox utilities
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
