import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const chartData = [
  { day: "Su", tickets: 45 },
  { day: "Mo", tickets: 52 },
  { day: "Tu", tickets: 38 },
  { day: "We", tickets: 41 },
  { day: "Th", tickets: 89 },
  { day: "Fr", tickets: 67 },
  { day: "Sa", tickets: 43 },
];

export function SupportTrackerChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Support Tracker</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Week <ChevronDown className="h-4 w-4 ml-2" />
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
                    <Label htmlFor="from-date" className="text-sm font-medium">
                      From
                    </Label>
                    <div className="relative">
                      <Input
                        id="from-date"
                        type="date"
                        defaultValue="2025-08-03"
                        className="w-full"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-date" className="text-sm font-medium">
                      To
                    </Label>
                    <div className="relative">
                      <Input
                        id="to-date"
                        type="date"
                        defaultValue="2025-08-03"
                        className="w-full"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">Last 7 Days</div>
        <div className="text-3xl font-bold mb-6">327</div>

        <div className="flex gap-6">
          {/* Stats on the left */}
          <div className="flex-shrink-0 w-32">
            <div className="text-xs text-muted-foreground mb-2">
              Open & Unresolved support ticket
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Open</span>
                </div>
                <span className="text-xs font-medium">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-xs">Resolved</span>
                </div>
                <span className="text-xs font-medium">123</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-xs">Unresolved</span>
                </div>
                <span className="text-xs font-medium">152</span>
              </div>
            </div>
          </div>

          {/* Chart on the right */}
          <div className="flex-1 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis hide />
                <Bar dataKey="tickets" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
