import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tag,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
} from "lucide-react";

const PromoCodesStats = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              New Promo Code
            </CardTitle>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="text-2xl font-bold">19990</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 font-medium">
                +11.01%
              </span>
              <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Used Promo Code
            </CardTitle>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="text-2xl font-bold">19990</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-green-600 font-medium">
                +11.01%
              </span>
              <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Expired Promo Code
            </CardTitle>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="text-2xl font-bold">61%</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-red-600 font-medium">-0.03%</span>
              <TrendingDown className="w-3 h-3 text-red-600 ml-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromoCodesStats;
