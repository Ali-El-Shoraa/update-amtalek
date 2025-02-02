"use client";
import { useTranslation } from "react-i18next";
import SliderAgencies from "./components/SliderAgencies";
import Heading from "@/components/Heading";
import ButtonSections from "@/components/ButtonSections";
// import { useTranslation } from "react-i18next";

export default function Agencies({ data, locale, countrie }: any) {
  const { t } = useTranslation("Pages_LandingPage");

  return (
    <section className="py-20 h-[600px] relative">
      <div className="site_container">
        {/* **************************************************************************************************** */}

        <Heading className="mx-auto">{data?.title}</Heading>
        <p className="text-base opacity-80 text-center mb-9">
          {data?.sub_title}
        </p>

        {/* **************************************************************************************************** */}
        <SliderAgencies data={data} />
        {/* **************************************************************************************************** */}
        <ButtonSections
          title={t("Brokers.main_CTA")}
          className={"my-5 font-bold"}
          to={`/agencies`}
        />
      </div>
    </section>
  );
}
