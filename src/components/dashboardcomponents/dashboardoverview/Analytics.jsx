import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  ChevronDown,
} from "lucide-react";

// Helper to format percentage change
const formatChange = (change) => {
  if (!change) return null;
  const isPositive = change.percentage >= 0;
  const colorClass =
    change.color === "green" ? "text-green-600" : "text-red-600";

  return (
    <div className={`flex items-center text-xs ${colorClass}`}>
      {isPositive ? (
        <TrendingUp className="h-3 w-3 mr-1" />
      ) : (
        <TrendingDown className="h-3 w-3 mr-1" />
      )}
      {isPositive ? "+" : ""}
      {change.percentage}%
    </div>
  );
};

export default function Analytics({ data, timeFilter, setTimeFilter, customFrom, setCustomFrom, customTo, setCustomTo }) {
  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  const overviewData = data?.data;
  return (
    <div className=" ">
      <main className="">
        <div className="mb-8">
          <div className="flex items-center justify-between my-8">
            <h2 className="text-4xl font-bold">Analytics Dashboard</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg">
                  {timeFilter === "all"
                    ? "All"
                    : timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}
                  <ChevronDown className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleFilterChange("day")}>
                  Day
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("week")}>
                  Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("month")}>
                  Month
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Custom</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-64 p-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="from-date"
                          className="text-sm font-medium"
                        >
                          From
                        </Label>
                        <Input
                          id="from-date"
                          type="date"
                          value={customFrom}
                          onChange={(e) => setCustomFrom(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="to-date"
                          className="text-sm font-medium"
                        >
                          To
                        </Label>
                        <Input
                          id="to-date"
                          type="date"
                          value={customTo}
                          onChange={(e) => setCustomTo(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="text-2xl font-bold">
                  {overviewData?.totalUsers?.value || 0}
                </div>
                {formatChange(overviewData?.totalUsers?.change)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="text-2xl font-bold">
                  {overviewData?.activeUsers?.value || 0}
                </div>
                {formatChange(overviewData?.activeUsers?.change)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="text-2xl font-bold">
                  ${overviewData?.totalRevenue?.value || 0}
                </div>
                {formatChange(overviewData?.totalRevenue?.change)}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Subscriptions
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex justify-between">
                <div className="text-2xl font-bold">
                  {overviewData?.activeSubscriptions?.value || 0}
                </div>
                {formatChange(overviewData?.activeSubscriptions?.change)}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
