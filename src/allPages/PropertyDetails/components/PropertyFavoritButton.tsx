"use client";
import { usePostData } from "@/Hooks/usePostData";
import { userData } from "@/Store/Features/AuthenticationSlice";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function PropertyFavoritButton({ data }: any) {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");
  const dispatchRedux = useDispatch();
  const user = useSelector(userData);

  const { mutate } = usePostData(
    true,
    () => {
      // تنفيذ استدعاء refetch هنا إذا لزم الأمر
    },
    true,
    (error) => {
      console.error("Error adding to favorites:", error);
      // يمكنك إضافة أي إجراءات تتعلق بالخطأ هنا
    }
  );
  return (
    <>
      {user?.token && (
        <div className="w-fit flex items-center">
          <div
            className="property__love cursor-pointer gap-2 border hover:bg-custome-blue hover:text-custome-white transition duration-300 rounded-xl px-2 p-2 flex"
            onClick={() =>
              mutate({
                api: process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE as string,
                data: { property_id: data?.id },
              })
            }
          >
            <div className="heart-container" title="Like">
              <input
                checked={Boolean(Number(data?.is_fav))}
                type="checkbox"
                className="heart-checkbox"
                id={data?.id}
              />
              <div className="svg-container">
                <svg viewBox="0 0 24 24" className="svg-outline">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                </svg>
              </div>
            </div>
            <span>{t("save", { lng: i18n.language.startsWith("ar") ? "" : "en" })}</span>
          </div>
        </div>
      )}
    </>
  );
}
