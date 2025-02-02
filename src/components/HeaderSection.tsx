"use client";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export default memo(function HeaderSection({
  className,
  title,
  subTitle,
  style,
  locale,
  countrie,
}: any) {
  const { i18n } = useTranslation();

  return (
    <div className={`text-custome-blue mb-4 ${className}`}>
      <h1
        className={`text-3xl textHead mb-4 relative flex !w-fit flex-col uppercase font-semibold ss:text-lg md:text-md clg:text-lg group ${style}`}
      >
        {i18n.language === "ar"
          ? `${title?.replace(".", "")} في ${countrie?.title}`
          : `${title?.replace(".", "")} in ${countrie?.title}`}
        {/* الشريط المتحرك تحت العنوان */}
        <span className="absolute -bottom-3 rounded w-1/4 h-1 bg-[#005879] md:h-[2px] transition-all duration-500 ease-out group-hover:w-1/2"></span>
      </h1>
      {/*  asm:text-center */}
      <h2 className="text-base mt-1 opacity-80">{subTitle}</h2>
    </div>
  );
});
