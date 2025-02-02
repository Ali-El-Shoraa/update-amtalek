"use client";
import Image from "next/image";
import { FaBoltLightning, FaMaximize } from "react-icons/fa6";
import { FaBath, FaBed, FaCamera, FaEye } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import ShareOptions from "../../latestProperties/components/ShareOptions";
import { memo } from "react";

export default memo(function MostViewCard({ card, locale }: any) {
  // Pages_PropertyDetails
  const { t } = useTranslation("Pages_LandingPage");
  // const { t } = useTranslation("Pages_LandingPage");

  return (
    <div className="">
      <div className="relative  overflow- shadow-md bg-bg h-fit col-span-1 bg-  hover-translate-y-2  transition-all duration-500 ease-in-out">
        {/* **************************************************************************** */}
        <div
          className="relative border-t-bg border-x-bg border-2 w-full h-[250px] max-w-full rounded "
          // onClick={() => localStorage.setItem("propertyId", card.listing_number)}
        >
          <div className="">
            <h3 className="absolute top-0 right-3 text-custome-white bg-custome-blue py-3 px-2 z-20">
              <FaBoltLightning size={22} />
            </h3>

            <div className="absolute top-2 left-3 py-1 px-2 rounded flex items-center justify-center gap-1 bg-custome-white text-custome-blue z-20">
              <h3>{card.images_count}</h3>
              <FaCamera />
            </div>
          </div>
          <Link
            href={`properties/${card?.listing_number}/${
              card?.title
                ?.replace(/\s+/g, "-") // استبدال المسافات بشرطة (-)
                ?.replace(/%/g, "") // إزالة حرف %
                ?.replace(/\//g, "") // إزالة حرف /
            }`}
            className="group"
          >
            <div className="overflow-hidden relative h-full">
              <Image
                src={card.primary_image}
                alt={card.primary_image}
                width={1000}
                height={1000}
                className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
              />

              <div className="absolute bg-transparent-blue w-full h-full top-0 rounded -z-10 transition-opacity duration-300 opacity-0 group-hover:z-10 group-hover:opacity-100">
                <FaEye className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl" />
              </div>
              {/* end hover and show eye */}
            </div>
          </Link>

          <div className="broker__details--purpose p-3  flex justify-between items-center bg-bg text-secondary round h-fit gap-3  absolute bottom-5 right-1/2 translate-x-1/2 w-[87%] z-20">
            <Link
              href={`/agencies/${card?.broker_details?.[0]?.name?.replace(
                /\s/g,
                "-"
              )}/${card?.broker_details?.[0]?.id}/${
                card?.broker_details?.[0]?.broker_type
              }`}
              title={card?.broker_details?.[0]?.name}
              className="broker__details  flex justify-start items-center  gap-3 max-w-[50%]"
            >
              <Image
                width={300}
                height={300}
                src={card?.broker_details?.[0]?.logo}
                alt={card?.broker_details?.[0]?.name}
                className="broker__img w-8 aspect-square cursor-pointer object-fill rounded-full border-[1px] border-secondary"
              />
              <p className="text-sm truncate max-w-full">
                {card?.broker_details?.[0]?.name}
              </p>
            </Link>
            <p
              // className={` bg-secondary text-bg  px-3 h-8 flex-center  round font-medium ${
              //   props?.main ? "text-base" : "text-xs"
              // }`}
              className={` bg-secondary text-bg  px-3 h-8 flex-center  round font-medium`}
            >
              {t("MostViewCard.for_what", {
                context: card?.for_what,
              })}{" "}
            </p>
          </div>
        </div>
        {/* **************************************************************************** */}
        <div className="py-2 px-3 bg-custome-white  h-fit  w-full text-custome-blue">
          <div>
            <h4 className="truncate pl-2 rtl:pl-0 rtl:pr-2 mt-5 mb-1 font-bold text-xl border-l-2 ml-3 rtl:ml-0 rtl:mr-3 border-l-custome-blue rtl:border-l-0 rtl:border-r-2 rtl:border-r-custome-blue  h-fit leading-">
              {card.property_type}
            </h4>
            {/* <h3 className="truncate">{card.broker_details[0].name}</h3> */}
            {/* **************************************************************************** */}
            <div className="p-3 h-fit">
              <Link
                href={`properties/${card.listing_number}/${card.title.replace(
                  /\s+/g,
                  "-"
                )}`}
                className="truncate text-2xl leading-7 font-medium block cll:text-xl md:text-lg h-8"
              >
                {card.title}
              </Link>
              <h3 className="truncate text-sm opacity-80 mt-1">
                {card.address}
              </h3>
            </div>
            {/* **************************************************************************** */}
            <div className="truncate w-full border-custome-black border-y-1 flex items-center gap-2 p-2 text-sm">
              <IoLocationOutline />{" "}
              {/* <span className="text-start truncate">{card?.country}</span> |{" "} */}
              <span className="text-start truncate">{card?.city}</span> |{" "}
              <span className="truncate">{card?.region}</span>
              {card?.sub_region && (
                <>
                  {" "}
                  | <span className="truncate">{card?.sub_region}</span>
                </>
              )}
            </div>
          </div>
          {/* **************************************************************************** */}
          <div className="">
            <div className="property__details--mid pl-3 pr-6 rtl:pl-6 rtl:pr-3 flex justify-between gap-2 items-center h-fit bg-  bordery-[1px] bordery-secondary20  w-full   ">
              <h5 className="property__price  text-base w-fit    ">
                <span className="opacity-70">
                  {t("MostViewCard.Start_From")}
                </span>{" "}
                <br />
                <span className="text-secondary font-semibold text-lg cll:text-[14px] ss:text-md">
                  {t("MostViewCard.price_formatted", {
                    context: card?.for_what,
                    sale_price: card?.sale_price,
                    rent_price: card?.rent_price,
                    curr: card?.currency,
                    duration: t(`PropertyCard.${card?.rent_duration}`),
                  })}
                </span>
              </h5>
              <div className="property__share--love flex justify-end gap- items-center ">
                <FavoriteButton
                  id={card?.id}
                  is_fav={card?.is_fav}
                  className={`cursor-pointer borderx-[1px] borderx-secondary20 py-6 mr-4 rtl:mr-0 rtl:ml-4 px3`}
                />
                <div className="group/parent w-fit h-auto  ">
                  <ShareOptions card={card} locale={locale} />
                </div>
              </div>
            </div>
            {/* **************************************************************************** */}
            <div className="separator border-t-secondary20 border-t-[1px] border-dashed  h-[1px] mx-4"></div>
            {/* **************************************************************************** */}

            <div className="px-3 py-5 flex justify-between items-start h-fit w-full gap-1">
              <h5 className="flex items-center justify-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
                <FaMaximize />
                {/* <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faMaximize} /> */}
                {t("MostViewCard.area_formatted", {
                  area: card?.land_area,
                })}
              </h5>
              {/* <hr /> */}
              {/* <div className="w-full h-[0.09rem] bg-dark-gray"></div> */}

              <h5 className="flex items-center justify-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
                <FaBed />
                {/* <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBed} />{" "} */}
                {t("MostViewCard.Bedrooms", {
                  count: card?.bed_rooms_no,
                })}
              </h5>
              {/* <hr /> */}
              {/* <div className="w-full h-[0.09rem] bg-dark-gray"></div> */}

              <h5 className="flex items-center justify-center gap-2 xxl:text-center text-xs font-medium axs:text-[10px]">
                <FaBath />
                {t("MostViewCard.Bathrooms", {
                  count: card?.bath_room_no,
                })}
              </h5>
            </div>
          </div>
          {/* **************************************************************************** */}
        </div>
      </div>
    </div>
  );
});
