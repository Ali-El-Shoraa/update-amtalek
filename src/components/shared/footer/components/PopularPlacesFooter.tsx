"use client";

import Link from "next/link";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const PopularPlacesFooter = memo(function PopularPlacesFooter({ data }: any) {
  const { t, i18n } = useTranslation();
  return (
    <div className="footer-col2 w-full h-full flex flex-col justify-start px-3  ">
      {/* <h2 className="text-xl  mb-9 ss:mb-3">{"Footer.second_column.title"}</h2> */}
      <h2 className="text-xl  mb-9 ss:mb-3">
        {/* {t("Footer.second_column.title")} */}
        {data?.title} {i18n.language === "ar" ? "في مصر" : "in Egypt"}
      </h2>

      <div className="w-full flex items-start gap-10">
        <ul className="  h-full flex flex-col items-start  justify-start gap-4 ">
          {data?.cards?.map((city: any, index: number) => (
            <li key={index}>
              <Link
                className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
                href={`/search?city=${city?.title}`}
              >
                {city?.title} {"   " /* {"الرئيسية"} */}(
                {t("CityCard.total_count_formatted", {
                  count: city?.properties,
                })}
                )
                <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default PopularPlacesFooter;
