import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditPlanModal({ plan, isOpen, onClose, onSave }) {
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    if (plan) {
      setEditingPlan({ ...plan });
    }
  }, [plan]);

  const handleSave = () => {
    if (editingPlan) {
      onSave(editingPlan);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
          <DialogDescription>
            Make changes to your subscription plan here. Click save when you're
            done.
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
                value={editingPlan.name}
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
                value={editingPlan.price}
                onChange={(e) =>
                  updateEditingPlan("price", Number.parseFloat(e.target.value))
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
                value={editingPlan.period}
                onChange={(e) => updateEditingPlan("period", e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="users" className="text-right">
                Active Users
              </Label>
              <Input
                id="users"
                type="number"
                value={editingPlan.activeUsers}
                onChange={(e) =>
                  updateEditingPlan(
                    "activeUsers",
                    Number.parseInt(e.target.value)
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              {editingPlan.features.map((feature, index) => (
                <Input
                  key={index}
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
