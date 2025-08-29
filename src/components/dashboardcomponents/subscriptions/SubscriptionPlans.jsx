import { useState } from "react";
import PlanCard from "./PlanCard";
import EditPlanModal from "./EditPlanModal";

export default function SubscriptionPlans({ plans, onUpdatePlan }) {
  const [editingPlan, setEditingPlan] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan });
    setIsEditDialogOpen(true);
  };

  const handleSavePlan = (updatedPlan) => {
    onUpdatePlan(updatedPlan);
    setIsEditDialogOpen(false);
    setEditingPlan(null);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Subscription Plans</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
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
      />
    </>
  );
}
