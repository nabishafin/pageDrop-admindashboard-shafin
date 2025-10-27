import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Plus, X } from "lucide-react";

export default function SubscriptionPlans({ plans, onUpdatePlan }) {
  const [editingPlan, setEditingPlan] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan });
    setIsEditDialogOpen(true);
  };

  const handleSavePlan = async (updatedPlan) => {
    setIsLoading(true);
    try {
      await onUpdatePlan(updatedPlan);
      setIsEditDialogOpen(false);
      setEditingPlan(null);
    } catch (error) { // eslint-disable-line no-unused-vars
      // Error handling is done in the parent component
    } finally {
      setIsLoading(false);
    }
  };

  // PlanCard component
  const PlanCard = ({ plan, onEdit }) => {
    return (
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-[#4FB2F3] font-medium">
            {plan.name}
          </CardTitle>
          <div className="text-2xl font-bold">
            €{plan.price?.toFixed(2) || "0.00"}
            <span className="text-sm font-normal text-gray-500">
              {" "}
              / {plan.period}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {plan.features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active user</span>
              <span className="font-medium">{plan.activeUsers || 0}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button
            variant="ghost"
            className="w-full bg-[#4FB2F3] text-white hover:bg-[#3DA1D7] border border-transparent font-medium"
            onClick={onEdit}
          >
            Edit Plan
          </Button>
        </CardFooter>
      </Card>
    );
  };

  // EditPlanModal component
  const EditPlanModal = ({ plan, isOpen, onClose, onSave, isLoading }) => {
    const [editingPlan, setEditingPlan] = useState(null);

    useEffect(() => {
      if (plan) {
        setEditingPlan({
          ...plan,
          features: plan.features ? [...plan.features] : [""],
        });
      }
    }, [plan]);

    const handleSave = () => {
      if (editingPlan) {
        // Filter out empty features before saving
        const planToSave = {
          ...editingPlan,
          features: editingPlan.features.filter(
            (feature) => feature.trim() !== ""
          ),
        };
        onSave(planToSave);
      }
    };

    const updateEditingPlan = (field, value) => {
      if (editingPlan) {
        setEditingPlan({ ...editingPlan, [field]: value });
      }
    };

    const updateFeature = (index, value) => {
      if (editingPlan) {
        const newFeatures = [...editingPlan.features];
        newFeatures[index] = value;
        setEditingPlan({ ...editingPlan, features: newFeatures });
      }
    };

    const addFeature = () => {
      if (editingPlan) {
        setEditingPlan({
          ...editingPlan,
          features: [...editingPlan.features, ""],
        });
      }
    };

    const removeFeature = (index) => {
      if (editingPlan) {
        const newFeatures = [...editingPlan.features];
        newFeatures.splice(index, 1);
        setEditingPlan({ ...editingPlan, features: newFeatures });
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>
              Make changes to your subscription plan here. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          {editingPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingPlan.name || ""}
                  onChange={(e) => updateEditingPlan("name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={editingPlan.price || ""}
                  onChange={(e) =>
                    updateEditingPlan(
                      "price",
                      e.target.value === ""
                        ? ""
                        : Number.parseFloat(e.target.value)
                    )
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="period" className="text-right">
                  Period
                </Label>
                <Input
                  id="period"
                  value={editingPlan.period || ""}
                  onChange={(e) => updateEditingPlan("period", e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                {editingPlan.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  type="button"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="bg-[#4FB2F3] hover:bg-[#4FB2F3]"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Subscription Plans</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id || plan._id}
            plan={plan}
            onEdit={() => handleEditPlan(plan)}
          />
        ))}
      </div>

      <EditPlanModal
        plan={editingPlan}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSavePlan}
        isLoading={isLoading}
      />
    </>
  );
}
