"use client";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import LangLink from "@/components/LangLink";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";

//!--- the card with the homePage prop has a different layout structure --

// t,
const NewsCard = memo(function NewsCard({ news, homePage }: any) {
  const { t } = useTranslation("Pages_LandingPage");
  const router = useRouter();

  const handleCategoryClick = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem(
      "newsCategory",
      JSON.stringify(news?.news_category?.id)
    );
    router.push(
      `/news/categories/${news?.news_category?.main_title
        ?.replaceAll(/ /g, "-")
        ?.replaceAll(/%/g, "-")}`
    );
  };

  return (
    <div
      className={`w-full max-w-[440  ${
        homePage ? "h-full overflow-hidden  relative md:h-[300px]" : " bg-"
      } round group shadow-md`}
    >
      <LangLink
        state={{ id: news?.id }}
        // to={`/news/${news?.id}/${news?.title
        to={`/news/${news?.id}/${news?.title
          ?.replaceAll(/[,]/g, "")
          ?.replaceAll(/[.]/g, "")
          ?.replaceAll(/\s+/g, "-")
          ?.replaceAll(/%/g, "")
          ?.replaceAll(/\//g, "-")}`}
        //to={`/news/${news?.title?.replaceAll(/\s/g, "-")}`}
        className={`news--title ${
          homePage ? "text-xl h-[350px]" : "text-2xl "
        } font-medium  w-fit`}
      >
        <Image
          className={`w-full ${
            homePage ? "h-[300px]" : "h-[250px]"
          } object-cover  cursor-pointer `}
          src={news?.image}
          alt={news?.title}
          width={1000}
          height={1000}
        />
      </LangLink>
      <div
        className={`news__details ${
          homePage
            ? "bg-secondary h-full absolute truncate inset-0 translate-y-[200px] ss:translate-y-[200px] text-bg group-hover:-translate-y-0 transition-all duration-300 ease-in-out p-5 "
            : " text-secondary mt-5 px-5 truncate"
        }  w-full px-5`}
      >
        <LangLink
          state={{ id: news?.id }}
          title={news?.title}
          // to={`/news/${news?.id}/${news?.title
          to={`/news/${news?.id}/${news?.title
            ?.replaceAll(/[,]/g, "")
            ?.replaceAll(/[.]/g, "")
            ?.replaceAll(/\s+/g, "-")
            ?.replaceAll(/%/g, "")
            ?.replaceAll(/\//g, "-")}`}
          className={`news--title ${
            homePage
              ? "text-xl truncate overflow-hidden"
              : "text-xl truncate overflow-hidden"
          } font-bold  w-fit cll:text-lg md:text-md ss:text-sm `}
        >
          {news?.title}
        </LangLink>

        {homePage && (
          <div className="w-full flex mt-3 justify-start items-center gap-2 opacity-80">
            <FontAwesomeIcon className=" " icon={faCalendarDays} />

            <p className="news--author text-sm  block w-fit cursor-default">
              {t("NewsCard.date")}
              {""} {news?.created_at}
            </p>
          </div>
        )}
        <h4
          className={`news--description text-base truncate text-justify ${
            homePage ? "h-20 sm:h-28 mt-9" : "my-3 opacity-80"
          } bg-delet`}
          dangerouslySetInnerHTML={{
            __html: news?.summary,
          }}
        ></h4>
        <hr
          className={`border-[1px] border-bg my-7 clg:mb-2 ${
            homePage ? "" : "hidden"
          }`}
        />

        <div
          className={`w-full flex clg:flex-col clg:gap-1 justify-between items-center relative ${
            homePage ? "" : "mt- mb-2 mt-auto "
          }`}
        >
          <LangLink
            state={{ id: news?.id }}
            // /${news?.id}
            to={`/news/${news?.id}/${news?.title
              ?.replaceAll(/[,]/g, "")
              ?.replaceAll(/[.]/g, "")
              ?.replaceAll(/%/g, "-")
              ?.replaceAll(/\s+/g, "-")
              ?.replaceAll(/\//g, "-")}`}
            className="w-[100px] rtl:w-[105px]  overflow-hidden h-fit flex "
          >
            <div
              className={`flex w-full justify-start items-center  gap-1 font-medium -translate-x-[15px] rtl:translate-x-[15px] hover:translate-x-0 rtl:hover:translate-x-0 transition-all duration-300 ease-in-out  ${
                homePage ? "text-accent" : "text-secondary"
              }`}
            >
              <FontAwesomeIcon
                className="font-light text-[14px] rtl:rotate-180 rtl:mt-1"
                icon={faAnglesRight}
                fade
              />
              <span className="min-w-fit"> {t("NewsCard.CTA_txt")}</span>
              <FontAwesomeIcon
                className="font-light text-[14px] rtl:rotate-180 rtl:mt-1"
                icon={faAnglesRight}
                fade
              />
            </div>
          </LangLink>
          <Link
            onClick={handleCategoryClick}
            href={`/news/categories/${news?.news_category?.main_title
              ?.replaceAll(/ /g, "-")
              ?.replaceAll(/%/g, "-")}`}
            className=" bg-secondary20 text-secondary font-medium px-3 py-1 round w-fit cursor-pointer"
          >
            {news?.news_category?.main_title}
          </Link>
        </div>
      </div>
    </div>
  );
});

export default NewsCard;
