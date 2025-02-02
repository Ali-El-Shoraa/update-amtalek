import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "../MainComponents/Link";
import { CiLocationOn } from "react-icons/ci";
import { LuBuilding } from "react-icons/lu";
import { TFunction } from "i18next";
import { TProjectDetails } from "@/Types/AppTypes";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { memo } from "react";

type Props = {
  project: TProjectDetails;
  t: TFunction<any, any>;
};
const ProjectCard = memo(function ProjectCard({ project, t }: any) {
  const { i18n } = useTranslation();

  return (
    <motion.div
      layout
      className="max-w-[370px relative flex flex-col gap- w-full shadow-md rounded border "
    >
      <Link
        href={`/agencies/${project?.agent_data[0]?.name?.replace(/\s/g, "-")}/${
          project?.agent_data[0]?.id
        }/${project?.agent_data[0]?.broker_type}`}
        className="absolute z-10 left-4 bg-white flex gap-3 items-center p-2 top-2 rounded"
      >
        <Image
          width={1000}
          height={1000}
          className="w-8 h-8 rounded-full border"
          src={project?.agent_data?.logo || project?.agent_data[0]?.logo}
          alt="pp"
        />
        <span>{project?.agent_data[0]?.name || project?.agent_data?.name}</span>
      </Link>
      <div className="img__wrapper w-full h-[350px] overflow-hidden round relative  group">
        <Image
          width={1000}
          height={1000}
          className="w-full h-full object-fill  cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
          src={project?.image}
          alt={project?.title}
          loading="lazy"
        />

        <Link
          href={`/projects/${project?.listing_number}/${project?.title?.replace(
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
              src={project?.agent_data[0]?.logo}
            />
            <span className="text-[14px] font-[400] flex flex-col ">
              {project?.agent_data[0].name}
            </span>
          </Link> */}
        </div>
        {/* <h5 className="project--location text-base mt-3 flex items-center  h-fit min-h-[40px]  text-justify px-2">
          {project?.description}
        </h5> */}

        <Link
          href={`/projects/${project?.listing_number}/${project?.title?.replace(
            /\s/g,
            "-"
          )}`}
          className="w-[110px] rtl:w-[115px]  overflow-hidden h-fit flex ms-2"
        ></Link>
      </div>
      <div className="property__details absolute  round   overflow-hidden w-[89%]  h- translate-x-1/2 right-1/2 bottom-0 translate-y-[41.5%] asm:translate-y-[28%] bg-bg z-40 p-2">
        <div className="border-[3px] border-secondary round">
          <div className="title__location--love p-3 flex justify-between items-center bg- h-1/3 relative group/parent overflow-hidden cursor-pointer hover:text-bg rtl:rtl">
            <div
              className="hover__bg bg-secondary absolute w-full h-full left-0 -translate-x-full  origin-left  group-hover/parent:-translate-x-0 
              
              rtl:left-auto rtl:right-0 rtl:translate-x-full  rtl:origin-right  rtl:group-hover/parent:translate-x-0 
              
              z-0 transition-all duration-[350ms]  ease-in-out  group-hover/parent:origin-lef "
            ></div>
            <Link
              href={`/projects/${
                project?.listing_number
              }/${project?.title?.replace(/\s/g, "-")}`}
              className="title__location   w-full "
            >
              <span
                className="Featured__slide--title text-2xl leading-7 font-medium block truncate relative z-20  "
                title={project?.title}
              >
                {project?.title}
              </span>
              {/* <h5 className="Featured__slide--location text-sm opacity-80 truncate">
                {project?.region} | {project?.city} | {project?.country}
              </h5> */}
            </Link>
          </div>
          <div className="property__details--bottom h-[40px] flex  rtl:rtl justify-between items-center  bg- gap-2 border-t-2  border-t-secondary px-3 clg:py-3">
            <h5
              className="property__size gap-1 text-center text-xs font-medium clg:text-[10px] 
            bmd:text-xs sm:text-[9px] flex items-center "
            >
              <span>{t("start")}</span>
              {parseInt(project?.developer_start_price).toLocaleString(
                "en-US"
              )}{" "}
              {i18n.language === "en" ? "EGP" : "ج.م"}
              {/* <FontAwesomeIcon
                className="mr-1 rtl:mr-0 rtl:ml-1"
                icon={faMaximize}
              />
              {props?.t("FeaturedPropertyCard.area_formatted", {
                area: props.slide?.land_area,
              })} */}
            </h5>
            <h5 className="bedrooms__number flex gap-1 text-center text-xs font-medium  clg:text-[10px] bmd:text-xs smtext-[9px] items-center ">
              <LuBuilding size={15} />{" "}
              <span>
                {project?.total_units}{" "}
                {t("units", { count: parseInt(project?.total_units) })}
              </span>
              {/* <FontAwesomeIcon
                className="mr-1 rtl:mr-0 rtl:ml-1"
                icon={faBed}
              />{" "}
              {props?.t("FeaturedPropertyCard.Bedrooms", {
                count: props.slide?.bed_rooms_no,
              })} */}
            </h5>

            <p className="property__price clg: flex items-center bg- w-[30%] min-w-[100px] sm:min-w-[20px] border-l-2 border-l-secondary text-center font-bold asm:text-xs  h-full  text-sm rtl:border-l-0 rtl:border-r-2 rtl:border-r-secondary rtl:text-center amd:text-[12px] ">
              <CiLocationOn /> {project?.region}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default ProjectCard;
