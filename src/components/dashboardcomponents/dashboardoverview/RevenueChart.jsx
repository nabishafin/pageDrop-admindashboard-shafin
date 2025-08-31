import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const RevenueChart = () => {
  const [viewType, setViewType] = useState("area"); // 'line' or 'area'

  // Sample data based on the chart you showed
  const monthlyData = [
    { month: "Jan", lastYear: 15000, thisYear: 12000 },
    { month: "Feb", lastYear: 8000, thisYear: 9500 },
    { month: "Mar", lastYear: 9500, thisYear: 15000 },
    { month: "Apr", lastYear: 14000, thisYear: 15500 },
    { month: "May", lastYear: 16000, thisYear: 25000 },
    { month: "Jun", lastYear: 18000, thisYear: 28000 },
    { month: "Jul", lastYear: 22000, thisYear: 24000 },
    { month: "Aug", lastYear: 20000, thisYear: 22000 },
    { month: "Sep", lastYear: 19000, thisYear: 18000 },
    { month: "Oct", lastYear: 21000, thisYear: 23000 },
    { month: "Nov", lastYear: 23000, thisYear: 25000 },
    { month: "Dec", lastYear: 25000, thisYear: 27000 },
  ];

  // Custom tooltip to format currency
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ৳${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-5">
      <ResponsiveContainer width="100%" height={400}>
        {viewType === "area" ? (
          <AreaChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="lastYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="thisYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `৳${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="lastYear"
              stroke="#9CA3AF"
              strokeWidth={2}
              fill="url(#lastYearGradient)"
              name="Last Year"
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#thisYearGradient)"
              name="This Year"
            />
          </AreaChart>
        ) : (
          <LineChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis
              stroke="#1593E5"
              fontSize={12}
              tickFormatter={(value) => `৳${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#9CA3AF"
              strokeWidth={2}
              dot={{ fill: "#9CA3AF", strokeWidth: 2, r: 4 }}
              name="Last Year"
            />
            <Line
              type="monotone"
              dataKey="thisYear"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 5 }}
              name="This Year"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
