import { CouponTable } from "@/components/dashboardcomponents/promoCodes/CouponTable";
import PromoCodesBoard from "@/components/dashboardcomponents/promoCodes/PromoCodesBoard";
import React from "react";

const PromoCodes = () => {
  return (
    <div>
      <PromoCodesBoard />
      <CouponTable />
    </div>
  );
};

export default PromoCodes;
