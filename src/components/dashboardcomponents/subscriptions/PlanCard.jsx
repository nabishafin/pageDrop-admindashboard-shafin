import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PlanCard({ plan, onEdit }) {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-[#4FB2F3] font-medium">
          {plan.name}
        </CardTitle>
        <div className="text-2xl font-bold">
          €{plan.price.toFixed(2)}
          <span className="text-sm font-normal text-gray-500">
            {" "}
            / {plan.period}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active user</span>
            <span className="font-medium">{plan.activeUsers}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          variant="ghost"
          className="w-full text-[#4FB2F3] hover:text-[#4FB2F3] border border-transparent font-medium"
          onClick={onEdit}
        >
          Edit Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
