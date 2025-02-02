"use client";
import Image from "next/image";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import HeaderSection from "@/components/HeaderSection";
import ButtonSections from "@/components/ButtonSections";

export default function LastNews({ data, locale, countrie }: any) {
  // const { t } = await initTranslations(locale, ["Pages_LandingPage"]);
  const { t } = useTranslation("Pages_LandingPage");
  return (
    <section className="bg-custome-gray py-20">
      <HeaderSection
        locale={locale}
        title={data?.title}
        subTitle={data?.sub_title}
        className={"w-fit mx-auto text-center"}
        countrie={countrie}
      />

      <div className="site_container grid grid-cols-3 gap-10 md:grid-cols-1">
        {/* ********************************************************************************************** */}

        {data?.cards.map((card: any) => (
          <div
            className="relative h-[300px] overflow-hidden group"
            key={card.id}
          >
            <Link
              href={`/news/${card?.id}/${card?.title.replace(/\//g, "-")}`}
              className=""
            >
              <Image
                src={card.image}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </Link>

            {/* ********************************************************************************************** */}

            <div className="absolute w-full h-full z-10 bg-custome-blue text-white p-5 flex flex-col justify-between transition-all duration-500 top-[72%] group-hover:top-0">
              <div>
                <h3 className="truncate">{card.title}</h3>
                <span className="text-custome-gray truncate">
                  {t("NewsCard.date")} {card.created_at}
                </span>
                <h3 className="truncate mt-9">{card.summary}</h3>
              </div>

              {/* ********************************************************************************************** */}

              <div className="flex items-center justify-between">
                <Link
                  href={`/news/${card?.id}/${card?.title.replace(/\//g, "-")}`}
                  className="text-custome-yellow overflow-hidden flex w-full justify-start items-center gap-1 font-medium -translate-x-[15px] rtl:translate-x-[15px] hover:translate-x-0 rtl:hover:translate-x-0 transition-all duration-300 ease-in-out"
                >
                  <div
                    className={`flex w-full justify-start items-center  gap-1 font-medium -translate-x-[15px] rtl:translate-x-[15px] hover:translate-x-0 rtl:hover:translate-x-0 transition-all duration-300 ease-in-out`}
                  >
                    <FaAnglesRight className="font-light text-[14px] rtl:rotate-180 rtl:mt-1" />
                    <span className="min-w-fit"> {t("NewsCard.CTA_txt")}</span>
                    <FaAnglesRight className="font-light text-[14px] rtl:rotate-180 rtl:mt-1" />
                  </div>
                </Link>

                <Link
                  href={``}
                  className="text-custome-blue bg-custome-gray px-3 py-1 rounded"
                >
                  {locale === "ar"
                    ? card.news_category.title.ar
                    : card.news_category.title.en}
                </Link>
              </div>
            </div>
            {/* ********************************************************************************************** */}
          </div>
        ))}
      </div>
      <ButtonSections
        to={`/news`}
        title={t("LatestNews.main_CTA")}
        className={"mt-6"}
      />
    </section>
  );
}
