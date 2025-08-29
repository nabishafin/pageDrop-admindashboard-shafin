import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const chartData = [
  { month: "Jan", Basic: 1000, Premium: 1200 },
  { month: "Feb", Basic: 1100, Premium: 1300 },
  { month: "Mar", Basic: 1200, Premium: 1400 },
  { month: "Apr", Basic: 1150, Premium: 1450 },
  { month: "May", Basic: 1300, Premium: 1500 },
  { month: "Jun", Basic: 1400, Premium: 1550 },
];

export function SubscriptionGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Subscription Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                domain={[0, 2400]}
                ticks={[0, 600, 1200, 1800, 2400]}
              />
              <Line
                type="monotone"
                dataKey="Basic"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Premium"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
