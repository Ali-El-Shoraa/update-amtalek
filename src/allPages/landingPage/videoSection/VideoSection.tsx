"use client";
import VideoBtn from "./components/VideoBtn";
import { useTranslation } from "react-i18next";

export default function VideoSection({ data, locale, countrie }: any) {
  const { i18n } = useTranslation();
  return (
    <section className="relative flex items-center min-h-[700px] py-28 bg-custome-white">
      <div className="site_container flex amd:flex-col">
        <div className="flex-1 bg-[#014159] text-custome-white w-1/2 min-h-[500px] amd:min-h-fit  flex flex-col amd:items-center gap-3 p-7 rtl:pl-5 amd:w-full amd:mb-6 ">
          <h3 className="round rounded font-medium bg-custome-white text-custome-blue px-3 py-2 w-fit mb-5 text-xl uppercase ">
            {data?.base_title}
          </h3>

          <h1
            className={`text-3xl mb-4 relative flex !w-fit flex-col uppercase font-semibold ss:text-lg md:text-md clg:text-lg group`}
          >
            {i18n.language === "ar"
              ? `${data?.title.replace(".", "")} في ${countrie?.title}`
              : `${data?.title.replace(".", "")} in ${countrie?.title}`}
            {/* الشريط المتحرك تحت العنوان */}
            <span className="absolute -bottom-3 rounded w-1/4 h-1 bg-custome-white md:h-[2px] transition-all duration-500 ease-out group-hover:w-1/2"></span>
          </h1>

          {/* <HeaderSection title={data?.title} locale={locale} countrie={countrie} /> */}
          {/* <span className="absolute -bottom-3 rounded w-1/4 h-1 bg-custome-white md:h-[2px] transition-all duration-500 ease-out group-hover:w-1/2"></span> */}
          <p className="mt-5 mb-1 amd:text-justify opacity-80 text-2xl">
            {data?.description}
          </p>
        </div>

        <VideoBtn data={data} />
      </div>
    </section>
  );
}
