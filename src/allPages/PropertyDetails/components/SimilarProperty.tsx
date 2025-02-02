"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { setShowLoginPopUp } from "@/Store/Features/AuthenticationSlice";
import PropertyCard from "./PropertyCard";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import Heading from "@/components/Heading";
import { useDispatch } from "react-redux";

export default function SimilarProperty({ data, locale }: any) {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");
  const swiperRef = useRef(null);
  // const dispatchRedux = useDispatch();

  return (
    <div>
      {data?.similar_properties?.length > 0 && (
        <div className="Property__SIMILAR--PROPERTIES">
          <div className="flex justify-between items-center asm:justify- ">
            <Heading>
              {t("headings.SIMILAR_PROPERTIES", {
                defaultValue: t("headings.SIMILAR_PROPERTIES", {
                  lng: locale === "en" ? "en" : "",
                }),
              })}{" "}
            </Heading>
            <div className="featured__slider--arrows flex justify-end gap-5 items-center asm:hidden">
              <button
                // onClick={() => swiperRef.current?.swiper?.slidePrev()}
                className="button-prev bg-transparent text-custome-blue border-2 border-custome-blue hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-8 w-8"
              >
                <FontAwesomeIcon
                  className="rotate-180 rtl:rotate-0 text-lg font-bold transition-all duration-300 ease-in-out active:scale-90"
                  icon={faChevronRight}
                />
              </button>
              <button
                // onClick={() => swiperRef.current?.swiper?.slideNext()}
                className="button-next bg-custome-blue text-custome-white border-2 border-custome-blue hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-8 w-8"
              >
                <FontAwesomeIcon
                  className="rtl:rotate-180 text-lg font-bold"
                  icon={faChevronRight}
                />
              </button>
            </div>
          </div>
          <p className="Property__name text-base mt-1 asm:text- mb-6">
            {t("headings.SIMILAR_PROPERTIES_DESCRIPTION", {
              defaultValue: t("headings.SIMILAR_PROPERTIES_DESCRIPTION", {
                lng: locale === "en" ? "en" : "",
              }),
            })}
          </p>
          <Swiper
            ref={swiperRef}
            loop={true}
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            // slidesPerView={2}
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              671: {
                slidesPerView: 2,
              },
              670: {
                slidesPerView: 1,
              },
            }}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="h-[640px]"
          >
            {data?.similar_properties?.map((property: any, i: number) => (
              <SwiperSlide key={i}>
                <PropertyCard card={property} locale={locale} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
