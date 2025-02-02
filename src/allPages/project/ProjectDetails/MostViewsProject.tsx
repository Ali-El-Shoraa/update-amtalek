"use client";
// import Slider from "@/allPages/landingPage/featuredProperties/components/Slider";
import Heading from "@/components/Heading";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "./Slider";

export default function MostViewsProject({ data, locale, countrie }: any) {
  const { t, i18n } = useTranslation("Pages_Projects");

  const [countries, setCountries] = useState<any>(null);

  return (
    <section className="pt-10">
      <div className="site_container relative m-0 w-full h-[530px]">
        <Heading className="clg:mx-auto">{t("developers.most_view")}</Heading>
        <Slider
          data={data}
          locale={locale}
          countrie={countrie}
          // user={userData}
          // userProfileDataOutlet={userProfileDataOutlet}
        />{" "}
        {/* </div> */}
      </div>
    </section>
  );
}
