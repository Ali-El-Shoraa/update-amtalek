"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import { CiLocationOn } from "react-icons/ci";
import {
  faBath,
  faBed,
  faEye,
  faMaximize,
  faShareNodes,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { WhatsappShareButton } from "react-share";
import { IoLogoWhatsapp } from "react-icons/io";
import { usePostData } from "@/Hooks/useAxios";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import LangLink from "@/components/LangLink";
import { useTranslation } from "react-i18next";
import {
  userData,
  userProfileDataOut,
} from "@/Store/Features/AuthenticationSlice";
import { useSelector } from "react-redux";

const SearchPropertyCard = memo(function SearchPropertyCard(props: any) {
  const { t, i18n } = useTranslation("Pages_SearchProperty");
  const userProfileDataOutlet = useSelector(userProfileDataOut);
  const { mutate }: any = usePostData(
    true,
    () => {
      //like from all properties doesn't have onSuccuss and favorites page can only unlike the property, do it has onSuccess
      props?.onSuccess ? props?.onSuccess(props.property?.id) : "";
      // refetch();
    },
    true,
    () => {}
  );

  return (
    <div
      //!for width in sm, the card either be for slider or grid (w-full)
      className={` group/container max-w-[500px]  ${
        props?.slider
          ? "hover:h-[580px] w-[360px] sm:w-[330px] axs:w-[300px]"
          : props?.showActions
          ? "h-[530px] w-full "
          : "h-fit w-full "
      }   bg- relative ${
        props.makeBgLight ? "border-secondary20" : "border-grey"
      }  border-[1px] shadow-md`}
    >
      <div
        className={`title__location px-5 flex flex-col items-center justify-center  h-28 font-bold ${
          props.property?.normal_featured === "featured"
            ? "bg-secondary text-bg"
            : "border-grey"
        } `}
      >
        <LangLink
          to={`/properties/${
            props?.property?.listing_number
          }/${props.property?.title?.replace(/\s/g, "-")?.replace(/%/g, "-")}`}
          className="Featured__slide--title w-full text-2xl leading-7 block truncate text-center md:text-lg ss:text-sm"
          title={props.property?.title}
        >
          {props.property?.title}
        </LangLink>
        <h5 className="Featured__slide--location text-sm w-full opacity- truncate text-center">
          {props.property?.address}
        </h5>
        {props.property?.normal_featured === "featured" && (
          <div className="search__property--card--featured--page bg-blue-950 absolute w-12 h-12 right-0 rtl:right-auto rtl:left-0  top-0 flex justify-end pr-1.5 rtl:pr-0 rtl:pl-1.5 pt-1.5 ">
            <FontAwesomeIcon
              className="text-bg text-sm group-hover/container:-rotate-45 trns"
              icon={faStar}
            />
          </div>
        )}
      </div>
      <div
        className={`img-card-wrapper w-full  h-[250px] max-w-full   relative  group`}
      >
        <div className="img__wrapper w-full h-full overflow-hidden  ">
          <Image
            width={1000}
            height={1000}
            className="w-full h-full object-cover  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
            src={props.property?.primary_image}
            alt={props.property?.title}
            loading="lazy"
          />
        </div>
        <div className="property__purpose absolute  round bottom-0 right-0 rtl:right-auto rtl:left-0 rtl:rtl  px-2 py-1 text-base bg-secondary text-bg z-40">
          {props?.t("SearchPropertyCard.for_what", {
            context: props.property?.for_what,
          })}
        </div>
        <LangLink
          to={`/properties/${
            props?.property?.listing_number
          }/${props.property?.title?.replace(/\s/g, "-")?.replace(/%/g, "-")}`}
          className="slide__hover_eye absolute inset-0 w-full h-full bg-secondary/40 transition-all duration-300 ease-in-out flex justify-center items-center group-hover:opacity-100 opacity-0 z-0 cursor-pointer"
        >
          <FontAwesomeIcon className="text-4xl text-grey" icon={faEye} />
        </LangLink>
      </div>
      <div
        className={`property__details ${
          props.makeBgLight ? "bg-bg" : "bg-grey"
        }  h-fit  w-full text-secondary `}
      >
        <div className={`${props.makeBgLight ? "bg-grey" : "bg-bg"}`}>
          <LangLink
            to={`/agencies/${props.property?.broker_details?.[0]?.name?.replace(
              /\s/g,
              "-"
            )}/${props.property?.broker_details?.[0]?.id}/${
              props.property?.broker_details?.[0]?.broker_type
            }`}
            className={`broker__details p-3  flex justify-start items-center  h-fit gap-3 w-fit `}
          >
            <Image
              width={1000}
              height={1000}
              src={props.property?.broker_details?.[0]?.logo}
              alt={props.property?.broker_details?.[0]?.name}
              className="broker__img w-8 aspect-square cursor-pointer object-fill rounded-full border-[1px] border-secondary"
            />
            <p className="text-sm">
              {props.property?.broker_details?.[0]?.name}
            </p>
          </LangLink>
        </div>
        <div className="w-full flex items-center gap-2 p-2 text-sm bg-grey">
          <CiLocationOn />{" "}
          {/* <span className="text-start truncate">{props.property?.country}</span>{" "} */}
          <span className="text-start truncate">{props.property?.city}</span> |{" "}
          <span className="truncate">{props.property?.region}</span>
          {props.property?.sub_region && (
            <span className="text-start truncate">
              | {props.property?.sub_region}
            </span>
          )}
        </div>
        <div
          className={`property__details--mid p-3 flex justify-between items-start h-fit w-full gap-1 ${
            props.makeBgLight ? "bg-grey" : "bg-bg"
          }`}
        >
          <h5 className="property__size xxl:text-center text-xs font-medium axs:text-[10px]">
            <FontAwesomeIcon
              className="mr-1 rtl:mr-0 rtl:ml-1"
              icon={faMaximize}
            />
            {props?.t("SearchPropertyCard.area_formatted", {
              area: props.property?.land_area,
            })}
          </h5>
          <h5 className="bedrooms__number xxl:text-center text-xs font-medium axs:text-[10px]">
            <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBed} />{" "}
            {props?.t("SearchPropertyCard.Bedrooms", {
              count: props.property?.bed_rooms_no,
            })}
          </h5>
          <h5 className="bathrooms__number xxl:text-center text-xs font-medium axs:text-[10px]">
            <FontAwesomeIcon className="mr-1 rtl:mr-0 rtl:ml-1" icon={faBath} />{" "}
            {props?.t("SearchPropertyCard.Bathrooms", {
              count: props.property?.bath_room_no,
            })}
          </h5>
        </div>

        <p
          className="property__description p-3 text-justify w-full text-sm  break-words  min-h-[80px] flex items-center	"
          dangerouslySetInnerHTML={{
            __html: props.property?.description.substring(0, 60) + "...",
          }}
        ></p>
        <div className="property__details--bottom px-3 flex justify-between gap-2 items-center min-h-fit bg-  border-t border-t-secondary20  w-full relative ">
          <h5 className="property__price font-bold text-lg w-fit md:text-md ss:text-sm  min-h-6 py-1">
            {props?.t("SearchPropertyCard.price_formatted", {
              context: props.property?.for_what,
              sale_price: props.property?.sale_price,
              rent_price: props.property?.rent_price,
              curr: props.property?.currency,
              duration: t(`PropertyCard.${props?.property.rent_duration}`),
            })}
          </h5>

          <div className="property__heart--share flex justify-end gap- items-center ">
            {userProfileDataOutlet?.actor_type !== "broker" && (
              <div
                className="property__love cursor-pointer border-x-[1px] border-x-secondary20 py-3 mr-4 rtl:mr-0 rtl:ml-4 px-3"
                onClick={!props?.user?.token ? props?.ShowLoginPopUp : () => {}}
              >
                <div className="heart-container" title="Like">
                  {props?.user?.token && (
                    <input
                      defaultChecked={Boolean(Number(props.property?.is_fav))}
                      type="checkbox"
                      className="heart-checkbox"
                      id={props.property?.id}
                      onChange={() =>
                        mutate({
                          api: process.env.NEXT_PUBLIC_PROPERTY_ADD_TO_FAVORITE,
                          data: { property_id: props.property?.id },
                          file: undefined,
                        })
                      }
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
            <div className="group w-fit h-auto  ">
              <FontAwesomeIcon
                className="text-2xl cursor-pointer"
                icon={faShareNodes}
              />
              <div className="absolute right-0 rtl:right-auto rtl:left-0 -translate-y-0 pt-[15px] w-36   bg-transparent z-[41] opacity-0 pointer-events-none trns group-hover:opacity-100 group-hover:pointer-events-auto ">
                <div className="flex flex-col items-start border-[1px] border-dark-gray round shadow-lg">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="h-10 w-full bg-grey hover:text-bg hover:bg-secondary trns flex justify-start pl-5 rtl:pl-0 rtl:pr-5 items-center cursor-pointer gap-3"
                    href={props.property?.facebook}
                  >
                    <FontAwesomeIcon className="text-lg" icon={faFacebook} />{" "}
                    {props?.t("SearchPropertyCard.share_options.Facebook")}
                  </a>
                  <div className="w-full h-[0.05rem] bg-dark-gray"></div>

                  <a
                    rel="noreferrer"
                    className="h-10 w-full bg-grey hover:text-bg hover:bg-secondary trns flex justify-start pl-5 rtl:pl-0 rtl:pr-5  items-center cursor-pointer gap-3"
                    href={props.property?.twitter}
                  >
                    <FontAwesomeIcon className="text-lg" icon={faXTwitter} />{" "}
                    {props?.t("SearchPropertyCard.share_options.Twitter")}
                  </a>
                  <div className="w-full h-[0.05rem] bg-dark-gray"></div>
                  <WhatsappShareButton
                    url={`https://amtalek.com${
                      props.i18n.language?.startsWith("ar") ? "" : "/en"
                    }/properties/${
                      props?.property?.listing_number
                    }/${props.property?.title
                      ?.replace(/\s/g, "-")
                      ?.replace(/%/g, "-")}`}
                    className="h-10 w-full !bg-grey hover:!text-bg hover:!bg-secondary trns flex justify-start !pl-5 rtl:pl-0 rtl:!pr-5 items-center cursor-pointer gap-3"
                  >
                    <IoLogoWhatsapp size={20} />
                    <span>
                      {props.i18n.language?.startsWith("ar")
                        ? "واتساب"
                        : "Whatsapp"}
                    </span>
                  </WhatsappShareButton>
                  <div className="w-full h-[0.05rem] bg-dark-gray"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SearchPropertyCard;
