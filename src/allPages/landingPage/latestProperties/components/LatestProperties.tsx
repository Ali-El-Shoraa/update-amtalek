/* eslint-disable @next/next/no-img-element */
"use client";
import { memo, useMemo, useState } from "react";
// import bottomBuilding from "@/assets/images/bg-gallery.png";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  setShowLoginPopUp,
  userData,
} from "@/Store/Features/AuthenticationSlice";
import Heading from "@/components/Heading";
// import SubHeading from "@/MainComponents/SubHeading";
// import PropertyCard from "@/CardsComponents/PropertyCard";
import LangLink from "@/components/LangLink";
import SubHeading from "@/components/SubHeading";
import PropertyCard from "@/components/PropertyCard";

const LatestProperties = memo(function LatestProperties({
  data,
  countrie,
}: any) {
  const { t, i18n } = useTranslation("Pages_LandingPage");
  // const { t, i18n } = useTranslation();
  // const { t, i18n } = useTranslation("Pages_MyProperties");

  const [selectedTab, setSelectedTab] = useState("");
  const user = useSelector(userData);
  const dispatch = useDispatch();
  // const theCountry = useSelector(OwnCountry);
  const theCountry = countrie;

  const filteredProperties = useMemo(() => {
    if (!data?.cards?.length) return [];
    return selectedTab === ""
      ? data.cards
      : data.cards.filter((property: any) =>
          selectedTab === "for_sale"
            ? property.for_what === "for_sale"
            : property.for_what === "for_rent" ||
              property.for_what === "for_both"
        );
  }, [selectedTab, data]);

  const tabData = useMemo(
    () => ({
      latest: { filter: () => true, label: "LATEST", key: "" },
      sale: {
        filter: (property: any) => property.for_what === "for_sale",
        label: "SALE",
        key: "for_sale",
      },
      rent: {
        filter: (property: any) =>
          property.for_what === "for_rent" || property.for_what === "for_both",
        label: "RENT",
        key: "for_both",
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  if (!data?.cards?.length) return null;

  return (
    <section className="h-auto bg-grey text-secondary relative">
      <section className="relative z-10 py-20 flex flex-col items-center site_container">
        <Heading style="text-center">
          {data?.title} {i18n.language === "ar" ? "في" : "in"}{" "}
          {theCountry?.title}
        </Heading>
        <SubHeading style="text-center">{data?.sub_title}</SubHeading>
        <div className="Latest__Properties--filter flex justify-center items-center gap-5 mt-7">
          {Object.values(tabData).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`relative group p-1 font-bold text-lg tracking-widest rtl:tracking-normal rtl:text-xl cursor-pointer h-7 flex flex-col justify-start ${
                selectedTab === tab.key ? "text-white" : ""
              }`}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={
                  selectedTab === tab.key ? { width: "100%" } : { width: 0 }
                }
                transition={{ duration: 0.5, type: "tween" }}
                className="absolute left-0 bg-secondary h-full z-[-1] rounded"
              ></motion.span>
              {t(`LatestProperties.filter.${tab.label}`)}
              <hr
                className={`border-[0px] border-secondary w-0 duration-300 ease-in-out transition-all ${
                  selectedTab === tab.key
                    ? ""
                    : "group-hover:w-full group-hover:border-[1px]"
                }`}
              />
            </button>
          ))}
        </div>
        <motion.div
          layout
          className="latest__properties--cards w-full grid grid-cols-3 clg:grid-cols-1 gap-4 my-10 min-h-[500px]"
        >
          {filteredProperties.map((property: any) => (
            <PropertyCard
              key={property.id}
              property={property}
              makeBgLight
              user={user}
              lng={i18n.language}
              ShowLoginPopUp={() => dispatch(setShowLoginPopUp(true))}
              t={t}
              i18n={i18n}
            />
          ))}
          {filteredProperties.length === 0 && (
            <p>{t("LatestProperties.no_filtered_data")}</p>
          )}
        </motion.div>
        <LangLink
          to={`/search`}
          className="login__bt border-2 font-bold round w-[200px] h-[50px] flex justify-center items-center border-secondary text-sm bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary active:scale-90"
        >
          {t("LatestProperties.main_CTA")}
        </LangLink>
      </section>

      <img
        width={1000}
        height={1000}
        className="z-[0] absolute bottom-0 right-0 w-full object-cover"
        src={`/images/bg-gallery.png`}
        alt="bottom-building"
        // loading="lazy"
      />
    </section>
  );
});

export default LatestProperties;
