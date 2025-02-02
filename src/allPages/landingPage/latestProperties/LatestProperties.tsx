// "use client";

import HeaderSection from "@/components/HeaderSection";
import LatestPropertiesAllCards from "./components/LatestPropertiesAllCards";
// import initTranslations from "@/app/i18n";
import { useTranslation } from "react-i18next";
import ButtonSections from "@/components/ButtonSections";
import { memo } from "react";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

// const i18nNamespaces = ["Pages_LandingPage"];

export default memo(function LatestProperties({ data, locale, countrie }: any) {
  // const { t } = await initTranslations(locale, i18nNamespaces);

  const { t } = useTranslation("Pages_LandingPage");
  return (
    <section className="bg-custome-venice py-20">
      <div className="site_container flex flex-col gap-10">
        {/* ************************************************************************************* */}

        <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          className={"w-fit mx-auto text-center"}
          locale={locale}
          countrie={countrie}
        />
        {/* ************************************************************************************* */}

        {/* عرض المكونات بالبيانات */}
        <LatestPropertiesAllCards data={data} locale={locale} t={t} />
        {/* ************************************************************************************* */}
        <ButtonSections title={t("LatestProperties.main_CTA")} to={`/search`} />
      </div>
    </section>
  );
});
