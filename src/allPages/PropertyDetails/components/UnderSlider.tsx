"use client";
import { faBath, faBed, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UnderSlider({ data, locale, t }: any) {
  return (
    <div className="under__slider--details mt-8 w-full flex text-custome-blue h-auto justify-start items-center asm:flex-col asm:gap-1 ">
      <div className="w-1/2 asm:w-full flex justify-start">
        {data?.total_property_area >= 0 && (
          <>
            <h5 className="property__size text-center text-base  w-1/2 bg-custome-venice h-12 flex justify-center items-center gap-2 ">
              <FontAwesomeIcon icon={faMaximize} width={20} /> {data?.total_property_area} {""}
              {t("land_area", {
                defaultValue: t("land_area", {
                  lng: locale === "ar" ? "ar" : "en",
                }),
              })}
              <sup>
                {t("land_area_unit", {
                  defaultValue: t("land_area_unit", {
                    lng: locale === "ar" ? "ar" : "en",
                  }),
                })}
              </sup>
            </h5>
            <div className="w-1 h-full bg-bg"></div>
          </>
        )}

        {data?.bed_rooms_no >= 0 && (
          <>
            <h5 className="bedrooms__number text-center text-base  w-1/2 bg-custome-venice h-12 flex justify-center items-center gap-2 ">
              <FontAwesomeIcon icon={faBed} width={20} /> {data?.bed_rooms_no}{" "}
              {t("Bedrooms", {
                defaultValue: t("property_id_word", {
                  lng: locale === "ar" ? "ar" : "en",
                }),
              })}
            </h5>
            <div className="w-1 h-full bg-bg"></div>
          </>
        )}
      </div>
      <div className="w-1/2 asm:w-full flex justify-start">
        {data?.bath_room_no >= 0 && (
          <>
            <h5 className="bathrooms__number text-center text-base  w-1/2 bg-custome-venice h-12 flex justify-center items-center gap-2 ">
              <FontAwesomeIcon icon={faBath} width={20} /> {data?.bath_room_no}{" "}
              {t("Bathrooms", {
                defaultValue: t("Bathrooms", {
                  lng: locale === "ar" ? "ar" : "en",
                }),
              })}
            </h5>
            <div className="w-1 h-full bg-bg"></div>
          </>
        )}
      </div>
    </div>
  );
}
