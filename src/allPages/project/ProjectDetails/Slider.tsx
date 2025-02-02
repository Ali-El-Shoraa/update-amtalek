"use client";

import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
// import { FaCamera } from "react-icons/fa";
// import HeaderSection from "@/components/headerSection/HeaderSection";
import { useTranslation } from "react-i18next";
// import { FaMaximize } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  // setShowLoginPopUp,
  // showLoginPopUp,
  userData,
  userProfileDataOut,
} from "@/Store/Features/AuthenticationSlice";
import { usePostData } from "@/Hooks/usePostData";
// import FavoriteButton from "@/components/FavoriteButton";
// import React, { useEffect, useState } from "react";
import LangLink from "@/components/LangLink";
// import { faBath, faBed, faMaximize } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiLocationOn } from "react-icons/ci";
export default function Slider({ data, locale, countrie }: any) {
  const { t, i18n } = useTranslation("Pages_LandingPage");
  const user = useSelector(userData);

  // const userProfile = useSelector((state: any) => state.Authentication.userProfileDataOut);
  const userProfile = useSelector(userProfileDataOut);
  const userProfileDataOutlet = userProfile?.data;

  const { mutate }: any = usePostData(
    true,
    () => {},
    true,
    (error: any) => {
      console.error("An error occurred:", error);

      //like from all projects doesn't have onSuccuss and favorites page can only unlike the property, so it has onSuccess
      // onSuccess ? onSuccess(slide?.id) : "";
    }
  );
  const dispatchRedux = useDispatch();

  return (
    <>
      <div className="flex items-center justify-between">
        {/* <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          locale={locale}
          countrie={countrie}
        /> */}

        <div
          className={`flex justify-end gap-5 items-center ltr:flex-row-reverse absolute top-0 ltr:right-0 rtl:left-0 asm:relative asm:mb-5 ${
            data?.length <= 2 ? "hidden" : "block"
          }`}
        >
          <button className="!swiper-button-next swiper-custom-next !bg-transparent !text-custome-blue border-2 !border-custome-blue hover:!scale-105 flex !justify-center !items-center !rounded !transition-all !duration-300 !ease-in-out active:!scale-90 !h-10 !w-10">
            <FaChevronRight className="text-lg font-bold" />
          </button>

          <button className="!swiper-button-prev swiper-custom-prev !bg-custome-blue !text-custome-white !border-2 !border-custome-blue hover:!scale-105 !flex !justify-center !items-center !rounded !transition-all duration-300 ease-in-out active:scale-90 !h-10 !w-10">
            <FaChevronLeft className="text-lg font-bold" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        className="relative pb-20 asm:h-[570px]"
        loop={true}
        speed={1800}
        spaceBetween={30}
        navigation={{
          nextEl: ".swiper-custom-next",
          prevEl: ".swiper-custom-prev",
        }}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
        }}
        breakpoints={{
          750: {
            slidesPerView: 1,
          },
          751: {
            slidesPerView: 2,
          },
        }}
      >
        {data?.map((slide: any) => (
          <SwiperSlide
            // onClick={() => localStorage.setItem("propertyId", slide?.listing_number)}
            key={slide?.id}
            className="relative text-custome-blue h-[450px] max-xl:h-[450px] max-lg:h-[440px] max-md:h-[450px]"
          >
            <div className="absolute top-4 z-20 right-4">
              {slide?.agent_data?.[0]?.name !== "Amtalek" ? (
                <>
                  <Link
                    href={`/agencies/${slide?.agent_data?.[0]?.name?.replace(
                      /\s/g,
                      "-"
                    )}/${slide?.agent_data?.[0]?.id}/${
                      slide?.agent_data?.[0]?.broker_type
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 bg-white py-2 px-3 rounded">
                      <Image
                        src={slide?.agent_data?.[0]?.logo}
                        alt={slide?.agent_data?.[0]?.name}
                        width={1000}
                        height={1000}
                        className="w-8 h-8 rounded-full object-contain"
                      />
                      <h3>{slide?.agent_data?.[0]?.name}</h3>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <button>
                    <div className="flex items-center justify-center gap-2 bg-white py-2 px-3 rounded">
                      <Image
                        src={slide?.agent_data?.[0]?.logo}
                        alt={slide?.agent_data?.[0]?.name}
                        width={1000}
                        height={1000}
                        className="w-8 h-8 rounded-full object-contain"
                      />
                      <h3>{slide?.agent_data?.[0]?.name}</h3>
                    </div>
                  </button>
                </>
              )}
            </div>
            {/* <div className="absolute top-4 z-20 left-4">
              <div className="flex flex-col gap-1">
                <span className="inline-block rounded bg-custome-yellow px-3 py-1">
                  {t("FeaturedPropertyCard.for_what", {
                    context: slide?.for_what,
                  })}
                </span>
                <span className="flex items-center justify-center gap-2 bg-white rounded px-3 py-1">
                  {slide?.images_count} <FaCamera />
                </span>
              </div>
            </div> */}
            <Link
              href={`/projects/${
                slide?.listing_number +
                "/" +
                slide?.title.replace(/[\s.]+/g, "-")
              }`}
              className="group"
            >
              <div className="overflow-hidden relative">
                <Image
                  src={slide?.image}
                  alt=""
                  className="h-[450px] max-xl:h-[450px] max-lg:h-[440px] max-md:h-[450px] rounded transform transition-transform duration-500 group-hover:scale-105"
                  width={1000}
                  height={1000}
                />
                <div className="absolute bg-transparent-blue w-full h-full top-0 rounded -z-10 transition-opacity duration-300 opacity-0 group-hover:z-10 group-hover:opacity-100">
                  <FaEye className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl" />
                </div>
              </div>
            </Link>
            <div className="relative bottom-36 bg-white rounded w-4/5 p-2 z-10 mx-auto mt-5">
              <div className="border-2 border-custome-blue rounded">
                <div className="title__location--love p-3 flex justify-between items-center bg- h-1/3 relative group/parent overflow-hidden cursor-pointer hover:text-bg rtl:rtl">
                  <div
                    className="hover__bg bg-secondary absolute w-full h-full left-0 -translate-x-full  origin-left  group-hover/parent:-translate-x-0

              rtl:left-auto rtl:right-0 rtl:translate-x-full  rtl:origin-right  rtl:group-hover/parent:translate-x-0

              z-0 transition-all duration-[350ms]  ease-in-out  group-hover/parent:origin-lef "
                  ></div>
                  <div className="title__location  w-full">
                    <LangLink
                      to={`/projects/${slide?.listing_number}/${slide?.title
                        ?.replace(/[\s.]+/g, "-")
                        ?.replace(/%/g, "-")}`}
                      className="Featured__slide--title text-2xl clg:text-xl ss:text-lg leading-7 font-medium block truncate relative z-20  max-w-[90%] "
                      title={slide?.title}
                    >
                      {slide?.title}
                    </LangLink>
                    {/* <h5 className="Featured__slide--location text-sm opacity-80 truncate">
                      {slide?.address}
                    </h5> */}
                  </div>
                </div>
                {/*  */}
                {/* {(slide?.sale_price || slide?.rent_price) && (
                  <p className="py-2 px-3 border-y border-custome-blue truncate font-bold text-xl">
                    {t("PropertyCard.price_formatted", {
                      context: slide?.for_what,
                      sale_price: slide?.sale_price || null,
                      rent_price: slide?.rent_price || null,
                      curr: slide?.currency || "",
                      duration: slide?.rent_price ? t(`PropertyCard.${slide?.rent_duration}`) : "",
                    })}
                  </p>
                )} */}
                {slide?.developer_start_price && (
                  <div className="property__details--bottom h-[40px] rtl:rtl  bg- gap-2 border-t-2  border-t-secondary px-3 clg:py-3">
                    <div className="property__size gap-1 text-xs font-medium clg:text-[10px] bmd:text-xs sm:text-[9px] h-full">
                      <div className="text-xl font-bold flex items-center gap-3 h-full">
                        {/* {slide?.developer_start_price
                          ?.split(".")?.[0]
                          ?.toLocaleString("en-US")}{" "}
                        {i18n.language === "en" ? "EGP" : "ج.م"}
                        <sub className="text-sm text-muted block">
                          {i18n.language === "en" ? "Start Price" : "يبدأ من"}
                        </sub> */}
                        {/* <div className="text-xl font-bold flex items-center gap-3 h-full"> */}
                        <sub className="text-sm text-muted block">
                          {i18n.language === "ar" && "يبدأ من"}
                        </sub>
                        <sub className="text-sm text-muted block">
                          {i18n.language === "en" && "Start Price"}
                        </sub>
                        {slide?.developer_start_price
                          ?.split(".")?.[0]
                          ?.toLocaleString("en-US")}{" "}
                        {i18n.language === "en" ? "EGP" : "ج.م"}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                )}

                {/* {broker?.developer_start_price && (
                <div className="text-xl font-bold flex items-center gap-3 h-full">
                  <sub className="text-sm text-muted block">
                    {i18n.language === "ar" && "يبدأ من"}
                  </sub>
                  {broker?.developer_start_price
                    ?.split(".")?.[0]
                    ?.toLocaleString("en-US")}{" "}
                  {i18n.language === "en" ? "EGP" : "ج.م"}
                  <sub className="text-sm text-muted block">
                    {i18n.language === "en" && "Start Price"}
                  </sub>
                </div>
              )} */}
                <p className="py-2 px-3 border-y flex items-center gap-2 font-bold border-custome-blue truncate">
                  <CiLocationOn /> {slide?.city} | {slide?.region} |{" "}
                  {slide?.sub_region}
                  {/* | {slide?.region} | {slide?.sub_region} */}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
