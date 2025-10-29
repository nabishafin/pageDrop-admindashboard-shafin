import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAdminActiveCouponsQuery } from "@/redux/features/adminOverview/adminOverviewApi";

export function ActiveCodes() {
  const { data, isLoading, isError } = useGetAdminActiveCouponsQuery();

  if (isLoading) {
    return (
      <Card className="p-6 flex justify-center items-center">
        <p className="text-sm text-muted-foreground">Loading coupons...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6 flex justify-center items-center">
        <p className="text-sm text-red-500">Failed to load coupons.</p>
      </Card>
    );
  }

  const activeCodes = data?.data || []; // ✅ Adjust based on your API response structure

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-2 pb-1">
        <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
        <Link to="/dashboard/promo-codes">
          <Button
            variant="link"
            size="sm"
            className="text-[#1593E5] p-0 text-xs"
          >
            View all
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {activeCodes.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No active codes found.
          </p>
        ) : (
          <div>
            {activeCodes.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-[5px] py-[6px] rounded-md border border-gray-200 my-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#D9EFFC] rounded-full flex items-center justify-center">
                    <Ticket size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.code}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.discount}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">{item.uses}</div>
                  <div className="text-[10px] text-muted-foreground">
                    Expires {item.expires}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
