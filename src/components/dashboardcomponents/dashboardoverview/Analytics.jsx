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
  ChevronRight,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className=" ">
      {/* Analytics Dashboard Section */}
      <main className="">
        <div className="mb-8">
          <div className="flex items-center justify-between my-8">
            <h2 className="text-4xl font-bold">Analytics Dashboard</h2>
            <DropdownMenu className="">
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg">
                  All <ChevronDown className=" ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Day</DropdownMenuItem>
                <DropdownMenuItem>Week</DropdownMenuItem>
                <DropdownMenuItem>Month</DropdownMenuItem>
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
                        <div className="relative">
                          <Input
                            id="from-date"
                            type="date"
                            defaultValue="2025-08-03"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="to-date"
                          className="text-sm font-medium"
                        >
                          To
                        </Label>
                        <div className="relative">
                          <Input
                            id="to-date"
                            type="date"
                            defaultValue="2025-08-03"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between space-y-6 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className={"flex justify-between"}>
                <div className="text-2xl font-bold">3,625</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.03%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-6 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className={"flex justify-between"}>
                <div className="text-2xl font-bold">1,025</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +11.01%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-6 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className={"flex justify-between"}>
                <div className="text-2xl font-bold">$1,625</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.03%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-6 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Subscriptions
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className={"flex justify-between"}>
                <div className="text-2xl font-bold">10,625</div>
                <div className="flex items-center text-xs text-red-600">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.03%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
