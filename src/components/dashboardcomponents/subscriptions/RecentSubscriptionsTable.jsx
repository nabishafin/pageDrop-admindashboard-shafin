import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const subscriptionData = [
  {
    user: "Amazon",
    subscription: "Monthly",
    registration: "5/27/15",
    status: "Active",
    type: "monthly",
  },
  {
    user: "Apple",
    subscription: "Yearly",
    registration: "6/21/19",
    status: "Active",
    type: "yearly",
  },
  {
    user: "Google",
    subscription: "Monthly",
    registration: "8/21/15",
    status: "Active",
    type: "monthly",
  },
  {
    user: "Netflix",
    subscription: "Yearly",
    registration: "6/21/12",
    status: "Active",
    type: "yearly",
  },
  {
    user: "Intercom",
    subscription: "Yearly",
    registration: "8/15/17",
    status: "Active",
    type: "yearly",
  },
];

export function RecentSubscriptionsTable() {
  const [filterType, setFilterType] = useState("all");

  const filteredData =
    filterType === "all"
      ? subscriptionData
      : subscriptionData.filter((item) => item.type === filterType);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">
          Recent Subscriptions
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button
            variant={filterType === "monthly" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={filterType === "yearly" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("yearly")}
          >
            Yearly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 font-medium text-muted-foreground">
                  User
                </th>
                <th className="py-3 px-4 font-medium text-muted-foreground">
                  Subscription
                </th>
                <th className="py-3 px-4 font-medium text-muted-foreground">
                  Registration
                </th>
                <th className="py-3 px-4 font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-border last:border-b-0 ${
                    index % 2 === 0 ? "bg-blue-50/50" : "bg-background"
                  }`}
                >
                  <td className="py-3 px-4 font-medium">{item.user}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        item.type === "monthly" ? "default" : "secondary"
                      }
                      className={
                        item.type === "monthly"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                      }
                    >
                      {item.subscription}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {item.registration}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-muted-foreground">
                    No subscriptions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
