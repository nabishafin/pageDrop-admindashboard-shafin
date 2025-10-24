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

export function SubscriptionGrowthChart({ chartData }) {
  const transformedData = chartData?.data?.monthly.map(item => ({
      month: item.month,
      monthly: item.count
  }));

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
            <LineChart data={transformedData}>
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
                dataKey="monthly"
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
