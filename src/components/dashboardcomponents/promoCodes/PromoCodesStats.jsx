import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tag,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { useGetAllCouponsQuery } from "@/redux/features/promocodes/promocodesApi";

const PromoCodesStats = () => {
  const { data, isLoading, isError } = useGetAllCouponsQuery();

  // Loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-white animate-pulse">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-white">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-red-500">
                Error
              </CardTitle>

            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="text-2xl font-bold text-red-500">N/A</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-red-500 font-medium">--</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Extracting stats from API
  const { stats } = data;
  const newCoupons = stats?.new || { count: 0, change: 0 };
  const usedCoupons = stats?.used || { count: 0, change: 0 };
  const expiredCoupons = stats?.expired || {
    count: 0,
    change: 0,
    percentage: 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* New Promo Code */}
      <Card className="bg-white">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            New Promo Codes
          </CardTitle>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Tag className="w-4 h-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="text-2xl font-bold">{newCoupons.count}</div>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs font-medium ${
                newCoupons.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {newCoupons.change >= 0
                ? `+${newCoupons.change}%`
                : `${newCoupons.change}%`}
            </span>
            {newCoupons.change >= 0 ? (
              <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600 ml-1" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Used Promo Code */}
      <Card className="bg-white">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Used Promo Codes
          </CardTitle>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="text-2xl font-bold">{usedCoupons.count}</div>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs font-medium ${
                usedCoupons.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {usedCoupons.change >= 0
                ? `+${usedCoupons.change}%`
                : `${usedCoupons.change}%`}
            </span>
            {usedCoupons.change >= 0 ? (
              <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600 ml-1" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expired Promo Code */}
      <Card className="bg-white">
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Expired Promo Codes
          </CardTitle>
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="text-2xl font-bold">{expiredCoupons.percentage}%</div>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs font-medium ${
                expiredCoupons.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {expiredCoupons.change >= 0
                ? `+${expiredCoupons.change}%`
                : `${expiredCoupons.change}%`}
            </span>
            {expiredCoupons.change >= 0 ? (
              <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600 ml-1" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromoCodesStats;
