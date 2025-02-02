"use client";
import Heading from "@/components/Heading";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import SliderDeveloper from "./SliderDeveloper";
import ButtonSections from "@/components/ButtonSections";

export default memo(function LatestDeveloper({ data, locale, countrie }: any) {
  const { t } = useTranslation("Pages_Projects");

  return (
    <section className="py-20 h-[600px] relative ">
      <div className="site_container">
        {/* **************************************************************************************************** */}

        <Heading className="mx-auto">
          {t("developers.latest_developers")}
        </Heading>
        {/* <Heading className="mx-auto">Latest Developer</Heading> */}
        {/* <Heading className="mx-auto">{data?.title}</Heading> */}
        <p className="text-base opacity-80 text-center mb-9">
          {data?.sub_title}
        </p>

        {/* **************************************************************************************************** */}
        <SliderDeveloper data={data} />
        {/* **************************************************************************************************** */}
        <ButtonSections
          title={t("developers.main_CTA")}
          className={"my-5 font-bold"}
          to={`/agencies`}
        />
      </div>
    </section>
  );
});
