"use client";
import Heading from "@/components/Heading";
import LangLink from "@/components/LangLink";
import SubHeading from "@/components/SubHeading";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import CityCard from "./CityCard";

const PopularPlaces = memo(function PopularPlaces({ data, countrie }: any) {
  const { t, i18n } = useTranslation("Pages_LandingPage");

  if (data?.cards?.length < 1) {
    return;
  }
  // const { i18n } = useTranslation();
  // const theCountry = useSelector(OwnCountry);
  const theCountry = countrie;
  return (
    <section className="h-auto  bg-grey text-secondary ">
      <section className="relative z-10  py-20 flex flex-col items-center site_container min-h-[550px]">
        <Heading style={"text-center"}>
          {data?.title} {i18n.language === "ar" ? "في" : "in"}{" "}
          {theCountry?.title}{" "}
        </Heading>
        <SubHeading style={"text-center"}>{data?.sub_title}</SubHeading>

        <div className="Popular__Places__wrapper w-full grid grid-cols-4 clg:grid-cols-1 gap-7  my-10">
          <div className="Popular__Places__main col-span-2 bg-red- flex flex-col gap-[1rem]">
            {data?.cards
              ?.filter((city: any) => city.type === "main_slider")
              ?.map((city: any) => (
                <CityCard key={city?.id} city={city} t={t} />
              ))}
          </div>

          <div className="Popular__Places--cards bg-red-30 col-span-2 ss:grid-cols-1 grid grid-cols-2 gap-5  min-h-[500px]  bg-100 ">
            {data?.cards
              ?.filter((city: any) => city.type !== "main_slider")
              ?.map((city: any) => (
                <CityCard key={city?.id} city={city} t={t} />
              ))}
          </div>
        </div>
        <LangLink
          to="/cities"
          className="login__bt border-2 round w-[200px] h-[50px] flex justify-center items-center font-bold border-secondary text-sm  bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary active:scale-90 "
        >
          {t("PopularPlaces.main_CTA")}
        </LangLink>
      </section>
    </section>
  );
});

export default PopularPlaces;
