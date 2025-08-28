import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

const activeCodes = [
  {
    code: "SUMMER20",
    discount: "20% off",
    uses: "1,200 uses",
    expires: "2023-06-30",
  },
  {
    code: "SUMMER20",
    discount: "20% off",
    uses: "1,200 uses",
    expires: "2023-06-30",
  },
  {
    code: "SUMMER20",
    discount: "20% off",
    uses: "1,300 uses",
    expires: "2023-06-30",
  },
  {
    code: "SUMMER20",
    discount: "20% off",
    uses: "1,200 uses",
    expires: "2023-06-30",
  },
  {
    code: "SUMMER20",
    discount: "20% off",
    uses: "1,200 uses",
    expires: "2023-06-30",
  },
];

export function ActiveCodes() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-2 pb-1">
        <CardTitle className="text-sm font-medium">Active Codes</CardTitle>
        <Button variant="link" size="sm" className="text-blue-600 p-0 text-xs">
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <div>
          {activeCodes.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-1 py-1 rounded-md"
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
      </CardContent>
    </Card>
  );
}
