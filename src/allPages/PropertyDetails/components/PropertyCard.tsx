"use client";
import ShareOptions from "@/allPages/landingPage/latestProperties/components/ShareOptions";
import { usePostData } from "@/Hooks/usePostData";
import {
  setShowLoginPopUp,
  userData,
} from "@/Store/Features/AuthenticationSlice";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  FaBath,
  FaBed,
  FaCalendarAlt,
  FaCamera,
  FaEye,
  FaRegHeart,
} from "react-icons/fa";
import { FaBoltLightning, FaMaximize } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
// import "./style.css";
// import Lottie from "lottie-react";
// import animationData from "@/assets/heart.json";
import { useRouter } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";

export default function PropertyCard({ card, locale }: any) {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");
  const router = useRouter();
  const dispatchRedux = useDispatch();
  const user = useSelector(userData);
  const { mutate }: any = usePostData(
    true,
    () => {},
    true,
    (error: any) => {
      // console.error("An error occurred:", error);
      //like from all properties doesn't have onSuccuss and favorites page can only unlike the property, so it has onSuccess
      // props?.onSuccess ? props?.onSuccess(props.slide?.id) : "";
    }
  );
  const handleButtonClick = () => {
    const currentUrl = window.location.pathname;
    const newPart = `${currentUrl}`;
    // إنشاء URL جديد بإضافة الجزء الجديد
    const updatedUrl = `${card?.listing_number}/${card?.title
      .replace(/\s+/g, "-")
      ?.replace(/%/g, "")}`;

    // تحديث الـ URL بدون إعادة تحميل الصفحة
    window.history.pushState({}, newPart, updatedUrl);
  };
  return (
    <div
      className={`text-custome-blue rounded ${
        card?.priority === "featured"
          ? "bg-custome-yellow bg-opacity-40"
          : "bg-custome-venice"
      }`}
    >
      <div className="relative z-50">
        <div className="">
          <div className="absolute top-2 right-3 py-1 px-2 rounded flex items-center justify-center gap-1 bg-custome-white text-custome-blue truncate">
            <h3>{card?.images_count}</h3>
            <FaCamera />
          </div>

          <h3 className="absolute top-2 left-3 py-1 px-2 rounded bg-custome-yellow text-custome-blue truncate">
            {card?.for_what}
          </h3>
          {/* *********************************************************************************************************************** */}
        </div>
        {/* <Image
          src={card?.primary_image}
          alt={card?.title}
          width={1000}
          height={1000}
          className="w-full"
        /> */}
        <Link
          className="group"
          // href={``}
          href={`/properties/${card?.listing_number}/${card?.title
            .replace(/\s+/g, "-")
            ?.replace(/%/g, "-")}}`}
        >
          {/* *********************************************************************************************************************** */}

          {/* start image */}
          <div className="overflow-hidden relative">
            <Image
              src={card?.primary_image}
              alt=""
              // className="h-[450px] max-xl:h-[450px] max-lg:h-[440px] max-md:h-[450px] rounded transform transition-transform duration-500 group-hover:scale-105"
              className="w-full h-60 transform transition-transform duration-500 group-hover:scale-105 "
              width={1000}
              height={1000}
            />

            {/* start hover and show eye */}
            <div className="absolute bg-transparent-blue w-full h-full top-0 rounded -z-10 transition-opacity duration-300 opacity-0 group-hover:z-10 group-hover:opacity-100">
              <FaEye className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl" />
            </div>
            {/* end hover and show eye */}
          </div>
          {/* end image */}
        </Link>
        {/* *********************************************************************************************************************** */}
        <div className="absolute bg-custome-blue text-custome-white bottom-0 right-0 rounded px-2 py-1">
          {/* .price_formatted */}
          {t("PropertyCard.price_formatted", {
            context: card?.for_what,
            sale_price: card?.sale_price,
            rent_price: card?.rent_price,
            curr: card?.currency,
            duration: t(`PropertyCard.${card?.rent_duration}`),
          })}
        </div>
      </div>

      {/* ********************************************************************************************* */}
      <div className="">
        <div className="p-3">
          <h3 className="truncate text-lg">{card?.property_type}</h3>
          <p className="truncate text-2xl">{card?.title}</p>
          <p className="truncate text-sm">{card?.address}</p>
          <div className="flex justify-start items-center gap-1">
            <IoLocationOutline />
            <span className="truncate">
              {card?.city} | {card?.region} | {card?.sub_region}
            </span>
          </div>
        </div>

        <div className="">
          <Link
            // href={``}
            href={`/agencies/${card?.broker_details?.[0]?.name?.replace(
              /\s/g,
              "-"
            )}/${card?.broker_details?.[0]?.id}/${
              card?.broker_details?.[0]?.broker_type
            }`}
            className="broker__details px-3 pb-3 pt-1 flex justify-start items-center  h-fit gap-3 w-fit"
          >
            <Image
              src={card?.broker_details?.[0]?.logo}
              alt={card?.broker_details?.[0]?.name}
              width={1000}
              height={1000}
              className="w-8 aspect-square cursor-pointer object-cover rounded-full border-[1px] border-secondary"
            />
            <p className="text-sm">{card?.broker_details?.[0]?.name}</p>
          </Link>
        </div>
        {/* *********************************************************************************************************************** */}
        {/* <div className="flex items-center justify-between py-2 px-3">
          <h3 className="truncate">{card?.land_area}</h3>
          <h3 className="flex items-center justify-center gap-2 truncate">
            <FaBed /> {card?.bed_rooms_no}
          </h3> */}
        {/* *********************************************************************************************************************** */}
        {/* <h3 className="flex items-center justify-center gap-2">
            <FaBath /> {card?.bath_room_no}
          </h3>
        </div> */}
        <div className=" p-3 flex justify-between items-start h-fit w-full gap-1">
          <h5 className="flex items-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
            <FaMaximize />
            {t("PropertyCard.area_formatted", {
              area: card?.land_area,
            })}
          </h5>
          <h5 className="flex items-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
            <FaBed />{" "}
            {t("PropertyCard.Bedrooms", {
              count: card?.bed_rooms_no,
            })}
          </h5>
          <h5 className="flex items-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
            <FaBath />{" "}
            {t("PropertyCard.Bathrooms", {
              count: card?.bath_room_no,
            })}
          </h5>
        </div>
        {/* ********************************************************************************************* */}
        <hr />
        {/* ********************************************************************************************* */}
        <div className="py-4 px-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCalendarAlt />
            {card?.created_at}
          </div>
          {/* ********************************************************************************************* */}
          <div className="flex items-center gap-3">
            {/* // <Lottie
            // animationData={animationData} */}
            {/* <FaRegHeart
              color="red"
              className="cursor-pointer"
              size={24}
              onClick={
                !user?.token
                  ? () => dispatchRedux(setShowLoginPopUp(true))
                  : () =>
                      mutate({
                        api: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE}`,
                        data: { property_id: card?.id },
                        file: undefined,
                      })
              }
            /> */}
            {/* <div className="property__love cursor-pointer border-x-[1px] border-x-secondary20 py-3 mr-4 rtl:mr-0 rtl:ml-4 px-3">
              <div className="heart-container" title="Like">
                {user?.token && (
                  <input
                    defaultChecked={Number(card?.is_fav) === 1 ? true : false}
                    type="checkbox"
                    className="heart-checkbox"
                    id={card?.id}
                    onChange={() => {
                      mutate({
                        api: `${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE}`,
                        data: { property_id: card?.id },
                        file: undefined,
                      });
                    }}
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
            </div> */}

            <FavoriteButton
              slide={card}
              id={card?.id}
              is_fav={card?.is_fav}
              className={`cursor-pointer border-x-[1px] border-x-secondary20 py-3 mr-4 rtl:mr-0 rtl:ml-4 px-3`}
            />
            {/* <div className="flex justify-end gap- items-center mt-"> */}
            {/* <FaShareAlt size={24} /> */}

            <div className="group w-fit h-auto relative">
              {/* <FaShareNodes /> */}
              <ShareOptions card={card} locale={locale} />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
