"use client";

import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { usePostData } from "@/Hooks/usePostData";
import React from "react";
import FavoriteButton from "@/components/FavoriteButton";

export default function PropertyHeader({ data }: any) {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");
  const dispatchRedux = useDispatch();
  const user = useSelector(userData);

  const { mutate }: any = usePostData(
    true,
    () => {
      // تنفيذ استدعاء refetch هنا إذا لزم الأمر
    },
    true,
    (error) => {
      console.error("Error adding to favorites:", error);
    }
  );

  const handleFavoriteClick = () => {
    if (!user?.token) {
      dispatchRedux(setShowLoginPopUp(true));
    } else {
      mutate({
        api: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE}`,
        data: { property_id: data?.id },
        file: undefined,
      });
    }
  };

  return (
    <div>
      {/* asm:text-center  */}
      <h1 className="Property__name text-3xl clg:text-2xl font-semibold break-words md:text-lg ss:text-md">
        {data?.title?.toUpperCase()}
      </h1>

      {/* clg:items-center */}
      <div className="w-full flex flex-col ">
        <div className="w-full break-words my-2">{data?.address}</div>
        <div className="flex items-center gap-2 mt-2">
          <CiLocationOn size={25} />
          <span className="font-bold">{data?.city} |</span>
          <span className="font-bold">{data?.region}</span>
          {data?.sub_region && (
            <>
              | <span className="font-bold">{data?.sub_region}</span>
            </>
          )}
        </div>

        <h3 className="Property__name text-xl font-black bg-custome-red text-custome-white p-2 rounded mt-5 md:text-md w-fit">
          {data?.sold === true
            ? t("sold", { lng: i18n.language.startsWith("ar") ? "" : "en" })
            : t("PropertyCard.price_formatted", {
                context: data?.for_what,
                sale_price: data?.sale_price,
                rent_price: data?.rent_price,
                // sale_price: new Intl.NumberFormat(i18n.language, { style: "decimal" }).format(
                //   data?.sale_price
                // ),
                // rent_price: new Intl.NumberFormat(i18n.language, { style: "decimal" }).format(
                //   data?.rent_price
                // ),
                curr: data?.currency,
                duration: t(`PropertyCard.${data?.rent_duration}`),
              })}
        </h3>
        <div className="mt-4 w-full flex items-center justify-between">
          {data?.for_what === "for_rent" ? (
            <span className="text-custome-white rounded p-2 bg-custome-blue w-fit">
              {t("for_what.for_rent", { lng: i18n.language.startsWith("ar") ? "" : "en" })}
            </span>
          ) : data?.for_what === "for_both" ? (
            <span className="text-custome-white rounded p-2 bg-custome-blue w-fit">
              {t("for_what.for_both", { lng: i18n.language.startsWith("ar") ? "" : "en" })}
            </span>
          ) : (
            data?.for_what === "for_sale" && (
              <span className="text-custome-white rounded p-2 bg-custome-blue w-fit">
                {t("for_what.for_sale", { lng: i18n.language.startsWith("ar") ? "" : "en" })}
              </span>
            )
          )}

          {user?.data?.actor_type !== "broker" && (
            <div className="w-fit flex items-center ">
              <div
                className="property__love cursor-pointer gap-2 border hover:bg-secondary hover:text-white transition duration-300 rounded-xl px-2 top-0 right-0 rtl:right-auto rtl:left-0 p-2 flex"
                onClick={() => {
                  if (!user?.token) {
                    dispatchRedux(setShowLoginPopUp(true));
                  } else {
                    mutate({
                      api: process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE,
                      data: { property_id: data?.id },
                      file: undefined,
                    });

                    // تحديث حالة is_fav
                    data.is_fav = data?.is_fav === "1" ? "0" : "1";
                  }
                }}
              >
                <div className="heart-container" title="Like">
                  {user?.token && (
                    <input
                      checked={Boolean(Number(data?.is_fav))}
                      type="checkbox"
                      className="heart-checkbox"
                      id={data?.id}
                      readOnly // لمنع تعديل المستخدم مباشرة
                    />
                  )}
                  <div className="svg-container">
                    <svg
                      viewBox="0 0 24 24"
                      className="svg-outline"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 24 24"
                      className="svg-filled"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                    </svg>
                    <svg
                      className="svg-celebrate"
                      width="100"
                      height="100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="10,10 20,20"></polygon>
                      <polygon points="10,50 20,50"></polygon>
                      <polygon points="20,80 30,70"></polygon>
                      <polygon points="90,10 80,20"></polygon>
                      <polygon points="90,50 80,50"></polygon>
                      <polygon points="80,80 70,70"></polygon>
                    </svg>
                  </div>
                </div>
                <span>
                  {t("save", {
                    defaultValue: t("save", {
                      lng: i18n.language === "ar" ? "ar" : "en",
                    }),
                  })}
                </span>
              </div>
            </div>
          )}
          {/* {user?.actor_type !== "broker" && (
            <div className="w-fit flex items-center ">
              <div
                className="property__love cursor-pointer gap-2 border hover:bg-secondary hover:text-white transition duration-300 rounded-xl px-2  top-0 right-0 rtl:right-auto rtl:left-0 p-2 flex"
                onClick={
                  !user?.token
                    ? () => dispatchRedux(setShowLoginPopUp(true))
                    : () =>
                        mutate({
                          api: process.env.VITE_PROPERTY_ADD_TO_FAVORITE,
                          data: { property_id: data?.id },
                          file: undefined,
                        })
                }
              >
                <div className="heart-container" title="Like">
                  {user?.token && (
                    <input
                      checked={Boolean(Number(data?.is_fav))}
                      type="checkbox"
                      className="heart-checkbox"
                      id={data?.id}
                    />
                  )}
                  <div className="svg-container">
                    <svg
                      viewBox="0 0 24 24"
                      className="svg-outline"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 24 24"
                      className="svg-filled"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                    </svg>
                    <svg
                      className="svg-celebrate"
                      width="100"
                      height="100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="10,10 20,20"></polygon>
                      <polygon points="10,50 20,50"></polygon>
                      <polygon points="20,80 30,70"></polygon>
                      <polygon points="90,10 80,20"></polygon>
                      <polygon points="90,50 80,50"></polygon>
                      <polygon points="80,80 70,70"></polygon>
                    </svg>
                  </div>
                </div>
                <span>
                  {t("save", {
                    defaultValue: t("save", {
                      lng: i18n.language === "ar" ? "ar" : "en",
                    }),
                  })}
                </span>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
