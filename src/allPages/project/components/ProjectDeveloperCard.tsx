"use client";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProjectDeveloperCard({ broker, t }: any) {
  const { i18n } = useTranslation();
  return (
    <motion.div
      layout
      className="max-w-[370px relative flex flex-col gap- w-full shadow-md rounded border text-custome-blue"
    >
      <Link
        href={`/agencies/${broker?.agent_data?.[0]?.name?.replace(
          /\s/g,
          "-"
        )}/${broker?.agent_data?.[0]?.id}/${
          broker?.agent_data?.[0]?.broker_type
        }`}
        className="absolute z-10 left-4 bg-white flex gap-3 items-center p-2 top-2 rounded"
      >
        {broker?.agent_data?.[0]?.logo && (
          <>
            <Image
              width={1000}
              height={1000}
              className="w-8 h-8 rounded-full border"
              src={broker?.agent_data?.[0]?.logo || ""}
              alt="pp"
            />
            <span>{broker?.agent_data?.[0]?.name || ""}</span>
          </>
        )}

        {broker?.agent_data?.logo && (
          <>
            <Image
              width={1000}
              height={1000}
              className="w-8 h-8 rounded-full border"
              src={broker?.agent_data?.logo || ""}
              alt="pp"
            />
            <span>{broker?.agent_data?.name || ""}</span>
          </>
        )}
      </Link>
      <div className="img__wrapper w-full h-[350px] overflow-hidden round relative  group">
        <Image
          width={1000}
          height={1000}
          className="w-full h-full object-fill  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
          src={broker?.image}
          alt={broker?.title}
        />

        <Link
          href={`/projects/${broker?.listing_number}/${broker?.title?.replace(
            /\s/g,
            "-"
          )}`}
          className="slide__hover_eye absolute inset-0 w-full h-full bg-secondary/40 transition-all duration-300 ease-in-out flex justify-center items-center group-hover:opacity-100 opacity-0 z-0 cursor-pointer"
        >
          <FontAwesomeIcon className="text-4xl text-grey" icon={faEye} />
        </Link>
      </div>
      <div className="project__details  w-full text-secondary flex flex-col  bg- pb-">
        <div className="w-full fle flex-col gap-3 p- bg-grey">
          {/* <Link
            title={project?.title}
            href={`/projects/${project?.listing_number}/${project?.title?.replace(
              /\s/g,
              "-"
            )}`}
            className="project--title flex text-lg font-medium  gap-2 items-center  w-fit"
          >
            <img
              className="w-8 h-8 rounded-full border"
              src={project?.agent_data?.[0]?.logo}
            />
            <span className="text-[14px] font-[400] flex flex-col ">
              {project?.agent_data?.[0].name}
            </span>
          </Link> */}
        </div>
        {/* <h5 className="project--location text-base mt-3 flex items-center  h-fit min-h-[40px]  text-justify px-2">
          {project?.description}
        </h5> */}

        <Link
          href={`/projects/${broker?.listing_number}/${broker?.title?.replace(
            /\s/g,
            "-"
          )}`}
          className="w-[110px] rtl:w-[115px]  overflow-hidden h-fit flex ms-2"
        ></Link>
      </div>
      <div className="property__details absolute  round   overflow-hidden w-[89%]  h-[175px] translate-x-1/2 right-1/2 bottom-0 translate-y-[41.5%] asm:translate-y-[28%] bg-bg z-40 p-2">
        <div className="border-[3px] border-secondary round">
          <div className="title__location--love p-3 flex justify-between items-center bg- h-1/3 relative group/parent overflow-hidden cursor-pointer hover:text-bg rtl:rtl">
            <div
              className="hover__bg bg-secondary absolute w-full h-full left-0 -translate-x-full  origin-left  group-hover/parent:-translate-x-0 
              
              rtl:left-auto rtl:right-0 rtl:translate-x-full  rtl:origin-right  rtl:group-hover/parent:translate-x-0 
              
              z-0 transition-all duration-[350ms]  ease-in-out  group-hover/parent:origin-lef "
            ></div>
            <Link
              href={`/projects/${
                broker?.listing_number
              }/${broker?.title?.replace(/\s/g, "-")}`}
              className="title__location   w-full "
            >
              <span
                className="Featured__slide--title text-2xl leading-7 font-medium block truncate relative z-20  "
                title={broker?.title}
              >
                {broker?.title}
              </span>
              {/* <h5 className="Featured__slide--location text-sm opacity-80 truncate">
                {project?.region} | {project?.city} | {project?.country}
              </h5> */}
            </Link>
          </div>
          <div className="property__details--bottom h-[40px] rtl:rtl  bg- gap-2 border-t-2  border-t-secondary px-3 clg:py-3">
            <div className="property__size gap-1 text-xs font-medium clg:text-[10px] bmd:text-xs sm:text-[9px] h-full">
              {/* <span>{t("start")}</span> */}
              {/* {parseInt(broker?.price_from).toLocaleString("en-US")} EGP */}

              {broker?.developer_start_price && (
                <div className="text-xl font-bold flex items-center gap-3 h-full">
                  <sub className="text-sm text-muted block">
                    {i18n.language === "ar" && "يبدأ من"}
                  </sub>
                  <sub className="text-sm text-muted block">
                    {i18n.language === "en" && "Start Price"}
                  </sub>
                  {broker?.developer_start_price
                    ?.split(".")?.[0]
                    ?.toLocaleString("en-US")}{" "}
                  {i18n.language === "en" ? "EGP" : "ج.م"}
                </div>
              )}
              {/* <FontAwesomeIcon
                className="mr-1 rtl:mr-0 rtl:ml-1"
                icon={faMaximize}
              />
              {props?.t("FeaturedPropertyCard.area_formatted", {
                area: props.slide?.land_area,
              })} */}
              {/* <p className="property__price border-t-2  border-t-secondary clg: flex items-center bg- w-[30%] min-w-[100px] sm:min-w-[20px] text-center font-bold asm:text-xs  h-full  text-sm rtl:border-l-0 rtl:border-r-2 rtl:border-r-secondary rtl:text-center amd:text-[12px] ">
                <CiLocationOn /> {broker?.region}
              </p> */}
            </div>
          </div>

          <div className="property__details--bottom rtl:rtl  bg- gap-2 border-t-2  border-t-secondary px-3 clg:py-3 h-full w-full">
            <div className="property__size gap-1 text-xs font-medium clg:text-[10px] bmd:text-xs sm:text-[9px] h-full w-full">
              <p className="property__price clg: flex items-center bg- min-w-[100px] sm:min-w-[20px] text-center font-bold asm:text-xs w-full h-full text-sm rtl:text-center amd:text-[12px] ">
                <CiLocationOn size={32} /> {broker?.city} {" | "}{" "}
                {broker?.region} {" | "} {broker?.sub_region}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
