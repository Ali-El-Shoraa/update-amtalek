"use client";

import { memo } from "react";
import { useTranslation } from "react-i18next";

const PaymentPlansCard = memo(function PaymentPlansCard({ data }: any) {
  const { i18n } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-[#005879] to-[#007599] text-white p-4 rounded-2xl shadow text-center">
        <div className="mb-2">
          <div className="text-2xl font-bold">{data?.down_payment}%</div>
          <div className="ml-2">
            {i18n.language === "ar" ? "دفعة مبدئية" : "Down Payment"}
          </div>
        </div>
        <div className="font-medium">
          <span className="text-2xl font-bold">{data?.years}</span>
          <span className="ml-1">
            {i18n.language === "ar" ? "سنة" : "Years"}
          </span>
        </div>
        <div className="text-sm mt-2">
          {" "}
          {i18n.language === "ar" ? "خطة المشروع" : "Original Plan"}
        </div>
      </div>
    </div>
  );
});
export default PaymentPlansCard;
