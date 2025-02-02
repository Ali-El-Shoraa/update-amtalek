"use client";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

export default function PropertyViews({ data, locale, t }: any) {
  return (
    <>
      {/* md:flex-col */}
      <div className="Property__id--views flex justify-between items-center gap-2 ss:gap-4 text-xl font-medium  asm:text-center ss:w-full  ss:flex ss:justify-between">
        {/* <h3 className="Property__name text-xl font-medium  asm:text-center ss:w-full  ss:flex ss:justify-between"> */}
        {t("property_id_word", {
          defaultValue: t("property_id_word", {
            lng: locale === "ar" ? "ar" : "en",
          }),
        })}
        <span className="font-normal ">{data?.listing_number}</span>
        {/* </h3> */}
        {/* **************************************************************************************** */}
        {/* **************************************************************************************** */}
      </div>
      <h3 className="Property__name text-lg font-medium   asm:text-center ss:w-full ">
        {data?.views >= 0 && (
          <div className="w-full ss:justify-between flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2 capitalize">
              {t("views_word")}
            </div>
            <p className="flex justify-center items-center gap-2 ">
              <span className="font-normal gap-2 flex items-center ss:ltr:flex-row-reverse ss:rtl:flex-row-reverse">
                <FontAwesomeIcon className="text-lg ss:text-sm" icon={faEye} />
                {data?.views}
              </span>
            </p>
          </div>
        )}
      </h3>
      {/* **************************************************************************************** */}
      <div className="w-full  flex items-center justify-between ">
        <span className="text-xl font-medium  asm:text-center">
          {t("created", {
            defaultValue: t("created", {
              lng: locale === "ar" ? "ar" : "en",
            }),
          })}
        </span>
        <span className="flex items-center gap-2">
          {data?.created_at} <FaCalendarAlt />
        </span>
      </div>
      {data?.calc_roi === "yes" && (
        <div className="w-full flex items-center justify-between ">
          <span className="text-xl font-medium  asm:text-center">
            {t("roi", {
              defaultValue: t("roi", {
                lng: locale === "ar" ? "ar" : "en",
              }),
            })}
          </span>
          <span className="flex items-center gap-2">
            {data?.roi} <GiMoneyStack size={25} />
          </span>
        </div>
      )}
    </>
  );
}
