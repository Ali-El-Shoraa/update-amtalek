"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

import {
  faBath,
  faBed,
  faCalendarDays,
  faEye,
  faMaximize,
  faShareNodes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { usePostData } from "@/Hooks/useAxios";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { WhatsappShareButton, TwitterShareButton } from "react-share";
import { IoLogoWhatsapp } from "react-icons/io";

// import { useOutletContext } from "react-router-dom";
import Image from "next/image";
import LangLink from "@/components/LangLink";
import React from "react";
import {
  setDeletedItem,
  setToggleDeletePopUp,
} from "@/Store/Features/MiscellaneousSlice";
import {
  userData,
  userProfileDataOut,
} from "@/Store/Features/AuthenticationSlice";
import { useTranslation } from "react-i18next";
// import FavoriteButton from "@/components/FavoriteButton";

const PropertyCard = memo(function PropertyCard(props: any) {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");
  const userProfileDataOutlet = useSelector(userProfileDataOut);

  const { mutate }: any = usePostData(
    true,
    () => {
      //like or unlike the property from all pages doesn't have onSuccuss but favorites page can only unlike the property, so it has onSuccess
      props?.onSuccess ? props?.onSuccess(props?.property?.id) : "";
      // refetch();
    },
    true, // authorizedAPI: (يجب أن تحدد ما إذا كانت هذه القيمة true أو false بناءً على حاجتك)
    (error: any) => {
      // onError: معالجة الخطأ هنا
      console.error("An error occurred:", error);
    }
  );
  const dispatchRedux = useDispatch();
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      //!the 3rd part of the ternary operator is for if the card used in grid, whereas the width is controlled by the cell in the grid, and the card takes 100% of the cell width whatever the cell width
      className={` max-w-[440px  ${
        props?.slider
          ? "hover:h-[610px] w-full  asmm:w-full ltr:ltr rtl:rtl"
          : props?.showActions
          ? "h-[530px]  w-full shadow-md"
          : props?.brokerDetails
          ? "w-full grid grid-cols-2 ss:grid-cols-1 shadow-lg border  "
          : "h-fit w-full  shadow-md"
      }   bg- relative z-0 hover:z-10`}
    >
      <div
        className={`img-card-wrapper relative  ${
          props?.brokerDetails
            ? "h-[330px] my-auto"
            : props.makeBgLight
            ? "border-t-bg border-x-bg"
            : "border-t-grey border-x-grey"
        }  border-2  w-full  h-[250px] max-w-full   rounded relative  group`}
      >
        <div className="img__wrapper w-full h-full overflow-hidden round relative">
          {props?.brokerDetails && (
            <div className="w-5/6 flex items-center justify-between absolute py-3 left-1/2 -translate-x-1/2 rounded bottom-2 bg-white px-2">
              <LangLink
                to={`/agencies/${
                  props.property?.broker_details?.[0]?.name
                    ?.replace(/\s+/g, "-") // استبدال المسافات بشرطة (-)
                    ?.replace(/%/g, "") // إزالة حرف %
                    ?.replace(/\//g, "") // إزالة حرف /
                }/${props.property?.broker_details?.[0]?.id}/${
                  props.property?.broker_details?.[0]?.broker_type
                }`}
                className="broker__details px-3  flex justify-start items-center  h-fit gap-3 w-fit "
              >
                <Image
                  width={1000}
                  height={1000}
                  src={props.property?.broker_details?.[0]?.logo}
                  alt={props.property?.broker_details?.[0]?.name}
                  className="broker__img w-8 aspect-square cursor-pointer object-cover rounded-full border-[1px] border-secondary"
                />
                <p className="text-sm">
                  {props.property?.broker_details?.[0]?.name}
                </p>
              </LangLink>
              {props?.property?.for_what && (
                <span className="bg-[#ffe270] text-secondary p-1 rounded text-sm">
                  {t("PropertyCard.for_what", {
                    context: props.property?.for_what,
                  })}
                </span>
              )}
            </div>
          )}
          <Image
            width={1000}
            height={1000}
            className="w-full h-full object-cove  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
            src={
              props.property?.primary_image || props?.property?.primary_image
            }
            alt={
              props?.brokerDetails
                ? props?.property?.property_title
                : props?.property?.title
            }
            loading="lazy"
          />
        </div>
        {props?.property?.priority === "featured" ||
        props?.property?.normal_featured !== "featured" ? (
          <div className="property__type absolute text-sm round top-3 left-3 rtl:right-3 rtl:rtl px-2 py-1 bg-white text-secondary z-40 flex gap-2 items-center rtl:flex-row-reverse w-fit">
            <span>
              <FaCamera size={15} />
            </span>
            {props?.property?.images_count}
          </div>
        ) : (
          ""
        )}
        <div className="property__type absolute text-sm round top-3 right-3 rtl:right-auto rtl:left-3 rtl:rtl  gap-2 z-40 flex flex-col">
          {!props?.brokerDetails && props?.property?.for_what && (
            <span className="bg-accent text-secondary px-2 py-1 rounded">
              {t("PropertyCard.for_what", {
                context: props.property?.for_what,
              })}
            </span>
          )}
          {props?.property?.normal_featured === "featured" && (
            <span className="bg-white w-fit mx-auto px-2 py-1 rounded flex items-center justify-center gap-2">
              <span>
                <FaCamera size={15} />
              </span>
              {props?.property?.images_count}
            </span>
          )}
        </div>
        {props?.property?.priority === "featured" ||
        props.property?.normal_featured === "featured" ? (
          <div
            className={`property__featured tes absolute text-sm round top-3 left-3 rtl:left-auto rtl:right-3 rtl:rtl px-2 py-1 bg-secondary text-bg z-40 ${
              props?.brokerDetails && "!bg-[#ffe270] text-secondary"
            }`}
          >
            {i18n.language === "ar" ? "مميز" : "Featured"}
          </div>
        ) : (
          ""
        )}
        {!props?.brokerDetails && (
          <div className="property__price absolute rounded bottom-0 right-0 px-2 py-1 text-md bg-secondary text-bg z-40">
            {t("PropertyCard.price_formatted", {
              context: props.property?.for_what,
              sale_price: props.property?.sale_price,
              rent_price: props.property?.rent_price,
              curr: props.property?.currency,
              duration: t(`PropertyCard.${props.property?.rent_duration}`),
            })}
          </div>
        )}
        {props?.acceptedCheck && (
          <div
            className={`property__price absolute rounded bottom-0 left-0 px-2 py-1 text-md bg-green-500 ${
              // === 0
              Boolean(props?.property?.acceptance)
                ? "bg-green-500"
                : "bg-secondary"
            } text-bg z-40`}
          >
            {t("PropertyCard.accepted", {
              count: props?.property?.acceptance,
            })}
          </div>
        )}
        <LangLink
          to={`/properties/${props?.property?.listing_number}/${
            props.property?.property_title
              ?.replace(/\s/g, "-")
              ?.replace(/%/g, "-") ||
            props.property?.title?.replace(/\s/g, "-")?.replace(/%/g, "-")
            // props?.brokerDetails ? props.property?.property_title : props.property?.title
          }`}
          className="slide__hover_eye absolute inset-0 w-full h-full bg-secondary/40 transition-all duration-300 ease-in-out flex justify-center items-center group-hover:opacity-100 opacity-0 z-0 cursor-pointer"
        >
          <FontAwesomeIcon className="text-4xl text-grey" icon={faEye} />
        </LangLink>
      </div>
      <div
        className={`property__details z-1 ${
          props.makeBgLight ? "bg-bg" : "bg-grey"
        }  h-fit ${
          props?.brokerDetails && " h-full p-2 "
        } w-full text-secondary ${
          (props?.brokerDetails && props?.property?.priority === "featured") ||
          props?.property?.normal_featured === "featured"
            ? "!bg-[#ffe270]"
            : ""
        }  `}
      >
        <div className="title__location--contact p-3   h-fit flex flex-col gap-1">
          <div className="w-fit relative text-lg pl-">
            {props?.brokerDetails
              ? props?.property?.property_type_naming
              : props?.property?.property_type}

            <span className="absolute w-[2px] h-full ltr:-left-2 rtl:-right-2 bg-secondary"></span>
          </div>
          <LangLink
            to={`/properties/${props?.property?.listing_number}/${
              // props?.brokerDetails
              // ?
              props.property?.property_title
                ?.replace(/\s/g, "-")
                ?.replace(/%/g, "")
                ?.replace(/%/g, "-")
                ?.replace(/%/g, "") ||
              props.property?.title?.replace(/\s/g, "-")?.replace(/%/g, "-") ||
              ""
            }}`}
            className="Featured__slide--title text-2xl leading-7 font-medium block truncate clg:text-[16px] ss:text-lg"
            //
            // title={props?.brokerDetails ? props.property?.property_title : props.property?.title}
            title={props.property?.property_title || props.property?.title}
          >
            {props?.brokerDetails
              ? props.property?.property_title || props.property?.title || ""
              : props.property?.title}
          </LangLink>
          <h5 className="Featured__slide--location text-sm opacity- truncate mt-1">
            {props?.brokerDetails
              ? props.property?.property_address || props.property?.address
              : props.property?.address}
          </h5>
          <div className="w-full flex items-center gap-2 text-[13px] clg:text-sm">
            <CiLocationOn size={20} />
            {/* <span className="truncate">{props.property?.country}</span> |{" "} */}
            <span className="truncate text-[13px]">
              {props?.brokerDetails
                ? props.property?.property_city || props.property?.city
                : props.property?.city}
            </span>{" "}
            |
            <span className="truncate text-[13px]">
              {props?.brokerDetails
                ? props.property?.property_region || props.property?.region
                : props.property?.region}
            </span>
            {props?.property?.sub_region && (
              <>
                |{" "}
                <span className="truncate text-[13px]">
                  {props?.brokerDetails
                    ? props.property?.property_sub_region ||
                      props.property?.sub_region
                    : props.property?.sub_region}
                </span>
              </>
            )}
          </div>
          {props?.brokerDetails && (
            <div className="property__price ss:w-fit  my-2 rounded bottom-0 right-0 px-2 py-1 text-base bg-secondary text-center text-bg z-40">
              {t("PropertyCard.price_formatted", {
                context: props.property?.for_what,
                sale_price: props.property?.sale_price,
                rent_price: props.property?.rent_price,
                curr: props?.brokerDetails
                  ? props.property?.property_currency
                  : props.property?.currency,
                duration: t(`PropertyCard.${props?.property?.rent_duration}`),
                // duration: props?.property?.rent_price
                //   ? t(`PropertyCard.${props?.property?.rent_duration}`)
                //   : "",
                // duration: props.property?.rent_duration,
              })}
            </div>
          )}

          {props?.brokerDetails && (
            <div
              className="text-sm border-y border-dashed border-secondary py-1"
              dangerouslySetInnerHTML={{
                __html:
                  props?.brokerDetails &&
                  props?.property?.broker_details?.[0]?.broker_type === "broker"
                    ? props?.property?.property_description?.slice(0, 60)
                    : props?.property?.description?.[i18n.language]?.slice(
                        0,
                        60
                      ),
              }}
            ></div>
          )}
        </div>

        {!props?.brokerDetails && (
          <LangLink
            to={`/agencies/${
              props?.property?.broker_details?.[0]?.name
                ?.replace(/\s/g, "-")
                ?.replace(/\s+/g, "-") // استبدال المسافات بشرطة (-)
                ?.replace(/%/g, "") // إزالة حرف %
                ?.replace(/\//g, "") // إزالة حرف /
            }}/${props?.property?.broker_details?.[0]?.id}/${
              props?.property?.broker_details?.[0]?.broker_type
            }`}
            className="broker__details px-3 pb-3 pt-1 flex justify-start items-center  h-fit gap-3 w-fit"
          >
            <Image
              width={1000}
              height={1000}
              src={props?.property?.broker_details?.[0]?.logo}
              alt={props?.property?.broker_details?.[0]?.name}
              className="broker__img w-8 aspect-square cursor-pointer object-cover rounded-full border-[1px] border-secondary"
            />
            <p className="text-sm">
              {props?.property?.broker_details?.[0]?.name}
            </p>
          </LangLink>
        )}
        <div className="property__details--mid p-3 flex justify-between items-start h-fit w-full gap-1">
          <h5 className="property__size xxl:text-center text-xs font-medium axs:text-[10px]">
            <FontAwesomeIcon
              className="mr-1 rtl:mr-0 rtl:ml-1"
              icon={faMaximize}
            />
            {t("PropertyCard.area_formatted", {
              area: props?.property?.land_area,
            })}
          </h5>
          <h5 className="bedrooms__number xxl:text-center text-xs font-medium axs:text-[10px]">
            <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBed} />{" "}
            {t("PropertyCard.Bedrooms", {
              count: props?.property?.bed_rooms_no,
            })}
          </h5>
          <h5 className="bathrooms__number xxl:text-center text-xs font-medium axs:text-[10px]">
            <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBath} />{" "}
            {t("PropertyCard.Bathrooms", {
              count: props?.property?.bath_room_no,
            })}
          </h5>
        </div>
        {props?.offer ? (
          <div className="w-full flex px-5 justify-between items-center py-4 border-t-[2px] font-black border-secondary20">
            <div className="flex items-center gap-2">
              <span className="font-medium">{t("offer")}:</span>
              <span className="text-sm">{props?.offer?.offer}</span>
            </div>
            <div className="flex items-center gap-2 font-black">
              <span className="font-mediu">{t("status")} : </span>
              <span className="font-black text-[13px]">
                {props?.offer?.convert_to_lead}
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`property__details--bottom  ${
              props?.brokerDetails ? " p-1   " : "p-3 ss:py-0"
            } flex justify-between gap-2 items-center h-fit bg-  border-t-[1px] border-t-secondary20  w-full relative`}
          >
            <h5 className="property__date font-medium text-base w-fit   h-6 flex items-center  gap-2 clg:text-sm">
              <FontAwesomeIcon className="text-2xl" icon={faCalendarDays} />
              {props.property?.created_at}
            </h5>
            <div className="property__heart--share flex justify-end gap- items-center mt-">
              {userProfileDataOutlet?.actor_type !== "broker" && (
                <div
                  className="property__love cursor-pointer border-x-[1px] border-x-secondary20 py-3 mr-4 rtl:mr-0 rtl:ml-4 px-3"
                  onClick={
                    !props?.user?.token ? props?.ShowLoginPopUp : () => {}
                  }
                >
                  <div className="heart-container" title="Like">
                    {props?.user?.token && (
                      <input
                        defaultChecked={Number(props.property?.is_fav) === 1}
                        type="checkbox"
                        className="heart-checkbox"
                        id={props.property?.id}
                        onChange={() => {
                          mutate({
                            api: process.env
                              .NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE,
                            data: { property_id: props.property?.id },
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
                </div>
              )}

              {/* <FavoriteButton
                data={data}
                slide={card}
                id={card?.id}
                is_fav={card?.is_fav}
                className={`cursor-pointer borderx-[1px] borderx-secondary20 py-6 mr-4 rtl:mr-0 rtl:ml-4 px3`}
                /> */}

              <div className="group w-fit h-auto z-50">
                <FontAwesomeIcon
                  className="text-2xl cursor-pointer"
                  icon={faShareNodes}
                />
                {/* dropdown */}

                <div className="absolute right-0 rtl:right-auto rtl:left-0 -translate-y-0 pt-[15px] w-36   bg-transparent z-50 opacity-0 pointer-events-none trns group-hover:opacity-100 group-hover:pointer-events-auto ">
                  <div className="flex flex-col items-start border-[1px] border-dark-gray overflow-hidden round shadow-lg">
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="h-10 w-full bg-grey hover:text-bg hover:bg-secondary trns flex justify-start pl-5 rtl:pl-0 rtl:pr-5 items-center cursor-pointer gap-3"
                      href={props?.property?.facebook}
                    >
                      <FontAwesomeIcon className="text-lg" icon={faFacebook} />
                      {t("PropertyCard.share_options.Facebook")}
                    </a>
                    <div className="w-full h-[0.09rem] bg-dark-gray"></div>
                    <WhatsappShareButton
                      url={`https://amtalek.com${
                        i18n.language?.startsWith("ar") ? "" : "/en"
                      }/properties/${props?.property?.listing_number}/${
                        props?.brokerDetails
                          ? props.property?.property_title
                              ?.replace(/\s/g, "-")
                              ?.replace(/%/g, "-")
                          : props.property?.title
                              ?.replace(/\s/g, "-")
                              ?.replace(/%/g, "-")
                      }`}
                      className="h-10 w-full !bg-grey hover:!text-bg hover:!bg-secondary trns flex justify-start !pl-5 rtl:pl-0 rtl:!pr-5 items-center cursor-pointer gap-3"
                    >
                      <IoLogoWhatsapp size={20} />
                      <span>
                        {i18n.language?.startsWith("ar")
                          ? "واتساب"
                          : "Whatsapp"}
                      </span>
                    </WhatsappShareButton>
                    <div className="w-full h-[0.09rem] bg-dark-gray"></div>

                    <TwitterShareButton
                      url={props.property?.twitter}
                      className="h-10 w-full !bg-grey hover:!text-bg hover:!bg-secondary trns flex justify-start !pl-5 rtl:pl-0 rtl:!pr-5 items-center cursor-pointer gap-3"
                    >
                      <FontAwesomeIcon className="text-lg" icon={faXTwitter} />
                      {t("PropertyCard.share_options.Twitter")}
                    </TwitterShareButton>

                    <div className="w-full h-[0.09rem] bg-dark-gray"></div>
                  </div>
                </div>
                {/* dropdown */}
              </div>
            </div>
          </div>
        )}
      </div>
      {props?.showActions && (
        <div className="property__actions  w-full py-2 bg- border-t-2 border-t-secondary right-0 bottom-0 flex justify-center px-3 items-center bg-grey">
          <button
            type="button"
            onClick={() => {
              dispatchRedux(setDeletedItem(props.property?.id));
              dispatchRedux(setToggleDeletePopUp(true));
            }}
            className={`  group  rounded-md w-24 h-10 trns bg-delete text-bg  hover:bg-transparent border-delete border-2 hover:text-delete active:scale-90 flex items-center justify-center gap-2 `}
          >
            {t("PropertyCard.Actions.Delete")}
            <FontAwesomeIcon
              className=" text-lg  group-active:scale-"
              icon={faTrash}
            />
          </button>
        </div>
      )}
    </motion.div>
  );
});

export default PropertyCard;
